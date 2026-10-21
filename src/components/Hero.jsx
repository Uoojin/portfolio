import { useRef } from 'react'
import Brand from './Brand.jsx'
export default function Hero() {
  const ref = useRef(null)
  return <section ref={ref} id="hero" className="hero" aria-label="UOOJIN portfolio"><h1><Brand interactive scopeRef={ref} /></h1></section>
}
