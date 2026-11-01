import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// Self-hosted so the fonts are same-origin and cached with the bundle. Loaded
// before the app CSS so the first paint already has the real faces.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root not found')
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// In production the routes are prerendered into #root, so hydrate instead of
// re-rendering from scratch (avoids a flash and keeps the SSR HTML).
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
