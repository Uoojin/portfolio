import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export default function useHeroOnboarding(skip = false) {
  // Lives for this App mount, so hash navigation and project return never replay it.
  const [phase, setPhase] = useState(() => skip ? 'complete' : 'loading')
  const active = phase !== 'complete'

  useLayoutEffect(() => {
    if (!active) return
    const root = document.documentElement
    const body = document.body
    const originalRoot = { overflow: root.style.overflow, scrollBehavior: root.style.scrollBehavior }
    const originalBody = { position: body.style.position, top: body.style.top, left: body.style.left, width: body.style.width, overflow: body.style.overflow, touchAction: body.style.touchAction }
    const block = event => event.preventDefault()
    const blockKeys = event => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar', 'Tab'].includes(event.key)) event.preventDefault()
    }
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    root.style.overflow = 'hidden'
    root.style.scrollBehavior = 'auto'
    Object.assign(body.style, { position: 'fixed', top: '0px', left: '0px', width: '100%', overflow: 'hidden', touchAction: 'none' })
    reset()
    window.addEventListener('wheel', block, { passive: false, capture: true })
    window.addEventListener('touchmove', block, { passive: false, capture: true })
    window.addEventListener('keydown', blockKeys, true)
    window.addEventListener('scroll', reset)
    return () => {
      window.removeEventListener('wheel', block, true)
      window.removeEventListener('touchmove', block, true)
      window.removeEventListener('keydown', blockKeys, true)
      window.removeEventListener('scroll', reset)
      Object.assign(root.style, originalRoot)
      Object.assign(body.style, originalBody)
    }
  }, [active])

  useEffect(() => {
    if (phase !== 'loading') return
    let cancelled = false
    let frame = 0
    let nextFrame = 0
    let timer = 0
    const start = async () => {
      await Promise.allSettled([
        document.fonts.load('400 32px "Bagel Fat One"', 'UOOJIN'),
        document.fonts.load('400 16px "Pretendard"', 'MAKING THINGS'),
      ])
      await document.fonts.ready
      if (cancelled) return
      timer = window.setTimeout(() => {
        frame = requestAnimationFrame(() => {
          nextFrame = requestAnimationFrame(() => {
            if (!cancelled) setPhase(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'complete' : 'dropping')
          })
        })
      }, 180)
    }
    start()
    return () => { cancelled = true; clearTimeout(timer); cancelAnimationFrame(frame); cancelAnimationFrame(nextFrame) }
  }, [phase])

  useEffect(() => {
    if (!active) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => { if (reduced.matches) setPhase('complete') }
    reduced.addEventListener('change', change)
    return () => reduced.removeEventListener('change', change)
  }, [active])

  // Animation events are primary; bounded fallbacks also release the lock if
  // browser settings or a stylesheet suppress an animation event.
  useEffect(() => {
    if (phase !== 'dropping' && phase !== 'revealing') return
    const timer = setTimeout(() => setPhase(phase === 'dropping' ? 'revealing' : 'complete'), phase === 'dropping' ? 1900 : 650)
    return () => clearTimeout(timer)
  }, [phase])

  const onLettersLanded = useCallback(() => setPhase(current => current === 'dropping' ? 'revealing' : current), [])
  const onRevealEnd = useCallback(() => setPhase(current => current === 'revealing' ? 'complete' : current), [])
  return { phase, active, heroReady: phase === 'revealing' || phase === 'complete', onLettersLanded, onRevealEnd }
}
