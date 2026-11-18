import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProcess } from "@/data/process";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The five stages at a glance, in the template's ruled-table rhythm: number,
 * stage, one line. What each stage delivers is on /about#cara-kerja.
 */
export default function ProcessSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const process = copy.process;
  const steps = getProcess(lang);

  return (
    <section className="agx-section" id="process">
      <div className="agx-wrap">
        <SectionHeading badge={copy.badges.process} title={process.title} />

        <RevealGroup as="ol" className="agx-table mx-auto max-w-5xl" stagger={0.08}>
          {steps.map((step) => (
            <RevealItem as="li" key={step.step} className="agx-step">
              <span className="agx-panel-num">{step.step}</span>
              <h3 className="text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-medium leading-tight tracking-[-0.025em] text-ink">{step.title}</h3>
              <p className="type-body-card text-body">{step.tagline}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <Link href={localePath(lang, "/about#cara-kerja")} className="btn btn-dark">
            <span>{lang === "id" ? "Lihat detail tiap tahap" : "See each stage in detail"}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
