import { projects, projectPath } from '../data/projects.js'

export default function Projects({ onNavigate }) {
  return <section id="projects" className="projects-section" aria-labelledby="projects-title">
    <div className="section-heading">
      <h2 id="projects-title">PROJECTS</h2>
      <span>A SELECTION OF WORKS</span>
    </div>
    <div className="project-list">
      {projects.map(project => <article className={`project-row${project.imageHeight > project.imageWidth ? ' project-row-portrait' : ''}`} key={project.id}>
        <a className="project-image-link" href={projectPath(project.id)} onClick={event => onNavigate(event, project.id)} aria-label={`${project.title} 프로젝트 상세 보기`}>
          <img src={project.thumbnail} alt={project.thumbnailAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
        </a>
        <a className="project-info" href={projectPath(project.id)} onClick={event => onNavigate(event, project.id)}>
          <p>{project.meta}</p>
          <h3>{project.title}</h3>
        </a>
      </article>)}
    </div>
  </section>
}
