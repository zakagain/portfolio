import { Link } from 'react-router-dom'
import { metrics, profile, socials } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { NameLetters } from './NameLetters'

export function Hero() {
  usePageMeta(undefined, 'Portfolio of Zakariya Khalid, a software engineer building things for the web.')

  return (
    <div className="container hero">
      <h1 className="seo-h1">{profile.name}</h1>
      <div className="hero__name" aria-hidden="true">
        <NameLetters name={profile.name} />
      </div>
      <p className="hero__role">{profile.role}</p>


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
              {/* Only links that leave the site get the "opens elsewhere" cue. */}
              {social.external ? <span className="arr" aria-hidden="true">↗</span> : null}
            </a>
          </li>
        ))}
      </ul>

      <dl className="metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric">
            <dt className="metric__value">{metric.value}</dt>
            <dd className="metric__label">{metric.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
