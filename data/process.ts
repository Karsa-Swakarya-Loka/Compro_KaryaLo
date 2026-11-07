import type { Locale, Localized } from "@/lib/i18n";

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const processData: Localized<ProcessStep[]> = {
  id: [
    {
      step: "01",
      title: "Pemetaan Kebutuhan & Rancangan Sistem",
      tagline: "Menyelaraskan rancangan solusi dengan kebutuhan dan prioritas bisnis.",
      description: "Bersama tim Anda, kami memetakan proses kerja, menetapkan tujuan, dan menyusun rancangan sistem. Ruang lingkup, jadwal, serta ketentuan kerja sama dituangkan dalam SPK, dengan NDA untuk menjaga kerahasiaan informasi proyek.",
      deliverables: ["Dokumen rancangan sistem", "SPK & NDA resmi", "Rincian pekerjaan dan jadwalnya"]
    },
    {
      step: "02",
      title: "Purwarupa Interaktif & Uji Coba Awal",
      tagline: "Memvalidasi alur dan fungsi sebelum pengembangan dilanjutkan.",
      description: "Dalam 7-14 hari kerja sesuai ruang lingkup yang disepakati, kami menyiapkan purwarupa Figma interaktif atau perangkat contoh untuk proyek IoT. Tinjauan bersama membantu memastikan kebutuhan telah dipahami sebelum tahap pengembangan berikutnya.",
      deliverables: ["Purwarupa Figma interaktif", "Panduan antarmuka & komponen", "Purwarupa perangkat untuk proyek IoT"]
    },
    {
      step: "03",
      title: "Pengerjaan Bertahap & Demo Berkala",
      tagline: "Meninjau kemajuan melalui target mingguan dan demonstrasi fitur.",
      description: "Pengembangan dibagi menjadi target mingguan. Fitur yang selesai tersedia di lingkungan uji coba untuk ditinjau bersama, sehingga masukan dan penyesuaian dapat dibahas secara berkala.",
      deliverables: ["Akses server uji coba", "Laporan progres mingguan", "Persetujuan tiap termin"]
    },
    {
      step: "04",
      title: "Pengujian, Keamanan & Kalibrasi Lapangan",
      tagline: "Memeriksa kesiapan sistem sebelum digunakan dalam operasional.",
      description: "Kami melakukan pengujian beban, pemeriksaan keamanan, dan pengujian pada berbagai ukuran layar sesuai kebutuhan proyek. Untuk IoT, perangkat dikalibrasi di lokasi pemasangan. Hasilnya ditinjau bersama melalui uji terima pengguna.",
      deliverables: ["Laporan uji beban & keamanan", "Hasil uji terima bersama klien (UAT)", "Kalibrasi alat di lokasi"]
    },
    {
      step: "05",
      title: "Serah Terima, Pelatihan & Garansi",
      tagline: "Menyiapkan tim Anda untuk menggunakan dan mengelola sistem.",
      description: "Hasil kerja proyek khusus diserahkan sesuai SPK setelah BAST ditandatangani dan pembayaran selesai. Serah terima mencakup repositori, akses server, dokumentasi, serta pelatihan. Garansi berlaku sesuai cakupan dan durasi yang disepakati.",
      deliverables: ["Serah terima repositori & akun server", "Dokumen BAST resmi", "Garansi perbaikan bug & dukungan lanjutan"]
    }
  ],
  en: [
    {
      step: "01",
      title: "Discovery & System Design",
      tagline: "Align the solution with your business requirements and priorities.",
      description: "We work with your team to map processes, define objectives, and design the system. Scope, schedule, and engagement terms are recorded in the work agreement (SPK), with an NDA to protect project information.",
      deliverables: ["System design document", "Formal SPK & NDA", "Work breakdown and schedule"]
    },
    {
      step: "02",
      title: "Interactive Prototype & Early Testing",
      tagline: "Validate workflows and functionality before development continues.",
      description: "Within 7-14 working days, subject to the agreed scope, we prepare an interactive Figma prototype or a device prototype for IoT projects. Joint reviews confirm requirements before the next development stage.",
      deliverables: ["Clickable Figma prototype", "Interface & component guide", "Sample device for IoT projects"]
    },
    {
      step: "03",
      title: "Development & Regular Demos",
      tagline: "Review progress through weekly milestones and feature demonstrations.",
      description: "Development is organised into weekly targets. Completed features are made available in a test environment for joint review, allowing feedback and adjustments to be discussed regularly.",
      deliverables: ["Staging server access", "Weekly progress report", "Sign-off for each payment stage"]
    },
    {
      step: "04",
      title: "Testing, Security & Field Calibration",
      tagline: "Assess readiness before the system enters daily operations.",
      description: "We conduct load testing, security checks, and testing across screen sizes according to project requirements. IoT devices are calibrated at the installation site. Results are reviewed through user acceptance testing.",
      deliverables: ["Load & security test report", "User acceptance test (UAT) results", "On-site device calibration"]
    },
    {
      step: "05",
      title: "Handover, Training & Warranty",
      tagline: "Prepare your team to use and manage the system.",
      description: "Custom project deliverables are transferred under the SPK once the handover certificate (BAST) is signed and payment is complete. Handover includes the repository, server access, documentation, and training. Warranty coverage and duration follow the agreement.",
      deliverables: ["Repository & server account handover", "Formal BAST document", "Bug-fix warranty & ongoing support"]
    }
  ],
};

export function getProcess(lang: Locale) {
  return processData[lang];
}
