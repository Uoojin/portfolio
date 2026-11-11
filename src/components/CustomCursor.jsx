import { useEffect, useRef } from 'react'
import eye from '../assets/object/eye.svg'

export default function CustomCursor() {
  const ref = useRef(null)
  const pointerRef = useRef(null)
  const eyeRef = useRef(null)
  useEffect(() => {
    const cursor = ref.current
    const pointer = pointerRef.current
    const eyes = eyeRef.current
    const root = cursor.parentElement
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let x = 0
    let y = 0
    let eyeX = 0
    let eyeY = 0
    let lastFrame = 0
    const placeEyes = () => {
      eyes.style.transform = `translate3d(${eyeX}px,${eyeY}px,0)`
    }
    const draw = now => {
      const follow = 1 - Math.exp(-(now - lastFrame) / 58)
      lastFrame = now
      eyeX += (x - eyeX) * follow
      eyeY += (y - eyeY) * follow
      if (Math.hypot(x - eyeX, y - eyeY) <= .2) {
        eyeX = x
        eyeY = y
        frame = 0
      } else {
        frame = requestAnimationFrame(draw)
      }
      placeEyes()
    }
    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      root.classList.remove('has-custom-cursor')
      cursor.hidden = true
    }
    const move = event => {
      if (!fine.matches || event.pointerType === 'touch' || !root.contains(event.target) || (!root.matches('dialog') && document.querySelector('dialog[open]'))) {
        hide()
        return
      }
      x = event.clientX
      y = event.clientY
      if (cursor.hidden || reduced.matches) {
        cancelAnimationFrame(frame)
        frame = 0
        eyeX = x
        eyeY = y
      } else {
        const distance = Math.hypot(x - eyeX, y - eyeY)
        if (distance > 12) {
          eyeX = x + (eyeX - x) * 12 / distance
          eyeY = y + (eyeY - y) * 12 / distance
        }
      }
      pointer.style.transform = `translate3d(${x}px,${y}px,0)`
      placeEyes()
      cursor.dataset.mode = event.target.closest('[data-project-thumbnail]') ? 'view' : event.target.closest('a,button') ? 'link' : 'default'
      cursor.hidden = false
      root.classList.add('has-custom-cursor')
      if (!frame && (eyeX !== x || eyeY !== y)) {
        lastFrame = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', hide)
    document.documentElement.addEventListener('pointerleave', hide)
    document.addEventListener('pointercancel', hide)
    window.addEventListener('blur', hide)
    fine.addEventListener('change', hide)
    reduced.addEventListener('change', hide)
    return () => {
      hide()
      document.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', hide)
      document.documentElement.removeEventListener('pointerleave', hide)
      document.removeEventListener('pointercancel', hide)
      window.removeEventListener('blur', hide)
      fine.removeEventListener('change', hide)
      reduced.removeEventListener('change', hide)
    }
  }, [])
  return <div className="custom-cursor" ref={ref} hidden aria-hidden="true">
    <div className="cursor-pointer" ref={pointerRef}><i /><span>VIEW</span></div>
    <img ref={eyeRef} src={eye} alt="" />
  </div>
}
