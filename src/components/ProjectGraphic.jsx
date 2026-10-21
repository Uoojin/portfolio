export default function ProjectGraphic({ project, className = '' }) {
  if (project.thumbnail) return <img className={`project-graphic ${className}`} src={project.thumbnail} alt={project.thumbnailAlt || project.title} />
  return <svg className={`project-graphic ${className}`} viewBox="0 0 160 140" aria-hidden="true">
    {project.graphic === 'orb' && <g fill="#4C67F6"><ellipse cx="76" cy="77" rx="40" ry="46" transform="rotate(-23 76 77)" /><circle cx="95" cy="36" r="18" /></g>}
    {project.graphic === 'disc' && <><circle cx="80" cy="70" r="42" fill="#E33232" /><circle cx="67" cy="56" r="26" fill="#fff" opacity=".12" /></>}
    {project.graphic === 'loops' && <g stroke="#202020" strokeWidth="4" fill="none" transform="rotate(35 80 70)"><ellipse cx="66" cy="70" rx="23" ry="48" /><ellipse cx="96" cy="70" rx="23" ry="48" /></g>}
    {project.graphic === 'play' && <path d="m53 25 65 45-65 45z" fill="#202020" stroke="#202020" strokeWidth="5" strokeLinejoin="round" />}
  </svg>
}
