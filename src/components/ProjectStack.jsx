import { projects, projectPath } from '../data/projects.js'

function ProjectStack({ onNavigate }) {
  return (
    <section className="project-stack" aria-label="More projects">
      {projects.slice(0, 3).map((project, index) => (
        <a key={project.id} href={projectPath(project.id)} className={`stack-card ${['one', 'two', 'three'][index]}`} onClick={(event) => onNavigate(event, project.id)}>
          {project.title}
        </a>
      ))}
    </section>
  )
}

export default ProjectStack
