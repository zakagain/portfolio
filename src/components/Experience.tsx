import type { ReactNode } from 'react'
import { experience } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

/** Turns bare URLs in summary text into clickable external links. */
function linkify(text: string): ReactNode {
  return text.split(/(https?:\/\/[^\s)]+)/).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function Experience() {
  usePageMeta('Experience', 'Work experience of Zakariya Khalid, COO at Orca Systems.')

  return (
    <div className="container">
      <PageHeader title="Experience" />

      <ol className="timeline">
        {experience.map((item) => (
          <li key={`${item.organisation}-${item.start}`} className="timeline__item">
            <p className="timeline__period">
              {item.start} — {item.end ?? 'Present'}
            </p>

            <div className="timeline__body">
              <h2>{item.role}</h2>
              <p className="timeline__org">
                {item.link ? (
                  <a
                    href={item.link.href}
                    target={item.link.external ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {item.link.label}
                  </a>
                ) : (
                  item.organisation
                )}
                {item.location ? <span className="timeline__location"> · {item.location}</span> : null}
              </p>
              {item.summary ? <p className="timeline__summary">{linkify(item.summary)}</p> : null}

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
