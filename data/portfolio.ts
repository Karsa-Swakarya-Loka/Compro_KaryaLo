import type { Locale, Localized } from "@/lib/i18n";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  /** Client work, KaryaLo's own live product, or an internal prototype. */
  type: "client" | "product" | "prototype";
  categoryLabel: string;
  /**
   * Internal quotation/SPK reference. Never rendered on the public site; it only
   * maps a project to the sub-services shown on the case study page.
   */
  serviceCode: string;
  /** Public-facing, plain-language version of serviceCode. */
  serviceTags: string[];
  client: string;
  year: string;
  /** A 3D laptop mockup on a transparent background: show it whole (object-contain), never cropped. */
  coverImage: string;
  /** Plain viewport screenshots (16:9) for the case study gallery and the small cards, where detail matters. */
  galleryImages: string[];
  tags: string[];
  summary: string;
  /**
   * The SERP snippet for this case study, written by hand so it stays inside
   * the ~155 characters Google shows instead of being cut off mid-sentence.
   */
  seoDescription: string;
  challenge: string;
  solution: string;
  impact?: string;
}

/**
 * The date the case-study copy below last changed, for the sitemap's `lastmod`.
 * Update it when a project's text changes — not on every deploy, or the hint
 * becomes noise Google learns to ignore.
 */
export const portfolioUpdatedAt = "2026-10-15";

