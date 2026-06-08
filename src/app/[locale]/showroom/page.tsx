import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import { getAllCaseStudies } from "@/lib/mdx";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import DashboardMock from "@/components/ui/DashboardMock";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: "Showroom — EvoCrea Work & Case Studies",
    ar: "معرض الأعمال — مشاريع ودراسات حالة إيفوكريا",
  };
  const descriptions = {
    en: "Explore EvoCrea's portfolio of digital systems — CRM platforms, e-commerce stores, e-learning platforms, and custom software built for real businesses.",
    ar: "استكشف محفظة إيفوكريا من الأنظمة الرقمية — منصات CRM والمتاجر الإلكترونية ومنصات التعليم والبرمجيات المخصصة.",
  };
  return generateSeoMetadata({
    locale,
    title: titles[locale as "en" | "ar"] || titles.en,
    description: descriptions[locale as "en" | "ar"] || descriptions.en,
    path: "/showroom",
  });
}

const tones = ["#FFE8DF", "#EDEAE3", "#E8E5F8", "#E0F2EA"];

export default async function ShowroomPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("showroom");
  const projects = getAllCaseStudies(locale);

  const items = projects.map((p, i) => ({
    id: p.slug,
    index: String(i + 1).padStart(2, "0"),
    title: p.title,
    meta: p.industry,
    href: `/${locale}/showroom/${p.slug}`,
    cursorLabel: "View case",
    previewColor: tones[i % tones.length],
    preview: <DashboardMock type={p.mockType || "crm"} compact />,
  }));

  return (
    <main className="bg-paper text-ink">
      {/* Hero */}
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                (00) — Showroom
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
                <SplitText
                  text={t("title")}
                  by="words"
                  stagger={0.07}
                  className="block"
                />
                <span className="block mt-1 display-heading italic font-normal text-accent">
                  {t("heroAccent")}
                </span>
              </h1>
              <Reveal delay={0.3}>
                <p className="mt-10 text-ink-2 text-lg max-w-2xl leading-relaxed">
                  {t("heroSuffix")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Hover preview list */}
      <section className="pb-32">
        <div className="mx-auto max-w-[100rem] px-6">
          <HoverPreviewList items={items} tone="light" />
        </div>
      </section>
    </main>
  );
}
