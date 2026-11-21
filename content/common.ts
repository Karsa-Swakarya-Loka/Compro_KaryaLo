import type { Localized } from "@/lib/i18n";

/**
 * Words the site chrome shares across every page: navigation, footer, the
 * floating WhatsApp button, the skip link and the 404.
 *
 * The navbar is fixed at six entries in this order — Beranda, Tentang Kami,
 * Layanan, Portofolio, Industri, Kontak — per the founder's decision of
 * 2026-10-15. On 2026-11-20 the owner asked for "Layanan" and "Portofolio"
 * in the Indonesian navbar too (they had stayed in English), so the
 * Indonesian site no longer mixes in English labels.
 */
export const commonCopy: Localized<{
  nav: { href: string; label: string }[];
  navLabel: string;
  mobileNavLabel: string;
  openMenu: string;
  closeMenu: string;
  languageLabel: string;
  /** Short code shown on the toggle for each language. */
  languageNames: { id: string; en: string };
  /** Accessible label for the link to the other language. */
  switchTo: string;
  skipLink: string;
  home: string;
  fab: { regionLabel: string; label: string };
  /** The navbar's WhatsApp button, shown from xl; the floating button covers smaller screens. */
  navCta: string;
  footer: {
    companyHeading: string;
    servicesHeading: string;
    productsHeading: string;
    productsLink: string;
    legalHeading: string;
    registered: string;
    registeredBody: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  notFound: { title: string; description: string; heading: string; body: string; home: string; services: string };
}> = {
  id: {
    nav: [
      { href: "/", label: "Beranda" },
      { href: "/about", label: "Tentang Kami" },
      { href: "/services", label: "Layanan" },
      { href: "/portfolio", label: "Portofolio" },
      { href: "/industry", label: "Industri" },
      { href: "/contact", label: "Kontak" },
    ],
    navLabel: "Navigasi utama",
    mobileNavLabel: "Navigasi seluler",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    languageLabel: "Bahasa",
    languageNames: { id: "ID", en: "EN" },
    // Written in the language it switches to, and marked `lang` on the link.
    switchTo: "Read this page in English",
    skipLink: "Langsung ke konten",
    home: "Beranda",
    fab: { regionLabel: "Kontak cepat", label: "Konsultasi lewat WhatsApp" },
    navCta: "Hubungi via WhatsApp",
    footer: {
      companyHeading: "Perusahaan",
      servicesHeading: "Layanan",
      productsHeading: "Platform Siap Pakai",
      productsLink: "Lihat platform KaryaLo",
      legalHeading: "Legalitas",
      registered: "Terdaftar Resmi",
      registeredBody: "terdaftar di sistem OSS Republik Indonesia.",
      privacy: "Kebijakan Privasi",
      terms: "Syarat & Ketentuan",
      copyright: "© 2026 PT Karsa Swakarya Loka (KaryaLo Digital Solution). Seluruh hak cipta dilindungi undang-undang.",
    },
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia. Kembali ke beranda atau jelajahi layanan KaryaLo.",
      heading: "Halaman tidak ditemukan.",
      body: "Halaman ini mungkin telah dipindahkan. Silakan kembali ke beranda atau jelajahi layanan yang dapat kami bantu.",
      home: "Kembali ke beranda",
      services: "Lihat layanan",
    },
  },
  en: {
    nav: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/industry", label: "Industries" },
      { href: "/contact", label: "Contact" },
    ],
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    languageNames: { id: "ID", en: "EN" },
    switchTo: "Baca halaman ini dalam bahasa Indonesia",
    skipLink: "Skip to content",
    home: "Home",
    fab: { regionLabel: "Quick contact", label: "Talk to us on WhatsApp" },
    navCta: "Chat on WhatsApp",
    footer: {
      companyHeading: "Company",
      servicesHeading: "Services",
      productsHeading: "Ready-Made Platforms",
      productsLink: "See KaryaLo platforms",
      legalHeading: "Legal",
      registered: "Officially Registered",
      registeredBody: "registered in Indonesia's OSS business licensing system.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      copyright: "© 2026 PT Karsa Swakarya Loka (KaryaLo Digital Solution). All rights reserved.",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for is unavailable. Return to the home page or explore KaryaLo's services.",
      heading: "Page not found.",
      body: "The page you are looking for is unavailable or has moved. Return to the home page or explore our services.",
      home: "Back to home",
      services: "See our services",
    },
  },
};
