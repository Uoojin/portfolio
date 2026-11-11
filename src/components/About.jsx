import { useEffect, useRef, useState } from 'react'
import poster from '../assets/object/uoojinPoster.svg'
import resume from '../assets/object/resume.svg'
import personalStatement from '../assets/object/personalStatement.svg'
import resumePdf from '../assets/이력서.pdf'
import statementPdf from '../assets/자소서.pdf'
import { email } from '../data/contact.js'
import useMemoScroll from '../hooks/useMemoScroll.js'

const contactTabs = [
  [0, 17.3], [17.3, 31], [44.8, 57.8], [57.8, 71.2], [71.2, 84.4], [84.4, 100],
]

function ContactPoster() {
  const [torn, setTorn] = useState([])
  const timers = useRef(new Set())

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const tear = (event, index) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setTorn(items => [...items, index])
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    event.preventDefault()
    const href = event.currentTarget.href
    const timer = setTimeout(() => {
      timers.current.delete(timer)
      window.location.href = href
    }, 430)
    timers.current.add(timer)
  }

  return <figure className="contact-poster">
    <img src={poster} alt="Waiting to hear from you! Need a designer? You’ve found one! Contact Yujin." width="608" height="841" loading="lazy" />
    <div className="poster-empty-tab" style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true" />
    {contactTabs.map(([left, right], index) => {
      const removed = torn.includes(index)
      return <div className="poster-tab" key={left} data-torn={removed} style={{ '--left': `${left}%`, '--right': `${right}%` }}>
        <span className="poster-tab-paper" style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true" />
        <a href={`mailto:${email}`} onClick={event => tear(event, index)} tabIndex={removed ? -1 : undefined}
          aria-hidden={removed || undefined} aria-label={`이메일 연락처 탭 ${index + 1} 뜯기`} />
      </div>
    })}
  </figure>
}

export default function About() {
  return <section id="about" className="about" aria-labelledby="about-title">
    <h2 id="about-title" lang="en">PERSONAL NOTES</h2>
    <div className="about-layout">
      <div className="poster-position" data-reveal><ContactPoster /></div>
      <div className="about-copy" lang="en" data-reveal>
        <div className="about-intro">
          <h3>Hello, I’m Yujin.</h3>
          <p>I’m a designer who enjoys turning ideas into visual and interactive experiences. I love exploring how design, motion, and interaction can come together to create something people can see, explore, and enjoy.</p>
        </div>
        <dl className="about-facts">
          <div>
            <dt>PROFILE</dt>
            <dd><p>JUNG YUJIN</p><p>2006.01.31</p></dd>
          </div>
          <div>
            <dt>EDUCATION</dt>
            <dd>
              <div className="education-row"><p>Kaywon University of Art &amp; Design <span>Digital Media Design</span></p><time>2025 - 2027</time></div>
              <div className="education-row"><p>Seongnam Foreign Language High School</p><time>2022 - 2025</time></div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
}

const documents = [
  ['RESUME', resume, resumePdf],
  ['PERSONAL STATEMENT', personalStatement, statementPdf],
]

export function AboutDocuments() {
  const sectionRef = useRef(null)
  useMemoScroll(sectionRef)

  return <section ref={sectionRef} className="about-documents" aria-label="Documents and skills">
    <div className="documents" lang="en">
      {documents.map(([label, icon, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">
        <span>{label}</span>
        <span className="document-icon" aria-hidden="true"><span>(</span><img src={icon} alt="" loading="lazy" /><span>)</span></span>
      </a>)}
    </div>
    <div className="memo-stage">
      <div className="memo-holder" aria-hidden="true" />
      <div className="memo-slot">
        <div className="memo-paper">
          <div className="memo-perforation" aria-hidden="true"><i /><i /></div>
          <div className="memo-copy">
            <div className="memo-tools">
              <h2 lang="en">Tools &amp; Skills</h2>
              <div className="skill-lines" lang="en">
                <p>Figma · Photoshop · Illustrator · After Effects · Premiere Pro</p>
                <p>HTML · CSS · JavaScript · React</p>
              </div>
              <p className="memo-description" lang="ko">아이디어를 시각적으로 구체화하고, 디자인과 인터랙션을 직접 구현하며 다양한 디지털 경험을 만듭니다.</p>
            </div>
            <div className="memo-workflow">
              <h3 className="memo-ai" lang="en">AI Workflow</h3>
              <p className="memo-ai-tools" lang="en">ChatGPT · Gemini · Codex · Antigravity</p>
              <p className="memo-description" lang="ko">AI를 아이디어 탐색부터 구현과 개선 과정까지 활용하며, 새로운 표현과 작업의 가능성을 넓혀갑니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
