"use client";

import { Phone, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PHONE_TEL } from "@/lib/site";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

interface Props {
  /** Optional override label. Defaults to t('cta.bookCall'). */
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Hide the leading calendar icon (useful in compact contexts). */
  hideIcon?: boolean;
  /** Use ArrowUpRight as trailing icon instead of nothing. */
  trailingArrow?: boolean;
  "data-cursor"?: string;
}

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-sm gap-2.5",
  lg: "px-7 py-4 text-base gap-3",
};

const variants: Record<Variant, string> = {
  // Solid ink — works on light surfaces
  primary:
    "bg-ink text-paper border border-ink hover:bg-ink-2 hover:-translate-y-px shadow-sm",
  // Brand accent — most attention; good for hero / final CTA
  accent:
    "bg-accent text-paper border border-accent hover:bg-accent-dim hover:-translate-y-px shadow-[0_10px_30px_-10px_var(--color-accent-glow)]",
  // Subtle on light surfaces
  secondary:
    "bg-surface text-ink border border-border hover:border-ink hover:-translate-y-px shadow-xs",
  // Transparent
  ghost:
    "bg-transparent text-ink-2 border border-transparent hover:text-ink hover:border-border",
  // For dark backgrounds
  inverse:
    "bg-paper text-ink border border-paper hover:bg-paper/90 hover:-translate-y-px shadow-sm",
};

const base =
  "inline-flex items-center justify-center font-semibold rounded-full select-none " +
  "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-0 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "min-h-11 whitespace-nowrap"; // min-h-11 = ≥44px tap target

const iconSize: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-[18px] w-[18px]",
};

export default function BookingButton({
  label,
  variant = "accent",
  size = "lg",
  className,
  hideIcon = false,
  trailingArrow = true,
  "data-cursor": dataCursor = "Call",
}: Props) {
  const t = useTranslations("cta");
  const text = label ?? t("callUs");

  return (
    <a
      href={PHONE_TEL}
      data-cursor={dataCursor}
      className={cn(base, sizes[size], variants[variant], className)}
      aria-label={text}
    >
      {!hideIcon && <Phone className={iconSize[size]} aria-hidden />}
      <span>{text}</span>
      {trailingArrow && <ArrowUpRight className={iconSize[size]} aria-hidden />}
    </a>
  );
}
