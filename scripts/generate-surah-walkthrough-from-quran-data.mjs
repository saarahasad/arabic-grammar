/**
 * Build full-surah revision JSON from window.QURAN_IRAAB_AYAH in quran-iraab-data.js.
 *
 * Writes surah-*-iraab-revision.json for every surah that has curated rows
 * (currently 91–114): Arabic tag pills per segment, plus fully-vocalized
 * `detailAr` prose via `vocalizeIraabProse`. Also writes
 * `surah-walkthrough-manifest.json` (revision URLs and titles).
 *
 * Usage: node scripts/generate-surah-walkthrough-from-quran-data.mjs
 */
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';
import { vocalizeIraabProse } from './vocalize-iraab-prose.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SURAH_META = {
  91: { slug: 'shams', titleEn: 'Ash-Shams' },
  92: { slug: 'layl', titleEn: 'Al-Layl' },
  93: { slug: 'duha', titleEn: 'Ad-Duha' },
  94: { slug: 'sharh', titleEn: 'Ash-Sharh' },
  95: { slug: 'tin', titleEn: 'At-Tin' },
  96: { slug: 'alaq', titleEn: 'Al-Alaq' },
  97: { slug: 'qadr', titleEn: 'Al-Qadr' },
  98: { slug: 'bayyinah', titleEn: 'Al-Bayyinah' },
  99: { slug: 'zalzalah', titleEn: 'Az-Zalzalah' },
  100: { slug: 'adiyat', titleEn: 'Al-Adiyat' },
  101: { slug: 'qariyah', titleEn: "Al-Qari'ah" },
  102: { slug: 'takathur', titleEn: 'At-Takathur' },
  103: { slug: 'asr', titleEn: "Al-'Asr" },
  104: { slug: 'humazah', titleEn: 'Al-Humazah' },
  105: { slug: 'fil', titleEn: 'Al-Fil' },
  106: { slug: 'quraysh', titleEn: 'Quraysh' },
  107: { slug: 'maoon', titleEn: "Al-Ma'un" },
  108: { slug: 'kawthar', titleEn: 'Al-Kawthar' },
  109: { slug: 'kafirun', titleEn: 'Al-Kafirun' },
  110: { slug: 'nasr', titleEn: 'An-Nasr' },
  111: { slug: 'masad', titleEn: 'Al-Masad' },
  112: { slug: 'ikhlas', titleEn: 'Al-Ikhlas' },
  113: { slug: 'falaq', titleEn: 'Al-Falaq' },
  114: { slug: 'nas', titleEn: 'An-Nas' },
};

const FIRST_SURAH = 91;
const LAST_SURAH = 114;

/** First matching rule → pill colour bucket */
const RULE_COLOR = {
  'verb-past': 'verb',
  'verb-present': 'verb',
  'verb-imperative': 'verb',
  'verb-passive': 'verb',
  fael: 'noun',
  mafool: 'noun',
  'nominal-sentence': 'noun',
  idafah: 'noun',
  'harf-jarr': 'part',
  atf: 'part',
  'sentence-structure': 'part',
  'inna-sisters': 'part',
  'harf-maani': 'part',
  munada: 'part',
  'verb-present-negation': 'part',
  'irab-jarr': 'case',
  'irab-nasb': 'case',
  tawabi: 'case',
  'silah-mawsul': 'case',
  'relative-nouns': 'pron',
  'attached-pronouns': 'pron',
  'attached-verbs': 'pron',
};

function stripTashkeel(s) {
  return String(s).replace(/[\u064B-\u065F\u0670\u0640]/g, '');
}

