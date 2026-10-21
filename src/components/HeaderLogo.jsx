import { useRef } from 'react'
import headerLogo from '../assets/headerLogo.svg?raw'
import useSvgPupils from '../hooks/useSvgPupils.js'

export default function HeaderLogo() {
  const ref = useRef(null)
  useSvgPupils(ref)
  // Trusted local SVG is inlined so React can address each pupil independently.
  return <span ref={ref} className="header-logo" aria-hidden="true" dangerouslySetInnerHTML={{ __html: headerLogo }} />
}
