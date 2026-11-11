import { useEffect, useRef } from 'react'
import '../styles/project-detail-additions.css'

// Optional originals belong in assets/object/works/<project>/detail.
// Match the stems below, optionally with a numbered suffix (e.g. home-1.webp).
const assets = Object.entries(import.meta.glob(
  '/src/assets/object/works/{monolog,notomato}/detail/*.{avif,gif,jpeg,jpg,png,svg,webp,mp4,webm}',
  { eager: true, import: 'default', query: '?url' },
)).sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))

function Media({ project, slot, label, limit = 3 }) {
  const prefix = `/src/assets/object/works/${project}/detail/${slot}`
  const files = assets.filter(([path]) => path.startsWith(prefix) && /^(?:-\d+)?\.[a-z0-9]+$/.test(path.slice(prefix.length))).slice(0, limit)
  if (files.length === 0) return null

  return <div className="detail-additions-media" data-count={files.length}>
    {files.map(([path, src], index) => /\.(mp4|webm)$/.test(path)
      ? <video key={path} src={src} aria-label={label} controls muted playsInline preload="metadata" />
      : <img key={path} src={src} alt={files.length > 1 ? `${label} ${index + 1}` : label} loading="lazy" decoding="async" />)}
  </div>
}

function Additions({ project, scrollRef, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const content = ref.current
    const scroll = scrollRef.current
    const stacked = matchMedia('(max-width: 900px)')
    const items = [...content.querySelectorAll('[data-addition-reveal]')]
    let observer

    function observe() {
      observer?.disconnect()
      observer = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue
          target.dataset.revealed = ''
          observer.unobserve(target)
        }
      }, { root: stacked.matches ? scroll.closest('dialog') : scroll, threshold: 0.12 })
      for (const item of items) {
        if (!item.hasAttribute('data-revealed')) observer.observe(item)
      }
    }

    observe()
    content.dataset.motion = ''
    stacked.addEventListener('change', observe)
    return () => {
      stacked.removeEventListener('change', observe)
      observer.disconnect()
    }
  }, [scrollRef])

  return <div ref={ref} className="detail-additions" data-project={project} lang="en">{children}</div>
}

function Section({ label, title, lead, children, summary }) {
  return <section className="detail-additions-section">
    <header className="detail-additions-intro" data-addition-reveal>
      <h2>{label}</h2>
      <div>
        <p className="detail-additions-title">{title}</p>
        <p className="detail-additions-lead" lang="ko">{lead}</p>
        <p lang="ko">{summary}</p>
      </div>
    </header>
    {children}
  </section>
}

const languageExperiences = [
  ['goyu', 'GOYU', 'Words Beyond Translation', '번역하기 어려운 고유한 단어', '언어마다 고유하게 존재하는 단어의 의미와 사용 상황을 탐색합니다. 언어별 필터와 카드형 콘텐츠를 통해 단어의 뜻, 예문, 관련 표현을 함께 살펴볼 수 있습니다.'],
  ['sori', 'SORI', 'Sounds in Motion', '움직임으로 경험하는 의성어와 의태어', '언어마다 다르게 표현되는 소리와 움직임을 비교합니다. 표현의 특징을 반영한 모션 그래픽과 인터랙션을 통해 단어가 가진 감각을 시각적으로 경험하도록 구성했습니다.'],
  ['madi', 'MADI', 'Expressions in Context', '같은 의미, 서로 다른 관용 표현', '비슷한 의미를 가진 관용 표현이 언어마다 어떻게 달라지는지 비교합니다. 표현을 확장하면 공통된 의미와 사용 상황, 일러스트레이션을 함께 확인할 수 있습니다.'],
  ['sai', 'SAI', 'Language Between Us', '관계와 상황에 따라 달라지는 표현', '상대방과의 관계나 격식에 따라 달라지는 언어 표현을 탐색합니다. 동일한 상황을 네 가지 언어로 나란히 비교해 표현 방식의 차이를 살펴볼 수 있습니다.'],
  ['iyagi', 'IYAGI', 'Language in Stories', '작품 속에서 발견하는 언어', '영화, 드라마, 책, 음악에 등장하는 표현을 실제 맥락 속에서 탐색합니다. 작품 카드와 상세 화면을 통해 대사의 의미와 표현을 살펴볼 수 있도록 구성했습니다.'],
]

