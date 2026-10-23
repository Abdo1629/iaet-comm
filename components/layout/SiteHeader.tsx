"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  Building2,
  Compass,
  GraduationCap,
  Languages,
  LibraryBig,
  Menu,
  Radio,
  Target,
  Users,
  X,
} from "lucide-react";

type Copy = {
  institution: string;
  nav: string[][];
  contact: string;
  menuLabel: string;
};

const iconForHref = (href: string) => {
  if (href.includes("vision") || href.includes("mission")) return Compass;
  if (href.includes("objective")) return Target;
  if (href.includes("academic") || href.includes("program")) return GraduationCap;
  if (href.includes("learning") || href.includes("resource")) return LibraryBig;
  if (href.includes("leadership")) return Users;
  if (href.includes("contact")) return Building2;
  return BookOpen;
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
  const navItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="announcement"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <span className="announcement-pulse" aria-hidden="true">
          <Radio size={13} />
        </span>
        <span>{t.institution}</span>
        <span className="announcement-divider" aria-hidden="true">/</span>
        <span className="announcement-program">
          {isAr ? "برنامج هندسة الإلكترونيات والاتصالات" : "Electronics & Communications Engineering"}
        </span>
        <span className="announcement-status">
          <span className="announcement-status-dot" />
          {isAr ? "الموقع الأكاديمي" : "ACADEMIC PORTAL"}
        </span>
      </motion.div>

      <motion.header
        className={`site-header ${headerScrolled ? "is-scrolled" : ""}`}
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="#top"
          className="brand"
          aria-label={t.institution}
          onClick={onCloseMenu}
          whileHover={reduceMotion ? undefined : { y: -1 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
        >
          <span className="brand-logo-wrap">
            <Image
              src="/brand/iaet-logo.png"
              alt="IAET"
              width={68}
              height={45}
              className="official-logo"
              priority
            />
            <span className="brand-logo-glint" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>IAET</strong>
            <small>{isAr ? "هندسة وتكنولوجيا الطيران" : "AVIATION ENGINEERING & TECHNOLOGY"}</small>
          </span>
        </motion.a>

        <nav
          id="primary-navigation"
          className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}
        >
          {t.nav.map(([label, href], index) => {
            const Icon = iconForHref(href);
            return (
              <motion.a
                key={href}
                href={href}
                onClick={onCloseMenu}
                className="nav-item"
                variants={navItem}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.12 + index * 0.045 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </motion.a>
            );
          })}
          <motion.a
            href="/navigation"
            className="nav-map-link"
            onClick={onCloseMenu}
            whileHover={reduceMotion ? undefined : { y: -2 }}
          >
            <Compass size={15} aria-hidden="true" />
            <span>{isAr ? "كل الأقسام" : "All sections"}</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="nav-contact"
            onClick={onCloseMenu}
            whileHover={reduceMotion ? undefined : { y: -2 }}
          >
            <span>{t.contact}</span>
            {isAr ? <ArrowDownLeft size={15} aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}
          </motion.a>
        </nav>

        <div className="header-actions">
          <motion.button
            className="language-button"
            onClick={onChangeLocale}
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <Languages size={16} aria-hidden="true" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </motion.button>
          <motion.button
            className="menu-toggle"
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={onToggleMenu}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={reduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotate: 35, scale: 0.8 }}
                transition={{ duration: 0.16 }}
                className="menu-icon-wrap"
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>
    </>
  );
}