/** Indonesian is the source; the English overlay below only replaces wording. */
const portfolioId: ProjectItem[] = [
  {
    id: "alina-omnichannel",
    slug: "alina-omnichannel-retail",
    title: "Toko Online & Sistem Pengelolaan Pesanan Alina",
    type: "client",
    categoryLabel: "Ritel & e-commerce",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Aplikasi web", "Sistem internal", "Desain UI/UX"],
    client: "Alina Fashion & Retail",
    year: "2025",
    coverImage: "/images/portofolio/mockup/alina.webp",
    galleryImages: [
      "/images/portofolio/alina-store.webp",
      "/images/portofolio/alina-oms.webp",
      "/images/portofolio/alina-admin.webp"
    ],
    tags: ["Next.js 15", "Tailwind CSS", "PostgreSQL", "Cloudflare CDN", "Sistem gudang"],
    summary: "Integrasi toko online dan sistem pengelolaan pesanan untuk menyelaraskan transaksi pelanggan dengan pencatatan persediaan gudang.",
    seoDescription: "Studi kasus Alina: integrasi toko online, pengelolaan pesanan, dan stok gudang. Dikembangkan KaryaLo pada 2025.",
    challenge: "Perbedaan data antara pesanan online dan persediaan gudang menyebabkan pesanan masuk untuk barang yang telah habis, pembatalan transaksi, dan keterlambatan pengiriman.",
    solution: "Kami mengembangkan etalase belanja yang dioptimalkan untuk kecepatan akses serta panel pengelolaan pesanan yang terhubung dengan gudang. Tim dapat mengikuti status pesanan dari checkout hingga penyerahan kepada kurir.",
    impact: "Waktu pemrosesan pesanan berkurang sekitar 40%, disertai berkurangnya selisih pencatatan stok gudang."
  },
  {
    id: "hij-corporate-web",
    slug: "hij-corporate-profile",
    title: "Website Korporat HIJ",
    type: "client",
    categoryLabel: "Profil korporat",
    serviceCode: "DEV-WEB // DSG-BRD",
    serviceTags: ["Website perusahaan", "Identitas merek"],
    client: "PT HIJ",
    year: "2025",
    coverImage: "/images/portofolio/mockup/hij.webp",
    galleryImages: [
      "/images/portofolio/hij-compro.webp"
    ],
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Optimasi SEO"],
    summary: "Website profil perusahaan yang menyampaikan kapabilitas HIJ melalui informasi terstruktur, desain profesional, dan akses yang nyaman di berbagai perangkat.",
    seoDescription: "Studi kasus website korporat HIJ: profil perusahaan, desain responsif, dan optimasi kecepatan akses. Dikembangkan KaryaLo pada 2025.",
    challenge: "HIJ membutuhkan kehadiran digital yang mencerminkan profesionalisme perusahaan dan memudahkan calon mitra mempelajari layanannya, termasuk melalui ponsel.",
    solution: "Kami menyusun struktur informasi, memperkuat konsistensi visual, dan mengoptimalkan performa halaman. Animasi digunakan secara terukur untuk mendukung penyampaian informasi.",
    impact: "Tim HIJ memiliki profil digital yang dapat dibagikan kepada calon mitra sebagai referensi layanan dan kapabilitas perusahaan."
  },
  {
    id: "hij-garment-erp",
    slug: "hij-garment-erp",
    title: "Sistem ERP Konveksi HIJ",
    type: "client",
    categoryLabel: "Manufaktur & konveksi",
    serviceCode: "DEV-ENT // DSG-UI",
    serviceTags: ["Sistem internal", "Aplikasi web"],
    client: "PT HIJ",
    year: "2026",
    coverImage: "/images/portofolio/mockup/hij-erp.webp",
    galleryImages: [
      "/images/portofolio/hij-erp.webp"
    ],
    tags: ["Aplikasi web", "Scan QR", "Portal pelanggan"],
    summary: "Sistem ERP berbasis web yang menghubungkan pesanan, surat perintah kerja, tahapan produksi, logistik, dan keuangan, dilengkapi pemindaian QR serta portal pelanggan.",
    seoDescription: "ERP konveksi HIJ: pesanan, SPK, progres produksi per tahap, logistik, dan keuangan dalam satu sistem, dengan scan QR. Studi kasus KaryaLo, 2026.",
    challenge: "Operasional konveksi membutuhkan pencatatan yang terhubung dari penerimaan pesanan dan penerbitan surat perintah kerja hingga produksi, pengiriman, serta pelaporan keuangan.",
    solution: "Kami mengembangkan ERP dengan modul penjualan, perencanaan, produksi, logistik, dan keuangan. Dashboard menyediakan ringkasan 7, 30, atau 90 hari, dilengkapi pemindaian QR, pelacakan tahapan produksi, panduan penggunaan, dan portal pelanggan."
  },
  {
    id: "apegale-corporate-web",
    slug: "apegale-company-profile",
    title: "Website Perusahaan PT Ape Gale Indonesia",
    type: "client",
    categoryLabel: "Jasa ekspatriat & perizinan",
    serviceCode: "DEV-WEB // DSG-UI",
    serviceTags: ["Website perusahaan", "Desain UI/UX"],
    client: "PT Ape Gale Indonesia",
    year: "2026",
    coverImage: "/images/portofolio/mockup/apegale.webp",
    galleryImages: [
      "/images/portofolio/apegale-compro.webp",
      "/images/portofolio/apegale-layanan.webp"
    ],
    tags: ["Next.js", "Dua bahasa (ID/EN)", "Halaman per layanan"],
    summary: "Website berbahasa Indonesia dan Inggris untuk layanan perizinan ekspatriat serta tenaga kerja asing, dengan informasi layanan, pustaka regulasi, dan formulir permintaan penawaran.",
    seoDescription: "Website PT Ape Gale Indonesia: layanan perizinan ekspatriat dan TKA dalam dua bahasa, lengkap dengan pustaka regulasi. Studi kasus KaryaLo, 2026.",
    challenge: "Ape Gale perlu menyajikan layanan teknis yang beragam, mulai dari KITAS dan RPTKA hingga legalitas perusahaan serta penyediaan tenaga kerja, dalam informasi yang mudah dipahami calon klien.",
    solution: "Kami mengembangkan website dua bahasa dengan halaman khusus untuk setiap layanan, profil perusahaan, halaman GARIS, pustaka regulasi, dan berita. Formulir permintaan penawaran dapat dijangkau dari setiap halaman untuk memudahkan tindak lanjut."
  },
  {
    id: "affirmate-corporate-web",
    slug: "affirmate-company-profile",
    title: "Website Perusahaan Affirmate Administrative",
    type: "client",
    categoryLabel: "Jasa korporat & administrasi",
    serviceCode: "DEV-WEB // DSG-UI",
    serviceTags: ["Website perusahaan", "Desain UI/UX"],
    client: "Affirmate Administrative",
    year: "2026",
    coverImage: "/images/portofolio/mockup/affirmate.webp",
    galleryImages: [
      "/images/portofolio/affirmate-compro.webp",
      "/images/portofolio/affirmate-services.webp",
      "/images/portofolio/affirmate-network.webp"
    ],
    tags: ["Next.js", "Payload CMS", "Dua bahasa (EN/ID)"],
    summary: "Website dua bahasa untuk layanan korporat dan administrasi Affirmate Group, mencakup pendirian usaha, perizinan, visa, izin kerja, serta pengelolaan SDM dan penggajian.",
    seoDescription: "Website Affirmate Administrative: layanan korporat, perizinan, visa, dan HR di Indonesia dalam dua bahasa. Studi kasus KaryaLo, 2026.",
    challenge: "Affirmate Administrative memerlukan identitas digital yang jelas sebagai bagian dari Affirmate Group, sekaligus menjelaskan cakupan layanannya kepada perusahaan dan ekspatriat yang beroperasi di Indonesia.",
    solution: "Kami mengembangkan website berbahasa Inggris dan Indonesia dengan alur informasi yang menghubungkan profil, layanan, keunggulan, dan hubungan dengan grup. Riwayat perusahaan, peta jaringan kota, lokasi kantor, serta formulir kontak melengkapi informasi bagi calon klien."
  },
  {
    id: "deliastore",
    slug: "deliastore-topup",
    title: "DeliaStore: Toko Top Up Game & Produk Digital",
    type: "product",
    categoryLabel: "Produk digital & pembayaran",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Aplikasi web", "Sistem transaksi", "Desain UI/UX"],
    client: "DeliaStore, unit usaha PT Karsa Swakarya Loka",
    year: "2026",
    coverImage: "/images/portofolio/mockup/deliastore.webp",
    galleryImages: [
      "/images/portofolio/deliastore.webp",
      "/images/portofolio/deliastore-topup.webp"
    ],
    tags: ["Next.js 16", "PostgreSQL", "DOKU Checkout", "Digiflazz", "PWA"],
    summary: "Produk KaryaLo untuk penjualan top-up game, pulsa, paket data, token PLN, dan e-money. Platform mengintegrasikan pembayaran DOKU, pengiriman otomatis, promosi, serta program poin pelanggan.",
    seoDescription: "DeliaStore, produk KaryaLo untuk top-up game dan produk digital, dengan pembayaran DOKU, pengiriman otomatis, dan poin pelanggan. Beroperasi sejak 2026.",
    challenge: "Penjualan produk digital memerlukan verifikasi pembayaran yang akurat, pengiriman sesuai pesanan, serta pemantauan transaksi tertunda hingga status akhirnya terkonfirmasi.",
    solution: "Kami mengintegrasikan katalog pemasok dengan pembayaran DOKU melalui QRIS dan virtual account. Pembayaran diverifikasi kembali ke server sebelum pengiriman otomatis, sementara pesanan tertunda diperiksa secara berkala. Platform dilengkapi pelacakan pesanan, flash sale, voucher, poin pelanggan, login melalui nomor WhatsApp, dan dashboard admin dengan peringatan transaksi gagal."
  },
  {
    id: "karyalo-executive-bi",
    slug: "karyalo-executive-analytics",
    title: "Dashboard Laporan Internal KaryaLo",
    type: "prototype",
    categoryLabel: "Pemantauan operasional",
    serviceCode: "DEV-ENT",
    serviceTags: ["Dashboard & laporan"],
    client: "PT Karsa Swakarya Loka (riset internal)",
    year: "2026",
    coverImage: "/images/portofolio/mockup/karyalo-admin.webp",
    galleryImages: [
      "/images/prototype/karyalo-admin.webp"
    ],
    tags: ["Next.js", "Bisa dipasang seperti aplikasi", "Chart.js"],
    summary: "Purwarupa dashboard yang menyatukan indikator operasional dan status proyek dalam tampilan responsif untuk desktop serta ponsel.",
    seoDescription: "Purwarupa dashboard internal KaryaLo untuk indikator operasional dan status proyek, dengan tampilan responsif untuk desktop dan ponsel. Riset 2026.",
    challenge: "Data operasional tersebar di beberapa file dan aplikasi, sehingga tim perlu menggabungkan informasi secara manual sebelum evaluasi mingguan.",
    solution: "Kami menyatukan data dalam dashboard dengan hierarki informasi yang jelas. Tampilan menyesuaikan ukuran layar dan dapat dipasang di layar utama ponsel untuk memudahkan akses.",
    impact: "Tim memiliki satu tampilan untuk meninjau data operasional dan menyiapkan evaluasi mingguan."
  },
  {
    id: "karyalo-storefront-saas",
    slug: "karyalo-saas-storefront",
    title: "Platform Toko Online KaryaLo",
    type: "prototype",
    categoryLabel: "Ritel & e-commerce",
    serviceCode: "DEV-WEB // DSG-UI",
    serviceTags: ["Toko online", "Desain UI/UX"],
    client: "PT Karsa Swakarya Loka (riset internal)",
    year: "2026",
    coverImage: "/images/portofolio/mockup/karyalo-store.webp",
    galleryImages: [
      "/images/prototype/karyalo-store.webp"
    ],
    tags: ["Next.js 15", "Tailwind CSS", "Alur checkout singkat"],
    summary: "Purwarupa platform toko online dengan navigasi terstruktur, checkout ringkas, dan optimasi performa untuk mendukung pengalaman belanja.",
    seoDescription: "Purwarupa toko online KaryaLo dengan navigasi terstruktur, checkout ringkas, dan keranjang tersimpan. Riset internal untuk kebutuhan ritel, 2026.",
    challenge: "Navigasi yang rumit dan waktu muat halaman yang panjang dapat menghambat pelanggan saat mencari produk dan menyelesaikan pembelian.",
    solution: "Kami merancang alur dari sudut pandang pelanggan, mengoptimalkan pemuatan halaman, menyederhanakan checkout, dan menyediakan keranjang belanja tersimpan.",
    impact: "Struktur modular menyediakan dasar yang dapat disesuaikan untuk kebutuhan toko online berikutnya."
  },
  {
    id: "karyalo-topup-engine",
    slug: "karyalo-digital-topup",
    title: "Sistem Voucher & Top-Up Digital KaryaLo",
    type: "prototype",
    categoryLabel: "Produk digital & pembayaran",
    serviceCode: "DEV-ENT // DEV-WEB",
    serviceTags: ["Sistem transaksi", "Aplikasi web"],
    client: "PT Karsa Swakarya Loka (riset internal)",
    year: "2026",
    coverImage: "/images/portofolio/mockup/karyalo-topup.webp",
    galleryImages: [
      "/images/prototype/karyalo-topup.webp"
    ],
    tags: ["Next.js", "Integrasi pembayaran", "Antrean otomatis"],
    summary: "Purwarupa sistem transaksi yang menghubungkan penerimaan pesanan, verifikasi pembayaran, dan pengiriman produk digital secara otomatis.",
    seoDescription: "Purwarupa voucher dan top-up KaryaLo dengan antrean transaksi, verifikasi pembayaran, dan pengiriman otomatis. Riset internal 2026.",
    challenge: "Transaksi yang masuk bersamaan dan keterlambatan notifikasi pembayaran memerlukan pengelolaan antrean agar setiap pesanan dapat ditindaklanjuti dengan tepat.",
    solution: "Kami menyusun pemrosesan terpisah untuk setiap pesanan, dengan verifikasi pembayaran otomatis dan notifikasi kepada pembeli. Pendekatan ini mendukung pengelolaan transaksi secara terstruktur.",
    impact: "Purwarupa menghubungkan antrean pesanan, verifikasi pembayaran, dan notifikasi dalam satu alur pemrosesan."
  }
];

