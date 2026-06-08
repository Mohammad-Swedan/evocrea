import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CaseStudyFrontmatter {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  results: string[];
  stats: { label: string; value: string }[];
  date: string;
  color: string;
  mockType: "crm" | "ecommerce" | "elearning" | "custom";
}

export interface CaseStudy extends CaseStudyFrontmatter {
  content: string;
}

const contentRoot = path.join(process.cwd(), "content", "case-studies");

export function getAllCaseStudySlugs(): string[] {
  const enDir = path.join(contentRoot, "en");
  if (!fs.existsSync(enDir)) return [];
  return fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string, locale: string): CaseStudy | null {
  const filePath = path.join(contentRoot, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    // Fallback to English
    const fallback = path.join(contentRoot, "en", `${slug}.mdx`);
    if (!fs.existsSync(fallback)) return null;
    const { data, content } = matter(fs.readFileSync(fallback, "utf-8"));
    return { ...(data as CaseStudyFrontmatter), slug, content };
  }
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return { ...(data as CaseStudyFrontmatter), slug, content };
}

export function getAllCaseStudies(locale: string): CaseStudy[] {
  const slugs = getAllCaseStudySlugs();
  return slugs
    .map((slug) => getCaseStudy(slug, locale))
    .filter((s): s is CaseStudy => s !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
