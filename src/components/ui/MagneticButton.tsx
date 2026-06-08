"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg cursor-pointer select-none transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2",
  };

  const variants = {
    primary:
      "bg-ink text-white border border-ink hover:-translate-y-px hover:bg-ink-2 active:translate-y-0 shadow-sm",
    secondary:
      "bg-surface text-ink border border-border hover:border-border-strong hover:-translate-y-px active:translate-y-0 shadow-xs",
    ghost:
      "bg-transparent text-ink-2 border border-transparent hover:text-ink hover:border-border active:bg-raised",
  };

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    disabled && "opacity-40 pointer-events-none",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
