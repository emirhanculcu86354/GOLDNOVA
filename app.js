// GOLDNOVA United — istemci (PWA)
(function () {
'use strict';
/* ---------- sabitler ---------- */
const POS = { KL: 'Kaleci', DEF: 'Defans', OS: 'Orta saha', FV: 'Forvet' };
const POSG = { KL: 'Kaleciler', DEF: 'Defans', OS: 'Orta saha', FV: 'Hücum' };
const W = { FV: { hiz: .2, sut: .35, pas: .1, dri: .25, def: 0, fiz: .1 }, OS: { hiz: .1, sut: .15, pas: .35, dri: .25, def: .05, fiz: .1 }, DEF: { hiz: .15, sut: 0, pas: .15, dri: .05, def: .45, fiz: .2 }, KL: { hiz: .05, sut: 0, pas: .2, dri: .05, def: .4, fiz: .3 } };
const STATS = [['hiz', 'HIZ'], ['sut', 'ŞUT'], ['pas', 'PAS'], ['dri', 'DRİ'], ['def', 'DEF'], ['fiz', 'FİZ']];
const KIT = { s: '#8B0F1A', t: '#D4AF37', x: '#D4AF37' }, GK = { s: '#121212', t: '#D4AF37', x: '#D4AF37' }, OPP = { s: '#5E6068', t: '#FFFFFF', x: '#FFFFFF' };
const JP = 'M30 8 L42 4 Q50 13 58 4 L70 8 L94 25 L84 43 L74 37 L74 95 L26 95 L26 37 L16 43 L6 25 Z';
const D = .32, O = .62, F = .92, K = [.5, 0, 'KL'];
const FORM = {
  5: { '2-1-1': [K, [.28, D, 'DEF'], [.72, D, 'DEF'], [.5, O, 'OS'], [.5, F, 'FV']], '1-2-1': [K, [.5, D, 'DEF'], [.24, O, 'OS'], [.76, O, 'OS'], [.5, F, 'FV']] },
  6: { '2-2-1': [K, [.28, D, 'DEF'], [.72, D, 'DEF'], [.24, O, 'OS'], [.76, O, 'OS'], [.5, F, 'FV']], '3-1-1': [K, [.16, D, 'DEF'], [.5, D, 'DEF'], [.84, D, 'DEF'], [.5, O, 'OS'], [.5, F, 'FV']], '2-1-2': [K, [.28, D, 'DEF'], [.72, D, 'DEF'], [.5, O, 'OS'], [.28, F, 'FV'], [.72, F, 'FV']] },
  7: { '3-2-1': [K, [.16, D, 'DEF'], [.5, D, 'DEF'], [.84, D, 'DEF'], [.28, O, 'OS'], [.72, O, 'OS'], [.5, F, 'FV']], '2-3-1': [K, [.3, D, 'DEF'], [.7, D, 'DEF'], [.14, O, 'OS'], [.5, O, 'OS'], [.86, O, 'OS'], [.5, F, 'FV']], '3-1-2': [K, [.16, D, 'DEF'], [.5, D, 'DEF'], [.84, D, 'DEF'], [.5, O, 'OS'], [.28, F, 'FV'], [.72, F, 'FV']] },
  8: { '3-3-1': [K, [.16, D, 'DEF'], [.5, D, 'DEF'], [.84, D, 'DEF'], [.16, O, 'OS'], [.5, O, 'OS'], [.84, O, 'OS'], [.5, F, 'FV']], '3-2-2': [K, [.16, D, 'DEF'], [.5, D, 'DEF'], [.84, D, 'DEF'], [.3, O, 'OS'], [.7, O, 'OS'], [.3, F, 'FV'], [.7, F, 'FV']] }
};
const CREST = '<img class="crest-img" src="./logo.png" alt="GOLDNOVA United">';
const IC = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/></svg>',
  heartF: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/></svg>',
  cmt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg>'
};
const TAGS = { gol: 'Gol', kurtaris: 'Kurtarış', pozisyon: 'Pozisyon', komik: 'Komik an', diger: 'Diğer' };

/* ---------- yardımcılar ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ovr = p => { const w = W[p.pos] || W.OS; let s = 0; for (const k in w) s += w[k] * ((p.stats || {})[k] || 0); return Math.round(s); };
const ini = n => String(n || '?').trim().split(/\s+/).map(x => x[0]).join('').slice(0, 2).toLocaleUpperCase('tr-TR');
const tl = n => Math.round(n).toLocaleString('tr-TR') + ' ₺';
const r1 = v => Math.round(v * 10) / 10;
const when = m => new Date(`${m.date}T${m.time || '21:00'}`);
const fDate = d => d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
const fShort = d => d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
const opp = m => m.opp || 'Rakip';
function rel(iso) { const s = (Date.now() - new Date(iso)) / 1000; if (s < 60) return 'az önce'; if (s < 3600) return Math.floor(s / 60) + ' dk önce'; if (s < 86400) return Math.floor(s / 3600) + ' sa önce'; if (s < 7 * 86400) return Math.floor(s / 86400) + ' gün önce'; return fShort(new Date(iso)); }
function rb(v) { if (v == null) return '<i class="rb rn">–</i>'; const c = v >= 8 ? 'r8' : v >= 7 ? 'r7' : v >= 6 ? 'r6' : 'r5'; return `<i class="rb ${c}">${v.toFixed(1)}</i>`; }
function jersey(k, label = '') {
  const L = String(label), fs = L.length > 2 ? 24 : L.length > 1 ? 33 : 37;
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${JP}" fill="${k.s}" stroke="${k.x}" stroke-width="2.5" stroke-linejoin="round"/><path d="M41 5 L50 17 L59 5" fill="none" stroke="${k.x}" stroke-width="4.5" stroke-linejoin="round"/><path d="M29 39 V95 M71 39 V95" stroke="${k.x}" stroke-width="2.5"/><path d="M84 43 L94 25 M16 43 L6 25" stroke="${k.x}" stroke-width="5"/>${L ? `<text x="50" y="${fs > 30 ? 73 : 69}" text-anchor="middle" font-family="Archivo, Arial Narrow, sans-serif" font-stretch="72%" font-weight="800" font-size="${fs}" fill="${k.t}">${esc(L)}</text>` : ''}</svg>`;
}
const avatar = (p, size) => `<span class="av ${size}">${p && p.photo ? `<img src="${esc(p.photo)}" alt="" loading="lazy">` : esc(ini(p ? p.name : '?'))}</span>`;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2400); }

/* ---------- Supabase veri katmanı ---------- */
const CFG = window.GN_CONFIG || {};
const sb = (CFG.supabaseUrl && window.supabase) ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey) : null;
const BASE = location.href.split('#')[0];
function trErr(m) {
  m = String(m || '');
  if (/Invalid login/i.test(m)) return 'E-posta ya da şifre hatalı';
  if (/already registered|already been registered/i.test(m)) return 'Bu e-postayla zaten bir hesap var';
  if (/Database error saving new user|TEAM_CODE/i.test(m)) return 'Takım davet kodu hatalı';
  if (/Password should be/i.test(m)) return 'Şifre en az 6 karakter olmalı';
  if (/Email not confirmed/i.test(m)) return 'E-postanı onaylaman gerekiyor, gelen kutuna bak';
  if (/valid email|invalid format/i.test(m)) return 'Geçerli bir e-posta yaz';
  if (/rate limit/i.test(m)) return 'Çok fazla deneme, biraz sonra tekrar dene';
  if (/row-level security|permission/i.test(m)) return 'Bu işlem için yetkin yok';
  return m || 'Bir hata oldu';
}
const chk = ({ data, error }) => { if (error) throw new Error(trErr(error.message)); return data; };
const mapU = r => ({ ...r, notifyEmail: r.notify_email, notifyPush: r.notify_push, created: r.created_at });
const mapM = (r, rs) => { const m = { ...r, created: r.created_at, rsvp: {}, paid: [] }; (rs || []).filter(x => x.match_id === r.id).forEach(x => { m.rsvp[x.user_id] = x.status; if (x.paid) m.paid.push(x.user_id); }); return m; };
const mapV = r => ({ id: r.id, matchId: r.match_id, userId: r.user_id, file: r.url, path: r.path, caption: r.caption, tag: r.tag, scorer: r.scorer, created: r.created_at,
  likes: (r.likes || []).map(l => l.user_id), comments: (r.comments || []).map(c => ({ id: c.id, userId: c.user_id, text: c.text, created: c.created_at })).sort((a, b) => a.created.localeCompare(b.created)) });
const VSEL = '*,likes(user_id),comments(id,user_id,text,created_at)';
async function fetchMatch(id) { const [m, rs] = await Promise.all([sb.from('matches').select('*').eq('id', id).single(), sb.from('rsvps').select('*').eq('match_id', id)]); return mapM(chk(m), chk(rs)); }
async function fetchVideo(id) { return mapV(chk(await sb.from('videos').select(VSEL).eq('id', id).single())); }
function notify(type, extra = {}) { if (!sb) return Promise.resolve(); return sb.functions.invoke('notify', { body: { type, ...extra } }).then(r => { if (r.error) console.warn('Bildirim gönderilemedi', r.error); return r.data; }).catch(e => console.warn('Bildirim', e)); }
const matchRow = b => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date || '') || !/^\d{2}:\d{2}$/.test(b.time || '')) throw new Error('Tarih ve saat gir');
  return { date: b.date, time: b.time, saha: String(b.saha || '').trim() || 'Halısaha', adres: String(b.adres || '').trim(), opp: String(b.opp || '').trim(), format: +b.format || 7, ucret: Math.max(0, +b.ucret || 0), note: String(b.note || '').trim(), kayit: !!b.kayit };
};
const storagePath = url => { const i = String(url || '').indexOf('/storage/v1/object/public/'); if (i < 0) return null; const rest = url.slice(i + 26); const j = rest.indexOf('/'); return { bucket: rest.slice(0, j), path: decodeURIComponent(rest.slice(j + 1)) }; };

