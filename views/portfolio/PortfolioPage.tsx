import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPortfolio } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import { portfolioCollectionSchema, routeBreadcrumb } from "@/lib/schema";
import { type Locale, localePath } from "@/lib/i18n";
import PortfolioClient from "./PortfolioClient";

/**
 * /portfolio in the Cargon layout: the light page banner under the floating
 * navbar, the "Showcasing Our Expertise" style project grid under a centred
 * section header, then the page's one ask on the grey band.
 *
 * Server-rendered; only the filter and the quick-preview dialog are client
 * code (PortfolioClient).
 */
export default function PortfolioPage({ lang }: { lang: Locale }) {
  const copy = portfolioCopy[lang];
  const portfolio = getPortfolio(lang);
  const clientCount = portfolio.filter((project) => project.type === "client").length;
  const prototypeCount = portfolio.filter((project) => project.type === "prototype").length;
  const productCount = portfolio.filter((project) => project.type === "product").length;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
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

      <section aria-label={copy.index.listLabel} className="section-anchor px-4 md:px-12 bg-white">
        <div className="max-w-[72rem] mx-auto">
          <SectionHeading
            badge={copy.index.badge}
            title={copy.index.gridTitle}
            intro={
              <>
                {copy.index.counts(portfolio.length, clientCount, prototypeCount, productCount)} {copy.index.servicesLinkLead}{" "}
                <Link href={localePath(lang, "/services")} className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                  {copy.index.servicesLink}
                </Link>
                .
              </>
            }
          />

          <PortfolioClient lang={lang} />

          {/* No IoT project is published, and none is implied: the note says so
              and points to how an IoT engagement starts instead. */}
          <p className="type-body-card text-body text-center max-w-[62ch] mx-auto mt-12 pt-6 border-t border-line">
            {copy.index.iotNote}{" "}
            <Link href={localePath(lang, "/services#iot-hardware")} className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
              {copy.index.iotLink}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* The page's one ask: the solid button is WhatsApp, the outline one the brief form. */}
      <section className="section-standard px-4 md:px-12 bg-surface">
        <SectionHeading badge={copy.index.consultationBadge} title={copy.index.consultationTitle} intro={copy.index.consultationBody}>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 pt-4">
            <a
              href={getWhatsAppUrl(copy.index.consultationWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-primary=""
              className="btn btn-lg btn-primary"
            >
              {copy.index.consultationPrimary} <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </a>
            <Link href={localePath(lang, "/contact")} className="btn btn-lg btn-secondary">
              {copy.index.consultationSecondary} <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </SectionHeading>
      </section>
    </main>
  );
}

