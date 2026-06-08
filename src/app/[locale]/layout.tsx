import type { ReactNode } from "react";
import {
  Inter,
  IBM_Plex_Sans_Arabic,
  Geist,
  Geist_Mono,
  Fraunces,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getDir } from "@/lib/utils";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import LoaderProvider from "@/components/loader/LoaderProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic-ibm",
  display: "swap",
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getDir(locale);
  const fontVar =
    locale === "ar"
      ? `${ibmPlexArabic.variable} ${geist.variable} ${geistMono.variable} ${inter.variable} ${fraunces.variable}`
      : `${geist.variable} ${geistMono.variable} ${inter.variable} ${fraunces.variable}`;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVar} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd(locale)),
          }}
        />
      </head>
      <body className="bg-paper text-ink antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <LoaderProvider locale={locale}>
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
            </LoaderProvider>
          </SmoothScroll>
          <MobileCtaBar />
          <CustomCursor />
          <div className="grain-overlay" aria-hidden="true" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
