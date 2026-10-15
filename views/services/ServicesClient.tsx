"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getServices, supportServicesData, type ServicePillar, type SupportService } from "@/data/services";
import { getPortfolio } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { IOT_PILLAR_ID, servicesPageCopy } from "@/content/services-page";
import { type Locale, localePath } from "@/lib/i18n";
import { routeSeo } from "@/lib/seo";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  Gauge,
  Globe,
  Layers,
  Network,
  Palette,
  PenTool,
  Presentation,
  Radio,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/home/ContactCTA";

/*
  /services in the Cargon manner (redesign 2026-10-15):

    banner → the range of services (expanding photo cards) → one section per
    field (photo + text, then its sub-service cards and proof) → support after
    launch → guarantees on the page's one dark band → closing CTA.

  The solid button stays reserved for starting a conversation: each field's
  "Diskusikan …" is its single primary; briefs, the IoT sample device and the
  support cards are outline buttons.
*/

const PILLAR_ICONS: Record<ServicePillar["id"], LucideIcon> = {
  "digital-engineering": Code2,
  "creative-design": PenTool,
  "iot-hardware": Cpu,
};

/* Sub-service icons, by the internal code (never rendered). */
const SUB_ICONS: Record<string, LucideIcon> = {
  "DEV-WEB": Globe,
  "DEV-APP": Smartphone,
  "DEV-ENT": Network,
  "DSG-UI": PenTool,
  "DSG-BRD": Palette,
  "DSG-MKT": Presentation,
  "IOT-HW": Cpu,
  "IOT-FW": Radio,
  "IOT-PLT": Gauge,
};

const SUPPORT_ICONS: Record<SupportService["id"], LucideIcon> = {
  maintenance: Wrench,
  scoping: Compass,
};

/* Icons pair with the guarantees by position; the copy module stays icon-free. */
const GUARANTEE_ICONS = [Layers, ShieldCheck];

/**
 * Cargon's "range of services" strip: photo cards in a row, one open at a
 * time. On wide screens the open card grows and turns brand blue with its
 * text; the others stay narrow photographs. Hover or keyboard focus opens a
 * card, and each card is one link down to its section. On phones every card
 * shows its text over a dark gradient, stacked.
 */
