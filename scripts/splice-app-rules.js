#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const appPath = path.join(ROOT, 'app.js');
const metaPath = path.join(__dirname, 'RULES-meta.generated.js');
let app = fs.readFileSync(appPath, 'utf8');
const meta = fs.readFileSync(metaPath, 'utf8');
const start = app.indexOf('const ACCUSATIVE_PARTICLES_MUDARI_CONTENT');
const end = app.indexOf('const panel = document.getElementById');
if (start === -1 || end === -1) process.exit(1);
app = app.slice(0, start) + meta.trim() + '\n\n' + app.slice(end);
fs.writeFileSync(appPath, app, 'utf8');
console.log('Spliced app.js with RULES meta only.');
