import { useEffect, useRef } from 'react'
import '../styles/notomato-content.css'

const media = import.meta.glob('../assets/object/works/notomato/case-study/*.{png,webp,mp4}', {
  eager: true, import: 'default', query: '?url',
})
const asset = file => media[`../assets/object/works/notomato/case-study/${file}`]

function Image({ file, width, height, alt, caption, zoom }) {
  const src = asset(file)
  const image = <img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async" />

  return <figure className="notomato-figure" data-notomato-reveal>
    {zoom
      ? <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${alt} 원본 이미지 열기`}>{image}</a>
      : image}
    {caption && <figcaption>{caption}{zoom && <span aria-hidden="true"> ↗</span>}</figcaption>}
  </figure>
}

function Section({ id, label, title, lead, summary, children }) {
  return <section className="notomato-section" aria-labelledby={id}>
    <header className="notomato-section-intro">
      <h2 id={id}>{label}</h2>
      <div>
        <h3>{title}</h3>
        <p lang="ko" className="notomato-lead">{lead}</p>
        <p lang="ko">{summary}</p>
      </div>
    </header>
    {children}
  </section>
}

function Interface({ name, title, lead, layout, children }) {
  return <div className={`notomato-interface notomato-interface-${layout}`}>
    <div className="notomato-interface-copy">
      <h4>{name}</h4>
      <p>{title}</p>
      <p lang="ko">{lead}</p>
    </div>
    {children}
  </div>
}

const demos = [
  ['ai-camera.mp4', 'AI Food Analysis', '음식 분석 화면의 시연.', 718, 1428],
  ['login.mp4', 'Getting Started', '로그인과 초기 진입 과정.', 718, 1438],
  ['diet.mp4', 'Meal Recording', '식단 기록 화면의 시연.', 718, 1428],
  ['report.mp4', 'Health Report', '건강 리포트 화면의 시연.', 718, 1428],
]

export default function NotomatoContent({ cover, scrollRef, url }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    const viewport = scrollRef.current
    const mobile = matchMedia('(max-width: 900px)')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const figures = content.querySelectorAll('[data-notomato-reveal]')
    const videos = content.querySelectorAll('.notomato-demo video')
    let revealObserver
    let playbackObserver

    function observe() {
      revealObserver?.disconnect()
      playbackObserver?.disconnect()
      const root = mobile.matches ? viewport.closest('dialog') : viewport

      revealObserver = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue
          target.dataset.revealed = ''
          revealObserver.unobserve(target)
        }
      }, { root, threshold: 0.12 })

      for (const figure of figures) {
        if (!figure.hasAttribute('data-revealed')) revealObserver.observe(figure)
      }
      content.dataset.motion = ''

      playbackObserver = new IntersectionObserver(entries => {
        for (const { target, isIntersecting, intersectionRatio } of entries) {
          if (!isIntersecting) {
            target.pause()
          } else if (!reduced.matches && intersectionRatio >= 0.55) {
            target.muted = true
            void target.play().catch(() => {})
          }
        }
      }, { root, threshold: [0, 0.55] })

      for (const video of videos) playbackObserver.observe(video)
    }

    observe()
    mobile.addEventListener('change', observe)
    function updateMotionPreference() {
      if (reduced.matches) videos.forEach(video => video.pause())
      observe()
    }

    reduced.addEventListener('change', updateMotionPreference)
    return () => {
      mobile.removeEventListener('change', observe)
      reduced.removeEventListener('change', updateMotionPreference)
      revealObserver.disconnect()
      playbackObserver.disconnect()
    }
  }, [scrollRef])

  return <div className="notomato-content" lang="en" ref={contentRef}>
    <section className="notomato-hero" aria-labelledby="notomato-hero">
      {cover}
      <div>
        <h2 id="notomato-hero">NOTOMATO</h2>
        <p>Safer Meals, Simpler Care.</p>
      </div>
    </section>

    <Section id="notomato-structure" label="Experience Structure" title="Connecting Everyday Health Management."
      lead="복잡한 건강 관리를 하나의 흐름으로."
      summary="식단 기록, 음식 분석, 복약 관리 등 서로 연결되는 건강 관리 기능을 사용자가 이해하기 쉬운 구조로 정리했습니다. 필요한 정보를 확인하고 다음 행동으로 자연스럽게 이어질 수 있도록 서비스의 전체 흐름을 설계했습니다.">
      <div className="notomato-structure-media">
        <div className="notomato-structure-heading">
          <h4>01. Information Architecture</h4>
          <Image file="flow-legend.png" width={548} height={167} alt="시작과 끝, 화면, 기능, 입력, 판단, 흐름을 표시한 구조도 범례" caption="Flow Legend" />
        </div>
        <Image file="service-flow.png" width={2523} height={2499} alt="전체 서비스의 화면과 기능 간 연결을 표시한 정보 구조도" caption="Service Flow" zoom />
        <h4>02. User Flow</h4>
        <Image file="login-flow.png" width={1707} height={286} alt="서비스 진입부터 로그인과 초기 화면까지의 사용자 흐름" caption="Login Flow" zoom />
      </div>
    </Section>

    <Section id="notomato-wireframe" label="Wireframe Design" title="Structuring the Experience."
      lead="사용자의 행동을 화면 구조로 구체화하다."
      summary="주요 기능의 정보 배치와 화면 간 이동을 와이어프레임으로 설계했습니다. 사용자가 필요한 정보를 쉽게 확인하고 다음 행동으로 이어갈 수 있도록 화면의 구조와 탐색 흐름을 구체화했습니다.">
      <div className="notomato-wireframes">
        <Image file="wireframe.png" width={1920} height={1072} alt="홈, 식단 캘린더, 식사 기록 등 직접 설계한 화면의 와이어프레임 모음" caption="Wireframe Overview" zoom />
        <div className="notomato-wireframe-details">
          <Image file="wireframe-home.png" width={450} height={680} alt="원본 와이어프레임에서 확대해 본 홈 화면 구성" caption="Main Home" zoom />
          <Image file="wireframe-report.png" width={840} height={680} alt="원본 와이어프레임에서 확대해 본 식사 기록과 분석 화면 구성" caption="Meal Detail & Analysis" zoom />
        </div>
      </div>
    </Section>

    <Section id="notomato-system" label="Visual System" title="A Friendly Approach to Healthcare."
      lead="건강 관리 경험을 친근한 시각 언어로."
      summary="컬러와 아이콘, 컴포넌트를 일관되게 구성해 건강 관리 정보를 편안하고 직관적으로 전달하고자 했습니다. 팀이 구축한 디자인 시스템을 통해 서비스 전반에 통일된 시각적 경험을 적용했습니다.">
      <div className="notomato-system-media">
        <Image file="design-main.png" width={2528} height={1095} alt="팀이 제작한 NOTOMATO의 브랜드와 디자인 시스템 대표 그래픽" />
        <Image file="design-system.png" width={2543} height={1990} alt="팀이 구축한 NOTOMATO 디자인 시스템" caption="01. Design System" zoom />
        <Image file="components.png" width={2520} height={1307} alt="디자인 시스템의 실제 컴포넌트 모음" caption="02. Components" zoom />
        <Image file="icons.png" width={2400} height={377} alt="NOTOMATO에서 사용한 아이콘 세트" caption="03. Iconography" />
      </div>
    </Section>

    <Section id="notomato-interface" label="Service Interface" title="Designed for Everyday Care."
      lead="일상적인 건강 관리를 위한 인터페이스."
      summary="식단과 건강 정보를 확인하고 기록하며 필요한 콘텐츠를 탐색할 수 있도록 주요 기능을 하나의 서비스 경험으로 연결했습니다.">
      <Interface name="Main Home" title="Health at a Glance." lead="필요한 건강 정보를 한눈에 확인하는 화면." layout="home">
        <Image file="main-home.png" width={1791} height={2846} alt="필요한 정보를 한눈에 확인할 수 있는 홈과 하위 화면" />
      </Interface>
      <Interface name="AI Camera" title="Analyzing Food Through the Camera." lead="음식 정보를 확인하는 카메라 인터페이스." layout="camera">
        <Image file="camera.png" width={2184} height={2127} alt="음식 촬영과 분석에 사용하는 실제 카메라 인터페이스" />
      </Interface>
      <Interface name="Meal Record" title="Managing Daily Meals." lead="일상 속 식단을 기록하고 관리하는 화면." layout="meals">
        <Image file="meal-calendar.png" width={566} height={913} alt="식사를 날짜별로 조회하는 캘린더 화면" />
        <Image file="meal-record.png" width={1618} height={1449} alt="기록된 식단과 식사 분석 화면" />
      </Interface>
      <Interface name="Health Report" title="Understanding Health Information." lead="기록된 건강 정보를 확인하는 화면." layout="report">
        <Image file="report.png" width={1606} height={1719} alt="기록된 건강 정보를 보여주는 실제 건강 리포트 화면" />
      </Interface>
      <Interface name="Community Feed" title="Sharing Everyday Experiences." lead="건강 관리 경험과 콘텐츠를 탐색하는 피드." layout="feed">
        <Image file="feed.png" width={1947} height={3002} alt="커뮤니티에 등록된 건강 관리 콘텐츠 카드" />
        <Image file="feeds.png" width={2179} height={4982} alt="커뮤니티 피드의 카드와 콘텐츠 목록" />
      </Interface>
    </Section>

    <Section id="notomato-interaction" label="Interactive Experience" title="Bringing the Interface to Life."
      lead="정적인 화면에서 실제 움직이는 경험으로."
      summary="화면 간 이동과 사용자 입력, 인터페이스의 상태 변화를 시연 영상을 통해 보여줍니다. 주요 기능이 실제 사용 흐름에서 어떻게 연결되는지 시각적으로 전달합니다.">
      <div className="notomato-demos">
        {demos.map(([file, title, description, width, height]) => <figure className="notomato-demo" key={file}>
          <video src={asset(file)} width={width} height={height} aria-label={description}
            controls muted loop playsInline preload="metadata" />
          <figcaption>{title}<small lang="ko">{description}</small></figcaption>
        </figure>)}
      </div>
    </Section>

    <Section id="notomato-final" label="Final Experience" title="From Structure to Experience."
      lead="설계한 경험을 실제 웹 화면으로 연결하다."
      summary="NOTOMATO는 질환별 식이 관리에 필요한 다양한 정보를 하나의 사용자 경험으로 연결한 팀 프로젝트입니다. 초기 기획과 와이어프레임 설계에 참여하고 프로젝트 소개 웹사이트의 프론트엔드 구현을 담당하며, 디자인 결과물을 실제 웹 경험으로 전달했습니다.">
      <div className="notomato-final-media">
        <Image file="intro-site.webp" width={1440} height={900} alt="배포된 NOTOMATO 프로젝트 소개 웹사이트의 메인 화면" caption="Project Website" />
        <Image file="final.png" width={2880} height={3069} alt="NOTOMATO의 완성된 서비스 화면 모음" caption="Final Service UI" />
      </div>
      <a className="notomato-external" href={url} target="_blank" rel="noopener noreferrer">Explore NOTOMATO ↗</a>
    </Section>
  </div>
}
