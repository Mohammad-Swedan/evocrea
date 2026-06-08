import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * Pure-CSS marquee. Children are rendered twice for seamless loop.
 * Place plain inline content (text, icons) inside.
 */
export default function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  const speedCls =
    speed === "fast" ? "fast" : speed === "slow" ? "slow" : undefined;

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "marquee-track",
          speedCls,
          reverse && "reverse",
          itemClassName,
        )}
      >
        <span className="inline-flex items-center gap-16 pr-16">
          {children}
        </span>
        <span className="inline-flex items-center gap-16 pr-16">
          {children}
        </span>
      </div>
    </div>
  );
}
