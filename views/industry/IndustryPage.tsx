import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { BlurText, FlipIn, FlyIn } from "@/components/motion/Entrance";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import { getWhatsAppUrl, siteFeatures } from "@/config/site";
import { commonCopy } from "@/content/common";
import { industryCopy } from "@/content/industry";
import { getIndustries } from "@/data/industries";
import { getPortfolio } from "@/data/portfolio";
import { getProducts } from "@/data/products";
import { getServices } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * /industry after Agenciex: the page banner, then the template's blue band
 * as an overview (every industry as a big name that brightens on hover or
 * focus and jumps to its panel), then one blush panel per industry with its
 * photograph, the situation, what we would build and the proof, and a closing
 * blue panel for the business that does not see itself above.
 *
 * Every panel is a worked example of what we can build, not a claim of past
 * work in that industry. Proof is pulled from data/portfolio.ts by slug, so an
 * industry with no published project says so plainly.
 *
 * Server-rendered: only the motion wrappers are client components.
 */

/*
  Illustration per industry. A missing entry just renders no photo.
  On desktop the frame is portrait (~470×730), so a landscape photo covering it
  is drawn far wider than the column: `wide` asks for a larger file so it stays sharp.
  The 2026-11-20 photos are all 16:9, so `position` picks the slice that keeps the
  person and what they are working with in the portrait frame.
*/
const IMAGES: Record<string, { src: string; position?: string; wide?: boolean }> = {
  retail: { src: "/images/industry/retail-v2.webp", position: "30% 50%", wide: true },
  corporate: { src: "/images/industry/corporate-v2.webp", position: "41% 50%", wide: true },
  "digital-products": { src: "/images/industry/digital-products-v2.webp", position: "73% 50%", wide: true },
  distribution: { src: "/images/industry/distribution-v2.webp", position: "73% 50%", wide: true },
  manufacturing: { src: "/images/industry/manufacturing-v2.webp", position: "84% 50%", wide: true },
  property: { src: "/images/industry/property-v2.webp", position: "76% 50%", wide: true },
};

