import { useRef } from 'react'
import logo from '../assets/object/logo.svg?raw'
import useSvgPupils from '../hooks/useSvgPupils.js'

const logoEyes = [[26.2, 21.5, 9, 1.5], [46.1, 21.5, 9, 1.5]]

export default function Header({ onSection }) {
  const ref = useRef(null)
  useSvgPupils(ref, undefined, true, logoEyes)
  return <header className="site-header" lang="en">
    <a className="site-logo" ref={ref} href="#hero" onClick={onSection} aria-label="Uoojin home" dangerouslySetInnerHTML={{ __html: logo }} />
    <nav aria-label="Main navigation">
      <a href="#about" onClick={onSection}>ABOUT</a>
      <a href="#projects" onClick={onSection}>WORKS</a>
    </nav>
  </header>
}
