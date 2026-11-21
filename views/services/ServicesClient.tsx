"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Lock,
  RotateCw,
  CheckCircle2,
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
  type LucideIcon,
} from "lucide-react";
import { getServices, supportServicesData, SERVICE_FOCUS_THUMB, type SupportService } from "@/data/services";
import { getPortfolio } from "@/data/portfolio";
import { getWhatsAppUrl, siteConfig, whatsappUrl } from "@/config/site";
import { IOT_PILLAR_ID, servicesPageCopy } from "@/content/services-page";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import { routeSeo } from "@/lib/seo";
import { FlyIn } from "@/components/motion/Entrance";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/home/ContactCTA";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/*
  /services after Agenciex's services page (2026-11-17):

    banner (badge, title, lede, jump links, giant phrase) → one large photograph
    → the range: blush cards two across, each an arrow down to its field → the
    underlined one-line conversation → one section per field (photo beside the
    header, its sub-services as blush cards, related work as a ruled table) →
    support as numbered sticky panels → commitments on the blue band → bands
    and the closing CTA.

  Solid blue is kept for starting a conversation, one per screen: each field's
  "Discuss …" and each support panel's WhatsApp button.
*/

/** Related projects shown per field; more are one button away in the portfolio. */
const PROOF_LIMIT = 6;

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

/*
  Landscape photographs chosen for the frames they fill on this page, so each
  one covers its box edge to edge instead of floating over a blurred copy of
  itself. Stock photos under the Unsplash License; decoration, not evidence.
*/
const SUPPORT_IMAGES: Record<SupportService["id"], { src: string; position: string }> = {
  maintenance: { src: "/images/services/maintenance.webp", position: "55% 50%" },
  scoping: { src: "/images/services/scoping.webp", position: "50% 45%" },
};

/* Per-field photo on this page; a field not listed keeps its image from data/services.ts. */
const PILLAR_PHOTOS: Record<string, { src: string; position: string }> = {
  "creative-design": { src: "/images/services/design-studio.webp", position: "40% 50%" },
  "iot-hardware": { src: "/images/services/iot-lab.webp", position: "55% 50%" },
};

/** `/images/portofolio/alina-store.webp` → `/images/band/alina-store-768.webp`, the hero band's copy. */
function bandTexture(src: string) {
  const name = src.split("/").pop()!.replace(/\.webp$/, "");
  return `/images/band/${name}-768.webp`;
}

/*
  The related-work hover preview, drawn as the same macOS browser window as the
  home hero's project cards (`.mac-window`): tab, address bar, then the
  project's first screenshot whole in a 16:9 viewport.
*/
function MacThumb({ title, url, src }: { title: string; url: string; src: string }) {
  return (
    <span className="mac-window block">
      <span className="mac-tabs">
        <span className="mac-lights"><i /><i data-c="y" /><i data-c="g" /></span>
        <span className="mac-tab"><span className="mac-favicon" /><span className="mac-tab-title">{title}</span></span>
      </span>
      <span className="mac-toolbar">
        <ArrowLeft /><ArrowRight /><RotateCw />
        <span className="mac-url"><Lock /><span>{url}</span></span>
      </span>
      <span className="mac-viewport block">
        <Image src={src} alt="" fill sizes="416px" className="!object-contain" />
      </span>
    </span>
  );
}

/* Icons pair with the guarantees by position; the copy module stays icon-free. */
const GUARANTEE_ICONS = [Layers, ShieldCheck];

