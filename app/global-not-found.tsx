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
  title: "Halaman Tidak Ditemukan · Page Not Found | KaryaLo",
  description: "Halaman yang Anda cari tidak tersedia. Kembali ke situs KaryaLo dalam bahasa Indonesia atau Inggris.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="id" className={`${fontVariables} antialiased`}>
      <body className="min-h-screen flex flex-col text-ink">
        <main id="main-content" className="relative flex flex-1 items-center overflow-hidden py-24">
          {/* The template's huge faded figure behind the message. */}
          <p aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(10rem,6rem+22vw,26rem)] font-bold leading-none tracking-[-0.06em] text-[#EDF2F9]">
            404
          </p>
          <div className="agx-wrap relative space-y-8">
            <p className="enter-up badge-pill">KaryaLo · 404</p>
            <div className="space-y-5">
              <h1 className="enter-up agx-h1 !mt-0" style={{ animationDelay: "0.1s" }}>Halaman tidak ditemukan.</h1>
              <p className="enter-up agx-sub !mt-0" style={{ animationDelay: "0.2s" }}>
                Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda.
              </p>
            </div>
            <div lang="en" className="enter-up max-w-xl space-y-1.5 border-t border-line pt-6" style={{ animationDelay: "0.3s" }}>
              <p className="text-[1.25rem] font-medium tracking-[-0.02em] text-ink">Page not found.</p>
              <p className="type-body text-body">The page you are looking for is unavailable or has moved. Please return to the home page.</p>
            </div>
            <div className="enter-up flex flex-wrap items-center gap-5" style={{ animationDelay: "0.4s" }}>
              <Link href="/" className="btn btn-dark">Kembali ke beranda</Link>
              <Link href="/en" lang="en" hrefLang="en" className="text-link text-ink hover:text-brand">English home page</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