export function MonoLogAdditions({ scrollRef, award }) {
  return <Additions project="monolog" scrollRef={scrollRef}>
    <Section label="Experience Design" title="Five Ways to Explore Language." lead="서로 다른 표현을 발견하는 다섯 가지 경험"
      summary="단어, 소리, 관용 표현, 관계, 작품 속 대사까지 다양한 언어적 맥락을 탐색할 수 있도록 구성했습니다. 각 콘텐츠의 특성에 맞는 비교 방식과 인터랙션을 통해 언어의 차이를 자연스럽게 발견하도록 설계했습니다.">
      <ol className="detail-additions-grid detail-additions-experiences">
        {languageExperiences.map(([slot, name, title, lead, copy], index) => (
          <li key={slot} data-addition-reveal data-featured={index < 2 || undefined} className={`detail-additions-${slot}`}>
            <h3>{`0${index + 1} — ${name}`}</h3>
            <Media project="monolog" slot={slot} label={`${name} 서비스 화면`} />
            <p className="detail-additions-title">{title}</p>
            <p className="detail-additions-lead" lang="ko">{lead}</p>
            <p lang="ko">{copy}</p>
          </li>
        ))}
      </ol>
    </Section>

    <Section label="Interaction Details" title="Making Language Move." lead="언어의 감각을 움직임으로 표현하다."
      summary="의성어와 의태어가 가진 소리와 움직임의 특징을 시각적으로 전달하기 위해 표현별 모션을 적용했습니다. 사용자의 마우스 움직임에 반응하는 인터랙션을 통해 단어의 의미를 읽는 것을 넘어 직접 경험하도록 구성했습니다.">
      <div className="detail-additions-body" data-addition-reveal>
        <Media project="monolog" slot="sori-motion" label="SORI 실제 모션" />
        {/* An original pointer-driven SORI demo can be embedded here when its source is available. */}
      </div>
    </Section>

    <Section label="Design Refinement" title="From Separate Features to a Connected Experience." lead="개별 기능에서 하나의 탐색 경험으로."
      summary="초기에는 각 콘텐츠의 기능을 중심으로 페이지를 구성했지만, 피드백을 통해 서비스 전체의 연결성이 부족하다는 점을 발견했습니다. 이후 단어에서 소리, 표현, 관계, 실제 장면으로 확장되는 탐색 흐름을 정리하여 콘텐츠 간의 연결성을 강화했습니다.">
      <div className="detail-additions-grid detail-additions-comparison" data-addition-reveal>
        <div><h3>BEFORE</h3><p className="detail-additions-title">Individual Features</p><p lang="ko">각 콘텐츠를 독립적인 기능 중심으로 구성</p>
          <Media project="monolog" slot="refinement-before" label="MONO-LOG 초기 화면" limit={1} />
        </div>
        <div><h3>AFTER</h3><p className="detail-additions-title">Connected Exploration</p><p lang="ko">언어의 맥락이 확장되는 하나의 탐색 흐름으로 정리</p>
          <Media project="monolog" slot="refinement-after" label="MONO-LOG 개선 화면" limit={1} />
        </div>
      </div>
    </Section>

    <Section label="Outcome & Reflection" title="Beyond Translation." lead="언어의 차이를 경험으로 연결하다."
      summary="MONO-LOG는 서로 다른 언어의 표현을 단순히 비교하는 것을 넘어, 시각적 요소와 인터랙션을 통해 탐색할 수 있도록 구성한 프로젝트입니다. 콘텐츠의 특성에 맞는 표현 방식과 사용자 경험을 고민하며, 정보 자체를 하나의 인터랙티브 콘텐츠로 확장하는 과정을 경험했습니다.">
      {award && <div className="detail-additions-body detail-additions-award" data-addition-reveal>
        <h3>Project Outcome</h3><p lang="ko">{award}</p>
      </div>}
    </Section>
  </Additions>
}

const wireframes = [
  ['home', 'HOME', '식단 현황과 주요 관리 정보를 처음 확인하는 화면입니다.'],
  ['food-analysis', 'FOOD ANALYSIS', '식품을 분석하고 결과와 주의 사항을 확인하는 흐름입니다.'],
  ['meal-record', 'MEAL RECORD', '식사를 기록하고 일별 식단을 살펴보는 화면 구조입니다.'],
]

const visualIdentity = [
  ['palette', 'Color Palette'], ['typography', 'Typography'], ['character', 'Character'],
  ['icons', 'Icons'], ['ui-components', 'UI Components'],
]

const careExperiences = [
  ['home', 'Home', '복약 상태와 개인 맞춤 식단, 추천 콘텐츠를 한눈에 확인할 수 있도록 구성한 대시보드입니다.'],
  ['food-analysis', 'Food Analysis', '음식 사진과 식품 정보를 바탕으로 섭취 성분과 질환별 주의 사항을 확인하는 경험입니다.'],
  ['meal-record', 'Meal Record', '식사 내용을 기록하고 캘린더를 통해 일별 식단을 확인할 수 있도록 구성했습니다.'],
  ['my-care', 'My Care', '복약 일정과 건강 리포트를 통해 식단 외의 건강 관리 정보까지 함께 확인할 수 있도록 연결했습니다.'],
  ['community-feed', 'Community Feed', '비슷한 건강 관리 경험을 가진 사용자들의 식단 사례와 콘텐츠를 탐색하는 공간입니다.'],
]

