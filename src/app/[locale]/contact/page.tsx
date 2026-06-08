import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import LiveTime from "@/components/ui/LiveTime";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return generateSeoMetadata({
    locale,
    title: isAr
      ? "تواصل مع إيفوكريا — ابدأ مشروعك اليوم"
      : "Contact EvoCrea — Start Your Project Today",
    description: isAr
      ? "احجز جلسة استراتيجية مجانية مع إيفوكريا. أخبرنا عن عملك وسنصمم النظام الرقمي المثالي لتحقيق نموك."
      : "Book a free strategy session with EvoCrea. Tell us about your business and we'll design the perfect digital system to drive your growth.",
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <main className="bg-paper text-ink">
      {/* Hero */}
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-[100rem] px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {locale === "ar" ? "(٠٠) — تواصل معنا" : "(00) — Contact"}
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
                <span className="block mt-1 display-heading italic font-normal text-accent">
                  {t("heroAccent")}
                </span>
              </h1>
              <Reveal delay={0.3}>
                <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-3xl">
                  <p className="text-ink-2 text-lg leading-relaxed">
                    {t("heroSubtext")}
                  </p>
                  <div className="flex flex-col gap-3 text-sm text-ink-3">
                    <LiveTime
                      label="Riyadh"
                      timeZone="Asia/Riyadh"
                      locale={locale === "ar" ? "ar-SA" : "en-US"}
                    />
                    <a
                      href="mailto:hello@evocrea.io"
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink hover:text-accent transition-colors"
                    >
                      hello@evocrea.io →
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
