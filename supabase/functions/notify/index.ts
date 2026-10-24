// GOLDNOVA United — bildirim fonksiyonu (Supabase Edge Function)
// Telefon bildirimi (Web Push) + e-posta gönderir, maç hatırlatmalarını yapar.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import webpush from 'npm:web-push@3.6.7';

const env = (k: string) => Deno.env.get(k) || '';
const db = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } });
const APP_URL = env('APP_URL').replace(/\/$/, '');
const TZ_OFFSET = env('TZ_OFFSET') || '+03:00'; // Türkiye saati
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'content-type': 'application/json' } });

const pushOn = !!(env('VAPID_PUBLIC_KEY') && env('VAPID_PRIVATE_KEY'));
if (pushOn) webpush.setVapidDetails(env('VAPID_SUBJECT') || 'mailto:admin@example.com', env('VAPID_PUBLIC_KEY'), env('VAPID_PRIVATE_KEY'));

type M = { id: string; date: string; time: string; saha: string; adres: string; opp: string; ucret: number; format: number; result: any; notified_new: boolean; notified_result: boolean; reminded: boolean };
const when = (m: M) => new Date(`${m.date}T${m.time || '21:00'}:00${TZ_OFFSET}`);
const trDate = (m: M) => when(m).toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Istanbul' });
const opp = (m: M) => m.opp || 'Rakip';
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

async function push(userIds: string[], payload: { title: string; body: string; url: string }) {
  if (!pushOn || !userIds.length) return 0;
  const { data: subs } = await db.from('push_subs').select('*').in('user_id', userIds);
  let sent = 0;
  await Promise.all((subs || []).map(async (s: any) => {
    try { await webpush.sendNotification(s.sub, JSON.stringify(payload), { TTL: 86400 }); sent++; }
    catch (e: any) {
      if (e.statusCode === 404 || e.statusCode === 410) await db.from('push_subs').delete().eq('endpoint', s.endpoint);
      else console.error('push hata', e.statusCode, e.body);
    }
  }));
  return sent;
}

async function mail(to: string[], subject: string, html: string, text: string) {
  if (!to.length) return;
  const from = env('MAIL_FROM_EMAIL') || env('SMTP_USER');
  if (env('BREVO_API_KEY')) { // Brevo: ücretsiz, günde 300 e-posta
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers: { 'api-key': env('BREVO_API_KEY'), 'content-type': 'application/json' },
      body: JSON.stringify({ sender: { email: from, name: 'GOLDNOVA United' }, to: [{ email: from }], bcc: to.map(email => ({ email })), subject, htmlContent: html, textContent: text }),
    });
    if (!r.ok) console.error('brevo hata', await r.text());
    return;
  }
  if (!env('SMTP_USER') || !env('SMTP_PASS')) return;
  try { // Gmail SMTP (port 465)
    const { SMTPClient } = await import('https://deno.land/x/denomailer@1.6.0/mod.ts');
    const c = new SMTPClient({ connection: { hostname: env('SMTP_HOST') || 'smtp.gmail.com', port: 465, tls: true, auth: { username: env('SMTP_USER'), password: env('SMTP_PASS') } } });
    await c.send({ from: `GOLDNOVA United <${env('SMTP_USER')}>`, to: env('SMTP_USER'), bcc: to, subject, content: text, html });
    await c.close();
  } catch (e) { console.error('smtp hata', e); }
}

