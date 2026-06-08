"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  className?: string;
}

const variants: Variants = {
  hidden: (direction: string) => ({
    opacity: 0,
    x: direction === "left" ? -16 : direction === "right" ? 16 : 0,
    y: direction === "up" ? 12 : direction === "down" ? -12 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