function loadAyahs() {
  const code = fs.readFileSync(path.join(ROOT, 'quran-iraab-data.js'), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.window.QURAN_IRAAB_AYAH;
}

function inferColor(row) {
  const links = (row.analysisParts || []).filter((p) => p.type === 'link');
  for (const l of links) {
    if (l.rule && RULE_COLOR[l.rule]) return RULE_COLOR[l.rule];
  }
  return 'mute';
}

/** When rows lack lesson links, infer chip colour from Arabic prose. */
function inferColorFromBlob(blob) {
  const b = stripTashkeel(blob || '');
  if (/فعل\s*مضارع|فعل\s*ماض|فعل\s*أمر/.test(b)) return 'verb';
  if (/(?:مفعول\s*به|فاعل\s*مرفوع|فاعل\s*مجرور)/.test(b)) return 'noun';
  if (
    /ظرف\s*زمان|ظرف\s*مكان|حرف\s*(توكيد|نفي|جر|حصر|شرط|استقبال|نصب)|جار\s*ومجرور|نائب\s*فاعل|مقسم\s*به|لام\s*للتوكيد/.test(b)
  )
    return 'part';
  if (/اسم\s*موصول|ضمير\s*متصل/.test(b)) return 'pron';
  if (/منصوب|مرفوع|مجرور|محل\s*نصب|محل\s*رفع|محل\s*جر/.test(b)) return 'case';
  return 'mute';
}

/** Full analysis text for one curated row (links + prose). */
function rowAnalysisBlob(row) {
  return (row.analysisParts || [])
    .map((p) => {
      if (p.type === 'text') return p.text;
      if (p.type === 'link' && p.text) return p.text;
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Prose iʿrāb only (`text` analysisParts), for revision table alongside tag pills.
 * Runs through `vocalizeIraabProse` so madrasa-style prose stored with minimal
 * tashkīl is shown fully vocalized in the revision view. Already-vocalized
 * curator text is detected by the vocalizer and passed through unchanged.
 */
function detailArFromRow(row) {
  const texts = (row.analysisParts || [])
    .filter((p) => p.type === 'text' && p.text && String(p.text).trim())
    .map((p) => String(p.text).trim());
  const joined = texts.join(' ').replace(/\s+/g, ' ').trim();
  return vocalizeIraabProse(joined);
}

/**
 * Short Arabic pills for الواو / الفاء “type” (عطف، قسم، استئناف، جواب شرط، …)
 * parsed from madrasa-style prose in analysis text.
 */
function extractWawFaaLabels(blob) {
  if (!blob) return [];
  const b = stripTashkeel(String(blob).replace(/\u0640/g, ''));
  const labels = [];
  const seen = new Set();
  const add = (s) => {
    if (!s || seen.has(s)) return;
    seen.add(s);
    labels.push(s);
  };

  if (/الفاء\s*:\s*حرف\s+واقع\s+في\s+جواب/.test(b)) add('فاء جواب شرط');
  else if (/الفاء\s*:\s*حرف\s+استئناف/.test(b)) add('فاء استئناف');

  if (/الواو\s*:\s*حرف\s+جر\s*للقسم/.test(b)) add('واو قسم');
  else if (/الواو\s*:\s*حرف\s+استئناف/.test(b)) add('واو استئناف');
  else if (/الواو\s*:\s*حرف\s+عطف/.test(b)) add('واو عطف');

  if (/معطوفة?\s+بالفاء/.test(b)) add('فاء عطف');
  if (/معطوفة?\s+بالواو/.test(b)) add('واو عطف');

  if (/بواو\s+القسم/.test(b)) add('واو قسم');

  return labels;
}

/** Short standard phrases for revision chips (tashkeel-insensitive). */
function extractGrammarHeadlines(blob) {
  if (!blob) return [];
  const b = stripTashkeel(String(blob).replace(/\u0640/g, ''))
    .replace(/\s+/g, ' ')
    .replace(/["«»]/g, '');
  const rules = [
    [/حرف\s*نصب\s*توكيد\s*مشبه\s*بالفعل/, 'حرف نصب توكيد مشبه بالفعل'],
    [/حرف\s*توكيد\s*مشبه\s*بالفعل/, 'حرف توكيد مشبه بالفعل'],
    [/ظرف\s*زمان/, 'ظرف زمان'],
    [/ظرف\s*لما\s*يستقبل/, 'ظرف زمان'],
    [/فعل\s*مضارع/, 'فعل مضارع'],
    [/فعل\s*ماض/, 'فعل ماضٍ'],
    [/فعل\s*أمر/, 'فعل أمر'],
    [/مفعول\s*به/, 'مفعول به'],
    [/مفعول\s*به\s*ثاني/, 'مفعول به ثاني'],
    [/فاعل\s*مرفوع/, 'فاعل'],
    [/اسم\s*[""]إن[""]\s*منصوب|اسم\s*إن\s*منصوب/, 'اسم إن'],
    [/خبر\s*[""]إن[""]|خبر\s*إن\s*مرفوع/, 'خبر إن'],
    [/حرف\s*شرط\s*وتفصيل/, 'حرف شرط وتفصيل'],
    [/اسم\s*موصول/, 'اسم موصول'],
    [/جار\s*ومجرور/, 'جار ومجرور'],
    [/حرف\s*استقبال/, 'حرف استقبال'],
    [/حرف\s*حصر/, 'حرف حصر'],
    [/حرف\s*نفي\s*لا\s*عمل/, 'حرف نفي'],
    [/حرف\s*نفي\s*لا\s*محل/, 'حرف نفي'],
    [/نائب\s*فاعل/, 'نائب فاعل'],
    [/مقسم\s*به/, 'مقسم به'],
    [/صلة\s*الموصول/, 'صلة الموصول'],
    [/ضمير\s*متصل/, 'ضمير متصل'],
    [/اللام\s*:\s*حرف\s*للتوكيد/, 'لام التوكيد'],
    [/لام\s*للتوكيد/, 'لام التوكيد'],
    [/اسم\s*إن\s*مؤخر/, 'اسم إن'],
    [/حرف\s*جر(?!\s*للقسم)/, 'حرف جر'],
  ];
  const out = [];
  const seen = new Set();
  for (const [re, label] of rules) {
    if (re.test(b) && !seen.has(label)) {
      seen.add(label);
      out.push(label);
    }
  }
  return out.slice(0, 8);
}

function cleanRevisionSummary(raw) {
  let s = String(raw)
    .replace(/[\uFD3E\uFD3F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  s = s.replace(/أعربت في الآية[^.]*\.?\s*/g, '');
  s = s.replace(/تعرب إعراب الآية[^.]*\.?\s*/g, '');
  s = s.replace(/معطوفة بالواو على الآية[^.]*\.?\s*/g, '');
  s = s.replace(/\s*وهو\s*:\s*«\s*/g, ' «');
  s = s.replace(/^[,؛\s«]+/, '');
  s = s.replace(/^«\s*[,،.\s]+/, '«');
  s = s.replace(/«\s*,+/g, '«');
  s = s.replace(/\s*&\s*/g, ' ');
  if (s.length > 104) s = `${s.slice(0, 101)}…`;
  return s;
}

function tagsArFromRow(row) {
  const parts = row.analysisParts || [];
  const blob = rowAnalysisBlob(row);
  const wawFaa = extractWawFaaLabels(blob);

  const out = [];
  for (const x of wawFaa) {
    if (!out.includes(x)) out.push(x);
  }

  let linkCount = 0;
  for (const p of parts) {
    if (p.type !== 'link' || !p.text) continue;
    linkCount += 1;
    const t = String(p.text)
      .trim()
      .replace(/\s+/g, ' ');
    if (t && !out.includes(t)) out.push(t);
  }

  if (linkCount === 0) {
    const tx = parts.find((p) => p.type === 'text' && p.text && String(p.text).trim().length > 8);
    if (tx) {
      const raw = String(tx.text).trim().replace(/\s+/g, ' ');
      for (const h of extractGrammarHeadlines(raw)) {
        if (!out.includes(h)) out.push(h);
      }
      const summary = cleanRevisionSummary(raw);
      if (summary && !out.includes(summary)) out.push(summary);
    }
  }

  return out.slice(0, 14);
}

function rowToPart(row) {
  const seg = row.segment;
  if (!seg || seg.trim() === '—' || seg.trim() === '-') return null;
  const blob = rowAnalysisBlob(row);
  const tagsAr = tagsArFromRow(row);
  let color = inferColor(row);
  if (color === 'mute') {
    const fb = inferColorFromBlob(blob);
    if (fb !== 'mute') color = fb;
  }
  return {
    word: seg,
    tagsAr,
    color,
    detailAr: detailArFromRow(row),
  };
}

/** Map concise headline chips → fully vocalized labels (same style as surahs with link pills). */
const SHORT_TO_FORMAL_REVISION_AR = {
  'ظرف زمان': 'ظَرْفُ زَمَانٍ',
  'فعل مضارع': 'فِعْلٌ مُضَارِعٌ',
  'فعل ماضٍ': 'فِعْلٌ مَاضٍ',
  'فعل أمر': 'فِعْلُ أَمْرٍ',
  'مفعول به': 'مَفْعُولٌ بِهٍ',
  'مفعول به ثاني': 'مَفْعُولٌ بِهٍ ثَانٍ',
  'اسم إن': 'اسْمُ إِنَّ',
  'خبر إن': 'خَبَرُ إِنَّ',
  'حرف شرط وتفصيل': 'حَرْفُ شَرْطٍ وَتَفْصِيلٍ',
  'اسم موصول': 'اسْمٌ مَوْصُولٌ',
  'جار ومجرور': 'جَارٌ وَمَجْرُورٌ',
  'حرف جر': 'جَارٌّ',
  'حرف استقبال': 'حَرْفُ اسْتِقْبَالٍ',
  'حرف حصر': 'حَرْفُ حَصْرٍ',
  'حرف نفي': 'حَرْفُ نَفْيٍ',
  'نائب فاعل': 'نَائِبُ فَاعِلٍ',
  'مقسم به': 'مُقْسَمٌ بِهِ',
  'صلة الموصول': 'صِلَةُ الْمَوْصُولِ',
  'ضمير متصل': 'ضَمِيرٌ مُتَّصِلٌ',
  'لام التوكيد': 'لَامُ التَّوْكِيدِ',
  فاعل: 'فَاعِلٌ',
  مبتدأ: 'مُبْتَدَأٌ',
  'خبر مقدم': 'خَبَرٌ مُقَدَّمٌ',
  'حرف توكيد مشبه بالفعل': 'حَرْفُ تَوْكِيدٍ مُشَبَّهٌ بِالْفِعْلِ',
  'حرف نصب توكيد مشبه بالفعل': 'حَرْفُ نَصْبٍ وَتَوْكِيدٍ مُشَبَّهٌ بِالْفِعْلِ',
};

function expandOneRevisionTag(tag) {
  const t = String(tag).trim();
  if (!t) return [];
  if (t === 'واو قسم') return ['الْوَاوُ', 'حَرْفُ جَرٍّ لِلْقَسْمِ'];
  if (t === 'واو عطف') return ['الْوَاوُ', 'حَرْفُ عَطْفٍ'];
  if (t === 'واو استئناف') return ['الْوَاوُ', 'حَرْفُ اسْتِئْنَافٍ'];
  if (t === 'فاء استئناف') return ['الْفَاءُ', 'حَرْفُ اسْتِئْنَافٍ'];
  if (t === 'فاء جواب شرط') return ['الْفَاءُ', 'حَرْفُ جَوَابِ شَرْطٍ'];
  if (t === 'فاء عطف') return ['الْفَاءُ', 'حَرْفُ عَطْفٍ'];
  if (SHORT_TO_FORMAL_REVISION_AR[t]) return [SHORT_TO_FORMAL_REVISION_AR[t]];
  return [t];
}

/**
 * Revision JSON only: match surahs that use link pills (formal Arabic, no long prose blobs).
 * Drops auto-summary sentences; expands واو/فاء shortcuts; vocalizes headline chips.
 */
function normalizeRevisionTagsAr(tagsAr) {
  const out = [];
  const seen = new Set();
  for (const raw of tagsAr || []) {
    const s = String(raw).trim();
    if (!s) continue;
    if (s.length > 88) continue;
    if (/[.。]\s*$/.test(s)) continue;
    if (/[:…]/.test(s) && s.length > 42) continue;
    for (const piece of expandOneRevisionTag(s)) {
      const p = piece.trim();
      if (!p || seen.has(p)) continue;
      seen.add(p);
      out.push(p);
    }
  }
  return out.slice(0, 14);
}

function ayahToRevisionOnly(entry) {
  const parts = [];
  for (const row of entry.rows || []) {
    if (!row.segment) continue;
    if (row.segment.trim() === '—' || row.segment.trim() === '-') continue;
    const p = rowToPart(row);
    if (p) {
      const piece = {
        word: p.word,
        tagsAr: normalizeRevisionTagsAr(p.tagsAr),
        color: p.color,
      };
      const det = p.detailAr && String(p.detailAr).trim();
      if (det) piece.detailAr = det;
      parts.push(piece);
    }
  }
  return {
    num: entry.ayah,
    arabic: entry.ayahText,
    parts,
  };
}

function main() {
  const allAyahs = loadAyahs();
  const manifest = { version: 1, surahs: [] };
  let prevManifestByNum = new Map();
  try {
    const prev = JSON.parse(fs.readFileSync(path.join(ROOT, 'surah-walkthrough-manifest.json'), 'utf8'));
    for (const s of prev.surahs || []) {
      if (s && s.num != null) prevManifestByNum.set(s.num, s);
    }
  } catch {
    /* first run or invalid */
  }

  for (let surahNum = FIRST_SURAH; surahNum <= LAST_SURAH; surahNum++) {
    const meta = SURAH_META[surahNum];
    if (!meta) continue;
    const subset = allAyahs.filter((a) => a.surah === surahNum).sort((x, y) => x.ayah - y.ayah);
    if (!subset.length) {
      console.warn('No data for surah', surahNum);
      continue;
    }
    const first = subset[0];
    const revWalk = subset.map(ayahToRevisionOnly);
    const revPath = path.join(ROOT, `surah-${meta.slug}-iraab-revision.json`);
    fs.writeFileSync(revPath, JSON.stringify(revWalk, null, 2) + '\n', 'utf8');
    console.log('Wrote', path.basename(revPath), revWalk.length, 'ayat');

    const prev = prevManifestByNum.get(surahNum);
    manifest.surahs.push({
      num: surahNum,
      slug: meta.slug,
      titleEn: meta.titleEn,
      titleAr: first.surahNameAr,
      revisionUrl: `surah-${meta.slug}-iraab-revision.json`,
      ayahCount: revWalk.length,
      ...(prev && prev.revisionInfographicUrl ? { revisionInfographicUrl: prev.revisionInfographicUrl } : {}),
    });
  }

  manifest.surahs.sort((a, b) => a.num - b.num);
  fs.writeFileSync(path.join(ROOT, 'surah-walkthrough-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log('Wrote surah-walkthrough-manifest.json');
}

main();
