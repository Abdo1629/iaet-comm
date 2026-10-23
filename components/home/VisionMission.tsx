"use client";

import { motion } from "framer-motion";
import { Network, Target } from "lucide-react";

type VisionMissionProps = {
  vision: string;
  visionText: string;
  mission: string;
  missionText: string;
  reducedMotion: boolean | null;
};

export function VisionMission({
  vision,
  visionText,
  mission,
  missionText,
  reducedMotion,
}: VisionMissionProps) {
  return (
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
          <Target size={22} aria-hidden="true" />
        </div>
        <h2>{vision}</h2>
        <p>{visionText}</p>
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
          <Network size={22} aria-hidden="true" />
        </div>
        <h2>{mission}</h2>
        <p>{missionText}</p>
        <span className="panel-footer">OFFICIAL PROGRAM MISSION</span>
      </motion.article>
    </div>
  );
}
