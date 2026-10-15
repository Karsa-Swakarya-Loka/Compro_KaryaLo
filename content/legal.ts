import { siteConfig, siteText } from "@/config/site";
import type { Localized } from "@/lib/i18n";

/**
 * Words on /privacy and /terms.
 *
 * The Indonesian text is the binding one. The English pages are translations
 * and say so at the top (`translationNote`); the Indonesian pages carry no note.
 * Both keep the non-PKP statement word for word in meaning: no VAT, no tax
 * invoice, until the status changes.
 */
interface LegalPageCopy {
  crumb: string;
  title: string;
  lede: string;
  /** Shown above the sections on translated versions only. */
  translationNote: string | null;
  sections: { heading: string; body: string }[];
  contactHeading: string;
  /** Text before the email address in the closing box. */
  contactBefore: string;
  /** Text after the email address, including its closing punctuation. */
  contactAfter: string;
  contactLink: string;
}

const translationNote =
  "This English version is a translation provided for convenience. If it differs from the Indonesian version, the Indonesian version prevails.";

/**
 * The contact form promises confidentiality and routes submissions through a
 * wa.me deep link. That data flow needs to be written down somewhere the visitor
 * can read it, which is what the privacy page is for.
 */
export const privacyCopy: Localized<LegalPageCopy> = {
  id: {
    crumb: "Kebijakan Privasi",
    title: "Kebijakan Privasi",
    lede: `Kebijakan ini menjelaskan cara ${siteConfig.companyName} mengumpulkan, menggunakan, dan melindungi informasi yang Anda sampaikan melalui situs serta kanal komunikasi resmi kami.`,
    translationNote: null,
    sections: [
      {
        heading: "Data yang Kami Kumpulkan",
        body: "Kami menerima informasi yang Anda sampaikan secara sukarela melalui kanal komunikasi resmi, termasuk pesan yang disiapkan dengan formulir proyek: nama, perusahaan atau organisasi, layanan yang dibutuhkan, perkiraan anggaran, dan ringkasan proyek. Kami juga mencatat penggunaan situs, seperti kunjungan halaman dan interaksi tombol. Catatan interaksi tersebut tidak menyertakan nama atau isi formulir Anda.",
      },
      {
        heading: "Bagaimana Formulir Proyek Bekerja",
        body: "Formulir pada halaman Kontak menyusun isian menjadi pesan di perangkat Anda tanpa mengirimkannya ke server kami. Pesan ditampilkan untuk ditinjau, kemudian dibuka di WhatsApp saat Anda memilih Lanjutkan ke WhatsApp. Kami menerima pesan hanya setelah Anda menekan Kirim di WhatsApp. Pemrosesan data oleh WhatsApp mengikuti kebijakan privasi layanan tersebut.",
      },
      {
        heading: "Penggunaan Data",
        body: "Informasi yang Anda sampaikan digunakan untuk menanggapi pertanyaan, meninjau kebutuhan proyek, serta menyiapkan penawaran atau Surat Perjanjian Kerja (SPK) jika kerja sama berlanjut. Kami tidak menjual, menyewakan, atau memperdagangkan data Anda kepada pihak lain.",
      },
      {
        heading: "Kerahasiaan & NDA",
        body: "Kami memperlakukan informasi teknis dan rencana bisnis Anda sebagai informasi rahasia. Perjanjian kerahasiaan atau Non-Disclosure Agreement (NDA) dapat disepakati sebelum pembahasan teknis dimulai.",
      },
      {
        heading: "Penyimpanan & Retensi",
        body: "Riwayat komunikasi dan dokumen proyek disimpan selama kerja sama berlangsung serta selama periode yang diwajibkan oleh ketentuan perpajakan dan administrasi perusahaan di Indonesia. Anda dapat mengajukan penghapusan data yang tidak lagi terikat kewajiban penyimpanan tersebut.",
      },
      {
        heading: "Hak Anda",
        body: "Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi yang kami simpan, serta meminta penghentian komunikasi. Sampaikan permintaan melalui email resmi kami untuk ditindaklanjuti pada hari kerja.",
      },
      {
        heading: "Layanan Pihak Ketiga",
        body: "Situs ini memuat tautan ke WhatsApp dan Google Maps. Penggunaan layanan tersebut mengikuti kebijakan privasi masing-masing penyedia, dan pemrosesan datanya berada di luar kendali kami. Situs ini juga menggunakan Google Tag Manager dan Google Analytics untuk mengukur penggunaan situs. Pengukuran ini dapat menggunakan cookie dan melibatkan pemrosesan data oleh Google. Anda dapat memblokir cookie melalui pengaturan browser.",
      },
    ],
    contactHeading: "Menghubungi Kami",
    contactBefore: "Untuk pertanyaan mengenai kebijakan ini, hubungi",
    contactAfter: ` atau ke alamat kantor kami di ${siteConfig.address}.`,
    contactLink: "Halaman Kontak",
  },
  en: {
    crumb: "Privacy Policy",
    title: "Privacy Policy",
    lede: `This policy explains how ${siteConfig.companyName} collects, uses, and protects information shared through this website and our official communication channels.`,
    translationNote,
    sections: [
      {
        heading: "Data We Collect",
        body: "We receive information you voluntarily share through our official communication channels, including messages prepared with the project form: your name, company or organisation, required service, estimated budget, and project summary. We also record website usage, such as page visits and button interactions. These interaction records do not include your name or form contents.",
      },
      {
        heading: "How the Project Form Works",
        body: "The Contact form prepares a message on your device without sending the information to our servers. You can review the message before selecting Continue to WhatsApp. We receive it only after you select Send in WhatsApp. Data processing by WhatsApp is governed by its own privacy policy.",
      },
      {
        heading: "How We Use Data",
        body: "We use the information you share to respond to enquiries, review project requirements, and prepare a quotation or work agreement (Surat Perjanjian Kerja, SPK) if the engagement proceeds. We do not sell, rent, or trade your data with third parties.",
      },
      {
        heading: "Confidentiality & NDA",
        body: "We treat your technical information and business plans as confidential. A Non-Disclosure Agreement (NDA) can be agreed before technical discussions begin.",
      },
      {
        heading: "Storage & Retention",
        body: "Communication records and project documents are retained during the engagement and for any additional period required by Indonesian tax and company administration rules. You may request deletion of data that is no longer subject to these retention obligations.",
      },
      {
        heading: "Your Rights",
        body: "You may request access to, correction of, or deletion of the personal data we hold, and ask us to stop contacting you. Send your request to our official email address for a response during business days.",
      },
      {
        heading: "Third-Party Services",
        body: "This website links to WhatsApp and Google Maps. Use of those services is governed by each provider's privacy policy, and their data processing is outside our control. The website also uses Google Tag Manager and Google Analytics to measure usage. This measurement may use cookies and involve data processing by Google. You can block cookies through your browser settings.",
      },
    ],
    contactHeading: "Contacting Us",
    contactBefore: "For questions about this policy, contact",
    contactAfter: ` or to our office at ${siteConfig.address}.`,
    contactLink: "Contact page",
  },
};

