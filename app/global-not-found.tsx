import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import { siteConfig } from "@/config/site";
import "@/app/globals.css";

/**
 * The 404 for a URL that matches no route at all.
 *
 * The site has two root layouts, one per language, so there is no single
 * layout to render an unmatched URL inside; Next serves this standalone
 * document instead (see `experimental.globalNotFound` in next.config.ts).
 * A URL that matches no route has no language, so the page speaks both and
 * offers both home pages. A 404 raised inside a page (an unknown case-study
 * slug) still gets the full localized page from that language's not-found.tsx.
 */
export const metadata: Metadata = {
  // This document skips the root layouts, so it needs its own base for the
  // site-wide preview card that app/opengraph-image.tsx attaches to it.
  metadataBase: new URL(siteConfig.url),
  title: "Halaman Tidak Ditemukan · Page Not Found — KaryaLo",
  description: "Halaman yang Anda cari tidak tersedia. Kembali ke situs KaryaLo dalam bahasa Indonesia atau Inggris.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="id" className={`${fontVariables} antialiased`}>
      <body className="min-h-screen flex flex-col bg-surface text-ink">
        <main id="main-content" className="section-anchor flex flex-1 items-center px-4 md:px-12">
          <div className="mx-auto w-full max-w-3xl space-y-8">
            <p className="badge-pill">KaryaLo Digital Solution · 404</p>
            <div className="space-y-4">
              <h1 className="type-display-page text-ink">Halaman tidak ditemukan.</h1>
              <p className="type-lede text-body max-w-[60ch]">
                Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda.
              </p>
            </div>
            <div lang="en" className="space-y-2 border-t border-line pt-6">
              <p className="type-card-title text-ink">Page not found.</p>
              <p className="type-body text-body max-w-[60ch]">The page you are looking for is unavailable or has moved. Please return to the home page.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="btn btn-secondary">Kembali ke beranda</Link>
              <Link href="/en" lang="en" hrefLang="en" className="text-link">English home page</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
