import { useState } from 'react';
import type { IraabAyahBlock, IraabViewState } from '../types';
import { PhraseGroup } from './PhraseGroup';
import { TogglePanel } from './TogglePanel';

const defaultView: IraabViewState = {
  hideReasons: false,
  colorsOnly: false,
  highlightPatterns: true,
};

interface AyahIraabViewProps {
  block: IraabAyahBlock;
}

export function AyahIraabView({ block }: AyahIraabViewProps) {
  const [view, setView] = useState<IraabViewState>(defaultView);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 border-b border-slate-200 pb-6">
        {block.referenceAr && (
          <p className="font-arabic mb-2 text-center text-sm text-slate-500" dir="rtl">
            {block.referenceAr}
          </p>
        )}
        {block.ayahText && (
          <blockquote
            className="font-arabic mx-auto max-w-3xl text-center text-3xl font-bold leading-loose text-slate-900"
            dir="rtl"
          >
            {block.ayahText}
          </blockquote>
        )}
      </header>

      <div
        className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start"
        dir="rtl"
      >
        <div className="lg:w-72 lg:shrink-0">
          <TogglePanel view={view} onChange={setView} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-10" dir="rtl">
          {block.groups.map((g) => (
            <PhraseGroup key={g.id} group={g} view={view} />
          ))}
        </div>
      </div>
    </div>
  );
}
