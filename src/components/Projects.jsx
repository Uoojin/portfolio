import { projects, projectPath } from '../data/projects.js'

function Projects({ onNavigate }) {
  return (
    <section id="projects" className="projects-section">
      <div className="section-heading">
        <h2>PROJECTS</h2>
        <span>A SELECTION OF WORKS</span>
      </div>
      <div className="project-grid">
        {projects.map(({ id, meta, title }) => (
          <a className="project-card project-card-link" key={id} href={projectPath(id)} onClick={(event) => onNavigate(event, id)}>
            <div className="project-thumb">
              <span>PROJECT IMAGE</span>
            </div>
            <small>{meta}</small>
            <h3>{title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Projects
