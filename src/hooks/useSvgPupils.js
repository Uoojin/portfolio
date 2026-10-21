import { useEffect } from 'react'

// All tracking is calculated in SVG coordinates, independent of displayed size.
export default function useSvgPupils(rootRef, scopeRef) {
  useEffect(() => {
    const root = rootRef.current
    const svg = root?.matches('svg') ? root : root?.querySelector('svg')
    if (!svg) return
    const pupils = [...svg.querySelectorAll('[data-pupil]')]
    const scope = scopeRef?.current || document.documentElement
    let frame = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      pupils.forEach(pupil => { pupil.style.transform = 'translate(0px, 0px)' })
    }
    const move = event => {
      if (event.pointerType === 'touch') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        const matrix = svg.getScreenCTM()
        if (!matrix || !svg.getClientRects().length) return
        const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
        pupils.forEach(pupil => {
          const x = Number(pupil.dataset.eyeX)
          const y = Number(pupil.dataset.eyeY)
          const dx = point.x - x
          const dy = point.y - y
          const distance = Math.hypot(dx, dy)
          const limit = Number(pupil.dataset.eyeRadius) - Number(pupil.dataset.eyeStroke) / 2 - pupil.r.baseVal.value - 1
          const amount = Math.min(limit, distance * .12)
          const targetX = x + (distance ? dx / distance * amount : 0)
          const targetY = y + (distance ? dy / distance * amount : 0)
          pupil.style.transform = `translate(${targetX - pupil.cx.baseVal.value}px, ${targetY - pupil.cy.baseVal.value}px)`
        })
      })
    }
    const visibility = () => { if (document.hidden) reset() }
    scope.addEventListener('pointermove', move, { passive: true })
    scope.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      reset()
      scope.removeEventListener('pointermove', move)
      scope.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [rootRef, scopeRef])
}
