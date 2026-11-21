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
      title: "Sistem yang Mengikuti",
      accent: "Cara Kerja Industri Anda",
      lede:
        "Toko online, distributor, pabrik, dan pengelola gedung punya cara kerja yang berbeda. Karena itu software, desain, dan perangkat IoT yang kami bangun disesuaikan dengan alur kerja Anda.",
      honesty:
        "Pilih industri Anda untuk melihat apa yang dapat kami bangun. Proyek terkait ditautkan ke studi kasus, produk, atau proyek internal.",
    },
    grid: { badge: "Penerapan per Industri", title: "Apa yang Kami Bangun per Industri" },
    card: {
      problem: "Tantangan operasional",
      build: "Yang dapat kami bangun",
      fields: "Bidang",
      proof: "Proyek terkait",
      clientProject: "Studi kasus",
      ownProduct: "Produk KaryaLo",
      prototype: "Proyek internal",
      noProof: "Studi kasus untuk industri ini belum tersedia. Kami mulai dengan memetakan kebutuhan, lalu menguji demo bersama tim Anda.",
      noProofIot: "Pengembangan IoT dimulai dengan perangkat uji coba yang dipasang langsung di lokasi untuk menilai kesesuaiannya sebelum penerapan lebih luas.",
      product: "Platform siap pakai",
      discuss: "Diskusikan kebutuhan ini",
      whatsappMessage: (industry) => `Halo Tim KaryaLo, perusahaan kami bergerak di bidang ${industry}. Kami ingin berkonsultasi mengenai pengembangan sistem untuk bisnis kami.`,
    },
    cta: {
      title: "Industri Anda Tidak Ada di Daftar?",
      body:
        "Sampaikan proses kerja dan tantangan bisnis Anda. Kami akan membantu menilai kebutuhan dan menyusun ruang lingkup awal, tanpa kewajiban melanjutkan proyek.",
      primary: "Diskusikan kebutuhan Anda",
      secondary: "Lihat portofolio",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai pengembangan sistem untuk proses kerja perusahaan kami.",
    },
  },
  en: {
    hero: {
      title: "Systems Built Around",
      accent: "Your Industry's Workflows",
      lede:
        "Online shops, distributors, factories, and building managers all work differently. So we fit the software, design, and IoT we build to your workflow.",
      honesty:
        "Pick your industry to see what we can build. Related work links to a case study, product, or internal project.",
    },
    grid: { badge: "Industry Applications", title: "What We Build for Each Industry" },
    card: {
      problem: "Operational challenges",
      build: "What we can build",
      fields: "Service areas",
      proof: "Related projects",
      clientProject: "Case study",
      ownProduct: "KaryaLo product",
      prototype: "Internal project",
      noProof: "A case study for this industry is not yet available. We start by mapping your needs, then test a demo with your team.",
      noProofIot: "IoT development begins with a test device installed at your site, so you can judge it before a wider rollout.",
      product: "Ready-made platform",
      discuss: "Discuss this need",
      whatsappMessage: (industry) => `Hello KaryaLo team, we work in ${industry} and would like to discuss a system for our business.`,
    },
    cta: {
      title: "Your Industry Isn't Listed?",
      body:
        "Share your workflows and business challenges. We will help assess your needs and define an initial scope, with no obligation to proceed.",
      primary: "Discuss your project",
      secondary: "See the portfolio",
      whatsappMessage: "Hello KaryaLo team, we'd like to discuss a system for how our business works.",
    },
  },
};
