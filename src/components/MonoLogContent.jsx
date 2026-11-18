import { lazy, Suspense, useEffect, useRef } from 'react'
import icons from '../assets/object/works/monolog/icon.webp'
import '../styles/mono-log-content.css'

const MotionStudy = lazy(() => import('./MonoLogMotionStudy.jsx'))

const media = import.meta.glob('../assets/object/works/monolog/detail/*.{png,jpg,webp,mp4}', {
  eager: true, import: 'default', query: '?url',
})
const asset = file => media[`../assets/object/works/monolog/detail/${file}`]

const imageSizes = {
  'goyu-card-detail.webp': [522, 322],
  'goyu-cards.webp': [1456, 340],
  'goyu-filter.webp': [1452, 49],
  'home.webp': [1680, 1000],
  'illustration-goyu.jpg': [870, 1175],
  'illustration-iyagi.png': [685, 776],
  'illustration-madi.png': [283, 157],
  'iyagi-cards.webp': [1456, 787],
  'iyagi-modal.webp': [1000, 598],
  'language-cn.png': [596, 280],
  'language-en.png': [595, 279],
  'language-jp.png': [595, 279],
  'language-kr.png': [595, 279],
  'madi-illustration.webp': [340, 445],
  'madi-list.webp': [1452, 413],
  'madi-open.webp': [1456, 843],
  'madi-screen.webp': [1440, 900],
  'sai-comparison.webp': [1456, 293],
  'sai-tabs.webp': [1452, 49],
  'sori-cards.webp': [1456, 456],
  'type-body.webp': [648, 83],
  'type-button.webp': [67, 27],
  'type-heading.webp': [429, 130],
  'type-highlight.webp': [51, 33],
}

const languages = [
  ['kr', '한국어', 'ko'], ['jp', '日本語', 'ja'], ['cn', '中文', 'zh'], ['en', 'English', 'en'],
]
const steps = [
  ['GOYU', '고유 단어'], ['SORI', '의성·의태어'], ['MADI', '관용 표현'], ['SAI', '관계와 상황'], ['IYAGI', '작품 속 언어'],
]
const palette = ['#FFFFFF', '#25244D', '#D0CDE9', '#837FFF', '#352EFB']
function Capture({ file, alt, caption }) {
  const [width, height] = imageSizes[file]
  return <figure className="mono-capture">
    <img src={asset(file)} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

function Section({ id, label, title, lead, children, summary }) {
  return <section className="mono-section" aria-labelledby={id}>
    <header className="mono-section-intro">
      <h2 id={id}>{label}</h2>
      <div>
        <h3>{title}</h3>
        <p className="mono-lead" lang="ko">{lead}</p>
        {summary && <p lang="ko">{summary}</p>}
      </div>
    </header>
    {children}
  </section>
}

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

  return <ol className="mono-steps" ref={flowRef}>
    {steps.map(([name, description], index) => <li key={name}>
      <span className="mono-step-dot" style={{ '--step-delay': `${index}s` }} aria-hidden="true" />
      <h4>{name}</h4>
      <p lang="ko">{description}</p>
    </li>)}
  </ol>
}

function ContentExample({ name, keyword, layout, children }) {
  return <div className={`mono-example mono-example-${layout}`}>
    <h4>{name} <span>{keyword}</span></h4>
    {children}
  </div>
}

