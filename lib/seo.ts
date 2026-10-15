import type { Metadata } from "next";
import { siteConfig, siteText } from "@/config/site";
import { type Locale, type Localized, htmlLang, localePath, locales, ogLocale } from "@/lib/i18n";

/**
 * Single source of truth for per-route SEO metadata.
 *
 * Every route declares its own title, description and canonical here, in both
 * languages, so no two pages compete with the same snippet. Indonesian copy is
 * plain and leads with the commercial intent a local buyer would actually
 * search for, with the city and region named where it is truthful to do so.
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

export type RouteKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "industry"
  | "products"
  | "contact"
  | "privacy"
  | "terms";

interface RouteText {
  title: string;
  description: string;
  /** Label used for the breadcrumb trail; omitted on the home route. */
  breadcrumb?: string;
}

interface RouteSeo {
  /** The language-neutral path. English adds `/en` in front. */
  path: string;
  /** Sitemap hints. */
  priority: number;
  changeFrequency: "yearly" | "monthly" | "weekly";
  text: Localized<RouteText>;
}

export const routeSeo: Record<RouteKey, RouteSeo> = {
  home: {
    path: "/",
    priority: 1,
    changeFrequency: "monthly",
    text: {
      id: {
        title: "Extended IT Partner: Software, Desain & IoT",
        description:
          "KaryaLo, mitra IT di Bekasi untuk software, desain UI/UX, dan perangkat IoT. Dukungan dari perencanaan hingga peluncuran dan pemeliharaan sistem.",
      },
      en: {
        title: "Extended IT Partner: Software, Design & IoT",
        description:
          "KaryaLo is your IT partner in Bekasi for software, UI/UX design, and IoT. Support from planning and development through launch and maintenance.",
      },
    },
  },
  about: {
    path: "/about",
    priority: 0.8,
    changeFrequency: "yearly",
    text: {
      id: {
        title: "Tentang PT Karsa Swakarya Loka",
        description:
          "Kenali KaryaLo, merek layanan PT Karsa Swakarya Loka di Bekasi. Pelajari visi, keahlian tim, proses kerja, dan legalitas perusahaan kami.",
        breadcrumb: "Tentang Kami",
      },
      en: {
        title: "About PT Karsa Swakarya Loka",
        description:
          "Meet KaryaLo, the service brand of PT Karsa Swakarya Loka in Bekasi. Explore our vision, team expertise, working process, and company credentials.",
        breadcrumb: "About Us",
      },
    },
  },
  services: {
    path: "/services",
    priority: 0.9,
    changeFrequency: "monthly",
    text: {
      id: {
        title: "Layanan Software, Desain UI/UX & IoT",
        description:
          "Pengembangan website dan aplikasi, desain UI/UX, identitas merek, serta perangkat IoT. Temukan layanan dan dukungan sistem yang sesuai untuk bisnis Anda.",
        breadcrumb: "Services",
      },
      en: {
        title: "Services: Software, UI/UX Design & IoT",
        description:
          "Explore website and app development, UI/UX, brand identity, and IoT services from KaryaLo, with project scoping and post-launch maintenance options.",
        breadcrumb: "Services",
      },
    },
  },
  portfolio: {
    path: "/portfolio",
    priority: 0.9,
    changeFrequency: "monthly",
    text: {
      id: {
        title: "Portofolio Proyek Software, Web & Desain",
        description:
          "Jelajahi proyek klien, produk KaryaLo, dan purwarupa internal: website perusahaan, toko online, ERP, dashboard, serta sistem transaksi digital.",
        breadcrumb: "Portfolio",
      },
      en: {
        title: "Software, Web & Design Portfolio",
        description:
          "Explore KaryaLo client projects, products, and prototypes: company websites, online stores, ERP, dashboards, and digital transaction systems.",
        breadcrumb: "Portfolio",
      },
    },
  },
  industry: {
    path: "/industry",
    priority: 0.8,
    changeFrequency: "monthly",
    text: {
      id: {
        title: "Solusi per Industri: Ritel, Logistik, Manufaktur",
        description:
          "Temukan penerapan software, desain, dan IoT untuk ritel, jasa korporat, produk digital, distribusi, manufaktur, serta pengelolaan gedung.",
        breadcrumb: "Industri",
      },
      en: {
        title: "Solutions by Industry: Retail, Logistics, Manufacturing",
        description:
          "Explore software, design, and IoT applications for retail, corporate services, digital products, logistics, manufacturing, and building management.",
        breadcrumb: "Industries",
      },
    },
  },
  products: {
    path: "/products",
    priority: 0.7,
    changeFrequency: "monthly",
    text: {
      id: {
        title: "Platform Siap Pakai untuk Bisnis",
        description:
          "Jelajahi platform KaryaLo untuk dashboard bisnis, toko online, dan top-up digital. Tinjau ketersediaan, demo, penyesuaian, serta opsi lisensi.",
        breadcrumb: "Produk",
      },
      en: {
        title: "Ready-Made Business Platforms",
        description:
          "Explore KaryaLo platforms for business reporting, online stores, and digital top-ups. Review availability, demos, customisation, and licensing options.",
        breadcrumb: "Products",
      },
    },
  },
  contact: {
    path: "/contact",
    priority: 0.8,
    changeFrequency: "yearly",
    text: {
      id: {
        title: "Hubungi KaryaLo & Konsultasi Proyek",
        description:
          "Diskusikan kebutuhan software, desain, atau IoT dengan tim KaryaLo. Hubungi kami melalui WhatsApp atau email untuk konsultasi awal pada jam kerja.",
        breadcrumb: "Kontak",
      },
      en: {
        title: "Contact KaryaLo & Discuss Your Project",
        description:
          "Discuss your software, design, or IoT requirements with KaryaLo. Contact us via WhatsApp or email for an initial consultation during business hours.",
        breadcrumb: "Contact",
      },
    },
  },
  privacy: {
    path: "/privacy",
    priority: 0.3,
    changeFrequency: "yearly",
    text: {
      id: {
        title: "Kebijakan Privasi",
        description:
          "Pelajari cara KaryaLo menerima, menggunakan, dan melindungi data Anda, termasuk alur formulir WhatsApp, penyimpanan data, dan layanan pihak ketiga.",
        breadcrumb: "Kebijakan Privasi",
      },
      en: {
        title: "Privacy Policy",
        description:
          "Learn how KaryaLo receives, uses, and protects your information, including the WhatsApp form workflow, data retention, and third-party services.",
        breadcrumb: "Privacy Policy",
      },
    },
  },
  terms: {
    path: "/terms",
    priority: 0.3,
    changeFrequency: "yearly",
    text: {
      id: {
        title: "Syarat & Ketentuan Layanan",
        description:
          "Ketentuan layanan KaryaLo mengenai ruang lingkup, pembayaran, garansi, kerahasiaan, kepemilikan hasil kerja, dan penggunaan materi portofolio.",
        breadcrumb: "Syarat & Ketentuan",
      },
      en: {
        title: "Terms & Conditions of Service",
        description:
          "KaryaLo's service terms covering project scope, payment milestones, warranty, confidentiality, ownership of deliverables, and portfolio use.",
        breadcrumb: "Terms & Conditions",
      },
    },
  },
};

