/**
 * Longest-match colorizer for Arabic iʿrāb analysis strings (diacritic-insensitive).
 * Wraps known terminology in <span style="color: #…; font-weight: 500">.
 * @param {string} text
 * @returns {string} HTML (non-matches escaped)
 */
(function (global) {
  'use strict';

  const COL = {
    fun: '#E05A2B',
    case: '#1A7F5A',
    sign: '#B5860D',
    sent: '#7B5EA7',
    part: '#888888',
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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

  /** @type {{ raw: string, color: string, norm: string }[]} */
  const RAW = [];

  function add(color, phrases) {
    for (let i = 0; i < phrases.length; i++) {
      const raw = phrases[i];
      if (raw == null || !String(raw).trim()) continue;
      const s = String(raw);
      const norm = stripMarks(s);
      if (!norm) continue;
      RAW.push({ raw: s, color, norm });
    }
  }

  /* —— User color system (longer phrases included first in source order; sorted by length below) —— */

  add(COL.sent, [
    'صلة الموصول لا محل لها من الإعراب',
    'جواب الشرط لا محل لها من الإعراب',
    'جواب الشرط لا محل لها',
    'جواب الشرط محذوف',
    'لا محل لها من الإعراب',
    'لا محل له من الإعراب',
    'في محل رفع',
    'في محل نصب',
    'في محل جر',
    'في محل جزم',
    'صلة الموصول',
  ]);

  add(COL.case, [
    'مبني على الفتح المقدر للتعذر',
    'مبني على السكون المقدر للتقاء الساكنين',
    'مبني على السكون المقدر للتعذر',
    'مبني على الفتح المقدر',
    'مبني على السكون المقدر',
    'مبني على الفتح',
    'مبني على الضم',
    'مبني على الكسر',
    'مبني على',
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
    'منصوب بأن مضمرة',
    'اسم موصول',
    'ضمير متصل',
    'فعل ناقص',
    'شبه جملة',
    'جمع مذكر سالم',
    'جمع مؤنث سالم',
    'ممنوع من الصرف',
    'مبني على حذف حرف العلة',
    'منصوب بأن مضمرة',
    'مثنى',
    'مرفوع',
    'منصوب',
    'مجرور',
    'مجزوم',
    'اسم مرفوع',
    'اسم منصوب',
    'اسم مجرور',
    'مبني',
    'مبنية',
    'مرفوعة',
    'منصوبة',
    'مجرورة',
    'مجزومة',
    'النصب',
    'الرفع',
    'الجر',
    'الجرّ',
    'الجزم',
    'مستتر',
    'متصل',
    'منفصل',
  ]);

  add(COL.sign, [
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

  add(COL.part, [
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
    'نون التوكيد الثقيلة',
    'اللام المزحلقة',
    'لام الأمر',
    'حرف جر',
    'حرف عطف',
    'حرف توكيد',
    'حرف نداء',
    'حرف تنبيه',
    'حرف وقسم',
  ]);

  add(COL.fun, [
    'مفعول به أول',
    'مفعول به ثان',
    'مفعول به ثانٍ',
    'مفعول به',
    'نائب الفاعل',
    'نائب فاعل',
    'مضاف إليه',
    'اسم إن',
    'خبر إن',
    'اسم كان',
    'خبر كان',
    'خبر مقدم',
    'خبر مؤخر',
    'مبتدأ مؤخر',
    'مفعول مطلق',
    'ظرف زمان',
    'ظرف مكان',
    'فاعل',
    'مبتدأ',
    'خبر',
    'نعت',
    'بدل',
    'حال',
    'تمييز',
    'مضاف',
    'صفة',
    'معطوف',
    'منادى',
    'مفعول',
    'إن واسمها',
    'جار ومجرور',
    'شبه الجملة',
    'المصدر المؤول',
    'مستثنى',
    'مستثنى منه',
    'صاحب الحال',
    'اسم فاعل',
    'فاعل لام',
    'اسم مفعول',
    'مفعول فيه',
    'مفعول له',
    'مفعول معه',
    'نافية',
  ]);

  /* Ambiguous short tokens: prefer sentence / sign / case when longer match did not apply */
  add(COL.sent, ['محل نصب', 'محل جر', 'محل رفع', 'محل جزم']);

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
        out.push(
          '<span style="color: ' +
            best.color +
            '; font-weight: 500">' +
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
   * Link color from lesson `rule` id (category buckets per spec).
   * @param {string} ruleId
   * @returns {string} hex color
   */
  function ruleLinkColorForRule(ruleId) {
    const r = (ruleId || '').toLowerCase();
    if (!r) return '#334155';

    if (
      [
        'harf-jarr',
        'harf-maani',
        'atf',
        'verb-present-jussive-particles',
        'verb-present-double-emphasis',
        'verb-present-negation',
      ].indexOf(r) !== -1
    ) {
      return '#888888';
    }
    if (r === 'relative-nouns' || r === 'silah-mawsul') return '#7B5EA7';
    if (
      [
        'number-plural',
        'irab-raf-noon',
        'irab-raf-dammah',
        'mamnu-sarf',
        'attached-pronouns',
        'attached-verbs',
        'detached-pronouns',
      ].indexOf(r) !== -1
    ) {
      return '#B5860D';
    }
    if (
      [
        'fael',
        'mafool',
        'nominal-sentence',
        'naat',
        'tawabi',
        'idafah',
        'inna-sisters',
        'kaana-sisters',
        'mabni-muarab',
        'istithna',
        'munada',
        'verb-passive-overview',
      ].indexOf(r) !== -1
    ) {
      return '#E05A2B';
    }
    if (
      [
        'verb-past',
        'verb-present',
        'verb-imperative',
        'verb-passive',
        'verb-present-passive',
        'irab-raf',
        'irab-jarr',
        'irab-jazm',
        'irab-nasb',
      ].indexOf(r) !== -1
    ) {
      return '#1A7F5A';
    }
    if (r.startsWith('verb-past-') || r.startsWith('verb-present-') || r.startsWith('verb-imperative')) {
      if (r.indexOf('jussive') !== -1 && r.indexOf('particles') !== -1) return '#888888';
      if (r.indexOf('double-emphasis') !== -1) return '#888888';
      if (r.indexOf('negation') !== -1) return '#888888';
      return '#1A7F5A';
    }
    if (r.startsWith('irab-')) return '#1A7F5A';
    return '#334155';
  }

  global.colorizeIraab = colorizeIraab;
  global.ruleLinkColorForRule = ruleLinkColorForRule;
})(typeof window !== 'undefined' ? window : globalThis);
