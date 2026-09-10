export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-area-layanan",
    question: "KaryaLo hanya melayani klien Bekasi, atau bisa luar kota juga?",
    answer: "Studio dan bengkel perangkat kami memang di Jatisampurna, Kota Bekasi, dan sebagian besar klien kami dari Jabodetabek. Tapi cara kerja kami sudah remote sejak awal: pembahasan kebutuhan, demo mingguan, sampai serah terima bisa dijalankan online untuk klien di kota mana pun. Kami tetap datang ke lokasi untuk pemasangan dan kalibrasi perangkat IoT."
  },
  {
    id: "faq-ip-handover",
    question: "Setelah proyek selesai, source code-nya jadi milik siapa?",
    answer: "Milik Anda, seluruhnya. Begitu proyek rampung dan dokumen serah terima (BAST) ditandatangani, repositori Git, akses server, skema perangkat, dan file desainnya kami serahkan tanpa ada biaya lisensi lanjutan. Anda juga bebas melanjutkan pengembangannya dengan tim lain kalau memang perlu."
  },
  {
    id: "faq-legal-contracts",
    question: "Bisa menerbitkan faktur resmi dan menandatangani NDA?",
    answer: "Bisa. Semua kerja sama berjalan atas nama PT Karsa Swakarya Loka (NIB 3005260047228, bidang usaha pemrograman komputer). Kami menerbitkan Surat Perjanjian Kerja (SPK), NDA untuk menjaga kerahasiaan data proyek, berita acara serah terima, dan Faktur Pajak resmi."
  },
  {
    id: "faq-payment-terms",
    question: "Bagaimana skema pembayarannya?",
    answer: "Bertahap, mengikuti termin yang disepakati di awal. Misalnya: uang muka, lalu setelah purwarupa disetujui, setelah pengujian, dan terakhir saat peluncuran. Termin berikutnya baru ditagih setelah progres sebelumnya Anda cek sendiri di server uji coba."
  },
  {
    id: "faq-warranty-sla",
    question: "Ada garansi dan perawatan setelah sistem dirilis?",
    answer: "Ada. Setiap proyek datang dengan masa garansi perbaikan bug selama 30 sampai 90 hari setelah sistem resmi dipakai. Kalau Anda ingin dipantau lebih lama, tersedia paket perawatan bulanan untuk pemantauan server, pembaruan keamanan, dan backup data rutin."
  },
  {
    id: "faq-iot-custom",
    question: "Kalau butuh perangkat IoT, alatnya dirakit khusus atau beli jadi?",
    answer: "Kami rakit sesuai kebutuhan. Mulai dari memilih komponen, merancang rangkaian, memasang sensor, membuat casing cetak 3D, sampai mengatur pengiriman datanya ke dashboard Anda. Jadi bentuk dan fungsinya menyesuaikan kondisi di lapangan, bukan sebaliknya."
  },
  {
    id: "faq-nda-first",
    question: "Boleh tanda tangan NDA dulu sebelum kami cerita detail sistemnya?",
    answer: "Boleh, dan itu wajar. Kami siap menandatangani NDA dari perusahaan Anda, atau memakai format standar milik PT Karsa Swakarya Loka, sebelum pembahasan teknis dimulai."
  }
];
