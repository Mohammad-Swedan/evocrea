"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import BookingButton from "@/components/ui/BookingButton";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { CONTACT_MAILTO, WHATSAPP_URL } from "@/lib/site";

export default function FinalCTA() {
  const t = useTranslations("cta");

  return (
    <section
      id="cta"
      className="relative bg-ink-deep text-paper py-32 md:py-44 overflow-hidden"
    >
      {/* grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-noise" />
      {/* ember halo */}
      <div
        className="pointer-events-none absolute -bottom-[40vh] left-1/2 h-[80vh] w-[120vh] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-glow), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
              {t("sectionLabel")}
            </p>
          </Reveal>

          <div className="md:col-span-10">
            {(() => {
              const words = t("headline").trim().split(/\s+/);
              const last = words.pop() ?? "";
              const head = words.join(" ");
              return (
                <h2 className="text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-paper text-balance">
                  <SplitText
                    text={head}
                    by="words"
                    stagger={0.07}
                    className="block"
                  />
                  <span className="mt-2 block">
                    <span className="overflow-hidden inline-block align-bottom">
                      <motion.span
                        initial={{ y: "110%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="display-heading italic text-accent font-normal inline-block"
                      >
                        {last}.
                      </motion.span>
                    </span>
                  </span>
                </h2>
              );
            })()}

            <Reveal delay={0.7}>
              <p className="mt-12 text-lg md:text-xl text-paper/70 max-w-2xl leading-relaxed">
                {t("subheadline")}
              </p>
            </Reveal>

            <Reveal delay={0.85}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <BookingButton
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 text-base rounded-full font-semibold border border-paper/30 text-paper hover:border-paper hover:bg-paper/5 transition-all duration-200 min-h-11"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  {t("talkToUs")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={CONTACT_MAILTO}
                  data-cursor="Email us"
                  className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-paper/60 hover:text-paper transition-colors sm:ms-2"
                >
                  hello@evocrea.io
                  <span className="inline-block h-px w-10 bg-paper/30 group-hover:bg-paper transition-colors" />
                </a>
              </div>
              <p className="mt-8 text-xs font-mono uppercase tracking-[0.2em] text-paper/40">
                {t("microProof")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
