/**
 * iraab-parser.js
 * Parses a row's analysisParts into structured iʿrāb rows for Beginner mode.
 *
 * PHILOSOPHY: Extract FULL clauses, not just keywords.
 * "مبنيٌّ على الفتح لأنه دعاء عليه" — keep the whole reason, not just "الفتح".
 * "الفتحة الظاهرة على آخره" — keep "على آخره", not just "الفتحة".
 *
 * Usage:
 *   import { parseIraab, toDisplayRows } from './iraab-parser.js';
 *   const rows = toDisplayRows(parseIraab(row.analysisParts));
 *   // rows: [{ label: 'ما هو؟', content: '...' }, ...]
 */

// ─────────────────────────────────────────────
// 1. HELPERS
// ─────────────────────────────────────────────

function joinText(parts) {
  return parts
    .map(p => p.text)
    .join('')
    .replace(/[﴿﴾«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─────────────────────────────────────────────
// 2. WORD TYPE
// ─────────────────────────────────────────────

const RULE_TO_TYPE = {
  'verb-past':                          'فعل ماضٍ',
  'verb-past-passive':                  'فعل ماضٍ مبنيٌّ للمجهول',
  'verb-present':                       'فعل مضارع',
  'verb-present-passive':               'فعل مضارع مبنيٌّ للمجهول',
  'verb-imperative':                    'فعل أمر',
  'verb-present-double-emphasis':       'فعل مضارع مؤكَّد بنون التوكيد',
  'kaana-sisters':                      'فعل ناقص (من أخوات كان)',
  'inna-sisters':                       'حرف توكيد مشبَّه بالفعل (إنّ وأخواتها)',
  'fael':                               'فاعل',
  'verb-passive-overview':              'نائب فاعل',
  'harf-jarr':                          'جارٌّ ومجرور',
  'atf':                                'حرف عطف',
  'munada':                             'حرف نداء',
  'harf-maani':                         'حرف',
  'attached-pronouns':                  'ضمير متصل',
  'attached-verbs':                     'ضمير متصل',
  'detached-pronouns':                  'ضمير منفصل',
  'istithna':                           'حرف استثناء',
  'verb-present-conditional-particles': 'أداة شرط',
};

const SELF_DESCRIBING = /فعل|مبتدأ|خبر|فاعل|مفعول|حرف|ضمير|اسم|ظرف|نعت|صفة|بدل|حال|جار|مضاف|نائب|منادى|مستثنى/;

function resolveWordType(parts) {
  for (const part of parts) {
    if (part.type !== 'link') continue;
    if (RULE_TO_TYPE[part.rule]) return RULE_TO_TYPE[part.rule];
    if (SELF_DESCRIBING.test(part.text)) return part.text;
  }

  const text = joinText(parts);
  const patterns = [
    [/فعل ماضٍ مبنيٌّ للمجهول|فعل ماض مبني للمجهول/,       'فعل ماضٍ مبنيٌّ للمجهول'],
    [/فعل مضارع مبني للمجهول/,                                'فعل مضارع مبنيٌّ للمجهول'],
    [/فعل مضارع ناقص|فِعْلٌ مُضَارِعٌ نَاقِصٌ/,             'فعل مضارع ناقص (من أخوات كان)'],
    [/فعل ماضٍ ناقص|فِعْلٌ مَاضٍ نَاقِصٌ/,                  'فعل ماضٍ ناقص (من أخوات كان)'],
    [/فعل ماضٍ|فعل ماض/,                                      'فعل ماضٍ'],
    [/فعل مضارع/,                                              'فعل مضارع'],
    [/فعل أمر|فعل الأمر/,                                      'فعل أمر'],
    [/فعل ناقص/,                                               'فعل ناقص'],
    [/اسم موصول/,                                              'اسم موصول'],
    [/اسم استفهام/,                                            'اسم استفهام'],
    [/اسم شرط/,                                                'اسم شرط'],
    [/ضمير رفع منفصل|ضمير منفصل/,                             'ضمير منفصل'],
    [/ضمير متصل|ضمير مت[ّ]صل/,                               'ضمير متصل'],
    [/جار.{0,4}ومجرور|جَارٌّ وَمَجْرُورٌ/,                   'جارٌّ ومجرور'],
    [/مبتدأ/,                                                   'مبتدأ'],
    [/خبر/,                                                     'خبر'],
    [/نائب الفاعل|نائب فاعل/,                                 'نائب فاعل'],
    [/فاعل/,                                                    'فاعل'],
    [/مفعول مطلق/,                                             'مفعول مطلق'],
    [/مفعول به/,                                                'مفعول به'],
    [/مفعول فيه/,                                               'مفعول فيه'],
    [/ظرف زمان/,                                                'ظرف زمان'],
    [/ظرف مكان/,                                                'ظرف مكان'],
    [/نعت|صفة/,                                                 'نعت / صفة'],
    [/بدل/,                                                     'بدل'],
    [/حال/,                                                     'حال'],
    [/مضاف إليه/,                                               'مضاف إليه'],
    [/حرف نفي/,                                                 'حرف نفي'],
    [/حرف عطف/,                                                 'حرف عطف'],
    [/حرف جر/,                                                  'حرف جر'],
    [/حرف نداء/,                                                'حرف نداء'],
    [/حرف توكيد/,                                               'حرف توكيد'],
    [/حرف استثناء/,                                            'حرف استثناء'],
    [/حرف شرط/,                                                'حرف شرط'],
    [/حرف/,                                                     'حرف'],
    [/تسمية|بسملة/,                                            'تسمية (بسملة)'],
    [/منادى/,                                                   'منادى'],
    [/مستثنى/,                                                  'مستثنى'],
  ];

  for (const [re, label] of patterns) {
    if (re.test(text)) return label;
  }
  return null;
}

// ─────────────────────────────────────────────
// 3. IRAAB — full clause
// ─────────────────────────────────────────────

function resolveIraab(parts) {
  const text = joinText(parts);

  if (/لَا عَمَلَ لَهُ|لا عمل له/.test(text)) return 'حرف مبنيٌّ — لا محلّ له من الإعراب';

  // مبني — capture full clause including reason (لاتصاله / لأنه / لـ)
  const mabniRe = /مَبْنِيٌّ عَلَى\s+\S+(?:\s+(?:لِاتِّصَالِهِ|لِأَنَّهُ|لأنه|لاتصاله)[^،.،]*)?/;
  const mabniAlt = /مبنيّ على\s+\S+(?:\s+(?:لاتصاله|لأنه)[^،.]*)?/;
  let m = mabniRe.exec(text) || mabniAlt.exec(text);
  if (m) return m[0].trim();

  // معرب — capture "مرفوع وعلامة رفعه ..." as one clause
  const murabRe = /(مَرْفُوعٌ|مَنْصُوبٌ|مَجْرُورٌ|مَجْزُومٌ|مرفوع|منصوب|مجرور|مجزوم)(?:\s+(?:وَعَلَامَةُ|وعلامة)[^،.،]+)?/;
  const mm = murabRe.exec(text);
  if (mm) return mm[0].trim();

  // في محل
  const mahall = /فِي مَحَلِّ\s+[\w\s]+|في محلّ\s+[\w\s]+/.exec(text);
  if (mahall) return mahall[0].trim();

  if (/لَا مَحَلَّ لَهُ|لَا مَحَلَّ لَهَا|لا محلّ له|لا محلّ لها/.test(text))
    return 'لا محلّ له من الإعراب';

  return null;
}

// ─────────────────────────────────────────────
// 4. CASE MARKER — full clause
// ─────────────────────────────────────────────

function resolveMarker(parts) {
  const text = joinText(parts);

  if (/لَا عَمَلَ لَهُ|لا عمل له/.test(text)) return null;

  // Taqdeer on alif — full clause
  const tAlif = /(?:الضَّمَّةُ|الْفَتْحَةُ|الْكَسْرَةُ|الضمة|الفتحة|الكسرة)\s+(?:الْمُقَدَّرَةُ|المقدّرة|المقدرة)\s+عَلَى الْأَلِفِ[^،.،]*/
    .exec(text);
  if (tAlif) return tAlif[0].trim();

  // Taqdeer on ya — full clause
  const tYa = /(?:الضَّمَّةُ|الْفَتْحَةُ|الْكَسْرَةُ|الضمة|الفتحة|الكسرة)\s+(?:الْمُقَدَّرَةُ|المقدّرة|المقدرة)\s+عَلَى الْيَاءِ[^،.،]*/
    .exec(text);
  if (tYa) return tYa[0].trim();

  // Generic taqdeer
  const tGen = /(?:الضَّمَّةُ|الْفَتْحَةُ|الْكَسْرَةُ)\s+الْمُقَدَّرَةُ[^،.،]*/.exec(text);
  if (tGen) return tGen[0].trim();

  // علامة ... full clause
  const alama =
    /عَلَامَةُ\s+(?:رَفْعِهِ|نَصْبِهِ|جَرِّهِ|جَرِّهَا|نَصْبِهَا|جَزْمِهِ)\s+[^،.،]+/.exec(text) ||
    /علامة\s+(?:رفعه|نصبه|جره|جرها|نصبها|جزمه)\s+[^،.]+/.exec(text);
  if (alama) return alama[0].trim();

  // ثبوت النون / حذف النون / حذف حرف العلة
  if (/ثُبُوتُ النُّونِ|ثبوت النون/.test(text)) return 'ثبوت النون — لأنه من الأفعال الخمسة';
  if (/حَذْفُ النُّونِ|حذف النون/.test(text))   return 'حذف النون — لأنه من الأفعال الخمسة';
  if (/حذف حرف العلة/.test(text))               return 'حذف حرف العلة';

  // Mabni marker (السكون/الفتح/الضم/الكسر)
  const mabniM = /مَبْنِيٌّ عَلَى (السُّكُونِ|الْفَتْحِ|الضَّمِّ|الْكَسْرِ)|مبنيّ على (السكون|الفتح|الضم|الكسر)/.exec(text);
  if (mabniM) return `مبنيٌّ على ${(mabniM[1] || mabniM[2]).trim()}`;

  return null;
}

// ─────────────────────────────────────────────
// 5. FAAIL — full clause
// ─────────────────────────────────────────────

function resolveFaail(parts) {
  const text = joinText(parts);

  const isVerb    = /فعل|فِعْل|ناقص/.test(text);
  const isPassive = /نائب الفاعل|نائب فاعل/.test(text);
  if (!isVerb && !isPassive) return null;

  // واو الجماعة
  if (/وَاوُ الْجَمَاعَةِ.*فَاعِلٌ|واو الجماعة.*فاعل/.test(text))
    return 'الفاعل: واو الجماعة — ضمير متصل في محل رفع فاعل';

  // تاء الفاعل
  if (/تَاءُ الْفَاعِلِ.*فَاعِلٌ|تاء الفاعل.*فاعل/.test(text))
    return 'الفاعل: تاء الفاعل — ضمير متصل في محل رفع فاعل';

  // «نا»
  if (/«نَا».*فَاعِلٌ|«نا».*فاعل/.test(text))
    return 'الفاعل: «نا» — ضمير متصل في محل رفع فاعل';

  // Hidden pronoun — full clause "والفاعل ضمير مستتر وجوبًا/جوازًا تقديره «X»"
  const hidden =
    /(?:وَ)?الْفَاعِلُ\s+ضَمِيرٌ مُسْتَتِرٌ[^،.،]*/.exec(text) ||
    /(?:و)?الفاعل\s+ضمير مستتر[^،.]*/.exec(text);
  if (hidden) return hidden[0].replace(/^(?:وَ|و)/, '').trim();

  // اسم كان hidden
  const kaanS =
    /اسمُ كَانَ\s+ضَمِيرٌ مُسْتَتِرٌ[^،.]*/.exec(text) ||
    /اسم كان\s+ضمير مستتر[^،.]*/.exec(text);
  if (kaanS) return kaanS[0].trim();

  // نائب الفاعل hidden
  const naib =
    /نَائِبُ الْفَاعِلِ\s+ضَمِيرٌ مُسْتَتِرٌ[^،.]*/.exec(text) ||
    /نائب الفاعل\s+ضمير مستتر[^.,]*/.exec(text);
  if (naib) return naib[0].trim();

  return null;
}

// ─────────────────────────────────────────────
// 6. NOTES — full clauses
// ─────────────────────────────────────────────

function resolveNotes(parts) {
  const text = joinText(parts);
  const notes = [];

  // تاء التأنيث — full clause
  const tat =
    /(?:وَ)?[«"]?التَّاءُ[»"]?\s*[:\-]?\s*تَاءُ التَّأْنِيثِ[^،.،]*/.exec(text) ||
    /(?:و)?[«"]?التاء[»"]?\s*[:\-]?\s*تاء التأنيث[^،.]*/.exec(text);
  if (tat) notes.push(tat[0].replace(/^(?:وَ|و)/, '').trim());

  // Attached pronoun clauses — each pronoun gets its full clause
  const pronounNames = ['الْهَاءُ','الْكَافُ','الْمِيمُ','النُّونُ','يَاءُ الْمُتَكَلِّمِ','الهاء','الكاف','الميم','النون'];
  for (const pron of pronounNames) {
    const re = new RegExp(
      `[«"]?${pron}[»"]?\\s*[:\\-]?\\s*ضَمِيرٌ مُتَّصِلٌ[^،.،]*` +
      `|[«"]?${pron.replace(/ُ$/,'')}[ُ]?[»"]?\\s*[:\\-]?\\s*ضمير متصل[^،.]*`
    );
    const m = re.exec(text);
    if (m && !notes.some(n => n.includes(pron.replace(/[ُ]/g,'')))) {
      const clause = m[0].replace(/^(?:وَ|و)[«"]?/, '').trim();
      if (clause.length < 160) notes.push(clause);
    }
  }

  // Sentence role — all الجملة clauses in full
  const jumlaRe = /(?:وَ)?(?:الْجُمْلَةُ|الجملة)\s*[^.،،]{5,200}/g;
  let jm;
  while ((jm = jumlaRe.exec(text)) !== null) {
    const clause = jm[0].replace(/^(?:وَ|و)/, '').trim().replace(/[،.]\s*$/, '');
    if (clause.length > 8 && clause.length < 220 && !notes.some(n => n.slice(0,20) === clause.slice(0,20)))
      notes.push(clause);
  }

  // متعلّق — full clause
  const mut =
    /(?:وَ)?(?:الْجَارُّ وَالْمَجْرُورُ|الجار والمجرور)?\s*مُتَعَلِّقَانِ[^،.،]*/.exec(text) ||
    /(?:و)?(?:الجار والمجرور)?\s*متعلّقان[^،.]*/.exec(text);
  if (mut && !notes.some(n => n.includes('متعلّق'))) {
    notes.push(mut[0].replace(/^(?:وَ|و)/, '').trim());
  }

  // دعاء / future past — reason clause
  if (/دُعَاء|دعاء|معناه الاستقبال/.test(text)) {
    const dm =
      /لِأَنَّهُ دُعَاء[^،.]*/.exec(text) ||
      /لأنه دعاء[^،.]*/.exec(text) ||
      /معناه الاستقبال[^،.]*/.exec(text);
    if (dm) notes.push(dm[0].trim());
    else notes.push('معناه الاستقبال — لأنه دعاء');
  }

  // Cross-reference (تعرب إعراب / يعرب مثل)
  const xref = /(?:تُعْرَبُ|تعرب|يُعْرَبُ|يعرب)\s+(?:إِعْرَابَ|إعراب|مِثْلَ|مثل)[^.،،]{0,120}/.exec(text);
  if (xref) notes.push(xref[0].trim());

  // Deduplicate on first 30 chars
  const seen = new Set();
  return notes.filter(n => {
    const key = n.slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─────────────────────────────────────────────
// 7. WAJHAN
// ─────────────────────────────────────────────

function resolveWajhan(parts) {
  const text = joinText(parts);
  const splitRe = /\s+(?:أَوْ|أو)\s+(?=(?:يَجُوزُ|تَكُونُ|هُوَ|يُمْكِنُ|يَكُونُ|في محلّ|فِي مَحَلِّ|مبتدأ|خبر))/;
  const split = text.split(splitRe);
  if (split.length >= 2) {
    return { opinion1: split[0].trim(), opinion2: split.slice(1).join(' أو ').trim() };
  }
  return null;
}

// ─────────────────────────────────────────────
// 8. MAIN
// ─────────────────────────────────────────────

export function parseIraab(analysisParts) {
  if (!analysisParts?.length) {
    return { wordType: null, iraab: null, marker: null, faail: null, notes: null, wajhan: null, fallback: null, fullText: '' };
  }

  const fullText = joinText(analysisParts);
  const wordType = resolveWordType(analysisParts);
  const wajhan   = resolveWajhan(analysisParts);
  const iraab    = resolveIraab(analysisParts);
  const marker   = resolveMarker(analysisParts);
  const faail    = resolveFaail(analysisParts);
  const notes    = resolveNotes(analysisParts);

  const confident = wordType !== null || iraab !== null;

  return {
    wordType,
    iraab,
    marker,
    faail,
    notes: notes?.length ? notes : null,
    wajhan,
    fallback: confident ? null : fullText,
    fullText,
  };
}

// ─────────────────────────────────────────────
// 9. DISPLAY ROWS
// ─────────────────────────────────────────────

export function toDisplayRows(parsed) {
  if (!parsed) return [];

  if (parsed.fallback) return [{ label: 'التحليل', content: parsed.fallback }];

  const rows = [];

  if (parsed.wordType) rows.push({ label: 'ما هو؟',           content: parsed.wordType });
  if (parsed.iraab)    rows.push({ label: 'إعرابه / بناؤه؟',  content: parsed.iraab });
  if (parsed.marker)   rows.push({ label: 'علامة الإعراب؟',   content: parsed.marker });
  if (parsed.faail)    rows.push({ label: 'الفاعل؟',           content: parsed.faail });

  if (parsed.wajhan) {
    rows.push({
      label: 'ملاحظة (وجهان)',
      content: `${parsed.wajhan.opinion1}\n— أو —\n${parsed.wajhan.opinion2}`,
    });
  } else if (parsed.notes?.length) {
    parsed.notes.forEach((note, i) => {
      rows.push({ label: i === 0 ? 'ملاحظة' : `ملاحظة ${i + 1}`, content: note });
    });
  }

  if (!rows.length && parsed.fullText) rows.push({ label: 'التحليل', content: parsed.fullText });

  return rows;
}
