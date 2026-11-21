import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getPortfolio, portfolioSlugs } from "@/data/portfolio";
import { getServices } from "@/data/services";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { BlurText, FlipIn, Reveal, RevealGroup, RevealItem } from "@/components/motion/Entrance";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { type Locale, localePath, locales, ogLocale } from "@/lib/i18n";
import { ProjectCard } from "./PortfolioClient";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * Server-rendered case study, one static page per project in both languages:
 * `/portfolio/[slug]` and `/en/portfolio/[slug]`. The route files in app/(id)
 * and app/(en)/en only bind the language and forward to the helpers below.
 *
 * Agenciex case-study layout:
 *   banner      the project name is the page's one H1, the summary its lede
 *   meta row    client / year / category / services / technology, label over
 *               value under thin rules
 *   hero        the laptop mockup, whole, on a huge rounded tinted panel
 *   story       numbered text blocks (challenge, solution, outcome), each
 *               followed by one full-width rounded screenshot
 *   scope       the sub-services the project used, as tinted cards
 *   more work   the next two projects as the list page's cards
 *   CTA         the blue panel with the page's one conversation button
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
      title: `${title} | ${siteConfig.brandName}`,
      description,
      // Left unset so the generated card in this route's `opengraph-image.tsx`
      // wins; it renders this project's own title as a PNG every chat app can show.
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.brandName}`,
      description,
    },
  };
}

/** One full-width rounded screenshot between story blocks. */
function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <Reveal scaleFrom={0.92} distance={0} className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] bg-(--agx-tint) md:aspect-[16/9]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1344px) 1264px, calc(100vw - 40px)" className="object-cover object-top" />
    </Reveal>
  );
}

export default function CaseStudyPage({ lang, slug }: { lang: Locale; slug: string }) {
  const project = getProject(lang, slug);
  if (!project) notFound();

  const copy = portfolioCopy[lang];
  const href = (path: string) => localePath(lang, path);
  const portfolio = getPortfolio(lang);
  const position = portfolio.findIndex((item) => item.slug === project.slug);
  // "Next project" in list order, wrapping round, so every case study leads on.
  const next = [1, 2].map((step) => portfolio[(position + step) % portfolio.length]).filter((item) => item.slug !== project.slug);

  // "DEV-WEB // DSG-UI" -> the actual sub-services those codes refer to.
  const codes = project.serviceCode.split("//").map((code) => code.trim()).filter(Boolean);
  const scope = getServices(lang).flatMap((pillar) =>
    pillar.subServices
      .filter((sub) => codes.includes(sub.code))
      .map((sub) => ({ ...sub, pillarId: pillar.id, pillarName: pillar.shortName })),
  );
  const isClient = project.type === "client";
  const typeLabel = isClient ? copy.caseStudy.badgeClient : project.type === "product" ? copy.caseStudy.badgeProduct : copy.caseStudy.badgePrototype;
  const facts = [
    { label: copy.caseStudy.factClient, value: project.client },
    { label: copy.caseStudy.factYear, value: project.year },
    { label: copy.caseStudy.factCategory, value: project.categoryLabel },
    { label: copy.caseStudy.factServices, value: project.serviceTags.join(" · ") },
  ];

  // The story, numbered; each block is followed by the next screenshot.
  const blocks: { id: string; title: string; body: string; note?: string }[] = [
    { id: "tantangan", title: copy.caseStudy.challengeHeading, body: project.challenge },
    { id: "solusi", title: copy.caseStudy.solutionHeading, body: project.solution },
    ...(project.impact
      ? [{
          id: "hasil",
          title: copy.impact,
          body: project.impact,
          // Says where the line comes from: a client's own records, or our use
          // of our own prototype — never the same claim for both.
          note: isClient ? copy.caseStudy.impactNoteClient(project.client, project.year) : copy.caseStudy.impactNotePrototype(project.year),
        }]
      : []),
  ];
  const screens = project.galleryImages;
  const leftover = screens.slice(blocks.length);
  const total = screens.length + 1;

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      <JsonLd
        data={[
          caseStudySchema(project, lang),
          breadcrumbSchema(lang, [
            { name: lang === "id" ? "Portofolio" : "Portfolio", path: "/portfolio" },
            { name: project.title, path: `/portfolio/${project.slug}` },
          ]),
        ]}
      />

      {/* The banner's pill names the kind of work; the project name is the H1. */}
      <PageBanner
        lang={lang}
        title={project.title}
        badge={typeLabel}
        crumbs={[{ name: lang === "id" ? "Portofolio" : "Portfolio", path: "/portfolio" }, { name: project.title }]}
        lede={project.summary}
      />

      {/* Meta row and hero picture. */}
      <section aria-label={copy.caseStudy.factsHeading} className="pb-4">
        <div className="agx-wrap">
          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {facts.map((fact) => (
              <RevealItem key={fact.label} className="border-t border-line pt-4">
                <dl>
                  <dt className="text-sm text-body">{fact.label}</dt>
                  <dd className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-ink [overflow-wrap:anywhere]">{fact.value}</dd>
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6 border-t border-line pt-4">
            <dl>
              <dt className="text-sm text-body">{copy.caseStudy.techHeading}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink">{tag}</li>
                  ))}
                </ul>
              </dd>
            </dl>
          </Reveal>

          <Reveal scaleFrom={0.92} distance={0} className="relative isolate mt-12 aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-(--agx-tint) md:mt-16 md:aspect-[16/9]">
            <span aria-hidden="true" className="absolute -left-[10%] -top-[20%] -z-10 aspect-square w-[55%] rounded-full bg-(--agx-tint-2)" />
            <Image
              src={project.coverImage}
              alt={copy.coverAlt(project.title, project.client)}
              fill
              preload
              sizes="(min-width: 1344px) 1264px, calc(100vw - 40px)"
              className="object-contain p-6 md:p-14"
            />
          </Reveal>
        </div>
      </section>

      {/* The story: numbered blocks, alternating sides, each followed by a screen. */}
      <section aria-label={lang === "id" ? "Cerita proyek" : "Project story"} className="agx-section">
        <div className="agx-wrap flex flex-col gap-12 md:gap-16">
          {blocks.map((block, index) => (
            <div key={block.id} className="flex flex-col gap-12 md:gap-16">
              <SectionHeading
                id={block.id}
                align="left"
                badge={String(index + 1).padStart(2, "0")}
                title={block.title}
                intro={block.body}
                className={index % 2 ? "lg:ml-auto" : ""}
              >
                {block.note ? <p className="text-sm text-body">{block.note}</p> : undefined}
              </SectionHeading>
              {screens[index] && <Screen src={screens[index]} alt={copy.imageAlt(project.title, index + 2, total)} />}
            </div>
          ))}
          {leftover.map((src, index) => (
            <Screen key={src} src={src} alt={copy.imageAlt(project.title, blocks.length + index + 2, total)} />
          ))}
        </div>
      </section>

      {/* What the work consisted of, linked to the services that offer it. */}
      {scope.length > 0 && (
        <section aria-labelledby="cakupan" className="agx-section !pt-0">
          <div className="agx-wrap">
            <SectionHeading id="cakupan" align="left" badge={copy.caseStudy.factServices} title={copy.caseStudy.scopeHeading} intro={copy.caseStudy.scopeIntro(scope.length)} />
            <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
              {scope.map((sub) => (
                <RevealItem key={sub.code} className="agx-card flex flex-col">
                  <span className="text-sm font-medium text-brand">{sub.pillarName}</span>
                  <h3 className="mt-2 text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] font-medium leading-tight tracking-[-0.03em] text-ink">{sub.name}</h3>
                  <p className="mt-3 text-body">{sub.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {sub.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={href(`/services#${sub.pillarId}`)} className="text-link group mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-ink hover:text-brand">
                    {copy.caseStudy.seeService(sub.pillarName)}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Next projects: the list page's cards keep case studies interlinked. */}
      {next.length > 0 && (
        <section aria-labelledby="proyek-lainnya" className="agx-section !pt-0">
          <div className="agx-wrap">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading id="proyek-lainnya" align="left" badge={copy.caseStudy.relatedBadge} title={copy.caseStudy.relatedHeading} intro={copy.caseStudy.relatedIntro} />
              <Reveal className="shrink-0">
                <Link href={href("/portfolio")} className="btn btn-dark">
                  <span>{copy.allPortfolio}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-16 md:grid-cols-12 lg:gap-x-10">
              {next.map((item, index) => (
                <ProjectCard key={item.slug} lang={lang} project={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The ask: the page's one solid button, WhatsApp. */}
      <section aria-labelledby="diskusi-serupa" className="pb-12 md:pb-16">
        <div className="agx-wrap">
          <Reveal scaleFrom={0.97} className="agx-cta">
            <div className="flex max-w-3xl flex-col items-start gap-6">
              <FlipIn id="diskusi-serupa" className="agx-h2 !text-white">{copy.caseStudy.sidebarTitle}</FlipIn>
              <BlurText className="agx-lede !text-white/85">{copy.caseStudy.sidebarBody}</BlurText>
              <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={getWhatsAppUrl(copy.whatsappSimilar(project.title), lang, { service: (lang === "id" ? "Sistem seperti " : "A system like ") + project.title })}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-primary=""
                  className="btn btn-lg btn-primary-light"
                >
                  <WhatsAppIcon size={18} />
                  <span>{copy.discussSimilar}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <Link href={href("/services")} className="btn btn-lg btn-secondary-light">
                  <span>{copy.caseStudy.relatedServices}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
