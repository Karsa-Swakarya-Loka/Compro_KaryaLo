import type { Localized } from "@/lib/i18n";

/**
 * /about copy, both languages.
 *
 * Vision and mission are drafted from the Extended IT Partner positioning
 * (2026-10-15) and the commitments the site already makes; the founder should
 * confirm the wording. The team block lists functions, not people: names are
 * not published (founder's decision, 2026-10-15). The functions mirror the
 * roles in SK 014/DIR-KSL/SK/X/2026.
 */

type TeamIcon = "management" | "engineering" | "design" | "iot" | "admin";

export interface AboutCopy {
  /** The small pill over each section title (Cargon's section badge). */
  badges: { studio: string; vision: string; team: string; process: string; coverage: string };
  hero: { title: string; accent: string; lede: string; chips: string[] };
  studio: {
    title: string;
    body: string;
    /** Two-column check list; each line restates a commitment made elsewhere on the site. */
    points: string[];
    promiseLabel: string;
    promiseBody: string;
    imageAlt: string;
    cta: string;
  };
  vision: { eyebrow: string; visionLabel: string; vision: string; missionLabel: string; missions: string[] };
  team: { title: string; intro: string; units: { icon: TeamIcon; name: string; body: string }[] };
  process: { title: string; intro: string; termsLink: string; youGet: string };
  coverage: { title: string; areaTitle: string; areaBody: string; modelTitle: string; modelBody: string };
  legal: { nibLabel: string; nibSource: string; kbliLabel: string; addressLabel: string; maps: string };
}

