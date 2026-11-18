import type { Localized } from "@/lib/i18n";

/**
 * Words for the portfolio: the /portfolio index, the quick-preview dialog,
 * the case study pages, their link-preview cards, and the portfolio band on
 * the home page.
 *
 * Project facts themselves (titles, summaries, impact lines) live in
 * data/portfolio.ts; this file only holds the labels around them. There is no
 * IoT project, and `index.iotNote` says so plainly instead of implying one.
 */
interface PortfolioCopy {
  types: { client: string; product: string; prototype: string };
  /** Label for a project's `impact` line wherever it is shown. */
  impact: string;
  coverAlt: (title: string, client: string) => string;
  imageAlt: (title: string, index: number, total: number) => string;
  readCaseStudy: string;
  readCaseStudyAria: (title: string) => string;
  discussSimilar: string;
  whatsappSimilar: (title: string) => string;
  challenge: string;
  solution: string;
  technologies: string;
  allPortfolio: string;
  previewLabel: string;
  closeDetails: string;
  index: {
    titleLead: string;
    titleAccent: string;
    intro: string;
    /** Pill badge and title of the grid section (Cargon section header). */
    badge: string;
    gridTitle: string;
    counts: (total: number, clients: number, prototypes: number, products: number) => string;
    servicesLinkLead: string;
    servicesLink: string;
    listLabel: string;
    filterLabel: string;
    filters: { all: string; client: string; product: string; prototype: string };
    resultCount: (count: number) => string;
    quickPreview: string;
    quickPreviewAria: (title: string) => string;
    galleryCount: (count: number) => string;
    iotNote: string;
    iotLink: string;
    consultationBadge: string;
    consultationTitle: string;
    consultationBody: string;
    consultationWhatsapp: string;
    consultationPrimary: string;
    consultationSecondary: string;
  };
  dialog: {
    headerClient: string;
    factClient: string;
    factServices: string;
    imageError: string;
    previousImage: string;
    nextImage: string;
    viewCounter: (index: number, total: number) => string;
    openFull: string;
    newTab: string;
    chooseView: string;
    showImage: (index: number) => string;
  };
  modal: {
    badgeClient: string;
    otherViews: string;
    showPreview: (index: number, total: number) => string;
  };
  caseStudy: {
    badgeClient: string;
    badgePrototype: string;
    badgeProduct: string;
    factClient: string;
    factYear: string;
    factCategory: string;
    factServices: string;
    challengeHeading: string;
    solutionHeading: string;
    impactNoteClient: (client: string, year: string) => string;
    impactNotePrototype: (year: string) => string;
    scopeHeading: string;
    scopeIntro: (count: number) => string;
    seeService: (name: string) => string;
    techHeading: string;
    sidebarTitle: string;
    sidebarBody: string;
    relatedServices: string;
    factsHeading: string;
    galleryBadge: string;
    galleryHeading: string;
    galleryIntro: string;
    relatedBadge: string;
    relatedHeading: string;
    relatedIntro: string;
  };
  home: {
    heading: string;
    intro: string;
    activeClient: string;
    featuredCta: string;
    seeCaseStudy: string;
    seeCaseStudyAria: (title: string) => string;
  };
  og: {
    alt: string;
    kickerClient: string;
    kickerPrototype: string;
    fallbackTitle: string;
  };
}

