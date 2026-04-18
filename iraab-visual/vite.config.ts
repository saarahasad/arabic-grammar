import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Build: `npm run build` → `iraab-visual/dist/` (optional dev tool; main site is quran-iraab.html).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
