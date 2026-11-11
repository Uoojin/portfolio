import { useLayoutEffect } from 'react'

export default function useReveal(ref) {
  useLayoutEffect(() => {
    const page = ref.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const about = new IntersectionObserver(entries => {
      let delay = 0
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.style.setProperty('--reveal-delay', `${Math.min(delay++, 2) * 65}ms`)
        entry.target.setAttribute('data-revealed', '')
        about.unobserve(entry.target)
      })
    }, { threshold: .1 })
    page.querySelectorAll('[data-reveal]').forEach(item => {
      if (item.getBoundingClientRect().top < window.innerHeight * .96) item.setAttribute('data-revealed', '')
      else about.observe(item)
    })

    page.classList.add('reveal-ready')
    return () => {
      page.classList.remove('reveal-ready')
      about.disconnect()
    }
  }, [ref])
}
