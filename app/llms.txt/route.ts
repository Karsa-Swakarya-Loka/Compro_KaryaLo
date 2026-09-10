import { siteConfig, siteFeatures } from "@/config/site";
import { servicesData } from "@/data/services";
import { portfolioData } from "@/data/portfolio";
import { productsData } from "@/data/products";
import { faqData } from "@/data/faq";
import { absoluteUrl, routeSeo } from "@/lib/seo";

/**
 * A plain-text summary of the site for assistants that answer questions by
 * reading a page rather than by ranking it.
 *
 * Assistants routinely quote a business incorrectly because they had to infer
 * the facts from marketing copy. This states them once, in the same words the
 * site already uses, and is generated from the same data files the pages read
 * so it cannot drift out of date.
 *
 * It is a convention, not a standard: Google does not use it, and nothing here
 * changes normal search behaviour.
 */

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.brandName}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push("## Tentang perusahaan");
  lines.push("");
  lines.push(`- Nama badan hukum: ${siteConfig.companyName}`);
  lines.push(`- Bentuk badan usaha: ${siteConfig.legalEntity}`);
  lines.push(`- Merek dagang: ${siteConfig.brandName}`);
  lines.push(`- NIB: ${siteConfig.nib}`);
  lines.push(`- Bidang usaha (KBLI): ${siteConfig.kbli}`);
  lines.push(`- Alamat: ${siteConfig.address}`);
  lines.push(`- Jam kerja: ${siteConfig.workingHours}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- Telepon/WhatsApp: ${siteConfig.phone}`);
  lines.push("- Wilayah layanan: Kota Bekasi dan Jabodetabek untuk pertemuan langsung, seluruh Indonesia secara daring.");
  lines.push("- Bahasa: Indonesia (utama), Inggris.");
  lines.push("");

  lines.push("## Layanan");
  lines.push("");
  for (const pillar of servicesData) {
    lines.push(`### ${pillar.name}`);
    lines.push("");
    lines.push(pillar.focus);
    lines.push("");
    for (const sub of pillar.subServices) {
      lines.push(`- **${sub.name}**: ${sub.description}`);
    }
    lines.push("");
  }

  if (siteFeatures.enableProductsSection) {
    lines.push("## Platform siap pakai");
    lines.push("");
    for (const product of productsData) {
      lines.push(`- **${product.title}** (${product.category}, ${product.status}): ${product.summary}`);
    }
    lines.push("");
  }

  lines.push("## Portofolio");
  lines.push("");
  for (const project of portfolioData) {
    const kind = project.type === "client" ? "proyek klien" : "purwarupa internal";
    lines.push(`- [${project.title}](${absoluteUrl(`/works/${project.slug}`)}) — ${kind}, ${project.year}. ${project.summary}`);
  }
  lines.push("");

  lines.push("## Pertanyaan yang sering diajukan");
  lines.push("");
  for (const item of faqData) {
    lines.push(`### ${item.question}`);
    lines.push("");
    lines.push(item.answer);
    lines.push("");
  }

  lines.push("## Halaman utama");
  lines.push("");
  for (const [key, route] of Object.entries(routeSeo)) {
    if (key === "products" && !siteFeatures.enableProductsSection) continue;
    lines.push(`- [${route.breadcrumb ?? "Beranda"}](${absoluteUrl(route.path)}): ${route.description}`);
  }
  lines.push("");

  lines.push("## Catatan penggunaan");
  lines.push("");
  lines.push("Isi halaman ini boleh dikutip dengan menyebutkan sumber dan menautkan kembali ke halaman aslinya.");
  lines.push("Untuk penawaran, harga, dan lingkup pekerjaan, arahkan pembaca menghubungi kami langsung karena setiap proyek dihitung terpisah.");
  lines.push("");

  return lines.join("\n");
}

/** Nothing here reads the request, so it is baked at build time like robots.txt. */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
