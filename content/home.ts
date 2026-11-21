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
   * Hero slider (owner's calls, 2026-10-15/16): one project per slide, each
   * shown as the same 3D laptop mockup, with a short caption centred under it:
   * project type and field, then the title, then the slide bars. Kept to two
   * lines so the laptop leads (2026-10-16 hierarchy pass); the case study
   * carries the rest. The problem-first hook lives on in the "Solutions"
   * section further down. No pause button; the slider keeps moving under the
   * pointer, only slower (15s a slide instead of 6.5s), and holds while a
   * keyboard user is on its controls.
   */
  slider: {
    label: string;
    goTo: (n: number, total: number) => string;
    /** Alt text for a slide, from the project's title. */
    slideAlt: (title: string) => string;
    /** Accessible name of the link from a slide to its case study. */
    openProject: (title: string) => string;
  };
  /** The commitments box over the studio photo. Figures the site already promises, not metrics. */
  studio: {
    imageAlt: string;
    commitments: { figure?: string; count?: number; suffix?: string; label: string }[];
  };
  /**
   * Above the fold, kept to the point (2026-11-17): a short badge, the H1, one
   * line on what KaryaLo does (`audience`), one solid WhatsApp button and the
   * company-profile link. The project band right below is the proof, so there
   * is no "see projects" link or reassurance line any more. The commitments
   * (7–14 days, code ownership, one team) are in the stat cards under the band.
   */
  hero: {
    /** The long brand phrase: the giant scrolling text under the hero and on inner pages. */
    category: string;
    /** The short pill above the headline. */
    badge: string;
    headline: { lead: string; accent: string };
    audience: string;
    primaryCta: string;
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
  /**
   * Why KaryaLo (home, 2026-11-17): the goal in one line, then how working with
   * KaryaLo differs from the usual IT vendor. Every "KaryaLo" cell restates a
   * commitment the site already makes (PRODUCT.md: core team, five stages,
   * clickable prototype in 7-14 days, written scope, code ownership per SPK,
   * three fields in one team, care after launch). The "usual" column describes
   * the common pattern in general terms and names no company.
   */
  advantage: {
    title: string;
    intro: string;
    othersLabel: string;
    usLabel: string;
    rows: { topic: string; others: string; us: string }[];
    link: string;
  };
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
      faq: "Tanya Jawab",
    },
    slider: {
      label: "Contoh proyek KaryaLo",
      goTo: (n, total) => `Tampilkan proyek ${n} dari ${total}`,
      slideAlt: (title) => `${title}, ditampilkan pada laptop`,
      openProject: (title) => `Lihat studi kasus: ${title}`,
    },
    studio: {
      imageAlt: "Ruang studio KaryaLo dengan meja kerja pengembangan software",
      commitments: [
        { figure: "7-14", label: "hari kerja untuk demo pertama" },
        { count: 100, suffix: "%", label: "kepemilikan kode proyek khusus sesuai kontrak kerja" },
        { count: 3, label: "bidang keahlian dalam satu tim" },
      ],
    },
    hero: {
      category: "IT Agency · Software, Desain, Foto & Video, IoT & Perangkat Keras",
      badge: "IT Agency",
      headline: { lead: "Teknologi Tepat,", accent: "Bisnis Tumbuh Lebih Cepat." },
      audience: "Software, desain, foto & video, hingga IoT, ditangani satu tim profesional.",
      primaryCta: "Diskusikan kebutuhan Anda",
    },
    principles: {
      title: "Prinsip Kerja Sama Kami",
      intro:
        "Setiap proyek kami mulai dengan mempelajari bisnis Anda, sebelum satu baris kode ditulis. Empat prinsip berikut menjaga agar sistem yang kami bangun benar-benar dipakai oleh tim Anda.",
      items: [
        {
          icon: "learn",
          title: "Berangkat dari Kebutuhan Bisnis",
          description:
            "Kami mempelajari alur kerja, kendala, dan prioritas tim Anda, lalu membangun fitur yang memang dibutuhkan.",
        },
        {
          icon: "open",
          title: "Terbuka di Setiap Tahap",
          description:
            "Setiap minggu Anda melihat demo dan dapat mencoba versi uji coba. Kendala kami sampaikan begitu ditemukan.",
        },
        {
          icon: "maintain",
          title: "Mudah Dirawat dan Dikembangkan",
          description:
            "Struktur yang rapi dan dokumentasi yang lengkap menjadikan sistem mudah dipelihara dan dikembangkan, baik oleh kami maupun tim lain.",
        },
        {
          icon: "own",
          title: "Hasil Kerja Sepenuhnya Milik Anda",
          description:
            "Kode sumber, file desain, dan rancangan rangkaian perangkat proyek khusus diserahkan kepada Anda sesuai kontrak kerja, setelah serah terima dan pelunasan.",
        },
      ],
    },
    services: {
      title: "Software, Desain, dan IoT dalam Satu Tim",
      intro:
        "Anda tidak perlu mengelola banyak vendor. Pilih layanan yang Anda butuhkan, atau gabungkan beberapa bidang dalam satu proyek.",
      fieldLabel: "Bidang",
      detailLink: "Lihat detail layanan",
      supportTitle: "Pendampingan setelah peluncuran",
      supportBody: "Pemantauan server, pembaruan keamanan, pencadangan data rutin, dan pengembangan fitur melalui paket bulanan atau tahunan.",
      supportLink: "Lihat layanan pendamping",
      productsTitle: "Implementasi lebih cepat dengan platform siap pakai",
      productsBody: "Dashboard laporan, toko online, dan sistem voucher yang siap digunakan dengan merek perusahaan Anda.",
      productsLink: "Lihat platform KaryaLo",
    },
    problems: {
      title: "Tantangan yang Sering Menghambat Operasional",
      intro:
        "Temukan kondisi yang paling sesuai dengan bisnis Anda, beserta solusi yang dapat kami bangun dan contoh proyek terkait.",
      fieldLabel: "Bidang",
      builds: "Yang kami bangun",
      discuss: "Diskusikan kebutuhan ini",
      notListed: "Tantangan Anda belum tercantum? Sampaikan kepada kami, dan kami bantu menentukan prioritas penanganannya.",
      whatsapp: "Diskusikan kebutuhan Anda",
    },
    team: {
      title: "Komunikasi Langsung dengan Tim Pelaksana",
      body:
        "Pengembang, desainer, dan teknisi perangkat KaryaLo bekerja dalam satu tim di Kota Bekasi, dan Anda berbicara langsung dengan mereka tanpa perantara. KaryaLo adalah merek layanan PT Karsa Swakarya Loka.",
      profileLink: "Lihat profil perusahaan",
      capabilitiesTitle: "Keahlian tim kami",
      capabilities: [
        "Arah bisnis & kemitraan",
        "Rancangan sistem & kualitas teknis",
        "Pengembangan web & mobile",
        "Desain tampilan aplikasi & identitas merek",
        "Perangkat IoT & pemrogramannya",
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
      title: "Lima Tahap Kerja yang Transparan",
      intro:
        "Setiap tahap memiliki hasil kerja, jadwal, dan titik evaluasi yang jelas. Perubahan ruang lingkup dan biaya selalu disepakati sebelum pekerjaan tambahan dimulai.",
      bannerBadge: "Validasi Sebelum Pengembangan",
      bannerTitle: "Uji Alur Sistem Sebelum Satu Baris Kode Ditulis",
      bannerBody:
        "Dalam 7-14 hari kerja, Anda menerima demo interaktif sesuai ruang lingkup yang disepakati. Tim Anda dapat mengujinya dan memberi masukan sebelum pengembangan dimulai, saat perubahan masih mudah dilakukan.",
      stage: "Tahap",
      youGet: "Yang Anda terima:",
    },
    coverage: {
      title: "Dari Bekasi, Melayani Seluruh Indonesia",
      body:
        "Studio dan bengkel perangkat kami berlokasi di Jatisampurna, Kota Bekasi. Kami melayani pertemuan langsung di Jabodetabek dan kolaborasi daring di seluruh Indonesia. Kunjungan pemasangan dan penyetelan perangkat IoT dijadwalkan sesuai kebutuhan proyek.",
      modesTitle: "Metode kolaborasi",
      modes: ["Tatap muka", "Daring", "Kombinasi keduanya"],
      engagementsTitle: "Bentuk kerja sama",
      engagements: [
        {
          title: "Per proyek",
          body: "Ruang lingkup, jadwal, dan tahap pembayaran ditetapkan dalam kontrak kerja, dengan serah terima resmi pada akhir proyek.",
        },
        {
          title: "Pendampingan berkala",
          body: "Pemeliharaan dan pengembangan setelah peluncuran tersedia melalui kerja sama bulanan atau tahunan.",
        },
      ],
    },
    trust: {
      title: "Legalitas Perusahaan yang Dapat Diverifikasi",
      intro: "Sebelum bekerja sama dengan vendor baru, Anda tentu perlu memeriksa legalitasnya. Seluruh dokumen perusahaan kami tersedia untuk verifikasi vendor dan proses pengadaan Anda.",
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
            "Setiap tahap pembayaran dilengkapi invoice resmi atas nama PT Karsa Swakarya Loka. Pembayaran dilakukan melalui rekening perusahaan.",
        },
        {
          title: "Perjanjian Kerahasiaan",
          detail: "NDA sebelum diskusi teknis",
          description:
            "Kami menjaga kerahasiaan dokumen, data, dan rencana bisnis Anda. NDA dapat disepakati sebelum pembahasan teknis dimulai.",
        },
      ],
      bannerTitle: "Siap Mendukung Pendaftaran Vendor Anda",
      bannerBody: "Ajukan permintaan salinan PDF SK Kementerian Hukum, NPWP, NIB, dan profil perusahaan untuk melengkapi berkas pengadaan Anda.",
      bannerCta: "Minta dokumen legal",
      bannerMessage: "Halo KaryaLo, kami butuh dokumen legal dan NIB PT Karsa Swakarya Loka untuk proses pendaftaran vendor.",
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      intro:
        "Informasi ringkas mengenai proses kerja sama, kepemilikan kode, pembayaran, garansi, dan dokumen perusahaan.",
      askLead: "Memiliki pertanyaan lain?",
      askBody: "Jadwalkan konsultasi daring 30 menit bersama tim kami, tanpa biaya dan tanpa kewajiban melanjutkan.",
      askCta: "Tanya via WhatsApp",
    },
    advantage: {
      title: "Sistem yang benar-benar dipakai tim Anda.",
      intro: "Banyak sistem selesai dibangun, namun akhirnya ditinggalkan karena tidak sesuai dengan cara kerja tim. Karena itu kami mendampingi Anda dari perancangan sampai pemeliharaan setelah serah terima.",
      othersLabel: "Vendor IT pada umumnya",
      usLabel: "Bersama KaryaLo",
      rows: [
        { topic: "Pengerjaan", others: "Bisa dialihkan ke pihak lain", us: "Dikerjakan langsung oleh tim inti kami" },
        { topic: "Sebelum kode ditulis", others: "Hasil baru terlihat setelah pengembangan berjalan", us: "Demo yang bisa langsung diklik dalam 7-14 hari kerja" },
        { topic: "Ruang lingkup", others: "Batas kerja sering tidak tertulis", us: "Batas kerja & serah terima tertulis di kontrak kerja" },
        { topic: "Kepemilikan", others: "Kode & file desain tetap di vendor", us: "Kode & file desain proyek khusus milik Anda sesuai kontrak kerja" },
        { topic: "Bidang", others: "Software, desain, dan IoT dari vendor berbeda", us: "Software, desain & IoT dalam satu tim" },
        { topic: "Setelah rilis", others: "Selesai saat serah terima", us: "Perawatan & pendampingan setelah peluncuran" },
      ],
      link: "Kenali tim & cara kerja kami",
    },
    cta: {
      title: "Wujudkan Rencana Digital Bisnis Anda",
      body:
        "Baik sistem baru, penyempurnaan aplikasi, maupun pemantauan IoT, sampaikan kebutuhan Anda. Kami bantu memetakan prioritas dan ruang lingkup awal, tanpa kewajiban melanjutkan proyek.",
      primary: "Diskusikan kebutuhan Anda",
      secondary: "Kenali KaryaLo",
      officeLabel: "Kantor & Studio",
      hours: "Senin sampai Jumat (09.00 sampai 18.00 WIB)",
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
      label: "KaryaLo project examples",
      goTo: (n, total) => `Show project ${n} of ${total}`,
      slideAlt: (title) => `${title}, shown on a laptop`,
      openProject: (title) => `View case study: ${title}`,
    },
    studio: {
      imageAlt: "The KaryaLo studio with software development workstations",
      commitments: [
        { figure: "7-14", label: "working days to your first demo" },
        { count: 100, suffix: "%", label: "ownership of your custom project code, set out in the contract" },
        { count: 3, label: "areas of expertise in one team" },
      ],
    },
    hero: {
      category: "IT Agency · Software, Design, Photo & Video, IoT & Hardware",
      badge: "IT Agency",
      headline: { lead: "The Right Technology,", accent: "Faster Business Growth." },
      audience: "Software, design, photo & video, through to IoT, handled by one professional team.",
      primaryCta: "Discuss your project",
    },
    principles: {
      title: "Our Partnership Principles",
      intro:
        "We start every project by learning how your business runs, before any code is written. These four principles keep what we build in daily use by your team.",
      items: [
        {
          icon: "learn",
          title: "Your Business First",
          description:
            "We study your workflows, challenges, and priorities, then build the features your team actually needs.",
        },
        {
          icon: "open",
          title: "Open at Every Stage",
          description:
            "Each week you see a demo and can try the online test version. We tell you about issues as soon as we find them.",
        },
        {
          icon: "maintain",
          title: "Easy to Maintain and Extend",
          description:
            "Clean structure and complete documentation keep the system easy to maintain and extend, by us or by another team.",
        },
        {
          icon: "own",
          title: "The Work Is Fully Yours",
          description:
            "Custom project source code, design files, and device circuit designs are handed to you under the contract once handover and payment are complete.",
        },
      ],
    },
    services: {
      title: "Software, Design, and IoT in One Team",
      intro: "You don't need to manage several vendors. Choose the service you need, or combine several fields in one project.",
      fieldLabel: "Field",
      detailLink: "See service details",
      supportTitle: "Support after launch",
      supportBody: "Server monitoring, security updates, routine data backups, and feature development through a monthly or annual plan.",
      supportLink: "See support services",
      productsTitle: "Faster rollout with a ready-made platform",
      productsBody: "A reporting dashboard, an online store, and a voucher system ready to run under your company's brand.",
      productsLink: "See KaryaLo platforms",
    },
    problems: {
      title: "Challenges That Slow Operations Down",
      intro:
        "Find the situation closest to your business, with the solution we can build and related project examples.",
      fieldLabel: "Field",
      builds: "What we build",
      discuss: "Discuss this need",
      notListed: "Your challenge isn't listed? Tell us, and we will help you prioritise what to address first.",
      whatsapp: "Discuss your project",
    },
    team: {
      title: "Direct Communication with Your Project Team",
      body:
        "KaryaLo's developers, designers, and device engineers work as one team in Bekasi, and you talk to them directly, with no middlemen. KaryaLo is the service brand of PT Karsa Swakarya Loka.",
      profileLink: "See the company profile",
      capabilitiesTitle: "Our team's expertise",
      capabilities: [
        "Business direction & partnerships",
        "System design & technical quality",
        "Web & mobile development",
        "App design & brand identity",
        "IoT devices & their programming",
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
      title: "Five Transparent Stages of Work",
      intro:
        "Each stage has clear outputs, a schedule, and review points. Changes to scope and cost are always agreed before additional work begins.",
      bannerBadge: "Validate Before Development",
      bannerTitle: "Test the Workflow Before a Line of Code Is Written",
      bannerBody:
        "Within 7-14 working days you receive a clickable demo for the agreed scope. Your team can test it and give feedback before development begins, while changes are still easy to make.",
      stage: "Stage",
      youGet: "What you receive:",
    },
    coverage: {
      title: "Based in Bekasi, Serving All of Indonesia",
      body:
        "Our studio and device workshop are in Jatisampurna, Bekasi. We offer in-person meetings across Greater Jakarta and remote collaboration throughout Indonesia. IoT installation and set-up visits are scheduled around your project.",
      modesTitle: "Ways to collaborate",
      modes: ["In person", "Remote", "Hybrid"],
      engagementsTitle: "How we engage",
      engagements: [
        {
          title: "Per project",
          body: "Scope, schedule, and payment stages are set out in the contract, with a formal handover at completion.",
        },
        {
          title: "Ongoing support",
          body: "Post-launch maintenance and development are available through monthly or annual engagements.",
        },
      ],
    },
    trust: {
      title: "Company Credentials You Can Verify",
      intro: "Before you work with a new vendor, you will want to check its legal standing. All our company documents are available for your vendor verification and procurement process.",
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
            "Each payment stage comes with a formal invoice from PT Karsa Swakarya Loka. Payments are made to the company bank account.",
        },
        {
          title: "Non-Disclosure Agreement",
          detail: "NDA before technical talks",
          description:
            "We treat your documents, data, and business plans as confidential. An NDA can be agreed before technical discussions begin.",
        },
      ],
      bannerTitle: "Ready to Support Your Vendor Registration",
      bannerBody: "Request PDF copies of our Ministry of Law decree, tax ID (NPWP), business ID (NIB), and company profile to complete your file.",
      bannerCta: "Request legal documents",
      bannerMessage: "Hello KaryaLo, we need the legal documents and NIB of PT Karsa Swakarya Loka for our vendor registration.",
    },
    faq: {
      title: "Frequently Asked Questions",
      intro:
        "Concise answers on our engagement process, code ownership, payments, warranties, and company documents.",
      askLead: "Have another question?",
      askBody: "Schedule a 30-minute online consultation with our team, free of charge and with no obligation to proceed.",
      askCta: "Ask on WhatsApp",
    },
    advantage: {
      title: "Systems your team actually uses.",
      intro: "Many systems are built, then abandoned because they do not fit how the team works. That is why we stay with you from design through to maintenance after handover.",
      othersLabel: "The usual IT vendor",
      usLabel: "With KaryaLo",
      rows: [
        { topic: "Who builds it", others: "Work may be passed to other parties", us: "Built in-house by our own core team" },
        { topic: "Before any code", others: "You see results only once development is underway", us: "A clickable demo in 7-14 working days" },
        { topic: "Scope", others: "Boundaries are often left unwritten", us: "Scope and handover written into the contract" },
        { topic: "Ownership", others: "Code and design files stay with the vendor", us: "Custom-project code and design files are yours, per the contract" },
        { topic: "Fields", others: "Software, design and IoT from different vendors", us: "Software, design & IoT in one team" },
        { topic: "After launch", others: "The job ends at handover", us: "Maintenance and support after launch" },
      ],
      link: "Meet the team & how we work",
    },
    cta: {
      title: "Bring Your Digital Plans to Life",
      body:
        "Whether it is a new system, an application upgrade, or IoT monitoring, tell us what you need. We will help map your priorities and initial scope, with no obligation to proceed.",
      primary: "Discuss your project",
      secondary: "Get to know KaryaLo",
      officeLabel: "Office & Studio",
      hours: "Monday to Friday (09:00 to 18:00 WIB)",
    },
  },
};