/**
 * The date each route's content last actually changed.
 *
 * `app/sitemap.ts` used to stamp `new Date()` on every URL, so all pages
 * claimed to have changed the moment a crawler fetched the sitemap. Google
 * stops trusting `lastmod` once it reads like that, and the recrawl hint is
 * worth more than the convenience. Update by hand when the copy on a route
 * really changes.
 */
export const routeUpdatedAt: Record<RouteKey, string> = {
  home: "2026-10-15",
  about: "2026-10-15",
  services: "2026-10-15",
  portfolio: "2026-10-15",
  industry: "2026-10-15",
  products: "2026-10-15",
  contact: "2026-10-15",
  privacy: "2026-10-15",
  terms: "2026-10-15",
};

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/** The hreflang set for a language-neutral path: both languages plus x-default. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of locales) languages[htmlLang[lang]] = localePath(lang, path);
  languages["x-default"] = localePath("id", path);
  return languages;
}

/**
 * Metadata for any page: canonical, hreflang alternates, and the
 * OpenGraph/Twitter pair. The brand name is appended by the layout's title
 * template, so `title` stays short enough to survive SERP truncation.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = localePath(lang, path);
  const cardAlt = `${siteConfig.brandName} — ${siteText[lang].tagline}`;
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((other) => other !== lang).map((other) => ogLocale[other]),
      url: absoluteUrl(canonical),
      siteName: siteConfig.brandName,
      title: `${title} — ${siteConfig.brandName}`,
      description,
      images: [{ ...OG_CARD, alt: cardAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.brandName}`,
      description,
      images: [{ ...OG_CARD, alt: cardAlt }],
    },
  };
}

/** Metadata for one of the fixed routes above. */
export function buildMetadata(key: RouteKey, lang: Locale): Metadata {
  const route = routeSeo[key];
  const text = route.text[lang];
  return pageMetadata({ lang, path: route.path, title: text.title, description: text.description });
}
