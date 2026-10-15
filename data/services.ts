import type { Locale, Localized } from "@/lib/i18n";

export interface SubService {
  /** Internal quotation/SPK reference. Never rendered on the public site. */
  code: string;
  name: string;
  description: string;
  items: string[];
}

export interface ServicePillar {
  id: "digital-engineering" | "creative-design" | "iot-hardware";
  pillarNumber: string;
  /** Internal quotation/SPK reference. Never rendered on the public site. */
  codePrefix: "DEV" | "DSG" | "IOT";
  name: string;
  shortName: string;
  focus: string;
  image: string;
  /** Describes what the photo actually shows, for screen readers and image search. */
  imageAlt: string;
  subServices: SubService[];
}

/**
 * Work that runs alongside the three fields rather than as a fourth one: what
 * keeps an extended IT partner around after launch. Each line is backed by an
 * existing commitment — the maintenance package in data/faq.ts and the free
 * scoping conversation on /contact.
 */
export interface SupportService {
  id: "maintenance" | "scoping";
  name: string;
  description: string;
  items: string[];
}

/** Indonesian is the source; the English overlay below only replaces wording. */
const servicesId: ServicePillar[] = [
  {
    id: "digital-engineering",
    pillarNumber: "01",
    codePrefix: "DEV",
    name: "Pengembangan Software & Aplikasi",
    shortName: "Software & Aplikasi",
    focus: "Website, aplikasi, dan sistem internal yang dirancang untuk mendukung operasional harian serta perkembangan bisnis Anda.",
    image: "/images/service-software.webp",
    imageAlt: "Laptop di atas meja kantor menampilkan dashboard laporan kinerja perusahaan, dengan ponsel dan buku catatan di sampingnya.",
    subServices: [
      {
        code: "DEV-WEB",
        name: "Website & Aplikasi Web",
        description: "Pengembangan website perusahaan, aplikasi operasional, dan platform berlangganan dengan perhatian pada kecepatan akses, kemudahan penggunaan, serta optimasi mesin pencari.",
        items: ["Website perusahaan dengan optimasi SEO", "Aplikasi web yang dapat dipasang di ponsel", "Platform berlangganan (SaaS)"]
      },
      {
        code: "DEV-APP",
        name: "Aplikasi Mobile",
        description: "Pengembangan aplikasi Android dan iOS dari satu basis kode untuk mendukung tim lapangan, transaksi kasir, dan pencatatan persediaan.",
        items: ["Aplikasi Android & iOS", "Aplikasi tim lapangan", "Kasir & pencatatan stok"]
      },
      {
        code: "DEV-ENT",
        name: "Sistem Internal & Integrasi",
        description: "Satukan data dan proses melalui dashboard bisnis, integrasi pembayaran, serta koneksi antarsistem yang mendukung alur kerja perusahaan Anda.",
        items: ["Dashboard laporan bisnis", "Integrasi pembayaran", "Integrasi antarsistem (API)"]
      }
    ]
  },
  {
    id: "creative-design",
    pillarNumber: "02",
    codePrefix: "DSG",
    name: "Desain Antarmuka & Identitas Merek",
    shortName: "Desain & Branding",
    focus: "Desain produk digital dan identitas merek yang memperjelas komunikasi, memudahkan penggunaan, dan menjaga konsistensi bisnis Anda.",
    image: "/images/service-design.webp",
    imageAlt: "Buku sketsa berisi rancangan alur layar aplikasi, di sampingnya tablet menampilkan desain aplikasi dan kipas contoh warna cetak.",
    subServices: [
      {
        code: "DSG-UI",
        name: "Desain UI/UX Produk Digital",
        description: "Perancangan alur pengguna, purwarupa interaktif di Figma, dan penyempurnaan antarmuka untuk membantu pengguna menyelesaikan tugas dengan lebih mudah.",
        items: ["Purwarupa Figma interaktif", "Panduan komponen antarmuka", "Perancangan ulang aplikasi"]
      },
      {
        code: "DSG-BRD",
        name: "Identitas Merek & Materi Perusahaan",
        description: "Bangun identitas perusahaan yang konsisten melalui logo, panduan warna dan tipografi, dokumen bisnis, serta profil perusahaan.",
        items: ["Logo & panduan merek", "Kop surat, kartu nama, invoice", "Company profile & pitch deck"]
      },
      {
        code: "DSG-MKT",
        name: "Materi Promosi & Presentasi",
        description: "Materi komunikasi yang membantu menjelaskan produk dan menyampaikan penawaran, mulai dari template media sosial hingga infografis dan presentasi bisnis.",
        items: ["Template media sosial", "Infografis penjelas produk", "Deck presentasi penjualan"]
      }
    ]
  },
  {
    id: "iot-hardware",
    pillarNumber: "03",
    codePrefix: "IOT",
    name: "Perangkat IoT & Sistem Pemantauan",
    shortName: "IoT & Perangkat",
    focus: "Hubungkan sensor dan perangkat lapangan dengan dashboard untuk memantau kondisi operasional serta menerima peringatan sesuai parameter yang ditetapkan.",
    image: "/images/service-iot-2.webp",
    imageAlt: "Meja kerja dengan papan rangkaian kecil tersambung ke perangkat pemantau hitam, sementara layar di belakangnya menampilkan kode program dan diagram alur datanya.",
    subServices: [
      {
        code: "IOT-HW",
        name: "Perakitan Perangkat & Purwarupa",
        description: "Perancangan perangkat pemantauan sesuai kebutuhan, mencakup pemilihan komponen, integrasi sensor dan GPS, serta pembuatan casing cetak 3D.",
        items: ["Purwarupa perangkat pemantauan", "Integrasi sensor & GPS", "Rangkaian & casing khusus"]
      },
      {
        code: "IOT-FW",
        name: "Program Perangkat & Pengiriman Data",
        description: "Pengembangan firmware untuk mengelola pengiriman data, keamanan komunikasi, dan konsumsi daya dengan mempertimbangkan kondisi jaringan di lokasi.",
        items: ["Pengiriman data terenkripsi", "Koneksi jarak jauh & hemat daya", "Pengolahan data di perangkat"]
      },
      {
        code: "IOT-PLT",
        name: "Dashboard Pemantauan & Notifikasi",
        description: "Pantau data perangkat melalui dashboard dan terima notifikasi otomatis melalui WhatsApp, Telegram, atau email berdasarkan kondisi yang ditentukan.",
        items: ["Dashboard pemantauan perangkat", "Notifikasi otomatis WhatsApp", "Integrasi dengan aplikasi Anda"]
      }
    ]
  }
];

