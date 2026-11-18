import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getServices, supportServicesData, SERVICE_FOCUS_THUMB } from "@/data/services";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * What we do, in brief: the three fields and the after-launch support as four
 * blush cards (title, one line, picture, arrow). Every detail — sub-services,
 * deliverables, related projects — is on /services, which each card opens.
 */
export default function ServicesSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const services = copy.services;
  const maintenance = supportServicesData[lang].find((item) => item.id === "maintenance")!;
  const cards = [
    ...getServices(lang).map((pillar) => ({
      key: pillar.id as string,
      title: pillar.name,
      body: pillar.focus,
      image: pillar.image,
      focus: SERVICE_FOCUS_THUMB[pillar.id] ?? "50% 50%",
      href: `/services#${pillar.id}`,
    })),
    {
      key: "support",
      title: maintenance.name,
      body: maintenance.description,
      image: "/images/pdf/desk-contact-v2.webp",
      focus: "50% 50%",
      href: "/services#support",
    },
  ];

  return (
    <section className="agx-section" id="services">
      <div className="agx-wrap">
        <SectionHeading badge={copy.badges.services} title={services.title} intro={services.intro} />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.1}>
          {cards.map((card) => (
            <RevealItem key={card.key}>
              <Link href={localePath(lang, card.href)} className="agx-card group flex h-full min-h-[19rem] flex-col">
                <h3 className="max-w-[18ch] text-[1.5rem] font-medium leading-tight tracking-[-0.025em] text-ink">{card.title}</h3>
                <p className="mt-3 line-clamp-2 max-w-[38ch] type-body-card text-body">{card.body}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <span className="agx-arrow" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                  <span className="relative aspect-[4/3] w-[52%] max-w-[17rem] overflow-hidden rounded-2xl shadow-card">
                    <Image src={card.image} alt="" fill sizes="272px" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: card.focus }} />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <Link href={localePath(lang, "/services")} className="btn btn-dark">
            <span>{services.detailLink}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
