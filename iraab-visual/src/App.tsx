import { AyahIraabView } from './components/AyahIraabView';
import { sampleAyahBlock } from './sampleData';

function App() {
  return (
    <div className="min-h-dvh bg-[#fafaf8]">
      <header className="border-b border-slate-200 bg-white/90 px-4 py-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Visual Iʿrāb system
        </p>
        <h1 className="font-arabic mt-2 text-2xl font-bold text-slate-900 md:text-3xl" dir="rtl">
          نَظَامُ الْإِعْرَابِ الْبَصْرِيِّ — أَرْبَعُ طَبَقَاتٍ
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          النّوع، الدّور، الإعراب، السّبب — بطاقات، عائلات قواعد، وسهام للعلاقات.
        </p>
        <p
          className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[0.7rem] text-slate-500"
          dir="rtl"
          aria-label="ألوان الإعراب"
        >
          <span className="font-arabic text-slate-600">٣ الإعراب:</span>
          <span className="rounded-md bg-[#2563eb] px-2 py-0.5 font-arabic font-bold text-white shadow-sm">رَفْع</span>
          <span className="rounded-md bg-[#dc2626] px-2 py-0.5 font-arabic font-bold text-white shadow-sm">نَصْب</span>
          <span className="rounded-md bg-[#16a34a] px-2 py-0.5 font-arabic font-bold text-white shadow-sm">جَرّ</span>
          <span className="rounded-md bg-[#9333ea] px-2 py-0.5 font-arabic font-bold text-white shadow-sm">جَزْم</span>
          <span className="rounded-md bg-[#475569] px-2 py-0.5 font-arabic font-bold text-white shadow-sm">مَبْنِيّ</span>
        </p>
      </header>
      <AyahIraabView block={sampleAyahBlock} />
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-xs text-slate-500">
        React + Tailwind · بيانات JSON لكلّ آية · قابلة للربط مع الـ API
      </footer>
    </div>
  );
}

export default App;
