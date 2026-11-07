import type { Metadata, Viewport } from "next";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import Preloader, { PRELOAD_SCRIPT } from "@/components/layout/Preloader";
import { EARLY_REVEAL_SCRIPT } from "@/components/motion/earlyReveal";
import JsonLd from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import { commonCopy } from "@/content/common";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { type Locale, htmlLang } from "@/lib/i18n";
import { buildMetadata, routeSeo } from "@/lib/seo";
import { fontVariables } from "@/app/fonts";
import "@/app/globals.css";

/**
 * Everything the two root layouts — `app/(id)/layout.tsx` and
 * `app/(en)/en/layout.tsx` — have in common. Each layout only says which
 * language it is; the document, chrome and site-wide metadata live here.
 */

const keywords: Record<Locale, string[]> = {
  id: [
    "extended IT partner",
    "jasa pembuatan software",
    "software house Bekasi",
    "jasa pembuatan aplikasi",
    "jasa UI UX design",
    "vendor IoT Indonesia",
    "pengembangan web korporat",
    "KaryaLo Digital Solution",
    "PT Karsa Swakarya Loka",
  ],
  en: [
    "extended IT partner",
    "software development Indonesia",
    "software house Bekasi",
    "app development company Indonesia",
    "UI UX design agency",
    "IoT developer Indonesia",
    "KaryaLo Digital Solution",
    "PT Karsa Swakarya Loka",
  ],
};

export function rootMetadata(lang: Locale): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata("home", lang),
    title: {
      // Keyword first: Google cuts the tail of a long title, and what a buyer
      // searches for is the service, not the studio's name.
      default: `${routeSeo.home.text[lang].title} | ${siteConfig.brandName}`,
      // Short suffix so page titles survive SERP truncation.
      template: "%s | KaryaLo",
    },
    applicationName: siteConfig.brandName,
    authors: [{ name: siteConfig.companyName, url: siteConfig.url }],
    creator: siteConfig.companyName,
    publisher: siteConfig.companyName,
    category: "technology",
    keywords: keywords[lang],
    formatDetection: { telephone: true, address: true, email: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    // Icons come from the app/ file conventions: favicon.ico, icon.png, apple-icon.png.
  };
}

/** Mobile browser chrome picks up the logo blue. */
export const rootViewport: Viewport = {
  themeColor: "#1D469D",
};

export default function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: PRELOAD_SCRIPT may add `data-preload` to <html> before React hydrates.
    <html lang={htmlLang[lang]} data-scroll-behavior="smooth" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-ink">
        {/* Decides before first paint whether this view gets the logo loader (every full load: first visit or refresh). */}
        <script dangerouslySetInnerHTML={{ __html: PRELOAD_SCRIPT }} />
        <Preloader />
        <JsonLd data={[organizationSchema(lang), websiteSchema]} />
        <Analytics />
        <SmoothScrollProvider>
          <a href="#main-content" className="skip-link">{commonCopy[lang].skipLink}</a>
          <Navbar lang={lang} />
          {children}
          <Footer lang={lang} />
          <WhatsAppFab lang={lang} />
        </SmoothScrollProvider>
        {/* After all the content: starts the entrance of reveals already on screen without waiting for hydration. */}
        <script dangerouslySetInnerHTML={{ __html: EARLY_REVEAL_SCRIPT }} />
      </body>
    </html>
  );
}
