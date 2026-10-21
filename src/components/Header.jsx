import HeaderLogo from './HeaderLogo.jsx'
export default function Header() {
  return <header className="site-header">
    <a href="#hero" aria-label="UOOJIN home"><HeaderLogo /></a>
    <nav aria-label="Main navigation"><a href="#projects">PROJECTS</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a></nav>
  </header>
}
