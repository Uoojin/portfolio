import { useRef } from 'react'
import About, { AboutDocuments } from './components/About.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import usePortfolioNavigation from './hooks/usePortfolioNavigation.js'
import usePageMotion from './hooks/usePageMotion.js'
import useReveal from './hooks/useReveal.js'
import './styles/portfolio.css'

export default function App() {
  const { project, navigateProject, backToPortfolio } = usePortfolioNavigation()
  const onSection = usePageMotion(Boolean(project))
  const pageRef = useRef(null)
  const opener = useRef(null)
  useReveal(pageRef)

  const openProject = (event, id) => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      opener.current = event.currentTarget
    }
    navigateProject(event, id)
  }

  return <>
    <div className="portfolio" ref={pageRef}>
      <Header onSection={onSection} />
      <main>
        <Hero onSection={onSection} paused={Boolean(project)} />
        <About />
        <AboutDocuments />
        <Projects onNavigate={openProject} />
      </main>
      <Footer onSection={onSection} />
      <CustomCursor />
    </div>
    {project && <ProjectDetail projectId={project.id} opener={opener} onBack={backToPortfolio} onNavigate={navigateProject} />}
  </>
}
