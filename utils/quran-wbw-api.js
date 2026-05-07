/**
 * Fetches word-by-word Arabic + English gloss per verse from Quran.com API v4.
 * Saheeh International id 20 — see https://api.quran.com/api/v4/resources/translations
 */
(function (global) {
  'use strict';

  var API_BASE = 'https://api.quran.com/api/v4';
  /** Quran.com translation resource: Saheeh International */
  var SAHEEH_INTL_ID = 20;
  var chapterCache = new Map();

  function stripTranslationHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function parseVerse(v) {
    var words = (v.words || [])
      .filter(function (w) {
        return w.char_type_name === 'word';
      })
      .map(function (w) {
        return {
          ar: w.text_uthmani || w.text || '',
          en: (w.translation && w.translation.text) || '',
        };
      });
    var ayahEn = '';
    var trans = v.translations && v.translations[0];
    if (trans && trans.text) ayahEn = stripTranslationHtml(trans.text);
    return { words: words, ayahEn: ayahEn, verse_key: v.verse_key };
  }

  /**
   * @param {number} chapterNumber surah 1–114
   * @returns {Promise<Map<string, { words: Array, ayahEn: string, verse_key: string }>>} keyed by verse_key e.g. "111:1"
   */
  function fetchQuranChapterWbw(chapterNumber) {
    var sn = Number(chapterNumber);
    if (!Number.isFinite(sn) || sn < 1 || sn > 114) {
      return Promise.reject(new Error('Invalid surah'));
    }
    if (chapterCache.has(sn)) {
      return Promise.resolve(chapterCache.get(sn));
    }
    var url =
      API_BASE +
      '/verses/by_chapter/' +
      sn +
      '?words=true&word_fields=text_uthmani,translation&translations=' +
      SAHEEH_INTL_ID +
      '&per_page=300';
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Quran.com API HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var map = new Map();
        (data.verses || []).forEach(function (v) {
          var p = parseVerse(v);
          map.set(v.verse_key, p);
        });
        chapterCache.set(sn, map);
        return map;
      });
  }

  global.fetchQuranChapterWbw = fetchQuranChapterWbw;
  global.stripQuranTranslationHtml = stripTranslationHtml;
  global.QURAN_COM_WBW_TRANSLATION_ID = SAHEEH_INTL_ID;
})(typeof window !== 'undefined' ? window : globalThis);
