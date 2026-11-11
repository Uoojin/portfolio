import { useEffect } from 'react'

// All tracking is calculated in SVG coordinates, independent of displayed size.
export default function useSvgPupils(rootRef, scopeRef, enabled = true, geometry) {
  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    const svg = root?.matches('svg') ? root : root?.querySelector('svg')
    if (!svg) return
    const pupils = [...svg.querySelectorAll(geometry ? 'circle' : '[data-pupil]')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    pupils.forEach(pupil => pupil.classList.add('tracked-pupil'))
    const scope = scopeRef?.current || document.documentElement
    let frame = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      pupils.forEach(pupil => { pupil.style.transform = 'translate(0px, 0px)' })
    }
    const move = event => {
      if (event.pointerType === 'touch' || reduced.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        const matrix = svg.getScreenCTM()
        if (!matrix || !svg.getClientRects().length) return
        const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
        pupils.forEach((pupil, index) => {
          const [x, y, radius, stroke] = geometry?.[index] ?? [
            Number(pupil.dataset.eyeX), Number(pupil.dataset.eyeY),
            Number(pupil.dataset.eyeRadius), Number(pupil.dataset.eyeStroke),
          ]
          const dx = point.x - x
          const dy = point.y - y
          const distance = Math.hypot(dx, dy)
          const limit = Math.max(0, radius - stroke / 2 - pupil.r.baseVal.value - 1)
          const amount = Math.min(limit, distance * .2)
          const targetX = x + (distance ? dx / distance * amount : 0)
          const targetY = y + (distance ? dy / distance * amount : 0)
          pupil.style.transform = `translate(${targetX - pupil.cx.baseVal.value}px, ${targetY - pupil.cy.baseVal.value}px)`
        })
      })
    }
    const visibility = () => { if (document.hidden) reset() }
    reduced.addEventListener('change', reset)
    scope.addEventListener('pointermove', move, { passive: true })
    scope.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      reset()
      reduced.removeEventListener('change', reset)
      scope.removeEventListener('pointermove', move)
      scope.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [rootRef, scopeRef, enabled, geometry])
}
