import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { servicesData } from "@/data/services";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

/**
 * Server-rendered case study.
 *
 * The narrative for each project used to exist only inside a client-side dialog,
 * so none of it reached the HTML and none of it had a URL. Every project now has
 * a static page a crawler can index and a salesperson can paste into a chat.
 */

/** Any slug outside `generateStaticParams` is a 404, never an on-demand render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return portfolioData.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = project.title;
  // Hand-written in data/portfolio.ts; stitching the summary and the credit
  // together produced snippets Google cut off mid-sentence.
  const description = project.seoDescription;
  const path = `/works/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: absoluteUrl(path),
      siteName: siteConfig.brandName,
      title: `${title} — ${siteConfig.brandName}`,
      description,
      // Left unset so the generated card in `opengraph-image.tsx` wins; it
      // renders this project's own title as a PNG that every chat app can show.
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.brandName}`,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = portfolioData.filter((item) => item.slug !== project.slug).slice(0, 2);

  // "DEV-WEB // DSG-UI" -> the actual sub-services those codes refer to.
  const codes = project.serviceCode.split("//").map((code) => code.trim()).filter(Boolean);
  const scope = servicesData.flatMap((pillar) =>
    pillar.subServices
      .filter((sub) => codes.includes(sub.code))
      .map((sub) => ({ ...sub, pillarId: pillar.id, pillarName: pillar.shortName })),
  );
  const gallery = project.galleryImages.length ? project.galleryImages : [project.coverImage];
  const isClient = project.type === "client";

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      <JsonLd
        data={[
          caseStudySchema(project),
          breadcrumbSchema([
            { name: "Portofolio", path: "/works" },
            { name: project.title, path: `/works/${project.slug}` },
          ]),
        ]}
      />

      {/* Header on the mist canvas */}
      <section className="bg-mist border-b border-mist-border px-4 md:px-12 pt-8 md:pt-12 pb-14 md:pb-20">
        <div className="max-w-[66rem] mx-auto space-y-6">
          <nav aria-label="Remah roti" className="font-meta text-xs font-semibold text-mist-ink flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-midnight transition-colors">Beranda</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
            <Link href="/works" className="hover:text-midnight transition-colors">Portofolio</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
            <span className="text-midnight" aria-current="page">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-porcelain border border-white font-meta text-[11px] font-bold uppercase tracking-wider text-midnight">
              {isClient ? "Studi Kasus Klien" : "Purwarupa Internal"}
            </span>
            <span className="font-meta text-xs font-bold text-accent uppercase tracking-wider">
              {project.serviceTags.join(" · ")}
              </span>
          </div>

          <h1 className="font-headline text-[clamp(2rem,4.5vw,3.5rem)] text-midnight font-normal leading-[1.1] tracking-tight max-w-4xl">
            {project.title}
          </h1>

          <p className="font-story text-mist-ink text-lg md:text-xl leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 max-w-3xl">
            {[
              { label: "Klien", value: project.client },
              { label: "Tahun", value: project.year },
              { label: "Kategori", value: project.categoryLabel },
              { label: "Layanan", value: project.serviceTags.join(" · ") },
            ].map((fact) => (
              <div key={fact.label} className="space-y-1">
                <dt className="font-meta text-[11px] font-bold uppercase tracking-wider text-mist-ink/80">{fact.label}</dt>
                <dd className="font-story text-sm font-semibold text-midnight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 md:px-12 py-16 md:py-24">
        <div className="max-w-[66rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <article className="space-y-3">
              <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">Masalah yang Dihadapi</h2>
              <p className="font-story text-slate-700 text-base leading-relaxed">{project.challenge}</p>
            </article>

            <article className="space-y-3">
              <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">Cara Kami Menyelesaikannya</h2>
              <p className="font-story text-slate-700 text-base leading-relaxed">{project.solution}</p>
            </article>

            {project.impact && (
              <article className="p-6 rounded-2xl bg-mist/30 border border-mist space-y-2">
                <h2 className="font-meta text-xs font-bold text-midnight uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-accent" />
                  Hasilnya
                </h2>
                <p className="font-story text-midnight text-base md:text-lg font-medium leading-relaxed">
                  {project.impact}
                </p>
                <p className="font-story text-xs text-mist-ink pt-1">
                  Angka ini kami ukur bersama {project.client} pada {project.year}.
                </p>
              </article>
            )}

            {scope.length > 0 && (
              <article className="space-y-4">
                <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">Yang Kami Kerjakan</h2>
                <p className="font-story text-slate-700 text-base leading-relaxed">
                  Proyek ini melibatkan {scope.length} layanan dari tiga bidang yang kami tangani.
                </p>
                <ul className="space-y-4">
                  {scope.map((sub) => (
                    <li key={sub.code} className="border-t border-slate-200 pt-4 space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-story text-lg font-bold text-midnight leading-snug">{sub.name}</h3>
                      </div>
                      <p className="font-story text-sm text-slate-700 leading-relaxed">{sub.description}</p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                        {sub.items.map((item) => (
                          <li key={item} className="flex items-center gap-1.5 font-story text-xs text-slate-600">
                            <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services#${sub.pillarId}`}
                        className="font-meta text-xs font-bold text-accent inline-flex items-center gap-1 hover:underline"
                      >
                        Lihat layanan {sub.pillarName}
                        <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            <article className="space-y-3">
              <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">Teknologi yang Dipakai</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-meta px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-midnight text-white p-6 md:p-8 space-y-4 shadow-xl border border-midnight-light lg:sticky lg:top-28" data-surface="dark">
              <h2 className="font-story text-xl font-bold text-porcelain">
                Butuh sistem serupa untuk bisnis Anda?
              </h2>
              <p className="font-story text-sm text-midnight-muted leading-relaxed">
                Kami bantu perkirakan ruang lingkup dan biayanya lebih dulu. Gratis, tanpa keharusan lanjut.
              </p>
              <a
                href={getWhatsAppUrl(`Halo KaryaLo, saya tertarik membangun sistem seperti ${project.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-meta w-full px-6 py-3.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
              >
                <span>Diskusikan Proyek Serupa</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </a>
              <Link
                href="/services"
                className="font-meta w-full px-6 py-3.5 rounded-full bg-midnight-light/80 hover:bg-midnight-light border border-midnight-muted/30 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Lihat Layanan Terkait</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-aqua" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="galeri" className="px-4 md:px-12 pb-16 md:pb-24">
        <div className="max-w-[66rem] mx-auto space-y-6">
          <h2 id="galeri" className="font-headline text-2xl md:text-3xl text-midnight font-normal">
            Tampilan Sistem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((image, index) => (
              <figure
                key={image}
                className="rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-md"
              >
                <div className="h-8 bg-midnight px-3.5 flex items-center gap-1.5 border-b border-midnight-light">
                  <span className="w-2 h-2 rounded-full bg-aqua" />
                  <span className="w-2 h-2 rounded-full bg-mist" />
                  <span className="w-2 h-2 rounded-full bg-midnight-muted" />
                  <span className="font-meta text-[11px] text-midnight-muted truncate pl-3">{project.client}</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-matte p-2.5">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-white border border-slate-300/80">
                    <Image
                      src={image}
                      alt={`${project.title}, tampilan ${index + 1} dari ${gallery.length}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Related work keeps case studies interlinked rather than orphaned */}
      {related.length > 0 && (
        <section aria-labelledby="proyek-lain" className="bg-mist border-t border-mist-border px-4 md:px-12 py-16">
          <div className="max-w-[66rem] mx-auto space-y-6">
            <h2 id="proyek-lain" className="font-headline text-2xl md:text-3xl text-midnight font-normal">
              Proyek Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/works/${item.slug}`}
                  className="group block p-6 rounded-2xl bg-porcelain border border-white shadow-sm hover:shadow-xl transition-shadow space-y-2"
                >
                  <span className="font-meta text-[11px] font-bold text-accent uppercase tracking-wider">
                    {item.serviceTags.join(" · ")}
                  </span>
                  <h3 className="font-story text-lg font-bold text-midnight leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-story text-sm text-slate-600 leading-relaxed line-clamp-2">{item.summary}</p>
                  <span className="font-meta text-xs font-bold text-accent inline-flex items-center gap-1 pt-1">
                    Baca studi kasus
                    <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/works" className="section-link inline-flex">
              Semua portofolio
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-accent" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
