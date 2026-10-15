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
      question: "Apa peran KaryaLo sebagai extended IT partner?",
      answer: "Kami mendampingi kebutuhan teknologi perusahaan, mulai dari pemetaan kebutuhan dan pengembangan hingga pemeliharaan sistem. Layanan ini sesuai untuk bisnis yang belum memiliki tim IT atau memerlukan dukungan tambahan bagi tim internal. Keahlian kami mencakup software, desain, dan perangkat IoT, dengan ruang lingkup kerja sama yang disepakati sejak awal."
    },
    {
      id: "faq-area-layanan",
      question: "Apakah KaryaLo melayani klien di luar Bekasi?",
      answer: "Ya. Kami berbasis di Jatisampurna, Kota Bekasi, dan melayani klien di seluruh Indonesia. Pembahasan kebutuhan, demo berkala, serta serah terima dapat dilakukan secara daring. Pertemuan langsung di Jabodetabek dan kunjungan pemasangan atau kalibrasi perangkat IoT dijadwalkan sesuai kebutuhan proyek."
    },
    {
      id: "faq-ip-handover",
      question: "Siapa yang memiliki kode sumber setelah proyek selesai?",
      answer: "Untuk pengembangan khusus, hasil pekerjaan menjadi milik klien setelah BAST ditandatangani dan pembayaran diselesaikan sesuai SPK. Serah terima mencakup repositori, akses server, skema perangkat, dan file desain yang termasuk dalam proyek, tanpa biaya lisensi lanjutan atas hasil pekerjaan tersebut. Pengembangan dapat dilanjutkan oleh tim Anda atau mitra lain. Platform siap pakai mengikuti ketentuan lisensi yang disepakati secara terpisah."
    },
    {
      id: "faq-legal-contracts",
      question: "Apakah tersedia invoice resmi dan perjanjian kerahasiaan?",
      answer: "Ya. Kerja sama dilaksanakan atas nama PT Karsa Swakarya Loka, dengan NIB 3005260047228 dan bidang usaha pemrograman komputer. Dokumen kerja sama mencakup SPK, NDA, invoice per termin, dan berita acara serah terima. Perusahaan saat ini belum berstatus Pengusaha Kena Pajak (PKP), sehingga tidak menerbitkan Faktur Pajak dan tagihan tidak dikenai PPN."
    },
    {
      id: "faq-payment-terms",
      question: "Bagaimana skema pembayaran proyek?",
      answer: "Pembayaran dilakukan bertahap sesuai termin dalam SPK. Tahapannya dapat mencakup uang muka, persetujuan purwarupa, penyelesaian pengujian, dan peluncuran. Hasil pekerjaan pada setiap tahap ditinjau bersama sebelum penagihan termin berikutnya."
    },
    {
      id: "faq-warranty-sla",
      question: "Apakah tersedia garansi dan pemeliharaan setelah peluncuran?",
      answer: "Proyek dilengkapi garansi perbaikan bug selama 30–90 hari setelah peluncuran, dengan durasi dan cakupan yang ditetapkan dalam SPK. Untuk dukungan berkelanjutan, tersedia paket pemeliharaan yang mencakup pemantauan server, pembaruan keamanan, dan pencadangan data sesuai kesepakatan."
    },
    {
      id: "faq-iot-custom",
      question: "Apakah perangkat IoT dirancang khusus untuk kebutuhan klien?",
      answer: "Ya. Kami menyesuaikan pemilihan komponen, rancangan rangkaian, sensor, casing, dan pengiriman data dengan kebutuhan proyek. Pengembangan dimulai dari purwarupa perangkat yang diuji di lokasi untuk menilai fungsi serta kesesuaiannya dengan kondisi operasional sebelum penerapan lebih luas."
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
      question: "What does KaryaLo do as an extended IT partner?",
      answer: "We support your technology needs from discovery and development through system maintenance. Our services suit businesses without an IT team and those seeking additional expertise for an internal team. We cover software, design, and IoT, with the scope of each engagement agreed at the outset."
    },
    {
      id: "faq-area-layanan",
      question: "Does KaryaLo work with clients outside Bekasi?",
      answer: "Yes. We are based in Jatisampurna, Bekasi, and serve clients throughout Indonesia. Requirements discussions, regular demos, and handover can take place remotely. In-person meetings across Greater Jakarta and IoT installation or calibration visits are scheduled according to project needs."
    },
    {
      id: "faq-ip-handover",
      question: "Who owns the source code once the project is finished?",
      answer: "For custom development, ownership of the work transfers to the client once the handover certificate (BAST) is signed and payment is complete under the SPK. Handover includes the repository, server access, device schematics, and design files within the project scope, with no ongoing licence fee for that work. Your team or another partner can continue development. Ready-made platforms follow separately agreed licensing terms."
    },
    {
      id: "faq-legal-contracts",
      question: "Are formal invoices and confidentiality agreements available?",
      answer: "Yes. Engagements are carried out by PT Karsa Swakarya Loka, with business ID (NIB) 3005260047228, registered for computer programming. Project documentation includes a work agreement (SPK), NDA, milestone invoices, and a handover certificate. The company is not currently VAT-registered (PKP), so it does not issue tax invoices or charge VAT."
    },
    {
      id: "faq-payment-terms",
      question: "How are project payments structured?",
      answer: "Payments follow the milestones defined in the work agreement. These may include a down payment, prototype approval, completion of testing, and launch. Work at each stage is reviewed together before the next milestone is invoiced."
    },
    {
      id: "faq-warranty-sla",
      question: "Are warranty and maintenance available after launch?",
      answer: "Projects include a 30–90 day bug-fix warranty after launch, with duration and coverage defined in the work agreement. Ongoing maintenance plans are available for server monitoring, security updates, and data backups according to the agreed scope."
    },
    {
      id: "faq-iot-custom",
      question: "Are IoT devices designed for each client's requirements?",
      answer: "Yes. Component selection, circuit design, sensors, enclosures, and data transmission are tailored to project requirements. Development starts with a device prototype tested on site to assess functionality and suitability for your operating conditions before wider deployment."
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
