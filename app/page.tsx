
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { leadershipProfile } from "@/data/leadership";
import { content, sourceUrl, type Locale } from "@/data/program-content";
import { answerQuestion } from "@/lib/program-assistant";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { ResourceCard } from "@/components/home/ResourceCard";
import { ObjectiveList } from "@/components/home/ObjectiveList";
import { HeroVisual } from "@/components/home/HeroVisual";
import { VisionMission } from "@/components/home/VisionMission";
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
  const [headerScrolled, setHeaderScrolled] = useState(false);
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
    if (!heroVisual.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".signal-orbit",
        { rotation: -12, scale: 0.96, opacity: 0.65 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".signal-node",
        { scale: 0.75, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          delay: 0.3,
          ease: "back.out(1.5)",
        },
      );

      gsap.fromTo(
        ".signal-paths path",
        { strokeDasharray: 620, strokeDashoffset: 620 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.12,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    }, heroVisual);

    return () => ctx.revert();
  }, [reducedMotion]);

  function sendQuestion(value = question) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const result = answerQuestion(trimmed, locale);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "assistant", text: result.text, url: result.url },
    ]);
    setQuestion("");
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
      <SiteHeader t={t} isAr={isAr} menuOpen={menuOpen} headerScrolled={headerScrolled} onChangeLocale={changeLocale} onToggleMenu={() => setMenuOpen((open) => !open)} onCloseMenu={() => setMenuOpen(false)} />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
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

      <section className="intro-section section-pad" id="program">
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
      </section>

      <section className="vision-section section-pad" id="vision-mission">
        <SectionIndex label={t.visionLabel} />
        <VisionMission vision={t.vision} visionText={t.visionText} mission={t.mission} missionText={t.missionText} reducedMotion={reducedMotion} />
      </section>

      <section className="objectives-section section-pad" id="objectives">
        <SectionIndex label={t.objectiveLabel} />
        <div className="objectives-heading">
          <h2>{t.objectiveTitle}</h2>
          <p>{t.objectiveIntro}</p>
        </div>
        <ObjectiveList objectives={t.objectives} reducedMotion={reducedMotion} isAr={isAr} />
      </section>

      <section className="academics-section section-pad" id="academic-resources">
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
      </section>

      <section className="leadership-section section-pad" id="leadership">
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
              <span>{isAr ? "الملف الأكاديمي" : "Academic profile"}</span>
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
      </section>

      <section className="next-step-section section-pad" id="learning-resources">
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
      </section>

      <section className="contact-section section-pad" id="contact">
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
      </section>

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
              </div>
              <div className="chat-suggestions">
                <span>{t.starter}</span>
                {t.questions.map((q) => (
                  <button key={q} onClick={() => sendQuestion(q)}>{q}</button>
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
                />
                <button type="submit" aria-label={t.send}><Send size={17} /></button>
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
