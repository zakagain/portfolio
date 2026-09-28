import { about } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

export function About() {
  usePageMeta(about.heading)

  return (
    <div className="container">
      <PageHeader title={about.heading} />

      <div className="about">
        <div className="about__prose">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="about__aside">
          <dl className="facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {about.currently.length > 0 ? (
            <div className="about__currently">
              <h2>Currently</h2>
              <ul>
                {about.currently.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
