"use client";

import { useTranslations } from "next-intl";
import Marquee from "@/components/ui/Marquee";

/**
 * Subtle social-proof / industries band.
 * Sits directly under the Hero to add immediate credibility.
 */
export default function TrustedBy() {
  const t = useTranslations("trustedBy");
  // next-intl: get an array via t.raw
  const industries = (t.raw("industries") as string[]) ?? [];

  return (
    <section
      aria-label={t("label")}
      className="relative border-y border-border bg-surface/60 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[100rem] grid items-center gap-4 px-6 py-6 md:grid-cols-12 md:gap-8">
        <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 text-balance">
          {t("label")}
        </p>
        <div className="md:col-span-9 overflow-hidden">
          <Marquee speed="slow" className="py-1">
            {industries.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="inline-flex items-center gap-10 text-ink-2"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  {label}
                </span>
                <span
                  aria-hidden
                  className="display-heading italic text-accent text-base font-normal"
                >
                  ・
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
