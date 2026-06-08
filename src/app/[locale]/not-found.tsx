import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="relative min-h-[100svh] flex flex-col items-center justify-center bg-paper text-center px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-accent-tint), transparent 60%)",
        }}
      />
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-6">
          Error · 404
        </p>
        <h1
          className="display-heading italic text-[clamp(7rem,22vw,22rem)] font-normal leading-none tracking-[-0.04em] text-ink"
          aria-label="404"
        >
          404<span className="text-accent">.</span>
        </h1>
        <h2 className="mt-8 text-2xl md:text-4xl font-semibold tracking-tight text-ink">
          This page doesn&apos;t exist.
        </h2>
        <p className="mt-5 text-ink-2 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <MagneticButton href="/en" variant="primary" size="lg">
            Go home
          </MagneticButton>
          <Link
            href="/en/showroom"
            data-cursor="View"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 hover:text-ink transition-colors"
          >
            View showroom
            <span className="inline-block h-px w-8 bg-ink-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
