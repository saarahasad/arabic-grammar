/** Remove all harakah (Arabic diacritics) from text — Unicode ranges per project spec. */
export function stripHarakah(text: string): string {
  return text.replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g,
    ''
  );
}

/**
 * Mushaf-only marks often missing in bundled KFGQPC → dotted-circle placeholders:
 * ۟ U+06DF (sifr on alif), ۠ U+06E0, ۢ U+06E2, ۭ U+06ED.
 */
export function stripQuranSmallMeemHints(text: string): string {
  return text.replace(/\u06DF|\u06E0|\u06E2|\u06ED/g, '');
}

/** Check if a string contains standard harakah (tanwin, fatha, etc.). */
export function hasHarakah(text: string): boolean {
  return /[\u064B-\u065F\u0670]/.test(text);
}
