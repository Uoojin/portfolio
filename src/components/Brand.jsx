import { useId, useRef } from 'react'
import useSvgPupils from '../hooks/useSvgPupils.js'

// Original HERO geometry is unchanged. Only independent group transforms move letters.
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
  return <svg ref={svgRef} className={`brand ${className}`} viewBox="0 0 700 300" role={interactive ? 'group' : 'img'} aria-labelledby={id} onDragStart={event => event.preventDefault()}>
    <title id={id}>UOOJIN</title>
    <g fill="none" stroke="currentColor" strokeWidth="47" strokeLinecap="round" strokeLinejoin="round">
      <g {...dragProps} data-letter="U" aria-label="U 글자 이동 (드래그 또는 방향키)"><path d="M31 136 57 211C70 249 120 238 137 219C156 198 142 176 130 155L109 109" /></g>
      <g {...dragProps} data-letter="J" aria-label="J 글자 이동 (드래그 또는 방향키)"><path d="m410 149 62 8-10 82c-5 43-79 35-69-11" /></g>
      <g {...dragProps} data-letter="I" aria-label="I 글자 이동 (드래그 또는 방향키)"><path d="m523 26 5 114" /></g>
      <g {...dragProps} data-letter="N" aria-label="N 글자 이동 (드래그 또는 방향키)"><path d="m574 228 10-91c3-33 19-32 25-3l22 93c6 30 31 29 33 0l11-102" /></g>
    </g>
    <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="4">
      <circle cx="217" cy="187" r="57" /><circle cx="323" cy="155" r="57" />
    </g>
    <g fill="var(--ink)"><circle data-pupil="" data-eye-x="217" data-eye-y="187" data-eye-radius="57" data-eye-stroke="4" cx="235" cy="192" r="21" /><circle data-pupil="" data-eye-x="323" data-eye-y="155" data-eye-radius="57" data-eye-stroke="4" cx="332" cy="160" r="21" /></g>
  </svg>
}
