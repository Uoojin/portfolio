import { useEffect } from 'react'
import About from './components/About.jsx'
import Intro from './components/Intro.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Workspace from './components/Workspace.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import usePortfolioNavigation from './hooks/usePortfolioNavigation.js'

export default function App() {
  const { project, navigateProject, backToPortfolio } = usePortfolioNavigation()
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const follow = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => document.querySelectorAll('.eye i').forEach(pupil => {
        const r = pupil.parentElement.getBoundingClientRect()
        const angle = Math.atan2(event.clientY - r.top - r.height / 2, event.clientX - r.left - r.width / 2)
        pupil.style.transform = `translate(${Math.cos(angle) * r.width * .14}px, ${Math.sin(angle) * r.height * .14}px)`
      }))
    }
    window.addEventListener('pointermove', follow, { passive: true })
    return () => { window.removeEventListener('pointermove', follow); cancelAnimationFrame(frame) }
  }, [])
  return <>
    <div inert={Boolean(project)} aria-hidden={project ? true : undefined} className="portfolio"><Header /><main><Hero /><Intro /><Workspace active={!project} onNavigate={navigateProject} /><About /></main><Footer /></div>
    {project && <ProjectDetail project={project} onBack={backToPortfolio} />}
  </>
}
