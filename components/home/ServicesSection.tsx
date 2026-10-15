"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Code2, Cpu, LifeBuoy, Palette } from "lucide-react";
import { getServices, supportServicesData } from "@/data/services";
import { homeCopy } from "@/content/home";
import { siteFeatures } from "@/config/site";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = { "digital-engineering": Code2, "creative-design": Palette, "iot-hardware": Cpu, support: LifeBuoy } as const;

/**
 * Cargon's service row: photo cards side by side, one of them open as a blue
 * panel with its details. Hovering or focusing a card opens it, and the others
 * narrow to their photograph. The fourth card is the support that keeps an
 * extended IT partner around after launch. On phones every card is open, as a
 * photo over its blue panel.
 */
export default function ServicesSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const services = copy.services;
  const maintenance = supportServicesData[lang].find((item) => item.id === "maintenance")!;
  const cards = [
    ...getServices(lang).map((pillar) => ({
      key: pillar.id as keyof typeof ICONS,
      title: pillar.name,
      short: pillar.shortName,
      body: pillar.focus,
      items: pillar.subServices.map((sub) => sub.name),
      image: pillar.image,
      href: `/services#${pillar.id}`,
    })),
    {
      key: "support" as const,
      title: maintenance.name,
      short: services.supportTitle,
      body: maintenance.description,
      items: maintenance.items,
      image: "/images/process-blueprint.webp",
      href: "/services#support",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <section className="bg-surface section-anchor px-4 md:px-12" id="services">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={copy.badges.services} title={services.title} intro={services.intro} className="mb-10 md:mb-12" />

        <RevealGroup className="rail-mobile flex flex-col gap-5 lg:h-[32rem] lg:flex-row" stagger={0.1}>
          {cards.map((card, i) => {
            const Icon = ICONS[card.key];
            const open = i === active;
            return (
              <RevealItem
                key={card.key}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-card lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ flexGrow: open ? 3.2 : 1 }}
              >
                <div
                  className="flex flex-1 flex-col lg:h-full"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <div className="img-zoom relative h-40 lg:absolute lg:inset-0 lg:h-auto">
                    <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" aria-hidden="true" />
                  </div>

                  {/* Closed state on desktop: just the field's short name over the photo. */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 hidden p-5 transition-opacity duration-500 lg:block ${open ? "opacity-0" : "opacity-100"}`}
                    aria-hidden="true"
                  >
                    <span className="type-card-title text-white">{card.short}</span>
                  </div>

                  {/* The blue panel: always shown on phones, the open card's face on desktop. */}
                  <div
                    className={`relative flex flex-1 flex-col justify-end gap-4 bg-brand p-7 text-white lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-none lg:transition-opacity lg:duration-500 ${
                      open ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"
                    }`}
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15">
                      <Icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </span>
                    <h3 className="type-card-title-lg text-white">{card.title}</h3>
                    <p className="type-body-card text-white max-w-[46ch]">{card.body}</p>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 type-small text-white">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={localePath(lang, card.href)} className="text-link self-start text-white">
                      {services.detailLink}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {siteFeatures.enableProductsSection && (
          <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="type-intro text-body">
              <span className="font-semibold text-ink">{services.productsTitle}</span> {services.productsBody}
            </p>
            <Link href={localePath(lang, "/products")} className="text-link text-brand">
              {services.productsLink}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
