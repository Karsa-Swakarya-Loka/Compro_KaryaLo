import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Reveal from "@/components/motion/Reveal";
import { FlyIn } from "@/components/motion/Entrance";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Why KaryaLo: the goal in one line, then a ruled comparison (the template's
 * table rhythm) of the usual IT vendor against working with KaryaLo, beside
 * one tilted studio photograph. Everything deeper (team, stages, legal
 * standing) lives on /about, linked once at the end.
 */
export default function AdvantageSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const adv = copy.advantage;

  return (
    <section className="agx-section" id="mengapa-karyalo">
      <div className="agx-wrap">
        <SectionHeading badge={copy.badges.why} title={adv.title} intro={adv.intro} />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <FlyIn side="left" className="relative hidden aspect-[4/5] lg:col-span-4 lg:block">
            <div className="agx-photo agx-tilt-l h-full">
              <Image src="/images/pdf/team-about-v3.webp" alt="" fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover object-[50%_30%]" />
            </div>
          </FlyIn>

          <div className="lg:col-span-8">
            {/* A real table: the comparison reads row by row for screen readers too. */}
            <table className="agx-compare w-full">
              <caption className="sr-only">{adv.title}</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">{lang === "id" ? "Aspek" : "Aspect"}</span></th>
                  <th scope="col">{adv.othersLabel}</th>
                  <th scope="col" className="agx-compare-us">{adv.usLabel}</th>
                </tr>
              </thead>
              <RevealGroup as="tbody" stagger={0.07}>
                {adv.rows.map((row) => (
                  <RevealItem as="tr" key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td>
                      <span className="agx-compare-cell">
                        <Minus aria-hidden="true" className="h-4 w-4 shrink-0 text-body/60" />
                        {row.others}
                      </span>
                    </td>
                    <td className="agx-compare-us">
                      <span className="agx-compare-cell">
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                        {row.us}
                      </span>
                    </td>
                  </RevealItem>
                ))}
              </RevealGroup>
            </table>

            <Reveal className="mt-8">
              <Link href={localePath(lang, "/about")} className="btn btn-dark">
                <span>{adv.link}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
