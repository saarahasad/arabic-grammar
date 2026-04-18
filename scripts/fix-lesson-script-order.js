#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'lessons');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const fp = path.join(dir, f);
  let s = fs.readFileSync(fp, 'utf8');
  const old = `  <script src="../app.js?v=40"></script>
  <script src="../lesson-content.js?v=40"></script>`;
  const neu = `  <script src="../lesson-content.js?v=40"></script>
  <script src="../app.js?v=40"></script>`;
  if (s.includes(old)) {
    s = s.replace(old, neu);
    fs.writeFileSync(fp, s);
  }
}
