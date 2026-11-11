import { email, socialLinks } from '../data/contact.js'

export default function Footer({ onSection }) {
  return <footer id="contact" className="site-footer" lang="en">
    <nav aria-label="Footer navigation">
      <a href="#about" onClick={onSection}>ABOUT</a>
      <a href="#projects" onClick={onSection}>WORKS</a>
    </nav>
    <div className="footer-contact">
      <a href={`mailto:${email}`}>{email}</a>
      <span>+82 10 1234 5678</span>
      <ul>
        {socialLinks.map(([label, url]) => <li key={label}>
          {url ? <a href={url} target="_blank" rel="noopener noreferrer">{label}</a> : <span>{label}</span>}
        </li>)}
      </ul>
    </div>
    <p className="copyright">Copyright © 2026 Uoojin All rights reserved</p>
  </footer>
}
