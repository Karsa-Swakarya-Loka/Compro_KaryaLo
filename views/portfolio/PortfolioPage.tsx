import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { BlurText, FlipIn, Reveal } from "@/components/motion/Entrance";
import { getPortfolio } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import { portfolioCollectionSchema, routeBreadcrumb } from "@/lib/schema";
import { type Locale, localePath } from "@/lib/i18n";
import PortfolioClient from "./PortfolioClient";

/**
 * /portfolio after Agenciex's Projects page: the left-aligned page banner with
 * its huge faded phrase, a left-aligned section header, the filter pills, the
 * staggered grid of mixed-size project cards, then the closing blue CTA panel.
 *
 * Hierarchy: one H1 (banner), H2 for the grid and for the CTA, H3 per card.
 * Server-rendered; only the filter, the grid's entrance and the quick-preview
 * dialog are client code (PortfolioClient).
 */
export default function PortfolioPage({ lang }: { lang: Locale }) {
  const copy = portfolioCopy[lang];
  const portfolio = getPortfolio(lang);
  const countOf = (type: string) => portfolio.filter((project) => project.type === type).length;
  const linkClass = "font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      {/*
        No separate WebPage node here: CollectionPage is already a WebPage, and
        declaring both against the same URL would give one @id two conflicting
        types.
      */}
      <JsonLd data={[portfolioCollectionSchema(lang), routeBreadcrumb(lang, "portfolio")]} />

      <PageBanner
        lang={lang}
        title={<>{copy.index.titleLead} <span className="text-brand">{copy.index.titleAccent}</span></>}
        crumbs={[{ name: "Portfolio" }]}
        lede={copy.index.intro}
      />

      <section aria-labelledby="portfolio-grid-title" className="agx-section !pt-8 md:!pt-12">
        <div className="agx-wrap">
          <SectionHeading
            id="portfolio-grid-title"
            align="left"
            badge={copy.index.badge}
            title={copy.index.gridTitle}
            intro={copy.index.counts(portfolio.length, countOf("client"), countOf("prototype"), countOf("product"))}
          />

          <PortfolioClient lang={lang} />

          {/* No IoT project is published, and none is implied: the note says so
              and points to how an IoT engagement starts instead. */}
          <Reveal className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-body md:mt-16 md:flex-row md:flex-wrap md:gap-x-10">
            <p>
              {copy.index.iotNote}{" "}
              <Link href={localePath(lang, "/services#iot-hardware")} className={linkClass}>{copy.index.iotLink}</Link>.
            </p>
            <p>
              {copy.index.servicesLinkLead}{" "}
              <Link href={localePath(lang, "/services")} className={linkClass}>{copy.index.servicesLink}</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The page's one ask: WhatsApp is the only solid button, the brief form the outline one. */}
      <section aria-labelledby="portfolio-cta-title" className="pb-12 md:pb-16">
        <div className="agx-wrap">
          <Reveal scaleFrom={0.97} className="agx-cta">
            <div className="flex max-w-3xl flex-col items-start gap-6">
              <span className="badge-pill" data-tone="dark">{copy.index.consultationBadge}</span>
              <FlipIn id="portfolio-cta-title" className="agx-h2 !text-white">{copy.index.consultationTitle}</FlipIn>
              <BlurText className="agx-lede !text-white/85">{copy.index.consultationBody}</BlurText>
              <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={getWhatsAppUrl(copy.index.consultationWhatsapp, lang, { service: lang === "id" ? "Pengembangan sistem perusahaan" : "Company system development" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-primary=""
                  className="btn btn-lg btn-primary-light"
                >
                  <span>{copy.index.consultationPrimary}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <Link href={localePath(lang, "/contact")} className="btn btn-lg btn-secondary-light">
                  <span>{copy.index.consultationSecondary}</span>
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
