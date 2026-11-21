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
      tagline: "Kami pahami dulu kebutuhan bisnis Anda sebelum merancang sistem.",
      description: "Bersama tim Anda, kami memetakan proses kerja, menetapkan tujuan, dan menyusun rancangan sistem. Ruang lingkup, jadwal, serta ketentuan kerja sama dituangkan dalam kontrak kerja, dengan NDA untuk menjaga kerahasiaan informasi proyek.",
      deliverables: ["Dokumen rancangan sistem", "Kontrak kerja (SPK) & perjanjian kerahasiaan (NDA)", "Rincian pekerjaan dan jadwalnya"]
    },
    {
      step: "02",
      title: "Demo Interaktif & Uji Coba Awal",
      tagline: "Uji alur sistem secara langsung sebelum kode ditulis.",
      description: "Dalam 7-14 hari kerja sesuai ruang lingkup yang disepakati, kami menyiapkan demo interaktif di Figma atau perangkat uji coba untuk proyek IoT. Kami meninjaunya bersama tim Anda untuk mengecek apakah kebutuhan sudah kami pahami dengan benar sebelum masuk ke tahap pengembangan.",
      deliverables: ["Demo interaktif (Figma)", "Panduan tampilan & elemen desain", "Perangkat uji coba untuk proyek IoT"]
    },
    {
      step: "03",
      title: "Pengerjaan Bertahap & Demo Berkala",
      tagline: "Pantau kemajuan nyata melalui demo setiap minggu.",
      description: "Pengembangan dibagi menjadi target mingguan. Fitur yang selesai bisa langsung Anda coba di versi uji coba online, lalu masukan Anda kami bahas bersama setiap minggu.",
      deliverables: ["Akses ke versi uji coba online", "Laporan progres mingguan", "Persetujuan di setiap tahap pembayaran"]
    },
    {
      step: "04",
      title: "Pengujian, Keamanan & Penyetelan di Lokasi",
      tagline: "Sistem diuji lebih dulu sebelum dipakai dalam operasional.",
      description: "Kami menguji ketahanan sistem saat diakses banyak pengguna, memeriksa keamanan, dan mengecek tampilan di berbagai ukuran layar sesuai kebutuhan proyek. Untuk IoT, perangkat disetel langsung di lokasi pemasangan. Hasilnya dicoba dan disetujui bersama tim Anda.",
      deliverables: ["Laporan uji ketahanan & keamanan", "Hasil uji coba bersama tim Anda", "Penyetelan alat di lokasi"]
    },
    {
      step: "05",
      title: "Serah Terima, Pelatihan & Garansi",
      tagline: "Tim Anda siap menggunakan, dan sistem sepenuhnya menjadi milik Anda.",
      description: "Hasil kerja proyek khusus diserahkan sesuai kontrak kerja setelah berita acara serah terima ditandatangani dan pembayaran selesai. Serah terima mencakup kode sumber, akses server, dokumentasi, serta pelatihan. Garansi berlaku sesuai cakupan dan durasi yang disepakati.",
      deliverables: ["Serah terima kode sumber & akses server", "Berita acara serah terima (BAST)", "Garansi perbaikan error & dukungan lanjutan"]
    }
  ],
  en: [
    {
      step: "01",
      title: "Discovery & System Design",
      tagline: "We learn what your business needs before designing the system.",
      description: "We work with your team to map processes, define objectives, and design the system. Scope, schedule, and engagement terms are recorded in the contract (SPK), with a non-disclosure agreement (NDA) to protect project information.",
      deliverables: ["System design document", "Contract (SPK) & non-disclosure agreement (NDA)", "Work breakdown and schedule"]
    },
    {
      step: "02",
      title: "Clickable Demo & Early Testing",
      tagline: "Test the workflow first-hand before code is written.",
      description: "Within 7-14 working days, subject to the agreed scope, we prepare a clickable demo in Figma, or a test device for IoT projects. We review it with your team to check that we have understood the requirements before development starts.",
      deliverables: ["Clickable demo (Figma)", "Screen & design element guide", "Sample device for IoT projects"]
    },
    {
      step: "03",
      title: "Development & Regular Demos",
      tagline: "Track real progress through weekly demos.",
      description: "Development is organised into weekly targets. Completed features go into an online test version for you to try, and we go through your feedback together each week.",
      deliverables: ["Access to the online test version", "Weekly progress report", "Sign-off for each payment stage"]
    },
    {
      step: "04",
      title: "Testing, Security & On-Site Set-Up",
      tagline: "The system is tested before it goes into daily operations.",
      description: "We check that the system holds up when many people use it at once, review its security, and make sure it looks right on every screen size the project needs. IoT devices are set up at the installation site. Your team then tries everything out and signs it off.",
      deliverables: ["Performance & security test report", "Results of testing with your team", "On-site device set-up"]
    },
    {
      step: "05",
      title: "Handover, Training & Warranty",
      tagline: "Your team is ready to use it, and the system is fully yours.",
      description: "Custom project work is handed over under the contract once the handover report is signed and payment is complete. Handover includes the source code, server access, documentation, and training. Warranty coverage and duration follow the agreement.",
      deliverables: ["Source code & server access handover", "Handover report (BAST)", "Error-fix warranty & ongoing support"]
    }
  ],
};

export function getProcess(lang: Locale) {
  return processData[lang];
}
