"use client";

import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/config/site";
import { getProducts, type ProductItem } from "@/data/products";
import { productCaseStudySlug, productNavLabel, productsPageCopy } from "@/content/products-page";
import { type Locale, localePath } from "@/lib/i18n";
import { routeSeo } from "@/lib/seo";
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, Hammer, KeyRound } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";

/*
  /products in the Cargon manner (redesign 2026-10-15):

    banner → two ways to start (license or build) → one section per platform
    (browser mockup beside its details, sides alternating) → the licensing
    callout on the page's one dark band.

  Each platform's single solid button is the WhatsApp demo request; its case
  study is a text link.
*/

/**
 * One platform: its heading across the top, then the screenshot in a browser
 * frame (on an offset brand frame) beside the details. The frame stretches to
 * the details column on desktop, so both columns start and end on one line.
 */
function ProductSection({ product, lang, index }: { product: ProductItem; lang: Locale; index: number }) {
  const copy = productsPageCopy[lang];
  const caseStudySlug = productCaseStudySlug[product.id];
  const reversed = index % 2 === 1;
  const surface = index % 2 === 0 ? "bg-white" : "bg-surface";

  return (
    <section id={product.id} aria-label={product.title} className={`section-standard px-4 md:px-12 ${surface}`}>
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading align="left" badge={product.category} title={product.title} intro={product.tagline} className="mb-10 md:mb-12" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealItem direction={reversed ? "right" : "left"} scaleFrom={0.92} className={`relative ${reversed ? "lg:order-2" : ""}`}>
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-3xl bg-brand-soft ${reversed ? "-translate-x-5" : "translate-x-5"} translate-y-5`}
            />
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                </div>
                <span className="type-meta truncate text-body">{product.title}</span>
                <span className="type-meta text-brand">{copy.previewLabel}</span>
              </div>
              <div className="img-zoom relative aspect-[16/10] w-full bg-white lg:aspect-auto lg:min-h-[20rem] lg:flex-1">
                <Image
                  src={product.image}
                  alt={copy.previewAlt(product.title, product.category)}
                  fill
                  sizes="(min-width: 1024px) 640px, calc(100vw - 32px)"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </RevealItem>

          <RevealItem direction={reversed ? "left" : "right"} className="space-y-7">
            <span className="type-meta inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-brand">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              {product.status}
            </span>

            <p className="type-body max-w-[60ch] text-body">{product.summary}</p>

            <div className="space-y-4 border-t border-line pt-6">
              <span className="type-label block text-ink">{copy.featuresLabel}</span>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feat) => (
                  <li key={feat} className="type-small flex items-start gap-2.5 text-body">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={getWhatsAppUrl(copy.demoMessage(product.title), lang, { service: (lang === "id" ? "Demo / lisensi " : "Demo / licensing ") + product.title })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {copy.requestDemo}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              {caseStudySlug && (
                <Link href={localePath(lang, `/portfolio/${caseStudySlug}`)} className="text-link group text-brand">
                  {copy.caseStudy}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}

export default function ProductsClient({ lang }: { lang: Locale }) {
  const copy = productsPageCopy[lang];
  const products = getProducts(lang);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col bg-white">
      <PageBanner
        lang={lang}
        title={
          <>
            {copy.hero.title} <span className="text-brand">{copy.hero.titleAccent}</span>
          </>
        }
        crumbs={[{ name: routeSeo.products.text[lang].breadcrumb ?? routeSeo.products.text[lang].title }]}
        lede={copy.hero.lede}
      >
        {/* In-page jump links: quiet words with a down arrow. */}
        <nav aria-label={copy.platformNavLabel}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {products.map((product) => (
              <li key={product.id}>
                <a href={`#${product.id}`} className="text-link text-brand">
                  {productNavLabel[product.id] ?? product.title} <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageBanner>

      {/*
        The site sells both bespoke engineering and licensable platforms; this
        pair says which is which before the platforms themselves.
      */}
      <section aria-label={copy.ways.title} className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <SectionHeading badge={copy.ways.badge} title={copy.ways.title} intro={copy.ways.intro} />
          <RevealGroup className="fit-grid mt-12 fit-md-2 lg:mt-14" stagger={0.12}>
            <RevealItem direction="left" className="h-full">
              <article className="group flex h-full flex-col gap-5 rounded-3xl bg-brand p-7 text-white shadow-lift md:p-9">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white">
                  <KeyRound aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="type-card-title-lg text-white">{copy.license.heading}</h3>
                <p className="type-body-card text-white">{copy.license.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {copy.chips.map((chip) => (
                    <li key={chip} className="type-meta rounded-full bg-white/15 px-3.5 py-1.5 text-white">{chip}</li>
                  ))}
                </ul>
              </article>
            </RevealItem>
            <RevealItem direction="right" className="h-full">
              <article className="group flex h-full flex-col gap-5 rounded-3xl border border-line bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lift md:p-9">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Hammer aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="type-card-title-lg text-ink">{copy.bespoke.heading}</h3>
                <p className="type-body-card text-body">
                  {copy.bespoke.bodyBefore}
                  <Link
                    href={localePath(lang, "/services")}
                    className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                  >
                    {copy.bespoke.link}
                  </Link>
                  {copy.bespoke.bodyAfter}
                </p>
              </article>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Platforms alternate sides and surfaces, starting on the light grey band. */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} lang={lang} index={index + 1} />
      ))}

      {/* Licensing: the page's closing ask, on its one dark band, with the one light primary. */}
      <section aria-label={copy.callout.heading} data-surface="dark" className="section-standard bg-night px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <SectionHeading tone="dark" badge={copy.callout.badge} title={copy.callout.heading} intro={copy.callout.body}>
            <Reveal delay={0.15} className="pt-2">
              <a
                href={getWhatsAppUrl(copy.callout.message, lang, { service: lang === "id" ? "Produk digital KaryaLo" : "KaryaLo digital products" })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-primary-light"
              >
                {copy.callout.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </Reveal>
          </SectionHeading>
        </div>
      </section>
    </main>
  );
}

