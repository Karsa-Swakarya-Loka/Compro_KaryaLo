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
  /** The live site, for public work. Shown in the hero's browser address bar. */
  liveUrl?: string;
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
export const portfolioUpdatedAt = "2026-11-19";

/** Indonesian is the source; the English overlay below only replaces wording. */
const portfolioId: ProjectItem[] = [
  {
    id: "alina-omnichannel",
    slug: "alina-omnichannel-retail",
    title: "Toko Online & Sistem Pengelolaan Pesanan Alina",
    type: "client",
    categoryLabel: "Ritel & e-commerce",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Aplikasi web", "Sistem internal", "Desain tampilan aplikasi"],
    client: "Alina Fashion & Retail",
    year: "2025",
    coverImage: "/images/portofolio/mockup/alina.webp",
    galleryImages: [
      "/images/portofolio/alina-store.webp",
      "/images/portofolio/alina-oms.webp",
      "/images/portofolio/alina-admin.webp"
    ],
    tags: ["Next.js 15", "Tailwind CSS", "PostgreSQL", "Cloudflare CDN", "Sistem gudang"],
    summary: "Toko online dan sistem pengelolaan pesanan yang terhubung dengan pencatatan stok gudang, sehingga pesanan pelanggan tercatat sesuai persediaan.",
    seoDescription: "Studi kasus Alina: integrasi toko online, pengelolaan pesanan, dan stok gudang. Dikembangkan KaryaLo pada 2025.",
    challenge: "Perbedaan data antara pesanan online dan persediaan gudang menyebabkan pesanan masuk untuk barang yang telah habis, pembatalan transaksi, dan keterlambatan pengiriman.",
    solution: "Kami membuat etalase belanja yang cepat dibuka dan panel pengelolaan pesanan yang terhubung dengan gudang. Tim dapat mengikuti status pesanan dari pembayaran hingga penyerahan kepada kurir.",
    impact: "Waktu pemrosesan pesanan berkurang sekitar 40%, dan selisih pencatatan stok gudang ikut berkurang."
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
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Mudah ditemukan di Google"],
    summary: "Website profil perusahaan yang menjelaskan kapabilitas HIJ dengan susunan informasi yang rapi dan tetap nyaman dibuka di ponsel maupun komputer.",
    seoDescription: "Studi kasus website korporat HIJ: profil perusahaan, tampilan yang menyesuaikan layar, dan optimasi kecepatan akses. Dikembangkan KaryaLo pada 2025.",
    challenge: "HIJ membutuhkan website yang tampil profesional dan memudahkan calon mitra mempelajari layanannya, termasuk melalui ponsel.",
    solution: "Kami menyusun struktur informasi, menyeragamkan tampilan visual, dan mempercepat pemuatan halaman. Animasi dipakai secukupnya, hanya untuk membantu pembaca mengikuti isi.",
    impact: "Tim HIJ memiliki profil digital yang dapat dibagikan kepada calon mitra sebagai referensi layanan dan kapabilitas perusahaan."
  },
  {
    id: "hij-garment-erp",
    slug: "hij-garment-erp",
    title: "Sistem Manajemen Konveksi HIJ",
    type: "client",
    categoryLabel: "Manufaktur & konveksi",
    serviceCode: "DEV-ENT // DSG-UI",
    serviceTags: ["Sistem internal", "Aplikasi web"],
    client: "PT HIJ",
    year: "2026",
    coverImage: "/images/portofolio/mockup/hij-erp.webp",
    galleryImages: [
      "/images/portofolio/hij-erp.webp",
      "/images/portofolio/hij-erp-pesanan.webp",
      "/images/portofolio/hij-erp-spk.webp",
      "/images/portofolio/hij-erp-keuangan.webp",
      "/images/portofolio/hij-erp-portal.webp"
    ],
    tags: ["Aplikasi web", "Scan QR", "Portal pelanggan"],
    summary: "Sistem manajemen perusahaan (ERP) berbasis web yang menghubungkan pesanan, surat perintah kerja, tahapan produksi, logistik, dan keuangan, dilengkapi pemindaian QR serta portal pelanggan.",
    seoDescription: "ERP konveksi HIJ: pesanan, SPK, progres produksi per tahap, logistik, dan keuangan dalam satu sistem, dengan scan QR. Studi kasus KaryaLo, 2026.",
    challenge: "Operasional konveksi membutuhkan pencatatan yang terhubung dari penerimaan pesanan dan penerbitan surat perintah kerja hingga produksi, pengiriman, serta pelaporan keuangan.",
    solution: "Kami mengembangkan sistem dengan bagian penjualan, perencanaan, produksi, logistik, dan keuangan. Dashboard menampilkan ringkasan 7, 30, atau 90 hari. Sistem ini juga memiliki pemindaian QR, pelacakan tahapan produksi, panduan penggunaan, dan portal pelanggan."
  },
  {
    id: "apegale-corporate-web",
    slug: "apegale-company-profile",
    title: "Website Perusahaan PT Ape Gale Indonesia",
    type: "client",
    categoryLabel: "Jasa ekspatriat & perizinan",
    serviceCode: "DEV-WEB // DSG-UI",
    serviceTags: ["Website perusahaan", "Desain tampilan aplikasi"],
    client: "PT Ape Gale Indonesia",
    year: "2026",
    liveUrl: "https://apegale.com",
    coverImage: "/images/portofolio/mockup/apegale.webp",
    galleryImages: [
      "/images/portofolio/apegale-compro-v2.webp",
      "/images/portofolio/apegale-layanan-v2.webp"
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
    serviceTags: ["Website perusahaan", "Desain tampilan aplikasi"],
    client: "Affirmate Administrative",
    year: "2026",
    liveUrl: "https://tatakelola.affirmate.co.id",
    coverImage: "/images/portofolio/mockup/affirmate.webp",
    galleryImages: [
      "/images/portofolio/affirmate-compro-v2.webp",
      "/images/portofolio/affirmate-services-v2.webp",
      "/images/portofolio/affirmate-network-v2.webp"
    ],
    tags: ["Next.js", "Payload CMS", "Dua bahasa (EN/ID)"],
    summary: "Website dua bahasa untuk layanan korporat dan administrasi Affirmate Group, mencakup pendirian usaha, perizinan, visa, izin kerja, serta pengelolaan SDM dan penggajian.",
    seoDescription: "Website Affirmate Administrative: layanan korporat, perizinan, visa, dan HR di Indonesia dalam dua bahasa. Studi kasus KaryaLo, 2026.",
    challenge: "Affirmate Administrative memerlukan identitas digital yang jelas sebagai bagian dari Affirmate Group, sekaligus menjelaskan cakupan layanannya kepada perusahaan dan ekspatriat yang beroperasi di Indonesia.",
    solution: "Kami mengembangkan website berbahasa Inggris dan Indonesia dengan alur informasi yang menghubungkan profil, layanan, keunggulan, dan hubungan dengan grup. Website juga memuat riwayat perusahaan, peta jaringan kota, lokasi kantor, dan formulir kontak untuk calon klien."
  },
  {
    id: "deliastore",
    slug: "deliastore-topup",
    title: "DeliaStore: Toko Top Up Game & Produk Digital",
    type: "product",
    categoryLabel: "Produk digital & pembayaran",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Aplikasi web", "Sistem transaksi", "Desain tampilan aplikasi"],
    client: "DeliaStore, unit usaha PT Karsa Swakarya Loka",
    year: "2026",
    liveUrl: "https://deliastore.id",
    coverImage: "/images/portofolio/mockup/deliastore.webp",
    galleryImages: [
      "/images/portofolio/deliastore-v2.webp",
      "/images/portofolio/deliastore-topup-v2.webp"
    ],
    tags: ["Next.js 16", "PostgreSQL", "DOKU Checkout", "Digiflazz", "PWA"],
    summary: "Produk KaryaLo untuk penjualan top-up game, pulsa, paket data, token PLN, dan e-money, dengan pembayaran DOKU, pengiriman otomatis, promosi, dan program poin pelanggan.",
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
    summary: "Demo dashboard yang menyatukan indikator operasional dan status proyek dalam tampilan yang pas di komputer maupun ponsel.",
    seoDescription: "Demo dashboard internal KaryaLo untuk indikator operasional dan status proyek, dengan tampilan yang pas di komputer maupun ponsel. Riset 2026.",
    challenge: "Data operasional tersebar di beberapa file dan aplikasi, sehingga tim perlu menggabungkan informasi secara manual sebelum evaluasi mingguan.",
    solution: "Kami menyatukan data dalam dashboard dengan hierarki informasi yang jelas. Tampilan menyesuaikan ukuran layar dan dapat dipasang di layar utama ponsel.",
    impact: "Tim memiliki satu tampilan untuk meninjau data operasional dan menyiapkan evaluasi mingguan."
  },
  {
    id: "karyalo-storefront-saas",
    slug: "karyalo-saas-storefront",
    title: "KaryaLo Store: Toko Fashion dengan Rak Interaktif",
    type: "prototype",
    categoryLabel: "Ritel & e-commerce",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Toko online", "Sistem internal", "Desain tampilan aplikasi"],
    client: "PT Karsa Swakarya Loka (riset internal)",
    year: "2026",
    liveUrl: "https://karyalo-store.vercel.app",
    coverImage: "/images/portofolio/mockup/karyalo-store-3d.webp",
    galleryImages: [
      "/images/portofolio/karyalo-store-home.webp",
      "/images/portofolio/karyalo-store-product.webp",
      "/images/portofolio/karyalo-store-lookbook.webp",
      "/images/portofolio/karyalo-store-manage.webp",
      "/images/portofolio/karyalo-store-manage-products.webp"
    ],
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "Convex", "PWA"],
    summary: "Demo toko fashion dengan rak gantung interaktif di halaman depan, lookbook yang bisa dibeli satu set, dan panel pengelolaan yang mengubah harga serta stok di toko secara langsung.",
    seoDescription: "KaryaLo Store, demo toko fashion dengan rak gantung interaktif, lookbook siap beli, dan panel admin yang tersinkron ke toko. Riset internal KaryaLo, 2026.",
    challenge: "Toko fashion online sering terasa seperti daftar foto produk: pembeli sulit membayangkan potongan baju dan memadukan satu tampilan, sementara harga promo dan stok di toko perlu diubah tanpa menunggu tim teknis.",
    solution: "Kami membuat halaman depan berupa rak gantung: pakaian bisa diputar, digeser, dan diangkat untuk dilihat lebih dekat, lengkap dengan label harga normal yang dicoret di samping harga sale. Lookbook menampilkan model dengan detail tiap potong dan tombol untuk membeli satu set lengkap. Panel pengelolaan terpisah dilindungi login, dan perubahan produk, harga, serta stok tersimpan di database cloud lalu tampil di toko dalam hitungan detik. Toko bisa dipasang di HP sebagai aplikasi. Ini proyek demo: pesanan, pelanggan, dan pembayaran di panel masih memakai data contoh.",
    impact: "Katalog 34 produk berjalan online, dan harga atau stok yang diubah di panel langsung terlihat di toko tanpa perlu rilis ulang."
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
    summary: "Demo sistem transaksi yang menghubungkan penerimaan pesanan, verifikasi pembayaran, dan pengiriman produk digital secara otomatis.",
    seoDescription: "Demo voucher dan top-up KaryaLo dengan antrean transaksi, verifikasi pembayaran, dan pengiriman otomatis. Riset internal 2026.",
    challenge: "Pesanan bisa masuk bersamaan dan notifikasi pembayaran bisa terlambat, sehingga sistem perlu antrean untuk memproses setiap pesanan dengan tepat.",
    solution: "Kami menyusun pemrosesan terpisah untuk setiap pesanan, dengan verifikasi pembayaran otomatis dan notifikasi kepada pembeli.",
    impact: "Dalam demo ini, antrean pesanan, verifikasi pembayaran, dan notifikasi berjalan dalam satu alur."
  },
  {
    id: "summarevent",
    slug: "summarevent-tiket-event",
    title: "Summarevent: Tiket Event dengan Pilih Kursi",
    type: "prototype",
    categoryLabel: "Tiket event & pemesanan kursi",
    serviceCode: "DEV-WEB // DEV-ENT // DSG-UI",
    serviceTags: ["Aplikasi web", "Sistem transaksi", "Desain tampilan aplikasi"],
    client: "Tim Summarevent, Bandung Build Challenge 2026",
    year: "2026",
    coverImage: "/images/portofolio/mockup/summarevent-laptop.webp",
    galleryImages: [
      "/images/portofolio/summarevent-alur.webp",
      "/images/portofolio/summarevent-arsitektur.webp"
    ],
    tags: ["React 19", "Vite", "Tailwind CSS", "Convex", "PWA", "WCAG 2.1 AA"],
    summary: "Demo tiket event untuk skenario event Summarecon Mall Bandung: pengunjung memilih kursi langsung dari denah, panitia mengelola event, petugas memindai tiket di pintu, dan semuanya berujung pada satu e-ticket QR.",
    seoDescription: "Summarevent, demo sistem tiket event dengan pilih kursi dari denah, e-ticket QR, dashboard panitia, dan scan petugas. Dibuat untuk Bandung Build Challenge 2026.",
    challenge: "Masuk ke satu event bisa lewat banyak jalan: tiket di platform luar, akses lewat belanja, daftar di desk, dan struk di aplikasi mal. Pengunjung tidak tahu kursi mana yang tersisa, panitia mencatat denah, kuota, dan pembayaran di tempat terpisah, dan petugas mengecek tiket satu per satu di pintu.",
    solution: "Kami menyatukannya di satu denah. Pengunjung memilih kursi sendiri, atau meminta dipilihkan kursi berdampingan. Kursi pesanan ditahan sekaligus dengan hitung mundur, dan satu kursi hanya bisa dimiliki satu pemesan: yang kalah rebutan langsung ditawari kursi terdekat. Tiket bisa didapat lewat pembayaran, pendaftaran gratis, atau tukar struk belanja, dan hasilnya selalu satu e-ticket QR bertanda tangan untuk tiap kursi. Panitia memiliki dashboard, wizard pembuatan event, peta kursi langsung, verifikasi struk, dan unduhan data peserta. Petugas melihat hasil scan Valid, Sudah digunakan, atau Tidak valid dengan jelas dari jarak jauh. Seluruhnya berjalan sebagai aplikasi web yang bisa dipasang di HP tanpa unduhan toko aplikasi, dengan pemeriksaan aksesibilitas otomatis di tiga peran. Ini proyek demo untuk Bandung Build Challenge 2026 (tema Event Ticketing System): pembayaran, OTP, WhatsApp, dan email masih simulasi, sementara data kursi memakai backend bersama sehingga rebutan kursi bisa diuji dari dua HP."
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
    serviceTags: ["Web application", "Internal system", "App design"],
    client: "Alina Fashion & Retail",
    tags: ["Next.js 15", "Tailwind CSS", "PostgreSQL", "Cloudflare CDN", "Warehouse system"],
    summary: "An online store and order management system linked to the warehouse stock records, so customer orders are recorded against actual inventory.",
    seoDescription: "Alina case study: online store, order management, and warehouse inventory integration. Developed by KaryaLo in 2025.",
    challenge: "Differences between online order data and warehouse inventory led to orders for unavailable items, cancellations, and delivery delays.",
    solution: "We built a fast-loading storefront and an order management panel connected to the warehouse. The team can track each order from payment through to courier pickup.",
    impact: "Order processing time fell by about 40%, and warehouse stock discrepancies fell too.",
  },
  "hij-corporate-web": {
    title: "HIJ Corporate Website",
    categoryLabel: "Corporate profile",
    serviceTags: ["Company website", "Brand identity"],
    client: "PT HIJ",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Easy to find on Google"],
    summary: "A company profile website that sets out HIJ's capabilities in a clear structure and reads well on phones and desktops.",
    seoDescription: "HIJ corporate website case study: company information, a layout for every screen, and fast loading. Developed by KaryaLo in 2025.",
    challenge: "HIJ needed a website that looked professional and made it easy for prospective partners to learn about its services, including on a phone.",
    solution: "We structured the information, made the visuals consistent, and sped up page loading. Animation is used sparingly, only where it helps readers follow the content.",
    impact: "The HIJ team has a digital company profile to share with prospective partners as a reference for its services and capabilities.",
  },
  "hij-garment-erp": {
    title: "HIJ Garment Management System",
    categoryLabel: "Manufacturing & garments",
    serviceTags: ["Internal system", "Web application"],
    client: "PT HIJ",
    tags: ["Web application", "QR scanning", "Customer portal"],
    summary: "A web-based business management system (ERP) connecting orders, production work orders, manufacturing stages, logistics, and finance, with QR scanning and a customer portal.",
    seoDescription: "HIJ's garment ERP: orders, work orders, production progress by stage, logistics, and finance in one system, with QR scanning. A KaryaLo case study, 2026.",
    challenge: "Garment operations require connected records from order intake and production instructions through manufacturing, delivery, and financial reporting.",
    solution: "We developed a system with sales, planning, production, logistics, and finance sections. The dashboard shows 7, 30, or 90-day summaries. The system also has QR scanning, production stage tracking, user guidance, and a customer portal.",
  },
  "apegale-corporate-web": {
    title: "PT Ape Gale Indonesia Company Website",
    categoryLabel: "Expatriate & permit services",
    serviceTags: ["Company website", "App design"],
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
    serviceTags: ["Company website", "App design"],
    client: "Affirmate Administrative",
    tags: ["Next.js", "Payload CMS", "Bilingual (EN/ID)"],
    summary: "A bilingual website for Affirmate Group's corporate and administrative services, covering incorporation, licensing, visas, work permits, HR, and payroll.",
    seoDescription: "Affirmate Administrative's website: corporate, licensing, visa, and HR services in Indonesia, in two languages. A KaryaLo case study, 2026.",
    challenge: "Affirmate Administrative needed a distinct digital identity within Affirmate Group and a clear explanation of its services for companies and expatriates operating in Indonesia.",
    solution: "We developed an English and Indonesian website linking the company profile, services, strengths, and group relationship through a clear information structure. The site also has the company history, a city network map, office locations, and a contact form for prospective clients.",
  },
  "deliastore": {
    title: "DeliaStore: Game Top-Up & Digital Products Store",
    categoryLabel: "Digital products & payments",
    serviceTags: ["Web application", "Transaction system", "App design"],
    client: "DeliaStore, a PT Karsa Swakarya Loka business",
    tags: ["Next.js 16", "PostgreSQL", "DOKU Checkout", "Digiflazz", "PWA"],
    summary: "A KaryaLo product selling game top-ups, mobile credit, data packages, electricity tokens, and e-money, with DOKU payments, automated delivery, promotions, and customer rewards.",
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
    summary: "A dashboard demo bringing operational indicators and project status into one view that works on desktop and mobile.",
    seoDescription: "KaryaLo's internal dashboard demo for operational indicators and project status, with views for desktop and mobile. Internal research, 2026.",
    challenge: "Operational data was spread across multiple files and applications, requiring manual compilation before weekly reviews.",
    solution: "We brought the data into a dashboard with a clear information hierarchy. The screens adapt to any device and can be added to a phone's home screen.",
    impact: "The team has a single view for reviewing operational data and preparing weekly evaluations.",
  },
  "karyalo-storefront-saas": {
    title: "KaryaLo Store: Fashion Shop with an Interactive Rack",
    categoryLabel: "Retail & e-commerce",
    serviceTags: ["Online store", "Internal system", "App design"],
    client: internalClientEn,
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "Convex", "PWA"],
    summary: "A fashion store demo with an interactive clothing rack on the home page, a shoppable lookbook, and a management panel that updates prices and stock in the store directly.",
    seoDescription: "KaryaLo Store, a fashion shop demo with an interactive clothing rack, a shoppable lookbook, and an admin panel synced to the store. KaryaLo research, 2026.",
    challenge: "Online fashion stores often feel like a list of product photos: shoppers struggle to picture the cut of a garment or put a look together, and sale prices and stock need changing without waiting on a developer.",
    solution: "We made the home page a hanging rack: garments can be turned, slid along, and lifted for a closer look, with tags showing the normal price struck through beside the sale price. The lookbook shows models with details for every piece and a button to buy the full look. A separate management panel sits behind a login, and changes to products, prices, and stock are saved to a cloud database and appear in the store within seconds. The store installs on a phone as an app. This is a demo project: orders, customers, and payments in the panel still use sample data.",
    impact: "A 34-product catalogue runs online, and prices or stock changed in the panel show up in the store without a redeploy.",
  },
  "karyalo-topup-engine": {
    title: "KaryaLo Digital Voucher & Top-Up System",
    categoryLabel: "Digital products & payments",
    serviceTags: ["Transaction system", "Web application"],
    client: internalClientEn,
    tags: ["Next.js", "Payment integration", "Automated queue"],
    summary: "A transaction system demo connecting order intake, payment verification, and digital product delivery through an automated workflow.",
    seoDescription: "KaryaLo's voucher and top-up demo with transaction queues, payment verification, and automated delivery. Internal research, 2026.",
    challenge: "Orders can arrive at the same time and payment notifications can arrive late, so the system needs a queue to process each order correctly.",
    solution: "We set up separate processing for each order, with automated payment verification and buyer notifications.",
    impact: "In this demo, order queues, payment verification, and notifications run in one flow.",
  },
  "summarevent": {
    title: "Summarevent: Event Ticketing with Seat Selection",
    categoryLabel: "Event ticketing & seat booking",
    serviceTags: ["Web application", "Transaction system", "App design"],
    client: "Summarevent Team, Bandung Build Challenge 2026",
    tags: ["React 19", "Vite", "Tailwind CSS", "Convex", "PWA", "WCAG 2.1 AA"],
    summary: "An event ticketing demo for a Summarecon Mall Bandung event scenario: visitors choose seats straight from the seat map, organisers manage the event, gate staff scan tickets, and everything ends in one QR e-ticket.",
    seoDescription: "Summarevent, an event ticketing demo with seat selection from a live map, QR e-tickets, an organiser dashboard, and gate scanning. Built for Bandung Build Challenge 2026.",
    challenge: "Getting into one event can happen in many ways: tickets on outside platforms, access through shopping, sign-up at a desk, and receipts in the mall app. Visitors cannot tell which seats are left, organisers track the seat map, quotas, and payments in separate places, and gate staff check tickets one by one.",
    solution: "We brought it together on one seat map. Visitors pick their own seats, or ask for seats together to be chosen for them. All seats in an order are held at once with a countdown, and a seat can belong to only one buyer: whoever loses the race is offered the nearest seats straight away. Tickets can come from payment, free registration, or exchanging a shopping receipt, and the result is always one signed QR e-ticket per seat. Organisers get a dashboard, an event-creation wizard, a live seat map, receipt verification, and attendee downloads. Gate staff see Valid, Already used, or Invalid clearly from a distance. It all runs as a web app that installs on a phone without an app store, with automated accessibility checks across the three roles. This is a demo project for Bandung Build Challenge 2026 (theme: Event Ticketing System): payments, OTP, WhatsApp, and email are simulated, while seat data uses a shared backend so seat races can be tested from two phones."
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
