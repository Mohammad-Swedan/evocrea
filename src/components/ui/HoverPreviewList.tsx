"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HoverPreviewItem {
  /** Stable key. */
  id: string;
  /** Numbered/eyebrow label rendered on the left. */
  index: string;
  /** Headline text, rendered large. */
  title: string;
  /** Right-side meta (industry, type, etc.). */
  meta?: string;
  /** Optional href; if provided the row becomes a link. */
  href?: string;
  /** Optional cursor label hint shown to the magnetic cursor. */
  cursorLabel?: string;
  /** The preview rendered next to the cursor on hover. */
  preview: ReactNode;
  /** Background tint behind preview (hex). */
  previewColor?: string;
}

interface HoverPreviewListProps {
  items: HoverPreviewItem[];
  className?: string;
  /** Eyebrow label rendered above each row index column. */
  indexLabel?: string;
  /** Color tone of the list — `light` for paper backgrounds, `dark` for ink. */
  tone?: "light" | "dark";
}

/**
 * Awwwards-style editorial list: hovering a row reveals a floating preview
 * card that follows the cursor. Each row is a giant typographic line that
 * lifts and tints on hover.
 */
export default function HoverPreviewList({
  items,
  className,
  tone = "light",
}: HoverPreviewListProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const active = items.find((i) => i.id === hovered);

  const isDark = tone === "dark";
  const borderCls = isDark ? "border-paper/15" : "border-border";
  const dividerCls = isDark ? "divide-paper/15" : "divide-border";
  const idxCls = isDark ? "text-paper/40" : "text-ink-4";
  const metaCls = isDark ? "text-paper/55" : "text-ink-3";
  const titleIdleCls = isDark ? "text-paper/45" : "text-ink-2";
  const titleHoverCls = isDark ? "text-paper" : "text-ink";
  const arrowIdleCls = isDark
    ? "border-paper/25 text-paper/55"
    : "border-border text-ink-3";

  return (
    <div
      ref={wrapRef}
      className={cn("relative", className)}
      onMouseMove={handleMove}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Floating preview that follows cursor */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute z-30 hidden md:block"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              width: 380,
              height: 240,
            }}
          >
            <div
              className="h-full w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-black/10"
              style={{
                background: active.previewColor || "var(--color-surface)",
              }}
            >
              {active.preview}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial rows */}
      <ul className={cn("divide-y border-y", dividerCls, borderCls)}>
        {items.map((item) => {
          const isHovered = hovered === item.id;
          const rowClass =
            "group flex items-center justify-between gap-6 px-2 py-7 md:py-9 transition-colors duration-300 cursor-pointer";

          const inner = (
            <>
              {/* Left: index */}
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.2em] w-10 shrink-0",
                  idxCls,
                )}
              >
                {item.index}
              </span>

              {/* Middle: huge title */}
              <h3
                className={cn(
                  "flex-1 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isHovered ? titleHoverCls : titleIdleCls,
                )}
              >
                <span className="relative inline-block">
                  {item.title}
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-1 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isHovered ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              </h3>

              {/* Right: meta + arrow */}
              <div className="hidden md:flex items-center gap-5 shrink-0">
                {item.meta && (
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.18em]",
                      metaCls,
                    )}
                  >
                    {item.meta}
                  </span>
                )}
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                    isHovered
                      ? "border-accent bg-accent text-paper rotate-0"
                      : `${arrowIdleCls} -rotate-45`,
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </>
          );

          return (
            <li
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              className="relative"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  data-cursor={item.cursorLabel || "View"}
                  className={rowClass}
                >
                  {inner}
                </Link>
              ) : (
                <div data-cursor={item.cursorLabel} className={rowClass}>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
