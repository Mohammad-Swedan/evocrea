"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CounterProps {
  /** Final numeric value (e.g. 140). */
  value: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "+", "%", "K"). */
  suffix?: string;
  /** Number of decimals. */
  decimals?: number;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Tweened counter that animates from 0 → value when scrolled into view.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    duration: duration * 1000,
    bounce: 0,
  });
  const display = useTransform(spring, (v) => {
    return prefix + v.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
