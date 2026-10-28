import { projects, projectPath } from '../data/projects.js'
import blah from '../assets/project/poster01.webp'
import observation from '../assets/project/poster02.webp'
import literally from '../assets/project/poster03.webp'
import poster04 from '../assets/project/poster04.webp'
import usePosterSlider from '../hooks/usePosterSlider.js'

const posters = [
  { src: blah, id: 'blah-blah', alt: 'BLAH BLAH BLAH', width: 480, height: 599 },
  { src: observation, id: 'poster-02', alt: '本日の観察記録', width: 458, height: 577 },
  { src: literally, id: 'project-04', alt: 'TAKE IT LITERALLY! / HEADLINE', width: 818, height: 577 },
  { src: poster04, id: 'poster-04', alt: 'なんか — 개인 포스터', width: 294, height: 559 },
]
export default function Projects({ onNavigate }) {
  const slider = usePosterSlider()
  return <section id="projects" className="projects-section" aria-labelledby="projects-title">
    <div className="project-list">
      <div className="section-heading">
        <h2 id="projects-title">PROJECTS</h2>
        <p>Connecting visual design with interaction <br />to create digital experiences.</p>
      </div>
      {projects.slice(0, 4).map(project => <article className="project-row" key={project.id}>
        <a className="project-image-link" href={projectPath(project.id)} onClick={event => onNavigate(event, project.id)} aria-label={`${project.title} 프로젝트 상세 보기`}>
          <img src={project.thumbnail} alt={project.thumbnailAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
        </a>
        <a className="project-info" href={projectPath(project.id)} onClick={event => onNavigate(event, project.id)}>
          <h3>{project.title}</h3><p>{project.meta}</p>
        </a>
      </article>)}
      <div className="sub-heading"><h2>SUB<br />PROJECTS</h2><p>A SELECTION OF WORKS</p></div>
    </div>
    <div {...slider} className="poster-strip" aria-label="Personal poster works" tabIndex="0">
      <div className="poster-track">
      {posters.map(poster => <div className="poster-card" key={poster.id}><img src={poster.src} alt={poster.alt} width={poster.width} height={poster.height} loading="eager" draggable="false" /></div>)}
      </div>
    </div>
    
  </section>
}