// Eski sunucu API'sinin yerini tutan yönlendirici: arayüz kodu aynı kalsın diye
async function api(path, opt = {}) {
  const method = opt.method || 'GET', b = opt.body || {};
  let mm;
  if (path === '/auth/login') { chk(await sb.auth.signInWithPassword({ email: String(b.email).trim(), password: b.password })); return {}; }
  if (path === '/auth/register') {
    if (!String(b.name || '').trim()) throw new Error('Adını yaz');
    const r = await sb.auth.signUp({ email: String(b.email).trim(), password: b.password, options: { data: { name: String(b.name).trim(), code: String(b.code || '').trim() } } });
    if (r.error) throw new Error(trErr(r.error.message));
    if (!r.data.session) throw new Error('Hesabın oluştu. E-postana gelen onay linkine tıkla, sonra giriş yap.');
    return {};
  }
  if (path === '/auth/logout') { await sb.auth.signOut(); return {}; }
  if (path === '/me' && method === 'PUT') {
    if (b.password) { if (String(b.password).length < 6) throw new Error('Yeni şifre en az 6 karakter olmalı'); chk(await sb.auth.updateUser({ password: b.password })); return { me: ME }; }
    const p = {}; ['name', 'nick', 'num', 'pos', 'foot'].forEach(k => { if (b[k] !== undefined) p[k] = String(b[k]).trim(); });
    if (p.name === '') delete p.name; if (p.num !== undefined) p.num = p.num.replace(/\D/g, '').slice(0, 2);
    if (b.notifyEmail !== undefined) p.notify_email = !!b.notifyEmail; if (b.notifyPush !== undefined) p.notify_push = !!b.notifyPush;
    return { me: mapU(chk(await sb.from('profiles').update(p).eq('id', ME.id).select().single())) };
  }
  if (path === '/me/photo') {
    const blob = b.get('photo'), p = `${ME.id}/${Date.now()}.jpg`;
    chk(await sb.storage.from('photos').upload(p, blob, { contentType: 'image/jpeg' }));
    const url = sb.storage.from('photos').getPublicUrl(p).data.publicUrl, old = storagePath(ME.photo);
    const me = mapU(chk(await sb.from('profiles').update({ photo: url }).eq('id', ME.id).select().single()));
    if (old) sb.storage.from(old.bucket).remove([old.path]);
    return { me };
  }
  if ((mm = path.match(/^\/users\/([^/]+)$/))) {
    if (method === 'DELETE') { chk(await sb.from('profiles').delete().eq('id', mm[1])); return {}; }
    const p = {}; if (b.pos) p.pos = b.pos; if (b.num !== undefined) p.num = String(b.num).replace(/\D/g, '').slice(0, 2); if (b.stats) p.stats = b.stats; if (b.role) p.role = b.role;
    return { user: mapU(chk(await sb.from('profiles').update(p).eq('id', mm[1]).select().single())) };
  }
  if (path === '/matches' && method === 'POST') {
    const row = { ...matchRow(b), created_by: ME.id };
    const d = chk(await sb.from('matches').insert(row).select().single());
    if (b.notify) await notify('match_new', { id: d.id, mail: true });
    return { match: mapM(d, []) };
  }
  if ((mm = path.match(/^\/matches\/([^/]+)$/))) {
    const id = mm[1], old = MATCHES.find(x => x.id === id);
    if (method === 'DELETE') {
      if (old && !old.result && when(old) > new Date()) await notify('match_cancel', { id });
      const vs = VIDEOS.filter(v => v.matchId === id && v.path); if (vs.length) await sb.storage.from('videos').remove(vs.map(v => v.path));
      chk(await sb.from('matches').delete().eq('id', id)); return {};
    }
    const row = matchRow(b); chk(await sb.from('matches').update(row).eq('id', id));
    if (old && !old.result && (old.date !== row.date || old.time !== row.time || old.saha !== row.saha)) { await sb.from('matches').update({ reminded: false }).eq('id', id); notify('match_changed', { id, mail: !!b.notify }); }
    return { match: await fetchMatch(id) };
  }
  if ((mm = path.match(/^\/matches\/([^/]+)\/rsvp$/))) {
    chk(await sb.from('rsvps').upsert({ match_id: mm[1], user_id: b.userId || ME.id, status: b.status }, { onConflict: 'match_id,user_id' }));
    return { match: await fetchMatch(mm[1]) };
  }
  if ((mm = path.match(/^\/matches\/([^/]+)\/paid$/))) {
    const m = MATCHES.find(x => x.id === mm[1]); chk(await sb.from('rsvps').update({ paid: !m.paid.includes(b.userId) }).eq('match_id', mm[1]).eq('user_id', b.userId));
    return { match: await fetchMatch(mm[1]) };
  }
  if ((mm = path.match(/^\/matches\/([^/]+)\/lineup$/))) {
    chk(await sb.from('matches').update({ lineup: { form: b.form, slots: b.slots } }).eq('id', mm[1]));
    if (b.notify) notify('lineup', { id: mm[1] });
    return { match: await fetchMatch(mm[1]) };
  }
  if ((mm = path.match(/^\/matches\/([^/]+)\/result$/))) {
    if (method === 'DELETE') { chk(await sb.from('matches').update({ result: null, notified_result: false }).eq('id', mm[1])); return { match: await fetchMatch(mm[1]) }; }
    const result = { us: Math.max(0, +b.us || 0), them: Math.max(0, +b.them || 0), players: b.players || [], goals: b.goals || {}, assists: b.assists || {}, ratings: b.ratings || {}, mvp: b.mvp || null, at: new Date().toISOString() };
    chk(await sb.from('matches').update({ result }).eq('id', mm[1]));
    notify('result', { id: mm[1] });
    return { match: await fetchMatch(mm[1]) };
  }
  if ((mm = path.match(/^\/videos\/([^/]+)$/)) && method === 'DELETE') {
    const v = VIDEOS.find(x => x.id === mm[1]); if (v && v.path) await sb.storage.from('videos').remove([v.path]);
    chk(await sb.from('videos').delete().eq('id', mm[1])); return {};
  }
  if ((mm = path.match(/^\/videos\/([^/]+)\/like$/))) {
    const v = VIDEOS.find(x => x.id === mm[1]);
    if (v && v.likes.includes(ME.id)) chk(await sb.from('likes').delete().eq('video_id', mm[1]).eq('user_id', ME.id));
    else chk(await sb.from('likes').insert({ video_id: mm[1], user_id: ME.id }));
    return { video: await fetchVideo(mm[1]) };
  }
  if ((mm = path.match(/^\/videos\/([^/]+)\/comments$/))) {
    const c = chk(await sb.from('comments').insert({ video_id: mm[1], user_id: ME.id, text: String(b.text).trim().slice(0, 400) }).select().single());
    notify('comment', { id: c.id }); return { video: await fetchVideo(mm[1]) };
  }
  if ((mm = path.match(/^\/videos\/([^/]+)\/comments\/([^/]+)$/))) { chk(await sb.from('comments').delete().eq('id', mm[2])); return { video: await fetchVideo(mm[1]) }; }
  if (path === '/push/subscribe') { chk(await sb.from('push_subs').upsert({ endpoint: b.subscription.endpoint, user_id: ME.id, sub: b.subscription }, { onConflict: 'endpoint' })); return {}; }
  if (path === '/push/unsubscribe') { await sb.from('push_subs').delete().eq('endpoint', b.endpoint); return {}; }
  if (path === '/push/test') { const r = await notify('test'); if (r && r.push === false) throw new Error('Bildirim anahtarları Supabase’e eklenmemiş (README adım 5)'); return {}; }
  throw new Error('Bilinmeyen işlem: ' + path);
}
const fail = e => toast(e.message || 'Bir hata oldu');

/* ---------- veri ---------- */
let ME = null, USERS = [], MATCHES = [], VIDEOS = [], PUSHKEY = null, MAILON = false;
const byId = id => USERS.find(u => u.id === id);
const isAdmin = () => ME && ME.role === 'admin';
async function loadAll() {
  const { data: { session } } = await sb.auth.getSession(); if (!session) throw new Error('no session');
  const [p, m, r, v] = await Promise.all([sb.from('profiles').select('*'), sb.from('matches').select('*'), sb.from('rsvps').select('*'), sb.from('videos').select(VSEL).order('created_at', { ascending: false })]);
  USERS = chk(p).map(mapU); const rs = chk(r); MATCHES = chk(m).map(x => mapM(x, rs)); VIDEOS = chk(v).map(mapV);
  ME = USERS.find(u => u.id === session.user.id) || null; PUSHKEY = CFG.vapidPublicKey || null; MAILON = true;
  if (!ME) { await sb.auth.signOut(); throw new Error('removed'); }
}
const upd = (arr, item) => { const i = arr.findIndex(x => x.id === item.id); if (i > -1) arr[i] = item; else arr.push(item); };
function nextMatch() { const t = Date.now() - 2 * 3600e3; return MATCHES.filter(m => !m.result && when(m) >= t).sort((a, b) => when(a) - when(b))[0] || null; }
const played = () => MATCHES.filter(m => m.result).sort((a, b) => when(b) - when(a));
const pending = () => MATCHES.filter(m => !m.result && when(m) < Date.now() - 2 * 3600e3).sort((a, b) => when(b) - when(a));
const upcoming = () => MATCHES.filter(m => !m.result && when(m) >= Date.now() - 2 * 3600e3).sort((a, b) => when(a) - when(b));
const st = (m, uid) => (m.rsvp || {})[uid] || '';
const going = m => USERS.filter(u => st(m, u.id) === 'gel');

function calc() {
  const M = {}; USERS.forEach(u => M[u.id] = { matches: 0, wins: 0, draws: 0, losses: 0, goals: 0, assists: 0, mvp: 0, cs: 0, hat: 0, ratings: [], log: [], best: 0 });
  [...played()].reverse().forEach(m => {
    const r = m.result, res = r.us > r.them ? 'wins' : r.us < r.them ? 'losses' : 'draws';
    const gk = m.lineup && m.lineup.slots && m.lineup.slots[0];
    (r.players || []).forEach(pid => {
      const s = M[pid]; if (!s) return;
      const g = r.goals[pid] || 0, a = r.assists[pid] || 0, rt = r.ratings[pid];
      s.matches++; s[res]++; s.goals += g; s.assists += a; if (g >= 3) s.hat++; if (r.mvp === pid) s.mvp++;
      if (r.them === 0 && (gk ? gk === pid : (byId(pid) || {}).pos === 'KL')) s.cs++;
      if (rt != null) { s.ratings.push(rt); s.best = Math.max(s.best, rt); }
      s.log.push({ m, res, g, a, rt });
    });
  });
  for (const id in M) { const s = M[id]; s.avg = s.ratings.length ? r1(s.ratings.reduce((x, y) => x + y, 0) / s.ratings.length) : null; s.log.reverse(); }
  return M;
}
function record() { const r = { w: 0, d: 0, l: 0, gf: 0, ga: 0, form: [] }; played().forEach(m => { const x = m.result; r.gf += x.us; r.ga += x.them; const k = x.us > x.them ? 'G' : x.us < x.them ? 'M' : 'B'; r[{ G: 'w', B: 'd', M: 'l' }[k]]++; if (r.form.length < 5) r.form.push(k); }); return r; }

/* ---------- tema ---------- */
function applyTheme() { const t = localStorage.getItem('gn-theme'); if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
applyTheme();
$('#themeBtn').onclick = () => { const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); localStorage.setItem('gn-theme', cur === 'dark' ? 'light' : 'dark'); applyTheme(); };
document.querySelectorAll('.crest').forEach(e => e.innerHTML = CREST);

/* ---------- giriş ---------- */
function showAuth(mode = 'login') {
  $('#appView').classList.add('hide'); const v = $('#authView'); v.classList.remove('hide');
  v.innerHTML = `<div class="auth-box"><div class="auth-logo">${CREST}<b>GOLDNOVA UNITED</b><span class="muted">Takım uygulamasına ${mode === 'login' ? 'giriş yap' : 'katıl'}</span></div>
   <div class="card"><div class="seg" style="width:100%;margin-bottom:14px;display:grid;grid-template-columns:1fr 1fr"><button data-m="login" aria-pressed="${mode === 'login'}">Giriş yap</button><button data-m="reg" aria-pressed="${mode === 'reg'}">Kayıt ol</button></div>
   <form id="authF" novalidate>
    ${mode === 'reg' ? '<label class="f">Adın<input type="text" name="name" autocomplete="name" maxlength="30" required></label>' : ''}
    <label class="f">E-posta<input type="text" name="email" inputmode="email" autocomplete="email" required></label>
    <label class="f">Şifre<input type="password" name="password" autocomplete="${mode === 'reg' ? 'new-password' : 'current-password'}" required></label>
    ${mode === 'reg' ? '<label class="f">Takım davet kodu<input type="text" name="code" autocapitalize="characters" required><span class="muted" style="font-weight:500">Kodu takım yöneticisinden al.</span></label>' : ''}
    <div class="err" id="authErr"></div>
    <button class="btn pri block" type="submit">${mode === 'login' ? 'Giriş yap' : 'Hesap oluştur'}</button></form></div></div>`;
  v.querySelectorAll('.seg button').forEach(b => b.onclick = () => showAuth(b.dataset.m));
  $('#authF').onsubmit = async e => {
    e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target)); const btn = e.target.querySelector('button[type=submit]'); btn.disabled = true;
    try { await api(mode === 'login' ? '/auth/login' : '/auth/register', { method: 'POST', body: fd }); await start(); }
    catch (err) { $('#authErr').textContent = err.message; btn.disabled = false; }
  };
}
async function start() {
  if (!sb) { $('#authView').classList.remove('hide'); $('#authView').innerHTML = '<div class="auth-box card"><h2 class="st">Kurulum eksik</h2><p class="sub">config.js dosyasına Supabase adresini ve anahtarını yaz (README adım 3).</p></div>'; return; }
  try { await loadAll(); } catch (e) { showAuth(); if (e.message === 'removed') toast('Hesabın takımdan çıkarılmış. Yöneticiyle görüş.'); return; }
  $('#authView').classList.add('hide'); $('#appView').classList.remove('hide');
  $('#newMatch').classList.toggle('hide', !isAdmin());
  route();
}

