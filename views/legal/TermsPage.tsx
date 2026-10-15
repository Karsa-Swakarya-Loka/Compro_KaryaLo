import Link from "next/link";
import { ArrowRight, Info, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { termsCopy } from "@/content/legal";
import { getProcess } from "@/data/process";
import JsonLd from "@/components/seo/JsonLd";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import { type Locale, localePath } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";

/** /terms in the Cargon layout: banner, one readable white article column, the five stages as numbered cards. */
export default function TermsPage({ lang }: { lang: Locale }) {
  const copy = termsCopy[lang];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
      <JsonLd data={[pageSchema("WebPage", "terms", lang), routeBreadcrumb(lang, "terms")]} />

      <PageBanner lang={lang} title={copy.title} crumbs={[{ name: copy.crumb }]} lede={copy.lede} />

      <section className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-3xl space-y-10">
          {copy.translationNote && (
            <Reveal className="flex items-start gap-3 rounded-2xl bg-surface p-5">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="type-small text-body">{copy.translationNote}</p>
            </Reveal>
          )}

          <RevealGroup className="space-y-10" stagger={0.06}>
            {copy.sections.map((section) => (
              <RevealItem key={section.heading} distance={24} className="space-y-3">
                <h2 className="type-subhead text-ink">{section.heading}</h2>
                <p className="type-body text-body max-w-[68ch]">{section.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="space-y-5">
            <Reveal>
              <h2 className="type-subhead text-ink">{copy.stepsHeading}</h2>
            </Reveal>
            <RevealGroup className="space-y-4" stagger={0.08}>
              {getProcess(lang).map((step) => (
                <RevealItem key={step.step} direction="right" distance={28} className="flex gap-5 rounded-3xl bg-white p-6 shadow-card border border-line">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft type-card-title text-brand tabular-nums">
                    {step.step}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="type-card-title text-ink">{step.title}</h3>
                    <p className="type-body-card text-body">{step.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="flex flex-col gap-5 rounded-3xl bg-surface p-7 sm:flex-row sm:items-start md:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Mail aria-hidden="true" className="h-6 w-6" />
            </span>
            <div className="space-y-3">
              <h2 className="type-subhead text-ink">{copy.contactHeading}</h2>
              <p className="type-body text-body max-w-[68ch]">
                {copy.contactBefore}{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                  {siteConfig.email}
                </a>
                {copy.contactAfter}
              </p>
              <Link href={localePath(lang, "/contact")} className="btn btn-sm btn-secondary">
                {copy.contactLink}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
