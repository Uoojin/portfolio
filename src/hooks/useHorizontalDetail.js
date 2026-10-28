import { useLayoutEffect } from 'react'

// One independent horizontal presentation. Native touch pans and trackpad input
// share the viewport; wheel smoothing never snaps or advances by a fixed page.
export default function useHorizontalDetail(viewportRef, projectId) {
  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = viewport.firstElementChild
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animation = 0
    let measurement = 0
    let previousTime = 0
    let target = 0
    let markers = []
    let anchor = { index: 0, fraction: 0 }
    let measuredWidth = 0
    let measuredHeight = 0
    let measuredTrackWidth = 0
    const readMarkers = () => {
      const left = viewport.getBoundingClientRect().left
      return [...track.children].map(section => {
        const rect = section.getBoundingClientRect()
        return { start: rect.left - left + viewport.scrollLeft, width: rect.width }
      })
    }
    const rememberPosition = () => {
      if (!markers.length || viewport.clientWidth !== measuredWidth || viewport.clientHeight !== measuredHeight || track.scrollWidth !== measuredTrackWidth) return
      let index = 0
      for (let i = 1; i < markers.length; i++) {
        if (viewport.scrollLeft + .5 >= markers[i].start) index = i
        else break
      }
      anchor = { index, fraction: Math.max(0, (viewport.scrollLeft - markers[index].start) / markers[index].width) }
    }
    const maximum = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    const clamp = value => Math.max(0, Math.min(maximum(), value))
    const stop = () => {
      cancelAnimationFrame(animation)
      animation = 0
      previousTime = 0
      target = viewport.scrollLeft
    }
    const step = now => {
      const elapsed = previousTime ? Math.min(48, now - previousTime) : 16
      previousTime = now
      target = clamp(target)
      const delta = target - viewport.scrollLeft
      if (Math.abs(delta) < .75) {
        viewport.scrollLeft = target
        animation = 0
        previousTime = 0
        return
      }
      const before = viewport.scrollLeft
      viewport.scrollLeft += delta * (1 - Math.exp(-elapsed / 65))
      // Browser pixel rounding must not leave a permanent animation frame
      // running just short of its target (or offset the next wheel input).
      if (viewport.scrollLeft === before) {
        viewport.scrollLeft = target
        animation = 0
        previousTime = 0
        return
      }
      animation = requestAnimationFrame(step)
    }
    const go = value => {
      target = clamp(value)
      if (reduced.matches) { viewport.scrollLeft = target; return }
      if (!animation) animation = requestAnimationFrame(step)
    }
    const wheel = event => {
      if (event.ctrlKey) return // Retain browser pinch zoom.
      event.preventDefault()
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1
      const delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * multiplier
      go((animation ? target : viewport.scrollLeft) + delta)
    }
    const keydown = event => {
      if (event.target.closest('a,button,input,textarea,select') || event.metaKey || event.ctrlKey || event.altKey) return
      const base = animation ? target : viewport.scrollLeft
      const commands = {
        ArrowRight: base + 80, ArrowDown: base + 80,
        ArrowLeft: base - 80, ArrowUp: base - 80,
        PageDown: base + viewport.clientWidth,
        PageUp: base - viewport.clientWidth,
        ' ': base + viewport.clientWidth * (event.shiftKey ? -.85 : .85),
        Home: 0, End: maximum(),
      }
      if (!(event.key in commands)) return
      event.preventDefault()
      go(commands[event.key])
    }
    const scroll = () => {
      if (!animation) target = viewport.scrollLeft
      rememberPosition()
    }
    const measure = () => {
      measurement = 0
      if (viewport.clientWidth === measuredWidth && viewport.clientHeight === measuredHeight && track.scrollWidth === measuredTrackWidth) return
      const saved = anchor
      stop()
      markers = readMarkers()
      measuredWidth = viewport.clientWidth
      measuredHeight = viewport.clientHeight
      measuredTrackWidth = track.scrollWidth
      const marker = markers[Math.min(saved.index, markers.length - 1)]
      viewport.scrollLeft = clamp(marker.start + saved.fraction * marker.width)
      target = viewport.scrollLeft
      rememberPosition()
    }
    const scheduleMeasure = () => {
      cancelAnimationFrame(measurement)
      measurement = requestAnimationFrame(measure)
    }

    viewport.scrollTo({ left: 0, top: 0, behavior: 'instant' })
    measure()
    viewport.focus({ preventScroll: true })
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(viewport)
    observer.observe(track)
    viewport.addEventListener('wheel', wheel, { passive: false })
    viewport.addEventListener('keydown', keydown)
    viewport.addEventListener('scroll', scroll, { passive: true })
    viewport.addEventListener('pointerdown', stop, { passive: true })
    reduced.addEventListener('change', stop)
    return () => {
      stop()
      cancelAnimationFrame(measurement)
      observer.disconnect()
      viewport.removeEventListener('wheel', wheel)
      viewport.removeEventListener('keydown', keydown)
      viewport.removeEventListener('scroll', scroll)
      viewport.removeEventListener('pointerdown', stop)
      reduced.removeEventListener('change', stop)
    }
  }, [viewportRef, projectId])
}