type PillarText = Pick<ServicePillar, "name" | "shortName" | "focus" | "imageAlt"> & {
  subServices: Record<string, Pick<SubService, "name" | "description" | "items">>;
};

const servicesEn: Record<ServicePillar["id"], PillarText> = {
  "digital-engineering": {
    name: "Software & Application Development",
    shortName: "Software & Apps",
    focus: "Websites, applications, and internal systems designed to support daily operations and your business's development.",
    imageAlt: "A laptop on an office desk showing a company performance dashboard, with a phone and a notebook beside it.",
    subServices: {
      "DEV-WEB": {
        name: "Websites & Web Applications",
        description: "Company websites, operational web applications, and subscription platforms developed with a focus on performance, usability, and search engine optimisation.",
        items: ["Company websites with SEO optimisation", "Installable mobile web apps", "Subscription platforms (SaaS)"],
      },
      "DEV-APP": {
        name: "Mobile Applications",
        description: "Android and iOS applications built from a single codebase to support field teams, point-of-sale transactions, and inventory management.",
        items: ["Android & iOS apps", "Field team apps", "Point of sale & inventory"],
      },
      "DEV-ENT": {
        name: "Internal Systems & Integration",
        description: "Connect data and workflows through business dashboards, payment integrations, and connections between your existing systems.",
        items: ["Business reporting dashboards", "Payment integration", "System integration (APIs)"],
      },
    },
  },
  "creative-design": {
    name: "Interface Design & Brand Identity",
    shortName: "Design & Branding",
    focus: "Digital product design and brand identity that clarify your message, improve usability, and create a consistent business presence.",
    imageAlt: "A sketchbook of app screen flows, beside a tablet showing an app design and a fan of print colour swatches.",
    subServices: {
      "DSG-UI": {
        name: "Digital Product UI/UX Design",
        description: "User flows, interactive Figma prototypes, and interface improvements that help people complete their tasks more easily.",
        items: ["Interactive Figma prototypes", "Interface component guide", "Redesign of existing apps"],
      },
      "DSG-BRD": {
        name: "Brand Identity & Company Materials",
        description: "Build a consistent company identity through logos, colour and typography guidelines, business stationery, and company profiles.",
        items: ["Logo & brand guidelines", "Letterheads, business cards, invoices", "Company profile & pitch deck"],
      },
      "DSG-MKT": {
        name: "Marketing & Presentation Materials",
        description: "Communication materials that explain your products and present your offer, from social media templates to infographics and business presentations.",
        items: ["Social media templates", "Product explainer infographics", "Sales presentation decks"],
      },
    },
  },
  "iot-hardware": {
    name: "IoT Devices & Monitoring Systems",
    shortName: "IoT & Devices",
    focus: "Connect sensors and field devices to a dashboard to monitor operational conditions and receive alerts based on defined parameters.",
    imageAlt: "A workbench with a small circuit board wired to a black monitoring device, while a screen behind it shows program code and a diagram of its data flow.",
    subServices: {
      "IOT-HW": {
        name: "Device Assembly & Prototyping",
        description: "Custom monitoring device design, including component selection, sensor and GPS integration, and 3D-printed enclosures.",
        items: ["Monitoring device prototypes", "Sensor & GPS fitting", "Custom circuits & enclosures"],
      },
      "IOT-FW": {
        name: "Device Firmware & Data Transmission",
        description: "Firmware development for data transmission, communication security, and power management, taking local network conditions into account.",
        items: ["Encrypted data transmission", "Long-range, low-power connectivity", "On-device data processing"],
      },
      "IOT-PLT": {
        name: "Monitoring Dashboard & Alerts",
        description: "Monitor device data through a dashboard and receive automated WhatsApp, Telegram, or email notifications when defined conditions are met.",
        items: ["Live monitoring dashboard", "Automatic WhatsApp alerts", "Connection to your apps"],
      },
    },
  },
};

