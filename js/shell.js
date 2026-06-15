/* Dashboard qobig'i: sidebar + mobil topbar.
   Foydalanish: <body data-page="home"> ... kontent ... </body>
   Skript kontentni .app > .main ichiga o'rab, sidebar qo'shadi. */

(function () {
  'use strict';

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    ar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3.2"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h3"/></svg>',
    wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2M15 10V8M19 6h2M9 6h2M17.8 8.8 19 10M17.8 3.2 19 2M3 21 14 10l1.5 1.5L4.5 22.5z"/></svg>',
    vr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3.5l-1.7-2.3a1 1 0 0 0-1.6 0L10.5 17H7a2 2 0 0 1-2-2z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M20 17v3H6.5a2.5 2.5 0 0 1 0-5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
  };

  var NAV = [
    { id: 'home', href: 'index.html', icon: 'home', label: "Bosh sahifa" },
    { id: 'ar', href: 'ar.html', icon: 'ar', label: 'AR Demo' },
    { id: 'scan', href: 'scan.html', icon: 'qr', label: 'QR Skaner' },
    { id: 'create', href: 'create.html', icon: 'wand', label: 'AR Yaratish' },
    { id: 'vr', href: 'vr.html', icon: 'vr', label: "VR Ko'rish" },
    { id: 'components', href: 'components.html', icon: 'grid', label: 'Komponentlar' },
    { section: 'Hisob' },
    { id: 'profile', href: 'profile.html', icon: 'user', label: 'Profil' },
    { id: 'admin', href: 'admin.html', icon: 'shield', label: 'Admin panel' }
  ];

  var page = document.body.dataset.page;
  if (!page) return;

  var navHtml = NAV.map(function (item) {
    if (item.section) {
      return '<div class="nav-section-label">' + item.section + '</div>';
    }
    var active = item.id === page ? ' active' : '';
    return '<a class="nav-item' + active + '" href="' + item.href + '">' + ICONS[item.icon] + item.label + '</a>';
  }).join('');

  var sidebar =
    '<aside class="sidebar">' +
      '<div class="logo"><span class="logo-mark">AR</span> ARVideo</div>' +
      '<nav class="nav">' + navHtml + '</nav>' +
      '<div class="sidebar-footer">' +
        '<a class="nav-item" href="https://github.com/istamovx/arvideo/tree/main/docs" target="_blank" rel="noopener">' + ICONS.book + 'Hujjatlar</a>' +
        '<div class="sidebar-card"><b>ARVideo v2.0</b>Untitled UI dizayn tizimi asosidagi WebAR/WebVR ilova.</div>' +
      '</div>' +
    '</aside>';

  var topbar =
    '<div class="topbar">' +
      '<button class="btn btn-tertiary btn-icon menu-btn" data-menu-toggle aria-label="Menyu">' + ICONS.menu + '</button>' +
      '<span class="logo-mark">AR</span><b>ARVideo</b>' +
    '</div>';

  // Mavjud kontentni .main ichiga ko'chiramiz
  var content = Array.prototype.slice.call(document.body.children)
    .filter(function (el) { return el.tagName !== 'SCRIPT'; });

  var app = document.createElement('div');
  app.className = 'app';
  app.innerHTML = sidebar;

  var main = document.createElement('main');
  main.className = 'main';
  content.forEach(function (el) { main.appendChild(el); });
  app.appendChild(main);

  var scrim = document.createElement('div');
  scrim.className = 'scrim';

  document.body.insertAdjacentHTML('afterbegin', topbar);
  document.body.appendChild(scrim);
  document.body.appendChild(app);
})();
