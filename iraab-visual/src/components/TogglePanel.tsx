import type { IraabViewState } from '../types';

interface TogglePanelProps {
  view: IraabViewState;
  onChange: (next: IraabViewState) => void;
}

export function TogglePanel({ view, onChange }: TogglePanelProps) {
  const set = (patch: Partial<IraabViewState>) => onChange({ ...view, ...patch });

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      role="group"
      aria-label="عرض الإعراب"
    >
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
        أوضاع العرض
      </h3>
      <div className="flex flex-col gap-3">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            checked={view.hideReasons}
            onChange={(e) => set({ hideReasons: e.target.checked })}
          />
          <span className="text-sm text-slate-700">إخفاء الأسباب (الطّبقة ٤)</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            checked={view.colorsOnly}
            onChange={(e) => set({ colorsOnly: e.target.checked })}
          />
          <span className="text-sm text-slate-700">الألوان فقط (تقليل النصوص)</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            checked={view.highlightPatterns}
            onChange={(e) => set({ highlightPatterns: e.target.checked })}
          />
          <span className="text-sm text-slate-700">تلوين الأنماط (حدود المجموعات)</span>
        </label>

        <button
          type="button"
          className="mt-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() =>
            onChange({
              hideReasons: false,
              colorsOnly: false,
              highlightPatterns: true,
            })
          }
        >
          إعادة ضبط العرض الموصى به
        </button>
      </div>
    </div>
  );
}
