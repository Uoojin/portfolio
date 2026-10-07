function Header() {
  return (
    <header className="site-header">
      <a className="mini-logo eye-logo" href="#hero" aria-label="UOOJIN">
        <span>U</span>
        <span className="logo-eye">
          <i></i>
        </span>
        <span className="logo-eye">
          <i></i>
        </span>
        <span>JIN</span>
      </a>
      <nav>
        <a href="#projects">PROJECTS</a>
        <a href="#about">ABOUT</a>
        <a href="#contact">CONTACT</a>
      </nav>
    </header>
  )
}

export default Header
