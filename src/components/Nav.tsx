import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/portfolio'
import { ThemeToggle } from './ThemeToggle'

type NavProps = {
  theme: 'light' | 'dark'
  onToggleTheme: (origin: { x: number; y: number }) => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <header className="nav">
      <div className="container nav__inner">
        {/* `end` keeps this active only on the home route. */}
        <NavLink className="nav__home" to="/" end>
          Home
        </NavLink>

        <nav className="nav__menu" aria-label="Main">
          <ul className="nav__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