function matchMail(m: M, intro: string) {
  const link = `${APP_URL}/#match/${m.id}`;
  return {
    link,
    html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;background:#0D0D0D;color:#fff;border-radius:16px;overflow:hidden">
  <div style="background:#8B0F1A;padding:16px 20px;border-bottom:3px solid #D4AF37;display:flex;align-items:center;gap:12px">${APP_URL ? `<img src="${APP_URL}/icons/icon-192.png" width="44" height="44" alt="" style="border-radius:8px">` : ''}<b style="color:#D4AF37;font-size:20px;letter-spacing:1px">GOLDNOVA UNITED</b></div>
  <div style="padding:20px"><p style="margin:0 0 12px;color:#ddd">${esc(intro)}</p>
  <h2 style="margin:0 0 6px;color:#fff">GOLDNOVA – ${esc(opp(m))}</h2>
  <p style="margin:0;color:#D4AF37;font-size:18px"><b>${esc(trDate(m))}, ${esc(m.time)}</b></p>
  <p style="margin:6px 0 0;color:#bbb">${esc(m.saha)}${m.adres ? ', ' + esc(m.adres) : ''}</p>
  ${m.ucret ? `<p style="margin:6px 0 0;color:#bbb">Saha ücreti: ${esc(m.ucret)} ₺</p>` : ''}
  ${APP_URL ? `<a href="${link}" style="display:inline-block;margin-top:18px;background:#D4AF37;color:#111;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:bold">Geliyorum / Gelemiyorum</a>` : ''}</div></div>`,
  };
}

async function remind() {
  const today = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10);
  const { data: ms } = await db.from('matches').select('*').is('result', null).eq('reminded', false).gte('date', today);
  let n = 0;
  for (const m of (ms || []) as M[]) {
    const diff = when(m).getTime() - Date.now();
    if (diff <= 0 || diff > 3 * 3600e3) continue;
    await db.from('matches').update({ reminded: true }).eq('id', m.id);
    const { data: rs } = await db.from('rsvps').select('user_id,status').eq('match_id', m.id);
    const no = new Set((rs || []).filter((r: any) => r.status === 'yok').map((r: any) => r.user_id));
    const going = (rs || []).filter((r: any) => r.status === 'gel').length;
    const { data: us } = await db.from('profiles').select('id,notify_push');
    const ids = (us || []).filter((u: any) => u.notify_push !== false && !no.has(u.id)).map((u: any) => u.id);
    n += await push(ids, { title: `⏰ Bugün ${m.time}'de maç var`, body: `${m.saha} | ${going}/${m.format} kişi geliyor`, url: `./#match/${m.id}` });
  }
  return { ok: true, sent: n };
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  let body: any = {};
  try { body = await req.json(); } catch { /* boş */ }

  if (body.type === 'remind') {
    if (!env('CRON_SECRET') || req.headers.get('x-cron-secret') !== env('CRON_SECRET')) return json({ error: 'yetkisiz' }, 401);
    return json(await remind());
  }

  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return json({ error: 'Giriş gerekli' }, 401);
  const { data: me } = await db.from('profiles').select('*').eq('id', user.id).single();
  if (!me) return json({ error: 'Profil bulunamadı' }, 403);
  const admin = me.role === 'admin';
  const { data: all } = await db.from('profiles').select('id,email,notify_email,notify_push');
  const pushIds = (except?: string) => (all || []).filter((u: any) => u.notify_push !== false && u.id !== except).map((u: any) => u.id);
  const mails = () => (all || []).filter((u: any) => u.notify_email !== false && u.email).map((u: any) => u.email);
  const getMatch = async (id: string) => (await db.from('matches').select('*').eq('id', id).single()).data as M | null;

  switch (body.type) {
    case 'test':
      return json({ sent: await push([me.id], { title: 'GOLDNOVA United', body: 'Bildirimler çalışıyor ⚽', url: './' }), push: pushOn });

    case 'match_new': {
      if (!admin) return json({ error: 'Yetki yok' }, 403);
      const m = await getMatch(body.id); if (!m || m.notified_new) return json({ ok: true, skip: true });
      await db.from('matches').update({ notified_new: true }).eq('id', m.id);
      const text = `GOLDNOVA – ${opp(m)} | ${trDate(m)}, ${m.time} | ${m.saha}`;
      await push(pushIds(), { title: '⚽ Yeni maç var!', body: text, url: `./#match/${m.id}` });
      if (body.mail !== false) { const mm = matchMail(m, 'Yeni maç planlandı. Gelip gelemeyeceğini uygulamadan işaretle.'); await mail(mails(), `⚽ Yeni maç: ${trDate(m)}, ${m.time}`, mm.html, `${text}\n\n${mm.link}`); }
      return json({ ok: true });
    }
    case 'match_changed': {
      if (!admin) return json({ error: 'Yetki yok' }, 403);
      const m = await getMatch(body.id); if (!m) return json({ ok: true });
      const text = `${trDate(m)}, ${m.time} | ${m.saha}`;
      await push(pushIds(me.id), { title: '📅 Maç bilgisi değişti', body: text, url: `./#match/${m.id}` });
      if (body.mail) { const mm = matchMail(m, 'Maçın tarihi, saati ya da sahası değişti.'); await mail(mails(), `📅 Maç değişti: ${trDate(m)}, ${m.time}`, mm.html, `${text}\n\n${mm.link}`); }
      return json({ ok: true });
    }
    case 'match_cancel': {
      if (!admin) return json({ error: 'Yetki yok' }, 403);
      const m = await getMatch(body.id); if (!m) return json({ ok: true });
      await push(pushIds(me.id), { title: '❌ Maç iptal', body: `${trDate(m)}, ${m.time} maçı iptal edildi`, url: './' });
      return json({ ok: true });
    }
    case 'lineup': {
      if (!admin) return json({ error: 'Yetki yok' }, 403);
      const m = await getMatch(body.id); if (!m) return json({ ok: true });
      await push(pushIds(me.id), { title: '📋 Kadro açıklandı', body: `GOLDNOVA – ${opp(m)} maçının kadrosu hazır`, url: `./#match/${m.id}` });
      return json({ ok: true });
    }
    case 'result': {
      if (!admin) return json({ error: 'Yetki yok' }, 403);
      const m = await getMatch(body.id); if (!m || !m.result || m.notified_result) return json({ ok: true, skip: true });
      await db.from('matches').update({ notified_result: true }).eq('id', m.id);
      const r = m.result, s = r.us > r.them ? 'Kazandık! 🏆' : r.us < r.them ? 'Kaybettik' : 'Berabere';
      await push(pushIds(me.id), { title: `GOLDNOVA ${r.us} – ${r.them} ${opp(m)}`, body: `${s} Golleri, puanları ve videoları uygulamada gör.`, url: `./#match/${m.id}` });
      return json({ ok: true });
    }
    case 'video': {
      const { data: v } = await db.from('videos').select('*').eq('id', body.id).single();
      if (!v || v.user_id !== me.id || v.notified) return json({ ok: true, skip: true });
      await db.from('videos').update({ notified: true }).eq('id', v.id);
      const { data: sc } = v.scorer ? await db.from('profiles').select('name').eq('id', v.scorer).single() : { data: null };
      await push(pushIds(me.id), { title: v.tag === 'gol' ? '🎥 Yeni gol videosu' : '🎥 Yeni video', body: `${me.name} paylaştı${v.tag === 'gol' && sc ? ': ' + sc.name + ' golü' : ''}${v.caption ? ' | ' + String(v.caption).slice(0, 60) : ''}`, url: `./#feed/${v.id}` });
      return json({ ok: true });
    }
    case 'comment': {
      const { data: c } = await db.from('comments').select('*, videos(user_id)').eq('id', body.id).single();
      if (!c || c.user_id !== me.id) return json({ ok: true, skip: true });
      const owner = (c as any).videos?.user_id;
      if (owner && owner !== me.id) await push([owner], { title: '💬 Videona yorum geldi', body: `${me.name}: ${String(c.text).slice(0, 80)}`, url: `./#feed/${c.video_id}` });
      return json({ ok: true });
    }
  }
  return json({ error: 'Bilinmeyen istek' }, 400);
});