export const aboutCopy: Localized<AboutCopy> = {
  id: {
    badges: {
      studio: "Tentang KaryaLo",
      vision: "Visi & Misi",
      team: "Tim Kami",
      process: "Cara Kerja",
      coverage: "Lokasi & Legalitas",
    },
    hero: {
      title: "IT Agency untuk",
      accent: "Bisnis yang Sedang Tumbuh",
      lede:
        "Bisnis yang sedang tumbuh membutuhkan teknologi yang menopang, bukan menambah beban. KaryaLo menyatukan software, desain, foto dan video, IoT, serta pengadaan perangkat keras dalam satu tim, dan mendampingi Anda sejak perencanaan hingga sistem benar-benar digunakan.",
      chips: ["Terdaftar di Kementerian Hukum RI", "NIB", "Kota Bekasi, Jawa Barat"],
    },
    studio: {
      title: "Satu Tim untuk Software, Desain, dan Perangkat",
      body:
        "Di studio dan bengkel perangkat kami di Kota Bekasi, pengembang, desainer, dan teknisi bekerja berdampingan. Tampilan, fungsi sistem, dan perangkat Anda dirancang selaras sejak awal, dengan penanggung jawab yang jelas.",
      points: [
        "Pengembang, desainer & teknisi dalam satu tim",
        "Proyek ditangani langsung oleh tim inti",
        "Demo dicoba dulu sebelum pengembangan",
        "Kepemilikan hasil kerja diatur dalam kontrak kerja",
      ],
      promiseLabel: "Kejelasan Kepemilikan dan Serah Terima",
      promiseBody:
        "Untuk proyek khusus, kode sumber, dokumentasi, dan file desain diserahkan sesuai kontrak kerja setelah serah terima dan pembayaran selesai. Kami melatih tim Anda untuk mengelola sistem serta menyediakan opsi pemeliharaan lanjutan.",
      imageAlt: "Ruang studio KaryaLo dengan meja kerja pengembangan software",
      cta: "Lihat layanan kami",
    },
    vision: {
      eyebrow: "Arah Kami",
      visionLabel: "Visi",
      vision:
        "Menjadi mitra teknologi yang dipercaya perusahaan di Indonesia untuk mengembangkan solusi digital yang bermanfaat, mudah digunakan, dan mendukung pertumbuhan bisnis.",
      missionLabel: "Misi",
      missions: [
        "Merancang solusi berdasarkan proses kerja, kebutuhan pengguna, dan tujuan bisnis klien.",
        "Menjalankan proyek dengan ruang lingkup yang jelas, evaluasi berkala, dan komunikasi yang terbuka.",
        "Mengintegrasikan keahlian software, desain, dan IoT untuk menghasilkan solusi yang selaras.",
        "Menyediakan serah terima, dokumentasi, dan pelatihan agar klien dapat mengelola hasil pekerjaan.",
        "Mendukung keberlanjutan sistem melalui pemeliharaan dan pengembangan setelah peluncuran.",
      ],
    },
    team: {
      title: "Siapa yang Mengerjakan Proyek Anda",
      intro:
        "Lima fungsi dalam tim inti KaryaLo, masing-masing dengan tanggung jawab yang jelas, menjaga kualitas teknis, desain, dan pelaksanaan proyek Anda.",
      units: [
        {
          icon: "management",
          name: "Manajemen & Arah Bisnis",
          body: "Menetapkan arah perusahaan, mengelola hubungan klien, dan memastikan setiap proyek memiliki penanggung jawab yang jelas.",
        },
        {
          icon: "engineering",
          name: "Teknologi & Rekayasa Software",
          body: "Merancang struktur sistem, memimpin pengerjaan harian, dan menjaga kualitas kode dari awal sampai serah terima.",
        },
        {
          icon: "design",
          name: "Desain & Pemasaran",
          body: "Merancang tampilan aplikasi, identitas merek, dan materi komunikasi yang mudah dipahami serta konsisten di setiap kanal.",
        },
        {
          icon: "iot",
          name: "Perangkat IoT",
          body: "Merancang, memprogram, dan menguji perangkat pemantauan, termasuk pemasangan serta penyetelan di lokasi proyek.",
        },
        {
          icon: "admin",
          name: "Administrasi & Keuangan",
          body: "Mengelola kontrak, invoice, dan administrasi proyek untuk mendukung kerja sama yang tertib dan terdokumentasi.",
        },
      ],
    },
    process: {
      title: "Cara Kami Menjalankan Proyek",
      intro:
        "Lima tahap dengan hasil kerja dan titik evaluasi yang disepakati sejak awal. Anda selalu dapat meninjau hasilnya sebelum melanjutkan ke tahap berikutnya.",
      termsLink: "Baca ketentuan kerja sama",
      youGet: "Yang Anda terima",
    },
    coverage: {
      title: "Di Mana dan Bagaimana Kami Bekerja",
      areaTitle: "Area Layanan",
      areaBody:
        "Kantor dan bengkel perangkat kami berlokasi di Jatisampurna, Kota Bekasi. Pertemuan langsung di Jabodetabek dapat dijadwalkan, sementara klien di seluruh Indonesia dapat berkolaborasi secara daring. Kunjungan pemasangan dan penyetelan perangkat IoT diatur sesuai kebutuhan proyek.",
      modelTitle: "Model Kerja Sama",
      modelBody:
        "Setiap proyek memiliki kontrak kerja resmi (SPK) yang menetapkan ruang lingkup, jadwal, dan tahap pembayaran. Invoice diterbitkan atas nama perusahaan, dan NDA dapat disepakati sebelum diskusi teknis. Kepemilikan hasil kerja mengikuti ketentuan serah terima dan pembayaran dalam kontrak kerja. Pemeliharaan lanjutan tersedia secara bulanan atau tahunan.",
    },
    legal: {
      nibLabel: "Nomor Induk Berusaha (NIB)",
      nibSource: "Online Single Submission (OSS)",
      kbliLabel: "Klasifikasi Baku Lapangan Usaha Indonesia (KBLI)",
      addressLabel: "Alamat Kantor & Studio",
      maps: "Buka di Google Maps",
    },
  },
  en: {
    badges: {
      studio: "About KaryaLo",
      vision: "Vision & Mission",
      team: "Our Team",
      process: "How We Work",
      coverage: "Location & Legal",
    },
    hero: {
      title: "An IT Agency for",
      accent: "Growing Businesses",
      lede:
        "A growing business needs technology that carries the load, not adds to it. KaryaLo brings software, design, photo and video, IoT, and hardware supply into one team, and stays with you from planning until the system is genuinely in use.",
      chips: ["Registered with the Indonesian Ministry of Law", "Business ID (NIB)", "Bekasi, West Java"],
    },
    studio: {
      title: "One Team for Software, Design, and Devices",
      body:
        "In our Bekasi studio and device workshop, developers, designers, and engineers work side by side. Your app screens, system logic, and hardware are designed to fit together from day one, with clear accountability.",
      points: [
        "Developers, designers & engineers in one team",
        "Direct delivery by our core team",
        "Demo tried out before development",
        "Ownership set out in the contract",
      ],
      promiseLabel: "Clear Ownership and Handover",
      promiseBody:
        "For custom projects, the source code, documentation, and design files are handed over under the contract once handover and payment are complete. We train your team to manage the system and offer ongoing maintenance options.",
      imageAlt: "The KaryaLo studio with software development workstations",
      cta: "See our services",
    },
    vision: {
      eyebrow: "Where We're Heading",
      visionLabel: "Vision",
      vision:
        "To be the technology partner Indonesian companies trust to develop practical, accessible digital solutions that support business growth.",
      missionLabel: "Mission",
      missions: [
        "Design solutions around client workflows, user needs, and business goals.",
        "Deliver projects with a defined scope, regular reviews, and open communication.",
        "Combine software, design, and IoT expertise to create coordinated solutions.",
        "Provide handover, documentation, and training so clients can manage the delivered work.",
        "Support systems beyond launch through ongoing maintenance and development.",
      ],
    },
    team: {
      title: "Who Works on Your Project",
      intro:
        "Five functions in KaryaLo's core team, each with clear responsibilities, look after the technical quality, design, and delivery of your project.",
      units: [
        {
          icon: "management",
          name: "Management & Business Direction",
          body: "Sets the company's direction, looks after client relationships, and makes sure every project has a clear owner.",
        },
        {
          icon: "engineering",
          name: "Technology & Software Engineering",
          body: "Designs how the system is structured, leads development, and maintains code quality from planning through handover.",
        },
        {
          icon: "design",
          name: "Design & Marketing",
          body: "Designs app screens, brand identities, and communication materials so products are easy to use and consistent.",
        },
        {
          icon: "iot",
          name: "IoT Devices",
          body: "Assembles, programs, and tests monitoring devices, including installing and setting them up on site.",
        },
        {
          icon: "admin",
          name: "Administration & Finance",
          body: "Manages contracts, invoices, and project administration to keep every engagement organised and documented.",
        },
      ],
    },
    process: {
      title: "How We Run a Project",
      intro:
        "Five stages, with outputs and review points agreed at the start. You always see the results before moving on to the next stage.",
      termsLink: "Read our terms of engagement",
      youGet: "What you receive",
    },
    coverage: {
      title: "Where and How We Work",
      areaTitle: "Where We Work",
      areaBody:
        "Our office and device workshop are in Jatisampurna, Bekasi. In-person meetings across Greater Jakarta can be scheduled, while clients throughout Indonesia can collaborate remotely. IoT installation and set-up visits are arranged according to project needs.",
      modelTitle: "How We Engage",
      modelBody:
        "Each project has a formal contract (SPK) setting out scope, schedule, and payment stages. Invoices are issued in the company's name, and an NDA can be agreed before technical discussions. Ownership follows the handover and payment terms in the contract. Ongoing maintenance is available monthly or annually.",
    },
    legal: {
      nibLabel: "Business Identification Number (NIB)",
      nibSource: "Online Single Submission (OSS)",
      kbliLabel: "Business Classification (KBLI)",
      addressLabel: "Office & Studio Address",
      maps: "Open in Google Maps",
    },
  },
};
