"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Marquee from "@/components/ui/Marquee";

const benefits: Array<{
  key: string;
  value?: number;
  suffix?: string;
  custom?: string;
}> = [
  { key: "saveTime", value: 80, suffix: "%" },
  { key: "increaseRevenue", value: 3, suffix: "x" },
  { key: "automate", custom: "24/7" },
  { key: "experience", value: 95, suffix: "%" },
];

export default function Benefits() {
  const t = useTranslations("benefits");

  const phrases = [t("phrase1"), t("phrase2"), t("phrase3"), t("phrase4")];

  return (
    <section
      id="benefits"
      className="relative bg-paper border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[100rem] px-6">
        {/* Header */}
        <div className="mb-20 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
              {t("sectionLabel")}
            </p>
          </Reveal>
          <Reveal className="md:col-span-7">
            <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink text-balance">
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="display-heading italic text-accent font-normal">
                {t("title").split(" ").slice(-1)[0]}
              </span>
            </h2>
          </Reveal>
          <div className="md:col-span-3 md:pt-4">
            <Reveal delay={0.2}>
              <p className="text-ink-2 leading-relaxed">{t("subtitle")}</p>
            </Reveal>
          </div>
        </div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
          {benefits.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.08}>
              <div
                className={`group relative px-6 py-12 md:py-16 border-b border-border ${i < benefits.length - 1 ? "md:border-r" : ""} overflow-hidden`}
              >
                {/* ember sweep on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-accent/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />

                <div className="relative">
                  <div className="font-mono text-5xl md:text-6xl font-semibold text-ink leading-none">
                    {b.custom ? (
                      b.custom
                    ) : (
                      <Counter
                        value={b.value as number}
                        suffix={b.suffix}
                        duration={1.8}
                      />
                    )}
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-3">
                    {t(`${b.key}.statLabel`)}
                  </div>
                  <div className="mt-3 text-sm text-ink-2 leading-snug max-w-[26ch]">
                    {t(`${b.key}.title`)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Slow marquee strip below */}
        <div className="mt-20 border-y border-border py-6">
          <Marquee
            speed="slow"
            className="text-[clamp(1.4rem,3.4vw,2.8rem)] font-semibold tracking-tight text-ink-3"
          >
            {phrases.map((p, i) => (
              <span key={i} className="inline-flex items-center gap-12">
                <span>{p}</span>
                <span className="display-heading italic text-accent font-normal text-[0.9em]">
                  ●
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
