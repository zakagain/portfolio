import type { MouseEvent } from 'react'

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: (origin: { x: number; y: number }) => void
}

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
      {/* Keyed by theme so the spin replays on every swap. */}
      <span key={theme} className="theme-toggle__icon" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}
