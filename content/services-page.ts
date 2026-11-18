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
  /** Button under the related projects when a field has more than the page shows. */
  proofMore: string;
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
      title: "Satu Mitra untuk",
      titleAccent: "Software, Desain & IoT",
      lede:
        "Website, aplikasi, identitas merek, hingga perangkat pemantauan, seluruhnya ditangani satu tim yang terintegrasi. Anda cukup berkoordinasi dengan satu mitra, dan setiap layanan berangkat dari tujuan bisnis Anda.",
    },
    pillarNavLabel: "Pilih layanan",
    supportNavLabel: "Layanan Pendamping",
    promises: ["Ditangani tim inti", "Garansi sesuai kontrak kerja", "Opsi dukungan setelah peluncuran"],
    overview: {
      badge: "Layanan Kami",
      title: "Tiga Bidang Keahlian, Satu Mitra",
      intro:
        "Pengembang, desainer, dan teknisi perangkat bekerja dalam satu tim, sehingga setiap hasil kerja saling selaras. Pilih layanan yang paling sesuai dengan prioritas bisnis Anda.",
      more: "Lihat rincian",
    },
    includedLabel: "Cakupan layanan",
    discuss: (shortName) => `Diskusikan ${shortName}`,
    discussMessage: (pillarName) => `Halo Tim KaryaLo, kami ingin berkonsultasi mengenai layanan ${pillarName}.`,
    sendBrief: "Kirim brief proyek",
    proofHeading: "Proyek terkait",
    proofMore: "Lihat selengkapnya",
    projectType: { client: "Proyek klien", product: "Produk KaryaLo", prototype: "Proyek internal" },
    iotNoProof: {
      heading: "Belum ada proyek IoT yang kami publikasikan",
      body:
        "Karena itu pengembangan dimulai dari perangkat uji coba dalam 7-14 hari kerja sesuai ruang lingkup yang disepakati, lalu diuji di lokasi Anda. Anda dapat menilai kinerjanya sebelum memutuskan penerapan lebih luas.",
      cta: "Diskusikan uji coba IoT",
      message: "Halo Tim KaryaLo, kami ingin mendiskusikan perangkat IoT uji coba untuk dipasang di lokasi kami.",
    },
    support: {
      badge: "Layanan Pendamping",
      heading: "Pendampingan dari Perencanaan hingga Pemeliharaan",
      intro:
        "Untuk proyek baru, kami membantu memetakan kebutuhan sebelum pengembangan dimulai. Untuk sistem yang sudah berjalan, kami menjaga keamanan dan kelancarannya. Pilih pendampingan sesuai tahap bisnis Anda.",
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
        title: "Siap Tumbuh Bersama Bisnis Anda",
        description: "Teknologi yang umum digunakan dan struktur yang terdokumentasi memudahkan pemeliharaan serta pengembangan sistem seiring pertumbuhan bisnis.",
      },
      {
        title: "Garansi Setelah Rilis",
        description: "Garansi perbaikan error selama 30-90 hari setelah peluncuran, dengan cakupan dan durasi yang ditetapkan dalam kontrak kerja.",
      },
    ],
  },
  en: {
    hero: {
      title: "One Partner for",
      titleAccent: "Software, Design & IoT",
      lede:
        "Websites, apps, brand identity, through to monitoring devices, all handled by one integrated team. You coordinate with a single partner, and every service starts from your business goals.",
    },
    pillarNavLabel: "Choose a service",
    supportNavLabel: "Supporting Services",
    promises: ["Delivered by our core team", "Warranty set out in the contract", "Post-launch support options"],
    overview: {
      badge: "Our Services",
      title: "Three Areas of Expertise, One Partner",
      intro:
        "Developers, designers, and device engineers work in one team, so everything we deliver fits together. Choose the service that best fits your business priorities.",
      more: "See details",
    },
    includedLabel: "What's included",
    discuss: (shortName) => `Discuss ${shortName}`,
    discussMessage: (pillarName) => `Hello KaryaLo, we'd like to discuss your ${pillarName} service.`,
    sendBrief: "Send a project brief",
    proofHeading: "Related projects",
    proofMore: "See more projects",
    projectType: { client: "Client project", product: "KaryaLo product", prototype: "Internal project" },
    iotNoProof: {
      heading: "No IoT project published yet",
      body:
        "Development therefore begins with a test device in 7-14 working days for the agreed scope, tested at your site. You can assess its performance before deciding on a wider rollout.",
      cta: "Discuss an IoT test device",
      message: "Hello KaryaLo team, we would like to discuss an IoT test device for our site.",
    },
    support: {
      badge: "Supporting Services",
      heading: "Support from Planning through Maintenance",
      intro:
        "For new projects, we help map requirements before development begins. For systems already running, we keep them secure and stable. Choose the support that fits your stage.",
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
        description: "Widely used technology and a documented structure keep the system easy to maintain and extend as your business grows.",
      },
      {
        title: "Warranty After Release",
        description: "A 30-90 day error-fix warranty after launch, with coverage and duration set out in the contract.",
      },
    ],
  },
};

/** The pillar whose empty proof list gets the IoT sample-device block instead. */
export const IOT_PILLAR_ID: ServicePillar["id"] = "iot-hardware";

