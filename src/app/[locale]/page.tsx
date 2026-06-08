import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ShowroomSection from "@/components/sections/Showroom";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import FinalCTA from "@/components/sections/FinalCTA";
import ContactForm from "@/components/sections/ContactForm";
import { getAllCaseStudies } from "@/lib/mdx";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "EvoCrea — Digital Business Systems & Smart Solutions",
    ar: "نيكسورا — أنظمة الأعمال الرقمية والحلول الذكية",
  };
  const descriptions = {
    en: "EvoCrea builds powerful CRM platforms, automation systems, e-commerce stores, e-learning platforms, and custom software that transform how your business operates.",
    ar: "تبني نيكسورا منصات CRM قوية وأنظمة الأتمتة والمتاجر الإلكترونية ومنصات التعليم والبرمجيات المخصصة التي تحوّل طريقة عمل عملك.",
  };

  return generateSeoMetadata({
    locale,
    title: titles[locale as "en" | "ar"] || titles.en,
    description: descriptions[locale as "en" | "ar"] || descriptions.en,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = getAllCaseStudies(locale).slice(0, 4);

  return (
    <>
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <ShowroomSection projects={projects} />
      <HowItWorks />
      <Benefits />
      <FinalCTA />
      <ContactForm />
    </>
  );
}
