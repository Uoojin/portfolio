const activeFlights = new WeakMap()

function onscreen(rect) {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 &&
    rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth
}

export default function flyProject(dialog, thumbnail, cover, reverse = false) {
  if (!thumbnail || !cover || cover.hasAttribute('data-artwork') || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const from = thumbnail.getBoundingClientRect()
  const to = cover.getBoundingClientRect()
  if (!onscreen(from) || !onscreen(to) || (reverse && to.top < 0)) return

  const image = thumbnail.querySelector('img')
  if (image && (!image.complete || !image.naturalWidth)) return
  const ghost = document.createElement('div')
  ghost.className = 'project-flight'
  if (image) ghost.append(image.cloneNode())
  Object.assign(ghost.style, { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` })
  dialog.append(ghost)
  for (const frame of [thumbnail, cover]) {
    activeFlights.set(frame, ghost)
    frame.style.visibility = 'hidden'
  }

  // Both frames use the same 4:3 crop, so a uniform FLIP scale preserves the image.
  const small = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`
  const large = 'translate(0px, 0px) scale(1)'
  const frames = reverse ? [large, small] : [small, large]
  const animation = ghost.animate(frames.map(transform => ({ transform })), {
    duration: reverse ? 400 : 550, easing: 'cubic-bezier(.22,.75,.25,1)', fill: 'both',
  })
  const clean = () => {
    ghost.remove()
    for (const frame of [thumbnail, cover]) {
      if (activeFlights.get(frame) !== ghost) continue
      activeFlights.delete(frame)
      frame.style.visibility = ''
    }
  }
  animation.addEventListener('finish', clean, { once: true })
  animation.addEventListener('cancel', clean, { once: true })
  return animation
}
