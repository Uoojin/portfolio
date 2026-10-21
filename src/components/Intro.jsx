import Eyes from './Eyes.jsx'
const skills = ['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'HTML', 'CSS', 'JavaScript', 'React']
export default function Intro() {
  return <section id="intro" className="intro-section" aria-label="Introduction">
    <h2 className="intro-en">In A Digital Environment, <span tabIndex="0" className="word-visuals">Visuals</span> Meet<br className="desktop-break" />
      <span tabIndex="0" className="word-interaction">Interaction</span> To Create <span tabIndex="0" className="word-experiences">Experiences</span><br className="desktop-break" />
      People Can See, Move Through &amp; Shape.</h2>
    <div className="skill-card"><h3>TOOLS &amp; SKILLS</h3><div className="chips">{skills.map(skill => <span key={skill}>{skill}</span>)}</div><Eyes className="floating-eyes eyes" /></div>
    <img className="intro-scribble" src={`${import.meta.env.BASE_URL}assets/Vector-4.svg`} alt="" aria-hidden="true" />
  </section>
}
