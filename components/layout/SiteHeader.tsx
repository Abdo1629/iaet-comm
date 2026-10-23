"use client";
import Image from "next/image";
import { ArrowDownLeft, ArrowUpRight, Languages, Menu, X } from "lucide-react";
type Copy = { institution:string; nav:string[][]; contact:string; menuLabel:string };
export function SiteHeader({t,isAr,menuOpen,headerScrolled,onChangeLocale,onToggleMenu,onCloseMenu}:{t:Copy;isAr:boolean;menuOpen:boolean;headerScrolled:boolean;onChangeLocale:()=>void;onToggleMenu:()=>void;onCloseMenu:()=>void}) {
 return <>
  <div className="announcement"><span className="announcement-dot" /><span>{t.institution}</span><span className="announcement-divider">/</span><span>{isAr ? "برنامج هندسة الإلكترونيات والاتصالات" : "Electronics & Communications Engineering"}</span></div>
  <header className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}>
   <a href="#top" className="brand" aria-label={t.institution}><Image src="/brand/iaet-logo.png" alt="IAET" width={68} height={45} className="official-logo" priority /><span className="brand-copy"><strong>IAET</strong><small>{isAr ? "هندسة وتكنولوجيا الطيران" : "AVIATION ENGINEERING & TECHNOLOGY"}</small></span></a>
   <nav id="primary-navigation" className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
    {t.nav.map(([label,href])=><a key={href} href={href} onClick={onCloseMenu}>{label}</a>)}
    <a href="#contact" className="nav-contact" onClick={onCloseMenu}>{t.contact}{isAr?<ArrowDownLeft size={15} aria-hidden="true"/>:<ArrowUpRight size={15} aria-hidden="true"/>}</a>
   </nav>
   <div className="header-actions">
    <button className="language-button" onClick={onChangeLocale} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}><Languages size={17} aria-hidden="true"/>{isAr?"EN":"عربي"}</button>
    <button className="menu-toggle" aria-label={t.menuLabel} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={onToggleMenu}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
   </div>
  </header>
 </>;
}