function ServiceRange({
  items,
  more,
}: {
  items: { id: string; href: string; title: string; body: string; image: string; Icon: LucideIcon }[];
  more: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:flex lg:h-[27rem]" stagger={0.1}>
      {items.map((item, index) => {
        const open = index === active;
        const Icon = item.Icon;
        return (
          <RevealItem
            key={item.id}
            className={`relative min-h-[20rem] overflow-hidden rounded-3xl shadow-card transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-0 lg:basis-0 ${
              open ? "lg:grow-[3.2]" : "lg:grow"
            }`}
          >
            <a
              href={item.href}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group absolute inset-0 block"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              {/* Phones: a dark gradient under the text. Wide screens: solid brand
                  blue on the open card, a light wash on the closed ones. */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent transition-opacity duration-500 lg:bg-none ${
                  open ? "lg:bg-brand lg:opacity-[0.94]" : "lg:bg-ink/15"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-7 transition-opacity duration-500 lg:w-[24rem] ${
                  open ? "lg:opacity-100" : "lg:opacity-0"
                }`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="type-card-title-lg text-white">{item.title}</span>
                <span className="type-body-card text-white">{item.body}</span>
                <span className="text-link text-white">
                  {more} <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </span>
              </span>
              {/* Closed cards on wide screens keep a quiet marker of what they are. */}
              <span
                aria-hidden="true"
                className={`absolute bottom-6 left-1/2 hidden h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-white text-brand shadow-card transition-opacity duration-500 lg:grid ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
            </a>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

export default function ServicesClient({ lang }: { lang: Locale }) {
  const copy = servicesPageCopy[lang];
  const services = getServices(lang);
  const portfolio = getPortfolio(lang);
  const supportServices = supportServicesData[lang];

  const rangeItems = [
    ...services.map((pillar) => ({
      id: pillar.id,
      href: `#${pillar.id}`,
      title: pillar.name,
      body: pillar.focus,
      image: pillar.image,
      Icon: PILLAR_ICONS[pillar.id],
    })),
    {
      id: "support",
      href: "#support",
      title: copy.support.heading,
      body: copy.support.intro,
      image: "/images/about-studio.webp",
      Icon: Wrench,
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col bg-white">
      <PageBanner
        lang={lang}
        title={
          <>
            {copy.hero.title} <span className="text-brand">{copy.hero.titleAccent}</span>
          </>
        }
        crumbs={[{ name: routeSeo.services.text[lang].breadcrumb ?? routeSeo.services.text[lang].title }]}
        lede={copy.hero.lede}
      >
        {/* In-page jump links: quiet words with a down arrow. */}
        <nav aria-label={copy.pillarNavLabel}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {services.map((pillar) => (
              <li key={pillar.id}>
                <a href={`#${pillar.id}`} className="text-link text-brand">
                  {pillar.shortName} <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </a>
              </li>
            ))}
            <li>
              <a href="#support" className="text-link text-brand">
                {copy.supportNavLabel} <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </nav>
      </PageBanner>

      {/* The range of services. */}
      <section aria-label={copy.overview.title} className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <SectionHeading badge={copy.overview.badge} title={copy.overview.title} intro={copy.overview.intro} />
          <ServiceRange items={rangeItems} more={copy.overview.more} />
        </div>
      </section>

      {services.map((pillar, index) => {
        /* Photo and text swap sides each field; each enters from the side it sits on. */
        const reversed = index % 2 === 1;
        const textFrom = reversed ? "right" : "left";
        const photoFrom = reversed ? "left" : "right";
        const surface = index % 2 === 0 ? "bg-surface" : "bg-white";
        const cardSurface = index % 2 === 0 ? "bg-white" : "bg-surface";
        const PillarIcon = PILLAR_ICONS[pillar.id];

        /* Proof, matched the same way the case study page does it: a project's
           `serviceCode` against this field's sub-service codes. */
        const pillarCodes = pillar.subServices.map((sub) => sub.code);
        const proof = portfolio.filter((project) =>
          project.serviceCode
            .split("//")
            .map((code) => code.trim())
            .some((code) => pillarCodes.includes(code)),
        );
        /* IoT has no published project yet: the page says so, and offers the
           sample device every IoT project starts with. */
        const showIotNoProof = proof.length === 0 && pillar.id === IOT_PILLAR_ID;

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            aria-label={pillar.name}
            className={`section-standard px-4 md:px-12 ${surface}`}
          >
            <div className="mx-auto max-w-[72rem]">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Photo: zooms on hover, sits on an offset brand frame. On desktop it takes the text column's height, edge to edge. */}
                <RevealItem
                  direction={photoFrom}
                  scaleFrom={0.92}
                  className={`relative ${reversed ? "lg:order-2" : ""}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-3xl border-2 border-brand ${reversed ? "-translate-x-4" : "translate-x-4"} translate-y-4`}
                  />
                  <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card lg:aspect-auto lg:h-full lg:min-h-[22rem]">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                      className="object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift ${reversed ? "right-6" : "left-6"}`}>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                      <PillarIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="type-label text-ink">{pillar.shortName}</span>
                  </div>
                </RevealItem>

                <RevealItem direction={textFrom} className="space-y-7">
                  <SectionHeading align="left" badge={pillar.shortName} title={pillar.name} intro={pillar.focus} />
                  <ul className="hidden gap-3 sm:grid sm:grid-cols-2">
                    {pillar.subServices.map((sub) => (
                      <li key={sub.code} className="type-body-card flex items-start gap-2.5 font-medium text-ink">
                        <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        <span>{sub.name}</span>
                      </li>
                    ))}
                  </ul>
                  {/* The field's one solid button, then the brief as an outline. */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={getWhatsAppUrl(copy.discussMessage(pillar.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {copy.discuss(pillar.shortName)}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    <Link href={localePath(lang, "/contact")} className="btn btn-secondary">
                      {copy.sendBrief}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </RevealItem>
              </div>

              {/* What the field includes: Cargon service cards. */}
              <div className="mt-14 space-y-6 md:mt-20">
                <Reveal>
                  <h3 className="type-subhead text-center text-ink">{copy.includedLabel}</h3>
                </Reveal>
                <RevealGroup className="rail-mobile md-orphan-center grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                  {pillar.subServices.map((sub) => {
                    const SubIcon = SUB_ICONS[sub.code] ?? CheckCircle2;
                    return (
                      <RevealItem key={sub.code} className="h-full">
                        <article
                          className={`group flex h-full flex-col rounded-3xl border border-line p-7 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lift ${cardSurface}`}
                        >
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                            <SubIcon aria-hidden="true" className="h-6 w-6" />
                          </span>
                          <h4 className="type-card-title mt-6 text-ink">{sub.name}</h4>
                          <p className="type-body-card mt-3 text-body">{sub.description}</p>
                          <ul className="mt-5 space-y-2 border-t border-line pt-5">
                            {sub.items.map((item) => (
                              <li key={item} className="type-small flex items-start gap-2 text-body">
                                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </div>

              {proof.length > 0 && (
                <div className="mt-16 space-y-6">
                  <Reveal>
                    <h3 className="type-subhead text-center text-ink">{copy.proofHeading}</h3>
                  </Reveal>
                  <RevealGroup className="rail-mobile md-orphan-center grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                    {proof.map((project) => (
                      <RevealItem key={project.slug} className="h-full">
                        <Link
                          href={localePath(lang, `/portfolio/${project.slug}`)}
                          className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lift ${cardSurface}`}
                        >
                          <span className="img-zoom relative block aspect-[16/10] border-b border-line bg-surface">
                            <Image
                              src={project.galleryImages[0] ?? project.coverImage}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                              className="object-cover object-top"
                            />
                          </span>
                          <span className="flex flex-1 flex-col gap-2 p-6">
                            <span className="type-meta text-brand">{project.serviceTags.join(" · ")}</span>
                            <span className="type-card-title text-ink transition-colors group-hover:text-brand">{project.title}</span>
                            <span className="type-body-card text-body">{project.summary}</span>
                            <span className="type-meta mt-auto inline-flex items-center gap-1.5 pt-2 text-ink">
                              {copy.projectType[project.type]} · {project.year}
                              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-brand transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                          </span>
                        </Link>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              )}

              {showIotNoProof && (
                <Reveal className="mt-16">
                  <div className="flex flex-col gap-5 rounded-3xl border border-dashed border-brand/40 bg-brand-soft p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
                    <div className="flex items-start gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-card">
                        <Cpu aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="type-card-title text-ink">{copy.iotNoProof.heading}</h3>
                        <p className="type-body-card max-w-[60ch] text-body">{copy.iotNoProof.body}</p>
                      </div>
                    </div>
                    {/* Outline: the field's "Diskusikan" button above is its one primary. */}
                    <a
                      href={getWhatsAppUrl(copy.iotNoProof.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm shrink-0 self-start md:self-center"
                    >
                      {copy.iotNoProof.cta}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        );
      })}

      {/* What keeps an extended IT partner around after handover. The footer
          links straight here (`/services#support`). */}
      <section id="support" aria-label={copy.support.heading} className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <SectionHeading badge={copy.support.badge} title={copy.support.heading} intro={copy.support.intro} />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14" stagger={0.12}>
            {supportServices.map((service, index) => {
              const Icon = SUPPORT_ICONS[service.id];
              /* The first card takes Cargon's solid blue "active" treatment. */
              const featured = index === 0;
              return (
                <RevealItem key={service.id} direction={index === 0 ? "left" : "right"} className="h-full">
                  <article
                    className={`group flex h-full flex-col gap-6 rounded-3xl p-7 md:p-9 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
                      featured ? "bg-brand text-white shadow-lift" : "border border-line bg-white shadow-card hover:shadow-lift"
                    }`}
                  >
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-300 ${
                        featured ? "bg-white/15 text-white" : "bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <div className="space-y-3">
                      <h3 className={`type-card-title-lg ${featured ? "text-white" : "text-ink"}`}>{service.name}</h3>
                      <p className={`type-body-card ${featured ? "text-white" : "text-body"}`}>{service.description}</p>
                    </div>
                    <ul className={`space-y-2.5 border-t pt-5 ${featured ? "border-white/20" : "border-line"}`}>
                      {service.items.map((item) => (
                        <li key={item} className={`type-small flex items-start gap-2 ${featured ? "text-white" : "text-body"}`}>
                          <CheckCircle2 aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-cyan" : "text-brand"}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={getWhatsAppUrl(copy.support.messages[service.id])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-sm mt-auto self-start ${featured ? "btn-secondary-light" : "btn-secondary"}`}
                    >
                      {copy.support.cta}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* The page's one dark band: what every engagement comes with. */}
      <section aria-label={copy.guaranteesLabel} data-surface="dark" className="section-standard bg-night px-4 md:px-12">
        <div className="mx-auto max-w-[72rem]">
          <SectionHeading tone="dark" badge={copy.guaranteesBadge} title={copy.guaranteesTitle} />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.12}>
            {copy.guarantees.map(({ title, description }, index) => {
              const Icon = GUARANTEE_ICONS[index] ?? Layers;
              return (
                <RevealItem key={title} className="h-full">
                  <div className="flex h-full items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="type-card-title text-white">{title}</h3>
                      <p className="type-body-card max-w-[56ch] text-midnight-muted">{description}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Reveal className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {copy.promises.map((promise) => (
                <li key={promise} className="type-body-card flex items-center gap-2 text-white">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Every page ends on the same closing ask. */}
      <ContactCTA lang={lang} />
    </main>
  );
}