type ProjectText = Pick<
  ProjectItem,
  "title" | "categoryLabel" | "serviceTags" | "client" | "tags" | "summary" | "seoDescription" | "challenge" | "solution" | "impact"
>;

const internalClientEn = "PT Karsa Swakarya Loka (internal research)";

const portfolioEn: Record<string, ProjectText> = {
  "alina-omnichannel": {
    title: "Alina Online Store & Order Management System",
    categoryLabel: "Retail & e-commerce",
    serviceTags: ["Web application", "Internal system", "UI/UX design"],
    client: "Alina Fashion & Retail",
    tags: ["Next.js 15", "Tailwind CSS", "PostgreSQL", "Cloudflare CDN", "Warehouse system"],
    summary: "An integrated online store and order management system that aligns customer transactions with warehouse inventory records.",
    seoDescription: "Alina case study: online store, order management, and warehouse inventory integration. Developed by KaryaLo in 2025.",
    challenge: "Differences between online order data and warehouse inventory led to orders for unavailable items, cancellations, and delivery delays.",
    solution: "We developed a storefront optimised for loading performance and an order management panel connected to the warehouse. The team can track each order from checkout through courier handover.",
    impact: "Order processing time decreased by approximately 40%, alongside fewer warehouse inventory discrepancies.",
  },
  "hij-corporate-web": {
    title: "HIJ Corporate Website",
    categoryLabel: "Corporate profile",
    serviceTags: ["Company website", "Brand identity"],
    client: "PT HIJ",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO optimisation"],
    summary: "A company profile website presenting HIJ's capabilities through structured information, professional design, and a responsive experience across devices.",
    seoDescription: "HIJ corporate website case study: company information, responsive design, and loading performance optimisation. Developed by KaryaLo in 2025.",
    challenge: "HIJ needed a digital presence that reflected its professionalism and helped prospective partners understand its services, including on mobile devices.",
    solution: "We structured the information, strengthened visual consistency, and optimised page performance. Purposeful animation supports the presentation of content.",
    impact: "The HIJ team has a digital company profile to share with prospective partners as a reference for its services and capabilities.",
  },
  "hij-garment-erp": {
    title: "HIJ Garment ERP",
    categoryLabel: "Manufacturing & garments",
    serviceTags: ["Internal system", "Web application"],
    client: "PT HIJ",
    tags: ["Web application", "QR scanning", "Customer portal"],
    summary: "A web-based ERP connecting orders, production work orders, manufacturing stages, logistics, and finance, with QR scanning and a customer portal.",
    seoDescription: "HIJ's garment ERP: orders, work orders, production progress by stage, logistics, and finance in one system, with QR scanning. A KaryaLo case study, 2026.",
    challenge: "Garment operations require connected records from order intake and production instructions through manufacturing, delivery, and financial reporting.",
    solution: "We developed an ERP with sales, planning, production, logistics, and finance modules. The dashboard provides 7, 30, or 90-day summaries, supported by QR scanning, production stage tracking, user guidance, and a customer portal.",
  },
  "apegale-corporate-web": {
    title: "PT Ape Gale Indonesia Company Website",
    categoryLabel: "Expatriate & permit services",
    serviceTags: ["Company website", "UI/UX design"],
    client: "PT Ape Gale Indonesia",
    tags: ["Next.js", "Bilingual (ID/EN)", "A page per service"],
    summary: "An Indonesian and English website for expatriate and foreign worker permit services, with dedicated service information, a regulation library, and quotation enquiries.",
    seoDescription: "PT Ape Gale Indonesia's website: expatriate and foreign-worker permit services in two languages, with a regulation library. A KaryaLo case study, 2026.",
    challenge: "Ape Gale needed to present a broad range of technical services, from KITAS and RPTKA to company registration and staffing, in a format prospective clients could understand.",
    solution: "We developed a bilingual website with dedicated service pages, a company profile, a GARIS page, a regulation library, and news. A quotation request form is accessible from every page to make enquiries straightforward.",
  },
  "affirmate-corporate-web": {
    title: "Affirmate Administrative Company Website",
    categoryLabel: "Corporate & administrative services",
    serviceTags: ["Company website", "UI/UX design"],
    client: "Affirmate Administrative",
    tags: ["Next.js", "Payload CMS", "Bilingual (EN/ID)"],
    summary: "A bilingual website for Affirmate Group's corporate and administrative services, covering incorporation, licensing, visas, work permits, HR, and payroll.",
    seoDescription: "Affirmate Administrative's website: corporate, licensing, visa, and HR services in Indonesia, in two languages. A KaryaLo case study, 2026.",
    challenge: "Affirmate Administrative needed a distinct digital identity within Affirmate Group and a clear explanation of its services for companies and expatriates operating in Indonesia.",
    solution: "We developed an English and Indonesian website linking the company profile, services, strengths, and group relationship through a clear information structure. Company history, a city network map, office details, and a contact form complete the experience.",
  },
  "deliastore": {
    title: "DeliaStore: Game Top-Up & Digital Products Store",
    categoryLabel: "Digital products & payments",
    serviceTags: ["Web application", "Transaction system", "UI/UX design"],
    client: "DeliaStore, a PT Karsa Swakarya Loka business",
    tags: ["Next.js 16", "PostgreSQL", "DOKU Checkout", "Digiflazz", "PWA"],
    summary: "A KaryaLo product for game top-ups, mobile credit, data packages, electricity tokens, and e-money. The platform integrates DOKU payments, automated delivery, promotions, and customer rewards.",
    seoDescription: "DeliaStore, KaryaLo's game top-up and digital product store, with DOKU payments, automated delivery, and customer rewards. Operating since 2026.",
    challenge: "Digital product sales require accurate payment verification, correct order fulfilment, and monitoring of pending transactions until their final status is confirmed.",
    solution: "We integrated the supplier catalogue with DOKU payments through QRIS and virtual accounts. Payments are verified with the payment server before automated delivery, while pending orders are checked periodically. The platform includes order tracking, flash sales, vouchers, customer points, WhatsApp-number login, and an admin dashboard with failed-transaction alerts.",
  },
  "karyalo-executive-bi": {
    title: "KaryaLo Internal Reporting Dashboard",
    categoryLabel: "Operations monitoring",
    serviceTags: ["Dashboards & reporting"],
    client: internalClientEn,
    tags: ["Next.js", "Installable like an app", "Chart.js"],
    summary: "A dashboard prototype bringing operational indicators and project status into a responsive view for desktop and mobile.",
    seoDescription: "KaryaLo's internal dashboard prototype for operational indicators and project status, with responsive desktop and mobile views. Internal research, 2026.",
    challenge: "Operational data was spread across multiple files and applications, requiring manual compilation before weekly reviews.",
    solution: "We brought the data into a dashboard with a clear information hierarchy. The interface adapts to different screen sizes and can be added to a phone's home screen for convenient access.",
    impact: "The team has a single view for reviewing operational data and preparing weekly evaluations.",
  },
  "karyalo-storefront-saas": {
    title: "KaryaLo Online Store Platform",
    categoryLabel: "Retail & e-commerce",
    serviceTags: ["Online store", "UI/UX design"],
    client: internalClientEn,
    tags: ["Next.js 15", "Tailwind CSS", "Short checkout flow"],
    summary: "An online store prototype with structured navigation, streamlined checkout, and performance optimisation to support the shopping experience.",
    seoDescription: "KaryaLo's online store prototype with structured navigation, streamlined checkout, and a saved cart. Internal retail research, 2026.",
    challenge: "Complex navigation and slow-loading pages can make it harder for customers to find products and complete purchases.",
    solution: "We designed the workflow around the customer, optimised page loading, simplified checkout, and provided a saved shopping cart.",
    impact: "The modular structure provides a foundation that can be adapted for future online stores.",
  },
  "karyalo-topup-engine": {
    title: "KaryaLo Digital Voucher & Top-Up System",
    categoryLabel: "Digital products & payments",
    serviceTags: ["Transaction system", "Web application"],
    client: internalClientEn,
    tags: ["Next.js", "Payment integration", "Automated queue"],
    summary: "A transaction system prototype connecting order intake, payment verification, and digital product delivery through an automated workflow.",
    seoDescription: "KaryaLo's voucher and top-up prototype with transaction queues, payment verification, and automated delivery. Internal research, 2026.",
    challenge: "Concurrent transactions and delayed payment notifications require queue management so each order can be processed appropriately.",
    solution: "We designed independent processing for each order, with automated payment verification and buyer notifications. This approach supports structured transaction management.",
    impact: "The prototype connects order queues, payment verification, and notifications within one processing workflow.",
  },
};

export const portfolioData: Localized<ProjectItem[]> = {
  id: portfolioId,
  en: portfolioId.map((project) => ({ ...project, ...portfolioEn[project.id] })),
};

export function getPortfolio(lang: Locale) {
  return portfolioData[lang];
}

/** The language-neutral slugs, for static params and the sitemap. */
export const portfolioSlugs = portfolioId.map((project) => project.slug);
