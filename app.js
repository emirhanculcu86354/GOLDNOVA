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
const LOGO = './logo.png';

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
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="jsd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".28" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient><linearGradient id="jhl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
  <path d="${JP}" fill="${k.s}"/><path d="${JP}" fill="url(#jsd)"/><path d="${JP}" fill="url(#jhl)"/><path d="${JP}" fill="none" stroke="${k.x}" stroke-width="2" stroke-linejoin="round" opacity=".9"/>
  <path d="M41 5 L50 17 L59 5" fill="none" stroke="${k.x}" stroke-width="4.5" stroke-linejoin="round"/><path d="M29 39 V95 M71 39 V95" stroke="${k.x}" stroke-width="2.2"/><path d="M84 43 L94 25 M16 43 L6 25" stroke="${k.x}" stroke-width="5"/><path d="M80 38.5 L89 22 M20 38.5 L11 22" stroke="${k.x}" stroke-width="1.6"/>
  ${L ? `<text x="50" y="${fs > 30 ? 73 : 69}" text-anchor="middle" font-family="Cinzel, Oswald, Georgia, serif" font-weight="800" font-size="${fs}" fill="${k.t}" stroke="rgba(0,0,0,.25)" stroke-width=".8" paint-order="stroke">${esc(L)}</text>` : ''}</svg>`;
}
/* Gerçekçi forma çizimi (ön/arka), FIFA forma ekranı tarzı */
let kitN = 0;
const KIT_BODY = 'M96 30 C112 22 127 20 150 20 C173 20 188 22 204 30 L262 52 C276 58 284 70 287 84 L299 140 L251 157 L239 113 L237 300 C237 309 231 313 222 313 L78 313 C69 313 63 309 63 300 L61 113 L49 157 L1 140 L13 84 C16 70 24 58 38 52 Z';
function kitSVG(o = {}) {
  const id = 'kt' + (++kitN), gk = !!o.gk, base = gk ? '#151515' : '#7C0D17', mid = gk ? '#2a2a2a' : '#A0182A', gold = '#D4AF37', goldD = '#9C7A1C';
  const nm = up(o.name || ''), num = String(o.num || '');
  const front = `<image href="${LOGO}" x="180" y="64" width="34" height="46" preserveAspectRatio="xMidYMid meet"/>
    <text x="150" y="168" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="25" fill="url(#${id}g)" textLength="150" lengthAdjust="spacingAndGlyphs">GOLDNOVA</text>
    <path d="M86 185 H104 M196 185 H214" stroke="${gold}" stroke-width="1.4"/><text x="150" y="189" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="12" fill="${gold}" letter-spacing="4">UNITED</text>
    ${o.num && o.chest ? `<text x="150" y="268" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="800" font-size="56" fill="url(#${id}g)">${esc(num)}</text>` : ''}
    <path d="M118 24 L150 72 L182 24" fill="none" stroke="${gold}" stroke-width="8" stroke-linejoin="round"/><path d="M124 23 L150 62 L176 23 Q150 30 124 23 Z" fill="#000" opacity=".45"/>`;
  const back = `<path d="M116 25 Q150 42 184 25" fill="none" stroke="${gold}" stroke-width="8" stroke-linecap="round"/>
    <text x="150" y="100" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="${nm.length > 10 ? 20 : 25}" fill="url(#${id}g)" letter-spacing="2">${esc(nm)}</text>
    <text x="150" y="232" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="800" font-size="${num.length > 1 ? 118 : 128}" fill="url(#${id}g)" stroke="rgba(0,0,0,.35)" stroke-width="2" paint-order="stroke">${esc(num)}</text>
    <text x="150" y="292" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="9" fill="${gold}" opacity=".75" letter-spacing="3">TOGETHER WE RISE</text>`;
  return `<svg viewBox="0 0 300 320" class="kitsvg" role="img" aria-label="${gk ? 'Kaleci' : 'GOLDNOVA'} forması${o.back ? ', ' + esc(nm) + ' ' + esc(num) : ''}">
   <defs><clipPath id="${id}c"><path d="${KIT_BODY}"/></clipPath>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mid}"/><stop offset="1" stop-color="${base}"/></linearGradient>
    <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5DA7A"/><stop offset=".55" stop-color="${gold}"/><stop offset="1" stop-color="${goldD}"/></linearGradient>
    <pattern id="${id}p" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(${gk ? 35 : -30})"><rect width="14" height="14" fill="none"/><rect width="5" height="14" fill="#fff" opacity="${gk ? .05 : .035}"/></pattern></defs>
   <g clip-path="url(#${id}c)"><rect width="300" height="320" fill="url(#${id}b)"/><rect width="300" height="320" fill="url(#${id}p)"/>
    <path d="M0 132 L52 150 L48 156 L0 140 Z M300 132 L248 150 L252 156 L300 140 Z" fill="${gold}"/><path d="M0 122 L55 141 L54 145 L0 126 Z M300 122 L245 141 L246 145 L300 126 Z" fill="${gold}" opacity=".85"/>
    <path d="M67 112 V313 M233 112 V313" stroke="${gold}" stroke-width="5"/>
    ${gk ? `<path d="M61 113 L75 113 L75 313 L61 313 Z M239 113 L225 113 L225 313 L239 313 Z" fill="${gold}" opacity=".9"/>` : ''}
    ${o.back ? back : front}
    <rect width="300" height="320" fill="url(#${id}s)"/></g>
   <path d="${KIT_BODY}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="1.5"/></svg>`;
}
const FLAG_TR = '<svg viewBox="0 0 30 20" aria-label="Türkiye"><rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.3" cy="10" r="4" fill="#E30A17"/><path d="M16.6 10 l3.7 -1.2 -2.3 3.2 0 -4 2.3 3.2z" fill="#fff"/></svg>';
/* FIFA Ultimate Team tarzı oyuncu kartı */
function futCard(p, s) {
  const o = ovr(p), tier = o >= 85 ? 'nova' : o >= 75 ? 'gold' : o >= 65 ? 'silver' : 'bronze';
  const G = { nova: ['#2a0306', '#7C0D17', '#0D0D0D'], gold: ['#FBE9A6', '#E2BE55', '#A47A1E'], silver: ['#F2F4F6', '#C8CED4', '#8A939B'], bronze: ['#F1C9A0', '#C8875A', '#7E4A26'] }[tier];
  const id = 'fc' + (++kitN), face = p.photo ? `<img src="${esc(p.photo)}" alt="" class="fut-ph">` : `<div class="fut-kit">${kitSVG({ gk: p.pos === 'KL', back: true, name: p.name.split(' ')[0], num: p.num || ini(p.name) })}</div>`;
  return `<div class="fut fut-${tier}">
   <svg class="fut-bg" viewBox="0 0 300 420" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${G[0]}"/><stop offset=".5" stop-color="${G[1]}"/><stop offset="1" stop-color="${G[2]}"/></linearGradient>
    <pattern id="${id}p" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="16" fill="#fff" opacity=".08"/></pattern></defs>
    <path d="M150 4 C190 18 240 14 286 10 L296 60 L296 340 C296 372 270 386 150 416 C30 386 4 372 4 340 L4 60 L14 10 C60 14 110 18 150 4 Z" fill="url(#${id})"/>
    <path d="M150 4 C190 18 240 14 286 10 L296 60 L296 340 C296 372 270 386 150 416 C30 386 4 372 4 340 L4 60 L14 10 C60 14 110 18 150 4 Z" fill="url(#${id}p)"/>
    <path d="M150 16 C188 28 234 25 276 21 L284 64 L284 336 C284 362 262 374 150 402 C38 374 16 362 16 336 L16 64 L24 21 C66 25 112 28 150 16 Z" fill="none" stroke="${tier === 'nova' ? '#D4AF37' : 'rgba(0,0,0,.18)'}" stroke-width="2"/></svg>
   <div class="fut-l"><b>${o}</b><span>${p.pos}</span><i class="fut-fl">${FLAG_TR}</i><img src="${LOGO}" alt="" class="fut-cr"></div>
   <div class="fut-face">${face}</div>
   <div class="fut-n">${esc(up(p.nick || p.name.split(' ')[0]))}</div>
   <div class="fut-s">${STATS.map(([k, l]) => `<div><b>${p.stats[k]}</b><span>${l}</span></div>`).join('')}</div>
   <div class="fut-f">${s ? `${s.matches} MAÇ · ${s.goals} GOL${s.avg != null ? ' · ' + s.avg.toFixed(1) : ''}` : ''}</div></div>`;
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
  if (path === '/users' && method === 'POST') {
    const name = String(b.name || '').trim(); if (!name) throw new Error('Oyuncunun adını yaz');
    const row = { name: name.slice(0, 30), num: String(b.num || '').replace(/\D/g, '').slice(0, 2), pos: b.pos || 'OS', foot: b.foot || 'Sağ', guest: true, role: 'member', notify_email: false, notify_push: false };
    return { user: mapU(chk(await sb.from('profiles').insert(row).select().single())) };
  }
  if ((mm = path.match(/^\/users\/([^/]+)$/))) {
    if (method === 'DELETE') { chk(await sb.from('profiles').delete().eq('id', mm[1])); return {}; }
    const p = {}; if (b.name && String(b.name).trim()) p.name = String(b.name).trim().slice(0, 30); if (b.pos) p.pos = b.pos; if (b.num !== undefined) p.num = String(b.num).replace(/\D/g, '').slice(0, 2); if (b.stats) p.stats = b.stats; if (b.role) p.role = b.role;
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
    chk(await sb.from('matches').update({ lineup: { form: b.form, slots: b.slots, at: new Date().toISOString() } }).eq('id', mm[1]));
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
  if ((mm = path.match(/^\/matches\/([^/]+)\/tactic$/))) { chk(await sb.from('matches').update({ tactic: b.tactic }).eq('id', mm[1])); return { match: await fetchMatch(mm[1]) }; }
  if ((mm = path.match(/^\/matches\/([^/]+)\/live$/))) { chk(await sb.from('matches').update({ live: b.live }).eq('id', mm[1])); if (b.goal) notify('goal', { id: mm[1] }); return { match: await fetchMatch(mm[1]) }; }
  if ((mm = path.match(/^\/matches\/([^/]+)\/vote$/))) { chk(await sb.from('votes').upsert({ match_id: mm[1], voter: ME.id, target: b.target }, { onConflict: 'match_id,voter' })); VOTES = chk(await sb.from('votes').select('*')); return {}; }
  if (path === '/push/subscribe') { chk(await sb.from('push_subs').upsert({ endpoint: b.subscription.endpoint, user_id: ME.id, sub: b.subscription }, { onConflict: 'endpoint' })); return {}; }
  if (path === '/push/unsubscribe') { await sb.from('push_subs').delete().eq('endpoint', b.endpoint); return {}; }
  if (path === '/push/test') { const r = await notify('test'); if (r && r.push === false) throw new Error('Bildirim anahtarları Supabase’e eklenmemiş (README adım 5)'); return {}; }
  throw new Error('Bilinmeyen işlem: ' + path);
}
const fail = e => toast(e.message || 'Bir hata oldu');

/* ---------- veri ---------- */
let VOTES = [];
let ME = null, USERS = [], MATCHES = [], VIDEOS = [], PUSHKEY = null, MAILON = false;
const byId = id => USERS.find(u => u.id === id);
const isAdmin = () => ME && (ME.role === 'admin' || ME.role === 'owner');
const isOwner = () => ME && ME.role === 'owner';
const roleTag = p => p.role === 'owner' ? '<span class="adm">Kurucu</span>' : p.role === 'admin' ? '<span class="adm">Yön.</span>' : p.guest ? '<span class="adm" style="color:var(--muted);border-color:var(--line)">Kayıtsız</span>' : '';
async function loadAll() {
  const { data: { session } } = await sb.auth.getSession(); if (!session) throw new Error('no session');
  const [p, m, r, v, vo] = await Promise.all([sb.from('profiles').select('*'), sb.from('matches').select('*'), sb.from('rsvps').select('*'), sb.from('videos').select(VSEL).order('created_at', { ascending: false }), sb.from('votes').select('*')]);
  USERS = chk(p).map(mapU); const rs = chk(r); MATCHES = chk(m).map(x => mapM(x, rs)); VIDEOS = chk(v).map(mapV); VOTES = vo.error ? [] : vo.data;
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
      s.matches++; s[res]++; s.goals += g; s.assists += a; if (g >= 3) s.hat++; if (mvpOf(m) === pid) s.mvp++;
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
  route(); realtime();
}

/* ---------- yönlendirme ---------- */
const VIEWS = ['home', 'matches', 'lineup', 'feed', 'squad', 'lig', 'me']; let curV = 'home';
function route() {
  const h = location.hash.slice(1).split('/'); let v = h[0];
  if (v === 'match') { v = 'matches'; setTimeout(() => h[1] && matchDetail(h[1]), 50); }
  if (v === 'live') { v = 'home'; setTimeout(() => h[1] && liveBoard(h[1]), 50); }
  if (!VIEWS.includes(v)) v = 'home';
  curV = v; VIEWS.forEach(x => $('#v-' + x).classList.toggle('on', x === v));
  document.querySelectorAll('nav.tabs a').forEach(a => a.setAttribute('aria-current', a.dataset.v === v ? 'page' : 'false'));
  render();
  if (v === 'feed' && h[1]) setTimeout(() => { const el = document.getElementById('post-' + h[1]); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
}
function render() { const b = $('#meBtn'); if (b && ME) b.innerHTML = avatar(ME, 's'); ({ home: renderHome, matches: renderMatches, lineup: renderLineupView, feed: renderFeed, squad: renderSquad, lig: renderLig, me: renderMe })[curV](); }
$('#meBtn').onclick = () => { location.hash = 'me'; };
let luId = null, luTab = 'p';
function renderLineupView() {
  if (!$('#luSeg')) { $('#luBody').insertAdjacentHTML('beforebegin', '<div class="seg" id="luSeg" style="margin-bottom:12px"><button data-t="p">Kadro</button><button data-t="t">Taktik tahtası</button></div>'); $('#luSeg').querySelectorAll('button').forEach(b => b.onclick = () => { luTab = b.dataset.t; renderLineupView(); }); }
  $('#luSeg').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === luTab));
  const seen = new Set(), list = [...upcoming(), ...pending(), ...played()].filter(m => !seen.has(m.id) && seen.add(m.id));
  const sel = $('#luSel');
  if (!list.length) { sel.classList.add('hide'); $('#luSub').textContent = ''; $('#luBody').innerHTML = `<div class="card empty-m"><b>Henüz maç yok</b><p class="sub">Maç oluşturulunca kadrosu burada görünür.</p>${isAdmin() ? '<button class="btn pri" id="luNew" style="margin-top:12px">+ Maç oluştur</button>' : ''}</div>`; const n = $('#luNew'); if (n) n.onclick = () => editMatch(null); return; }
  sel.classList.remove('hide');
  const m = list.find(x => x.id === luId) || nextMatch() || list[0]; luId = m.id;
  sel.innerHTML = list.map(x => `<option value="${x.id}" ${x.id === m.id ? 'selected' : ''}>${esc(fShort(when(x)))}: ${esc(opp(x))}${x.result ? ` (${x.result.us}-${x.result.them})` : x === nextMatch() ? ' (sıradaki)' : ''}</option>`).join('');
  sel.onchange = () => { luId = sel.value; renderLineupView(); };
  $('#luSub').textContent = `GOLDNOVA – ${opp(m)}, ${fDate(when(m))} ${m.time}`;
  if (luTab === 't') { tacticView(m); return; }
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
  let L = `<p class="hello">Merhaba ${esc(ME.name.split(' ')[0])} 👋</p>${liveBan()}${debtBan()}<div id="pushBan"></div>`;
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
  const todayPost = clubPosts().filter(p => (p.kind === 'matchday' || p.kind === 'hour') && Date.now() - p.at < 18 * 3600e3 && when(p.m).getTime() + 3 * 3600e3 > Date.now()).sort((a, b) => b.at - a.at)[0];
  if (todayPost) L = L.replace('<div id="pushBan"></div>', '<div id="pushBan"></div>' + clubPostHTML(todayPost));
  if (last) L += lastCard(last);
  const vids = VIDEOS.slice(0, 4);
  let R = `<div id="ligHome"></div><div class="card"><div class="sh"><h2 class="st">Son videolar</h2><a class="link" href="#feed">Akışa git</a></div>${vids.length ? `<div class="vgrid">${vids.map(thumb).join('')}</div>` : `<p class="sub">Henüz video yok. Golünü yükleyen ilk sen ol.</p><button class="btn pri" id="hUp" style="margin-top:10px">+ Video yükle</button>`}</div>`;
  const pend = pending(); if (isAdmin() && pend.length) R = `<div class="banner"><span>⚠️ ${pend.length} maçın sonucu girilmedi</span><button class="btn sm pri" data-match="${pend[0].id}">Sonucu gir</button></div>` + R;
  R += leaders(C);
  $('#homeL').innerHTML = L; $('#homeR').innerHTML = R;
  tick(); bind($('#v-home')); bindClub($('#v-home')); ligHomeCard();
  $('#v-home').querySelectorAll('[data-live]').forEach(x => x.onclick = () => liveBoard(x.dataset.live));
  $('#v-home').querySelectorAll('[data-kasa]').forEach(x => x.onclick = () => { location.hash = 'matches'; });
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
  $('#mR').innerHTML = kasaHTML() + `<div class="card"><h2 class="st" style="margin-bottom:8px">Sezon karnesi</h2>${pl.length ? `<div class="kv"><div><b>${r.w}-${r.d}-${r.l}</b><small>G-B-M</small></div><div><b>${r.gf}:${r.ga}</b><small>Averaj</small></div><div><b>%${Math.round(r.w / pl.length * 100)}</b><small>Galibiyet</small></div></div><p class="sub" style="margin-top:10px">Son form</p><div class="form-row">${r.form.map(x => `<span class="res ${x}">${x}</span>`).join('')}</div>` : '<p class="sub">İlk sonuç girilince sezon karnesi oluşur.</p>'}</div>`;
  bind($('#v-matches')); bindKasa($('#v-matches'));
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
   ${r ? voteHTML(m) : ''}
   ${!r && isAdmin() && Math.abs(when(m) - Date.now()) < 36 * 3600e3 ? `<div class="sec"><button class="btn gold block" id="dLive">${m.live && m.live.on ? '🔴 Canlı skoru aç' : '⏱ Canlı skoru başlat'}</button></div>` : !r && m.live && m.live.on ? `<div class="sec"><button class="btn gold block" id="dLive">🔴 Canlı skoru izle</button></div>` : ''}
   <div class="sec"><h4>Katılım</h4>${lists}</div>
   <div class="row" style="margin-top:18px"><button class="btn wa" id="dWa">${IC.wa}WhatsApp’ta paylaş</button>${isAdmin() ? `${r ? '' : '<button class="btn pri" id="dRes">Sonucu gir</button>'}${r ? '<button class="btn" id="dRes">Sonucu düzenle</button>' : ''}<button class="btn" id="dEdit">Düzenle</button><button class="btn ghost danger" id="dDel">Sil</button>` : ''}</div>`,
  b => {
    bind(b);
    const rs = b.querySelector('#dRsvp'); if (rs) rs.querySelectorAll('button').forEach(x => x.onclick = () => setRsvp(m, x.dataset.st));
    b.querySelectorAll('[data-as]').forEach(s => s.onchange = () => setRsvp(m, s.value, s.dataset.as));
    bindVote(b, m); const lv = b.querySelector('#dLive'); if (lv) lv.onclick = () => liveBoard(m.id);
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
  const P = m.__pre; delete m.__pre;
  let ps = new Set(r.players || (P && P.players) || (m.lineup ? m.lineup.slots.filter(Boolean) : going(m).map(u => u.id)));
  const gl = { ...(r.goals || (P && P.gl) || {}) }, as = { ...(r.assists || (P && P.as) || {}) }, rt = { ...(r.ratings || {}) }, manual = {}; Object.keys(rt).forEach(k => manual[k] = true);
  let us = r.us ?? (P ? P.us : 0), them = r.them ?? (P ? P.them : 0), mvp = r.mvp || '', touched = !!m.result || !!P;
  const auto = () => { ps.forEach(id => { if (manual[id]) return; let v = 6.5 + (us > them ? .5 : us < them ? -.3 : 0) + (gl[id] || 0) * .9 + (as[id] || 0) * .6 + (mvp === id ? .5 : 0); const isGK = gk0 ? gk0 === id : (byId(id) || {}).pos === 'KL'; if (isGK) v += them === 0 ? 1 : -Math.min(1, them * .15); rt[id] = Math.max(3, Math.min(10, r1(v))); }); };
  const step = (k, id, v) => `<span class="stp"><button data-k="${k}" data-id="${id}" data-d="-1" aria-label="azalt">−</button><b>${v}</b><button data-k="${k}" data-id="${id}" data-d="1" aria-label="artır">+</button></span>`;
  const draw = () => {
    if (!touched) us = [...ps].reduce((s, id) => s + (gl[id] || 0), 0); auto();
    const list = USERS.filter(u => ps.has(u.id));
    sheet(`<div class="si"><div><div class="l">${CREST}GOLDNOVA</div><input type="number" id="rUs" min="0" value="${us}"></div><b class="x75" style="font-size:30px;padding-bottom:12px">–</b><div><div class="l">${jersey(OPP)}${esc(opp(m))}</div><input type="number" id="rThem" min="0" value="${them}"></div></div>
     <h4 style="margin:12px 0 6px">Oynayanlar</h4><div class="who">${USERS.map(u => `<button data-p="${u.id}" aria-pressed="${ps.has(u.id)}">${avatar(u, 's')}${esc(u.name)}</button>`).join('')}</div>
     ${list.length ? `<div class="er" style="border:none;padding-bottom:0;margin-top:10px"><span></span><small>Gol</small><small>Asist</small><small>Puan</small></div>` + list.map(u => `<div class="er"><span class="n">${esc(u.name)}</span>${step('g', u.id, gl[u.id] || 0)}${step('a', u.id, as[u.id] || 0)}${step('r', u.id, (rt[u.id] ?? 6.5).toFixed(1))}</div>`).join('') : '<p class="sub">Oynayanları seç.</p>'}
     <label class="f" style="margin-top:12px">Maçın adamı<select id="rMvp"><option value="">Oylamayla belirlensin (48 saat)</option>${list.map(u => `<option value="${u.id}" ${mvp === u.id ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select></label>
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
        try { const j = await api(`/matches/${m.id}/result`, { method: 'PUT', body: { us, them, players, goals: pick(gl), assists: pick(as), ratings: pick(rt), mvp: ps.has(mvp) ? mvp : null } }); upd(MATCHES, j.match);
        if (m.live) { try { const k = await api(`/matches/${m.id}/live`, { method: 'POST', body: { live: null } }); upd(MATCHES, k.match); } catch { } } toast('Sonuç kaydedildi'); matchDetail(m.id); }
        catch (e) { fail(e); }
      };
    }, 'Maç sonucu');
  };
  draw();
}

/* ---------- TAKTİK TAHTASI ---------- */
const TCOLS = ['#F7CF4A', '#FFFFFF', '#FF5A5A', '#4DD0FF'];
let TAC = null, tacFor = null, tbM = 'move', tbC = TCOLS[0], tDrag = null, tCur = null, tCv = null, tCtx = null;
function defTac(m) {
  const fmt = Math.min(8, Math.max(5, m.format || 7)), forms = FORM[fmt], form = m.lineup && forms[m.lineup.form] ? m.lineup.form : Object.keys(forms)[0], sl = forms[form], t = [];
  sl.forEach(([x, y], i) => { const p = byId(((m.lineup || {}).slots || [])[i]); t.push({ x, y: .92 - y * .38, team: 'A', gk: i === 0, l: p ? String(p.num || ini(p.name)) : String(i + 1), nm: p ? p.name.split(' ')[0] : '' }); });
  sl.forEach(([x, y], i) => t.push({ x: 1 - x, y: .08 + y * .38, team: 'B', gk: i === 0, l: String(i + 1) }));
  t.push({ x: .5, y: .5, team: 'ball', l: '' }); return { tokens: t, strokes: [] };
}
function tacticView(m) {
  if (tacFor !== m.id) { TAC = m.tactic ? JSON.parse(JSON.stringify(m.tactic)) : defTac(m); tacFor = m.id; }
  $('#luBody').innerHTML = `<canvas class="tbc" id="tb" aria-label="Taktik tahtası"></canvas><div class="col"><div class="card col" style="gap:10px">
    <div class="row"><div class="seg" id="tbMode"><button data-m="move">Taşı</button><button data-m="draw">Çiz</button><button data-m="arrow">Ok</button></div><div class="sw" id="sw">${TCOLS.map(c => `<button style="background:${c}" data-c="${c}" aria-label="Kalem rengi"></button>`).join('')}</div></div>
    <div class="row"><button class="btn" id="tbUndo">Geri al</button><button class="btn" id="tbClear">Çizimleri sil</button><button class="btn" id="tbLine">Kadrodan diz</button>${isAdmin() ? '<button class="btn pri" id="tbSave">Takımla paylaş</button>' : ''}</div>
    <p class="sub">${isAdmin() ? '“Takımla paylaş” deyince tahta bu maç için herkese kaydedilir.' : m.tactic ? 'Yöneticinin paylaştığı taktik. Üzerinde oynayabilirsin, değişiklikler sadece sende kalır.' : 'Formaları ve topu sürükle, Ok modunda koşu ve pas yönlerini çiz.'}</p></div></div>`;
  const syncUI = () => { $('#tbMode').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x.dataset.m === tbM)); $('#sw').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x.dataset.c === tbC)); };
  $('#tbMode').querySelectorAll('button').forEach(b => b.onclick = () => { tbM = b.dataset.m; syncUI(); });
  $('#sw').querySelectorAll('button').forEach(b => b.onclick = () => { tbC = b.dataset.c; syncUI(); }); syncUI();
  $('#tbUndo').onclick = () => { TAC.strokes.pop(); drawTB(); };
  $('#tbClear').onclick = () => { TAC.strokes = []; drawTB(); };
  $('#tbLine').onclick = () => { TAC = defTac(m); drawTB(); };
  const sv = $('#tbSave'); if (sv) sv.onclick = async () => { try { const j = await api(`/matches/${m.id}/tactic`, { method: 'POST', body: { tactic: TAC } }); upd(MATCHES, j.match); toast('Taktik takımla paylaşıldı'); } catch (e) { fail(e); } };
  tCv = $('#tb'); tCtx = tCv.getContext('2d');
  const pp = e => { const r = tCv.getBoundingClientRect(); return [Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))]; };
  tCv.onpointerdown = e => { tCv.setPointerCapture(e.pointerId); const [x, y] = pp(e), r = tCv.getBoundingClientRect(), R = Math.max(14, r.width * .043) + 8;
    if (tbM === 'move') { const t = TAC.tokens; for (let i = t.length - 1; i >= 0; i--) { if (Math.hypot((t[i].x - x) * r.width, (t[i].y - y) * r.height) < R) { tDrag = t[i]; break; } } } else tCur = { type: tbM, color: tbC, pts: [[x, y]] }; };
  tCv.onpointermove = e => { if (!tDrag && !tCur) return; const p = pp(e); if (tDrag) { tDrag.x = p[0]; tDrag.y = p[1]; } else { const l = tCur.pts[tCur.pts.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > .004) tCur.pts.push(p); } drawTB(); };
  tCv.onpointerup = tCv.onpointercancel = () => { if (tCur && tCur.pts.length > 1) TAC.strokes.push(tCur); tCur = null; tDrag = null; drawTB(); };
  requestAnimationFrame(sizeTB);
}
function sizeTB() { if (!tCv) return; const r = tCv.getBoundingClientRect(), d = window.devicePixelRatio || 1; if (!r.width) return; tCv.width = Math.round(r.width * d); tCv.height = Math.round(r.height * d); tCtx.setTransform(d, 0, 0, d, 0, 0); drawTB(); }
window.addEventListener('resize', () => { if (curV === 'lineup' && luTab === 't') sizeTB(); });
function drawTB() {
  if (!tCv || !TAC) return; const r = tCv.getBoundingClientRect(), w = r.width, h = r.height, x = tCtx; if (!w) return;
  for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? '#2A7148' : '#2E7A4D'; x.fillRect(0, i * h / 10, w, h / 10 + 1); }
  x.strokeStyle = 'rgba(255,255,255,.6)'; x.lineWidth = 1.5; const mg = w * .04; x.strokeRect(mg, mg, w - 2 * mg, h - 2 * mg);
  x.beginPath(); x.moveTo(mg, h / 2); x.lineTo(w - mg, h / 2); x.stroke(); x.beginPath(); x.arc(w / 2, h / 2, w * .12, 0, Math.PI * 2); x.stroke();
  x.strokeRect(w * .25, mg, w * .5, h * .13); x.strokeRect(w * .25, h - mg - h * .13, w * .5, h * .13);
  TAC.strokes.concat(tCur ? [tCur] : []).forEach(st => { if (st.pts.length < 2) return; x.strokeStyle = st.color; x.lineWidth = 3.5; x.lineCap = 'round'; x.lineJoin = 'round'; if (st.type === 'arrow') x.setLineDash([10, 8]);
    x.beginPath(); st.pts.forEach((p, i) => i ? x.lineTo(p[0] * w, p[1] * h) : x.moveTo(p[0] * w, p[1] * h)); x.stroke(); x.setLineDash([]);
    if (st.type === 'arrow') { const a = st.pts[st.pts.length - 1], b = st.pts[Math.max(0, st.pts.length - 5)], an = Math.atan2((a[1] - b[1]) * h, (a[0] - b[0]) * w), L = 15; x.beginPath(); x.moveTo(a[0] * w, a[1] * h); x.lineTo(a[0] * w - L * Math.cos(an - .45), a[1] * h - L * Math.sin(an - .45)); x.lineTo(a[0] * w - L * Math.cos(an + .45), a[1] * h - L * Math.sin(an + .45)); x.closePath(); x.fillStyle = st.color; x.fill(); } });
  const R = Math.max(14, w * .043), jp = new Path2D(JP);
  TAC.tokens.forEach(k => { const px = k.x * w, py = k.y * h;
    if (k.team === 'ball') { x.beginPath(); x.arc(px, py, R * .5, 0, Math.PI * 2); x.fillStyle = '#fff'; x.fill(); x.strokeStyle = '#1b1b1b'; x.lineWidth = 1.5; x.stroke(); x.beginPath(); x.arc(px, py, R * .17, 0, Math.PI * 2); x.fillStyle = '#1b1b1b'; x.fill(); return; }
    const kit = k.team === 'B' ? OPP : k.gk ? GK : KIT, sz = R * 2.3; x.save(); x.translate(px - sz / 2, py - sz / 2); x.scale(sz / 100, sz / 100); x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 8; x.shadowOffsetY = 3;
    x.fillStyle = kit.s; x.fill(jp); x.shadowColor = 'transparent'; x.strokeStyle = kit.x; x.lineWidth = 3; x.lineJoin = 'round'; x.stroke(jp);
    x.fillStyle = kit.t; x.font = `800 ${k.l.length > 2 ? 24 : 34}px Archivo, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillText(k.l, 50, 71); x.restore();
    if (k.nm) { x.font = `600 ${Math.round(R * .68)}px Archivo, sans-serif`; const tw = x.measureText(k.nm).width + 10; x.fillStyle = 'rgba(10,10,10,.65)'; x.fillRect(px - tw / 2, py + sz * .45, tw, R * .95); x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(k.nm, px, py + sz * .45 + R * .5); } });
}

/* ---------- TAKIM PAYLAŞIMLARI (maç günü, son 1 saat, ilk 7, maç sonucu) ---------- */
const MONTHS = ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'];
const DAYS = ['PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ'];
const up = t => String(t || '').toLocaleUpperCase('tr-TR');
function clubPosts() {
  const now = Date.now(), out = [];
  MATCHES.forEach(m => {
    const k = when(m).getTime(), created = new Date(m.created).getTime(), day = new Date(`${m.date}T09:00`).getTime();
    const md = Math.max(day, created); if (md <= now && md < k) out.push({ kind: 'matchday', m, at: md });
    const hr = k - 3600e3; if (hr <= now && created <= hr) out.push({ kind: 'hour', m, at: hr });
    if (m.lineup && m.lineup.at) { const a = new Date(m.lineup.at).getTime(); if (a <= now) out.push({ kind: 'lineup', m, at: a }); }
    if (m.result) out.push({ kind: 'result', m, at: new Date(m.result.at || m.created).getTime() });
  });
  return out.map(p => ({ ...p, id: `club-${p.kind}-${p.m.id}` }));
}
const SHIELD = l => `<svg viewBox="0 0 100 106" aria-hidden="true"><path d="M8 10 Q50 -4 92 10 V56 C92 82 72 96 50 104 C28 96 8 82 8 56 Z" fill="#fff"/><text x="50" y="68" text-anchor="middle" font-family="Oswald, Anton, sans-serif" font-weight="700" font-size="44" fill="#8B0F1A">${esc(l)}</text></svg>`;
function tpCrests(m, mid) { return `<div class="tp-crests"><img src="${LOGO}" alt="GOLDNOVA">${mid || ''}${SHIELD(up(opp(m)).slice(0, 1) || 'R')}</div>`; }
const dd = n => String(n).padStart(2, '0');
function clubCard(p) {
  const m = p.m, d = when(m), dot = `${dd(d.getDate())}.${dd(d.getMonth() + 1)}.${d.getFullYear()}`, tm = String(m.time).replace(':', '.'), oppN = up(opp(m));
  const venue = `<div class="tp-venue"><b>${esc(up(m.saha))}</b>${m.adres ? `<small>${esc(up(m.adres))}</small>` : ''}</div>`;
  if (p.kind === 'matchday') return `<div class="cg tp" style="background-image:url(./templates/mac-gunu.jpg)">
    <div class="tp-date">${dot} &nbsp;|&nbsp; ${tm}</div>${tpCrests(m)}<div class="tp-vs">GOLDNOVA VS ${esc(oppN)}</div>${venue}</div>`;
  if (p.kind === 'hour') return `<div class="cg tp" style="background-image:url(./templates/bos.jpg)"><div class="tp-h">SON 1 SAAT</div>
    <div class="tp-date">BAŞLAMA &nbsp;|&nbsp; ${tm}</div>${tpCrests(m)}<div class="tp-vs">GOLDNOVA VS ${esc(oppN)}</div>${venue}</div>`;
  if (p.kind === 'lineup') {
    const fmt = Math.min(8, Math.max(5, m.format || 7)), fm = FORM[fmt], sl = fm[m.lineup.form] || Object.values(fm)[0];
    const rows = sl.map(([, , r], i) => { const u = byId(m.lineup.slots[i]); return u ? `<div><b>${esc(u.num || '–')}</b><span>${esc(up(u.name))}</span><small>${r}</small></div>` : ''; }).join('');
    const ids = new Set(m.lineup.slots.filter(Boolean)), subs = going(m).filter(u => !ids.has(u.id)).map(u => up(u.name.split(' ')[0]));
    return `<div class="cg tp" style="background-image:url(./templates/bos.jpg)"><div class="tp-h">İLK ${sl.length}</div>
      <div class="tp-date">VS ${esc(oppN)} &nbsp;|&nbsp; ${esc(m.lineup.form)}</div><div class="tp-list">${rows}</div>
      <div class="tp-venue"><b class="nw">${dd(d.getDate())}.${dd(d.getMonth() + 1)} &nbsp;|&nbsp; ${tm} &nbsp;|&nbsp; ${esc(up(m.saha))}</b>${subs.length ? `<small>YEDEKLER: ${esc(subs.join(', '))}</small>` : ''}</div></div>`;
  }
  const r = m.result, sc = Object.entries(r.goals || {}).map(([id, v]) => { const u = byId(id); return u ? up(u.name.split(' ')[0]) + (v > 1 ? ` (${v})` : '') : ''; }).filter(Boolean).join(', '), mvp = byId(r.mvp);
  return `<div class="cg tp" style="background-image:url(./templates/bos.jpg)"><div class="tp-h">MAÇ SONUCU</div>
    <div class="tp-date">${r.us > r.them ? 'GALİBİYET' : r.us < r.them ? 'MAĞLUBİYET' : 'BERABERLİK'} &nbsp;|&nbsp; ${dot}</div>${tpCrests(m, `<div class="tp-score">${r.us}<i>-</i>${r.them}</div>`)}
    <div class="tp-vs">GOLDNOVA VS ${esc(oppN)}</div>
    <div class="tp-venue">${sc ? `<b>⚽ ${esc(sc)}</b>` : `<b>${esc(up(m.saha))}</b>`}${mvp ? `<small>MAÇIN ADAMI: ${esc(up(mvp.name))}</small>` : ''}</div></div>`;
}
function clubCaption(p) {
  const m = p.m, g = going(m).length;
  if (p.kind === 'matchday') return `Maç günü! ⚽ Bugün saat ${m.time}’de ${m.saha}’da ${opp(m)} karşısındayız. ${g}/${m.format} kişi hazır, gelmeyi düşünen uygulamadan işaretlesin. #GOLDNOVA`;
  if (p.kind === 'hour') return `Son 1 saat! ⏱ ${m.time}’de ${m.saha}’dayız. Kramponlar, formalar, su… Herkes sahada olsun. #GOLDNOVA`;
  if (p.kind === 'lineup') return `${opp(m)} maçının ilk ${(m.lineup.slots || []).filter(Boolean).length}’si belli oldu. Taktik: ${m.lineup.form}. 📋 #GOLDNOVA`;
  const r = m.result; return `Maç sonu: GOLDNOVA ${r.us} – ${r.them} ${opp(m)}. ${r.us > r.them ? 'Kazandık! 🏆' : r.us < r.them ? 'Bir dahakine kazanacağız. 💪' : 'Puanlar paylaşıldı.'} Golleri ve puanları uygulamada gör. #GOLDNOVA`;
}
function clubPostHTML(p) {
  return `<article class="card post" id="post-${p.id}"><div class="post-h"><span class="av m" style="background:#0D0D0D"><img src="${LOGO}" alt="" style="object-fit:contain;padding:3px"></span><div class="n"><b>GOLDNOVA United <span class="vf" aria-label="Resmi hesap">✔</span></b><small>Takım hesabı, ${rel(new Date(p.at).toISOString())}</small></div></div>
   <div class="cg-wrap">${clubCard(p)}</div><div class="post-b">${esc(clubCaption(p))}</div>
   <div class="post-a"><button data-img="${p.id}" aria-label="Görseli paylaş">${IC.share}Görsel</button><button data-cwa="${p.id}" aria-label="WhatsApp">${IC.wa}WhatsApp</button><button data-match="${p.m.id}" style="margin-left:auto;color:var(--accent)">Maç detayı</button></div></article>`;
}
function loadH2C() { return window.html2canvas ? Promise.resolve() : new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'; s.onload = res; s.onerror = () => rej(new Error('Görsel aracı yüklenemedi')); document.head.appendChild(s); }); }
async function shareCard(el, name) {
  try {
    toast('Görsel hazırlanıyor…'); await loadH2C(); await document.fonts.ready;
    const c = await window.html2canvas(el, { scale: 1080 / el.offsetWidth, backgroundColor: '#0D0D0D', useCORS: true, logging: false });
    const blob = await new Promise(r => c.toBlob(r, 'image/png')); const f = new File([blob], name, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [f] })) { try { await navigator.share({ files: [f], title: 'GOLDNOVA United' }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); toast('Görsel indirildi');
  } catch (e) { fail(e); }
}
function bindClub(root) {
  root.querySelectorAll('[data-img]').forEach(b => b.onclick = () => { const el = document.querySelector(`#post-${b.dataset.img} .cg`); if (el) shareCard(el, b.dataset.img + '.png'); });
  root.querySelectorAll('[data-cwa]').forEach(b => b.onclick = () => { const p = clubPosts().find(x => x.id === b.dataset.cwa); if (p) shareText(`${clubCaption(p)}\n👉 ${BASE}#feed/${p.id}`); });
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
  $('#feedF').innerHTML = [['all', 'Tümü'], ['club', 'Takım'], ...Object.entries(TAGS)].map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${feedF === k}">${l}</button>`).join('');
  $('#feedF').querySelectorAll('.chip').forEach(b => b.onclick = () => { feedF = b.dataset.f; renderFeed(); });
  const vids = feedF === 'club' ? [] : VIDEOS.filter(v => feedF === 'all' || v.tag === feedF).map(v => ({ t: new Date(v.created).getTime(), h: () => postHTML(v) }));
  const club = feedF === 'all' || feedF === 'club' ? clubPosts().map(p => ({ t: p.at, h: () => clubPostHTML(p) })) : [];
  const list = [...vids, ...club].sort((a, b) => b.t - a.t);
  $('#feed').innerHTML = list.length ? list.map(x => x.h()).join('') : '<div class="empty">Henüz paylaşım yok. Maç günü ve son 1 saat paylaşımları burada otomatik çıkar. Gol, kurtarış ya da komik bir anı da ilk sen paylaş.</div>';
  bindFeed($('#feed')); bindClub($('#feed'));
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
   <div class="pc-b"><div class="n">${esc(p.name)}${roleTag(p)}</div><div class="p">${POS[p.pos]}${p.nick ? ', “' + esc(p.nick) + '”' : ''}</div>
   <div class="pc-s"><span><b>${s.matches}</b>Maç</span><span><b>${p.pos === 'KL' ? s.cs : s.goals}</b>${p.pos === 'KL' ? 'Gol yemedi' : 'Gol'}</span><span>${rb(s.avg)}Puan</span></div></div></button>`;
}
function renderSquad() {
  const C = calc();
  if (isAdmin() && !$('#sqAdd')) { $('#sqView').insertAdjacentHTML('beforebegin', '<button class="btn pri" id="sqAdd">+ Oyuncu ekle</button>'); $('#sqAdd').onclick = addGuest; }
  $('#sqSub').textContent = `${USERS.length} oyuncu`;
  $('#posF').innerHTML = [['ALL', 'Hepsi'], ...Object.entries(POS)].map(([k, l]) => `<button class="chip" data-p="${k}" aria-pressed="${posF === k}">${l}</button>`).join('');
  $('#posF').querySelectorAll('.chip').forEach(b => b.onclick = () => { posF = b.dataset.p; renderSquad(); });
  if (!$('#sqView [data-v="f"]')) $('#sqView').insertAdjacentHTML('afterbegin', '<button data-v="f">FUT</button>');
  $('#sqView').querySelectorAll('button').forEach(b => { b.setAttribute('aria-pressed', b.dataset.v === sqV); b.onclick = () => { sqV = b.dataset.v; renderSquad(); }; });
  const list = USERS.filter(p => posF === 'ALL' || p.pos === posF);
  const kits = `<div class="card kitshow"><div class="sh"><h2 class="st">Formalar</h2><span class="muted" style="font-size:13px">2024/25 sezonu</span></div><div class="kits3">
     <figure>${kitSVG({})}<figcaption><b>İç saha</b><small>Bordo, altın detay</small></figcaption></figure>
     <figure>${kitSVG({ back: true, name: ME.name.split(' ')[0], num: ME.num || '10' })}<figcaption><b>Senin formam</b><small>${esc(up(ME.name.split(' ')[0]))} ${esc(ME.num || '')}</small></figcaption></figure>
     <figure>${kitSVG({ gk: true })}<figcaption><b>Kaleci</b><small>Siyah, altın detay</small></figcaption></figure></div></div>`;
  if (sqV === 'f') { $('#squad').innerHTML = kits + `<div class="futs">${[...list].sort((a, b) => ovr(b) - ovr(a)).map(p => `<button class="futb" data-prof="${p.id}" aria-label="${esc(p.name)} kartı">${futCard(p, C[p.id])}</button>`).join('')}</div>`; }
  else $('#squad').innerHTML = sqV === 'c' ? `<div class="pcs">${[...list].sort((a, b) => ovr(b) - ovr(a)).map(p => pcard(p, C[p.id])).join('')}</div>`
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
  sheet(`<div class="ph ${p.pos === 'KL' ? 'gk' : ''}"><div class="ph-top"><span style="font-size:13px;opacity:.8">GOLDNOVA United${p.role === 'owner' ? ', kurucu' : p.role === 'admin' ? ', yönetici' : p.guest ? ', kayıtsız oyuncu' : ''}</span><button class="x" data-close aria-label="Kapat">×</button></div>
    <div class="ph-main"><span class="camw">${avatar(p, 'xxl')}${mine ? `<button class="cam" id="pCam" aria-label="Fotoğraf değiştir">${IC.cam}</button>` : ''}</span>
    <div><div class="ph-n">${esc(p.name)}</div><div class="ph-m">${POS[p.pos]}, ${esc(p.foot)} ayak${p.nick ? '<br>“' + esc(p.nick) + '”' : ''}</div><div style="margin-top:8px;display:flex;gap:6px;align-items:center">${rb(s.avg)}<span style="font-size:12.5px;opacity:.8">ortalama puan</span></div></div></div>
    <span class="ph-num">${esc(p.num || '')}</span></div>
   <div class="sec"><div class="kv"><div><b>${s.matches}</b><small>Maç</small></div><div><b>${s.goals}</b><small>Gol</small></div><div><b>${s.assists}</b><small>Asist</small></div><div><b>%${wr}</b><small>Galibiyet</small></div><div><b>${s.mvp}</b><small>Maçın adamı</small></div><div><b>${p.pos === 'KL' ? s.cs : ovr(p)}</b><small>${p.pos === 'KL' ? 'Gol yemediği maç' : 'Güç'}</small></div></div></div>
   <div class="sec"><h4>Form (son 5 maç)</h4>${s.log.length ? `<div class="form5">${s.log.slice(0, 5).map(x => `<div>${rb(x.rt)}<span class="res ${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}" style="width:18px;height:18px;font-size:10px">${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}</span><span>${fShort(when(x.m))}</span></div>`).join('')}</div>` : '<p class="sub">Henüz maç oynamadı.</p>'}</div>
   ${vids.length ? `<div class="sec"><h4>Videoları (${vids.length})</h4><div class="vgrid">${vids.slice(0, 6).map(thumb).join('')}</div></div>` : ''}
   <div class="sec"><div class="sh"><h4 style="margin:0">Forma ve oyuncu kartı</h4><div class="seg" id="kitSeg"><button data-k="b" aria-pressed="true">Arka</button><button data-k="f" aria-pressed="false">Ön</button><button data-k="c" aria-pressed="false">FUT kartı</button></div></div>
    <div class="kitstage" id="kitStage"><div class="kit-wrap" data-k="b">${kitSVG({ gk: p.pos === 'KL', back: true, name: p.name.split(' ')[0], num: p.num || '' })}</div><div class="kit-wrap hide" data-k="f">${kitSVG({ gk: p.pos === 'KL' })}</div><div class="kit-wrap hide" data-k="c"><div class="fut-one">${futCard(p, s)}</div></div></div>
    <div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" id="kitShare">${IC.share}Görseli paylaş</button></div></div>
   <div class="sec"><h4>Özellikler</h4><div class="attr">${radar(p)}<div class="bars">${STATS.map(([k, l]) => `<div><span>${l}</span><i><span style="width:${p.stats[k]}%"></span></i><em>${p.stats[k]}</em></div>`).join('')}</div></div></div>
   <div class="sec"><h4>Rozetler</h4><div class="bdg">${BADGES.map(([e, n, f]) => `<div class="${f(s) ? '' : 'off'}"><span>${e}</span>${n}</div>`).join('')}</div></div>
   ${s.log.length ? `<div class="sec"><h4>Son maçlar</h4><div class="rl">${s.log.slice(0, 6).map(x => `<div><span class="res ${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}">${x.res === 'wins' ? 'G' : x.res === 'losses' ? 'M' : 'B'}</span><button data-match="${x.m.id}" style="border:none;background:none;text-align:left;padding:0">${x.m.result.us}–${x.m.result.them} <span class="muted">vs ${esc(opp(x.m))}</span></button><span class="muted" style="font-size:12.5px">${x.g ? '⚽' + x.g + ' ' : ''}${x.a ? '🅰' + x.a : ''}${x.m.result.mvp === p.id ? ' ⭐' : ''}</span>${rb(x.rt)}</div>`).join('')}</div></div>` : ''}
   <div class="row" style="margin-top:18px">${mine ? '<a class="btn pri" href="#me" id="pMe">Profilimi düzenle</a>' : ''}${isAdmin() ? '<button class="btn" id="pAdm">Yönetici: oyuncuyu düzenle</button>' : ''}</div>`,
  b => {
    bind(b); b.querySelectorAll('.vth').forEach(x => x.onclick = () => { dlg.close(); location.hash = 'feed/' + x.dataset.v; });
    const c = b.querySelector('#pCam'); if (c) c.onclick = pickPhoto;
    const pm = b.querySelector('#pMe'); if (pm) pm.onclick = () => dlg.close();
    const pa = b.querySelector('#pAdm'); if (pa) pa.onclick = () => adminPlayer(p);
    let kk = 'b'; b.querySelectorAll('#kitSeg button').forEach(x => x.onclick = () => { kk = x.dataset.k; b.querySelectorAll('#kitSeg button').forEach(y => y.setAttribute('aria-pressed', y === x)); b.querySelectorAll('.kit-wrap').forEach(w => w.classList.toggle('hide', w.dataset.k !== kk)); });
    b.querySelector('#kitShare').onclick = () => { const el = kk === 'c' ? b.querySelector('.fut-one .fut') : b.querySelector('#kitStage'); shareCard(el, `goldnova-${kk === 'c' ? 'kart' : 'forma'}-${(p.name.split(' ')[0] || 'oyuncu').toLowerCase()}.png`); };
  });
}
function addGuest() {
  sheet(`<p class="sub" style="margin-bottom:12px">Uygulamaya kayıt olmayan oyuncuları buradan ekle. Maçlara, kadroya ve istatistiklere dahil olurlar. Bildirim almazlar.</p>
   <form class="form" id="gf"><label class="f full">Ad soyad<input type="text" name="name" maxlength="30" required placeholder="Örn. Ahmet Yılmaz"></label>
   <label class="f">Mevki<select name="pos">${Object.entries(POS).map(([k, l]) => `<option value="${k}" ${k === 'OS' ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
   <label class="f">Forma no<input type="number" name="num" min="0" max="99"></label>
   <label class="f full">Ayak<select name="foot"><option>Sağ</option><option>Sol</option><option>İki ayak</option></select></label>
   <div class="full row" style="justify-content:flex-end;margin-top:6px"><button class="btn" type="button" data-close>Vazgeç</button><button class="btn pri" type="submit">Kadroya ekle</button></div></form>`,
  b => { b.querySelector('[data-close]').onclick = () => dlg.close(); b.querySelector('#gf').onsubmit = async e => { e.preventDefault(); const btn = e.target.querySelector('[type=submit]'); btn.disabled = true; try { const j = await api('/users', { method: 'POST', body: Object.fromEntries(new FormData(e.target)) }); USERS.push(j.user); toast(j.user.name + ' kadroya eklendi'); profile(j.user.id); } catch (er) { fail(er); btn.disabled = false; } }; }, 'Oyuncu ekle');
}
function adminPlayer(p) {
  const st2 = { ...p.stats };
  sheet(`<div class="form"><label class="f">Mevki<select id="aP">${Object.entries(POS).map(([k, l]) => `<option value="${k}" ${k === p.pos ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
   <label class="f">Forma no<input type="number" id="aN" min="0" max="99" value="${esc(p.num)}"></label>
   ${isOwner() && p.id !== ME.id && !p.guest && p.role !== 'owner' ? `<label class="f full">Rol<select id="aR"><option value="member" ${p.role !== 'admin' ? 'selected' : ''}>Üye</option><option value="admin" ${p.role === 'admin' ? 'selected' : ''}>Yönetici (maç ekler, sonuç ve kadro girer)</option></select><span class="muted" style="font-weight:500">Yöneticiler senin rolünü değiştiremez, sadece sen yönetici atayıp çıkarabilirsin.</span></label>` : ''}
   ${p.guest ? `<label class="f full">Ad soyad<input type="text" id="aName" value="${esc(p.name)}" maxlength="30"></label>` : ''}</div>
   <div class="sec"><h4>Özellikler</h4><div style="display:flex;flex-direction:column;gap:5px">${STATS.map(([k, l]) => `<div class="sin"><span>${l}</span><input type="range" min="30" max="99" value="${st2[k]}" data-k="${k}" aria-label="${l}"><output id="o-${k}">${st2[k]}</output></div>`).join('')}</div></div>
   <div class="row" style="justify-content:space-between;margin-top:16px">${p.id !== ME.id && p.role !== 'owner' && (p.role === 'member' || isOwner()) ? '<button class="btn ghost danger" id="aDel">Takımdan çıkar</button>' : '<span></span>'}<div class="row"><button class="btn" id="aBack">Geri</button><button class="btn pri" id="aOk">Kaydet</button></div></div>`,
  b => {
    b.querySelectorAll('input[type=range]').forEach(i => i.oninput = () => { st2[i.dataset.k] = +i.value; b.querySelector('#o-' + i.dataset.k).textContent = i.value; });
    b.querySelector('#aBack').onclick = () => profile(p.id);
    b.querySelector('#aOk').onclick = async () => { const r = b.querySelector('#aR'); try { const j = await api('/users/' + p.id, { method: 'PUT', body: { pos: b.querySelector('#aP').value, num: b.querySelector('#aN').value, stats: st2, role: r ? r.value : undefined, name: b.querySelector('#aName') ? b.querySelector('#aName').value : undefined } }); upd(USERS, j.user); if (j.user.id === ME.id) ME = { ...ME, ...j.user }; toast('Oyuncu güncellendi'); profile(p.id); } catch (e) { fail(e); } };
    const d = b.querySelector('#aDel'); if (d) d.onclick = async () => { if (!confirm(p.name + ' takımdan çıkarılsın mı?' + (p.guest ? '' : ' Profili silinir.'))) return; try { await api('/users/' + p.id, { method: 'DELETE' }); USERS = USERS.filter(u => u.id !== p.id); dlg.close(); toast('Oyuncu çıkarıldı'); } catch (e) { fail(e); } };
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

/* ---------- MAÇIN ADAMI OYLAMASI ---------- */
const VOTE_H = 48;
const voteOpen = m => m.result && Date.now() - new Date(m.result.at || m.created).getTime() < VOTE_H * 3600e3;
function voteCounts(m) { const c = {}; VOTES.filter(v => v.match_id === m.id).forEach(v => c[v.target] = (c[v.target] || 0) + 1); return c; }
function mvpOf(m) { const r = m.result; if (!r) return null; if (r.mvp) return r.mvp; if (voteOpen(m)) return null; const c = voteCounts(m), top = Object.entries(c).sort((a, b) => b[1] - a[1]); return top.length && (!top[1] || top[0][1] > top[1][1]) ? top[0][0] : null; }
function voteHTML(m) {
  const r = m.result, c = voteCounts(m), tot = Object.values(c).reduce((a, b) => a + b, 0), mine = (VOTES.find(v => v.match_id === m.id && v.voter === ME.id) || {}).target, open = voteOpen(m), win = mvpOf(m);
  const ps = (r.players || []).map(byId).filter(Boolean); if (!ps.length) return '';
  const left = Math.max(0, Math.ceil((new Date(r.at || m.created).getTime() + VOTE_H * 3600e3 - Date.now()) / 3600e3));
  return `<div class="sec"><div class="sh"><h4 style="margin:0">⭐ Maçın adamı oylaması</h4><span class="muted" style="font-size:12.5px">${r.mvp ? 'Yönetici seçti' : open ? `${left} saat kaldı, ${tot} oy` : `Oylama bitti, ${tot} oy`}</span></div>
   ${win ? `<div class="banner" style="margin-bottom:8px"><span>🏅 Maçın adamı: <b>${esc(byId(win) ? byId(win).name : '?')}</b></span></div>` : ''}
   <div class="votes">${ps.sort((a, b) => (c[b.id] || 0) - (c[a.id] || 0)).map(p => { const n = c[p.id] || 0, pc = tot ? Math.round(n / tot * 100) : 0;
     return `<button class="vote ${mine === p.id ? 'on' : ''}" data-vote="${p.id}" ${!open || p.id === ME.id || r.mvp ? 'disabled' : ''}>${avatar(p, 's')}<span class="vn"><b>${esc(p.name)}</b><i style="width:${pc}%"></i></span><em>${n ? pc + '%' : ''}</em></button>`; }).join('')}</div>
   ${open && !r.mvp ? `<p class="sub" style="margin-top:6px">${mine ? 'Oyunu değiştirmek için başka birine dokun.' : 'Maçta oynayanlardan birine oy ver. Kendine oy veremezsin.'}</p>` : ''}</div>`;
}
function bindVote(root, m) { root.querySelectorAll('[data-vote]').forEach(b => b.onclick = async () => { try { await api(`/matches/${m.id}/vote`, { method: 'POST', body: { target: b.dataset.vote } }); toast('Oyun kaydedildi ⭐'); matchDetail(m.id); } catch (e) { fail(e); } }); }

/* ---------- KASA (saha ücreti borç takibi) ---------- */
function kasa() {
  const D = {}; USERS.forEach(u => D[u.id] = { owe: 0, items: [] });
  MATCHES.filter(m => +m.ucret > 0 && when(m) < Date.now()).forEach(m => {
    const att = m.result && (m.result.players || []).length ? m.result.players : going(m).map(u => u.id); if (!att.length) return;
    const share = m.ucret / att.length;
    att.forEach(id => { if (D[id] && !m.paid.includes(id)) { D[id].owe += share; D[id].items.push({ m, share }); } });
  });
  return D;
}
function kasaHTML() {
  const D = kasa(), list = USERS.filter(u => D[u.id].owe > 0.5).sort((a, b) => D[b.id].owe - D[a.id].owe), tot = list.reduce((s, u) => s + D[u.id].owe, 0);
  return `<div class="card"><div class="sh"><h2 class="st">Kasa</h2><span class="muted" style="font-size:13px">${tot ? 'Toplam alacak ' + tl(tot) : ''}</span></div>
   ${list.length ? `<div class="pl">${list.map(u => `<button class="pr kasa-r" data-kasa-u="${u.id}" style="grid-template-columns:auto 1fr auto;border-left:none;border-right:none;border-top:none;background:none;width:100%;text-align:left">${avatar(u, 's')}<span class="n"><b>${esc(u.name)}</b><small>${D[u.id].items.length} maç ödenmedi</small></span><b class="debt">${tl(D[u.id].owe)}</b></button>`).join('')}</div>` : '<p class="sub">Herkes ödemiş, kasada borç yok. 👏</p>'}
   <p class="sub" style="margin-top:8px">Maç ücreti oynayanlara bölünür. ${isAdmin() ? 'Ödeyenleri işaretlemek için kişiye dokun.' : 'Ödemeleri yönetici işaretler.'}</p></div>`;
}
function bindKasa(root) { root.querySelectorAll('[data-kasa-u]').forEach(b => b.onclick = () => kasaUser(b.dataset.kasaU)); }
function kasaUser(id) {
  const u = byId(id), D = kasa()[id];
  sheet(`<p class="sub" style="margin-bottom:10px">${esc(u.name)} için ödenmemiş maçlar. Toplam <b>${tl(D.owe)}</b>.</p><div class="pl">${D.items.map(({ m, share }) => `<div class="pr" style="grid-template-columns:1fr auto auto"><span class="n"><b>${esc(fShort(when(m)))}: GOLDNOVA – ${esc(opp(m))}</b><small>${esc(m.saha)}</small></span><b>${tl(share)}</b>${isAdmin() ? `<button class="btn sm gold" data-pd="${m.id}">Ödedi</button>` : ''}</div>`).join('') || '<p class="sub">Borç yok.</p>'}</div>
   <div class="row" style="margin-top:14px"><button class="btn wa" id="kWa">${IC.wa}Hatırlatma gönder</button></div>`,
  b => { b.querySelectorAll('[data-pd]').forEach(x => x.onclick = async () => { try { const m = MATCHES.find(y => y.id === x.dataset.pd); if (!m.rsvp[id]) await api(`/matches/${m.id}/rsvp`, { method: 'POST', body: { status: 'gel', userId: id } }); const j = await api(`/matches/${m.id}/paid`, { method: 'POST', body: { userId: id } }); upd(MATCHES, j.match); toast('Ödendi olarak işaretlendi'); kasaUser(id); } catch (e) { fail(e); } });
    b.querySelector('#kWa').onclick = () => shareText(`Selam ${u.name.split(' ')[0]} 👋 GOLDNOVA kasasında ${tl(D.owe)} saha ücretin görünüyor (${D.items.length} maç). Müsait olunca halledelim mi? ⚽`); }, 'Kasa: ' + esc(u.name));
}
function debtBan() { const d = kasa()[ME.id]; return d && d.owe > 0.5 ? `<button class="banner" data-kasa style="width:100%;margin-bottom:12px;text-align:left;font:inherit;color:inherit"><span>💸 Kasada <b>${tl(d.owe)}</b> saha ücretin var (${d.items.length} maç).</span><span class="muted">Detay ›</span></button>` : ''; }

/* ---------- CANLI SKOR (Supabase Realtime ile herkese anlık) ---------- */
const lvEl = L => L ? (L.acc || 0) + (L.run ? Date.now() - L.t0 : 0) : 0;
const lvMin = L => Math.max(1, Math.ceil(lvEl(L) / 60000));
const mmss = ms => { const t = Math.floor(ms / 1000); return dd(Math.floor(t / 60)) + ':' + dd(t % 60); };
function liveBan() { const m = MATCHES.find(x => x.live && x.live.on && !x.result); if (!m) return ''; const L = m.live; return `<button class="liveban" data-live="${m.id}" style="margin-bottom:12px"><i></i><span>Canlı: GOLDNOVA ${L.a} – ${L.b} ${esc(opp(m))}</span><em>${L.run ? lvMin(L) + '’' : 'Devre arası'}</em></button>`; }
function realtime() {
  if (!sb || realtime.on) return; realtime.on = true;
  sb.channel('gn-matches').on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, async pl => {
    if (pl.eventType === 'DELETE') { MATCHES = MATCHES.filter(x => x.id !== pl.old.id); } else { try { upd(MATCHES, await fetchMatch(pl.new.id)); } catch { return; } }
    const lb = $('#lvb'); if (dlg.open && lb && lb.dataset.id === (pl.new && pl.new.id)) liveBoard(lb.dataset.id, true); else if (!dlg.open) render();
  }).subscribe();
}
async function saveLive(m, L, goal) { try { const j = await api(`/matches/${m.id}/live`, { method: 'POST', body: { live: L, goal } }); upd(MATCHES, j.match); } catch (e) { fail(e); } }
function liveBoard(id, keepPick) {
  const m = MATCHES.find(x => x.id === id); if (!m) return;
  const adm = isAdmin(), L = m.live && m.live.on ? m.live : null;
  if (!L) { if (!adm) { toast('Canlı skor henüz başlamadı'); return; } saveLive(m, { on: true, run: false, acc: 0, t0: 0, a: 0, b: 0, ev: [], len: 60 }).then(() => liveBoard(id)); return; }
  const ours = (m.lineup && m.lineup.slots ? m.lineup.slots.filter(Boolean) : going(m).map(u => u.id)).map(byId).filter(Boolean);
  const evH = [...L.ev].sort((x, y) => x.min - y.min).map(e => { const p = byId(e.pid), a = byId(e.ast); return `<div class="ke ${e.side === 'B' ? 'a' : 'h'}"><b>${e.min}’</b><span>⚽ ${e.side === 'B' ? esc(opp(m)) : esc(p ? p.name : 'GOLDNOVA')}${a ? ` <small class="muted">(${esc(a.name)})</small>` : ''}</span></div>`; }).join('');
  sheet(`<div class="lvb" id="lvb" data-id="${m.id}"><div class="lvh"><span class="lvl ${L.run ? 'on' : ''}"><i></i>${L.run ? 'Canlı' : L.acc ? 'Devre arası' : 'Başlamadı'}</span><button class="x" data-close aria-label="Kapat">×</button></div>
    <div class="lv-teams"><div class="tm"><span class="tbg">${CREST}</span><b>GOLDNOVA</b></div><div class="lv-sc"><span>${L.a}</span><em>–</em><span>${L.b}</span></div><div class="tm"><span class="tbg">${jersey(OPP)}</span><b>${esc(opp(m))}</b></div></div>
    <div class="lv-clock"><b id="lvClock">${mmss(lvEl(L))}</b><label>/ ${L.len} dk</label></div>
    ${adm ? `<div class="lv-ctl"><button class="btn gold" id="lvRun">${L.run ? 'Duraklat' : L.acc ? 'Devam et' : 'Maçı başlat'}</button></div>
    <div class="lv-goal"><button class="btn" id="lvGA">+ Gol GOLDNOVA</button><button class="btn" id="lvGB">+ Gol ${esc(opp(m))}</button></div>` : '<p class="sub" style="text-align:center;color:#bbb;margin-top:10px">Skor yönetici tarafından anlık güncelleniyor.</p>'}</div>
   <div id="lvPick"></div>
   <div class="sec"><h4>Maç akışı</h4><div class="kes">${evH || '<p class="sub">Henüz gol yok.</p>'}</div></div>
   <div class="row" style="margin-top:14px">${adm ? '<button class="btn" id="lvUndo">Son golü geri al</button>' : ''}<button class="btn wa" id="lvSh">${IC.wa}Skoru paylaş</button></div>
   ${adm ? '<div class="row" style="margin-top:10px"><button class="btn pri" id="lvEnd">Maçı bitir ve sonucu kaydet</button><button class="btn ghost danger" id="lvReset" style="margin-left:auto">İptal et</button></div>' : ''}`,
  b => {
    b.querySelector('#lvSh').onclick = () => shareText(`🔴 Canlı | GOLDNOVA ${L.a} – ${L.b} ${opp(m)} (${lvMin(L)}’)\n👉 ${BASE}#live/${m.id}`);
    if (!adm) return;
    const put = (fn, goal) => { const N = JSON.parse(JSON.stringify(L)); fn(N); saveLive(m, N, goal).then(() => liveBoard(id)); };
    b.querySelector('#lvRun').onclick = () => put(N => { if (N.run) { N.acc += Date.now() - N.t0; N.run = false; } else { N.t0 = Date.now(); N.run = true; } });
    const add = (side, pid, ast) => put(N => { N.ev.push({ side, pid, ast, min: lvMin(N) }); N[side === 'A' ? 'a' : 'b']++; }, true);
    const pick = () => { const pk = b.querySelector('#lvPick');
      const list = (title, items, cb) => { pk.innerHTML = `<div class="card" style="margin-top:12px"><div class="sh"><h4 style="margin:0">${title}</h4><button class="link" id="pkX">Vazgeç</button></div><div class="pk">${items.map(([pid, nm]) => `<button data-id="${pid}">${pid ? avatar(byId(pid), 's') : '<span class="av s" style="background:var(--s2);color:var(--muted)">?</span>'}<span><b>${esc(nm)}</b></span><span></span></button>`).join('')}</div></div>`;
        pk.querySelector('#pkX').onclick = () => { pk.innerHTML = ''; }; pk.querySelectorAll('.pk button').forEach(x => x.onclick = () => cb(x.dataset.id || null)); pk.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      list('Golü kim attı?', [...ours.map(p => [p.id, p.name]), ['', 'Bilinmiyor']], sc => list('Asisti kim yaptı?', [['', 'Asist yok'], ...ours.filter(p => p.id !== sc).map(p => [p.id, p.name])], as => add('A', sc, as))); };
    b.querySelector('#lvGA').onclick = pick; b.querySelector('#lvGB').onclick = () => add('B', null, null);
    b.querySelector('#lvUndo').onclick = () => { if (!L.ev.length) { toast('Geri alınacak gol yok'); return; } put(N => { const e = N.ev.pop(); N[e.side === 'A' ? 'a' : 'b'] = Math.max(0, N[e.side === 'A' ? 'a' : 'b'] - 1); }); };
    b.querySelector('#lvReset').onclick = () => { if (!confirm('Canlı skor iptal edilsin mi?')) return; saveLive(m, null).then(() => dlg.close()); };
    b.querySelector('#lvEnd').onclick = () => { const gl = {}, as = {}; L.ev.forEach(e => { if (e.pid) gl[e.pid] = (gl[e.pid] || 0) + 1; if (e.ast) as[e.ast] = (as[e.ast] || 0) + 1; });
      m.__pre = { us: L.a, them: L.b, gl, as, players: ours.map(p => p.id) }; resultEditor(m); };
  });
}
setInterval(() => { const c = $('#lvClock'), lb = $('#lvb'); if (c && lb && dlg.open) { const m = MATCHES.find(x => x.id === lb.dataset.id); if (m && m.live) c.textContent = mmss(lvEl(m.live)); } }, 1000);

/* ---------- SÜPER LİG (ESPN verisi, Supabase "lig" fonksiyonu üzerinden) ---------- */
const GS_ID = '432', GSK = { s: '#A90432', t: '#FDB912', x: '#FDB912' }, OTK = { s: '#ECECEF', t: '#1a1a1a', x: '#8a8a92' };
const COMPS = [['tur.1', 'Süper Lig'], ['uefa.champions', 'Şampiyonlar Ligi'], ['uefa.europa', 'Avrupa Ligi'], ['tur.cup', 'Türkiye Kupası']];
let ligTab = 'gs', ligCache = {}, ligTimer = null, ligDetTimer = null;
(function ensureLigUI() {
  if ($('#v-lig')) return;
  $('main').insertAdjacentHTML('beforeend', `<section class="view" id="v-lig"><div class="vh"><div><h1 class="ttl">Süper Lig</h1><p class="sub" id="ligSub">Galatasaray, puan durumu ve maçlar</p></div><button class="ib" id="ligRef" aria-label="Yenile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 12a8 8 0 11-3-6.3M20 4v5h-5"/></svg></button></div>
    <div class="seg" id="ligSeg" style="margin-bottom:12px"><button data-t="gs">Galatasaray</button><button data-t="tab">Puan durumu</button><button data-t="fix">Maçlar</button></div><div id="ligBody"></div></section>`);
  const nav = $('nav.tabs .in'); nav.style.gridTemplateColumns = 'repeat(6,1fr)';
  nav.insertAdjacentHTML('beforeend', `<a href="#lig" data-v="lig"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 01-10 0z"/><path d="M7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8"/></svg>Lig</a>`);
  $('#ligSeg').querySelectorAll('button').forEach(b => b.onclick = () => { ligTab = b.dataset.t; renderLig(); });
  $('#ligRef').onclick = () => { ligCache = {}; renderLig(); };
})();
async function espn(path, query, ttl = 90e3) {
  const k = path + JSON.stringify(query || {}), c = ligCache[k];
  if (c && Date.now() - c.t < ttl) return c.d;
  const r = await sb.functions.invoke('lig', { body: { path, query } });
  if (r.error || !r.data || r.data.error) throw new Error((r.data && r.data.error) || 'Lig verisi alınamadı. Supabase’de “lig” fonksiyonu kurulu mu?');
  ligCache[k] = { t: Date.now(), d: r.data }; return r.data;
}
const ymd = d => `${d.getFullYear()}${dd(d.getMonth() + 1)}${dd(d.getDate())}`;
const tLogo = t => t ? (t.logo || (t.logos && t.logos[0] && t.logos[0].href) || '') : '';
const sc = c => { if (!c) return ''; const v = c.score; return v == null ? '' : typeof v === 'object' ? (v.displayValue ?? v.value ?? '') : v; };
function evP(e, lg) {
  const c = (e.competitions || [])[0] || {}, st = c.status || e.status || {}, ty = st.type || {}, cs = c.competitors || [];
  const side = x => ({ id: x.team && String(x.team.id), name: x.team ? (x.team.shortDisplayName || x.team.displayName) : '?', abbr: x.team && x.team.abbreviation, logo: tLogo(x.team), score: sc(x), win: x.winner });
  const h = cs.find(x => x.homeAway === 'home') || cs[0] || {}, a = cs.find(x => x.homeAway === 'away') || cs[1] || {};
  return { id: String(e.id), lg, comp: (COMPS.find(x => x[0] === lg) || [, ''])[1], date: new Date(e.date), state: ty.state || 'pre', detail: ty.shortDetail || ty.detail || '', clock: st.displayClock || '', h: side(h), a: side(a), venue: c.venue && c.venue.fullName };
}
function stTxt(e) {
  if (e.state === 'in') return /HT|Half/i.test(e.detail) ? 'İY' : (e.clock || e.detail || 'Canlı');
  if (e.state === 'post') return /Pen|AET/i.test(e.detail) ? 'MS (uz.)' : 'MS';
  if (/Postp/i.test(e.detail)) return 'Ertelendi';
  return e.date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}
const teamImg = (t, cls = '') => t.logo ? `<img src="${esc(t.logo)}" alt="" class="tl ${cls}" loading="lazy">` : `<span class="tl tl-x ${cls}">${esc((t.abbr || t.name || '?').slice(0, 3))}</span>`;
function evRow(e) {
  const live = e.state === 'in', done = e.state === 'post', hs = done || live ? e.h.score : '', as = done || live ? e.a.score : '';
  return `<button class="lrow ${live ? 'live' : ''} ${e.h.id === GS_ID || e.a.id === GS_ID ? 'gs' : ''}" data-ev="${e.id}" data-lg="${e.lg}">
   <span class="lst">${esc(stTxt(e))}${!live && !done ? `<small>${esc(e.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }))}</small>` : ''}</span>
   <span class="lteams"><span class="${e.h.win ? 'w' : ''}">${teamImg(e.h)}${esc(e.h.name)}</span><span class="${e.a.win ? 'w' : ''}">${teamImg(e.a)}${esc(e.a.name)}</span></span>
   <span class="lsc"><b class="${e.h.win ? 'w' : ''}">${esc(hs)}</b><b class="${e.a.win ? 'w' : ''}">${esc(as)}</b></span></button>`;
}
function bindEv(root) { root.querySelectorAll('[data-ev]').forEach(b => b.onclick = () => ligMatch(b.dataset.ev, b.dataset.lg)); }
async function gsEvents() {
  const reqs = []; COMPS.slice(0, 3).forEach(([lg]) => { reqs.push(espn(`soccer/${lg}/teams/${GS_ID}/schedule`).then(d => (d.events || []).map(e => evP(e, lg)))); reqs.push(espn(`soccer/${lg}/teams/${GS_ID}/schedule`, { fixture: 'true' }).then(d => (d.events || []).map(e => evP(e, lg)))); });
  const all = (await Promise.allSettled(reqs)).filter(r => r.status === 'fulfilled').flatMap(r => r.value), seen = new Set();
  return all.filter(e => !seen.has(e.id) && seen.add(e.id)).sort((a, b) => a.date - b.date);
}
async function standings() {
  const d = await espn('soccer/tur.1/standings', null, 5 * 60e3);
  const grp = (d.children && d.children[0] && d.children[0].standings) || d.standings || {};
  return (grp.entries || []).map(en => { const st = {}; (en.stats || []).forEach(x => st[x.name || x.type] = x.value); return { id: String(en.team.id), name: en.team.shortDisplayName || en.team.displayName, logo: tLogo(en.team), note: en.note, ...st }; })
    .sort((a, b) => (a.rank || 99) - (b.rank || 99) || (b.points || 0) - (a.points || 0));
}
const ligErr = e => `<div class="card empty-m"><b>Lig verisi yüklenemedi</b><p class="sub">${esc(e.message || e)}</p><button class="btn" onclick="this.closest('section').querySelector('#ligRef').click()">Tekrar dene</button></div>`;
function liveLoop(any) { clearTimeout(ligTimer); if (any && curV === 'lig') ligTimer = setTimeout(() => { if (curV === 'lig' && !dlg.open) { Object.keys(ligCache).forEach(k => { if (/scoreboard|schedule/.test(k)) delete ligCache[k]; }); renderLig(); } }, 30e3); }
async function renderLig() {
  $('#ligSeg').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === ligTab));
  const body = $('#ligBody'); if (!body.innerHTML.trim() || body.dataset.t !== ligTab) body.innerHTML = '<div class="card empty-m"><b>Yükleniyor…</b></div>'; body.dataset.t = ligTab;
  try {
    if (ligTab === 'gs') await ligGS(body); else if (ligTab === 'tab') await ligTable(body); else await ligFix(body);
  } catch (e) { body.innerHTML = ligErr(e); }
}
async function ligGS(body) {
  const [evs, tab, ros] = await Promise.all([gsEvents(), standings().catch(() => []), espn(`soccer/tur.1/teams/${GS_ID}/roster`, null, 30 * 60e3).catch(() => null)]);
  const now = Date.now(), live = evs.find(e => e.state === 'in'), next = evs.find(e => e.state === 'pre' && e.date.getTime() > now - 3 * 3600e3), past = evs.filter(e => e.state === 'post'), last = past[past.length - 1];
  const me = tab.find(t => t.id === GS_ID), gsLogo = (me && me.logo) || (evs[0] && (evs[0].h.id === GS_ID ? evs[0].h.logo : evs[0].a.logo)) || '';
  const res = e => { const g = e.h.id === GS_ID ? e.h : e.a, o = e.h.id === GS_ID ? e.a : e.h; return +g.score > +o.score ? 'G' : +g.score < +o.score ? 'M' : 'B'; };
  const form = past.slice(-5).reverse();
  const big = (e, label) => { const opp = e.h.id === GS_ID ? e.a : e.h, inP = e.state !== 'pre';
    return `<button class="card lbig ${e.state === 'in' ? 'live' : ''}" data-ev="${e.id}" data-lg="${e.lg}"><div class="sh" style="width:100%;margin-bottom:6px"><span class="lbl">${label}</span><span class="muted" style="font-size:12.5px">${esc(e.comp)}</span></div>
     <div class="lbig-b"><div class="tm">${teamImg(e.h, 'lg')}<b>${esc(e.h.name)}</b></div><div class="lbig-c">${inP ? `<div class="lbig-s">${esc(e.h.score)}<i>–</i>${esc(e.a.score)}</div><small class="${e.state === 'in' ? 'livetxt' : ''}">${esc(stTxt(e))}</small>` : `<div class="lbig-t">${esc(stTxt(e))}</div><small>${esc(e.date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }))}</small>`}</div><div class="tm">${teamImg(e.a, 'lg')}<b>${esc(e.a.name)}</b></div></div>
     ${e.venue ? `<div class="sub" style="text-align:center;margin-top:8px">🏟 ${esc(e.venue)}</div>` : ''}</button>`; };
  let ath = ros ? (ros.athletes || []) : []; if (ath[0] && ath[0].items) ath = ath.flatMap(g => g.items || []);
  const PG = [['G', 'Kaleciler'], ['D', 'Defans'], ['M', 'Orta saha'], ['F', 'Forvet']];
  const pk = a => { const p = ((a.position && (a.position.abbreviation || a.position.name)) || '').toUpperCase(); return p.startsWith('G') ? 'G' : p.startsWith('D') ? 'D' : p.startsWith('M') ? 'M' : 'F'; };
  const squad = ath.length ? PG.map(([k, l]) => { const g = ath.filter(a => pk(a) === k).sort((a, b) => (+a.jersey || 99) - (+b.jersey || 99)); return g.length ? `<div class="grp">${l}</div>` + g.map(a => `<div class="lr" style="grid-template-columns:30px auto 1fr auto;cursor:default"><span class="no">${esc(a.jersey || '')}</span>${a.headshot && a.headshot.href ? `<img src="${esc(a.headshot.href)}" class="av s" alt="" style="object-fit:cover" loading="lazy">` : `<span class="av s" style="background:linear-gradient(150deg,#A90432,#FDB912);color:#fff">${esc(ini(a.displayName || a.fullName))}</span>`}<span class="n"><b>${esc(a.displayName || a.fullName)}</b><small>${a.age ? a.age + ' yaş' : ''}${a.citizenship ? (a.age ? ', ' : '') + esc(a.citizenship) : ''}</small></span>${a.flag && a.flag.href ? `<img src="${esc(a.flag.href)}" alt="" style="width:22px;border-radius:2px" loading="lazy">` : ''}</div>`).join('') : ''; }).join('') : '<p class="sub">Kadro bilgisi şu an alınamadı.</p>';
  body.innerHTML = `<div class="gs-hero"><div class="gs-hero-in">${gsLogo ? `<img src="${esc(gsLogo)}" alt="Galatasaray">` : ''}<div><b>Galatasaray</b><small>${me ? `Süper Lig’de ${me.rank || '-'}. sırada, ${me.points ?? '-'} puan` : 'Süper Lig'}</small>
      <div class="form-row" style="margin-top:8px">${form.map(e => `<span class="res ${res(e)}" title="${esc(e.h.name)} ${esc(e.h.score)}-${esc(e.a.score)} ${esc(e.a.name)}">${res(e)}</span>`).join('')}</div></div></div></div>
    <div class="grid" style="margin-top:14px"><div class="col">${live ? big(live, '🔴 Canlı') : ''}${next && next !== live ? big(next, 'Sıradaki maç') : ''}${last ? big(last, 'Son maç') : ''}
      <div class="card"><h2 class="st" style="margin-bottom:6px">Fikstür ve sonuçlar</h2>${[...past.slice(-6).reverse()].map(evRow).join('')}<div class="mon">Gelecek maçlar</div>${evs.filter(e => e.state === 'pre').slice(0, 6).map(evRow).join('') || '<p class="sub">Planlı maç bulunamadı.</p>'}</div></div>
     <div class="col"><div class="card"><h2 class="st" style="margin-bottom:6px">Güncel kadro</h2>${squad}</div></div></div>`;
  bindEv(body); liveLoop(!!live);
}
async function ligTable(body) {
  const t = await standings(); if (!t.length) throw new Error('Puan durumu bulunamadı');
  const n = t.length, zone = (r, en) => { const d = (en.note && en.note.description || '').toLowerCase(); if (/champions|şampiyon/.test(d)) return 'z-cl'; if (/europa|conference|avrupa|konferans/.test(d)) return 'z-el'; if (/releg|düş/.test(d)) return 'z-rel'; return r === 1 ? 'z-cl' : r > n - 3 ? 'z-rel' : ''; };
  body.innerHTML = `<div class="card" style="padding:8px 4px"><div class="ltab-w"><table class="ltab"><thead><tr><th>#</th><th class="tn">Takım</th><th>O</th><th>G</th><th>B</th><th>M</th><th>AV</th><th>P</th></tr></thead><tbody>
    ${t.map((e, i) => { const r = e.rank || i + 1; return `<tr class="${e.id === GS_ID ? 'gs' : ''}"><td><span class="zn ${zone(r, e)}">${r}</span></td><td class="tn">${e.logo ? `<img src="${esc(e.logo)}" alt="" loading="lazy">` : ''}${esc(e.name)}</td><td>${e.gamesPlayed ?? '-'}</td><td>${e.wins ?? '-'}</td><td>${e.ties ?? '-'}</td><td>${e.losses ?? '-'}</td><td>${e.pointDifferential != null ? (e.pointDifferential > 0 ? '+' : '') + e.pointDifferential : '-'}</td><td><b>${e.points ?? '-'}</b></td></tr>`; }).join('')}
    </tbody></table></div><div class="lgnd"><span><i class="zn z-cl"></i>Avrupa (Şampiyonlar Ligi)</span><span><i class="zn z-el"></i>Avrupa kupaları</span><span><i class="zn z-rel"></i>Küme düşme</span></div></div>`;
}
async function ligFix(body) {
  const a = new Date(Date.now() - 4 * 864e5), b = new Date(Date.now() + 8 * 864e5);
  const d = await espn('soccer/tur.1/scoreboard', { dates: `${ymd(a)}-${ymd(b)}`, limit: 100 }, 30e3);
  const evs = (d.events || []).map(e => evP(e, 'tur.1')).sort((x, y) => x.date - y.date);
  if (!evs.length) { body.innerHTML = '<div class="card empty-m"><b>Bu hafta maç yok</b><p class="sub">Lig arası olabilir.</p></div>'; return; }
  let html = '', last = '', live = false;
  evs.forEach(e => { if (e.state === 'in') live = true; const k = e.date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }); if (k !== last) { html += `<div class="mon">${esc(k)}</div>`; last = k; } html += evRow(e); });
  body.innerHTML = `<div class="card">${html}</div>`; bindEv(body); liveLoop(live);
}
const STAT_TR = [['possessionPct', 'Topla oynama', '%'], ['totalShots', 'Şut'], ['shotsOnTarget', 'İsabetli şut'], ['wonCorners', 'Korner'], ['saves', 'Kurtarış'], ['foulsCommitted', 'Faul'], ['offsides', 'Ofsayt'], ['yellowCards', 'Sarı kart'], ['redCards', 'Kırmızı kart']];
function proPitch(rs, bottom) {
  const st = (rs.roster || []).filter(p => p.starter).sort((a, b) => (+a.formationPlace || 99) - (+b.formationPlace || 99));
  if (!st.length) return '';
  const f = String(rs.formation || '').split('-').map(Number).filter(Boolean), lines = [1, ...(f.length ? f : [4, 4, 2])];
  const kit = String(rs.team && rs.team.id) === GS_ID ? GSK : OTK, gk = { s: '#1b1b1f', t: '#fff', x: '#555' };
  let i = 0, out = '';
  lines.forEach((cnt, li) => { for (let k = 0; k < cnt && i < st.length; k++, i++) { const p = st[i], x = (k + 1) / (cnt + 1) * 100, xx = bottom ? x : 100 - x, y = lines.length > 1 ? li / (lines.length - 1) : 0, top = bottom ? 93 - y * 35 : 7 + y * 35;
    const nm = (p.athlete && (p.athlete.shortName || p.athlete.displayName) || '').split(' ').slice(-1)[0];
    out += `<div class="slot" style="left:${xx}%;top:${top}%">${jersey(li === 0 ? gk : kit, p.jersey || '')}<span class="pn">${esc(nm)}</span></div>`; } });
  return out;
}
async function ligMatch(id, lg) {
  clearTimeout(ligDetTimer);
  sheet('<div class="empty-m"><b>Maç yükleniyor…</b></div>', null, 'Maç detayı');
  let d; try { d = await espn(`soccer/${lg || 'tur.1'}/summary`, { event: id }, 25e3); } catch (e) { $('#dlb').innerHTML = ligErr(e); return; }
  const comp = (d.header && d.header.competitions && d.header.competitions[0]) || {}, e = evP({ id, date: comp.date, competitions: [comp] }, lg);
  const live = e.state === 'in', hid = e.h.id, rosters = d.rosters || [], rH = rosters.find(r => String(r.team && r.team.id) === hid) || rosters[0], rA = rosters.find(r => r !== rH);
  const gsBottom = e.a.id === GS_ID ? rA : rH, topR = gsBottom === rH ? rA : rH;
  const ke = (d.keyEvents || d.plays || []).filter(k => /goal|card|substitution|penalty/i.test((k.type && (k.type.text || k.type.type)) || ''));
  const icon = t => /own goal/i.test(t) ? '⚽ (KK)' : /goal|penalty - scored/i.test(t) ? '⚽' : /yellow/i.test(t) ? '🟨' : /red/i.test(t) ? '🟥' : /substitution/i.test(t) ? '🔁' : /penalty/i.test(t) ? '❌ P' : '•';
  const evs = ke.map(k => { const t = (k.type && (k.type.text || k.type.type)) || '', side = String(k.team && k.team.id) === hid ? 'h' : 'a', ps = (k.participants || []).map(p => p.athlete && p.athlete.displayName).filter(Boolean);
    return `<div class="ke ${side}"><b>${esc((k.clock && k.clock.displayValue) || '')}</b><span>${icon(t)} ${esc(/substitution/i.test(t) ? (ps[0] || '') + (ps[1] ? ' ↔ ' + ps[1] : '') : ps[0] || k.shortText || t)}${/goal/i.test(t) && ps[1] ? ` <small class="muted">(${esc(ps[1])})</small>` : ''}</span></div>`; }).join('');
  const bx = (d.boxscore && d.boxscore.teams) || [], sH = bx.find(t => String(t.team && t.team.id) === hid) || bx[0], sA = bx.find(t => t !== sH);
  const stv = (t, n) => { const x = t && (t.statistics || []).find(s => s.name === n); return x ? parseFloat(x.displayValue) : null; };
  const stats = sH && sA ? STAT_TR.map(([n, l, u]) => { const a = stv(sH, n), b = stv(sA, n); if (a == null && b == null) return ''; const tot = (a || 0) + (b || 0) || 1; return `<div class="stb"><div class="stl"><b>${a ?? 0}${u || ''}</b><span>${l}</span><b>${b ?? 0}${u || ''}</b></div><div class="stbar"><i style="width:${(a || 0) / tot * 100}%"></i><i style="width:${(b || 0) / tot * 100}%"></i></div></div>`; }).join('') : '';
  const subs = r => r ? (r.roster || []).filter(p => !p.starter).map(p => `<span>${esc(p.jersey || '')} ${esc((p.athlete && p.athlete.displayName) || '')}${p.subbedIn ? ' 🔼' : ''}</span>`).join('') : '';
  const venue = d.gameInfo && d.gameInfo.venue && d.gameInfo.venue.fullName;
  sheet(`<div class="mh lmh ${live ? 'live' : ''}"><div class="dh" style="margin:0"><span style="font-size:13px;opacity:.75">${esc(e.comp)}${venue ? ', ' + esc(venue) : ''}</span><button class="x" data-close aria-label="Kapat">×</button></div>
    <div class="mh-b"><div class="tm">${teamImg(e.h, 'lg')}<b>${esc(e.h.name)}</b></div>${e.state === 'pre' ? `<div class="time2">${esc(stTxt(e))}<small>${esc(e.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }))}</small></div>` : `<div class="score">${esc(e.h.score)} – ${esc(e.a.score)}</div>`}<div class="tm">${teamImg(e.a, 'lg')}<b>${esc(e.a.name)}</b></div></div>
    <div class="meta">${live ? `<span class="livetxt">● ${esc(stTxt(e))}</span>` : esc(e.state === 'post' ? 'Maç sonu' : e.date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }))}</div></div>
   <div class="seg" id="lmSeg" style="margin-top:14px;width:100%;display:grid;grid-template-columns:repeat(3,1fr)"><button data-s="o" aria-pressed="true">Özet</button><button data-s="k" aria-pressed="false">Kadrolar</button><button data-s="i" aria-pressed="false">İstatistik</button></div>
   <div class="lm" data-s="o">${evs ? `<div class="kes">${evs}</div>` : `<p class="sub" style="margin-top:12px">${e.state === 'pre' ? 'Maç henüz başlamadı.' : 'Maç olayları bulunamadı.'}</p>`}</div>
   <div class="lm hide" data-s="k">${rH && (rH.roster || []).length ? `<div class="pitch" style="max-width:420px;margin-top:12px"><svg class="ln" viewBox="0 0 180 300" preserveAspectRatio="none" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.2"><rect x="7" y="7" width="166" height="286" rx="2"/><line x1="7" y1="150" x2="173" y2="150"/><circle cx="90" cy="150" r="22"/><rect x="45" y="7" width="90" height="40"/><rect x="45" y="253" width="90" height="40"/></svg>
      <span class="ptag B">${esc((topR && topR.team && (topR.team.shortDisplayName || topR.team.displayName)) || '')} ${esc((topR && topR.formation) || '')}</span><span class="ptag A">${esc((gsBottom && gsBottom.team && (gsBottom.team.shortDisplayName || gsBottom.team.displayName)) || '')} ${esc((gsBottom && gsBottom.formation) || '')}</span>
      ${proPitch(gsBottom, true)}${topR ? proPitch(topR, false) : ''}</div>
      <div class="grid" style="margin-top:12px"><div><h4 style="margin:0 0 6px">${esc(e.h.name)} yedekler</h4><div class="bench">${subs(rH)}</div></div><div><h4 style="margin:0 0 6px">${esc(e.a.name)} yedekler</h4><div class="bench">${subs(rA)}</div></div></div>` : '<p class="sub" style="margin-top:12px">Kadrolar genelde maçtan yaklaşık 1 saat önce açıklanır.</p>'}</div>
   <div class="lm hide" data-s="i">${stats ? `<div class="stats">${stats}</div>` : '<p class="sub" style="margin-top:12px">İstatistikler maç başlayınca görünür.</p>'}</div>`,
  b => { b.querySelectorAll('#lmSeg button').forEach(x => x.onclick = () => { b.querySelectorAll('#lmSeg button').forEach(y => y.setAttribute('aria-pressed', y === x)); b.querySelectorAll('.lm').forEach(m => m.classList.toggle('hide', m.dataset.s !== x.dataset.s)); }); });
  if (live) ligDetTimer = setTimeout(() => { if (dlg.open && $('.lmh')) { delete ligCache[`soccer/${lg || 'tur.1'}/summary` + JSON.stringify({ event: id })]; ligMatch(id, lg); } }, 30e3);
}
async function ligHomeCard() {
  const el = $('#ligHome'); if (!el || !sb) return;
  try {
    const evs = await gsEvents(), now = Date.now(), live = evs.find(e => e.state === 'in'), next = evs.find(e => e.state === 'pre' && e.date.getTime() > now - 3 * 3600e3), last = [...evs].reverse().find(e => e.state === 'post');
    const e = live || (next && next.date - now < 3 * 864e5 ? next : null) || last; if (!e || !$('#ligHome')) return;
    $('#ligHome').innerHTML = `<button class="card gsmini ${live ? 'live' : ''}" data-ev="${e.id}" data-lg="${e.lg}"><span class="gsm-l">${live ? '🔴 Cimbom canlı' : e.state === 'pre' ? '🦁 Cimbom’un sıradaki maçı' : '🦁 Cimbom’un son maçı'}</span>
      <span class="gsm-b">${teamImg(e.h)}<b>${esc(e.h.name)}</b><em>${e.state === 'pre' ? esc(stTxt(e)) : `${esc(e.h.score)} – ${esc(e.a.score)}`}</em><b>${esc(e.a.name)}</b>${teamImg(e.a)}</span>
      <span class="gsm-f">${esc(e.comp)}${e.state === 'pre' ? ', ' + esc(e.date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })) : live ? ', ' + esc(stTxt(e)) : ''}</span></button>`;
    bindEv($('#ligHome'));
  } catch { /* lig verisi yoksa sessiz geç */ }
}

/* ---------- başlat ---------- */
if (sb) sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT' && ME) { ME = null; showAuth(); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => { });
start();
})();
