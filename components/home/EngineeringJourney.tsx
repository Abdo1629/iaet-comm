"use client";

import { motion } from "framer-motion";
import { Activity, ArrowDownRight, Plane, Radar, RadioTower } from "lucide-react";

type EngineeringJourneyProps = {
  isAr: boolean;
  reducedMotion: boolean | null;
};

export function EngineeringJourney({ isAr, reducedMotion }: EngineeringJourneyProps) {
  const scenes = [
    {
      number: "01",
      eyebrow: isAr ? "داخل الطائرة" : "INSIDE THE AIRCRAFT",
      title: isAr ? "أنظمة تعمل معًا في كل رحلة." : "Systems working together on every flight.",
      body: isAr
        ? "تتكامل الإلكترونيات وأجهزة الاستشعار ومعالجة البيانات داخل منظومات الطيران الحديثة. هنا تتحول الإشارة إلى معلومة، والمعلومة إلى جزء من منظومة أكبر."
        : "Electronics, sensors and data processing come together across modern aviation systems. A signal becomes information, and information becomes part of a much larger system.",
      tag: isAr ? "إلكترونيات • استشعار • بيانات" : "ELECTRONICS · SENSING · DATA",
      kind: "aircraft",
    },
    {
      number: "02",
      eyebrow: isAr ? "رؤية المجال الجوي" : "SEEING THE AIRSPACE",
      title: isAr ? "الإشارة ترسم صورة للحركة." : "Signals reveal the movement around us.",
      body: isAr
        ? "تعتمد أنظمة المراقبة والاستشعار على إرسال الإشارات واستقبالها وتحليلها لفهم ما يحدث حولنا. إنها رحلة تبدأ بموجة وتنتهي ببيانات قابلة للفهم."
        : "Surveillance and sensing systems transmit, receive and interpret signals to understand what is happening around them. The journey starts as a wave and becomes meaningful data.",
      tag: isAr ? "رادار • موجات • معالجة" : "RADAR · WAVES · PROCESSING",
      kind: "radar",
    },
    {
      number: "03",
      eyebrow: isAr ? "الاتصال بين الأنظمة" : "CONNECTING THE SYSTEMS",
      title: isAr ? "لا تعمل الأنظمة بمعزل عن بعضها." : "No system works in isolation.",
      body: isAr
        ? "تربط الاتصالات بين الأنظمة والأجهزة ومراكز التحكم، وتساعد على تبادل المعلومات بصورة موثوقة. هذا هو العالم الذي تلتقي فيه الشبكات بالإلكترونيات."
        : "Communication links devices, systems and control centres, helping information move reliably between them. This is where networks meet electronics.",
      tag: isAr ? "اتصالات • شبكات • تكامل" : "COMMUNICATION · NETWORKS · INTEGRATION",
      kind: "signals",
    },
  ];

  return (
    <section className="engineering-journey" id="engineering-journey" aria-label={isAr ? "رحلة داخل عالم هندسة الإلكترونيات والاتصالات" : "A journey through electronics and communications engineering"}>
      <div className="journey-intro">
        <span className="journey-overline"><i /> {isAr ? "منظومة واحدة — تفاصيل لا تُرى" : "ONE CONNECTED WORLD — HIDDEN IN PLAIN SIGHT"}</span>
        <h2>{isAr ? <>وراء كل رحلة،<br /><em>هندسة تربط التفاصيل.</em></> : <>Behind every journey,<br /><em>engineering connects the details.</em></>}</h2>
        <p>{isAr ? "جولة بصرية في ثلاثة عوالم توضح كيف ترتبط مفاهيم الإلكترونيات والاتصالات ببيئة الطيران. مشاهد توضيحية وليست وصفًا لمعامل أو تجهيزات المعهد." : "A visual journey through three worlds showing how electronics and communications connect with aviation. These are illustrative scenes, not depictions of IAET laboratories or equipment."}</p>
      </div>

      <div className="journey-scenes">
        {scenes.map((scene, index) => (
          <motion.article
            className={`journey-scene journey-scene-${scene.kind}`}
            key={scene.kind}
            initial={reducedMotion ? false : { opacity: 0, y: 54 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.85, delay: reducedMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="journey-scene-visual" aria-hidden="true">
              {scene.kind === "aircraft" && <div className="journey-aircraft-overlay"><Plane size={index === 0 ? 42 : 30} strokeWidth={1} /><span>FLIGHT SYSTEMS / 01</span></div>}
              {scene.kind === "radar" && (
                <div className="journey-radar">
                  <span className="journey-radar-ring ring-a" />
                  <span className="journey-radar-ring ring-b" />
                  <span className="journey-radar-ring ring-c" />
                  <span className="journey-radar-cross cross-x" />
                  <span className="journey-radar-cross cross-y" />
                  <span className="journey-radar-sweep" />
                  <i className="radar-blip blip-a" /><i className="radar-blip blip-b" /><i className="radar-blip blip-c" />
                  <Radar size={25} strokeWidth={1} />
                </div>
              )}
              {scene.kind === "signals" && (
                <div className="journey-network">
                  <div className="network-orbit orbit-one" /><div className="network-orbit orbit-two" /><div className="network-orbit orbit-three" />
                  <svg viewBox="0 0 700 420" preserveAspectRatio="xMidYMid meet">
                    <path d="M60 210 C140 210 140 70 230 70 S320 350 410 350 S500 210 640 210" />
                    <path d="M60 210 L230 70 L410 350 L640 210" className="network-lines" />
                  </svg>
                  <span className="network-node node-one" /><span className="network-node node-two" /><span className="network-node node-three" /><span className="network-node node-four" />
                  <RadioTower size={29} strokeWidth={1} />
                </div>
              )}
              <span className="journey-visual-index">{scene.number} / 03</span>
            </div>
            <div className="journey-scene-copy">
              <div className="journey-scene-eyebrow"><span>{scene.number}</span>{scene.eyebrow}</div>
              <h3>{scene.title}</h3>
              <p>{scene.body}</p>
              <div className="journey-scene-tag"><Activity size={14} /> {scene.tag}</div>
              <span className="journey-scene-arrow"><ArrowDownRight size={21} /></span>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="journey-endline"><span>IAET / ECE</span><span>{isAr ? "الإلكترونيات × الاتصالات × الطيران" : "ELECTRONICS × COMMUNICATIONS × AVIATION"}</span></div>
    </section>
  );
}
