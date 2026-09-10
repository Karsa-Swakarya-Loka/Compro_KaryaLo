export interface ProductItem {
  /** Doubles as the in-page anchor, so the id must stay URL-safe. */
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  /** Where the platform stands today. Shown as-is on the page. */
  status: string;
  summary: string;
  features: string[];
}

/**
 * The three ready-made platforms shown on /products.
 *
 * This used to live inside the client component, which meant the structured
 * data on the route had nothing to read from. Keeping it here lets the page
 * and its schema quote exactly the same words.
 */
export const productsData: ProductItem[] = [
  {
    id: "karyalo-bi",
    title: "KaryaLo Analytics",
    tagline: "Dashboard untuk memantau angka penting bisnis secara langsung",
    category: "Dashboard & Laporan",
    image: "/images/prototype/karyalo-admin.webp",
    status: "Uji coba terbatas",
    summary:
      "Satu tempat untuk melihat performa operasional perusahaan. Tampilannya padat data tapi tetap enak dibaca, dan bisa dipasang di layar utama ponsel seperti aplikasi biasa.",
    features: [
      "Angka penting dan laporan otomatis, diperbarui langsung",
      "Hak akses berbeda untuk tiap peran di tim",
      "Bisa dipasang seperti aplikasi di ponsel maupun desktop",
      "Ekspor data ke PDF/Excel dan sambungan ke sistem lain",
    ],
  },
  {
    id: "karyalo-store",
    title: "KaryaLo Storefront",
    tagline: "Toko online yang ringan dibuka dan enak dipakai belanja",
    category: "Toko Online",
    image: "/images/prototype/karyalo-store.webp",
    status: "Siap dipasang",
    summary:
      "Etalase belanja modern yang dirancang supaya pengunjung tidak kabur duluan: halaman terbuka cepat, langkah checkout singkat, dan keranjang yang tidak pernah kehilangan isinya.",
    features: [
      "Halaman terbuka dalam hitungan detik",
      "Alur checkout singkat supaya keranjang tidak ditinggal",
      "Pembayaran QRIS, transfer VA, dan e-wallet",
      "Panel pengelolaan produk, diskon, dan stok",
    ],
  },
  {
    id: "karyalo-topup",
    title: "KaryaLo Voucher & Top-Up",
    tagline: "Penjualan pulsa, voucher, dan produk digital yang berjalan otomatis",
    category: "Transaksi Digital",
    image: "/images/prototype/karyalo-topup.webp",
    status: "Siap dipasang",
    summary:
      "Pesanan masuk, pembayaran terverifikasi, produk terkirim otomatis. Tetap lancar meski transaksi datang berbarengan dalam jumlah besar.",
    features: [
      "Antrean transaksi tetap lancar saat ramai",
      "Pembayaran terverifikasi otomatis",
      "Sambungan ke banyak pemasok produk digital",
      "Laporan penjualan dan margin harian",
    ],
  },
];
