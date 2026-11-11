import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealDuration = .84
const contentFadeDuration = .08

export default function useMemoScroll(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = section.querySelector('.memo-stage')
    const slot = stage.querySelector('.memo-slot')
    const paper = slot.querySelector('.memo-paper')
    const tools = paper.querySelector('.memo-tools')
    const workflow = stage.querySelector('.memo-workflow')
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      section.setAttribute('data-memo-scroll', '')
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => {
            const height = document.documentElement.clientHeight
            const padding = parseFloat(getComputedStyle(section).paddingBottom)
            const inset = Math.min(padding, Math.max(24, Math.min(54, height * .035)))
            return `bottom ${height - inset + padding}px`
          },
          end: () => {
            const slotStyle = getComputedStyle(slot)
            const tipHeight = slot.clientHeight - parseFloat(slotStyle.paddingTop) - parseFloat(slotStyle.paddingBottom)
            const rise = Math.max(0, paper.offsetHeight - tipHeight)
            const clearance = Math.max(0, slot.getBoundingClientRect().top - section.getBoundingClientRect().top - 2)
            // Leave room for the easing to accelerate without catching up to Personal Notes.
            const revealDistance = rise + Math.max(0, rise / 4 - 2 * clearance)
            return `+=${Math.max(280, Math.ceil(revealDistance))}`
          },
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      })

      timeline
        .fromTo(stage, { '--paper-progress': 0 }, { '--paper-progress': 1, duration: revealDuration, ease: 'power1.inOut' })
        .fromTo(tools, { opacity: 0 }, { opacity: 1, duration: contentFadeDuration }, revealDuration - 2 * contentFadeDuration)
        .fromTo(workflow, { opacity: 0 }, { opacity: 1, duration: contentFadeDuration }, revealDuration - contentFadeDuration)

      let frame
      const observer = new ResizeObserver(() => {
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          ScrollTrigger.refresh()
        })
      })
      observer.observe(paper)

      return () => {
        observer.disconnect()
        cancelAnimationFrame(frame)
        section.removeAttribute('data-memo-scroll')
      }
    })

    return () => media.revert()
  }, [sectionRef])
}
