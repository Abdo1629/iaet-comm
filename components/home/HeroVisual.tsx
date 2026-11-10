"use client";

import { forwardRef } from "react";
import { Activity, AudioWaveform, Crosshair, RadioTower } from "lucide-react";

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
            <linearGradient id="plane-metal" x1="150" y1="120" x2="760" y2="390" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5FFFF" stopOpacity=".92" />
              <stop offset=".5" stopColor="#91DDE4" stopOpacity=".82" />
              <stop offset="1" stopColor="#2B829A" stopOpacity=".68" />
            </linearGradient>
            <linearGradient id="plane-edge" x1="180" y1="120" x2="760" y2="390" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E7FFFF" />
              <stop offset="1" stopColor="#58B8C7" stopOpacity=".25" />
            </linearGradient>
            <filter id="plane-glow" x="40" y="35" width="820" height="430" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          <g fill="url(#plane-metal)" fillOpacity=".24" stroke="url(#plane-edge)" strokeWidth="2.4" strokeLinejoin="round">
            <path d="M142 258 C230 244 390 224 570 205 L748 185 C781 181 807 193 817 210 C823 223 811 235 788 243 L585 294 C420 335 267 365 160 378 C127 382 105 367 104 347 C103 327 119 286 142 258Z" />
            <path d="M400 231 C443 184 487 127 535 76 C548 63 566 69 568 87 L548 215 L493 306 L425 294 L389 254Z" />
            <path d="M390 295 L448 286 L535 405 C548 426 534 445 516 432 L391 341 L365 314Z" />
            <path d="M174 253 L218 205 C230 193 244 198 241 214 L225 244 L190 268Z" />
            <path d="M174 376 L222 408 C235 417 249 409 241 394 L219 369 L190 359Z" />
          </g>
          <path d="M142 258 C230 244 390 224 570 205 L748 185 C781 181 807 193 817 210 C823 223 811 235 788 243 L585 294 C420 335 267 365 160 378 C127 382 105 367 104 347 C103 327 119 286 142 258Z" stroke="#B8F7FA" strokeOpacity=".38" strokeWidth="9" filter="url(#plane-glow)" />
          <path d="M180 285 C350 258 580 225 785 214" stroke="#DDFEFF" strokeOpacity=".58" strokeWidth="1.6" />
          <path d="M178 350 C360 316 580 265 784 226" stroke="#DDFEFF" strokeOpacity=".3" strokeWidth="1.2" strokeDasharray="5 9" />
          <path d="M725 191 L741 205 L725 219" stroke="#E7FFFF" strokeOpacity=".82" strokeWidth="2" />
          <path d="M262 239 L279 247 M296 233 L313 241 M330 227 L347 235 M364 221 L381 229" stroke="#DDFEFF" strokeOpacity=".62" strokeWidth="2" strokeLinecap="round" />
          <path d="M416 252 L525 103 M444 278 L548 94 M429 310 L517 420" stroke="#B7F4F5" strokeOpacity=".42" strokeWidth="1.5" />
          <path d="M150 315 L116 340 M159 328 L125 353" stroke="#DDFEFF" strokeOpacity=".55" strokeWidth="2" />
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

        <div className="hero-coordinate-mark"><Activity size={13} /> 30° 06&apos; N — 31° 12&apos; E</div>
      </div>
    );
  },
);
