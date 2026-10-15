"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Counter from "@/components/ui/Counter";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Cargon's video block, rebuilt for who does the work: a wide studio photo
 * straddling white and the night band, a blue box of commitments overlapping
 * its corner (figures the site already promises — prototype within 7–14
 * working days, the source code is yours, three fields in one team — never
 * performance metrics), then the team and how we engage on the dark band.
 * There is no video, so there is no play button.
 */
export default function StudioSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const team = copy.team;
  const coverage = copy.coverage;

  return (
    <section className="relative bg-white pt-4" id="tim" data-surface="dark">
      <div className="absolute inset-x-0 bottom-0 top-48 bg-night md:top-72" aria-hidden="true" />

      <div className="relative px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <Reveal scaleFrom={0.94} className="img-zoom relative aspect-[16/10] overflow-hidden rounded-xl shadow-lift sm:aspect-[2/1] lg:aspect-[3/1]">
            <Image src="/images/about-studio.webp" alt={copy.studio.imageAlt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" aria-hidden="true" />
          </Reveal>

          {/* The commitments box, overlapping the photo's lower edge like Cargon's stats panel. */}
          <Reveal direction="up" className="relative z-10 -mt-12 grid grid-cols-1 gap-6 rounded-xl bg-brand p-7 shadow-lift sm:grid-cols-3 sm:gap-0 md:-mt-20 lg:ml-auto lg:w-[44rem]">
            {copy.studio.commitments.map((item, index) => (
              <div key={item.label} className={`space-y-1 sm:px-6 ${index > 0 ? "sm:border-l sm:border-white/25" : "sm:pl-0"}`}>
                <p className="type-numeral text-white">
                  {item.count !== undefined ? <Counter to={item.count} suffix={item.suffix ?? ""} /> : item.figure}
                </p>
                <p className="type-small text-white">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* The night band: who does the work, and where and how. */}
      <div className="relative px-4 pb-16 pt-14 md:px-12 md:pb-20 md:pt-16">
        <div className="mx-auto grid max-w-[72rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">

          <div className="space-y-8 lg:col-span-7">
            <SectionHeading align="left" tone="dark" badge={copy.badges.studio} title={team.title} intro={team.body} />

            <RevealGroup className="space-y-7" stagger={0.1}>
              <RevealItem direction="left" className="space-y-3">
                <h3 className="type-label text-cyan">{team.capabilitiesTitle}</h3>
                <ul className="flex flex-wrap gap-2">
                  {team.capabilities.map((item) => (
                    <li key={item} className="rounded-full border border-white/20 px-4 py-2 type-small text-white">{item}</li>
                  ))}
                </ul>
              </RevealItem>
              <RevealItem direction="left" className="space-y-3">
                <h3 className="type-label text-cyan">{team.stackTitle}</h3>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {team.stack.map((group) => (
                    <div key={group.group} className="space-y-0.5">
                      <dt className="type-meta text-midnight-muted">{group.group}</dt>
                      <dd className="type-body-card text-white">{group.items.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
              <RevealItem direction="left">
                <Link href={localePath(lang, "/about")} className="btn btn-secondary-light group">
                  <span>{team.profileLink}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal direction="right" className="space-y-6 rounded-xl bg-white/5 p-7 ring-1 ring-white/10 lg:col-span-5 md:p-8">
            <div className="space-y-3">
              <h3 className="type-subhead text-white">{coverage.title}</h3>
              <p className="type-body-card text-midnight-muted">{coverage.body}</p>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link text-cyan">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Google Maps
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-5">
              <h4 className="type-label text-cyan">{coverage.modesTitle}</h4>
              <ul className="flex flex-wrap gap-2">
                {coverage.modes.map((mode) => (
                  <li key={mode} className="rounded-full border border-white/20 px-4 py-2 type-small text-white">{mode}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 border-t border-white/10 pt-5">
              <h4 className="type-label text-cyan">{coverage.engagementsTitle}</h4>
              <dl className="space-y-4">
                {coverage.engagements.map((engagement) => (
                  <div key={engagement.title} className="space-y-1">
                    <dt className="type-card-title text-white">{engagement.title}</dt>
                    <dd className="type-body-card text-midnight-muted">{engagement.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
