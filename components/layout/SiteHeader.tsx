"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";

type Copy = {
  institution: string;
  nav: string[][];
  contact: string;
  menuLabel: string;
};

export function SiteHeader({
  t,
  isAr,
  menuOpen,
  headerScrolled,
  onChangeLocale,
  onToggleMenu,
  onCloseMenu,
}: {
  t: Copy;
  isAr: boolean;
  menuOpen: boolean;
  headerScrolled: boolean;
  onChangeLocale: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="announcement">
        <span>{t.institution}</span>
        <span className="announcement-divider" aria-hidden="true">/</span>
        <span className="announcement-program">
          {isAr ? "برنامج هندسة الإلكترونيات والاتصالات" : "Electronics & Communications Engineering"}
        </span>
      </div>

      <motion.header
        className={`site-header ${headerScrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="brand" aria-label={t.institution} onClick={onCloseMenu}>
          <span className="brand-logo-wrap">
            <Image
              src="/brand/iaet-logo.png"
              alt="IAET"
              width={68}
              height={45}
              className="official-logo"
              priority
            />
          </span>
          <span className="brand-copy">
            <strong>IAET</strong>
            <small>{isAr ? "هندسة وتكنولوجيا الطيران" : "AVIATION ENGINEERING & TECHNOLOGY"}</small>
          </span>
        </a>

        <nav
          id="primary-navigation"
          className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}
        >
          {t.nav.map(([label, href], index) => (
            <motion.a
              key={href}
              href={href}
              onClick={onCloseMenu}
              className="nav-item"
              initial={false}
              animate={menuOpen && !reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: menuOpen && !reduceMotion ? index * 0.045 : 0 }}
              whileHover={reduceMotion ? undefined : { y: -1 }}
            >
              {label}
            </motion.a>
          ))}
          <a href="#contact" className="nav-contact" onClick={onCloseMenu}>
            <span>{t.contact}</span>
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>

        <div className="header-actions">
          <motion.button
            className="language-button"
            onClick={onChangeLocale}
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <Languages size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </motion.button>
          <motion.button
            className="menu-toggle"
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={onToggleMenu}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                className="menu-icon-wrap"
                initial={reduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.85 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {menuOpen ? <X size={21} strokeWidth={1.7} /> : <Menu size={21} strokeWidth={1.7} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>
    </>
  );
}
