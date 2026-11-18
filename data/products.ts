import type { Locale, Localized } from "@/lib/i18n";

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
const productsId: ProductItem[] = [
  {
    id: "karyalo-bi",
    title: "KaryaLo Analytics",
    tagline: "Pantau kinerja bisnis melalui satu dashboard",
    category: "Dashboard & Laporan",
    image: "/images/prototype/karyalo-admin.webp",
    status: "Uji coba terbatas",
    summary:
      "Satukan indikator operasional dan laporan perusahaan dalam tampilan yang terstruktur. Dashboard dapat diakses melalui desktop atau dipasang di layar utama ponsel untuk memudahkan pemantauan.",
    features: [
      "Indikator kinerja dan pembaruan laporan otomatis",
      "Pengaturan akses berdasarkan peran pengguna",
      "Pemasangan sebagai aplikasi di ponsel atau desktop",
      "Ekspor PDF/Excel dan terhubung ke sistem lain",
    ],
  },
  {
    id: "karyalo-store",
    title: "KaryaLo Storefront",
    tagline: "Pengalaman belanja yang praktis untuk pelanggan Anda",
    category: "Toko Online",
    image: "/images/prototype/karyalo-store.webp",
    status: "Siap dipasang",
    summary:
      "Platform toko online dengan katalog yang mudah dijelajahi, proses bayar yang ringkas, dan keranjang belanja tersimpan. Panel admin membantu tim Anda mengelola produk, promosi, dan persediaan.",
    features: [
      "Halaman yang dioptimalkan untuk kecepatan akses",
      "Proses bayar yang ringkas dan keranjang tersimpan",
      "Pembayaran QRIS, transfer VA, dan e-wallet",
      "Panel pengelolaan produk, diskon, dan stok",
    ],
  },
  {
    id: "karyalo-topup",
    title: "KaryaLo Voucher & Top-Up",
    tagline: "Otomatisasi penjualan pulsa, voucher, dan produk digital",
    category: "Transaksi Digital",
    image: "/images/prototype/karyalo-topup.webp",
    status: "Siap dipasang",
    summary:
      "Kelola pesanan, verifikasi pembayaran, dan pengiriman produk digital melalui satu alur otomatis. Integrasi pemasok dan laporan harian membantu tim memantau transaksi serta margin penjualan.",
    features: [
      "Pengelolaan antrean transaksi otomatis",
      "Pembayaran terverifikasi otomatis",
      "Integrasi dengan pemasok produk digital",
      "Laporan penjualan dan margin harian",
    ],
  },
];

type ProductText = Pick<ProductItem, "title" | "tagline" | "category" | "status" | "summary" | "features">;

const productsEn: Record<string, ProductText> = {
  "karyalo-bi": {
    title: "KaryaLo Analytics",
    tagline: "Track business performance in one dashboard",
    category: "Dashboards & Reporting",
    status: "Limited trial",
    summary:
      "Bring operational indicators and company reports into a structured view. Access the dashboard on desktop or add it to your phone's home screen for convenient monitoring.",
    features: [
      "Performance indicators and automated report updates",
      "Role-based access controls",
      "Installable on mobile and desktop",
      "PDF/Excel exports and system integrations",
    ],
  },
  "karyalo-store": {
    title: "KaryaLo Storefront",
    tagline: "A straightforward shopping experience for your customers",
    category: "Online Store",
    status: "Ready to use",
    summary:
      "An online store platform with an accessible catalogue, a quick payment flow, and a saved shopping cart. The admin panel helps your team manage products, promotions, and inventory.",
    features: [
      "Pages optimised for loading performance",
      "Quick payment flow with a saved cart",
      "QRIS, virtual account, and e-wallet payments",
      "A panel for managing products, discounts, and stock",
    ],
  },
  "karyalo-topup": {
    title: "KaryaLo Voucher & Top-Up",
    tagline: "Automate mobile credit, voucher, and digital product sales",
    category: "Digital Transactions",
    status: "Ready to use",
    summary:
      "Manage orders, payment verification, and digital product delivery through one automated workflow. Supplier integrations and daily reporting help your team track transactions and sales margins.",
    features: [
      "Automated transaction queue management",
      "Payments verified automatically",
      "Digital product supplier integrations",
      "Daily sales and margin reports",
    ],
  },
};

export const productsData: Localized<ProductItem[]> = {
  id: productsId,
  en: productsId.map((product) => ({ ...product, ...productsEn[product.id] })),
};

export function getProducts(lang: Locale) {
  return productsData[lang];
}
