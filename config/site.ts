import type { Locale, Localized } from "@/lib/i18n";

/**
 * One phone number, written once.
 * `wa.me` needs bare international digits — no "+", no spaces, no leading zero —
 * while the page displays the readable form, so the two used to be typed out
 * separately and drifted apart (both sat on a placeholder). Deriving the link
 * from the displayed number makes disagreeing impossible.
 *
 * Keep this in +62 international form. A local "08..." would derive a wa.me
 * number that silently fails to resolve.
 */
const phone = "+62 899-7475-888";
const whatsappNumber = phone.replace(/[^0-9]/g, "");

/** Facts that read the same in every language. */
export const siteConfig = {
  /** Canonical production origin. Used for metadataBase, sitemap, robots and JSON-LD @id. */
  url: "https://karyalo.com",
  companyName: "PT Karsa Swakarya Loka",
  brandName: "KaryaLo Digital Solution",
  nib: "3005260047228",
  kbliCode: "62019",
  /**
   * Pengesahan badan hukum: Keputusan Menteri Hukum RI, ditetapkan 30 Mei 2026.
   * Source: Projects/10_LEGAL_COMPANY/01_AKTA_DAN_AHU/Surat Keputusan Kementrian Hukum & HAM.pdf
   */
  skAhu: "AHU-A092678.AH.01.30.Tahun 2026",
  foundingDate: "2026-05-30",
  address: "Jl. Al-Falah II, Jatiranggon, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17432",
  mapsUrl: "https://maps.app.goo.gl/3YrD56ctLmne1fGR8",
  email: "support@karyalo.com",
  /** Company profile PDF served from /public/downloads. */
  companyProfilePdf: "/downloads/Company-Profile-KaryaLo.pdf",
  phone,
  /**
   * Public profiles that independently corroborate this entity, used for schema `sameAs`.
   * Google Business Profile is confirmed (same listing as `mapsUrl`). Add the LinkedIn
   * company page URL here once it exists.
   */
  sameAs: ["https://maps.app.goo.gl/3YrD56ctLmne1fGR8"] as string[],
};

/**
 * The same facts, in words that change with the language.
 *
 * `positioning` is the category the brand claims (decided by the founder on
 * 2026-10-15, recorded in 02_COMPANY_PROFILE_BRAND). `tagline` is the slogan
 * that closes the brand; it replaced "Bukan yang paling canggih. Yang paling
 * terpakai." on the same date. Change either here and every page, the schema
 * and llms.txt follow.
 */
export const siteText: Localized<{
  positioning: string;
  tagline: string;
  description: string;
  workingHours: string;
  legalEntity: string;
  kbli: string;
  location: string;
  defaultWhatsappMessage: string;
}> = {
  id: {
    positioning: "IT Agency",
    tagline: "Satu mitra, dari ide hingga implementasi.",
    description:
      "IT agency dan software house dari Kota Bekasi: pengembangan software, desain, foto dan video, IoT, serta pengadaan komputer dan perangkat jaringan. Kami mendampingi bisnis Anda dari perencanaan hingga implementasi dan pemeliharaan.",
    workingHours: "Senin sampai Jumat: 09.00 sampai 18.00 WIB | Sabtu & Minggu: dengan janji temu",
    legalEntity: "Perseroan Perorangan (SK Kementerian Hukum RI)",
    kbli: "62019: Aktivitas Pemrograman Komputer Lainnya",
    location: "Kota Bekasi, Jawa Barat",
    defaultWhatsappMessage:
      "Halo Tim KaryaLo, kami ingin berkonsultasi mengenai kebutuhan software, desain, atau perangkat IoT untuk perusahaan kami.",
  },
  en: {
    positioning: "IT Agency",
    tagline: "One partner, from idea to implementation.",
    description:
      "An IT agency and software house in Bekasi, Indonesia: software development, design, photo and video, IoT, and supply of computers and networking hardware. We support your business from planning through implementation and maintenance.",
    workingHours: "Monday to Friday: 09:00 to 18:00 WIB (UTC+7) | Saturday & Sunday: by appointment",
    legalEntity: "Sole-owner limited company (Perseroan Perorangan), ratified by the Indonesian Ministry of Law",
    kbli: "62019: Other Computer Programming Activities",
    location: "Bekasi, West Java, Indonesia",
    defaultWhatsappMessage:
      "Hello KaryaLo team, I'd like to discuss our software, design, or IoT needs.",
  },
};

export const siteFeatures = {
  // Single switch for the /products route. The page stays out of the navbar
  // (the navbar is fixed at six entries) and is reached from the home page and
  // the footer; set this to false to remove it from routing, those links and
  // the sitemap in one place.
  enableProductsSection: true,
  enableClientLogosBar: false,  // Di-hold sesuai keputusan PRD
};

const WA_TEXT = {
  id: {
    greeting: "Halo Tim KaryaLo,",
    intro: "Saya ingin berkonsultasi mengenai kebutuhan berikut:",
    name: "Nama",
    company: "Perusahaan/Instansi",
    service: "Jenis Layanan",
    budget: "Perkiraan Anggaran/Target Waktu",
    note: "Catatan",
    defaultService: "Konsultasi umum (software, desain, atau IoT)",
    thanks: "Terima kasih!",
  },
  en: {
    greeting: "Hello KaryaLo team,",
    intro: "I'd like to discuss the following needs:",
    name: "Name",
    company: "Company/Organisation",
    service: "Service Type",
    budget: "Budget/Timeline Estimate",
    note: "Notes",
    defaultService: "General consultation (software, design, or IoT)",
    thanks: "Thank you!",
  },
} as const;

export interface WhatsAppDetails {
  service?: string;
  /** The context sentence. A leading "Halo KaryaLo," greeting is dropped. */
  note?: string;
  name?: string;
  company?: string;
  budget?: string;
}

/** Drops the "Halo Tim KaryaLo," / "Hello KaryaLo team," opener and capitalises the rest. */
function stripGreeting(message: string) {
  const rest = message.replace(/^\s*(halo|hello)\s+(tim\s+)?karyalo(\s+team)?\s*,\s*/i, "").trim();
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

/**
 * The standard KaryaLo WhatsApp message: greeting, a short list of sender
 * fields (blank "-" until filled in), the service the visitor clicked on, and
 * a note. WhatsApp renders *text* as bold.
 */
export function buildWhatsAppMessage(lang: Locale, details: WhatsAppDetails = {}) {
  const t = WA_TEXT[lang];
  const value = (v?: string) => (v && v.trim() ? v.trim() : "-");
  return [
    t.greeting,
    "",
    t.intro,
    `* *${t.name}:* ${value(details.name)}`,
    `* *${t.company}:* ${value(details.company)}`,
    `* *${t.service}:* ${value(details.service ?? t.defaultService)}`,
    `* *${t.budget}:* ${value(details.budget)}`,
    `* *${t.note}:* ${value(details.note)}`,
    "",
    t.thanks,
  ].join("\n");
}

/**
 * A wa.me link that opens with the standard message already typed.
 * `message` is the context sentence for the clicked content; `service` names it.
 */
export function getWhatsAppUrl(message: string, lang: Locale, details: Omit<WhatsAppDetails, "note"> = {}) {
  const text = buildWhatsAppMessage(lang, { ...details, note: stripGreeting(message) });
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** wa.me link for a message already composed with `buildWhatsAppMessage`. */
export function getWhatsAppUrlFromText(text: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** The general-purpose WhatsApp link, opening with the default greeting in `lang`. */
export function whatsappUrl(lang: Locale) {
  return getWhatsAppUrl(siteText[lang].defaultWhatsappMessage, lang);
}
