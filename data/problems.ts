import type { Locale, Localized } from "@/lib/i18n";

/**
 * The home page's way in for visitors who know their problem but not our service names.
 * Each entry pairs a situation in the client's own words with what we build for it and the
 * field that handles it. When a case study shows it, the card links there; otherwise it opens
 * WhatsApp with the situation already written. Claims stay within what data/portfolio.ts and
 * data/services.ts already state.
 */
export interface ProblemItem {
  id: string;
  /** Pillar id from data/services.ts: drives the field label. */
  pillarId: "digital-engineering" | "creative-design" | "iot-hardware";
  problem: string;
  solution: string;
  /** Case study under /portfolio/[slug], when one exists. */
  proof?: { slug: string; label: string };
  /** Opening of the WhatsApp message used when there is no case study to show. */
  whatsappMessage: string;
}

export const problemsData: Localized<ProblemItem[]> = {
  id: [
    {
      id: "stok-tidak-cocok",
      pillarId: "digital-engineering",
      problem: "Data pesanan online dan stok gudang sering tidak sesuai.",
      solution: "Integrasi toko online dan sistem gudang, sehingga setiap pesanan otomatis memperbarui data stok.",
      proof: { slug: "alina-omnichannel-retail", label: "Lihat studi kasus Alina" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai integrasi pesanan online dan persediaan gudang.",
    },
    {
      id: "website-belum-meyakinkan",
      pillarId: "digital-engineering",
      problem: "Website belum mampu meyakinkan calon klien untuk menghubungi Anda.",
      solution: "Website perusahaan dengan informasi yang jelas, tampilan profesional, akses cepat, dan mudah ditemukan di Google.",
      proof: { slug: "hij-corporate-profile", label: "Lihat studi kasus HIJ" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin memperbarui website agar layanan dan kapabilitas perusahaan tersampaikan dengan lebih jelas.",
    },
    {
      id: "laporan-manual",
      pillarId: "digital-engineering",
      problem: "Waktu tim tersita untuk merekap laporan secara manual setiap minggu.",
      solution: "Dashboard yang menyatukan data dari sistem Anda dalam satu layar, sehingga laporan tersedia tanpa rekap ulang.",
      proof: { slug: "karyalo-executive-analytics", label: "Lihat demo dashboard kami" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin mendiskusikan dashboard untuk menyederhanakan pelaporan yang saat ini masih dilakukan secara manual.",
    },
    {
      id: "catatan-lapangan",
      pillarId: "digital-engineering",
      problem: "Laporan tim lapangan tersebar di kertas dan grup percakapan.",
      solution: "Aplikasi Android dan iOS untuk pencatatan pekerjaan, kunjungan, dan stok yang terhubung langsung dengan sistem kantor.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin mendiskusikan aplikasi pencatatan aktivitas untuk tim lapangan.",
    },
    {
      id: "alat-tidak-terpantau",
      pillarId: "iot-hardware",
      problem: "Gangguan pada mesin, ruangan, atau kendaraan baru terdeteksi saat sudah terlambat.",
      solution: "Sensor yang mengirim data ke dashboard dan memberikan notifikasi WhatsApp segera setelah kondisi melewati batas.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin memantau kondisi mesin, ruangan, atau kendaraan dari jarak jauh.",
    },
    {
      id: "aplikasi-membingungkan",
      pillarId: "creative-design",
      problem: "Aplikasi sudah tersedia, namun jarang digunakan karena alurnya sulit dipahami.",
      solution: "Penyederhanaan alur dan tampilan, dicoba dulu lewat demo Figma sebelum diterapkan pada aplikasi.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin menyempurnakan alur dan tampilan aplikasi agar lebih mudah digunakan oleh tim.",
    },
  ],
  en: [
    {
      id: "stok-tidak-cocok",
      pillarId: "digital-engineering",
      problem: "Online order data and warehouse stock frequently don't match.",
      solution: "Online store and warehouse integration, so every order updates stock data automatically.",
      proof: { slug: "alina-omnichannel-retail", label: "See the Alina case study" },
      whatsappMessage: "Hello KaryaLo team, we would like to discuss integrating our online orders and warehouse inventory.",
    },
    {
      id: "website-belum-meyakinkan",
      pillarId: "digital-engineering",
      problem: "Your website is not convincing prospects to get in touch.",
      solution: "A company website with clear information, a professional look, fast loading, and strong visibility on Google.",
      proof: { slug: "hij-corporate-profile", label: "See the HIJ case study" },
      whatsappMessage: "Hello KaryaLo team, we would like to update our website to communicate our company's services and capabilities more clearly.",
    },
    {
      id: "laporan-manual",
      pillarId: "digital-engineering",
      problem: "Your team spends hours every week compiling reports manually.",
      solution: "A dashboard that unifies data from your systems on one screen, so reports are ready without re-keying.",
      proof: { slug: "karyalo-executive-analytics", label: "See our dashboard demo" },
      whatsappMessage: "Hello KaryaLo team, we would like to discuss a dashboard to simplify our current manual reporting process.",
    },
    {
      id: "catatan-lapangan",
      pillarId: "digital-engineering",
      problem: "Field team reports are scattered across paper forms and chat groups.",
      solution: "Android and iOS apps for recording jobs, visits, and stock, connected directly to your office systems.",
      whatsappMessage: "Hello KaryaLo team, we would like to discuss an application for recording field team activities.",
    },
    {
      id: "alat-tidak-terpantau",
      pillarId: "iot-hardware",
      problem: "Issues with machines, rooms, or vehicles are only detected when it is too late.",
      solution: "Sensors that feed a dashboard and send WhatsApp alerts as soon as conditions cross a threshold.",
      whatsappMessage: "Hello KaryaLo team, we'd like to monitor our machines, rooms, or vehicles remotely.",
    },
    {
      id: "aplikasi-membingungkan",
      pillarId: "creative-design",
      problem: "Your application exists, but is rarely used because its workflow is hard to follow.",
      solution: "Simplified workflows and screens, tried out first as a clickable Figma demo before they go into the app.",
      whatsappMessage: "Hello KaryaLo team, we would like to improve our application's workflows and screens so it is easier for our team to use.",
    },
  ],
};

export function getProblems(lang: Locale) {
  return problemsData[lang];
}
