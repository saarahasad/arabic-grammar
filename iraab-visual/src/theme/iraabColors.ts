/**
 * Mandatory color system — maps Arabic labels to Tailwind-style classes.
 * CASE: global standard. TYPE / ROLE: per spec.
 */

import type { RuleFamily } from '../types';

/** Solid pill + top bar: رفع blue · نصب red · جر green · جزم purple · مبني slate */
export const caseStyle: Record<string, { bar: string; text: string; ring: string }> = {
  مرفوع: {
    bar: 'bg-[var(--color-iraab-marfu)]',
    text: 'text-[var(--color-iraab-marfu)]',
    ring: 'ring-2 ring-[var(--color-iraab-marfu)]/35',
  },
  منصوب: {
    bar: 'bg-[var(--color-iraab-mansub)]',
    text: 'text-[var(--color-iraab-mansub)]',
    ring: 'ring-2 ring-[var(--color-iraab-mansub)]/35',
  },
  مجرور: {
    bar: 'bg-[var(--color-iraab-majrur)]',
    text: 'text-[var(--color-iraab-majrur)]',
    ring: 'ring-2 ring-[var(--color-iraab-majrur)]/35',
  },
  مجزوم: {
    bar: 'bg-[var(--color-iraab-majzum)]',
    text: 'text-[var(--color-iraab-majzum)]',
    ring: 'ring-2 ring-[var(--color-iraab-majzum)]/35',
  },
  مبني: {
    bar: 'bg-[var(--color-iraab-mabni)]',
    text: 'text-[var(--color-iraab-mabni)]',
    ring: 'ring-2 ring-slate-400/40',
  },
};

const caseFallback = {
  bar: 'bg-slate-500',
  text: 'text-slate-600',
  ring: 'ring-2 ring-slate-300',
};

/**
 * Map long Arabic case lines to رفع / نصب / جر / جزم / مبني for **solid** case colors.
 * Order: explicit "محل …" first, then word forms, then مبني.
 */
export function resolveCaseBucket(caseLabel: string): keyof typeof caseStyle | 'unknown' {
  const s = (caseLabel || '').trim();
  if (!s) return 'unknown';

  if (s.includes('محل نصب') || s.includes('منصوب') || s.includes('مستثنى')) return 'منصوب';
  if (s.includes('محل جر') || s.includes('مجرور')) return 'مجرور';
  if (s.includes('مجزوم')) return 'مجزوم';
  if (s.includes('محل رفع') || s.includes('مرفوع')) return 'مرفوع';
  if (s.includes('مبني')) return 'مبني';

  return 'unknown';
}

export function getCaseStyle(caseLabel: string) {
  const key = resolveCaseBucket(caseLabel);
  if (key === 'unknown') {
    const exact = caseStyle[caseLabel as keyof typeof caseStyle];
    if (exact) return exact;
    return caseFallback;
  }
  return caseStyle[key];
}

/** TYPE: اسم / فعل / حرف */
export function typeBadgeClass(type: string): string {
  if (type.includes('اسم')) {
    return 'bg-[var(--color-iraab-type-ism)] text-amber-950 border-amber-300/80';
  }
  if (type.includes('فعل')) {
    return 'bg-orange-100 text-[var(--color-iraab-type-verb)] border-orange-300/90';
  }
  if (type.includes('حرف')) {
    return 'bg-slate-200 text-slate-800 border-slate-400/70';
  }
  return 'bg-slate-100 text-slate-800 border-slate-300';
}

/** ROLE — strict mapping for listed roles; fallback neutral */
export function roleBadgeClass(role: string): string {
  if (role.includes('فاعل')) {
    return 'bg-blue-100 text-[var(--color-iraab-role-fael)] border-blue-300/80';
  }
  if (role.includes('مفعول')) {
    return 'bg-red-100 text-[var(--color-iraab-role-mafool)] border-red-300/80';
  }
  if (role.includes('مضاف إليه') || role.includes('مضاف')) {
    return 'bg-green-100 text-[var(--color-iraab-role-mudaf-il)] border-green-300/80';
  }
  if (role.includes('مبتدأ')) {
    return 'bg-amber-100 text-[var(--color-iraab-role-mubtada)] border-amber-700/30';
  }
  if (role.includes('خبر')) {
    return 'bg-violet-100 text-[var(--color-iraab-role-khabar)] border-violet-300/80';
  }
  return 'bg-slate-50 text-slate-800 border-slate-200';
}

export const familyMeta: Record<
  RuleFamily,
  { labelAr: string; labelEn: string; border: string; chip: string }
> = {
  jarr: {
    labelAr: 'عائلة الجرّ',
    labelEn: 'Jarr family',
    border: 'border-[var(--color-iraab-family-jarr)]',
    chip: 'bg-green-100 text-green-900 border-green-400/80',
  },
  nasb: {
    labelAr: 'عائلة النصب',
    labelEn: 'Naṣb family',
    border: 'border-[var(--color-iraab-family-nasb)]',
    chip: 'bg-red-100 text-red-900 border-red-400/80',
  },
  raf: {
    labelAr: 'عائلة الرفع',
    labelEn: "Rafʿ family",
    border: 'border-[var(--color-iraab-family-raf)]',
    chip: 'bg-blue-100 text-blue-900 border-blue-400/80',
  },
  jazm: {
    labelAr: 'عائلة الجزم',
    labelEn: 'Jazm family',
    border: 'border-[var(--color-iraab-family-jazm)]',
    chip: 'bg-purple-100 text-purple-900 border-purple-400/80',
  },
  other: {
    labelAr: 'عام',
    labelEn: 'Other',
    border: 'border-slate-300',
    chip: 'bg-slate-100 text-slate-800 border-slate-300',
  },
};
