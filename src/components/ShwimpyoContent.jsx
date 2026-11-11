import { useEffect, useLayoutEffect, useRef } from 'react'
import room from '../assets/object/works/shwimpyo/main.png'
import desk from '../assets/object/works/shwimpyo/desk.png'
import bed from '../assets/object/works/shwimpyo/bed.png'
import bookcase from '../assets/object/works/shwimpyo/bookcase.png'
import laptop from '../assets/object/works/shwimpyo/laptop.png'
import calendar from '../assets/object/works/shwimpyo/calendar.png'
import clock from '../assets/object/works/shwimpyo/clock.png'
import door from '../assets/object/works/shwimpyo/door.png'
import choices from '../assets/object/works/shwimpyo/choices.jpg'
import exploration from '../assets/object/works/shwimpyo/exploration.jpg'
import '../styles/shwimpyo-content.css'

const mechanics = [
  ['Choose', '행동 선택'],
  ['Explore', '공간 탐색'],
  ['Review', '결과 확인'],
  ['Repeat', '다음 날'],
]

const progression = [
  ['Beginning', '시작', '기대 · 가능성'],
  ['Growth', '성장', '노력 · 성취'],
  ['Pressure', '기준 상승', '비교 · 압박'],
  ['Pause', '쉬어짐', '피로 · 무력감'],
]

const palette = ['#F4EFE4', '#181216', '#E8D9A6', '#CCEBCF', '#3A2C30']

const objects = [
  [room, '방 배경'], [desk, '책상'], [bed, '침대'], [bookcase, '책장'],
  [laptop, '노트북'], [calendar, '달력'], [clock, '시계'], [door, '문'],
]

function Stages({ items }) {
  return <ol className="shwimpyo-stages">
    {items.map(([name, label, mood], index) => <li key={name} style={{ '--stage-delay': `${index * 100}ms` }}>
      <span className="shwimpyo-stage-dot" aria-hidden="true" />
      <h4>{String(index + 1).padStart(2, '0')} — {name}</h4>
      <p lang="ko">{label}</p>
      {mood && <p lang="ko">{mood}</p>}
    </li>)}
  </ol>
}

