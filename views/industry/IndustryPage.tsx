import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, Building, CircleCheck, CreditCard, Factory, ShoppingBag, Truck } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { getWhatsAppUrl, siteFeatures } from "@/config/site";
import { commonCopy } from "@/content/common";
import { industryCopy } from "@/content/industry";
import { getIndustries, type IndustryItem } from "@/data/industries";
import { getPortfolio } from "@/data/portfolio";
import { getProducts } from "@/data/products";
import { getServices } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";

/**
 * /industry in the Cargon layout: banner, a centred section header whose intro
 * is the honesty note, the industry cards, and a closing blue band.
 *
 * Every card is a worked example of what we can build, not a claim of past
 * work in that industry. Proof is pulled from data/portfolio.ts by slug, so an
 * industry with no published project says so plainly; IoT shows up here as
 * what we build, with a sample device as the way in, never as a project.
 *
 * Server-rendered: only the scroll-reveal wrappers are client components.
 */

const ICONS: Record<IndustryItem["id"], typeof ShoppingBag> = {
  retail: ShoppingBag,
  corporate: Briefcase,
  "digital-products": CreditCard,
  distribution: Truck,
  manufacturing: Factory,
  property: Building,
};

export default function IndustryPage({ lang }: { lang: Locale }) {
  const copy = industryCopy[lang];
  const industries = getIndustries(lang);
  const portfolio = getPortfolio(lang);
  const products = getProducts(lang);
  const services = getServices(lang);
  const href = (path: string) => localePath(lang, path);
  const crumb = commonCopy[lang].nav.find((link) => link.href === "/industry")?.label ?? copy.hero.title;

  return (
    <>
      <JsonLd data={[pageSchema("WebPage", "industry", lang), routeBreadcrumb(lang, "industry")]} />
      <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
        <PageBanner
          lang={lang}
          title={<>{copy.hero.title} <span className="text-brand">{copy.hero.accent}</span></>}
          crumbs={[{ name: crumb }]}
          lede={copy.hero.lede}
        />

        <section className="section-standard bg-surface px-4 md:px-12">
          <div className="mx-auto max-w-[72rem] space-y-12">
            <SectionHeading badge={copy.grid.badge} title={copy.grid.title} intro={copy.hero.honesty} />

            <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
              {industries.map((industry) => {
                const Icon = ICONS[industry.id];
                const proof = industry.proof
                  .map((slug) => portfolio.find((project) => project.slug === slug))
                  .filter((project) => project !== undefined);
                const product = siteFeatures.enableProductsSection && industry.productId
                  ? products.find((item) => item.id === industry.productId)
                  : undefined;
                const hasIot = industry.pillars.includes("iot-hardware");

                return (
                  <RevealItem key={industry.id} className="group h-full">
                    <article
                      id={industry.id}
                      aria-labelledby={`${industry.id}-title`}
                      className="flex h-full scroll-mt-28 flex-col gap-5 rounded-3xl bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift md:p-8"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <h2 id={`${industry.id}-title`} className="type-card-title-lg text-ink">
                          {industry.name}
                        </h2>
                      </div>

                      <div className="space-y-1.5">
                        <p className="type-meta text-brand">{copy.card.problem}</p>
                        <p className="type-body text-ink">“{industry.problem}”</p>
                      </div>

                      <div className="space-y-2.5">
                        <p className="type-meta text-brand">{copy.card.build}</p>
                        <ul className="grid grid-cols-1 gap-2">
                          {industry.build.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 type-body-card text-body">
                              <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="type-meta text-body">{copy.card.fields}</span>
                        {industry.pillars.map((pillarId) => {
                          const pillar = services.find((item) => item.id === pillarId);
                          return pillar ? (
                            <Link
                              key={pillarId}
                              href={href(`/services#${pillarId}`)}
                              className="relative z-10 inline-flex min-h-9 items-center rounded-full bg-surface px-3.5 type-meta text-ink transition-colors hover:bg-brand hover:text-white"
                            >
                              {pillar.shortName}
                            </Link>
                          ) : null;
                        })}
                      </div>

                      <div className="mt-auto space-y-3 border-t border-line pt-5">
                        <p className="type-meta text-brand">{copy.card.proof}</p>
                        {proof.length > 0 ? (
                          <ul className="space-y-1">
                            {proof.map((project) => (
                              <li key={project.slug}>
                                <Link
                                  href={href(`/portfolio/${project.slug}`)}
                                  className="group/proof inline-flex min-h-11 items-start gap-2 py-1 type-body-card text-ink hover:text-brand"
                                >
                                  <span>
                                    <span className="mr-1.5 type-meta text-body">
                                      {project.type === "client" ? copy.card.clientProject : project.type === "product" ? copy.card.ownProduct : copy.card.prototype}:
                                    </span>
                                    <span className="font-semibold underline decoration-line underline-offset-4 group-hover/proof:decoration-brand">{project.title}</span>
                                  </span>
                                  <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/proof:translate-x-1" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="type-body-card text-body">
                            {copy.card.noProof}
                            {hasIot ? ` ${copy.card.noProofIot}` : ""}
                          </p>
                        )}

                        {product && (
                          <Link
                            href={href(`/products#${product.id}`)}
                            className="inline-flex min-h-11 items-center gap-1.5 type-body-card text-ink hover:text-brand"
                          >
                            <span className="type-meta text-body">{copy.card.product}:</span>
                            <span className="font-semibold">{product.title}</span>
                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                          </Link>
                        )}

                        <a
                          href={getWhatsAppUrl(copy.card.whatsappMessage(industry.name))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link text-brand"
                        >
                          <span>{copy.card.discuss}</span>
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Closing band for the business that does not see itself above: Cargon's blue CTA band. */}
        <section className="section-anchor relative overflow-hidden bg-brand px-4 md:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[28px] border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[20px] border-cyan/25" />
          <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="type-section-title-lg text-white">{copy.cta.title}</h2>
            <p className="type-intro max-w-[56ch] text-white">{copy.cta.body}</p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center">
              <a
                href={getWhatsAppUrl(copy.cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-primary=""
                className="btn btn-lg btn-primary-light"
              >
                {copy.cta.primary}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link href={href("/portfolio")} className="btn btn-lg btn-secondary-light">
                {copy.cta.secondary}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
