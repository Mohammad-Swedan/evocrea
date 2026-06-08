import { Metadata } from "next";

interface SeoParams {
  locale: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://evocrea.io";

export function generateSeoMetadata({
  locale,
  title,
  description,
  path = "",
  image,
  keywords = [],
  type = "website",
}: SeoParams): Metadata {
  const url = `${BASE_URL}/${locale}${path}`;
  const ogImage = image || `${BASE_URL}/og-${locale}.png`;

  const defaultKeywordsEn = [
    "digital business solutions",
    "CRM platform",
    "business automation",
    "e-commerce development",
    "e-learning platform",
    "custom software",
    "SaaS company",
    "business transformation",
  ];

  const defaultKeywordsAr = [
    "حلول رقمية",
    "أنظمة CRM",
    "أتمتة الأعمال",
    "تجارة إلكترونية",
    "منصات تعليم إلكتروني",
    "برمجيات مخصصة",
    "تحول رقمي",
    "نظام إدارة الأعمال",
  ];

  const allKeywords = [
    ...(locale === "ar" ? defaultKeywordsAr : defaultKeywordsEn),
    ...keywords,
  ];

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: "EvoCrea" }],
    creator: "EvoCrea",
    publisher: "EvoCrea",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ar: `${BASE_URL}/ar${path}`,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "EvoCrea",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@evocrea_io",
      site: "@evocrea_io",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
