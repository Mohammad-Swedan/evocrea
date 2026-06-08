import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  accentWord?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
  accentWord,
}: SectionHeadingProps) {
  const displayTitle = accentWord
    ? title.replace(
        accentWord,
        `<span class="text-accent">${accentWord}</span>`,
      )
    : title;

  return (
    <div
      className={cn("max-w-2xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-3 mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-ink mb-4"
        dangerouslySetInnerHTML={{ __html: displayTitle }}
      />
      {subtitle && (
        <p
          className={cn(
            "text-ink-2 text-lg leading-relaxed",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
