/*!
 * Sélecteur d'entités DENTAL GROUPE
 * Un seul fichier, installé sur chaque site du groupe (dentalgroupe.com, oofti.fr, safe-implant.fr, augmantor.com…).
 *
 * Sur un site d'entité :
 *   - un bandeau DENTAL GROUPE en haut + une pastille « Nos entités » en bas ;
 *   - à la première visite de la session, un écran d'accueil façon jeu vidéo :
 *     « Entrer sur le site » ou « Voir les autres entités » ;
 *   - un écran de sélection plein écran (flèches, Entrée, Échap) et une transition animée
 *     entre les sites : les 4 pièces du symbole se referment, puis s'ouvrent sur le site d'arrivée.
 *
 * Installation (avant </body>) :
 *   <script src="https://dentalgroupe.com/dg-switcher.js" data-home="https://dentalgroupe.com/" defer></script>
 * Options :
 *   data-home     : adresse du site DENTAL GROUPE
 *   data-assets   : dossier des logos (par défaut : data-home + "logos/")
 *   data-position : "both" (bandeau + pastille, par défaut sur les entités), "top", "bottom"
 *   data-intro    : "off" pour ne jamais afficher l'écran d'accueil
 */
(function () {
  if (window.__dgSwitcher) return;
  window.__dgSwitcher = true;

  var tag = document.currentScript || document.querySelector('script[src*="dg-switcher"]');
  var HOME = (tag && tag.dataset.home) || 'https://dentalgroupe.com/';
  if (/^https?:/.test(HOME) && !/\/$/.test(HOME)) HOME += '/';
  var ASSETS = (tag && tag.dataset.assets) || (/^https?:/.test(HOME) ? HOME : '') + 'logos/';
  var CONTACT = /^https?:/.test(HOME) ? HOME + '#contact' : '#contact';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pour ajouter une entité : une ligne ici, et tous les sites sont à jour.
  // q = besoin (1 Équipement et matériel, 2 Gestion cabinet, 3 Fabrication, 4 Formation), h = hauteur du logo
  var NEEDS = { 1: 'Équipement et matériel', 2: 'Gestion cabinet', 3: 'Fabrication', 4: 'Formation' };
  var ITEMS = [
    { n: 'oofti.fr',        q: 1, d: 'Matériel dentaire en ligne',           url: 'https://oofti.fr/',          icon: 'icon-oofti.svg',           logo: 'oofti-blanc.svg',              h: 44 },
    { n: 'Safe Implant',    q: 1, d: 'Matériel de chirurgie et implants',    url: 'https://safe-implant.fr/',   icon: 'icon-safe-implant.svg',    logo: 'safe-implant.svg',             h: 76 },
    { n: 'Safe Rénovation', q: 2, d: 'Conception et rénovation de cabinets', url: 'https://safe-renovation.fr/', icon: 'icon-safe-renovation.png', logo: 'safe-renovation.png',          h: 42 },
    { n: 'Evidentall',      q: 2, d: 'Logiciel dentaire complet',            url: CONTACT,            icon: 'icon-evidentall.svg',      logo: 'evidentall-blanc-court.svg',   h: 34 },
    { n: 'CMONLAB',         q: 3, d: 'Laboratoire numérique à Paris',        url: 'https://cmonlab.fr/',        icon: 'icon-cmonlab.png',         logo: 'cmonlab.png',                  h: 44 },
    { n: 'Axel Dentaire',   q: 3, d: 'Laboratoire de prothèse',              url: 'https://axeldentaire.fr/',   icon: 'icon-axel-dentaire.png',   logo: 'axel-dentaire.png',            h: 64 },
    { n: 'Safe Academy',    q: 4, d: 'Formation théorique',                  url: 'https://safeacademy.fr/',    icon: 'icon-safe-academy.svg',    logo: 'safe-academy.svg',             h: 30 },
    { n: 'Safe Coaching',   q: 4, d: 'Formation en situation réelle',        url: 'https://safe-coaching.fr/',  icon: 'icon-safe-coaching.svg',   logo: 'safe-coaching.svg',            h: 44 },
    { n: 'Augmantor',       q: 4, d: 'Cercle des mentors cliniques',         url: 'https://augmantor.com/',     icon: 'icon-augmantor.svg',       logo: 'augmantor-blanc.svg',          h: 28 }
  ];

  function host(u) { try { return new URL(u, location.href).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
  var here = location.hostname.replace(/^www\./, '');
  var current = null;
  ITEMS.forEach(function (it) { if (it.url.indexOf('#') < 0 && host(it.url) === here) current = it; });
  var onHome = !current && host(HOME) === here;
  var HOME_ITEM = { n: 'DENTAL GROUPE', q: 0, d: 'Accueil du groupe', url: HOME, home: true };
  var LIST = [HOME_ITEM].concat(ITEMS);
  var POS = (tag && tag.dataset.position) || (onHome ? 'bottom' : 'both');
  var INTRO = !!current && !(tag && tag.dataset.intro === 'off');

  /* ---------- Formes du symbole ---------- */
  var Q = [
    'M.66,0h50.51c.47,0,.7.23.7.7v14.78c0,12.75-9.1,22.28-21.39,22.28h-9.1C9.57,37.76,0,27.96,0,15.48V.7C0,.23.23,0,.7,0h-.04Z',
    'M57.04.43c19.56.7,35.58,17.11,36.16,36.63,0,.47-.23.7-.7.7h-14.78c-12.05,0-21.39-9.57-21.39-21.85V1.13c0-.47.23-.7.7-.7Z',
    'M.66,80.49h50.51c.47,0,.7-.23.7-.7v-14.78c0-12.75-9.1-22.28-21.39-22.28h-9.1c-11.82,0-21.39,9.8-21.39,22.28v14.78c0,.47.23.7.7.7h-.04Z',
    'M57.04,80.49c19.56-.7,35.58-17.11,36.16-36.63,0-.47-.23-.7-.7-.7h-14.78c-12.05,0-21.39,9.57-21.39,21.85v14.78c0,.47.23.7.7.7Z'
  ];
  var GR = [['#98a4fe', '#6771fc', '#3445cb'], ['#4650d5', '#2e3bb2', '#172586'], ['#747bfd', '#515ef2', '#2538c3'], ['#474ece', '#303aaa', '#142585']];
  var DIR = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  var uid = 0;
  function SYMBOL(cls, only) {
    var k = 'dgs' + (++uid) + '_';
    var defs = GR.map(function (c, i) {
      return '<linearGradient id="' + k + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".5" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    }).join('');
    return '<svg class="' + (cls || '') + '" viewBox="-6 -6 105.2 92.49" aria-hidden="true"><defs>' + defs + '</defs>' +
      Q.map(function (d, i) {
        var on = !only || only === i + 1;
        return '<path class="p" style="--dx:' + DIR[i][0] + ';--dy:' + DIR[i][1] + '" d="' + d + '" fill="' + (on ? 'url(#' + k + i + ')' : 'rgba(255,255,255,.12)') + '"/>';
      }).join('') + '</svg>';
  }
  var WORD = '<path fill-rule="evenodd" d="M116.68.43h19.16c12.65,0,21.15,7.07,21.15,17.94s-8.5,17.94-21.15,17.94h-19.16V.43ZM124.77,7.12v22.44h10.63c8.57,0,13.24-4.18,13.24-11.18s-4.67-11.25-13.24-11.25h-10.63Z"/><path d="M171.21.43h32.23v6.69h-24.21v7.87h17.25v6.34h-17.25v8.22h24.21v6.76h-32.23V.43Z"/><path d="M217.55.43h8.19l23.2,25.09V.43h7.98v35.89h-8.36l-23-24.95v24.95h-8.01V.43Z"/><path d="M269.81.43h35.19v6.76h-13.87v29.13h-7.98V7.19h-13.34V.43Z"/><path d="M308.83,36.31L326.36.43h7.11l17.52,35.89h-8.71l-12.37-26.44-12.58,26.44h-8.5Z"/><path d="M362.66.43h7.94v29.13h20.45v6.76h-28.4V.43Z"/><path d="M136.1,65.37h10.64v6.12c-3.03,1.54-6.53,2.31-10.39,2.31-8.81,0-14.07-4.57-14.07-12.23s5.82-12.37,14.14-12.37c4.79,0,8.29,1.04,12.09,3.59l.78.53,3.29-4.67-.78-.55c-4.27-3.03-9.28-4.5-15.31-4.5-11.69,0-20.18,7.56-20.18,17.98,0,11.05,7.68,17.910,20.04,17.910,6.080,0,11.11-1.45,15.84-4.55l.43-.28v-14.67h-16.53v5.39Z"/><path fill-rule="evenodd" d="M203.63,54.83c0-7.04-5.55-11.24-14.85-11.24h-17.57v35.89h6.11v-12.9h10.69l10.32,12.9h7.88l-11.29-13.79c5.7-1.52,8.71-5.27,8.71-10.86ZM197.52,54.83c0,4.14-2.98,6.16-9.11,6.16h-11.1v-11.73h11.1c6.13,0,9.11,1.82,9.11,5.57Z"/><path fill-rule="evenodd" d="M237.23,43.6c-12.06,0-20.48,7.59-20.48,18.45s8.42,18.37,20.48,18.37,20.48-7.56,20.48-18.37-8.42-18.45-20.48-18.45ZM251.61,62.05c0,7.56-5.78,12.63-14.38,12.63s-14.38-5.08-14.38-12.63,5.91-12.7,14.38-12.7,14.38,5.22,14.38,12.7Z"/><path d="M298.57,64.83c0,6.63-3.54,9.71-11.13,9.71s-11.27-3.09-11.27-9.71v-21.24h-6.17v21.53c0,9.9,6.19,15.36,17.44,15.36s17.37-5.45,17.37-15.36v-21.53h-6.24v21.24Z"/><path fill-rule="evenodd" d="M333.05,43.6h-17.43v35.89h6.11v-12.16h11.32c9.53,0,14.77-4.23,14.77-11.9s-5.25-11.83-14.77-11.83ZM341.64,55.42c0,4.13-3.04,6.23-9.03,6.23h-10.87v-12.39h10.87c6.08,0,9.03,2.01,9.03,6.16Z"/><polygon points="391.67 49.27 391.67 43.6 362.05 43.6 362.05 79.48 391.67 79.48 391.67 73.82 368.16 73.82 368.16 64.01 385.55 64.01 385.55 58.34 368.16 58.34 368.16 49.27 391.67 49.27"/>';
  function LOGO(cls) {
    var k = 'dgl' + (++uid) + '_';
    var defs = GR.map(function (c, i) {
      return '<linearGradient id="' + k + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".5" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    }).join('');
    return '<svg class="' + (cls || '') + '" viewBox="0 0 391.67 80.49" role="img" aria-label="DENTAL GROUPE"><defs>' + defs + '</defs>' +
      Q.map(function (d, i) { return '<path class="p" style="--dx:' + DIR[i][0] + ';--dy:' + DIR[i][1] + '" d="' + d + '" fill="url(#' + k + i + ')"/>'; }).join('') +
      '<g fill="#fff">' + WORD + '</g></svg>';
  }
  var CHEV = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW = '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CLOSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Écran de sélection ---------- */
  function card(it, i) {
    var cur = it === current || (it.home && onHome);
    var logo = it.home ? SYMBOL('home-sym') : '<img src="' + ASSETS + it.logo + '" alt="" style="height:' + it.h + 'px" loading="lazy">';
    return '<a class="card q' + it.q + '" href="' + esc(it.url) + '" data-i="' + i + '" role="option" aria-selected="false"' + (cur ? ' data-cur="1"' : '') + '>' +
      (it.home ? '' : SYMBOL('wm', it.q)) +
      '<span class="need">' + (it.home ? 'Le groupe' : NEEDS[it.q]) + '</span>' +
      '<span class="lg">' + logo + '</span>' +
      '<span class="nm">' + esc(it.n) + '</span><span class="ds">' + esc(it.d) + '</span>' +
      (cur ? '<span class="here">Vous êtes ici</span>' : '') + '</a>';
  }
  var selHtml =
    '<div class="sel" role="dialog" aria-modal="true" aria-label="Les entités DENTAL GROUPE" hidden>' +
      '<div class="sel-top"><span class="brand">' + LOGO('bl-logo') + '</span>' +
      '<button class="x" type="button" aria-label="Fermer">' + CLOSE + '</button></div>' +
      '<p class="sel-t">Où voulez-vous aller ?</p>' +
      '<div class="track" role="listbox" aria-label="Entités">' + LIST.map(card).join('') + '</div>' +
      '<div class="sel-bot"><button class="nav-b prev" type="button" aria-label="Précédent">' + CHEV + '</button>' +
        '<a class="go" href="#"><span class="l-go">Aller sur</span><span class="l-stay">Rester sur</span> <b class="go-n"></b>' + ARROW + '</a>' +
        '<button class="nav-b next" type="button" aria-label="Suivant">' + CHEV + '</button></div>' +
      '<p class="hint"><kbd>←</kbd><kbd>→</kbd> <span>choisir</span> · <kbd>Entrée</kbd> <span>y aller</span> · <kbd>Échap</kbd> <span>fermer</span></p>' +
    '</div>';

  /* ---------- Écran d'accueil (sites des entités) ---------- */
  var introHtml = current ?
    '<div class="intro" role="dialog" aria-modal="true" aria-label="' + esc(current.n) + ', une entité DENTAL GROUPE" hidden>' +
      '<div class="in-c">' +
        '<p class="in-k">' + LOGO('ik-logo') + '<span>présente</span></p>' +
        '<img class="in-logo" src="' + ASSETS + current.logo + '" alt="' + esc(current.n) + '" style="height:' + Math.round(current.h * 1.7) + 'px">' +
        '<p class="in-d">' + esc(current.d) + '</p>' +
        '<div class="in-b"><button class="in-enter" type="button">Entrer sur ' + esc(current.n) + ARROW + '</button>' +
        '<button class="in-explore" type="button">Voir les autres entités</button></div>' +
        '<p class="in-h"><kbd>Entrée</kbd> <span>pour entrer</span></p>' +
      '</div></div>' : '';

  /* ---------- Transition entre sites : les 4 pièces se referment / s'ouvrent ---------- */
  var wipeHtml = '<div class="wipe" aria-hidden="true">' + SYMBOL('wsym') + '</div>';

  /* ---------- Bandeau et pastille ---------- */
  var barHtml =
    '<div class="bar"><div class="bar-in">' +
      '<a class="b-brand" href="' + esc(HOME) + '">' + LOGO('bl-logo') + '</a>' +
      '<span class="sep" aria-hidden="true"></span><span class="msg">' + (current ? '<b>' + esc(current.n) + '</b> fait partie de DENTAL GROUPE' : 'Un site DENTAL GROUPE') + '</span>' +
      '<button class="b-btn open" type="button" aria-haspopup="dialog"><span class="bl">Toutes nos entités</span><span class="bsm">Nos entités</span>' + CHEV + '</button>' +
    '</div></div>';
  var pillHtml = '<button class="pill open" type="button" aria-haspopup="dialog">' + SYMBOL('ps') + '<span>Nos entités</span>' + CHEV + '</button>';

  var F_BRAND = '"Montserrat","Segoe UI",system-ui,sans-serif', F_BODY = '"DM Sans","Segoe UI",system-ui,sans-serif';
  var EASE = 'cubic-bezier(.2,.8,.2,1)', POP = 'cubic-bezier(.3,1.4,.5,1)';
  var css =
    ':host{all:initial}' +
    '*{box-sizing:border-box}' +
    '.root{font:500 15px/1.4 ' + F_BODY + ';color:#f5f7ff;-webkit-font-smoothing:antialiased}' +
    'button{font:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0}a{color:inherit;text-decoration:none}' +
    'a:focus-visible,button:focus-visible{outline:2px solid #74a3ff;outline-offset:3px}' +
    'kbd{display:inline-block;min-width:22px;padding:2px 6px;border-radius:6px;border:1px solid rgba(255,255,255,.22);border-bottom-width:2px;font:600 11px ' + F_BRAND + ';color:#e8d7f8;text-align:center}' +
    '.p{transform-box:view-box;transform-origin:46.6px 40.25px;transition:transform .5s ' + POP + '}' +
    /* bandeau */
    '.bar{position:relative;background:linear-gradient(90deg,#050711 0%,#16153c 55%,#3e3183 100%);border-bottom:1px solid rgba(255,255,255,.08)}' +
    '.bar-in{height:48px;padding:0 clamp(16px,3vw,40px);display:flex;align-items:center;gap:16px}' +
    '.b-brand{display:flex;align-items:center;gap:10px;flex:none}.b-brand b,.brand b{font:700 13px ' + F_BRAND + ';letter-spacing:.14em;color:#fff}' +
    '.bl-logo{height:30px;width:auto;display:block;overflow:visible}.ik-logo{height:30px;width:auto;display:block;overflow:visible}.bs{width:26px;height:auto;display:block;overflow:visible}.b-brand:hover .p,.brand:hover .p{transform:translate(calc(var(--dx)*4px),calc(var(--dy)*4px))}' +
    '.sep{width:1px;height:18px;background:rgba(255,255,255,.2);flex:none}' +
    '.msg{font-size:14px;color:#c9cde4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.msg b{color:#fff;font-weight:600}' +
    '.b-btn{margin-left:auto;flex:none;display:flex;align-items:center;gap:8px;height:34px;padding:0 14px 0 16px;border-radius:10px;background:#4136c3;color:#fff;font-weight:600;font-size:14px;transition:background .2s,transform .2s ' + POP + '}' +
    '.b-btn:hover{background:#5045dc;transform:translateY(-1px)}.b-btn .chev{width:14px;height:14px;transform:rotate(180deg)}.bsm{display:none}' +
    /* pastille */
    '.pill{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:10px;height:52px;padding:0 18px 0 12px;border-radius:999px;background:rgba(10,13,34,.92);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 14px 40px -12px rgba(5,7,17,.7);font-weight:600;color:#fff;transition:border-color .2s,transform .35s ' + POP + '}' +
    '.pill:hover{border-color:#74a3ff;transform:translateX(-50%) translateY(-2px)}' +
    '.ps{width:28px;height:auto;overflow:visible}.pill:hover .p{transform:translate(calc(var(--dx)*4px),calc(var(--dy)*4px))}' +
    '.pill .chev{width:14px;height:14px;color:#a9b0c7}' +
    /* sélection */
    '.sel,.intro{position:fixed;inset:0;z-index:2147483600;display:flex;flex-direction:column;background:radial-gradient(60% 50% at 20% 10%,rgba(65,54,195,.45),transparent 70%),radial-gradient(50% 50% at 90% 90%,rgba(62,49,131,.55),transparent 70%),#050711;overflow:hidden}' +
    '.sel[hidden],.intro[hidden]{display:none}' +
    '.sel-top{display:flex;align-items:center;justify-content:space-between;padding:20px clamp(16px,4vw,48px)}' +
    '.brand{display:flex;align-items:center;gap:10px}' +
    '.x{width:44px;height:44px;border-radius:12px;border:1px solid rgba(255,255,255,.16);display:grid;place-items:center;color:#c9cde4;transition:border-color .2s,transform .3s ' + POP + '}.x:hover{border-color:#74a3ff;color:#fff;transform:rotate(90deg)}.x svg{width:16px;height:16px}' +
    '.sel-t{margin:clamp(4px,2vh,24px) 0 0;text-align:center;font:700 clamp(28px,4.4vw,56px)/1.05 ' + F_BRAND + ';letter-spacing:-.04em;background:linear-gradient(100deg,#f7f5fc,#e8d7f8 35%,#98a4fe 70%,#74a3ff);-webkit-background-clip:text;background-clip:text;color:transparent;padding:0 16px .06em}' +
    '.track{flex:1;display:flex;align-items:center;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4vh calc(50vw - 150px);min-height:0}' +
    '.track::-webkit-scrollbar{display:none}' +
    '.card{position:relative;flex:0 0 300px;height:min(420px,52vh);min-height:300px;scroll-snap-align:center;display:flex;flex-direction:column;padding:22px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:linear-gradient(165deg,#16153c,#0b0f24 60%);transform:scale(.88);opacity:.55;transition:transform .45s ' + POP + ',opacity .3s,border-color .3s,box-shadow .4s}' +
    '.card[aria-selected="true"]{transform:scale(1);opacity:1;border-color:rgba(152,164,254,.8);box-shadow:0 0 0 1px rgba(152,164,254,.4),0 30px 80px -20px rgba(65,54,195,.9),inset 0 1px 0 rgba(255,255,255,.18)}' +
    '.card.q1{background:linear-gradient(165deg,rgba(152,164,254,.28),#0b0f24 62%)}.card.q2{background:linear-gradient(165deg,rgba(70,80,213,.38),#0b0f24 62%)}.card.q3{background:linear-gradient(165deg,rgba(116,123,253,.3),#0b0f24 62%)}.card.q4{background:linear-gradient(165deg,rgba(71,78,206,.4),#0b0f24 62%)}.card.q0{background:linear-gradient(165deg,#3e3183,#0b0f24 70%)}' +
    '.wm{position:absolute;right:-30px;bottom:-30px;width:190px;height:auto;opacity:.18;pointer-events:none;transition:transform .6s ' + POP + ',opacity .4s}' +
    '.card[aria-selected="true"] .wm{opacity:.35;transform:rotate(-8deg) scale(1.08)}' +
    '.need{font:600 12.5px ' + F_BRAND + ';color:#98a4fe}' +
    '.lg{flex:1;display:grid;place-items:center;padding:12px 0}.lg img{max-width:88%;width:auto;object-fit:contain;transition:transform .5s ' + POP + '}' +
    '.card[aria-selected="true"] .lg img{transform:scale(1.08)}' +
    '.home-sym{width:96px;height:auto;overflow:visible}.card[aria-selected="true"] .home-sym .p{transform:translate(calc(var(--dx)*5px),calc(var(--dy)*5px))}' +
    '.nm{font:700 22px/1.2 ' + F_BRAND + ';letter-spacing:-.02em;color:#fff}.ds{margin-top:4px;font-size:14px;color:#c9cde4}' +
    '.here{position:absolute;top:18px;right:18px;font-size:12px;font-weight:600;color:#fff;background:#4136c3;border-radius:8px;padding:4px 9px}' +
    '.sel-bot{display:flex;align-items:center;justify-content:center;gap:14px;padding:0 16px}' +
    '.nav-b{width:52px;height:52px;border-radius:14px;border:1px solid rgba(255,255,255,.16);display:grid;place-items:center;color:#fff;transition:border-color .2s,transform .3s ' + POP + '}.nav-b:hover{border-color:#74a3ff}.nav-b:active{transform:scale(.92)}' +
    '.nav-b svg{width:18px;height:18px}.prev svg{transform:rotate(-90deg)}.next svg{transform:rotate(90deg)}' +
    '.l-stay,.go.stay .l-go{display:none}.go.stay .l-stay{display:inline}' +
    '.go{display:flex;align-items:center;gap:10px;height:56px;padding:0 26px;border-radius:14px;background:#4136c3;color:#fff;font-weight:600;font-size:16px;white-space:nowrap;box-shadow:0 18px 40px -16px rgba(65,54,195,.9);transition:background .2s,transform .3s ' + POP + '}.go:hover{background:#5045dc;transform:translateY(-2px)}.go b{font-family:' + F_BRAND + '}.go .arr{width:16px;height:16px}' +
    '.hint,.in-h{margin:14px 0 22px;text-align:center;font-size:13px;color:#8a90ab}.hint kbd,.in-h kbd{margin:0 2px}' +
    /* accueil */
    '.intro{align-items:center;justify-content:center;text-align:center}' +
    '.in-c{display:grid;justify-items:center;gap:18px;padding:24px}' +
    '.in-k{display:flex;align-items:center;gap:10px;margin:0;font:600 13px ' + F_BRAND + ';letter-spacing:.14em;color:#c9cde4}.ik{width:26px;height:auto;overflow:visible}' +
    '.in-logo{max-width:min(80vw,560px);width:auto;object-fit:contain;filter:drop-shadow(0 20px 60px rgba(65,54,195,.6))}' +
    '.in-d{margin:0;font-size:17px;color:#c9cde4}' +
    '.in-b{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:10px}' +
    '.in-enter{display:flex;align-items:center;gap:10px;height:56px;padding:0 28px;border-radius:14px;background:#4136c3;color:#fff;font-weight:600;font-size:16px;box-shadow:0 18px 40px -16px rgba(65,54,195,.9);transition:background .2s,transform .3s ' + POP + '}.in-enter:hover{background:#5045dc;transform:translateY(-2px)}.in-enter .arr{width:16px;height:16px}' +
    '.in-explore{height:56px;padding:0 24px;border-radius:14px;border:1px solid rgba(255,255,255,.24);font-weight:600;font-size:16px;transition:border-color .2s}.in-explore:hover{border-color:#fff}' +
    '.in-h span{animation:blink 1.6s steps(2,start) infinite}@keyframes blink{to{visibility:hidden}}' +
    /* animations d'entrée */
    '.open-anim .sel-t{animation:dropIn .6s ' + POP + ' both}' +
    '.open-anim .card{animation:cardIn .6s ' + POP + ' both;animation-delay:calc(var(--k,0)*45ms)}' +
    '.open-anim .sel-bot,.open-anim .hint{animation:fadeUp .5s ' + EASE + ' .25s both}' +
    '@keyframes dropIn{from{opacity:0;transform:translateY(-24px) scale(.96)}}' +
    '@keyframes cardIn{from{opacity:0;transform:translateY(60px) scale(.7) rotate(-4deg)}}' +
    '@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}}' +
    '.intro.show .in-k{animation:fadeUp .6s ' + EASE + ' .1s both}.intro.show .in-logo{animation:logoIn .9s ' + POP + ' .2s both}.intro.show .in-d{animation:fadeUp .6s ' + EASE + ' .45s both}.intro.show .in-b{animation:fadeUp .6s ' + EASE + ' .55s both}.intro.show .in-h{animation:fadeUp .6s ' + EASE + ' .7s both}' +
    '@keyframes logoIn{from{opacity:0;transform:scale(.6);filter:blur(12px)}}' +
    '.intro.leave{animation:zoomOut .55s ' + EASE + ' forwards}@keyframes zoomOut{to{opacity:0;transform:scale(1.15)}}' +
    '.sel.leave{animation:fadeOut .35s ' + EASE + ' forwards}@keyframes fadeOut{to{opacity:0}}' +
    '.card.picked{animation:pick .5s ' + POP + ' forwards}@keyframes pick{50%{transform:scale(1.08)}to{transform:scale(1.04)}}' +
    /* volet : les pièces couvrent l'écran */
    '.wipe{position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:grid;place-items:center;visibility:hidden;opacity:0;background:radial-gradient(50% 50% at 50% 50%,rgba(65,54,195,.5),transparent 70%),#050711;transition:opacity .45s ease .15s}' +
    '.wipe.on{visibility:visible;pointer-events:auto}' +
    '.wipe.closed{opacity:1;transition-delay:0s;transition-duration:.3s}' +
    '.wipe.inst,.wipe.inst .p{transition:none!important}' +
    '.wsym{width:min(40vmin,340px);height:auto;overflow:visible}' +
    '.wipe .p{transition:transform .65s cubic-bezier(.7,0,.2,1);transform:translate(calc(var(--dx)*260px),calc(var(--dy)*240px)) rotate(calc(var(--dx)*var(--dy)*20deg))}' +
    '.wipe.closed .p{transform:none}' +
    '@media (max-width:640px){.sep,.msg,.bl{display:none}.bsm{display:inline}.bar-in{gap:10px}.track{padding:2vh calc(50vw - 130px);gap:14px}.card{flex-basis:260px;height:min(380px,50vh)}.hint{display:none}.go{height:52px;padding:0 18px;font-size:15px}.nav-b{width:48px;height:48px}.sel-bot{margin-bottom:20px}.in-b{flex-direction:column;align-items:stretch;width:min(320px,86vw)}.in-enter{justify-content:center}.in-h{display:none}}' +
    '@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media print{.bar,.pill,.sel,.intro,.wipe{display:none}}';

  function mount() {
    if (document.getElementById('dg-switcher')) return;
    var root = document.createElement('div');
    root.id = 'dg-switcher';
    var shadow = root.attachShadow({ mode: 'open' });
    var withPill = POS === 'both' || POS === 'bottom';
    var withBar = POS === 'both' || POS === 'top';
    shadow.innerHTML = '<style>' + css + '</style><div class="root">' + (withPill ? pillHtml : '') + selHtml + introHtml + wipeHtml + '</div>';
    document.body.appendChild(root);
    if (withPill) {
      var spacer = document.createElement('div');
      spacer.setAttribute('aria-hidden', 'true');
      spacer.style.cssText = 'height:84px';
      document.body.appendChild(spacer);
    }
    var barShadow = null;
    if (withBar) {
      var bar = document.createElement('div');
      bar.id = 'dg-switcher-bar';
      barShadow = bar.attachShadow({ mode: 'open' });
      barShadow.innerHTML = '<style>' + css + '</style><div class="root">' + barHtml + '</div>';
      document.body.insertBefore(bar, document.body.firstChild);
      offsetFixedHeaders(bar);
    }

    var sel = shadow.querySelector('.sel'), track = shadow.querySelector('.track');
    var cards = [].slice.call(shadow.querySelectorAll('.card'));
    var goBtn = shadow.querySelector('.go'), goName = shadow.querySelector('.go-n');
    var wipe = shadow.querySelector('.wipe');
    var intro = shadow.querySelector('.intro');
    var idx = 0, lastFocus = null;
    cards.forEach(function (c, k) { c.style.setProperty('--k', k); });

    function lock(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; }
    function focusCard(i, smooth, noScroll) {
      idx = (i + cards.length) % cards.length;
      cards.forEach(function (c, k) { c.setAttribute('aria-selected', String(k === idx)); c.tabIndex = k === idx ? 0 : -1; });
      var it = LIST[idx], c = cards[idx];
      var cur = c.hasAttribute('data-cur');
      goName.textContent = cur ? it.n : it.n;
      goBtn.classList.toggle('stay', cur);
      goBtn.href = it.url;
      if (noScroll) return;
      var left = c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2;
      track.scrollTo({ left: left, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    }
    function openSel(from) {
      lastFocus = from || document.activeElement;
      sel.hidden = false; lock(true);
      sel.classList.remove('open-anim'); void sel.offsetWidth; sel.classList.add('open-anim');
      var start = cards.findIndex ? cards.findIndex(function (c) { return c.hasAttribute('data-cur'); }) : 0;
      requestAnimationFrame(function () { focusCard(start < 0 ? 0 : start, false); cards[idx].focus({ preventScroll: true }); });
    }
    function closeSel() {
      if (sel.hidden) return;
      sel.hidden = true; lock(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function navigate(i) {
      var it = LIST[i], c = cards[i];
      if (c.hasAttribute('data-cur')) { closeSel(); return; }
      if (it.url.charAt(0) === '#') { closeSel(); location.hash = it.url; return; }
      var url = it.url;
      if (/^https?:/.test(url) && host(url) !== here) url = url.replace(/(#.*)?$/, function (h) { return (url.split('#')[0].indexOf('?') < 0 ? '?' : '&') + 'dg=1' + (h || ''); });
      if (reduce) { location.href = url; return; }
      c.classList.add('picked');
      wipe.classList.add('on');
      requestAnimationFrame(function () { requestAnimationFrame(function () { wipe.classList.add('closed'); }); });
      setTimeout(function () { location.href = url; }, 720);
    }

    shadow.querySelectorAll('.open').forEach(function (b) { b.addEventListener('click', function () { openSel(b); }); });
    if (barShadow) barShadow.querySelector('.open').addEventListener('click', function (e) { openSel(e.currentTarget); });
    shadow.querySelector('.x').addEventListener('click', closeSel);
    shadow.querySelector('.prev').addEventListener('click', function () { focusCard(idx - 1, true); });
    shadow.querySelector('.next').addEventListener('click', function () { focusCard(idx + 1, true); });
    cards.forEach(function (c, k) {
      c.addEventListener('click', function (e) { e.preventDefault(); if (k !== idx) { focusCard(k, true); return; } navigate(k); });
      c.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && k !== idx) focusCard(k, false, true); });
    });
    goBtn.addEventListener('click', function (e) { e.preventDefault(); navigate(idx); });
    var st = 0;
    track.addEventListener('scroll', function () {
      clearTimeout(st);
      st = setTimeout(function () {
        var mid = track.scrollLeft + track.clientWidth / 2, best = idx, bd = 1e9;
        cards.forEach(function (c, k) { var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = k; } });
        if (best !== idx) { idx = best; cards.forEach(function (c, k) { c.setAttribute('aria-selected', String(k === idx)); c.tabIndex = k === idx ? 0 : -1; }); var it = LIST[idx]; goName.textContent = it.n; goBtn.classList.toggle('stay', cards[idx].hasAttribute('data-cur')); goBtn.href = it.url; }
      }, 90);
    }, { passive: true });
    sel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); focusCard(idx + 1, true); cards[idx].focus({ preventScroll: true }); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); focusCard(idx - 1, true); cards[idx].focus({ preventScroll: true }); }
      else if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('card')) { e.preventDefault(); navigate(idx); }
      else if (e.key === 'Escape') { e.preventDefault(); closeSel(); }
      else if (e.key === 'Tab') {
        var f = [].slice.call(sel.querySelectorAll('button,.go,.card[tabindex="0"]'));
        var a = shadow.activeElement, i = f.indexOf(a);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });

    /* Arrivée depuis un autre site du groupe : les pièces s'ouvrent */
    var arrived = /[?&]dg=1(&|$)/.test(location.search);
    if (arrived) {
      try { history.replaceState(null, '', location.href.replace(/([?&])dg=1(&?)/, function (m, a, b) { return b ? a : ''; }).replace(/\?(#|$)/, '$1')); } catch (e) {}
      if (!reduce) {
        wipe.classList.add('inst', 'on', 'closed');
        void wipe.offsetWidth; wipe.classList.remove('inst');
        setTimeout(function () { wipe.classList.remove('closed'); setTimeout(function () { wipe.classList.remove('on'); }, 800); }, 250);
      }
      try { sessionStorage.setItem('dg-intro', '1'); } catch (e) {}
    }

    /* Écran d'accueil : une fois par session et par site */
    if (intro && INTRO && !arrived) {
      var seen = false;
      try { seen = sessionStorage.getItem('dg-intro') === '1'; } catch (e) {}
      if (!seen) {
        intro.hidden = false; lock(true); intro.classList.add('show');
        var enter = intro.querySelector('.in-enter');
        setTimeout(function () { enter.focus({ preventScroll: true }); }, 50);
        var done = function () { try { sessionStorage.setItem('dg-intro', '1'); } catch (e) {} };
        var leave = function (then) {
          done(); document.removeEventListener('keydown', onKey, true);
          if (reduce) { intro.hidden = true; lock(false); then && then(); return; }
          intro.classList.add('leave');
          setTimeout(function () { intro.hidden = true; lock(false); then && then(); }, 520);
        };
        var onKey = function (e) { if (e.key === 'Escape') { e.preventDefault(); leave(); } };
        document.addEventListener('keydown', onKey, true);
        enter.addEventListener('click', function () { leave(); });
        intro.querySelector('.in-explore').addEventListener('click', function () { leave(function () { openSel(); }); });
      }
    }
  }

  /* Les en-têtes fixés en haut (ex. Divi) passent sous le bandeau tant qu'il est visible, puis reprennent leur place. */
  function offsetFixedHeaders(root) {
    var list = [];
    function scan() {
      list.forEach(function (o) { o.el.style.top = o.top; });
      list = [];
      var H = root.getBoundingClientRect().height;
      var els = document.body.querySelectorAll('header,nav,[id*="header" i],[class*="header" i],[class*="sticky" i],[id*="nav" i]');
      for (var i = 0; i < els.length && list.length < 6; i++) {
        var el = els[i];
        if (el === root || el.id === 'wpadminbar' || el.closest('#wpadminbar')) continue;
        var cs = getComputedStyle(el);
        if (cs.position !== 'fixed') continue;
        var r = el.getBoundingClientRect();
        if (r.top > 48 || r.width < innerWidth * .5) continue;
        if (list.some(function (o) { return o.el.contains(el); })) continue;
        list.push({ el: el, top: el.style.top, base: parseFloat(cs.top) || 0, h: H });
      }
      upd();
    }
    function upd() {
      var y = window.scrollY || 0;
      list.forEach(function (o) { o.el.style.top = (o.base + Math.max(0, o.h - y)) + 'px'; });
    }
    var raf = 0;
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; upd(); }); }, { passive: true });
    window.addEventListener('resize', function () { clearTimeout(scan.t); scan.t = setTimeout(scan, 200); });
    window.addEventListener('load', scan);
    setTimeout(scan, 50); setTimeout(scan, 1200);
  }

  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
