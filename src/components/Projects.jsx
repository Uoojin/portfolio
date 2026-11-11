import { useRef } from 'react'
import { gallery } from '../data/gallery.js'
import { projectPath } from '../data/projects.js'
import useWorksReveal from '../hooks/useWorksReveal.js'

export default function Projects({ onNavigate }) {
  const section = useRef(null)
  useWorksReveal(section)

  return <section ref={section} id="projects" className="works" aria-labelledby="works-title" lang="en">
    <div className="works-heading">
      <h2 id="works-title">WORKS</h2>
      <p>Selected projects, collected over time.</p>
    </div>
    <ul className="works-grid">
      {gallery.map(({ id, name, label, cover }) => <li key={id}>
        <a href={projectPath(id)} onClick={event => onNavigate(event, id)} className="work-link">
          <div className="work-thumbnail" data-project-thumbnail={id}>
            {cover && <img src={cover} alt="" width="1200" height="900" loading="lazy" decoding="async" />}
          </div>
          <div className="work-caption"><h3>{name}</h3><p>{label}</p></div>
        </a>
      </li>)}
    </ul>
  </section>
}
