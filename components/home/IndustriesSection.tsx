"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Check, CreditCard, Factory, Landmark, ShoppingBag, Truck, type LucideIcon } from "lucide-react";
import { getIndustries, type IndustryItem } from "@/data/industries";
import { getServices } from "@/data/services";
import { industryCopy } from "@/content/industry";
import { type Locale, localePath } from "@/lib/i18n";
import { motion } from "motion/react";
import Reveal, { REVEAL_VIEWPORT, revealVariants } from "@/components/motion/Reveal";
import { FlipIn } from "@/components/motion/Entrance";

const ICONS: Record<IndustryItem["id"], LucideIcon> = {
  retail: ShoppingBag,
  corporate: Landmark,
  "digital-products": CreditCard,
  distribution: Truck,
  manufacturing: Factory,
  property: Building2,
};

/**
 * Industries on the blue band: a numbered list of the six fields on the left
 * and, on the right, a white showcase card for the chosen one (photo, the
 * situation in the owner's words, what we would build, the fields involved).
 * Hover, focus, a click or the arrow keys pick an industry.
 */
export default function IndustriesSection({ lang }: { lang: Locale }) {
  const copy = industryCopy[lang];
  const industries = getIndustries(lang);
  const services = getServices(lang);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = industries[active];
  const pillarNames = current.pillars.map((id) => services.find((s) => s.id === id)?.name).filter((name): name is string => Boolean(name));
  const Icon = ICONS[current.id];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + industries.length) % industries.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="agx-band agx-ind" id="industri" data-surface="dark">
      <div className="agx-wrap">
        <div className="agx-ind-head">
          <div>
            <Reveal><span className="badge-pill" data-tone="dark">{copy.grid.badge}</span></Reveal>
            <FlipIn as="h2" className="mt-5 max-w-[16ch] text-[clamp(2.125rem,1.4rem+2.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] !text-white">
              {copy.grid.title}
            </FlipIn>
          </div>
          <Reveal className="lg:max-w-[26rem]">
            <p className="text-[1.0625rem] leading-relaxed text-white/85">{copy.hero.lede}</p>
          </Reveal>
        </div>

        <div className="agx-ind-layout">
          <motion.div
            role="tablist"
            aria-label={copy.grid.badge}
            aria-orientation="vertical"
            className="agx-ind-tabs"
            onKeyDown={onKeyDown}
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {industries.map((industry, index) => {
              const TabIcon = ICONS[industry.id];
              const selected = index === active;
              return (
                <motion.button
                  variants={revealVariants({ direction: "left" })}
                  key={industry.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ind-tab-${industry.id}`}
                  aria-selected={selected}
                  aria-controls="ind-panel"
                  tabIndex={selected ? 0 : -1}
                  className="agx-ind-tab"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="agx-ind-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="agx-ind-icon" aria-hidden="true"><TabIcon size={20} /></span>
                  <span className="agx-ind-name">{industry.name}</span>
                  <ArrowRight aria-hidden="true" className="agx-ind-go" size={18} />
                </motion.button>
              );
            })}
          </motion.div>

          <div key={current.id} id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${current.id}`} className="agx-ind-card agx-swap">
            <div className="agx-ind-photo">
              <Image src={`/images/industry/${current.id}.webp`} alt="" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
              <div className="agx-ind-photo-tag">
                <span className="agx-ind-photo-icon" aria-hidden="true"><Icon size={18} /></span>
                <span>{current.name}</span>
              </div>
            </div>

            <div className="agx-ind-body">
              <p className="agx-ind-label">{copy.card.problem}</p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{current.problem}</p>

              <p className="agx-ind-label mt-6">{copy.card.build}</p>
              <ul className="agx-ind-builds">
                {current.build.map((item) => (
                  <li key={item}>
                    <span className="agx-ind-check" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="agx-ind-foot">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="sr-only">{copy.card.fields}:</span>
                  {pillarNames.map((name) => (
                    <span key={name} className="agx-ind-chip">{name}</span>
                  ))}
                </div>
                <Link href={`${localePath(lang, "/industry")}#${current.id}`} className="btn btn-primary">
                  <span>{lang === "id" ? "Lihat detail" : "See details"}</span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
