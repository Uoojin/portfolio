import { useRef } from 'react'
import useSvgPupils from '../hooks/useSvgPupils.js'
import '../styles/about.css'

// Reuse the original eye geometry and bounded mouse tracking.
function AboutLogo() {
  const ref = useRef(null)
  useSvgPupils(ref)
  return <div className="about-logo" role="img" aria-label="마우스를 따라 움직이는 눈">
    <svg ref={ref} className="about-logo-eyes" viewBox="0 0 165 82" aria-hidden="true">
      <g fill="#FFFFFF" stroke="#000000" strokeWidth="1.8"><circle cx="41" cy="41" r="40" /><circle cx="124" cy="41" r="40" /></g>
      <g fill="#000000"><circle data-pupil="" data-eye-x="41" data-eye-y="41" data-eye-radius="40" data-eye-stroke="1.8" cx="25" cy="56" r="15.5" /><circle data-pupil="" data-eye-x="124" data-eye-y="41" data-eye-radius="40" data-eye-stroke="1.8" cx="108" cy="56" r="15.5" /></g>
    </svg>
  </div>
}

export default function About() {
  return <section id="about" className="about-section" aria-labelledby="about-title">
    <AboutLogo />
    <div className="about-top">
      <h2 id="about-title">ABOUT</h2>
      <p className="about-en">I enjoy turning ideas into things<br />people can see, explore and experience.</p>
      <p className="about-ko">화면에 무엇을 보여줄지뿐만 아니라, 그것을 어떻게 탐색하고 경험하게 할지까지 < br /> 함께 고민합니다. 아이디어에 어울리는 표현과 인터랙션을 찾고 직접 구현해보며, < br /> 생각한 것을 실제로 경험할 수 있는 형태로 만들어가고 있습니다.</p>
    </div>
    <div className="doc-links">
      <a href={`${import.meta.env.BASE_URL}documents/이력서_정유진.pdf`} target="_blank" rel="noopener noreferrer">RESUME <span aria-hidden="true">↗</span></a>
      <a href={`${import.meta.env.BASE_URL}documents/자소서_정유진.pdf`} target="_blank" rel="noopener noreferrer">PERSONAL STATEMENT <span aria-hidden="true">↗</span></a>
    </div>
  </section>
}
