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
      problem: "Data pesanan online dan persediaan gudang belum selaras.",
      solution: "Integrasi toko online dan sistem gudang untuk menyelaraskan pencatatan pesanan serta persediaan.",
      proof: { slug: "alina-omnichannel-retail", label: "Lihat studi kasus Alina" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai integrasi pesanan online dan persediaan gudang.",
    },
    {
      id: "website-belum-meyakinkan",
      pillarId: "digital-engineering",
      problem: "Website belum mencerminkan kapabilitas dan profesionalisme perusahaan.",
      solution: "Website perusahaan dengan struktur informasi yang jelas, desain yang konsisten, serta optimasi kecepatan dan SEO.",
      proof: { slug: "hij-corporate-profile", label: "Lihat studi kasus HIJ" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin memperbarui website agar layanan dan kapabilitas perusahaan tersampaikan dengan lebih jelas.",
    },
    {
      id: "laporan-manual",
      pillarId: "digital-engineering",
      problem: "Penyusunan laporan mingguan masih bergantung pada rekap manual.",
      solution: "Dashboard yang menggabungkan data dari sistem Anda untuk menyederhanakan pemantauan dan pelaporan.",
      proof: { slug: "karyalo-executive-analytics", label: "Lihat purwarupa dashboard kami" },
      whatsappMessage: "Halo Tim KaryaLo, kami ingin mendiskusikan dashboard untuk menyederhanakan pelaporan yang saat ini masih dilakukan secara manual.",
    },
    {
      id: "catatan-lapangan",
      pillarId: "digital-engineering",
      problem: "Catatan pekerjaan tim lapangan tersebar di kertas dan percakapan.",
      solution: "Aplikasi Android dan iOS untuk pencatatan pekerjaan, kunjungan, dan stok yang terhubung dengan sistem kantor.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin mendiskusikan aplikasi pencatatan aktivitas untuk tim lapangan.",
    },
    {
      id: "alat-tidak-terpantau",
      pillarId: "iot-hardware",
      problem: "Kondisi mesin, ruangan, atau kendaraan belum terpantau secara terpusat.",
      solution: "Sensor yang mengirim data ke dashboard, dilengkapi notifikasi WhatsApp ketika kondisi melewati batas yang ditetapkan.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin memantau kondisi mesin, ruangan, atau kendaraan dari jarak jauh.",
    },
    {
      id: "aplikasi-membingungkan",
      pillarId: "creative-design",
      problem: "Alur aplikasi yang rumit menghambat penggunaan oleh tim.",
      solution: "Penyempurnaan alur dan antarmuka, divalidasi melalui purwarupa Figma sebelum diterapkan pada aplikasi.",
      whatsappMessage: "Halo Tim KaryaLo, kami ingin menyempurnakan alur dan antarmuka aplikasi agar lebih mudah digunakan oleh tim.",
    },
  ],
  en: [
    {
      id: "stok-tidak-cocok",
      pillarId: "digital-engineering",
      problem: "Online orders and warehouse inventory are out of sync.",
      solution: "Online store and warehouse integration to align order records and inventory data.",
      proof: { slug: "alina-omnichannel-retail", label: "See the Alina case study" },
      whatsappMessage: "Hello KaryaLo team, we would like to discuss integrating our online orders and warehouse inventory.",
    },
    {
      id: "website-belum-meyakinkan",
      pillarId: "digital-engineering",
      problem: "The website does not reflect the company's capabilities and professionalism.",
      solution: "A company website with clear information, consistent design, and performance and SEO optimisation.",
      proof: { slug: "hij-corporate-profile", label: "See the HIJ case study" },
      whatsappMessage: "Hello KaryaLo team, we would like to update our website to communicate our company's services and capabilities more clearly.",
    },
    {
      id: "laporan-manual",
      pillarId: "digital-engineering",
      problem: "Weekly reporting still relies on manual data compilation.",
      solution: "A dashboard that combines data from your systems to simplify monitoring and reporting.",
      proof: { slug: "karyalo-executive-analytics", label: "See our dashboard prototype" },
      whatsappMessage: "Hello KaryaLo team, we would like to discuss a dashboard to simplify our current manual reporting process.",
    },
    {
      id: "catatan-lapangan",
      pillarId: "digital-engineering",
      problem: "Field activity records are scattered across paper forms and conversations.",
      solution: "Android and iOS applications for recording jobs, visits, and inventory, connected to your office systems.",
      whatsappMessage: "Hello KaryaLo team, we would like to discuss an application for recording field team activities.",
    },
    {
      id: "alat-tidak-terpantau",
      pillarId: "iot-hardware",
      problem: "Equipment, room, or vehicle conditions lack central monitoring.",
      solution: "Sensors that send data to a dashboard, with WhatsApp alerts when conditions exceed defined thresholds.",
      whatsappMessage: "Hello KaryaLo team, we'd like to monitor our machines, rooms, or vehicles remotely.",
    },
    {
      id: "aplikasi-membingungkan",
      pillarId: "creative-design",
      problem: "Complex application workflows make adoption difficult for the team.",
      solution: "Improved workflows and interfaces, validated through a Figma prototype before implementation.",
      whatsappMessage: "Hello KaryaLo team, we would like to improve our application's workflows and interface so it is easier for our team to use.",
    },
  ],
};

export function getProblems(lang: Locale) {
  return problemsData[lang];
}
