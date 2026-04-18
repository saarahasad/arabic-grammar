#!/usr/bin/env node
/**
 * Batch-fill optional `analysisEn` on each row in `quran-iraab-data.js` using Anthropic Claude.
 *
 * Prerequisites: Node 18+ (global fetch), env `ANTHROPIC_API_KEY` (or put `ANTHROPIC_API_KEY=...` in `.env` at repo root).
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/fill-quran-iraab-analysis-en.mjs --dry-run
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/fill-quran-iraab-analysis-en.mjs --limit 5
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/fill-quran-iraab-analysis-en.mjs --only-id 109-1
 *
 * Options:
 *   --dry-run          Count rows missing analysisEn; do not call the API or write the file.
 *   --limit N          Process at most N rows (after --only-id filter).
 *   --only-id ID       Only rows under this āyah id (e.g. 109-2).
 *   --model MODEL      Claude model id (default: claude-3-5-haiku-20241022).
 *   --delay-ms MS      Pause between API calls (default: 400).
 *
 * Writes `quran-iraab-data.js` from scratch (keeps the leading comment block; replaces the array assignment).
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_FILE = join(ROOT, 'quran-iraab-data.js');

const DEFAULT_MODEL = 'claude-3-5-haiku-20241022';
const ANTHROPIC_VERSION = '2023-06-01';

/** Load `KEY=value` lines from `.env` in the repo root (no dependency on dotenv). */
function loadEnvFileIfPresent() {
  try {
    const p = join(ROOT, '.env');
    const raw = readFileSync(p, 'utf8');
    raw.split('\n').forEach((line) => {
      const s = line.trim();
      if (!s || s.startsWith('#')) return;
      const eq = s.indexOf('=');
      if (eq < 1) return;
      const key = s.slice(0, eq).trim();
      let val = s.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (key && (process.env[key] == null || process.env[key] === '')) {
        process.env[key] = val;
      }
    });
  } catch {
    /* no .env */
  }
}

function parseArgs(argv) {
  const out = {
    dryRun: false,
    limit: null,
    onlyId: null,
    model: DEFAULT_MODEL,
    delayMs: 400,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--limit' && argv[i + 1]) {
      out.limit = Math.max(0, parseInt(argv[++i], 10) || 0);
    } else if (a === '--only-id' && argv[i + 1]) {
      out.onlyId = String(argv[++i]).trim();
    } else if (a === '--model' && argv[i + 1]) {
      out.model = String(argv[++i]).trim();
    } else if (a === '--delay-ms' && argv[i + 1]) {
      out.delayMs = Math.max(0, parseInt(argv[++i], 10) || 0);
    } else if (a === '--help' || a === '-h') {
      console.log(`See script header in scripts/fill-quran-iraab-analysis-en.mjs`);
      process.exit(0);
    }
  }
  return out;
}

async function loadQuranIraabAyah() {
  const code = readFileSync(DATA_FILE, 'utf8');
  const tmp = join(tmpdir(), `qiraab-${randomBytes(8).toString('hex')}.mjs`);
  writeFileSync(tmp, `const window = {};\n${code}\nexport default window.QURAN_IRAAB_AYAH;\n`, 'utf8');
  try {
    const url = pathToFileURL(tmp).href;
    const mod = await import(url);
    return mod.default;
  } finally {
    try {
      unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function rowArabicPlain(row) {
  if (!row || !row.analysisParts) return '';
  return row.analysisParts
    .map((p) => {
      if (p.type === 'link') return p.text != null ? String(p.text) : '';
      if (p.type === 'text') return p.text != null ? String(p.text) : '';
      return '';
    })
    .join('');
}

function buildPrompt(entry, row) {
  const ref = `${entry.id} — ${entry.surahNameAr || ''}`.trim();
  return `You are an Arabic grammar tutor. Given the Qurʾānic segment and its full iʿrāb analysis in Arabic, write a concise English explanation (one or two short sentences) that mirrors the same grammatical points for a student. Use standard terms (nominative, accusative, genitive, jussive, imperative, etc.) where helpful. Do not repeat the verse translation; explain only the iʿrāb. Output plain English only — no quotes around the whole answer, no markdown.

Reference: ${ref}
Segment (Arabic): ${row.segment || ''}
Arabic iʿrāb: ${rowArabicPlain(row)}`;
}

async function callClaude(apiKey, model, userText) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model,
      max_tokens: 320,
      messages: [{ role: 'user', content: userText }],
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${errText.slice(0, 500)}`);
  }
  const data = await res.json();
  const block = data.content && data.content[0];
  const text = block && block.text != null ? String(block.text).trim() : '';
  return text.replace(/^["“]|["”]$/g, '').trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function writeDataFile(data) {
  const raw = readFileSync(DATA_FILE, 'utf8');
  const key = 'window.QURAN_IRAAB_AYAH';
  const idx = raw.indexOf(key);
  if (idx < 0) throw new Error(`Could not find ${key} in quran-iraab-data.js`);
  const header = raw.slice(0, idx).trimEnd();
  const out = `${header}\n${key} = ${JSON.stringify(data, null, 2)};\n`;
  writeFileSync(DATA_FILE, out, 'utf8');
}

function collectTasks(data, opts) {
  const tasks = [];
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    if (!entry || !entry.rows) continue;
    if (opts.onlyId && String(entry.id) !== opts.onlyId) continue;
    for (let j = 0; j < entry.rows.length; j++) {
      const row = entry.rows[j];
      if (!row || !row.analysisParts || !row.analysisParts.length) continue;
      const has = row.analysisEn != null && String(row.analysisEn).trim() !== '';
      if (!has) tasks.push({ entryIndex: i, rowIndex: j });
    }
  }
  return tasks;
}

async function main() {
  loadEnvFileIfPresent();
  const opts = parseArgs(process.argv);
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  const data = await loadQuranIraabAyah();
  const tasks = collectTasks(data, opts);

  if (opts.dryRun) {
    console.log(`Rows missing analysisEn: ${tasks.length}`);
    if (opts.onlyId) console.log(`(filtered to id ${opts.onlyId})`);
    return;
  }

  if (!apiKey) {
    console.error('Set ANTHROPIC_API_KEY in the environment.');
    process.exit(1);
  }

  let toRun = tasks;
  if (opts.limit != null && opts.limit >= 0) {
    toRun = tasks.slice(0, opts.limit);
  }

  console.log(`Filling ${toRun.length} row(s) with model ${opts.model}…`);

  for (let k = 0; k < toRun.length; k++) {
    const t = toRun[k];
    const entry = data[t.entryIndex];
    const row = entry.rows[t.rowIndex];
    const prompt = buildPrompt(entry, row);
    try {
      const en = await callClaude(apiKey, opts.model, prompt);
      if (!en) throw new Error('Empty response');
      row.analysisEn = en;
      console.log(`OK ${entry.id} [${t.rowIndex}] ${(row.segment || '').slice(0, 40)}…`);
    } catch (e) {
      console.error(`FAIL ${entry.id} row ${t.rowIndex}:`, e.message || e);
      process.exit(1);
    }
    if (k < toRun.length - 1 && opts.delayMs > 0) await sleep(opts.delayMs);
  }

  writeDataFile(data);
  console.log(`Wrote ${DATA_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
