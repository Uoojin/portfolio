import { useCallback, useEffect, useRef } from 'react'

export default function usePageMotion(locked) {
  const controller = useRef(null)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let target = 0
    let position = 0
    let velocity = 0
    let last = 0
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      velocity = 0
    }
    const animate = now => {
      const seconds = Math.min(.04, (now - (last || now - 16)) / 1000)
      last = now
      // A critically damped spring adds inertia without overshooting.
      const offset = position - target
      const rate = 22
      const decay = Math.exp(-rate * seconds)
      const motion = (velocity + rate * offset) * seconds
      position = target + (offset + motion) * decay
      velocity = (velocity - rate * motion) * decay
      if (Math.abs(target - position) < .45 && Math.abs(velocity) < 7) {
        window.scrollTo({ top: target, behavior: 'instant' })
        stop()
        return
      }
      window.scrollTo({ top: position, behavior: 'instant' })
      frame = requestAnimationFrame(animate)
    }
    const scroll = value => {
      if (locked) return
      target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, value))
      if (reduced.matches) {
        stop()
        window.scrollTo({ top: target, behavior: 'instant' })
      } else if (!frame) {
        position = window.scrollY
        frame = requestAnimationFrame(animate)
      }
    }
    const wheel = event => {
      if (locked || !fine.matches || reduced.matches || event.ctrlKey || event.shiftKey ||
          !event.cancelable || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      const delta = event.deltaY * unit
      const current = window.scrollY
      if (frame && delta * (target - current) < 0) stop()
      // Limit queued wheel travel so momentum cannot carry across several sections.
      const lead = window.innerHeight * .75
      const pending = (frame ? target : current) + delta - current
      scroll(current + Math.max(-lead, Math.min(lead, pending)))
    }
    const keyboard = event => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab'].includes(event.key)) stop()
    }

    controller.current = { scroll }
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('keydown', keyboard)
    window.addEventListener('pointerdown', stop, { passive: true })
    window.addEventListener('resize', stop)
    fine.addEventListener('change', stop)
    reduced.addEventListener('change', stop)
    return () => {
      stop()
      controller.current = null
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', keyboard)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('resize', stop)
      fine.removeEventListener('change', stop)
      reduced.removeEventListener('change', stop)
    }
  }, [locked])

  return useCallback(event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const hash = event.currentTarget.hash
    const section = document.getElementById(hash.slice(1))
    if (!section || !controller.current) return
    event.preventDefault()
    if (window.location.hash !== hash) window.history.pushState({}, '', hash)
    controller.current.scroll(section.getBoundingClientRect().top + window.scrollY)
  }, [])
}