/* ---------- yönlendirme ---------- */
const VIEWS = ['home', 'matches', 'lineup', 'feed', 'squad', 'me']; let curV = 'home';
function route() {
  const h = location.hash.slice(1).split('/'); let v = h[0];
  if (v === 'match') { v = 'matches'; setTimeout(() => h[1] && matchDetail(h[1]), 50); }
  if (!VIEWS.includes(v)) v = 'home';
  curV = v; VIEWS.forEach(x => $('#v-' + x).classList.toggle('on', x === v));
  document.querySelectorAll('nav.tabs a').forEach(a => a.setAttribute('aria-current', a.dataset.v === v ? 'page' : 'false'));
  render();
  if (v === 'feed' && h[1]) setTimeout(() => { const el = document.getElementById('post-' + h[1]); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
}
function render() { const b = $('#meBtn'); if (b && ME) b.innerHTML = avatar(ME, 's'); ({ home: renderHome, matches: renderMatches, lineup: renderLineupView, feed: renderFeed, squad: renderSquad, me: renderMe })[curV](); }
$('#meBtn').onclick = () => { location.hash = 'me'; };
let luId = null;
function renderLineupView() {
  const seen = new Set(), list = [...upcoming(), ...pending(), ...played()].filter(m => !seen.has(m.id) && seen.add(m.id));
  const sel = $('#luSel');
  if (!list.length) { sel.classList.add('hide'); $('#luSub').textContent = ''; $('#luBody').innerHTML = `<div class="card empty-m"><b>Henüz maç yok</b><p class="sub">Maç oluşturulunca kadrosu burada görünür.</p>${isAdmin() ? '<button class="btn pri" id="luNew" style="margin-top:12px">+ Maç oluştur</button>' : ''}</div>`; const n = $('#luNew'); if (n) n.onclick = () => editMatch(null); return; }
  sel.classList.remove('hide');
  const m = list.find(x => x.id === luId) || nextMatch() || list[0]; luId = m.id;
  sel.innerHTML = list.map(x => `<option value="${x.id}" ${x.id === m.id ? 'selected' : ''}>${esc(fShort(when(x)))}: ${esc(opp(x))}${x.result ? ` (${x.result.us}-${x.result.them})` : x === nextMatch() ? ' (sıradaki)' : ''}</option>`).join('');
  sel.onchange = () => { luId = sel.value; renderLineupView(); };
  $('#luSub').textContent = `GOLDNOVA – ${opp(m)}, ${fDate(when(m))} ${m.time}`;
  const inLu = new Set(((m.lineup && m.lineup.slots) || []).filter(Boolean)), g = going(m), bench = g.filter(u => !inLu.has(u.id));
  const left = m.lineup ? `<div class="pitch">${pitchHTML(m, false).html}</div>` : `<div class="card empty-m"><b>Kadro henüz açıklanmadı</b><p class="sub">${isAdmin() ? 'Gelenlerden kadroyu kur, herkese bildirim gitsin.' : 'Yönetici kadroyu kurunca burada görünecek ve bildirim gelecek.'}</p>${isAdmin() ? '<button class="btn pri" id="luKur" style="margin-top:12px">Kadroyu kur</button>' : ''}</div>`;
  $('#luBody').innerHTML = `<div>${left}</div><div class="col">
    <div class="card lu-info"><h2 class="st" style="margin-bottom:4px">${esc(m.saha)}</h2><span class="muted">${esc(fDate(when(m)))}, ${esc(m.time)}${m.lineup ? ', taktik ' + esc(m.lineup.form) : ''}</span>
     <div class="row" style="margin-top:8px">${isAdmin() ? `<button class="btn pri" id="luEdit">${m.lineup ? 'Kadroyu düzenle' : 'Kadroyu kur'}</button>` : ''}<button class="btn wa" id="luWa">WhatsApp’ta paylaş</button><button class="btn" id="luDet">Maç detayı</button></div></div>
    <div class="card"><h2 class="st" style="margin-bottom:8px">Gelenler (${g.length}/${m.format})</h2>${g.length ? `<div class="pl">${g.map(u => `<div class="pr" style="grid-template-columns:auto 1fr auto">${avatar(u, 's')}<button class="n" data-prof="${u.id}" style="border:none;background:none;text-align:left;padding:0"><b>${esc(u.name)}</b><small>${POS[u.pos]}${u.num ? ', #' + esc(u.num) : ''}</small></button><span class="tag ${inLu.has(u.id) ? 'gel' : ''}">${inLu.has(u.id) ? 'İlk 7' : 'Yedek'}</span></div>`).join('')}</div>` : '<p class="sub">Henüz “Geliyorum” diyen yok.</p>'}</div>
    ${bench.length && m.lineup ? `<div class="card"><h2 class="st" style="margin-bottom:8px">Yedekler</h2><div class="bench">${bench.map(u => `<span>${esc(u.name)}</span>`).join('')}</div></div>` : ''}</div>`;
  bind($('#v-lineup'));
  const k = $('#luKur') || $('#luEdit'); if (k) k.onclick = () => lineupEditor(m);
  const e2 = $('#luEdit'); if (e2) e2.onclick = () => lineupEditor(m);
  $('#luWa').onclick = () => shareText(matchText(m)); $('#luDet').onclick = () => matchDetail(m.id);
}
window.addEventListener('hashchange', () => { if (!ME) return; route(); });
async function refresh() { if (!ME || document.hidden) return; try { await loadAll(); if (!dlg.open) render(); } catch { } }
document.addEventListener('visibilitychange', refresh);
setInterval(refresh, 60e3);

/* ---------- sheet ---------- */
const dlg = $('#dlg');
function sheet(html, ready, title) {
  $('#dlb').innerHTML = (title ? `<div class="dh"><h3>${title}</h3><button class="x" data-close aria-label="Kapat">×</button></div>` : '') + html;
  $('#dlb').querySelectorAll('[data-close]').forEach(b => b.onclick = () => dlg.close());
  if (!dlg.open) dlg.showModal(); $('#dlb').scrollTop = 0; ready && ready($('#dlb'));
}
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { $('#dlb').querySelectorAll('video').forEach(v => v.pause()); if (location.hash.startsWith('#match/')) history.replaceState(null, '', '#matches'); render(); });
function bind(root) {
  root.querySelectorAll('[data-prof]').forEach(b => b.onclick = e => { e.stopPropagation(); profile(b.dataset.prof); });
  root.querySelectorAll('[data-match]').forEach(b => b.onclick = () => matchDetail(b.dataset.match));
}

/* ---------- bildirim ---------- */
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
function b64(s) { const p = '='.repeat((4 - s.length % 4) % 4); const r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from([...r].map(c => c.charCodeAt(0))); }
async function pushState() { if (!pushSupported()) return 'unsupported'; if (Notification.permission === 'denied') return 'denied'; try { const reg = await navigator.serviceWorker.ready; const s = await reg.pushManager.getSubscription(); return s ? 'on' : 'off'; } catch { return 'off'; } }
async function enablePush() {
  if (!PUSHKEY) { toast('config.js içinde bildirim anahtarı eksik (README adım 5)'); return false; }
  if (!pushSupported()) { toast(isIOS() ? 'iPhone’da önce Paylaş > Ana Ekrana Ekle, sonra uygulamadan aç' : 'Bu tarayıcı bildirim desteklemiyor'); return false; }
  const perm = await Notification.requestPermission(); if (perm !== 'granted') { toast('Bildirim izni verilmedi'); return false; }
  try {
    const reg = await navigator.serviceWorker.ready; let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(PUSHKEY) });
    await api('/push/subscribe', { method: 'POST', body: { subscription: sub.toJSON() } });
    if (ME.notifyPush === false) ME = (await api('/me', { method: 'PUT', body: { notifyPush: true } })).me;
    toast('Bildirimler açıldı'); return true;
  } catch (e) { toast('Bildirim açılamadı: ' + e.message); return false; }
}
async function disablePush() { try { const reg = await navigator.serviceWorker.ready; const s = await reg.pushManager.getSubscription(); if (s) { await api('/push/unsubscribe', { method: 'POST', body: { endpoint: s.endpoint } }); await s.unsubscribe(); } } catch { } }

/* ---------- ANA SAYFA ---------- */
async function renderHome() {
  const m = nextMatch(), C = calc(), last = played()[0];
  let L = `<p class="hello">Merhaba ${esc(ME.name.split(' ')[0])} 👋</p><div id="pushBan"></div>`;
  if (m) {
    const g = going(m), my = st(m, ME.id), per = g.length ? m.ucret / g.length : 0;
    L += `<article class="card nm">
     <div class="nm-h"><span class="lbl">Sıradaki maç</span><span class="muted">${esc(fDate(when(m)))}</span></div>
     <div class="nm-b"><div class="tm"><span class="tbg">${CREST}</span><b>GOLDNOVA</b></div><div class="ctr"><div class="time">${esc(m.time)}</div><div class="cd">${m.format}’e ${m.format}${m.kayit ? ', 🎥 kayıtlı' : ''}</div></div><div class="tm"><span class="tbg">${jersey(OPP)}</span><b>${esc(opp(m))}</b></div></div>
     <div class="cdb" id="cdb"></div>
     <div class="rsvp" id="rsvp">${[['gel', 'Geliyorum'], ['belki', 'Belki'], ['yok', 'Gelemiyorum']].map(([k, l]) => `<button class="${k}" data-st="${k}" aria-pressed="${my === k}">${l}</button>`).join('')}</div>
     <button class="avs" data-match="${m.id}" style="border:none;background:none;width:100%;text-align:left"><span class="stk">${g.slice(0, 7).map(u => avatar(u, 's')).join('')}</span><small>${g.length}/${m.format} kişi geliyor${g.length >= m.format ? ', kadro tamam' : ''}</small></button>
     <a class="venue" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.saha + ' ' + m.adres)}" target="_blank" rel="noopener">${IC.pin}<span><b>${esc(m.saha)}</b><small>${esc(m.adres)}</small></span><em class="vt">Yol tarifi</em></a>
     <div class="nm-f"><div><b>${tl(per)}</b><small>Kişi başı</small></div><div><b>${g.length}/${m.format}</b><small>Katılım</small></div><button data-match="${m.id}" style="border:none;background:none;border-left:1px solid var(--line)"><b style="display:block;font-stretch:80%;font-weight:800;font-size:17px;color:var(--accent)">Detay</b><small class="muted">Kadro, liste</small></button></div>
    </article>`;
  } else {
    L += `<div class="card empty-m"><b>Planlanmış maç yok</b><p class="sub">Yeni maç eklendiğinde herkese bildirim ve e-posta gider.</p>${isAdmin() ? '<button class="btn pri" id="hNew" style="margin-top:12px">+ Maç oluştur</button>' : ''}</div>`;
  }
  if (last) L += lastCard(last);
  const vids = VIDEOS.slice(0, 4);
  let R = `<div class="card"><div class="sh"><h2 class="st">Son videolar</h2><a class="link" href="#feed">Akışa git</a></div>${vids.length ? `<div class="vgrid">${vids.map(thumb).join('')}</div>` : `<p class="sub">Henüz video yok. Golünü yükleyen ilk sen ol.</p><button class="btn pri" id="hUp" style="margin-top:10px">+ Video yükle</button>`}</div>`;
  const pend = pending(); if (isAdmin() && pend.length) R = `<div class="banner"><span>⚠️ ${pend.length} maçın sonucu girilmedi</span><button class="btn sm pri" data-match="${pend[0].id}">Sonucu gir</button></div>` + R;
  R += leaders(C);
  $('#homeL').innerHTML = L; $('#homeR').innerHTML = R;
  tick(); bind($('#v-home'));
  if (m) $('#rsvp').querySelectorAll('button').forEach(b => b.onclick = () => setRsvp(m, b.dataset.st));
  const hn = $('#hNew'); if (hn) hn.onclick = () => editMatch(null);
  const hu = $('#hUp'); if (hu) hu.onclick = () => upload();
  $('#homeR').querySelectorAll('.vth').forEach(b => b.onclick = () => { location.hash = 'feed/' + b.dataset.v; });
  const ps = await pushState(); const pb = $('#pushBan');
  if (pb && PUSHKEY && ps !== 'on' && ME.notifyPush !== false) {
    if (isIOS() && !standalone()) pb.innerHTML = `<div class="banner" style="margin-bottom:12px"><span>📲 Bildirim almak için Safari’de <b>Paylaş</b> > <b>Ana Ekrana Ekle</b>’ye dokun, uygulamayı oradan aç.</span></div>`;
    else if (ps === 'off') { pb.innerHTML = `<div class="banner" style="margin-bottom:12px"><span>🔔 Yeni maç ve gol videolarından haberdar ol</span><button class="btn sm gold" id="pbOn">Bildirimleri aç</button></div>`; $('#pbOn').onclick = async () => { if (await enablePush()) pb.innerHTML = ''; }; }
  }
}
function lastCard(m) {
  const r = m.result, sc = Object.entries(r.goals).map(([id, v]) => { const p = byId(id); return p ? esc(p.name) + (v > 1 ? ` (${v})` : '') : ''; }).filter(Boolean).join(', ');
  const nv = VIDEOS.filter(v => v.matchId === m.id).length;
  return `<button class="card lres" data-match="${m.id}"><div class="sh" style="margin-bottom:4px;width:100%"><h2 class="st">Son maç</h2><span class="muted" style="font-size:13px">${esc(fShort(when(m)))}${nv ? `, ▶ ${nv} video` : ''}</span></div>
   <div class="lres-b"><div class="tm"><span class="tbg" style="width:40px;height:40px">${CREST}</span><b>GOLDNOVA</b></div><div class="lres-s">${r.us} – ${r.them}<small>${r.us > r.them ? 'Galibiyet' : r.us < r.them ? 'Mağlubiyet' : 'Berabere'}</small></div><div class="tm"><span class="tbg" style="width:40px;height:40px">${jersey(OPP)}</span><b>${esc(opp(m))}</b></div></div>
   ${sc ? `<div class="sub" style="text-align:center;margin-top:8px">⚽ ${sc}</div>` : ''}</button>`;
}
function leaders(C) {
  const top = f => [...USERS].filter(u => f(C[u.id]) > 0).sort((a, b) => f(C[b.id]) - f(C[a.id]))[0];
  const g = top(s => s.goals), r = top(s => s.avg || 0), a = top(s => s.assists); if (!g && !r && !a) return '';
  const item = (p, v, l) => p ? `<button class="lr" data-prof="${p.id}" style="grid-template-columns:auto 1fr auto">${avatar(p, 's')}<span class="n"><b>${esc(p.name)}</b><small>${l}</small></span><span>${v}</span></button>` : '';
  const big = v => `<b class="x75" style="font-size:19px;font-weight:800">${v}</b>`;
  return `<div class="card"><div class="sh"><h2 class="st">Sezonun öne çıkanları</h2><a class="link" href="#squad">Kadro</a></div>${item(g, big(g ? C[g.id].goals : ''), 'Gol kralı')}${item(r, r ? rb(C[r.id].avg) : '', 'En yüksek ortalama puan')}${item(a, big(a ? C[a.id].assists : ''), 'Asist lideri')}</div>`;
}
function tick() {
  const el = $('#cdb'), m = nextMatch(); if (!el || !m) return; const ms = when(m) - new Date();
  if (ms <= 0) { const h = '<div class="cdmsg live">Maç başladı, kolay gelsin! ⚽</div>'; if (el.innerHTML !== h) el.innerHTML = h; return; }
  const s = Math.floor(ms / 1000), p = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60], L = ['gün', 'saat', 'dakika', 'saniye'];
  const h = p.map((v, i) => `<div><b>${String(v).padStart(2, '0')}</b><small>${L[i]}</small></div>`).join(''); if (el.innerHTML !== h) el.innerHTML = h;
}
setInterval(() => { if (curV === 'home') tick(); }, 1000);
async function setRsvp(m, s, uid) {
  try { const r = await api(`/matches/${m.id}/rsvp`, { method: 'POST', body: { status: s, userId: uid } }); upd(MATCHES, r.match); toast(uid ? 'Güncellendi' : ({ gel: 'Geliyorsun, görüşürüz ⚽', belki: 'Belki olarak işaretlendi', yok: 'Gelemiyorsun olarak işaretlendi' })[s]); if (dlg.open) matchDetail(m.id); else render(); }
  catch (e) { fail(e); }
}

