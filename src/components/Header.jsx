import HeaderLogo from './HeaderLogo.jsx'
export default function Header({ disabled = false, onRevealEnd }) {
  return <header className="site-header" inert={disabled} aria-hidden={disabled ? true : undefined} onAnimationEnd={event => { if (event.target === event.currentTarget && event.animationName === 'hero-ui-reveal') onRevealEnd?.() }}>
    <a href="#hero" aria-label="UOOJIN home"><HeaderLogo /></a>
    <nav aria-label="Main navigation"><a href="#projects">PROJECTS</a><a href="#about">ABOUT</a></nav>
  </header>
}
