import { Link } from 'react-router-dom'
import { profile } from '../data/portfolio'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="footer__meta">
          Built with React + Vite. <Link to="/">Home ↑</Link>
        </p>
      </div>
    </footer>
  )
}
