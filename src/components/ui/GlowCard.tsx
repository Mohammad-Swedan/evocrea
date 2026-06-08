"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "violet" | "cyan";
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className,
  glowColor = "blue",
  onClick,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, visible: false }));
  };

  const glowColors = {
    blue: "rgba(79, 140, 255, 0.15)",
    violet: "rgba(139, 92, 246, 0.15)",
    cyan: "rgba(34, 211, 238, 0.15)",
  };

  const borderColors = {
    blue: "rgba(79, 140, 255, 0.3)",
    violet: "rgba(139, 92, 246, 0.3)",
    cyan: "rgba(34, 211, 238, 0.3)",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative glass rounded-2xl overflow-hidden cursor-pointer group",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* Spotlight effect */}
      {spotlight.visible && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColors[glowColor]}, transparent 60%)`,
          }}
        />
      )}

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${borderColors[glowColor]}, 0 0 40px ${glowColors[glowColor]}`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