export const servicesData: Localized<ServicePillar[]> = {
  id: servicesId,
  en: servicesId.map((pillar) => {
    const text = servicesEn[pillar.id];
    return {
      ...pillar,
      name: text.name,
      shortName: text.shortName,
      focus: text.focus,
      imageAlt: text.imageAlt,
      subServices: pillar.subServices.map((sub) => ({ ...sub, ...text.subServices[sub.code] })),
    };
  }),
};

export const supportServicesData: Localized<SupportService[]> = {
  id: [
    {
      id: "maintenance",
      name: "Perawatan & Pendampingan Sistem",
      description:
        "Dukungan setelah peluncuran untuk pemantauan server, pembaruan keamanan, pencadangan data, dan penanganan kendala. Cakupan layanan disepakati melalui paket bulanan atau tahunan.",
      items: ["Pemantauan server & aplikasi", "Pembaruan keamanan & pencadangan rutin", "Perbaikan & pengembangan sesuai paket"],
    },
    {
      id: "scoping",
      name: "Pemetaan Kebutuhan Sebelum Proyek",
      description:
        "Tentukan langkah awal melalui pemetaan proses kerja, prioritas bisnis, dan kebutuhan pengguna. Kami memberikan rekomendasi solusi serta gambaran ruang lingkup tanpa kewajiban melanjutkan proyek.",
      items: ["Pemetaan proses kerja saat ini", "Rekomendasi solusi & teknologi", "Gambaran ruang lingkup & tahapan"],
    },
  ],
  en: [
    {
      id: "maintenance",
      name: "System Maintenance & Support",
      description:
        "Post-launch support for server monitoring, security updates, data backups, and issue resolution. Service coverage is agreed through a monthly or annual plan.",
      items: ["Server & application monitoring", "Security updates & routine backups", "Fixes & development within the agreed plan"],
    },
    {
      id: "scoping",
      name: "Project Discovery & Scoping",
      description:
        "Define your starting point by reviewing workflows, business priorities, and user needs. We recommend an approach and outline an initial scope, with no obligation to proceed.",
      items: ["Current workflow assessment", "Solution & technology recommendations", "Initial scope & delivery stages"],
    },
  ],
};

export function getServices(lang: Locale) {
  return servicesData[lang];
}
