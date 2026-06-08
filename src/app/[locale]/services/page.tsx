import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import BookingButton from "@/components/ui/BookingButton";
import DashboardMock from "@/components/ui/DashboardMock";
import { ArrowUpRight, Check } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return generateSeoMetadata({
    locale,
    title: isAr
      ? "الخدمات — أنظمة CRM والتجارة الإلكترونية والتعليم | إيفوكريا"
      : "Services — CRM, E-commerce & E-learning Systems | EvoCrea",
    description: isAr
      ? "منصات CRM مخصصة ومحركات تجارة إلكترونية عالية الأداء وأنظمة تعليم إلكتروني مؤسسي وحلول رقمية مصممة للنمو."
      : "Custom CRM platforms, high-performance e-commerce engines, corporate e-learning systems, and bespoke digital solutions — built to scale.",
    path: "/services",
  });
}

const serviceKeys = ["crm", "ecommerce", "elearning", "custom"] as const;
const mockTypes = ["crm", "ecommerce", "elearning", "custom"] as const;
const slugs = [
  "crm-platform",
  "ecommerce-platform",
  "elearning-platform",
  null,
];
const bgs = ["#FFE8DF", "#EDEAE3", "#E8E5F8", "#E0F2EA"];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");

  return (
    <main className="bg-paper text-ink">
      {/* Hero */}
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {locale === "ar" ? "(٠٠) — الخدمات" : "(00) — Services"}
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
                <SplitText
                  text={t("heroLine1")}
                  by="words"
                  stagger={0.07}
                  className="block"
                />
                <span className="block mt-1">
                  <span className="display-heading italic font-normal text-accent">
                    {t("heroAccent")}
                  </span>
                </span>
              </h1>
              <Reveal delay={0.3}>
                <p className="mt-10 text-ink-2 text-lg max-w-2xl leading-relaxed">
                  {t("heroSubtext")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service rows */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[100rem] px-6">
          {serviceKeys.map((key, i) => {
            const slug = slugs[i];
            const features = [
              t(`${key}.f0` as Parameters<typeof t>[0]),
              t(`${key}.f1` as Parameters<typeof t>[0]),
              t(`${key}.f2` as Parameters<typeof t>[0]),
              t(`${key}.f3` as Parameters<typeof t>[0]),
              t(`${key}.f4` as Parameters<typeof t>[0]),
            ];
            return (
              <div
                key={key}
                className={`grid md:grid-cols-12 gap-8 md:gap-10 py-14 md:py-28 items-center ${i < serviceKeys.length - 1 ? "border-b border-border" : ""}`}
              >
                <div
                  className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Reveal>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-5">
                      (0{i + 1}) / 04
                    </p>
                    <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.02em] text-balance">
                      {t(`${key}.title` as Parameters<typeof t>[0])}
                    </h2>
                    <p className="mt-5 text-ink-2 text-lg italic display-heading">
                      {t(`${key}.subtitle` as Parameters<typeof t>[0])}
                    </p>
                    <ul className="mt-8 space-y-3 max-w-md">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-ink-2 border-b border-border pb-3"
                        >
                          <Check
                            className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <MagneticButton
                        href={
                          slug
                            ? `/${locale}/showroom/${slug}`
                            : `/${locale}/contact`
                        }
                        variant="secondary"
                        size="md"
                        className="!rounded-full w-full sm:w-auto"
                      >
                        {t(`${key}.cta` as Parameters<typeof t>[0])}{" "}
                        <ArrowUpRight className="w-4 h-4" />
                      </MagneticButton>
                      <BookingButton
                        size="md"
                        variant="accent"
                        className="w-full sm:w-auto"
                        trailingArrow={false}
                      />
                    </div>
                  </Reveal>
                </div>

                <div
                  className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <Reveal delay={0.15}>
                    <div
                      className="rounded-2xl overflow-hidden p-4 sm:p-6 md:p-10"
                      style={{ background: bgs[i] }}
                    >
                      <DashboardMock type={mockTypes[i]} />
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border bg-paper">
        <div className="mx-auto max-w-[100rem] px-6 text-center">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-6">
              {t("notSureLabel")}
            </p>
            <h2 className="text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
              {t("ctaHeadline")}{" "}
              <span className="display-heading italic font-normal text-accent">
                {t("ctaAccent")}
              </span>
            </h2>
            <p className="mt-6 text-ink-2 max-w-lg mx-auto">
              {t("ctaSubtext")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
              <BookingButton
                size="lg"
                variant="accent"
                className="w-full sm:w-auto"
              />
              <MagneticButton
                href={`/${locale}/contact`}
                variant="secondary"
                size="lg"
                className="!rounded-full w-full sm:w-auto"
              >
                {t("ctaSecondary")}
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
