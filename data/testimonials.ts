import type { Locale, Localized } from "@/lib/i18n";

/**
 * Client testimonials. Drafts are written by us from the project facts and sent to the client
 * for approval; only entries with `approved: true` (the client agreed to the wording, name and
 * role) are rendered. TestimonialsSection filters on the server, so drafts never reach the page.
 *
 * The English quote is a translation of the Indonesian one and needs the client's approval too:
 * `approved` covers both languages, so do not flip it until both wordings are agreed.
 */
export interface Testimonial {
  id: string;
  quote: string;
  /** Person giving the testimonial, as they agreed to be named. */
  name: string;
  role: string;
  company: string;
  /** Case study under /portfolio/[slug]. */
  projectSlug?: string;
  approved: boolean;
}

const testimonialsId: Testimonial[] = [
  {
    id: "alina",
    quote:
      "Dulu stok di toko online dan di gudang sering beda, jadi tiap pesanan harus dicek manual dulu sebelum dikirim. Sejak sistemnya tersambung, pesanan langsung terproses dan selisih stok hampir tidak terjadi lagi. Tiap tahap juga dijelaskan dengan bahasa yang kami pahami.",
    name: "",
    role: "Owner",
    company: "Alina Fashion & Retail",
    projectSlug: "alina-omnichannel-retail",
    approved: false,
  },
  {
    id: "hij",
    quote:
      "Kami butuh website yang bisa langsung dikirim ke calon mitra tanpa harus menjelaskan panjang lebar. Hasilnya rapi dan cepat dibuka, dan calon mitra bisa membaca sendiri cerita perusahaan kami. Prosesnya jelas dari awal sampai serah terima.",
    name: "",
    role: "Owner",
    company: "PT HIJ",
    projectSlug: "hij-corporate-profile",
    approved: false,
  },
];

const quotesEn: Record<string, string> = {
  alina:
    "Stock in the online store and in the warehouse used to differ, so every order had to be checked by hand before it shipped. Since the systems were connected, orders go straight through and stock discrepancies have almost stopped. Every stage was explained in language we understood.",
  hij:
    "We needed a website we could send straight to prospective partners without long explanations. The site is tidy and quick to open, and partners can read our company's story for themselves. The process was clear from start to handover.",
};

export const testimonialsData: Localized<Testimonial[]> = {
  id: testimonialsId,
  en: testimonialsId.map((item) => ({ ...item, quote: quotesEn[item.id] })),
};

export function getTestimonials(lang: Locale) {
  return testimonialsData[lang];
}
