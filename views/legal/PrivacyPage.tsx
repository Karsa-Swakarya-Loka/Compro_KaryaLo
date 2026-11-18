import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { privacyCopy } from "@/content/legal";
import JsonLd from "@/components/seo/JsonLd";
import { FlipIn } from "@/components/motion/Entrance";
import Reveal from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import { type Locale, localePath } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";

/** Stable anchor from a section heading: "Kerahasiaan & NDA" → "kerahasiaan-nda". */
export function legalAnchor(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface LegalCopy {
  translationNote: string | null;
  sections: { heading: string; body: string }[];
  contactHeading: string;
  contactBefore: string;
  contactAfter: string;
  contactLink: string;
}

/**
 * The body shared by /privacy and /terms, after Agenciex's text pages: a
 * sticky table of contents on desktop beside one readable column (~68ch),
 * numbered H2 sections with generous line-height, and a closing blush panel
 * with the email and a dark pill to the contact page. `extra` lands after the
 * sections (the terms page's five stages) and `extraToc` lists it in the TOC.
 */
export function LegalBody({
  lang,
  copy,
  extra,
  extraToc,
}: {
  lang: Locale;
  copy: LegalCopy;
  extra?: ReactNode;
  extraToc?: { id: string; heading: string };
}) {
  const toc = [
    ...copy.sections.map((section) => ({ id: legalAnchor(section.heading), heading: section.heading })),
    ...(extraToc ? [extraToc] : []),
    { id: "contact", heading: copy.contactHeading },
  ];

  return (
    <section className="agx-section !pt-6 md:!pt-10">
      <div className="agx-wrap grid grid-cols-1 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
        <aside className="hidden lg:block">
          <nav aria-label={lang === "en" ? "On this page" : "Di halaman ini"} className="sticky top-28">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand">
              {lang === "en" ? "On this page" : "Di halaman ini"}
            </p>
            <ol className="mt-4 space-y-0.5 border-l border-line">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px flex min-h-9 items-center border-l-2 border-transparent py-1.5 pl-4 text-[0.9375rem] leading-snug text-body transition-colors hover:border-brand hover:text-ink"
                  >
                    {item.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[68ch] space-y-14">
          {copy.translationNote && (
            <Reveal className="flex items-start gap-3 rounded-2xl border border-line bg-white/80 p-5">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="type-small text-body">{copy.translationNote}</p>
            </Reveal>
          )}

          {copy.sections.map((section, index) => (
            <div key={section.heading} id={legalAnchor(section.heading)} className="scroll-mt-28 space-y-4">
              <p aria-hidden="true" className="text-[0.875rem] font-medium tabular-nums tracking-[0.08em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <FlipIn className="text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                {section.heading}
              </FlipIn>
              <Reveal>
                <p className="text-[1.0625rem] leading-[1.8] text-body">{section.body}</p>
              </Reveal>
            </div>
          ))}

          {extra}

          <Reveal className="agx-card scroll-mt-28" id="contact">
            <div className="space-y-4">
              <FlipIn className="text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                {copy.contactHeading}
              </FlipIn>
              <p className="text-[1.0625rem] leading-[1.8] text-body">
                {copy.contactBefore}{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-ink underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  {siteConfig.email}
                </a>
                {copy.contactAfter}
              </p>
              <div className="pt-2">
                <Link href={localePath(lang, "/contact")} className="btn btn-dark">
                  <span>{copy.contactLink}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  );
}

/** /privacy: the page banner, then the shared legal body. */
export default function PrivacyPage({ lang }: { lang: Locale }) {
  const copy = privacyCopy[lang];

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      <JsonLd data={[pageSchema("WebPage", "privacy", lang), routeBreadcrumb(lang, "privacy")]} />
      <PageBanner lang={lang} title={copy.title} crumbs={[{ name: copy.crumb }]} lede={copy.lede} />
      <LegalBody lang={lang} copy={copy} />
    </main>
  );
}
