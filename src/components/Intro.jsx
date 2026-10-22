import globe from '../assets/icon1.png'
import cursor from '../assets/icon2.png'
import asterisk from '../assets/icon3.png'
import circles from '../assets/icon4.png'
import pixels from '../assets/icon5.png'
import eyes from '../assets/icon6.png'

const Graphic = ({ src, className }) => <img className={`slogan-graphic ${className}`} src={src} alt="" aria-hidden="true" draggable="false" />

export default function Intro() {
  return <section id="intro" className="intro-section" aria-label="Introduction">
    <h2 className="intro-en">
      <span className="slogan-line">In A Digital <Graphic src={globe} className="slogan-globe" /> Environment, <Graphic src={cursor} className="slogan-cursor" /></span>{' '}
      <span className="slogan-line">Visuals <Graphic src={asterisk} className="slogan-asterisk" /> Meet Interaction <Graphic src={circles} className="slogan-circles" /></span>{' '}
      <span className="slogan-line">To Create Experiences <Graphic src={pixels} className="slogan-pixels" /> People Can</span>{' '}
      <span className="slogan-line">See, <Graphic src={eyes} className="slogan-eyes" /> Move Through &amp; Shape.</span>
    </h2>
    <div className="tools-skills">
      <h3>TOOLS &amp; SKILLS</h3>
      <p>Figma, Photoshop, Illustrator, After Effects</p>
      <p>HTML, CSS, JavaScript, React</p>
    </div>
  </section>
}
