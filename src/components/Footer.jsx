import HeaderLogo from './HeaderLogo.jsx'

export default function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="contact-title-slot"><h2 className="contact-title"><span className="contact-title-text">CONTACT ME</span><span className="contact-arrow" aria-hidden="true">↗︎</span></h2></div>
    <div className="footer-body">
      <dl className="footer-contacts">
        <div><dt>EMAIL</dt><dd><a href="mailto:u.ooojin@gmail.com">u.ooojin@gmail.com</a></dd></div>
        <div><dt>GITHUB</dt><dd><a href="https://github.com/Uoojin" target="_blank" rel="noopener noreferrer">https://github.com/</a></dd></div>
      </dl>
      <div className="footer-bottom">
        <div><a className="footer-logo" href="#hero" aria-label="UOOJIN home"><HeaderLogo /></a><p>Copyright © 2026 Uoojin All rights reserved</p></div>
        <a href="#hero">BACK TO TOP ↑</a>
      </div>
    </div>
  </footer>
}
