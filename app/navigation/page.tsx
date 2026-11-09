"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Languages, Radio } from "lucide-react";

const pages = {
  en: [
    ["01", "Program overview", "Purpose, identity and academic direction.", "/about", "THE PROGRAM"],
    ["02", "Academic program", "Study framework, regulations and course resources.", "/academics", "ACADEMICS"],
    ["03", "Faculty & staff", "Academic leadership, faculty and supporting staff.", "/faculty", "PEOPLE"],
    ["04", "Laboratories", "Practical learning spaces and technical facilities.", "/laboratories", "FACILITIES"],
    ["05", "Research & projects", "Research direction and graduation projects.", "/research", "RESEARCH"],
    ["06", "Student services", "Schedules, guides, announcements and student support.", "/students", "STUDENTS"],
    ["07", "Quality assurance", "Accreditation evidence and continuous improvement.", "/quality", "QUALITY"],
    ["08", "News & events", "Department announcements and academic activities.", "/news", "UPDATES"],
    ["09", "Alumni", "Graduate stories and professional connections.", "/alumni", "COMMUNITY"],
    ["10", "Contact", "Official institute contact details and department enquiries.", "/contact", "CONTACT"],
  ],
  ar: [
    ["01", "عن البرنامج", "هوية البرنامج وأهدافه وتوجهه الأكاديمي.", "/about", "البرنامج"],
    ["02", "البرنامج الأكاديمي", "الإطار الدراسي واللوائح ومصادر المقررات.", "/academics", "الدراسة"],
    ["03", "هيئة التدريس", "القيادة الأكاديمية وأعضاء هيئة التدريس والهيئة المعاونة.", "/faculty", "الأشخاص"],
    ["04", "المعامل", "مساحات التعلم العملي والإمكانات الفنية.", "/laboratories", "الإمكانات"],
    ["05", "البحث والمشروعات", "التوجه البحثي ومشروعات التخرج.", "/research", "البحث"],
    ["06", "الخدمات الطلابية", "الجداول والأدلة والإعلانات ودعم الطلاب.", "/students", "الطلاب"],
    ["07", "ضمان الجودة", "أدلة الاعتماد والتطوير المستمر.", "/quality", "الجودة"],
    ["08", "الأخبار والفعاليات", "إعلانات القسم والأنشطة الأكاديمية.", "/news", "التحديثات"],
    ["09", "الخريجون", "قصص الخريجين والتواصل المهني.", "/alumni", "المجتمع"],
    ["10", "تواصل معنا", "بيانات التواصل الرسمية واستفسارات القسم.", "/contact", "التواصل"],
  ],
} as const;

export default function NavigationPage() {
  const [isAr, setIsAr] = useState(false);
  const items = pages[isAr ? "ar" : "en"];

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
          <button className="language-button" onClick={() => setIsAr((value) => !value)} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}>
            <Languages size={17} aria-hidden="true" />{isAr ? "EN" : "عربي"}
          </button>
          <Link className="navigation-home-link" href="/">{isAr ? "الرئيسية" : "Home"} {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}</Link>
        </div>
      </header>
      <section className="navigation-hero">
        <div>
          <p className="navigation-eyebrow">{isAr ? "معهد هندسة وتكنولوجيا الطيران / دليل الموقع" : "INSTITUTE OF AVIATION ENGINEERING & TECHNOLOGY / SITE DIRECTORY"}</p>
          <h1>{isAr ? "كل صفحات البرنامج، في مكان واحد." : "A clearer route through the program."}</h1>
          <p className="navigation-intro">{isAr ? "انتقل مباشرة إلى الصفحات الأكاديمية والخدمية الخاصة ببرنامج هندسة الإلكترونيات والاتصالات." : "Explore the academic and student-facing sections of the Electronics & Communications Engineering Program."}</p>
        </div>
        <span className="navigation-count">10 <small>{isAr ? "صفحات" : "PAGES"}</small></span>
      </section>
      <section className="navigation-directory" aria-label={isAr ? "صفحات الموقع" : "Website pages"}>
        {items.map(([number, title, detail, href, tag]) => (
          <Link className="navigation-card" href={href} key={href}>
            <span className="navigation-card-number">{number}</span>
            <span className="navigation-card-copy"><small>{tag}</small><strong>{title}</strong><span>{detail}</span></span>
            <span className="navigation-card-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
          </Link>
        ))}
      </section>
      <footer className="navigation-footer">
        <span>© IAET · {isAr ? "برنامج هندسة الإلكترونيات والاتصالات" : "Electronics & Communications Engineering"}</span>
        <Link href="/">{isAr ? "العودة إلى الرئيسية" : "Back to homepage"}</Link>
      </footer>
    </main>
  );
}
