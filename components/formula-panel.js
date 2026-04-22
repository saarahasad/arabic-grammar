/**
 * Formula panel for Qurʾān Iʿrāb: bottom sheet (mobile) / anchored popover (desktop).
 * Expects `FORMULA_BY_ID`, `colorizeIraab`, `getDotColorForFormulaCategory` on `window`.
 */
(function (global) {
  'use strict';

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripHarakahText(str) {
    if (typeof global.stripHarakah === 'function') return global.stripHarakah(str);
    return String(str == null ? '' : str).replace(
      /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g,
      ''
    );
  }

  function readShowHarakahPref() {
    return typeof global.readShowHarakah === 'function' ? global.readShowHarakah() : true;
  }

  function isWideViewport() {
    return global.matchMedia && global.matchMedia('(min-width: 900px)').matches;
  }

  let rootEl = null;
  let backdropEl = null;
  let panelEl = null;
  let anchorEl = null;
  let onCloseCb = null;
  let dragStartY = null;
  let dragStartTranslate = 0;

  function close() {
    if (!rootEl) return;
    rootEl.hidden = true;
    rootEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quran-iraab-formula-open');
    if (onCloseCb) {
      onCloseCb();
      onCloseCb = null;
    }
    anchorEl = null;
  }

  function positionPanel() {
    if (!panelEl || !anchorEl) return;
    if (!isWideViewport()) {
      panelEl.style.left = '';
      panelEl.style.top = '';
      panelEl.style.width = '';
      return;
    }
    const r = anchorEl.getBoundingClientRect();
    const pw = Math.min(420, global.innerWidth - 24);
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(12, Math.min(left, global.innerWidth - pw - 12));
    let top = r.bottom + 8;
    const ph = panelEl.offsetHeight || 320;
    if (top + ph > global.innerHeight - 12) {
      top = Math.max(12, r.top - ph - 8);
    }
    panelEl.style.width = pw + 'px';
    panelEl.style.left = left + 'px';
    panelEl.style.top = top + 'px';
  }

  function buildPanelHtml(opts) {
    const formulaId = opts.formulaId;
    const soon = opts.comingSoon === true;
    const rule = opts.rule || '';

    if (soon) {
      return (
        '<div class="quran-iraab-formula-panel__inner">' +
        '<div class="quran-iraab-formula-panel__header">' +
        '<span class="quran-iraab-formula-panel__soon" lang="ar" dir="rtl">قريباً</span>' +
        '<span class="quran-iraab-formula-panel__soon-en">Coming soon</span>' +
        '</div>' +
        '<p class="quran-iraab-formula-panel__soon-body">' +
        'A numbered formula card for this pattern is not in the guide yet. ' +
        'Use the lesson link in the analysis for the full explanation.' +
        '</p>' +
        '<p class="quran-iraab-formula-panel__soon-body" lang="ar" dir="rtl">' +
        'سيتم إضافة صيغة مرقمة لهذا النمط في دليل الإعراب لاحقاً.' +
        '</p>' +
        '<button type="button" class="quran-iraab-formula-panel__guide">' +
        '<span>See all formulas</span> <span lang="ar" dir="rtl">دليل الإعراب</span> <span aria-hidden="true">→</span>' +
        '</button>' +
        '</div>'
      );
    }

    const F = global.FORMULA_BY_ID && global.FORMULA_BY_ID[formulaId];
    if (!F) {
      return (
        '<div class="quran-iraab-formula-panel__inner">' +
        '<p class="quran-iraab-formula-panel__err">Formula data not found.</p>' +
        '</div>'
      );
    }

    const catColor =
      typeof global.getDotColorForFormulaCategory === 'function'
        ? global.getDotColorForFormulaCategory(F.category)
        : '#64748b';

    const showHarakah = readShowHarakahPref();
    const templateColored = showHarakah ? F.templateHtml : stripHarakahText(F.templateHtml);
    const exWord =
      opts.triggerWord && String(opts.triggerWord).trim()
        ? String(opts.triggerWord).trim()
        : F.example.ar;
    const exAnalysis =
      opts.analysis && String(opts.analysis).trim()
        ? String(opts.analysis).trim()
        : F.example.analysis;
    const colorize =
      typeof global.colorizeIraab === 'function' ? global.colorizeIraab : function (t) {
        return escapeHtml(t);
      };

    const yourWordFull =
      opts.segment && String(opts.segment).trim() ? String(opts.segment).trim() : exWord;
    const vowelHint =
      !showHarakah &&
      typeof global.hasHarakah === 'function' &&
      global.hasHarakah(yourWordFull)
        ? '<p class="quran-iraab-formula-panel__your-word-vowels-note" lang="en">' +
          '<span class="quran-iraab-formula-panel__your-word-vowels-label">with vowels: </span>' +
          '<span lang="ar" dir="rtl">' +
          escapeHtml(yourWordFull) +
          '</span></p>'
        : '';

    return (
      '<div class="quran-iraab-formula-panel__inner">' +
      '<div class="quran-iraab-formula-panel__headline">' +
      '<span class="quran-iraab-formula-panel__fid" style="border-color:' +
      escapeHtml(catColor) +
      '">' +
      escapeHtml(formulaId) +
      '</span>' +
      '<span class="quran-iraab-formula-panel__titles">' +
      '<span class="quran-iraab-formula-panel__title-en">' +
      escapeHtml(F.title) +
      '</span>' +
      '<span class="quran-iraab-formula-panel__title-ar" lang="ar" dir="rtl">' +
      escapeHtml(showHarakah ? F.titleAr : stripHarakahText(F.titleAr)) +
      '</span>' +
      '</span>' +
      '</div>' +
      '<hr class="quran-iraab-formula-panel__rule" />' +
      '<p class="quran-iraab-formula-panel__label">FORMULA</p>' +
      '<p class="quran-iraab-formula-panel__template" lang="ar" dir="rtl">' +
      templateColored +
      '</p>' +
      '<hr class="quran-iraab-formula-panel__rule" />' +
      '<p class="quran-iraab-formula-panel__label">YOUR WORD</p>' +
      '<p class="quran-iraab-formula-panel__your-word" lang="ar" dir="rtl">' +
      escapeHtml(yourWordFull) +
      '</p>' +
      vowelHint +
      '<p class="quran-iraab-formula-panel__your-analysis" lang="ar" dir="rtl">' +
      colorize(exAnalysis) +
      ' <span class="quran-iraab-formula-panel__ok" aria-hidden="true">✓</span> <span class="quran-iraab-formula-panel__ok-label">matches</span>' +
      '</p>' +
      '<hr class="quran-iraab-formula-panel__rule" />' +
      '<p class="quran-iraab-formula-panel__label">WHEN TO USE</p>' +
      '<p class="quran-iraab-formula-panel__when">' +
      escapeHtml(F.whenToUse) +
      '</p>' +
      '<p class="quran-iraab-formula-panel__slots"><strong>Slots:</strong> ' +
      escapeHtml(F.slots) +
      '</p>' +
      '<button type="button" class="quran-iraab-formula-panel__guide" data-formula-guide="' +
      escapeHtml(formulaId.toLowerCase()) +
      '">' +
      '<span>See all formulas</span> <span lang="ar" dir="rtl">دليل الإعراب</span> <span aria-hidden="true">→</span>' +
      '</button>' +
      '</div>'
    );
  }

  function ensureDom() {
    if (rootEl) return;
    rootEl = document.createElement('div');
    rootEl.className = 'quran-iraab-formula-root';
    rootEl.hidden = true;
    rootEl.setAttribute('aria-hidden', 'true');
    backdropEl = document.createElement('div');
    backdropEl.className = 'quran-iraab-formula-backdrop';
    backdropEl.tabIndex = -1;
    panelEl = document.createElement('div');
    panelEl.className = 'quran-iraab-formula-panel';
    panelEl.setAttribute('dir', 'ltr');
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-modal', 'true');
    panelEl.innerHTML =
      '<button type="button" class="quran-iraab-formula-panel__close" aria-label="Close">&times;</button>' +
      '<div class="quran-iraab-formula-panel__drag" aria-hidden="true"></div>' +
      '<div class="quran-iraab-formula-panel__body"></div>';

    rootEl.appendChild(backdropEl);
    rootEl.appendChild(panelEl);
    document.body.appendChild(rootEl);

    backdropEl.addEventListener('click', close);
    panelEl.querySelector('.quran-iraab-formula-panel__close').addEventListener('click', close);

    panelEl.addEventListener('click', function (e) {
      const g = e.target.closest('.quran-iraab-formula-panel__guide');
      if (!g) return;
      e.preventDefault();
      const id = g.getAttribute('data-formula-guide');
      close();
      if (id != null && id !== '') {
        global.location.href = 'formulas.html#' + encodeURIComponent(id);
      } else {
        global.location.href = 'formulas.html';
      }
    });

    const dragHandle = panelEl.querySelector('.quran-iraab-formula-panel__drag');
    if (dragHandle) {
      dragHandle.addEventListener(
        'touchstart',
        function (e) {
          if (!e.touches || !e.touches[0]) return;
          dragStartY = e.touches[0].clientY;
          dragStartTranslate = 0;
        },
        { passive: true }
      );
      dragHandle.addEventListener(
        'touchmove',
        function (e) {
          if (dragStartY == null || !e.touches || !e.touches[0]) return;
          const dy = e.touches[0].clientY - dragStartY;
          if (dy > 0) {
            panelEl.style.transform = 'translateY(' + dy + 'px)';
          }
        },
        { passive: true }
      );
      dragHandle.addEventListener('touchend', function () {
        const dy =
          panelEl.style.transform && panelEl.style.transform.indexOf('translateY') !== -1
            ? parseFloat(panelEl.style.transform.replace(/[^\d.-]/g, '')) || 0
            : 0;
        panelEl.style.transform = '';
        if (dy > 80) close();
        dragStartY = null;
      });
    }

    global.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && rootEl && !rootEl.hidden) {
        e.preventDefault();
        close();
      }
    });
    global.addEventListener('resize', function () {
      if (rootEl && !rootEl.hidden) positionPanel();
    });
  }

  /**
   * @param {{ formulaId?: string, comingSoon?: boolean, rule?: string, triggerWord?: string, segment?: string, analysis?: string, anchorEl?: HTMLElement }} opts
   */
  function openFormulaPanel(opts) {
    ensureDom();
    anchorEl = opts.anchorEl || null;
    const body = panelEl.querySelector('.quran-iraab-formula-panel__body');
    if (body) {
      body.innerHTML = buildPanelHtml(opts);
    }
    rootEl.hidden = false;
    rootEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quran-iraab-formula-open');
    panelEl.classList.toggle('quran-iraab-formula-panel--desktop', isWideViewport());
    panelEl.classList.toggle('quran-iraab-formula-panel--mobile', !isWideViewport());
    panelEl.style.transform = '';
    if (!isWideViewport()) {
      panelEl.style.width = '';
      panelEl.style.left = '';
      panelEl.style.top = '';
    }

    global.requestAnimationFrame(function () {
      positionPanel();
      const closeBtn = panelEl.querySelector('.quran-iraab-formula-panel__close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function initQuranFormulaPanel(container) {
    ensureDom();
    const root = container || document.body;

    root.addEventListener('click', function (e) {
      const btn = e.target.closest('.quran-iraab__formula-hit');
      if (!btn || !root.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();

      const row = btn.closest('.qg-word-card, .quran-iraab__row');
      const segment = row && row.dataset.segment ? row.dataset.segment : '';
      const analysisPlain = row && row.dataset.analysisPlain ? row.dataset.analysisPlain : '';

      if (btn.getAttribute('data-formula-soon') === '1' || btn.classList.contains('quran-iraab__formula-hit--soon')) {
        openFormulaPanel({
          comingSoon: true,
          rule: btn.getAttribute('data-rule') || '',
          triggerWord: btn.textContent || '',
          segment: segment,
          analysis: analysisPlain,
          anchorEl: btn,
        });
        return;
      }

      const fid = btn.getAttribute('data-formula');
      if (!fid) return;

      openFormulaPanel({
        formulaId: fid,
        triggerWord: btn.textContent || '',
        segment: segment,
        analysis: analysisPlain,
        anchorEl: btn,
      });
    });

    root.addEventListener(
      'keydown',
      function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const btn = e.target.closest('.quran-iraab__formula-hit');
        if (!btn || !root.contains(btn)) return;
        e.preventDefault();
        btn.click();
      },
      true
    );
  }

  global.openFormulaPanel = openFormulaPanel;
  global.closeFormulaPanel = close;
  global.initQuranFormulaPanel = initQuranFormulaPanel;
})(typeof window !== 'undefined' ? window : globalThis);
