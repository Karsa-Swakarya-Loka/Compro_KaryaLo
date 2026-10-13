/**
 * Client testimonials. Drafts are written by us from the project facts and sent to the client
 * for approval; only entries with `approved: true` (the client agreed to the wording, name and
 * role) are rendered. TestimonialsSection filters on the server, so drafts never reach the page.
 */
export interface Testimonial {
  id: string;
  quote: string;
  /** Person giving the testimonial, as they agreed to be named. */
  name: string;
  role: string;
  company: string;
  /** Case study under /works/[slug]. */
  projectSlug?: string;
  approved: boolean;
}

export const testimonialsData: Testimonial[] = [
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
      "Kami butuh website yang bisa langsung dikirim ke calon mitra tanpa harus menjelaskan panjang lebar. Hasilnya rapi, cepat dibuka, dan cerita perusahaan kami tersampaikan. Prosesnya jelas dari awal sampai serah terima.",
    name: "",
    role: "Owner",
    company: "PT HIJ",
    projectSlug: "hij-corporate-profile",
    approved: false,
  },
];
