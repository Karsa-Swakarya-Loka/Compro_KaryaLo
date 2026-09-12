import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Single source of truth for per-route SEO metadata.
 *
 * Every route declares its own title, description and canonical here, so no two
 * pages compete with the same snippet. Copy is plain Indonesian and leads with
 * the commercial intent a local buyer would actually search for, with the city
 * and region named where it is truthful to do so.
 */

/**
 * The generated link-preview card from `app/opengraph-image.tsx`.
 *
 * It has to be named here rather than left to the file convention: Next only
 * folds a generated card into a route's metadata when the route declares no
 * `openGraph` object of its own, and every route here declares one to carry its
 * own title and description. Without this the inner pages shipped no og:image.
 */
export const OG_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

type RouteKey =
  | "home"
  | "services"
  | "works"
  | "products"
  | "about"
  | "contact"
  | "privacy"
  | "terms";

interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Label used for the breadcrumb trail; omitted on the home route. */
  breadcrumb?: string;
  /** Sitemap hints. */
  priority: number;
  changeFrequency: "yearly" | "monthly" | "weekly";
}

export const routeSeo: Record<RouteKey, RouteSeo> = {
  home: {
    path: "/",
    title: "Jasa Software, UI/UX & IoT di Bekasi",
    description:
      "Kami membangun website, aplikasi, desain UI/UX, dan perangkat IoT untuk bisnis di Bekasi dan Jabodetabek. Source code jadi milik Anda setelah proyek selesai.",
    priority: 1,
    changeFrequency: "monthly",
  },
  services: {
    path: "/services",
    title: "Layanan: Pembuatan Software, UI/UX & IoT",
    description:
      "Tiga layanan KaryaLo: pembuatan website dan aplikasi, desain UI/UX dan identitas merek, serta perangkat IoT. Untuk bisnis di Bekasi dan sekitar Jabodetabek.",
    breadcrumb: "Layanan",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  works: {
    path: "/works",
    title: "Portofolio Proyek Software, Web & IoT",
    description:
      "Studi kasus toko online dan sistem gudang, website perusahaan, dashboard laporan, dan perangkat IoT yang dibangun KaryaLo untuk klien maupun riset internal.",
    breadcrumb: "Portofolio",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  products: {
    path: "/products",
    title: "Platform Siap Pakai untuk Bisnis",
    description:
      "Platform siap pakai KaryaLo: dashboard laporan, toko online, dan sistem voucher serta top-up digital. Bisa didemokan dan dipakai dengan brand Anda sendiri.",
    breadcrumb: "Produk",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  about: {
    path: "/about",
    title: "Tentang PT Karsa Swakarya Loka",
    description:
      "Studio teknologi dan desain berbadan hukum di Kota Bekasi. Profil legal, bengkel perakitan perangkat IoT, dan janji serah terima hak cipta penuh ke klien.",
    breadcrumb: "Tentang",
    priority: 0.8,
    changeFrequency: "yearly",
  },
  contact: {
    path: "/contact",
    title: "Hubungi Kami & Diskusi Awal",
    description:
      "Ceritakan kebutuhan software, desain, atau perangkat IoT Anda. Biasanya kami balas di bawah 15 menit pada jam kerja. Kantor di Jatisampurna, Kota Bekasi.",
    breadcrumb: "Kontak",
    priority: 0.8,
    changeFrequency: "yearly",
  },
  privacy: {
    path: "/privacy",
    title: "Kebijakan Privasi",
    description:
      "Bagaimana KaryaLo mengumpulkan, memakai, dan menjaga data yang Anda kirimkan lewat formulir proyek dan WhatsApp resmi kami.",
    breadcrumb: "Kebijakan Privasi",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  terms: {
    path: "/terms",
    title: "Syarat & Ketentuan Layanan",
    description:
      "Ketentuan kerja sama KaryaLo: ruang lingkup SPK, pembayaran bertahap, garansi, kerahasiaan (NDA), dan serah terima hak cipta ke klien.",
    breadcrumb: "Syarat & Ketentuan",
    priority: 0.3,
    changeFrequency: "yearly",
  },
};

/**
 * The date each route's content last actually changed.
 *
 * `app/sitemap.ts` used to stamp `new Date()` on every URL, so all thirteen
 * pages claimed to have changed the moment a crawler fetched the sitemap. Google
 * stops trusting `lastmod` once it reads like that, and the recrawl hint is
 * worth more than the convenience. Seeded from the git history of each route's
 * own files; update by hand when the copy on a route really changes.
 */
export const routeUpdatedAt: Record<RouteKey, string> = {
  home: "2026-09-11",
  services: "2026-09-11",
  works: "2026-09-11",
  products: "2026-09-11",
  about: "2026-09-11",
  contact: "2026-09-11",
  privacy: "2026-09-11",
  terms: "2026-09-10",
};

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Builds the Metadata object for a route, including the canonical and the
 * OpenGraph/Twitter pair. The brand name is appended by the layout's title
 * template, so `title` here stays short enough to survive SERP truncation.
 */
export function buildMetadata(key: RouteKey): Metadata {
  const route = routeSeo[key];
  const url = absoluteUrl(route.path);
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: route.path },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url,
      siteName: siteConfig.brandName,
      title: `${route.title} — ${siteConfig.brandName}`,
      description: route.description,
      images: [{ ...OG_CARD, alt: `${siteConfig.brandName} — ${siteConfig.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${route.title} — ${siteConfig.brandName}`,
      description: route.description,
      images: [{ ...OG_CARD, alt: `${siteConfig.brandName} — ${siteConfig.tagline}` }],
    },
  };
}
