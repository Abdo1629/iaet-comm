
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { leadershipProfile } from "@/data/leadership";
import { content, sourceUrl, type Locale } from "@/data/program-content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { ResourceCard } from "@/components/home/ResourceCard";
import { ObjectiveList } from "@/components/home/ObjectiveList";
import { HeroVisual } from "@/components/home/HeroVisual";
import { VisionMission } from "@/components/home/VisionMission";
import { EngineeringJourney } from "@/components/home/EngineeringJourney";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [formState, setFormState] = useState<"idle" | "ready">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<
    { role: "assistant" | "user"; text: string; url?: string }[]
  >([]);
  const heroVisual = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const t = content[locale];
  const isAr = locale === "ar";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [locale, isAr]);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "aviation-connection", "engineering-journey", "program", "vision-mission", "objectives", "academic-resources", "leadership", "learning-resources", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroVisual.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroVisual.current,
        { opacity: 0, x: isAr ? -24 : 24, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-copy > *",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.1,
          delay: 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-plane",
        { opacity: 0, y: 34, scale: 0.94 },
        { opacity: 0.45, y: 0, scale: 1, duration: 1.5, delay: 0.18, ease: "power3.out" },
      );

      gsap.fromTo(
        ".radar-screen",
        { opacity: 0, scale: 0.72, rotate: -18 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.05, delay: 0.48, ease: "back.out(1.35)" },
      );

      gsap.fromTo(
        [".hero-flight-tag", ".hero-signal-tag"],
        { opacity: 0, y: 18, x: isAr ? -14 : 14 },
        { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.16, delay: 0.55, ease: "power3.out" },
      );

      gsap.fromTo(
        ".radar-target",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, stagger: 0.16, delay: 0.9, ease: "back.out(2)" },
      );
    }, heroVisual.current.closest(".hero") ?? undefined);

    return () => ctx.revert();
  }, [reducedMotion, isAr]);

  async function sendQuestion(value = question) {
    const trimmed = value.trim();
    if (!trimmed || chatLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setQuestion("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, locale, history: messages.slice(-8).map(({ role, text }) => ({ role, text })) }),
        signal: AbortSignal.timeout(26000),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Assistant unavailable");
      const firstLink = Array.isArray(data.links) ? data.links[0] : undefined;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer, url: firstLink?.url },
      ]);
    } catch (error) {
      const message = error instanceof Error && error.name === "TimeoutError"
        ? (isAr ? "الرد اتأخر عن الوقت المحدد. حاول مرة تانية بعد قليل." : "The response timed out. Please try again shortly.")
        : error instanceof Error ? error.message : "Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: isAr
            ? `حصلت مشكلة مؤقتة: ${message}`
            : `A temporary issue occurred: ${message}`,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function changeLocale() {
    setLocale((current) => (current === "en" ? "ar" : "en"));
    setMenuOpen(false);
  }

  function toggleChat() {
    if (!chatOpen && messages.length === 0) {
      setMessages([{ role: "assistant", text: t.greeting }]);
    }
    setChatOpen(!chatOpen);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = t.formRequired;
    if (!email) errors.email = t.formRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t.formEmailInvalid;
    if (!message) errors.message = t.formRequired;

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormState("idle");
      return;
    }

    const subject = String(form.get("subject") ?? t.contact);
    const body = `${t.formName}: ${name}\n${t.formEmail}: ${email}\n\n${message}`;
    setFormState("ready");
    window.location.href = `mailto:info@iaet.edu.eg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="site-shell">
      <SiteHeader t={t} isAr={isAr} menuOpen={menuOpen} headerScrolled={headerScrolled} activeSection={activeSection} onChangeLocale={changeLocale} onToggleMenu={() => setMenuOpen((open) => !open)} onCloseMenu={() => setMenuOpen(false)} />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              {t.eyebrow}
            </div>
            <h1>{t.headline}</h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <a className="button button-light" href="#program">
                {t.explore}
                {isAr ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
              </a>
              <a className="text-link text-link-light" href="#academic-resources">
                {t.resources}
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <span className="meta-index">01 — 07</span>
              <span className="meta-rule" />
              <span>{t.program}</span>
            </div>
          </motion.div>

          <HeroVisual ref={heroVisual} label={t.program} />
        </div>

        <a className="scroll-cue" href="#program">
          <span>{t.scroll}</span>
          <ChevronDown size={15} />
        </a>
      </section>

      <motion.section
        className="aviation-showcase"
        id="aviation-connection"
        initial={reducedMotion ? false : { opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="showcase-heading">
          <div className="showcase-kicker"><span /> {isAr ? "هندسة واحدة — عالمان متصلان" : "ONE DISCIPLINE — TWO CONNECTED WORLDS"}</div>
          <h2>{isAr ? <>من قمرة القيادة إلى <em>شبكات الاتصال.</em></> : <>From the flight deck to <em>the signal network.</em></>}</h2>
          <p>{isAr ? "في بيئة هندسة الطيران، لا تعمل الإلكترونيات والاتصالات في فراغ؛ إنها جزء من الأنظمة التي تساعد الطائرات والمطارات على تبادل البيانات والتواصل ومتابعة الحركة." : "In an aviation engineering environment, electronics and communications are not abstract ideas. They are part of the systems that help aircraft and airports exchange data, communicate and understand movement."}</p>
        </div>
        <div className="showcase-visual-grid">
          <a className="showcase-image-card showcase-aircraft" href="https://commons.wikimedia.org/wiki/File:Boeing_787_front_view.jpg" target="_blank" rel="noreferrer">
            <div className="showcase-image-bg" />
            <div className="showcase-image-shade" />
            <span className="showcase-card-index">01 / AIRCRAFT</span>
            <div className="showcase-card-copy">
              <span>{isAr ? "الطيران" : "THE AIRCRAFT"}</span>
              <strong>{isAr ? "أنظمة الطيران" : "Aircraft systems"}</strong>
              <small>{isAr ? "إلكترونيات • بيانات • أنظمة مدمجة" : "Electronics · Data · Embedded systems"}</small>
            </div>
            <span className="showcase-open">↗</span>
            <span className="showcase-credit">Photo: AlexanderCraker / CC BY-SA 4.0</span>
          </a>
          <a className="showcase-image-card showcase-radar" href="https://commons.wikimedia.org/wiki/File:Cancun_International_Airport%27s_air_traffic_control_tower_and_a_radar_dome.jpg" target="_blank" rel="noreferrer">
            <div className="showcase-image-bg" />
            <div className="showcase-image-shade" />
            <span className="showcase-card-index">02 / SURVEILLANCE</span>
            <div className="showcase-card-copy">
              <span>{isAr ? "المراقبة الجوية" : "AIRSPACE AWARENESS"}</span>
              <strong>{isAr ? "الرادار وتتبع الحركة" : "Radar & tracking"}</strong>
              <small>{isAr ? "استشعار • إشارات • معالجة بيانات" : "Sensing · Signals · Data processing"}</small>
            </div>
            <span className="showcase-open">↗</span>
            <span className="showcase-credit">Photo: Oleg Yunakov / CC BY-SA 4.0</span>
          </a>
          <div className="showcase-signal-card">
            <div className="signal-card-orbit"><span /><span /><span /><i /></div>
            <div className="signal-card-top"><span className="signal-card-live" /> {isAr ? "عالم الإشارات" : "THE SIGNAL LAYER"}</div>
            <div className="signal-card-wave">
              <svg viewBox="0 0 500 130" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 65 C35 65 35 16 70 16 S105 114 140 114 S175 65 210 65 S245 16 280 16 S315 114 350 114 S385 65 420 65 S455 65 500 65" />
              </svg>
            </div>
            <div className="showcase-card-copy">
              <span>{isAr ? "الاتصالات" : "COMMUNICATION"}</span>
              <strong>{isAr ? "كل رحلة تبدأ بإشارة" : "Every journey carries a signal"}</strong>
              <small>{isAr ? "اتصال • ترددات • شبكات" : "Connectivity · Frequencies · Networks"}</small>
            </div>
            <span className="showcase-credit">{isAr ? "تصوير بصري تجريدي — ليس صورة لمعمل بالمعهد" : "Abstract visual — not a photograph of an IAET facility"}</span>
          </div>
        </div>
        <div className="showcase-footnote">
          <span>{isAr ? "الصورتان توضيحيتان لعالم الطيران والمراقبة الجوية، وليستا توثيقًا لمنشآت IAET." : "Illustrative aviation and airspace imagery — not a depiction of IAET facilities."}</span>
          <span>IAET / ECE <b>•</b> ELECTRONICS × COMMUNICATIONS × AVIATION</span>
        </div>
      </motion.section>

      <EngineeringJourney isAr={isAr} reducedMotion={reducedMotion} />

      <motion.section className="intro-section section-pad" id="program" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <SectionIndex label={t.aboutEyebrow} />
        <div className="intro-layout">
          <h2>{t.aboutTitle}</h2>
          <div className="intro-copy">
            <p>{t.aboutDescription}</p>
            <div className="intro-note">
              <Check size={17} />
              <span>{t.aboutNote}</span>
            </div>
          </div>
        </div>
        <div className="intro-bottom">
          <span>IAET — ECE</span>
          <span>ENGINEERING / COMMUNICATION / SYSTEMS</span>
        </div>
      </motion.section>

      <motion.section className="vision-section section-pad" id="vision-mission" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <SectionIndex label={t.visionLabel} />
        <VisionMission vision={t.vision} visionText={t.visionText} mission={t.mission} missionText={t.missionText} reducedMotion={reducedMotion} />
      </motion.section>

      <motion.section className="objectives-section section-pad" id="objectives" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <SectionIndex label={t.objectiveLabel} />
        <div className="objectives-heading">
          <h2>{t.objectiveTitle}</h2>
          <p>{t.objectiveIntro}</p>
        </div>
        <ObjectiveList objectives={t.objectives} reducedMotion={reducedMotion} isAr={isAr} />
      </motion.section>

      <motion.section className="academics-section section-pad" id="academic-resources" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <SectionIndex label={t.academicLabel} />
        <div className="academics-heading">
          <h2>{t.academicTitle}</h2>
          <p>{t.academicIntro}</p>
        </div>
        <div className="resource-grid">
          {t.resourceGroups.map((group, index) => (
            <ResourceCard key={group.title} group={group} index={index} reducedMotion={reducedMotion} isAr={isAr} officialPage={t.officialPage} />
          ))}
        </div>
      </motion.section>

      <motion.section className="leadership-section section-pad" id="leadership" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="leadership-mark" aria-hidden="true">
          <Sparkles size={30} strokeWidth={1.2} />
        </div>
        <div className="leadership-content">
        <SectionIndex label={t.leadershipLabel} />
          <h2>{t.leadershipTitle}</h2>
          <p>{t.leadershipText}</p>
          <div className="profile-summary">
            <div>
              <strong>{leadershipProfile.name}</strong>
              <span>{isAr ? "رئيس قسم هندسة الإلكترونيات والاتصالات" : "Head of Electronics & Communications Engineering Department"}</span>
            </div>
            <p>{leadershipProfile.summary}</p>
          </div>
          <div className="profile-details">
            <div>
              <h3>{t.education}</h3>
              <ul>{leadershipProfile.education.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>{t.research}</h3>
              <ul>{leadershipProfile.research.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <a className="text-link" href={sourceUrl[locale]} target="_blank" rel="noreferrer">
            {t.readMessage}
            {isAr ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
          </a>
        </div>
      </motion.section>

      <motion.section className="next-step-section section-pad" id="learning-resources" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <div className="next-step-inner">
          <div>
            <div className="eyebrow next-eyebrow">
              <span className="eyebrow-line" />
              {t.learningLabel}
            </div>
            <h2>{t.learningTitle}</h2>
            <p>{t.learningText}</p>
          </div>
          <a className="button button-light" href={sourceUrl[locale]} target="_blank" rel="noreferrer">
            {t.openProgram}
            {isAr ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
          </a>
        </div>
      </motion.section>

      <motion.section className="contact-section section-pad" id="contact" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: "easeOut" }}>
        <SectionIndex label={t.contactLabel} />
        <div className="contact-layout">
          <h2>{t.contactTitle}</h2>
          <div className="contact-details">
            <div className="contact-item">
              <span>{t.email}</span>
              <a href="mailto:info@iaet.edu.eg">info@iaet.edu.eg</a>
            </div>
            <div className="contact-item">
              <span>{t.phone}</span>
              <a href="tel:+20233594060">02 33594060</a>
            </div>
            <div className="contact-item">
              <span>{isAr ? "العنوان" : "Address"}</span>
              <p>{t.address}</p>
            </div>
            <a className="text-link" href="https://iaet.edu.eg/" target="_blank" rel="noreferrer">
              {t.contactUs}
              {isAr ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact} noValidate>
          <div className="form-grid">
            <label>
              <span>{t.formName}</span>
              <input name="name" type="text" autoComplete="name" aria-invalid={Boolean(formErrors.name)} />
              {formErrors.name && <small>{formErrors.name}</small>}
            </label>
            <label>
              <span>{t.formEmail}</span>
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(formErrors.email)} />
              {formErrors.email && <small>{formErrors.email}</small>}
            </label>
          </div>
          <label>
            <span>{t.formSubject}</span>
            <select name="subject" defaultValue="">
              <option value="" disabled>{t.formSubjectPlaceholder}</option>
              {t.formOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            <span>{t.formMessage}</span>
            <textarea name="message" rows={5} aria-invalid={Boolean(formErrors.message)} />
            {formErrors.message && <small>{formErrors.message}</small>}
          </label>
          <div className="form-actions">
            <button className="button button-dark" type="submit">{t.formSubmit}<Send size={16} /></button>
            <span className="form-status" role="status">
              {formState === "ready" ? `${t.formReady} ${t.formUnavailable}` : ""}
            </span>
          </div>
        </form>
      </motion.section>

      <SiteFooter t={t} />

      <div className="chat-widget">
        <AnimatePresence>
          {chatOpen && (
            <motion.section
              className="chat-panel"
              initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              aria-label={t.assistant}
            >
              <div className="chat-header">
                <div className="chat-avatar"><MessageCircle size={20} /></div>
                <div>
                  <strong>{t.assistant}</strong>
                  <span>{t.assistantDescription}</span>
                </div>
                <button onClick={() => setChatOpen(false)} aria-label={t.close}>
                  <X size={19} />
                </button>
              </div>
              <div className="chat-messages" aria-live="polite">
                {messages.map((message, index) => (
                  <div className={`chat-message ${message.role}`} key={`${index}-${message.role}`}>
                    <p>{message.text}</p>
                    {message.url && (
                      <a href={message.url} target="_blank" rel="noreferrer">
                        {t.source} <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                ))}
                {chatLoading && <div className="chat-message assistant chat-typing" role="status"><span /><span /><span /></div>}
              </div>
              <div className="chat-suggestions">
                <span>{t.starter}</span>
                {t.questions.map((q) => (
                  <button key={q} onClick={() => sendQuestion(q)} disabled={chatLoading}>{q}</button>
                ))}
              </div>
              <form
                className="chat-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendQuestion();
                }}
              >
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                  maxLength={1200}
                  disabled={chatLoading}
                />
                <button type="submit" aria-label={t.send} disabled={chatLoading || !question.trim()}>{chatLoading ? <span className="chat-send-loader" /> : <Send size={17} />}</button>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
        <button
          className="chat-launcher"
          onClick={toggleChat}
          aria-label={chatOpen ? t.close : t.openAssistant}
          aria-expanded={chatOpen}
        >
          {chatOpen ? <X size={23} /> : <MessageCircle size={23} />}
        </button>
      </div>
    </main>
  );
}
