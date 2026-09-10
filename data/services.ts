export interface SubService {
  /** Internal quotation/SPK reference. Never rendered on the public site. */
  code: string;
  name: string;
  description: string;
  items: string[];
}

export interface ServicePillar {
  id: string;
  pillarNumber: string;
  /** Internal quotation/SPK reference. Never rendered on the public site. */
  codePrefix: "DEV" | "DSG" | "IOT";
  name: string;
  shortName: string;
  focus: string;
  image: string;
  /** Describes what the photo actually shows, for screen readers and image search. */
  imageAlt: string;
  subServices: SubService[];
}

export const servicesData: ServicePillar[] = [
  {
    id: "digital-engineering",
    pillarNumber: "01",
    codePrefix: "DEV",
    name: "Pengembangan Software & Aplikasi",
    shortName: "Software & Aplikasi",
    focus: "Website, aplikasi, dan sistem internal yang stabil dipakai setiap hari serta siap tumbuh mengikuti bisnis Anda.",
    image: "/images/service-software.webp",
    imageAlt: "Laptop di atas meja kantor menampilkan dashboard laporan kinerja perusahaan, dengan ponsel dan buku catatan di sampingnya.",
    subServices: [
      {
        code: "DEV-WEB",
        name: "Website & Aplikasi Web",
        description: "Website perusahaan yang cepat dibuka dan mudah ditemukan di Google, aplikasi web untuk kebutuhan operasional harian, sampai platform langganan milik Anda sendiri.",
        items: ["Website perusahaan yang mudah ditemukan di Google", "Aplikasi web yang bisa dipasang di ponsel", "Platform langganan (SaaS)"]
      },
      {
        code: "DEV-APP",
        name: "Aplikasi Mobile",
        description: "Aplikasi Android dan iOS dari satu basis kode, termasuk aplikasi untuk tim lapangan, kasir toko, dan pencatatan stok gudang.",
        items: ["Aplikasi Android & iOS", "Aplikasi tim lapangan", "Kasir & pencatatan stok"]
      },
      {
        code: "DEV-ENT",
        name: "Sistem Internal & Integrasi",
        description: "Dashboard untuk memantau angka penting, sambungan ke layanan pembayaran, dan penghubung antar sistem yang sudah Anda pakai sekarang.",
        items: ["Dashboard laporan bisnis", "Integrasi pembayaran", "Penghubung antar sistem (API)"]
      }
    ]
  },
  {
    id: "creative-design",
    pillarNumber: "02",
    codePrefix: "DSG",
    name: "Desain Antarmuka & Identitas Merek",
    shortName: "Desain & Branding",
    focus: "Merapikan tampilan produk digital dan identitas merek supaya mudah dipakai, enak dilihat, dan konsisten di semua materi.",
    image: "/images/service-design.webp",
    imageAlt: "Buku sketsa berisi rancangan alur layar aplikasi, di sampingnya tablet menampilkan desain aplikasi dan kipas contoh warna cetak.",
    subServices: [
      {
        code: "DSG-UI",
        name: "Desain UI/UX Produk Digital",
        description: "Menyusun alur pemakaian, membuat purwarupa Figma yang bisa diklik, dan merapikan tampilan aplikasi yang terlanjur ruwet.",
        items: ["Purwarupa Figma interaktif", "Panduan komponen tampilan", "Perapian aplikasi lama"]
      },
      {
        code: "DSG-BRD",
        name: "Identitas Merek & Materi Perusahaan",
        description: "Logo, panduan warna dan huruf, sampai perlengkapan kantor seperti kop surat, kartu nama, invoice, dan company profile.",
        items: ["Logo & panduan merek", "Kop surat, kartu nama, invoice", "Company profile & pitch deck"]
      },
      {
        code: "DSG-MKT",
        name: "Materi Promosi & Presentasi",
        description: "Template konten media sosial, infografis untuk menjelaskan produk, dan deck presentasi untuk penawaran ke calon mitra.",
        items: ["Template media sosial", "Infografis penjelas produk", "Deck presentasi penjualan"]
      }
    ]
  },
  {
    id: "iot-hardware",
    pillarNumber: "03",
    codePrefix: "IOT",
    name: "Perangkat IoT & Sistem Pemantauan",
    shortName: "IoT & Perangkat",
    focus: "Memasang sensor dan alat pemantau di lapangan, lalu menyambungkannya ke dashboard supaya kondisinya terlihat dari mana saja.",
    image: "/images/service-iot-2.webp",
    imageAlt: "Meja kerja dengan papan rangkaian kecil tersambung ke perangkat pemantau hitam, sementara layar di belakangnya menampilkan kode program dan diagram alur datanya.",
    subServices: [
      {
        code: "IOT-HW",
        name: "Perakitan Perangkat & Purwarupa",
        description: "Merancang dan merakit alat pemantau, mulai dari pemilihan komponen, pemasangan sensor dan GPS, sampai casing cetak 3D.",
        items: ["Purwarupa alat pemantau", "Pemasangan sensor & GPS", "Rangkaian & casing custom"]
      },
      {
        code: "IOT-FW",
        name: "Program Perangkat & Pengiriman Data",
        description: "Mengatur cara alat mengirim data dengan aman dan hemat baterai, termasuk untuk lokasi yang sinyalnya pas-pasan.",
        items: ["Pengiriman data terenkripsi", "Koneksi jarak jauh & hemat daya", "Pengolahan data di perangkat"]
      },
      {
        code: "IOT-PLT",
        name: "Dashboard Pemantauan & Notifikasi",
        description: "Menampilkan kondisi alat secara langsung di dashboard, lengkap dengan peringatan otomatis lewat WhatsApp, Telegram, atau email.",
        items: ["Dashboard pemantauan langsung", "Peringatan otomatis WhatsApp", "Sambungan ke aplikasi Anda"]
      }
    ]
  }
];
