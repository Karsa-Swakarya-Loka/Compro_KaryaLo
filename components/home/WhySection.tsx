"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { homeCopy } from "@/content/home";
import { siteText } from "@/config/site";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Cargon's "Why We Are" block, for "how we partner": a photo mosaic on the
 * left (zooms out into place), the four partnering principles on the right as
 * a two-column check list, and the studio promise in a quote box with the blue
 * rule. On desktop the mosaic stretches to the text column, so its top meets
 * the badge and its bottom meets the button. It sits straight after the hero because it defines what
 * "extended IT partner" means before the services list what we build.
 */
export default function WhySection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const principles = copy.principles;

  return (
    <section className="bg-white section-anchor px-4 md:px-12" id="cara-bermitra">
      <div className="mx-auto grid max-w-[72rem] grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">

        {/* Mosaic: the studio wide on top, design and hardware below. Fixed ratio on phones, the text's height on desktop. */}
        <RevealGroup className="grid aspect-[6/7] grid-cols-2 grid-rows-[3fr_2fr] gap-5 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]" stagger={0.12}>
          <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative col-span-2 overflow-hidden rounded-xl shadow-card">
            <Image src="/images/pdf/team-about-v3.webp" alt="" fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover object-[50%_25%]" />
          </RevealItem>
          <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative overflow-hidden rounded-xl shadow-card">
            <Image src="/images/pdf/services-design-v5.webp" alt="" fill sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover" />
          </RevealItem>
          <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative overflow-hidden rounded-xl shadow-card">
            <Image src="/images/pdf/services-iot-v5.webp" alt="" fill sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover" />
          </RevealItem>
        </RevealGroup>

        <div className="space-y-8">
          <SectionHeading align="left" badge={copy.badges.why} title={principles.title} intro={principles.intro} />

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" stagger={0.08}>
            {principles.items.map((item) => (
              <RevealItem key={item.title} direction="right" distance={30} className="flex gap-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div className="space-y-1">
                  <h3 className="type-card-title text-ink">{item.title}</h3>
                  <p className="type-small text-body">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* The positioning in one sentence, in Cargon's quote box. */}
          <Reveal direction="right" className="rounded-xl border-l-4 border-brand bg-surface px-6 py-5">
            <p className="type-body text-ink">{siteText[lang].description}</p>
          </Reveal>

          <Reveal direction="right">
            <Link href={localePath(lang, "/about")} className="btn btn-secondary group">
              <span>{copy.cta.secondary}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
