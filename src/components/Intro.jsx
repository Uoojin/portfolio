import Eyes from './Eyes.jsx'

function Intro() {
  return (
    <section className="intro-section" id="intro">
      <h1>
        EXPLORING VISUALS AND INTERACTION
        <br />
        ACROSS DIGITAL EXPERIENCES
      </h1>
      <div className="skill-card">
        <b>TOOLS &amp; SKILLS</b>
        <div className="chips">
          <span>Figma</span>
          <span>Photoshop</span>
          <span>Illustrator</span>
          <span>After Effects</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
        </div>
      </div>
      <img className="scribble" src="/assets/Vector-4.svg" alt="" aria-hidden="true" />
      <Eyes className="floating-eyes eyes" />
    </section>
  )
}

export default Intro
