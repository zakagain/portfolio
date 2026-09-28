import { useCallback, useRef, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/** Keep in sync with the `theme-wipe` keyframes in index.css. */
export const THEME_WIPE_MS = 1000

type ViewTransition = { finished: Promise<void> }
type DocWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition
}

/** Follows the OS preference unless the visitor has used the toggle. */
function readInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Writes the theme straight to the DOM rather than from an effect. An effect
 * runs after paint, which flashes the outgoing theme for a frame.
 * `index.html` sets the initial value before first paint.
 */
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* Private browsing. */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  /** Blocks re-entrant toggles while a transition is playing. */
  const busyUntil = useRef(0)

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (Date.now() < busyUntil.current) return

      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const doc = document as DocWithViewTransitions

      if (reducedMotion || typeof doc.startViewTransition !== 'function') {
        applyTheme(next)
        setTheme(next)
        return
      }

      // Read by the ::view-transition-new(root) keyframes below.
      const root = document.documentElement
      root.style.setProperty('--wipe-x', `${origin?.x ?? window.innerWidth}px`)
      root.style.setProperty('--wipe-y', `${origin?.y ?? 0}px`)

      busyUntil.current = Date.now() + THEME_WIPE_MS

      // The browser captures the old and new frames itself, so the foreground
      // colours are already correct inside the sweep. The callback must make
      // the DOM change; anything done after it is not captured.
      const transition = doc.startViewTransition(() => applyTheme(next))
      setTheme(next)
      transition.finished.finally(() => {
        busyUntil.current = 0
      })
    },
    [theme],
  )

  return { theme, toggleTheme }
}
