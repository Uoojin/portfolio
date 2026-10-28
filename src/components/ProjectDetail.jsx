import { useLayoutEffect, useRef } from 'react'
import { projectPath } from '../data/projects.js'
import { mainProjectOrder, projectDetails } from '../data/projectDetails.js'
import LegacyProjectDetail from './LegacyProjectDetail.jsx'
import useHorizontalDetail from '../hooks/useHorizontalDetail.js'
import '../styles/project-detail.css'

function DetailImage({ media, className = '', priority = false }) {
  return <img className={className} src={media.src} alt={media.alt} width={media.width} height={media.height} loading={priority ? 'eager' : 'lazy'} decoding="async" draggable="false" />
}

function Introduction({ detail, url }) {
  return <section className="pd-intro" data-section="INTRO" aria-labelledby="pd-title">
    <div className="pd-heading">
      <div className="pd-title-line"><h1 id="pd-title">{detail.title}</h1>{url ? <a className="pd-external" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${detail.title} 외부 사이트 열기`}>↗</a> : <span className="pd-external pd-link-unavailable" aria-label="외부 사이트 주소 미등록" title="외부 사이트 주소 미등록">↗</span>}</div>
      <p>{detail.subtitle}</p>
    </div>
    <DetailImage media={detail.intro} className="pd-monitor" priority />
    <div className="pd-role"><p>{detail.type}</p><p>{detail.role}</p></div>
    <dl className="pd-meta"><div><dt>MEDIA</dt><dd>{detail.media}</dd></div><div><dt>SUBJECT</dt><dd>{detail.subject}</dd></div><div><dt>TARGET</dt><dd>{detail.target}</dd></div></dl>
  </section>
}

function Overview({ content }) {
  return <section className="pd-overview" data-section="OVERVIEW" aria-label="OVERVIEW">
    <h2>OVERVIEW</h2>
    <div className="pd-overview-copy">
      {content.quote && <h3>{content.quote}</h3>}
      {content.body ? content.body.split('\n\n').map(paragraph => <p className="pd-overview-ko" key={paragraph}>{paragraph}</p>) : <p className="pd-overview-ko">{content.before}<strong>{content.highlight}</strong>{content.after}</p>}
      {content.english && <p className="pd-overview-en" lang="en">{content.english}</p>}
    </div>
  </section>
}

function ProjectVisual({ media }) {
  return <section className={`pd-visual${media.description ? ' pd-visual-description' : ''}`} style={{ '--pd-media-ratio': media.width / media.height }} data-section={media.label || 'PROJECT VISUAL'} aria-label={media.label || 'PROJECT VISUAL'}>
    <figure><DetailImage media={media} /></figure>
    {media.description && <div className="pd-visual-copy">{media.description.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}
  </section>
}

function MainProjectDetail({ project, onBack, onNavigate }) {
  const dialogRef = useRef(null)
  const viewportRef = useRef(null)
  const detail = projectDetails[project.id]
  const nextId = mainProjectOrder[(mainProjectOrder.indexOf(project.id) + 1) % mainProjectOrder.length]
  const next = projectDetails[nextId]

  // The dialog and background lock stay mounted while its project changes.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const root = document.documentElement
    const body = document.body
    const returnY = window.scrollY
    const returnX = window.scrollX
    const opener = document.activeElement
    const originalTitle = document.title
    const oldRoot = { overflow: root.style.overflow, scrollBehavior: root.style.scrollBehavior }
    const oldBody = { position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, overflow: body.style.overflow }
    Object.assign(root.style, { overflow: 'hidden', scrollBehavior: 'auto' })
    Object.assign(body.style, { position: 'fixed', top: `${-returnY}px`, left: `${-returnX}px`, width: '100%', overflow: 'hidden' })
    dialog.showModal()
    return () => {
      dialog.close()
      Object.assign(body.style, oldBody)
      Object.assign(root.style, oldRoot)
      document.title = originalTitle
      window.scrollTo({ left: returnX, top: returnY, behavior: 'instant' })
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  useHorizontalDetail(viewportRef, project.id)

  useLayoutEffect(() => {
    document.title = `${projectDetails[project.id].title} — UOOJIN`
  }, [project.id])

  return <dialog ref={dialogRef} className="project-detail" aria-label="프로젝트 상세 감상" onCancel={event => { event.preventDefault(); onBack() }}>
    <button className="pd-close" type="button" aria-label="프로젝트 상세 닫기" onClick={onBack}><span aria-hidden="true">×</span></button>
    <div ref={viewportRef} className="pd-viewport" tabIndex="0" aria-label="프로젝트 상세 콘텐츠: 휠 또는 좌우 스와이프로 가로 탐색">
      <article key={project.id} className="pd-project" data-project-id={project.id} style={{ '--project-color': detail.color }}>
        <Introduction detail={detail} url={project.url} />
        {detail.overview && <Overview content={detail.overview} />}
        {detail.visuals.map(media => <ProjectVisual key={media.src} media={media} />)}
        <section className="pd-next" data-section="NEXT PROJECT" aria-label="다음 프로젝트">
          <a href={projectPath(nextId)} onClick={event => onNavigate(event, nextId)} style={{ '--next-color': next.color }} aria-label={`다음 프로젝트 ${next.title}`}><span>{next.title}</span><span aria-hidden="true">→</span></a>
        </section>
      </article>
    </div>
  </dialog>
}

export default function ProjectDetail(props) {
  return projectDetails[props.project.id] ? <MainProjectDetail {...props} /> : <LegacyProjectDetail {...props} />
}
