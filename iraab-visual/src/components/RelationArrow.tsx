interface RelationArrowProps {
  labelAr: string;
  compact?: boolean;
}

export function RelationArrow({ labelAr, compact }: RelationArrowProps) {
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center gap-0.5 text-slate-500 ${compact ? 'px-1' : 'px-2'}`}
      aria-hidden={false}
      title={labelAr}
    >
      <svg
        viewBox="0 0 48 24"
        className={`text-slate-400 ${compact ? 'h-5 w-10' : 'h-7 w-14'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 12h32M28 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className="max-w-[5.5rem] text-center text-[0.65rem] font-medium leading-tight text-slate-600"
        dir="rtl"
      >
        {labelAr}
      </span>
    </div>
  );
}
