import { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://evocrea.io";
const locales = ["en", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCaseStudySlugs();

  const staticRoutes = [
    "",
    "/showroom",
    "/services",
    "/about",
    "/contact",
  ].flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
        ),
      },
    })),
  );

  const caseStudyRoutes = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/showroom/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [`${l}`, `${BASE_URL}/${l}/showroom/${slug}`]),
        ),
      },
    })),
  );

  return [...staticRoutes, ...caseStudyRoutes];
}
