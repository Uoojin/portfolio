import Eyes from './Eyes.jsx'
// Set real social profile URLs here when they are available.
const socialLinks = [{ label: 'EMAIL', href: 'mailto:u.ooojini@gmail.com' }, { label: 'INSTAGRAM', href: '' }, { label: 'GITHUB', href: '' }]
export default function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="footer-main"><a className="connect-title" href="mailto:u.ooojini@gmail.com">LET’S<br />CONNECT<span className="connect-dot">.</span></a><div className="footer-character" aria-hidden="true"><span className="thanks">Thanks<br />for looking!</span><Eyes /><span className="footer-hands">⌒<span>⌒</span></span></div><nav className="footer-links" aria-label="Contact links">{socialLinks.map(link => link.href ? <a key={link.label} href={link.href}>{link.label} ↗</a> : <span className="social-pending" key={link.label} title="프로필 링크 준비 중">{link.label} <small>준비 중</small></span>)}<a href="#hero">BACK TO TOP ↑</a></nav></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} UOOJIN. All rights reserved.</p><span>SEE YOU AROUND ↗</span></div>
  </footer>
}
