"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Search, Hammer, Rocket, type LucideIcon } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";

/**
 * Per-step palette — a warm-to-cool "journey" that stays in the brand:
 *  01 Discovery  → ember orange    (the brand accent — energetic kickoff)
 *  02 Build      → burnt amber     (deep, focused craft)
 *  03 Scale      → deep teal       (calm, forward-looking sustained growth)
 *
 * Each step also has a soft tint used for halos / chip backgrounds.
 */
const STEP_COLORS = ["#FF5C28", "#B4450A", "#0F766E"] as const;
const STEP_TINTS = ["#FFE8DF", "#F4E5D2", "#D9EDEA"] as const;
const STEP_ICONS: LucideIcon[] = [Search, Hammer, Rocket];

type Step = {
  key: "step1" | "step2" | "step3";
  detail: string;
  /** 3 short outcomes — adds editorial substance to each panel. */
  deliverables: [string, string, string];
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const localSteps: Step[] = [
    {
      key: "step1",
      detail: t("step1.detail"),
      deliverables: [t("step1.d1"), t("step1.d2"), t("step1.d3")],
    },
    {
      key: "step2",
      detail: t("step2.detail"),
      deliverables: [t("step2.d1"), t("step2.d2"), t("step2.d3")],
    },
    {
      key: "step3",
      detail: t("step3.detail"),
      deliverables: [t("step3.d1"), t("step3.d2"), t("step3.d3")],
    },
  ];

  // Track the *steps panel*. Progress = 0 when it hits viewport center,
  // 1 when its bottom leaves viewport center.
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start center", "end center"],
  });

  // Smooth fill of the progress rail across the panel scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Step counter MotionValue: 1 → 3
  const stickyNum = useTransform(scrollYProgress, [0, 1], [1, 3]);

  // Color of the rail / halo interpolates between the three step colors
  const railColor = useTransform(
    stickyNum,
    [1, 2, 3],
    [STEP_COLORS[0], STEP_COLORS[1], STEP_COLORS[2]],
  );
  const haloColor = useTransform(
    stickyNum,
    [1, 2, 3],
    [STEP_TINTS[0], STEP_TINTS[1], STEP_TINTS[2]],
  );

  return (
    <section
      id="how-it-works"
      className="relative bg-paper border-t border-border py-20 md:py-32"
    >
      <div className="mx-auto max-w-[100rem] px-6">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-12 mb-14 md:mb-20">
          <Reveal className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
              {t("sectionLabel")}
            </p>
          </Reveal>
          <div className="md:col-span-7">
            <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink text-balance">
              <SplitText
                text={t("title")}
                by="words"
                stagger={0.06}
                className="block"
              />
            </h2>
          </div>
          <div className="md:col-span-3 md:pt-4">
            <Reveal delay={0.2}>
              <p className="text-ink-2 leading-relaxed">{t("subtitle")}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          {/* ───── Sticky left: giant numeral — DESKTOP ONLY ───── */}
          {/* Outer wrapper must stretch to full grid-row height (no self-start / h-fit)
              so the sticky child remains active until the right column ends. */}
          <div className="hidden md:block md:col-span-5">
            <div className="sticky top-32 relative h-[calc(100svh-8rem)] flex items-start">
              {/* Vertical progress rail (color shifts with active step) */}
              <div className="absolute left-0 top-0 h-full w-[2px] overflow-hidden bg-border rounded-full">
                <motion.div
                  style={{ height: lineHeight, backgroundColor: railColor }}
                  className="w-full origin-top"
                />
              </div>

              {/* Stop-dots — three pegs along the rail */}
              <div className="absolute left-[-3px] top-0 h-full pointer-events-none">
                {STEP_COLORS.map((c, i) => (
                  <span
                    key={c}
                    className="absolute h-2 w-2 rounded-full ring-2 ring-paper"
                    style={{
                      top: `${i * 50}%`,
                      transform: "translateY(-50%)",
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>

              <div className="pl-12 relative">
                {/* Animated soft halo behind the digit */}
                <motion.div
                  style={{ backgroundColor: haloColor }}
                  className="pointer-events-none absolute -inset-8 rounded-full blur-3xl opacity-60"
                  aria-hidden
                />

                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-4">
                    {t("stepLabel")}
                  </p>
                  <div className="display-heading text-[clamp(8rem,20vw,18rem)] leading-none italic relative">
                    <StickyDigit progress={stickyNum} />
                  </div>
                  {/* Active step icon */}
                  <div className="mt-6 h-9">
                    <ActiveIcon progress={stickyNum} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ───── Right: step panels ───── */}
          <div ref={panelRef} className="md:col-span-7 md:py-20 relative">
            {/* MOBILE-ONLY sticky counter strip */}
            <div className="md:hidden sticky top-16 z-10 -mx-6 mb-6 px-6 py-3 bg-paper/85 backdrop-blur-md border-y border-border">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-baseline gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                    {t("stepLabel")}
                  </p>
                  <div className="display-heading italic text-5xl leading-none relative">
                    <StickyDigit progress={stickyNum} prefixZero />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                    / 03
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 truncate max-w-[55%] text-right">
                  <StepLabel
                    progress={stickyNum}
                    details={[
                      localSteps[0].detail,
                      localSteps[1].detail,
                      localSteps[2].detail,
                    ]}
                  />
                </span>
              </div>

              {/* Horizontal progress rail (color shifts) */}
              <div className="relative mt-2 h-[2px] w-full overflow-hidden bg-border rounded-full">
                <motion.div
                  style={{ width: lineHeight, backgroundColor: railColor }}
                  className="h-full origin-left"
                />
              </div>

              {/* Three stop-dots over the rail */}
              <div className="relative mt-1 h-2">
                {STEP_COLORS.map((c, i) => (
                  <Dot key={c} color={c} index={i} progress={stickyNum} />
                ))}
              </div>
            </div>

            <div className="space-y-16 md:space-y-48">
              {localSteps.map((s, i) => {
                const Icon = STEP_ICONS[i];
                const color = STEP_COLORS[i];
                const tint = STEP_TINTS[i];
                return (
                  <Reveal key={s.key} delay={0.05}>
                    <article className="relative pt-8 md:pt-10">
                      {/* Top hairline + colored leading bar */}
                      <div className="absolute left-0 right-0 top-0 h-px bg-border">
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="block h-[2px] w-16 origin-left -mt-px"
                          style={{ backgroundColor: color }}
                        />
                      </div>

                      {/* Step header row: chip + icon + meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-5 md:mb-6">
                        <span
                          className="inline-flex items-center justify-center h-7 px-2.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                          style={{ backgroundColor: tint, color }}
                        >
                          0{i + 1} / 03
                        </span>
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                          style={{ backgroundColor: tint, color }}
                          aria-hidden
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                          {s.detail}
                        </span>
                      </div>

                      <h3 className="text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink mb-5 md:mb-6 text-balance">
                        {t(`${s.key}.title`)}
                      </h3>
                      <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-lg">
                        {t(`${s.key}.description`)}
                      </p>

                      {/* Deliverables — three colored bullets */}
                      <ul className="mt-7 grid gap-2.5 sm:grid-cols-3 max-w-xl">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2.5 text-[13px] text-ink-2"
                          >
                            <span
                              className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: color }}
                              aria-hidden
                            />
                            <span className="leading-snug">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders the active step number as a crossfaded display digit.
 * Each digit carries its own step color — so as one fades in, the color
 * transitions naturally without a separate color interpolation.
 *
 * progress is a MotionValue spanning 1 → 3 across the panel scroll.
 */
function StickyDigit({
  progress,
  prefixZero = false,
}: {
  progress: MotionValue<number>;
  prefixZero?: boolean;
}) {
  const opacity1 = useTransform(progress, [1.35, 1.55], [1, 0]);
  const opacity2 = useTransform(progress, [1.45, 1.6, 2.4, 2.55], [0, 1, 1, 0]);
  const opacity3 = useTransform(progress, [2.45, 2.6], [0, 1]);

  const widthCh = prefixZero ? "w-[2ch]" : "w-[1ch]";
  const label = (n: 1 | 2 | 3) => (prefixZero ? `0${n}` : String(n));

  return (
    <span className={`relative inline-block h-[1em] align-top ${widthCh}`}>
      <motion.span
        style={{ opacity: opacity1, color: STEP_COLORS[0] }}
        className="absolute inset-0"
      >
        {label(1)}
      </motion.span>
      <motion.span
        style={{ opacity: opacity2, color: STEP_COLORS[1] }}
        className="absolute inset-0"
      >
        {label(2)}
      </motion.span>
      <motion.span
        style={{ opacity: opacity3, color: STEP_COLORS[2] }}
        className="absolute inset-0"
      >
        {label(3)}
      </motion.span>
    </span>
  );
}

/**
 * Mobile-only label that mirrors the active step's "detail" and crossfades
 * in lock-step with `StickyDigit`.
 */
function StepLabel({
  progress,
  details,
}: {
  progress: MotionValue<number>;
  details: [string, string, string];
}) {
  const opacity1 = useTransform(progress, [1.35, 1.55], [1, 0]);
  const opacity2 = useTransform(progress, [1.45, 1.6, 2.4, 2.55], [0, 1, 1, 0]);
  const opacity3 = useTransform(progress, [2.45, 2.6], [0, 1]);

  return (
    <span className="relative inline-block w-full h-[1em] align-top">
      <motion.span
        style={{ opacity: opacity1 }}
        className="absolute inset-0 text-right truncate"
      >
        {details[0]}
      </motion.span>
      <motion.span
        style={{ opacity: opacity2 }}
        className="absolute inset-0 text-right truncate"
      >
        {details[1]}
      </motion.span>
      <motion.span
        style={{ opacity: opacity3 }}
        className="absolute inset-0 text-right truncate"
      >
        {details[2]}
      </motion.span>
    </span>
  );
}

/** Active-step icon for the desktop sticky column. */
function ActiveIcon({ progress }: { progress: MotionValue<number> }) {
  const opacity1 = useTransform(progress, [1.35, 1.55], [1, 0]);
  const opacity2 = useTransform(progress, [1.45, 1.6, 2.4, 2.55], [0, 1, 1, 0]);
  const opacity3 = useTransform(progress, [2.45, 2.6], [0, 1]);

  const items: Array<{
    Icon: LucideIcon;
    color: string;
    tint: string;
    o: MotionValue<number>;
  }> = [
    {
      Icon: STEP_ICONS[0],
      color: STEP_COLORS[0],
      tint: STEP_TINTS[0],
      o: opacity1,
    },
    {
      Icon: STEP_ICONS[1],
      color: STEP_COLORS[1],
      tint: STEP_TINTS[1],
      o: opacity2,
    },
    {
      Icon: STEP_ICONS[2],
      color: STEP_COLORS[2],
      tint: STEP_TINTS[2],
      o: opacity3,
    },
  ];

  return (
    <span className="relative inline-block h-9 w-9">
      {items.map(({ Icon, color, tint, o }, i) => (
        <motion.span
          key={i}
          style={{ opacity: o, backgroundColor: tint, color }}
          className="absolute inset-0 inline-flex items-center justify-center rounded-full"
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </motion.span>
      ))}
    </span>
  );
}

/** A single mobile stop-dot that fills with its color as scroll passes it. */
function Dot({
  color,
  index,
  progress,
}: {
  color: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // Fully filled once the active step number reaches (index + 1) — 0.4
  const t = index + 0.6;
  const fill = useTransform(progress, [t - 0.15, t], [0, 1]);
  const left = `${index * 50}%`;
  return (
    <span
      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 top-1"
      style={{ left }}
    >
      <span className="absolute inset-0 rounded-full bg-border" aria-hidden />
      <motion.span
        style={{ opacity: fill, backgroundColor: color }}
        className="absolute inset-0 rounded-full ring-2 ring-paper"
        aria-hidden
      />
    </span>
  );
}
