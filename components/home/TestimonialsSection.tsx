import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { getTestimonials } from "@/data/testimonials";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal from "@/components/motion/Reveal";

/**
 * Server component on purpose: only client-approved testimonials leave the server, so drafts
 * waiting for approval are never shipped to the browser. Renders nothing until one is approved.
 */
export default function TestimonialsSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang].testimonials;
  const testimonials = getTestimonials(lang).filter((t) => t.approved && t.name);
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white section-band px-4 md:px-12" id="testimoni">
      <div className="max-w-[72rem] mx-auto space-y-10">
        <Reveal>
          <h2 className="type-section-title text-midnight">{copy.title}</h2>
        </Reveal>

        <div className={`grid grid-cols-1 gap-6 ${testimonials.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <figure className="h-full bg-white rounded-3xl p-7 md:p-8 border border-white shadow-sm shadow-midnight/5 flex flex-col gap-6">
                <Quote aria-hidden="true" className="w-7 h-7 text-mist-border" />
                <blockquote className="font-story text-base md:text-lg text-midnight leading-relaxed flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="pt-5 border-t border-slate-200/70 flex flex-wrap items-end justify-between gap-3">
                  <span>
                    <span className="block font-story font-bold text-midnight">{t.name}</span>
                    <span className="block type-small text-slate-600">{t.role}, {t.company}</span>
                  </span>
                  {t.projectSlug && (
                    <Link href={localePath(lang, `/portfolio/${t.projectSlug}`)} className="text-link">
                      {copy.projectLink} <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
