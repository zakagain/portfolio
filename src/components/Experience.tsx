import { experience } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

export function Experience() {
  usePageMeta('Experience')

  return (
    <div className="container">
      <PageHeader title="Experience" />

      <ol className="timeline">
        {experience.map((item) => (
          <li key={`${item.organisation}-${item.start}`} className="timeline__item">
            <p className="timeline__period">
              <span>{item.start}</span>
              <span aria-hidden="true">—</span>
              <span>{item.end ?? 'Present'}</span>
            </p>

            <div className="timeline__body">
              <h2 className="timeline__role">{item.role}</h2>
              <p className="timeline__org">
                {item.organisation}
                {item.location ? <span className="timeline__location"> · {item.location}</span> : null}
              </p>
              {item.summary ? <p className="timeline__summary">{item.summary}</p> : null}

              {item.highlights && item.highlights.length > 0 ? (
                <ul className="timeline__highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}

              {item.tech && item.tech.length > 0 ? (
                <ul className="tags">
                  {item.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
