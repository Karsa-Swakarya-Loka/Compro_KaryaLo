import type { Locale, Localized } from "@/lib/i18n";
import type { ServicePillar } from "@/data/services";

/**
 * The /industry page: what we can build for a given kind of business.
 *
 * Each entry is a worked example, not a track record. `proof` only names
 * projects that exist in data/portfolio.ts, so an industry with no published
 * project simply shows none — the page says so rather than implying
 * experience we cannot show. That is also how IoT appears here without a
 * portfolio entry: as what we build, with a prototype as the way in.
 */
export interface IndustryItem {
  id: "retail" | "distribution" | "manufacturing" | "corporate" | "digital-products" | "property";
  name: string;
  /** The situation, in the words a business owner in this field would use. */
  problem: string;
  /** What we would build for it. */
  build: string[];
  /** The fields from data/services.ts that do the work. */
  pillars: ServicePillar["id"][];
  /** Published case studies or prototypes under /portfolio/[slug]. */
  proof: string[];
  /** A ready-made platform on /products that fits, when there is one. */
  productId?: string;
}

export const industriesData: Localized<IndustryItem[]> = {
  id: [
    {
      id: "retail",
      name: "Ritel & E-commerce",
      problem: "Data persediaan di toko online, kasir, dan gudang belum terhubung, sementara laporan penjualan harus direkap dari beberapa sumber.",
      build: ["Toko online yang tersambung ke gudang", "Kasir dan pencatatan stok", "Dashboard penjualan harian"],
      pillars: ["digital-engineering", "creative-design"],
      proof: ["alina-omnichannel-retail", "karyalo-saas-storefront"],
      productId: "karyalo-store",
    },
    {
      id: "corporate",
      name: "Perusahaan Jasa & Korporat",
      problem: "Website belum menyampaikan kapabilitas perusahaan dengan jelas, dan proses persetujuan dokumen internal masih bergantung pada percakapan grup.",
      build: ["Website perusahaan & company profile", "Alur persetujuan dokumen digital", "Identitas merek & materi penawaran"],
      pillars: ["digital-engineering", "creative-design"],
      proof: ["hij-corporate-profile", "karyalo-executive-analytics"],
    },
    {
      id: "digital-products",
      name: "Produk Digital & Pembayaran",
      problem: "Volume transaksi meningkat, sementara verifikasi pembayaran manual memperlambat pemrosesan dan menyulitkan pemantauan status pesanan.",
      build: ["Sistem transaksi yang berjalan otomatis", "Integrasi pembayaran QRIS, VA & e-wallet", "Laporan penjualan & margin harian"],
      pillars: ["digital-engineering"],
      proof: ["deliastore-topup", "karyalo-digital-topup"],
      productId: "karyalo-topup",
    },
    {
      id: "distribution",
      name: "Distribusi & Logistik",
      problem: "Posisi armada dan aktivitas tim lapangan sulit dipantau secara terpusat. Catatan pengiriman masih tersebar di formulir kertas dan percakapan.",
      build: ["Aplikasi tim lapangan & bukti pengiriman", "Pencatatan stok gudang", "GPS tracker armada dengan dashboard"],
      pillars: ["digital-engineering", "iot-hardware"],
      proof: [],
    },
    {
      id: "manufacturing",
      name: "Manufaktur & Bengkel Produksi",
      problem: "Pemantauan kondisi mesin, suhu ruang produksi, dan penggunaan listrik masih dilakukan secara manual sehingga perubahan kondisi sulit diketahui lebih awal.",
      build: ["Sensor suhu, kelembapan & getaran mesin", "Dashboard pemantauan produksi", "Peringatan otomatis ke WhatsApp"],
      pillars: ["iot-hardware", "digital-engineering"],
      proof: [],
    },
    {
      id: "property",
      name: "Properti & Pengelolaan Gedung",
      problem: "Pemantauan tangki air, penggunaan listrik, dan kondisi ruangan belum terpusat, sementara keluhan penghuni dicatat melalui beberapa kanal.",
      build: ["Sensor level air, listrik & suhu ruang", "Dashboard kondisi gedung", "Aplikasi laporan keluhan penghuni"],
      pillars: ["iot-hardware", "digital-engineering"],
      proof: [],
    },
  ],
  en: [
    {
      id: "retail",
      name: "Retail & E-commerce",
      problem: "Inventory data across the online store, point of sale, and warehouse is disconnected, while sales reports must be compiled from multiple sources.",
      build: ["An online store connected to the warehouse", "Point of sale and stock records", "A daily sales dashboard"],
      pillars: ["digital-engineering", "creative-design"],
      proof: ["alina-omnichannel-retail", "karyalo-saas-storefront"],
      productId: "karyalo-store",
    },
    {
      id: "corporate",
      name: "Professional & Corporate Services",
      problem: "The website does not clearly communicate the company's capabilities, and internal document approvals still depend on group conversations.",
      build: ["Company website & company profile", "A digital document approval flow", "Brand identity & proposal materials"],
      pillars: ["digital-engineering", "creative-design"],
      proof: ["hij-corporate-profile", "karyalo-executive-analytics"],
    },
    {
      id: "digital-products",
      name: "Digital Products & Payments",
      problem: "Transaction volumes are growing, while manual payment checks slow processing and make order status harder to track.",
      build: ["Automated transaction processing", "QRIS, virtual account & e-wallet payments", "Daily sales & margin reports"],
      pillars: ["digital-engineering"],
      proof: ["deliastore-topup", "karyalo-digital-topup"],
      productId: "karyalo-topup",
    },
    {
      id: "distribution",
      name: "Distribution & Logistics",
      problem: "Fleet locations and field activities are difficult to monitor centrally. Delivery records remain scattered across paper forms and conversations.",
      build: ["A field team app with proof of delivery", "Warehouse stock records", "Fleet GPS trackers with a dashboard"],
      pillars: ["digital-engineering", "iot-hardware"],
      proof: [],
    },
    {
      id: "manufacturing",
      name: "Manufacturing & Workshops",
      problem: "Manual checks of equipment, production temperatures, and power consumption make changing conditions difficult to identify early.",
      build: ["Temperature, humidity & vibration sensors", "A production monitoring dashboard", "Automatic WhatsApp alerts"],
      pillars: ["iot-hardware", "digital-engineering"],
      proof: [],
    },
    {
      id: "property",
      name: "Property & Building Management",
      problem: "Water tank levels, energy use, and room conditions lack central monitoring, while tenant issues are recorded across multiple channels.",
      build: ["Water level, power & room temperature sensors", "A building condition dashboard", "A tenant issue-reporting app"],
      pillars: ["iot-hardware", "digital-engineering"],
      proof: [],
    },
  ],
};

export function getIndustries(lang: Locale) {
  return industriesData[lang];
}
