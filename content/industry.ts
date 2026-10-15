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
    proof: string;
    clientProject: string;
    /** Label for KaryaLo's own live product (e.g. DeliaStore) in the proof list. */
    ownProduct: string;
    prototype: string;
    noProof: string;
    noProofIot: string;
    product: string;
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
        "Jelajahi contoh penerapan yang dapat kami kembangkan untuk setiap industri. Proyek yang telah dikerjakan ditampilkan melalui tautan studi kasus, produk, atau purwarupa terkait.",
    },
    grid: { badge: "Penerapan per Industri", title: "Solusi Sesuai Kebutuhan Operasional" },
    card: {
      problem: "Tantangan operasional",
      build: "Solusi yang dapat dikembangkan",
      fields: "Bidang",
      proof: "Proyek terkait",
      clientProject: "Studi kasus",
      ownProduct: "Produk KaryaLo",
      prototype: "Purwarupa internal",
      noProof: "Studi kasus untuk industri ini belum tersedia. Pendekatan awal kami mencakup pemetaan kebutuhan dan validasi purwarupa bersama tim Anda.",
      noProofIot: "Pengembangan IoT dimulai dengan purwarupa perangkat yang diuji di lokasi untuk menilai kesesuaiannya sebelum penerapan lebih luas.",
      product: "Platform siap pakai",
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
        "Explore potential applications for each industry. Work we have completed is linked through related case studies, products, or prototypes.",
    },
    grid: { badge: "Industry Applications", title: "Solutions for Your Operational Needs" },
    card: {
      problem: "Operational challenges",
      build: "Potential solutions",
      fields: "Service areas",
      proof: "Related projects",
      clientProject: "Case study",
      ownProduct: "KaryaLo product",
      prototype: "Internal prototype",
      noProof: "A case study for this industry is not yet available. Our initial approach includes requirements mapping and prototype validation with your team.",
      noProofIot: "IoT development begins with a device prototype tested at your site to assess suitability before wider deployment.",
      product: "Ready-made platform",
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
