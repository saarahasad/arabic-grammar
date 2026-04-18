/**
 * Qurʾān Iʿrāb — merges curated rows from `quran-iraab-data.js` with full āyāt 95–114 text
 * from `quran-text-96-114.js`, two-level navigation (surah → āyah), and unavailable state.
 * Choosing a surah shows **all** its āyāt in one scrollable column; the āyah menu (or ← / → keys)
 * moves within that surah and scrolls the active verse into view.
 */
(function () {
  const IRAAB_UNAVAILABLE_EN = 'Iʿrāb is not available for this ayah.';
  const IRAAB_UNAVAILABLE_AR = 'الْإِعْرَابُ غَيْرُ مُتَوَفَّرٍ لِهَذِهِ الْآيَةِ';
  const IRAAB_PROMPTS_STORAGE_KEY = 'quranIraabShowPrompts';
  /** Legacy: `quranIraabDirectIraab` === '1' meant direct (no prompts). Migrated once to `quranIraabShowPrompts`. */
  const IRAAB_LEGACY_DIRECT_KEY = 'quranIraabDirectIraab';

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

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
        if (ar) return `${row.title} — ${ar}`;
        return row.title;
      }
    }
    const ar = window.RULE_ARABIC_TITLE && window.RULE_ARABIC_TITLE[ruleId];
    if (ar) return `${ruleId} — ${ar}`;
    return ruleId;
  }

  function renderLinkPart(p) {
    const href = lessonHref(p.rule);
    const tip = escapeHtml(arabicUiText(lessonLinkTooltip(p.rule), false));
    const base =
      typeof window.ruleLinkColorForRule === 'function'
        ? window.ruleLinkColorForRule(p.rule)
        : '#334155';
    const linkInner = colorizeIraabText(p.text, false);

    const fid =
      typeof window.getFormulaIdForRule === 'function' ? window.getFormulaIdForRule(p.rule) : null;
    const soon =
      typeof window.isComingSoonRule === 'function' ? window.isComingSoonRule(p.rule) : false;
    const useSplit = !!(fid || soon);

    if (!useSplit) {
      return (
        '<span class="quran-iraab__rule-link-stack">' +
        '<a class="quran-iraab__rule-link" href="' +
        escapeHtml(href) +
        '" title="' +
        tip +
        '" aria-label="' +
        tip +
        '" style="color: ' +
        escapeHtml(base) +
        '; font-weight: 400">' +
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
      '" tabindex="0"' +
      dataFid +
      dataSoon +
      ' aria-label="Show formula: ' +
      tip +
      '">' +
      linkInner +
      '</button>' +
      '<a class="quran-iraab__lesson-ref" href="' +
      escapeHtml(href) +
      '" title="' +
      tip +
      '" aria-label="' +
      tip +
      ' — open lesson">' +
      '<span class="quran-iraab__lesson-ref__glyph" aria-hidden="true">↗</span>' +
      '<span class="quran-iraab__lesson-ref__txt" lang="ar">درس</span>' +
      '</a>' +
      '</span></span>'
    );
  }

  /**
   * Shared keyword coloring for flowing analysis text (`iraab-colorize.js`).
   * @param {string} raw
   * @param {boolean} [alwaysShowHarakah] when true, keep diacritics regardless of user preference
   */
  function colorizeIraabText(raw, alwaysShowHarakah) {
    if (raw == null || raw === '') return '';
    const t =
      typeof window.displayArabic === 'function'
        ? window.displayArabic(String(raw), alwaysShowHarakah)
        : String(raw);
    if (typeof window.colorizeIraab === 'function') return window.colorizeIraab(t);
    return escapeHtml(t);
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

  /** Optional English gloss of the same iʿrāb (from curated `analysisEn` in data). */
  function renderAnalysisEn(row) {
    if (row.analysisEn == null || String(row.analysisEn).trim() === '') return '';
    return `<p class="quran-iraab__analysis-en" lang="en" dir="ltr">${escapeHtml(
      String(row.analysisEn).trim()
    )}</p>`;
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
          return { formulaId: fid, title: f.title, dotColor: dot };
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
      return `<a class="quran-iraab__prompt-lesson-link quran-iraab__prompt-lesson-link--en" href="${escapeHtml(href)}" title="${tip}" aria-label="${tip}">${escapeHtml(en)}</a>`;
    });

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

    const enFlat = pairs.map((p) => p.en).join(' · ');
    const arFlat = pairs.map((p) => p.ar || p.en).join('، ');
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
        const head = renderLinkPart(p);
        i += 1;
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        let explain = '';
        if (rawTexts.length) {
        const colored = colorizeIraabText(rawTexts.join(''), false);
        explain =
            typeof window.wrapColorizedFormulaSpans === 'function'
              ? window.wrapColorizedFormulaSpans(colored, {
                  lastRule: lastRule,
                  rowFirstRule: rowFirstRule,
                })
              : colored;
        }
        const seg = explain ? `${head}<span class="quran-iraab__flow-gap"> </span>${explain}` : head;
        chunks.push(`<span class="quran-iraab__flow-seg">${seg}</span>`);
      } else {
        const rawTexts = [];
        while (i < parts.length && parts[i].type === 'text') {
          rawTexts.push(parts[i].text);
          i += 1;
        }
        const colored = colorizeIraabText(rawTexts.join(''), false);
        const explain =
          typeof window.wrapColorizedFormulaSpans === 'function'
            ? window.wrapColorizedFormulaSpans(colored, {
                lastRule: lastRule,
                rowFirstRule: rowFirstRule,
              })
            : colored;
        chunks.push(`<span class="quran-iraab__flow-seg">${explain}</span>`);
      }
    }
    return `<span class="quran-iraab__analysis-line">${chunks.join('<span class="quran-iraab__flow-sep"> </span>')}</span>`;
  }

  /**
   * Renders the analysis column: optional think-first prompt (click replaces prompt with analysis),
   * or plain analysis if `row.noPrompt === true` or global “show prompts” is off (default).
   */
  function renderRowAnalysisCell(row) {
    const inner = renderAnalysisParts(row);
    if (!inner) return '';
    if (row.noPrompt === true || !readIraabShowPrompts()) {
      return `<div class="quran-iraab__analysis-stack">
          <span class="quran-iraab__analysis quran-iraab__analysis--flow" lang="ar" dir="rtl">${inner}</span>
          ${renderAnalysisEn(row)}
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
      if (row.promptEn != null && String(row.promptEn).trim() !== '') {
        promptEn = String(row.promptEn).trim();
      }
      promptQuestionHtml = `<span class="quran-iraab__prompt-question">
            <span class="quran-iraab__prompt-ar" lang="ar" dir="rtl">${escapeHtml(promptAr)}</span>
            ${
              promptEn
                ? `<span class="quran-iraab__prompt-en">${escapeHtml(promptEn)}</span>`
                : ''
            }
          </span>`;
      ariaLabel = `${labelRevealEn}. ${promptAr}${promptEn ? ' ' + promptEn : ''}`;
    } else {
      const auto = renderAutoPromptQuestionHtml(row.analysisParts);
      promptQuestionHtml = auto.html;
      ariaLabel = `${labelRevealEn}. ${auto.ariaLabel}`;
    }

    return `
      <div class="quran-iraab__reveal" data-iraab-reveal>
        <button type="button" class="quran-iraab__prompt-face" data-iraab-expand-row aria-expanded="false" aria-label="${escapeHtml(ariaLabel)}">
          <span class="quran-iraab__prompt-reveal-hint" aria-hidden="true">
            <span class="quran-iraab__prompt-reveal-ar" lang="ar" dir="rtl">${escapeHtml(labelReveal)}</span>
            <span class="quran-iraab__prompt-reveal-en">${escapeHtml(labelRevealEn)}</span>
          </span>
          ${promptQuestionHtml}
          <span class="quran-iraab__prompt-chevron" aria-hidden="true"></span>
        </button>
        <div class="quran-iraab__analysis-wrap quran-iraab__analysis-wrap--reveal" data-iraab-analysis hidden>
          <div class="quran-iraab__analysis-stack">
            <span class="quran-iraab__analysis quran-iraab__analysis--flow" lang="ar" dir="rtl">${inner}</span>
            ${renderAnalysisEn(row)}
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
            entry.translationEn
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
        const dotHtml = ind
          ? `<span class="quran-iraab__row-formula-dot" style="background:${escapeHtml(
              ind.dotColor
            )}" title="${escapeHtml(ind.title)}" role="img" aria-label="${escapeHtml(ind.title)}"></span>`
          : '';
        return `
        <li class="quran-iraab__row" data-segment="${escapeHtml(row.segment)}" data-analysis-plain="${escapeHtml(
          plain
        )}">
          <div class="quran-iraab__segment-cell">
            <span class="quran-iraab__segment" lang="ar" dir="rtl">${escapeHtml(row.segment)}</span>
            <span class="quran-iraab__segment-index" aria-hidden="true">${idx + 1}</span>
          </div>
          <div class="quran-iraab__analysis-cell${ind ? ' quran-iraab__analysis-cell--has-formula' : ''}">
            ${dotHtml}
            <div class="quran-iraab__analysis-cell-inner">
            ${renderRowAnalysisCell(row)}
            </div>
          </div>
        </li>`;
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
            <span class="quran-iraab-toolbar__harakah-label" aria-hidden="true">Tashkīl</span>
            <button type="button" class="quran-iraab-toolbar__btn quran-iraab-toolbar__btn--secondary quran-iraab-toolbar__harakah-btn${showHarakahPref ? ' quran-iraab-toolbar__harakah-btn--on' : ''}" data-toggle-harakah lang="ar" dir="rtl" aria-label="${showHarakahPref ? 'Hide harakah' : 'Show harakah'}">${escapeHtml(harakahBtnAr)}</button>
          </div>`;

    return `
      <article class="quran-iraab__card" data-ayah-id="${escapeHtml(entry.id)}">
        <header class="quran-iraab__card-head">
          <h2 class="quran-iraab__ref" lang="ar" dir="rtl">${escapeHtml(ref)}</h2>
          <div class="quran-iraab__ayah-wrap">
            <blockquote class="quran-iraab__ayah" lang="ar" dir="rtl">${escapeHtml(entry.ayahText)}</blockquote>
          </div>
          ${
            entry.translationEn
              ? `<p class="quran-iraab__en">${escapeHtml(entry.translationEn)}</p>`
              : ''
          }
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
          <div class="quran-iraab__grid" role="presentation">
            <div class="quran-iraab__grid-head" aria-hidden="true">
              <span class="quran-iraab__grid-head-cell quran-iraab__grid-head-cell--segment">
                <span class="quran-iraab__grid-head-en">Phrase</span>
                <span class="quran-iraab__grid-head-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText('الْمُعَرَّفُ', true))}</span>
              </span>
              <span class="quran-iraab__grid-head-cell quran-iraab__grid-head-cell--analysis">
                <span class="quran-iraab__grid-head-en">Analysis</span>
                <span class="quran-iraab__grid-head-ar" lang="ar" dir="rtl">${escapeHtml(arabicUiText('الْإِعْرَابُ', false))}</span>
              </span>
            </div>
            <ol class="quran-iraab__list" dir="rtl">${rowsHtml}</ol>
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
          '<p class="quran-iraab__empty">No Iʿrāb data loaded yet. Add entries in <code>quran-iraab-data.js</code> and ensure <code>quran-text-96-114.js</code> is present.</p>';
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
