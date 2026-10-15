import type { Localized } from "@/lib/i18n";

/**
 * Home page copy, both languages.
 *
 * The page follows the structure adopted from the Nexora review (2026-10-15):
 * positioning → how we partner → what we do → the situations we fix → who does
 * the work → proof → process → where and how we work → legal → FAQ → contact.
 * Every claim here is one the rest of the site already backs: no metrics, no
 * "24/7", no client logos, no IoT project.
 */

type IconKey = "learn" | "open" | "maintain" | "own";

export interface HomeCopy {
  /** The small pill over each section title (Cargon's section badge). */
  badges: { why: string; services: string; portfolio: string; studio: string; problems: string; process: string; trust: string; faq: string };
  /**
   * Hero slider, problem first (owner's choice, 2026-10-15): one everyday client
   * problem per slide. No pause button (owner's call); autoplay holds while the
   * hero is hovered or focused and stops once a visitor picks a slide.
   */
  slider: {
    label: string;
    goTo: (n: number, total: number) => string;
  };
  /** The commitments box over the studio photo. Figures the site already promises, not metrics. */
  studio: {
    imageAlt: string;
    commitments: { figure?: string; count?: number; suffix?: string; label: string }[];
  };
  /**
   * Above the fold, in reading order: what KaryaLo is (pill + H1), who it is
   * for and what it does (`audience`), why it matters (`reasons`), and what to
   * do next (the two buttons and `reassurance`). The problem slides sit in the
   * right-hand panel as worked examples.
   */
  hero: {
    category: string;
    headline: { lead: string; accent: string };
    audience: string;
    reasons: string[];
    primaryCta: string;
    secondaryCta: string;
    reassurance: string;
    problemLabel: string;
    builds: string;
    proofLink: string;
    slides: {
      /** Problem id in data/problems.ts: supplies the solution line, proof and WhatsApp opener. */
      problemId: string;
      /** The problem as the visitor would say it, set at display size. */
      headline: string;
      imageAlt: string;
    }[];
  };
  principles: {
    title: string;
    intro: string;
    items: { icon: IconKey; title: string; description: string }[];
  };
  services: {
    title: string;
    intro: string;
    fieldLabel: string;
    detailLink: string;
    supportTitle: string;
    supportBody: string;
    supportLink: string;
    productsTitle: string;
    productsBody: string;
    productsLink: string;
  };
  problems: {
    title: string;
    intro: string;
    fieldLabel: string;
    builds: string;
    discuss: string;
    notListed: string;
    whatsapp: string;
  };
  team: {
    title: string;
    body: string;
    profileLink: string;
    capabilitiesTitle: string;
    capabilities: string[];
    stackTitle: string;
    stack: { group: string; items: string[] }[];
  };
  testimonials: { title: string; projectLink: string };
  process: {
    title: string;
    intro: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerBody: string;
    stage: string;
    youGet: string;
  };
  coverage: {
    title: string;
    body: string;
    modesTitle: string;
    modes: string[];
    engagementsTitle: string;
    engagements: { title: string; body: string }[];
  };
  trust: {
    title: string;
    intro: string;
    cards: { title: string; detail: string; description: string }[];
    bannerTitle: string;
    bannerBody: string;
    bannerCta: string;
    bannerMessage: string;
  };
  faq: { title: string; intro: string; askLead: string; askBody: string; askCta: string };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    officeLabel: string;
    hours: string;
  };
}

