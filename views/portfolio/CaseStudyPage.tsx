import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getPortfolio, portfolioSlugs } from "@/data/portfolio";
import { getServices } from "@/data/services";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { type Locale, localePath, locales, ogLocale } from "@/lib/i18n";

/**
 * Server-rendered case study.
 *
 * The narrative for each project used to exist only inside a client-side dialog,
 * so none of it reached the HTML and none of it had a URL. Every project now has
 * a static page a crawler can index and a salesperson can paste into a chat, in
 * both languages: `/portfolio/[slug]` and `/en/portfolio/[slug]`.
 *
 * The route files in app/(id) and app/(en)/en only bind the language and
 * forward to the helpers below.
 *
 * Cargon layout: page banner (title, breadcrumb, summary, type badge), one wide
 * screenshot frame, the story beside a sticky facts card, the WhatsApp ask in
 * a brand-blue panel right after the outcome, then more screens and related
 * projects under centred section headers.
 */

/** Every published slug, in both language trees. */
export function caseStudyStaticParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

function getProject(lang: Locale, slug: string) {
  return getPortfolio(lang).find((project) => project.slug === slug);
}

export function caseStudyMetadata(lang: Locale, slug: string): Metadata {
  const project = getProject(lang, slug);
  if (!project) return {};

  const title = project.title;
  // Hand-written in data/portfolio.ts; stitching the summary and the credit
  // together produced snippets Google cut off mid-sentence.
  const description = project.seoDescription;
  const path = `/portfolio/${project.slug}`;
  const base = pageMetadata({ lang, path, title, description });

  return {
    ...base,
    openGraph: {
      type: "article",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((other) => other !== lang).map((other) => ogLocale[other]),
      url: absoluteUrl(localePath(lang, path)),
      siteName: siteConfig.brandName,
      title: `${title} — ${siteConfig.brandName}`,
      description,
      // Left unset so the generated card in this route's `opengraph-image.tsx`
      // wins; it renders this project's own title as a PNG every chat app can show.
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.brandName}`,
      description,
    },
  };
}

export default function CaseStudyPage({ lang, slug }: { lang: Locale; slug: string }) {
  const project = getProject(lang, slug);
  if (!project) notFound();

  const copy = portfolioCopy[lang];
  const href = (path: string) => localePath(lang, path);
  const related = getPortfolio(lang).filter((item) => item.slug !== project.slug).slice(0, 3);

  // "DEV-WEB // DSG-UI" -> the actual sub-services those codes refer to.
  const codes = project.serviceCode.split("//").map((code) => code.trim()).filter(Boolean);
  const scope = getServices(lang).flatMap((pillar) =>
    pillar.subServices
      .filter((sub) => codes.includes(sub.code))
      .map((sub) => ({ ...sub, pillarId: pillar.id, pillarName: pillar.shortName })),
  );
  const gallery = project.galleryImages.length ? project.galleryImages : [project.coverImage];
  const [leadImage, ...moreImages] = gallery;
  const isClient = project.type === "client";
  const facts = [
    { label: copy.caseStudy.factClient, value: project.client },
    { label: copy.caseStudy.factYear, value: project.year },
    { label: copy.caseStudy.factCategory, value: project.categoryLabel },
    { label: copy.caseStudy.factServices, value: project.serviceTags.join(" · ") },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
      <JsonLd
        data={[
          caseStudySchema(project, lang),
          breadcrumbSchema(lang, [
            { name: "Portfolio", path: "/portfolio" },
            { name: project.title, path: `/portfolio/${project.slug}` },
          ]),
        ]}
      />

      {/* Banner: the project is the page's one display line; the badge says what kind of work it was. */}
      <PageBanner
        lang={lang}
        title={project.title}
        crumbs={[{ name: "Portfolio", path: "/portfolio" }, { name: project.title }]}
        lede={project.summary}
      >
        <span className="badge-pill">
          {isClient ? copy.caseStudy.badgeClient : project.type === "product" ? copy.caseStudy.badgeProduct : copy.caseStudy.badgePrototype} · {project.year}
        </span>
      </PageBanner>

      <section className="section-standard px-4 md:px-12 bg-white">
        <div className="max-w-[72rem] mx-auto">
          {/* The system itself first: one wide frame, zooming out into place. */}
          <Reveal scaleFrom={0.92} distance={0} className="rounded-3xl bg-surface p-3 md:p-5 shadow-card">
            <div className="img-zoom relative aspect-[16/10] md:aspect-[16/8] w-full overflow-hidden rounded-2xl bg-white">
              <Image
                src={leadImage}
                alt={copy.imageAlt(project.title, 1, gallery.length)}
                fill
                preload
                sizes="(min-width: 1152px) 1112px, calc(100vw - 32px)"
                className="object-contain p-2 md:p-4"
              />
            </div>
          </Reveal>

          {/*
            The story beside the facts. The page's one solid button sits
            straight after the outcome: that is the moment a reader decides
            whether they want the same thing.
          */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-12">
              <Reveal direction="left" className="space-y-3">
                <h2 className="type-subhead text-ink">{copy.caseStudy.challengeHeading}</h2>
                <p className="type-body text-body max-w-[68ch]">{project.challenge}</p>
              </Reveal>

              <Reveal direction="left" className="space-y-3">
                <h2 className="type-subhead text-ink">{copy.caseStudy.solutionHeading}</h2>
                <p className="type-body text-body max-w-[68ch]">{project.solution}</p>
              </Reveal>

              {project.impact && (
                <Reveal direction="left" className="space-y-3">
                  <h2 className="type-subhead text-ink">{copy.impact}</h2>
                  <p className="flex items-start gap-3 max-w-[60ch]">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-brand" />
                    <span className="type-lede font-medium text-ink">{project.impact}</span>
                  </p>
                  {/* Says where the line comes from: a client's own records, or
                      our use of our own prototype — never the same claim for both. */}
                  <p className="type-small text-body max-w-[68ch]">
                    {isClient
                      ? copy.caseStudy.impactNoteClient(project.client, project.year)
                      : copy.caseStudy.impactNotePrototype(project.year)}
                  </p>
                </Reveal>
              )}

              {/* The ask, in the brand blue: Cargon's highlighted panel. */}
              <Reveal>
              <aside aria-labelledby="diskusi-serupa" className="rounded-3xl bg-brand p-7 md:p-10 text-white shadow-lift">
                <h2 id="diskusi-serupa" className="type-subhead text-white">
                  {copy.caseStudy.sidebarTitle}
                </h2>
                <p className="type-body text-white max-w-[60ch] mt-3">
                  {copy.caseStudy.sidebarBody}
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-7">
                  <a
                    href={getWhatsAppUrl(copy.whatsappSimilar(project.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-wa-primary=""
                    className="btn btn-lg btn-primary-light"
                  >
                    {copy.discussSimilar}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                  </a>
                  <Link href={href("/services")} className="btn btn-lg btn-secondary-light">
                    {copy.caseStudy.relatedServices}
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
              </aside>
              </Reveal>

              {scope.length > 0 && (
                <Reveal direction="left" className="space-y-5">
                  <h2 className="type-subhead text-ink">{copy.caseStudy.scopeHeading}</h2>
                  <p className="type-body text-body max-w-[68ch]">{copy.caseStudy.scopeIntro(scope.length)}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {scope.map((sub) => (
                      <li key={sub.code} className="group flex flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-lift">
                        <span className="type-meta text-brand">{sub.pillarName}</span>
                        <h3 className="type-card-title text-ink mt-1.5">{sub.name}</h3>
                        <p className="type-body-card text-body mt-2">{sub.description}</p>
                        <ul className="mt-4 space-y-2">
                          {sub.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 type-small text-ink">
                              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Link href={href(`/services#${sub.pillarId}`)} className="text-link text-brand mt-auto pt-3">
                          {copy.caseStudy.seeService(sub.pillarName)}
                          <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            {/* Facts card: who, when, what kind of work, with what. */}
            <Reveal direction="right" className="lg:col-span-4 lg:sticky lg:top-32">
              <aside aria-labelledby="ringkasan-proyek" className="rounded-3xl bg-surface p-7 md:p-8">
                <h2 id="ringkasan-proyek" className="type-card-title-lg text-ink">{copy.caseStudy.factsHeading}</h2>
                <dl className="mt-6 divide-y divide-line">
                  {facts.map((fact) => (
                    <div key={fact.label} className="py-3.5 first:pt-0">
                      <dt className="type-meta text-body">{fact.label}</dt>
                      <dd className="type-body-card font-semibold text-ink mt-0.5">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 pt-6 border-t border-line">
                  <h3 className="type-label text-ink">{copy.caseStudy.techHeading}</h3>
                  <ul className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-brand-soft px-3 py-1.5 type-meta text-brand">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* More screens of the same system, when there are any. */}
      {moreImages.length > 0 && (
        <section className="section-support px-4 md:px-12 bg-surface">
          <div className="max-w-[72rem] mx-auto">
            <SectionHeading badge={copy.caseStudy.galleryBadge} title={copy.caseStudy.galleryHeading} intro={copy.caseStudy.galleryIntro} />
            <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.12}>
              {moreImages.map((image, index) => (
                <RevealItem key={image} scaleFrom={0.94}>
                  <figure className="img-zoom relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line">
                    <Image
                      src={image}
                      alt={copy.imageAlt(project.title, index + 2, gallery.length)}
                      fill
                      sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-3"
                    />
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Related work keeps case studies interlinked rather than orphaned. */}
      {related.length > 0 && (
        <section className={`section-standard px-4 md:px-12 ${moreImages.length > 0 ? "bg-white" : "bg-surface"}`}>
          <div className="max-w-[72rem] mx-auto">
            <SectionHeading badge={copy.caseStudy.relatedBadge} title={copy.caseStudy.relatedHeading} intro={copy.caseStudy.relatedIntro} />
            <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
              {related.map((item) => (
                <RevealItem key={item.slug} className="h-full">
                  <Link
                    href={href(`/portfolio/${item.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div className="img-zoom relative aspect-[16/10] w-full border-b border-line bg-surface">
                      <Image
                        src={item.galleryImages[0] ?? item.coverImage}
                        alt={copy.coverAlt(item.title, item.client)}
                        fill
                        sizes="(min-width: 1152px) 370px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="type-meta text-body">{item.serviceTags.join(" · ")}</span>
                      <h3 className="type-card-title text-ink mt-2 transition-colors duration-300 group-hover:text-brand">{item.title}</h3>
                      <p className="type-body-card text-body mt-2 line-clamp-2">{item.summary}</p>
                      {/* The whole card is the link; this only names where it goes. */}
                      <span className="text-link text-brand mt-auto pt-3">
                        {copy.readCaseStudy}
                        <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-12 flex justify-center">
              <Link href={href("/portfolio")} className="btn btn-secondary">
                {copy.allPortfolio}
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

