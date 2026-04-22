/**
 * Map lesson `rule` keys (from analysisParts links) to formula IDs (F01–F30).
 * Used by Qurʾān Iʿrāb analysis to open the formula panel and row indicators.
 */
(function (global) {
  'use strict';

  /** @type {Record<string, string | null>} */
  const RULE_TO_FORMULA = {
    // FUNCTION rules → F01–F08 (nouns)
    fael: 'F01',
    'nominal-sentence': 'F01',
    mafool: 'F02',
    tawabi: 'F02',
    naat: 'F03',
    idafah: 'F03',
    'number-plural': 'F04',
    'mamnu-sarf': 'F08',

    // VERB rules
    'verb-present': 'F09',
    'verb-past': 'F16',
    'verb-past-passive': 'F20',
    'verb-present-passive': 'F28',
    'verb-imperative': 'F21',
    'verb-imperative-li': 'F21',
    'irab-raf-noon': 'F12',
    'irab-jazm': 'F13',
    'verb-present-jussive-particles': 'F13',
    'verb-ajwaf-yaee': 'F14',
    'verb-present-nasb-particles': 'F15',
    'verb-passive-overview': 'F20',

    // MABNI rules
    'relative-nouns': 'F23',
    'silah-mawsul': 'F29',
    'detached-pronouns': 'F24',
    'attached-pronouns': 'F24',
    'attached-verbs': 'F24',
    'attached-nouns': 'F24',
    'harf-jarr': null,
    'harf-maani': null,
    atf: null,

    // COMPOUND rules
    'inna-sisters': 'F25',
    'kaana-sisters': 'F26',
    masdar: 'F28',
    'sentence-structure': 'F27',
    'verb-present-conditional-particles': 'F26',
    istithna: null,
    'interrogative-nouns': null,
    demonstratives: null,
    munada: null,
    'irab-raf-dammah': 'F01',
    'irab-jarr': 'F03',
    'irab-nasb': 'F02',
    'mabni-muarab': null,

    // Extra keys used in quran-iraab-data.js
    'verb-present-negation': null,
    'verb-present-double-emphasis': null,
    'verb-mudaaf': null,
    'verb-passive': 'F20',
    irab: null,
    'irab-raf': 'F01',
  };

  /** Rules that show a “coming soon” panel when tapped (no F01–F30 card yet). */
  const COMING_SOON_RULES = {
    'interrogative-nouns': true,
    demonstratives: true,
    munada: true,
    istithna: true,
  };

  const COL_PART = '#888888';

  /**
   * @param {string | null | undefined} rule
   * @returns {string | null}
   */
  function getFormulaIdForRule(rule) {
    if (rule == null || rule === '') return null;
    if (!Object.prototype.hasOwnProperty.call(RULE_TO_FORMULA, rule)) return null;
    const v = RULE_TO_FORMULA[rule];
    return v == null ? null : v;
  }

  /**
   * @param {string | null | undefined} rule
   */
  function isComingSoonRule(rule) {
    return !!(rule && COMING_SOON_RULES[rule]);
  }

  /**
   * Category dot colors (match formula guide sections).
   * @param {string} category
   * @returns {string} CSS color
   */
  function getDotColorForFormulaCategory(category) {
    switch (category) {
      case 'murab-noun':
        return 'var(--iraab-fn, #e05a2b)';
      case 'murab-verb':
        return 'var(--iraab-case, #1a7f5a)';
      case 'mabni':
        return 'var(--iraab-sign, #b5860d)';
      case 'compound':
      case 'sentence':
        return 'var(--iraab-sentence, #7b5ea7)';
      default:
        return '#64748b';
    }
  }

  /**
   * @param {string} colorHex e.g. #E05A2B
   * @param {string} phraseText matched phrase (for sentence-level overrides)
   * @param {string | null} lastRule nearest preceding link rule in this row
   * @param {string | null} rowFirstRule first link rule in row
   * @returns {string | null}
   */
  function resolveFormulaIdForColoredSpan(colorHex, phraseText, lastRule, rowFirstRule) {
    const c = String(colorHex || '')
      .trim()
      .toLowerCase();
    if (c === COL_PART || c === '#888' || c === 'rgb(136, 136, 136)') return null;

    const phrase = String(phraseText || '');
    const lr = lastRule || null;
    const fr = rowFirstRule || null;

    // Sentence-level purple: relative / silah overrides
    if (c === '#7b5ea7') {
      if (phrase.indexOf('صلة الموصول') !== -1) return 'F29';
      if (lr === 'silah-mawsul') return 'F29';
      if (lr === 'relative-nouns') return 'F23';
      return getFormulaIdForRule(lr) || getFormulaIdForRule(fr);
    }

    // Function / case / sign: inherit row context
    return getFormulaIdForRule(lr) || getFormulaIdForRule(fr);
  }

  /**
   * Wrap colorized `<span style="color: …">` hits from `colorizeIraab` with formula buttons where applicable.
   * @param {string} html
   * @param {{ lastRule: string | null, rowFirstRule: string | null }} ctx
   * @returns {string}
   */
  function wrapOneColoredSpan(full, color, inner, lastRule, rowFirstRule) {
    const fid = resolveFormulaIdForColoredSpan(color, inner, lastRule, rowFirstRule);
    if (fid) {
      return (
        '<button type="button" class="quran-iraab__formula-hit" tabindex="0" data-formula="' +
        String(fid).replace(/"/g, '&quot;') +
        '">' +
        full +
        '</button>'
      );
    }
    const lrSoon = lastRule || rowFirstRule;
    if (
      lrSoon &&
      isComingSoonRule(lrSoon) &&
      getFormulaIdForRule(lrSoon) == null &&
      !isParticleColor(color)
    ) {
      return (
        '<button type="button" class="quran-iraab__formula-hit quran-iraab__formula-hit--soon" tabindex="0" data-formula-soon="1" data-rule="' +
        String(lrSoon).replace(/"/g, '&quot;') +
        '">' +
        full +
        '</button>'
      );
    }
    return full;
  }

  function wrapColorizedFormulaSpans(html, ctx) {
    if (html == null || html === '') return '';
    const lastRule = ctx && ctx.lastRule != null ? ctx.lastRule : null;
    const rowFirstRule = ctx && ctx.rowFirstRule != null ? ctx.rowFirstRule : null;

    let out = html.replace(
      /<span style="([^"]*)">([^<]*)<\/span>/gi,
      function (full, styleBlock, inner) {
        const m = /color:\s*([^;]+)/i.exec(styleBlock);
        const color = m ? m[1].trim() : '';
        return wrapOneColoredSpan(full, color, inner, lastRule, rowFirstRule);
      }
    );
    out = out.replace(
      /<span class="irab-term([^"]*)"[^>]*data-iraab-c="([^"]+)"[^>]*>([^<]*)<\/span>/gi,
      function (full, _classRest, dataC, inner) {
        const color = String(dataC || '').trim();
        return wrapOneColoredSpan(full, color, inner, lastRule, rowFirstRule);
      }
    );
    return out;
  }

  function isParticleColor(colorHex) {
    const c = String(colorHex || '')
      .trim()
      .toLowerCase();
    return c === COL_PART || c === '#888' || c === 'rgb(136, 136, 136)';
  }

  global.RULE_TO_FORMULA = RULE_TO_FORMULA;
  global.getFormulaIdForRule = getFormulaIdForRule;
  global.isComingSoonRule = isComingSoonRule;
  global.getDotColorForFormulaCategory = getDotColorForFormulaCategory;
  global.resolveFormulaIdForColoredSpan = resolveFormulaIdForColoredSpan;
  global.wrapColorizedFormulaSpans = wrapColorizedFormulaSpans;
})(typeof window !== 'undefined' ? window : globalThis);