export default function ServicesClient({ lang }: { lang: Locale }) {
  const copy = servicesPageCopy[lang];
  const home = homeCopy[lang];
  const services = getServices(lang);
  const portfolio = getPortfolio(lang);
  const supportServices = supportServicesData[lang];

  /* The glass tag on each support photo names the promise it stands for. */
  const supportTags: Record<SupportService["id"], string> = {
    maintenance: copy.promises[2],
    scoping: copy.promises[0],
  };

  const rangeCards = [
    ...services.map((pillar) => ({
      id: pillar.id as string,
      title: pillar.name,
      body: pillar.focus,
      image: pillar.image,
      focus: SERVICE_FOCUS_THUMB[pillar.id] ?? "50% 50%",
    })),
    {
      id: "support",
      title: copy.support.heading,
      body: copy.support.intro,
      image: "/images/pdf/team-why-v2.webp",
      focus: "50% 40%",
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
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
        <nav aria-label={copy.pillarNavLabel}>
          <ul className="flex flex-wrap gap-x-6">
            {[...services.map((pillar) => ({ id: pillar.id as string, label: pillar.shortName })), { id: "support", label: copy.supportNavLabel }].map(
              (item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-link min-h-11 text-brand">
                    {item.label}
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      </PageBanner>

      {/* One large photograph across the column, flying in with the scroll. */}
      <div className="agx-wrap">
        {/* 16:9 on phones (not 4:3): the photo is ~2.4:1 and a 4:3 crop cut off the people at either end. */}
        <FlyIn className="relative aspect-[16/9] lg:aspect-[21/9]">
          <div className="agx-photo h-full w-full">
            <Image src="/images/services/team-hero-v2.webp" alt="" fill sizes="(min-width: 1344px) 80rem, 100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
          </div>
        </FlyIn>
      </div>

      {/* The range: one blush card per field plus support, each an arrow to its section. */}
      <section aria-labelledby="services-range" className="agx-section">
        <div className="agx-wrap">
          <SectionHeading id="services-range" badge={copy.overview.badge} title={copy.overview.title} intro={copy.overview.intro} />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.1}>
            {rangeCards.map((card) => (
              <RevealItem key={card.id}>
                <article className="agx-card group flex h-full min-h-[22rem] flex-col">
                  <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.025em] text-ink">{card.title}</h3>
                  <p className="mt-3 max-w-[42ch] type-body-card text-body">{card.body}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <a href={`#${card.id}`} aria-label={`${copy.overview.more}: ${card.title}`} className="agx-arrow shrink-0">
                      <ArrowDown aria-hidden="true" size={22} />
                    </a>
                    <div className="img-zoom relative aspect-[4/3] w-[48%] max-w-[15rem] overflow-hidden rounded-2xl">
                      <Image src={card.image} alt="" fill sizes="240px" className="object-cover" style={{ objectPosition: card.focus }} />
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 text-center">
            <p className="agx-underline">
              {home.cta.title}{" "}
              <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">
                {home.hero.primaryCta}.
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {services.map((pillar, index) => {
        const reversed = index % 2 === 1;

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
        const titleId = `${pillar.id}-title`;

        return (
          <section key={pillar.id} id={pillar.id} aria-labelledby={titleId} className="agx-section border-t border-line">
            <div className="agx-wrap">
              {/* Header beside the photograph; sides alternate per field. */}
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={reversed ? "lg:order-2" : ""}>
                  <SectionHeading
                    align="left"
                    id={titleId}
                    badge={`${pillar.pillarNumber} · ${pillar.shortName}`}
                    title={pillar.name}
                    intro={pillar.focus}
                  >
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={getWhatsAppUrl(copy.discussMessage(pillar.name), lang, { service: pillar.name })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <WhatsAppIcon size={18} />
                        <span>{copy.discuss(pillar.shortName)}</span>
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                      <Link href={localePath(lang, "/contact")} className="btn btn-secondary">
                        <span>{copy.sendBrief}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </SectionHeading>
                </div>
                <FlyIn side={reversed ? "left" : "right"} className="relative aspect-[4/3]">
                  <div className="agx-photo h-full w-full">
                    <Image
                      src={PILLAR_PHOTOS[pillar.id]?.src ?? pillar.image}
                      alt={PILLAR_PHOTOS[pillar.id] ? "" : pillar.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 40rem, 100vw"
                      className="object-cover"
                      style={{ objectPosition: PILLAR_PHOTOS[pillar.id]?.position ?? "50% 50%" }}
                    />
                  </div>
                </FlyIn>
              </div>

              {/* What the field includes. */}
              <div className="mt-12 md:mt-14">
                <Reveal>
                  <h3 className="type-label text-ink">{copy.includedLabel}</h3>
                </Reveal>
                <RevealGroup className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                  {pillar.subServices.map((sub) => {
                    const SubIcon = SUB_ICONS[sub.code] ?? CheckCircle2;
                    return (
                      <RevealItem key={sub.code}>
                        <article className="agx-card flex h-full flex-col">
                          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                            <SubIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                          <h4 className="mt-6 text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-ink">{sub.name}</h4>
                          <p className="mt-3 flex-1 type-body-card text-body">{sub.description}</p>
                          <ul className="mt-6 space-y-2 border-t border-line pt-5">
                            {sub.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 type-small text-body">
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

              {/* Related work as the ruled table. */}
              {proof.length > 0 && (
                <div className="mt-12">
                  <Reveal>
                    <h3 className="type-label text-ink">{copy.proofHeading}</h3>
                  </Reveal>
                  <ul className="agx-table !mt-5">
                    {proof.slice(0, PROOF_LIMIT).map((project) => (
                      <li key={project.slug}>
                        <Link href={localePath(lang, `/portfolio/${project.slug}`)} className="agx-row group">
                          <span className="hidden md:inline">{project.year}</span>
                          <span className="hidden md:inline">{copy.projectType[project.type]}</span>
                          <span>
                            <strong>{project.client}</strong>
                            <span className="block text-sm md:hidden">
                              {project.title} · {project.year}
                            </span>
                          </span>
                          <span className="hidden md:inline">{project.title}</span>
                          <ArrowUpRight aria-hidden="true" className="h-5 w-5 justify-self-end text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:text-brand" />
                          <span className="agx-row-thumb" aria-hidden="true">
                            <MacThumb
                              title={project.title}
                              url={(project.liveUrl ?? `${siteConfig.url}/portfolio/${project.slug}`).replace(/^https?:\/\//, "")}
                              src={project.galleryImages[0] ? bandTexture(project.galleryImages[0]) : project.coverImage}
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {proof.length > PROOF_LIMIT && (
                    <Reveal className="mt-8 flex justify-center">
                      <Link href={localePath(lang, "/portfolio")} className="btn btn-dark">
                        <span>{copy.proofMore}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Reveal>
                  )}
                </div>
              )}

              {showIotNoProof && (
                <Reveal className="mt-12">
                  <div className="flex flex-col gap-5 rounded-[1.75rem] border border-dashed border-brand/40 bg-white/80 p-7 md:flex-row md:items-center md:justify-between md:gap-8 md:p-9">
                    <div className="max-w-[62ch] space-y-2">
                      <h3 className="text-[1.25rem] font-medium leading-snug text-ink">{copy.iotNoProof.heading}</h3>
                      <p className="type-body-card text-body">{copy.iotNoProof.body}</p>
                    </div>
                    {/* Outline: the field's "Discuss" button above is its one primary. */}
                    <a
                      href={getWhatsAppUrl(copy.iotNoProof.message, lang, { service: pillar.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary shrink-0 self-start md:self-center"
                    >
                      <WhatsAppIcon size={18} />
                      <span>{copy.iotNoProof.cta}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        );
      })}

      {/* Support as the template's numbered sticky panels. The footer and the
          home page link straight here (`/services#support`). */}
      <section id="support" aria-labelledby="support-title" className="agx-section border-t border-line">
        <div className="agx-wrap">
          <SectionHeading id="support-title" badge={copy.support.badge} title={copy.support.heading} intro={copy.support.intro} />

          <div className="agx-stack mt-14">
            {supportServices.map((service, index) => (
              <article key={service.id} className="agx-panel" aria-labelledby={`support-${service.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="agx-panel-num text-ink">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 id={`support-${service.id}`} className="agx-panel-title border-b border-line pb-6">
                  {service.name}
                </h3>
                <div className="agx-panel-body">
                  <div className="flex flex-col gap-6">
                    <p className="max-w-[48ch] type-intro text-body">{service.description}</p>
                    <ul className="space-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 type-body-card text-body">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={getWhatsAppUrl(copy.support.messages[service.id], lang, { service: service.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary self-start"
                    >
                      <WhatsAppIcon size={18} />
                      <span>{copy.support.cta}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                  <div className="agx-panel-media">
                    <Image
                      src={SUPPORT_IMAGES[service.id].src}
                      alt=""
                      fill
                      sizes="(min-width: 900px) 45vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: SUPPORT_IMAGES[service.id].position }}
                    />
                    <span className="agx-panel-tag">{supportTags[service.id]}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What every engagement comes with, on the page's one blue band. */}
      <section aria-labelledby="guarantees-title" data-surface="dark" className="agx-band">
        <div className="agx-wrap">
          <SectionHeading tone="dark" id="guarantees-title" badge={copy.guaranteesBadge} title={copy.guaranteesTitle} />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.12}>
            {copy.guarantees.map(({ title, description }, index) => {
              const Icon = GUARANTEE_ICONS[index] ?? Layers;
              return (
                <RevealItem key={title}>
                  <div className="flex h-full items-start gap-5 rounded-[1.75rem] border border-white/20 bg-white/10 p-7 md:p-8">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-[1.25rem] font-medium leading-snug text-white">{title}</h3>
                      <p className="max-w-[56ch] type-body-card text-white/85">{description}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Reveal className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {copy.promises.map((promise) => (
                <li key={promise} className="flex items-center gap-2 type-body-card text-white">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-soft" />
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Every page ends on the same bands and closing ask. */}
      <ContactCTA lang={lang} />
    </main>
  );
}
