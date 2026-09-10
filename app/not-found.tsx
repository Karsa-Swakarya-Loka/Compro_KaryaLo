import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * A 404 has nothing worth ranking, and letting it into the index would put an
 * empty page under the brand name. It gets its own title so the tab is not
 * mistaken for the home page, and an explicit no-index.
 */
export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Alamat yang Anda buka tidak tersedia di situs KaryaLo.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-1 items-center bg-porcelain px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <h1 className="font-headline text-5xl text-midnight md:text-7xl">Halaman tidak ditemukan.</h1>
        <p className="max-w-xl font-story text-lg text-mist-ink">Alamatnya mungkin sudah berubah atau memang tidak ada. Silakan kembali ke beranda, atau lihat layanan kami.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="nav-cta inline-flex">Kembali ke beranda <ArrowRight aria-hidden="true" size={16} /></Link>
          <Link href="/services" className="section-link">Lihat layanan</Link>
        </div>
      </div>
    </main>
  );
}