/* ---------- MAÇLAR ---------- */
function mRow(m) {
  const d = when(m), r = m.result, res = r ? (r.us > r.them ? 'G' : r.us < r.them ? 'M' : 'B') : '';
  const nv = VIDEOS.filter(v => v.matchId === m.id).length;
  return `<button class="mr" data-match="${m.id}"><span class="d"><b>${d.getDate()}</b><small>${d.toLocaleDateString('tr-TR', { month: 'short' })}</small></span>
   <span class="ts"><span class="${r && r.us > r.them ? 'w' : ''}">${CREST}GOLDNOVA</span><span class="${r && r.them > r.us ? 'w' : ''}">${jersey(OPP)}${esc(opp(m))}${nv ? `<small class="vtag">▶ ${nv}</small>` : ''}</span></span>
   ${r ? `<span class="sc"><span class="${r.us > r.them ? 'w' : ''}">${r.us}</span><span class="${r.them > r.us ? 'w' : ''}">${r.them}</span></span><span class="res ${res}">${res}</span>`
      : (when(m) < Date.now() - 2 * 3600e3 ? '<span class="status wait">Sonuç bekleniyor</span><span></span>' : `<span class="sc"><b class="x75" style="font-size:18px;font-weight:800">${esc(m.time)}</b><small class="muted">${going(m).length}/${m.format}</small></span><span></span>`)}</button>`;
}
function renderMatches() {
  const up = upcoming(), pe = pending(), pl = played(), r = record();
  $('#mSub').textContent = `${pl.length} maç oynandı`;
  let L = `<div class="card"><h2 class="st" style="margin-bottom:6px">Yaklaşan</h2>${up.length ? up.map(mRow).join('') : `<p class="sub">Planlanmış maç yok.${isAdmin() ? ' “+ Yeni maç” ile ekle, herkese bildirim gider.' : ''}</p>`}</div>`;
  if (pe.length) L += `<div class="card"><h2 class="st" style="margin-bottom:6px">Sonucu girilmeyenler</h2>${pe.map(mRow).join('')}</div>`;
  let html = '', last = ''; pl.forEach(m => { const mo = when(m).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }); if (mo !== last) { html += `<div class="mon">${mo}</div>`; last = mo; } html += mRow(m); });
  L += `<div class="card"><h2 class="st" style="margin-bottom:6px">Sonuçlar</h2>${html || '<p class="sub">Sonucu girilen maçlar burada listelenir.</p>'}</div>`;
  $('#mL').innerHTML = L;
  $('#mR').innerHTML = `<div class="card"><h2 class="st" style="margin-bottom:8px">Sezon karnesi</h2>${pl.length ? `<div class="kv"><div><b>${r.w}-${r.d}-${r.l}</b><small>G-B-M</small></div><div><b>${r.gf}:${r.ga}</b><small>Averaj</small></div><div><b>%${Math.round(r.w / pl.length * 100)}</b><small>Galibiyet</small></div></div><p class="sub" style="margin-top:10px">Son form</p><div class="form-row">${r.form.map(x => `<span class="res ${x}">${x}</span>`).join('')}</div>` : '<p class="sub">İlk sonuç girilince sezon karnesi oluşur.</p>'}</div>`;
  bind($('#v-matches'));
}
$('#newMatch').onclick = () => editMatch(null);

