/**
 * Qurʾān Iʿrāb — merges curated rows from `quran-iraab-data.js` with full āyāt 95–114 text
 * from `quran-text-96-114.js`, two-level navigation (surah → āyah), and unavailable state.
 * Choosing a surah shows **all** its āyāt in one scrollable column; the āyah menu (or ← / → keys)
 * moves within that surah and scrolls the active verse into view.
 * Per-word **Explanation** fields use `localStorage` (`quranIraabWordNotes`); the toolbar downloads a JSON backup.
 */
(function () {
  const IRAAB_UNAVAILABLE_EN = 'Irab is not available for this ayah.';

  /**
   * When false: hide English tied to curated iʿrāb data (`translationEn`, `analysisEn` / simple-en,
   * `promptEn`, beginner → glosses, scholar literal gloss + grammar-term `data-def`). Source objects
   * in `quran-iraab-data.js` are unchanged. Set to true to show that English again.
   */
  const SHOW_QURAN_IRAAB_ENGLISH = false;

  /** Extended Latin (transliteration) → plain A–Z / a–z. Arabic script is left unchanged. */
  function normalizeIraabEnglishToAscii(s) {
    if (s == null || s === '') return '';
    let t = String(s);
    t = t.replace(/[\u02BF\u02BE\u02BC\u02BB\u2018\u2019\u201A\u2032\u0060\u00B4\u02C8]/g, "'");
    t = t.replace(/[\u201C\u201D\u00AB\u00BB]/g, '"');
    t = t.replace(/[–—―]/g, '-');
    t = t.replace(/…/g, '...');
    const R = (ch) => {
      const c = ch.codePointAt(0);
      if ((c >= 0x0600 && c <= 0x06ff) || (c >= 0x0750 && c <= 0x077f) || (c >= 0x08a0 && c <= 0x08ff)) return ch;
      if (c >= 0xfb50 && c <= 0xfdff) return ch;
      if (c >= 0xfe70 && c <= 0xfefc) return ch;
      const map = {
        ā: 'a', Ā: 'A', à: 'a', Á: 'A', á: 'a', Ã: 'A', ã: 'a',
        ē: 'e', Ē: 'E', è: 'e', È: 'E', é: 'e', Ê: 'E', ë: 'e', Ë: 'E',
        ī: 'i', Ī: 'I', ï: 'i', Ì: 'I', í: 'i', ì: 'i', î: 'i', Ï: 'I',
        ō: 'o', Ō: 'O', Ò: 'O', ó: 'o', ö: 'o', Ö: 'O',
        ū: 'u', Ū: 'U', ù: 'u', Ù: 'U', ü: 'u', Ü: 'U', ú: 'u', Ú: 'U',
        ı: 'i', İ: 'I',
        ḥ: 'h', Ḥ: 'H', ḫ: 'h', Ḫ: 'H', ḩ: 'h', Ḩ: 'H', ḧ: 'h', Ḧ: 'H',
        ḍ: 'd', Ḍ: 'D', ḏ: 'd', Ḏ: 'D',
        ṭ: 't', Ṭ: 'T', ṯ: 't', Ṯ: 'T',
        ṣ: 's', Ṣ: 'S', ṡ: 's', Ṡ: 'S', š: 's', Š: 'S', ŝ: 's', Ŝ: 'S',
        ẓ: 'z', Ẓ: 'Z', ž: 'z', Ž: 'Z', ż: 'z', Ż: 'Z',
        ġ: 'g', Ġ: 'G', ǧ: 'g', Ǧ: 'G', ğ: 'g', Ğ: 'G', ģ: 'g', Ģ: 'G', ǥ: 'g', Ǥ: 'G',
        ṃ: 'm', Ṁ: 'M', ṅ: 'n', Ṅ: 'N', ń: 'n', Ń: 'N', ñ: 'n', Ñ: 'N',
        ṛ: 'r', Ṛ: 'R', ṙ: 'r', Ṙ: 'R', ř: 'r', Ř: 'R',
        ḷ: 'l', Ḷ: 'L', ł: 'l', Ł: 'L', ļ: 'l', Ļ: 'L', ľ: 'l', Ľ: 'L',
        ß: 'ss', æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE', ø: 'o', Ø: 'O', å: 'a', Å: 'A',
        ç: 'c', Ç: 'C', ć: 'c', Ć: 'C', č: 'c', Č: 'C', ĉ: 'c', Ĉ: 'C',
        ð: 'dh', Ð: 'Dh', þ: 'th', Þ: 'Th',
        ḅ: 'b', Ḅ: 'B', ḿ: 'm', Ḿ: 'M', ṕ: 'p', Ṕ: 'P', ḱ: 'k', Ḱ: 'K',
        ḳ: 'k', Ḳ: 'K', ḵ: 'k', Ḵ: 'K', ᶃ: 'g',
        ẖ: 'h', ỳ: 'y', Ỳ: 'Y', ý: 'y', Ý: 'Y', ŷ: 'y', Ŷ: 'Y', ÿ: 'y', Ÿ: 'Y',
        ạ: 'a', Ạ: 'A', ệ: 'e', Ề: 'E', ị: 'i', Ị: 'I', ọ: 'o', Ọ: 'O', ụ: 'u', Ụ: 'U',
      };
      if (Object.prototype.hasOwnProperty.call(map, ch)) return map[ch];
      if (c < 0x7f) return ch;
      return ch;
    };
    let out = '';
    for (const ch of t) {
      out += R(ch);
    }
    return out;
  }
  const IRAAB_UNAVAILABLE_AR = 'الْإِعْرَابُ غَيْرُ مُتَوَفَّرٍ لِهَذِهِ الْآيَةِ';
  const IRAAB_PROMPTS_STORAGE_KEY = 'quranIraabShowPrompts';
  /** `'beginner'` (default) or `'scholar'` — color legend, literal gloss line, floating term tooltips. */
  const QG_MODE_STORAGE_KEY = 'quranIraabGrammarMode';
  /** Legacy: `quranIraabDirectIraab` === '1' meant direct (no prompts). Migrated once to `quranIraabShowPrompts`. */
  const IRAAB_LEGACY_DIRECT_KEY = 'quranIraabDirectIraab';
  const WORD_NOTES_STORAGE_KEY = 'quranIraabWordNotes';

  function wordNoteStorageKey(ayahId, rowIndex) {
    return String(ayahId) + '::' + String(rowIndex);
  }

  function readWordNotesMap() {
    try {
      const raw = localStorage.getItem(WORD_NOTES_STORAGE_KEY);
      if (!raw) return {};
      const o = JSON.parse(raw);
      return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    } catch (e) {
      return {};
    }
  }

  function writeWordNotesMap(map) {
    try {
      localStorage.setItem(WORD_NOTES_STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
      /* ignore */
    }
  }

  function getWordNote(ayahId, rowIndex) {
    const v = readWordNotesMap()[wordNoteStorageKey(ayahId, rowIndex)];
    return typeof v === 'string' ? v : '';
  }

  function setWordNote(ayahId, rowIndex, text) {
    const m = readWordNotesMap();
    const key = wordNoteStorageKey(ayahId, rowIndex);
    const t = String(text);
    if (t.trim() === '') {
      delete m[key];
    } else {
      m[key] = t;
    }
    writeWordNotesMap(m);
  }

  /**
   * Renders saved explanation: lines starting with `-` become a bulleted list (round markers, card theme); otherwise one pre-wrap block.
   */
  function renderWordNoteDisplay(host, raw) {
    while (host.firstChild) {
      host.removeChild(host.firstChild);
    }
    const s = String(raw);
    if (s.trim() === '') {
      return;
    }
    const lines = s.split(/\r?\n/);
    const BULLET = /^\s*-\s*(.*)$/;
    const hasAnyBullet = lines.some(function (ln) {
      return ln.trim() !== '' && BULLET.test(ln);
    });

    if (!hasAnyBullet) {
      const p = document.createElement('p');
      p.className = 'qg-word-card__note-para';
      p.textContent = s;
      host.appendChild(p);
      return;
    }

    const listBuf = [];

    function flushList() {
      if (listBuf.length === 0) {
        return;
      }
      const ul = document.createElement('ul');
      ul.className = 'qg-word-card__note-bullets';
      listBuf.forEach(function (t) {
        const li = document.createElement('li');
        li.textContent = t;
        ul.appendChild(li);
      });
      host.appendChild(ul);
      listBuf.length = 0;
    }

    function addParagraph(t) {
      if (!t) {
        return;
      }
      const p = document.createElement('p');
      p.className = 'qg-word-card__note-para';
      p.textContent = t;
      host.appendChild(p);
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') {
        continue;
      }
      const m = line.match(BULLET);
      if (m) {
        listBuf.push(m[1].length ? m[1] : '\u2013');
      } else {
        flushList();
        addParagraph(line);
      }
    }
    flushList();
  }

  function wordNoteFieldHtml(entryId, rowIndex) {
    const saved = getWordNote(entryId, rowIndex);
    const has = saved.trim() !== '';
    return `
    <div class="qg-word-card__note${has ? ' qg-word-card__note--has-note' : ''}" data-word-note-root>
      <div class="qg-word-card__note-view" data-word-note-view${has ? '' : ' hidden'}>
        <div class="qg-word-card__note-text" data-word-note-text></div>
        <button type="button" class="qg-word-card__note-edit">Edit</button>
      </div>
      <textarea class="qg-word-card__note-input" data-word-note data-note-ayah="${escapeHtml(
        entryId
      )}" data-note-row="${rowIndex}" rows="2" spellcheck="true" aria-label="Your note for this word" placeholder="Add a note…"></textarea>
    </div>`;
  }

  function wireWordNotes(container) {
    if (!container) return;
    const timers = new WeakMap();
    container.querySelectorAll('[data-word-note-root]').forEach(function (root) {
      const ta = root.querySelector('[data-word-note]');
      const view = root.querySelector('[data-word-note-view]');
      const textEl = root.querySelector('[data-word-note-text]');
      const editBtn = root.querySelector('.qg-word-card__note-edit');
      if (!ta || !view || !textEl) return;
      const ayahId = ta.getAttribute('data-note-ayah');
      const rowStr = ta.getAttribute('data-note-row');
      if (ayahId == null || rowStr == null) return;
      const rowIndex = Number(rowStr);
      if (Number.isNaN(rowIndex)) return;

      ta.value = getWordNote(ayahId, rowIndex);

      function applyModeFromValue() {
        const v = ta.value;
        if (v.trim() !== '') {
          renderWordNoteDisplay(textEl, v);
          root.classList.add('qg-word-card__note--has-note');
          view.removeAttribute('hidden');
        } else {
          renderWordNoteDisplay(textEl, '');
          root.classList.remove('qg-word-card__note--has-note');
          view.setAttribute('hidden', '');
        }
      }

      applyModeFromValue();

      function openEditor() {
        root.classList.remove('qg-word-card__note--has-note');
        view.setAttribute('hidden', '');
        window.setTimeout(function () {
          ta.focus();
          if (ta.setSelectionRange) {
            const len = ta.value.length;
            ta.setSelectionRange(len, len);
          }
        }, 0);
      }

      if (editBtn) {
        editBtn.addEventListener('click', function (e) {
          e.preventDefault();
          openEditor();
        });
      }

      ta.addEventListener('input', function () {
        let timer = timers.get(ta);
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(function () {
          setWordNote(ayahId, rowIndex, ta.value);
        }, 320);
        timers.set(ta, timer);
      });
      ta.addEventListener('blur', function () {
        setWordNote(ayahId, rowIndex, ta.value);
        applyModeFromValue();
      });
    });
  }

  function flushWordNotesFromDom() {
    const detail = document.getElementById('quran-iraab-detail');
    if (!detail) return;
    detail.querySelectorAll('[data-word-note]').forEach(function (ta) {
      const ayahId = ta.getAttribute('data-note-ayah');
      const rowStr = ta.getAttribute('data-note-row');
      if (ayahId == null || rowStr == null) return;
      const rowIndex = Number(rowStr);
      if (Number.isNaN(rowIndex)) return;
      setWordNote(ayahId, rowIndex, ta.value);
    });
  }

  function downloadAyahNotesBackup(ayahList) {
    flushWordNotesFromDom();
    const map = readWordNotesMap();
    const notes = {};
    const words = [];
    Object.keys(map).forEach(function (k) {
      const text = map[k];
      if (typeof text !== 'string' || text.trim() === '') return;
      const sep = k.lastIndexOf('::');
      if (sep < 0) return;
      const ayahId = k.slice(0, sep);
      const rowIndex = Number(k.slice(sep + 2));
      if (Number.isNaN(rowIndex)) return;
      notes[k] = text;
      const entry = ayahList.find(function (a) {
        return a.id === ayahId;
      });
      const segment =
        entry && entry.rows && entry.rows[rowIndex] ? entry.rows[rowIndex].segment : null;
      words.push({
        ayahId: ayahId,
        wordIndex: rowIndex,
        segment: segment,
        surah: entry ? entry.surah : null,
        ayah: entry ? entry.ayah : null,
        surahNameAr: entry ? entry.surahNameAr : null,
        note: text,
      });
    });
    words.sort(function (a, b) {
      const sa = a.surah != null ? a.surah : 999;
      const sb = b.surah != null ? b.surah : 999;
      if (sa !== sb) return sa - sb;
      const aa = a.ayah != null ? a.ayah : 0;
      const ab = b.ayah != null ? b.ayah : 0;
      if (aa !== ab) return aa - ab;
      return (a.wordIndex || 0) - (b.wordIndex || 0);
    });
    const payload = {
      format: 'quran-iraab-notes-v2',
      exportedAt: new Date().toISOString(),
      notes: notes,
      words: words,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const d = new Date();
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    a.href = url;
    a.download = 'quran-iraab-notes-' + y + '-' + mo + '-' + day + '.json';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function migrateLegacyIraabDirectStorage() {
    try {
      const legacy = localStorage.getItem(IRAAB_LEGACY_DIRECT_KEY);
      if (legacy != null && localStorage.getItem(IRAAB_PROMPTS_STORAGE_KEY) == null) {
        localStorage.setItem(IRAAB_PROMPTS_STORAGE_KEY, legacy === '1' ? '0' : '1');
        localStorage.removeItem(IRAAB_LEGACY_DIRECT_KEY);
      }
    } catch (e) {
      /* ignore */
    }
  }

  /** `true` = show think-first prompts; default (missing key) = `false` (direct Iʿrāb only). */
  function readIraabShowPrompts() {
    try {
      return localStorage.getItem(IRAAB_PROMPTS_STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function writeIraabShowPrompts(show) {
    try {
      localStorage.setItem(IRAAB_PROMPTS_STORAGE_KEY, show ? '1' : '0');
    } catch (e) {
      /* ignore */
    }
    document.documentElement.classList.toggle('quran-iraab--direct-iraab', !show);
  }

  function readQuranGrammarMode() {
    try {
      return localStorage.getItem(QG_MODE_STORAGE_KEY) === 'scholar' ? 'scholar' : 'beginner';
    } catch (e) {
      return 'beginner';
    }
  }

  function writeQuranGrammarMode(mode) {
    const m = mode === 'scholar' ? 'scholar' : 'beginner';
    try {
      localStorage.setItem(QG_MODE_STORAGE_KEY, m);
    } catch (e) {
      /* ignore */
    }
    applyGrammarModeClass();
  }

  function applyGrammarModeClass() {
    const scholar = readQuranGrammarMode() === 'scholar';
    document.documentElement.classList.toggle('quran-iraab--scholar', scholar);
    document.documentElement.classList.toggle('quran-iraab--beginner', !scholar);
  }

  const QG_THEMES = ['qg-theme--amber', 'qg-theme--blue', 'qg-theme--green'];

  /** Latin surah names for verse reference line (Juz ʿAmma 95–114). */
  const SURAH_REF_LATIN = {
    95: 'AT-TIN',
    96: 'AL-ALAQ',
    97: 'AL-QADR',
    98: 'AL-BAYYINAH',
    99: 'AZ-ZALZALAH',
    100: 'AL-ADIYAT',
    101: 'AL-QARIAH',
    102: 'AT-TAKATHUR',
    103: 'AL-ASR',
    104: 'AL-HUMAZAH',
    105: 'AL-FIL',
    106: 'QURAYSH',
    107: 'AL-MAUN',
    108: 'AL-KAWTHAR',
    109: 'AL-KAFIRUN',
    110: 'AN-NASR',
    111: 'AL-MASAD',
    112: 'AL-IKHLAS',
    113: 'AL-FALAQ',
    114: 'AN-NAAS',
  };

  function latinSurahRefLine(surah, ayah) {
    const name = SURAH_REF_LATIN[surah] || `SURAH ${surah}`;
    return `${name} · ${ayah}`;
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function scholarAnnotateTerms(html, analysisEn) {
    if (html == null || html === '') return '';
    const def = escapeAttr(String(analysisEn || ''));
    return String(html).replace(
      /<span style="color:\s*([^;]+);\s*font-weight:\s*500">([^<]*)<\/span>/gi,
      function (_full, _color, inner) {
        return (
          '<span class="irab-term" data-term="' +
          escapeAttr(inner) +
          '" data-roman="" data-def="' +
          def +
          '">' +
          inner +
          '</span>'
        );
      }
    );
  }

  function literalGlossLine(row) {
    const s = effectiveAnalysisEn(row);
    if (!s) return '';
    const dot = s.indexOf('.');
    const cut = dot >= 0 ? s.slice(0, dot) : s;
    return '→ ' + cut;
  }

  function simpleEnglishLine(row) {
    const s = effectiveAnalysisEn(row);
    if (!s) return '';
    const dot = s.indexOf('.');
    return dot >= 0 ? s.slice(0, dot + 1) : s;
  }

  function pillLabelForRow(row) {
    const rule = firstLinkRuleInRow(row && row.analysisParts);
    if (rule) {
      const pair = lessonTitlePairForRule(rule);
      const raw = (pair.en && String(pair.en).trim()) || rule;
      return normalizeIraabEnglishToAscii(raw);
    }
    return 'Grammar';
  }

  function renderEnglishCardPanel(row) {
    if (!SHOW_QURAN_IRAAB_ENGLISH) {
      return '<div class="qg-word-card__english qg-word-card__english--empty" lang="en" dir="ltr"></div>';
    }
    const simple = simpleEnglishLine(row);
    const detail = effectiveAnalysisEn(row);
    const pill = pillLabelForRow(row);
    if (!simple && !detail) {
      return '<div class="qg-word-card__english qg-word-card__english--empty" lang="en" dir="ltr"></div>';
    }
    const dup = simple && detail && simple === detail;
    return (
      '<div class="qg-word-card__english" lang="en" dir="ltr">' +
      '<span class="qg-word-card__pill" lang="en">' +
      escapeHtml(pill) +
      '</span>' +
      (simple && !dup
        ? '<p class="qg-word-card__en-simple">' + escapeHtml(simple) + '</p>'
        : '') +
      (detail
        ? '<p class="qg-word-card__en-detail">' + escapeHtml(detail) + '</p>'
        : '') +
      '</div>'
    );
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Curated `analysisEn` in data, or `utils/iraab-simple-en.js` auto gloss. */
  function effectiveAnalysisEn(row) {
    let out = '';
    if (row && row.analysisEn != null && String(row.analysisEn).trim() !== '') {
      out = String(row.analysisEn).trim();
    } else if (typeof window.iraabSimpleEnFromRow === 'function') {
      const g = window.iraabSimpleEnFromRow(row);
      if (g && String(g).trim()) out = String(g).trim();
    }
    return out ? normalizeIraabEnglishToAscii(out) : '';
  }

  function toArabicIndicDigits(num) {
    return String(num).replace(/[0-9]/g, (d) => String.fromCharCode(0x0660 + Number(d)));
  }

  /** Surah number (Eastern digits) + em dash + Arabic name — used in menus and nav. */
  function surahMenuLabel(sn, nameArShown) {
    return `${toArabicIndicDigits(sn)} — ${nameArShown}`;
  }

  function lessonHref(ruleId) {
    if (typeof window.getLessonUrl === 'function' && typeof window.findLessonInOutline === 'function') {
      const row = window.findLessonInOutline(ruleId);
      if (row) return row.page || window.getLessonUrl({ rule: ruleId });
    }
    return `lessons/${encodeURIComponent(ruleId)}.html`;
  }

  /** Bilingual tooltip: English outline title — Arabic (from `RULES` / `RULE_ARABIC_TITLE`). */
  function lessonLinkTooltip(ruleId) {
    if (typeof window.findLessonInOutline === 'function') {
      const row = window.findLessonInOutline(ruleId);
      if (row) {
        const ar = row.titleAr || '';
        const en = normalizeIraabEnglishToAscii(String(row.title || '').trim());
        if (ar) return `${en} — ${ar}`;
        return en;
      }
    }
    const ar = window.RULE_ARABIC_TITLE && window.RULE_ARABIC_TITLE[ruleId];
    if (ar) return `${ruleId} — ${ar}`;
    return ruleId;
  }

  /**
   * Colored iʿrāb fragment: beginner uses class-based terms; scholar uses plain highlights
   * then replaces them with `.irab-term` + tooltip data attributes.
   * @param {{ lastRule?: string | null, rowFirstRule?: string | null, analysisEn?: string }} [opts]
   */
  function iraabFragmentHtml(raw, alwaysShowHarakah, opts) {
    if (raw == null || raw === '') return '';
    const t =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(String(raw), alwaysShowHarakah)
        : String(raw);
    const lastRule = opts && opts.lastRule != null ? opts.lastRule : null;
    const rowFirstRule = opts && opts.rowFirstRule != null ? opts.rowFirstRule : null;
    const rawDef = opts && opts.analysisEn != null ? opts.analysisEn : '';
    const analysisEn = SHOW_QURAN_IRAAB_ENGLISH ? rawDef : '';
    const scholar = readQuranGrammarMode() === 'scholar';

    if (scholar) {
      let html = typeof window.colorizeIraab === 'function' ? window.colorizeIraab(t) : escapeHtml(t);
      html =
        typeof window.wrapColorizedFormulaSpans === 'function'
          ? window.wrapColorizedFormulaSpans(html, { lastRule: lastRule, rowFirstRule: rowFirstRule })
          : html;
      return scholarAnnotateTerms(html, analysisEn);
    }

    let html =
      typeof window.colorizeIraabClasses === 'function'
        ? window.colorizeIraabClasses(t)
        : typeof window.colorizeIraab === 'function'
          ? window.colorizeIraab(t)
          : escapeHtml(t);
    html =
      typeof window.wrapColorizedFormulaSpans === 'function'
        ? window.wrapColorizedFormulaSpans(html, { lastRule: lastRule, rowFirstRule: rowFirstRule })
        : html;
    return html;
  }

  function renderLinkPart(p, row) {
    const href = lessonHref(p.rule);
    const tipPlain = arabicUiText(lessonLinkTooltip(p.rule), false);
    const tip = escapeHtml(tipPlain);
    const showTitle = readQuranGrammarMode() === 'scholar';
    const beginner = readQuranGrammarMode() === 'beginner';
    const base =
      typeof window.ruleLinkColorForRule === 'function'
        ? window.ruleLinkColorForRule(p.rule)
        : '#334155';
    const linkInner = iraabFragmentHtml(p.text, false, {
      lastRule: p.rule,
      rowFirstRule: firstLinkRuleInRow(row && row.analysisParts),
      analysisEn: effectiveAnalysisEn(row),
    });

    const fid =
      typeof window.getFormulaIdForRule === 'function' ? window.getFormulaIdForRule(p.rule) : null;
    const soon =
      typeof window.isComingSoonRule === 'function' ? window.isComingSoonRule(p.rule) : false;
    const useSplit = !!(fid || soon);

    const titleAttr = showTitle ? ' title="' + tip + '"' : '';
    const linkStyle = beginner
      ? ''
      : ' style="color: ' + escapeHtml(base) + '; font-weight: 400"';
    const linkPillClass = beginner ? ' quran-iraab__rule-link--pill' : '';
    const hitPillClass = beginner ? ' quran-iraab__formula-hit--pill' : '';

    if (!useSplit) {
      return (
        '<span class="quran-iraab__rule-link-stack">' +
        '<a class="quran-iraab__rule-link' +
        linkPillClass +
        '" href="' +
        escapeHtml(href) +
        '"' +
        titleAttr +
        ' aria-label="' +
        tip +
        '"' +
        linkStyle +
        '>' +
        linkInner +
        '</a></span>'
      );
    }

    const dataFid = fid ? ' data-formula="' + escapeHtml(fid) + '"' : '';
    const dataSoon =
      soon && !fid
        ? ' data-formula-soon="1" data-rule="' + escapeHtml(String(p.rule)) + '"'
        : '';
    const soonClass = soon && !fid ? ' quran-iraab__formula-hit--soon' : '';

    return (
      '<span class="quran-iraab__rule-link-stack quran-iraab__rule-link-stack--split">' +
      '<span class="quran-iraab__term-tools" dir="rtl">' +
      '<button type="button" class="quran-iraab__formula-hit quran-iraab__formula-hit--term' +
      soonClass +
      hitPillClass +
      '" tabindex="0"' +
      dataFid +
      dataSoon +
      titleAttr +
      ' aria-label="Show formula: ' +
      tip +
      '">' +
      linkInner +
      '</button>' +
      '<a class="quran-iraab__lesson-ref" href="' +
      escapeHtml(href) +
      '"' +
      titleAttr +
      ' aria-label="' +
      tip +
      ' — open lesson">' +
      '<span class="quran-iraab__lesson-ref__glyph" aria-hidden="true">↗</span>' +
      '<span class="quran-iraab__lesson-ref__txt" lang="ar">درس</span>' +
      '</a>' +
      '</span></span>'
    );
  }

  function arabicUiText(str, alwaysShowHarakah) {
    if (typeof window.displayArabic === 'function') {
      return window.displayArabic(str == null ? '' : String(str), alwaysShowHarakah);
    }
    return str == null ? '' : String(str);
  }

  function rowAnalysisPlain(row) {
    if (!row || !row.analysisParts || !row.analysisParts.length) return '';
    return row.analysisParts.map(function (p) {
      return p.text != null ? String(p.text) : '';
    }).join('');
  }

  /** English gloss: curated `analysisEn` or `utils/iraab-simple-en.js` fallback. */
  function renderAnalysisEn(row) {
    if (!SHOW_QURAN_IRAAB_ENGLISH) return '';
    const en = effectiveAnalysisEn(row);
    if (en === '') return '';
    return `<p class="quran-iraab__analysis-en" lang="en" dir="ltr">${escapeHtml(en)}</p>`;
  }

  function firstLinkRuleInRow(parts) {
    if (!parts || !parts.length) return null;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type === 'link' && parts[i].rule) return parts[i].rule;
    }
    return null;
  }

  function getRowFormulaIndicator(row) {
    if (!row || !row.analysisParts || typeof window.getFormulaIdForRule !== 'function') return null;
    for (let i = 0; i < row.analysisParts.length; i++) {
      const p = row.analysisParts[i];
      if (p.type === 'link' && p.rule) {
        const fid = window.getFormulaIdForRule(p.rule);
        if (fid && window.FORMULA_BY_ID && window.FORMULA_BY_ID[fid]) {
          const f = window.FORMULA_BY_ID[fid];
          const dot =
            typeof window.getDotColorForFormulaCategory === 'function'
              ? window.getDotColorForFormulaCategory(f.category)
              : '#64748b';
          return { formulaId: fid, title: normalizeIraabEnglishToAscii(String(f.title || '')), dotColor: dot };
        }
      }
    }
    return null;
  }

  /** Unique `rule` ids from `analysisParts` links, in order. */
  function collectRuleIdsFromParts(parts) {
    if (!parts || !parts.length) return [];
    const seen = new Set();
    const out = [];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p && p.type === 'link' && p.rule && !seen.has(p.rule)) {
        seen.add(p.rule);
        out.push(p.rule);
      }
    }
    return out;
  }

  /** English + Arabic lesson titles for a rule (same source as tooltips / course home). */
  function lessonTitlePairForRule(ruleId) {
    let en = '';
    let ar = '';
    if (typeof window.findLessonInOutline === 'function') {
      const row = window.findLessonInOutline(ruleId);
      if (row) {
        en = (row.title && String(row.title).trim()) || '';
        ar = (row.titleAr && String(row.titleAr).trim()) || '';
      }
    }
    if (!ar && window.RULE_ARABIC_TITLE && window.RULE_ARABIC_TITLE[ruleId]) {
      ar = String(window.RULE_ARABIC_TITLE[ruleId]).trim();
    }
    if (!en) en = ruleId;
    return { en, ar };
  }

  /**
   * Short default prompt: one-line intro + lesson titles as links (same keys as `analysisParts`).
   * Returns HTML for `.quran-iraab__prompt-question` and a plain `ariaLabel` for the `<summary>`.
   */
  function renderAutoPromptQuestionHtml(parts) {
    const ruleIds = collectRuleIdsFromParts(parts);
    const introAr = 'قَبْلَ الْكَشْفِ —';
    const introEn = 'Before revealing —';

    if (ruleIds.length === 0) {
      const ar = arabicUiText(`${introAr} مَا الْعِلَامَةُ؟`, false);
      const en = `${introEn} which sign?`;
      if (!SHOW_QURAN_IRAAB_ENGLISH) {
        return {
          html: `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar" lang="ar" dir="rtl">${escapeHtml(ar)}</span>
          </span>`,
          ariaLabel: ar,
        };
      }
      return {
        html: `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar" lang="ar" dir="rtl">${escapeHtml(ar)}</span>
            <span class="quran-iraab__prompt-en">${escapeHtml(en)}</span>
          </span>`,
        ariaLabel: `${en}. ${ar}`,
      };
    }

    const pairs = ruleIds.map((id) => ({ id, ...lessonTitlePairForRule(id) }));
    const arSep = '<span class="quran-iraab__prompt-lesson-sep" aria-hidden="true">، </span>';
    const enSep = '<span class="quran-iraab__prompt-lesson-sep" aria-hidden="true"> · </span>';

    const arLinks = pairs.map(({ id, ar, en }) => {
      const href = lessonHref(id);
      const tip = escapeHtml(arabicUiText(lessonLinkTooltip(id), false));
      const labelAr = arabicUiText(ar || en, false);
      return `<a class="quran-iraab__prompt-lesson-link" href="${escapeHtml(href)}" title="${tip}" aria-label="${tip}" lang="ar" dir="rtl">«${escapeHtml(labelAr)}»</a>`;
    });
    const enLinks = pairs.map(({ id, en }) => {
      const href = lessonHref(id);
      const tip = escapeHtml(lessonLinkTooltip(id));
      const enAsc = normalizeIraabEnglishToAscii(String(en || ''));
      return `<a class="quran-iraab__prompt-lesson-link quran-iraab__prompt-lesson-link--en" href="${escapeHtml(href)}" title="${tip}" aria-label="${tip}">${escapeHtml(enAsc)}</a>`;
    });

    const arFlat = pairs.map((p) => p.ar || p.en).join('، ');
    if (!SHOW_QURAN_IRAAB_ENGLISH) {
      const html = `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar quran-iraab__prompt-ar--linked" lang="ar" dir="rtl">
              <span class="quran-iraab__prompt-intro-ar">${escapeHtml(arabicUiText(introAr, false))}</span>
              <span class="quran-iraab__prompt-lesson-wrap">${arLinks.join(arSep)}</span>
            </span>
          </span>`;
      const ariaLabel = `${introAr} ${arFlat}`;
      return { html, ariaLabel };
    }

    const html = `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar quran-iraab__prompt-ar--linked" lang="ar" dir="rtl">
              <span class="quran-iraab__prompt-intro-ar">${escapeHtml(arabicUiText(introAr, false))}</span>
              <span class="quran-iraab__prompt-lesson-wrap">${arLinks.join(arSep)}</span>
            </span>
            <span class="quran-iraab__prompt-en quran-iraab__prompt-en--linked">
              <span class="quran-iraab__prompt-intro-en">${escapeHtml(introEn)}</span>
              <span class="quran-iraab__prompt-lesson-wrap">${enLinks.join(enSep)}</span>
            </span>
          </span>`;

    const enFlat = pairs.map((p) => normalizeIraabEnglishToAscii(String(p.en || ''))).join(' · ');
    const ariaLabel = `${introEn} ${enFlat}. ${introAr} ${arFlat}`;

    return { html, ariaLabel };
  }

  /**
   * Single flowing line: term links + explanation inline, إعراب keywords highlighted (no boxes/rules).
   */
  function renderAnalysisParts(row) {
    const parts = row && row.analysisParts;
    if (!parts || !parts.length) return '';
    const rowFirstRule = firstLinkRuleInRow(parts);
    const chunks = [];
    let lastRule = null;
    let i = 0;
    while (i < parts.length) {
      const p = parts[i];
      if (p.type === 'link') {
        lastRule = p.rule || lastRule;
        const head = renderLinkPart(p, row);
        i += 1;
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        let explain = '';
        if (rawTexts.length) {
          explain = iraabFragmentHtml(rawTexts.join(''), false, {
            lastRule: lastRule,
            rowFirstRule: rowFirstRule,
            analysisEn: effectiveAnalysisEn(row),
          });
        }
        const seg = explain ? `${head}<span class="quran-iraab__flow-gap"> </span>${explain}` : head;
        chunks.push(`<span class="quran-iraab__flow-seg">${seg}</span>`);
      } else {
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        const explain = iraabFragmentHtml(rawTexts.join(''), false, {
          lastRule: lastRule,
          rowFirstRule: rowFirstRule,
          analysisEn: effectiveAnalysisEn(row),
        });
        chunks.push(`<span class="quran-iraab__flow-seg">${explain}</span>`);
      }
    }
    return `<span class="quran-iraab__analysis-line">${chunks.join('<span class="quran-iraab__flow-sep"> </span>')}</span>`;
  }

  function splitIraabTextRows(text) {
    if (text == null || !String(text).trim()) return [];
    return String(text)
      .trim()
      .split(/[،,\u060C]\s*/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function glossForRuleId(rule) {
    if (!rule) return '';
    const r = {
      'verb-imperative': 'a verb of command',
      'verb-imperative-li': 'imperative with لـ',
      'verb-present': 'a present-tense verb',
      'verb-past': 'a past-tense verb',
      'verb-passive': 'verb (passive)',
      'harf-jarr': 'particle / preposition',
      'harf-maani': 'particle of meaning',
      'atf': 'particle (coordination)',
      'irab-jarr': 'grammatical case (jar / majrūr)',
      'irab-nasb': 'grammatical case (naṣb)',
      'irab-raf': 'grammatical case (rafʿ)',
      'irab-jazm': 'grammatical case (jazm)',
      'mafool': 'object / verbal role',
      'fael': 'subject / doer',
      'attached-pronouns': 'attached pronoun',
      'detached-pronouns': 'pronoun',
      'naat': 'adjective / description',
      'idafah': 'possessive phrase (iḍāfah)',
      'munada': 'vocative',
      'relative-nouns': 'relative noun',
      'silah-mawsul': 'relative clause link',
      'number-plural': 'plural pattern',
      'kaana-sisters': 'kāna-sister construction',
      'inna-sisters': 'inna-sister construction',
      'mabni-muarab': 'mabnī / muʿrab',
      'verb-present-negation': 'negation particle',
    };
    return normalizeIraabEnglishToAscii(r[rule] || '');
  }

  function glossFromArabicChunk(chunk) {
    const t = String(chunk || '');
    if (!t.trim()) return '';
    if (/مَبْنِي|مبني/.test(t) && (/السُّكُون|السكون|سكون/.test(t) || /عَلَى/.test(t)))
      return normalizeIraabEnglishToAscii('built / fixed on sukūn (silent ending)');
    if (/مَبْنِي|مبني/.test(t)) return normalizeIraabEnglishToAscii('mabnī (fixed voweling)');
    if (/ضَمِير\s*مُسْتَتِر|ضمير\s*مستتر|مُسْتَتِر/.test(t) || (/الْفَاعِل|الفاعل/.test(t) && /ضَمِير|ضمير/.test(t)))
      return normalizeIraabEnglishToAscii('hidden pronoun as the doer (estimated “you” / “I”)');
    if (/عَلَامَة|علامة/.test(t) && /رَفْع|نَصْب|جَرّ|جَزْم/.test(t)) return normalizeIraabEnglishToAscii('grammatical sign (ʿalāmah)');
    if (/حَرْف\s*جَر|حرف جر/.test(t)) return normalizeIraabEnglishToAscii('preposition (jar)');
    return '';
  }

  /**
   * Beginner: stacked lines (link row, then text split on Arabic comma) with → gloss under each block.
   */
  function renderBeginnerStackedAnalysis(row) {
    const parts = row && row.analysisParts;
    if (!parts || !parts.length) return '';
    const rowFirstRule = firstLinkRuleInRow(parts);
    const lines = [];
    let i = 0;
    while (i < parts.length) {
      const p = parts[i];
      if (p.type === 'link') {
        const rule = p.rule;
        const head = renderLinkPart(p, row);
        const g0 = glossForRuleId(rule) || glossFromArabicChunk(p.text || '');
        lines.push({ ar: head, gloss: g0 });
        i += 1;
        let textBuf = '';
        while (i < parts.length && parts[i].type === 'text') {
          textBuf += parts[i].text;
          i += 1;
        }
        const segs = splitIraabTextRows(textBuf);
        for (let s = 0; s < segs.length; s++) {
          const seg = segs[s];
          const ar = iraabFragmentHtml(seg, false, {
            lastRule: rule,
            rowFirstRule: rowFirstRule,
            analysisEn: effectiveAnalysisEn(row),
          });
          const g = glossFromArabicChunk(seg);
          lines.push({ ar: ar, gloss: g });
        }
      } else {
        let textBuf = '';
        while (i < parts.length && parts[i].type === 'text') {
          textBuf += parts[i].text;
          i += 1;
        }
        const lastR = rowFirstRule;
        const segs = splitIraabTextRows(textBuf);
        for (let s = 0; s < segs.length; s++) {
          const seg = segs[s];
          const ar = iraabFragmentHtml(seg, false, {
            lastRule: lastR,
            rowFirstRule: rowFirstRule,
            analysisEn: effectiveAnalysisEn(row),
          });
          lines.push({ ar: ar, gloss: glossFromArabicChunk(seg) });
        }
      }
    }

    const body = lines
      .map(function (line) {
        const g =
          SHOW_QURAN_IRAAB_ENGLISH && line.gloss && String(line.gloss).trim()
            ? `<p class="qg-iraab-line-gloss" dir="ltr" lang="en">→ ${escapeHtml(String(line.gloss).trim())}</p>`
            : '';
        return `<div class="qg-iraab-line"><div class="qg-iraab-line-ar" dir="rtl" lang="ar">${line.ar}</div>${g}</div>`;
      })
      .join('');
    return `<div class="qg-iraab-rows">${body}</div>`;
  }

  function renderAnalysisBody(row) {
    if (readQuranGrammarMode() === 'scholar') {
      return { flow: true, html: renderAnalysisParts(row) };
    }
    return { flow: false, html: renderBeginnerStackedAnalysis(row) };
  }

  /**
   * Renders the analysis column: optional think-first prompt (click replaces prompt with analysis),
   * or plain analysis if `row.noPrompt === true` or global “show prompts” is off (default).
   */
  function renderRowAnalysisCell(row) {
    const body = renderAnalysisBody(row);
    const inner = body.html;
    if (!inner) return '';
    const flowWrap =
      body.flow === true
        ? `<span class="quran-iraab__analysis quran-iraab__analysis--flow" lang="ar" dir="rtl">${inner}</span>`
        : `<div class="quran-iraab__analysis quran-iraab__analysis--stacked" lang="ar" dir="rtl">${inner}</div>`;
    if (row.noPrompt === true || !readIraabShowPrompts()) {
      return `<div class="quran-iraab__analysis-stack">
          ${flowWrap}
        </div>`;
    }
    const customAr = row.prompt != null && String(row.prompt).trim() !== '';
    const labelReveal = arabicUiText('إظْهَارُ الْإِعْرَابِ', false);
    const labelRevealEn = 'Reveal analysis';
    let promptQuestionHtml;
    let ariaLabel;

    if (customAr) {
      const promptAr = arabicUiText(String(row.prompt).trim(), false);
      let promptEn = '';
      if (SHOW_QURAN_IRAAB_ENGLISH && row.promptEn != null && String(row.promptEn).trim() !== '') {
        promptEn = normalizeIraabEnglishToAscii(String(row.promptEn).trim());
      }
      promptQuestionHtml = `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar" lang="ar" dir="rtl">${escapeHtml(promptAr)}</span>
            ${
              promptEn
                ? `<span class="quran-iraab__prompt-en">${escapeHtml(promptEn)}</span>`
                : ''
            }
          </span>`;
      ariaLabel = SHOW_QURAN_IRAAB_ENGLISH
        ? `${labelRevealEn}. ${promptAr}${promptEn ? ' ' + promptEn : ''}`
        : `${labelReveal}. ${promptAr}`;
    } else {
      const auto = renderAutoPromptQuestionHtml(row.analysisParts);
      promptQuestionHtml = auto.html;
      ariaLabel = SHOW_QURAN_IRAAB_ENGLISH
        ? `${labelRevealEn}. ${auto.ariaLabel}`
        : `${labelReveal}. ${auto.ariaLabel}`;
    }

    return `
      <div class="quran-iraab__reveal" data-iraab-reveal>
        <button type="button" class="quran-iraab__prompt-face" data-iraab-expand-row aria-expanded="false" aria-label="${escapeHtml(ariaLabel)}">
          <span class="quran-iraab__prompt-reveal-hint" aria-hidden="true">
            <span class="quran-iraab__prompt-reveal-ar" lang="ar" dir="rtl">${escapeHtml(labelReveal)}</span>
            ${
              SHOW_QURAN_IRAAB_ENGLISH
                ? `<span class="quran-iraab__prompt-reveal-en">${escapeHtml(labelRevealEn)}</span>`
                : ''
            }
          </span>
          ${promptQuestionHtml}
          <span class="quran-iraab__prompt-chevron" aria-hidden="true"></span>
        </button>
        <div class="quran-iraab__analysis-wrap quran-iraab__analysis-wrap--reveal" data-iraab-analysis hidden>
          <div class="quran-iraab__analysis-stack">
            ${flowWrap}
          </div>
        </div>
      </div>`;
  }

  function isIraabAvailable(entry) {
    if (entry.iraabUnavailable === true) return false;
    if (!entry.rows || !entry.rows.length) return false;
    return entry.rows.some((r) => r.analysisParts && r.analysisParts.length);
  }

  /** Flat list: every āyah from 95:1 through 114:last, merged with curated `QURAN_IRAAB_AYAH`. */
  function buildMergedAyahList() {
    const TEXT = window.QURAN_TEXT_96_114;
    const raw = window.QURAN_IRAAB_AYAH || [];
    if (!TEXT) return raw;

    const byId = new Map();
    const composite = [];
    raw.forEach((e) => {
      const m = /^(\d+)-(\d+)-(\d+)$/.exec(e.id);
      if (m) {
        composite.push({ surah: Number(m[1]), a: Number(m[2]), b: Number(m[3]), entry: e });
      } else {
        byId.set(e.id, e);
      }
    });

    function surahNameFromApi(s) {
      const sd = TEXT[String(s)];
      if (!sd || !sd._nameAr) return '';
      return String(sd._nameAr)
        .replace(/^سُورَةُ\s*/u, '')
        .trim();
    }

    function getComposite(s, n) {
      for (let i = 0; i < composite.length; i++) {
        const c = composite[i];
        if (c.surah === s && n >= c.a && n <= c.b) return c;
      }
      return null;
    }

    const out = [];
    for (let s = 95; s <= 114; s++) {
      const sd = TEXT[String(s)];
      if (!sd) continue;
      const count = sd._ayahCount;
      const baseName = surahNameFromApi(s);
      for (let n = 1; n <= count; n++) {
        const id = `${s}-${n}`;
        const ayahText = sd[String(n)];
        const existing = byId.get(id);
        if (existing) {
          out.push({
            ...existing,
            ayah: n,
            ayahText: ayahText || existing.ayahText,
            surahNameAr: existing.surahNameAr || baseName,
            surah: s,
          });
          continue;
        }
        const comp = getComposite(s, n);
        if (comp && n === comp.a) {
          const e = comp.entry;
          out.push({
            ...e,
            id,
            ayah: n,
            ayahText: ayahText || e.ayahText,
            surahNameAr: e.surahNameAr || baseName,
            surah: s,
          });
          continue;
        }
        if (comp && n > comp.a) {
          out.push({
            id,
            surah: s,
            surahNameAr: baseName,
            ayah: n,
            ayahText,
            iraabUnavailable: true,
            rows: [],
          });
          continue;
        }
        out.push({
          id,
          surah: s,
          surahNameAr: baseName,
          ayah: n,
          ayahText,
          iraabUnavailable: true,
          rows: [],
        });
      }
    }
    return out;
  }

  function renderAyahCard(entry) {
    const refRaw = `${toArabicIndicDigits(entry.surah)} — ${entry.surahNameAr} — ${toArabicIndicDigits(entry.ayah)}`;
    const ref = arabicUiText(refRaw, false);
    const available = isIraabAvailable(entry);

    if (!available) {
      return `
      <article class="quran-iraab__card quran-iraab__card--no-iraab" data-ayah-id="${escapeHtml(entry.id)}">
        <header class="quran-iraab__card-head">
          <h2 class="quran-iraab__ref" lang="ar" dir="rtl">${escapeHtml(ref)}</h2>
          <div class="quran-iraab__ayah-wrap">
            <blockquote class="quran-iraab__ayah" lang="ar" dir="rtl">${escapeHtml(entry.ayahText)}</blockquote>
          </div>
          ${
            SHOW_QURAN_IRAAB_ENGLISH && entry.translationEn
              ? `<p class="quran-iraab__en">${escapeHtml(entry.translationEn)}</p>`
              : ''
          }
        </header>
        <div class="quran-iraab__unavailable" role="status">
          <p class="quran-iraab__unavailable-en">${escapeHtml(IRAAB_UNAVAILABLE_EN)}</p>
          <p class="quran-iraab__unavailable-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText(IRAAB_UNAVAILABLE_AR, false))}</p>
        </div>
      </article>`;
    }

    const rowsHtml = entry.rows
      .map((row, idx) => {
        const plain = rowAnalysisPlain(row);
        const ind = getRowFormulaIndicator(row);
        const showDotTip = readQuranGrammarMode() === 'scholar';
        const dotHtml = ind
          ? `<span class="quran-iraab__row-formula-dot" style="background:${escapeHtml(
              ind.dotColor
            )}"${showDotTip ? ` title="${escapeHtml(ind.title)}"` : ''} role="img" aria-label="${escapeHtml(
              ind.title
            )}"></span>`
          : '';
        const theme = QG_THEMES[idx % QG_THEMES.length];
        const lit =
          SHOW_QURAN_IRAAB_ENGLISH && readQuranGrammarMode() === 'scholar' && literalGlossLine(row)
            ? `<p class="qg-iraab-literal" lang="en" dir="ltr">${escapeHtml(literalGlossLine(row))}</p>`
            : '';
        return `
        <article class="qg-word-card ${theme}${
          readQuranGrammarMode() === 'scholar' ? ' qg-word-card--scholar-only' : ''
        }" data-scholar="${escapeAttr(plain)}" data-segment="${escapeHtml(
          row.segment
        )}" data-analysis-plain="${escapeHtml(plain)}">
          <div class="qg-word-card__arabic">
            <span class="qg-word-card__word" lang="ar" dir="rtl">${escapeHtml(row.segment)}</span>
            <div class="qg-word-card__iraab-wrap${ind ? ' qg-word-card__iraab-wrap--has-formula' : ''}">
              ${dotHtml}
              <div class="qg-word-card__iraab-body">
                ${renderRowAnalysisCell(row)}
              </div>
              ${lit}
            </div>
            <span class="qg-word-card__badge" aria-hidden="true">${idx + 1}</span>
          </div>
          ${wordNoteFieldHtml(entry.id, idx)}
          ${readQuranGrammarMode() === 'scholar' ? '' : renderEnglishCardPanel(row)}
        </article>`;
      })
      .join('');

    const showRevealTools =
      readIraabShowPrompts() &&
      entry.rows.some((r) => r && r.analysisParts && r.analysisParts.length && r.noPrompt !== true);
    const revealToolsHtml = showRevealTools
      ? `<div class="quran-iraab__breakdown-tools" role="group" aria-label="Reveal all analyses or show prompts again">
              <button type="button" class="quran-iraab__tool-btn" data-iraab-expand="all">
                <span class="quran-iraab__tool-en">Reveal all</span>
                <span class="quran-iraab__tool-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText('إظْهَارُ الْجَمِيعِ', false))}</span>
              </button>
              <button type="button" class="quran-iraab__tool-btn" data-iraab-expand="none">
                <span class="quran-iraab__tool-en">Show prompts again</span>
                <span class="quran-iraab__tool-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText('إرْجَاعُ الْأَسْئِلَةِ', false))}</span>
              </button>
            </div>`
      : '';

    const showHarakahPref =
      typeof window.readShowHarakah === 'function' ? window.readShowHarakah() : true;
    const harakahBtnAr = showHarakahPref ? 'إخفاء التشكيل' : 'إظهار التشكيل';
    const breakdownHarakahHtml = `<div class="quran-iraab__breakdown-harakah" title="Show / hide vowel marks (تشكيل)">
            <button type="button" class="quran-iraab-toolbar__btn quran-iraab-toolbar__btn--secondary quran-iraab-toolbar__harakah-btn quran-iraab-toolbar__harakah-btn--breakdown${showHarakahPref ? ' quran-iraab-toolbar__harakah-btn--on' : ''}" data-toggle-harakah lang="ar" dir="rtl" aria-label="${showHarakahPref ? 'Hide harakah' : 'Show harakah'}">${escapeHtml(harakahBtnAr)}</button>
          </div>`;

    const latinRef = latinSurahRefLine(entry.surah, entry.ayah);

    return `
      <article class="quran-iraab__card" data-ayah-id="${escapeHtml(entry.id)}">
        <header class="quran-iraab__card-head">
          <div class="quran-iraab__ayah-wrap">
            <blockquote class="quran-iraab__ayah" lang="ar" dir="rtl">${escapeHtml(entry.ayahText)}</blockquote>
          </div>
          ${
            SHOW_QURAN_IRAAB_ENGLISH && entry.translationEn
              ? `<p class="quran-iraab__en quran-iraab__en--verse" lang="en" dir="ltr">${escapeHtml(
                  String(entry.translationEn).trim()
                )}</p>`
              : ''
          }
          <p class="quran-iraab__ref-latin" lang="en" dir="ltr">${escapeHtml(latinRef)}</p>
          <h2 class="quran-iraab__ref quran-iraab__ref--ar" lang="ar" dir="rtl">${escapeHtml(ref)}</h2>
        </header>
        <section class="quran-iraab__breakdown" aria-labelledby="quran-iraab-breakdown-title-${escapeHtml(entry.id)}">
          <div class="quran-iraab__breakdown-head">
            <h3 class="quran-iraab__breakdown-title" id="quran-iraab-breakdown-title-${escapeHtml(entry.id)}">
              <span class="quran-iraab__breakdown-title-en">Breakdown</span>
              <span class="quran-iraab__breakdown-title-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText('تَحْلِيلُ الْإِعْرَابِ', false))}</span>
            </h3>
            <div class="quran-iraab__breakdown-head-actions">
              ${breakdownHarakahHtml}
              ${revealToolsHtml}
            </div>
          </div>
          <div class="quran-iraab__grid quran-iraab__grid--word-cards" role="presentation">
            <div class="qg-word-card-list">${rowsHtml}</div>
          </div>
        </section>
      </article>`;
  }

  /** All āyāt in one surah (same order as `ayahList`). */
  function ayahsInSurah(ayahList, surahNum) {
    return ayahList.filter((a) => a.surah === surahNum);
  }

  function wireIraabCard(card) {
    if (!card) return;
    card.querySelectorAll('[data-iraab-expand-row]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const wrap = btn.closest('[data-iraab-reveal]');
        if (!wrap || wrap.classList.contains('is-revealed')) return;
        wrap.classList.add('is-revealed');
        btn.setAttribute('aria-expanded', 'true');
        const analysis = wrap.querySelector('[data-iraab-analysis]');
        if (analysis) analysis.hidden = false;
        btn.hidden = true;
      });
    });
    card.querySelectorAll('[data-iraab-expand]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('data-iraab-expand') === 'all';
        card.querySelectorAll('[data-iraab-reveal]').forEach((wrap) => {
          const promptBtn = wrap.querySelector('[data-iraab-expand-row]');
          const analysis = wrap.querySelector('[data-iraab-analysis]');
          if (open) {
            wrap.classList.add('is-revealed');
            if (promptBtn) {
              promptBtn.hidden = true;
              promptBtn.setAttribute('aria-expanded', 'true');
            }
            if (analysis) analysis.hidden = false;
          } else {
            wrap.classList.remove('is-revealed');
            if (promptBtn) {
              promptBtn.hidden = false;
              promptBtn.setAttribute('aria-expanded', 'false');
            }
            if (analysis) analysis.hidden = true;
          }
        });
      });
    });
    card.querySelectorAll('a.quran-iraab__prompt-lesson-link').forEach((a) => {
      a.addEventListener('click', (e) => e.stopPropagation());
    });
  }

  /**
   * Renders every āyah of the surah in one scrollable column; scrolls to `scrollToId` when set.
   */
  function showSurahView(surahNum, container, ayahList, scrollToId) {
    if (!container) return;
    const list = ayahsInSurah(ayahList, surahNum);
    if (!list.length) {
      container.innerHTML =
        '<p class="quran-iraab__empty">' +
        escapeHtml(arabicUiText('لم يُعثر على هذه السورة.', false)) +
        '</p>';
      return;
    }
    const targetId =
      scrollToId && list.some((a) => a.id === scrollToId) ? scrollToId : list[0].id;
    const html =
      '<div class="quran-iraab-surah-pages" data-surah="' +
      escapeHtml(String(surahNum)) +
      '">' +
      list.map((e) => renderAyahCard(e)).join('') +
      '</div>';
    container.innerHTML = html;
    container.querySelectorAll('.quran-iraab__card').forEach((card) => wireIraabCard(card));
    wireWordNotes(container);
    const esc = targetId.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const el = container.querySelector('.quran-iraab__card[data-ayah-id="' + esc + '"]');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    try {
      history.replaceState(null, '', `#${encodeURIComponent(targetId)}`);
    } catch (e) {
      /* ignore */
    }
  }

  function showAyah(id, container, ayahList) {
    if (!container) return;
    const entry = ayahList.find((a) => a.id === id);
    if (!entry) {
      container.innerHTML =
        '<p class="quran-iraab__empty">' +
        escapeHtml(arabicUiText('لم يُعثر على هذه الآية.', false)) +
        '</p>';
      return;
    }
    const existing = container.querySelector('.quran-iraab-surah-pages');
    if (existing && String(entry.surah) === existing.getAttribute('data-surah')) {
      const esc = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const el = container.querySelector('.quran-iraab__card[data-ayah-id="' + esc + '"]');
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
      try {
        history.replaceState(null, '', `#${encodeURIComponent(id)}`);
      } catch (e) {
        /* ignore */
      }
      return;
    }
    showSurahView(entry.surah, container, ayahList, id);
  }

  function populateSurahAndAyahSelects(ayahList, surahSel, ayahSel, onAyahChange) {
    if (!surahSel || !ayahSel) return;

    const surahNums = [...new Set(ayahList.map((a) => a.surah))].sort((x, y) => x - y);

    function labelForSurah(sn) {
      const first = ayahList.find((a) => a.surah === sn);
      return first ? first.surahNameAr : String(sn);
    }

    function refillAyahOptions(sn) {
      ayahSel.innerHTML = '';
      ayahList
        .filter((a) => a.surah === sn)
        .forEach((a) => {
          const opt = document.createElement('option');
          opt.value = a.id;
          opt.textContent = toArabicIndicDigits(a.ayah);
          opt.setAttribute('lang', 'ar');
          opt.setAttribute('dir', 'rtl');
          ayahSel.appendChild(opt);
        });
    }

    surahSel.innerHTML = '';
    surahNums.forEach((sn) => {
      const opt = document.createElement('option');
      opt.value = String(sn);
      const raw = labelForSurah(sn);
      opt.dataset.harakahSrc = raw;
      opt.textContent = surahMenuLabel(sn, arabicUiText(raw, false));
      opt.setAttribute('lang', 'ar');
      opt.setAttribute('dir', 'rtl');
      surahSel.appendChild(opt);
    });

    surahSel.addEventListener('change', () => {
      const sn = Number(surahSel.value);
      refillAyahOptions(sn);
      const firstId = ayahList.find((a) => a.surah === sn)?.id;
      if (firstId) {
        ayahSel.value = firstId;
        onAyahChange(firstId);
      }
    });

    ayahSel.addEventListener('change', () => onAyahChange(ayahSel.value));

    return function syncSelectsToId(id) {
      const entry = ayahList.find((a) => a.id === id);
      if (!entry) return;
      surahSel.value = String(entry.surah);
      refillAyahOptions(entry.surah);
      ayahSel.value = id;
    };
  }

  /**
   * Left sidebar: one row per surah (no āyah sub-list). Tap navigates to that surah (first āyah scroll).
   * @returns {function(string): void} updateActive(id)
   */
  function setupLeftNav(ayahList, navigateTo) {
    const navRoot = document.getElementById('quran-iraab-nav-tree');
    if (!navRoot) return () => {};

    const bySurah = new Map();
    ayahList.forEach((a) => {
      if (!bySurah.has(a.surah)) bySurah.set(a.surah, []);
      bySurah.get(a.surah).push(a);
    });
    const surahs = [...bySurah.keys()].sort((x, y) => x - y);

    navRoot.innerHTML = '';
    surahs.forEach((sn) => {
      const ayahs = bySurah.get(sn);

      const firstId = ayahs[0].id;
      const nameAr = ayahs[0].surahNameAr || '';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quran-iraab-nav-surah';
      btn.dataset.surah = String(sn);
      btn.dataset.firstAyahId = firstId;
      btn.dataset.harakahSrc = nameAr;
      btn.setAttribute('aria-label', `${surahMenuLabel(sn, nameAr)}. Open surah.`);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'quran-iraab-nav-surah__name';
      nameSpan.setAttribute('dir', 'rtl');
      nameSpan.setAttribute('lang', 'ar');
      nameSpan.textContent = surahMenuLabel(sn, arabicUiText(nameAr, false));

      const chevron = document.createElement('span');
      chevron.className = 'quran-iraab-nav-surah__chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = '▸';

      btn.appendChild(nameSpan);
      btn.appendChild(chevron);

      btn.addEventListener('click', () => {
        navigateTo(firstId);
        closeMobileSidebar();
      });

      navRoot.appendChild(btn);
    });

    function updateActive(id) {
      const entry = ayahList.find((a) => a.id === id);
      if (!entry) return;

      navRoot.querySelectorAll('.quran-iraab-nav-surah--current').forEach((el) => {
        el.classList.remove('quran-iraab-nav-surah--current');
        el.removeAttribute('aria-current');
      });

      const cur = navRoot.querySelector('.quran-iraab-nav-surah[data-surah="' + String(entry.surah) + '"]');
      if (cur) {
        cur.classList.add('quran-iraab-nav-surah--current');
        cur.setAttribute('aria-current', 'true');
        cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    function closeMobileSidebar() {
      const sidebar = document.getElementById('quran-iraab-sidebar');
      const toggle = document.getElementById('quran-iraab-nav-toggle');
      if (sidebar) sidebar.classList.remove('is-open');
      document.body.classList.remove('quran-iraab-nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    return updateActive;
  }

  function applyQuranIraabChromeHarakah() {
    if (typeof window.displayArabic !== 'function') return;
    document.querySelectorAll('[data-harakah-chrome]').forEach(function (el) {
      var src = el.getAttribute('data-harakah-src');
      if (src == null || src === '') {
        src = el.textContent;
        el.setAttribute('data-harakah-src', src);
      }
      el.textContent = window.displayArabic(src, false);
    });
  }

  function wireMobileSidebarNav() {
    const sidebar = document.getElementById('quran-iraab-sidebar');
    const toggle = document.getElementById('quran-iraab-nav-toggle');
    const backdrop = document.getElementById('quran-iraab-sidebar-backdrop');
    const closeBtn = document.getElementById('quran-iraab-sidebar-close');

    function openNav() {
      if (sidebar) sidebar.classList.add('is-open');
      document.body.classList.add('quran-iraab-nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      if (sidebar) sidebar.classList.remove('is-open');
      document.body.classList.remove('quran-iraab-nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        if (sidebar && sidebar.classList.contains('is-open')) closeNav();
        else openNav();
      });
    }
    if (backdrop) backdrop.addEventListener('click', closeNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
  }

  function init() {
    const ayahList = buildMergedAyahList();
    const container = document.getElementById('quran-iraab-detail');
    const surahSel = document.getElementById('quran-iraab-surah');
    const ayahSel = document.getElementById('quran-iraab-ayah');

    if (!container || !ayahList.length) {
      if (container) {
        container.innerHTML =
          '<p class="quran-iraab__empty">No Irab data loaded yet. Add entries in <code>quran-iraab-data.js</code> and ensure <code>quran-text-96-114.js</code> is present.</p>';
      }
      return;
    }

    let syncSelects = null;
    let updateSidebarActive = () => {};

    function navigateTo(id) {
      if (syncSelects) syncSelects(id);
      showAyah(id, container, ayahList);
      updateSidebarActive(id);
    }

    syncSelects = populateSurahAndAyahSelects(ayahList, surahSel, ayahSel, navigateTo);

    updateSidebarActive = setupLeftNav(ayahList, navigateTo);
    wireMobileSidebarNav();

    migrateLegacyIraabDirectStorage();
    document.documentElement.classList.toggle('quran-iraab--direct-iraab', !readIraabShowPrompts());
    applyGrammarModeClass();
    applyQuranIraabChromeHarakah();

    function refreshSurahAndNavHarakah() {
      if (typeof window.displayArabic !== 'function') return;
      if (surahSel) {
        Array.from(surahSel.options).forEach(function (opt) {
          var sn = Number(opt.value);
          var src = opt.dataset.harakahSrc;
          if (!src) {
            var first = ayahList.find(function (a) {
              return a.surah === sn;
            });
            src = first && first.surahNameAr ? first.surahNameAr : '';
            opt.dataset.harakahSrc = src;
          }
          opt.textContent = surahMenuLabel(sn, window.displayArabic(src, false));
        });
      }
      document.querySelectorAll('.quran-iraab-nav-surah').forEach(function (btn) {
        var nameSpan = btn.querySelector('.quran-iraab-nav-surah__name');
        if (!nameSpan) return;
        var sn = Number(btn.dataset.surah);
        var src = btn.dataset.harakahSrc;
        if (!src) {
          var first = ayahList.find(function (a) {
            return a.surah === sn;
          });
          src = first && first.surahNameAr ? first.surahNameAr : '';
          btn.dataset.harakahSrc = src;
        }
        nameSpan.textContent = surahMenuLabel(sn, window.displayArabic(src, false));
      });
    }

    function syncHarakahToggleButton() {
      if (typeof window.readShowHarakah !== 'function') return;
      const show = window.readShowHarakah();
      const ar = show ? 'إخفاء التشكيل' : 'إظهار التشكيل';
      document.querySelectorAll('[data-toggle-harakah]').forEach(function (btn) {
        btn.setAttribute('aria-label', show ? 'Hide harakah' : 'Show harakah');
        btn.setAttribute('title', 'Show / hide vowel marks (تشكيل)');
        btn.textContent = ar;
        btn.classList.toggle('quran-iraab-toolbar__harakah-btn--on', show);
      });
    }

    function refreshHarakahViewWithFade() {
      const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
      const entry = ayahList.find((a) => a.id === id);
      if (!entry || !container) return;
      container.classList.add('quran-iraab-detail--harakah-fade');
      window.setTimeout(function () {
        try {
          showSurahView(entry.surah, container, ayahList, id);
          updateSidebarActive(id);
          applyQuranIraabChromeHarakah();
          refreshSurahAndNavHarakah();
          syncHarakahToggleButton();
        } finally {
          container.classList.remove('quran-iraab-detail--harakah-fade');
        }
      }, 150);
    }

    const mainEl = document.getElementById('main');
    if (
      mainEl &&
      typeof window.writeShowHarakah === 'function' &&
      typeof window.readShowHarakah === 'function'
    ) {
      syncHarakahToggleButton();
      mainEl.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-toggle-harakah]');
        if (!btn) return;
        e.preventDefault();
        const nextShow = !window.readShowHarakah();
        window.writeShowHarakah(nextShow);
        syncHarakahToggleButton();
        refreshHarakahViewWithFade();
      });
    }

    const promptsCb = document.getElementById('quran-iraab-show-prompts');
    if (promptsCb) {
      promptsCb.checked = readIraabShowPrompts();
      promptsCb.addEventListener('change', () => {
        writeIraabShowPrompts(promptsCb.checked);
        const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
        const entry = ayahList.find((a) => a.id === id);
        if (entry && container) {
          showSurahView(entry.surah, container, ayahList, id);
          updateSidebarActive(id);
        }
      });
    }

    const LEGACY_HASH_IDS = { '101-1-3': '101-1', '103-1-2': '103-1' };

    function syncGrammarModeButtons() {
      document.querySelectorAll('[data-qg-mode]').forEach(function (btn) {
        const scholar = readQuranGrammarMode() === 'scholar';
        const isSch = btn.getAttribute('data-qg-mode') === 'scholar';
        btn.classList.toggle('is-active', scholar === isSch);
        btn.setAttribute('aria-pressed', scholar === isSch ? 'true' : 'false');
      });
    }
    syncGrammarModeButtons();

    const modeBar = document.querySelector('.qg-mode-bar');
    if (modeBar) {
      modeBar.addEventListener('click', function (e) {
        const t = e.target.closest('[data-qg-mode]');
        if (!t) return;
        const mode = t.getAttribute('data-qg-mode');
        writeQuranGrammarMode(mode === 'scholar' ? 'scholar' : 'beginner');
        syncGrammarModeButtons();
        const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
        const entry = ayahList.find(function (a) {
          return a.id === id;
        });
        if (entry && container) {
          showSurahView(entry.surah, container, ayahList, id);
          updateSidebarActive(id);
        }
        const tipEl = document.getElementById('qg-tooltip');
        if (tipEl) {
          tipEl.hidden = true;
          tipEl.innerHTML = '';
        }
      });
    }

    let qgTooltipCurrent = null;
    container.addEventListener('mousemove', function (e) {
      const tip = document.getElementById('qg-tooltip');
      if (!tip) return;
      if (readQuranGrammarMode() !== 'scholar') {
        if (!tip.hidden) {
          tip.hidden = true;
          tip.innerHTML = '';
        }
        qgTooltipCurrent = null;
        return;
      }
      const el = e.target.closest('.irab-term');
      if (!el || !container.contains(el)) {
        tip.hidden = true;
        tip.innerHTML = '';
        qgTooltipCurrent = null;
        return;
      }
      const term = el.getAttribute('data-term') || (el.textContent || '').trim();
      const roman = el.getAttribute('data-roman') || '';
      const def = el.getAttribute('data-def') || '';
      if (el !== qgTooltipCurrent) {
        qgTooltipCurrent = el;
        tip.innerHTML =
          '<div class="qg-tooltip__term" dir="rtl" lang="ar">' +
          escapeHtml(term) +
          '</div>' +
          (roman
            ? '<div class="qg-tooltip__roman" lang="en" dir="ltr">' + escapeHtml(roman) + '</div>'
            : '') +
          (def ? '<div class="qg-tooltip__def" lang="en" dir="ltr">' + escapeHtml(def) + '</div>' : '');
        tip.hidden = false;
      }
      const pad = 14;
      let x = e.clientX + pad;
      let y = e.clientY + pad;
      tip.style.left = Math.min(x, window.innerWidth - 248) + 'px';
      tip.style.top = Math.min(y, window.innerHeight - 100) + 'px';
    });

    function applyHashOrDefault() {
      let id = ayahList[0].id;
      if (window.location.hash && window.location.hash.length > 1) {
        let h = decodeURIComponent(window.location.hash.slice(1));
        if (LEGACY_HASH_IDS[h]) h = LEGACY_HASH_IDS[h];
        if (ayahList.some((a) => a.id === h)) id = h;
      }
      navigateTo(id);
    }

    function step(delta) {
      const cur = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
      const entry = ayahList.find((a) => a.id === cur);
      if (!entry) return;
      const inSurah = ayahsInSurah(ayahList, entry.surah);
      const idx = inSurah.findIndex((a) => a.id === cur);
      const nextIdx = idx + delta;
      if (nextIdx < 0 || nextIdx >= inSurah.length) return;
      navigateTo(inSurah[nextIdx].id);
    }

    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return;
      const t = e.target;
      if (
        t &&
        (t.closest('select') ||
          t.closest('input') ||
          t.closest('textarea') ||
          t.closest('a[href]') ||
          t.closest('.quran-iraab-nav-tree') ||
          t.closest('#quran-iraab-nav-toggle'))
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    });

    window.addEventListener('hashchange', applyHashOrDefault);

    applyHashOrDefault();

    const downloadNotesBtn = document.getElementById('quran-iraab-download-notes');
    if (downloadNotesBtn) {
      downloadNotesBtn.addEventListener('click', function () {
        downloadAyahNotesBackup(ayahList);
      });
    }

    if (typeof window.initQuranFormulaPanel === 'function') {
      window.initQuranFormulaPanel(container);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
