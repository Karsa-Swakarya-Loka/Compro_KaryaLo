import type { Metadata, Viewport } from "next";
import { Archivo, Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { buildMetadata, routeSeo } from "@/lib/seo";
import "./globals.css";

/**
 * Bebas Neue is the display face only — headlines and other large type.
 *
 * It ships one weight (400) with no lowercase or italic glyphs, so `globals.css`
 * pins weight 400 and `font-synthesis: none` on `.font-headline`: a faked bold
 * or oblique on a condensed face smears the stems. Everything smaller keeps a
 * face with real weights — Archivo for meta labels, Satoshi for body copy.
 */
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/** Meta labels, buttons and small caps — a real weight range, unlike Bebas. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Satoshi is not on Google Fonts, so it is self-hosted rather than pulled from
 * Fontshare over a render-blocking CSS @import. This keeps all three families on
 * the same preloaded, self-hosted path with no extra origin on the critical path.
 */
const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata("home"),
  title: {
    // Keyword first: Google cuts the tail of a long title, and what a buyer
    // searches for is the service, not the studio's name.
    default: `${routeSeo.home.title} — ${siteConfig.brandName}`,
    // Short suffix so page titles survive SERP truncation.
    template: "%s — KaryaLo",
  },
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.companyName, url: siteConfig.url }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  category: "technology",
  keywords: [
    "jasa pembuatan software",
    "software house Bekasi",
    "jasa pembuatan aplikasi",
    "jasa UI UX design",
    "vendor IoT Indonesia",
    "pengembangan web korporat",
    "KaryaLo Digital Solution",
    "PT Karsa Swakarya Loka",
  ],
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Icons come from the app/ file conventions: favicon.ico, icon.png, apple-icon.png.
};

/** Mobile browser chrome picks up the dominant navy. */
export const viewport: Viewport = {
  themeColor: "#1F2E5A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${archivo.variable} ${satoshi.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-porcelain text-midnight">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Analytics />
        <SmoothScrollProvider>
          <a href="#main-content" className="skip-link">Langsung ke konten</a>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
