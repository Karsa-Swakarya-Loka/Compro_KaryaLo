import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioCopy } from "@/content/portfolio-page";
import { homeCopy } from "@/content/home";
import { siteConfig, whatsappUrl } from "@/config/site";
import { getPortfolio } from "@/data/portfolio";
import { getProcess } from "@/data/process";
import { type Locale, localePath } from "@/lib/i18n";
import ProfileDownload from "@/components/ui/ProfileDownload";
import { Odometer } from "@/components/motion/Agx";
import { BlurText, FlipIn } from "@/components/motion/Entrance";
import TwistBandLazy from "@/components/home/TwistBandLazy";
import type { BandProject } from "@/components/home/TwistBand";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * The home hero: the centred headline and calls to action, then the Agenciex
 * template's "twist band" of real KaryaLo projects, all on the ribbon
 * background, then the row of solid stat cards. Each band card is a macOS
 * browser window showing the project's first screenshot whole.
 */
export default function HeroSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const hero = copy.hero;
  const portfolio = getPortfolio(lang);
  const projects: BandProject[] = portfolio.map((project) => ({
    title: project.title,
    href: localePath(lang, `/portfolio/${project.slug}`),
    // Band textures are pre-sized WebP copies in /images/band (1280px desktop, 768px phones), not the 1920px originals.
    image: bandTexture(project.galleryImages[0], 1280),
    imageSmall: bandTexture(project.galleryImages[0], 768),
    // The live address when the work is public, otherwise its case study on this site.
    url: (project.liveUrl ?? `${siteConfig.url}/portfolio/${project.slug}`).replace(/^https?:\/\//, ""),
  }));
  const stats: { figure?: string; count?: number; suffix?: string; label: string }[] = [
    ...copy.studio.commitments,
    { count: getProcess(lang).length, label: lang === "id" ? "tahap kerja yang transparan" : "transparent work stages" },
  ];

  return (
    <section className="agx-hero">
      <div className="agx-hero-stage">
        <div className="agx-wrap">
          <div className="agx-hero-copy">
            {/* Kept to four things: who we are, the promise, the one-line offer, two ways in. */}
            <p className="enter-up badge-pill">{hero.badge}</p>
            <FlipIn as="h1" delay={0.1}>
              {hero.headline.lead} <em>{hero.headline.accent}</em>
            </FlipIn>
            <BlurText className="agx-lede" delay={0.4}>{hero.audience}</BlurText>
            <div className="enter-up flex flex-wrap items-center justify-center gap-x-6 gap-y-3" style={{ "--i": 3 } as CSSProperties}>
              {/* `data-wa-primary`: the floating WhatsApp button steps aside while this one is on screen. */}
              <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-lg btn-primary">
                <WhatsAppIcon size={18} />
                <span>{hero.primaryCta}</span>
              </a>
              <ProfileDownload lang={lang} variant="link" className="text-link text-ink hover:text-brand" />
            </div>
          </div>
        </div>

        <div id="karya" className="scroll-mt-24">
          <TwistBandLazy projects={projects} />
          {/* The band is a canvas: the same projects as real links for keyboard and screen-reader users. */}
          <ul className="sr-only">
            {projects.map((project) => (
              <li key={project.href}>
                {/* Hidden from view, so not prefetched: ten RSC prefetches on load bought nothing. */}
                <Link href={project.href} prefetch={false}>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link href={localePath(lang, "/portfolio")} className="text-link text-ink hover:text-brand">
          {portfolioCopy[lang].allPortfolio}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="agx-wrap mt-10 md:mt-14">
        <div className="agx-stats">
          {stats.map((item) => (
            <div key={item.label} className="agx-stat">
              <span className="agx-stat-num">
                <Odometer value={item.count !== undefined ? String(item.count) : (item.figure ?? "")} />
                {item.suffix ? <sup>{item.suffix}</sup> : null}
              </span>
              <span className="agx-stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** `/images/portofolio/alina-store.webp` → `/images/band/alina-store-1280.webp`. */
function bandTexture(src: string, width: 1280 | 768) {
  const name = src.split("/").pop()!.replace(/\.webp$/, "");
  return `/images/band/${name}-${width}.webp`;
}
