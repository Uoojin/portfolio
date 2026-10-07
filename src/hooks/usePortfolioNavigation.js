import { useEffect, useLayoutEffect, useState } from 'react'
import { findProject, projectPath } from '../data/projects.js'

export default function usePortfolioNavigation() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    scrollY: findProject(window.location.pathname) ? 0 : null,
  }))
  const project = findProject(location.pathname)

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const handlePopState = () => setLocation({
      pathname: window.location.pathname,
      scrollY: findProject(window.location.pathname) ? 0 : (window.history.state?.portfolioScrollY ?? 0),
    })
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.history.scrollRestoration = previous
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useLayoutEffect(() => {
    if (location.scrollY !== null) window.scrollTo({ top: location.scrollY, behavior: 'instant' })
  }, [location])

  const navigateProject = (event, id) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const state = window.history.state ?? {}
    const returnTo = project
      ? state.portfolioReturn
      : { url: window.location.pathname + window.location.search + window.location.hash, scrollY: window.scrollY, depth: 0 }
    window.history.replaceState({ ...state, portfolioScrollY: window.scrollY }, '')
    const pathname = projectPath(id)
    window.history.pushState({ portfolioReturn: returnTo ? { ...returnTo, depth: returnTo.depth + 1 } : null }, '', pathname)
    setLocation({ pathname, scrollY: 0 })
  }

  const backToPortfolio = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const returnTo = window.history.state?.portfolioReturn
    if (returnTo?.depth) {
      window.history.go(-returnTo.depth)
    } else {
      window.history.replaceState({ portfolioScrollY: 0 }, '', `${import.meta.env.BASE_URL}#projects`)
      setLocation({ pathname: import.meta.env.BASE_URL, scrollY: 0 })
      window.requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' }))
    }
  }

  return { project, navigateProject, backToPortfolio }
}
