import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
type Copy = { program:string;footerNote:string;footerNav:string;nav:string[][];learningLabel:string;contact:string;officialWebsite:string;backTop:string;institution?:string };
export function SiteFooter({t}:{t:Copy}) {
 return <footer className="site-footer">
  <div className="footer-grid">
   <div className="footer-brand-column"><Link href="/" className="footer-brand" aria-label="IAET — back to top"><Image src="/brand/iaet-logo.png" alt="IAET" width={68} height={45} className="official-logo"/><span><strong>IAET</strong><small>ECE / PROGRAM</small></span></Link><p>{t.footerNote}</p></div>
   <nav className="footer-column" aria-label={t.footerNav}><strong>{t.footerNav}</strong>{t.nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a href="/learning-resources">{t.learningLabel}</a><a href="/contact">{t.contact}</a></nav>
   <div className="footer-column"><strong>{t.contact}</strong><a href="mailto:info@iaet.edu.eg">info@iaet.edu.eg</a><a href="tel:+20233594060">02 33594060</a><a href="https://iaet.edu.eg/" target="_blank" rel="noreferrer">{t.officialWebsite}</a></div>
  </div>
  <div className="footer-bottom"><span>© IAET · {t.program}</span><span>{t.institution ?? "Institute of Aviation Engineering & Technology"}</span><Link href="/" className="back-top">{t.backTop} <ArrowUpRight size={14} aria-hidden="true"/></Link></div>
 </footer>;
}
