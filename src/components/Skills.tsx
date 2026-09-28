import { skills } from '../data/portfolio'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from './PageHeader'

export function Skills() {
  usePageMeta('Skills')

  // With one group the category heading would just repeat the page title, and a
  // lone column of tags leaves the page looking empty. Lay it out as a grid.
  const isSingleGroup = skills.length === 1

  return (
    <div className="container">
      <PageHeader title="Skills" lede="Tools I kinda sorta know how to use" />

      {isSingleGroup ? (
        <ul className="tags tags--grid">
          {skills[0].items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="skill-groups">
          {skills.map((group) => (
            <div key={group.category} className="skill-group">
              <h2 className="skill-group__category">{group.category}</h2>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
