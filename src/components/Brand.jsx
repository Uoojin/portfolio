import { useId, useRef } from 'react'
import useSvgPupils from '../hooks/useSvgPupils.js'

// Existing wordmark outlines retain independent drag transforms and pupil tracking.
export default function Brand({ className = '', interactive = false, scopeRef }) {
  const id = useId()
  const svgRef = useRef(null)
  const dragRef = useRef(null)
  const positions = useRef({})
  useSvgPupils(svgRef, scopeRef)

  const pointAt = event => new DOMPoint(event.clientX, event.clientY).matrixTransform(svgRef.current.getScreenCTM().inverse())
  const finish = event => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    const element = dragRef.current.element
    dragRef.current = null
    element.classList.remove('is-dragging')
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
  }
  const dragProps = !interactive ? {} : {
    className: 'hero-letter',
    role: 'button',
    tabIndex: 0,
    onPointerDown: event => {
      if (event.button !== 0 || dragRef.current) return
      event.preventDefault()
      const element = event.currentTarget
      const letter = element.dataset.letter
      dragRef.current = { element, letter, pointerId: event.pointerId, point: pointAt(event), origin: positions.current[letter] || { x: 0, y: 0 } }
      element.setPointerCapture(event.pointerId)
      element.classList.add('is-dragging')
    },
    onPointerMove: event => {
      const drag = dragRef.current
      const letter = event.currentTarget.dataset.letter
      if (!drag || drag.pointerId !== event.pointerId || drag.letter !== letter) return
      const point = pointAt(event)
      const position = { x: drag.origin.x + point.x - drag.point.x, y: drag.origin.y + point.y - drag.point.y }
      positions.current[letter] = position
      drag.element.setAttribute('transform', `translate(${position.x} ${position.y})`)
    },
    onPointerUp: finish,
    onPointerCancel: finish,
    onLostPointerCapture: finish,
    onKeyDown: event => {
      const letter = event.currentTarget.dataset.letter
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
      if (!directions[event.key]) return
      event.preventDefault()
      const [dx, dy] = directions[event.key]
      const previous = positions.current[letter] || { x: 0, y: 0 }
      const position = { x: previous.x + dx * 5, y: previous.y + dy * 5 }
      positions.current[letter] = position
      event.currentTarget.setAttribute('transform', `translate(${position.x} ${position.y})`)
    },
  }
  return <svg ref={svgRef} className={`brand ${className}`} viewBox="0 0 700 180" role={interactive ? 'group' : 'img'} aria-labelledby={id} onDragStart={event => event.preventDefault()}>
    <title id={id}>UOOJIN</title>
    {/* Reuse the existing wordmark outlines, aligned to the reference baseline. */}
    <g fill="currentColor">
      <g {...dragProps} data-letter="U" aria-label="U 글자 이동 (드래그 또는 방향키)"><path transform="translate(0 9) scale(1.8) translate(-111 -114)" d="M111 127C111 109 137 109 137 127V160C137 173 141 177 150 177C160 177 164 172 164 163C164 150 156 137 156 127C156 109 184 109 184 128V162C184 189 171 202 149 202C124 202 111 188 111 163Z" /></g>
      <g {...dragProps} data-letter="J" aria-label="J 글자 이동 (드래그 또는 방향키)"><path transform="translate(354 9) scale(1.8) translate(-360 -114)" d="M379 114H411C420 114 425 120 425 129V166C425 190 413 202 392 202C370 202 360 191 360 173C360 152 385 152 385 171C385 178 388 181 392 181C398 181 400 178 400 171V158C400 150 404 145 409 141H379C360 141 360 114 379 114Z" /></g>
      <g {...dragProps} data-letter="I" aria-label="I 글자 이동 (드래그 또는 방향키)"><path transform="translate(488 9) scale(1.8) translate(-426 -114)" d="M426 127C426 109 452 109 452 127V189C452 207 426 207 426 189Z" /></g>
      <g {...dragProps} data-letter="N" aria-label="N 글자 이동 (드래그 또는 방향키)"><path transform="translate(553 9) scale(1.8) translate(-455 -114)" d="M455 189V131C455 119 461 113 472 113C484 113 489 119 493 132L504 174H505V127C505 109 530 109 530 127V185C530 196 525 202 514 202C503 202 498 197 494 184L482 153H480V189C480 206 455 206 455 189Z" /></g>
    </g>
    <g fill="#fff" stroke="var(--ink)" strokeWidth="4">
      <circle cx="187" cy="119" r="57" /><circle cx="300" cy="116" r="57" />
    </g>
    <g fill="var(--ink)"><circle data-pupil="" data-eye-x="187" data-eye-y="119" data-eye-radius="57" data-eye-stroke="4" cx="204" cy="129" r="21" /><circle data-pupil="" data-eye-x="300" data-eye-y="116" data-eye-radius="57" data-eye-stroke="4" cx="310" cy="126" r="21" /></g>
  </svg>
}
