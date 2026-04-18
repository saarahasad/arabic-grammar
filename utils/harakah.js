/**
 * Harakah helpers for the Arabic Grammar site (browser bundle).
 * Mirrors `utils/harakah.ts`.
 */
(function (global) {
  'use strict';

  var HARAKAH_STRIP_RE =
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;
  var HARAKAH_DETECT_RE = /[\u064B-\u065F\u0670]/;

  var STORAGE_KEY = 'quran-iraab-show-harakah';

  function stripHarakah(text) {
    return String(text == null ? '' : text).replace(HARAKAH_STRIP_RE, '');
  }

  function hasHarakah(text) {
    return HARAKAH_DETECT_RE.test(String(text == null ? '' : text));
  }

  /** @returns {boolean} true = show diacritics (default). */
  function readShowHarakah() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === null) return true;
      return v !== '0';
    } catch (e) {
      return true;
    }
  }

  function writeShowHarakah(show) {
    try {
      localStorage.setItem(STORAGE_KEY, show ? '1' : '0');
    } catch (e) {
      /* ignore */
    }
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.classList.toggle('quran-iraab--hide-harakah', !show);
    }
  }

  /**
   * @param {string} text
   * @param {boolean} [alwaysShow] when true, never strip
   * @returns {string}
   */
  function displayArabic(text, alwaysShow) {
    if (alwaysShow === true || readShowHarakah()) return String(text == null ? '' : text);
    return stripHarakah(String(text));
  }

  global.stripHarakah = stripHarakah;
  global.hasHarakah = hasHarakah;
  global.readShowHarakah = readShowHarakah;
  global.writeShowHarakah = writeShowHarakah;
  global.displayArabic = displayArabic;
  global.HARAKAH_STORAGE_KEY = STORAGE_KEY;

  /**
   * Capture full Arabic for toolbar chrome before any script strips diacritics.
   * Without this, toggling "show" can only restore what is left in textContent.
   */
  function seedHarakahChromeSources() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('[data-harakah-chrome]').forEach(function (el) {
      if (!el.getAttribute('data-harakah-src')) {
        el.setAttribute('data-harakah-src', el.textContent);
      }
    });
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    seedHarakahChromeSources();
    document.documentElement.classList.toggle('quran-iraab--hide-harakah', !readShowHarakah());
  }
})(typeof window !== 'undefined' ? window : globalThis);
