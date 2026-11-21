import Image from "next/image";
import Link from "next/link";
import { getProcess } from "@/data/process";
import { siteConfig, siteText } from "@/config/site";
import { aboutCopy } from "@/content/about";
import { commonCopy } from "@/content/common";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import ProfileDownload from "@/components/ui/ProfileDownload";
import { ArrowRight, ArrowUpRight, Briefcase, CircleCheck, Code2, Cpu, FileText, Handshake, MapPin, Palette } from "lucide-react";
import { Odometer } from "@/components/motion/Agx";
import { BlurText, FlyIn } from "@/components/motion/Entrance";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ContactCTA from "@/components/home/ContactCTA";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";

const UNIT_ICONS = { management: Briefcase, engineering: Code2, design: Palette, iot: Cpu, admin: FileText } as const;

/** The one icon treatment on this page: a round brand disc (as in TrustSection). */
const iconDisc = "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white";
/** H3 inside a card. */
const cardTitle = "text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-ink";

/*
  /about after Agenciex's About page: left-aligned banner with the giant phrase
  → one full-width studio photograph → the studio statement and its ruled list
  of figures (the commitments the site already makes) → the underlined
  one-line link → vision and mission → the five team functions beside a
  portrait → the five stages as a ruled list → where we work and the legal
  identity → the marquee bands and the closing conversation (ContactCTA).
  Server-rendered; only the motion wrappers and the closing CTA hydrate.
  Ruled lists keep real <ol>/<ul> semantics; each <li> holds a RevealItem,
  which takes its timing from the RevealGroup above through motion's context.
*/
export default function AboutClient({ lang }: { lang: Locale }) {
  const copy = aboutCopy[lang];
  const processSteps = getProcess(lang);
  const commitments = homeCopy[lang].studio.commitments;
  const crumb = commonCopy[lang].nav.find((link) => link.href === "/about")?.label ?? copy.hero.title;
  /* The NIB chip shows the number itself. */
  const chips = copy.hero.chips.map((chip, index) => (index === 1 ? `${chip}: ${siteConfig.nib}` : chip));

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      <PageBanner
        lang={lang}
        title={<>{copy.hero.title} <span className="text-brand">{copy.hero.accent}</span></>}
        crumbs={[{ name: crumb }]}
        lede={copy.hero.lede}
      >
        <ProfileDownload lang={lang} />
        <ul className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 pt-2">
          {chips.map((chip) => (
            <li key={chip} className="flex items-center gap-2 type-small text-ink">
              <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
              {chip}
            </li>
          ))}
        </ul>
      </PageBanner>

      {/* The team photograph across the column, flying in with the scroll. It is ~2.4:1 with all five
          people edge to edge on white, so it is shown whole (contain on white) instead of cropped on phones. */}
      <div className="agx-wrap">
        <FlyIn className="relative aspect-[16/9] lg:aspect-[21/9]">
          <div className="agx-photo h-full w-full bg-white">
            <Image src="/images/about-team.webp" alt={copy.studio.imageAlt} fill sizes="(min-width: 1344px) 80rem, 100vw" style={{ objectFit: "contain" }} />
          </div>
        </FlyIn>
      </div>

      {/* The studio statement, then the commitments as a ruled list of figures. */}
      <section className="agx-section" aria-labelledby="tentang">
        <div className="agx-wrap">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <SectionHeading align="left" badge={copy.badges.studio} id="tentang" title={copy.studio.title} intro={copy.studio.body} className="lg:col-span-7" />
            <RevealGroup className="self-end lg:col-span-5" stagger={0.08}>
              <ul className="border-t border-line">
                {copy.studio.points.map((point) => (
                  <li key={point} className="border-b border-line">
                    <RevealItem className="flex items-start gap-3 py-4 type-body text-ink">
                      <CircleCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                      <span>{point}</span>
                    </RevealItem>
                  </li>
                ))}
              </ul>
            </RevealGroup>
          </div>

          <RevealGroup className="mt-12 md:mt-14" stagger={0.1}>
            <ul className="border-t border-line">
              {commitments.map((item) => {
                const figure = item.figure ?? String(item.count ?? "");
                return (
                  <li key={item.label} className="border-b border-line">
                    <RevealItem className="grid grid-cols-1 items-center gap-3 py-8 sm:grid-cols-[minmax(13rem,0.8fr)_1.2fr] sm:gap-10 md:py-10">
                      <span className="flex items-start text-[clamp(3.5rem,2.4rem+4vw,6.5rem)] font-medium leading-none tracking-[-0.05em] text-ink">
                        <Odometer value={figure} />
                        {item.suffix && <sup aria-hidden="true" className="ml-1 text-[0.35em] font-medium leading-none text-brand">{item.suffix}</sup>}
                      </span>
                      {/* Sized to stand beside the big figure, not as body text. */}
                      <span className="max-w-[24ch] text-[clamp(1.5rem,1.05rem+1.7vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.025em] text-ink [text-wrap:balance]">
                        {item.suffix && <span className="sr-only">{item.suffix} </span>}
                        {item.label}
                      </span>
                    </RevealItem>
                  </li>
                );
              })}
            </ul>
          </RevealGroup>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="agx-card lg:col-span-7">
              <h3 className={cardTitle}>{copy.studio.promiseLabel}</h3>
              <p className="mt-3 type-body text-body">{copy.studio.promiseBody}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="agx-underline">
                <Link href={localePath(lang, "/services")} className="inline-flex min-h-11 items-center gap-2">
                  {copy.studio.cta}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision and mission: the vision as one blue statement, the missions as a numbered ruled list. */}
      <section className="agx-section" aria-labelledby="visi-misi">
        <div className="agx-wrap">
          <SectionHeading badge={copy.badges.vision} id="visi-misi" title={copy.vision.eyebrow} />

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal scaleFrom={0.97} className="flex flex-col justify-between gap-10 rounded-[1.75rem] bg-brand p-8 text-white md:p-10 lg:col-span-5">
              <h3 className="type-label text-cyan-soft">{copy.vision.visionLabel}</h3>
              <BlurText className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-light leading-snug tracking-[-0.02em] text-white">
                {copy.vision.vision}
              </BlurText>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <h3 className="type-label text-brand">{copy.vision.missionLabel}</h3>
              </Reveal>
              <RevealGroup className="mt-4" stagger={0.08}>
                <ol className="border-t border-line">
                  {copy.vision.missions.map((mission, index) => (
                    <li key={mission} className="border-b border-line">
                      <RevealItem className="flex items-center gap-5 py-5">
                        <span aria-hidden="true" className="agx-panel-num shrink-0 text-ink">{String(index + 1).padStart(2, "0")}</span>
                        <p className="max-w-[60ch] type-body text-ink">{mission}</p>
                      </RevealItem>
                    </li>
                  ))}
                </ol>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* The team as functions (no names are published), beside a studio portrait. */}
      <section className="agx-section" aria-labelledby="tim">
        <div className="agx-wrap">
          <SectionHeading badge={copy.badges.team} id="tim" title={copy.team.title} intro={copy.team.intro} />

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <FlyIn side="left" className="relative hidden lg:col-span-5 lg:block">
              <div className="agx-photo agx-tilt-l sticky top-28 aspect-[4/5] w-full">
                <Image src="/images/pdf/team-about-v3.webp" alt="" fill sizes="(min-width: 1024px) 32rem, 100vw" className="object-cover object-[50%_30%]" />
              </div>
            </FlyIn>

            <RevealGroup className="grid grid-cols-1 gap-4 lg:col-span-7" stagger={0.08}>
              {copy.team.units.map((unit) => {
                const Icon = UNIT_ICONS[unit.icon];
                return (
                  <RevealItem key={unit.name}>
                    <article className="agx-card flex items-start gap-5">
                      <span className={iconDisc}>
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <div className="space-y-1.5">
                        <h3 className={cardTitle}>{unit.name}</h3>
                        <p className="type-body-card text-body">{unit.body}</p>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* The five stages: a sequence, so a numbered ruled list. */}
      <section className="agx-section" aria-labelledby="cara-kerja">
        <div className="agx-wrap">
          <SectionHeading badge={copy.badges.process} id="cara-kerja" title={copy.process.title} intro={copy.process.intro} />

          <RevealGroup className="mt-14" stagger={0.08}>
            <ol className="border-t border-line">
              {processSteps.map((step) => (
                <li key={step.step} className="border-b border-line">
                  <RevealItem className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 py-7 md:grid-cols-[4rem_1fr_1.2fr] md:gap-x-10 md:py-9">
                    <span aria-hidden="true" className="agx-panel-num text-ink">{step.step}</span>
                    <h3 className="self-center text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-ink">{step.title}</h3>
                    <div className="col-span-2 space-y-3 md:col-span-1">
                      <p className="type-body text-body">{step.description}</p>
                      <p className="type-small text-body">
                        <span className="font-medium text-ink">{copy.process.youGet}:</span> {step.deliverables.join(" · ")}
                      </p>
                    </div>
                  </RevealItem>
                </li>
              ))}
            </ol>
          </RevealGroup>

          <Reveal className="mt-8">
            <Link href={localePath(lang, "/terms")} className="text-link inline-flex min-h-11 items-center text-brand">
              {copy.process.termsLink}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Where and how we work, then the registered company. */}
      <section className="agx-section" aria-labelledby="lokasi-legal">
        <div className="agx-wrap">
          <SectionHeading badge={copy.badges.coverage} id="lokasi-legal" title={copy.coverage.title} />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.1}>
            {[
              { icon: MapPin, title: copy.coverage.areaTitle, body: copy.coverage.areaBody },
              { icon: Handshake, title: copy.coverage.modelTitle, body: copy.coverage.modelBody },
            ].map(({ icon: Icon, title, body }) => (
              <RevealItem key={title} className="h-full">
                <article className="agx-card h-full space-y-4">
                  <span className={iconDisc}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className={cardTitle}>{title}</h3>
                  <p className="type-body-card text-body">{body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-5 rounded-[1.75rem] bg-ink p-7 text-white md:p-10">
            <div className="flex flex-col justify-between gap-5 border-b border-white/15 pb-6 md:flex-row md:items-center">
              <h3 className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-medium tracking-[-0.03em] text-white">{siteConfig.companyName}</h3>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-light self-start md:self-auto"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
                <span>{copy.legal.maps}</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            {/* Two across on tablets with the address underneath; three across from 1024px. */}
            <dl className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <dt className="type-meta text-cyan-soft">{copy.legal.nibLabel}</dt>
                <dd className="text-[1.375rem] font-medium tabular-nums text-white">{siteConfig.nib}</dd>
                <dd className="type-small text-white/75">{copy.legal.nibSource}</dd>
              </div>
              <div className="space-y-1">
                <dt className="type-meta text-cyan-soft">{copy.legal.kbliLabel}</dt>
                <dd className="text-[1.375rem] font-medium tabular-nums text-white">{siteConfig.kbliCode}</dd>
                <dd className="type-small text-white/75">{siteText[lang].kbli.split(": ")[1]}</dd>
              </div>
              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <dt className="type-meta text-cyan-soft">{copy.legal.addressLabel}</dt>
                <dd className="type-body-card text-white">{siteConfig.address}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Marquee bands and the closing conversation. */}
      <ContactCTA lang={lang} showAbout={false} />
    </main>
  );
}
