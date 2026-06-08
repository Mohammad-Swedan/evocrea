"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import HoverPreviewList, {
  type HoverPreviewItem,
} from "@/components/ui/HoverPreviewList";
import DashboardMock from "@/components/ui/DashboardMock";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/mdx";

interface ShowroomSectionProps {
  projects: CaseStudy[];
}

function tintFor(mockType: string | undefined) {
  switch (mockType) {
    case "ecommerce":
      return "#EDEAE3";
    case "elearning":
      return "#E8E5F8";
    case "custom":
      return "#E0F2EA";
    case "crm":
    default:
      return "#FFE8DF";
  }
}

export default function ShowroomSection({ projects }: ShowroomSectionProps) {
  const t = useTranslations("showroom");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  if (projects.length === 0) return null;

  const items: HoverPreviewItem[] = projects.slice(0, 4).map((p, i) => ({
    id: p.slug,
    index: String(i + 1).padStart(2, "0"),
    title: p.title,
    meta: p.industry,
    href: `/${locale}/showroom/${p.slug}`,
    cursorLabel: "Open case",
    previewColor: tintFor(p.mockType),
    preview: <DashboardMock type={p.mockType || "crm"} compact />,
  }));

  return (
    <section
      id="showroom"
      className="relative bg-ink-deep text-paper py-24 md:py-32 overflow-hidden"
    >
      {/* subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-noise" />
      {/* ambient ember halo */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-glow), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-6">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-12 mb-16 md:mb-24">
          <Reveal className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
              {t("sectionLabel")}
            </p>
          </Reveal>

          <div className="md:col-span-7">
            <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-paper text-balance">
              <SplitText
                text={t("title")}
                by="words"
                stagger={0.06}
                className="block"
              />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-md text-paper/70">{t("subtitle")}</p>
            </Reveal>
          </div>

          <div className="md:col-span-3 md:pt-4 md:text-right">
            <Reveal delay={0.3}>
              <Link
                href={`/${locale}/showroom`}
                data-cursor="Browse all"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70 hover:text-accent transition-colors"
              >
                {t("viewAll")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* List */}
        <Reveal delay={0.1}>
          <HoverPreviewList items={items} tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
