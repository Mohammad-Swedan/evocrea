"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  /** Stagger delay between each line/word in seconds. */
  stagger?: number;
  /** Initial delay in seconds. */
  delay?: number;
  /** Split granularity. `lines` requires you to pre-split with newlines. */
  by?: "words" | "lines";
  className?: string;
  itemClassName?: string;
  /** Render-as wrapper element. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  once?: boolean;
}

/**
 * Mask-based per-word/per-line reveal. Each token slides up from below a
 * mask. Uses framer-motion variants so a parent can orchestrate timing.
 */
export default function SplitText({
  text,
  stagger = 0.06,
  delay = 0,
  by = "words",
  className,
  itemClassName,
  as: Tag = "span",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const tokens = by === "lines" ? text.split("\n") : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  } as const;

  const item = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  } as const;

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {tokens.map((tok, i) => (
        <span
          key={`${tok}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.22em", marginBottom: "-0.22em" }}
        >
          <motion.span
            variants={item}
            className={cn("inline-block", itemClassName)}
          >
            {tok}
            {i < tokens.length - 1 && by === "words" ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
