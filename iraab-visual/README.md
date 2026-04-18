# Visual Iʿrāb UI (`iraab-visual`)

React + Vite + TypeScript + Tailwind CSS v4. Card-based Qurʾānic grammar breakdown with a **strict 4-layer model**:

1. **النوع** (TYPE) — اسم / فعل / حرف  
2. **الدور** (ROLE) — فاعل، مفعول به، …  
3. **الإعراب** (CASE) — مرفوع / منصوب / مجرور / مجزوم / مبني  
4. **السبب** (REASON) — why the word has that case  

## Colors

Defined in `src/index.css` (`@theme`) and `src/theme/iraabColors.ts`:

- **CASE** (global): مرفوع blue · منصوب red · مجرور green · مجزوم purple  
- **TYPE**: اسم soft yellow · فعل orange · حرف gray  
- **ROLE**: فاعل blue · مفعول به red · مضاف إليه green · مبتدأ brown · خبر purple  
- **Rule families** (group chrome): Jarr (green) · Naṣb (red) · Rafʿ (blue) · Jazm (purple)

## Components

| Component       | Role                                      |
|----------------|-------------------------------------------|
| `WordCard`     | One word, four layers + case bar          |
| `PhraseGroup`  | Bordered block + family label + words   |
| `GrammarBadge` | TYPE / ROLE / CASE / family chips         |
| `RelationArrow`| Arrow + Arabic label between related words|
| `TogglePanel`  | Hide reasons / colors-only / highlights   |
| `AyahIraabView`| Page layout + toolbar + list of groups    |

## Data shape

See `src/types.ts` — each word:

```ts
{
  word, type, role, case, reason,
  relatedWords: [{ targetId, labelAr, kind }],
  groupType,
  ruleFamily?: 'jarr' | 'nasb' | 'raf' | 'jazm' | 'other'
}
```

`IraabAyahBlock` holds `groups[]` of `IraabPhraseGroup`, each with `words[]`.

## Scripts

```bash
npm install
npm run dev    # development — http://localhost:5173
npm run build  # production bundle → ../iraab-visual-ui/ (next to `quran-iraab.html` on the static site)
```

After `npm run build`, output is **`iraab-visual/dist/`**. The main Qurʾān view is **`quran-iraab.html`** at the site root; this React package is optional for prototyping components, not required to use the site.

## Integrating the main site

The rest of this repo is static HTML/JS. This package is a **separate** build. Options:

- Deploy `iraab-visual/dist/` as a subpath or subdomain.  
- Copy `src/components` + `src/theme` into another React app and import `AyahIraabView`.  
- Generate JSON per āyah from your pipeline matching `IraabAyahBlock` and pass it as `block={…}`.
