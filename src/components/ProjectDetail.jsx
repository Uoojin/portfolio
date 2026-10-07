import { useLayoutEffect, useRef } from 'react'
import { detailLayout, projects, projectPath } from '../data/projects.js'
import ProjectMedia from './ProjectMedia.jsx'
import '../styles/project-detail.css'

function DetailText({ position, title, paragraphs }) {
  return (
    <section className="detail-text detail-positioned" style={{ '--x': position.x, '--y': position.y, '--w': position.width }}>
      <h2>{title}</h2>
      <div>{paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
    </section>
  )
}

export default function ProjectDetail({ project, onNavigate, onBack }) {
  const shellRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const nextProject = projects.find((item) => item.id === project.nextProject)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    let distance = 0
    let pendingFrame = 0
    const previousTitle = document.title
    document.title = `${project.title} — UOOJIN`
    document.documentElement.classList.add('project-detail-open')
    window.scrollTo({ top: 0, behavior: 'instant' })

    const update = () => {
      pendingFrame = 0
      const progress = Math.max(0, Math.min(distance, -shell.getBoundingClientRect().top))
      track.style.transform = `translate3d(${-progress}px, 0, 0)`
    }
    const measure = () => {
      distance = Math.max(0, track.getBoundingClientRect().width - viewport.clientWidth)
      shell.style.height = `${distance + viewport.clientHeight}px`
      update()
    }
    const handleScroll = () => {
      if (!pendingFrame) pendingFrame = window.requestAnimationFrame(update)
    }
    // Native vertical scrolling supplies exactly the distance the track can travel.
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    window.addEventListener('scroll', handleScroll, { passive: true })
    measure()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(pendingFrame)
      document.documentElement.classList.remove('project-detail-open')
      document.title = previousTitle
    }
  }, [project.id, project.title])

  return (
    <div className="project-detail" ref={shellRef}>
      <div className="detail-viewport" ref={viewportRef}>
        <div className="detail-track" ref={trackRef} style={{ '--track-width': detailLayout.width }}>
          <a className="detail-back" href={`${import.meta.env.BASE_URL}#projects`} onClick={onBack}>&lt; back</a>
          <section className="detail-intro" aria-label="Project information">
            <h1>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.title} <span>↗︎</span></a> : <>{project.title} <span>↗︎</span></>}</h1>
            <p className="detail-date">{project.date}</p>
            <p className="detail-role">{project.type}{project.role}</p>
            <p className="detail-category">{project.category}</p>
            <div className="detail-tools">{project.tools.map((tool, index) => <span key={index}>{tool}</span>)}</div>
          </section>
          {detailLayout.media.map((frame) => <ProjectMedia key={frame.id} frame={frame} media={project.media[frame.id]} />)}
          <DetailText position={detailLayout.overview} title="OVERVIEW" paragraphs={project.overview} />
          <p className="detail-caption detail-positioned" style={{ '--x': detailLayout.caption.x, '--y': detailLayout.caption.y, '--w': detailLayout.caption.width }}>{project.caption}</p>
          <DetailText position={detailLayout.subtitle} title={project.sections[0].title} paragraphs={project.sections[0].paragraphs} />
          <a className="detail-next detail-positioned" style={{ '--x': detailLayout.next.x, '--y': 0, '--w': detailLayout.next.width, '--h': detailLayout.next.height }} href={projectPath(nextProject.id)} onClick={(event) => onNavigate(event, nextProject.id)}>
            <span className="detail-next-label">NEXT →</span>
            <ProjectMedia frame={{ id: 'next-preview', kind: 'image', x: 140, y: 244, width: 695, height: 522 }} media={project.nextPreview} />
            <span className="detail-next-caption">{project.nextCaption}</span>
            <span className="detail-next-title">{nextProject.title}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
