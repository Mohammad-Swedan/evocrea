"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NexoraLoaderProps {
  onComplete: () => void;
  locale: string;
}

const taglines = {
  en: "Building the future of your business",
  ar: "نبني مستقبل أعمالك",
};

export default function NexoraLoader({
  onComplete,
  locale,
}: NexoraLoaderProps) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const total = 1900; // ms
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const tagline = taglines[locale as "en" | "ar"] ?? taglines.en;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-paper"
      exit={{
        y: "-100%",
        transition: { duration: 0.9, ease: [0.7, 0, 0.84, 0] },
      }}
    >
      {/* Top meta */}
      <div className="px-6 pt-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-ink-3">
        <span>EvoCrea · 2026</span>
        <span>Loading {pct.toString().padStart(3, "0")}%</span>
      </div>

      {/* Center wordmark */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative">
          <h1
            className="text-[clamp(4rem,18vw,18rem)] font-semibold tracking-[-0.05em] leading-none text-ink select-none"
            style={{
              transform: `scaleY(${0.5 + pct / 200})`,
              transformOrigin: "bottom",
              transition: "transform 80ms linear",
            }}
          >
            EvoCrea<span className="text-accent">.</span>
          </h1>
        </div>
      </div>

      {/* Bottom progress + tagline */}
      <div className="px-6 pb-8">
        <div className="flex items-end justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-3">
          <span className="max-w-[50%]">{tagline}</span>
          <span className="text-ink tabular-nums text-3xl font-semibold leading-none">
            {pct.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="h-px w-full bg-border overflow-hidden">
          <div
            className="h-full bg-accent origin-left"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
