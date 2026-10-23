"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Languages, Radio } from "lucide-react";

const pages = {
  en: [
    { n: "01", title: "Program Overview", detail: "Discover the program and its academic direction.", href: "/#program", tag: "THE PROGRAM" },
    { n: "02", title: "Vision & Mission", detail: "The vision, mission and educational purpose.", href: "/#vision-mission", tag: "DIRECTION" },
    { n: "03", title: "Program Objectives", detail: "The capabilities and professional outcomes the program develops.", href: "/#objectives", tag: "OUTCOMES" },
    { n: "04", title: "Academic Resources", detail: "Program resources, specifications and academic references.", href: "/#academic-resources", tag: "ACADEMICS" },
    { n: "05", title: "Program Leadership", detail: "Leadership and academic responsibility.", href: "/#leadership", tag: "LEADERSHIP" },
    { n: "06", title: "Learning Resources", detail: "Continue exploring learning and program resources.", href: "/#learning-resources", tag: "LEARNING" },
    { n: "07", title: "Contact", detail: "Contact the program and find institutional links.", href: "/#contact", tag: "CONTACT" },
  ],
  ar: [
    { n: "01", title: "نبذة عن البرنامج", detail: "تعرّف على البرنامج وتوجهه الأكاديمي.", href: "/#program", tag: "البرنامج" },
    { n: "02", title: "الرؤية والرسالة", detail: "الرؤية والرسالة والهدف التعليمي للبرنامج.", href: "/#vision-mission", tag: "التوجه" },
    { n: "03", title: "أهداف البرنامج", detail: "المهارات والمخرجات المهنية التي يعمل البرنامج على تطويرها.", href: "/#objectives", tag: "المخرجات" },
    { n: "04", title: "المصادر الأكاديمية", detail: "مصادر البرنامج والمواصفات والمراجع الأكاديمية.", href: "/#academic-resources", tag: "الأكاديميات" },
    { n: "05", title: "قيادة البرنامج", detail: "القيادة والمسؤوليات الأكاديمية.", href: "/#leadership", tag: "القيادة" },
    { n: "06", title: "مصادر التعلم", detail: "استكشف المزيد من مصادر التعلم والبرنامج.", href: "/#learning-resources", tag: "التعلم" },
    { n: "07", title: "تواصل معنا", detail: "وسائل التواصل وروابط المعهد الرسمية.", href: "/#contact", tag: "التواصل" },
  ],
} as const;

export default function NavigationPage() {
  const [isAr, setIsAr] = useState(false);
  const [year, setYear] = useState(2026);
  const reducedMotion = useReducedMotion();
  const t = pages[isAr ? "ar" : "en"];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [isAr]);

  return (
    <main className="navigation-page">
      <header className="navigation-header">
        <Link href="/" className="navigation-brand" aria-label="IAET home">
          <span className="navigation-brand-icon"><Radio size={24} aria-hidden="true" /></span>
          <span><strong>IAET</strong><small>{isAr ? "هندسة وتكنولوجيا الطيران" : "AVIATION ENGINEERING & TECHNOLOGY"}</small></span>
        </Link>
        <div className="navigation-header-actions">
          <button className="language-button" onClick={() => setIsAr((v) => !v)} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}>
            <Languages size={17} aria-hidden="true" />{isAr ? "EN" : "عربي"}
          </button>
          <Link className="navigation-home-link" href="/">{isAr ? "الرئيسية" : "Home"} {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}</Link>
        </div>
      </header>

      <section className="navigation-hero">
        <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="navigation-eyebrow">{isAr ? "معهد هندسة وتكنولوجيا الطيران / دليل الموقع" : "INSTITUTE OF AVIATION ENGINEERING & TECHNOLOGY / SITE DIRECTORY"}</p>
          <h1>{isAr ? "كل ما تبحث عنه، في مكان واحد." : "Explore the program."}</h1>
          <p className="navigation-intro">{isAr ? "انتقل مباشرة إلى أقسام برنامج هندسة الإلكترونيات والاتصالات." : "A clear route to every section of the Electronics & Communications Engineering Program."}</p>
        </motion.div>
        <span className="navigation-count">07 <small>{isAr ? "أقسام" : "SECTIONS"}</small></span>
      </section>

      <section className="navigation-directory" aria-label={isAr ? "أقسام الموقع" : "Website sections"}>
        {t.map((item, index) => (
          <motion.div key={item.n} initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: index * 0.045 }}>
            <Link className="navigation-card" href={item.href}>
              <span className="navigation-card-number">{item.n}</span>
              <span className="navigation-card-copy"><small>{item.tag}</small><strong>{item.title}</strong><span>{item.detail}</span></span>
              <span className="navigation-card-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
            </Link>
          </motion.div>
        ))}
      </section>

      <footer className="navigation-footer">
        <span>© {year} IAET · {isAr ? "برنامج هندسة الإلكترونيات والاتصالات" : "Electronics & Communications Engineering"}</span>
        <Link href="/">{isAr ? "العودة إلى الرئيسية" : "Back to homepage"}</Link>
      </footer>
    </main>
  );
}
