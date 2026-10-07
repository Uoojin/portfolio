import Eyes from './Eyes.jsx'

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-logo">
        <span>U</span>
        <Eyes />
        <span>JIN</span>
      </div>
      <p>MAKING THINGS TO SEE, MOVE &amp; INTERACT WITH.</p>
      <span className="scroll-mark"></span>
    </section>
  )
}

export default Hero
