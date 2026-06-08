"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LiveTimeProps {
  /** IANA timezone (default: viewer's local). */
  timeZone?: string;
  /** Optional city/region label. */
  label?: string;
  className?: string;
  locale?: string;
}

/**
 * Renders a live ticking clock — used in the navbar and footer to give the
 * site that "broadcasting from somewhere" editorial feel.
 */
export default function LiveTime({
  timeZone,
  label,
  className,
  locale = "en-US",
}: LiveTimeProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3",
        className,
      )}
      aria-label={label ? `Local time in ${label}` : "Local time"}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-accent"
        style={{ boxShadow: "0 0 8px var(--color-accent-glow)" }}
      />
      {label && <span>{label}</span>}
      <span className="tabular-nums text-ink">{time || "--:--:--"}</span>
    </span>
  );
}
