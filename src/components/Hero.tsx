import { Link } from 'react-router-dom'
import { profile, socials } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { NameLetters } from './NameLetters'

export function Hero() {
  usePageMeta()

  return (
    <div className="container hero">
      <h1 className="hero__name">
        <NameLetters name={profile.name} />
      </h1>
      <p className="hero__role">{profile.role}</p>
      <p className="hero__tagline">{profile.tagline}</p>

      <div className="hero__actions">
        <Link className="button button--primary" to="/work">
          View My Work
        </Link>
        <a className="button" href={`mailto:${profile.email}`}>
          Get in touch
        </a>
      </div>

      <ul className="hero__socials">
        {socials.map((social) => (
          <li key={social.label}>
            <a href={social.href} target={social.external ? '_blank' : undefined} rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
