import { useRef } from 'react'
import useSvgPupils from '../hooks/useSvgPupils.js'

export default function TrackingEyes({ className = '' }) {
  const ref = useRef(null)
  useSvgPupils(ref)
  return <svg ref={ref} className={`tracking-eyes ${className}`} viewBox="0 0 142 72" aria-hidden="true">
    <g fill="#fff" stroke="currentColor" strokeWidth="5"><circle cx="36" cy="36" r="33" /><circle cx="106" cy="36" r="33" /></g>
    <g fill="currentColor"><circle data-pupil="" data-eye-x="36" data-eye-y="36" data-eye-radius="33" data-eye-stroke="5" cx="47" cy="42" r="9.5" /><circle data-pupil="" data-eye-x="106" data-eye-y="36" data-eye-radius="33" data-eye-stroke="5" cx="117" cy="42" r="9.5" /></g>
  </svg>
}
