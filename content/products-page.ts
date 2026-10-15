import type { Localized } from "@/lib/i18n";

/**
 * Words on /products that are not product data. The platforms themselves come
 * from data/products.ts; this is the page around them.
 */
export const productsPageCopy: Localized<{
  hero: { title: string; titleAccent: string; lede: string };
  /** Header over the license-vs-bespoke pair. */
  ways: { badge: string; title: string; intro: string };
  license: { heading: string; body: string };
  bespoke: { heading: string; bodyBefore: string; link: string; bodyAfter: string };
  platformNavLabel: string;
  chips: string[];
  previewLabel: string;
  previewAlt: (title: string, category: string) => string;
  featuresLabel: string;
  requestDemo: string;
  demoMessage: (title: string) => string;
  caseStudy: string;
  callout: { badge: string; heading: string; body: string; cta: string; message: string };
}> = {
  id: {
    hero: {
      title: "Platform Siap Pakai",
      titleAccent: "dari KaryaLo",
      lede:
        "Jelajahi platform KaryaLo untuk pelaporan bisnis, toko online, dan transaksi digital. Tinjau status ketersediaan setiap platform, lalu diskusikan penyesuaian merek, alur kerja, dan integrasi yang Anda perlukan.",
    },
    ways: {
      badge: "Dua Cara Memulai",
      title: "Lisensi Platform atau Pengembangan Khusus",
      intro: "Tentukan pendekatan berdasarkan kebutuhan, jadwal, dan tingkat penyesuaian. Tim kami membantu menilai pilihan yang sesuai.",
    },
    license: {
      heading: "Lisensi platform siap pakai",
      body:
        "Gunakan platform yang tersedia sebagai dasar solusi Anda. Tampilan, konfigurasi, dan integrasi dapat disesuaikan dengan cakupan lisensi serta kebutuhan implementasi yang disepakati.",
    },
    bespoke: {
      heading: "Pengembangan khusus",
      bodyBefore:
        "Untuk alur bisnis yang spesifik, integrasi dengan sistem yang sudah ada, atau kebutuhan kendali lebih luas atas rancangan sistem. Pelajari ",
      link: "tiga bidang layanan",
      bodyAfter: " kami.",
    },
    platformNavLabel: "Pilih platform",
    chips: ["Penyesuaian sesuai kebutuhan", "Opsi merek & server sendiri"],
    previewLabel: "Pratinjau",
    previewAlt: (title, category) => `Pratinjau tampilan ${title}, ${category.toLowerCase()}`,
    featuresLabel: "Fitur utamanya:",
    requestDemo: "Minta demo",
    demoMessage: (title) => `Halo KaryaLo, kami ingin melihat demo atau menanyakan lisensi untuk ${title}.`,
    caseStudy: "Lihat detail pengembangan",
    callout: {
      badge: "Lisensi",
      heading: "Hadirkan Platform dengan Identitas Bisnis Anda",
      body:
        "Diskusikan penggunaan merek perusahaan, pemasangan di server Anda, dan penyesuaian alur kerja. Cakupan penggunaan, dukungan, dan lisensi ditetapkan sebelum implementasi.",
      cta: "Diskusikan opsi lisensi",
      message: "Halo KaryaLo, kami ingin menanyakan opsi lisensi platform.",
    },
  },
  en: {
    hero: {
      title: "Ready-Made Platforms",
      titleAccent: "from KaryaLo",
      lede:
        "Explore KaryaLo platforms for business reporting, online retail, and digital transactions. Review each platform's availability, then discuss the branding, workflows, and integrations you need.",
    },
    ways: {
      badge: "Two Ways to Start",
      title: "Platform Licensing or Custom Development",
      intro: "Choose an approach based on your requirements, schedule, and level of customisation. Our team can help assess the right fit.",
    },
    license: {
      heading: "Licensing a ready-made platform",
      body:
        "Use an existing platform as the foundation for your solution. Branding, configuration, and integrations can be tailored to the agreed licence scope and implementation requirements.",
    },
    bespoke: {
      heading: "Custom development",
      bodyBefore:
        "For specific business workflows, integration with existing systems, or greater control over the system design. Explore our ",
      link: "three service areas",
      bodyAfter: ".",
    },
    platformNavLabel: "Choose a platform",
    chips: ["Customisation options", "Own-brand & self-hosting options"],
    previewLabel: "Preview",
    previewAlt: (title, category) => `Preview of ${title}, ${category.toLowerCase()}`,
    featuresLabel: "Key features:",
    requestDemo: "Request a demo",
    demoMessage: (title) => `Hello KaryaLo, we'd like to see a demo or ask about licensing ${title}.`,
    caseStudy: "View development details",
    callout: {
      badge: "Licensing",
      heading: "Make the Platform Part of Your Brand",
      body:
        "Discuss your company branding, deployment on your servers, and workflow customisation. Usage rights, support, and licensing are defined before implementation.",
      cta: "Ask about licensing",
      message: "Hello KaryaLo, we'd like to ask about platform licensing options.",
    },
  },
};

/**
 * Each platform's own case study under /portfolio. Kept by product id so the
 * link survives the products being reordered.
 */
export const productCaseStudySlug: Record<string, string> = {
  "karyalo-bi": "karyalo-executive-analytics",
  "karyalo-store": "karyalo-saas-storefront",
  "karyalo-topup": "karyalo-digital-topup",
};

/** Short labels for the in-page platform jump links. */
export const productNavLabel: Record<string, string> = {
  "karyalo-bi": "Analytics",
  "karyalo-store": "Storefront",
  "karyalo-topup": "Voucher & Top-Up",
};

