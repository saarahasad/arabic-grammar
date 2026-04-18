#!/usr/bin/env node
/**
 * Regenerates lessons/<rule>.html for every row in course-outline.js.
 * Run from repo root: node scripts/generate-lesson-pages.js
 *
 * Overwrites existing lessons/<rule>.html (does not touch _template.html).
 * If you hand-edit a lesson file, back it up or merge after re-running, or
 * extend the HTML template in this script instead.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const LESSONS = path.join(ROOT, 'lessons');
const ASSET_V = '40';

const code = fs.readFileSync(path.join(ROOT, 'course-outline.js'), 'utf8');
const ctx = { window: {} };
vm.runInNewContext(code, ctx);
const outline = ctx.window.COURSE_OUTLINE;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function pageHtml(rule, title) {
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
<body class="lesson-khan" data-rule="${escapeHtml(rule)}" data-lesson-static="true">
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
      <div class="lesson-main__inner panel-content" id="lesson-main-inner"></div>
    </main>
  </div>

  <footer class="lesson-next-bar" id="lesson-next-bar" hidden>
    <a class="lesson-next-bar__btn" id="lesson-next-link" href="../index.html">Up next</a>
  </footer>

  <script src="../lesson-content.js?v=${ASSET_V}"></script>
  <script src="../app.js?v=${ASSET_V}"></script>
  <script src="../course-outline.js?v=${ASSET_V}"></script>
  <script src="../lesson-ui.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

if (!fs.existsSync(LESSONS)) {
  fs.mkdirSync(LESSONS, { recursive: true });
}

let n = 0;
for (const unit of outline) {
  for (const l of unit.lessons) {
    const fp = path.join(LESSONS, `${l.rule}.html`);
    fs.writeFileSync(fp, pageHtml(l.rule, l.title), 'utf8');
    n++;
  }
}

console.log(`Wrote ${n} lesson pages under lessons/ (asset v=${ASSET_V}).`);
