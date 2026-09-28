import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// Custom domain. If you move to a project page (user.github.io/repo),
// change this to '/repo/' — %BASE_URL% propagates into 404.html from here.
const base = '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // Built as a second entry so Vite substitutes %BASE_URL% in it.
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
})
