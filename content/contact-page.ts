import type { Localized } from "@/lib/i18n";

/**
 * Words on /contact. The service options come from data/services.ts so the form
 * names the same fields the Services page does; only the two catch-all choices
 * live here. Budget ranges stay in rupiah in both languages — that is the
 * currency every quotation is issued in.
 */
export const contactCopy: Localized<{
  hero: {
    titleLead: string;
    titleAccent: string;
    lede: string;
    badges: string[];
    /** The page's primary action: open WhatsApp straight away. */
    whatsappCta: string;
    /** Lead-in before the email link beside it. */
    emailLead: string;
  };
  form: {
    heading: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    serviceCombined: string;
    serviceUnsure: string;
    budgetLabel: string;
    budgetRanges: string[];
    budgetUndecided: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionHelp: string;
    whitespaceError: string;
    submit: string;
    preparing: string;
    confidentiality: string;
    previewLabel: string;
    previewStatus: string;
    continueToWhatsapp: string;
    previewHint: string;
    sentStatus: string;
    sentHint: string;
    /** Line labels of the WhatsApp message the form assembles. */
    message: { greeting: string; name: string; company: string; service: string; budget: string; needs: string };
  };
  channels: {
    heading: string;
    whatsappTitle: string;
    whatsappSubtitle: string;
    emailTitle: string;
    hoursTitle: string;
    mapsLink: string;
  };
  before: {
    badge: string;
    heading: string;
    intro: string;
    cards: { title: string; body: string }[];
    coverage: { title: string; body: string };
    browse: { title: string; body: string; services: string; portfolio: string };
  };
}> = {
  id: {
    hero: {
      titleLead: "Ceritakan Kebutuhan",
      titleAccent: "Proyek Anda",
      lede: "Sampaikan tantangan operasional atau rencana pengembangan Anda. Tim kami akan membantu menentukan prioritas, meninjau kebutuhan, dan menyusun ruang lingkup awal tanpa kewajiban melanjutkan proyek.",
      badges: ["Dilayani pada jam kerja", "NDA tersedia sebelum diskusi teknis"],
      whatsappCta: "Diskusikan via WhatsApp",
      emailLead: "atau email ke",
    },
    form: {
      heading: "Formulir Kebutuhan Proyek",
      intro: "Lengkapi ringkasan kebutuhan Anda untuk menyiapkan pesan WhatsApp. Anda dapat meninjaunya sebelum mengirim. Kolom bertanda * wajib diisi.",
      nameLabel: "Nama Lengkap *",
      namePlaceholder: "Nama lengkap Anda",
      companyLabel: "Nama Perusahaan / Organisasi *",
      companyPlaceholder: "Nama perusahaan atau organisasi Anda",
      serviceLabel: "Layanan yang Dibutuhkan *",
      servicePlaceholder: "Pilih layanan",
      serviceCombined: "Gabungan beberapa layanan",
      serviceUnsure: "Memerlukan rekomendasi layanan",
      budgetLabel: "Perkiraan Anggaran",
      budgetRanges: [
        "< Rp 25.000.000",
        "Rp 25.000.000 sampai Rp 50.000.000",
        "Rp 50.000.000 sampai Rp 100.000.000",
        "≥ Rp 100.000.000",
      ],
      budgetUndecided: "Belum ditentukan",
      descriptionLabel: "Ringkasan Kebutuhan Proyek *",
      descriptionPlaceholder: "Jelaskan tujuan proyek, proses kerja saat ini, fitur utama, dan target waktu peluncuran.",
      descriptionHelp: "Sertakan tujuan, fitur utama, dan perkiraan waktu peluncuran. Maksimal 3.000 karakter.",
      whitespaceError: "Masukkan informasi yang diperlukan. Kolom ini tidak dapat diisi hanya dengan spasi.",
      submit: "Siapkan Pesan WhatsApp",
      preparing: "Menyiapkan Pesan…",
      confidentiality: "Isi pesan Anda kami perlakukan sebagai informasi rahasia.",
      previewLabel: "Pratinjau pesan WhatsApp",
      previewStatus: "Pesan siap ditinjau. Belum ada pesan yang dikirim.",
      continueToWhatsapp: "Lanjutkan ke WhatsApp",
      sentStatus: "Kebutuhan proyek Anda sudah kami terima di support@karyalo.com.",
      sentHint: "Tim kami akan membalas lewat email. Untuk respons lebih cepat, Anda juga dapat melanjutkan ke WhatsApp.",
      previewHint: "WhatsApp akan terbuka di tab baru. Pesan baru dikirim setelah Anda menekan Kirim di WhatsApp.",
      message: {
        greeting: "Halo Tim KaryaLo,",
        name: "Nama",
        company: "Perusahaan",
        service: "Layanan yang dibutuhkan",
        budget: "Perkiraan anggaran",
        needs: "Kebutuhan kami:",
      },
    },
    channels: {
      heading: "Kontak Langsung",
      whatsappTitle: "WhatsApp Bisnis Resmi",
      whatsappSubtitle: "Diskusi awal dan pertanyaan layanan",
      emailTitle: "Email",
      hoursTitle: "Jam Kerja",
      mapsLink: "Buka di Google Maps",
    },
    before: {
      badge: "Persiapan",
      heading: "Awali Diskusi dengan Gambaran Kebutuhan Anda",
      intro: "Dokumen lengkap belum diperlukan untuk konsultasi awal. Gambaran tentang tiga hal berikut membantu kami memahami kebutuhan dan memberikan arahan yang relevan.",
      cards: [
        {
          title: "Tantangan dan tujuan proyek",
          body: "Jelaskan kondisi saat ini, kendala utama, dan hasil yang ingin dicapai. Informasi ini membantu kami menentukan prioritas solusi.",
        },
        {
          title: "Target waktu peluncuran",
          body: "Sampaikan kapan sistem diharapkan mulai digunakan. Perkiraan waktu membantu kami menyusun tahapan dan menilai kelayakan jadwal.",
        },
        {
          title: "Sistem yang digunakan saat ini",
          body: "Cantumkan aplikasi, spreadsheet, atau perangkat yang mendukung operasional Anda. Kami akan meninjau peluang integrasi dan bagian yang perlu dikembangkan.",
        },
      ],
      coverage: {
        title: "Melayani bisnis di seluruh Indonesia",
        body: "Berbasis di Jatisampurna, Kota Bekasi, kami melayani pertemuan langsung di Jabodetabek dan kolaborasi daring di seluruh Indonesia. Kunjungan untuk pemasangan perangkat IoT dijadwalkan sesuai kebutuhan proyek.",
      },
      browse: {
        title: "Kenali layanan dan hasil pekerjaan kami",
        body: "Pelajari cakupan layanan kami, lalu jelajahi proyek klien, produk KaryaLo, dan purwarupa internal untuk menemukan referensi yang sesuai.",
        services: "Lihat layanan",
        portfolio: "Lihat portofolio",
      },
    },
  },
  en: {
    hero: {
      titleLead: "Tell Us About",
      titleAccent: "Your Project",
      lede: "Share your operational challenges or development plans. Our team will help identify priorities, review your requirements, and outline an initial scope, with no obligation to proceed.",
      badges: ["Available during business hours", "NDA available before technical discussions"],
      whatsappCta: "Discuss on WhatsApp",
      emailLead: "or email",
    },
    form: {
      heading: "Project Brief Form",
      intro: "Summarise your requirements to prepare a WhatsApp message. You can review it before sending. Fields marked * are required.",
      nameLabel: "Full Name *",
      namePlaceholder: "Your full name",
      companyLabel: "Company / Organisation Name *",
      companyPlaceholder: "Your company or organization name",
      serviceLabel: "Service Needed *",
      servicePlaceholder: "Choose a service",
      serviceCombined: "A combination of services",
      serviceUnsure: "I would like a service recommendation",
      budgetLabel: "Estimated Budget",
      budgetRanges: [
        "< Rp 25.000.000",
        "Rp 25.000.000 sampai Rp 50.000.000",
        "Rp 50.000.000 sampai Rp 100.000.000",
        "≥ Rp 100.000.000",
      ],
      budgetUndecided: "Not decided yet",
      descriptionLabel: "Project Summary *",
      descriptionPlaceholder: "Describe your project goals, current workflow, key features, and target launch date.",
      descriptionHelp: "Include your goals, main features, and a rough launch date. Up to 3,000 characters.",
      whitespaceError: "Enter the required information. This field cannot contain only spaces.",
      submit: "Prepare WhatsApp Message",
      preparing: "Preparing Message…",
      confidentiality: "We treat the content of your message as confidential.",
      previewLabel: "WhatsApp message preview",
      previewStatus: "Message ready to review. Nothing has been sent yet.",
      continueToWhatsapp: "Continue to WhatsApp",
      sentStatus: "Your brief has reached us at support@karyalo.com.",
      sentHint: "Our team will reply by email. For a faster response you can also continue on WhatsApp.",
      previewHint: "WhatsApp will open in a new tab. Your message is only sent when you select Send in WhatsApp.",
      message: {
        greeting: "Hello KaryaLo team,",
        name: "Name",
        company: "Company",
        service: "Service needed",
        budget: "Estimated budget",
        needs: "What we need:",
      },
    },
    channels: {
      heading: "Direct Contact",
      whatsappTitle: "Official WhatsApp Business",
      whatsappSubtitle: "Initial consultations and service enquiries",
      emailTitle: "Email",
      hoursTitle: "Business Hours",
      mapsLink: "Open in Google Maps",
    },
    before: {
      badge: "Before You Write",
      heading: "Help Us Understand Your Project",
      intro: "You do not need a complete specification for an initial consultation. An overview of the following three areas helps us understand your needs and offer relevant guidance.",
      cards: [
        {
          title: "Challenges and project goals",
          body: "Describe your current situation, main challenges, and intended outcomes. This helps us identify the priorities for your solution.",
        },
        {
          title: "Target launch date",
          body: "Let us know when you expect to start using the system. An estimated date helps us plan delivery stages and assess the schedule.",
        },
        {
          title: "Your existing systems",
          body: "List the applications, spreadsheets, or devices that support your operations. We will review integration opportunities and areas that need development.",
        },
      ],
      coverage: {
        title: "Supporting businesses across Indonesia",
        body: "Based in Jatisampurna, Bekasi, we offer in-person meetings across Greater Jakarta and remote collaboration throughout Indonesia. IoT installation visits are scheduled according to project needs.",
      },
      browse: {
        title: "Explore our services and work",
        body: "Review our service scope, then explore client projects, KaryaLo products, and internal prototypes for references relevant to your plans.",
        services: "See our services",
        portfolio: "See our portfolio",
      },
    },
  },
};