function GameFrame() {
  const frameRef = useRef(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const resize = () => frame.style.setProperty('--game-scale', frame.getBoundingClientRect().width / 1280)
    const observer = new ResizeObserver(resize)
    resize()
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return <div className="shwimpyo-game-frame" ref={frameRef}>
    <iframe
      src={`${import.meta.env.BASE_URL}games/SeriousGame/index.html`}
      title="SHWIMPYO(拘束) 플레이 가능한 원본 게임"
      width="1280" height="720" loading="lazy" sandbox="allow-scripts"
    />
  </div>
}

export default function ShwimpyoContent({ scrollRef }) {
  const contentRef = useRef(null)

  useEffect(() => {
    const viewport = scrollRef.current
    const targets = [...contentRef.current.querySelectorAll('[data-shwimpyo-reveal]')]
    const stacked = matchMedia('(max-width: 900px)')
    let observer

    function observe() {
      observer?.disconnect()
      observer = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue
          target.dataset.shwimpyoVisible = ''
          observer.unobserve(target)
        }
      }, { root: stacked.matches ? viewport.closest('dialog') : viewport, threshold: 0.15 })
      for (const target of targets) {
        if (!target.hasAttribute('data-shwimpyo-visible')) observer.observe(target)
      }
    }

    observe()
    stacked.addEventListener('change', observe)
    return () => {
      stacked.removeEventListener('change', observe)
      observer.disconnect()
    }
  }, [scrollRef])

  return <div className="shwimpyo-content" ref={contentRef} lang="en">
    <section className="mono-overview" data-shwimpyo-reveal="fade">
      <h2>Overview</h2>
      <div className="mono-overview-copy">
        <h3>Not a Choice, but a Consequence.</h3>
        <p lang="ko">멈춘 것이 아니라, 멈춰지게 된 시간.</p>
        <p lang="ko">쉼표는 취업을 준비하는 청년이 끊임없이 높아지는 사회적 기준 속에서 자신의 의지와 관계없이 '쉬었음' 상태에 놓이게 되는 과정을 다룬 시리어스 게임입니다. 플레이어의 노력과 성장이 반드시 결과로 이어지지 않는 구조를 게임 경험으로 전달하고자 했습니다.</p>
        <section className="mono-challenge" aria-label="Challenge">
          <h4>✳ Challenge</h4>
          <p lang="ko">개인의 노력보다 빠르게 높아지는 사회적 기준을 어떻게 플레이어가 직접 체감하도록 만들 수 있을까?</p>
          <p lang="ko">→ 반복되는 선택과 성장에도 불구하고 점차 불리해지는 게임 구조를 통해, 취업 준비 과정의 압박과 비자발적인 멈춤을 경험하도록 설계했습니다.</p>
        </section>
      </div>
    </section>

    <section className="shwimpyo-section">
      <div className="shwimpyo-copy" data-shwimpyo-reveal="fade">
        <h2>Core Concept</h2>
        <h3>The More You Grow, The Further It Gets.</h3>
        <p lang="ko">성장할수록 멀어지는 기준</p>
        <p lang="ko">플레이어는 공부와 경험을 통해 능력을 키워나가지만, 사회가 요구하는 기준은 그보다 빠르게 상승합니다. 성장하고 있음에도 목표와의 거리가 점점 벌어지는 구조를 통해 노력과 결과 사이의 불균형을 체감하도록 구성했습니다.</p>
      </div>
      <figure className="shwimpyo-chart" data-shwimpyo-reveal="chart">
        <h4>Player Growth vs. Social Standards</h4>
        <svg viewBox="0 0 800 246" role="img" aria-label="Player Growth rises gradually while Social Standards rise faster and widen the gap.">
          <path className="shwimpyo-axis" d="M34 20V218H766" />
          <path className="shwimpyo-growth" pathLength="1" d="M42 194C241 182 407 153 751 115" />
          <path className="shwimpyo-standards" pathLength="1" d="M42 186C265 172 492 124 751 27" />
        </svg>
        <ul className="shwimpyo-chart-key"><li>Player Growth</li><li>Social Standards</li></ul>
        <figcaption lang="ko">게임의 구조를 표현한 개념 그래프이며 실제 게임 데이터는 아님</figcaption>
      </figure>
    </section>

    <section className="shwimpyo-section">
      <div className="shwimpyo-copy" data-shwimpyo-reveal="fade">
        <h2>Game Mechanics</h2>
        <h3>Choices, Actions, and Repetition.</h3>
        <p lang="ko">선택과 반복으로 이어지는 하루</p>
        <p lang="ko">플레이어는 하루의 행동을 선택하고, 방 안의 사물을 클릭하며 취업 준비생의 일상을 경험합니다. 행동에 따른 변화를 확인하고 다음 날로 넘어가는 과정이 반복되며, 시간이 흐를수록 선택의 부담과 압박이 누적됩니다.</p>
      </div>
      <figure className="shwimpyo-stage-figure" data-shwimpyo-reveal="stages">
        <Stages items={mechanics} />
        <figcaption lang="ko">하루 단위로 반복되는 게임 플레이 구조</figcaption>
      </figure>
      <div className="shwimpyo-screens">
        <img src={choices} alt="책장에서 공부할 내용을 고르는 실제 게임 선택 화면" width="1280" height="720" loading="lazy" />
        <img src={exploration} alt="책상을 클릭해 노트북을 탐색하는 실제 게임 화면" width="1280" height="720" loading="lazy" />
      </div>
    </section>

    <section className="shwimpyo-section">
      <div className="shwimpyo-copy" data-shwimpyo-reveal="fade">
        <h2>Game Progression</h2>
        <h3>From Hope to an Involuntary Pause.</h3>
        <p lang="ko">기대에서 무력감으로 이어지는 네 단계</p>
        <p lang="ko">게임은 시작, 성장, 기준 상승, 쉬어짐의 네 단계로 진행됩니다. 처음에는 성장에 대한 기대를 갖지만, 반복되는 탈락과 높아지는 기준 속에서 점차 선택과 행동 자체가 부담으로 변해갑니다.</p>
      </div>
      <figure className="shwimpyo-stage-figure shwimpyo-progression" data-shwimpyo-reveal="stages">
        <Stages items={progression} />
        <figcaption lang="ko">원본 게임의 날짜 진행과 별개로, 플레이어가 경험하는 감정의 흐름을 나타냅니다.</figcaption>
      </figure>
    </section>

    <section className="shwimpyo-section">
      <div className="shwimpyo-copy" data-shwimpyo-reveal="fade">
        <h2>Play the Game</h2>
        <h3>Experience the Unchosen Pause.</h3>
        <p lang="ko">끝없이 반복되는 하루 속에서, 직접 경험하는 멈춤.</p>
        <p lang="ko">취업을 준비하는 청년의 하루를 직접 경험해 보세요. 방 안의 사물을 탐색하고 행동을 선택하며, 반복되는 노력과 변화하는 기준 속에서 어떤 결과에 도달하게 되는지 확인할 수 있습니다.</p>
      </div>
      <figure className="shwimpyo-play">
        <div className="shwimpyo-play-title"><p>INTERACTIVE EXPERIENCE</p><h4>SHWIMPYO(拘束)</h4><p>Playable Game</p></div>
        <GameFrame />
        <figcaption>Click · Choose · Explore</figcaption>
      </figure>
    </section>

    <section className="shwimpyo-section">
      <div className="shwimpyo-copy" data-shwimpyo-reveal="fade">
        <h2>Visual Direction</h2>
        <h3>A Bright Surface, A Growing Unease.</h3>
        <p lang="ko">밝은 화면 속 서서히 쌓이는 불안</p>
        <p lang="ko">레트로 픽셀 그래픽과 부드러운 파스텔 컬러를 활용해 친숙한 분위기를 형성했습니다. 플레이가 진행될수록 시간대에 따라 방의 이미지가 바뀌고, 후반부에는 화면 위로 어두운 톤이 더해져 반복되는 일상 속 압박과 불안을 전달합니다.</p>
      </div>
      <section className="shwimpyo-visual" data-shwimpyo-reveal="fade">
        <h3>Mood &amp; Color</h3>
        <ul className="mono-swatches shwimpyo-swatches">
          {palette.map(color => <li key={color} style={{ backgroundColor: color }}>{color}</li>)}
        </ul>
      </section>
      <section className="shwimpyo-visual" data-shwimpyo-reveal="fade">
        <h3>Pixel Graphic Elements</h3>
        <ul className="shwimpyo-objects">
          {objects.map(([src, label]) => <li key={label}><img src={src} alt="" loading="lazy" /><p lang="ko">{label}</p></li>)}
        </ul>
      </section>
    </section>

    <section className="shwimpyo-section shwimpyo-ending" data-shwimpyo-reveal="fade">
      <h2>Ending &amp; Reflection</h2>
      <p>ENDING MESSAGE</p>
      <blockquote lang="ko">나는 쉬기로 한 적 없었다.<br />그런데 어느 순간, 나는 쉬고 있는 사람이 되어 있었다.</blockquote>
      <p>Not a Choice, but a Consequence.</p>
      <div className="shwimpyo-copy">
        <h3>Beyond the Game.</h3>
        <p lang="ko">쉼표는 플레이어가 반복되는 선택과 노력 속에서 구조적인 한계를 직접 체감하도록 설계한 프로젝트입니다. 단순히 이야기를 전달하는 것을 넘어, 게임의 규칙과 인터랙션 자체가 사회적 메시지를 전달하는 경험이 될 수 있도록 구성했습니다.</p>
      </div>
    </section>
  </div>
}
