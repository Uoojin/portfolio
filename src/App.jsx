import { useEffect } from 'react'
import About from './components/About.jsx'
import Entry from './components/Entry.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import Projects from './components/Projects.jsx'
import ProjectStack from './components/ProjectStack.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import usePortfolioNavigation from './hooks/usePortfolioNavigation.js'
import { findProject } from './data/projects.js'

function App() {
  const { project, navigateProject, backToPortfolio } = usePortfolioNavigation()
  useEffect(() => {
    const body = document.body
    const startsOnDetail = Boolean(findProject(window.location.pathname))
    if (!startsOnDetail) body.classList.add('intro-playing')
    else {
      body.classList.add('ready')
      document.querySelector('.entry')?.classList.add('done')
    }

    const entryTimer = window.setTimeout(() => {
      document.querySelector('.entry')?.classList.add('done')
    }, 1100)
    const introTimer = window.setTimeout(() => {
      body.classList.remove('intro-playing')
    }, 1350)
    const readyTimer = window.setTimeout(() => {
      body.classList.add('ready')
    }, 900)

    let idle
    const look = (x, y) => {
      document.querySelectorAll('.eye i, .logo-eye i').forEach((pupil) => {
        const eye = pupil.parentElement
        const rect = eye.getBoundingClientRect()
        const dx = x - (rect.left + rect.width / 2)
        const dy = y - (rect.top + rect.height / 2)
        const angle = Math.atan2(dy, dx)
        const distance = Math.min(rect.width * 0.2, Math.hypot(dx, dy) * 0.035)
        pupil.style.transform = `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px)`
      })
    }

    const handleMouseMove = (event) => {
      look(event.clientX, event.clientY)
    }

    const canTrackPointer = window.matchMedia('(pointer: fine)').matches
    if (canTrackPointer) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    const blink = () => {
      document
        .querySelectorAll('body:not(.intro-playing) .eye, body:not(.intro-playing) .logo-eye')
        .forEach((eye) => {
          eye.animate(
            [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.08)' }, { transform: 'scaleY(1)' }],
            { duration: 180, easing: 'ease-in-out' },
          )
        })
      idle = window.setTimeout(blink, 4200 + Math.random() * 4200)
    }
    idle = window.setTimeout(blink, 4200)

    return () => {
      window.clearTimeout(entryTimer)
      window.clearTimeout(introTimer)
      window.clearTimeout(readyTimer)
      window.clearTimeout(idle)
      window.removeEventListener('mousemove', handleMouseMove)
      body.classList.remove('intro-playing', 'ready')
    }
  }, [])

  return (
    <>
      <div hidden={Boolean(project)}>
        <Entry />
        <Header />

        <main>
          <Hero />
          <Intro />
          <Projects onNavigate={navigateProject} />
          <About />
          <ProjectStack onNavigate={navigateProject} />
        </main>

        <Footer />
      </div>
      {project && <ProjectDetail project={project} onNavigate={navigateProject} onBack={backToPortfolio} />}
    </>
  )
}

export default App
