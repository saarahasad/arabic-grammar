/**
 * Longest-match colorizer for Arabic iʿrāb analysis strings (diacritic-insensitive).
 * Wraps known terminology in pill spans (background + text; borderless rounded pills) aligned to grammatical families.
 * @param {string} text
 * @returns {string} HTML (non-matches escaped)
 */
(function (global) {
  'use strict';

  const IRAAB_COLORS = {
    noun: { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC' },
    'nominal-sentence': { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC' },
    fael: { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC' },
    'verb-passive-overview': { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC' },

    'verb-imperative': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'verb-imperative-li': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'verb-past': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'verb-past-passive': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'verb-present': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'verb-present-passive': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'kaana-sisters': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },

    'irab-raf': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },
    'irab-nasb': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },
    'irab-jarr': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },
    'irab-jazm': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },
    'irab-raf-noon': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },
    'mabni-muarab': { bg: '#E6F1FB', text: '#0C447C', border: '#85B7EB' },

    'harf-jarr': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'harf-maani': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    atf: { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'inna-sisters': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'verb-present-conditional-particles': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'verb-present-jussive-particles': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'verb-present-nasb-particles': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
    'verb-present-negation': { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },

    'attached-pronouns': { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    'attached-verbs': { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    'detached-pronouns': { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    pronouns: { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    demonstratives: { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    'relative-nouns': { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    'interrogative-nouns': { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },
    munada: { bg: '#FBEAF0', text: '#72243E', border: '#ED93B1' },

    naat: { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },
    idafah: { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },
    tawabi: { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },
    mafool: { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },

    'silah-mawsul': { bg: '#EAF3DE', text: '#27500A', border: '#97C459' },
    'verbal-sentence': { bg: '#EAF3DE', text: '#27500A', border: '#97C459' },
    'sentence-structure': { bg: '#EAF3DE', text: '#27500A', border: '#97C459' },
    masdar: { bg: '#EAF3DE', text: '#27500A', border: '#97C459' },

    'mamnu-sarf': { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' },
    'number-plural': { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' },
    istithna: { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' },
    'verb-present-double-emphasis': { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' },
  };

  const IRAAB_COLOR_DEFAULT = { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' };

  /** Short codes per lesson rule (`iraabCodeForRule`); not shown as labels on Qurʿān Iʿrāb rule pills. */
  const IRAAB_RULE_CODES = {
    noun: 'N',
    'nominal-sentence': 'NM',
    fael: 'F',
    'verb-passive-overview': 'PF',

    'verb-imperative': 'VI',
    'verb-imperative-li': 'VL',
    'verb-past': 'PT',
    'verb-past-passive': 'PP',
    'verb-present': 'PR',
    'verb-present-passive': 'PS',
    'kaana-sisters': 'KN',

    'irab-raf': 'RF',
    'irab-nasb': 'NB',
    'irab-jarr': 'JR',
    'irab-jazm': 'JZ',
    'irab-raf-noon': 'FN',
    'mabni-muarab': 'MB',

    'harf-jarr': 'J',
    'harf-maani': 'HM',
    atf: 'C',
    'inna-sisters': 'IN',
    'verb-present-conditional-particles': 'CP',
    'verb-present-jussive-particles': 'JP',
    'verb-present-nasb-particles': 'NA',
    'verb-present-negation': 'NG',
    'verb-present-double-emphasis': 'DN',

    'attached-pronouns': 'XP',
    'attached-verbs': 'XV',
    'detached-pronouns': 'DP',
    pronouns: 'PR',
    demonstratives: 'DM',
    'relative-nouns': 'RQ',
    'interrogative-nouns': 'IQ',
    munada: 'VC',

    naat: 'AJ',
    idafah: 'ID',
    tawabi: 'TB',
    mafool: 'OB',
    istithna: 'EX',

    'silah-mawsul': 'SL',
    'verbal-sentence': 'VF',
    'sentence-structure': 'ST',
    masdar: 'MS',

    'mamnu-sarf': 'SX',
    'number-plural': 'PL',
  };

  /** Representative colours per highlight family (phrase-based matcher). */
  const FAM = {
    nouns: IRAAB_COLORS.noun,
    verbs: IRAAB_COLORS['verb-present'],
    irab: IRAAB_COLORS['irab-raf'],
    particles: IRAAB_COLORS['harf-jarr'],
    pronouns: IRAAB_COLORS.pronouns,
    modifiers: IRAAB_COLORS.naat,
    clauses: IRAAB_COLORS['verbal-sentence'],
    exceptions: IRAAB_COLORS['mamnu-sarf'],
  };

  const FAMILY_CLASS = {
    nouns: 'iraab-fam--nouns',
    verbs: 'iraab-fam--verbs',
    irab: 'iraab-fam--irab',
    particles: 'iraab-fam--particles',
    pronouns: 'iraab-fam--pronouns',
    modifiers: 'iraab-fam--modifiers',
    clauses: 'iraab-fam--clauses',
    exceptions: 'iraab-fam--exceptions',
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  /** @param {{ bg: string, text: string, border: string }} c */
  function iraabPillStyleInline(c) {
    const x = c || IRAAB_COLOR_DEFAULT;
    return (
      'background: ' +
      x.bg +
      '; color: ' +
      x.text +
      '; border: none; border-radius: 999px; padding: 2px 8px; font-weight: 500; cursor: default'
    );
  }

  /** Strip combining marks; keeps base letters for matching. */
  function stripMarks(s) {
    return s.replace(/\p{M}/gu, '');
  }

  /**
   * @returns {{ norm: string, normStart: number[], str: string }}
   */
  function buildNormMap(str) {
    const normStart = [];
    let norm = '';
    let i = 0;
    while (i < str.length) {
      const cp = str.codePointAt(i);
      const ch = String.fromCodePoint(cp);
      const step = ch.length;
      if (/\p{M}/u.test(ch)) {
        i += step;
        continue;
      }
      normStart.push(i);
      norm += stripMarks(ch);
      i += step;
    }
    normStart.push(str.length);
    return { norm, normStart, str };
  }

  /** @type {{ raw: string, norm: string, color: { bg: string, text: string, border: string }, family: string }[]} */
  const RAW = [];

  /**
   * @param {keyof typeof FAM} family
   * @param {string[]} phrases
   */
  function addFamily(family, phrases) {
    const color = FAM[family];
    for (let i = 0; i < phrases.length; i++) {
      const raw = phrases[i];
      if (raw == null || !String(raw).trim()) continue;
      const s = String(raw);
      const norm = stripMarks(s);
      if (!norm) continue;
      RAW.push({ raw: s, norm, color, family });
    }
  }

  /* —— Phrase families (longer phrases win globally after sort) —— */

  addFamily('exceptions', [
    'صلة الموصول لا محل لها من الإعراب',
    'جواب الشرط لا محل لها من الإعراب',
    'جواب الشرط لا محل لها',
    'استئنافية لا محل لها من الإعراب',
    'جملة استئنافية لا محل لها من الإعراب',
    'لا محل لها من الإعراب',
    'لا محل له من الإعراب',
    'لا محل لها',
    'لا محل له',
    'ممنوع من الصرف',
    'جمع مذكر سالم',
    'جمع مؤنث سالم',
    'مستثنى منه',
    'مستثنى',
    'نون التوكيد الثقيلة',
    'نون التوكيد',
  ]);

  addFamily('clauses', [
    'جواب الشرط محذوف',
    'جواب الشرط',
    'جواب القسم',
    'جملة استئنافية',
    'جملة فعلية',
    'جملة اسمية',
    'في محل رفع',
    'في محل نصب',
    'في محل جر',
    'في محل جزم',
    'صلة الموصول',
    'المصدر المؤول',
    'شبه الجملة',
  ]);

  addFamily('irab', [
    'أفعال الخمسة',
    'الأفعال الخمسة',
    'مبني على الفتح المقدر للتعذر',
    'مبني على السكون المقدر للتقاء الساكنين',
    'مبني على السكون المقدر للتعذر',
    'مبني على الفتح المقدر',
    'مبني على السكون المقدر',
    'مبني على الفتح',
    'مبني على الضم',
    'مبني على الكسر',
    'مبني على',
    'اسم مرفوع',
    'اسم منصوب',
    'اسم مجرور',
    'منصوب بأن مضمرة',
    'مبني على حذف حرف العلة',
    'مثنى',
    'مرفوع',
    'منصوب',
    'مجرور',
    'مجزوم',
    'مرفوعة',
    'منصوبة',
    'مجرورة',
    'مجزومة',
    'مبني',
    'مبنية',
    'النصب',
    'الرفع',
    'الجر',
    'الجرّ',
    'الجزم',
    'مستتر',
    'متصل',
    'منفصل',
  ]);

  addFamily('verbs', [
    'كَانَ وَأَخَوَاتُهَا',
    'كان وأخواتها',
    'فعل مضارع للمجهول',
    'فعل ماض للمجهول',
    'مضارع للمجهول',
    'ماض للمجهول',
    'فعل مضارع',
    'فعل ماضٍ',
    'فعل ماض',
    'فعل أمر',
    'مبني للمجهول',
    'مبني للمعلوم',
    'ماض مبني للمجهول',
    'ماض مبني للمعلوم',
    'فعل ماضٍ مجهول',
    'فعل ماضٍ مبني للمجهول',
    'فعل ناقص',
    'اسم كان',
    'خبر كان',
  ]);

  addFamily('nouns', [
    'إن واسمها',
    'فاعل لام',
    'مبتدأ مؤخر',
    'خبر مقدم',
    'خبر مؤخر',
    'نائب الفاعل',
    'نائب فاعل',
    'فاعل',
    'مبتدأ',
    'خبر',
  ]);

  addFamily('particles', [
    'حرف توكيد ونصب',
    'حرف نفي وجزم',
    'حرف نهي وجزم',
    'حرف استفهام',
    'حرف شرط جازم',
    'حرف ردع وزجر',
    'حرف نفي',
    'حرف حال',
    'حرف رابط',
    'حرف استقبال',
    'حرف قسم',
    'حرف موطئ للقسم',
    'حرف مصدرية',
    'حرف تأنيث',
    'حرف استثناء',
    'حرف جواب للقسم',
    'حرف شرط',
    'لا الناهية',
    'لا النافية',
    'اللام المزحلقة',
    'لام الأمر',
    'حرف جر',
    'حرف عطف',
    'حرف توكيد',
    'حرف نداء',
    'حرف تنبيه',
    'حرف وقسم',
    'نافية',
    'اسم إن',
    'خبر إن',
  ]);

  addFamily('pronouns', [
    'ضمير متصل',
    'ضمير منفصل',
    'ضمير مستتر',
    'اسم إشارة',
    'اسم استفهام',
    'منادى',
    'اسم موصول',
    'المُنَادَى',
  ]);

  addFamily('modifiers', [
    'مفعول به أول',
    'مفعول به ثان',
    'مفعول به ثانٍ',
    'مفعول به',
    'مفعول مطلق',
    'ظرف زمان ومكان',
    'ظرف زمان',
    'ظرف مكان',
    'نعت',
    'بدل',
    'حال',
    'تمييز',
    'مضاف',
    'مضاف إليه',
    'صفة',
    'معطوف',
    'مفعول',
    'جار ومجرور',
    'صاحب الحال',
    'اسم فاعل',
    'اسم مفعول',
    'مفعول فيه',
    'مفعول له',
    'مفعول معه',
  ]);

  addFamily('irab', [
    'الضمة المقدرة للتعذر',
    'الفتحة المقدرة للتعذر',
    'الكسرة المقدرة للتعذر',
    'الضمة المقدرة للثقل',
    'الفتحة المقدرة للثقل',
    'حذف حرف العلة',
    'الضمة الظاهرة',
    'الفتحة الظاهرة',
    'الكسرة الظاهرة',
    'السكون الظاهر',
    'الكسرة المقدرة',
    'الكسرة المقدّرة',
    'الفتحة المقدّرة',
    'ثبوت النون',
    'حذف النون',
    'بالفتحة',
    'بالكسرة',
    'بالضمة',
    'وعلامة رفعه',
    'وعلامة نصبه',
    'وعلامة جره',
    'وعلامة جزمه',
    'علامة رفعه',
    'علامة نصبه',
    'علامة جره',
    'علامة جزمه',
    'الضمة',
    'الفتحة',
    'الكسرة',
    'السكون',
    'الظاهرة',
    'المقدرة',
    'الواو',
    'الياء',
    'الألف',
    'فتحة',
    'كسرة',
    'ضمة',
  ]);

  addFamily('clauses', ['محل نصب', 'محل جر', 'محل رفع', 'محل جزم']);

  RAW.sort(function (a, b) {
    return b.norm.length - a.norm.length || (a.norm < b.norm ? -1 : a.norm > b.norm ? 1 : 0);
  });

  const seen = Object.create(null);
  const PATTERNS = [];
  for (let i = 0; i < RAW.length; i++) {
    const p = RAW[i];
    if (seen[p.norm]) continue;
    seen[p.norm] = true;
    PATTERNS.push(p);
  }

  function irabFamilyClassForPattern(pat) {
    return FAMILY_CLASS[pat.family] || FAMILY_CLASS.irab;
  }

  /**
   * Same longest-match tokenizer as `colorizeIraab`, but emits
   * `<span class="irab-term iraab-fam--…">` for beginner styling (no inline colors).
   */
  function colorizeIraabClasses(text) {
    if (text == null) return '';
    const str = String(text);
    if (!str) return '';
    const { norm, normStart, str: original } = buildNormMap(str);
    let j = 0;
    const out = [];
    while (j < norm.length) {
      let best = null;
      for (let p = 0; p < PATTERNS.length; p++) {
        const pat = PATTERNS[p];
        if (norm.startsWith(pat.norm, j)) {
          if (!best || pat.norm.length > best.norm.length) best = pat;
        }
      }
      if (best) {
        const plen = best.norm.length;
        const o0 = normStart[j];
        const o1 = normStart[j + plen];
        const slice = original.slice(o0, o1);
        const cls = irabFamilyClassForPattern(best);
        out.push('<span class="irab-term ' + cls + '">' + escapeHtml(slice) + '</span>');
        j += plen;
      } else {
        const o0 = normStart[j];
        const o1 = normStart[j + 1];
        out.push(escapeHtml(original.slice(o0, o1)));
        j += 1;
      }
    }
    return out.join('');
  }

  function colorizeIraab(text) {
    if (text == null) return '';
    const str = String(text);
    if (!str) return '';
    const { norm, normStart, str: original } = buildNormMap(str);
    let j = 0;
    const out = [];
    while (j < norm.length) {
      let best = null;
      for (let p = 0; p < PATTERNS.length; p++) {
        const pat = PATTERNS[p];
        if (norm.startsWith(pat.norm, j)) {
          if (!best || pat.norm.length > best.norm.length) best = pat;
        }
      }
      if (best) {
        const plen = best.norm.length;
        const o0 = normStart[j];
        const o1 = normStart[j + plen];
        const slice = original.slice(o0, o1);
        const st = iraabPillStyleInline(best.color);
        out.push(
          '<span class="irab-term" style="' +
            escapeAttr(st) +
            '">' +
            escapeHtml(slice) +
            '</span>'
        );
        j += plen;
      } else {
        const o0 = normStart[j];
        const o1 = normStart[j + 1];
        out.push(escapeHtml(original.slice(o0, o1)));
        j += 1;
      }
    }
    return out.join('');
  }

  /**
   * Full pill colours for a lesson `rule` id (curated `analysisParts` links).
   * @param {string} ruleId
   * @returns {{ bg: string, text: string, border: string }}
   */
  function iraabColorsForRule(ruleId) {
    const r = (ruleId || '').toLowerCase();
    if (!r) return IRAAB_COLOR_DEFAULT;
    return IRAAB_COLORS[r] || IRAAB_COLOR_DEFAULT;
  }

  /**
   * Link underline / text colour (hex) — matches `iraabColorsForRule(rule).text`.
   * @param {string} ruleId
   * @returns {string} hex colour
   */
  function ruleLinkColorForRule(ruleId) {
    return iraabColorsForRule(ruleId).text;
  }

  /**
   * Short Latin tag for lesson `rule` pills (uppercase, length ≤ 3).
   * @param {string} ruleId
   * @returns {string}
   */
  function iraabCodeForRule(ruleId) {
    const r = (ruleId || '').toLowerCase();
    if (!r) return '?';
    const hit = IRAAB_RULE_CODES[r];
    if (hit) return hit;
    if (r.indexOf('verb-') === 0) return 'VB';
    if (r.indexOf('irab-') === 0) return 'IR';
    if (r.indexOf('harf') === 0) return 'H';
    return '?';
  }

  global.IRAAB_COLORS = IRAAB_COLORS;
  global.IRAAB_RULE_CODES = IRAAB_RULE_CODES;
  global.IRAAB_COLOR_DEFAULT = IRAAB_COLOR_DEFAULT;
  global.iraabColorsForRule = iraabColorsForRule;
  global.iraabCodeForRule = iraabCodeForRule;
  global.iraabPillStyleInline = iraabPillStyleInline;
  global.colorizeIraab = colorizeIraab;
  global.colorizeIraabClasses = colorizeIraabClasses;
  global.ruleLinkColorForRule = ruleLinkColorForRule;
})(typeof window !== 'undefined' ? window : globalThis);
