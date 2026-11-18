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
    image: "/images/pdf/acc-dev.webp",
    imageAlt: "Laptop di atas meja kantor menampilkan dashboard laporan kinerja perusahaan, dengan ponsel dan buku catatan di sampingnya.",
    subServices: [
      {
        code: "DEV-WEB",
        name: "Website & Aplikasi Web",
        description: "Pengembangan website perusahaan, aplikasi operasional, dan platform berlangganan dengan perhatian pada kecepatan akses, kemudahan penggunaan, serta mudah ditemukan di Google.",
        items: ["Website perusahaan yang mudah ditemukan di Google", "Aplikasi web yang dapat dipasang di ponsel", "Platform berlangganan untuk pelanggan Anda"]
      },
      {
        code: "DEV-APP",
        name: "Aplikasi Mobile",
        description: "Pengembangan aplikasi Android dan iOS sekaligus dalam satu kali pengembangan untuk mendukung tim lapangan, transaksi kasir, dan pencatatan persediaan.",
        items: ["Aplikasi Android & iOS", "Aplikasi tim lapangan", "Kasir & pencatatan stok"]
      },
      {
        code: "DEV-ENT",
        name: "Sistem Internal & Integrasi",
        description: "Satukan data dan proses melalui dashboard bisnis, integrasi pembayaran, serta koneksi antarsistem yang mendukung alur kerja perusahaan Anda.",
        items: ["Dashboard laporan bisnis", "Integrasi pembayaran", "Menghubungkan sistem yang sudah ada"]
      }
    ]
  },
  {
    id: "creative-design",
    pillarNumber: "02",
    codePrefix: "DSG",
    name: "Desain, Identitas Merek, Foto & Video",
    shortName: "Desain & Kreatif",
    focus: "Desain produk digital, identitas merek, serta foto dan video yang memperjelas komunikasi, memudahkan penggunaan, dan menjaga konsistensi bisnis Anda.",
    image: "/images/pdf/design-brand-v4.webp",
    imageAlt: "Tampilan aplikasi KaryaLo di layar tablet, dengan contoh palet warna biru, huruf, dan deretan ikon aplikasi di sampingnya.",
    subServices: [
      {
        code: "DSG-UI",
        name: "Desain Tampilan & Alur Aplikasi (UI/UX)",
        description: "Perancangan alur pengguna, demo interaktif di Figma, dan penyempurnaan tampilan untuk membantu pengguna menyelesaikan tugas dengan lebih mudah.",
        items: ["Demo interaktif (Figma)", "Panduan elemen tampilan", "Perancangan ulang aplikasi"]
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
      },
      {
        code: "DSG-MED",
        name: "Fotografi & Videografi",
        description: "Produksi foto dan video untuk kebutuhan bisnis, seperti foto produk, dokumentasi kegiatan, profil perusahaan, dan materi promosi, sejalan dengan identitas merek Anda.",
        items: ["Foto produk & profil perusahaan", "Video company profile & promosi", "Dokumentasi kegiatan usaha"]
      }
    ]
  },
  {
    id: "iot-hardware",
    pillarNumber: "03",
    codePrefix: "IOT",
    name: "IoT, Jaringan & Perangkat Keras",
    shortName: "IoT & Perangkat",
    focus: "Hubungkan sensor dan perangkat lapangan dengan dashboard untuk memantau kondisi operasional, serta penuhi kebutuhan komputer dan perangkat jaringan kantor Anda dari satu mitra.",
    image: "/images/pdf/iot-monitor-v4.webp",
    imageAlt: "Perangkat sensor putih dengan antena di atas meja, di sebelahnya kartu dashboard Monitoring Lapangan yang menampilkan suhu, kelembapan, dan status normal.",
    subServices: [
      {
        code: "IOT-HW",
        name: "Perakitan Perangkat & Uji Coba",
        description: "Perancangan perangkat pemantauan sesuai kebutuhan, mencakup pemilihan komponen, integrasi sensor dan GPS, serta pembuatan casing cetak 3D.",
        items: ["Perangkat pemantauan uji coba", "Integrasi sensor & GPS", "Rangkaian & casing khusus"]
      },
      {
        code: "IOT-FW",
        name: "Program Perangkat & Pengiriman Data",
        description: "Pemrograman perangkat agar data terkirim dengan aman, koneksi tetap stabil, dan baterai lebih awet dengan mempertimbangkan kondisi jaringan di lokasi.",
        items: ["Pengiriman data yang aman", "Koneksi jarak jauh & hemat daya", "Data diolah langsung di perangkat"]
      },
      {
        code: "IOT-PLT",
        name: "Dashboard Pemantauan & Notifikasi",
        description: "Pantau data perangkat melalui dashboard dan terima notifikasi otomatis melalui WhatsApp, Telegram, atau email berdasarkan kondisi yang ditentukan.",
        items: ["Dashboard pemantauan perangkat", "Notifikasi otomatis WhatsApp", "Integrasi dengan aplikasi Anda"]
      },
      {
        code: "IOT-RTL",
        name: "Pengadaan Komputer & Perangkat Jaringan",
        description: "Penyediaan komputer, laptop, dan perangkat jaringan seperti router MikroTik untuk kantor dan usaha Anda. Spesifikasi disesuaikan kebutuhan, dan harga disampaikan melalui penawaran.",
        items: ["Komputer & laptop kerja", "Router & perangkat jaringan MikroTik", "Pemilihan spesifikasi sesuai kebutuhan"]
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
        items: ["Company websites that are easy to find on Google", "Installable mobile web apps", "Subscription platforms for your customers"],
      },
      "DEV-APP": {
        name: "Mobile Applications",
        description: "Android and iOS applications built together in one go to support field teams, point-of-sale transactions, and inventory management.",
        items: ["Android & iOS apps", "Field team apps", "Point of sale & inventory"],
      },
      "DEV-ENT": {
        name: "Internal Systems & Integration",
        description: "Connect data and workflows through business dashboards, payment integrations, and connections between your existing systems.",
        items: ["Business reporting dashboards", "Payment integration", "Connecting your existing systems"],
      },
    },
  },
  "creative-design": {
    name: "Design, Brand Identity, Photo & Video",
    shortName: "Design & Creative",
    focus: "Digital product design, brand identity, photo and video that clarify your message, improve usability, and create a consistent business presence.",
    imageAlt: "A KaryaLo app design on a tablet screen, beside a blue colour palette, a type sample and a row of app icons.",
    subServices: {
      "DSG-UI": {
        name: "App Screen & Flow Design (UI/UX)",
        description: "User flows, clickable Figma demos, and screen improvements that help people complete their tasks more easily.",
        items: ["Clickable demos (Figma)", "Screen element guide", "Redesign of existing apps"],
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
      "DSG-MED": {
        name: "Photography & Videography",
        description: "Photo and video production for business needs such as product photos, event documentation, company profiles, and promotional material, in line with your brand identity.",
        items: ["Product & company profile photography", "Company profile & promo videos", "Business activity documentation"],
      },
    },
  },
  "iot-hardware": {
    name: "IoT, Networking & Hardware",
    shortName: "IoT & Devices",
    focus: "Connect sensors and field devices to a dashboard to monitor operations, and get your office computers and networking equipment from the same partner.",
    imageAlt: "A white sensor device with an antenna on a table, beside a Field Monitoring dashboard card showing temperature, humidity and a normal status.",
    subServices: {
      "IOT-HW": {
        name: "Device Assembly & Test Units",
        description: "Custom monitoring device design, including component selection, sensor and GPS integration, and 3D-printed enclosures.",
        items: ["Test monitoring devices", "Sensor & GPS fitting", "Custom circuits & enclosures"],
      },
      "IOT-FW": {
        name: "Device Programming & Data Sending",
        description: "Programming devices so data is sent securely, connections stay stable, and batteries last longer, taking local network conditions into account.",
        items: ["Secure data sending", "Long-range, low-power connectivity", "Data processed on the device"],
      },
      "IOT-PLT": {
        name: "Monitoring Dashboard & Alerts",
        description: "Monitor device data through a dashboard and receive automated WhatsApp, Telegram, or email notifications when defined conditions are met.",
        items: ["Live monitoring dashboard", "Automatic WhatsApp alerts", "Connection to your apps"],
      },
      "IOT-RTL": {
        name: "Computer & Networking Hardware Supply",
        description: "Supply of computers, laptops, and networking equipment such as MikroTik routers for your office or business. Specifications are matched to your needs, and pricing is given through a quotation.",
        items: ["Work computers & laptops", "MikroTik routers & networking gear", "Specifications matched to your needs"],
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

/**
 * Where each service photo is anchored inside its card. The cards narrow to a
 * slice when closed, so the subject (laptop, palette card, device, faces) has
 * to sit in that slice rather than at the photo's centre.
 */
/**
 * Desktop home cards: the open card shows only a strip of its photo above the
 * blue panel, so the portrait images (design, IoT) are anchored to the bottom
 * overflow, which is where the phone mockup and the monitoring card sit.
 */
export const SERVICE_FOCUS_WIDE: Record<string, string> = {
  "digital-engineering": "36% 50%",
  "creative-design": "40% 100%",
  "iot-hardware": "8% 100%",
  support: "55% 50%",
};

/**
 * The small 4:3 thumbnails on the home "Layanan Kami" cards. Each subject sits
 * near the middle of its photo (laptop + phone, the brand tablet and swatches,
 * the sensor with its monitoring card), so the crop stays centred on it; the
 * strip anchors above would cut the portrait ones down to their empty bottoms.
 */
export const SERVICE_FOCUS_THUMB: Record<string, string> = {
  "digital-engineering": "55% 42%",
  "creative-design": "50% 50%",
  "iot-hardware": "50% 47%",
  support: "50% 50%",
};

export const SERVICE_FOCUS: Record<string, string> = {
  "digital-engineering": "36% 50%",
  "creative-design": "40% 58%",
  "iot-hardware": "8% 50%",
  support: "55% 50%",
};