function pitchHTML(m, editable) {
  const lu = m.lineup || {}, fmt = Math.min(8, Math.max(5, m.format || 7)), forms = FORM[fmt], form = forms[lu.form] ? lu.form : Object.keys(forms)[0], sl = forms[form], C = calc();
  let h = `<svg class="ln" viewBox="0 0 180 300" preserveAspectRatio="none" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"><rect x="7" y="7" width="166" height="286" rx="2"/><line x1="7" y1="150" x2="173" y2="150"/><circle cx="90" cy="150" r="22"/><rect x="45" y="7" width="90" height="40"/><rect x="70" y="7" width="40" height="13"/><rect x="45" y="253" width="90" height="40"/><rect x="70" y="280" width="40" height="13"/></svg><span class="ptag B">🆚 ${esc(opp(m))}</span><span class="ptag A"><i style="background:#8B0F1A"></i>GOLDNOVA ${esc(form)}</span>`;
  sl.forEach(([x, y, r], i) => {
    const p = byId((lu.slots || [])[i]), av = p ? C[p.id].avg : null;
    h += `<${editable ? 'button' : 'div'} class="slot ${p ? '' : 'vac'}" style="left:${x * 100}%;top:${91 - y * 78}%" data-i="${i}">${jersey(i === 0 ? GK : KIT, p ? (p.num || ini(p.name)) : '+')}${av != null ? `<span class="rt">${av.toFixed(1)}</span>` : ''}<span class="pn">${p ? esc(p.name) : r}</span></${editable ? 'button' : 'div'}>`;
  });
  return { html: h, form, sl };
}
function matchDetail(id) {
  const m = MATCHES.find(x => x.id === id); if (!m) { toast('Maç bulunamadı'); return; }
  if (location.hash !== '#match/' + id) history.replaceState(null, '', '#match/' + id);
  const r = m.result, g = going(m), per = g.length ? m.ucret / g.length : 0, my = st(m, ME.id), vids = VIDEOS.filter(v => v.matchId === m.id);
  const groups = [['gel', 'Geliyor'], ['belki', 'Belki'], ['yok', 'Gelemiyor'], ['', 'Cevap vermedi']];
  const lists = groups.map(([k, l]) => { const us = USERS.filter(u => st(m, u.id) === k); return us.length ? `<div class="grp">${l} (${us.length})</div><div class="pl">${us.map(u => `<div class="pr">${avatar(u, 's')}<button class="n" data-prof="${u.id}" style="border:none;background:none;text-align:left;padding:0"><b>${esc(u.name)}</b><small>${POS[u.pos]}${u.num ? ', #' + esc(u.num) : ''}</small></button>${isAdmin() && !r ? `<select data-as="${u.id}" aria-label="${esc(u.name)} durumu" style="width:auto;padding:4px 6px;font-size:13px"><option value="" ${!k ? 'selected' : ''} disabled>–</option><option value="gel" ${k === 'gel' ? 'selected' : ''}>Geliyor</option><option value="belki" ${k === 'belki' ? 'selected' : ''}>Belki</option><option value="yok" ${k === 'yok' ? 'selected' : ''}>Gelemiyor</option></select><button class="pay" data-pay="${u.id}" aria-pressed="${m.paid.includes(u.id)}" ${k !== 'gel' ? 'disabled' : ''} aria-label="Ödedi">₺</button>` : `<span></span>${k === 'gel' && m.paid.includes(u.id) ? '<span class="tag gel">Ödedi</span>' : '<span></span>'}`}</div>`).join('')}</div>` : ''; }).join('');
  const pitch = m.lineup ? pitchHTML(m, false) : null;
  const side = () => { const gg = Object.entries(r.goals).map(([i, v]) => `<span>⚽ ${esc((byId(i) || {}).name || '?')}${v > 1 ? ' x' + v : ''}</span>`), aa = Object.entries(r.assists).map(([i, v]) => `<span class="muted">🅰 ${esc((byId(i) || {}).name || '?')}${v > 1 ? ' x' + v : ''}</span>`); return gg.concat(aa).join('') || '<span class="muted">Golcü girilmedi</span>'; };
  const rated = r ? (r.players || []).filter(byId).sort((a, b) => (r.ratings[b] ?? 0) - (r.ratings[a] ?? 0)) : [];
  sheet(`<div class="mh"><div class="dh" style="margin:0"><span style="font-size:13px;opacity:.75">${r ? 'Maç sonucu' : 'Maç'}${m.kayit ? ', 🎥 kamera kayıtlı saha' : ''}</span><button class="x" data-close aria-label="Kapat">×</button></div>
    <div class="mh-b"><div class="tm"><span class="tbg">${CREST}</span><b>GOLDNOVA</b></div>${r ? `<div class="score">${r.us} – ${r.them}</div>` : `<div class="time2">${esc(m.time)}<small>${esc(fShort(when(m)))}</small></div>`}<div class="tm"><span class="tbg">${jersey(OPP)}</span><b>${esc(opp(m))}</b></div></div>
    <div class="meta">${esc(fDate(when(m)))}, ${esc(m.saha)}</div></div>
   ${!r ? `<div class="sec"><div class="rsvp" style="padding:0" id="dRsvp">${[['gel', 'Geliyorum'], ['belki', 'Belki'], ['yok', 'Gelemiyorum']].map(([k, l]) => `<button class="${k}" data-st="${k}" aria-pressed="${my === k}">${l}</button>`).join('')}</div></div>` : ''}
   <div class="sec info"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.saha + ' ' + m.adres)}" target="_blank" rel="noopener">📍 ${esc(m.saha)}${m.adres ? ', ' + esc(m.adres) : ''}</a>
    <span>💸 Saha ${tl(m.ucret)}, kişi başı ${tl(per)} (${g.length} kişi)</span>${m.note ? `<span>📝 ${esc(m.note)}</span>` : ''}</div>
   ${r ? `<div class="sec"><h4>Goller ve asistler</h4><div class="gl" style="grid-template-columns:1fr"><div>${side()}</div></div></div>
    ${rated.length ? `<div class="sec"><h4>Oyuncu puanları</h4><div class="rl">${rated.map(i => `<div><span class="dot" style="background:#8B0F1A"></span><button data-prof="${i}" style="border:none;background:none;text-align:left;padding:0;font-weight:600">${esc(byId(i).name)}${r.mvp === i ? ' ⭐' : ''}</button><span class="muted" style="font-size:12.5px">${r.goals[i] ? '⚽' + r.goals[i] + ' ' : ''}${r.assists[i] ? '🅰' + r.assists[i] : ''}</span>${rb(r.ratings[i])}</div>`).join('')}</div></div>` : ''}` : ''}
   <div class="sec"><div class="sh"><h4 style="margin:0">Kadro</h4>${isAdmin() ? `<button class="link" id="dLu">${m.lineup ? 'Düzenle' : 'Kadroyu kur'}</button>` : ''}</div>${pitch ? `<div class="pitch" style="max-width:420px">${pitch.html}</div>` : '<p class="sub">Kadro henüz açıklanmadı.</p>'}</div>
   <div class="sec"><div class="sh"><h4 style="margin:0">Videolar (${vids.length})</h4><button class="link" id="dUp">+ Video yükle</button></div>${vids.length ? `<div class="vgrid">${vids.map(thumb).join('')}</div>` : `<p class="sub">${m.kayit ? 'Sosyal Halısaha kaydı yüklenince golleri kesip buraya ekleyebilirsiniz.' : 'Maçtan gol ya da kurtarış videosu yükleyin.'}</p>`}</div>
   <div class="sec"><h4>Katılım</h4>${lists}</div>
   <div class="row" style="margin-top:18px"><button class="btn wa" id="dWa">${IC.wa}WhatsApp’ta paylaş</button>${isAdmin() ? `${r ? '' : '<button class="btn pri" id="dRes">Sonucu gir</button>'}${r ? '<button class="btn" id="dRes">Sonucu düzenle</button>' : ''}<button class="btn" id="dEdit">Düzenle</button><button class="btn ghost danger" id="dDel">Sil</button>` : ''}</div>`,
  b => {
    bind(b);
    const rs = b.querySelector('#dRsvp'); if (rs) rs.querySelectorAll('button').forEach(x => x.onclick = () => setRsvp(m, x.dataset.st));
    b.querySelectorAll('[data-as]').forEach(s => s.onchange = () => setRsvp(m, s.value, s.dataset.as));
    b.querySelectorAll('[data-pay]').forEach(x => x.onclick = async () => { try { const j = await api(`/matches/${m.id}/paid`, { method: 'POST', body: { userId: x.dataset.pay } }); upd(MATCHES, j.match); matchDetail(m.id); } catch (e) { fail(e); } });
    b.querySelectorAll('.vth').forEach(x => x.onclick = () => { dlg.close(); location.hash = 'feed/' + x.dataset.v; });
    b.querySelector('#dUp').onclick = () => upload(m.id);
    b.querySelector('#dWa').onclick = () => shareText(r ? resultText(m) : matchText(m));
    const lu = b.querySelector('#dLu'); if (lu) lu.onclick = () => lineupEditor(m);
    const re = b.querySelector('#dRes'); if (re) re.onclick = () => resultEditor(m);
    const ed = b.querySelector('#dEdit'); if (ed) ed.onclick = () => editMatch(m);
    const de = b.querySelector('#dDel'); if (de) de.onclick = async () => { if (!confirm('Maç silinsin mi? Maça ait videolar da silinir.')) return; try { await api('/matches/' + m.id, { method: 'DELETE' }); MATCHES = MATCHES.filter(x => x.id !== m.id); VIDEOS = VIDEOS.filter(v => v.matchId !== m.id); dlg.close(); toast('Maç silindi'); } catch (e) { fail(e); } };
  });
}
function shareText(t) { window.open('https://wa.me/?text=' + encodeURIComponent(t), '_blank', 'noopener'); }
function matchText(m) {
  const g = going(m), per = g.length ? m.ucret / g.length : 0;
  let t = `⭐ GOLDNOVA United maç günü\n🆚 ${opp(m)}\n📅 ${fDate(when(m))}, saat ${m.time}\n🏟 ${m.saha}${m.adres ? '\n📍 ' + m.adres : ''}\n\n✅ Gelenler (${g.length}/${m.format}): ${g.map(u => u.name).join(', ') || '-'}`;
  if (m.lineup) { const fm = FORM[Math.min(8, Math.max(5, m.format))], sl = fm[m.lineup.form] || Object.values(fm)[0], by = { KL: [], DEF: [], OS: [], FV: [] }; sl.forEach(([, , r], i) => { const p = byId(m.lineup.slots[i]); if (p) by[r].push(p.name); }); t += '\n\n📋 Kadro (' + m.lineup.form + ')\n' + Object.entries(by).filter(([, a]) => a.length).map(([r, a]) => `${({ KL: '🧤', DEF: '🛡', OS: '🎯', FV: '⚡' })[r]} ${a.join(', ')}`).join('\n'); }
  return t + `\n\n💸 Kişi başı ${tl(per)}\n👉 ${BASE}#match/${m.id}`;
}
function resultText(m) {
  const r = m.result, nm = o => Object.entries(o).map(([id, v]) => { const p = byId(id); return p ? p.name + (v > 1 ? ` (${v})` : '') : ''; }).filter(Boolean).join(', ');
  const best = Object.entries(r.ratings).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, v]) => { const p = byId(id); return p ? `${p.name} ${v.toFixed(1)}` : ''; }).filter(Boolean).join(', ');
  return `⭐ GOLDNOVA ${r.us} – ${r.them} ${opp(m)}\n🏟 ${m.saha}, ${fShort(when(m))}` + (nm(r.goals) ? `\n⚽ ${nm(r.goals)}` : '') + (nm(r.assists) ? `\n🅰️ ${nm(r.assists)}` : '') + (byId(r.mvp) ? `\n🏅 Maçın adamı: ${byId(r.mvp).name}` : '') + (best ? `\n📊 ${best}` : '') + `\n👉 ${BASE}#match/${m.id}`;
}
function editMatch(m) {
  const isNew = !m, d = new Date(); d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7 || 7));
  const last = [...MATCHES].sort((a, b) => b.created.localeCompare(a.created))[0] || {};
  const v = m || { date: d.toISOString().slice(0, 10), time: last.time || '21:00', saha: last.saha || '', adres: last.adres || '', opp: '', format: last.format || 7, ucret: last.ucret || 0, note: '', kayit: !!last.kayit };
  sheet(`<form class="form" id="mf">
   <label class="f full">Rakip adı (isteğe bağlı)<input type="text" name="opp" value="${esc(v.opp)}" placeholder="Boş kalırsa Rakip yazar" maxlength="40"></label>
   <label class="f">Tarih<input type="date" name="date" value="${esc(v.date)}" required></label>
   <label class="f">Saat<input type="time" name="time" value="${esc(v.time)}" required></label>
   <label class="f full">Saha<input type="text" name="saha" value="${esc(v.saha)}" placeholder="Örn. Yıldız Halısaha" required></label>
   <label class="f full">Adres<input type="text" name="adres" value="${esc(v.adres)}"></label>
   <label class="f">Format<select name="format">${[5, 6, 7, 8].map(f => `<option value="${f}" ${f == v.format ? 'selected' : ''}>${f}’e ${f}</option>`).join('')}</select></label>
   <label class="f">Saha ücreti (₺)<input type="number" name="ucret" min="0" value="${v.ucret}"></label>
   <label class="f full">Not<input type="text" name="note" value="${esc(v.note)}" maxlength="300" placeholder="Örn. Krampon yasak, 20:45’te sahada olun"></label>
   <label class="full chk"><input type="checkbox" name="kayit" ${v.kayit ? 'checked' : ''}> Bu sahada maçlar Sosyal Halısaha’da kaydediliyor</label>
   <label class="full chk"><input type="checkbox" name="notify" ${isNew ? 'checked' : ''}> ${isNew ? 'Herkese bildirim ve e-posta gönder' : 'Değişikliği e-postayla da bildir'}</label>
   <div class="full row" style="justify-content:flex-end;margin-top:6px"><button class="btn" type="button" data-close>Vazgeç</button><button class="btn pri" type="submit">${isNew ? 'Maçı oluştur' : 'Kaydet'}</button></div></form>`,
  b => {
    b.querySelector('[data-close]').onclick = () => dlg.close();
    b.querySelector('#mf').onsubmit = async e => {
      e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)); f.kayit = !!f.kayit; f.notify = !!f.notify; const btn = e.target.querySelector('[type=submit]'); btn.disabled = true;
      try { const j = await api(isNew ? '/matches' : '/matches/' + m.id, { method: isNew ? 'POST' : 'PUT', body: f }); upd(MATCHES, j.match); toast(isNew ? (f.notify ? 'Maç oluşturuldu, herkese bildirildi' : 'Maç oluşturuldu') : 'Maç güncellendi'); matchDetail(j.match.id); }
      catch (er) { fail(er); btn.disabled = false; }
    };
  }, isNew ? 'Yeni maç' : 'Maçı düzenle');
}
function lineupEditor(m) {
  const fmt = Math.min(8, Math.max(5, m.format || 7)), forms = FORM[fmt];
  let form = m.lineup && forms[m.lineup.form] ? m.lineup.form : Object.keys(forms)[0], slots = [...((m.lineup && m.lineup.slots) || [])];
  const fit = () => { const n = forms[form].length; slots = slots.slice(0, n); while (slots.length < n) slots.push(null); }; fit();
  let sel = null;
  const draw = () => {
    const tmp = { ...m, lineup: { form, slots } }, p = pitchHTML(tmp, true);
    sheet(`<div class="fg" style="grid-template-columns:1fr auto;margin-bottom:10px"><label class="f">Taktik<select id="luF">${Object.keys(forms).map(k => `<option ${k === form ? 'selected' : ''}>${k}</option>`).join('')}</select></label><button class="btn" id="luAuto" style="align-self:end">En iyi 7’yi diz</button></div>
     <div class="pitch" style="max-width:420px">${p.html}</div><p class="hint">${sel != null ? 'Gideceği yere dokun ya da aynı formaya tekrar dokunup oyuncu seç.' : 'Boş yere dokunup oyuncu seç, dolu formaya dokunup yer değiştir.'}</p>
     <label class="chk" style="margin-top:10px"><input type="checkbox" id="luN" ${m.lineup ? '' : 'checked'}> Kadro açıklandı diye herkese bildirim gönder</label>
     <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" id="luBack">Geri</button><button class="btn pri" id="luSave">Kadroyu kaydet</button></div>`,
    b => {
      b.querySelector('#luF').onchange = e => { form = e.target.value; fit(); draw(); };
      b.querySelector('#luAuto').onclick = () => {
        const pool = going(m).sort((a, c) => ovr(c) - ovr(a)), sl = forms[form], res = Array(sl.length).fill(null);
        sl.forEach((s, i) => { const k = pool.findIndex(p => p.pos === s[2]); if (k > -1) { res[i] = pool[k].id; pool.splice(k, 1); } });
        pool.sort((a, c) => (a.pos === 'KL') - (c.pos === 'KL')); sl.forEach((s, i) => { if (!res[i] && pool.length) res[i] = pool.shift().id; });
        if (!going(m).length) toast('Önce oyuncular “Geliyorum” demeli'); slots = res; draw();
      };
      b.querySelectorAll('.slot').forEach(s => s.onclick = () => {
        const i = +s.dataset.i;
        if (sel != null) { if (sel === i) { sel = null; pick(i); return; } [slots[sel], slots[i]] = [slots[i], slots[sel]]; sel = null; draw(); return; }
        if (!slots[i]) { pick(i); return; } sel = i; draw();
      });
      b.querySelector('#luBack').onclick = () => matchDetail(m.id);
      b.querySelector('#luSave').onclick = async () => { try { const j = await api(`/matches/${m.id}/lineup`, { method: 'PUT', body: { form, slots, notify: b.querySelector('#luN').checked } }); upd(MATCHES, j.match); toast('Kadro kaydedildi'); matchDetail(m.id); } catch (e) { fail(e); } };
    }, 'Kadroyu kur');
  };
  const pick = i => {
    const role = forms[form][i][2], o = { gel: 0, belki: 1, '': 2, yok: 3 };
    const list = [...USERS].sort((a, b) => o[st(m, a.id)] - o[st(m, b.id)] || ((b.pos === role) - (a.pos === role)) || ovr(b) - ovr(a));
    sheet(`<div class="pk">${slots[i] ? '<button data-id=""><span class="av s" style="background:var(--s2);color:var(--muted)">×</span><span>Pozisyonu boşalt</span><span></span></button>' : ''}${list.map(p => `<button data-id="${p.id}">${avatar(p, 's')}<span><b>${esc(p.name)}</b><small>${POS[p.pos]}, güç ${ovr(p)}</small></span><span class="tag ${st(m, p.id)}">${slots.includes(p.id) ? 'Kadroda' : ({ gel: 'Geliyor', belki: 'Belki', yok: 'Gelemiyor', '': 'Cevapsız' })[st(m, p.id)]}</span></button>`).join('')}</div>`,
      b => b.querySelectorAll('.pk button').forEach(x => x.onclick = () => { const id = x.dataset.id || null; if (id) slots = slots.map(v => v === id ? null : v); slots[i] = id; draw(); }), `${POS[role]} seç`);
  };
  draw();
}
function resultEditor(m) {
  const r = m.result || {}, gk0 = m.lineup && m.lineup.slots && m.lineup.slots[0];
  let ps = new Set(r.players || (m.lineup ? m.lineup.slots.filter(Boolean) : going(m).map(u => u.id)));
  const gl = { ...(r.goals || {}) }, as = { ...(r.assists || {}) }, rt = { ...(r.ratings || {}) }, manual = {}; Object.keys(rt).forEach(k => manual[k] = true);
  let us = r.us ?? 0, them = r.them ?? 0, mvp = r.mvp || '', touched = !!m.result;
  const auto = () => { ps.forEach(id => { if (manual[id]) return; let v = 6.5 + (us > them ? .5 : us < them ? -.3 : 0) + (gl[id] || 0) * .9 + (as[id] || 0) * .6 + (mvp === id ? .5 : 0); const isGK = gk0 ? gk0 === id : (byId(id) || {}).pos === 'KL'; if (isGK) v += them === 0 ? 1 : -Math.min(1, them * .15); rt[id] = Math.max(3, Math.min(10, r1(v))); }); };
  const step = (k, id, v) => `<span class="stp"><button data-k="${k}" data-id="${id}" data-d="-1" aria-label="azalt">−</button><b>${v}</b><button data-k="${k}" data-id="${id}" data-d="1" aria-label="artır">+</button></span>`;
  const draw = () => {
    if (!touched) us = [...ps].reduce((s, id) => s + (gl[id] || 0), 0); auto();
    const list = USERS.filter(u => ps.has(u.id));
    sheet(`<div class="si"><div><div class="l">${CREST}GOLDNOVA</div><input type="number" id="rUs" min="0" value="${us}"></div><b class="x75" style="font-size:30px;padding-bottom:12px">–</b><div><div class="l">${jersey(OPP)}${esc(opp(m))}</div><input type="number" id="rThem" min="0" value="${them}"></div></div>
     <h4 style="margin:12px 0 6px">Oynayanlar</h4><div class="who">${USERS.map(u => `<button data-p="${u.id}" aria-pressed="${ps.has(u.id)}">${avatar(u, 's')}${esc(u.name)}</button>`).join('')}</div>
     ${list.length ? `<div class="er" style="border:none;padding-bottom:0;margin-top:10px"><span></span><small>Gol</small><small>Asist</small><small>Puan</small></div>` + list.map(u => `<div class="er"><span class="n">${esc(u.name)}</span>${step('g', u.id, gl[u.id] || 0)}${step('a', u.id, as[u.id] || 0)}${step('r', u.id, (rt[u.id] ?? 6.5).toFixed(1))}</div>`).join('') : '<p class="sub">Oynayanları seç.</p>'}
     <label class="f" style="margin-top:12px">Maçın adamı<select id="rMvp"><option value="">Seçilmedi</option>${list.map(u => `<option value="${u.id}" ${mvp === u.id ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select></label>
     <p class="sub" style="margin-top:8px">Puanlar gol, asist ve sonuca göre otomatik hesaplanır, istersen ± ile değiştir. Kaydedince herkese sonuç bildirimi gider.</p>
     <div class="row" style="justify-content:space-between;margin-top:14px">${m.result ? '<button class="btn ghost danger" id="rDel">Sonucu sil</button>' : '<span></span>'}<div class="row"><button class="btn" id="rBack">Geri</button><button class="btn pri" id="rSave">Kaydet</button></div></div>`,
    b => {
      b.querySelector('#rUs').oninput = e => { us = +e.target.value || 0; touched = true; auto(); };
      b.querySelector('#rThem').oninput = e => { them = +e.target.value || 0; };
      b.querySelector('#rThem').onchange = () => draw(); b.querySelector('#rUs').onchange = () => draw();
      b.querySelector('#rMvp').onchange = e => { mvp = e.target.value; draw(); };
      b.querySelectorAll('.who button').forEach(x => x.onclick = () => { const id = x.dataset.p; ps.has(id) ? ps.delete(id) : ps.add(id); draw(); });
      b.querySelectorAll('.stp button').forEach(x => x.onclick = () => {
        const id = x.dataset.id, k = x.dataset.k, d = +x.dataset.d;
        if (k === 'r') { manual[id] = true; rt[id] = Math.max(1, Math.min(10, r1((rt[id] ?? 6.5) + d * .5))); }
        else { const o = k === 'g' ? gl : as; o[id] = Math.max(0, (o[id] || 0) + d); }
        draw();
      });
      b.querySelector('#rBack').onclick = () => matchDetail(m.id);
      const del = b.querySelector('#rDel'); if (del) del.onclick = async () => { if (!confirm('Sonuç silinsin mi?')) return; try { const j = await api(`/matches/${m.id}/result`, { method: 'DELETE' }); upd(MATCHES, j.match); matchDetail(m.id); } catch (e) { fail(e); } };
      b.querySelector('#rSave').onclick = async () => {
        auto(); const players = [...ps], pick = o => Object.fromEntries(Object.entries(o).filter(([k]) => ps.has(k)));
        try { const j = await api(`/matches/${m.id}/result`, { method: 'PUT', body: { us, them, players, goals: pick(gl), assists: pick(as), ratings: pick(rt), mvp: ps.has(mvp) ? mvp : null } }); upd(MATCHES, j.match); toast('Sonuç kaydedildi'); matchDetail(m.id); }
        catch (e) { fail(e); }
      };
    }, 'Maç sonucu');
  };
  draw();
}

/* ---------- AKIŞ (videolar) ---------- */
let feedF = 'all';
const ytId = u => { const m = String(u || '').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/); return m ? m[1] : null; };
function media(v) {
  const yt = ytId(v.file);
  if (yt) return `<div style="position:relative;aspect-ratio:16/9;background:#000"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="Video" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;
  if (v.path) return `<video src="${esc(v.file)}" controls playsinline preload="metadata"></video>`;
  return `<a class="btn pri" href="${esc(v.file)}" target="_blank" rel="noopener" style="margin:0 14px">▶ Videoyu aç</a>`;
}
function thumb(v) { const p = byId(v.scorer || v.userId), yt = ytId(v.file); if (!v.path) return `<button class="vth" data-v="${v.id}">${yt ? `<img src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt="" style="width:100%;height:100%;object-fit:cover">` : ''}<i>▶</i><span>${esc(TAGS[v.tag] || 'Video')}${p ? ': ' + esc(p.name) : ''}</span></button>`; return `<button class="vth" data-v="${v.id}"><video src="${esc(v.file)}#t=0.5" preload="metadata" muted playsinline></video><i>▶</i><span>${esc(TAGS[v.tag] || 'Video')}${p ? ': ' + esc(p.name) : ''}</span></button>`; }
function postHTML(v) {
  const u = byId(v.userId), m = MATCHES.find(x => x.id === v.matchId), sc = byId(v.scorer), liked = v.likes.includes(ME.id), mine = v.userId === ME.id || isAdmin();
  return `<article class="card post" id="post-${v.id}">
   <div class="post-h">${avatar(u, 'm')}<div class="n"><b>${esc(u ? u.name : 'Silinmiş üye')}</b><small>${m ? `GOLDNOVA – ${esc(opp(m))}, ${esc(fShort(when(m)))}` : 'Maç seçilmedi'}, ${rel(v.created)}</small></div>${mine ? `<button class="btn sm ghost danger" data-del="${v.id}">Sil</button>` : ''}</div>
   ${media(v)}
   <div class="post-b"><span class="tg">${esc(TAGS[v.tag] || 'Video')}</span>${sc ? `<b>${esc(sc.name)}</b> ` : ''}${esc(v.caption)}</div>
   <div class="post-a"><button data-like="${v.id}" aria-pressed="${liked}" aria-label="Beğen">${liked ? IC.heartF : IC.heart}${v.likes.length || ''}</button><button data-focus="${v.id}" aria-label="Yorum yap">${IC.cmt}${v.comments.length || ''}</button><button data-wa="${v.id}" aria-label="Paylaş">${IC.share}</button></div>
   ${v.likes.length ? `<div class="cmts" style="padding-bottom:4px"><small class="muted">${v.likes.slice(0, 3).map(id => esc((byId(id) || {}).name || '')).filter(Boolean).join(', ')}${v.likes.length > 3 ? ` ve ${v.likes.length - 3} kişi` : ''} beğendi</small></div>` : ''}
   <div class="cmts">${v.comments.map(c => { const cu = byId(c.userId); return `<p><b>${esc(cu ? cu.name : '?')}</b>${esc(c.text)}${c.userId === ME.id || isAdmin() ? ` <button class="del" data-dc="${v.id}|${c.id}">sil</button>` : ''}</p>`; }).join('')}</div>
   <form class="cmt-in" data-cf="${v.id}"><input type="text" placeholder="Yorum yaz…" maxlength="400" aria-label="Yorum"><button class="btn sm pri">Gönder</button></form></article>`;
}
function renderFeed() {
  $('#feedF').innerHTML = [['all', 'Tümü'], ...Object.entries(TAGS)].map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${feedF === k}">${l}</button>`).join('');
  $('#feedF').querySelectorAll('.chip').forEach(b => b.onclick = () => { feedF = b.dataset.f; renderFeed(); });
  const list = VIDEOS.filter(v => feedF === 'all' || v.tag === feedF);
  $('#feed').innerHTML = list.length ? list.map(postHTML).join('') : '<div class="empty">Henüz video yok. Gol, kurtarış ya da komik bir anı ilk sen paylaş.</div>';
  bindFeed($('#feed'));
}
function bindFeed(root) {
  root.querySelectorAll('[data-like]').forEach(b => b.onclick = async () => { try { const j = await api(`/videos/${b.dataset.like}/like`, { method: 'POST' }); upd(VIDEOS, j.video); redrawPost(j.video); } catch (e) { fail(e); } });
  root.querySelectorAll('[data-focus]').forEach(b => b.onclick = () => root.querySelector(`[data-cf="${b.dataset.focus}"] input`).focus());
  root.querySelectorAll('[data-wa]').forEach(b => b.onclick = () => { const v = VIDEOS.find(x => x.id === b.dataset.wa), p = byId(v.scorer || v.userId); shareText(`🎥 GOLDNOVA United | ${TAGS[v.tag]}${p ? ': ' + p.name : ''}${v.caption ? '\n' + v.caption : ''}\n👉 ${BASE}#feed/${v.id}`); });
  root.querySelectorAll('[data-cf]').forEach(f => f.onsubmit = async e => { e.preventDefault(); const inp = f.querySelector('input'), t = inp.value.trim(); if (!t) return; try { const j = await api(`/videos/${f.dataset.cf}/comments`, { method: 'POST', body: { text: t } }); upd(VIDEOS, j.video); redrawPost(j.video); } catch (er) { fail(er); } });
  root.querySelectorAll('[data-dc]').forEach(b => b.onclick = async () => { const [vid, cid] = b.dataset.dc.split('|'); try { const j = await api(`/videos/${vid}/comments/${cid}`, { method: 'DELETE' }); upd(VIDEOS, j.video); redrawPost(j.video); } catch (e) { fail(e); } });
  root.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (!confirm('Video silinsin mi?')) return; try { await api('/videos/' + b.dataset.del, { method: 'DELETE' }); VIDEOS = VIDEOS.filter(x => x.id !== b.dataset.del); toast('Video silindi'); render(); } catch (e) { fail(e); } });
  bind(root);
}
function redrawPost(v) { const el = document.getElementById('post-' + v.id); if (!el) return; const vid = el.querySelector('video, iframe'), playing = vid && vid.tagName === 'VIDEO' && !vid.paused; const tmp = document.createElement('div'); tmp.innerHTML = postHTML(v); const nw = tmp.firstElementChild; const nv = nw.querySelector('video, iframe'); if (vid && nv) nv.replaceWith(vid); el.replaceWith(nw); if (playing) vid.play().catch(() => { }); bindFeed(nw.parentElement); }
$('#upBtn').onclick = () => upload();
function upload(matchId) {
  const ms = [...MATCHES].sort((a, b) => when(b) - when(a)).filter(m => m.result || when(m) < Date.now() + 864e5 || m.id === matchId).slice(0, 20);
  const def = matchId || (ms[0] && ms[0].id) || '';
  sheet(`<form class="form" id="uf">
   <label class="f full">Video dosyası (en fazla 50 MB)<input type="file" name="video" accept="video/*"></label>
   <label class="f full">ya da video linki<input type="text" name="link" inputmode="url" placeholder="YouTube, Instagram ya da Sosyal Halısaha linki"></label>
   <label class="f full">Maç<select name="matchId"><option value="">Maç seçme</option>${ms.map(m => `<option value="${m.id}" ${m.id === def ? 'selected' : ''}>${esc(fShort(when(m)))}: GOLDNOVA – ${esc(opp(m))}${m.result ? ` (${m.result.us}-${m.result.them})` : ''}</option>`).join('')}</select></label>
   <label class="f">Tür<select name="tag">${Object.entries(TAGS).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></label>
   <label class="f">Kimin anı?<select name="scorer"><option value="">Seçme</option>${USERS.map(u => `<option value="${u.id}" ${u.id === ME.id ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select></label>
   <label class="f full">Açıklama<input type="text" name="caption" maxlength="280" placeholder="Örn. Köşeye frikik, kaleci bakakaldı 🔥"></label>
   <div class="full"><div class="prog hide" id="upP"><i></i></div><p class="sub" id="upT"></p></div>
   <div class="full row" style="justify-content:flex-end"><button class="btn" type="button" data-close>Vazgeç</button><button class="btn pri" type="submit">Yükle ve paylaş</button></div></form>`,
  b => {
    b.querySelector('[data-close]').onclick = () => dlg.close();
    b.querySelector('#uf').onsubmit = async e => {
      e.preventDefault(); const fd = new FormData(e.target), file = fd.get('video'), link = String(fd.get('link') || '').trim();
      const has = file && file.size;
      if (!has && !link) { toast('Bir video seç ya da link yapıştır'); return; }
      if (!has && !/^https?:\/\/\S+$/i.test(link)) { toast('Link https:// ile başlamalı'); return; }
      if (has && file.size > 50 * 1048576) { toast('Video 50 MB’tan büyük. Telefonda kırpıp tekrar dene ya da YouTube linki ekle.'); return; }
      const btn = e.target.querySelector('[type=submit]'); btn.disabled = true; const P = b.querySelector('#upP'), T = b.querySelector('#upT');
      const row = { match_id: fd.get('matchId') || null, user_id: ME.id, caption: String(fd.get('caption') || '').trim().slice(0, 280), tag: fd.get('tag'), scorer: fd.get('scorer') || null };
      const finish = async (url, path) => {
        try { const d = chk(await sb.from('videos').insert({ ...row, url, path }).select(VSEL).single()); const v = mapV(d); VIDEOS.unshift(v); notify('video', { id: v.id }); toast('Video paylaşıldı, takıma bildirildi'); dlg.close(); location.hash = 'feed/' + v.id; }
        catch (er) { fail(er); btn.disabled = false; }
      };
      if (!has) { finish(link, null); return; }
      P.classList.remove('hide');
      const ext = (file.name.split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5) || 'mp4', path = `${ME.id}/${Date.now()}.${ext}`;
      const { data: { session } } = await sb.auth.getSession();
      const x = new XMLHttpRequest(); x.open('POST', `${CFG.supabaseUrl}/storage/v1/object/videos/${path}`);
      x.setRequestHeader('Authorization', 'Bearer ' + session.access_token); x.setRequestHeader('apikey', CFG.supabaseAnonKey);
      x.setRequestHeader('Content-Type', file.type || 'video/mp4'); x.setRequestHeader('x-upsert', 'false');
      x.upload.onprogress = ev => { if (ev.lengthComputable) { const p = Math.round(ev.loaded / ev.total * 100); P.firstElementChild.style.width = p + '%'; T.textContent = `Yükleniyor %${p} (${(ev.loaded / 1048576).toFixed(1)} / ${(ev.total / 1048576).toFixed(1)} MB)`; } };
      x.onload = () => { if (x.status >= 200 && x.status < 300) finish(sb.storage.from('videos').getPublicUrl(path).data.publicUrl, path); else { let j = {}; try { j = JSON.parse(x.responseText); } catch { } toast(/size|large/i.test(j.message || j.error || '') ? 'Video çok büyük (en fazla 50 MB)' : /mime|type/i.test(j.message || '') ? 'Bu video formatı desteklenmiyor' : 'Video yüklenemedi'); btn.disabled = false; } };
      x.onerror = () => { toast('Bağlantı hatası, tekrar dene'); btn.disabled = false; };
      x.send(file);
    };
  }, 'Video yükle');
}

/* ---------- KADRO ---------- */
let posF = 'ALL', sqV = 'c', lbK = 'goals';
const BADGES = [['👟', 'İlk maç', s => s.matches >= 1], ['🔟', '10 maç', s => s.matches >= 10], ['🏟', '25 maç', s => s.matches >= 25], ['⚽', 'İlk gol', s => s.goals >= 1], ['🎩', 'Hat-trick', s => s.hat >= 1], ['🎯', '10 asist', s => s.assists >= 10], ['🔥', '20 gol', s => s.goals >= 20], ['⭐', 'Maçın adamı', s => s.mvp >= 1], ['🏅', '3 kez MVP', s => s.mvp >= 3], ['🧤', 'Gol yemedi', s => s.cs >= 1], ['💎', '8+ puan', s => s.best >= 8]];
function pcard(p, s) {
  return `<button class="pc" data-prof="${p.id}"><div class="pc-t ${p.pos === 'KL' ? 'gk' : ''}"><span class="pc-num">${esc(p.num || '')}</span>${avatar(p, 'xl')}<span class="pc-ovr"><b>${ovr(p)}</b><small>Güç</small></span></div>
   <div class="pc-b"><div class="n">${esc(p.name)}${p.role === 'admin' ? '<span class="adm">Yön.</span>' : ''}</div><div class="p">${POS[p.pos]}${p.nick ? ', “' + esc(p.nick) + '”' : ''}</div>
   <div class="pc-s"><span><b>${s.matches}</b>Maç</span><span><b>${p.pos === 'KL' ? s.cs : s.goals}</b>${p.pos === 'KL' ? 'Gol yemedi' : 'Gol'}</span><span>${rb(s.avg)}Puan</span></div></div></button>`;
}
function renderSquad() {
  const C = calc();
  $('#sqSub').textContent = `${USERS.length} oyuncu`;
  $('#posF').innerHTML = [['ALL', 'Hepsi'], ...Object.entries(POS)].map(([k, l]) => `<button class="chip" data-p="${k}" aria-pressed="${posF === k}">${l}</button>`).join('');
  $('#posF').querySelectorAll('.chip').forEach(b => b.onclick = () => { posF = b.dataset.p; renderSquad(); });
  $('#sqView').querySelectorAll('button').forEach(b => { b.setAttribute('aria-pressed', b.dataset.v === sqV); b.onclick = () => { sqV = b.dataset.v; renderSquad(); }; });
  const list = USERS.filter(p => posF === 'ALL' || p.pos === posF);
  $('#squad').innerHTML = sqV === 'c' ? `<div class="pcs">${[...list].sort((a, b) => ovr(b) - ovr(a)).map(p => pcard(p, C[p.id])).join('')}</div>`
    : '<div class="card">' + Object.keys(POS).filter(k => posF === 'ALL' || posF === k).map(k => { const g = list.filter(p => p.pos === k).sort((a, b) => (+a.num || 99) - (+b.num || 99)); return g.length ? `<div class="grp">${POSG[k]}</div>` + g.map(p => `<button class="lr" data-prof="${p.id}"><span class="no">${esc(p.num || '')}</span>${avatar(p, 'm')}<span class="n"><b>${esc(p.name)}</b><small>${C[p.id].matches} maç, ${C[p.id].goals} gol, ${C[p.id].assists} asist</small></span>${rb(C[p.id].avg)}</button>`).join('') : ''; }).join('') + '</div>';
  const LB = [['goals', 'Gol'], ['assists', 'Asist'], ['avg', 'Puan'], ['mvp', 'MVP'], ['matches', 'Katılım'], ['win', 'Galibiyet']];
  $('#lbS').innerHTML = LB.map(([k, l]) => `<button data-k="${k}" aria-pressed="${lbK === k}">${l}</button>`).join('');
  $('#lbS').querySelectorAll('button').forEach(b => b.onclick = () => { lbK = b.dataset.k; renderSquad(); });
  const val = s => lbK === 'win' ? (s.matches ? s.wins / s.matches : null) : lbK === 'avg' ? s.avg : s[lbK];
  const lb = USERS.filter(p => { const v = val(C[p.id]); return v != null && v > 0; }).sort((a, b) => val(C[b.id]) - val(C[a.id]) || C[b.id].matches - C[a.id].matches).slice(0, 10);
  $('#lb').innerHTML = lb.length ? lb.map((p, i) => { const s = C[p.id], v = val(s); return `<button data-prof="${p.id}"><span class="i">${i + 1}</span>${avatar(p, 's')}<span class="n"><b>${esc(p.name)}</b><small>${POS[p.pos]}, ${s.matches} maç</small></span><span class="v">${lbK === 'avg' ? rb(v) : lbK === 'win' ? '%' + Math.round(v * 100) : v}</span></button>`; }).join('') : '<p class="sub">Maç sonuçları girildikçe sıralama oluşur.</p>';
  bind($('#v-squad'));
}
function radar(p) {
  const n = 6, cx = 75, cy = 75, R = 58, pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v]; };
  let g = ''; [.25, .5, .75, 1].forEach(v => { g += `<polygon points="${[...Array(n)].map((_, i) => pt(i, v).join(',')).join(' ')}" fill="none" stroke="var(--line)"/>`; });
  const poly = STATS.map(([k], i) => pt(i, (p.stats[k] || 0) / 100).join(',')).join(' ');
  const lab = STATS.map(([k, l], i) => { const [x, y] = pt(i, 1.2); return `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)" font-family="Archivo,sans-serif">${l}</text>`; }).join('');
  return `<svg viewBox="-8 -8 166 166" aria-hidden="true">${g}<polygon points="${poly}" fill="rgba(139,15,26,.28)" stroke="var(--accent)" stroke-width="2"/>${lab}</svg>`;
}
function profile(id) {
  const p = byId(id); if (!p) return; const s = calc()[p.id], wr = s.matches ? Math.round(s.wins / s.matches * 100) : 0, mine = p.id === ME.id, vids = VIDEOS.filter(v => (v.scorer || v.userId) === p.id);
  sheet(`<div class="ph ${p.pos === 'KL' ? 'gk' : ''}"><div class="ph-top"><span style="font-size:13px;opacity:.8">GOLDNOVA United${p.role === 'admin' ? ', yönetici' : ''}</span><button class="x" data-close aria-label="Kapat">×</button></div>
    <div class="ph-main"><span class="camw">${avatar(p, 'xxl')}${mine ? `<button class="cam" id="pCam" aria-label="Fotoğraf değiştir">${IC.cam}</button>` : ''}</span>
    <div><div class="ph-n">${esc(p.name)}</div><div class="ph-m">${POS[p.pos]}, ${esc(p.foot)} ayak${p.nick ? '<br>“' + esc(p.nick) + '”' : ''}</div><div style="margin-top:8px;display:flex;gap:6px;align-items:center">${rb(s.avg)}<span style="font-size:12.5px;opacity:.8">ortalama puan</span></div></div></div>
    <span class="ph-num">${esc(p.num || '')}</span></div>
   <div class="sec"><div class="kv"><div><b>${s.matches}</b><small>Maç</small></div><div><b>${s.goals}</b><small>Gol</small></div><div><b>${s.assists}</b><small>Asist</small></div><div><b>%${wr}</b><small>Galibiyet</small></div><div><b>${s.mvp}</b><small>Maçın adamı</small></div><div><b>${p.pos === 'KL' ? s.cs : ovr(p)}</b><small>${p.pos === 'KL' ? 'Gol yemediği maç' : 'Güç'}</small></div></div></div>
   <div class="sec"><h4>Form (son 5 maç)</h4>${s.log.length ? `<div class="form5">${s.log.slice(0, 5).map(x => `<div>${rb(x.rt)}<span class="res ${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}" style="width:18px;height:18px;font-size:10px">${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}</span><span>${fShort(when(x.m))}</span></div>`).join('')}</div>` : '<p class="sub">Henüz maç oynamadı.</p>'}</div>
   ${vids.length ? `<div class="sec"><h4>Videoları (${vids.length})</h4><div class="vgrid">${vids.slice(0, 6).map(thumb).join('')}</div></div>` : ''}
   <div class="sec"><h4>Özellikler</h4><div class="attr">${radar(p)}<div class="bars">${STATS.map(([k, l]) => `<div><span>${l}</span><i><span style="width:${p.stats[k]}%"></span></i><em>${p.stats[k]}</em></div>`).join('')}</div></div></div>
   <div class="sec"><h4>Rozetler</h4><div class="bdg">${BADGES.map(([e, n, f]) => `<div class="${f(s) ? '' : 'off'}"><span>${e}</span>${n}</div>`).join('')}</div></div>
   ${s.log.length ? `<div class="sec"><h4>Son maçlar</h4><div class="rl">${s.log.slice(0, 6).map(x => `<div><span class="res ${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}">${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}</span><button data-match="${x.m.id}" style="border:none;background:none;text-align:left;padding:0">${x.m.result.us}–${x.m.result.them} <span class="muted">vs ${esc(opp(x.m))}</span></button><span class="muted" style="font-size:12.5px">${x.g ? '⚽' + x.g + ' ' : ''}${x.a ? '🅰' + x.a : ''}${x.m.result.mvp === p.id ? ' ⭐' : ''}</span>${rb(x.rt)}</div>`).join('')}</div></div>` : ''}
   <div class="row" style="margin-top:18px">${mine ? '<a class="btn pri" href="#me" id="pMe">Profilimi düzenle</a>' : ''}${isAdmin() ? '<button class="btn" id="pAdm">Yönetici: oyuncuyu düzenle</button>' : ''}</div>`,
  b => {
    bind(b); b.querySelectorAll('.vth').forEach(x => x.onclick = () => { dlg.close(); location.hash = 'feed/' + x.dataset.v; });
    const c = b.querySelector('#pCam'); if (c) c.onclick = pickPhoto;
    const pm = b.querySelector('#pMe'); if (pm) pm.onclick = () => dlg.close();
    const pa = b.querySelector('#pAdm'); if (pa) pa.onclick = () => adminPlayer(p);
  });
}
function adminPlayer(p) {
  const st2 = { ...p.stats };
  sheet(`<div class="form"><label class="f">Mevki<select id="aP">${Object.entries(POS).map(([k, l]) => `<option value="${k}" ${k === p.pos ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
   <label class="f">Forma no<input type="number" id="aN" min="0" max="99" value="${esc(p.num)}"></label>
   ${p.id !== ME.id ? `<label class="f full">Rol<select id="aR"><option value="member" ${p.role !== 'admin' ? 'selected' : ''}>Üye</option><option value="admin" ${p.role === 'admin' ? 'selected' : ''}>Yönetici (maç ekler, sonuç girer)</option></select></label>` : ''}</div>
   <div class="sec"><h4>Özellikler</h4><div style="display:flex;flex-direction:column;gap:5px">${STATS.map(([k, l]) => `<div class="sin"><span>${l}</span><input type="range" min="30" max="99" value="${st2[k]}" data-k="${k}" aria-label="${l}"><output id="o-${k}">${st2[k]}</output></div>`).join('')}</div></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${p.id !== ME.id ? '<button class="btn ghost danger" id="aDel">Takımdan çıkar</button>' : '<span></span>'}<div class="row"><button class="btn" id="aBack">Geri</button><button class="btn pri" id="aOk">Kaydet</button></div></div>`,
  b => {
    b.querySelectorAll('input[type=range]').forEach(i => i.oninput = () => { st2[i.dataset.k] = +i.value; b.querySelector('#o-' + i.dataset.k).textContent = i.value; });
    b.querySelector('#aBack').onclick = () => profile(p.id);
    b.querySelector('#aOk').onclick = async () => { const r = b.querySelector('#aR'); try { const j = await api('/users/' + p.id, { method: 'PUT', body: { pos: b.querySelector('#aP').value, num: b.querySelector('#aN').value, stats: st2, role: r ? r.value : undefined } }); upd(USERS, j.user); if (j.user.id === ME.id) ME = { ...ME, ...j.user }; toast('Oyuncu güncellendi'); profile(p.id); } catch (e) { fail(e); } };
    const d = b.querySelector('#aDel'); if (d) d.onclick = async () => { if (!confirm(p.name + ' takımdan çıkarılsın mı? Hesabı silinir.')) return; try { await api('/users/' + p.id, { method: 'DELETE' }); USERS = USERS.filter(u => u.id !== p.id); dlg.close(); toast('Oyuncu çıkarıldı'); } catch (e) { fail(e); } };
  }, 'Oyuncuyu düzenle');
}
function pickPhoto() {
  const inp = $('#photoIn'); inp.value = '';
  inp.onchange = () => {
    const f = inp.files[0]; if (!f) return; const img = new Image(), url = URL.createObjectURL(f);
    img.onload = () => {
      const c = document.createElement('canvas'), z = 400; c.width = c.height = z; const x = c.getContext('2d'), m = Math.min(img.width, img.height);
      x.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, z, z); URL.revokeObjectURL(url);
      c.toBlob(async blob => { const fd = new FormData(); fd.append('photo', blob, 'photo.jpg'); try { const j = await api('/me/photo', { method: 'POST', body: fd }); ME = j.me; upd(USERS, j.me); toast('Fotoğraf güncellendi'); if (dlg.open) profile(ME.id); else render(); } catch (e) { fail(e); } }, 'image/jpeg', .85);
    };
    img.onerror = () => toast('Bu fotoğraf açılamadı'); img.src = url;
  };
  inp.click();
}

/* ---------- PROFİL / AYARLAR ---------- */
async function renderMe() {
  const ps = await pushState();
  $('#meL').innerHTML = `<div class="card"><div style="display:flex;align-items:center;gap:14px"><span class="camw">${avatar(ME, 'l')}<button class="cam" id="meCam" aria-label="Fotoğraf değiştir" style="width:26px;height:26px">${IC.cam}</button></span><div><b style="font-size:18px">${esc(ME.name)}</b>${ME.role === 'admin' ? '<span class="adm">Yönetici</span>' : ''}<div class="sub">${esc(ME.email)}</div></div><button class="btn sm" style="margin-left:auto" id="meProf">Kartımı gör</button></div></div>
   <form class="card form" id="meF"><h2 class="st full" style="margin-bottom:4px">Oyuncu bilgilerim</h2>
    <label class="f full">Ad<input type="text" name="name" value="${esc(ME.name)}" maxlength="30"></label>
    <label class="f">Lakap<input type="text" name="nick" value="${esc(ME.nick)}" maxlength="20" placeholder="İsteğe bağlı"></label>
    <label class="f">Forma no<input type="number" name="num" min="0" max="99" value="${esc(ME.num)}"></label>
    <label class="f">Mevki<select name="pos">${Object.entries(POS).map(([k, l]) => `<option value="${k}" ${k === ME.pos ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    <label class="f">Ayak<select name="foot">${['Sağ', 'Sol', 'İki ayak'].map(f => `<option ${f === ME.foot ? 'selected' : ''}>${f}</option>`).join('')}</select></label>
    <div class="full row" style="justify-content:flex-end"><button class="btn pri">Kaydet</button></div></form>`;
  $('#meR').innerHTML = `<div class="card"><h2 class="st" style="margin-bottom:4px">Bildirimler</h2>
    <div class="tgl"><div><b>Telefon bildirimleri</b><small>${ps === 'unsupported' ? (isIOS() ? 'iPhone’da önce Ana Ekrana Ekle, sonra uygulamadan aç' : 'Bu tarayıcı desteklemiyor') : ps === 'denied' ? 'Tarayıcı ayarlarından izin vermelisin' : 'Yeni maç, kadro, sonuç, video ve maç hatırlatması'}</small></div><button class="sw2" id="tPush" role="switch" aria-checked="${ps === 'on' && ME.notifyPush !== false}" ${ps === 'unsupported' || ps === 'denied' ? 'disabled' : ''} aria-label="Telefon bildirimleri"></button></div>
    <div class="tgl"><div><b>E-posta</b><small>${MAILON ? 'Yeni maç açıldığında e-posta al' : 'Yeni maç açıldığında e-posta al'}</small></div><button class="sw2" id="tMail" role="switch" aria-checked="${ME.notifyEmail !== false}" aria-label="E-posta bildirimleri"></button></div>
    <div class="row" style="margin-top:8px">${ps === 'on' ? '<button class="btn sm" id="tTest">Test bildirimi gönder</button>' : ''}<button class="btn sm" id="tMailTest">Test e-postası gönder</button></div></div>
   <div class="card"><div class="tgl" style="border:none;padding:0"><div><b>Tema</b><small>Açık ya da koyu görünüm</small></div><button class="btn sm" id="tTheme">Değiştir</button></div></div>
   <form class="card form" id="pwF"><h2 class="st full" style="margin-bottom:4px">Şifre değiştir</h2>
    <label class="f full">Mevcut şifre<input type="password" name="oldPassword" autocomplete="current-password"></label>
    <label class="f full">Yeni şifre<input type="password" name="password" autocomplete="new-password"></label>
    <div class="full row" style="justify-content:flex-end"><button class="btn">Şifreyi değiştir</button></div></form>
   ${!standalone() ? `<div class="card"><h2 class="st" style="margin-bottom:4px">Telefona uygulama olarak ekle</h2><p class="sub">${isIOS() ? 'Safari’de Paylaş butonuna, sonra “Ana Ekrana Ekle”ye dokun.' : 'Tarayıcı menüsünden “Uygulamayı yükle” ya da “Ana ekrana ekle”yi seç.'} Uygulama gibi tam ekran açılır ve bildirim alır.</p>${installEvt ? '<button class="btn gold" id="inst" style="margin-top:10px">Uygulamayı yükle</button>' : ''}</div>` : ''}
   <button class="btn ghost danger" id="logout">Çıkış yap</button>`;
  $('#meCam').onclick = pickPhoto; $('#meProf').onclick = () => profile(ME.id);
  $('#meF').onsubmit = async e => { e.preventDefault(); try { const j = await api('/me', { method: 'PUT', body: Object.fromEntries(new FormData(e.target)) }); ME = j.me; upd(USERS, j.me); toast('Bilgilerin kaydedildi'); renderMe(); } catch (er) { fail(er); } };
  $('#pwF').onsubmit = async e => { e.preventDefault(); const f = Object.fromEntries(new FormData(e.target)); if (!f.password) { toast('Yeni şifreyi yaz'); return; } try { await api('/me', { method: 'PUT', body: f }); e.target.reset(); toast('Şifren değişti'); } catch (er) { fail(er); } };
  $('#tPush').onclick = async () => { if ($('#tPush').getAttribute('aria-checked') === 'true') { await disablePush(); ME = (await api('/me', { method: 'PUT', body: { notifyPush: false } })).me; toast('Telefon bildirimleri kapatıldı'); } else await enablePush(); renderMe(); };
  $('#tMail').onclick = async () => { try { ME = (await api('/me', { method: 'PUT', body: { notifyEmail: ME.notifyEmail === false } })).me; renderMe(); } catch (e) { fail(e); } };
  $('#tTheme').onclick = () => $('#themeBtn').click();
  $('#tMailTest').onclick = async ev => { const b = ev.currentTarget; b.disabled = true; b.textContent = 'Gönderiliyor…'; const r = await notify('test_mail'); b.disabled = false; b.textContent = 'Test e-postası gönder'; toast(!r ? 'Fonksiyona ulaşılamadı' : r.mail === 'ok' ? `Gönderildi: ${ME.email} (spam klasörüne de bak)` : 'Gönderilemedi: ' + r.mail); };
  const tt = $('#tTest'); if (tt) tt.onclick = async () => { await api('/push/test', { method: 'POST' }); toast('Gönderildi, birkaç saniye içinde gelmeli'); };
  const ib = $('#inst'); if (ib) ib.onclick = async () => { installEvt.prompt(); await installEvt.userChoice; installEvt = null; renderMe(); };
  $('#logout').onclick = async () => { await disablePush(); await api('/auth/logout', { method: 'POST' }).catch(() => { }); ME = null; showAuth(); };
}
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; });

/* ---------- başlat ---------- */
if (sb) sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT' && ME) { ME = null; showAuth(); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => { });
start();
})();
