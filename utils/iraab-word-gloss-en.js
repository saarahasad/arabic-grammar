/**
 * Per-token English for iʿrāb Arabic (WBW tables, hover tooltips, glossary lookup).
 * `TOKEN_EN` aligns with `iraab-colorize.js` phrase lemmas plus common particles; lookup is harakat-insensitive.
 * Exposes `injectIrabTermHoverGloss`, `wireQgIraabTooltip` (#qg-tooltip) for Qurʾān + revision layouts.
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
    يستقبل:
      '“is taken on / received” — in ẓarf phrases (لِمَا يُسْتَقْبَلُ مِنَ الزَّمَانِ): the part of time that lies ahead; the future',
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

  /** Longest-match colouriser lemmas (`iraab-colorize.js`) + common madrasa phrases — keys are harakat-stripped by lookup. */
  Object.assign(TOKEN_EN, {
    'صلة الموصول لا محل لها من الإعراب': 'relative clause — no grammatical declension slot',
    'جواب الشرط لا محل لها من الإعراب': 'conditional reply — no declension slot',
    'جواب الشرط لا محل لها': 'conditional reply — no declension slot',
    'استئنافية لا محل لها من الإعراب': 'resumptive clause — no declension slot',
    'جملة استئنافية لا محل لها من الإعراب': 'resumptive sentence — no declension slot',
    'لا محل لها من الإعراب': 'no declension slot (f.)',
    'لا محل له من الإعراب': 'no declension slot (m.)',
    'لا محل لها': 'no declension slot (f.)',
    'لا محل له': 'no declension slot (m.)',
    'ممنوع من الصرف': 'diptote / forbidden from full inflection',
    'جمع مذكر سالم': 'sound masculine plural',
    'جمع مؤنث سالم': 'sound feminine plural',
    'مستثنى منه': 'excepted-from term (before illā)',
    'مستثنى': 'exception (after illā)',
    'نون التوكيد الثقيلة': 'heavy emphatic nūn',
    'نون التوكيد': 'emphatic nūn',
    'جواب الشرط محذوف': 'elided conditional reply',
    'جواب الشرط': 'conditional reply',
    خافض: 'khāfiḍ — governor into naṣb (accusative); “lowering” particle or verb form',
    شرطه: 'its sharṭ — the conditional protasis (“if…” clause)',
    لشرطه: 'for its sharṭ — governing / pertaining to the conditional clause',
    جوابه: 'its jawāb — the conditional reply (apodosis / “then…” clause)',
    بجوابه: 'attached to its jawāb (the apodosis)',
    'متعلق بجوابه':
      'mutaʿalliq bi-jawābih — syntactically attached to the conditional reply (apodosis)',
    'خافض لشرطه':
      'khāfiḍ li-sharṭihi — naṣb-governor for the conditional protasis (the “if” clause)',
    'خافض لشرطه متعلق بجوابه':
      'naṣb-governor for the conditional clause; attached to the conditional reply (apodosis)',
    معنى: 'meaning / sense (maʿnan)',
    متضمن: 'mutaḍammin — inclusive; carrying another sense by implication (taḍmīn)',
    'متضمن معنى':
      'mutaḍammin maʿnan — includes another meaning within itself (Arabic grammar: taḍmīn / semantic inclusion)',
    'جواب القسم': 'oath reply',
    'جملة استئنافية': 'resumptive sentence',
    'جملة فعلية': 'verbal sentence',
    'جملة اسمية': 'nominal sentence',
    'في محل رفع': 'in a nominative syntactic slot',
    'في محل نصب': 'in an accusative syntactic slot',
    'في محل جر': 'in a genitive syntactic slot',
    'في محل جزم': 'in a jussive syntactic slot',
    'صلة الموصول': 'relative clause (ṣilah)',
    'المصدر المؤول': 'interpreted masdar (clause as noun)',
    'شبه الجملة': 'quasi-sentence (prep. phrase or adverbial)',
    'أفعال الخمسة': 'five verbs (with visible nūn)',
    'الأفعال الخمسة': 'the five verbs',
    'مبني على الفتح المقدر للتعذر': 'mabnī on estimated fatḥah — awkward to write',
    'مبني على السكون المقدر للتقاء الساكنين': 'mabnī on estimated sukūn — meeting two sukūns',
    'التقاء الساكنين': 'meeting of two sukūns — two successive silent consonants',
    'لالتقاء الساكنين': 'to prevent the meeting of two sukūns (grammar rationale)',
    منعا: 'manʿan — adverb of purpose: “to prevent…” / “blocking…”',
    'منعا لالتقاء الساكنين':
      'manʿan li-l-tiqāʾi s-sākinayn — to avoid two sukūns meeting (two silent consonants in a row)',
    'منعا للتقاء الساكنين':
      'manʿan li-l-tiqāʾi s-sākinayn — to avoid two sukūns meeting (two silent consonants in a row)',
    'مبني على السكون المقدر للتعذر': 'mabnī on estimated sukūn — awkward to write',
    'مبني على الفتح المقدر': 'mabnī on estimated fatḥah',
    'مبني على السكون المقدر': 'mabnī on estimated sukūn',
    'مبني على الفتح': 'mabnī on fatḥah',
    'مبني على الضم': 'mabnī on ḍammah',
    'مبني على الكسر': 'mabnī on kasrah',
    'مبني على': 'mabnī on…',
    'اسم مرفوع': 'noun: nominative',
    'اسم منصوب': 'noun: accusative',
    'اسم مجرور': 'noun: genitive',
    'منصوب بأن مضمرة': 'accusative by implied anna',
    'مبني على حذف حرف العلة': 'mabnī with elided weak letter',
    مثنى: 'dual',
    مرفوعة: 'nominative (f.)',
    منصوبة: 'accusative (f.)',
    مجرورة: 'genitive (f.)',
    مجزومة: 'jussive (f.)',
    مبنية: 'mabnī (f., indeclinable)',
    النصب: 'accusative (naṣb)',
    الرفع: 'nominative (rafʿ)',
    الجر: 'genitive (jarr)',
    الجزم: 'jussive (jazm)',
    متصل: 'attached (clitic)',
    منفصل: 'detached',
    'كَانَ وَأَخَوَاتُهَا': 'kāna and its sisters',
    'كان وأخواتها': 'kāna and its sisters',
    'فعل مضارع للمجهول': 'present verb — passive',
    'فعل ماض للمجهول': 'past verb — passive',
    'مضارع للمجهول': 'present — passive',
    'ماض للمجهول': 'past — passive',
    'فعل مضارع': 'present tense verb',
    'فعل ماضٍ': 'past tense verb',
    'فعل ماض': 'past tense verb',
    'فعل أمر': 'imperative verb',
    'مبني للمجهول': 'passive stem',
    'مبني للمعلوم': 'active stem',
    'ماض مبني للمجهول': 'past — passive pattern',
    'ماض مبني للمعلوم': 'past — active pattern',
    'فعل ماضٍ مجهول': 'past passive verb',
    'فعل ماضٍ مبني للمجهول': 'past verb — passive pattern',
    'فعل ناقص': 'defective / incomplete verb',
    'اسم كان': 'ism of kāna',
    'خبر كان': 'khabar of kāna',
    'إن واسمها': 'inna and its ism',
    'فاعل لام': '“subject” of emphatic lām',
    'مبتدأ مؤخر': 'delayed topic',
    'خبر مقدم': 'fronted predicate',
    'خبر مؤخر': 'delayed predicate',
    'نائب الفاعل': 'passive subject (deputy of doer)',
    'نائب فاعل': 'passive subject',
    'حرف توكيد ونصب': 'particle of emphasis + accusative',
    'حرف نفي وجزم': 'negation + jussive particle',
    'حرف نهي وجزم': 'prohibition + jussive particle',
    'حرف استفهام': 'interrogative particle',
    'حرف شرط جازم': 'conditional jāzim particle',
    'حرف ردع وزجر': 'reproach particle',
    'حرف حال': 'ḥāl particle',
    'حرف رابط': 'linking particle',
    'حرف استقبال': 'future particle (e.g. sa-)',
    'حرف قسم': 'oath particle',
    'حرف موطئ للقسم': 'particle introducing an oath',
    'حرف مصدرية': 'masdar particle (an)',
    'حرف تأنيث': 'feminine marker (tāʾ)',
    'حرف جواب للقسم': 'particle answering an oath',
    'حرف شرط': 'conditional particle',
    'لا الناهية': 'prohibitive lā',
    'لا النافية': 'negating lā',
    'اللام المزحلقة': '“sliding” lām (emphasis)',
    'لام الأمر': 'lām of command',
    نافية: 'negating',
    'اسم إن': 'ism of inna',
    'خبر إن': 'khabar of inna',
    'ضمير متصل': 'attached pronoun',
    'ضمير منفصل': 'detached pronoun',
    'ضمير مستتر': 'implicit pronoun',
    'اسم إشارة': 'demonstrative',
    'اسم استفهام': 'interrogative noun',
    'اسم موصول': 'relative noun',
    'المُنَادَى': 'vocative (called one)',
    'مفعول به أول': 'first object',
    'مفعول به ثان': 'second object',
    'مفعول به ثانٍ': 'second object',
    'مفعول به': 'direct object',
    'مفعول مطلق': 'cognate object',
    'ظرف زمان ومكان': 'adverb of time and place',
    'ظرف زمان': 'adverb of time',
    'ظرف مكان': 'adverb of place',
    تمييز: 'specifier (tamyīz)',
    معطوف: 'coordinated term',
    'صاحب الحال': 'owner of ḥāl (the noun the circumstance describes)',
    'اسم فاعل': 'active participle',
    'اسم مفعول': 'passive participle',
    'مفعول فيه': 'adverbial object (mafʿūl fīhi)',
    'مفعول له': 'benefactive object',
    'مفعول معه': 'comitative object',
    'الضمة المقدرة للتعذر': 'estimated ḍammah — awkward to mark',
    'الفتحة المقدرة للتعذر': 'estimated fatḥah — awkward to mark',
    'الكسرة المقدرة للتعذر': 'estimated kasrah — awkward to mark',
    'الضمة المقدرة للثقل': 'estimated ḍammah — “heavy” ending',
    'الفتحة المقدرة للثقل': 'estimated fatḥah — “heavy” ending',
    'حذف حرف العلة': 'elision of weak letter',
    'الضمة الظاهرة': 'visible ḍammah',
    'الفتحة الظاهرة': 'visible fatḥah',
    'الكسرة الظاهرة': 'visible kasrah',
    'السكون الظاهر': 'visible sukūn',
    'ثبوت النون': 'nūn retained (five verbs)',
    'حذف النون': 'nūn dropped (jussive)',
    'وعلامة رفعه': 'sign of rafʿ:',
    'وعلامة نصبه': 'sign of naṣb:',
    'وعلامة جره': 'sign of jarr:',
    'وعلامة جزمه': 'sign of jazm:',
    'علامة رفعه': 'sign of rafʿ:',
    'علامة نصبه': 'sign of naṣb:',
    'علامة جره': 'sign of jarr:',
    'علامة جزمه': 'sign of jazm:',
    المقدر: 'estimated (not written)',
    'الواو': 'wāw (letter / particle)',
    الياء: 'yāʾ',
    فتحة: 'fatḥah',
    كسرة: 'kasrah',
    ضمة: 'ḍammah',
    'محل نصب': 'accusative slot',
    'محل جر': 'genitive slot',
    'محل رفع': 'nominative slot',
    'محل جزم': 'jussive slot',
    'متعلقين': 'two dependents (mutaʿalliqān)',
    'متعلقات': 'dependents',
    'بالإضافة': 'by annexation (iḍāfah)',
    'لام التعليل': 'lām of cause / explanation',
    'لام الأمر': 'lām of command',
    'لام التوكيد': 'emphatic lām',
    'حرف عطف': 'coordinating particle',
    'حرف نصب': 'accusative particle',
    'حرف جزم': 'jussive particle',
    'حرف نداء': 'vocative particle',
    'الفصل': 'disjunctive (faṣl)',
    'الوصل': 'conjunctive (waṣl)',
    'معطوفات': 'coordinated items',
    'عطف بيان': 'explanatory coordination',
    'بدل كل': 'substitute — whole-for-whole',
    'بدل بعض': 'substitute — part-for-part',
    'بدل اشتمال': 'inclusive substitute',
    'توكيد لفظي': 'verbal emphasis (same word)',
    'توكيد معنوي': 'semantic emphasis (another word)',
    حال: 'circumstantial accusative (ḥāl)',
    صفة: 'adjective / description',
    موصوف: 'modified noun',
    صلة: 'relative clause link',
    اسمية: 'nominal',
    فعلية: 'verbal',
    استئنافية: 'resumptive',
    تعجبية: 'exclamatory',
    شرطية: 'conditional',
    'جواب النفي': 'reply to negation',
    مقترنة: 'linked / annexed',
    منادى: 'vocative noun',
    مجرى: 'grammatically treated as…',
    عامل: 'governor (ʿāmil)',
    معمول: 'governed (maʿmūl)',
    'فعل تام': 'complete verb',
    'جملة صغرى': 'minor clause',
    'جملة كبرى': 'major clause',
  });

  function stripForKey(text) {
    var s = String(text == null ? '' : text);
    if (typeof global.stripHarakah === 'function') s = global.stripHarakah(s);
    else s = s.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '');
    s = s.replace(/\u0671/g, '\u0627');
    s = s.replace(/[\u0640\u200c\u200d]/g, '');
    return s.normalize('NFKC').trim();
  }

  /** Exact `TOKEN_EN` hit only (no phrase composition). */
  function glossLookupPlain(key) {
    if (!key) return '';
    if (TOKEN_EN[key]) return TOKEN_EN[key];
    var noAl = key.replace(/^\u0627\u0644/, '');
    if (noAl !== key && TOKEN_EN[noAl]) return TOKEN_EN[noAl];
    return '';
  }

  /**
   * One surface token: dictionary + optional و / ب / ل peel (madrasa connectors).
   * Used for phrase composition so long iʿrāb strings still get readable English.
   */
  function glossComposeOneToken(tok) {
    var g = glossLookupPlain(tok);
    if (g) return g;
    if (tok.length > 1) {
      var c0 = tok.charCodeAt(0);
      var rest = tok.slice(1);
      if (c0 === 0x0648) {
        var gw = glossLookupPlain(rest);
        if (gw) return 'and — ' + gw;
      }
      if (c0 === 0x0628) {
        var gb = glossLookupPlain(rest);
        if (gb) return 'by / attached to — ' + gb;
      }
      if (c0 === 0x0644 && rest.length > 1 && rest.charCodeAt(0) === 0x0644) {
        var gl = glossLookupPlain(rest.slice(1));
        if (gl) return 'for / belonging to — ' + gl;
      }
      if (c0 === 0x0644) {
        var gl2 = glossLookupPlain(rest);
        if (gl2) return 'for / to — ' + gl2;
      }
    }
    return '';
  }

  function glossForToken(surface) {
    var trimmed = String(surface || '').trim();
    if (!trimmed) return '';
    var core = trimmed.replace(/^([«»()\[\]"'.،؛:!؟]*)/, '');
    core = core.replace(/([«»()\[\]"'.،؛:!؟]*)$/, '');
    if (!core) return '';
    var key = stripForKey(core);
    if (!key) return '';
    var direct = glossLookupPlain(key);
    if (direct) return direct;
    if (/[\s\u00a0\u060c٫]+/.test(key)) {
      var pieces = key.split(/[\s\u00a0\u060c٫]+/).filter(Boolean);
      var parts = [];
      for (var pi = 0; pi < pieces.length; pi++) {
        var gc = glossComposeOneToken(pieces[pi]);
        if (gc) parts.push(gc);
      }
      if (parts.length) return parts.join(' · ');
    }
    return glossComposeOneToken(key);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(str) {
    return escapeHtml(String(str)).replace(/"/g, '&quot;');
  }

  /** Shown when `TOKEN_EN` has no entry (tooltip still appears for every word). */
  var IRAAB_TOOLTIP_FALLBACK_EN = 'No glossary entry yet.';

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

  /**
   * `.irab-term`: always set `data-def` (`TOKEN_EN` or fallback). Skips nodes that already have `data-def` (Scholar).
   */
  function injectIrabTermHoverGloss(html) {
    if (!html || typeof document === 'undefined') return html;
    try {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      var nodes = tpl.content.querySelectorAll('span.irab-term');
      for (var ni = 0; ni < nodes.length; ni++) {
        var node = nodes[ni];
        var existing = (node.getAttribute('data-def') || '').trim();
        if (existing) {
          node.removeAttribute('title');
          continue;
        }
        var inner = (node.textContent || '').trim();
        if (!inner) continue;
        var g = glossForToken(inner);
        var def = g || IRAAB_TOOLTIP_FALLBACK_EN;
        node.setAttribute('data-term', inner);
        node.setAttribute('data-roman', '');
        node.setAttribute('data-def', def);
      }
      return tpl.innerHTML;
    } catch (e) {
      return html;
    }
  }

  /** Plain Arabic string → HTML spans with hover gloss (verse gaps, etc.). */
  function wrapArabicPlainStringWithTooltips(text) {
    var raw = String(text || '');
    if (!raw.trim()) return '';
    var parts = raw.split(/(\s+)/);
    var out = '';
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        out += escapeHtml(part);
        continue;
      }
      if (!/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(part)) {
        out += escapeHtml(part);
        continue;
      }
      var g = glossForToken(part);
      var def = g || IRAAB_TOOLTIP_FALLBACK_EN;
      out +=
        '<span class="qg-iraab-tip qg-iraab-tip--word" lang="ar" dir="rtl" data-term="' +
        escAttr(part) +
        '" data-def="' +
        escAttr(def) +
        '">' +
        escapeHtml(part) +
        '</span>';
    }
    return out;
  }

  /**
   * Wrap loose text nodes (outside `.irab-term`) so every Arabic token is hoverable.
   */
  function wrapBareArabicWordsWithTooltips(html) {
    if (!html || typeof document === 'undefined') return html;
    try {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      var tw = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT, null);
      var buf = [];
      var n;
      while ((n = tw.nextNode())) buf.push(n);
      for (var bi = 0; bi < buf.length; bi++) {
        var textNode = buf[bi];
        var parent = textNode.parentNode;
        if (!parent || !textNode.nodeValue || !/\S/.test(textNode.nodeValue)) continue;
        if (parent.closest && parent.closest('.irab-term')) continue;
        if (parent.closest && parent.closest('button.quran-iraab__ayah-token')) continue;
        if (parent.closest && parent.closest('script, style')) continue;
        var frag = document.createDocumentFragment();
        var wrapped = wrapArabicPlainStringWithTooltips(textNode.nodeValue);
        if (!wrapped) continue;
        var tmp = document.createElement('template');
        tmp.innerHTML = wrapped;
        while (tmp.content.firstChild) frag.appendChild(tmp.content.firstChild);
        parent.replaceChild(frag, textNode);
      }
      return tpl.innerHTML;
    } catch (e2) {
      return html;
    }
  }

  /** Analysis HTML: coloured lemmas + every other Arabic word gets a tooltip line. */
  function enrichIraabAnalysisTooltips(html) {
    return wrapBareArabicWordsWithTooltips(injectIrabTermHoverGloss(html));
  }

  /** Floating `#qg-tooltip`: short show delay, fade, rAF positioning. */
  function wireQgIraabTooltip(rootEl) {
    var tip = document.getElementById('qg-tooltip');
    if (!tip || !rootEl || rootEl.dataset.qgIraabTipWired === '1') return;
    rootEl.dataset.qgIraabTipWired = '1';

    tip.removeAttribute('hidden');
    tip.setAttribute('aria-hidden', 'true');
    tip.classList.remove('qg-tooltip--visible');

    var lastSig = '';
    var showTimer = null;
    var hideTimer = null;
    var leaveHideTimer = null;
    var rafId = null;
    var pendingEv = null;
    var lastEv = null;

    function positionTip(e) {
      var pad = 15;
      var x = e.clientX + pad;
      var y = e.clientY + pad;
      tip.style.left = Math.min(x, Math.max(8, window.innerWidth - 292)) + 'px';
      tip.style.top = Math.min(y, Math.max(8, window.innerHeight - 120)) + 'px';
    }

    function schedulePos(e) {
      pendingEv = e;
      if (rafId != null) return;
      rafId = requestAnimationFrame(function () {
        rafId = null;
        if (pendingEv && tip.classList.contains('qg-tooltip--visible')) {
          positionTip(pendingEv);
        }
        pendingEv = null;
      });
    }

    function clearShowTimer() {
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
    }

    function hideTip(immediate) {
      clearShowTimer();
      if (hideTimer) clearTimeout(hideTimer);
      tip.classList.remove('qg-tooltip--visible');
      tip.setAttribute('aria-hidden', 'true');
      var delay = immediate ? 0 : 140;
      hideTimer = setTimeout(function () {
        tip.innerHTML = '';
        lastSig = '';
        hideTimer = null;
      }, delay);
    }

    function showContent(el, e) {
      var def = el.getAttribute('data-def') || '';
      if (!String(def).trim()) return;
      var term = el.getAttribute('data-term') || (el.textContent || '').trim();
      var roman = el.getAttribute('data-roman') || '';
      var seg = '';
      try {
        var p = el.closest('[data-segment]');
        seg = p ? p.getAttribute('data-segment') || '' : '';
      } catch (err) {
        seg = '';
      }
      var sig = term + '\x1e' + roman + '\x1e' + def + '\x1e' + seg;
      if (sig !== lastSig) {
        lastSig = sig;
        tip.innerHTML =
          (roman
            ? '<div class="qg-tooltip__roman" lang="en" dir="ltr">' + escapeHtml(roman) + '</div>'
            : '') +
          '<div class="qg-tooltip__def" lang="en" dir="ltr">' +
          escapeHtml(def) +
          '</div>';
      }
      tip.setAttribute('aria-hidden', 'false');
      tip.classList.add('qg-tooltip--visible');
      positionTip(e);
    }

    var TARGET_SEL =
      '.irab-term[data-def], .qg-iraab-tip[data-def], button.quran-iraab__ayah-token[data-def]';

    rootEl.addEventListener(
      'mousemove',
      function (e) {
        var el = e.target.closest(TARGET_SEL);
        if (!el || !rootEl.contains(el)) {
          clearShowTimer();
          if (!leaveHideTimer) {
            leaveHideTimer = setTimeout(function () {
              leaveHideTimer = null;
              hideTip(false);
            }, 90);
          }
          return;
        }
        if (leaveHideTimer) {
          clearTimeout(leaveHideTimer);
          leaveHideTimer = null;
        }
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
        lastEv = e;
        schedulePos(e);

        clearShowTimer();
        showTimer = setTimeout(function () {
          showTimer = null;
          if (!lastEv) return;
          var cur = lastEv.target.closest(TARGET_SEL);
          if (!cur || !rootEl.contains(cur)) return;
          showContent(cur, lastEv);
        }, 68);
      },
      { passive: true }
    );

    rootEl.addEventListener(
      'mouseleave',
      function () {
        if (leaveHideTimer) {
          clearTimeout(leaveHideTimer);
          leaveHideTimer = null;
        }
        hideTip(false);
        clearShowTimer();
      },
      true
    );

    rootEl.addEventListener(
      'scroll',
      function () {
        hideTip(true);
        clearShowTimer();
      },
      true
    );
  }

  global.IRAAB_TOOLTIP_FALLBACK_EN = IRAAB_TOOLTIP_FALLBACK_EN;
  global.iraabEnglishGlossForToken = glossForToken;
  global.injectIrabTermHoverGloss = injectIrabTermHoverGloss;
  global.wrapArabicPlainStringWithTooltips = wrapArabicPlainStringWithTooltips;
  global.enrichIraabAnalysisTooltips = enrichIraabAnalysisTooltips;
  global.wireQgIraabTooltip = wireQgIraabTooltip;
  global.formatIraabLineWithWordGlosses = formatIraabLineWithWordGlosses;
  global.formatIraabMixedColumnsChunked = formatIraabMixedColumnsChunked;
})(typeof window !== 'undefined' ? window : globalThis);
