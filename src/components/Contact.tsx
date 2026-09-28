import { profile, socials } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

export function Contact() {
  usePageMeta('Contact')

  return (
    <div className="container">
      <PageHeader title="Contact" />

      <div className="contact">
        <p className="contact__lead">
          Interested in working together, or just want to say hi? My inbox is open.
        </p>

        <a className="button button--primary contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <ul className="contact__links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.external ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="contact__label">{social.label}</span>
                <span className="contact__handle">{social.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
