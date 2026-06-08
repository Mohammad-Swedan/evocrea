"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import BookingButton from "@/components/ui/BookingButton";
import DashboardMock from "@/components/ui/DashboardMock";
import SplitText from "@/components/ui/SplitText";
import Marquee from "@/components/ui/Marquee";
import LiveTime from "@/components/ui/LiveTime";

const statValues = ["140+", "$50M+", "98%"];

export default function Hero() {
  const t = useTranslations("hero");

  const stats = [
    { value: statValues[0], label: t("statSystems") },
    { value: statValues[1], label: t("statRevenue") },
    { value: statValues[2], label: t("statSatisfaction") },
  ];

  const marqueeWords = (t.raw("marqueeWords") as string[]) ?? [];
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for the floating mock
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const mockRot = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Split headline into words; the *last* word is rendered as italic display serif
  const headlineRaw = t("headline");
  const words = headlineRaw.trim().split(/\s+/);
  const lastWord = words.pop() ?? "";
  const headStart = words.join(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-paper pt-28 md:pt-32"
    >
      {/* Soft warm halo */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-accent-tint), transparent 60%)",
        }}
      />

      {/* Top meta strip */}
      <div className="relative z-10 mx-auto max-w-[100rem] px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-border/70 pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-3"
        >
          <span className="hidden sm:inline">{t("sectionLabel")}</span>
          <span>{t("location")}</span>
          <LiveTime
            timeZone="Asia/Amman"
            label="Local"
            className="hidden md:inline-flex"
          />
        </motion.div>
      </div>

      {/* Hero core */}
      <div className="relative z-10 mx-auto max-w-[100rem] px-6 pb-10 pt-10 sm:pt-12 md:pt-16">
        <motion.div style={{ y: headingY }} className="will-change-transform">
          <h1 className="text-[clamp(2.6rem,11vw,11rem)] font-semibold leading-[0.95] sm:leading-[0.92] tracking-[-0.035em] sm:tracking-[-0.04em] text-ink text-balance">
            <SplitText
              text={headStart}
              by="words"
              stagger={0.07}
              delay={0.15}
              as="span"
              className="block"
            />
            <span className="mt-2 block">
              <span
                className="overflow-hidden inline-block align-bottom"
                style={{ paddingBottom: "0.22em", marginBottom: "-0.22em" }}
              >
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block text-accent font-normal ${locale === "ar" ? "italic" : "display-heading italic"}`}
                >
                  {lastWord}.
                </motion.span>
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Two-column meta row */}
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 text-lg leading-relaxed text-ink-2 max-w-md"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:col-start-8 flex flex-col items-start gap-5"
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <BookingButton size="lg" className="w-full sm:w-auto" />
              <MagneticButton
                href={`/${locale}/showroom`}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto !rounded-full min-h-11"
              >
                {t("secondaryCta")}
              </MagneticButton>
            </div>
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-ink-3 text-balance">
              {t("microProof")}
            </p>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-4">
              <span className="h-px w-6 bg-ink-4" />
              <ArrowDown className="h-3 w-3" />
              <span>{t("scrollHint")}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative z-10 border-y border-border bg-paper/60 backdrop-blur-sm"
      >
        <Marquee
          speed="normal"
          className="py-4 text-[clamp(1.4rem,3.6vw,3rem)] font-semibold tracking-tight text-ink"
        >
          {marqueeWords.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-flex items-center gap-16">
              <span>{w}</span>
              <span className="display-heading italic text-accent text-[0.9em] font-normal">
                ※
              </span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Stat strip */}
      <div className="relative z-10 mx-auto max-w-[100rem] px-6 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-12 md:grid-cols-12"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`md:col-span-3 ${i === 0 ? "md:col-start-1" : i === 1 ? "md:col-start-5" : "md:col-start-9"}`}
            >
              <div className="font-mono text-xl sm:text-2xl font-semibold text-ink md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] leading-snug uppercase tracking-[0.18em] text-ink-3">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating dashboard mock — desktop only, parallax */}
      <motion.div
        style={{ y: mockY, rotate: mockRot }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-[3vw] top-[18vh] hidden w-[28vw] max-w-md xl:block"
      >
        <div
          className="rounded-2xl shadow-lg ring-1 ring-black/10 overflow-hidden"
          style={{ transform: "rotate(3deg)" }}
        >
          <DashboardMock type="crm" compact />
        </div>
      </motion.div>
    </section>
  );
}
