"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, Hammer, KeyRound } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { getProducts, type ProductItem } from "@/data/products";
import { productCaseStudySlug, productNavLabel, productsPageCopy } from "@/content/products-page";
import { type Locale, localePath } from "@/lib/i18n";
import { routeSeo } from "@/lib/seo";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/*
  /products after Agenciex (2026-11-17):

    banner (badge, title, lede, jump links, giant phrase) → two ways to start,
    as two blush cards → one numbered sticky panel per platform (title, rule,
    details beside the screenshot with a blue glass tag) → the licensing ask on
    the blue CTA panel.

  Each platform's single solid button is the WhatsApp demo request; its case
  study is a text link.
*/

/** One platform as a sticky panel; the next one slides over it. */
function ProductPanel({ product, lang, index }: { product: ProductItem; lang: Locale; index: number }) {
  const copy = productsPageCopy[lang];
  const caseStudySlug = productCaseStudySlug[product.id];
  const titleId = `${product.id}-title`;

  return (
    <section id={product.id} aria-labelledby={titleId} className="agx-panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="agx-panel-num text-ink">{String(index + 1).padStart(2, "0")}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 type-meta text-ink ring-1 ring-line">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
          {product.status}
        </span>
      </div>

      <div className="border-b border-line pb-6">
        <h2 id={titleId} className="agx-panel-title">
          {product.title}
        </h2>
        <p className="mt-3 type-intro font-light text-body">{product.tagline}</p>
      </div>

      <div className="agx-panel-body">
        <div className="flex flex-col gap-6">
          <p className="max-w-[54ch] type-body-card text-body">{product.summary}</p>
          <div>
            <p className="type-label text-ink">{copy.featuresLabel}</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 type-small text-body">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={getWhatsAppUrl(copy.demoMessage(product.title), lang, {
                service: (lang === "id" ? "Demo / lisensi " : "Demo / licensing ") + product.title,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon size={18} />
              <span>{copy.requestDemo}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            {caseStudySlug && (
              <Link href={localePath(lang, `/portfolio/${caseStudySlug}`)} className="text-link group min-h-11 text-brand">
                {copy.caseStudy}
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        <div className="agx-panel-media bg-white ring-1 ring-line">
          <Image
            src={product.image}
            alt={copy.previewAlt(product.title, product.category)}
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            className="object-cover object-top"
          />
          <span className="agx-panel-tag">{product.category}</span>
        </div>
      </div>
    </section>
  );
}

export default function ProductsClient({ lang }: { lang: Locale }) {
  const copy = productsPageCopy[lang];
  const products = getProducts(lang);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
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
        <nav aria-label={copy.platformNavLabel}>
          <ul className="flex flex-wrap gap-x-6">
            {products.map((product) => (
              <li key={product.id}>
                <a href={`#${product.id}`} className="text-link min-h-11 text-brand">
                  {productNavLabel[product.id] ?? product.title}
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageBanner>

      {/* Licence or build: which is which, before the platforms themselves. */}
      <section aria-labelledby="products-ways" className="agx-section">
        <div className="agx-wrap">
          <SectionHeading id="products-ways" badge={copy.ways.badge} title={copy.ways.title} intro={copy.ways.intro} />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.12}>
            <RevealItem>
              <article className="agx-card flex h-full flex-col gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                  <KeyRound aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.025em] text-ink">{copy.license.heading}</h3>
                <p className="type-body-card text-body">{copy.license.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {copy.chips.map((chip) => (
                    <li key={chip} className="rounded-full bg-white px-3 py-1.5 type-meta text-ink ring-1 ring-line">
                      {chip}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
            <RevealItem>
              <article className="agx-card flex h-full flex-col gap-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                  <Hammer aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.025em] text-ink">{copy.bespoke.heading}</h3>
                <p className="type-body-card text-body">
                  {copy.bespoke.bodyBefore}
                  <Link
                    href={localePath(lang, "/services")}
                    className="font-medium text-ink underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
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

      {/* The platforms as numbered sticky panels. */}
      <div className="agx-wrap">
        <div className="agx-stack">
          {products.map((product, index) => (
            <ProductPanel key={product.id} product={product} lang={lang} index={index} />
          ))}
        </div>
      </div>

      {/* Licensing: the page's closing ask, on the blue CTA panel with the one light primary. */}
      <section aria-labelledby="products-callout" className="agx-section">
        <div className="agx-wrap">
          <Reveal scaleFrom={0.97} className="agx-cta">
            <SectionHeading
              align="left"
              tone="dark"
              id="products-callout"
              badge={copy.callout.badge}
              title={copy.callout.heading}
              intro={copy.callout.body}
              className="!max-w-none"
            >
              <a
                href={getWhatsAppUrl(copy.callout.message, lang, { service: lang === "id" ? "Produk digital KaryaLo" : "KaryaLo digital products" })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-primary-light mt-2"
              >
                <WhatsAppIcon size={18} />
                <span>{copy.callout.cta}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </SectionHeading>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