export const portfolioCopy: Localized<PortfolioCopy> = {
  id: {
    types: { client: "Proyek klien", product: "Produk KaryaLo", prototype: "Proyek internal" },
    impact: "Hasil",
    coverAlt: (title, client) => `Tampilan layar ${title} yang dikerjakan untuk ${client}`,
    imageAlt: (title, index, total) => `${title}, tampilan ${index} dari ${total}`,
    readCaseStudy: "Baca studi kasus",
    readCaseStudyAria: (title) => `Baca studi kasus ${title}`,
    discussSimilar: "Diskusikan proyek serupa",
    whatsappSimilar: (title) => `Halo KaryaLo, saya tertarik membangun sistem seperti ${title}.`,
    challenge: "Tantangan proyek",
    solution: "Solusi yang dikembangkan",
    technologies: "Teknologi yang digunakan",
    allPortfolio: "Semua portofolio",
    previewLabel: "Pratinjau",
    closeDetails: "Tutup detail proyek",
    index: {
      titleLead: "Dari Kebutuhan Bisnis",
      titleAccent: "Menjadi Solusi Digital",
      intro:
        "Lihat bagaimana tantangan bisnis nyata diwujudkan menjadi sistem yang digunakan. Setiap studi kasus menguraikan kebutuhan awal, pendekatan solusi, dan cakupan pekerjaan.",
      badge: "Portofolio Kami",
      gridTitle: "Proyek Klien, Produk & Proyek Internal",
      counts: (total, clients, prototypes, products) =>
        `${total} proyek ditampilkan: ${clients} proyek klien, ${products} produk KaryaLo, dan ${prototypes} proyek internal. Pilih kategori untuk menjelajahi pekerjaan yang relevan dengan kebutuhan Anda.`,
      servicesLinkLead: "Untuk rincian tiap layanan, lihat",
      servicesLink: "halaman layanan",
      listLabel: "Daftar portofolio",
      filterLabel: "Filter portofolio",
      filters: { all: "Semua proyek", client: "Proyek klien", product: "Produk KaryaLo", prototype: "Proyek internal" },
      resultCount: (count) => `${count} proyek ditampilkan`,
      quickPreview: "Pratinjau cepat",
      quickPreviewAria: (title) => `Pratinjau cepat ${title}`,
      galleryCount: (count) => `${count} tampilan`,
      iotNote: "Belum ada proyek perangkat IoT yang kami publikasikan.",
      iotLink: "Pelajari pendekatan pengembangan IoT",
      consultationBadge: "Mulai Proyek",
      consultationTitle: "Bisnis Anda Bisa Jadi Studi Kasus Berikutnya",
      consultationBody:
        "Sampaikan kebutuhan data, pengguna, dan sistem yang Anda gunakan saat ini. Kami bantu menyusun ruang lingkup awal sebagai dasar perencanaan, tanpa kewajiban melanjutkan.",
      consultationWhatsapp: "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai rencana pengembangan sistem perusahaan kami.",
      consultationPrimary: "Mulai diskusi",
      consultationSecondary: "Kirim brief proyek",
    },
    dialog: {
      headerClient: "Studi kasus klien",
      factClient: "Klien / pengembang",
      factServices: "Layanan",
      imageError: "Gambar belum dapat dimuat. Coba tampilan lain atau buka berkas gambar.",
      previousImage: "Gambar sebelumnya",
      nextImage: "Gambar berikutnya",
      viewCounter: (index, total) => `Tampilan ${index} / ${total}`,
      openFull: "Buka gambar penuh",
      newTab: " di tab baru",
      chooseView: "Pilih tampilan proyek",
      showImage: (index) => `Tampilkan gambar ${index}`,
    },
    modal: {
      badgeClient: "Studi Kasus Klien",
      otherViews: "Tampilan lainnya",
      showPreview: (index, total) => `Tampilkan pratinjau ${index} dari ${total}`,
    },
    caseStudy: {
      badgeClient: "Studi Kasus Klien",
      badgePrototype: "Proyek Internal",
      badgeProduct: "Produk KaryaLo",
      factClient: "Klien / pemilik proyek",
      factYear: "Tahun",
      factCategory: "Kategori",
      factServices: "Layanan",
      challengeHeading: "Tantangan Proyek",
      solutionHeading: "Solusi yang Dikembangkan",
      impactNoteClient: (client, year) => `Dampak ini kami catat bersama ${client} pada ${year}.`,
      impactNotePrototype: (year) => `Diamati dari pemakaian internal kami sendiri, ${year}.`,
      scopeHeading: "Cakupan Pekerjaan",
      scopeIntro: (count) => `Proyek ini mencakup ${count} layanan berikut.`,
      seeService: (name) => `Lihat layanan ${name}`,
      techHeading: "Teknologi yang Digunakan",
      sidebarTitle: "Butuh sistem serupa untuk bisnis Anda?",
      sidebarBody: "Diskusikan kebutuhan Anda untuk memperoleh gambaran ruang lingkup dan biaya awal. Konsultasi awal gratis, tanpa kewajiban melanjutkan.",
      relatedServices: "Lihat layanan terkait",
      factsHeading: "Ringkasan Proyek",
      galleryBadge: "Galeri",
      galleryHeading: "Tampilan Sistem",
      galleryIntro: "Jelajahi tampilan dan fitur yang dikembangkan dalam proyek ini.",
      relatedBadge: "Portofolio Kami",
      relatedHeading: "Proyek Lainnya",
      relatedIntro: "Temukan proyek klien, produk, dan proyek internal lainnya dari KaryaLo.",
    },
    home: {
      heading: "Hasil Kerja yang Dapat Anda Tinjau",
      intro: "Dari toko online dan sistem operasional hingga website perusahaan, tinjau langsung hasil kerja kami melalui proyek klien dan proyek internal yang telah dikembangkan.",
      activeClient: "Proyek klien",
      featuredCta: "Lihat studi kasus Alina",
      seeCaseStudy: "Lihat studi kasus",
      seeCaseStudyAria: (title) => `Lihat studi kasus ${title}`,
    },
    og: {
      alt: "Studi kasus KaryaLo Digital Solution",
      kickerClient: "Studi Kasus",
      kickerPrototype: "Proyek Internal",
      fallbackTitle: "Portofolio proyek KaryaLo",
    },
  },
  en: {
    types: { client: "Client project", product: "KaryaLo product", prototype: "Internal project" },
    impact: "Outcome",
    coverAlt: (title, client) => `Screenshot of ${title}, built for ${client}`,
    imageAlt: (title, index, total) => `${title}, screen ${index} of ${total}`,
    readCaseStudy: "Read the case study",
    readCaseStudyAria: (title) => `Read the ${title} case study`,
    discussSimilar: "Discuss a similar project",
    whatsappSimilar: (title) => `Hello KaryaLo, I'm interested in building a system like ${title}.`,
    challenge: "Project challenge",
    solution: "Our solution",
    technologies: "Technology used",
    allPortfolio: "All projects",
    previewLabel: "Preview",
    closeDetails: "Close project details",
    index: {
      titleLead: "From Business Needs",
      titleAccent: "to Digital Solutions",
      intro:
        "See how real business challenges became systems in daily use. Each case study outlines the initial needs, our approach, and the scope of work.",
      badge: "Our Portfolio",
      gridTitle: "Client Projects, Products & Internal Projects",
      counts: (total, clients, prototypes, products) =>
        `${total} projects: ${clients} client ${clients === 1 ? "project" : "projects"}, ${products} KaryaLo ${products === 1 ? "product" : "products"}, and ${prototypes} internal ${prototypes === 1 ? "project" : "projects"}. Filter by category to explore work relevant to your needs.`,
      servicesLinkLead: "For details of our services, visit the",
      servicesLink: "services page",
      listLabel: "Portfolio list",
      filterLabel: "Filter the portfolio",
      filters: { all: "All projects", client: "Client projects", product: "KaryaLo products", prototype: "Internal projects" },
      resultCount: (count) => `Showing ${count} ${count === 1 ? "project" : "projects"}`,
      quickPreview: "Quick preview",
      quickPreviewAria: (title) => `Quick preview of ${title}`,
      galleryCount: (count) => `${count} ${count === 1 ? "screen" : "screens"}`,
      iotNote: "We haven't published an IoT device project yet.",
      iotLink: "Explore our IoT development approach",
      consultationBadge: "Start a Project",
      consultationTitle: "Your Business Could Be the Next Case Study",
      consultationBody:
        "Share your data needs, users, and current systems. We will help outline an initial scope as a basis for planning, with no obligation to proceed.",
      consultationWhatsapp: "Hello KaryaLo, I'd like to discuss our system plans.",
      consultationPrimary: "Start a conversation",
      consultationSecondary: "Send a project brief",
    },
    dialog: {
      headerClient: "Client case study",
      factClient: "Client / developer",
      factServices: "Services",
      imageError: "The image couldn't be loaded. Try another screen or open the image file.",
      previousImage: "Previous image",
      nextImage: "Next image",
      viewCounter: (index, total) => `Screen ${index} / ${total}`,
      openFull: "Open full image",
      newTab: " in a new tab",
      chooseView: "Choose a project screen",
      showImage: (index) => `Show image ${index}`,
    },
    modal: {
      badgeClient: "Client Case Study",
      otherViews: "More screens",
      showPreview: (index, total) => `Show preview ${index} of ${total}`,
    },
    caseStudy: {
      badgeClient: "Client Case Study",
      badgePrototype: "Internal Project",
      badgeProduct: "KaryaLo Product",
      factClient: "Client / project owner",
      factYear: "Year",
      factCategory: "Category",
      factServices: "Services",
      challengeHeading: "Project Challenge",
      solutionHeading: "Our Solution",
      impactNoteClient: (client, year) => `Recorded together with ${client} in ${year}.`,
      impactNotePrototype: (year) => `Observed in our own internal use, ${year}.`,
      scopeHeading: "Scope of Work",
      scopeIntro: (count) => `This project includes the following ${count === 1 ? "service" : `${count} services`}.`,
      seeService: (name) => `See ${name} services`,
      techHeading: "Technology Used",
      sidebarTitle: "Need a similar system for your business?",
      sidebarBody: "Discuss your requirements for an initial view of scope and cost. The initial consultation is free, with no obligation to proceed.",
      relatedServices: "See related services",
      factsHeading: "Project Summary",
      galleryBadge: "Gallery",
      galleryHeading: "System Screens",
      galleryIntro: "Explore the screens and features developed for this project.",
      relatedBadge: "Our Portfolio",
      relatedHeading: "More Projects",
      relatedIntro: "Discover more client projects, products, and internal projects from KaryaLo.",
    },
    home: {
      heading: "Work You Can Review",
      intro: "From online stores and operational systems to company websites, review our work first-hand through client and internal projects.",
      activeClient: "Client project",
      featuredCta: "See the Alina case study",
      seeCaseStudy: "See the case study",
      seeCaseStudyAria: (title) => `See the ${title} case study`,
    },
    og: {
      alt: "KaryaLo Digital Solution case study",
      kickerClient: "Case Study",
      kickerPrototype: "Internal Project",
      fallbackTitle: "KaryaLo project portfolio",
    },
  },
};

