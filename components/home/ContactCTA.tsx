"use client";

import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import DecorCurves from "@/components/ui/DecorCurves";

/**
 * The closing ask on every page that ends in a conversation — Cargon's blue
 * call-to-action band, held as one card on white so it does not run into the
 * blue footer below it. Largest title on the page, the page's last solid
 * button (white on blue), and the office details beside it as plain text.
 */
export default function ContactCTA({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang].cta;

  return (
    <section className="bg-white px-4 pb-16 pt-4 md:px-12 md:pb-20">
      <div className="mx-auto max-w-[72rem]">
        <Reveal scaleFrom={0.97} className="relative overflow-hidden rounded-3xl bg-brand px-7 py-12 text-white shadow-lift sm:px-10 md:px-14 md:py-16" >
          {/* White curves, the same gesture as the hero's, closing the page. */}
          <div className="pointer-events-none absolute inset-0 opacity-40 [&_path]:stroke-white" aria-hidden="true">
            <DecorCurves className="-right-10 -top-16 h-[30rem] w-auto rotate-180" />
          </div>

          <div className="relative z-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <RevealGroup className="space-y-6 lg:col-span-8" stagger={0.1} delayChildren={0.1}>
              <RevealItem>
                <h2 className="type-section-title-lg text-white max-w-[20ch]">{copy.title}</h2>
              </RevealItem>
              <RevealItem>
                <p className="type-intro text-white max-w-[56ch]">{copy.body}</p>
              </RevealItem>
              <RevealItem className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Magnetic className="inline-flex">
                  <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-lg btn-primary-light group">
                    <span>{copy.primary}</span>
                    <ArrowSwap />
                  </a>
                </Magnetic>
                <Link href={localePath(lang, "/about")} className="btn btn-lg btn-secondary-light group">
                  <span>{copy.secondary}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </RevealItem>
            </RevealGroup>

            <RevealItem direction="right" className="space-y-4 border-t border-white/25 pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="space-y-1">
                <p className="type-label text-cyan">{copy.officeLabel}</p>
                <p className="type-card-title text-white">{siteConfig.companyName}</p>
              </div>
              <ul className="space-y-3 type-small text-white">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                  <a href={`tel:${siteConfig.phone.replace(/[^+0-9]/g, "")}`} className="hover:underline">{siteConfig.phone}</a>
                </li>
              </ul>
              <p className="type-meta text-white">{copy.hours}</p>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
