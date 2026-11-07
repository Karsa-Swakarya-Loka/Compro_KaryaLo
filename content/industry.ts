import type { Localized } from "@/lib/i18n";

/** /industry page copy, both languages. The industries themselves live in data/industries.ts. */
export interface IndustryCopy {
  hero: { title: string; accent: string; lede: string; honesty: string };
  /** Header over the industry cards; its intro is `hero.honesty`. */
  grid: { badge: string; title: string };
  card: {
    problem: string;
    build: string;
    fields: string;
    discuss: string;
    whatsappMessage: (industry: string) => string;
  };
  cta: { title: string; body: string; primary: string; secondary: string; whatsappMessage: string };
}

export const industryCopy: Localized<IndustryCopy> = {
  id: {
    hero: {
      title: "Solusi yang Memahami",
      accent: "Cara Kerja Industri Anda",
      lede:
        "Setiap industri memiliki proses dan prioritas yang berbeda. Kami menyesuaikan pengembangan software, desain, dan perangkat IoT dengan kebutuhan operasional, pengguna, serta tujuan bisnis Anda.",
      honesty:
        "Jelajahi contoh penerapan yang dapat kami kembangkan untuk setiap industri, sesuai proses kerja dan kebutuhan operasional Anda.",
    },
    grid: { badge: "Penerapan per Industri", title: "Solusi Sesuai Kebutuhan Operasional" },
    card: {
      problem: "Tantangan operasional",
      build: "Solusi yang dapat dikembangkan",
      fields: "Bidang",
      discuss: "Diskusikan kebutuhan ini",
      whatsappMessage: (industry) => `Halo Tim KaryaLo, perusahaan kami bergerak di bidang ${industry}. Kami ingin berkonsultasi mengenai pengembangan sistem untuk bisnis kami.`,
    },
    cta: {
      title: "Industri Anda Tidak Ada di Daftar?",
      body:
        "Diskusikan proses kerja, tantangan, dan rencana pengembangan Anda. Kami akan membantu menilai kebutuhan serta menentukan ruang lingkup awal yang relevan.",
      primary: "Diskusikan kebutuhan Anda",
      secondary: "Lihat portofolio",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai pengembangan sistem yang mendukung proses kerja perusahaan kami.",
    },
  },
  en: {
    hero: {
      title: "Solutions Built Around",
      accent: "Your Industry's Workflows",
      lede:
        "Every industry has distinct processes and priorities. We tailor software, design, and IoT development to your operations, users, and business goals.",
      honesty:
        "Explore examples of what we can build for each industry, matched to your workflows and operational needs.",
    },
    grid: { badge: "Industry Applications", title: "Solutions for Your Operational Needs" },
    card: {
      problem: "Operational challenges",
      build: "Potential solutions",
      fields: "Service areas",
      discuss: "Discuss this need",
      whatsappMessage: (industry) => `Hello KaryaLo team, we work in ${industry} and would like to discuss a system for our business.`,
    },
    cta: {
      title: "Your Industry Isn't Listed?",
      body:
        "Discuss your workflows, challenges, and development plans. We will help assess your requirements and define a relevant initial scope.",
      primary: "Discuss your project",
      secondary: "See the portfolio",
      whatsappMessage: "Hello KaryaLo team, we'd like to discuss a system for how our business works.",
    },
  },
};
