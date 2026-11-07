"use client";

import { siteConfig, siteText, getWhatsAppUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ArrowUpRight, Building2, FileCheck, FileSpreadsheet, Lock } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = [Building2, FileCheck, FileSpreadsheet, Lock];

/**
 * Legal standing, in the shape of Cargon's contact-info cards: an icon in a
 * soft blue circle (solid blue on hover), the fact, its registration detail and
 * one line on why it matters. The request for documents is a secondary
 * button: the solid one stays reserved for starting a conversation.
 */
export default function TrustSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const trust = copy.trust;
  const [entity, oss, admin, nda] = trust.cards;

  /*
    Wording from content/home.ts; the registration numbers stay in config/site.ts.
    A registration number is set on its own line under its short label, so a
    code like AHU-A092678… is never broken at its hyphen mid-card.
  */
  const facts: { title: string; description: string; label?: string; detail: string; code?: boolean }[] = [
    { ...entity, label: entity.detail, detail: siteConfig.skAhu, code: true },
    { ...oss, title: `${oss.title}: ${siteConfig.nib}`, label: oss.detail, detail: siteText[lang].kbli },
    admin,
    nda,
  ];

  return (
    <section className="bg-surface section-support px-4 md:px-12" id="trust">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={copy.badges.trust} title={trust.title} intro={trust.intro} className="mb-10" />

        <RevealGroup className="fit-grid rail-mobile fit-sm-2 fit-lg-4" stagger={0.08}>
          {facts.map((fact, index) => {
            const Icon = ICONS[index];
            return (
              <RevealItem key={fact.title}>
                <article className="group h-full space-y-3 rounded-xl bg-white p-6 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="type-card-title break-words text-ink">{fact.title}</h3>
                  {fact.label ? (
                    <p className="space-y-0.5">
                      <span className="block type-meta text-body">{fact.label}</span>
                      <span className={`block type-meta text-brand ${fact.code ? "whitespace-nowrap text-[0.75rem] max-xl:whitespace-normal max-xl:[overflow-wrap:anywhere]" : ""}`}>{fact.detail}</span>
                    </p>
                  ) : (
                    <p className="type-meta text-brand">{fact.detail}</p>
                  )}
                  <p className="type-small text-body">{fact.description}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-8 flex flex-col justify-between gap-5 rounded-xl bg-white p-7 shadow-card md:flex-row md:items-center">
          <div className="max-w-[60ch] space-y-1">
            <h3 className="type-card-title text-ink">{trust.bannerTitle}</h3>
            <p className="type-small text-body">{trust.bannerBody}</p>
          </div>
          <a
            href={getWhatsAppUrl(trust.bannerMessage, lang, { service: lang === "id" ? "Dokumen legal & NIB perusahaan" : "Company legal documents & NIB" })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary shrink-0 self-start md:self-auto group"
          >
            <span>{trust.bannerCta}</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
