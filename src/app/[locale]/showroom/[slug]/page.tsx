import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
  getAllCaseStudies,
} from "@/lib/mdx";
import { caseStudyJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import DashboardMock from "@/components/ui/DashboardMock";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  const locales = ["en", "ar"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug, locale);
  if (!project) return {};
  return generateSeoMetadata({
    locale,
    title: `${project.title} — EvoCrea Case Study`,
    description: project.summary,
    path: `/showroom/${slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getCaseStudy(slug, locale);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const allProjects = getAllCaseStudies(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;
  const isRtl = locale === "ar";

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://evocrea.io";

  const breadcrumbs = [
    { name: isRtl ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    {
      name: isRtl ? "معرض الأعمال" : "Showroom",
      url: `${BASE_URL}/${locale}/showroom`,
    },
    { name: project.title, url: `${BASE_URL}/${locale}/showroom/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudyJsonLd({
              title: project.title,
              description: project.summary,
              slug,
              locale,
              date: project.date,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="pt-28 pb-20 bg-paper">
        <section className="max-w-7xl mx-auto px-6 py-12 border-b border-border">
          <Reveal>
            <nav
              className="flex items-center gap-2 text-sm text-ink-3 mb-10"
              aria-label="Breadcrumb"
            >
              <Link
                href={`/${locale}`}
                className="hover:text-ink transition-colors"
              >
                {isRtl ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="w-4 h-4 opacity-40" />
              <Link
                href={`/${locale}/showroom`}
                className="hover:text-ink transition-colors"
              >
                {isRtl ? "معرض الأعمال" : "Showroom"}
              </Link>
              <ChevronRight className="w-4 h-4 opacity-40" />
              <span className="text-ink">{project.title}</span>
            </nav>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-4">
              {project.industry}
            </p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-ink max-w-4xl mb-6">
              {project.title}
            </h1>
            <p className="text-ink-2 text-lg max-w-2xl leading-relaxed">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-border border border-border rounded-xl overflow-hidden">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-8 text-center bg-surface"
                >
                  <div className="font-mono text-3xl font-semibold text-ink mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-ink-3 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <Reveal>
            <div className="rounded-xl overflow-hidden border border-border shadow-md">
              <DashboardMock type={project.mockType || "crm"} />
            </div>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="divide-y divide-border border-y border-border">
            <Reveal>
              <div className="grid md:grid-cols-[160px_1fr] gap-8 py-12 items-start">
                <div>
                  <p className="font-mono text-xs text-ink-4 mb-1">01</p>
                  <h2 className="text-xl font-semibold text-ink">
                    {t("problem")}
                  </h2>
                </div>
                <p className="text-ink-2 leading-relaxed text-lg">
                  {project.problem}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid md:grid-cols-[160px_1fr] gap-8 py-12 items-start">
                <div>
                  <p className="font-mono text-xs text-ink-4 mb-1">02</p>
                  <h2 className="text-xl font-semibold text-ink">
                    {t("solution")}
                  </h2>
                </div>
                <p className="text-ink-2 leading-relaxed text-lg">
                  {project.solution}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid md:grid-cols-[160px_1fr] gap-8 py-12 items-start">
                <div>
                  <p className="font-mono text-xs text-ink-4 mb-1">03</p>
                  <h2 className="text-xl font-semibold text-ink">
                    {t("results")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <p className="leading-relaxed">{result}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
          <div className="flex items-center justify-between gap-8">
            {prevProject ? (
              <Link
                href={`/${locale}/showroom/${prevProject.slug}`}
                className="group flex items-center gap-3 text-ink-2 hover:text-ink transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-ink-4 mb-0.5">
                    {t("prevProject")}
                  </div>
                  <div className="font-medium">{prevProject.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/${locale}/showroom/${nextProject.slug}`}
                className="group flex items-center gap-3 text-ink-2 hover:text-ink transition-colors text-right"
              >
                <div>
                  <div className="text-xs text-ink-4 mb-0.5">
                    {t("nextProject")}
                  </div>
                  <div className="font-medium">{nextProject.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </div>
    </>
  );
}
