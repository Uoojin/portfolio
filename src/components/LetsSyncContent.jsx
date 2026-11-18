import { useEffect, useRef } from 'react'
import '../styles/lets-sync-content.css'

const media = import.meta.glob('../assets/object/works/lets-sync/*.{png,webp,mp4}', {
  eager: true, import: 'default', query: '?url',
})
const asset = file => media[`../assets/object/works/lets-sync/${file}`]

function Section({ id, label, title, lead, copy, children }) {
  return <section className="lets-sync-section" aria-labelledby={id}>
    <header className="lets-sync-intro">
      <h2 id={id}>{label}</h2>
      <div>
        <h3>{title}</h3>
        <p className="lets-sync-lead" lang="ko">{lead}</p>
        <p lang="ko">{copy}</p>
      </div>
    </header>
    {children}
  </section>
}

function Still({ file, alt, caption, width = 1280, height = 800, format = 'webp' }) {
  return <figure className="lets-sync-media">
    <img src={asset(`${file}.${format}`)} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

function Recording({ file, poster, label, caption }) {
  return <figure className="lets-sync-media">
    <video src={asset(`${file}.mp4`)} poster={asset(`${poster}.webp`)}
      width="1120" height="700" aria-label={label} controls muted loop playsInline preload="none" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

export default function LetsSyncContent({ cover, scrollRef, url, award }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const videos = contentRef.current.querySelectorAll('video')
    const viewport = scrollRef.current
    const stacked = matchMedia('(max-width: 900px)')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let observer

    function observe() {
      observer?.disconnect()
      if (reduced.matches) videos.forEach(video => video.pause())
      observer = new IntersectionObserver(entries => {
        for (const { target, isIntersecting, intersectionRatio } of entries) {
          if (!isIntersecting) {
            target.pause()
          } else if (!reduced.matches && intersectionRatio >= 0.6) {
            target.muted = true
            void target.play().catch(() => {})
          }
        }
      }, { root: stacked.matches ? viewport.closest('dialog') : viewport, threshold: [0, 0.6] })

      videos.forEach(video => observer.observe(video))
    }

    observe()
    stacked.addEventListener('change', observe)
    reduced.addEventListener('change', observe)
    return () => {
      stacked.removeEventListener('change', observe)
      reduced.removeEventListener('change', observe)
      observer.disconnect()
      videos.forEach(video => video.pause())
    }
  }, [scrollRef])

  return <div className="lets-sync-content" lang="en" ref={contentRef}>
    <section className="lets-sync-hero" aria-labelledby="lets-sync-hero">
      {cover}
      <div>
        <h2 id="lets-sync-hero">LET’S SYNC!</h2>
        <p>Bringing the Exhibition Identity to Life.</p>
      </div>
    </section>

    <Section id="lets-sync-digital" label="Digital Experience" title="Turning Visual Identity into a Digital Experience."
      lead="전시의 그래픽 아이덴티티를 웹에서 경험할 수 있도록."
      copy="졸업전시의 타이포그래피와 그래픽 요소를 웹 환경에 구현했습니다. 스크롤과 사용자 인터랙션을 통해 정적인 브랜딩 요소가 움직이는 디지털 경험으로 확장되도록 구성했습니다.">
      <Recording file="home-scroll" poster="home" label="LET’S SYNC! 메인 화면에서 전시 소개, 디자인 모티프와 심볼 그리드까지 스크롤하는 영상" />
    </Section>

    <Section id="lets-sync-type" label="Interactive Typography" title="Type in Motion."
      lead="타이포그래피를 직접 경험하는 인터랙션."
      copy="전시의 핵심 그래픽인 타이포그래피를 웹에서 반응하는 요소로 구현했습니다. 글자의 움직임과 상호작용을 통해 전시 아이덴티티를 보다 생동감 있게 전달했습니다.">
      <Recording file="type-interaction" poster="type" label="원본 타이포그래피의 점을 호버하고 끌어 움직이는 시연 영상"
        caption="Interaction — Typography responding to user input" />
    </Section>

    <Section id="lets-sync-motion" label="Motion & Graphic" title="Graphics That Respond."
      lead="그래픽이 움직이며 만들어내는 전시 경험."
      copy="전시 브랜딩의 그래픽 요소를 스크롤과 인터랙션에 반응하는 웹 콘텐츠로 구현했습니다. 그래픽의 등장과 이동, 전환을 통해 각 섹션이 하나의 흐름으로 연결되도록 구성했습니다.">
      <div className="lets-sync-motion-layout">
        <Recording file="motif-motion" poster="motifs" label="스크롤과 입력에 반응하는 디자인 모티프의 전환 영상" caption="01. Design Motifs" />
        <Recording file="symbol-motion" poster="symbols" label="카테고리와 심볼을 선택해 미리보기 그래픽이 바뀌는 영상" caption="02. Symbol Grid" />
      </div>
    </Section>

    <Section id="lets-sync-archive" label="Exploring the Exhibition" title="Discovering People and Projects."
      lead="다양한 작품과 참여자를 탐색하는 경험."
      copy="졸업전시에 참여한 학생과 작품을 사용자가 쉽게 발견하고 탐색할 수 있도록 웹 인터페이스를 구현했습니다. 콘텐츠의 배열과 화면 전환, 검색 및 탐색 기능을 통해 다양한 전시 정보를 하나의 웹 경험으로 연결했습니다.">
      <div className="lets-sync-archive-stills">
        <Still file="students" alt="학생 이미지 카드와 검색 필드를 보여주는 학생 아카이브" caption="Student Archive — Finding the People" />
        <Still file="projects" alt="전시 작품 카드와 필터, 작품 목록을 보여주는 프로젝트 아카이브" caption="Project Archive — Exploring the Works" />
      </div>
      <div className="lets-sync-archive-flow">
        <Recording file="archive-motion" poster="students" label="학생 이름 검색과 카드 전환에서 작품 목록과 상세 열기로 이어지는 시연 영상" caption="Search, Card Flip & Project Detail" />
        <Still file="project-detail" alt="작품명, 소개와 시각 자료가 배치된 실제 작품 상세 화면" caption="Project Detail" />
      </div>
    </Section>

    <Section id="lets-sync-participation" label="Participation & Interaction" title="Beyond Viewing, Into Participation."
      lead="관람을 넘어 직접 참여하는 웹 경험."
      copy="관람객이 사진과 메시지를 남기거나 직접 그림을 그릴 수 있는 참여형 콘텐츠를 웹에서 구현했습니다. 전시 정보를 보는 것에서 나아가 사용자가 자신의 흔적을 남길 수 있는 경험으로 확장했습니다.">
      <div className="lets-sync-feature">
        <header>
          <h4>Guestbook</h4>
          <p>Leaving a Trace.</p>
          <p lang="ko">전시에 대한 메시지와 사진을 남기는 참여형 콘텐츠.</p>
        </header>
        <Recording file="guestbook-motion" poster="guestbook" label="방명록에서 포토부스 화면, 사진 편집, 메시지 입력으로 이어지는 시연 영상" />
        <div className="lets-sync-guestbook-stills">
          <Still file="photo-editor" format="png" width={424} height={570} alt="사진과 메시지를 배치하는 실제 폴라로이드 편집 화면" caption="Photo Booth" />
          <Still file="message" format="png" width={452} height={410} alt="보낸 사람과 받는 사람, 메시지를 입력하는 실제 방명록 화면" caption="Message" />
        </div>
      </div>
      <div className="lets-sync-feature lets-sync-drawing">
        <header>
          <h4>Drawing Experience</h4>
          <p>Creating Through Interaction.</p>
          <p lang="ko">사용자가 직접 그림을 그리며 참여하는 인터랙티브 콘텐츠.</p>
        </header>
        <Recording file="drawing-motion" poster="drawing" label="그리기 도구를 사용해 캔버스에 심볼을 그리고 메시지를 입력하는 시연 영상" caption="Drawing Editor" />
      </div>
    </Section>

    <Section id="lets-sync-final" label="Final Experience" title="A Visual Identity Brought to Life."
      lead="전시의 아이덴티티를 하나의 웹 경험으로 완성하다."
      copy="팀이 제작한 전시 브랜딩을 기반으로 타이포그래피와 그래픽 모션, 작품 탐색, 관람객 참여 기능을 웹사이트로 구현했습니다. 다양한 화면과 인터랙션을 하나의 경험으로 연결하며 전시의 시각적 정체성이 디지털 환경에서도 전달되도록 했습니다.">
      <div className="lets-sync-final-stills">
        <Still file="home" alt="LET’S SYNC! 데스크톱 메인 화면의 타이포그래피와 전시 정보" caption="Desktop Home" />
        <Still file="mobile-home" alt="원본 전시 포스터와 전시 정보를 배치한 반응형 모바일 홈" caption="Mobile Home" width={390} height={844} />
      </div>
      <div className="lets-sync-award">
        <h4>Team Project Award</h4>
        <p lang="ko">{award}</p>
      </div>
      {url && <a className="lets-sync-external" href={url} target="_blank" rel="noopener noreferrer">Explore LET’S SYNC! ↗</a>}
    </Section>
  </div>
}