export function NotomatoAdditions({ scrollRef }) {
  return <Additions project="notomato" scrollRef={scrollRef}>
    <Section label="Wireframe" title="Designing a Clear Path to Everyday Care." lead="복잡한 건강 관리를 직관적인 화면 구조로."
      summary="주요 기능 간의 연결성과 정보의 우선순위를 고려해 와이어프레임을 제작했습니다. 사용자가 식단 현황을 확인하고, 식품을 분석하며, 건강 기록을 이어갈 수 있도록 화면 구조와 탐색 흐름을 구체화했습니다.">
      <ol className="detail-additions-grid detail-additions-triplet">
        {wireframes.map(([slot, title, copy], index) => <li key={slot} data-addition-reveal>
          <h3>{`0${index + 1} — ${title}`}</h3>
          <Media project="notomato" slot={`wireframe-${slot}`} label={`${title} 와이어프레임`} limit={1} />
          <p lang="ko">{copy}</p>
        </li>)}
      </ol>
    </Section>

    <Section label="Visual Identity" title="A Friendlier Approach to Healthcare." lead="건강 관리를 더 친근하게."
      summary="의료 서비스의 딱딱한 이미지를 완화하고, 사용자가 일상에서 부담 없이 접근할 수 있도록 밝은 컬러와 친근한 그래픽을 적용했습니다. 부드러운 형태와 명확한 UI 요소를 통해 정보의 가독성과 서비스의 친근함을 함께 전달하고자 했습니다.">
      <div className="detail-additions-body detail-additions-team" data-addition-reveal><h3>Team Design</h3><p lang="ko">팀 디자이너 작업</p></div>
      <ul className="detail-additions-grid detail-additions-identity">
        {visualIdentity.map(([slot, title]) => <li key={slot} data-addition-reveal>
          <h3>{title}</h3><Media project="notomato" slot={`identity-${slot}`} label={title} />
        </li>)}
      </ul>
    </Section>

    <Section label="Key Experience" title="Everyday Care, All in One Place." lead="일상 속 건강 관리를 연결하는 다섯 가지 경험"
      summary="식품 선택부터 식사 기록, 복약 일정과 건강 리포트까지 사용자의 일상적인 건강 관리에 필요한 기능을 하나의 흐름으로 연결했습니다.">
      <ol className="detail-additions-grid detail-additions-experiences">
        {careExperiences.map(([slot, title, copy], index) => <li key={slot} data-addition-reveal data-featured={index === 1 || index === 3 || undefined}>
          <h3>{`0${index + 1} — ${title}`}</h3>
          <Media project="notomato" slot={`experience-${slot}`} label={`${title} 서비스 화면`} />
          <p lang="ko">{copy}</p>
        </li>)}
      </ol>
    </Section>

    <Section label="Implementation" title="From Wireframes to a Working Experience." lead="설계된 사용자 경험을 실제 서비스로."
      summary="초기 기획에 참여하고 주요 화면의 와이어프레임을 제작한 뒤, 프론트엔드 개발 전반을 단독으로 담당했습니다. 팀에서 완성한 UI 디자인을 실제 웹 환경에 구현하며, 화면 간 이동과 사용자 인터랙션이 자연스럽게 이어지도록 구성했습니다.">
      <div className="detail-additions-body" data-addition-reveal>
        <h3>MY CONTRIBUTION</h3>
        <ol className="detail-additions-grid detail-additions-triplet detail-additions-contribution">
          <li><h4>01 — Planning</h4><p lang="ko">초기 기획 참여</p></li>
          <li><h4>02 — Wireframing</h4><p lang="ko">화면 구조 설계</p></li>
          <li><h4>03 — Development</h4><p lang="ko">프론트엔드 단독 구현</p></li>
        </ol>
        <div className="detail-additions-grid detail-additions-comparison">
          <Media project="notomato" slot="implementation-wireframe" label="구현 전 와이어프레임" limit={1} />
          <Media project="notomato" slot="implementation-final" label="구현된 서비스 화면" limit={1} />
        </div>
        <Media project="notomato" slot="implementation-motion" label="실제 서비스 인터랙션" />
      </div>
    </Section>

    <Section label="Outcome & Reflection" title="From Planning to Experience." lead="기획에서 실제 사용자 경험까지."
      summary="NOTOMATO는 복잡한 질환별 식이 관리 정보를 하나의 서비스로 연결한 팀 프로젝트입니다. 초기 기획과 와이어프레임 설계에 참여하고 프론트엔드 구현을 전담하며, 사용자 경험의 구조가 실제 작동하는 서비스로 완성되는 과정을 경험했습니다." />
  </Additions>
}
