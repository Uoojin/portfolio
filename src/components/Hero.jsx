import { useEffect, useId, useRef, useState } from 'react'
import eyeArtwork from '../assets/object/eye.svg?raw'
import useSvgPupils from '../hooks/useSvgPupils.js'

const words = [
  { word: 'LOOK', copy: ['Finding new perspectives in familiar things,', 'discovering inspiration in the smallest details.'] },
  { word: 'MOOD', copy: ['Creating feelings through colors, shapes, and motion', 'to make experiences that go beyond what we see.'] },
  { word: 'LOOP', copy: ['Bringing static visuals to life through interaction', 'to create playful experiences people can explore.'] },
].map(entry => ({ ...entry, length: entry.copy[0].length + entry.copy[1].length }))

const eyeMarkup = { __html: eyeArtwork }
const heroEyes = [[46.7, 99, 41, 6], [137.5, 99, 41, 6]]
const drawTime = 640
const typeSpeed = 28
const holdTime = 2450

// Each guide follows the Kalam ink in em units. The mask reveals the original glyph.
const letterGuides = {
  L: { advance: .545, paths: ['M .24 .035 Q .19 .34 .094 .66 Q .084 .74 .49 .645'] },
  M: { advance: .79, paths: ['M .10 .75 Q .15 .38 .225 .067 Q .28 .32 .405 .5 Q .57 .235 .76 .059 Q .66 .37 .625 .73'] },
  K: { advance: .59, paths: ['M .228 .04 Q .197 .31 .095 .744', 'M .578 .037 Q .456 .18 .232 .367 Q .238 .556 .552 .709'] },
  D: { advance: .645, paths: ['M .255 .123 Q .197 .377 .123 .721', 'M .12 .068 C .369 .082 .587 .23 .589 .37 C .594 .516 .333 .659 .123 .727'] },
  P: { advance: .545, paths: ['M .213 .10 Q .158 .411 .062 .729', 'M .138 .107 C .388 .038 .532 .083 .5 .236 Q .47 .382 .153 .461'] },
}

function useHeroSequence(ref, paused) {
  const clock = useRef({ turn: 0, elapsed: 0 })
  const [view, setView] = useState({ turn: 0, count: 0, ink: 0 })

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const state = clock.current
    let visible = false
    let frame = 0
    let lastTime = null

    const draw = (turn, count, ink) => {
      setView(previous => previous.turn === turn && previous.count === count && previous.ink === ink
        ? previous : { turn, count, ink })
    }

    const tick = now => {
      if (lastTime !== null) state.elapsed += now - lastTime
      lastTime = now
      let { length } = words[state.turn % words.length]
      const cycleEnd = drawTime + length * typeSpeed + holdTime
      if (state.elapsed >= cycleEnd) {
        state.turn++
        state.elapsed = 0
        length = words[state.turn % words.length].length
      }

      const ink = Math.min(1, state.elapsed / drawTime)
      const count = Math.min(length, Math.floor(Math.max(0, state.elapsed - drawTime) / typeSpeed))
      draw(state.turn, count, ink)
      frame = requestAnimationFrame(tick)
    }

    const sync = () => {
      cancelAnimationFrame(frame)
      lastTime = null
      if (reduced.matches) {
        const { length } = words[state.turn % words.length]
        state.elapsed = drawTime + length * typeSpeed
        draw(state.turn, length, 1)
      } else if (!paused && visible && !document.hidden) {
        frame = requestAnimationFrame(tick)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    }, { threshold: .1 })
    observer.observe(ref.current)
    sync()
    reduced.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      reduced.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      cancelAnimationFrame(frame)
    }
  }, [ref, paused])

  return view
}

function getEyeOpening(turn, ink) {
  const elapsed = ink * drawTime
  const closeTime = 95
  const blinkTime = 280
  if (turn === 0 || elapsed >= blinkTime) return 1

  const opening = elapsed < closeTime
    ? 1 - elapsed / closeTime
    : (elapsed - closeTime) / (blinkTime - closeTime)
  return opening * opening * (3 - 2 * opening)
}

function HeroLetter({ letter, side, ink }) {
  const maskId = useId()
  const { advance, paths } = letterGuides[letter]
  const drawing = ink < 1
  return <>
    {drawing && <svg className="hero-letter-mask" width="0" height="0">
      <defs>
        <mask id={maskId} maskContentUnits="objectBoundingBox" x="-.25" y="-.25" width="1.5" height="1.5">
          <g transform={`scale(${1 / advance} 1)`} fill="none" stroke="white" strokeWidth=".16"
            strokeLinecap="round" strokeLinejoin="round">
            {paths.map((path, index) => {
              const progress = Math.max(0, Math.min(1, ink * paths.length - index))
              return progress > 0 && <path key={path} d={path} pathLength="1"
                strokeDasharray="1 1" strokeDashoffset={1 - progress} />
            })}
          </g>
        </mask>
      </defs>
    </svg>}
    <span className={`hero-letter-side hero-letter-${side}`}
      style={drawing ? { maskImage: `url("#${maskId}")` } : undefined}>{letter}</span>
  </>
}

function HeroCopy({ copy, count }) {
  return <div className="hero-description">
    <p className="sr-only">{copy.join(' ')}</p>
    <p aria-hidden="true">
      {copy.map((line, row) => <span className="hero-copy-line" key={row}>
        {[...line].map((letter, index) => <span key={index}
          data-pending={index + (row === 0 ? 0 : copy[0].length) >= count || undefined}>{letter}</span>)}
      </span>)}
    </p>
  </div>
}

export default function Hero({ onSection, paused }) {
  const ref = useRef(null)
  const eyesRef = useRef(null)
  const { turn, count, ink } = useHeroSequence(ref, paused)
  const active = turn % words.length
  const word = words[active].word
  const previous = turn > 0 ? words[(turn - 1) % words.length].word : ''
  useSvgPupils(eyesRef, undefined, !paused, heroEyes)

  return <section ref={ref} id="hero" className="hero" lang="en" aria-label="Introduction">
    <h1 className="sr-only">Uoojin — Look, Mood, Loop</h1>
    <div className="hero-wheel" data-turned={turn > 0} aria-hidden="true">
      {words.map(({ word }, index) => {
        const positions = ['active', 'above', 'below']
        const position = positions[(index - active + words.length) % words.length]
        return <span className="hero-word" key={word} data-position={position}>{word}</span>
      })}
      <div className="hero-drawn">
        <HeroLetter letter={word[0]} side="left" ink={word[0] === previous[0] ? 1 : ink} />
        <span className="hero-paren hero-paren-left">(</span>
        <span className="hero-eyes" ref={eyesRef} style={{ '--eye-open': getEyeOpening(turn, ink) }}
          dangerouslySetInnerHTML={eyeMarkup} />
        <span className="hero-paren hero-paren-right">)</span>
        <HeroLetter letter={word[3]} side="right" ink={ink} />
      </div>
    </div>
    <HeroCopy copy={words[active].copy} count={count} />
    <a className="scroll-indicator" href="#about" onClick={onSection} aria-label="Scroll to About">
      <span aria-hidden="true" />
    </a>
  </section>
}
