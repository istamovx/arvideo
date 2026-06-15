/* ARVideo UI — Untitled UI uslubidagi interaktiv komponentlar.
   Hech qanday kutubxonasiz, deklarativ HTML atributlari bilan ishlaydi:

   Select:    <div class="select" data-select> <button class="select-trigger">…
              <div class="menu"><button class="menu-item" data-value="v">…
   Dropdown:  <div class="dropdown" data-dropdown> <button>… <div class="menu">…
   Datepicker:<div class="datepicker" data-datepicker> <input class="input">…
   Sidebar:   <button data-menu-toggle> ochadi/yopadi (.sidebar, .scrim)
*/

(function () {
  'use strict';

  function closeAll(except) {
    document
      .querySelectorAll('.select.open, .dropdown.open, .datepicker.open')
      .forEach(function (el) {
        if (el !== except) el.classList.remove('open');
      });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.select, .dropdown, .datepicker')) closeAll(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });

  /* ---------- Select ---------- */
  document.querySelectorAll('[data-select]').forEach(function (root) {
    var trigger = root.querySelector('.select-trigger');
    var labelEl = trigger.querySelector('.select-value');
    var hidden = root.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', function () {
      var willOpen = !root.classList.contains('open');
      closeAll(root);
      root.classList.toggle('open', willOpen);
    });

    root.querySelectorAll('.menu-item').forEach(function (item) {
      item.addEventListener('click', function () {
        root.querySelectorAll('.menu-item').forEach(function (i) {
          i.classList.remove('selected');
        });
        item.classList.add('selected');
        labelEl.textContent = item.textContent.trim();
        labelEl.classList.remove('placeholder');
        if (hidden) {
          hidden.value = item.dataset.value || item.textContent.trim();
          hidden.dispatchEvent(new Event('change', { bubbles: true }));
        }
        root.classList.remove('open');
      });
    });
  });

  /* ---------- Dropdown ---------- */
  document.querySelectorAll('[data-dropdown]').forEach(function (root) {
    var trigger = root.querySelector(':scope > .btn, :scope > button');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var willOpen = !root.classList.contains('open');
      closeAll(root);
      root.classList.toggle('open', willOpen);
    });
    root.querySelectorAll('.menu-item').forEach(function (item) {
      item.addEventListener('click', function () {
        root.classList.remove('open');
      });
    });
  });

  /* ---------- Calendar / Datepicker ---------- */
  var MONTHS = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ];
  var DOWS = ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'];

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }
  function fmt(d) {
    return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  // container ichiga kalendar chizadi; onPick(date) tanlovda chaqiriladi
  function renderCalendar(container, state, onPick) {
    var first = new Date(state.year, state.month, 1);
    // haftani dushanbadan boshlaymiz
    var startOffset = (first.getDay() + 6) % 7;
    var daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
    var daysInPrev = new Date(state.year, state.month, 0).getDate();
    var today = new Date();

    var html =
      '<div class="calendar-head">' +
      '<button type="button" data-cal-prev aria-label="Oldingi oy">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<span class="cal-title">' +
      MONTHS[state.month] +
      ' ' +
      state.year +
      '</span>' +
      '<button type="button" data-cal-next aria-label="Keyingi oy">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '</div><div class="calendar-grid">';

    DOWS.forEach(function (d) {
      html += '<span class="dow">' + d + '</span>';
    });

    for (var p = startOffset; p > 0; p--) {
      html +=
        '<button type="button" class="day muted" data-day="' +
        (daysInPrev - p + 1) +
        '" data-rel="-1">' +
        (daysInPrev - p + 1) +
        '</button>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var cls = 'day';
      if (
        state.year === today.getFullYear() &&
        state.month === today.getMonth() &&
        d === today.getDate()
      )
        cls += ' today';
      if (
        state.selected &&
        state.selected.getFullYear() === state.year &&
        state.selected.getMonth() === state.month &&
        state.selected.getDate() === d
      )
        cls += ' selected';
      html +=
        '<button type="button" class="' +
        cls +
        '" data-day="' +
        d +
        '" data-rel="0">' +
        d +
        '</button>';
    }
    var cells = startOffset + daysInMonth;
    var trailing = (7 - (cells % 7)) % 7;
    for (var t = 1; t <= trailing; t++) {
      html +=
        '<button type="button" class="day muted" data-day="' +
        t +
        '" data-rel="1">' +
        t +
        '</button>';
    }
    html += '</div>';
    container.innerHTML = html;

    container.querySelector('[data-cal-prev]').addEventListener('click', function () {
      state.month--;
      if (state.month < 0) {
        state.month = 11;
        state.year--;
      }
      renderCalendar(container, state, onPick);
    });
    container.querySelector('[data-cal-next]').addEventListener('click', function () {
      state.month++;
      if (state.month > 11) {
        state.month = 0;
        state.year++;
      }
      renderCalendar(container, state, onPick);
    });
    container.querySelectorAll('.day').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rel = parseInt(btn.dataset.rel, 10);
        var m = state.month + rel;
        var y = state.year;
        if (m < 0) {
          m = 11;
          y--;
        }
        if (m > 11) {
          m = 0;
          y++;
        }
        state.selected = new Date(y, m, parseInt(btn.dataset.day, 10));
        state.month = m;
        state.year = y;
        renderCalendar(container, state, onPick);
        if (onPick) onPick(state.selected);
      });
    });
  }

  // Mustaqil (inline) kalendar
  document.querySelectorAll('[data-calendar]').forEach(function (container) {
    var now = new Date();
    renderCalendar(
      container,
      { year: now.getFullYear(), month: now.getMonth(), selected: null },
      null
    );
  });

  // Input + popover datepicker
  document.querySelectorAll('[data-datepicker]').forEach(function (root) {
    var input = root.querySelector('.input');
    var pop = document.createElement('div');
    pop.className = 'calendar';
    root.appendChild(pop);

    var now = new Date();
    var state = { year: now.getFullYear(), month: now.getMonth(), selected: null };

    renderCalendar(pop, state, function (date) {
      input.value = fmt(date);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      root.classList.remove('open');
    });

    input.addEventListener('click', function () {
      var willOpen = !root.classList.contains('open');
      closeAll(root);
      root.classList.toggle('open', willOpen);
    });
    input.setAttribute('readonly', '');
  });

  /* ---------- Mobil sidebar ---------- */
  var sidebar = document.querySelector('.sidebar');
  var scrim = document.querySelector('.scrim');
  document.querySelectorAll('[data-menu-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (scrim) scrim.classList.toggle('open', sidebar.classList.contains('open'));
    });
  });
  if (scrim) {
    scrim.addEventListener('click', function () {
      sidebar.classList.remove('open');
      scrim.classList.remove('open');
    });
  }

  /* ---------- Toast (notification) ---------- */
  function getToastHost() {
    var host = document.querySelector('.toast-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    return host;
  }

  var TOAST_ICONS = { success: '✅', error: '❌', info: '💡' };

  // window.toast('Xabar', 'success' | 'error' | 'info', muddat_ms)
  window.toast = function (message, type, duration) {
    type = type || 'info';
    duration = duration == null ? 4000 : duration;
    var host = getToastHost();

    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.setAttribute('role', 'status');

    var icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = TOAST_ICONS[type] || TOAST_ICONS.info;

    var body = document.createElement('div');
    body.className = 'toast-body';
    body.textContent = message;

    var close = document.createElement('button');
    close.className = 'toast-close';
    close.setAttribute('aria-label', 'Yopish');
    close.innerHTML = '&times;';

    el.appendChild(icon);
    el.appendChild(body);
    el.appendChild(close);
    host.appendChild(el);

    requestAnimationFrame(function () {
      el.classList.add('show');
    });

    var timer;
    function dismiss() {
      clearTimeout(timer);
      el.classList.remove('show');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 200);
    }
    close.addEventListener('click', dismiss);
    if (duration > 0) timer = setTimeout(dismiss, duration);
    return dismiss;
  };

  /* ---------- Tabs ---------- */
  // <div class="tabs" data-tabs> <button class="tab" data-tab="id">…
  // panellar: <div data-tab-panel="id"> … </div>
  document.querySelectorAll('[data-tabs]').forEach(function (tabs) {
    var buttons = tabs.querySelectorAll('.tab');
    var scope = tabs.closest('[data-tabs-scope]') || document;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        var id = btn.dataset.tab;
        scope.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
          panel.hidden = panel.dataset.tabPanel !== id;
        });
      });
    });
  });

  /* ---------- File drop zonasi ---------- */
  document.querySelectorAll('.file-drop').forEach(function (zone) {
    var input = zone.querySelector('input[type="file"]');
    if (!input) return;
    zone.addEventListener('click', function () {
      input.click();
    });
    ['dragover', 'dragenter'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        zone.classList.add('dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) {
        e.preventDefault();
        zone.classList.remove('dragover');
      });
    });
    zone.addEventListener('drop', function (e) {
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
})();
