
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { leadershipProfile } from "@/data/leadership";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { ResourceCard } from "@/components/home/ResourceCard";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cpu,
  ExternalLink,
  MessageCircle,
  Network,
  Radio,
  Send,
  Signal,
  Sparkles,
  Target,
  X,
} from "lucide-react";

type Locale = "en" | "ar";

const content = {
  en: {
    institution: "Institute of Aviation Engineering & Technology",
    program: "Electronics & Communications Engineering",
    nav: [
      ["About", "#program"],
      ["Vision & Mission", "#vision-mission"],
      ["Objectives", "#objectives"],
      ["Academics", "#academic-resources"],
      ["Leadership", "#leadership"],
    ],
    contact: "Contact",
    eyebrow: "IAET · ENGINEERING PROGRAM",
    headline: "Every signal begins a connection.",
    heroDescription:
      "Explore the vision, objectives and academic resources of the Electronics & Communications Engineering Program at IAET.",
    explore: "Explore the program",
    resources: "Academic resources",
    scroll: "SCROLL TO EXPLORE",
    aboutEyebrow: "01 / THE PROGRAM",
    aboutTitle: "Engineering ideas into connected systems.",
    aboutDescription:
      "Explore the program’s vision, mission, objectives and academic resources in one clear, connected experience.",
    aboutNote: "Official information, made easier to explore.",
    vision: "Vision",
    visionText:
      "That the electronic engineering and communications program achieve leadership at the local and regional levels in accordance with comprehensive quality standards in the fields of teaching, learning, scientific research and community services.",
    mission: "Mission",
    missionText:
      "To provide the educational, training and research environment appropriate for students of electronics engineering and communications program. To enable students to keep abreast of rapid developments in technology, compete locally and regionally, and contribute to community service and environmental development within the framework of values and ethics.",
    visionLabel: "02 / DIRECTION",
    objectiveLabel: "03 / PROGRAM OBJECTIVES",
    objectiveTitle: "Knowledge, analysis and responsibility.",
    objectiveIntro:
      "Build a foundation in engineering analysis, technical development, problem-solving and professional practice.",
    objectives: [
      "Use analysis and simulation tools from engineering science and mathematics.",
      "Identify and develop technologies across electronics and communications engineering.",
      "Formulate and solve engineering problems through analytical thinking, scientific research and creativity.",
      "Work in multidisciplinary environments and communicate effectively.",
      "Lead and assume responsibility with professional ethics and respect for intellectual rights.",
    ],
    academicLabel: "04 / ACADEMIC RESOURCES",
    academicTitle: "Find the information you need.",
    academicIntro:
      "Explore program information, academic documents, student resources and research.",
    resourceGroups: [
      {
        title: "Program information",
        description: "Program overview, staff and organizational information.",
        links: [
          ["Program overview", "#program"],
          ["Staff & teaching assistants", "https://www.iaet.edu.eg/comm"],
          ["Program competences", "https://www.iaet.edu.eg/comm"],
        ],
      },
      {
        title: "Academic documents",
        description: "Published regulations, specifications and student resources.",
        links: [
          ["Internal regulations", "https://www.iaet.edu.eg/comm"],
          ["Program & course specifications", "https://www.iaet.edu.eg/comm"],
          ["Student guide", "https://www.iaet.edu.eg/comm"],
        ],
      },
      {
        title: "Research & updates",
        description: "Reach official research, laboratory and program-news sections.",
        links: [
          ["Research plan", "https://www.iaet.edu.eg/comm"],
          ["Laboratories", "https://www.iaet.edu.eg/comm"],
          ["Program news", "https://www.iaet.edu.eg/comm"],
        ],
      },
    ],
    officialPage: "Open official page",
    leadershipLabel: "05 / PROGRAM LEADERSHIP",
    leadershipTitle: "A shared commitment to engineering education.",
    leadershipText:
      "Explore the academic profile and research interests of Dr. Mohammed Sobhy El-Bakry.",
    readMessage: "Read the official message",
    learningLabel: "06 / YOUR NEXT STEP",
    learningTitle: "Continue exploring the program.",
    learningText:
      "Explore the program, academic resources and ways to connect with the institute.",
    openProgram: "Visit official program page",
    contactUs: "Contact IAET",
    contactLabel: "07 / CONTACT",
    contactTitle: "Connect with the institute.",
    address: "Al Matar, Imbaba, Giza Governorate, Egypt",
    email: "Email",
    phone: "Telephone",
    footerNote: "Engineering, knowledge and connection in one digital experience.",
    footerDisclaimer:
      "",
    assistant: "IAET Program Assistant",
    assistantDescription:
      "I can help you locate published program information.",
    starter: "Suggested questions",
    questions: [
      "What is the program vision?",
      "What are the program objectives?",
      "Where can I find academic resources?",
      "How do I contact IAET?",
    ],
    placeholder: "Ask about the program...",
    send: "Send",
    source: "Official source",
    unknown:
      "Explore the program pages or contact the institute for further information.",
    greeting:
      "Hello! Ask me about the published program vision, objectives, academic resources or contact information.",
    close: "Close assistant",
    openAssistant: "Open program assistant",
    menuLabel: "Open navigation menu",
    proposed: "PROPOSED DESIGN",
    formName: "Full name",
    formEmail: "Email address",
    formSubject: "Inquiry category",
    formMessage: "Message",
    formSubjectPlaceholder: "Choose a category",
    formOptions: ["General enquiry", "Academic information", "Student resources", "Other"],
    formSubmit: "Prepare email",
    formRequired: "Please complete this field.",
    formEmailInvalid: "Enter a valid email address.",
    formUnavailable:
      "Your email application will open with the message prepared for review and sending.",
    formReady: "Your email draft is ready. Please review it before sending.",
    education: "Education",
    research: "Research interests",
    profileNote: "Edited from the supplied CV; current title and publication details require institutional confirmation.",
    footerNav: "Quick navigation",
    officialWebsite: "Official IAET website",
    backTop: "Back to top",
  },
  ar: {
    institution: "معهد هندسة وتكنولوجيا الطيران",
    program: "برنامج هندسة الإلكترونيات والاتصالات",
    nav: [
      ["عن البرنامج", "#program"],
      ["الرؤية والرسالة", "#vision-mission"],
      ["الأهداف", "#objectives"],
      ["المصادر الأكاديمية", "#academic-resources"],
      ["قيادة البرنامج", "#leadership"],
    ],
    contact: "تواصل معنا",
    eyebrow: "معهد إمبابة · برنامج هندسي",
    headline: "من الإشارة تبدأ الحكاية، ومن الهندسة يتصل العالم.",
    heroDescription:
      "تعرّف على الرؤية والأهداف والمصادر الأكاديمية المنشورة لبرنامج هندسة الإلكترونيات والاتصالات بمعهد هندسة وتكنولوجيا الطيران.",
    explore: "اكتشف البرنامج",
    resources: "المصادر الأكاديمية",
    scroll: "اكتشف المزيد",
    aboutEyebrow: "01 / البرنامج",
    aboutTitle: "من الأفكار الهندسية إلى الأنظمة المترابطة.",
    aboutDescription:
      "اكتشف رؤية البرنامج ورسالته وأهدافه ومصادره الأكاديمية في تجربة رقمية واضحة ومترابطة.",
    aboutNote: "معلومات رسمية، في تجربة أسهل للاستكشاف.",
    vision: "الرؤية",
    visionText:
      "أن يحقق برنامج الهندسة الإلكترونية والاتصالات الريادة على المستوى المحلي والإقليمي وفق معايير الجودة الشاملة في مجالات التعليم والتعلم والبحث العلمي وخدمة المجتمع.",
    mission: "الرسالة",
    missionText:
      "توفير البيئة التعليمية والتدريبية والبحثية المناسبة لطلاب برنامج هندسة الإلكترونيات والاتصالات. وتمكين الطلاب من مواكبة التطورات السريعة في التكنولوجيا والمنافسة محليًا وإقليميًا والقدرة على المساهمة في خدمة المجتمع وتنمية البيئة في إطار القيم والأخلاق.",
    visionLabel: "02 / التوجه",
    objectiveLabel: "03 / أهداف البرنامج",
    objectiveTitle: "معرفة وتحليل ومسؤولية.",
    objectiveIntro:
      "يجمع البرنامج بين التحليل الهندسي والتطوير التقني وحل المشكلات والممارسة المهنية.",
    objectives: [
      "استخدام أدوات التحليل والمحاكاة في العلوم الهندسية والرياضيات.",
      "تحديد وتطوير التقنيات في مجالات هندسة الإلكترونيات والاتصالات.",
      "صياغة المشكلات الهندسية وحلها من خلال التفكير التحليلي والبحث العلمي والإبداع.",
      "العمل في بيئات متعددة التخصصات والتواصل بفاعلية مع الآخرين.",
      "القيادة وتحمل المسؤولية مع الالتزام بالأخلاقيات المهنية واحترام حقوق الملكية الفكرية.",
    ],
    academicLabel: "04 / المصادر الأكاديمية",
    academicTitle: "اعثر على المعلومات التي تحتاجها.",
    academicIntro:
      "استكشف معلومات البرنامج واللوائح الأكاديمية والمصادر الطلابية والبحثية.",
    resourceGroups: [
      {
        title: "معلومات البرنامج",
        description: "نبذة عن البرنامج وأعضاء هيئة التدريس والهيكل التنظيمي.",
        links: [
          ["الصفحة الرسمية للبرنامج", "https://iaet.edu.eg/ar/comm"],
          ["أعضاء هيئة التدريس والهيئة المعاونة", "https://iaet.edu.eg/ar/comm"],
          ["كفاءات البرنامج", "https://iaet.edu.eg/ar/comm"],
        ],
      },
      {
        title: "المستندات الأكاديمية",
        description: "اللوائح والمواصفات والمصادر الطلابية المنشورة.",
        links: [
          ["اللائحة الداخلية", "https://iaet.edu.eg/ar/comm"],
          ["مواصفات البرنامج والمقررات", "https://iaet.edu.eg/ar/comm"],
          ["دليل الطالب", "https://iaet.edu.eg/ar/comm"],
        ],
      },
      {
        title: "البحث والتحديثات",
        description: "الوصول إلى أقسام البحث والمعامل وأخبار البرنامج الرسمية.",
        links: [
          ["الخطة البحثية", "https://iaet.edu.eg/ar/comm"],
          ["المعامل", "https://iaet.edu.eg/ar/comm"],
          ["أخبار البرنامج", "https://iaet.edu.eg/ar/comm"],
        ],
      },
    ],
    officialPage: "فتح الصفحة الرسمية",
    leadershipLabel: "05 / قيادة البرنامج",
    leadershipTitle: "التزام مشترك بالتعليم الهندسي.",
    leadershipText:
      "تعرّف على المسيرة الأكاديمية والاهتمامات البحثية للدكتور محمد صبحي البكري.",
    readMessage: "قراءة الكلمة الرسمية",
    learningLabel: "06 / خطوتك التالية",
    learningTitle: "واصل استكشاف البرنامج.",
    learningText:
      "اكتشف تفاصيل البرنامج ومصادره الأكاديمية وطرق التواصل مع المعهد.",
    openProgram: "زيارة الصفحة الرسمية للبرنامج",
    contactUs: "التواصل مع المعهد",
    contactLabel: "07 / التواصل",
    contactTitle: "تواصل مع المعهد.",
    address: "المطار، إمبابة، محافظة الجيزة، مصر",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    footerNote: "الهندسة والمعرفة والتواصل في تجربة رقمية واحدة.",
    footerDisclaimer:
      "",
    assistant: "مساعد البرنامج",
    assistantDescription: "أساعدك في الوصول إلى المعلومات المنشورة عن البرنامج.",
    starter: "أسئلة مقترحة",
    questions: [
      "ما رؤية البرنامج؟",
      "ما أهداف البرنامج؟",
      "أين أجد المصادر الأكاديمية؟",
      "كيف أتواصل مع المعهد؟",
    ],
    placeholder: "اسأل عن البرنامج...",
    send: "إرسال",
    source: "المصدر الرسمي",
    unknown:
      "يمكنك استكشاف صفحات البرنامج أو التواصل مع المعهد للحصول على مزيد من التفاصيل.",
    greeting:
      "أهلًا بك! اسألني عن الرؤية المنشورة أو أهداف البرنامج أو المصادر الأكاديمية أو بيانات التواصل.",
    close: "إغلاق المساعد",
    openAssistant: "فتح مساعد البرنامج",
    menuLabel: "فتح قائمة التنقل",
    proposed: "مقترح تصميمي",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formSubject: "نوع الاستفسار",
    formMessage: "الرسالة",
    formSubjectPlaceholder: "اختر نوع الاستفسار",
    formOptions: ["استفسار عام", "معلومات أكاديمية", "مصادر الطلاب", "أخرى"],
    formSubmit: "إعداد البريد الإلكتروني",
    formRequired: "يرجى استكمال هذا الحقل.",
    formEmailInvalid: "يرجى إدخال بريد إلكتروني صحيح.",
    formUnavailable:
      "سيتم فتح تطبيق البريد برسالة جاهزة للمراجعة والإرسال.",
    formReady: "تم تجهيز مسودة البريد. يرجى مراجعتها قبل الإرسال.",
    education: "التعليم",
    research: "الاهتمامات البحثية",
    profileNote: "محتوى محرر من السيرة الذاتية المرفقة؛ يحتاج المسمى الحالي وبيانات النشر إلى اعتماد المعهد.",
    footerNav: "تنقل سريع",
    officialWebsite: "موقع IAET الرسمي",
    backTop: "العودة إلى الأعلى",
  },
};