/**
 * Written from the commitments the site already makes elsewhere: the five-stage
 * process in data/process.ts, the IP handover promise, and the milestone payment
 * structure described in the FAQ. Nothing here invents a new commercial term.
 */
export const termsCopy: Localized<LegalPageCopy & { stepsHeading: string }> = {
  id: {
    crumb: "Syarat & Ketentuan",
    title: "Syarat & Ketentuan Layanan",
    lede: `Ketentuan umum kerja sama proyek bersama ${siteConfig.brandName}. Ketentuan khusus tiap proyek mengikuti SPK yang ditandatangani kedua pihak.`,
    translationNote: null,
    sections: [
      {
        heading: "Ruang Lingkup Kerja Sama",
        body: "Setiap kerja sama diatur dalam Surat Perjanjian Kerja (SPK) yang menetapkan ruang lingkup, hasil pekerjaan, jadwal, dan nilai kontrak. Permintaan di luar ruang lingkup ditinjau dan disepakati melalui adendum, termasuk penyesuaian biaya dan jadwal, sebelum dikerjakan.",
      },
      {
        heading: "Tahapan Pengerjaan",
        body: "Proyek mengikuti lima tahap: pemetaan kebutuhan dan perancangan sistem, purwarupa dan validasi awal, pengembangan dengan demo berkala, pengujian mutu dan keamanan, serta serah terima. Klien dapat meninjau kemajuan melalui hasil kerja setiap tahap dan akses ke lingkungan uji coba selama pengembangan.",
      },
      {
        heading: "Termin Pembayaran",
        body: "Pembayaran dilakukan berdasarkan termin yang disepakati dalam SPK dan ditinjau bersama. Setiap termin disertai invoice resmi dengan NPWP perusahaan. Selama PT Karsa Swakarya Loka belum berstatus Pengusaha Kena Pajak (PKP), tagihan tidak dikenai PPN dan tidak disertai Faktur Pajak. Perubahan status dan ketentuan terkait akan disampaikan sebelum penagihan termin berikutnya.",
      },
      {
        heading: "Hak Kekayaan Intelektual",
        body: "Untuk pengembangan khusus, hak cipta atas hasil pekerjaan menjadi milik klien setelah Berita Acara Serah Terima (BAST) ditandatangani dan pembayaran diselesaikan. Serah terima mencakup repositori Git, struktur basis data, akses server, skema perangkat, dan file desain sesuai ruang lingkup proyek. Tidak ada biaya lisensi lanjutan atas hasil pekerjaan tersebut, dan klien dapat melanjutkan pengembangan dengan tim lain. Penggunaan platform siap pakai mengikuti perjanjian lisensi tersendiri.",
      },
      {
        heading: "Garansi & Dukungan",
        body: "Garansi perbaikan bug berlaku sesuai durasi dan cakupan dalam SPK untuk fungsi yang tidak berjalan sebagaimana disepakati. Garansi tidak mencakup fitur baru, perubahan ruang lingkup, atau kerusakan akibat modifikasi oleh pihak lain setelah serah terima.",
      },
      {
        heading: "Kerahasiaan",
        body: "Kami siap menandatangani Non-Disclosure Agreement (NDA) sebelum pembahasan teknis dimulai. Informasi bisnis, data operasional, dan rancangan sistem klien kami perlakukan sebagai informasi rahasia, selama maupun setelah masa kerja sama.",
      },
      {
        heading: "Penggunaan Materi Portofolio",
        body: "Hasil pekerjaan klien ditampilkan dalam portofolio hanya setelah mendapat persetujuan. Apabila klien meminta kerahasiaan, publikasi mengikuti batas persetujuan tersebut, termasuk tidak menampilkan proyek atau tidak mencantumkan identitas klien.",
      },
      {
        heading: "Badan Hukum & Penyelesaian Perselisihan",
        body: `Kerja sama dilaksanakan oleh ${siteConfig.companyName} (NIB ${siteConfig.nib}, KBLI ${siteText.id.kbli}), badan usaha yang terdaftar resmi melalui OSS Republik Indonesia. Perselisihan diselesaikan terlebih dahulu melalui musyawarah, dan bila diperlukan diteruskan sesuai forum hukum yang disepakati di dalam SPK.`,
      },
    ],
    stepsHeading: "Ringkasan Lima Tahap",
    contactHeading: "Pertanyaan Mengenai Ketentuan Layanan",
    contactBefore: "Untuk meninjau SPK, NDA, atau dokumen legal perusahaan, hubungi kami di",
    contactAfter: ".",
    contactLink: "Halaman Kontak",
  },
  en: {
    crumb: "Terms & Conditions",
    title: "Terms & Conditions of Service",
    lede: `General terms for project engagements with ${siteConfig.brandName}. Specific project terms are defined in the work agreement (SPK) signed by both parties.`,
    translationNote,
    sections: [
      {
        heading: "Scope of Engagement",
        body: "Each engagement is governed by a work agreement (Surat Perjanjian Kerja, SPK) defining scope, deliverables, schedule, and contract value. Requests outside the scope are reviewed and agreed through an addendum, including cost and schedule adjustments, before the work begins.",
      },
      {
        heading: "Project Stages",
        body: "Projects follow five stages: discovery and system design, prototyping and initial validation, development with regular demos, quality and security testing, and handover. Clients review progress through stage deliverables and access to a test environment during development.",
      },
      {
        heading: "Payment Stages",
        body: "Payments follow the milestones agreed in the SPK and reviewed jointly. Each milestone is supported by a formal invoice bearing the company's tax ID (NPWP). While PT Karsa Swakarya Loka is not VAT-registered (Pengusaha Kena Pajak, PKP), invoices do not include VAT or a tax invoice (Faktur Pajak). Any change in status and related terms will be communicated before the next milestone is invoiced.",
      },
      {
        heading: "Intellectual Property",
        body: "For custom development, copyright in the work transfers to the client once the handover certificate (Berita Acara Serah Terima, BAST) is signed and payment is complete. Handover covers the Git repository, database structure, server access, device schematics, and design files within the project scope. There is no ongoing licence fee for that work, and the client may continue development with another team. Ready-made platforms are governed by separate licensing agreements.",
      },
      {
        heading: "Warranty & Support",
        body: "The bug-fix warranty follows the duration and coverage defined in the SPK for functions that do not operate as agreed. It excludes new features, scope changes, and damage caused by third-party modifications after handover.",
      },
      {
        heading: "Confidentiality",
        body: "We are ready to sign a Non-Disclosure Agreement (NDA) before technical discussions begin. We treat clients' business information, operational data, and system designs as confidential, both during and after the engagement.",
      },
      {
        heading: "Use of Portfolio Material",
        body: "Client work is included in our portfolio only with approval. Where confidentiality is requested, publication follows the limits of that approval, including withholding the project or omitting the client's identity.",
      },
      {
        heading: "Legal Entity & Dispute Resolution",
        body: `Engagements are carried out by ${siteConfig.companyName} (NIB ${siteConfig.nib}, KBLI ${siteText.en.kbli}), a business entity officially registered through Indonesia's OSS system. Disputes are first settled by deliberation and, where needed, taken to the legal forum agreed in the SPK.`,
      },
    ],
    stepsHeading: "The Five Stages in Brief",
    contactHeading: "Questions About These Terms",
    contactBefore: "To review the SPK, NDA, or company legal documents, contact us at",
    contactAfter: ".",
    contactLink: "Contact page",
  },
};