export const homeCopy: Localized<HomeCopy> = {
  id: {
    badges: {
      why: "Mengapa KaryaLo",
      services: "Layanan Kami",
      portfolio: "Portofolio",
      studio: "Tim Kami",
      problems: "Kebutuhan Bisnis",
      process: "Cara Kerja",
      trust: "Legalitas",
      faq: "FAQ",
    },
    slider: {
      label: "Solusi untuk kebutuhan operasional Anda",
      goTo: (n, total) => `Tampilkan slide ${n} dari ${total}`,
    },
    studio: {
      imageAlt: "Ruang studio KaryaLo dengan meja kerja pengembangan software",
      commitments: [
        { figure: "7–14", label: "hari kerja untuk purwarupa awal" },
        { count: 100, suffix: "%", label: "kepemilikan kode proyek khusus sesuai SPK" },
        { count: 3, label: "bidang keahlian dalam satu tim" },
      ],
    },
    hero: {
      category: "Extended IT Partner · Software, Desain & IoT",
      headline: { lead: "Tim IT Anda,", accent: "Tanpa Harus Merekrut." },
      audience:
        "KaryaLo membantu bisnis Anda mengembangkan software, desain, dan perangkat IoT melalui satu tim. Kami mendampingi dari perencanaan hingga pemeliharaan, baik sebagai tim IT Anda maupun sebagai pendukung tim internal.",
      reasons: [
        "Ditangani langsung oleh tim inti KaryaLo",
        "Purwarupa awal dalam 7–14 hari kerja",
        "Serah terima kode dan dokumentasi sesuai SPK",
      ],
      primaryCta: "Diskusikan kebutuhan Anda",
      secondaryCta: "Lihat contoh proyek",
      reassurance: "Konsultasi awal via WhatsApp · dilayani pada jam kerja · tanpa kewajiban melanjutkan",
      problemLabel: "Solusi untuk kebutuhan operasional Anda",
      builds: "Yang kami bangun",
      proofLink: "Pelajari solusinya",
      slides: [
        {
          problemId: "stok-tidak-cocok",
          headline: "Stok gudang belum selaras dengan pesanan online?",
          imageAlt: "Tangkapan layar toko online Alina yang tersambung ke sistem gudang",
        },
        {
          problemId: "laporan-manual",
          headline: "Laporan mingguan masih bergantung pada rekap manual?",
          imageAlt: "Tangkapan layar dashboard laporan internal KaryaLo",
        },
        {
          problemId: "website-belum-meyakinkan",
          headline: "Website perusahaan belum meyakinkan calon mitra?",
          imageAlt: "Tangkapan layar website korporat HIJ",
        },
        {
          problemId: "alat-tidak-terpantau",
          headline: "Kondisi mesin sulit dipantau sebelum terjadi gangguan?",
          imageAlt: "Meja kerja dengan papan rangkaian kecil tersambung ke perangkat pemantau, dengan diagram alur data di layar",
        },
      ],
    },
    principles: {
      title: "Cara Kami Bermitra",
      intro:
        "Sebagai extended IT partner, kami menyelaraskan kebutuhan teknologi dengan tujuan bisnis Anda. Empat prinsip berikut menjadi dasar setiap kerja sama.",
      items: [
        {
          icon: "learn",
          title: "Memahami Bisnis Anda",
          description:
            "Kami mempelajari alur kerja, tantangan, dan prioritas tim Anda untuk menentukan solusi serta ruang lingkup yang tepat.",
        },
        {
          icon: "open",
          title: "Terbuka di Setiap Tahap",
          description:
            "Tinjau perkembangan proyek melalui demo mingguan dan akses uji coba. Kami menyampaikan kemajuan, kendala, dan langkah berikutnya secara terbuka.",
        },
        {
          icon: "maintain",
          title: "Dibangun untuk Dirawat",
          description:
            "Kami menyusun sistem dengan struktur yang jelas dan dokumentasi yang mendukung pemeliharaan serta pengembangan berikutnya.",
        },
        {
          icon: "own",
          title: "Kepemilikan yang Jelas",
          description:
            "Kode sumber, file desain, dan skema perangkat untuk proyek khusus diserahkan sesuai SPK setelah serah terima dan pembayaran selesai.",
        },
      ],
    },
    services: {
      title: "Software, Desain, dan IoT dalam Satu Tim",
      intro:
        "Pilih layanan sesuai kebutuhan atau gabungkan beberapa bidang dalam satu proyek yang terkoordinasi.",
      fieldLabel: "Bidang",
      detailLink: "Lihat detail layanan",
      supportTitle: "Dukungan setelah peluncuran",
      supportBody: "Jaga sistem Anda melalui pemantauan server, pembaruan keamanan, pencadangan rutin, dan pengembangan sesuai paket bulanan atau tahunan.",
      supportLink: "Lihat layanan pendamping",
      productsTitle: "Mulai dengan platform yang tersedia",
      productsBody: "Dashboard laporan, toko online, dan sistem voucher yang bisa dipasang dengan merek Anda sendiri.",
      productsLink: "Lihat platform KaryaLo",
    },
    problems: {
      title: "Solusi untuk Tantangan Operasional Anda",
      intro:
        "Temukan kebutuhan yang sesuai dengan bisnis Anda. Pelajari solusi yang dapat kami bangun dan lihat contoh proyek terkait yang tersedia.",
      fieldLabel: "Bidang",
      builds: "Yang kami bangun",
      discuss: "Diskusikan kebutuhan ini",
      notListed: "Memiliki kebutuhan lain? Kami siap membantu menentukan prioritas dan langkah awalnya.",
      whatsapp: "Diskusikan kebutuhan Anda",
    },
    team: {
      title: "Berkomunikasi Langsung dengan Tim Pelaksana",
      body:
        "KaryaLo adalah merek layanan PT Karsa Swakarya Loka yang berbasis di Kota Bekasi. Pengembang software, desainer, dan teknisi perangkat berkolaborasi dalam satu tim untuk menjaga keselarasan setiap bagian proyek Anda.",
      profileLink: "Lihat profil perusahaan",
      capabilitiesTitle: "Keahlian tim kami",
      capabilities: [
        "Arah bisnis & kemitraan",
        "Arsitektur & kualitas teknis",
        "Pengembangan web & mobile",
        "Desain UI/UX & identitas merek",
        "Perangkat IoT & firmware",
        "Administrasi, kontrak & keuangan proyek",
      ],
      stackTitle: "Teknologi yang kami gunakan",
      stack: [
        { group: "Web & aplikasi", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Laravel"] },
        { group: "Data", items: ["PostgreSQL", "MySQL", "Prisma"] },
        { group: "Desain", items: ["Figma"] },
        { group: "IoT", items: ["ESP32", "MQTT"] },
      ],
    },
    testimonials: { title: "Pengalaman Klien Kami", projectLink: "Lihat proyek" },
    process: {
      title: "Lima Tahap Pengerjaan",
      intro:
        "Setiap tahap memiliki hasil kerja, jadwal, dan titik evaluasi yang jelas. Perubahan ruang lingkup dan biaya dibahas sebelum pekerjaan tambahan dimulai.",
      bannerBadge: "Validasi Sebelum Pengembangan",
      bannerTitle: "Tinjau Alur Sistem Sebelum Pengembangan Dimulai",
      bannerBody:
        "Purwarupa awal disiapkan dalam 7–14 hari kerja sesuai ruang lingkup yang disepakati. Tim Anda dapat meninjau alur dan memberi masukan sebelum pengembangan dilanjutkan.",
      stage: "Tahap",
      youGet: "Yang Anda terima:",
    },
    coverage: {
      title: "Dari Bekasi, Melayani Seluruh Indonesia",
      body:
        "Studio dan bengkel perangkat kami berlokasi di Jatisampurna, Kota Bekasi. Kami melayani pertemuan langsung di Jabodetabek dan kerja sama daring di seluruh Indonesia. Kunjungan untuk pemasangan dan kalibrasi IoT disesuaikan dengan kebutuhan proyek.",
      modesTitle: "Metode kolaborasi",
      modes: ["Tatap muka", "Daring", "Kombinasi keduanya"],
      engagementsTitle: "Bentuk kerja sama",
      engagements: [
        {
          title: "Per proyek",
          body: "Ruang lingkup, jadwal, dan termin pembayaran ditetapkan dalam SPK, dengan serah terima resmi pada akhir proyek.",
        },
        {
          title: "Pendampingan berkala",
          body: "Pemeliharaan dan pengembangan setelah peluncuran tersedia melalui kerja sama bulanan atau tahunan.",
        },
      ],
    },
    trust: {
      title: "Legalitas Perusahaan yang Dapat Diverifikasi",
      intro: "Dokumen perusahaan tersedia untuk mendukung verifikasi vendor dan proses pengadaan Anda.",
      cards: [
        {
          title: "PT Karsa Swakarya Loka",
          detail: "SK",
          description:
            "Disahkan oleh Kementerian Hukum RI pada 30 Mei 2026. Setiap kerja sama dilaksanakan melalui perjanjian resmi atas nama perusahaan.",
        },
        {
          title: "NIB",
          detail: "KBLI",
          description: "Izin usaha aktif dan tercatat di sistem OSS pemerintah, dengan bidang usaha pemrograman komputer.",
        },
        {
          title: "Invoice Resmi & Rekening Perusahaan",
          detail: "Belum PKP: tagihan tanpa PPN",
          description:
            "Setiap termin dilengkapi invoice resmi atas nama PT Karsa Swakarya Loka. Pembayaran dilakukan melalui rekening perusahaan.",
        },
        {
          title: "Perjanjian Kerahasiaan",
          detail: "NDA sebelum diskusi teknis",
          description:
            "Kami menjaga kerahasiaan dokumen, data, dan rencana bisnis Anda. NDA dapat disepakati sebelum pembahasan teknis dimulai.",
        },
      ],
      bannerTitle: "Lengkapi Proses Pendaftaran Vendor Anda",
      bannerBody: "Ajukan permintaan salinan SK Kementerian Hukum, NPWP, NIB, dan profil perusahaan dalam format PDF.",
      bannerCta: "Minta dokumen legal",
      bannerMessage: "Halo KaryaLo, kami butuh dokumen legal dan NIB PT Karsa Swakarya Loka untuk proses pendaftaran vendor.",
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      intro:
        "Informasi tentang proses kerja sama, kepemilikan kode, pembayaran, garansi, dan dokumen perusahaan.",
      askLead: "Pertanyaan Anda tidak ada di sini?",
      askBody: "Jadwalkan sesi daring selama 30 menit untuk membahas kebutuhan Anda bersama tim kami.",
      askCta: "Tanya via WhatsApp",
    },
    cta: {
      title: "Mulai dengan Kebutuhan Bisnis Anda",
      body:
        "Diskusikan rencana pengembangan sistem, penyempurnaan aplikasi, atau pemantauan IoT Anda. Kami membantu memetakan prioritas dan ruang lingkup awal tanpa kewajiban melanjutkan proyek.",
      primary: "Diskusikan kebutuhan Anda",
      secondary: "Kenali KaryaLo",
      officeLabel: "Kantor & Studio",
      hours: "Senin – Jumat (09.00 – 18.00 WIB)",
    },
  },
  en: {
    badges: {
      why: "Why KaryaLo",
      services: "Our Services",
      portfolio: "Portfolio",
      studio: "Our Team",
      problems: "Business Needs",
      process: "How We Work",
      trust: "Legal Standing",
      faq: "FAQ",
    },
    slider: {
      label: "Solutions for your operations",
      goTo: (n, total) => `Show slide ${n} of ${total}`,
    },
    studio: {
      imageAlt: "The KaryaLo studio with software development workstations",
      commitments: [
        { figure: "7–14", label: "working days for an initial prototype" },
        { count: 100, suffix: "%", label: "ownership of custom project code under the SPK" },
        { count: 3, label: "areas of expertise in one team" },
      ],
    },
    hero: {
      category: "Extended IT Partner · Software, Design & IoT",
      headline: { lead: "Your IT Team,", accent: "Without the Recruitment." },
      audience:
        "KaryaLo brings software development, design, and IoT together in one team. From planning through ongoing maintenance, we work as your IT partner or provide additional expertise for your internal team.",
      reasons: [
        "Delivered directly by KaryaLo's core team",
        "An initial prototype in 7–14 working days",
        "Code and documentation handover under the SPK",
      ],
      primaryCta: "Discuss your project",
      secondaryCta: "See example projects",
      reassurance: "Initial consultation via WhatsApp · available during business hours · no obligation",
      problemLabel: "Solutions for your operations",
      builds: "What we build",
      proofLink: "Explore the solution",
      slides: [
        {
          problemId: "stok-tidak-cocok",
          headline: "Warehouse stock out of sync with online orders?",
          imageAlt: "Screenshot of the Alina online store connected to its warehouse system",
        },
        {
          problemId: "laporan-manual",
          headline: "Weekly reports still depend on manual spreadsheets?",
          imageAlt: "Screenshot of the KaryaLo internal reporting dashboard",
        },
        {
          problemId: "website-belum-meyakinkan",
          headline: "Does your website reflect your company's capabilities?",
          imageAlt: "Screenshot of the HIJ corporate website",
        },
        {
          problemId: "alat-tidak-terpantau",
          headline: "Struggling to monitor equipment before a fault occurs?",
          imageAlt: "A workbench with a small circuit board wired to a monitoring device, and a data-flow diagram on screen",
        },
      ],
    },
    principles: {
      title: "How We Partner",
      intro:
        "As your extended IT partner, we align technology decisions with your business goals. These four principles guide every engagement.",
      items: [
        {
          icon: "learn",
          title: "Your Business Comes First",
          description:
            "We study your workflows, challenges, and priorities to define the right solution and scope for your team.",
        },
        {
          icon: "open",
          title: "Open at Every Stage",
          description:
            "Review progress through weekly demos and a test environment. We communicate completed work, issues, and next steps openly.",
        },
        {
          icon: "maintain",
          title: "Built to Be Maintained",
          description:
            "We build clearly structured, documented systems to support ongoing maintenance and future development.",
        },
        {
          icon: "own",
          title: "Clear Ownership",
          description:
            "Custom project source code, design files, and device schematics are transferred under the work agreement once handover and payment are complete.",
        },
      ],
    },
    services: {
      title: "Software, Design, and IoT in One Team",
      intro: "Choose the expertise you need or combine services within one coordinated project.",
      fieldLabel: "Field",
      detailLink: "See service details",
      supportTitle: "Support beyond launch",
      supportBody: "Maintain your systems with server monitoring, security updates, routine backups, and development through a monthly or annual plan.",
      supportLink: "See support services",
      productsTitle: "Start with an existing platform",
      productsBody: "A reporting dashboard, an online store, and a voucher system you can run under your own brand.",
      productsLink: "See KaryaLo platforms",
    },
    problems: {
      title: "Solutions for Everyday Operational Challenges",
      intro:
        "Explore needs that match your business, the solutions we can build, and related projects where available.",
      fieldLabel: "Field",
      builds: "What we build",
      discuss: "Discuss this need",
      notListed: "Have a different requirement? We can help identify your priorities and the right place to start.",
      whatsapp: "Discuss your project",
    },
    team: {
      title: "Work Directly with Your Project Team",
      body:
        "KaryaLo is the service brand of PT Karsa Swakarya Loka, based in Bekasi, Indonesia. Our software developers, designers, and device engineers collaborate as one team to keep every part of your project aligned.",
      profileLink: "See the company profile",
      capabilitiesTitle: "Our team's expertise",
      capabilities: [
        "Business direction & partnerships",
        "Architecture & technical quality",
        "Web & mobile development",
        "UI/UX design & brand identity",
        "IoT devices & firmware",
        "Project administration, contracts & finance",
      ],
      stackTitle: "Technology we use",
      stack: [
        { group: "Web & apps", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Laravel"] },
        { group: "Data", items: ["PostgreSQL", "MySQL", "Prisma"] },
        { group: "Design", items: ["Figma"] },
        { group: "IoT", items: ["ESP32", "MQTT"] },
      ],
    },
    testimonials: { title: "What Our Clients Say", projectLink: "See the project" },
    process: {
      title: "Five Stages of Work",
      intro:
        "Each stage has defined deliverables, a schedule, and review points. Changes to scope and cost are discussed before additional work begins.",
      bannerBadge: "Validate Before Development",
      bannerTitle: "Review the Workflow Before Development Begins",
      bannerBody:
        "An initial prototype is prepared in 7–14 working days within the agreed scope. Your team can review the workflow and provide feedback before development continues.",
      stage: "Stage",
      youGet: "What you receive:",
    },
    coverage: {
      title: "Based in Bekasi, Serving All of Indonesia",
      body:
        "Our studio and device workshop are in Jatisampurna, Bekasi. We offer in-person meetings across Greater Jakarta and remote collaboration throughout Indonesia. IoT installation and calibration visits are arranged according to project needs.",
      modesTitle: "Ways to collaborate",
      modes: ["In person", "Remote", "Hybrid"],
      engagementsTitle: "How we engage",
      engagements: [
        {
          title: "Per project",
          body: "Scope, schedule, and payment milestones are defined in the work agreement (SPK), with a formal handover at completion.",
        },
        {
          title: "Ongoing support",
          body: "Post-launch maintenance and development are available through monthly or annual engagements.",
        },
      ],
    },
    trust: {
      title: "Company Credentials You Can Verify",
      intro: "Company documents are available to support vendor verification and your procurement process.",
      cards: [
        {
          title: "PT Karsa Swakarya Loka",
          detail: "Decree",
          description:
            "Ratified by the Indonesian Ministry of Law on 30 May 2026. Every engagement is governed by a formal agreement in the company's name.",
        },
        {
          title: "Business ID (NIB)",
          detail: "KBLI",
          description: "An active business licence recorded in the government's OSS system, registered for computer programming.",
        },
        {
          title: "Formal Invoices & Company Account",
          detail: "Not VAT-registered: no VAT on our bills",
          description:
            "Each payment milestone is supported by a formal invoice from PT Karsa Swakarya Loka. Payments are made to the company bank account.",
        },
        {
          title: "Non-Disclosure Agreement",
          detail: "NDA before technical talks",
          description:
            "We treat your documents, data, and business plans as confidential. An NDA can be agreed before technical discussions begin.",
        },
      ],
      bannerTitle: "Complete Your Vendor Registration",
      bannerBody: "Request PDF copies of our Ministry of Law decree, tax ID (NPWP), business ID (NIB), and company profile.",
      bannerCta: "Request legal documents",
      bannerMessage: "Hello KaryaLo, we need the legal documents and NIB of PT Karsa Swakarya Loka for our vendor registration.",
    },
    faq: {
      title: "Frequently Asked Questions",
      intro:
        "Information about our working process, code ownership, payments, warranties, and company documentation.",
      askLead: "Your question isn't here?",
      askBody: "Arrange a 30-minute online consultation to discuss your requirements with our team.",
      askCta: "Ask on WhatsApp",
    },
    cta: {
      title: "Start with Your Business Needs",
      body:
        "Discuss a new system, improvements to an existing application, or IoT monitoring. We will help define your priorities and initial scope, with no obligation to proceed.",
      primary: "Discuss your project",
      secondary: "Get to know KaryaLo",
      officeLabel: "Office & Studio",
      hours: "Monday – Friday (09:00 – 18:00 WIB)",
    },
  },
};
