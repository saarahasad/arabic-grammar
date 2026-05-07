/**
 * Per-token English for iʿrāb Arabic as a two-row table (Arabic | English columns, Qurʾān viewer only).
 * Lookup is harakat-insensitive; unknown tokens omit the English line.
 */
(function (global) {
  'use strict';

  /** @type {Record<string, string>} keys = stripHarakah(NFKC(token)) */
  var TOKEN_EN = {
    الواو: 'wāw — the letter wāw',
    واو: 'wāw',
    حرف: 'particle / letter',
    'حرف جر': 'particle of jarr (genitive governance)',
    للقسم: 'for the oath',
    لقسم: 'for the oath',
    القسم: 'the oath',
    قسم: 'oath',
    مبني: 'mabnī (indeclinable)',
    مبنيه: 'mabnī (f., indeclinable)',
    معرب: 'muʿrab (declinable)',
    الفتح: 'fatḥah (a-vowel ending)',
    الفتحي: 'fatḥ (ending)',
    الضم: 'ḍammah (u-vowel)',
    الضمة: 'ḍammah',
    الكسر: 'kasrah (i-vowel)',
    الكسرة: 'kasrah',
    السكون: 'sukūn (silent)',
    الشمس: 'the sun',
    اسم: 'noun',
    الاسم: 'the noun',
    مقسم: 'object sworn by (maqṣūm bih)',
    به: 'by it / attached to it',
    مجرور: 'majrūr (genitive)',
    مجروره: 'majrūr (genitive)',
    والجار: 'and the jār (governing particle)',
    الجار: 'jār (governing particle)',
    والمجرور: 'and the majrūr (governed noun)',
    المجرور: 'majrūr (governed noun)',
    متعلق: 'mutaʿalliq — connected / attached / related',
    متعلقان: 'dual: connected / attached / related',
    متعلقه: 'connected / attached / related to it',
    بفعل: 'to the verb of…',
    فعل: 'verb',
    محذوف: 'mahdhūf — omitted / deleted / left out (elided)',
    محذوفة: 'mahdhūfah — omitted / deleted / left out',
    مرفوع: 'marfūʿ (nominative)',
    منصوب: 'manṣūb (accusative)',
    مجزوم: 'majzūm (jussive)',
    علامة: 'sign (ʿalāmah)',
    الظاهرة: 'visible / apparent',
    مقدر: 'muqaddar — estimated / understood / implied (not written on the surface)',
    المقدرة: 'muqaddarah — estimated / understood / implied (f.; not written on the surface)',
    للتعذر:
      'li-t-taʿadhthur — because the vowel sign cannot be written on the word (awkward or impossible to show clearly)',
    التعذر: 'at-taʿadhthur — difficulty / impossibility (of pronouncing or writing the sign on the surface)',
    بالكسرة: 'with kasrah',
    بالفتحة: 'with fatḥah',
    بالضمة: 'with ḍammah',
    جار: 'jār (preposing particle)',
    ومجرور: 'and majrūr',
    ضمير: 'pronoun',
    مستتر: 'hidden (mustatir)',
    فاعل: 'faʿil (doer / subject)',
    مفعول: 'mafʿūl (object)',
    نعت: 'naʿt (adjective)',
    خبر: 'khabar (predicate)',
    مبتدأ: 'mubtadaʾ (topic)',
    موصول: 'connective (mawṣūl)',
    منادى: 'vocative',
    ظرف: 'ẓarf (adverbial)',
    زمان: 'time',
    مكان: 'place',
    مصدر: 'maṣdar (verbal noun)',
    حال: 'ḥāl (circumstance)',
    بدل: 'badal (apposition)',
    صفة: 'ṣifah (description)',
    مضاف: 'muḍāf (first part of iḍāfah)',
    إليه: 'ilayh (second part)',
    نائب: 'deputy',
    توكيد: 'emphasis',
    استثناء: 'exception',
    شرط: 'condition',
    جواب: 'response',
    جملة: 'sentence',
    كلمة: 'word',
    اسمية: 'nominal',
    فعلية: 'verbal',
    صلة: 'ṣilah (link)',
    لا: 'lā',
    محل: 'position (maḥall)',
    إعراب: 'iʿrāb',
    بناء: 'construction',
    نصب: 'naṣb',
    جر: 'jarr',
    جزم: 'jazm',
    رفع: 'rafʿ',
    حروف: 'letters / particles',
    المعاني: 'meanings',
    عطف: 'ʿaṭf (coordination)',
    نفي: 'negation',
    نداء: 'vocative call',
    استفهام: 'question',
    استعمال: 'usage',
    تنوين: 'tanwīn',
    تعريف: 'definite article',
    نكرة: 'indefinite',
    معرفة: 'definite',
    فتح: 'fatḥ',
    كسر: 'kasr',
    ضم: 'ḍamm',
    همزة: 'hamzah',
    ألف: 'alif',
    ياء: 'yāʾ',
    واوي: 'wāw-related',
    يائي: 'yāʾ-related',
    التأنيث: 'feminine tāʾ',
    التثنية: 'dual',
    الجمع: 'plural',
    المثنى: 'dual',
    المذكر: 'masculine',
    المؤنث: 'feminine',
    المجهول: 'passive',
    الماضي: 'past',
    المضارع: 'present / future',
    الأمر: 'command',
    ناقص: 'defective / incomplete',
    خمسة: 'five (verbs)',
    المرفوعات: 'nominatives',
    المنصوبات: 'accusatives',
    المجرورات: 'genitives',
    المجزومات: 'jussives',
    في: 'fī (in)',
    من: 'from / who',
    إلى: 'ilá (to)',
    عن: 'ʿan (about)',
    على: 'upon / on (ʿalá)',
    ب: 'bi- (with / by)',
    ل: 'li- (for)',
    ك: 'ka- (like)',
    حتى: 'ḥattá (until)',
    مذ: 'mudh (since)',
    منذ: 'mundhu (since)',
    إذا: 'idhā (when)',
    إن: 'inna',
    أن: 'anna / an',
    كأن: 'ka-anna',
    لكن: 'lākin / lākinna',
    ليت: 'layta',
    لعل: 'laʿalla',
    كان: 'kāna',
    ما: 'mā',
    ليس: 'laysa',
    إذ: 'idh',
    لو: 'law',
    كما: 'kamā',
    كيف: 'kayfa',
    متى: 'matá',
    أين: 'ayn',
    ماذا: 'mādhā',
    كفى: 'kafá',
    و: 'and (wa)',
    ف: 'so / then (fa)',
    ثم: 'thumma (then)',
    أو: 'or (aw)',
    بل: 'bal (rather)',
    عند: 'ʿinda (at)',
    بين: 'bayna (between)',
    بعد: 'baʿda (after)',
    قبل: 'qabla (before)',
    حول: 'ḥawla (around)',
    تحت: 'taḥta (under)',
    فوق: 'fawqa (above)',
    هذه: 'these / this',
    الذي: 'who / which (m.)',
    التي: 'who / which (f.)',
    الذين: 'who / which (pl.)',
    إنما: 'innamā (only)',
    إلا: 'illā (except)',
    غير: 'ghayr (other than)',
    سوى: 'siwá (other than)',
  };

  function stripForKey(text) {
    var s = String(text == null ? '' : text);
    if (typeof global.stripHarakah === 'function') s = global.stripHarakah(s);
    else s = s.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '');
    s = s.replace(/\u0671/g, '\u0627');
    s = s.replace(/[\u0640\u200c\u200d]/g, '');
    return s.normalize('NFKC').trim();
  }

  function glossForToken(surface) {
    var trimmed = String(surface || '').trim();
    if (!trimmed) return '';
    var core = trimmed.replace(/^([«»()\[\]"'.،؛:!؟]*)/, '');
    core = core.replace(/([«»()\[\]"'.،؛:!؟]*)$/, '');
    if (!core) return '';
    var key = stripForKey(core);
    if (!key) return '';
    if (TOKEN_EN[key]) return TOKEN_EN[key];
    var noAl = key.replace(/^\u0627\u0644/, '');
    if (noAl !== key && TOKEN_EN[noAl]) return TOKEN_EN[noAl];
    return '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Max Arabic/English columns per sub-table before wrapping to the next pair of rows (avoid horizontal scroll). */
  var DEFAULT_MAX_COLS = 4;

  function iraabWordGlossMaxCols() {
    var n = global.IRAAB_WORD_GLOSS_MAX_COLS;
    if (typeof n === 'number' && n > 0 && n <= 16) return Math.floor(n);
    return DEFAULT_MAX_COLS;
  }

  /**
   * @param {Array<{ arHtml: string, en: string, phraseHead?: boolean }>} cells arHtml may contain markup (colour pills, phrase span)
   */
  function buildGlossChunkTableFromCells(cells) {
    var arCells = '';
    var enCells = '';
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      var phraseCls = cell.phraseHead ? ' iraab-word-gloss-table__cell--phrase-head' : '';
      arCells +=
        '<td class="iraab-word-gloss-table__cell iraab-word-gloss-table__cell--ar' +
        phraseCls +
        '" lang="ar" dir="rtl">' +
        cell.arHtml +
        '</td>';
      enCells +=
        '<td class="iraab-word-gloss-table__cell iraab-word-gloss-table__cell--en' +
        phraseCls +
        '" lang="en" dir="ltr">' +
        (cell.en ? escapeHtml(cell.en) : '') +
        '</td>';
    }
    return (
      '<table class="iraab-word-gloss-table" dir="rtl">' +
      '<tbody>' +
      '<tr class="iraab-word-gloss-table__row iraab-word-gloss-table__row--ar">' +
      arCells +
      '</tr>' +
      '<tr class="iraab-word-gloss-table__row iraab-word-gloss-table__row--en">' +
      enCells +
      '</tr>' +
      '</tbody>' +
      '</table>'
    );
  }

  /**
   * Mixed columns: `{ type: 'html', arHtml, en }` (phrase, rule pill) or `{ type: 'token', surface }`.
   * @param {Array<{ type: string, arHtml?: string, en?: string, surface?: string }>} columns
   * @param {{ colorizeWord?: function(string): string }} [opts]
   */
  function formatIraabMixedColumnsChunked(columns, opts) {
    if (!columns || !columns.length) return '';
    var colorizeWord =
      opts && typeof opts.colorizeWord === 'function' ? opts.colorizeWord : null;
    var flat = [];
    for (var i = 0; i < columns.length; i++) {
      var c = columns[i];
      if (c.type === 'html') {
        flat.push({
          arHtml: c.arHtml || '',
          en: c.en || '',
          phraseHead: !!c.phraseHead,
        });
      } else if (c.type === 'token') {
        var tok = c.surface;
        var en = glossForToken(tok);
        var arInner = colorizeWord ? colorizeWord(tok) : escapeHtml(tok);
        flat.push({ arHtml: arInner, en: en, phraseHead: false });
      }
    }
    if (!flat.length) return '';

    var maxCols = iraabWordGlossMaxCols();
    var tables = '';
    for (var start = 0; start < flat.length; start += maxCols) {
      tables += buildGlossChunkTableFromCells(flat.slice(start, start + maxCols));
    }
    return '<div class="iraab-word-gloss-table-wrap">' + tables + '</div>';
  }

  /**
   * Stacked two-row tables: Arabic row + English row per chunk (RTL). Chunks break after `IRAAB_WORD_GLOSS_MAX_COLS` tokens (default 4).
   * @param {string} displayedArabic already passed through displayArabic / stripQuranSmallMeemHints
   * @param {{ colorizeWord?: function(string): string }} [opts] if colorizeWord set (Scholar), each token is passed through it
   * @returns {string} HTML
   */
  function formatIraabLineWithWordGlosses(displayedArabic, opts) {
    var raw = String(displayedArabic == null ? '' : displayedArabic);
    if (!raw.trim()) return '';
    var parts = raw.split(/(\s+)/);
    var cols = [];
    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i];
      if (!seg || /^\s+$/.test(seg)) continue;
      cols.push({ type: 'token', surface: seg });
    }
    if (!cols.length) return '';
    return formatIraabMixedColumnsChunked(cols, opts);
  }

  global.iraabEnglishGlossForToken = glossForToken;
  global.formatIraabLineWithWordGlosses = formatIraabLineWithWordGlosses;
  global.formatIraabMixedColumnsChunked = formatIraabMixedColumnsChunked;
})(typeof window !== 'undefined' ? window : globalThis);
