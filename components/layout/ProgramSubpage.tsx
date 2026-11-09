"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, MessageCircle, Send, X } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { content, type Locale } from "@/data/program-content";
import { sitePages, type SitePageSlug } from "@/data/site-pages";

type ChatMessage = { role: "assistant" | "user"; text: string; url?: string };

export function ProgramSubpage({ slug }: { slug: SitePageSlug }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const isAr = locale === "ar";
  const t = content[locale];
  const page = sitePages[slug][locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [locale, isAr]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleChat() {
    if (!chatOpen && messages.length === 0) {
      setMessages([{ role: "assistant", text: isAr ? "أهلًا بك. اسألني عن برنامج الإلكترونيات والاتصالات أو عن خدمات ومصادر IAET." : "Welcome. Ask me about the Electronics & Communications Program or IAET services and resources." }]);
    }
    setChatOpen((open) => !open);
  }

  async function sendQuestion(value = question) {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setQuestion("");
    setLoading(true);
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
      setMessages((current) => [...current, { role: "assistant", text: data.answer || "", url: firstLink?.url }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      setMessages((current) => [...current, { role: "assistant", text: isAr ? "تعذر الحصول على رد موثوق الآن. حاول مرة أخرى أو تواصل مع المعهد." : "I couldn't retrieve a reliable answer right now. Please try again or contact IAET." }]);
      console.error("IAET assistant:", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell subpage-shell">
      <SiteHeader
        t={t}
        isAr={isAr}
        menuOpen={false}
        headerScrolled={scrolled}
        activeSection={slug}
        onChangeLocale={() => setLocale((current) => current === "en" ? "ar" : "en")}
        onToggleMenu={() => {}}
        onCloseMenu={() => {}}
      />

      <section className="subpage-hero">
        <div className="subpage-hero-grid" aria-hidden="true" />
        <div className="subpage-hero-inner">
          <div className="subpage-hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="subpage-lead">{page.description}</p>
            <div className="subpage-hero-actions">
              <Link className="button button-light" href="/">{isAr ? "العودة للرئيسية" : "Back to homepage"} {isAr ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</Link>
              <Link className="subpage-text-link" href="/navigation">{isAr ? "دليل الموقع" : "Site directory"} <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="subpage-index-visual" aria-hidden="true">
            <span>IAET</span><i /><b /><small>ECE / {String(page.eyebrow).split("/")[0].trim()}</small>
          </div>
        </div>
      </section>

      <section className="subpage-content section-pad">
        <div className="subpage-content-heading">
          <span>{isAr ? "استكشف القسم" : "EXPLORE THIS SECTION"}</span>
          <p>{isAr ? "محتوى منظم وروابط واضحة للمعلومات الأكاديمية والخدمات ذات الصلة." : "Structured information and clear routes to related academic content and services."}</p>
        </div>
        <div className="subpage-sections">
          {page.sections.map((section, index) => (
            <article className="subpage-section" key={section.title}>
              <div className="subpage-section-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="subpage-section-body">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                {section.items?.length ? (
                  <div className="subpage-cards">
                    {section.items.map((item) => (
                      <div className="subpage-card" key={item.title}>
                        <span className="subpage-card-mark" aria-hidden="true" />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.href && (
                          item.external || item.href.startsWith("http") || item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? (
                            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="subpage-card-link">
                              {isAr ? "فتح الرابط" : "Open resource"} <ExternalLink size={14} />
                            </a>
                          ) : (
                            <Link href={item.href} className="subpage-card-link">{isAr ? "استكشف التفاصيل" : "Explore details"} <ArrowUpRight size={14} /></Link>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        {page.note && <aside className="subpage-note"><strong>{isAr ? "ملاحظة حول اعتماد المحتوى" : "CONTENT VERIFICATION"}</strong><p>{page.note}</p></aside>}
      </section>

      <section className="subpage-cta section-pad">
        <div>
          <span>{isAr ? "IAET / الإلكترونيات والاتصالات" : "IAET / ELECTRONICS & COMMUNICATIONS"}</span>
          <h2>{isAr ? "هل تبحث عن معلومة أخرى؟" : "Looking for something else?"}</h2>
          <p>{isAr ? "استخدم دليل الموقع للوصول إلى بقية صفحات البرنامج، أو تواصل مع المعهد عبر قنواته الرسمية." : "Use the site directory to explore the rest of the program website, or contact the institute through its official channels."}</p>
        </div>
        <Link href="/navigation" className="button button-light">{isAr ? "استكشف كل الصفحات" : "Explore all pages"} <ArrowUpRight size={16} /></Link>
      </section>

      <SiteFooter t={t} />

      <div className="chat-widget">
        {chatOpen && (
          <section className="chat-panel" aria-label={t.assistant}>
            <div className="chat-header">
              <div className="chat-avatar"><MessageCircle size={20} /></div>
              <div><strong>{t.assistant}</strong><span>{t.assistantDescription}</span></div>
              <button onClick={() => setChatOpen(false)} aria-label={t.close}><X size={19} /></button>
            </div>
            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div className={`chat-message ${message.role}`} key={`${index}-${message.role}`}>
                  <p>{message.text}</p>
                  {message.url && <a href={message.url} target="_blank" rel="noreferrer">{t.source} <ExternalLink size={13} /></a>}
                </div>
              ))}
              {loading && <div className="chat-message assistant chat-typing" role="status"><span /><span /><span /></div>}
            </div>
            <div className="chat-suggestions">
              <span>{t.starter}</span>
              {t.questions.map((item) => <button key={item} onClick={() => sendQuestion(item)} disabled={loading}>{item}</button>)}
            </div>
            <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendQuestion(); }}>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} aria-label={t.placeholder} maxLength={1200} disabled={loading} />
              <button type="submit" aria-label={t.send} disabled={loading || !question.trim()}>{loading ? <span className="chat-send-loader" /> : <Send size={17} />}</button>
            </form>
          </section>
        )}
        <button className="chat-launcher" onClick={toggleChat} aria-label={chatOpen ? t.close : t.openAssistant} aria-expanded={chatOpen}>
          {chatOpen ? <X size={23} /> : <MessageCircle size={23} />}
        </button>
      </div>
    </main>
  );
}
