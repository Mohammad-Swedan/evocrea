"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

/**
 * Sticky mobile-only bottom action bar.
 * - Hidden above md:
 * - Hidden when user is at the very top (so the hero feels uncluttered)
 * - Hidden when an overlay menu is open (parent can listen for body[data-menu-open])
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("mobileBar");

  useEffect(() => {
    const onScroll = () => {
      // Show after the user scrolls past ~40% of the first viewport
      setVisible(window.scrollY > Math.max(280, window.innerHeight * 0.4));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none"
          aria-hidden={false}
        >
          <div className="pointer-events-auto mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] rounded-2xl border border-border bg-surface/95 backdrop-blur-md shadow-lg">
            <div className="flex items-stretch gap-1 p-1.5">
              <a
                href={PHONE_TEL}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-paper font-semibold text-sm py-3 min-h-12 active:scale-[0.98] transition-transform shadow-[0_8px_22px_-10px_var(--color-accent-glow)]"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>{t("book")}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface text-ink font-semibold text-sm px-4 min-h-12 min-w-12 active:scale-[0.98] transition-transform"
                aria-label={t("contact")}
              >
                <MessageSquare className="h-4 w-4" aria-hidden />
                <span className="sr-only sm:not-sr-only">{t("contact")}</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
