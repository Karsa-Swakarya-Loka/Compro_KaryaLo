"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { getPortfolio } from "@/data/portfolio";
import { portfolioCopy } from "@/content/portfolio-page";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, revealVariants } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Cargon's project grid ("Showcasing Our Expertise"): tall photo cards, each a
 * link to its case study, with the project's field and title on a dark fade at
 * the bottom and a round arrow that appears on hover. Three projects lead here;
 * the full archive is one button away.
 */
export default function PortfolioSection({ lang }: { lang: Locale }) {
  const copy = portfolioCopy[lang];
  const portfolio = getPortfolio(lang);
  const featured = ["alina-omnichannel", "deliastore", "apegale-corporate-web"]
    .map((id) => portfolio.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <section className="bg-white section-anchor px-4 md:px-12" id="portfolio">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={homeCopy[lang].badges.portfolio} title={copy.home.heading} intro={copy.home.intro} className="mb-10 md:mb-12" />

        <RevealGroup className="rail-mobile grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {featured.map((project) => (
            <motion.article key={project.id} variants={revealVariants()} data-reveal="" className="group relative">
              <Link
                href={localePath(lang, `/portfolio/${project.slug}`)}
                className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-500 hover:shadow-lift"
              >
                {/* The cover is a laptop mockup on a transparent ground: shown whole on the soft brand tint. */}
                <div className="img-zoom relative aspect-[4/3] bg-brand-soft">
                  <Image
                    src={project.coverImage}
                    alt={copy.coverAlt(project.title, project.client)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
                    className="object-contain p-4"
                  />
                  <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-brand text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:rotate-0 -rotate-45" aria-hidden="true">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex-1 space-y-2 p-6">
                  <span className="type-meta text-brand">{copy.types[project.type]} · {project.categoryLabel}</span>
                  <h3 className="type-card-title-lg text-ink">{project.title}</h3>
                  <p className="type-small text-body line-clamp-2">{project.impact ?? project.summary}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <Link href={localePath(lang, "/portfolio")} className="btn btn-secondary group">
            <span>{copy.allPortfolio}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
