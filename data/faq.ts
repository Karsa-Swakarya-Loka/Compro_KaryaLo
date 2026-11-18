import type { Locale, Localized } from "@/lib/i18n";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: Localized<FAQItem[]> = {
  id: [
    {
      id: "faq-extended-partner",
      question: "Apa itu KaryaLo, dan apa bedanya IT agency dengan software house?",
      answer: "KaryaLo adalah IT agency dan software house di Kota Bekasi milik PT Karsa Swakarya Loka. Software house berfokus membangun software; sebagai IT agency, kami juga mengerjakan desain, foto dan video, perangkat IoT, serta pengadaan komputer dan perangkat jaringan, sehingga kebutuhan IT dan visual bisnis Anda ditangani satu mitra. Kami mendampingi mulai dari pemetaan kebutuhan hingga pemeliharaan, dengan ruang lingkup yang disepakati sejak awal."
    },
    {
      id: "faq-sistem-umkm",
      question: "Apakah KaryaLo melayani pembuatan sistem internal untuk UMKM?",
      answer: "Ya. Kami membuat sistem internal seperti kasir dan stok, pencatatan pesanan, dashboard laporan, serta toko online untuk usaha yang belum memiliki tim IT. Pekerjaan dimulai dari pemetaan kebutuhan tanpa kewajiban melanjutkan proyek, lalu demo yang bisa dicoba sebelum kode ditulis. Biaya disampaikan melalui penawaran sesuai lingkup."
    },
    {
      id: "faq-foto-video",
      question: "Apakah KaryaLo menyediakan jasa fotografi dan videografi?",
      answer: "Ya. Kami memproduksi foto produk, foto profil perusahaan, video company profile, dan dokumentasi kegiatan usaha. Hasilnya diselaraskan dengan identitas merek dan materi promosi Anda. Lingkup, lokasi, dan jadwal pengambilan gambar disepakati lewat penawaran."
    },
    {
      id: "faq-hardware-mikrotik",
      question: "Apakah KaryaLo menjual komputer dan perangkat jaringan seperti MikroTik?",
      answer: "Ya. Kami menyediakan komputer, laptop, serta perangkat jaringan seperti router MikroTik untuk kantor dan usaha. Spesifikasi dipilih sesuai kebutuhan Anda dan harga disampaikan melalui penawaran. Pengadaan dapat digabung dengan layanan software atau IoT agar semuanya saling terhubung."
    },
    {
      id: "faq-area-layanan",
      question: "Apakah KaryaLo melayani klien di luar Bekasi?",
      answer: "Ya. Kami berbasis di Jatisampurna, Kota Bekasi, dan melayani klien di seluruh Indonesia. Pembahasan kebutuhan, demo berkala, serta serah terima dapat dilakukan secara daring. Pertemuan langsung di Jabodetabek dan kunjungan pemasangan atau penyetelan perangkat IoT dijadwalkan sesuai kebutuhan proyek."
    },
    {
      id: "faq-ip-handover",
      question: "Siapa yang memiliki kode sumber setelah proyek selesai?",
      answer: "Untuk pengembangan khusus, hasil pekerjaan menjadi milik klien setelah berita acara serah terima ditandatangani dan pembayaran diselesaikan sesuai kontrak kerja. Serah terima mencakup kode sumber, akses server, rancangan rangkaian perangkat, dan file desain yang termasuk dalam proyek, tanpa biaya lisensi lanjutan atas hasil pekerjaan tersebut. Pengembangan dapat dilanjutkan oleh tim Anda atau mitra lain. Platform siap pakai mengikuti ketentuan lisensi yang disepakati secara terpisah."
    },
    {
      id: "faq-legal-contracts",
      question: "Apakah tersedia invoice resmi dan perjanjian kerahasiaan?",
      answer: "Ya. Kerja sama dilaksanakan atas nama PT Karsa Swakarya Loka, dengan NIB 3005260047228 dan bidang usaha pemrograman komputer. Dokumen kerja sama mencakup kontrak kerja (SPK), perjanjian kerahasiaan (NDA), invoice per tahap pembayaran, dan berita acara serah terima (BAST). Perusahaan saat ini belum berstatus Pengusaha Kena Pajak (PKP), sehingga tidak menerbitkan Faktur Pajak dan tagihan tidak dikenai PPN."
    },
    {
      id: "faq-payment-terms",
      question: "Bagaimana skema pembayaran proyek?",
      answer: "Pembayaran dilakukan bertahap sesuai tahapan dalam kontrak kerja. Tahapannya dapat mencakup uang muka, persetujuan demo, penyelesaian pengujian, dan peluncuran. Hasil pekerjaan pada setiap tahap ditinjau bersama sebelum penagihan tahap berikutnya."
    },
    {
      id: "faq-warranty-sla",
      question: "Apakah tersedia garansi dan pemeliharaan setelah peluncuran?",
      answer: "Proyek dilengkapi garansi perbaikan error selama 30-90 hari setelah peluncuran, dengan durasi dan cakupan yang ditetapkan dalam kontrak kerja. Untuk dukungan berkelanjutan, tersedia paket pemeliharaan yang mencakup pemantauan server, pembaruan keamanan, dan pencadangan data sesuai kesepakatan."
    },
    {
      id: "faq-iot-custom",
      question: "Apakah perangkat IoT dirancang khusus untuk kebutuhan klien?",
      answer: "Ya. Kami menyesuaikan pemilihan komponen, rancangan rangkaian, sensor, casing, dan pengiriman data dengan kebutuhan proyek. Pengembangan dimulai dari perangkat uji coba yang dipasang langsung di lokasi untuk menilai fungsi serta kesesuaiannya dengan kondisi operasional sebelum penerapan lebih luas."
    },
    {
      id: "faq-nda-first",
      question: "Apakah NDA dapat ditandatangani sebelum diskusi teknis?",
      answer: "Ya. NDA dapat disepakati sebelum Anda membagikan informasi teknis atau rencana bisnis. Kami dapat meninjau format perusahaan Anda atau menyediakan format PT Karsa Swakarya Loka untuk disepakati bersama."
    }
  ],
  en: [
    {
      id: "faq-extended-partner",
      question: "What is KaryaLo, and how is an IT agency different from a software house?",
      answer: "KaryaLo is an IT agency and software house in Bekasi, owned by PT Karsa Swakarya Loka. A software house focuses on building software; as an IT agency we also handle design, photo and video, IoT devices, and supply of computers and networking equipment, so your IT and visual needs sit with one partner. We support you from discovery through maintenance, with the scope agreed at the outset."
    },
    {
      id: "faq-sistem-umkm",
      question: "Does KaryaLo build internal systems for small businesses?",
      answer: "Yes. We build internal systems such as point of sale and inventory, order tracking, reporting dashboards, and online stores for businesses without an IT team. Work starts with a no-obligation discovery step, then a clickable demo before any code is written. Pricing is given through a quotation based on scope."
    },
    {
      id: "faq-foto-video",
      question: "Does KaryaLo offer photography and videography?",
      answer: "Yes. We produce product photos, company profile photos, company profile videos, and documentation of business activities, aligned with your brand identity and promotional material. Scope, location, and shooting schedule are agreed through a quotation."
    },
    {
      id: "faq-hardware-mikrotik",
      question: "Does KaryaLo sell computers and networking equipment such as MikroTik?",
      answer: "Yes. We supply computers, laptops, and networking equipment such as MikroTik routers for offices and businesses. Specifications are chosen for your needs and pricing is given through a quotation. Supply can be combined with software or IoT work so everything fits together."
    },
    {
      id: "faq-area-layanan",
      question: "Does KaryaLo work with clients outside Bekasi?",
      answer: "Yes. We are based in Jatisampurna, Bekasi, and serve clients throughout Indonesia. Requirements discussions, regular demos, and handover can take place remotely. In-person meetings across Greater Jakarta and IoT installation or set-up visits are scheduled according to project needs."
    },
    {
      id: "faq-ip-handover",
      question: "Who owns the source code once the project is finished?",
      answer: "For custom development, ownership of the work transfers to the client once the handover report is signed and payment is complete under the contract. Handover includes the source code, server access, device circuit designs, and design files within the project scope, with no ongoing licence fee for that work. Your team or another partner can continue development. Ready-made platforms follow separately agreed licensing terms."
    },
    {
      id: "faq-legal-contracts",
      question: "Are formal invoices and confidentiality agreements available?",
      answer: "Yes. Engagements are carried out by PT Karsa Swakarya Loka, with business ID (NIB) 3005260047228, registered for computer programming. Project documentation includes a contract (SPK), a non-disclosure agreement (NDA), an invoice for each payment stage, and a handover report (BAST). The company is not currently VAT-registered (PKP), so it does not issue tax invoices or charge VAT."
    },
    {
      id: "faq-payment-terms",
      question: "How are project payments structured?",
      answer: "Payments are made in stages set out in the contract. These may include a down payment, demo approval, completion of testing, and launch. Work at each stage is reviewed together before the next stage is invoiced."
    },
    {
      id: "faq-warranty-sla",
      question: "Are warranty and maintenance available after launch?",
      answer: "Projects include a 30-90 day error-fix warranty after launch, with duration and coverage set out in the contract. Ongoing maintenance plans are available for server monitoring, security updates, and data backups according to the agreed scope."
    },
    {
      id: "faq-iot-custom",
      question: "Are IoT devices designed for each client's requirements?",
      answer: "Yes. Component selection, circuit design, sensors, enclosures, and data transmission are tailored to project requirements. Development starts with a test device installed on site to assess functionality and suitability for your operating conditions before wider deployment."
    },
    {
      id: "faq-nda-first",
      question: "Can an NDA be signed before technical discussions?",
      answer: "Yes. An NDA can be agreed before you share technical information or business plans. We can review your company's template or provide PT Karsa Swakarya Loka's template for mutual agreement."
    }
  ],
};

export function getFaq(lang: Locale) {
  return faqData[lang];
}
