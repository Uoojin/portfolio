import { useEffect, useRef } from 'react'
import icons from '../assets/object/works/monolog/icon.webp'
import '../styles/mono-log-content.css'

const steps = [
  ['GOYU', '번역하기 어려운', '고유한 언어'],
  ['SORI', '언어마다 다른', '의성어 · 의태어'],
  ['MADI', '다양한 표현의', '의미 비교'],
  ['SAI', '관계에 따른', '표현 차이'],
  ['IYAGI', '작품 속에서', '만나는 언어'],
]

const palette = ['#FFFFFF', '#25244D', '#D0CDE9', '#837FFF', '#352EFB']

function LanguageFlow({ scrollRef }) {
  const flowRef = useRef(null)

  useEffect(() => {
    const flow = flowRef.current
    const viewport = scrollRef.current
    const stacked = matchMedia('(max-width: 900px)')
    let observer

    function observe() {
      observer?.disconnect()
      flow.removeAttribute('data-playing')
      observer = new IntersectionObserver(([entry]) => {
        flow.toggleAttribute('data-playing', entry.isIntersecting)
      }, {
        root: stacked.matches ? viewport.closest('dialog') : viewport,
        threshold: 0.15,
      })
      observer.observe(flow)
    }

    observe()
    stacked.addEventListener('change', observe)
    return () => {
      stacked.removeEventListener('change', observe)
      observer.disconnect()
    }
  }, [scrollRef])

  return <section className="mono-flow" ref={flowRef}>
    <h2>From Words to Scenes</h2>
    <ol className="mono-steps">
      {steps.map(([name, firstLine, secondLine], index) => <li key={name}>
        <span className="mono-step-dot" style={{ '--step-delay': `${index}s` }} aria-hidden="true" />
        <h3>{name}</h3>
        <p lang="ko">{firstLine}<br />{secondLine}</p>
      </li>)}
    </ol>
    <p className="mono-flow-summary" lang="ko">다섯 개의 콘텐츠를 독립적인 기능이 아닌, 언어를 점차 다양한 맥락에서 이해하는 탐색 흐름으로 구성했습니다.</p>
  </section>
}

export default function MonoLogContent({ scrollRef }) {
  return <div className="mono-log-content">
    <section className="mono-overview">
      <h2>Overview</h2>
      <div className="mono-overview-copy">
        <h3>Same Meaning, Different Expressions.</h3>
        <p lang="ko"><span>한국어 · 일본어 · 중국어 · 영어</span>는 같은 의미를 전달하더라도 언어와 문화에 따라 서로 다른 표현을 사용합니다. MONO-LOG는 이러한 차이를 단순한 번역 결과가 아닌, 직접 비교하고 발견할 수 있는 콘텐츠로 전달하고자 시작한 프로젝트입니다.</p>
        <div className="mono-challenge">
          <h4>✳ Challenge</h4>
          <p lang="ko">언어의 차이를 어떻게 직관적이고 흥미로운 탐색 경험으로 만들 수 있을까?</p>
          <p lang="ko">→ 언어마다 다르게 나타나는 표현의 특징을 사용자가 쉽게 비교하고, 그 차이를 자연스럽게 발견할 수 있는 경험을 만들 수 있도록 고민했습니다.</p>
        </div>
      </div>
    </section>

    <LanguageFlow scrollRef={scrollRef} />

    <section className="mono-palette">
      <h2>Color Palette</h2>
      <ul className="mono-swatches">
        {palette.map(color => <li key={color} style={{ backgroundColor: color }}>{color}</li>)}
      </ul>
    </section>

    <section className="mono-graphics">
      <div>
        <h2>Graphic Elements</h2>
        <p lang="ko">생성형 AI를 활용해 다양한 언어 표현의 의미와 상황을 시각화한 일러스트레이션을 제작했습니다.</p>
      </div>
      <img src={icons} alt="언어 표현과 상황을 시각화한 MONO-LOG 일러스트레이션 모음"
        width="3327" height="1360" loading="lazy" decoding="async" />
    </section>
  </div>
}
