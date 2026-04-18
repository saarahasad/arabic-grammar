/**
 * Randomized Arabic iʿrāb quiz generator — mixed surahs, 15 questions, 12 question templates.
 *
 * Input rows: { surah, ayah, word, type, i3rab, role, extra }
 * - surah: number
 * - ayah: number | string
 * - word: string (Uthmani segment)
 * - type: "اسم" | "فعل" | "حرف" (or synonyms below)
 * - i3rab: full grammatical analysis (Arabic text)
 * - role: syntactic role e.g. فاعل، مفعول به، مضاف إليه
 * - extra: notes e.g. hidden pronoun (ضمير مستتر تقديره «أنا»)
 *
 * Optional: ayahText — full āyah for context in stems (recommended for types 10 & 12).
 * Optional: surahNameAr — Arabic surah name; when set, question text uses it instead of the surah number.
 */
(function (global) {
  'use strict';

  const WORD_TYPES = ['اسم', 'فعل', 'حرف'];
  const CASE_LABELS = ['مرفوع', 'منصوب', 'مجرور', 'مجزوم', 'مبني'];

  const TYPE_SYNONYMS = {
    اسم: 'اسم',
    الْإِسْم: 'اسم',
    'اسم': 'اسم',
    فعل: 'فعل',
    'الْفِعْل': 'فعل',
    'فعل': 'فعل',
    حرف: 'حرف',
    'الْحَرْف': 'حرف',
    'حرف': 'حرف',
  };

  const QUESTION_TYPE_KEYS = [
    'word_type',
    'i3rab_case',
    'reason_jarr_nasb',
    'fill_blank_role',
    'hidden_pronoun',
    'spot_error',
    'mc_full_analysis',
    'role_id',
    'harakah_reasoning',
    'ayah_count',
    'reverse_i3rab_word',
    'multi_select_verbs',
  ];

  /** Arabic labels for `type` in each result object (stable keys in `QUESTION_TYPE_KEYS`). */
  const QUESTION_TYPE_AR = {
    word_type: 'تحديد نوع الكلمة (اسم / فعل / حرف)',
    i3rab_case: 'تحديد الإعراب (مرفوع / منصوب / مجرور / …)',
    reason_jarr_nasb: 'السبب النحوي (لماذا مجرور / منصوب)',
    fill_blank_role: 'سد فراغ (الفاعل هو …)',
    hidden_pronoun: 'الضمير المستتر',
    spot_error: 'اكتشاف الخطأ في الإعراب',
    mc_full_analysis: 'اختيار التحليل الكامل',
    role_id: 'تحديد الدور (فاعل / مفعول / …)',
    harakah_reasoning: 'الحركة والعلامة',
    ayah_count: 'سؤال على مستوى الآية (عدّ)',
    reverse_i3rab_word: 'سؤال عكسي (من الإعراب إلى الكلمة)',
    multi_select_verbs: 'اختيار جميع الأفعال في الآية',
  };

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleInPlace(arr, rng) {
    const random = rng || Math.random;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function normalizeWordType(t) {
    if (t == null || t === '') return null;
    const s = String(t).trim();
    return TYPE_SYNONYMS[s] || (WORD_TYPES.includes(s) ? s : null);
  }

  /** Primary iʿrāb bucket: مرفوع / منصوب / مجرور / مجزوم / مبني (first match in text). */
  function extractCaseBucket(i3rab) {
    if (!i3rab) return null;
    const s = String(i3rab);
    const order = ['مرفوع', 'منصوب', 'مجرور', 'مجزوم', 'مبني'];
    for (let i = 0; i < order.length; i++) {
      if (s.includes(order[i])) return order[i];
    }
    return null;
  }

  /** Visible ḥarakah on last letter (heuristic). */
  function extractHarakahHint(i3rab) {
    if (!i3rab) return null;
    const s = String(i3rab);
    if (/الضمة|ضمة|بالضمة|وعلامة رفعه الضمة/.test(s)) return 'الضمة';
    if (/الفتحة|فتحة|بالفتحة|وعلامة نصبه الفتحة|منصوب وعلامة نصبه الفتحة/.test(s)) return 'الفتحة';
    if (/الكسرة|كسرة|بالكسرة|وعلامة جره الكسرة|مجرور وعلامة جره الكسرة/.test(s)) return 'الكسرة';
    if (/السكون|سكون|مبني على السكون|بالسكون/.test(s)) return 'السكون';
    if (/ثبوت النون|النون|واو الجماعة|ألف الاثنين|ياء المخاطبة/.test(s)) return 'حركة خاصة (نون / ألف / واو / ياء)';
    return null;
  }

  /** Short reason for جرّ / نصب from analysis (first clause after لأن / بسبب / لِـ). */
  function extractReasonSnippet(i3rab) {
    if (!i3rab) return '';
    const s = String(i3rab).replace(/\s+/g, ' ').trim();
    const m = s.match(/لأن[^.]{0,120}/);
    if (m) return m[0].trim();
    if (/مجرور/.test(s) && /الْجَارّ|حرف جر|في محل جر|بِـ/.test(s)) {
      return 'لأنه بعد حرف جرّ، أو في محلّ جرّ بحسب التحليل.';
    }
    if (/منصوب/.test(s) && /حرف ناصب|في محل نصب|لأنه مفعول|لأنه خبر/.test(s)) {
      return 'لأنّه منصوبٌ بحسب موقعه في الجملة (مفعول، خبر، …).';
    }
    return s.slice(0, 160) + (s.length > 160 ? '…' : '');
  }

  /** Hidden pronoun from `extra` or `i3rab`. */
  function extractHiddenPronoun(extra, i3rab) {
    const src = [extra, i3rab].filter(Boolean).join(' ');
    const m = src.match(/ضمير\s+مستتر[^\u0600-\u06FF]*تقديره\s+«([^»]+)»/);
    if (m) return m[1].trim();
    const m2 = src.match(/تقديره\s+«([^»]+)»/);
    if (m2) return m2[1].trim();
    return null;
  }

  function wrongCaseFrom(c) {
    const map = { مرفوع: 'منصوب', منصوب: 'مرفوع', مجرور: 'مرفوع', مجزوم: 'مرفوع', مبني: 'مرفوع' };
    return map[c] || 'منصوب';
  }

  function fourOptions(correct, pool, rng) {
    const random = rng || Math.random;
    const set = new Set();
    set.add(correct);
    const uniq = [];
    const seen = new Set();
    for (let i = 0; i < pool.length; i++) {
      const x = pool[i];
      if (x == null || x === correct || seen.has(x)) continue;
      seen.add(x);
      uniq.push(x);
    }
    shuffleInPlace(uniq, () => random());
    for (let i = 0; i < uniq.length && set.size < 4; i++) set.add(uniq[i]);
    const pad = ['غيرُ ذلك', 'لا يُعرف', 'لا يُحدَّد', 'اختيارٌ زائد'];
    let pi = 0;
    while (set.size < 4 && pi < pad.length) {
      if (!set.has(pad[pi])) set.add(pad[pi]);
      pi++;
    }
    let k = 0;
    while (set.size < 4) {
      k += 1;
      set.add(`خيارٌ إضافيٌ (${k})`);
    }
    const out = Array.from(set);
    shuffleInPlace(out, () => random());
    return out;
  }

  function groupByAyah(rows) {
    const map = new Map();
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const key = `${r.surah}:${r.ayah}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    }
    return map;
  }

  function pickQuestionTypes15(rng) {
    const random = rng || Math.random;
    const base = QUESTION_TYPE_KEYS.slice();
    shuffleInPlace(base, () => random());
    const out = base.slice(0, 12);
    while (out.length < 15) {
      out.push(QUESTION_TYPE_KEYS[Math.floor(random() * QUESTION_TYPE_KEYS.length)]);
    }
    shuffleInPlace(out, () => random());
    return out.slice(0, 15);
  }

  /**
   * @param {Array<object>} dataset
   * @param {{ seed?: number }} [options]
   * @returns {Array<{ question: string, options: string[], answer: string, type: string }>}
   *   `type` is an Arabic description of the question template (see `QUESTION_TYPE_AR`).
   */
  function generateIraabQuiz(dataset, options) {
    if (!Array.isArray(dataset) || dataset.length === 0) {
      throw new Error('generateIraabQuiz: dataset must be a non-empty array');
    }

    const seed = options && typeof options.seed === 'number' ? options.seed : Date.now();
    const rng = mulberry32(seed >>> 0);

    const normalized = dataset
      .map((row, idx) => {
        const type = normalizeWordType(row.type);
        return {
          surah: Number(row.surah),
          surahNameAr:
            row.surahNameAr != null && String(row.surahNameAr).trim()
              ? String(row.surahNameAr).trim()
              : '',
          ayah: row.ayah,
          word: row.word != null ? String(row.word).trim() : '',
          type: type || 'اسم',
          i3rab: row.i3rab != null ? String(row.i3rab) : '',
          role: row.role != null ? String(row.role).trim() : '',
          extra: row.extra != null ? String(row.extra) : '',
          ayahText: row.ayahText != null ? String(row.ayahText) : '',
          _i: idx,
        };
      })
      .filter((r) => r.word && !Number.isNaN(r.surah));

    const bySurah = new Map();
    for (let i = 0; i < normalized.length; i++) {
      const s = normalized[i].surah;
      if (!bySurah.has(s)) bySurah.set(s, []);
      bySurah.get(s).push(normalized[i]);
    }

    const surahNums = Array.from(bySurah.keys());
    if (surahNums.length < 15) {
      throw new Error(
        `generateIraabQuiz: mixed mode needs at least 15 distinct surahs in the dataset (found ${surahNums.length}).`
      );
    }

    shuffleInPlace(surahNums, rng);

    /** One word per surah, 15 surahs — no duplicate words. */
    const picked = [];
    const usedWords = new Set();
    for (let i = 0; i < surahNums.length && picked.length < 15; i++) {
      const list = bySurah.get(surahNums[i]).slice();
      shuffleInPlace(list, rng);
      for (let j = 0; j < list.length; j++) {
        const w = list[j].word;
        if (!usedWords.has(w)) {
          usedWords.add(w);
          picked.push(list[j]);
          break;
        }
      }
    }

    if (picked.length < 15) {
      throw new Error('generateIraabQuiz: could not pick 15 unique words from 15 distinct surahs.');
    }

    const types15 = pickQuestionTypes15(rng);
    const ayahMap = groupByAyah(normalized);

    const out = [];

    function typeLabel(key) {
      return QUESTION_TYPE_AR[key] || key;
    }

    /** Arabic surah title for stems, or numeric surah if name missing. */
    function surahDisplayName(r) {
      return r.surahNameAr ? r.surahNameAr : String(r.surah);
    }

    /** “في سورة …” — uses name when present, else “في سورة رقم n”. */
    function fiSurahPhrase(r) {
      return r.surahNameAr ? `في سورة ${r.surahNameAr}` : `في سورة رقم ${r.surah}`;
    }

    for (let q = 0; q < 15; q++) {
      const row = picked[q];
      const qType = types15[q];
      const caseBucket = extractCaseBucket(row.i3rab);
      const harakah = extractHarakahHint(row.i3rab);
      const hidden = extractHiddenPronoun(row.extra, row.i3rab);

      switch (qType) {
        case 'word_type': {
          const correct = row.type;
          const opts = fourOptions(correct, WORD_TYPES, rng);
          out.push({
            question: `${fiSurahPhrase(row)}، ما نوع الكلمة «${row.word}»؟`,
            options: opts,
            answer: correct,
            type: typeLabel('word_type'),
          });
          break;
        }
        case 'i3rab_case': {
          const correct = caseBucket || 'مبني';
          const opts = fourOptions(correct, CASE_LABELS, rng);
          out.push({
            question: `ما إعرابُ الكلمة «${row.word}» من حيثُ العَلامَةُ الظاهرة أو المَحَلُّ (مرفوع / منصوب / مجرور / مجزوم / مبني)؟ — سورة ${surahDisplayName(row)}`,
            options: opts,
            answer: correct,
            type: typeLabel('i3rab_case'),
          });
          break;
        }
        case 'reason_jarr_nasb': {
          const reason = extractReasonSnippet(row.i3rab) || row.i3rab.slice(0, 200);
          const correct = reason;
          const pool = normalized
            .filter((r) => r._i !== row._i)
            .map((r) => extractReasonSnippet(r.i3rab) || r.i3rab.slice(0, 120))
            .filter(Boolean);
          const opts = fourOptions(correct, pool.length ? pool : [correct, 'لأنّه مرفوعٌ بالضمّة.', 'لأنّه منصوبٌ بالفتحة.', 'لأنّه مجرورٌ بالكسرة.'], rng);
          out.push({
            question: `بِمَ نُفسَرُ ${caseBucket === 'مجرور' ? 'الجرّ' : caseBucket === 'منصوب' ? 'النصب' : 'الإعراب'} للكلمة «${row.word}» في سورة ${surahDisplayName(row)}؟`,
            options: opts,
            answer: correct,
            type: typeLabel('reason_jarr_nasb'),
          });
          break;
        }
        case 'fill_blank_role': {
          const role = row.role || 'كلمة';
          const correct = row.word;
          const pool = normalized.filter((r) => r._i !== row._i).map((r) => r.word);
          const opts = fourOptions(correct, pool, rng);
          out.push({
            question: `أكمل: «${role}» هو __ — من سورة ${surahDisplayName(row)}.`,
            options: opts,
            answer: correct,
            type: typeLabel('fill_blank_role'),
          });
          break;
        }
        case 'hidden_pronoun': {
          const correct = hidden || 'غيرُ مذكورٍ في البيانات';
          const pool = normalized
            .map((r) => extractHiddenPronoun(r.extra, r.i3rab))
            .filter(Boolean);
          const opts = fourOptions(correct, pool.length ? pool : ['أنا', 'أنت', 'هو', 'نحن'], rng);
          out.push({
            question: `ما تقديرُ الضميرِ المستترِ المرتبطِ بالكلمة «${row.word}» (سورة ${surahDisplayName(row)})؟`,
            options: opts,
            answer: correct,
            type: typeLabel('hidden_pronoun'),
          });
          break;
        }
        case 'spot_error': {
          const wrong = `«${row.word}» ${wrongCaseFrom(caseBucket || 'مرفوع')} وعلامةُ إعرابِهِ الضمةُ.`;
          const correctLine = row.i3rab.trim() ? row.i3rab.slice(0, 220) : `التحليلُ الصحيحُ يطابقُ بياناتِ السؤال.`;
          const distractors = [
            wrong,
            `«${row.word}» حرفٌ مبنيٌّ على الفتحِ.`,
            `«${row.word}» اسمٌ منصوبٌ دائماً.`,
          ];
          const opts = fourOptions(correctLine, distractors, rng);
          out.push({
            question: `أيُّ العباراتِ التاليةِ تصِفُ إعرابَ «${row.word}» بشكلٍ صحيحٍ؟ (سورة ${surahDisplayName(row)})`,
            options: opts,
            answer: correctLine,
            type: typeLabel('spot_error'),
          });
          break;
        }
        case 'mc_full_analysis': {
          const correct = row.i3rab.trim() || `«${row.word}»: ${row.type}، ${row.role || '—'}.`;
          const pool = normalized.filter((r) => r._i !== row._i).map((r) => r.i3rab.trim() || `«${r.word}»`).filter(Boolean);
          const opts = fourOptions(correct, pool, rng);
          out.push({
            question: `اخترِ التحليلَ الإعرابيَّ الكاملَ الصحيحَ للكلمة «${row.word}» (سورة ${surahDisplayName(row)}).`,
            options: opts,
            answer: correct,
            type: typeLabel('mc_full_analysis'),
          });
          break;
        }
        case 'role_id': {
          const correct = row.role || 'غيرُ محدَّدٍ';
          const pool = normalized.map((r) => r.role).filter(Boolean);
          const opts = fourOptions(correct, pool.length ? pool : ['فاعل', 'مفعول به', 'مبتدأ', 'خبر'], rng);
          out.push({
            question: `ما دورُ الكلمة «${row.word}» في التحليلِ النحويِّ (سورة ${surahDisplayName(row)})؟`,
            options: opts,
            answer: correct,
            type: typeLabel('role_id'),
          });
          break;
        }
        case 'harakah_reasoning': {
          const correct = harakah || 'يُستدَلُّ من السياقِ';
          const pool = ['الضمة', 'الفتحة', 'الكسرة', 'السكون', 'حركة خاصة (نون / ألف / واو / ياء)'];
          const opts = fourOptions(correct, pool, rng);
          out.push({
            question: `ما الظاهرةُ الصوتيّةُ (الحركةُ أو ما يقومُ مقامَها) على آخرِ «${row.word}» بحسبِ التحليلِ؟ — سورة ${surahDisplayName(row)}`,
            options: opts,
            answer: correct,
            type: typeLabel('harakah_reasoning'),
          });
          break;
        }
        case 'ayah_count': {
          const key = `${row.surah}:${row.ayah}`;
          const siblings = ayahMap.get(key) || [row];
          const verbs = siblings.filter((r) => normalizeWordType(r.type) === 'فعل');
          const count = verbs.length;
          const correct = String(count);
          const opts = fourOptions(correct, ['0', '1', '2', '3', '4', String(count + 1)], rng);
          const snippet = row.ayahText || siblings.map((s) => s.word).join(' ');
          out.push({
            question: `كم عددُ الأفعالِ (كلمةٌ نوعُها «فعل») في بياناتِ هذه الآيةِ من سورة ${surahDisplayName(row)}؟ — النصُ: ${snippet.slice(0, 120)}${snippet.length > 120 ? '…' : ''}`,
            options: opts,
            answer: correct,
            type: typeLabel('ayah_count'),
          });
          break;
        }
        case 'reverse_i3rab_word': {
          const hint = caseBucket
            ? `الحالةُ الإعرابيّةُ: ${caseBucket}.`
            : `وصفٌ إعرابيٌّ: ${row.i3rab.slice(0, 120)}${row.i3rab.length > 120 ? '…' : ''}`;
          const correct = row.word;
          const pool = picked.map((r) => r.word).filter((w) => w !== correct);
          const opts = fourOptions(correct, pool, rng);
          out.push({
            question: `بناءً على الوصفِ الإعرابيِّ التاليِ، أيُّ هذه الكلماتِ (من نفسِ الاختبارِ) هي المقصودة؟ ${hint}`,
            options: opts,
            answer: correct,
            type: typeLabel('reverse_i3rab_word'),
          });
          break;
        }
        case 'multi_select_verbs': {
          const key = `${row.surah}:${row.ayah}`;
          const siblings = ayahMap.get(key) || [row];
          const verbs = siblings.filter((r) => normalizeWordType(r.type) === 'فعل').map((r) => r.word);
          const nonVerbs = siblings.filter((r) => normalizeWordType(r.type) !== 'فعل').map((r) => r.word);
          const correctList = verbs.length ? verbs.join('، ') : 'لا يوجد';
          const wrong1 = shuffleInPlace(nonVerbs.slice(), rng)
            .slice(0, Math.min(2, nonVerbs.length))
            .concat(verbs.slice(0, 1))
            .join('، ');
          const wrong2 = siblings.map((s) => s.word).filter((w) => !verbs.includes(w)).join('، ') || 'لا يوجد';
          const wrong3 = picked.map((p) => p.word).filter((w) => !verbs.includes(w)).slice(0, 3).join('، ');
          const opts = fourOptions(correctList, [wrong1, wrong2, wrong3, verbs.concat(nonVerbs).join('، ')], rng);
          out.push({
            question: `اخترِ قائمةَ جميعِ الأفعالِ في هذه الآيةِ (حسبَ البيانات): سورة ${surahDisplayName(row)} — ${row.ayahText ? row.ayahText.slice(0, 100) : key}`,
            options: opts,
            answer: correctList,
            type: typeLabel('multi_select_verbs'),
          });
          break;
        }
        default:
          out.push({
            question: `ما نوعُ «${row.word}»؟ (سورة ${surahDisplayName(row)})`,
            options: fourOptions(row.type, WORD_TYPES, rng),
            answer: row.type,
            type: typeLabel('word_type'),
          });
      }
    }

    shuffleInPlace(out, rng);
    return out;
  }

  global.generateIraabQuiz = generateIraabQuiz;
  global.IRAAB_QUIZ_QUESTION_TYPES = QUESTION_TYPE_KEYS.slice();
  global.IRAAB_QUIZ_QUESTION_TYPE_AR = Object.assign({}, QUESTION_TYPE_AR);
})(typeof window !== 'undefined' ? window : globalThis);
