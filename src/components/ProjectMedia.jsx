export default function ProjectMedia({ frame, media, className = '' }) {
  return (
    <div
      className={`detail-media detail-positioned ${className}`}
      data-frame={frame.id}
      style={{ '--x': frame.x, '--y': frame.y, '--w': frame.width, '--h': frame.height, '--label-size': frame.fontSize ?? 49 }}
    >
      {media.src ? (
        frame.kind === 'video' ? (
          <video src={media.src} poster={media.poster || undefined} aria-label={media.alt || media.label} autoPlay loop muted playsInline style={{ objectFit: media.objectFit }} />
        ) : (
          <img src={media.src} alt={media.alt} style={{ objectFit: media.objectFit }} />
        )
      ) : <span>{media.label}</span>}
    </div>
  )
}
