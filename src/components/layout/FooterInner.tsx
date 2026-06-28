"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import LiveTime from "@/components/ui/LiveTime";
import BookingButton from "@/components/ui/BookingButton";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";

export default function FooterInner() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  const productLinks = [
    { label: navT("services"), href: `/${locale}/services` },
    { label: navT("showroom"), href: `/${locale}/showroom` },
    { label: navT("about"), href: `/${locale}/about` },
    { label: navT("contact"), href: `/${locale}/contact` },
  ];

  const socials = [
    { label: "Twitter", href: "https://twitter.com/evocrea_io" },
    { label: "LinkedIn", href: "https://linkedin.com/company/evocrea" },
    { label: "Instagram", href: "https://instagram.com/evocrea.io" },
    { label: "Email", href: "mailto:hello@evocrea.io" },
  ];

  return (
    <footer className="relative bg-ink-deep text-paper overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-noise" />

      {/* Top CTA strip */}
      <div className="relative border-b border-paper/10">
        <div className="mx-auto max-w-[100rem] px-6 py-14 md:py-20 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50 mb-5">
              Start a project
            </p>
            <a
              href={CONTACT_MAILTO}
              data-cursor="Email"
              className="group inline-flex items-baseline gap-3 display-heading italic text-[clamp(1.75rem,6vw,5rem)] font-normal leading-[1.05] tracking-tight text-paper hover:text-accent transition-colors break-all"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight className="h-7 w-7 md:h-12 md:w-12 transition-transform duration-300 group-hover:rotate-45 not-italic shrink-0" />
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookingButton
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
              />
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-paper/40 sm:ms-2">
                Jordan · +962 79 544 1474
              </span>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right space-y-2 text-sm text-paper/60">
            <p>{t("tagline")}</p>
            <LiveTime
              timeZone="Asia/Amman"
              label="Irbid"
              locale={locale === "ar" ? "ar-SA" : "en-US"}
              className="md:justify-end !text-paper/60"
            />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative mx-auto max-w-[100rem] px-6 pt-14 pb-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2.5 mb-4"
          >
            <Image
              src="/mark-evocrea-light.svg"
              alt="EvoCrea"
              width={106}
              height={120}
              className="h-12 w-auto"
            />
            <span className="text-2xl font-semibold tracking-tight text-paper">
              EvoCrea<span className="text-accent">.</span>
            </span>
          </Link>
          <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
            We build the digital systems that businesses run on. CRM, commerce,
            learning, automation — engineered for scale.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40 mb-5">
            {t("company")}
          </h3>
          <ul className="space-y-3">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 text-base text-paper/80 hover:text-paper transition-colors"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40 mb-5">
            Connect
          </h3>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="group inline-flex items-center gap-2 text-base text-paper/80 hover:text-paper transition-colors"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 md:text-right">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40 mb-5">
            Office
          </h3>
          <p className="text-sm text-paper/70 leading-relaxed">
            Irbid, Jordan
            <br />
            Serving clients worldwide
          </p>
        </div>
      </div>

      {/* Massive wordmark */}
      <div className="relative select-none" aria-hidden="true">
        <div className="mx-auto max-w-[100rem] px-2 md:px-4 pb-2">
          <h2
            className="text-[18vw] leading-[0.85] font-semibold tracking-[-0.05em] text-paper"
            style={{
              WebkitTextStroke: "1px rgba(243,241,236,0.18)",
              WebkitTextFillColor: "transparent",
            }}
          >
            EVOCREA
            <span
              className="text-accent"
              style={{
                WebkitTextStroke: "0",
                WebkitTextFillColor: "currentcolor",
              }}
            >
              .
            </span>
          </h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-paper/10">
        <div className="mx-auto max-w-[100rem] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-paper/50">
          <p>{t("legal")}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-paper transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-paper transition-colors">
              {t("terms")}
            </Link>
            <span>v2.0 · Made in MENA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
