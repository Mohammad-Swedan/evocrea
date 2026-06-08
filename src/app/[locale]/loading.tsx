export default function Loading() {
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center bg-paper px-6">
      <div className="flex flex-col items-center gap-8">
        <div className="display-heading italic text-7xl text-ink animate-pulse">
          EvoCrea<span className="text-accent">.</span>
        </div>
        <div className="h-px w-40 overflow-hidden bg-border">
          <div
            className="h-full w-1/3 bg-accent"
            style={{
              animation: "marquee-x 1.6s cubic-bezier(0.16,1,0.3,1) infinite",
            }}
          />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
          Loading
        </p>
      </div>
    </div>
  );
}
