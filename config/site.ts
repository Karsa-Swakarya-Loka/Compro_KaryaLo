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
const defaultWhatsappMessage =
  "Halo Tim KaryaLo, saya ingin berdiskusi soal kebutuhan software, desain, atau perangkat IoT untuk perusahaan kami.";

export const siteConfig = {
  /** Canonical production origin. Used for metadataBase, sitemap, robots and JSON-LD @id. */
  url: "https://karyalo.com",
  companyName: "PT Karsa Swakarya Loka",
  brandName: "KaryaLo Digital Solution",
  tagline: "Website, aplikasi, dan perangkat IoT yang dibangun untuk dipakai sehari-hari.",
  description: "Studio teknologi dan desain di Kota Bekasi. Kami membangun website, aplikasi, dan perangkat IoT untuk kebutuhan bisnis, dari perencanaan sampai serah terima.",
  nib: "3005260047228",
  kbli: "62019 — Aktivitas Pemrograman Komputer Lainnya",
  legalEntity: "Perseroan Perorangan (SK Kemenkumham RI)",
  address: "Jl. Al-Falah II, Jatiranggon, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17432",
  mapsUrl: "https://maps.app.goo.gl/3YrD56ctLmne1fGR8",
  email: "support@karyalo.com",
  phone,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`,
  workingHours: "Senin – Jumat: 09.00 – 18.00 WIB | Sabtu & Minggu: dengan janji temu",
  /**
   * Public profiles that independently corroborate this entity, used for schema `sameAs`.
   * Intentionally empty: no verified profiles exist yet. Add the real URLs once the
   * Google Business Profile and LinkedIn company page are live.
   */
  sameAs: [] as string[],
};

export const siteFeatures = {
  // Single switch for the /products route AND its navbar entry. Set to false to
  // remove the page from routing, the navbar and the sitemap in one place.
  enableProductsSection: true,
  showProductsInNavbar: true,   // Only applies while enableProductsSection is true.
  enableClientLogosBar: false,  // Di-hold sesuai keputusan PRD
};

export function getWhatsAppUrl(message: string) {
  const url = new URL(siteConfig.whatsappUrl);
  url.searchParams.set("text", message);
  return url.toString();
}
