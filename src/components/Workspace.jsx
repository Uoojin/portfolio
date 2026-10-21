import { useLayoutEffect, useRef, useState } from 'react'
import { projects, projectPath } from '../data/projects.js'
import ProjectGraphic from './ProjectGraphic.jsx'
import HeaderLogo from './HeaderLogo.jsx'
import { workspaceMotion } from '../lib/workspaceMotion.js'
import Eyes from './Eyes.jsx'

export default function Workspace({ active, onNavigate }) {
  const sectionRef = useRef(null)
  const windowRef = useRef(null)
  const previewRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState(null)
  const selected = hovered || pinned
  const clearSelection = () => { setHovered(null); setPinned(null) }
  const openProject = (event, id) => {
    onNavigate(event, id)
    // A stale pinned preview must not cover another icon after the modal closes.
    if (event.defaultPrevented) clearSelection()
  }
  useLayoutEffect(() => {
    if (!active) return
    const section = sectionRef.current
    const screen = windowRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const w = section.clientWidth
      const h = window.innerHeight
      const travel = section.offsetHeight - h
      const progress = -section.getBoundingClientRect().top / Math.max(1, travel)
      const motion = workspaceMotion(progress, reduced.matches)
      const eased = motion.expansion
      const startW = Math.min(w * (w < 600 ? .9 : .64), 760, h * .58 * 4 / 3)
      const startH = startW * 3 / 4
      screen.style.width = `${startW + (w - startW) * eased}px`
      screen.style.height = `${startH + (h - startH) * eased}px`
      screen.style.transform = `translate(-50%, calc(-50% + ${(1 - eased) * h * .06}px))`
      screen.style.borderRadius = `${8 * (1 - eased)}px`
      screen.style.opacity = motion.opacity
      screen.style.visibility = motion.opacity === 0 ? 'hidden' : 'visible'
      screen.style.setProperty('--window-height', `${startH + (h - startH) * eased}px`)
      screen.dataset.phase = motion.phase
      section.style.setProperty('--transition-opacity', motion.caption)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(section)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    update()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [active])

  useLayoutEffect(() => {
    if (!active || !selected) return
    const preview = previewRef.current
    const item = preview?.parentElement
    if (!preview || !item) return
    let frame = 0
    const position = () => {
      frame = 0
      const anchor = item.getBoundingClientRect()
      const contentLeft = windowRef.current.querySelector('.workspace-sidebar').getBoundingClientRect().right + 12
      preview.style.maxWidth = `${Math.max(150, window.innerWidth - contentLeft - 12)}px`
      const width = preview.offsetWidth
      const height = preview.offsetHeight
      const preferredX = anchor.right + 12 + width <= window.innerWidth ? anchor.right + 12 : anchor.left - width - 12
      const x = Math.max(contentLeft, Math.min(window.innerWidth - width - 12, preferredX))
      let y = Math.max(76, Math.min(window.innerHeight - height - 12, anchor.top))
      // Clamping a preview on narrow screens must never cover its own icon:
      // otherwise pointer-enter can replace the click target before pointer-down.
      if (x < anchor.right && x + width > anchor.left && y < anchor.bottom && y + height > anchor.top) {
        if (anchor.bottom + height + 8 <= window.innerHeight - 4) y = anchor.bottom + 8
        else if (anchor.top - height - 8 >= 76) y = anchor.top - height - 8
      }
      Object.assign(preview.style, { left: `${x - anchor.left}px`, top: `${y - anchor.top}px`, right: 'auto', bottom: 'auto', transform: 'none' })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(position) }
    const escape = event => {
      if (event.key === 'Escape') { setHovered(null); setPinned(null) }
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(windowRef.current)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('keydown', escape)
    position()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('keydown', escape)
    }
  }, [selected, active])

  return <section id="projects" className="workspace-transition" ref={sectionRef} aria-label="Project workspace" onKeyDown={event => { if (event.key === 'Escape') clearSelection() }}>
    <div className="workspace-stage">
      <div className="transition-caption"><span></span><p></p></div>
      <div className="transition-note" aria-hidden="true"> <span></span></div>
      <Eyes className="transition-eyes eyes" />
      <div className="workspace-window" ref={windowRef}>
        <div className="window-bar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span></span><span className="bar-mark" aria-hidden="true">↗</span></div>
        <div className="workspace-body">
          <aside className="workspace-sidebar">
            <a href="#hero" aria-label="UOOJIN home"><HeaderLogo /></a>
            <nav className="project-index" aria-label="Project index" onPointerLeave={() => setHovered(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null) }}>
              <h2>PROJECT INDEX</h2>
              {projects.map((project, index) => <button type="button" key={project.id} className={selected === project.id ? 'current' : ''} aria-pressed={selected === project.id} onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(project.id) }} onFocus={() => setHovered(project.id)} onClick={() => { setPinned(project.id) }}>
                <span className="index-number">{String(index + 1).padStart(2, '0')} —</span><span>{project.title}</span>
              </button>)}
            </nav>
            <div className="workspace-count">{projects.length} items<span /><small>WORK IN PROGRESS</small></div>
          </aside>
          <div className="workspace-content"><div className="workspace-label"><span>SELECTED PROJECTS</span><span>/ WORKSPACE</span></div>
            <div className="project-grid">{projects.map((project, index) => <div key={project.id} className={`workspace-item ${selected === project.id ? 'is-selected' : ''}`} onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(project.id) }} onPointerLeave={event => { if (event.pointerType !== 'touch') setHovered(null) }} onFocus={() => setHovered(project.id)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null) }} onKeyDown={event => { if (event.key === 'Escape') { clearSelection(); event.stopPropagation() } }}>
              <a className="project-icon" href={projectPath(project.id)} onClick={event => {
                openProject(event, project.id)
              }} aria-describedby={selected === project.id ? `preview-${project.id}` : undefined}><ProjectGraphic project={project} /><span>{project.title}</span><small>{String(index + 1).padStart(2, '0')}</small></a>
              {selected === project.id && <div ref={previewRef} id={`preview-${project.id}`} className="project-preview" role="region" aria-label={`${project.title} preview`}><div className="preview-heading"><span>{project.title}</span><button aria-label="Close preview" onClick={clearSelection}>×</button></div><a href={projectPath(project.id)} onClick={event => openProject(event, project.id)} className="preview-link"><div className="preview-image"><ProjectGraphic project={project} /><span>{project.year}</span>{!project.thumbnail && <small>IMAGE PLACEHOLDER</small>}</div><p className="preview-category">{project.meta}</p><p className="preview-description">{project.summary}</p><span className="preview-cta">VIEW PROJECT <b>↗</b></span></a></div>}
            </div>)}</div>
            <p className="workspace-footnote">An evolving collection of ideas &amp; experiments.<span>실제 프로젝트 콘텐츠 업데이트 예정</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>
}
