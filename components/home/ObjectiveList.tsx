"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type ObjectiveListProps = {
  objectives: readonly string[];
  reducedMotion: boolean | null;
  isAr: boolean;
};

export function ObjectiveList({ objectives, reducedMotion, isAr }: ObjectiveListProps) {
  return (
    <div className="objectives-list">
      {objectives.map((objective, index) => (
        <motion.article
          className="objective-row"
          key={objective}
          initial={reducedMotion ? false : { opacity: 0, x: isAr ? 12 : -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <span className="objective-number">{String(index + 1).padStart(2, "0")}</span>
          <p>{objective}</p>
          <ArrowUpRight className="objective-arrow" size={20} aria-hidden="true" />
        </motion.article>
      ))}
    </div>
  );
}
