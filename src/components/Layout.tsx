import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Footer } from './Footer'
import { GridBackground } from './GridBackground'
import { Nav } from './Nav'

/** Persistent chrome: nav, grid backdrop and footer wrap every route. */
export function Layout() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    // Each route is its own document view, so start it at the top.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <GridBackground />

      <main id="main" className="page">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
