import { useLayoutEffect } from 'react'

export default function useWorksReveal(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    const cards = [...section.querySelectorAll('.works-grid > li')]
    let observer

    const observe = () => {
      observer?.disconnect()
      const inset = Math.round(window.innerHeight * .12)
      observer = new IntersectionObserver(entries => {
        const rows = new Map()
        const visible = entries.filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left)

        for (const { target, boundingClientRect } of visible) {
          if (target.hasAttribute('data-work-revealed')) continue
          const row = Math.round(boundingClientRect.top)
          const index = rows.get(row) ?? 0
          rows.set(row, index + 1)
          target.style.setProperty('--work-delay', `${index * 150}ms`)
          target.setAttribute('data-work-revealed', '')
          observer.unobserve(target)
        }
      }, { rootMargin: `0px 0px -${inset}px 0px` })

      cards.forEach(card => {
        if (!card.hasAttribute('data-work-revealed')) observer.observe(card)
      })
    }

    section.setAttribute('data-work-reveal', '')
    observe()
    window.addEventListener('resize', observe)

    const revealFocused = event => {
      const card = event.target.closest('.works-grid > li')
      if (!card) return
      card.setAttribute('data-work-revealed', '')
      card.setAttribute('data-work-instant', '')
      observer.unobserve(card)
    }
    section.addEventListener('focusin', revealFocused)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', observe)
      section.removeEventListener('focusin', revealFocused)
      section.removeAttribute('data-work-reveal')
    }
  }, [sectionRef])
}
