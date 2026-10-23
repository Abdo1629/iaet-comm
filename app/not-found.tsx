"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, Home, Radio } from "lucide-react";

export default function NotFound() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="not-found-page">
      <header className="not-found-header">
        <Link href="/" className="navigation-brand" aria-label="IAET home">
          <span className="navigation-brand-icon"><Radio size={24} aria-hidden="true" /></span>
          <span><strong>IAET</strong><small>AVIATION ENGINEERING & TECHNOLOGY</small></span>
        </Link>
        <Link href="/navigation" className="navigation-home-link">Site directory <Compass size={16} aria-hidden="true" /></Link>
      </header>

      <section className="not-found-content">
        <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="not-found-code">404</span>
          <span className="not-found-rule" />
          <p className="navigation-eyebrow">IAET / PAGE NOT FOUND</p>
          <h1>This page is off the map.</h1>
          <p className="not-found-description">The page you’re looking for may have moved or the address may be incorrect. Return to the program homepage or browse the site directory.</p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-primary"><Home size={17} aria-hidden="true" /> Go to homepage <ArrowLeft size={16} aria-hidden="true" /></Link>
            <Link href="/navigation" className="not-found-secondary">Explore all sections <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </motion.div>
        <div className="not-found-orbit" aria-hidden="true"><span /><span /><span /><i /></div>
      </section>
      <footer className="navigation-footer"><span>© IAET · Electronics & Communications Engineering</span><span>Institute of Aviation Engineering & Technology</span></footer>
    </main>
  );
}