export default function MonoLogContent({ cover, scrollRef, url }) {
  return <div className="mono-log-content" lang="en">
    <section className="mono-hero" aria-labelledby="mono-hero">
      {cover}
      <div>
        <h2 id="mono-hero">MONO-LOG</h2>
        <p>Same Meaning, Different Expressions.</p>
      </div>
    </section>

    <Section id="mono-direction" label="Design Direction" title="Exploring Meaning Beyond Translation."
      lead="같은 의미에서 발견하는 서로 다른 표현."
      summary="네 가지 언어에 담긴 감정과 표현의 차이를 비교하고 발견하는 과정을 시각적 경험으로 구성했습니다.">
      <div className="mono-language-grid">
        {languages.map(([code, title, lang]) => {
          const file = `language-${code}.png`
          const [width, height] = imageSizes[file]
          return <figure key={code}>
            <img src={asset(file)} width={width} height={height} alt="" loading="lazy" decoding="async" />
            <figcaption lang={lang}>{title}</figcaption>
          </figure>
        })}
      </div>
    </Section>

    <Section id="mono-system" label="Visual System" title="A Visual Language for Different Meanings."
      lead="서로 다른 언어를 연결하는 시각적 표현."
      summary="블루와 퍼플 계열의 컬러, 일러스트레이션, 타이포그래피를 활용해 다양한 언어 콘텐츠에 시각적 일관성을 부여했습니다.">
      <div className="mono-style-grid">
        <div>
          <h4>Color Palette</h4>
          <ul className="mono-swatches">
            {palette.map(color => <li key={color} style={{ backgroundColor: color }}>{color}</li>)}
          </ul>
        </div>
        <div>
          <h4>Typography</h4>
          <div className="mono-type">
            <Capture file="type-heading.webp" alt="마디, 같은 의미를 담은 다른 말들" caption="Heading" />
            <Capture file="type-body.webp" alt="MADI 페이지의 한국어 본문" caption="Body" />
            <Capture file="type-button.webp" alt="인사 · 말 분류 태그" caption="Label" />
            <Capture file="type-highlight.webp" alt="파란색 한국어 라벨" caption="Highlight" />
          </div>
        </div>
      </div>
      <div className="mono-illustrations">
        <h4>Illustration</h4>
        <img className="mono-icon-sheet" src={icons} alt="MONO-LOG 블루 라인 일러스트레이션 모음"
          width="3327" height="1360" loading="lazy" decoding="async" />
        <div className="mono-illustration-grid">
          <Capture file="illustration-goyu.jpg" alt="GOYU의 눈치 카드 원본 일러스트레이션" caption="GOYU" />
          <Capture file="illustration-madi.png" alt="MADI의 가는 말이 고와야 오는 말이 곱다 원본 일러스트레이션" caption="MADI" />
          <Capture file="illustration-iyagi.png" alt="IYAGI의 헤어질 결심 작품 카드 원본 이미지" caption="IYAGI" />
          <Capture file="madi-illustration.webp" alt="일러스트레이션이 적용된 MADI의 한국어 관용 표현 카드" caption="MADI · In Use" />
        </div>
      </div>
    </Section>

    <Section id="mono-architecture" label="Content Architecture" title="From Words to Scenes."
      lead="단어에서 장면까지 확장되는 언어 탐색."
      summary="다섯 가지 콘텐츠를 통해 언어의 표현을 다양한 맥락에서 탐색하도록 구성했습니다.">
      <LanguageFlow scrollRef={scrollRef} />
    </Section>

    <Section id="mono-design" label="Content Design" title="Five Contents, Different Ways to Explore."
      lead="콘텐츠의 특성에 따라 달라지는 탐색 방식.">
      <ContentExample name="GOYU" keyword="Card-based Exploration" layout="goyu">
        <Capture file="goyu-filter.webp" alt="전체, 한국어, 일본어, 중국어, 영어를 선택하는 언어 필터" />
        <Capture file="goyu-cards.webp" alt="눈치와 木漏れ日의 뜻, 예문, 관련 표현을 보여주는 일러스트 카드 그리드" />
        <Capture file="goyu-card-detail.webp" alt="木漏れ日 카드의 예문과 관련 표현" caption="Card Detail" />
      </ContentExample>
      <ContentExample name="SORI" keyword="Motion-based Expression" layout="sori">
        <Capture file="sori-cards.webp" alt="주룩주룩, 반짝반짝, 두근두근의 SVG 그래픽과 언어별 표현이 담긴 SORI 카드" />
      </ContentExample>
      <ContentExample name="MADI" keyword="Expandable Comparison" layout="madi">
        <Capture file="madi-list.webp" alt="관용 표현의 접힌 아코디언 목록" caption="Accordion List" />
        <Capture file="madi-open.webp" alt="공통 의미, 관련 상황, 네 언어의 표현을 보여주는 펼친 아코디언" caption="Expanded State" />
      </ContentExample>
      <ContentExample name="SAI" keyword="Context-based Comparison" layout="sai">
        <Capture file="sai-tabs.webp" alt="사과, 감사, 부탁, 거절, 의견, 칭찬, 위로, 인사 상황별 탭" />
        <Capture file="sai-comparison.webp" alt="가까운 관계에서 사용하는 사과를 네 언어로 비교한 카드 화면" />
      </ContentExample>
      <ContentExample name="IYAGI" keyword="Story-driven Discovery" layout="iyagi">
        <Capture file="iyagi-cards.webp" alt="작품 이미지와 대사를 보여주는 IYAGI 카드" caption="Story Grid" />
        <Capture file="iyagi-modal.webp" alt="헤어질 결심의 대사와 장면 설명을 보여주는 모달" caption="Story Detail" />
      </ContentExample>
    </Section>

    <Section id="mono-interaction" label="Interaction Design" title="Making Language Move."
      lead="단어의 감각을 움직임으로 표현하다."
      summary="SVG와 Framer Motion을 활용해 의성어와 의태어의 리듬과 움직임을 시각적으로 표현했습니다.">
      <Suspense fallback={null}><MotionStudy /></Suspense>
    </Section>

    <Section id="mono-web" label="Web Experience" title="Designing the Flow of Exploration."
      lead="콘텐츠를 발견하는 과정까지 디자인하다."
      summary="메인 페이지의 스크롤 애니메이션과 화면 전환을 통해 사용자가 다양한 언어 콘텐츠를 자연스럽게 탐색할 수 있도록 구성했습니다.">
      <figure className="mono-web-demo">
        <video src={asset('web-experience.mp4')} poster={asset('home.webp')} width="1120" height="630"
          aria-label="MONO-LOG 메인 페이지 스크롤, 네 언어 카드 등장, SORI 탐색 영상"
          controls muted playsInline preload="none" />
        <figcaption>Home Scroll · Language Cards · SORI</figcaption>
      </figure>
    </Section>

    <Section id="mono-final" label="Final Experience" title="Beyond Translation."
      lead="언어의 차이를 하나의 경험으로."
      summary="MONO-LOG는 언어별 표현의 차이를 시각적 콘텐츠와 인터랙션으로 확장한 프로젝트입니다. 각 콘텐츠의 특성에 맞는 화면 구조와 움직임을 디자인하고 직접 구현하며, 사용자가 언어의 의미를 발견하고 탐색할 수 있는 웹 경험을 완성했습니다.">
      <div className="mono-final-screens">
        <Capture file="home.webp" alt="MONO-LOG 완성된 메인 화면" caption="Home" />
        <Capture file="madi-screen.webp" alt="MONO-LOG의 실제 MADI 인터페이스" caption="MADI" />
      </div>
      <a className="mono-external" href={url} target="_blank" rel="noopener noreferrer">Explore MONO-LOG ↗</a>
    </Section>
  </div>
}
