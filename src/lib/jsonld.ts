const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://evocrea.io";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EvoCrea",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-evocrea.png`,
    sameAs: [
      "https://twitter.com/evocrea_io",
      "https://linkedin.com/company/evocrea",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@evocrea.io",
    },
    description:
      "EvoCrea builds powerful digital systems and smart business solutions including CRM platforms, automation systems, e-commerce, e-learning platforms, and custom software.",
  };
}

export function websiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EvoCrea",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale === "ar" ? "ar" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}/showroom?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function caseStudyJsonLd({
  title,
  description,
  slug,
  locale,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${BASE_URL}/${locale}/showroom/${slug}`,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: "EvoCrea",
    },
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
