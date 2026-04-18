import { typeBadgeClass, roleBadgeClass } from '../theme/iraabColors';

export type GrammarBadgeVariant = 'type' | 'role' | 'case' | 'family';

interface GrammarBadgeProps {
  variant: GrammarBadgeVariant;
  children: string;
  /** CASE strip uses strong bar color */
  caseBarClass?: string;
  /** For family chip */
  familyChipClass?: string;
  colorsOnly?: boolean;
  shortLabel?: string;
}

export function GrammarBadge({
  variant,
  children,
  caseBarClass,
  familyChipClass,
  colorsOnly,
  shortLabel,
}: GrammarBadgeProps) {
  const display = colorsOnly ? (shortLabel ?? children.slice(0, 2)) : children;

  if (variant === 'case' && caseBarClass) {
    return (
      <span
        className={`inline-flex min-h-[1.85rem] max-w-full items-center rounded-lg px-2.5 py-1 text-sm font-bold text-white shadow-sm ring-1 ring-black/10 ${caseBarClass}`}
        title={children}
        dir="rtl"
      >
        {!colorsOnly ? <span className="font-arabic leading-snug">{children}</span> : '●'}
      </span>
    );
  }

  if (variant === 'family' && familyChipClass) {
    return (
      <span
        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${familyChipClass}`}
        dir="rtl"
      >
        {display}
      </span>
    );
  }

  const base =
    variant === 'type'
      ? typeBadgeClass(children)
      : variant === 'role'
        ? roleBadgeClass(children)
        : 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-md border px-2 py-0.5 text-sm font-semibold ${base}`}
      title={children}
      dir="rtl"
    >
      {colorsOnly ? <span className="font-arabic opacity-90">{display}</span> : <span className="font-arabic">{children}</span>}
    </span>
  );
}
