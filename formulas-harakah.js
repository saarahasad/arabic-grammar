/**
 * Apply global harakah preference to Formula Guide static Arabic (not examples).
 * Loads after `iraab-colorize` runs on `[data-iraab-colorize]` examples.
 */
(function () {
  'use strict';

  var originals = new WeakMap();

  function remember(el) {
    if (!originals.has(el)) originals.set(el, el.innerHTML);
  }

  function colorizeFormulaExamples() {
    if (typeof window.colorizeIraab !== 'function') return;
    document.querySelectorAll('[data-iraab-colorize]').forEach(function (el) {
      var t = el.textContent;
      el.innerHTML = window.colorizeIraab(t);
    });
  }

  function applyFormulasPageHarakah() {
    if (typeof window.stripHarakah !== 'function' || typeof window.readShowHarakah !== 'function') return;
    var show = window.readShowHarakah();
    var selectors = [
      '.formulas-page__title-ar',
      '.formulas-section__title-ar',
      '.formulas-card__formula',
      '.formulas-master__line',
      '.formulas-master__note span[lang="ar"]',
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        remember(el);
        el.innerHTML = show ? originals.get(el) : window.stripHarakah(originals.get(el));
      });
    });

    document.querySelectorAll('.formulas-legend__item').forEach(function (el) {
      remember(el);
      el.innerHTML = show ? originals.get(el) : window.stripHarakah(originals.get(el));
    });

    var navAr = document.querySelector('.site-nav a[href="formulas.html"] span[lang="ar"]');
    if (navAr) {
      remember(navAr);
      navAr.innerHTML = show ? originals.get(navAr) : window.stripHarakah(originals.get(navAr));
    }
  }

  function syncFormulasHarakahButton(btn) {
    if (!btn || typeof window.readShowHarakah !== 'function') return;
    var on = window.readShowHarakah();
    btn.textContent = on ? 'إخفاء التشكيل' : 'إظهار التشكيل';
    btn.classList.toggle('quran-iraab-toolbar__harakah-btn--on', on);
    btn.setAttribute('aria-label', on ? 'Hide harakah' : 'Show harakah');
    btn.setAttribute('title', 'Show / hide vowel marks');
  }

  function init() {
    colorizeFormulaExamples();
    applyFormulasPageHarakah();
    var btn = document.getElementById('formulas-toggle-harakah');
    syncFormulasHarakahButton(btn);
    if (btn && typeof window.writeShowHarakah === 'function') {
      btn.addEventListener('click', function () {
        window.writeShowHarakah(!window.readShowHarakah());
        syncFormulasHarakahButton(btn);
        applyFormulasPageHarakah();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
