const clamp = value => Math.max(0, Math.min(1, value))
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t) }

// Scroll distances: grow 24%, explore 42%, shrink 28%, fade 6%.
export function workspaceMotion(progress, reducedMotion = false) {
  const p = clamp(progress)
  if (reducedMotion) return { expansion: 1, opacity: 1, caption: 0, phase: 'explore' }
  const expansion = p < .24 ? smooth(p / .24) : p <= .66 ? 1 : 1 - smooth((p - .66) / .28)
  return {
    expansion,
    opacity: 1 - smooth((p - .94) / .06),
    caption: 1 - smooth(p / .12),
    phase: p < .24 ? 'expand' : p <= .66 ? 'explore' : p < .94 ? 'shrink' : 'exit',
  }
}