const sourceUrl = {
  en: "https://www.iaet.edu.eg/comm",
  ar: "https://iaet.edu.eg/ar/comm",
};

function answerQuestion(question: string, locale: Locale) {
  const q = question.toLowerCase();
  const ar = locale === "ar";
  const official = sourceUrl[locale];

  if (/vision|رؤية|الرؤية/.test(q)) {
    return {
      text: content[locale].visionText,
      url: official,
    };
  }

  if (/mission|رسالة|الرسالة/.test(q)) {
    return {
      text: content[locale].missionText,
      url: official,
    };
  }

  if (/objective|objectives|هدف|أهداف|الاهداف|الأهداف/.test(q)) {
    return {
      text: content[locale].objectives.join("\n"),
      url: official,
    };
  }

  if (/resource|academic|regulation|course|guide|مصادر|أكاديمي|لائحة|مقررات|دليل/.test(q)) {
    return {
      text: ar
        ? "يمكنك الوصول إلى اللوائح ومواصفات البرنامج والمقررات ودليل الطالب من الصفحة الرسمية. تحقق من توفر كل مستند وحداثته."
        : "The official program page lists academic resources, including regulations, program and course specifications, and student resources. Check each document's availability and currency.",
      url: official,
    };
  }

  if (/contact|email|phone|address|تواصل|بريد|هاتف|عنوان/.test(q)) {
    return {
      text: ar
        ? "البريد الإلكتروني: info@iaet.edu.eg\nالهاتف: 02 33594060\nالعنوان: المطار، إمبابة، الجيزة، مصر."
        : "Email: info@iaet.edu.eg\nPhone: 02 33594060\nAddress: Al Matar, Imbaba, Giza Governorate, Egypt.",
      url: "https://iaet.edu.eg/",
    };
  }

  return {
    text: content[locale].unknown,
    url: official,
  };
}

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

          <div className="hero-visual" ref={heroVisual} aria-label={t.program}>
            <div className="visual-label visual-label-top">
              <span className="live-dot" />
              SIGNAL / 001
            </div>
            <div className="signal-orbit">
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-middle" />
              <div className="orbit orbit-inner" />
              <div className="signal-core">
                <Radio size={42} strokeWidth={1.15} />
              </div>
              <div className="signal-node node-one"><Network size={19} /></div>
              <div className="signal-node node-two"><Cpu size={18} /></div>
              <div className="signal-node node-three"><Signal size={18} /></div>
              <svg className="signal-paths" viewBox="0 0 440 440" fill="none">
                <path d="M220 220 L220 64 L320 64" />
                <path d="M220 220 L375 220 L375 300" />
                <path d="M220 220 L100 340 L42 340" />
                <path d="M220 220 L95 112 L42 112" />
                <path d="M220 220 L220 380" />
                <circle cx="320" cy="64" r="3" />
                <circle cx="375" cy="300" r="3" />
                <circle cx="42" cy="340" r="3" />
                <circle cx="42" cy="112" r="3" />
                <circle cx="220" cy="380" r="3" />
              </svg>
            </div>
            <div className="visual-coordinate coordinate-one">31°08&apos; N</div>
            <div className="visual-coordinate coordinate-two">SIGNAL / STRUCTURE / CONNECTION</div>
            <div className="visual-label visual-label-bottom">
              <span>IAET / ECE</span>
              <span>EST. 1997</span>
            </div>
          </div>
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
        <div className="vision-grid">
          <motion.article
            className="vision-panel vision-primary"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="panel-top">
              <span className="panel-number">01</span>
              <Target size={22} />
            </div>
            <h2>{t.vision}</h2>
            <p>{t.visionText}</p>
            <span className="panel-footer">OFFICIAL PROGRAM VISION</span>
          </motion.article>
          <motion.article
            className="vision-panel vision-secondary"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="panel-top">
              <span className="panel-number">02</span>
              <Network size={22} />
            </div>
            <h2>{t.mission}</h2>
            <p>{t.missionText}</p>
            <span className="panel-footer">OFFICIAL PROGRAM MISSION</span>
          </motion.article>
        </div>
      </section>

      <section className="objectives-section section-pad" id="objectives">
        <SectionIndex label={t.objectiveLabel} />
        <div className="objectives-heading">
          <h2>{t.objectiveTitle}</h2>
          <p>{t.objectiveIntro}</p>
        </div>
        <div className="objectives-list">
          {t.objectives.map((objective, index) => (
            <motion.article
              className="objective-row"
              key={objective}
              initial={reducedMotion ? false : { opacity: 0, x: isAr ? 12 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <span className="objective-number">0{index + 1}</span>
              <p>{objective}</p>
              <ArrowUpRight className="objective-arrow" size={20} />
            </motion.article>
          ))}
        </div>
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
              <div className="chat-prototype-note">
                {isAr ? "نموذج تجريبي بإجابات محلية، وليس خدمة ذكاء اصطناعي مباشرة." : "Local FAQ prototype; no live AI backend."}
              </div>
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
