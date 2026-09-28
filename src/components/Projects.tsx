import { projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

const statusLabels: Record<NonNullable<Project['status']>, string> = {
  live: 'Live',
  'in-progress': 'In progress',
  archived: 'Archived',
}

export function Projects() {
  usePageMeta('Work')

  // Featured projects float to the top; everything else keeps its original order.
  const ordered = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))

  return (
    <div className="container">
      <PageHeader
        title="Work"
        lede="Things I am working on, have worked on and will be working on."
      />

      <ul className="project-grid">
        {ordered.map((project) => (
          <li key={project.id} className="card project">
            <div className="project__head">
              <h2 className="project__title">{project.title}</h2>
              {project.status ? (
                <span className={`badge badge--${project.status}`}>
                  {statusLabels[project.status]}
                </span>
              ) : null}
            </div>

            {project.summary ? <p className="project__summary">{project.summary}</p> : null}
            {project.description ? <p className="project__description">{project.description}</p> : null}

            {project.tech.length > 0 ? (
              <ul className="tags">
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {project.links.length > 0 ? (
              <div className="project__links">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
