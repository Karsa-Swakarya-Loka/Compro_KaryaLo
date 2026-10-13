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
  /** Case study under /works/[slug], when one exists. */
  proof?: { slug: string; label: string };
  /** Opening of the WhatsApp message used when there is no case study to show. */
  whatsappMessage: string;
}

export const problemsData: ProblemItem[] = [
  {
    id: "stok-tidak-cocok",
    pillarId: "digital-engineering",
    problem: "Pesanan online dan stok di gudang sering tidak cocok.",
    solution: "Toko online yang tersambung langsung ke sistem gudang, jadi pesanan dan stok selalu memakai angka yang sama.",
    proof: { slug: "alina-omnichannel-retail", label: "Lihat studi kasus Alina" },
    whatsappMessage: "Halo Tim KaryaLo, pesanan online dan stok gudang kami sering tidak cocok.",
  },
  {
    id: "website-belum-meyakinkan",
    pillarId: "digital-engineering",
    problem: "Calon mitra menilai perusahaan dari websitenya, dan website kami belum meyakinkan.",
    solution: "Website perusahaan yang ringan dibuka, enak dibaca, dan mudah ditemukan di Google.",
    proof: { slug: "hij-corporate-profile", label: "Lihat studi kasus HIJ" },
    whatsappMessage: "Halo Tim KaryaLo, kami ingin memperbarui website perusahaan supaya lebih meyakinkan calon mitra.",
  },
  {
    id: "laporan-manual",
    pillarId: "digital-engineering",
    problem: "Laporan mingguan masih direkap manual dari banyak file.",
    solution: "Dashboard yang mengambil angka langsung dari sistem Anda, jadi laporan siap tanpa rekap ulang.",
    proof: { slug: "karyalo-executive-analytics", label: "Lihat purwarupa dashboard kami" },
    whatsappMessage: "Halo Tim KaryaLo, laporan kami masih direkap manual dan kami butuh dashboard.",
  },
  {
    id: "catatan-lapangan",
    pillarId: "digital-engineering",
    problem: "Tim lapangan masih mencatat di kertas atau lewat chat.",
    solution: "Aplikasi Android dan iOS untuk mencatat pekerjaan, kunjungan, atau stok, yang langsung masuk ke sistem kantor.",
    whatsappMessage: "Halo Tim KaryaLo, tim lapangan kami masih mencatat di kertas atau chat. Kami butuh aplikasi untuk mereka.",
  },
  {
    id: "alat-tidak-terpantau",
    pillarId: "iot-hardware",
    problem: "Kondisi mesin, ruangan, atau kendaraan baru ketahuan setelah ada masalah.",
    solution: "Sensor di lokasi yang mengirim datanya ke dashboard, dengan peringatan otomatis ke WhatsApp saat ada yang tidak normal.",
    whatsappMessage: "Halo Tim KaryaLo, kami ingin memantau kondisi mesin, ruangan, atau kendaraan dari jarak jauh.",
  },
  {
    id: "aplikasi-membingungkan",
    pillarId: "creative-design",
    problem: "Aplikasinya sudah ada, tapi tim enggan memakainya karena membingungkan.",
    solution: "Alur dan tampilan yang dirapikan, dicoba dulu lewat purwarupa Figma sebelum diubah di kode.",
    whatsappMessage: "Halo Tim KaryaLo, aplikasi kami sudah ada tapi membingungkan. Kami ingin tampilannya dirapikan.",
  },
];
