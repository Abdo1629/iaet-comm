"use client";

import { forwardRef } from "react";
import { Activity, Antenna, AudioWaveform, Crosshair, RadioTower } from "lucide-react";

type HeroVisualProps = { label: string };

export const HeroVisual = forwardRef<HTMLDivElement, HeroVisualProps>(
  function HeroVisual({ label }, ref) {
    return (
      <div className="hero-visual cinematic-hero-visual" ref={ref} aria-label={label}>
        <div className="hero-visual-photo" role="img" aria-label="Commercial aircraft approaching for landing" />
        <div className="hero-visual-vignette" />
        <div className="radar-screen">
          <div className="radar-ring radar-ring-one" />
          <div className="radar-ring radar-ring-two" />
          <div className="radar-ring radar-ring-three" />
          <div className="radar-crosshair radar-crosshair-x" />
          <div className="radar-crosshair radar-crosshair-y" />
          <div className="radar-sweep" />
          <span className="radar-target radar-target-one" />
          <span className="radar-target radar-target-two" />
          <span className="radar-target radar-target-three" />
          <span className="radar-center" />
        </div>

        <svg className="aircraft-blueprint hero-plane" viewBox="0 0 900 500" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="plane-metal" x1="120" y1="100" x2="770" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5FFFF" stopOpacity=".92" />
              <stop offset=".48" stopColor="#91DDE4" stopOpacity=".8" />
              <stop offset="1" stopColor="#2B829A" stopOpacity=".62" />
            </linearGradient>
            <linearGradient id="plane-edge" x1="450" y1="42" x2="450" y2="454" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E7FFFF" />
              <stop offset="1" stopColor="#58B8C7" stopOpacity=".18" />
            </linearGradient>
            <filter id="plane-glow" x="0" y="0" width="900" height="500" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <path d="M450 34 C461 74 468 132 474 190 L795 326 Q813 335 800 344 L481 294 L474 414 Q471 441 450 466 Q429 441 426 414 L419 294 L100 344 Q87 335 105 326 L426 190 C432 132 439 74 450 34Z" fill="url(#plane-metal)" fillOpacity=".16" stroke="url(#plane-edge)" strokeWidth="2.2" />
          <path d="M450 34 C461 74 468 132 474 190 L795 326 Q813 335 800 344 L481 294 L474 414 Q471 441 450 466 Q429 441 426 414 L419 294 L100 344 Q87 335 105 326 L426 190 C432 132 439 74 450 34Z" stroke="#B8F7FA" strokeOpacity=".32" strokeWidth="10" filter="url(#plane-glow)" />
          <path d="M426 190 L474 190 M419 294 L481 294 M438 114 L462 114 M432 150 L468 150" stroke="#D7FFFF" strokeOpacity=".72" strokeWidth="1.5" />
          <path d="M410 306 L382 322 L370 358 M490 306 L518 322 L530 358" stroke="#8DEAF0" strokeOpacity=".5" strokeWidth="2" />
          <path d="M450 54 L450 425" stroke="#DDFEFF" strokeOpacity=".36" strokeDasharray="5 9" />
          <path d="M190 333 L390 274 M710 333 L510 274" stroke="#B7F4F5" strokeOpacity=".55" strokeDasharray="3 8" />
          <circle cx="450" cy="78" r="5" fill="#DDFEFF" />
        </svg>

        <div className="hero-flight-tag">
          <span className="flight-tag-icon"><Crosshair size={15} /></span>
          <span><strong>FLIGHT TRACKING</strong><small>RADAR / TELEMETRY / DATA</small></span>
          <span className="tag-live"><i /> LIVE</span>
        </div>

        <div className="hero-signal-tag">
          <span className="signal-tag-icon"><RadioTower size={17} /></span>
          <span><strong>CONNECTED AIRSPACE</strong><small>COMMUNICATION NETWORK</small></span>
        </div>

        <div className="hero-visual-caption">
          <span>01 / AVIATION SYSTEMS</span>
          <span className="caption-wave"><AudioWaveform size={16} /> SIGNAL IN MOTION</span>
        </div>

        <div className="hero-coordinate-mark"><Activity size={13} /> 30° 06' N — 31° 12' E</div>
      </div>
    );
  },
);
