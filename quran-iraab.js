/**
 * Qurʾān Iʿrāb — merges curated rows from `quran-iraab-data.js` with full āyāt 95–114 text
 * from `quran-text-96-114.js`, appends standalone curated āyāt (e.g. other surahs with full `ayahText`), two-level navigation (surah → āyah), and unavailable state.
 * Choosing a surah shows **all** its āyāt in one scrollable column; the āyah menu (or ← / → keys)
 * moves within that surah and scrolls the active verse into view.
 * Per-word **Explanation** fields use `localStorage` (`quranIraabWordNotes`); the toolbar downloads a JSON backup.
 * **Studied surahs**: toolbar button toggles finish state per surah (`localStorage` `quranIraabStudiedSurahs`).
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

  /** Quran.com sometimes omits a real gloss but returns a dash or similar; use Arabic-only layout instead. */
  function sanitizedWbwGlossEn(raw) {
    const t = normalizeIraabEnglishToAscii(String(raw == null ? '' : raw).trim());
    if (!t) return '';
    if (/^[\s.\-:·…'"()[\]«»]+$/u.test(t)) return '';
    return t.trim();
  }

  /** Curated `segment: '—'` rows mark sentence-level notes; they are not surface words in the āyah. */
  function isPlaceholderAnalysisSegment(seg) {
    const s = String(seg == null ? '' : seg).trim();
    if (!s) return true;
    const t = normalizeIraabEnglishToAscii(s).trim();
    return /^[\s\-:]+$/u.test(t);
  }

  const IRAAB_UNAVAILABLE_AR = 'الْإِعْرَابُ غَيْرُ مُتَوَفَّرٍ لِهَذِهِ الْآيَةِ';
  /** `'beginner'` (default) or `'scholar'` — color legend, literal gloss line, floating term tooltips. */
  const QG_MODE_STORAGE_KEY = 'quranIraabGrammarMode';
  const WORD_NOTES_STORAGE_KEY = 'quranIraabWordNotes';
  /** Object keyed by surah number string, truthy = user marked surah studied. */
  const STUDIED_SURAHS_STORAGE_KEY = 'quranIraabStudiedSurahs';

  function readStudiedSurahsMap() {
    try {
      const raw = localStorage.getItem(STUDIED_SURAHS_STORAGE_KEY);
      if (!raw) return {};
      const o = JSON.parse(raw);
      return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    } catch (e) {
      return {};
    }
  }

  function writeStudiedSurahsMap(map) {
    try {
      localStorage.setItem(STUDIED_SURAHS_STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
      /* ignore */
    }
  }

  function isSurahStudied(sn) {
    return !!readStudiedSurahsMap()[String(sn)];
  }

  function setSurahStudied(sn, studied) {
    const m = readStudiedSurahsMap();
    const k = String(sn);
    if (studied) m[k] = true;
    else delete m[k];
    writeStudiedSurahsMap(m);
  }

  function toggleSurahStudied(sn) {
    const next = !isSurahStudied(sn);
    setSurahStudied(sn, next);
    return next;
  }

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
      ta.addEventListener('paste', function () {
        window.setTimeout(function () {
          setWordNote(ayahId, rowIndex, ta.value);
        }, 0);
      });
      ta.addEventListener('blur', function () {
        window.requestAnimationFrame(function () {
          setWordNote(ayahId, rowIndex, ta.value);
          applyModeFromValue();
        });
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

  /** Think-first prompts removed from UI; iʿrāb is always shown directly. */
  function readIraabShowPrompts() {
    return false;
  }

  /** Word-by-word strip (Quran.com) always enabled where the page uses it. */
  function readShowWbw() {
    return true;
  }

  function applyWbwDocClass() {
    document.documentElement.classList.remove('quran-iraab--hide-wbw');
  }

  /** Quran.com `verse_key` when `ayah` is a positive integer; otherwise empty (no WBW fetch). */
  function verseApiKey(entry) {
    if (!entry || entry.surah == null || entry.ayah == null) return '';
    const an = Number(entry.ayah);
    if (!Number.isFinite(an) || an < 1) return '';
    return String(Number(entry.surah)) + ':' + String(an);
  }

  function renderWbwPlaceholder(entry) {
    if (!readShowWbw()) return '';
    const vk = verseApiKey(entry);
    if (!vk) return '';
    return (
      '<section class="quran-iraab__wbw quran-iraab__wbw--pending" data-wbw-key="' +
      escapeHtml(vk) +
      '" aria-busy="true">' +
      '<p class="quran-iraab__wbw-loading" lang="en">Loading word-by-word…</p>' +
      '</section>'
    );
  }

  function fillWbwSections(container, verseMap) {
    if (!container || !readShowWbw()) return;
    const dispAr =
      typeof window.displayArabic === 'function' ? window.displayArabic.bind(window) : (t) => String(t || '');
    container.querySelectorAll('.quran-iraab__wbw[data-wbw-key]').forEach((sec) => {
      const key = sec.getAttribute('data-wbw-key');
      const data = verseMap.get(key);
      if (!data) {
        sec.classList.remove('quran-iraab__wbw--pending');
        sec.removeAttribute('aria-busy');
        sec.innerHTML =
          '<p class="quran-iraab__wbw-error" lang="en">No word data for this verse.</p>';
        return;
      }
      let wordsHtml = '';
      for (let i = 0; i < data.words.length; i++) {
        const w = data.words[i];
        /** Always show vocalization here so glosses match full `ayahText` (toolbar tashkīl does not strip blockquote). */
        let arShown = dispAr(w.ar, true);
        if (typeof window.stripQuranSmallMeemHints === 'function') {
          arShown = window.stripQuranSmallMeemHints(arShown);
        }
        const en = sanitizedWbwGlossEn(w.en);
        const wordCls =
          'quran-iraab__wbw-word' + (en ? '' : ' quran-iraab__wbw-word--no-en');
        wordsHtml +=
          '<div class="' +
          wordCls +
          '" role="listitem">' +
          '<span class="quran-iraab__wbw-ar" lang="ar" dir="rtl">' +
          escapeHtml(arShown) +
          '</span>' +
          (en
            ? '<span class="quran-iraab__wbw-meaning" lang="en" dir="ltr">' +
              escapeHtml(en) +
              '</span>'
            : '') +
          '</div>';
      }
      const ayahEn = normalizeIraabEnglishToAscii(data.ayahEn || '');
      sec.classList.remove('quran-iraab__wbw--pending');
      sec.removeAttribute('aria-busy');
      sec.setAttribute(
        'aria-label',
        'Word-by-word meanings (Saheeh International, Quran.com)'
      );
      sec.innerHTML =
        '<div class="quran-iraab__wbw-words" role="list">' +
        wordsHtml +
        '</div>' +
        (ayahEn
          ? '<p class="quran-iraab__wbw-ayah-en" lang="en" dir="ltr">' +
            escapeHtml(ayahEn) +
            '</p>'
          : '');
    });
  }

  /**
   * Compare Quran.com Uthmani tokens to curated `segment` strings: strip tashkīl, drop tatweel/ZWJ,
   * NFKC, map alef wasla → alef, alef maksura → ya (فِى vs فِي), drop Qurʾānic superscripts on هُ (U+06E5/U+06E6).
   */
  function normalizeWordMatchKey(str) {
    let t = String(str == null ? '' : str);
    if (typeof window.stripHarakah === 'function') {
      t = window.stripHarakah(t);
    }
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

  /** Space-delimited word slices with indices into `ayah` (Uthmani). */
  function ayahWordSpans(ayah) {
    const spans = [];
    const s = String(ayah);
    let i = 0;
    const n = s.length;
    while (i < n) {
      while (i < n && s[i] === ' ') i++;
      if (i >= n) break;
      const start = i;
      while (i < n && s[i] !== ' ') i++;
      spans.push({ start, end: i, text: s.slice(start, i) });
    }
    return spans;
  }

  /** Āyah label → positive integer, or NaN (supports Eastern Arabic digits). */
  function parseWesternAyahNumber(ayah) {
    if (typeof ayah === 'number' && Number.isFinite(ayah)) return ayah;
    const s = String(ayah == null ? '' : ayah).trim();
    if (!s) return NaN;
    let buf = '';
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      const ord = ch.charCodeAt(0);
      if (ch >= '0' && ch <= '9') {
        buf += ch;
        continue;
      }
      if (ord >= 0x0660 && ord <= 0x0669) {
        buf += String(ord - 0x0660);
        continue;
      }
      if (ord >= 0x06f0 && ord <= 0x06f9) {
        buf += String(ord - 0x06f0);
        continue;
      }
      if (buf.length) break;
    }
    const n = Number(buf);
    return Number.isFinite(n) ? n : NaN;
  }

  /**
   * Mushaf text often prefixes بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ to every surah's first āyah; Quran.com
   * verse keys (and WBW) omit it except Al-Fātiḥah. Strip that prefix for on-screen āyah text only.
   */
  function stripLeadingBasmalahForViewer(ayahText, surahNum, ayahLabel) {
    const raw = String(ayahText == null ? '' : ayahText);
    const sNum = Number(surahNum);
    const aNum = parseWesternAyahNumber(ayahLabel);
    if (!Number.isFinite(sNum) || sNum === 1 || aNum !== 1) return raw;
    const trimmed = raw.trim();
    if (!trimmed) return raw;
    const basmalahKeys = ['بِسْمِ', 'ٱللَّهِ', 'ٱلرَّحْمَٰنِ', 'ٱلرَّحِيمِ'].map((w) =>
      normalizeWordMatchKey(w)
    );
    const spans = ayahWordSpans(trimmed);
    if (spans.length < 5) return raw;
    for (let i = 0; i < 4; i++) {
      if (normalizeWordMatchKey(spans[i].text) !== basmalahKeys[i]) return raw;
    }
    return trimmed.slice(spans[4].start).trim();
  }

  function ayahTextForViewer(entry) {
    return stripLeadingBasmalahForViewer(entry.ayahText, entry.surah, entry.ayah);
  }

  /**
   * Map curated `segment` onto the real Uthmani substring in `ayah` after `minPos`.
   * Uses `normalizeWordMatchKey` (not raw `indexOf`) so ى/ي, ـٍ vs ـٍۢ, ـا vs ـآ, etc. align;
   * avoids `indexOf` stopping early on `يَدَا` inside `يَدَآ`.
   */
  function findCuratedSegmentInAyah(ayah, segment, minPos) {
    const segStr = String(segment);
    if (!segStr.trim()) return null;
    const from = Math.max(0, minPos);
    const parts = segStr.trim().split(/\s+/).filter(Boolean);
    const keys = parts.map((p) => normalizeWordMatchKey(p)).filter(Boolean);
    if (!keys.length) return null;

    const spans = ayahWordSpans(ayah);

    if (parts.length === 1) {
      for (const sp of spans) {
        if (sp.end <= from) continue;
        if (normalizeWordMatchKey(sp.text) !== keys[0]) continue;
        return { index: sp.start, end: sp.end, text: sp.text };
      }
      return null;
    }

    for (let w = 0; w < spans.length; w++) {
      if (spans[w].start < from) continue;
      let ok = true;
      for (let k = 0; k < keys.length; k++) {
        const sp = spans[w + k];
        if (!sp || normalizeWordMatchKey(sp.text) !== keys[k]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        const first = spans[w];
        const last = spans[w + keys.length - 1];
        return {
          index: first.start,
          end: last.end,
          text: String(ayah).slice(first.start, last.end),
        };
      }
    }
    return null;
  }

  /**
   * Consumes Quran.com `words` in verse order and assigns each curated `segment`
   * (possibly multi-word) the joined Saheeh International gloss(es).
   */
  function glossesForIraabSegments(apiWords, segments) {
    const norms = apiWords.map((w) => normalizeWordMatchKey(w.ar));
    const result = [];
    let wi = 0;
    for (let s = 0; s < segments.length; s++) {
      if (isPlaceholderAnalysisSegment(segments[s])) {
        result.push('');
        continue;
      }
      const target = normalizeWordMatchKey(segments[s]);
      if (!target) {
        result.push('');
        continue;
      }
      if (wi >= norms.length) {
        result.push('');
        continue;
      }
      const startWi = wi;
      let acc = '';
      const glossParts = [];
      let matched = false;
      while (wi < norms.length) {
        acc += norms[wi];
        const en = sanitizedWbwGlossEn(apiWords[wi].en);
        if (en) glossParts.push(en);
        wi++;
        if (acc === target) {
          result.push(glossParts.join(' '));
          matched = true;
          break;
        }
        if (acc.length > target.length) {
          wi = startWi;
          result.push('');
          matched = true;
          break;
        }
      }
      if (!matched) {
        wi = startWi;
        result.push('');
      }
    }
    return result;
  }

  /** Scholar: Quran.com English gloss belongs under the Qurʾānic phrase column in the gloss table (not above it). */
  function syncPhraseHeadGlossInScholarTable(card) {
    if (!card || readQuranGrammarMode() !== 'scholar') return;
    const mount = card.querySelector('[data-beginner-focus-rows-mount]');
    if (!mount) return;
    const phraseEn = mount.querySelector(
      '.iraab-word-gloss-table__cell--en.iraab-word-gloss-table__cell--phrase-head'
    );
    if (!phraseEn) return;
    const active = Number(card.dataset.beginnerActiveRow || '0');
    const hidden = card.querySelector('[data-beginner-gloss-row="' + String(active) + '"]');
    const rawEn = hidden && hidden.textContent ? hidden.textContent.trim() : '';
    const segRaw = hidden && hidden.getAttribute('data-segment') != null ? hidden.getAttribute('data-segment') : '';
    if (isPlaceholderAnalysisSegment(segRaw)) {
      phraseEn.textContent = '';
      return;
    }
    phraseEn.textContent = sanitizedWbwGlossEn(rawEn) || '';
  }

  function syncBeginnerFocusGlossFromStore(card) {
    if (!card || card.getAttribute('data-beginner-card') !== '1') return;
    const glossEl = card.querySelector('[data-beginner-focus-gloss]');
    if (!glossEl) return;

    if (readQuranGrammarMode() !== 'scholar') {
      glossEl.textContent = '';
      glossEl.setAttribute('lang', 'en');
      glossEl.setAttribute('dir', 'ltr');
      glossEl.classList.remove('qg-beginner-focus-gloss--ar-fallback');
      glossEl.classList.add('qg-beginner-focus-gloss--empty');
      return;
    }

    syncPhraseHeadGlossInScholarTable(card);
    const mount = card.querySelector('[data-beginner-focus-rows-mount]');
    const hasPhraseCol = !!(mount && mount.querySelector('.iraab-word-gloss-table__cell--phrase-head'));
    if (hasPhraseCol) {
      glossEl.textContent = '';
      glossEl.setAttribute('lang', 'en');
      glossEl.setAttribute('dir', 'ltr');
      glossEl.classList.remove('qg-beginner-focus-gloss--ar-fallback');
      glossEl.classList.add('qg-beginner-focus-gloss--empty');
      return;
    }

    const active = Number(card.dataset.beginnerActiveRow || '0');
    const hidden = card.querySelector('[data-beginner-gloss-row="' + String(active) + '"]');
    const en = hidden && hidden.textContent ? hidden.textContent.trim() : '';
    const segRaw = hidden && hidden.getAttribute('data-segment') != null ? hidden.getAttribute('data-segment') : '';
    if (isPlaceholderAnalysisSegment(segRaw)) {
      glossEl.textContent = '';
      glossEl.setAttribute('lang', 'en');
      glossEl.setAttribute('dir', 'ltr');
      glossEl.classList.remove('qg-beginner-focus-gloss--ar-fallback');
      glossEl.classList.add('qg-beginner-focus-gloss--empty');
      return;
    }
    if (en) {
      glossEl.textContent = en;
      glossEl.setAttribute('lang', 'en');
      glossEl.setAttribute('dir', 'ltr');
      glossEl.classList.remove('qg-beginner-focus-gloss--empty', 'qg-beginner-focus-gloss--ar-fallback');
      return;
    }
    const arShown = String(displayAyahChunk(segRaw, true) || '').trim();
    if (arShown) {
      glossEl.textContent = arShown;
      glossEl.setAttribute('lang', 'ar');
      glossEl.setAttribute('dir', 'rtl');
      glossEl.classList.add('qg-beginner-focus-gloss--ar-fallback');
      glossEl.classList.remove('qg-beginner-focus-gloss--empty');
      return;
    }
    glossEl.textContent = '';
    glossEl.setAttribute('lang', 'en');
    glossEl.setAttribute('dir', 'ltr');
    glossEl.classList.remove('qg-beginner-focus-gloss--ar-fallback');
    glossEl.classList.add('qg-beginner-focus-gloss--empty');
  }

  function fillBreakdownWordGlosses(container, verseMap) {
    if (!container || !verseMap || typeof verseMap.get !== 'function') return;
    container.querySelectorAll('.quran-iraab__card[data-ayah-id]').forEach((card) => {
      const id = card.getAttribute('data-ayah-id');
      if (!id || !/^\d+-\d+$/.test(id)) return;
      const idParts = id.split('-');
      const verseKey = idParts[0] + ':' + idParts[1];
      const verseData = verseMap.get(verseKey);
      if (!verseData || !verseData.words || !verseData.words.length) return;
      const segments = [];
      card.querySelectorAll('.qg-word-card[data-segment]').forEach((rowEl) => {
        const seg = rowEl.getAttribute('data-segment');
        if (seg != null) segments.push(seg);
      });
      if (!segments.length) {
        card.querySelectorAll('[data-beginner-gloss-row][data-segment]').forEach((rowEl) => {
          const seg = rowEl.getAttribute('data-segment');
          if (seg != null) segments.push(seg);
        });
      }
      if (!segments.length) return;
      const glosses = glossesForIraabSegments(verseData.words, segments);
      const rows = card.querySelectorAll('.qg-word-card[data-segment]');
      rows.forEach((rowEl, idx) => {
        const el = rowEl.querySelector('.qg-word-card__word-meaning');
        if (!el) return;
        const g = glosses[idx] != null ? glosses[idx] : '';
        const shown = sanitizedWbwGlossEn(g);
        el.textContent = shown;
        el.hidden = !shown;
      });
      card.querySelectorAll('[data-beginner-gloss-row]').forEach((el) => {
        const ri = Number(el.getAttribute('data-beginner-gloss-row'));
        if (Number.isNaN(ri)) return;
        const g = glosses[ri] != null ? glosses[ri] : '';
        const shown = sanitizedWbwGlossEn(g);
        el.textContent = shown;
      });
      if (card.getAttribute('data-beginner-card') === '1') {
        syncBeginnerFocusGlossFromStore(card);
      }
    });
  }

  /** Loads Quran.com chapter payload: word-by-word strip (optional) + breakdown glosses under each iʿrāb row. */
  function scheduleHydrateWbw(container, surahNum) {
    if (!container) return;
    if (typeof window.fetchQuranChapterWbw !== 'function') {
      if (readShowWbw()) {
        container.querySelectorAll('.quran-iraab__wbw').forEach((sec) => {
          sec.classList.remove('quran-iraab__wbw--pending');
          sec.removeAttribute('aria-busy');
          sec.innerHTML =
            '<p class="quran-iraab__wbw-error" lang="en">Word-by-word script missing.</p>';
        });
      }
      return;
    }
    window
      .fetchQuranChapterWbw(surahNum)
      .then((map) => {
        if (readShowWbw()) fillWbwSections(container, map);
        fillBreakdownWordGlosses(container, map);
      })
      .catch(() => {
        if (readShowWbw()) {
          container.querySelectorAll('.quran-iraab__wbw').forEach((sec) => {
            sec.classList.remove('quran-iraab__wbw--pending');
            sec.removeAttribute('aria-busy');
            sec.innerHTML =
              '<p class="quran-iraab__wbw-error" lang="en">Could not load word-by-word data.</p>';
          });
        }
      });
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

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function scholarAnnotateTerms(html, analysisEn) {
    if (html == null || html === '') return '';
    const def = escapeAttr(String(analysisEn || ''));
    return String(html).replace(
      /<span class="irab-term" style="([^"]+)">([^<]*)<\/span>/gi,
      function (_full, style, inner) {
        return (
          '<span class="irab-term" style="' +
          style.replace(/"/g, '&quot;') +
          '" data-term="' +
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
   * Coloured iʿrāb fragment for `renderAnalysisParts` (flowing paragraph).
   * Scholar: `colorizeIraab` (+ optional per-token gloss columns when English is on) + term tooltips.
   * Beginner: `colorizeIraabClasses` — same `.irab-term` spans with CSS family backgrounds (no inline colours).
   * @param {{ analysisEn?: string, ruleLinkInner?: boolean }} [opts]
   */
  function iraabFragmentHtml(raw, alwaysShowHarakah, opts) {
    if (raw == null || raw === '') return '';
    let t =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(String(raw), alwaysShowHarakah)
        : String(raw);
    if (typeof window.stripQuranSmallMeemHints === 'function') {
      t = window.stripQuranSmallMeemHints(t);
    }
    if (opts && opts.ruleLinkInner) {
      return escapeHtml(t);
    }
    const rawDef = opts && opts.analysisEn != null ? opts.analysisEn : '';
    const analysisEn = SHOW_QURAN_IRAAB_ENGLISH ? rawDef : '';
    const scholar = readQuranGrammarMode() === 'scholar';

    if (scholar) {
      let html;
      if (typeof window.formatIraabLineWithWordGlosses === 'function') {
        html = window.formatIraabLineWithWordGlosses(t, {
          colorizeWord: (w) =>
            typeof window.colorizeIraab === 'function' ? window.colorizeIraab(w) : escapeHtml(w),
        });
      } else {
        html = typeof window.colorizeIraab === 'function' ? window.colorizeIraab(t) : escapeHtml(t);
      }
      return scholarAnnotateTerms(html, analysisEn);
    }

    return typeof window.colorizeIraabClasses === 'function'
      ? window.colorizeIraabClasses(t)
      : typeof window.colorizeIraab === 'function'
        ? window.colorizeIraab(t)
        : escapeHtml(t);
  }

  function renderLinkPart(p, row) {
    const href = lessonHref(p.rule);
    const pair = lessonTitlePairForRule(p.rule);
    const arTitle = (pair.ar && String(pair.ar).trim()) || '';
    const arInPill = arabicUiText(p.text != null ? String(p.text) : '', false);
    const labelPlain = arTitle ? arTitle + ' — ' + arInPill : arInPill;
    const showTitle = readQuranGrammarMode() === 'scholar';
    const colors =
      typeof window.iraabColorsForRule === 'function'
        ? window.iraabColorsForRule(p.rule)
        : { bg: '#F1EFE8', text: '#444441', border: '#B4B2A9' };
    const linkInner = iraabFragmentHtml(p.text, false, {
      analysisEn: effectiveAnalysisEn(row),
      ruleLinkInner: true,
    });

    const titleAttr =
      showTitle && arTitle ? ' title="' + escapeAttr(arabicUiText(arTitle, false)) + '"' : '';
    const pillStyle =
      'background: ' +
      colors.bg +
      '; color: ' +
      colors.text +
      '; border: 0.5px solid ' +
      colors.border +
      '; border-radius: 4px; padding: 2px 6px; font-weight: 500; text-decoration: none; cursor: pointer; box-decoration-break: clone; -webkit-box-decoration-break: clone';

    return (
      '<span class="quran-iraab__rule-link-stack">' +
      '<a class="quran-iraab__rule-link" href="' +
      escapeHtml(href) +
      '"' +
      titleAttr +
      ' aria-label="' +
      escapeAttr(labelPlain) +
      '" dir="rtl" lang="ar" style="' +
      escapeAttr(pillStyle) +
      '">' +
      linkInner +
      '</a></span>'
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

  /** Plain text for `speechSynthesis`: Qurʾānic phrase + full analysis (`displayArabic` uses **`readShowHarakah()`** for the analysis portion). */
  function iraabRowSpeakText(row) {
    if (!row || !row.analysisParts || !row.analysisParts.length) return '';
    const rawAnalysis = rowAnalysisPlain(row).trim();
    if (!rawAnalysis) return '';
    const showHarakah =
      typeof window.readShowHarakah === 'function' ? window.readShowHarakah() : true;
    let analysisDisp =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(rawAnalysis, showHarakah)
        : rawAnalysis;
    if (typeof window.stripQuranSmallMeemHints === 'function') {
      analysisDisp = window.stripQuranSmallMeemHints(analysisDisp);
    }
    analysisDisp = String(analysisDisp).replace(/\s+/g, ' ').trim();
    const segRaw = row.segment == null ? '' : String(row.segment).trim();
    if (!segRaw || isPlaceholderAnalysisSegment(segRaw)) {
      return analysisDisp;
    }
    let segDisp = displayAyahChunk(segRaw, true);
    if (typeof window.stripQuranSmallMeemHints === 'function') {
      segDisp = window.stripQuranSmallMeemHints(segDisp);
    }
    segDisp = String(segDisp).replace(/\s+/g, ' ').trim();
    return segDisp + '۔ ' + analysisDisp;
  }

  let iraabTtsActiveCard = null;

  function iraabSpeechSupported() {
    return (
      typeof window !== 'undefined' &&
      window.speechSynthesis &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  function setIraabTtsSpeakingUi(card, speaking) {
    if (!card) return;
    const btn = card.querySelector('[data-iraab-speak-toggle]');
    if (!btn) return;
    const lab = btn.querySelector('.qg-beginner-focus-nav__tts-label');
    if (speaking) {
      if (lab) lab.textContent = 'Stop';
      else btn.textContent = 'Stop';
      btn.setAttribute('aria-label', 'Stop reading');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      if (lab) lab.textContent = 'Read aloud';
      else btn.textContent = 'Read aloud';
      btn.setAttribute('aria-label', 'Read iʿrāb aloud');
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  function cancelIraabSpeech() {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (e) {
      /* ignore */
    }
    if (iraabTtsActiveCard) {
      const c = iraabTtsActiveCard;
      iraabTtsActiveCard = null;
      setIraabTtsSpeakingUi(c, false);
    }
  }

  function pickArabicSpeechVoice() {
    const synth = window.speechSynthesis;
    if (!synth) return null;
    const voices = synth.getVoices();
    if (!voices || !voices.length) return null;
    let fallback = null;
    for (let i = 0; i < voices.length; i++) {
      const v = voices[i];
      if (!v.lang || !/^ar/i.test(v.lang)) continue;
      const n = (v.name || '').toLowerCase();
      if (/saudi|enhanced|maged|taha|tarik|amel|male|female/i.test(n)) return v;
      if (!fallback) fallback = v;
    }
    return fallback;
  }

  function speakIraabRow(card, row) {
    if (!iraabSpeechSupported()) return;
    const text = iraabRowSpeakText(row);
    if (!text) return;
    cancelIraabSpeech();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ar-SA';
    const voice = pickArabicSpeechVoice();
    if (voice) utter.voice = voice;
    utter.rate = 0.9;

    iraabTtsActiveCard = card;
    setIraabTtsSpeakingUi(card, true);

    utter.onend = function () {
      if (iraabTtsActiveCard === card) {
        iraabTtsActiveCard = null;
        setIraabTtsSpeakingUi(card, false);
      }
    };
    utter.onerror = function () {
      if (iraabTtsActiveCard === card) {
        iraabTtsActiveCard = null;
        setIraabTtsSpeakingUi(card, false);
      }
    };

    try {
      window.speechSynthesis.speak(utter);
    } catch (e) {
      iraabTtsActiveCard = null;
      setIraabTtsSpeakingUi(card, false);
    }
  }

  function wireIraabSpeakButton(card, entry) {
    const btn = card.querySelector('[data-iraab-speak-toggle]');
    if (!btn || card.getAttribute('data-beginner-card') !== '1') return;
    if (readQuranGrammarMode() !== 'scholar') return;
    if (!iraabSpeechSupported()) {
      btn.disabled = true;
      btn.title = 'Read aloud is not supported in this browser.';
      return;
    }
    btn.disabled = false;
    btn.removeAttribute('title');
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-pressed') === 'true') {
        cancelIraabSpeech();
        return;
      }
      const idx = Number(card.dataset.beginnerActiveRow || '0');
      const rows = entry.rows;
      if (!rows || !rows[idx]) return;
      speakIraabRow(card, rows[idx]);
    });
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

  function linkEnglishGlossForRule(rule) {
    const g = glossForRuleId(rule);
    if (g) return g;
    const pair = lessonTitlePairForRule(rule);
    return normalizeIraabEnglishToAscii(String(pair.en || '').trim()) || '';
  }

  /** Vocalized analysis fragment for splitting into gloss-table tokens (matches `iraabFragmentHtml` preprocessing). */
  function iraabTextDisplayForTokenizing(rawJoined) {
    let t =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(String(rawJoined == null ? '' : rawJoined), false)
        : String(rawJoined == null ? '' : rawJoined);
    if (typeof window.stripQuranSmallMeemHints === 'function') {
      t = window.stripQuranSmallMeemHints(t);
    }
    return t;
  }

  function pushTokenColumnsFromText(cols, rawJoined) {
    const t = iraabTextDisplayForTokenizing(rawJoined);
    if (!String(t).trim()) return;
    const splitParts = String(t).split(/(\s+)/);
    for (let si = 0; si < splitParts.length; si++) {
      const seg = splitParts[si];
      if (!seg || /^\s+$/.test(seg)) continue;
      cols.push({ type: 'token', surface: seg });
    }
  }

  /**
   * Scholar: one gloss grid — Qurʾānic phrase, rule pill(s), then spaced tokens (same column flow as Beginner table).
   */
  function buildScholarIraabGlossColumns(row) {
    const parts = row && row.analysisParts;
    if (!parts || !parts.length) return [];
    const cols = [];
    const seg = row.segment == null ? '' : String(row.segment).trim();
    if (seg && !isPlaceholderAnalysisSegment(seg)) {
      cols.push({
        type: 'html',
        phraseHead: true,
        arHtml:
          '<span class="iraab-word-gloss-table__phrase" lang="ar" dir="rtl">' +
          escapeHtml(displayAyahChunk(seg, true)) +
          '</span>',
        en: '',
      });
    }
    let i = 0;
    while (i < parts.length) {
      const p = parts[i];
      if (p.type === 'link') {
        cols.push({
          type: 'html',
          arHtml: renderLinkPart(p, row),
          en: linkEnglishGlossForRule(p.rule),
        });
        i += 1;
        while (i < parts.length && parts[i].type === 'text') {
          const rawTexts = [];
          while (i < parts.length && parts[i].type === 'text') {
            rawTexts.push(parts[i].text);
            i += 1;
          }
          pushTokenColumnsFromText(cols, rawTexts.join(''));
        }
      } else {
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        pushTokenColumnsFromText(cols, rawTexts.join(''));
      }
    }
    return cols;
  }

  /**
   * Single flowing paragraph: term links + explanation inline, إعراب keywords highlighted (no boxes/rules).
   */
  function renderAnalysisParts(row) {
    const parts = row && row.analysisParts;
    if (!parts || !parts.length) return '';

    if (readQuranGrammarMode() === 'scholar' && typeof window.formatIraabMixedColumnsChunked === 'function') {
      const glossCols = buildScholarIraabGlossColumns(row);
      if (glossCols.length) {
        const html = window.formatIraabMixedColumnsChunked(glossCols, {
          colorizeWord: (w) =>
            typeof window.colorizeIraab === 'function' ? window.colorizeIraab(w) : escapeHtml(w),
        });
        const analysisEn = SHOW_QURAN_IRAAB_ENGLISH ? effectiveAnalysisEn(row) : '';
        return `<div class="quran-iraab__analysis-parts quran-iraab__analysis-parts--scholar-gloss">${scholarAnnotateTerms(
          html,
          analysisEn
        )}</div>`;
      }
    }

    const chunks = [];
    let i = 0;
    while (i < parts.length) {
      const p = parts[i];
      if (p.type === 'link') {
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
            analysisEn: effectiveAnalysisEn(row),
          });
        }
        chunks.push(explain ? `${head} ${explain}` : head);
      } else {
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        chunks.push(
          iraabFragmentHtml(rawTexts.join(''), false, {
            analysisEn: effectiveAnalysisEn(row),
          })
        );
      }
    }
    const body = chunks.filter(Boolean).join(' ');
    return `<div class="quran-iraab__analysis-parts">${body}</div>`;
  }

  /** Qurʾān line display: tashkīl preference + strip ۟/۠/ۢ/ۭ (mushaf marks KFGQPC often omits). */
  function displayAyahChunk(text, alwaysHarakah) {
    const ah = alwaysHarakah !== false;
    let t =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(String(text == null ? '' : text), ah)
        : String(text == null ? '' : text);
    if (typeof window.stripQuranSmallMeemHints === 'function') {
      t = window.stripQuranSmallMeemHints(t);
    }
    return t;
  }

  /**
   * Scholar: Qurʾānic segment above analysis — omitted when that phrase is already column 1 of the gloss table.
   */
  function scholarAnalysisSegmentHtml(row) {
    if (readQuranGrammarMode() !== 'scholar') return '';
    const seg = row.segment == null ? '' : String(row.segment).trim();
    if (!seg || isPlaceholderAnalysisSegment(seg)) return '';
    if (
      typeof window.formatIraabMixedColumnsChunked === 'function' &&
      buildScholarIraabGlossColumns(row).length > 0
    ) {
      return '';
    }
    return (
      '<div class="quran-iraab__analysis-segment" lang="ar" dir="rtl">' +
      escapeHtml(displayAyahChunk(seg, true)) +
      '</div>'
    );
  }

  /**
   * Beginner: map full `ayahText` to clickable segment buttons (curated row order).
   * @returns {{ html: string, tokenized: boolean }}
   */
  function buildBeginnerAyahTokensHtml(entry, rows) {
    const ayah = ayahTextForViewer(entry);
    if (!rows || !rows.length) {
      return {
        html:
          '<blockquote class="quran-iraab__ayah" lang="ar" dir="rtl">' +
          escapeHtml(displayAyahChunk(ayah, true)) +
          '</blockquote>',
        tokenized: false,
      };
    }
    let pos = 0;
    const chunks = [];
    for (let i = 0; i < rows.length; i++) {
      const seg = rows[i].segment == null ? '' : String(rows[i].segment);
      if (!seg.trim()) {
        continue;
      }
      if (isPlaceholderAnalysisSegment(seg)) {
        continue;
      }
      const found = findCuratedSegmentInAyah(ayah, seg, pos);
      if (!found) {
        return {
          html:
            '<blockquote class="quran-iraab__ayah quran-iraab__ayah--plain" lang="ar" dir="rtl">' +
            escapeHtml(displayAyahChunk(ayah, true)) +
            '</blockquote>',
          tokenized: false,
        };
      }
      const idx = found.index;
      if (idx > pos) {
        chunks.push({ type: 'gap', text: ayah.slice(pos, idx) });
      }
      chunks.push({ type: 'token', text: found.text, index: i });
      pos = found.end;
    }
    if (pos < ayah.length) {
      chunks.push({ type: 'gap', text: ayah.slice(pos) });
    }
    let html = '';
    for (let c = 0; c < chunks.length; c++) {
      const p = chunks[c];
      if (p.type === 'gap') {
        html +=
          '<span class="quran-iraab__ayah-gap">' + escapeHtml(displayAyahChunk(p.text, true)) + '</span>';
      } else {
        const label = 'Focus row ' + String(p.index + 1) + ' of ' + String(rows.length);
        html +=
          '<button type="button" class="quran-iraab__ayah-token" data-beginner-row="' +
          p.index +
          '" aria-label="' +
          escapeAttr(label) +
          '">' +
          escapeHtml(displayAyahChunk(p.text, true)) +
          '</button>';
      }
    }
    return {
      html: '<div class="quran-iraab__ayah quran-iraab__ayah--tokens" lang="ar" dir="rtl">' + html + '</div>',
      tokenized: true,
    };
  }

  function beginnerFallbackSegmentChipsHtml(rows) {
    let html = '';
    for (let i = 0; i < rows.length; i++) {
      const seg = rows[i].segment == null ? '' : String(rows[i].segment);
      if (!seg.trim() || isPlaceholderAnalysisSegment(seg)) continue;
      html +=
        '<button type="button" class="quran-iraab__ayah-token quran-iraab__ayah-token--chip" data-beginner-row="' +
        i +
        '" aria-label="' +
        escapeAttr('Focus phrase ' + String(i + 1)) +
        '">' +
        escapeHtml(displayAyahChunk(seg, true)) +
        '</button>';
    }
    return html
      ? '<div class="quran-iraab__ayah-fallback-chips" role="group" aria-label="Analysed phrases">' +
          html +
          '</div>'
      : '';
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

  function renderAnalysisBody(row) {
    return { flow: true, html: renderAnalysisParts(row) };
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
        ? `<div class="quran-iraab__analysis quran-iraab__analysis--flow" lang="ar" dir="rtl">${scholarAnalysisSegmentHtml(row)}${inner}</div>`
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

    /** Curated āyāt whose ids are `surah-ayah` but lie outside 95–114 (full text + rows live only in `quran-iraab-data.js`). */
    const seenExtra = new Set(out.map((e) => e.id));
    for (let ix = 0; ix < raw.length; ix++) {
      const ex = raw[ix];
      if (!ex || ex.id == null) continue;
      const sid = String(ex.id);
      if (/^\d+-\d+-\d+$/.test(sid)) continue;
      if (!/^\d+-\d+$/.test(sid)) continue;
      if (seenExtra.has(sid)) continue;
      seenExtra.add(sid);
      out.push(ex);
    }
    /** Keep Juz ʿAmma block (95–114) first in list order so default `#` / first row stays 95:1; extras follow. */
    const MAIN_SURAH_MIN = 95;
    const MAIN_SURAH_MAX = 114;
    function ayahBucket(entry) {
      const s = entry.surah;
      return s >= MAIN_SURAH_MIN && s <= MAIN_SURAH_MAX ? 0 : 1;
    }
    out.sort((a, b) => {
      const bk = ayahBucket(a) - ayahBucket(b);
      if (bk !== 0) return bk;
      if (a.surah !== b.surah) return a.surah - b.surah;
      const ax = Number(a.ayah);
      const bx = Number(b.ayah);
      if (!Number.isNaN(ax) && !Number.isNaN(bx)) return ax - bx;
      return String(a.ayah).localeCompare(String(b.ayah), 'ar');
    });

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
            <blockquote class="quran-iraab__ayah" lang="ar" dir="rtl">${escapeHtml(displayAyahChunk(ayahTextForViewer(entry), true))}</blockquote>
            ${renderWbwPlaceholder(entry)}
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

    const rows = entry.rows;
    const nRows = rows.length;
    const ayahTok = buildBeginnerAyahTokensHtml(entry, rows);
    const chips = !ayahTok.tokenized ? beginnerFallbackSegmentChipsHtml(rows) : '';
    const glossStore = rows
      .map((row, idx) => {
        const seg = row.segment == null ? '' : String(row.segment);
        return (
          '<span data-beginner-gloss-row="' +
          idx +
          '" data-segment="' +
          escapeAttr(seg) +
          '"></span>'
        );
      })
      .join('');
    const nav =
      '<div class="qg-beginner-focus-nav">' +
      '<button type="button" class="qg-beginner-focus-nav__btn" data-beginner-prev aria-label="Previous word">' +
      '<span aria-hidden="true">←</span>' +
      '</button>' +
      '<span class="qg-beginner-focus-nav__pos" data-beginner-pos>1 / ' +
      String(nRows) +
      '</span>' +
      '<button type="button" class="qg-beginner-focus-nav__btn" data-beginner-next aria-label="Next word">' +
      '<span aria-hidden="true">→</span>' +
      '</button>' +
      '<button type="button" class="qg-beginner-focus-nav__btn qg-beginner-focus-nav__btn--tts" data-iraab-speak-toggle aria-label="Read iʿrāb aloud" aria-pressed="false">' +
      '<span class="qg-beginner-focus-nav__tts-label">Read aloud</span>' +
      '</button>' +
      '</div>';

    return (
      '<article class="quran-iraab__card quran-iraab__card--beginner" data-ayah-id="' +
      escapeHtml(entry.id) +
      '" data-beginner-card="1" data-beginner-active-row="0">' +
      '<div class="qg-beginner-gloss-store" hidden aria-hidden="true">' +
      glossStore +
      '</div>' +
      '<header class="quran-iraab__card-head quran-iraab__card-head--unified">' +
      '<div class="quran-iraab__pinned-ayah">' +
      ayahTok.html +
      chips +
      '</div>' +
      '<div class="qg-beginner-focus" role="region" aria-label="Selected word iʿrāb">' +
      '<div class="qg-beginner-focus-card">' +
      '<p class="qg-beginner-focus-gloss qg-beginner-focus-gloss--empty" data-beginner-focus-gloss lang="en" dir="ltr"></p>' +
      '<div class="qg-beginner-focus-dynamic" data-beginner-focus-rows-mount aria-live="polite"></div>' +
      nav +
      wordNoteFieldHtml(entry.id, 0) +
      '</div>' +
      '</div>' +
      (SHOW_QURAN_IRAAB_ENGLISH && entry.translationEn
        ? '<p class="quran-iraab__en quran-iraab__en--verse" lang="en" dir="ltr">' +
          escapeHtml(String(entry.translationEn).trim()) +
          '</p>'
        : '') +
      '</header>' +
      '</article>'
    );
  }

  /** All āyāt in one surah (same order as `ayahList`). */
  function ayahsInSurah(ayahList, surahNum) {
    return ayahList.filter((a) => a.surah === surahNum);
  }

  function wireIraabReveal(host) {
    if (!host) return;
    host.querySelectorAll('[data-iraab-expand-row]').forEach((btn) => {
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
    host.querySelectorAll('a.quran-iraab__prompt-lesson-link').forEach((a) => {
      a.addEventListener('click', (e) => e.stopPropagation());
    });
  }

  function flushBeginnerNoteIfNeeded(card, entry, nextIdx) {
    const ta = card.querySelector('[data-word-note]');
    if (!ta) return;
    const prevStr = ta.getAttribute('data-note-row');
    if (prevStr == null || prevStr === '') return;
    const prev = Number(prevStr);
    if (Number.isNaN(prev) || prev === nextIdx) return;
    setWordNote(entry.id, prev, ta.value);
  }

  function applyBeginnerRow(card, entry, idx) {
    const rows = entry.rows;
    const n = rows.length;
    const i = Math.max(0, Math.min(idx, n - 1));
    flushBeginnerNoteIfNeeded(card, entry, i);

    cancelIraabSpeech();

    card.dataset.beginnerActiveRow = String(i);

    card.querySelectorAll('.quran-iraab__ayah-token').forEach((btn) => {
      const ri = Number(btn.getAttribute('data-beginner-row'));
      if (Number.isNaN(ri)) return;
      const on = ri === i;
      btn.classList.toggle('is-current', on);
      if (on) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });

    const posEl = card.querySelector('[data-beginner-pos]');
    if (posEl) posEl.textContent = String(i + 1) + ' / ' + String(n);

    const rowsMount = card.querySelector('[data-beginner-focus-rows-mount]');
    if (rowsMount) {
      const cellHtml = renderRowAnalysisCell(rows[i]);
      rowsMount.innerHTML = cellHtml || '';
      if (cellHtml) {
        rowsMount.removeAttribute('hidden');
        wireIraabReveal(rowsMount);
      } else {
        rowsMount.setAttribute('hidden', '');
      }
    }

    syncBeginnerFocusGlossFromStore(card);

    const ta = card.querySelector('[data-word-note]');
    if (ta) {
      ta.setAttribute('data-note-row', String(i));
      ta.value = getWordNote(entry.id, i);
      const root = ta.closest('[data-word-note-root]');
      if (root) {
        const view = root.querySelector('[data-word-note-view]');
        const textEl = root.querySelector('[data-word-note-text]');
        const has = ta.value.trim() !== '';
        if (has && textEl) {
          renderWordNoteDisplay(textEl, ta.value);
          root.classList.add('qg-word-card__note--has-note');
          if (view) view.removeAttribute('hidden');
        } else if (textEl) {
          renderWordNoteDisplay(textEl, '');
          root.classList.remove('qg-word-card__note--has-note');
          if (view) view.setAttribute('hidden', '');
        }
      }
    }

    const prev = card.querySelector('[data-beginner-prev]');
    const next = card.querySelector('[data-beginner-next]');
    if (prev) prev.disabled = i <= 0;
    if (next) next.disabled = i >= n - 1;
  }

  function wireBeginnerAyahCard(card, entry) {
    if (!card || card.getAttribute('data-beginner-card') !== '1') return;
    applyBeginnerRow(card, entry, Number(card.dataset.beginnerActiveRow || '0'));
    wireIraabSpeakButton(card, entry);

    card.querySelectorAll('.quran-iraab__ayah-token').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ri = Number(btn.getAttribute('data-beginner-row'));
        if (!Number.isNaN(ri)) applyBeginnerRow(card, entry, ri);
      });
    });
    const prev = card.querySelector('[data-beginner-prev]');
    const next = card.querySelector('[data-beginner-next]');
    if (prev) {
      prev.addEventListener('click', () => {
        const cur = Number(card.dataset.beginnerActiveRow || '0');
        applyBeginnerRow(card, entry, cur - 1);
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        const cur = Number(card.dataset.beginnerActiveRow || '0');
        applyBeginnerRow(card, entry, cur + 1);
      });
    }
  }

  function wireIraabCard(card) {
    if (!card) return;
    wireIraabReveal(card);
  }

  /**
   * Renders every āyah of the surah in one scrollable column; scrolls to `scrollToId` when set.
   * @param {{ preserveScroll?: boolean }} [opts] — if true, skip scrolling the active āyah into view and restore window scroll (e.g. grammar-mode toggle).
   */
  function showSurahView(surahNum, container, ayahList, scrollToId, opts) {
    opts = opts || {};
    const preserveScroll = !!opts.preserveScroll;
    const savedScrollY = preserveScroll
      ? window.scrollY || document.documentElement.scrollTop || 0
      : 0;
    if (!container) return;
    cancelIraabSpeech();
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
    container.querySelectorAll('.quran-iraab__card[data-beginner-card="1"]').forEach((card) => {
      const id = card.getAttribute('data-ayah-id');
      const ent = ayahList.find((a) => a.id === id);
      if (ent) wireBeginnerAyahCard(card, ent);
    });
    scheduleHydrateWbw(container, surahNum);
    const esc = targetId.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const el = container.querySelector('.quran-iraab__card[data-ayah-id="' + esc + '"]');
    if (!preserveScroll && el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    try {
      history.replaceState(null, '', `#${encodeURIComponent(targetId)}`);
    } catch (e) {
      /* ignore */
    }
    if (preserveScroll) {
      window.requestAnimationFrame(function () {
        window.scrollTo(window.scrollX || window.pageXOffset || 0, savedScrollY);
        window.requestAnimationFrame(function () {
          window.scrollTo(window.scrollX || window.pageXOffset || 0, savedScrollY);
        });
      });
    }
  }

  function showAyah(id, container, ayahList) {
    if (!container) return;
    cancelIraabSpeech();
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
   * @returns {{ updateActive: function(string): void, refreshStudiedMarkers: function(): void }}
   */
  function setupLeftNav(ayahList, navigateTo) {
    const navRoot = document.getElementById('quran-iraab-nav-tree');
    if (!navRoot) {
      return {
        updateActive: function () {},
        refreshStudiedMarkers: function () {},
      };
    }

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

      const studiedMark = document.createElement('span');
      studiedMark.className = 'quran-iraab-nav-surah__studied-mark';
      studiedMark.setAttribute('aria-hidden', 'true');

      const chevron = document.createElement('span');
      chevron.className = 'quran-iraab-nav-surah__chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = '▸';

      btn.appendChild(nameSpan);
      btn.appendChild(studiedMark);
      btn.appendChild(chevron);

      btn.addEventListener('click', () => {
        navigateTo(firstId);
        closeMobileSidebar();
      });

      navRoot.appendChild(btn);
    });

    function refreshStudiedMarkers() {
      navRoot.querySelectorAll('.quran-iraab-nav-surah').forEach((btn) => {
        const sn = Number(btn.dataset.surah);
        const studied = isSurahStudied(sn);
        btn.classList.toggle('quran-iraab-nav-surah--studied', studied);
        const nameAr = btn.dataset.harakahSrc || '';
        btn.setAttribute(
          'aria-label',
          studied
            ? `${surahMenuLabel(sn, nameAr)}. Studied. Open surah.`
            : `${surahMenuLabel(sn, nameAr)}. Open surah.`
        );
        const mark = btn.querySelector('.quran-iraab-nav-surah__studied-mark');
        if (mark) {
          mark.textContent = studied ? '✓' : '';
          mark.hidden = !studied;
        }
      });
    }

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

    refreshStudiedMarkers();
    return { updateActive, refreshStudiedMarkers };
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

  function wireIraabConnectingGlossary() {
    const fab = document.getElementById('quran-iraab-glossary-fab');
    const overlay = document.getElementById('quran-iraab-glossary-overlay');
    const backdrop = document.getElementById('quran-iraab-glossary-backdrop');
    const closeBtn = document.getElementById('quran-iraab-glossary-close');
    const tbody = document.getElementById('quran-iraab-glossary-tbody');
    if (!fab || !overlay || !tbody) return;

    const rows = Array.isArray(window.IRAAB_CONNECTING_GLOSSARY)
      ? window.IRAAB_CONNECTING_GLOSSARY.slice()
      : [];
    rows.sort((a, b) => String(a.ar).localeCompare(String(b.ar), 'ar'));

    tbody.innerHTML = rows
      .map(
        (r) =>
          '<tr><td class="quran-iraab-glossary-table__ar" lang="ar" dir="rtl">' +
          escapeHtml(r.ar) +
          '</td><td class="quran-iraab-glossary-table__en" lang="en" dir="ltr">' +
          escapeHtml(r.en) +
          '</td></tr>'
      )
      .join('');

    let lastFocus = null;

    function openGlossary() {
      if (overlay.classList.contains('quran-iraab-glossary-overlay--open')) return;
      lastFocus = document.activeElement;
      overlay.classList.add('quran-iraab-glossary-overlay--open');
      overlay.setAttribute('aria-hidden', 'false');
      fab.setAttribute('aria-expanded', 'true');
      document.body.classList.add('quran-iraab-glossary-open');
      if (closeBtn) closeBtn.focus();
    }

    function closeGlossary() {
      if (!overlay.classList.contains('quran-iraab-glossary-overlay--open')) return;
      overlay.classList.remove('quran-iraab-glossary-overlay--open');
      overlay.setAttribute('aria-hidden', 'true');
      fab.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('quran-iraab-glossary-open');
      const prev = lastFocus;
      lastFocus = null;
      if (prev && typeof prev.focus === 'function') prev.focus();
      else fab.focus();
    }

    fab.addEventListener('click', () => openGlossary());
    if (backdrop) backdrop.addEventListener('click', () => closeGlossary());
    if (closeBtn) closeBtn.addEventListener('click', () => closeGlossary());

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key !== 'Escape') return;
        if (!overlay.classList.contains('quran-iraab-glossary-overlay--open')) return;
        e.preventDefault();
        closeGlossary();
      },
      true
    );
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
    let refreshStudiedMarkers = () => {};

    const markStudiedBtn = document.getElementById('quran-iraab-mark-surah-studied');

    function syncMarkStudiedButton() {
      if (!markStudiedBtn) return;
      const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
      const entry = ayahList.find((a) => a.id === id);
      if (!entry) return;
      const done = isSurahStudied(entry.surah);
      markStudiedBtn.classList.toggle('quran-iraab-toolbar__mark-studied-btn--done', done);
      markStudiedBtn.setAttribute('aria-pressed', done ? 'true' : 'false');
      const lab = markStudiedBtn.querySelector('.quran-iraab-toolbar__btn-label');
      if (lab) lab.textContent = done ? 'Studied · click to undo' : 'Mark surah studied';
    }

    function navigateTo(id) {
      if (syncSelects) syncSelects(id);
      showAyah(id, container, ayahList);
      updateSidebarActive(id);
      syncMarkStudiedButton();
    }

    syncSelects = populateSurahAndAyahSelects(ayahList, surahSel, ayahSel, navigateTo);

    const navApi = setupLeftNav(ayahList, navigateTo);
    updateSidebarActive = navApi.updateActive;
    refreshStudiedMarkers = navApi.refreshStudiedMarkers;
    wireMobileSidebarNav();

    document.documentElement.classList.add('quran-iraab--direct-iraab');
    applyWbwDocClass();
    applyGrammarModeClass();
    (function syncGrammarModeRadiosEarly() {
      const b = document.getElementById('quran-iraab-mode-beginner');
      const s = document.getElementById('quran-iraab-mode-scholar');
      const scholar = readQuranGrammarMode() === 'scholar';
      if (b) b.checked = !scholar;
      if (s) s.checked = scholar;
    })();
    applyQuranIraabChromeHarakah();

    if (markStudiedBtn) {
      markStudiedBtn.addEventListener('click', function () {
        const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
        const entry = ayahList.find((a) => a.id === id);
        if (!entry) return;
        toggleSurahStudied(entry.surah);
        syncMarkStudiedButton();
        refreshStudiedMarkers();
      });
    }

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
      refreshStudiedMarkers();
    }

    const grammarModeBeginner = document.getElementById('quran-iraab-mode-beginner');
    const grammarModeScholar = document.getElementById('quran-iraab-mode-scholar');
    function refreshOpenSurahAfterGrammarModeChange() {
      const id = ayahSel && ayahSel.value ? ayahSel.value : ayahList[0].id;
      const entry = ayahList.find((a) => a.id === id);
      if (entry && container) {
        showSurahView(entry.surah, container, ayahList, id, { preserveScroll: true });
        /* Do not call updateSidebarActive — its scrollIntoView moves the viewport; surah selection is unchanged. */
      }
    }
    function onGrammarModeRadioChange() {
      writeQuranGrammarMode(grammarModeScholar && grammarModeScholar.checked ? 'scholar' : 'beginner');
      refreshOpenSurahAfterGrammarModeChange();
    }
    function toggleGrammarModeFromKeyboard() {
      const next = readQuranGrammarMode() === 'scholar' ? 'beginner' : 'scholar';
      writeQuranGrammarMode(next);
      if (grammarModeBeginner) grammarModeBeginner.checked = next === 'beginner';
      if (grammarModeScholar) grammarModeScholar.checked = next === 'scholar';
      refreshOpenSurahAfterGrammarModeChange();
    }
    if (grammarModeBeginner) grammarModeBeginner.addEventListener('change', onGrammarModeRadioChange);
    if (grammarModeScholar) grammarModeScholar.addEventListener('change', onGrammarModeRadioChange);

    const LEGACY_HASH_IDS = { '101-1-3': '101-1', '103-1-2': '103-1' };

    let qgTooltipCurrent = null;
    /** Separate from `qgTooltipCurrent`: two terms can match the same node ref across moves; defs differ when Arabic label repeats. */
    let qgTooltipLastSig = '';
    container.addEventListener('mousemove', function (e) {
      const tip = document.getElementById('qg-tooltip');
      if (!tip) return;
      if (readQuranGrammarMode() !== 'scholar') {
        if (!tip.hidden) {
          tip.hidden = true;
          tip.innerHTML = '';
        }
        qgTooltipCurrent = null;
        qgTooltipLastSig = '';
        return;
      }
      const el = e.target.closest('.irab-term');
      if (!el || !container.contains(el)) {
        tip.hidden = true;
        tip.innerHTML = '';
        qgTooltipCurrent = null;
        qgTooltipLastSig = '';
        return;
      }
      const term = el.getAttribute('data-term') || (el.textContent || '').trim();
      const roman = el.getAttribute('data-roman') || '';
      const def = el.getAttribute('data-def') || '';
      const sig = term + '\x1e' + roman + '\x1e' + def + '\x1e' + (el.closest('[data-segment]')?.getAttribute('data-segment') || '');
      if (sig !== qgTooltipLastSig) {
        qgTooltipLastSig = sig;
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

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.defaultPrevented) return;
        const glossEl = document.getElementById('quran-iraab-glossary-overlay');
        if (glossEl && glossEl.classList.contains('quran-iraab-glossary-overlay--open')) {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
          return;
        }
        const t = e.target;
        const inTypingOrMenu =
          t &&
          (t.closest('select') ||
            t.closest('input') ||
            t.closest('textarea') ||
            t.closest('.quran-iraab-nav-tree') ||
            t.closest('#quran-iraab-nav-toggle'));
        /* Links keep focus after click; still allow grammar toggle (Chrome-friendly chord). */
        const blockAyahArrows = inTypingOrMenu || (t && t.closest('a[href]'));
        /* Alt+G (Option+G on Mac). Use `code`: Mac Option changes `key` away from "G". */
        const grammarModeChord =
          e.altKey &&
          !e.shiftKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          e.code === 'KeyG';
        if (grammarModeChord) {
          if (!inTypingOrMenu) {
            e.preventDefault();
            toggleGrammarModeFromKeyboard();
          }
          return;
        }
        if (blockAyahArrows) return;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          step(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          step(-1);
        }
      },
      true
    );

    window.addEventListener('hashchange', applyHashOrDefault);

    applyHashOrDefault();

    const downloadNotesBtn = document.getElementById('quran-iraab-download-notes');
    if (downloadNotesBtn) {
      downloadNotesBtn.addEventListener('click', function () {
        downloadAyahNotesBackup(ayahList);
      });
    }

  }

  function bootQuranIraabPage() {
    wireIraabConnectingGlossary();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootQuranIraabPage);
  } else {
    bootQuranIraabPage();
  }
})();
