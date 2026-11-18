import { termsCopy } from "@/content/legal";
import { getProcess } from "@/data/process";
import JsonLd from "@/components/seo/JsonLd";
import { FlipIn } from "@/components/motion/Entrance";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import type { Locale } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";
import { LegalBody } from "./PrivacyPage";

/**
 * /terms: the page banner, then the shared legal body (sticky contents,
 * one readable column) with the five stages as a numbered list after the
 * sections.
 */
export default function TermsPage({ lang }: { lang: Locale }) {
  const copy = termsCopy[lang];

  const steps = (
    <div id="stages" className="scroll-mt-28 space-y-6">
      <FlipIn className="text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
        {copy.stepsHeading}
      </FlipIn>
      <RevealGroup className="border-t border-line" stagger={0.08}>
        {getProcess(lang).map((step) => (
          <RevealItem key={step.step} className="flex gap-5 border-b border-line py-6">
            <span aria-hidden="true" className="agx-panel-num shrink-0 text-ink">
              {String(step.step).padStart(2, "0")}
            </span>
            <div className="space-y-1.5 pt-1">
              <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="text-[1.0625rem] leading-[1.75] text-body">{step.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      <JsonLd data={[pageSchema("WebPage", "terms", lang), routeBreadcrumb(lang, "terms")]} />
      <PageBanner lang={lang} title={copy.title} crumbs={[{ name: copy.crumb }]} lede={copy.lede} />
      <LegalBody lang={lang} copy={copy} extra={steps} extraToc={{ id: "stages", heading: copy.stepsHeading }} />
    </main>
  );
}
