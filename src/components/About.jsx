import Eyes from './Eyes.jsx'
import resumePdf from '../assets/이력서.pdf'
import coverLetterPdf from '../assets/자소서.pdf'

function About() {
  return (
    <section id="about" className="about-section">
      <h2>ABOUT</h2>
      <div className="about-top">
        <div>
          <div className="about-logo">
            <span>U</span>
            <Eyes />
            <span>JIN</span>
          </div>
          <p className="about-en">
            I enjoy turning ideas into things
            <br />
            people can see, explore and experience.
          </p>
          <p className="about-ko">
            화면에 무엇을 보여줄지뿐만 아니라, 그것을 어떻게 탐색하고 경험하게 할지까지 함께 고민합니다. 아이디어에
            어울리는 표현과 인터랙션을 찾고 직접 구현해보며, 생각한 것을 실제로 경험할 수 있는 형태로 만들어가고
            있습니다.
          </p>
        </div>
        <img className="about-scribble" src="/assets/Vector-4.svg" alt="" aria-hidden="true" />
      </div>
      <div className="doc-links">
        <a href={resumePdf} target="_blank" rel="noopener noreferrer">
          RESUME <b>↗</b>
        </a>
        <a href={coverLetterPdf} target="_blank" rel="noopener noreferrer">
          PERSONAL STATEMENT <b>↗</b>
        </a>
      </div>
    </section>
  )
}

export default About
