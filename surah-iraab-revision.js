(function () {
  'use strict';

  var TAG_MAP = {
    verb: 'verb',
    noun: 'noun',
    part: 'part',
    pron: 'pron',
    case: 'case',
    mute: 'mute',
  };

  var DIGITS_EAST = '٠١٢٣٤٥٦٧٨٩';

  /** Mirrors generator `AR_TO_EN_TAG` + extras for common revision pills (tashkeel-stripped lookup). */
  var TAG_HINT_RAW = {
    'ظَرْفُ زَمَانٍ': 'adverb of time',
    'ظَرْفُ مَكَانٍ': 'adverb of place',
    'فِعْلٌ مَاضٍ': 'past verb',
    'فِعْلٌ مُضَارِعٌ': 'present verb',
    'فِعْلُ أَمْرٍ': 'imperative',
    'مَفْعُولٌ بِهٍ': 'object',
    'فَاعِلٌ': 'subject (fāʿil)',
    'مَجْرُورٌ': 'genitive',
    'مَجْرُورَةٌ': 'genitive (fem.)',
    'مَنْصُوبٌ': 'accusative',
    'مَنْصُوبَةٌ': 'accusative (fem.)',
    'مَرْفُوعٌ': 'nominative',
    'الْوَاوُ': 'wāw',
    'الْفَاءُ': 'fāʾ',
    'حَرْفُ جَرٍّ لِلْقَسْمِ': 'oath preposition',
    'مُقْسَمٌ بِهِ': 'object of oath',
    'ضَمِيرٌ مُتَّصِلٌ': 'attached pronoun',
    'جَارٌ وَمَجْرُورٌ': 'preposition + genitive',
    'جَارٌّ': 'preposition',
    'مُضَافٌ إِلَيْهِ': 'second term of iḍāfah',
    'حَرْفُ نَفْيٍ': 'negation particle',
    'حَرْفُ تَحْقِيقٍ': 'emphasis particle (qad)',
    'اسْمٌ مَوْصُولٌ': 'relative noun',
    'صِلَةُ الْمَوْصُولِ': 'relative clause',
    'مَعْطُوفٌ': 'coordinated term',
    'خَبَرٌ': 'predicate',
    'مُبْتَدَأٌ': 'topic (mubtadaʾ)',
    'إِنَّ وَأَخَوَاتُهَا': 'inna & sisters',
    'حَرْفُ تَوْكِيدٍ': 'emphasis particle',
    'واو قسم': 'wāw of oath',
    'واو عطف': 'coordinating wāw',
    'واو استئناف': 'resumptive wāw',
    'فاء استئناف': 'resumptive fāʾ',
    'فاء جواب شرط': 'fāʾ replying to condition',
    'فاء عطف': 'coordinating fāʾ',
    'ظرف زمان': 'adverb of time',
    'فعل مضارع': 'present verb',
    'فعل ماضٍ': 'past verb',
    'فعل أمر': 'imperative',
    'مفعول به': 'object',
    'مفعول به ثاني': 'second object',
    فاعل: 'subject (fāʿil)',
    'اسم إن': 'ism of inna',
    'خبر إن': 'khabar of inna',
    'حرف شرط وتفصيل': 'conditional particle',
    'جار ومجرور': 'prep. + genitive',
    'حرف جر': 'preposition',
    'حرف استقبال': 'future particle',
    'حرف حصر': 'restriction particle',
    'حرف نفي': 'negation particle',
    'نائب فاعل': 'passive subject',
    'مقسم به': 'object of oath',
    'صلة الموصول': 'relative clause',
    'ضمير متصل': 'attached pronoun',
    'لام التوكيد': 'emphatic lām',
    مبتدأ: 'topic (mubtadaʾ)',
    'خبر مقدم': 'fronted predicate',
    'حرف نصب توكيد مشبه بالفعل': 'emphasis particle (accus.)',
    'مُشَبَّهٌ بِالْفِعْلِ': 'particle resembling a verb',
    'حَرْفُ جَرٍّ': 'preposition',
    'حَرْفُ عَطْفٍ': 'coordinating particle',
    'مَبْنِيٌّ': 'indeclinable',
    'مَبْنِيّ': 'indeclinable',
    'عَلَى السُّكُونِ': 'fixed on sukūn',
    'عَلَى الْفَتْحِ': 'fixed on fatḥah',
    'عَلَى الضَّمِّ': 'fixed on ḍammah',
    'فِي مَحَلِّ نَصْبٍ': 'accusative slot',
    'فِي مَحَلِّ رَفْعٍ': 'nominative slot',
    'فِي مَحَلِّ جَرٍّ': 'genitive slot',
    'اسْمَ إِنَّ': 'ism of inna',
    'مُضَافٌ': 'first term of iḍāfah',
    'مُتَعَلِّقٌ': 'linked (dependent)',
    'مُتَعَلِّقَانِ': 'two linked dependents',
    'خَبَرُ إِنَّ': 'khabar of inna',
    'فِعْلٌ نَاقِصٌ': 'defective verb',
    'ٱسْمٌ': 'noun',
    'ٱسْمَ': 'noun (acc.)',
    'مَفْعُولٌ فِيهِ': 'adverbial object',
    'حَالٌ': 'circumstantial',
    'تَمْيِيزٌ': 'specifier',
    'نَكِرَةٌ': 'indefinite',
    'مَعْرِفَةٌ': 'definite',
    'بَدَلٌ': 'substitute (badal)',
    'تَوْكِيدٌ': 'emphasis',
    'عَطْفُ بَيَانٍ': 'explanatory coordination',
    'مُشْبِعٌ لِلْجَهْلِ': 'filling out unknown referent',
    'قَسْمٌ': 'oath segment',
    'جَوَابُ قَسْمٍ': 'reply to oath',
    'مُبْتَدَأٌ مَحْذُوفٌ': 'omitted topic',
    'جُمْلَةٌ ٱسْتِئْنَافِيَّةٌ': 'resumptive sentence',
    'لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ': 'no grammatical declension slot',
    'وَالْجُمْلَةُ الْفِعْلِيَّةُ': 'verbal clause',
    'وَالْجُمْلَةُ': 'clause',
    'وَالْجَارُّ وَالْمَجْرُورُ': 'preposition + genitive phrase',
    'ٱسْتِئْنَافِيَّةٌ': 'resumptive',
    'فِعْلٌ مُضَارِعٌ': 'present verb',
    'مَصْدَرٌ': 'verbal noun',
    'ظَرْفٌ': 'adverb',
    'حَرْفُ اسْتِفْهَامٍ': 'interrogative particle',
    'حَرْفُ شَرْطٍ': 'conditional particle',
    'جَوَابُ شَرْطٍ': 'reply to condition',
    'فِعْلُ ٱلْأَمْرِ': 'imperative',
    'مَفْعُولٌ مُطْلَقٌ': 'cognate object',
    'حَرْفُ نَصْبٍ': 'accusative particle',
    'حَرْفُ جَزْمٍ': 'jussive particle',
    'حَرْفُ نَفْيٍ وَجَازِمٌ': 'negating jussive particle',
    'مَعْطُوفٌ بِالْوَاوِ': 'coordinated with wāw',
    'مَعْطُوفٌ بِالْفَاءِ': 'coordinated with fāʾ',
    'صِفَةٌ': 'adjective',
    'حَالٌ مَحْذُوفَةٌ': 'omitted circumstantial',
    'مَحْذُوفٌ': 'omitted',
    'مَحْذُوفَةٌ': 'omitted (fem.)',
    'تَفْسِيرِيَّةٌ': 'explanatory',
    'فِعْلُ ٱلْقَسَمِ': 'verb of oath',
    'خَبَرُ كَانَ': 'khabar of kāna',
    'اسْمُ كَانَ': 'ism of kāna',
    'خَبَرُ إِنَّ': 'khabar of inna',
    'يَاءُ ٱلْمُخَاطَبَةِ': 'yā of address',
    'وَاوُ ٱلْجَمَاعَةِ': 'plural wāw',
    'أَلِفُ ٱلْإِثْنَيْنِ': 'dual alif',
    'عَلَىٰ ٱلْمَجْهُولِ': 'passive pattern',
    'مُبْهَمٌ': 'unknown referent',
    'تَفْسِيرُ ٱلْمُبْهَمِ': 'explaining the unknown',
    'بِإِضَافَةٍ': 'by annexation',
    'فِعْلُ ٱلشَّرْطِ': 'verb of condition',
    'جَوَابُ ٱلشَّرْطِ': 'reply to condition',
    'فِعْلُ ٱلنَّدَاءِ': 'verb of vocative',
    'مُنَادًى': 'vocative',
    'حَرْفُ نِدَاءٍ': 'vocative particle',
    'سِلَةٌ': 'relative clause',
    'صِلَةُ ٱلْمَوْصُولِ': 'relative clause',
    'فَاعِلٌ مَرْفُوعٌ': 'raised subject',
    'فَاعِلٌ مَجْرُورٌ': 'subject in genitive context',
    'مُبْتَدَأٌ مَرْفُوعٌ': 'raised topic',
    'خَبَرٌ مَرْفُوعٌ': 'raised predicate',
    'حَرْفُ عَطْفٍ نَاصِبٍ': 'coordinating accusative particle',
    'فِعْلٌ تَامٌّ': 'complete verb',
    'فِعْلٌ نَاقِصٌ تَامٌّ': 'complete defective verb',
    'حَرْفُ تَعْلِيلٍ': 'particle of purpose',
    'حَرْفُ رَفْعٍ': 'nominative particle',
    'حَرْفُ نَصْبٍ أَوْ جَزْمٍ': 'particle of naṣb or jazm',
    'حَرْفُ عَطْفٍ غَيْرُ نَاصِبٍ': 'non-accusative coordinator',

    // Short-surah revision pills (generator / vocalized tags) — tashkīl-insensitive lookup
    أن: 'that / to (particle ann / an)',
    'أن المصدرية': 'masdar particle an (“to …”)',
    إن: 'truly / if / conditional particle (context)',
    'اسم أن': 'noun governed by anna',
    'اسم إشارة': 'pointing noun (demonstrative)',
    'اسم استفهام': 'question word (interrogative noun)',
    'اسم ليس': 'noun after laysa',
    'اسم مجرور': 'noun in the genitive',
    'اسم يكون': 'noun after kāna / yakūn (its predicate)',
    الباء: 'letter bāʾ (particle)',
    'الضمة الظاهرة': 'visible ḍammah (u vowel on the last letter)',
    الكاف: 'letter kāf (particle)',
    الكسرة: 'kasrah (i vowel)',
    'الكسرة الظاهرة': 'visible kasrah',
    اللّام: 'letter lām (particle)',
    اللام: 'letter lām (particle)',
    'المصدر المؤول': 'interpreted masdar (whole clause used like a noun)',
    'الممنوع من الصرف': 'diptote (restricted noun endings)',
    الهمزة: 'hamzah (letter)',
    'الواو عاطفة': 'coordinating wāw (“and”)',
    ب: 'with / by (bi-)',
    بأنزلناه: 'governed by “anzalnāhu” in context',
    بالإضافة: 'by annexation (iḍāfah)',
    بالفتحة: 'with fatḥah',
    باللام: 'with lām',
    بالياء: 'with yāʾ',
    بتنزل: 'attached to “tunazzil” in context',
    'بحال محذوفة': 'with an omitted ḥāl (circumstance)',
    بحتى: 'governed by ḥattá',
    بخلقنا: 'object of “khalaqnā”',
    بمن: 'governed by man',
    بيكذبك: 'object of “yukadhdhibuka”',
    تقديره: 'understood as / estimated as',
    'تقديره: هو': 'understood as “huwa”',
    تكون: 'yakūn — incomplete verb “to be”',
    ثان: 'second (second object, etc.)',
    'ثبوت النون': 'keeping the nūn (five verbs)',
    'جمع المؤنث السالم': 'regular feminine plural',
    'جمع المذكر السالم': 'sound masculine plural',
    'جملة استئنافية': 'fresh-start sentence',
    'جواب القسم': 'answer to the oath',
    جوازا: 'optionally / as allowed',
    'حرف استئناف': 'resumption particle',
    'حرف استثناء': 'exception particle',
    'حرف توكيد مشبه بالفعل': 'emphasis particle like a verb',
    'حرف جواب شرط': 'particle replying to the condition',
    'حرف ردع وزجر': 'reproach particle',
    'حرف شرط جازم': 'conditional particle that causes jazm',
    'حرف نصب وتوكيد مشبه بالفعل': 'accusative emphatic particle',
    'حرف نفي وجزم': 'negation + jussive particle',
    'حرف نفي وجزم وقلب': 'negation + jussive + “heart” idioms (mā)',
    'حرف نهي وجزم': 'prohibition + jussive particle',
    'حروف الشرط': 'conditional particles',
    'خبر المبتدأ': 'predicate of the topic',
    'خبر ليس': 'predicate after laysa',
    'خبر مبتدأ محذوف': 'predicate of an omitted topic',
    زمان: 'time',
    'شبه جملة في محل رفع': 'phrase acting as nominative',
    صلة: 'relative clause link (ṣilah)',
    'ضمير رفع منفصل': 'detached nominative pronoun',
    'ضمير مبني': 'indeclinable pronoun',
    'ضمير مستتر': 'implicit pronoun',
    'ضمير منفصل': 'detached pronoun',
    على: 'on / upon',
    'على آخره': 'on its last letter',
    'على الفتحة المقدرة على الألف': 'estimated fatḥah on alif (not written)',
    'على الكسر': 'on kasrah',
    'عن الإضافة': 'due to annexation',
    'فعل ماض للمجهول': 'past verb — passive',
    'فعل ماض مجهول': 'past verb — passive',
    'فعل ماض ناقص': 'past incomplete verb',
    'فعل مضارع للمجهول': 'present verb — passive',
    'فعل مضارع ناقص': 'present incomplete verb',
    في: 'in',
    فيه: 'in it',
    'فيه الجواز': 'optional reading inside it',
    'كان وأخواتها': 'kāna and its sisters',
    'لاتصاله بضمير رفع متحرك': 'because it is tied to a moved nominative pronoun',
    'لام الأمر': 'lām of command',
    للجماعة: 'for the plural / group',
    'للفعل «أدرى»': 'for the verb “adrā”',
    'للمبتدأ «ليلة ٱلقدر»': 'predicate for topic “laylat al-qadr”',
    'للمبتدأ «ما»': 'predicate for topic “mā”',
    لم: 'lam (past negation)',
    مؤخر: 'delayed / postponed',
    ما: 'what / not / relative (context)',
    'مبني للمجهول': 'passive verb pattern',
    'متعلقان بخبر مقدم': 'two dependents on a fronted predicate',
    'مجرور لفظا': 'genitive in wording',
    مجزوم: 'jussive',
    مستثنى: 'excepted term',
    مضارع: 'present tense verb',
    معطوفة: 'coordinated (f.) phrase',
    'مفعول به ثان': 'second object',
    مقدم: 'fronted',
    مكان: 'place',
    'ممنوع من الصرف': 'diptote',
    من: 'from / who / whom',
    'من اسم الإشارة': 'from the demonstrative',
    'من ٱلملائكة': 'from “the angels” phrase',
    'منصوب محلا': 'accusative in effect / syntactic slot',
    'نائب الفاعل': 'passive subject',
    نافية: 'negating',
    نصب: 'accusative (naṣb)',
    نعت: 'adjective / qualifier',
    'نون التوكيد الثقيلة': 'heavy emphatic nūn',
    'هاء الغائب': 'hāʾ of the absent (he/his)',
    'همزة الاستفهام': 'hamzah of questioning',
    'و«الكاف»': 'and “the kāf”',
    'و«الهاء»': 'and “the hāʾ”',
    'و«ما»': 'and “mā”',
    'و«نا»': 'and “nā”',
    'واقعة في جواب القسم': 'occurring in the oath reply',
    والفاعل: 'and the subject',
    'وعلامة جره': 'sign of genitive:',
    'وعلامة رفعه': 'sign of nominative:',
    ومضاف: 'and first term of iḍāfah',
    'ومنع من ظهورها التعذر': 'hidden vowel — awkward to write',
    وهو: 'and it / he',
    وٱلجملة: 'and the clause',
    'وٱلجملة الإسمية': 'and the nominal sentence',
    'وٱلجملة الفعلية': 'and the verbal sentence',
    وٱلمضاف: 'and the muḍāf',
    يا: 'yā (vocative “O …”)',
    'يعود على «ما»': 'refers back to “mā”',
    'ٱسم مجرور': 'noun in genitive',
    ٱلظاهرة: 'visible / apparent',
    ٱلكسرة: 'kasrah',
  };

  function stripTashkeel(s) {
    return String(s).replace(/[\u064B-\u065F\u0670\u0640]/g, '');
  }

  function normalizeTagKey(s) {
    return stripTashkeel(String(s))
      .replace(/\u0640/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  var TAG_HINT_LOOKUP = (function () {
    var out = {};
    Object.keys(TAG_HINT_RAW).forEach(function (k) {
      out[normalizeTagKey(k)] = TAG_HINT_RAW[k];
    });
    return out;
  })();

  function englishHintForTag(ar) {
    var k = normalizeTagKey(ar);
    return TAG_HINT_LOOKUP[k] || '';
  }

  /** Standalone بِسْمِ ٱللَّهِ… chunk (merged first āyah in many short surahs). */
  function isBismillahChunk(word) {
    var n = normalizeTagKey(word).replace(/\s/g, '').replace(/ٱ/g, '').replace(/ٰ/g, '');
    return /^بسمالله/.test(n) && /الرحمن/.test(n) && /الرحيم/.test(n);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(String(s)).replace(/"/g, '&quot;');
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Table/sheet layout already shows tagsAr as coloured pills; detailAr often repeats the same
   * headline after ﴿…﴾: (e.g. ظَرْفُ زَمَانٍ). Remove that redundant prose only here — not in mushaf flow.
   * Skips ﴾: TAG: … (e.g. الْوَاوُ: حَرْفُ …) via (?!\\s*:).
   */
  function stripRevisionDetailDupTagsForSheet(detailRaw, tagsAr) {
    var original = String(detailRaw || '').trim();
    if (!original || !tagsAr || !tagsAr.length) return original;
    var tags = tagsAr
      .map(function (t) {
        return String(t || '').trim();
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return b.length - a.length;
      });
    if (!tags.length) return original;

    var d = original;
    var prev;
    do {
      prev = d;
      for (var i = 0; i < tags.length; i++) {
        var esc = escapeRegExp(tags[i]);
        d = d
          .replace(
            new RegExp(
              '(\\uFD3F[^\\uFD3F\\uFD3E]*\\uFD3E\\s*[:：]\\s*)' + esc + '(?!\\s*:)(\\s*[،,]?\\s*)',
              'g'
            ),
            '$1'
          )
          .trim();
        d = d.replace(new RegExp('^\\s*' + esc + '\\s*[،,]\\s*'), '').trim();
        d = d.replace(new RegExp('^\\s*' + esc + '(?!\\s*:)(?=\\s+\\S)\\s+'), '').trim();
      }
      d = d.replace(/\s+/g, ' ').replace(/\s*،\s*،+/g, '، ').replace(/^،\s*/, '').trim();
    } while (d !== prev);

    return d || original;
  }

  /** English for tag pills: JSON/tagsEn → TAG_HINT → `TOKEN_EN` (`iraab-word-gloss-en.js`). */
  function tagHoverGloss(ar, explicitEn) {
    var g = explicitEn != null && String(explicitEn).trim() ? String(explicitEn).trim() : '';
    if (!g) g = englishHintForTag(ar);
    if (!g && typeof window.iraabEnglishGlossForToken === 'function') {
      g = window.iraabEnglishGlossForToken(ar) || '';
    }
    return g;
  }

  var LS_FONT_STEP = 'surahRevFontStep';

  function readFontStep() {
    var raw = localStorage.getItem(LS_FONT_STEP);
    var step = raw == null ? 0 : parseInt(raw, 10);
    if (!Number.isFinite(step)) step = 0;
    return Math.max(-8, Math.min(14, step));
  }

  function fontMulFromStep(step) {
    return Math.round(1000 * Math.pow(1.06, step)) / 1000;
  }

  function applyRevFontMul() {
    var el = document.querySelector('.surah-rev-page');
    if (!el) return;
    el.style.setProperty('--rev-fs-mul', String(fontMulFromStep(readFontStep())));
  }

  function bumpFontStep(delta) {
    var n = readFontStep() + delta;
    n = Math.max(-8, Math.min(14, n));
    localStorage.setItem(LS_FONT_STEP, String(n));
    applyRevFontMul();
  }

  function renderFontToolsHtml() {
    return (
      '<div class="surah-rev-font-tools" role="group" aria-label="Text size">' +
      '<span class="surah-rev-font-tools__label">Size</span>' +
      '<button type="button" class="surah-rev-font-tools__btn" data-rev-font-delta="-1" aria-label="Smaller text">A−</button>' +
      '<button type="button" class="surah-rev-font-tools__btn" data-rev-font-reset="1" aria-label="Reset text size">Reset</button>' +
      '<button type="button" class="surah-rev-font-tools__btn" data-rev-font-delta="1" aria-label="Larger text">A+</button>' +
      '</div>'
    );
  }

  /** Align revision tokens to Quran.com WBW (tashkīl-insensitive). */
  function normalizeWordMatchKey(str) {
    var t = stripTashkeel(String(str == null ? '' : str));
    try {
      t = t.normalize('NFKC');
    } catch (e) {
      /* ignore */
    }
    t = t.replace(/\u0671/g, '\u0627');
    t = t.replace(/[\u06e5\u06e6]/g, '');
    t = t.replace(/\u0649/g, '\u064a');
    return t.replace(/[\u200c\u200d\u0640\s\u00a0]/g, '').trim();
  }

  function cleanWbwEn(raw) {
    var s = raw == null ? '' : String(raw);
    if (typeof stripQuranTranslationHtml === 'function') s = stripQuranTranslationHtml(s);
    else s = s.replace(/<[^>]+>/g, '');
    return s.replace(/\s+/g, ' ').trim();
  }

  function wbwGlossesForPhrase(phrase, words, startIdx) {
    if (!words || !words.length) return { gloss: '', next: startIdx };
    var tokens = String(phrase).trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return { gloss: '', next: startIdx };
    var glossParts = [];
    var i = startIdx;
    for (var t = 0; t < tokens.length; t++) {
      var tk = normalizeWordMatchKey(tokens[t]);
      if (!tk) continue;
      var matched = false;
      for (var j = i; j < words.length; j++) {
        var wk = normalizeWordMatchKey(words[j].ar);
        if (wk === tk) {
          var en = cleanWbwEn(words[j].en);
          if (en) glossParts.push(en);
          i = j + 1;
          matched = true;
          break;
        }
      }
      if (!matched) break;
    }
    return { gloss: glossParts.join(' · '), next: i };
  }

  function makePartGlossState(wbwMap, surahNum, ayahNum) {
    if (surahNum == null || !wbwMap || typeof wbwMap.get !== 'function') {
      return { words: null, wi: 0 };
    }
    var key = surahNum + ':' + ayahNum;
    var pack = wbwMap.get(key);
    return {
      words: pack && pack.words ? pack.words : null,
      wi: 0,
    };
  }

  function partPhraseGloss(p, state) {
    if (p.glossEn != null && String(p.glossEn).trim()) return String(p.glossEn).trim();
    if (!state || !state.words || !state.words.length) return '';
    var res = wbwGlossesForPhrase(p.word, state.words, state.wi);
    state.wi = res.next;
    return res.gloss;
  }

  function renderVerseTextHtml(a, surahNum, wbwMap) {
    if (surahNum == null || !wbwMap || typeof wbwMap.get !== 'function') {
      return escapeHtml(ayahArabicLine(a));
    }
    var key = surahNum + ':' + a.num;
    var pack = wbwMap.get(key);
    if (pack && pack.words && pack.words.length) {
      var wbwFb =
        (typeof window.IRAAB_TOOLTIP_FALLBACK_EN === 'string' && window.IRAAB_TOOLTIP_FALLBACK_EN.trim()) ||
        'No glossary entry yet.';
      return pack.words
        .map(function (w) {
          var en = cleanWbwEn(w.en);
          var tipDef = en;
          if (!tipDef && typeof window.iraabEnglishGlossForToken === 'function') {
            tipDef = window.iraabEnglishGlossForToken(w.ar) || '';
          }
          if (!tipDef) tipDef = wbwFb;
          var cls = 'surah-rev-sheet__ayah-word qg-iraab-tip';
          var attrs =
            ' lang="ar" dir="rtl" data-term="' +
            escapeAttr(w.ar) +
            '" data-def="' +
            escapeAttr(tipDef) +
            '"';
          return '<span class="' + cls + '"' + attrs + '>' + escapeHtml(w.ar) + '</span>';
        })
        .join(' ');
    }
    return escapeHtml(ayahArabicLine(a));
  }

  function easternAyahNum(n) {
    return String(n).replace(/\d/g, function (d) {
      return DIGITS_EAST[+d];
    });
  }

  function tagClass(color) {
    var key = TAG_MAP[color] || 'mute';
    return 'surah-rev__tag surah-rev__tag--' + key;
  }

  /** وَاو / فاء type pills use particle styling even when segment colour is verb/noun. */
  function tagClassForToken(color, label) {
    var s = String(label);
    if (/^(واو|فاء)(\s|$)/.test(normalizeTagKey(s))) return tagClass('part');
    return tagClass(color);
  }

  /** Arabic tag pills for one phrase (shared by mushaf chunks and table layout). */
  function renderTagSpansForPart(p) {
    var tagsAr = p.tagsAr || [];
    var tagsEn = Array.isArray(p.tagsEn) ? p.tagsEn : [];
    var tags = tagsAr
      .map(function (t, i) {
        var gloss = tagHoverGloss(t, tagsEn[i]);
        if (!String(gloss || '').trim()) {
          gloss =
            (typeof window.IRAAB_TOOLTIP_FALLBACK_EN === 'string' && window.IRAAB_TOOLTIP_FALLBACK_EN.trim()) ||
            'No glossary entry yet.';
        }
        var tip =
          ' data-term="' +
          escapeAttr(t) +
          '" data-def="' +
          escapeAttr(gloss) +
          '"';
        return (
          '<span class="' +
          tagClassForToken(p.color, t) +
          ' qg-iraab-tip" lang="ar" dir="rtl"' +
          tip +
          '>' +
          escapeHtml(t) +
          '</span>'
        );
      })
      .join('');
    if (!tags) {
      tags =
        '<span class="' +
        tagClass('mute') +
        '" lang="ar" dir="rtl">' +
        escapeHtml('…') +
        '</span>';
    }
    return { tagsHtml: tags, tagsAr: tagsAr, tagsEn: tagsEn };
  }

  function ayahArabicLine(a) {
    var s = a && a.arabic != null ? String(a.arabic).trim() : '';
    if (s) return s;
    var parts = (a && a.parts) || [];
    return parts
      .map(function (p) {
        return p.word;
      })
      .join(' ');
  }

  function renderSheetAnalysisCell(parts, state) {
    var items = (parts || []).map(function (p) {
      var span = renderTagSpansForPart(p);
      var tagsEn = span.tagsEn;
      var tagsAr = span.tagsAr;
      var enRow = '';
      if (tagsEn.length && tagsEn.length === tagsAr.length) {
        enRow =
          '<span class="surah-rev__tags-en surah-rev-sheet__tags-en" lang="en" dir="ltr">' +
          tagsEn
            .map(function (en) {
              return '<span class="surah-rev__tag-en">' + escapeHtml(String(en || '').trim() || '—') + '</span>';
            })
            .join('') +
          '</span>';
      }
      var detailRaw = p.detailAr != null ? String(p.detailAr).trim() : '';
      var detailForSheet = stripRevisionDetailDupTagsForSheet(detailRaw, tagsAr);
      var detailInner = '';
      if (detailForSheet) {
        if (typeof window.colorizeIraabClasses === 'function') {
          detailInner = window.colorizeIraabClasses(detailForSheet);
          if (typeof window.enrichIraabAnalysisTooltips === 'function') {
            detailInner = window.enrichIraabAnalysisTooltips(detailInner);
          }
        } else if (typeof window.wrapArabicPlainStringWithTooltips === 'function') {
          detailInner = window.wrapArabicPlainStringWithTooltips(detailForSheet);
        } else {
          detailInner = escapeHtml(detailForSheet);
        }
      }
      var detailHtml = detailForSheet
        ? ' <span class="surah-rev-sheet__detail surah-rev-sheet__detail--iraab" lang="ar" dir="rtl">' +
          detailInner +
          '</span>'
        : '';
      var glossLine = partPhraseGloss(p, state);
      var lemmaFb =
        (typeof window.IRAAB_TOOLTIP_FALLBACK_EN === 'string' && window.IRAAB_TOOLTIP_FALLBACK_EN.trim()) ||
        'No glossary entry yet.';
      var lemmaTipText = glossLine ? glossLine : lemmaFb;
      var lemmaCls = 'surah-rev-sheet__lemma qg-iraab-tip';
      var lemmaAttrs =
        ' lang="ar" dir="rtl" data-term="' +
        escapeAttr(p.word) +
        '" data-def="' +
        escapeAttr(lemmaTipText) +
        '"';
      return (
        '<li class="surah-rev-sheet__analysis-item">' +
        '<span class="' +
        lemmaCls +
        '"' +
        lemmaAttrs +
        '>' +
        escapeHtml(p.word) +
        '</span> ' +
        '<span class="surah-rev-sheet__tags">' +
        span.tagsHtml +
        '</span>' +
        detailHtml +
        enRow +
        '</li>'
      );
    });
    return '<ul class="surah-rev-sheet__analysis-list">' + items.join('') + '</ul>';
  }

  function renderInfographicBlock(url, titleAr) {
    var alt = titleAr ? 'إعراب ' + titleAr + ' — ورقة مرجعية' : 'ورقة إعراب مرجعية';
    return (
      '<figure class="surah-rev-infographic">' +
      '<img class="surah-rev-infographic__img" src="' +
      escapeHtml(url) +
      '" alt="' +
      escapeHtml(alt) +
      '" loading="lazy" decoding="async" />' +
      '<figcaption class="surah-rev-infographic__cap" lang="ar" dir="rtl">مرجع بصري؛ نفس التسميات التفاعلية أدناه.</figcaption>' +
      '</figure>'
    );
  }

  function renderSheetTable(titleAr, ayat, surahNum, wbwMap) {
    var banner =
      '<div class="surah-rev-sheet__banner">' +
      '<div class="surah-rev-sheet__banner-title" lang="ar" dir="rtl">إعراب ' +
      escapeHtml(titleAr || '') +
      '</div>' +
      '<div class="surah-rev-sheet__banner-basmala" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>' +
      '</div>';
    var thead =
      '<thead><tr>' +
      '<th scope="col" class="surah-rev-sheet__th surah-rev-sheet__th--num" lang="ar" dir="rtl">رقم الآية</th>' +
      '<th scope="col" class="surah-rev-sheet__th surah-rev-sheet__th--text" lang="ar" dir="rtl">نص الآية</th>' +
      '<th scope="col" class="surah-rev-sheet__th surah-rev-sheet__th--irab" lang="ar" dir="rtl">الإعراب المفصل</th>' +
      '</tr></thead>';
    var rows = ayat
      .map(function (a) {
        var st =
          surahNum && wbwMap ? makePartGlossState(wbwMap, surahNum, a.num) : null;
        var verseInner =
          '<span class="surah-rev-sheet__ayah-bracket" aria-hidden="true">﴿</span>' +
          renderVerseTextHtml(a, surahNum, wbwMap) +
          '<span class="surah-rev-sheet__ayah-bracket" aria-hidden="true">﴾</span>';
        return (
          '<tr id="ayah-' +
          a.num +
          '">' +
          '<td class="surah-rev-sheet__td surah-rev-sheet__td--num" lang="ar" dir="rtl">' +
          easternAyahNum(a.num) +
          '</td>' +
          '<td class="surah-rev-sheet__td surah-rev-sheet__td--text" lang="ar" dir="rtl">' +
          verseInner +
          '</td>' +
          '<td class="surah-rev-sheet__td surah-rev-sheet__td--irab">' +
          renderSheetAnalysisCell(a.parts, st) +
          '</td></tr>'
        );
      })
      .join('');
    var note =
      '<p class="surah-rev-sheet__note" lang="ar" dir="rtl"><span class="surah-rev-sheet__note-icon" aria-hidden="true">💡</span> ملاحظة: الجمل الابتدائية والاستئنافية لا محل لها من الإعراب.</p>';
    return (
      '<div class="surah-rev-sheet-wrap" dir="rtl">' +
      banner +
      '<div class="surah-rev-sheet-scroll">' +
      '<table class="surah-rev-sheet">' +
      thead +
      '<tbody>' +
      rows +
      '</tbody></table></div>' +
      note +
      '</div>'
    );
  }

  function renderChunk(p, phraseGloss) {
    var span = renderTagSpansForPart(p);
    var tags = span.tagsHtml;
    var tagsAr = span.tagsAr;
    var tagsEn = span.tagsEn;
    var enRow = '';
    if (tagsEn.length && tagsEn.length === tagsAr.length) {
      enRow =
        '<span class="surah-rev__tags-en" lang="en" dir="ltr">' +
        tagsEn
          .map(function (en) {
            return (
              '<span class="surah-rev__tag-en">' + escapeHtml(String(en || '').trim() || '—') + '</span>'
            );
          })
          .join('') +
        '</span>';
    }
    var chunkClass = 'surah-rev__chunk';
    if (isBismillahChunk(p.word)) chunkClass += ' surah-rev__chunk--bismillah';
    var flowFb =
      (typeof window.IRAAB_TOOLTIP_FALLBACK_EN === 'string' && window.IRAAB_TOOLTIP_FALLBACK_EN.trim()) ||
      'No glossary entry yet.';
    var flowTipText = phraseGloss ? phraseGloss : flowFb;
    var flowCls = 'surah-rev__word-flow qg-iraab-tip';
    var flowAttrs =
      ' lang="ar" dir="rtl" data-term="' +
      escapeAttr(p.word) +
      '" data-def="' +
      escapeAttr(flowTipText) +
      '"';
    return (
      '<span class="' +
      chunkClass +
      '">' +
      '<span class="surah-rev__tags-above" aria-hidden="true">' +
      tags +
      '</span>' +
      enRow +
      '<span class="' +
      flowCls +
      '"' +
      flowAttrs +
      '>' +
      escapeHtml(p.word) +
      '</span></span>'
    );
  }

  function renderAyah(a, wbwCtx) {
    var state =
      wbwCtx && wbwCtx.wbwMap && wbwCtx.surahNum
        ? makePartGlossState(wbwCtx.wbwMap, wbwCtx.surahNum, a.num)
        : null;
    var parts = a.parts || [];
    var chunks = parts
      .map(function (p) {
        return renderChunk(p, partPhraseGloss(p, state));
      })
      .join('');
    return (
      '<section class="surah-rev__ayah" id="ayah-' +
      a.num +
      '" aria-label="Āyah ' +
      a.num +
      '">' +
      '<div class="surah-rev__ayah-inner" dir="rtl">' +
      '<div class="surah-rev__flow">' +
      chunks +
      '</div>' +
      '<span class="surah-rev__ayah-badge" title="Āyah ' +
      a.num +
      '">' +
      '<span class="surah-rev__ayah-badge-ar" lang="ar" dir="ltr">' +
      easternAyahNum(a.num) +
      '</span>' +
      '<span class="surah-rev__ayah-badge-en" aria-hidden="true">' +
      escapeHtml(String(a.num)) +
      '</span>' +
      '</span></div></section>'
    );
  }

  function renderPicker(manifest) {
    var items = (manifest.surahs || [])
      .map(function (s) {
        var href = 'surah-iraab-revision.html?file=' + encodeURIComponent(s.revisionUrl);
        return (
          '<li><a class="surah-rev-picker__link" href="' +
          escapeHtml(href) +
          '">' +
          '<span><span class="surah-rev-picker__name">' +
          escapeHtml(s.titleEn) +
          '</span> · <span class="surah-rev-picker__name-ar" lang="ar" dir="rtl">' +
          escapeHtml(s.titleAr) +
          '</span></span>' +
          '<span class="surah-rev-picker__meta">' +
          escapeHtml(String(s.num)) +
          ' · ' +
          s.ayahCount +
          ' āyāt</span></a></li>'
        );
      })
      .join('');
    return (
      '<div class="surah-rev-page__head">' +
      '<p class="surah-rev-page__kicker">Arabic grammatical labels</p>' +
      '<h1 class="surah-rev-page__title">Full-surah revision</h1>' +
      '<p class="surah-rev-page__sub">Whole surah on one page — mushaf-style frame; Arabic labels above each phrase (hover pills for grammar hints). Open a surah for Quran.com word gloss on phrases (needs network). Use Size controls to adjust text.</p>' +
      '<div class="surah-rev-page__links"><a href="quran-iraab.html">Qurʾān Iʿrāb</a></div>' +
      renderFontToolsHtml() +
      '</div>' +
      '<ul class="surah-rev-picker" aria-label="Surahs">' +
      items +
      '</ul>'
    );
  }

  function setChrome(meta) {
    var titleEl = document.getElementById('rev-title');
    var titleArEl = document.getElementById('rev-title-ar');
    var subEl = document.getElementById('rev-sub');
    if (titleEl && meta.titleEn) titleEl.textContent = meta.titleEn;
    if (titleArEl && meta.titleAr) titleArEl.textContent = meta.titleAr;
    if (subEl && meta.ayahCount != null) {
      var layoutLabel =
        meta.layout === 'table'
          ? 'Three-column table · same tag pills as mushaf view'
          : 'Mushaf-style layout · Arabic tags (English hints on hover)';
      var glossNote =
        meta.num != null ? ' · Hover Arabic for Saheeh word gloss (Quran.com).' : '';
      subEl.textContent = meta.ayahCount + ' āyāt · ' + layoutLabel + glossNote;
    }
    if (meta.titleEn && meta.titleAr) {
      document.title = meta.titleEn + ' — revision — Arabic Grammar';
    }
  }

  function fail(msg) {
    var mount = document.getElementById('rev-mount');
    if (mount) {
      mount.innerHTML =
        '<p style="padding:1rem;color:#b91c1c;font-family:var(--font-latin);">' + escapeHtml(msg) + '</p>';
    }
  }

  function wrapMushafSheet(titleAr, ayahHtml) {
    var bar =
      '<div class="surah-rev-mushaf__titlebar" role="presentation">' +
      '<span class="surah-rev-mushaf__title-ar" lang="ar" dir="rtl">' +
      escapeHtml(titleAr || '') +
      '</span></div>';
    return (
      '<div class="surah-rev-mushaf">' +
      '<div class="surah-rev-mushaf__frame">' +
      bar +
      '<div class="surah-rev-mushaf__sheet">' +
      ayahHtml +
      '</div></div></div>'
    );
  }

  window.quranSurahRevisionEmbed = {
    buildBodyHtml: function (layout, ayat, meta, wbwMap) {
      var titleAr = meta && meta.titleAr ? meta.titleAr : '';
      var surahNum = meta && meta.num != null ? meta.num : null;
      var infographicHtml =
        meta && meta.revisionInfographicUrl
          ? renderInfographicBlock(meta.revisionInfographicUrl, titleAr)
          : '';
      var wbwCtx = { wbwMap: wbwMap, surahNum: surahNum };
      var sheet =
        layout === 'table'
          ? renderSheetTable(titleAr, ayat, surahNum, wbwMap)
          : wrapMushafSheet(
              titleAr,
              ayat
                .map(function (a) {
                  return renderAyah(a, wbwCtx);
                })
                .join('')
            );
      return infographicHtml + sheet;
    },
    renderFontToolsHtml: renderFontToolsHtml,
    applyFontMul: applyRevFontMul,
  };

  function bindRevFontToolsDelegated() {
    if (document.documentElement.dataset.revFontToolsDelegated === '1') return;
    document.documentElement.dataset.revFontToolsDelegated = '1';
    document.body.addEventListener('click', function (e) {
      var resetBtn = e.target.closest('[data-rev-font-reset]');
      if (resetBtn) {
        e.preventDefault();
        localStorage.removeItem(LS_FONT_STEP);
        applyRevFontMul();
        return;
      }
      var btn = e.target.closest('[data-rev-font-delta]');
      if (!btn) return;
      e.preventDefault();
      var d = parseInt(btn.getAttribute('data-rev-font-delta'), 10);
      if (!Number.isFinite(d)) return;
      bumpFontStep(d);
    });
  }

  bindRevFontToolsDelegated();

  var params = new URLSearchParams(window.location.search || '');
  var file = params.get('file');
  var layout = (params.get('layout') || 'mushaf').toLowerCase();
  var mount = document.getElementById('rev-mount');

  if (!file) {
    fetch('surah-walkthrough-manifest.json')
      .then(function (r) {
        if (!r.ok) throw new Error('manifest');
        return r.json();
      })
      .then(function (manifest) {
        if (mount) mount.innerHTML = renderPicker(manifest);
        applyRevFontMul();
      })
      .catch(function () {
        fail('Could not load surah-walkthrough-manifest.json.');
      });
    return;
  }

  Promise.all([
    fetch(file).then(function (r) {
      if (!r.ok) throw new Error('data');
      return r.json();
    }),
    fetch('surah-walkthrough-manifest.json').then(function (r) {
      return r.ok ? r.json() : { surahs: [] };
    }),
  ])
    .then(function (pair) {
      var ayat = pair[0];
      var manifest = pair[1];
      var meta = (manifest.surahs || []).find(function (s) {
        return s.revisionUrl === file;
      });
      if (!Array.isArray(ayat) || !ayat.length) throw new Error('empty');
      var wbwP =
        meta && meta.num != null && typeof fetchQuranChapterWbw === 'function'
          ? fetchQuranChapterWbw(meta.num).catch(function () {
              return null;
            })
          : Promise.resolve(null);
      return wbwP.then(function (wbwMap) {
        return { ayat: ayat, manifest: manifest, meta: meta, wbwMap: wbwMap };
      });
    })
    .then(function (ctx) {
      var ayat = ctx.ayat;
      var meta = ctx.meta;
      var wbwMap = ctx.wbwMap;
      var mainEl = document.getElementById('main');
      if (mainEl) {
        mainEl.classList.remove('surah-rev-page--mushaf', 'surah-rev-page--sheet');
        if (layout === 'table') mainEl.classList.add('surah-rev-page--sheet');
        else mainEl.classList.add('surah-rev-page--mushaf');
      }

      var back =
        '<div class="surah-rev-page__links">' +
        '<a href="surah-iraab-revision.html">All surahs</a>';
      back +=
        ' · <a href="quran-iraab.html' +
        (meta ? '#' + meta.num + '-1' : '') +
        '">Open in Qurʾān Iʿrāb</a>';
      back +=
        ' · <span class="surah-rev-page__layout-hint" lang="en">Mushaf / table layouts: use <strong>View</strong> on Qurʾān Iʿrāb.</span>';
      back += '</div>';

      var head =
        '<div class="surah-rev-page__head">' +
        '<p class="surah-rev-page__kicker">Full surah · Arabic tags</p>' +
        '<h1 class="surah-rev-page__title" id="rev-title"></h1>' +
        '<p class="surah-rev-page__title-ar" id="rev-title-ar" lang="ar" dir="rtl"></p>' +
        '<p class="surah-rev-page__sub" id="rev-sub"></p>' +
        back +
        renderFontToolsHtml() +
        '</div>';

      var titleAr = meta && meta.titleAr ? meta.titleAr : '';
      var surahNum = meta && meta.num != null ? meta.num : null;
      var infographicHtml =
        meta && meta.revisionInfographicUrl
          ? renderInfographicBlock(meta.revisionInfographicUrl, titleAr)
          : '';
      var wbwCtx = { wbwMap: wbwMap, surahNum: surahNum };
      var sheet =
        layout === 'table'
          ? renderSheetTable(titleAr, ayat, surahNum, wbwMap)
          : wrapMushafSheet(
              titleAr,
              ayat
                .map(function (a) {
                  return renderAyah(a, wbwCtx);
                })
                .join('')
            );

      if (mount) {
        mount.innerHTML = head + infographicHtml + sheet;
        setChrome({
          titleEn: meta ? meta.titleEn : '',
          titleAr: meta ? meta.titleAr : '',
          ayahCount: ayat.length,
          layout: layout,
          num: meta ? meta.num : null,
        });
        applyRevFontMul();
      }
    })
    .catch(function () {
      fail('Could not load ' + file + '. Use a local server (not file://).');
    });

  applyRevFontMul();

  if (typeof window.wireQgIraabTooltip === 'function') {
    var tipRoot = document.getElementById('main');
    if (tipRoot && !document.getElementById('quran-iraab-detail')) {
      window.wireQgIraabTooltip(tipRoot);
    }
  }
})();
