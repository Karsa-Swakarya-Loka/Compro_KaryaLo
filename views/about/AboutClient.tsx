import Image from "next/image";
import Link from "next/link";
import { getProcess } from "@/data/process";
import { siteConfig, siteText } from "@/config/site";
import { aboutCopy } from "@/content/about";
import { commonCopy } from "@/content/common";
import { type Locale, localePath } from "@/lib/i18n";
import ProfileDownload from "@/components/ui/ProfileDownload";
import { ArrowRight, Briefcase, Check, CircleCheck, Code2, Cpu, FileText, Handshake, MapPin, Palette } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ContactCTA from "@/components/home/ContactCTA";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";

const UNIT_ICONS = { management: Briefcase, engineering: Code2, design: Palette, iot: Cpu, admin: FileText } as const;

/** Cargon's icon tile: soft blue at rest, the brand blue when its card is hovered. */
const iconTile =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white";

/*
  /about in the Cargon layout: banner → the "why us" studio block (collage,
  check list, promise box) → vision and mission → the team functions → the five
  stages → where we work and the legal identity → the closing conversation.
  Server-rendered; only the reveal wrappers and the closing CTA hydrate.
*/
export default function AboutClient({ lang }: { lang: Locale }) {
  const copy = aboutCopy[lang];
  const processSteps = getProcess(lang);
  const crumb = commonCopy[lang].nav.find((link) => link.href === "/about")?.label ?? copy.hero.title;
  /* The NIB chip shows the number itself. */
  const chips = copy.hero.chips.map((chip, index) => (index === 1 ? `${chip}: ${siteConfig.nib}` : chip));

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
      <PageBanner
        lang={lang}
        title={<>{copy.hero.title} <span className="text-brand">{copy.hero.accent}</span></>}
        crumbs={[{ name: crumb }]}
        lede={copy.hero.lede}
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {chips.map((chip) => (
            <li key={chip} className="flex items-center gap-2 type-small text-ink">
              <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
              {chip}
            </li>
          ))}
        </ul>
        <ProfileDownload lang={lang} />
      </PageBanner>

      {/*
        "Why we are": the studio collage beside the story, Cargon's about block.
        On desktop the collage stretches to the text column, so its top meets the
        badge and its bottom meets the button.
      */}
      <section className="section-anchor bg-white px-4 md:px-12">
        <div className="mx-auto grid max-w-[72rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <RevealGroup className="grid aspect-[6/7] grid-cols-2 grid-rows-[2fr_3fr] gap-4 sm:aspect-[4/3] sm:gap-6 lg:col-span-6 lg:aspect-auto lg:min-h-[34rem]" stagger={0.12}>
            <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative overflow-hidden rounded-2xl">
              {/* The top row is on screen at load and holds the page's largest paint: load it first. */}
              <Image src="/images/pdf/services-dev-v3.webp" alt="" fill priority sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover" />
            </RevealItem>
            <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative overflow-hidden rounded-2xl">
              <Image src="/images/pdf/services-iot-v3.webp" alt="" fill priority sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover" />
            </RevealItem>
            <RevealItem direction="left" scaleFrom={0.92} className="img-zoom relative col-span-2 overflow-hidden rounded-2xl">
              <Image src="/images/pdf/team-why-v2.webp" alt="" fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover object-[50%_20%]" />
            </RevealItem>
          </RevealGroup>

          <div className="space-y-7 lg:col-span-6">
            <SectionHeading align="left" badge={copy.badges.studio} title={copy.studio.title} intro={copy.studio.body} />

            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2" stagger={0.08}>
              {copy.studio.points.map((point) => (
                <RevealItem key={point} direction="right" distance={24} className="flex items-start gap-2.5">
                  <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="type-card-title text-ink">{point}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* The promise, in Cargon's quote box. */}
            <Reveal direction="right" className="rounded-r-2xl border-l-4 border-brand bg-surface p-6">
              <p className="type-card-title text-ink">{copy.studio.promiseLabel}</p>
              <p className="mt-2 type-body text-body">{copy.studio.promiseBody}</p>
            </Reveal>

            <Reveal direction="right">
              <Link href={localePath(lang, "/services")} className="btn btn-secondary">
                {copy.studio.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision and mission: the vision in Cargon's active blue card, the missions as checked cards. */}
      <section aria-labelledby="visi-misi" className="section-standard bg-surface px-4 md:px-12">
        <div className="mx-auto max-w-[72rem] space-y-12">
          <SectionHeading badge={copy.badges.vision} title={<span id="visi-misi">{copy.vision.eyebrow}</span>} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal direction="left" className="flex flex-col justify-between gap-8 rounded-3xl bg-brand p-8 text-white shadow-lift md:p-10 lg:col-span-5">
              <h3 className="type-label text-white">{copy.vision.visionLabel}</h3>
              <p className="type-statement text-white max-w-[32ch]">{copy.vision.vision}</p>
            </Reveal>

            <div className="space-y-4 lg:col-span-7">
              <Reveal direction="right">
                <h3 className="type-label text-brand">{copy.vision.missionLabel}</h3>
              </Reveal>
              <RevealGroup className="space-y-3" stagger={0.08}>
                {copy.vision.missions.map((mission) => (
                  <RevealItem key={mission} direction="right" distance={28} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <p className="type-body text-ink max-w-[62ch]">{mission}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Team functions as Cargon cards. No names are published, only what each function owns. */}
      <section className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-[72rem] space-y-12">
          <SectionHeading badge={copy.badges.team} title={copy.team.title} intro={copy.team.intro} />

          <RevealGroup className="fit-grid fit-sm-2 fit-lg-3" stagger={0.08}>
            {copy.team.units.map((unit) => {
              const Icon = UNIT_ICONS[unit.icon];
              return (
                <RevealItem key={unit.name} className="group h-full">
                  <article className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift">
                    <span className={iconTile}>
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className="type-card-title text-ink">{unit.name}</h3>
                    <p className="type-body-card text-body">{unit.body}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* The five stages: a sequence, so the cards keep their numbers. */}
      <section aria-labelledby="cara-kerja" className="section-standard bg-surface px-4 md:px-12">
        <div className="mx-auto max-w-[72rem] space-y-12">
          <SectionHeading badge={copy.badges.process} title={<span id="cara-kerja">{copy.process.title}</span>} intro={copy.process.intro} />

          <RevealGroup className="fit-grid fit-md-2 fit-lg-3" stagger={0.08}>
            {processSteps.map((step) => (
              <RevealItem key={step.step} className="h-full">
                <article className="relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl bg-white p-7 shadow-card">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 text-[5.5rem] font-bold leading-none text-brand-soft">
                    {step.step}
                  </span>
                  <span className="relative type-numeral text-brand">{step.step}</span>
                  <h3 className="relative type-card-title text-ink">{step.title}</h3>
                  <p className="relative type-body-card text-body">{step.description}</p>
                  <p className="relative mt-auto border-t border-line pt-4 type-small text-body">
                    <span className="font-semibold text-ink">{copy.process.youGet}:</span> {step.deliverables.join(" · ")}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="flex justify-center">
            <Link href={localePath(lang, "/terms")} className="text-link text-brand">
              {copy.process.termsLink}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Where and how we work, then the registered company in Cargon's blue card. */}
      <section className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto max-w-[72rem] space-y-12">
          <SectionHeading badge={copy.badges.coverage} title={copy.coverage.title} />

          <RevealGroup className="fit-grid fit-md-2" stagger={0.1}>
            {[
              { icon: MapPin, title: copy.coverage.areaTitle, body: copy.coverage.areaBody },
              { icon: Handshake, title: copy.coverage.modelTitle, body: copy.coverage.modelBody },
            ].map(({ icon: Icon, title, body }, index) => (
              <RevealItem key={title} direction={index === 0 ? "left" : "right"} className="group h-full">
                <article className="flex h-full gap-5 rounded-3xl border border-line bg-white p-7 shadow-card">
                  <span className={`${iconTile} rounded-full`}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="type-subhead text-ink">{title}</h3>
                    <p className="type-body text-body">{body}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal scaleFrom={0.96} className="rounded-3xl bg-brand p-8 text-white shadow-lift md:p-12">
            <div className="flex flex-col justify-between gap-6 border-b border-white/20 pb-6 md:flex-row md:items-center">
              <h3 className="type-card-title-lg text-white">{siteConfig.companyName}</h3>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary-light self-start md:self-auto"
              >
                {copy.legal.maps}
                <MapPin aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            {/* Two across on tablets with the address underneath; three across from 1024px. */}
            <dl className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <dt className="type-meta text-white/80">{copy.legal.nibLabel}</dt>
                <dd className="type-card-title-lg text-white tabular-nums">{siteConfig.nib}</dd>
                <dd className="type-small text-white/80">{copy.legal.nibSource}</dd>
              </div>
              <div className="space-y-1">
                <dt className="type-meta text-white/80">{copy.legal.kbliLabel}</dt>
                <dd className="type-card-title-lg text-white tabular-nums">{siteConfig.kbliCode}</dd>
                <dd className="type-small text-white/80">{siteText[lang].kbli.split(": ")[1]}</dd>
              </div>
              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <dt className="type-meta text-white/80">{copy.legal.addressLabel}</dt>
                <dd className="type-body-card text-white">{siteConfig.address}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Every page ends on a way to start the conversation. */}
      <ContactCTA lang={lang} />
    </main>
  );
}
