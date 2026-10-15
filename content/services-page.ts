import type { Localized } from "@/lib/i18n";
import type { ServicePillar, SupportService } from "@/data/services";

/**
 * Words on /services that are not service data. The services themselves come
 * from data/services.ts; this is the page around them.
 */
export const servicesPageCopy: Localized<{
  hero: { title: string; titleAccent: string; lede: string };
  pillarNavLabel: string;
  /** Short label for the jump link to the #support section. */
  supportNavLabel: string;
  promises: string[];
  /** The Cargon "range of services" strip under the banner: one card per field plus support. */
  overview: { badge: string; title: string; intro: string; more: string };
  /** Label over each pillar's sub-service cards. */
  includedLabel: string;
  discuss: (shortName: string) => string;
  discussMessage: (pillarName: string) => string;
  sendBrief: string;
  proofHeading: string;
  projectType: { client: string; product: string; prototype: string };
  /** Shown in place of the proof list while the IoT field has no published project. */
  iotNoProof: { heading: string; body: string; cta: string; message: string };
  support: {
    badge: string;
    heading: string;
    intro: string;
    cta: string;
    messages: Record<SupportService["id"], string>;
  };
  guaranteesLabel: string;
  guaranteesBadge: string;
  guaranteesTitle: string;
  guarantees: { title: string; description: string }[];
}> = {
  id: {
    hero: {
      title: "Satu Tim IT untuk",
      titleAccent: "Software, Desain & IoT",
      lede:
        "Dari website dan aplikasi hingga identitas merek dan perangkat pemantauan, kami mengoordinasikan kebutuhan teknologi Anda dalam satu tim. Setiap layanan dimulai dari tujuan bisnis yang jelas dan dapat dilengkapi dukungan setelah peluncuran.",
    },
    pillarNavLabel: "Pilih layanan",
    supportNavLabel: "Layanan Pendamping",
    promises: ["Ditangani tim inti", "Garansi sesuai SPK", "Opsi dukungan setelah peluncuran"],
    overview: {
      badge: "Layanan Kami",
      title: "Tiga Bidang Keahlian, Satu Mitra",
      intro:
        "Pengembang, desainer, dan teknisi perangkat bekerja bersama untuk menghasilkan solusi yang selaras. Jelajahi layanan yang sesuai dengan prioritas bisnis Anda.",
      more: "Lihat rincian",
    },
    includedLabel: "Cakupan layanan",
    discuss: (shortName) => `Diskusikan ${shortName}`,
    discussMessage: (pillarName) => `Halo Tim KaryaLo, kami ingin berkonsultasi mengenai layanan ${pillarName}.`,
    sendBrief: "Kirim brief proyek",
    proofHeading: "Proyek terkait",
    projectType: { client: "Proyek klien", product: "Produk KaryaLo", prototype: "Purwarupa internal" },
    iotNoProof: {
      heading: "Belum ada proyek IoT yang kami publikasikan",
      body:
        "Pengembangan dimulai dengan purwarupa perangkat dalam 7–14 hari kerja sesuai ruang lingkup yang disepakati. Pengujian di lokasi membantu menilai kesesuaian perangkat sebelum penerapan lebih luas.",
      cta: "Diskusikan purwarupa IoT",
      message: "Halo Tim KaryaLo, kami ingin mendiskusikan pengembangan purwarupa IoT untuk diuji di lokasi kami.",
    },
    support: {
      badge: "Layanan Pendamping",
      heading: "Dukungan dari Perencanaan hingga Pemeliharaan",
      intro:
        "Mulai dengan pemetaan kebutuhan yang terarah, lalu jaga keberlanjutan sistem melalui pemeliharaan berkala. Pilih pendampingan sesuai tahap dan kebutuhan bisnis Anda.",
      cta: "Tanyakan lewat WhatsApp",
      messages: {
        maintenance: "Halo KaryaLo, kami ingin menanyakan layanan perawatan dan pendampingan sistem.",
        scoping: "Halo KaryaLo, kami ingin dibantu memetakan kebutuhan sistem sebelum memulai proyek.",
      },
    },
    guaranteesLabel: "Komitmen layanan",
    guaranteesBadge: "Komitmen Kami",
    guaranteesTitle: "Dirancang untuk Penggunaan Jangka Panjang",
    guarantees: [
      {
        title: "Mendukung Perkembangan Bisnis",
        description: "Teknologi yang umum digunakan dan struktur yang terdokumentasi memudahkan pemeliharaan serta pengembangan sistem berikutnya.",
      },
      {
        title: "Garansi Setelah Rilis",
        description: "Garansi perbaikan bug selama 30–90 hari setelah peluncuran, dengan cakupan dan durasi yang ditetapkan dalam SPK.",
      },
    ],
  },
  en: {
    hero: {
      title: "One IT Team for",
      titleAccent: "Software, Design & IoT",
      lede:
        "From websites and applications to brand identity and monitoring devices, we coordinate your technology needs within one team. Every service starts with a clear business goal and can include support beyond launch.",
    },
    pillarNavLabel: "Choose a service",
    supportNavLabel: "Supporting Services",
    promises: ["Delivered by our core team", "Warranty defined in the SPK", "Post-launch support options"],
    overview: {
      badge: "Our Services",
      title: "Three Areas of Expertise, One Partner",
      intro:
        "Developers, designers, and device engineers collaborate to deliver coordinated solutions. Explore the services that match your business priorities.",
      more: "See details",
    },
    includedLabel: "What's included",
    discuss: (shortName) => `Discuss ${shortName}`,
    discussMessage: (pillarName) => `Hello KaryaLo, we'd like to discuss your ${pillarName} service.`,
    sendBrief: "Send a project brief",
    proofHeading: "Related projects",
    projectType: { client: "Client project", product: "KaryaLo product", prototype: "Internal prototype" },
    iotNoProof: {
      heading: "No IoT project published yet",
      body:
        "Development begins with a device prototype in 7–14 working days within the agreed scope. On-site testing helps assess suitability before wider deployment.",
      cta: "Discuss an IoT prototype",
      message: "Hello KaryaLo team, we would like to discuss an IoT prototype for testing at our site.",
    },
    support: {
      badge: "Supporting Services",
      heading: "Support from Planning through Maintenance",
      intro:
        "Begin with a clear scope and support your systems through regular maintenance. Choose the level of support that fits your business and project stage.",
      cta: "Ask on WhatsApp",
      messages: {
        maintenance: "Hello KaryaLo, we'd like to ask about system maintenance and support.",
        scoping: "Hello KaryaLo, we'd like help scoping a system before starting a project.",
      },
    },
    guaranteesLabel: "Service commitments",
    guaranteesBadge: "Our Commitments",
    guaranteesTitle: "Designed for Long-Term Use",
    guarantees: [
      {
        title: "Ready to Grow With Your Business",
        description: "Widely used technology and a documented structure support ongoing maintenance and future development.",
      },
      {
        title: "Warranty After Release",
        description: "A 30–90 day bug-fix warranty after launch, with coverage and duration defined in the work agreement.",
      },
    ],
  },
};

/** The pillar whose empty proof list gets the IoT sample-device block instead. */
export const IOT_PILLAR_ID: ServicePillar["id"] = "iot-hardware";

