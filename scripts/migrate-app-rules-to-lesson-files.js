#!/usr/bin/env node
/**
 * One-time migration: evaluates RULES from app.js, writes lessons/<rule>.html
 * with main column HTML, prints a replacement RULES block (titles only).
 *
 * Run: node scripts/migrate-app-rules-to-lesson-files.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const APP = path.join(ROOT, 'app.js');
const LESSONS = path.join(ROOT, 'lessons');
const ASSET_V = '40';

const src = fs.readFileSync(APP, 'utf8');
const start = src.indexOf('const ACCUSATIVE_PARTICLES_MUDARI_CONTENT');
const end = src.indexOf('const panel = document.getElementById');
if (start === -1 || end === -1) {
  console.error('Could not find ACCUSATIVE block or panel declaration — app.js layout changed.');
  process.exit(1);
}

const evalBlock = src.slice(start, end);
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(`${evalBlock}\nvar __RULES_EXPORT = RULES;`, sandbox);
const RULES = sandbox.__RULES_EXPORT;
if (!RULES) {
  console.error('RULES did not export — check vm eval.');
  process.exit(1);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlAttr(str) {
  return escapeHtml(str).replace(/'/g, '&#39;');
}

function getRuleTopic(ruleId) {
  if (ruleId === 'coming-soon' || ruleId === 'intro' || ruleId === 'kalimaat' || ruleId === 'words') {
    return 'topic';
  }
  if (ruleId.startsWith('irab')) return 'irab';
  if (ruleId === 'verb' || ruleId.startsWith('verb-')) return 'verb';
  if (ruleId === 'harf' || ruleId.startsWith('harf-') || ruleId === 'munada') return 'harf';
  if (
    ruleId === 'sentence-structure' ||
    ruleId === 'nominal-sentence' ||
    ruleId === 'verbal-sentence' ||
    ruleId === 'inna-sisters' ||
    ruleId === 'kaana-sisters' ||
    ruleId === 'fael' ||
    ruleId === 'mafool' ||
    ruleId === 'verb-passive-overview' ||
    ruleId === 'istithna'
  ) {
    return 'sentence';
  }
  return 'noun';
}

function buildMainInner(ruleId, rule) {
  const topic = getRuleTopic(ruleId);
  const safeRule = escapeHtmlAttr(ruleId);
  const safeTopic = escapeHtmlAttr(topic);
  return `
      <h2>${escapeHtml(rule.title)}</h2>
      ${rule.arabicTitle ? `<p class="arabic-title">${escapeHtml(rule.arabicTitle)}</p>` : ''}
      <div class="rule-body textbook-lesson" data-rule="${safeRule}" data-topic="${safeTopic}">${rule.content}</div>
  `;
}

function lessonPageHtml(ruleId, title, mainInner) {
  const t = escapeHtml(title);
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t} — Arabic Grammar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css?v=${ASSET_V}">
  <link rel="stylesheet" href="../lesson-khan.css?v=${ASSET_V}">
</head>
<body class="lesson-khan" data-rule="${escapeHtmlAttr(ruleId)}" data-lesson-static="true">
  <header class="site-header" role="banner">
    <nav class="site-nav" aria-label="Site">
      <a href="../index.html" class="site-nav__brand">Arabic Grammar</a>
      <div class="site-nav__links">
        <a href="../index.html" class="site-nav__link">Course home</a>
        <a href="../map.html" class="site-nav__link">Grammar map</a>
      </div>
    </nav>
  </header>

  <div class="lesson-khan-shell" id="lesson-khan-shell">
    <aside class="lesson-sidebar" id="lesson-sidebar" aria-label="Lesson outline">
      <div class="lesson-sidebar__header">
        <span class="lesson-sidebar__book" aria-hidden="true">📘</span>
        <span class="lesson-sidebar__course">Arabic grammar</span>
      </div>
      <p class="lesson-sidebar__crumb" id="lesson-breadcrumb">Course: Arabic grammar</p>
      <p class="lesson-sidebar__current-unit" id="lesson-unit-label"></p>
      <div class="lesson-sidebar__lesson-nav">
        <a class="lesson-nav-arrow" id="lesson-nav-prev" href="#" aria-label="Previous lesson">‹</a>
        <span class="lesson-sidebar__lesson-title" id="lesson-current-short">Lesson</span>
        <a class="lesson-nav-arrow" id="lesson-nav-next" href="#" aria-label="Next lesson">›</a>
      </div>
      <div class="lesson-sidebar__scroll" id="lesson-sidebar-inner"></div>
      <footer class="lesson-sidebar__footer">
        <p class="lesson-sidebar__mini-crumb">Arabic Grammar › Course › <span id="lesson-footer-unit">Unit</span></p>
        <p class="lesson-sidebar__legal"><a href="../index.html">Home</a></p>
      </footer>
    </aside>

    <button type="button" class="lesson-sidebar-toggle" id="lesson-sidebar-toggle" aria-expanded="true" aria-controls="lesson-sidebar" title="Collapse sidebar">
      <span aria-hidden="true">‹</span>
    </button>

    <main class="lesson-main" id="lesson-main">
      <div class="lesson-main__inner panel-content" id="lesson-main-inner">${mainInner}
      </div>
    </main>
  </div>

  <footer class="lesson-next-bar" id="lesson-next-bar" hidden>
    <a class="lesson-next-bar__btn" id="lesson-next-link" href="../index.html">Up next</a>
  </footer>

  <script src="../app.js?v=${ASSET_V}"></script>
  <script src="../lesson-content.js?v=${ASSET_V}"></script>
  <script src="../course-outline.js?v=${ASSET_V}"></script>
  <script src="../lesson-ui.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

if (!fs.existsSync(LESSONS)) fs.mkdirSync(LESSONS, { recursive: true });

const keys = Object.keys(RULES);
const metaLines = ['const RULES = {'];

for (const ruleId of keys) {
  const rule = RULES[ruleId];
  const mainInner = buildMainInner(ruleId, rule);
  const fp = path.join(LESSONS, `${ruleId}.html`);
  fs.writeFileSync(fp, lessonPageHtml(ruleId, rule.title, mainInner), 'utf8');

  const keyStr = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(ruleId) ? ruleId : JSON.stringify(ruleId);
  const titleJs = JSON.stringify(rule.title);
  const ar = rule.arabicTitle ? JSON.stringify(rule.arabicTitle) : '';
  if (ar) {
    metaLines.push(`  ${keyStr}: { title: ${titleJs}, arabicTitle: ${ar} },`);
  } else {
    metaLines.push(`  ${keyStr}: { title: ${titleJs} },`);
  }
}

metaLines.push('};');
const rulesReplacement = metaLines.join('\n');

const outMeta = path.join(ROOT, 'scripts', 'RULES-meta.generated.js');
fs.writeFileSync(outMeta, rulesReplacement + '\n', 'utf8');

console.log(`Wrote ${keys.length} files under lessons/ and ${outMeta}`);
console.log('Next: splice app.js: replace ACCUSATIVE…through closing RULES }; with RULES-meta.generated.js contents.');
