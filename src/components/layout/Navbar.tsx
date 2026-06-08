"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import MagneticButton from "@/components/ui/MagneticButton";
import BookingButton from "@/components/ui/BookingButton";
import LiveTime from "@/components/ui/LiveTime";
import {
  PHONE_TEL,
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
} from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { key: "home", href: `/${locale}` },
    { key: "services", href: `/${locale}/services` },
    { key: "showroom", href: `/${locale}/showroom` },
    { key: "about", href: `/${locale}/about` },
    { key: "contact", href: `/${locale}/contact` },
  ] as const;

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-6 px-6 transition-all duration-500 ${
            scrolled ? "h-14 max-w-7xl" : "h-20 max-w-[100rem]"
          }`}
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            data-cursor="Home"
            className="group flex items-center gap-2 focus-visible:outline-accent"
            aria-label="EvoCrea — Home"
          >
            <Image
              src="/logo-evocrea-without-background.png"
              alt="EvoCrea"
              width={120}
              height={40}
              className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
            <span className="text-lg font-semibold tracking-tight text-ink">
              EvoCrea<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Live time chip — desktop only */}
          <div className="hidden lg:flex items-center">
            <LiveTime
              timeZone="Asia/Amman"
              label="Irbid"
              locale={locale === "ar" ? "ar-SA" : "en-US"}
            />
          </div>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {links.map(({ key, href }) => {
              const isActive =
                key === "home"
                  ? pathname === href
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={key}
                  href={href}
                  data-cursor=""
                  className={`relative text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-ink font-medium"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <span className="font-mono uppercase tracking-[0.14em] text-[11px]">
                    {t(key)}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher currentLocale={locale} />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-full font-semibold text-ink-2 border border-transparent hover:text-ink hover:border-border transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4" aria-hidden />
              {t("contact")}
            </a>
            <BookingButton
              size="sm"
              variant="accent"
              label={t("callUs")}
              hideIcon={false}
              trailingArrow={false}
              className="!px-5"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LocaleSwitcher currentLocale={locale} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-2 transition-all duration-200 hover:text-ink hover:border-ink active:scale-95"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen ? "true" : "false"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer — full screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-paper bg-noise"
            >
              <div className="flex h-full flex-col px-6 pt-24 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto">
                <nav className="flex flex-col gap-1">
                  {links.map(({ key, href }, i) => (
                    <motion.div
                      key={key}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.15 + i * 0.06,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline justify-between border-b border-border py-5 text-3xl font-semibold tracking-tight text-ink active:text-accent"
                      >
                        <span>{t(key)}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Primary actions */}
                <motion.div
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8 flex flex-col gap-3"
                >
                  <a
                    href={PHONE_TEL}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent text-paper text-base font-semibold py-4 min-h-12 shadow-[0_10px_30px_-10px_var(--color-accent-glow)] active:scale-[0.99]"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    {t("callUs")}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ink text-ink text-base font-semibold py-4 min-h-12 active:scale-[0.99]"
                  >
                    <MessageSquare className="h-5 w-5" aria-hidden />
                    {t("contact")}
                  </a>
                </motion.div>

                {/* Footer info */}
                <div className="mt-auto pt-10 space-y-3">
                  <a
                    href={CONTACT_MAILTO}
                    className="block text-sm text-ink-2 hover:text-ink transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink-3">
                    <span>evocrea.io</span>
                    <LiveTime
                      timeZone="Asia/Riyadh"
                      label="Riyadh"
                      locale={locale === "ar" ? "ar-SA" : "en-US"}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
