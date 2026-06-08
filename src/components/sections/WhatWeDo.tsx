"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import HoverPreviewList, {
  type HoverPreviewItem,
} from "@/components/ui/HoverPreviewList";
import DashboardMock from "@/components/ui/DashboardMock";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";

const services = [
  { key: "crm", index: "01", mock: "crm" as const, color: "#FFE8DF" },
  {
    key: "ecommerce",
    index: "02",
    mock: "ecommerce" as const,
    color: "#EDEAE3",
  },
  {
    key: "elearning",
    index: "03",
    mock: "elearning" as const,
    color: "#E8E5F8",
  },
  { key: "custom", index: "04", mock: "custom" as const, color: "#E0F2EA" },
] as const;

export default function WhatWeDo() {
  const t = useTranslations("whatWeDo");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const items: HoverPreviewItem[] = services.map((s) => ({
    id: s.key,
    index: s.index,
    title: t(`${s.key}.title`),
    meta: t(`${s.key}.description`).split(".")[0],
    href: `/${locale}/services`,
    cursorLabel: "Discover",
    previewColor: s.color,
    preview: <DashboardMock type={s.mock} compact />,
  }));

  return (
    <section
      id="services"
      className="relative bg-paper border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[100rem] px-6">
        {/* Header — editorial split */}
        <div className="grid gap-10 md:grid-cols-12 mb-16 md:mb-24">
          <Reveal className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
              {t("sectionLabel")}
            </p>
          </Reveal>

          <div className="md:col-span-7">
            <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink text-balance">
              <SplitText
                text={t("title")}
                by="words"
                stagger={0.06}
                className="block"
              />
            </h2>
          </div>

          <div className="md:col-span-3 md:pt-4">
            <Reveal delay={0.2}>
              <p className="text-ink-2 leading-relaxed">{t("subtitle")}</p>
            </Reveal>
          </div>
        </div>

        {/* Editorial hover-preview list */}
        <Reveal delay={0.1}>
          <HoverPreviewList items={items} />
        </Reveal>

        {/* Footer hint */}
        <div className="mt-10 flex items-center justify-end gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-4">
          <span className="h-px w-10 bg-ink-4" />
          <span>{t("hoverHint")}</span>
        </div>
      </div>
    </section>
  );
}
