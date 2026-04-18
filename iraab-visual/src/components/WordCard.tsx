import type { IraabViewState, IraabWord } from '../types';
import { getCaseStyle, typeBadgeClass, roleBadgeClass } from '../theme/iraabColors';
import { GrammarBadge } from './GrammarBadge';

interface WordCardProps {
  word: IraabWord;
  view: IraabViewState;
}

function ReasonRow({ reason, hidden }: { reason: string; hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="mt-2 flex items-start gap-2 border-t border-slate-200/90 pt-2" dir="rtl">
      <span className="mt-0.5 shrink-0 text-slate-400" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <span className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">السّبب</span>
        <p className="font-arabic text-base leading-relaxed text-slate-700">{reason}</p>
      </div>
    </div>
  );
}

export function WordCard({ word, view }: WordCardProps) {
  const cs = getCaseStyle(word.case);
  const { hideReasons, colorsOnly, highlightPatterns } = view;

  return (
    <article
      className={`relative flex min-w-[10rem] max-w-[min(100%,20rem)] flex-col overflow-hidden rounded-xl border bg-white shadow-sm ${
        highlightPatterns ? 'ring-2 ring-slate-200/90' : 'border-slate-200/90'
      }`}
    >
      {/* CASE — strong top highlight */}
      <div className={`h-2 w-full ${cs.bar}`} aria-hidden />

      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-arabic mb-3 text-center text-2xl font-bold leading-snug text-slate-900">
          {word.word}
        </h3>

        {colorsOnly ? (
          <div className="flex flex-wrap items-center justify-center gap-2" dir="rtl">
            <span
              title={`النوع: ${word.type}`}
              className={`h-8 w-8 rounded-md border ${typeBadgeClass(word.type)}`}
            />
            <span
              title={`الدور: ${word.role}`}
              className={`h-8 w-8 rounded-md border ${roleBadgeClass(word.role)}`}
            />
            <span
              title={`الإعراب: ${word.case}`}
              className={`h-8 min-w-[2rem] rounded-md px-1 ${cs.bar}`}
            />
            <span className="sr-only">
              {word.type} — {word.role} — {word.case}
            </span>
          </div>
        ) : (
          <>
            <dl className="flex flex-col gap-2 text-right" dir="rtl">
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">١ النّوع</dt>
                <dd className="mt-0.5">
                  <GrammarBadge variant="type">{word.type}</GrammarBadge>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">٢ الدّور</dt>
                <dd className="mt-0.5">
                  <GrammarBadge variant="role">{word.role}</GrammarBadge>
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">٣ الإعراب</dt>
                <dd className="mt-0.5">
                  <GrammarBadge variant="case" caseBarClass={cs.bar}>
                    {word.case}
                  </GrammarBadge>
                </dd>
              </div>
            </dl>
            <ReasonRow reason={word.reason} hidden={hideReasons} />
          </>
        )}

      </div>
    </article>
  );
}
