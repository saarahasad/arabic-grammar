import { Fragment } from 'react';
import type { IraabPhraseGroup, IraabViewState } from '../types';
import { familyMeta } from '../theme/iraabColors';
import { deriveRuleFamily } from '../lib/deriveFamily';
import { WordCard } from './WordCard';
import { RelationArrow } from './RelationArrow';

interface PhraseGroupProps {
  group: IraabPhraseGroup;
  view: IraabViewState;
}

export function PhraseGroup({ group, view }: PhraseGroupProps) {
  const words = group.words;
  const family =
    group.ruleFamily ?? (words[0] ? deriveRuleFamily(words[0]) : 'other');
  const fm = familyMeta[family] ?? familyMeta.other;
  const border = view.highlightPatterns ? `border-2 ${fm.border}` : 'border border-slate-200/95';

  return (
    <section
      className={`rounded-2xl bg-white/90 p-4 shadow-sm ${border}`}
      aria-labelledby={`group-${group.id}-label`}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3" dir="rtl">
        <div className="flex flex-wrap items-center gap-2">
          <h2 id={`group-${group.id}-label`} className="font-arabic text-lg font-bold text-slate-800">
            {group.labelAr}
          </h2>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{group.groupType}</span>
        </div>
        <div className="flex items-center gap-2" dir="rtl">
          <span className={`rounded-md border px-2 py-1 text-xs font-bold ${fm.chip}`}>
            {fm.labelAr}
          </span>
          <span className="text-[0.65rem] font-medium text-slate-400">{fm.labelEn}</span>
        </div>
      </header>

      <div
        className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6"
        dir="rtl"
      >
        {words.map((w, i) => (
          <Fragment key={w.id}>
            <WordCard word={w} view={view} />
            {i < words.length - 1 && (() => {
              const next = words[i + 1];
              const rel = w.relatedWords.find((r) => r.targetId === next.id);
              if (rel) {
                return <RelationArrow labelAr={rel.labelAr} compact={words.length > 3} />;
              }
              return <span className="hidden w-2 sm:inline" aria-hidden />;
            })()}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
