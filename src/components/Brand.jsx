import { useRef } from 'react'
import useSvgPupils from '../hooks/useSvgPupils.js'

// The wordmark is selectable HTML; only the independently tracked eyes are SVG.
export default function Brand({ className = '', interactive = false, disabled = false, scopeRef, onLettersLanded }) {
  const eyesRef = useRef(null)
  const dragRef = useRef(null)
  const positions = useRef({})
  useSvgPupils(eyesRef, scopeRef, !disabled)

  const moveLetter = (element, letter, position) => {
    positions.current[letter] = position
    element.style.translate = `${position.x}px ${position.y}px`
  }
  const finish = event => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    const element = dragRef.current.element
    dragRef.current = null
    element.classList.remove('is-dragging')
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
  }
  const dragProps = !interactive || disabled ? {} : {
    role: 'button',
    tabIndex: 0,
    title: '드래그 또는 방향키로 이동',
    onPointerDown: event => {
      if (event.button !== 0 || dragRef.current) return
      event.preventDefault()
      window.getSelection()?.removeAllRanges()
      const element = event.currentTarget
      const letter = element.dataset.letter
      element.setPointerCapture(event.pointerId)
      dragRef.current = { element, letter, pointerId: event.pointerId, x: event.clientX, y: event.clientY, origin: positions.current[letter] || { x: 0, y: 0 } }
    },
    onPointerMove: event => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId || drag.element !== event.currentTarget) return
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      if (Math.hypot(dx, dy) < 3) return
      if (!drag.element.hasPointerCapture(event.pointerId)) drag.element.setPointerCapture(event.pointerId)
      drag.element.classList.add('is-dragging')
      moveLetter(drag.element, drag.letter, { x: drag.origin.x + dx, y: drag.origin.y + dy })
    },
    onPointerLeave: event => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) finish(event)
    },
    onPointerUp: finish,
    onPointerCancel: finish,
    onLostPointerCapture: finish,
    onKeyDown: event => {
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
      if (!directions[event.key] || event.shiftKey) return
      event.preventDefault()
      const letter = event.currentTarget.dataset.letter
      const [dx, dy] = directions[event.key]
      const previous = positions.current[letter] || { x: 0, y: 0 }
      moveLetter(event.currentTarget, letter, { x: previous.x + dx * 5, y: previous.y + dy * 5 })
    },
  }
  return <span className={`brand ${className}`} inert={interactive && disabled} onDoubleClick={interactive ? event => event.preventDefault() : event => window.getSelection()?.selectAllChildren(event.currentTarget)} onAnimationEnd={event => { if (event.animationName === 'hero-letter-drop' && event.target.dataset.letter === 'N') onLettersLanded?.() }} onDragStart={event => event.preventDefault()}><span {...dragProps} className={`brand-letter brand-u${interactive ? ' hero-letter' : ''}`} data-letter="U" aria-label={interactive ? 'U 글자 이동 (드래그 또는 방향키)' : undefined}>U</span><span className="brand-oo">OO<svg ref={eyesRef} className="brand-eyes" viewBox="128 57 232 121" aria-hidden="true">
    <g fill="#fff" stroke="var(--ink)" strokeWidth="4"><circle cx="187" cy="119" r="57" /><circle cx="300" cy="116" r="57" /></g>
    <g fill="var(--ink)"><circle data-pupil="" data-eye-x="187" data-eye-y="119" data-eye-radius="57" data-eye-stroke="4" cx="204" cy="129" r="21" /><circle data-pupil="" data-eye-x="300" data-eye-y="116" data-eye-radius="57" data-eye-stroke="4" cx="310" cy="126" r="21" /></g>
  </svg></span>{['J', 'I', 'N'].map(letter => <span key={letter} {...dragProps} className={`brand-letter brand-${letter.toLowerCase()}${interactive ? ' hero-letter' : ''}`} data-letter={letter} aria-label={interactive ? `${letter} 글자 이동 (드래그 또는 방향키)` : undefined}>{letter}</span>)}</span>
}
