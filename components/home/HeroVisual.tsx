"use client";

import { forwardRef } from "react";
import { Cpu, Network, Radio, Signal } from "lucide-react";

type HeroVisualProps = { label: string };

export const HeroVisual = forwardRef<HTMLDivElement, HeroVisualProps>(
  function HeroVisual({ label }, ref) {
    return (
      <div className="hero-visual" ref={ref} aria-label={label}>
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
          <svg className="signal-paths" viewBox="0 0 440 440" fill="none" aria-hidden="true">
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
    );
  },
);
