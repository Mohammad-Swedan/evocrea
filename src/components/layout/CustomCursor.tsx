"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Editorial custom cursor: a small dot follows the pointer 1:1, while a
 * larger ring lerps toward the pointer with easing. The ring scales up and
 * applies mix-blend-difference when hovering interactive elements, and morphs
 * into a pill with a label when an element exposes `data-cursor="…"`.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on fine pointers (desktop), and respect reduced-motion users
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isFine || reduced) return;

    // One-shot client-only enable; intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setLabel = (text: string | null) => {
      if (!labelRef.current || !ringRef.current) return;
      labelRef.current.textContent = text ?? "";
      ringRef.current.dataset.label = text ? "1" : "0";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      ) as HTMLElement | null;
      if (!interactive) {
        document.documentElement.style.setProperty("--cursor-scale", "1");
        setLabel(null);
        return;
      }
      const label = interactive.getAttribute("data-cursor");
      if (label) {
        document.documentElement.style.setProperty("--cursor-scale", "3");
        setLabel(label);
      } else {
        document.documentElement.style.setProperty("--cursor-scale", "1.8");
        setLabel(null);
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.style.removeProperty("--cursor-scale");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[199] flex h-9 w-9 items-center justify-center rounded-full border border-ink text-[10px] font-mono uppercase tracking-widest text-paper mix-blend-difference transition-[opacity,border-color] duration-200"
        style={{
          willChange: "transform",
          transitionProperty: "opacity, border-color, background-color",
        }}
      >
        <span ref={labelRef} />
      </div>
    </>
  );
}
