import { useLayoutEffect, useRef } from 'react'

export default function usePosterSlider() {
  const ref = useRef(null)
  const drag = useRef(null)

  useLayoutEffect(() => {
    const strip = ref.current
    const track = strip.querySelector('.poster-track')
    strip.scrollLeft = 0
    const resize = () => {
      // Native scroll bounds include all cards, gaps and the content gutter.
      // Keep the current free position rather than aligning to any card.
      const maximum = Math.max(0, strip.scrollWidth - strip.clientWidth)
      strip.scrollLeft = Math.max(0, Math.min(strip.scrollLeft, maximum))
      if (drag.current) {
        drag.current.startScroll = strip.scrollLeft
        drag.current.startX = drag.current.lastX
        drag.current.startY = drag.current.lastY
      }
    }
    const observer = new ResizeObserver(resize)
    observer.observe(strip)
    observer.observe(track)
    return () => {
      observer.disconnect()
      drag.current = null
      strip.classList.remove('is-dragging')
    }
  }, [])

  const finish = event => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    drag.current = null
    const strip = ref.current
    strip.classList.remove('is-dragging')
    if (strip.hasPointerCapture(event.pointerId)) strip.releasePointerCapture(event.pointerId)
    // No momentum, animation or snapping: keep the exact release position.
  }
  return {
    ref,
    onPointerDown: event => {
      if (drag.current || !event.isPrimary || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (event.pointerType === 'mouse') event.preventDefault()
      drag.current = { id: event.pointerId, pointerType: event.pointerType, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY, startScroll: ref.current.scrollLeft, moved: false }
    },
    onPointerMove: event => {
      const current = drag.current
      if (!current || current.id !== event.pointerId) return
      current.lastX = event.clientX
      current.lastY = event.clientY
      const distance = event.clientX - current.startX
      if (!current.moved) {
        if (Math.abs(distance) < 6) return
        // Vertical touch gestures remain native page scrolling (pan-y).
        if (current.pointerType !== 'mouse' && Math.abs(event.clientY - current.startY) > Math.abs(distance)) return
      }
      current.moved = true
      const strip = ref.current
      if (!strip.hasPointerCapture(event.pointerId)) strip.setPointerCapture(event.pointerId)
      strip.classList.add('is-dragging')
      const maximum = Math.max(0, strip.scrollWidth - strip.clientWidth)
      strip.scrollLeft = Math.max(0, Math.min(current.startScroll - distance, maximum))
    },
    onPointerUp: finish,
    onPointerCancel: finish,
    onLostPointerCapture: finish,
    onPointerLeave: event => { if (!ref.current.hasPointerCapture(event.pointerId)) finish(event) },
    onDragStart: event => event.preventDefault(),
  }
}