/** Small uppercase label over its content. */
const LABEL = "text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand";

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
      <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
        <PageBanner
          lang={lang}
          title={<>{copy.hero.title} <span className="text-brand">{copy.hero.accent}</span></>}
          crumbs={[{ name: crumb }]}
          lede={copy.hero.lede}
        />

        <section aria-labelledby="industry-grid-title">
          {/* Overview: the template's full-bleed band, one big name per industry. */}
          <div className="agx-band" data-surface="dark">
            <div className="agx-wrap">
              <Reveal>
                <span className="badge-pill" data-tone="dark">{copy.grid.badge}</span>
              </Reveal>
              <FlipIn id="industry-grid-title" className="agx-h2 mt-6 max-w-[20ch] !text-white">
                {copy.grid.title}
              </FlipIn>
              <BlurText className="agx-lede mt-5 !text-white/85">{copy.hero.honesty}</BlurText>

              <RevealGroup className="mt-10 border-t border-white/30 md:mt-14" stagger={0.06}>
                {industries.map((industry, index) => (
                  <RevealItem key={industry.id} className="border-b border-white/30">
                    <a
                      href={`#${industry.id}`}
                      className="group flex min-h-11 items-center gap-4 py-3 text-white/70 transition-colors duration-300 hover:text-white focus-visible:text-white md:gap-8 md:py-4"
                    >
                      <span className="w-8 shrink-0 text-[0.875rem] font-medium tabular-nums tracking-[0.08em] text-cyan-soft md:w-12">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[clamp(1.625rem,1rem+2.8vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.04em]">
                        {industry.name}
                      </span>
                      <ArrowDownRight
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 -translate-x-2 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:h-8 md:w-8"
                      />
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          {/* One blush panel per industry: photo, situation, what we build, proof. */}
          <div className="agx-section">
            <div className="agx-wrap space-y-6 md:space-y-8">
              {industries.map((industry, index) => {
                const image = IMAGES[industry.id];
                const photoLeft = index % 2 === 0;
                const proof = industry.proof
                  .map((slug) => portfolio.find((project) => project.slug === slug))
                  .filter((project) => project !== undefined);
                const product = siteFeatures.enableProductsSection && industry.productId
                  ? products.find((item) => item.id === industry.productId)
                  : undefined;
                const hasIot = industry.pillars.includes("iot-hardware");

                return (
                  <article
                    key={industry.id}
                    id={industry.id}
                    aria-labelledby={`${industry.id}-title`}
                    className="agx-card scroll-mt-28"
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                      {image && (
                        <FlyIn side={photoLeft ? "left" : "right"} className={`lg:col-span-5 ${photoLeft ? "" : "lg:order-2"}`}>
                          <div className="agx-photo relative aspect-[4/3] h-full lg:aspect-auto lg:min-h-[26rem]">
                            <Image
                              src={image.src}
                              alt=""
                              fill
                              sizes={image.wide ? "(min-width: 1024px) 75rem, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                              className="object-cover"
                              style={{ objectPosition: image.position }}
                            />
                          </div>
                        </FlyIn>
                      )}

                      <div className={`flex flex-col gap-7 ${image ? "lg:col-span-7" : "lg:col-span-12"}`}>
                        <div className="flex items-center gap-4">
                          <span aria-hidden="true" className="agx-panel-num shrink-0 text-ink">{String(index + 1).padStart(2, "0")}</span>
                          <FlipIn as="h3" id={`${industry.id}-title`} className="text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
                            {industry.name}
                          </FlipIn>
                        </div>

                        <div className="space-y-2">
                          <p className={LABEL}>{copy.card.problem}</p>
                          <BlurText className="max-w-[60ch] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] font-light leading-relaxed text-ink">
                            {industry.problem}
                          </BlurText>
                        </div>

                        <div className="space-y-3">
                          <p className={LABEL}>{copy.card.build}</p>
                          <ul className="grid gap-2.5">
                            {industry.build.map((item) => (
                              <li key={item} className="flex items-start gap-3 type-body text-ink">
                                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <p className={LABEL}>{copy.card.fields}</p>
                          <ul className="flex flex-wrap gap-2">
                            {industry.pillars.map((pillarId) => {
                              const pillar = services.find((item) => item.id === pillarId);
                              return pillar ? (
                                <li key={pillarId}>
                                  <Link
                                    href={href(`/services#${pillarId}`)}
                                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                                  >
                                    {pillar.shortName}
                                  </Link>
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </div>

                        <div className="mt-auto space-y-3 border-t border-ink/10 pt-6">
                          <p className={LABEL}>{copy.card.proof}</p>
                          {proof.length > 0 ? (
                            <ul className="space-y-1">
                              {proof.map((project) => (
                                <li key={project.slug}>
                                  <Link
                                    href={href(`/portfolio/${project.slug}`)}
                                    className="group/proof inline-flex min-h-11 items-start gap-2 py-1.5 type-body text-ink hover:text-brand"
                                  >
                                    <span>
                                      <span className="mr-1.5 text-body">
                                        {project.type === "client" ? copy.card.clientProject : project.type === "product" ? copy.card.ownProduct : copy.card.prototype}:
                                      </span>
                                      <span className="font-medium underline decoration-ink/30 underline-offset-4 group-hover/proof:decoration-brand">{project.title}</span>
                                    </span>
                                    <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/proof:translate-x-1" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="type-body max-w-[60ch] text-body">
                              {copy.card.noProof}
                              {hasIot ? ` ${copy.card.noProofIot}` : ""}
                            </p>
                          )}

                          {product && (
                            <Link
                              href={href(`/products#${product.id}`)}
                              className="inline-flex min-h-11 flex-wrap items-center gap-1.5 type-body text-ink hover:text-brand"
                            >
                              <span className="text-body">{copy.card.product}:</span>
                              <span className="font-medium">{product.title}</span>
                              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                          )}

                          <div className="pt-1">
                            <a
                              href={getWhatsAppUrl(copy.card.whatsappMessage(industry.name), lang, { service: industry.name })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-link text-brand"
                            >
                              <WhatsAppIcon size={16} />
                              <span>{copy.card.discuss}</span>
                              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing: the template's blue panel, for the business that does not see itself above. */}
        <section className="pb-12 md:pb-16" aria-labelledby="industry-cta-title">
          <div className="agx-wrap">
            <Reveal scaleFrom={0.97} className="agx-cta">
              <div className="flex max-w-3xl flex-col items-start gap-6">
                <FlipIn id="industry-cta-title" className="agx-h2 max-w-[18ch] !text-white">{copy.cta.title}</FlipIn>
                <BlurText className="type-intro max-w-[56ch] text-white/90">{copy.cta.body}</BlurText>
                <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={getWhatsAppUrl(copy.cta.whatsappMessage, lang, { service: lang === "id" ? "Pengembangan sistem sesuai industri" : "Industry-specific system development" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-wa-primary=""
                    className="btn btn-lg btn-primary-light"
                  >
                    <WhatsAppIcon size={18} />
                    <span>{copy.cta.primary}</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <Link href={href("/portfolio")} className="btn btn-lg btn-secondary-light">
                    <span>{copy.cta.secondary}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
