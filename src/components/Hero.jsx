import { useRef } from 'react'
import Brand from './Brand.jsx'
export default function Hero() {
  const ref = useRef(null)
  return <section ref={ref} id="hero" className="hero" aria-label="UOOJIN portfolio"><p className="hero-caption">MAKING THINGS TO SEE,<br />MOVE &amp; INTERACT WITH</p><h1><Brand interactive scopeRef={ref} /></h1></section>
}
