"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  const getLocalePath = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || "/";
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border px-1 py-1 bg-paper/40 backdrop-blur-sm">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          aria-label={`Switch to ${locale === "en" ? "English" : "Arabic"}`}
          className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200 ${
            locale === currentLocale
              ? "bg-ink text-paper"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
