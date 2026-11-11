import { useLayoutEffect, useRef } from 'react'
import { gallery } from '../data/gallery.js'
import { projectPath } from '../data/projects.js'
import { projectContent } from '../data/projectContent.js'
import flyProject from '../lib/projectTransition.js'
import CustomCursor from './CustomCursor.jsx'
import MonoLogContent from './MonoLogContent.jsx'
import '../styles/project-detail.css'

function DetailInfo({ content }) {
  const { title, url, subtitle, description, media, subject, target, type, tools = [], award } = content
  const facts = [['MEDIA', media], ['SUBJECT', subject], ['TARGET', target]].filter(([, value]) => value)

  return <aside className="detail-info">
    <div className="detail-description">
      <div className="detail-title">
        <h1 id="detail-title">{title}</h1>
        {url && <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} 외부 사이트 열기`}>↗</a>}
      </div>
      {subtitle && <p className="detail-subtitle">{subtitle}</p>}
      {description && <p className="detail-summary">{description}</p>}
    </div>
    {facts.length > 0 && <dl className="detail-meta">
      {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>}
    {(type || tools.length > 0 || award) && <div className="detail-credits">
      {type && <p>{type}</p>}
      {tools.length > 0 && <ul className="detail-tools" aria-label="사용 툴">
        {tools.map(tool => <li key={tool}>{tool}</li>)}
      </ul>}
      {award && <p className="detail-award" lang="ko">{award}</p>}
    </div>}
  </aside>
}

export default function ProjectDetail({ projectId, opener, onBack, onNavigate }) {
  const dialogRef = useRef(null)
  const viewportRef = useRef(null)
  const coverRef = useRef(null)
  const closeRef = useRef(null)
  const flight = useRef(null)
  const closing = useRef(false)
  const originalOpener = useRef(null)
  const opened = useRef(false)
  const content = projectContent[projectId]
  const { title, heroImage, heroAlt, heroWidth, heroHeight, artwork, detailSections } = content

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const root = document.documentElement
    const returnY = window.scrollY
    const oldRootOverflow = root.style.overflow
    const originalTitle = document.title
    const trigger = opener.current || document.activeElement
    originalOpener.current = trigger
    // Keep the real scroll offset so the Works pin stays in place behind the dialog.
    root.style.overflow = 'hidden'
    dialog.showModal()
    closeRef.current.focus({ preventScroll: true })
    const resize = () => { if (flight.current?.playState === 'running') flight.current.finish() }
    window.addEventListener('resize', resize)
    return () => {
      flight.current?.cancel()
      flight.current = null
      opened.current = false
      window.removeEventListener('resize', resize)
      dialog.close()
      root.style.overflow = oldRootOverflow
      window.scrollTo({ top: returnY, behavior: 'instant' })
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
      document.title = originalTitle
    }
  }, [opener])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    dialog.scrollTop = 0
    viewportRef.current.scrollTop = 0
    document.title = `${title} — UOOJIN`
    if (opened.current) return
    opened.current = true
    const source = originalOpener.current?.querySelector(`[data-project-thumbnail="${projectId}"]`)
    const animation = flyProject(dialog, source, coverRef.current)
    flight.current = animation
    if (animation) {
      dialog.dataset.phase = 'opening'
      animation.finished.then(() => { if (!closing.current) delete dialog.dataset.phase }, () => {})
    }
  }, [projectId, title])

  const close = () => {
    if (closing.current) return
    closing.current = true
    const dialog = dialogRef.current
    flight.current?.cancel()
    dialog.dataset.phase = 'closing'
    const source = originalOpener.current?.querySelector(`[data-project-thumbnail="${projectId}"]`)
    const animation = flyProject(dialog, source, coverRef.current, true)
    flight.current = animation
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onBack()
    } else {
      const fade = dialog.animate([{ backgroundColor: 'var(--paper)' }, { backgroundColor: 'transparent' }], {
        duration: animation ? 400 : 240, easing: 'ease-out', fill: 'forwards',
      })
      fade.finished.then(() => { if (dialog.isConnected) onBack() }, () => {})
    }
  }

  return <dialog ref={dialogRef} className="project-detail" aria-labelledby="detail-title"
    onCancel={event => { event.preventDefault(); close() }}>
    <button ref={closeRef} type="button" className="detail-close" onClick={close} aria-label="프로젝트 상세 닫기">X</button>
    <DetailInfo content={content} />
    <div className="detail-scroll" ref={viewportRef} tabIndex="0" aria-label="프로젝트 상세 콘텐츠">
      <article key={projectId} className="detail-article">
        <figure className="detail-cover" ref={coverRef} data-artwork={artwork || undefined}>
          {heroImage && <img src={heroImage} alt={heroAlt || title} width={heroWidth} height={heroHeight} decoding="async" />}
        </figure>
        {projectId === 'ProjectName' && <MonoLogContent scrollRef={viewportRef} />}
        {detailSections.map(section => <section className="detail-section" key={section.id}>
          {section.title && <h2>{section.title}</h2>}
          {section.text && <p>{section.text}</p>}
          {section.image && <img src={section.image.src} alt={section.image.alt} loading="lazy" />}
        </section>)}
      </article>
    </div>
    <nav className="detail-index" aria-label="다른 프로젝트">
      {gallery.map(item => <a key={item.id} href={projectPath(item.id)} aria-current={item.id === projectId ? 'page' : undefined}
        onClick={event => {
          if (closing.current || dialogRef.current.dataset.phase === 'opening' || item.id === projectId) {
            event.preventDefault()
            return
          }
          onNavigate(event, item.id)
        }}>{item.name}</a>)}
    </nav>
    <CustomCursor />
  </dialog>
}
