/*!
 * Sélecteur d'entités DENTAL GROUPE
 * Un seul fichier, installé sur chaque site du groupe (dentalgroupe.com, oofti.fr, safe-renovation.fr, safe-implant.fr, cmonlab.fr…).
 * Une pastille discrète en bas de l'écran ; un clic ouvre le panneau de toutes les entités, rangées par besoin.
 *
 * Installation (avant </body>) :
 *   <script src="https://dentalgroupe.com/dg-switcher.js" data-home="https://dentalgroupe.com/" defer></script>
 * Options :
 *   data-home   : adresse du site DENTAL GROUPE
 *   data-assets : dossier des icônes (par défaut : data-home + "logos/")
 */
(function () {
  if (window.__dgSwitcher) return;
  window.__dgSwitcher = true;

  var tag = document.currentScript || document.querySelector('script[src*="dg-switcher"]');
  var HOME = (tag && tag.dataset.home) || 'https://dentalgroupe.com/';
  if (/^https?:/.test(HOME) && !/\/$/.test(HOME)) HOME += '/';
  var ASSETS = (tag && tag.dataset.assets) || (/^https?:/.test(HOME) ? HOME : '') + 'logos/';

  // Pour ajouter une entité : une ligne ici, et tous les sites sont à jour.
  var GROUPS = [
    { met: "Équipement et matériel",  items: [ { n: 'oofti.fr',        d: 'Matériel dentaire en ligne',           url: 'https://oofti.fr/',          icon: 'icon-oofti.svg' },
                                 { n: 'Safe Implant',    d: 'Matériel de chirurgie et implants',    url: 'https://safe-implant.fr/',   icon: 'icon-safe-implant.svg' } ] },
    { met: "Gestion cabinet",   items: [ { n: 'Safe Rénovation', d: 'Conception et rénovation de cabinets', url: 'https://safe-renovation.fr/', icon: 'icon-safe-renovation.png' },
                                 { n: 'Evidentall',      d: 'Logiciel dentaire complet',            url: HOME + '#contact',            icon: 'icon-evidentall.svg' } ] },
    { met: "Fabrication",  items: [ { n: 'CMONLAB',       d: 'Laboratoire numérique à Paris',    url: 'https://cmonlab.fr/',       icon: 'icon-cmonlab.png' },
                                 { n: 'Axel Dentaire', d: 'Laboratoire de prothèse',          url: 'https://axeldentaire.fr/',  icon: 'icon-axel-dentaire.png' } ] },
    { met: "Formation", items: [ { n: 'Safe Academy',  d: 'Formation théorique',              url: 'https://safeacademy.fr/',   icon: 'icon-safe-academy.svg' },
                                 { n: 'Safe Coaching', d: 'Formation en situation réelle',    url: 'https://safe-coaching.fr/', icon: 'icon-safe-coaching.svg' },
                                 { n: 'Augmantor',     d: 'Cercle des mentors cliniques',     url: 'https://augmantor.com/',    icon: 'icon-augmantor.svg' } ] }
  ];

  function host(u) { try { return new URL(u, location.href).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
  var here = location.hostname.replace(/^www\./, '');
  var current = null;
  GROUPS.forEach(function (g) { g.items.forEach(function (it) { if (it.url.indexOf('#') < 0 && host(it.url) === here) current = it; }); });
  var onHome = !current && host(HOME) === here;

  var SYMBOL_T = '<svg viewBox="0 0 93.2 80.49" aria-hidden="true"><defs>' +
    '<linearGradient id="dgsw1" x1="632.1" y1="-619.8" x2="677.6" y2="-631.9" gradientTransform="translate(-752.7 -732.7) scale(1.2 -1.2)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#98a4fe"/><stop offset=".5" stop-color="#6771fc"/><stop offset="1" stop-color="#3445cb"/></linearGradient>' +
    '<linearGradient id="dgsw2" x1="676" y1="-615.1" x2="703.2" y2="-646.6" gradientTransform="translate(-752.7 -732.7) scale(1.2 -1.2)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4650d5"/><stop offset=".5" stop-color="#2e3bb2"/><stop offset="1" stop-color="#172586"/></linearGradient>' +
    '<linearGradient id="dgsw3" x1="636.2" y1="-672.8" x2="677" y2="-649.5" gradientTransform="translate(-752.7 -732.7) scale(1.2 -1.2)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#747bfd"/><stop offset=".5" stop-color="#515ef2"/><stop offset="1" stop-color="#2538c3"/></linearGradient>' +
    '<linearGradient id="dgsw4" x1="678.5" y1="-671.2" x2="701.9" y2="-642.5" gradientTransform="translate(-752.7 -732.7) scale(1.2 -1.2)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#474ece"/><stop offset=".5" stop-color="#303aaa"/><stop offset="1" stop-color="#142585"/></linearGradient>' +
    '</defs>' +
    '<path fill="url(#dgsw1)" d="M.66,0h50.51c.47,0,.7.23.7.7v14.78c0,12.75-9.1,22.28-21.39,22.28h-9.1C9.57,37.76,0,27.96,0,15.48V.7C0,.23.23,0,.7,0h-.04Z"/>' +
    '<path fill="url(#dgsw2)" d="M57.04.43c19.56.7,35.58,17.11,36.16,36.63,0,.47-.23.7-.7.7h-14.78c-12.05,0-21.39-9.57-21.39-21.85V1.13c0-.47.23-.7.7-.7Z"/>' +
    '<path fill="url(#dgsw3)" d="M.66,80.49h50.51c.47,0,.7-.23.7-.7v-14.78c0-12.75-9.1-22.28-21.39-22.28h-9.1c-11.82,0-21.39,9.8-21.39,22.28v14.78c0,.47.23.7.7.7h-.04Z"/>' +
    '<path fill="url(#dgsw4)" d="M57.04,80.49c19.56-.7,35.58-17.11,36.16-36.63,0-.47-.23-.7-.7-.7h-14.78c-12.05,0-21.39,9.57-21.39,21.85v14.78c0,.47.23.7.7.7Z"/>' + '</svg>';
  var symN = 0;
  function SYMBOL() { var k = 'dgsw' + (++symN) + '_'; return SYMBOL_T.replace(/dgsw(\d)/g, function (m, d) { return k + d; }); }
  var CHEV = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW = '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CLOSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function icon(it) { return '<span class="ic">' + (it.icon ? '<img src="' + ASSETS + it.icon + '" alt="">' : '<b>' + it.txt + '</b>') + '</span>'; }
  function row(it) {
    var cur = it === current;
    return '<a class="ent" href="' + it.url + '"' + (cur ? ' aria-current="page"' : '') + '>' + icon(it) +
      '<span class="txt"><span class="nm">' + it.n + '</span><span class="ds">' + it.d + '</span></span>' +
      (cur ? '<span class="here">Vous êtes ici</span>' : ARROW) + '</a>';
  }

  var pillLabel = current ? 'Vous êtes sur ' + current.n : (onHome ? 'Toutes nos entités' : 'Toutes nos entités');
  var html =
    '<div class="panel" id="dg-panel" role="dialog" aria-label="Les entités DENTAL GROUPE" hidden>' +
      '<div class="head"><div><p class="ttl">Les entités DENTAL GROUPE</p><p class="sub">Passez d\'une entité à l\'autre selon votre besoin.</p></div>' +
      '<button class="x" type="button" aria-label="Fermer">' + CLOSE + '</button></div>' +
      '<div class="grid">' + GROUPS.map(function (g) {
        return '<section><h3>' + g.met + '</h3>' + g.items.map(row).join('') + '</section>';
      }).join('') + '</div>' +
      '<a class="home" href="' + HOME + '"' + (onHome ? ' aria-current="page"' : '') + '><span class="ic sym">' + SYMBOL() + '</span>' +
        '<span class="txt"><span class="nm">DENTAL GROUPE</span><span class="ds">Vision, histoire, carrières</span></span>' +
        (onHome ? '<span class="here">Vous êtes ici</span>' : ARROW) + '</a>' +
    '</div>' +
    '<button class="pill" type="button" aria-expanded="false" aria-controls="dg-panel">' +
      '<span class="ic sym">' + SYMBOL() + '</span>' +
      '<span class="pl"><span class="k">DENTAL GROUPE</span><span class="v">' + pillLabel + '</span></span>' + CHEV +
    '</button>';

  var F_BRAND = '"Montserrat","Segoe UI",system-ui,sans-serif', F_BODY = '"DM Sans","Segoe UI",system-ui,sans-serif';
  var css =
    ':host{all:initial}' +
    '.wrap{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:10px;font:500 14px/1.35 ' + F_BODY + ';color:#f5f7ff;-webkit-font-smoothing:antialiased}' +
    'button{font:inherit;color:inherit;cursor:pointer}' +
    /* Pastille */
    '.pill{display:flex;align-items:center;gap:12px;padding:9px 22px 9px 18px;border-radius:999px;background:linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.03)),rgba(12,15,38,.55);-webkit-backdrop-filter:blur(20px) saturate(160%);backdrop-filter:blur(20px) saturate(160%);border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 14px 40px -14px rgba(0,0,0,.6);transition:border-color .2s,transform .2s}' +
    '.pill:hover{border-color:#74a3ff;transform:translateY(-1px)}' +
    '.pl{display:grid;text-align:left;line-height:1.15}' +
    '.k{font:700 10px ' + F_BRAND + ';letter-spacing:.14em;color:#8a90ab}' +
    '.v{font-size:14px;font-weight:600;color:#fff;white-space:nowrap}' +
    '.chev{width:15px;height:15px;color:#a9b0c7;transition:transform .25s}' +
    '.pill[aria-expanded="true"] .chev{transform:rotate(180deg)}' +
    /* Panneau */
    '.panel{width:min(640px,calc(100vw - 24px));max-height:calc(100dvh - 104px);overflow-y:auto;scrollbar-width:none;overscroll-behavior:contain;box-sizing:border-box;padding:20px;border-radius:24px;background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02) 50%),rgba(10,13,34,.72);-webkit-backdrop-filter:blur(28px) saturate(160%);backdrop-filter:blur(28px) saturate(160%);border:1px solid rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 30px 80px -24px rgba(0,0,0,.7);animation:up .22s cubic-bezier(.2,.8,.2,1)}' +
    '@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px}' +
    '.ttl{margin:0;font:700 18px ' + F_BRAND + ';letter-spacing:-.02em;color:#fff}' +
    '.sub{margin:4px 0 0;color:#a9b0c7;font-size:13.5px}' +
    '.x{flex:none;width:34px;height:34px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:transparent;display:grid;place-items:center;color:#c9cde0}' +
    '.x:hover{border-color:#74a3ff;color:#fff}.x svg{width:14px;height:14px}' +
    '.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px}' +
    '.panel::-webkit-scrollbar{display:none}' +
    '@media (max-height:760px) and (min-width:641px){.panel{padding:16px}.ent,.home{padding:6px 10px}.grid{gap:2px 18px}.home{margin-top:8px;padding-top:8px}}' +
    '@media (max-height:640px) and (min-width:641px){.ent .ds,.home .ds{display:none}}' +
    'section{min-width:0}' +
    'h3{margin:8px 0 4px;padding-left:10px;font:700 10.5px ' + F_BRAND + ';letter-spacing:.16em;text-transform:uppercase;color:#74a3ff}' +
    '.ent,.home{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:14px;text-decoration:none;color:#f5f7ff;transition:background .15s}' +
    '.ent:hover,.home:hover{background:rgba(255,255,255,.06)}' +
    '.ent[aria-current="page"],.home[aria-current="page"]{background:rgba(116,163,255,.12)}' +
    '.ic{flex:none;width:38px;height:38px;box-sizing:border-box;border-radius:12px;background:#0c1022;border:1px solid rgba(255,255,255,.12);display:grid;place-items:center}' +
    '.ic img{width:23px;height:23px;object-fit:contain;display:block}' +
    '.ic b{font:700 12px ' + F_BRAND + ';color:#fff}' +
    '.ic.sym{background:transparent;border:0}.ic.sym svg{width:30px;height:auto;display:block}' +
    '.pill .ic{width:34px;height:34px}.pill .ic.sym svg{width:26px}' +
    '.txt{display:grid;min-width:0;flex:1}' +
    '.nm{font-weight:600;font-size:14.5px;color:#fff}' +
    '.ds{font-size:12.5px;color:#a9b0c7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.arr{flex:none;width:15px;height:15px;color:#6f7593;transition:transform .15s,color .15s}' +
    '.ent:hover .arr,.home:hover .arr{color:#fff;transform:translateX(2px)}' +
    '.here{flex:none;font-size:11px;font-weight:600;color:#74a3ff;background:rgba(116,163,255,.14);border-radius:999px;padding:3px 8px;white-space:nowrap}' +
    '.home{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1);border-radius:0 0 14px 14px}' +
    'a:focus-visible,button:focus-visible{outline:2px solid #74a3ff;outline-offset:2px}' +
    '@media (max-width:640px){.wrap{left:10px;right:10px;transform:none;align-items:stretch}.pill{align-self:center}.panel{width:auto;max-height:calc(100dvh - 96px);padding:16px}.grid{grid-template-columns:1fr 1fr;gap:2px 8px}.ent .ds,.ent .arr{display:none}.ent{padding:7px 6px;gap:9px}.ent .nm{font-size:13.5px}}' +
    '@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}@media print{.wrap{display:none}}';

  function mount() {
    if (document.getElementById('dg-switcher')) return;
    var root = document.createElement('div');
    root.id = 'dg-switcher';
    var shadow = root.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<style>' + css + '</style><div class="wrap">' + html + '</div>';
    document.body.appendChild(root);

    var spacer = document.createElement('div');
    spacer.setAttribute('aria-hidden', 'true');
    spacer.style.cssText = 'height:84px';
    document.body.appendChild(spacer);

    var pill = shadow.querySelector('.pill'), panel = shadow.querySelector('.panel');
    function setOpen(on) {
      panel.hidden = !on;
      pill.setAttribute('aria-expanded', String(on));
      if (on) { var f = panel.querySelector('[aria-current]') || panel.querySelector('a'); f && f.focus({ preventScroll: true }); }
    }
    pill.addEventListener('click', function (e) { e.stopPropagation(); setOpen(panel.hidden); });
    shadow.querySelector('.x').addEventListener('click', function () { setOpen(false); pill.focus(); });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { if (!panel.hidden) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); pill.focus(); } });
  }

  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
