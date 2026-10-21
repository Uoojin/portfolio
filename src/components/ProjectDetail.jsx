import { useLayoutEffect, useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import '../styles/project-detail.css'

function Artwork({ project, className = '', caption = false }) {
  return <figure className={className} style={{ '--image-ratio': project.imageWidth / project.imageHeight }}>
    <img src={project.thumbnail} alt={project.thumbnailAlt} width={project.imageWidth} height={project.imageHeight} draggable="false" />
    {caption && <figcaption>{project.caption}</figcaption>}
  </figure>
}

export default function ProjectDetail({ project, onBack }) {
  const dialogRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [currentId, setCurrentId] = useState(project.id)
  const currentProject = projects.find(item => item.id === currentId) || project
  const currentIndex = projects.indexOf(currentProject)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const root = document.documentElement
    const body = document.body
    const originalTitle = document.title
    const returnY = window.scrollY
    const returnX = window.scrollX
    const opener = document.activeElement
    const oldBody = { position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, overflow: body.style.overflow }
    const oldRootOverflow = root.style.overflow
    const mobile = window.matchMedia('(max-width: 767px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let vertical = mobile.matches
    let markers = []
    let total = 0
    let target = 0
    let animation = 0
    let measurement = 0
    let lastTime = 0
    let anchor = { index: projects.findIndex(item => item.id === project.id), fraction: 0 }
    let initialized = false
    let activeId = ''
    let measuredWidth = 0
    let measuredHeight = 0

    root.classList.add('project-detail-open')
    root.style.overflow = 'hidden'
    Object.assign(body.style, { position: 'fixed', top: `${-returnY}px`, left: `${-returnX}px`, width: '100%', overflow: 'hidden' })
    dialog.showModal()

    const position = () => vertical ? viewport.scrollTop : viewport.scrollLeft
    const maximum = () => Math.max(0, vertical ? viewport.scrollHeight - viewport.clientHeight : viewport.scrollWidth - viewport.clientWidth)
    const writePosition = value => {
      if (vertical) viewport.scrollTop = value
      else viewport.scrollLeft = value
    }
    const update = () => {
      if (!markers.length) return
      // Layout can reset the old scroll axis before ResizeObserver fires.
      // Retain the last project anchor until the new axis has been measured.
      if (mobile.matches !== vertical || viewport.clientWidth !== measuredWidth || viewport.clientHeight !== measuredHeight) {
        scheduleMeasure()
        return
      }
      const value = position()
      let index = 0
      for (let i = 1; i < markers.length; i++) {
        if (value + 2 >= markers[i].start) index = i
        else break
      }
      anchor = { index, fraction: Math.max(0, (value - markers[index].start) / markers[index].size) }
      const id = projects[index].id
      if (id !== activeId) {
        activeId = id
        setCurrentId(id)
        document.title = `${projects[index].title} — UOOJIN`
      }
      const progress = total ? Math.max(0, Math.min(1, value / total)) : 0
      progressRef.current.style.setProperty('--progress', progress)
      progressRef.current.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
      // Native touch / keyboard scrolling can take over after the wheel settles.
      if (!animation) target = value
    }
    const measure = () => {
      measurement = 0
      cancelAnimationFrame(animation)
      animation = 0
      const savedAnchor = anchor
      vertical = mobile.matches
      measuredWidth = viewport.clientWidth
      measuredHeight = viewport.clientHeight
      markers = [...track.querySelectorAll('[data-project-id]')].map(element => ({
        start: vertical ? element.offsetTop : element.offsetLeft,
        size: vertical ? element.offsetHeight : element.offsetWidth,
      }))
      total = maximum()
      const marker = markers[savedAnchor.index]
      target = Math.max(0, Math.min(total, marker.start + marker.size * (initialized ? savedAnchor.fraction : 0)))
      // Clear the unused axis when switching between desktop and mobile.
      viewport.scrollTo({ left: vertical ? 0 : target, top: vertical ? target : 0, behavior: 'instant' })
      initialized = true
      update()
    }
    const scheduleMeasure = () => { if (!measurement) measurement = requestAnimationFrame(measure) }
    const animate = time => {
      const delta = lastTime ? Math.min(64, time - lastTime) : 16
      lastTime = time
      const value = position()
      const next = value + (target - value) * (1 - Math.exp(-delta / 70))
      if (Math.abs(target - next) < .6) {
        writePosition(target)
        animation = 0
        lastTime = 0
      } else {
        writePosition(next)
        animation = requestAnimationFrame(animate)
      }
    }
    const wheel = event => {
      if (vertical || event.ctrlKey) return // Native mobile scroll / trackpad pinch.
      event.preventDefault()
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1
      if (!animation) target = position()
      target = Math.max(0, Math.min(total, target + delta * unit))
      if (reduced.matches) writePosition(target)
      else if (!animation) { lastTime = 0; animation = requestAnimationFrame(animate) }
    }
    const key = event => {
      if (vertical || event.target !== viewport) return
      const steps = { ArrowRight: 90, ArrowDown: 90, ArrowLeft: -90, ArrowUp: -90, PageDown: viewport.clientWidth * .8, PageUp: -viewport.clientWidth * .8 }
      if (!(event.key in steps) && event.key !== 'Home' && event.key !== 'End') return
      event.preventDefault()
      cancelAnimationFrame(animation)
      animation = 0
      target = event.key === 'Home' ? 0 : event.key === 'End' ? total : Math.max(0, Math.min(total, position() + steps[event.key]))
      writePosition(target)
    }
    // Pointer/touch native panning must not fight an unfinished wheel animation.
    const stopAnimation = () => { cancelAnimationFrame(animation); animation = 0; target = position() }
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(viewport)
    observer.observe(track)
    viewport.addEventListener('scroll', update, { passive: true })
    viewport.addEventListener('wheel', wheel, { passive: false })
    viewport.addEventListener('keydown', key)
    viewport.addEventListener('pointerdown', stopAnimation, { passive: true })
    mobile.addEventListener('change', scheduleMeasure)
    window.addEventListener('resize', scheduleMeasure)
    measure()
    viewport.focus({ preventScroll: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animation)
      cancelAnimationFrame(measurement)
      viewport.removeEventListener('scroll', update)
      viewport.removeEventListener('wheel', wheel)
      viewport.removeEventListener('keydown', key)
      viewport.removeEventListener('pointerdown', stopAnimation)
      mobile.removeEventListener('change', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      dialog.close()
      Object.assign(body.style, oldBody)
      root.style.overflow = oldRootOverflow
      root.classList.remove('project-detail-open')
      document.title = originalTitle
      window.scrollTo({ left: returnX, top: returnY, behavior: 'instant' })
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [project.id])

  return <dialog ref={dialogRef} className="project-detail" aria-label="프로젝트 상세 감상" onCancel={event => { event.preventDefault(); onBack() }}>
    <div className="detail-current" aria-live="polite"><span>{String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><strong>{currentProject.title}</strong></div>
    <button className="detail-close" type="button" aria-label="프로젝트 상세 닫기" onClick={onBack}><span aria-hidden="true">×</span></button>
    <div ref={viewportRef} className="detail-viewport" tabIndex="0" aria-label="작품 감상 영역: 데스크톱에서는 휠 또는 방향키로 가로 이동">
      <div ref={trackRef} className="detail-track">
        {projects.map((item, index) => {
          const next = projects[index + 1]
          return <article key={item.id} className="detail-project" data-project-id={item.id} aria-labelledby={`detail-title-${item.id}`}>
            <div className="detail-cover"><div><p className="detail-eyebrow">{item.meta}</p><h1 id={`detail-title-${item.id}`}>{item.title}</h1>{item.subtitle && <p className="detail-subtitle">{item.subtitle}</p>}</div><Artwork project={item} className="detail-cover-image" /></div>
            <section className="detail-information" aria-label={`${item.title} 프로젝트 정보`}><h2>ABOUT THE PROJECT</h2>{item.overview.map((paragraph, number) => <p key={number}>{paragraph}</p>)}<dl><div><dt>CATEGORY</dt><dd>{item.category}</dd></div>{item.year && <div><dt>YEAR</dt><dd>{item.year}</dd></div>}</dl>{item.url && <a className="detail-external" href={item.url} target="_blank" rel="noopener noreferrer">VISIT WEBSITE ↗</a>}</section>
            {item.contentImages.map((media, number) => <figure className={`detail-content-image ${media.align || ''}`} key={media.src} style={{ '--image-ratio': media.width / media.height, '--image-height': media.displayHeight || '58dvh' }}><img src={media.src} alt={media.alt || `${item.title} 상세 이미지 ${number + 1}`} width={media.width} height={media.height} draggable="false" />{media.caption && <figcaption>{media.caption}</figcaption>}</figure>)}
            <Artwork project={item} className="detail-final-image" caption />
            {next ? <div className="detail-next" aria-label={`다음 작품 ${next.title}`}><p className="detail-eyebrow">NEXT PROJECT — CONTINUE SCROLLING</p><h2>{next.title}</h2><Artwork project={next} className="detail-next-image" /></div> : <p className="detail-end">END OF SELECTED WORKS<span>감사합니다.</span></p>}
          </article>
        })}
      </div>
    </div>
    <div ref={progressRef} className="detail-progress" role="progressbar" aria-label="전체 프로젝트 감상 진행도" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span /></div>
  </dialog>
}
