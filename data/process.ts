export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Pemetaan Kebutuhan & Rancangan Sistem",
    tagline: "Memahami cara kerja bisnis Anda dulu, baru menentukan bentuk sistemnya.",
    description: "Kami duduk bersama tim Anda untuk memetakan alur kerja yang berjalan sekarang, menentukan angka apa yang mau diperbaiki, lalu menyusun rancangan sistemnya. Ruang lingkup dan kerahasiaan dikunci lewat SPK dan NDA resmi.",
    deliverables: ["Dokumen rancangan sistem", "SPK & NDA resmi", "Rincian pekerjaan dan jadwalnya"]
  },
  {
    step: "02",
    title: "Purwarupa Interaktif & Uji Coba Awal",
    tagline: "Anda mencoba alur sistemnya sebelum baris kode pertama ditulis.",
    description: "Dalam 7–14 hari kerja, kami siapkan purwarupa Figma yang bisa diklik, atau alat contoh untuk proyek IoT. Semua alur ditinjau bersama supaya salah paham ketahuan sejak awal, bukan saat sistem sudah setengah jadi.",
    deliverables: ["Purwarupa Figma yang bisa diklik", "Panduan tampilan & komponen", "Alat contoh untuk proyek IoT"]
  },
  {
    step: "03",
    title: "Pengerjaan Bertahap & Demo Berkala",
    tagline: "Progres bisa dilihat setiap minggu, bukan cuma di akhir proyek.",
    description: "Pengerjaan dipecah menjadi target mingguan. Setiap kali satu target selesai, Anda dapat akses ke server uji coba untuk langsung mencoba fitur yang baru jadi, jadi arah proyek masih gampang dikoreksi.",
    deliverables: ["Akses server uji coba", "Laporan progres mingguan", "Persetujuan tiap termin"]
  },
  {
    step: "04",
    title: "Pengujian, Keamanan & Kalibrasi Lapangan",
    tagline: "Diuji sampai stabil sebelum dipakai pengguna sungguhan.",
    description: "Sebelum rilis, sistem kami uji dengan beban tinggi, kami periksa sisi keamanan datanya, dan kami coba di berbagai ukuran layar. Untuk proyek IoT, alatnya kami kalibrasi langsung di lokasi pemasangan.",
    deliverables: ["Laporan uji beban & keamanan", "Hasil uji terima bersama klien (UAT)", "Kalibrasi alat di lokasi"]
  },
  {
    step: "05",
    title: "Serah Terima, Pelatihan & Garansi",
    tagline: "Semua hasil kerja berpindah tangan, tanpa kunci yang kami simpan.",
    description: "Setelah berita acara serah terima (BAST) ditandatangani, repositori Git, akun server, dan dokumentasinya menjadi milik Anda sepenuhnya. Kami latih tim Anda memakainya, dan sistem tetap bergaransi selama masa yang disepakati.",
    deliverables: ["Serah terima repositori & akun server", "Dokumen BAST resmi", "Garansi perbaikan bug & dukungan lanjutan"]
  }
];
