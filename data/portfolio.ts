export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  type: "client" | "prototype";
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
  coverImage: string;
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
export const portfolioUpdatedAt = "2026-09-10";

export const portfolioData: ProjectItem[] = [
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
    coverImage: "/images/portofolio/alina-store.webp",
    galleryImages: [
      "/images/portofolio/alina-store.webp",
      "/images/portofolio/alina-oms.webp",
      "/images/portofolio/alina-admin.webp"
    ],
    tags: ["Next.js 15", "Tailwind CSS", "PostgreSQL", "Cloudflare CDN", "Sistem gudang"],
    summary: "Toko online yang tersambung langsung ke sistem gudang, jadi pesanan pembeli dan stok fisik selalu bicara angka yang sama.",
    seoDescription: "Toko online Alina yang tersambung langsung ke sistem gudang, jadi pesanan pembeli dan stok fisik selalu cocok. Studi kasus KaryaLo, dikerjakan 2025.",
    challenge: "Pesanan online dan stok di gudang sering tidak cocok. Akibatnya ada pesanan yang terlanjur masuk padahal barangnya habis, lalu berujung pembatalan dan pengiriman yang molor.",
    solution: "Kami bangun dua sisi sekaligus: etalase belanja yang ringan dibuka pembeli, dan panel pengelolaan pesanan yang mengikuti perjalanan setiap order dari checkout sampai diserahkan ke kurir.",
    impact: "Waktu pemrosesan pesanan turun sekitar 40% dan selisih stok gudang jadi jarang terjadi."
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
    coverImage: "/images/portofolio/hij-compro.webp",
    galleryImages: [
      "/images/portofolio/hij-compro.webp"
    ],
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Optimasi SEO"],
    summary: "Website profil perusahaan yang ringan dibuka dan enak dibaca, dibuat untuk meyakinkan calon mitra bisnis sejak halaman pertama.",
    seoDescription: "Website profil PT HIJ yang ringan dibuka dan enak dibaca, dibuat untuk meyakinkan calon mitra sejak halaman pertama. Studi kasus KaryaLo, 2025.",
    challenge: "HIJ butuh wajah digital yang terlihat serius dan terkini, tapi tetap cepat dibuka saat dilihat calon rekanan lewat ponsel.",
    solution: "Kami rapikan struktur halamannya, tambahkan animasi seperlunya, dan pangkas semua yang membuat halaman berat sehingga terbuka nyaris seketika.",
    impact: "Pengunjung bertahan lebih lama di halaman profil, dan tim HIJ punya materi digital yang bisa dikirim ke calon mitra."
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
    coverImage: "/images/prototype/karyalo-admin.webp",
    galleryImages: [
      "/images/prototype/karyalo-admin.webp"
    ],
    tags: ["Next.js", "Bisa dipasang seperti aplikasi", "Chart.js"],
    summary: "Satu tempat untuk melihat angka operasional dan status proyek, sama nyamannya dibuka di monitor lebar maupun di ponsel.",
    seoDescription: "Dashboard internal KaryaLo untuk memantau angka operasional dan status proyek, sama nyamannya dibuka di monitor lebar maupun ponsel. Purwarupa 2026.",
    challenge: "Angka operasional kami tersebar di beberapa file dan alat berbeda, jadi menyiapkan bahan rapat mingguan selalu makan waktu.",
    solution: "Kami satukan semuanya ke satu dashboard yang padat data tapi tetap enak dibaca, dan bisa dipasang di layar utama ponsel seperti aplikasi biasa.",
    impact: "Bahan evaluasi mingguan tim kami sekarang siap dalam hitungan menit."
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
    coverImage: "/images/prototype/karyalo-store.webp",
    galleryImages: [
      "/images/prototype/karyalo-store.webp"
    ],
    tags: ["Next.js 15", "Tailwind CSS", "Alur checkout singkat"],
    summary: "Fondasi toko online dengan alur belanja yang singkat, halaman yang cepat terbuka, dan tampilan yang tidak bikin bingung.",
    seoDescription: "Purwarupa toko online KaryaLo dengan alur belanja singkat, halaman yang cepat terbuka, dan tampilan yang tidak bikin bingung. Riset internal 2026.",
    challenge: "Banyak toko online berat dibuka dan navigasinya berputar-putar, sehingga calon pembeli menyerah sebelum sampai ke keranjang.",
    solution: "Kami rancang ulang alurnya dari sisi pembeli: halaman ringan, langkah checkout dipangkas, dan keranjang yang tidak pernah kehilangan isinya.",
    impact: "Struktur platformnya modular, jadi bisa disiapkan untuk klien ritel baru dalam hitungan hari."
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
    coverImage: "/images/prototype/karyalo-topup.webp",
    galleryImages: [
      "/images/prototype/karyalo-topup.webp"
    ],
    tags: ["Next.js", "Integrasi pembayaran", "Antrean otomatis"],
    summary: "Pesanan masuk, pembayaran terverifikasi, produk terkirim otomatis. Tanpa perlu ada orang yang menunggui layar.",
    seoDescription: "Purwarupa sistem voucher dan top-up KaryaLo: pesanan masuk, pembayaran terverifikasi, produk terkirim otomatis tanpa ditunggui. Riset internal 2026.",
    challenge: "Penjualan produk digital datang berbarengan dalam jumlah besar, dan satu notifikasi pembayaran yang telat saja sudah cukup membuat antrean tersendat.",
    solution: "Kami susun alur transaksinya supaya setiap pesanan diproses sendiri-sendiri, dengan verifikasi pembayaran otomatis dan notifikasi yang langsung sampai ke pembeli.",
    impact: "Antrean tetap lancar saat transaksi menumpuk, dan pesanan yang perlu ditangani manual jadi jauh berkurang."
  }
];
