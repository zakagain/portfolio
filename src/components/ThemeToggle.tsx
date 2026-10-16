import type { MouseEvent } from 'react'

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: (origin: { x: number; y: number }) => void
}

/** Outline icons: they take `currentColor`, so one pair covers both themes. */
const MoonIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

const SunIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Hand the button's centre to the hook so the wipe starts exactly here.
    const rect = event.currentTarget.getBoundingClientRect()
    onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {/* Keyed by theme so the spin replays on every swap. Shows the theme
          being switched to, which is the opposite of the current one. */}
      <span key={theme} className="theme-toggle__icon" aria-hidden="true">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}
