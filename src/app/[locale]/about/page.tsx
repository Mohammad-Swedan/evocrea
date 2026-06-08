import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import BookingButton from "@/components/ui/BookingButton";
import LiveTime from "@/components/ui/LiveTime";
import Counter from "@/components/ui/Counter";
import { ArrowUpRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return generateSeoMetadata({
    locale,
    title: isAr
      ? "عن إيفوكريا — حلول الأعمال الرقمية"
      : "About EvoCrea — Digital Business Solutions",
    description: isAr
      ? "نحن إيفوكريا — فريق من المهندسين والمصممين والاستراتيجيين يبنون الأنظمة الرقمية التي تساعد الشركات على النمو بشكل أسرع."
      : "We are EvoCrea — a team of engineers, designers, and strategists building the digital systems that help businesses grow faster.",
    path: "/about",
  });
}

const stats: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  statKey: string;
}> = [
  { value: 140, suffix: "+", statKey: "stat0" },
  { value: 50, prefix: "$", suffix: "M+", statKey: "stat1" },
  { value: 98, suffix: "%", statKey: "stat2" },
  { value: 12, statKey: "stat3" },
];

const valueKeys = ["value0", "value1", "value2", "value3"] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <main className="bg-paper text-ink">
      <section className="relative pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {locale === "ar" ? "(٠٠) — عن الشركة" : "(00) — About"}
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
                  <SplitText
                    text={t("heroLine2") + " "}
                    by="words"
                    stagger={0.07}
                    as="span"
                    className="inline-block"
                  />
                  <span className="display-heading italic font-normal text-accent">
                    {t("heroAccent")}
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-12 items-end">
            <div className="md:col-span-2">
              <LiveTime
                label="Riyadh"
                timeZone="Asia/Riyadh"
                locale={locale === "ar" ? "ar-SA" : "en-US"}
              />
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.2}>
                <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
                  {t("heroSubtext")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.statKey} delay={i * 0.07}>
                <div
                  className={`px-6 py-14 ${i < stats.length - 1 ? "md:border-r border-border" : ""}`}
                >
                  <div className="font-mono text-5xl md:text-6xl font-semibold text-ink leading-none">
                    <Counter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-3">
                    {t(s.statKey as Parameters<typeof t>[0])}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid gap-10 md:grid-cols-12 mb-16">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {t("principlesLabel")}
              </p>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
                {t("principlesHeadline")}{" "}
                <span className="display-heading italic font-normal text-accent">
                  {t("principlesAccent")}
                </span>
              </h2>
            </div>
          </div>

          <div className="border-t border-border">
            {valueKeys.map((key, i) => (
              <Reveal key={key} delay={i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-border">
                  <span className="md:col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-4">
                    0{i + 1}
                  </span>
                  <h3 className="md:col-span-5 text-2xl md:text-3xl font-semibold text-ink tracking-tight">
                    {t(`${key}Title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="md:col-span-5 text-ink-2 leading-relaxed">
                    {t(`${key}Body` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[100rem] px-6 text-center">
          <Reveal>
            <h2 className="text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
              {t("ctaHeadline")}{" "}
              <span className="display-heading italic font-normal text-accent">
                {t("ctaAccent")}
              </span>
            </h2>
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
