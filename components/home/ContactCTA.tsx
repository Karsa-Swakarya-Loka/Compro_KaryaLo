import Link from "next/link";
import { siteConfig, siteText, whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FlipIn } from "@/components/motion/Entrance";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * Two tilted bands that run in opposite directions with the slogan and the
 * team's capabilities (Agenciex's marquee), then the closing blue panel with
 * the one conversation button and the office details.
 */
/** `showAbout={false}` on the About page itself, where the secondary link would point to the page you are on. */
export default function ContactCTA({ lang, showAbout = true }: { lang: Locale; showAbout?: boolean }) {
  const copy = homeCopy[lang].cta;
  const phrases = [siteText[lang].tagline, ...homeCopy[lang].team.capabilities];
  const loop = [...phrases, ...phrases];

  return (
    <section className="pb-6" aria-labelledby="cta-title">
      <div className="agx-bands" aria-hidden="true">
        <div className="agx-band-strip alt">
          <div className="agx-band-track">
            {[...loop].reverse().map((text, i) => (
              <span key={i}>{text}.</span>
            ))}
          </div>
        </div>
        <div className="agx-band-strip main">
          <div className="agx-band-track">
            {loop.map((text, i) => (
              <span key={i}>{text}.</span>
            ))}
          </div>
        </div>
      </div>

      <div className="agx-wrap">
        <Reveal scaleFrom={0.97} className="agx-cta">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <RevealGroup className="space-y-6 lg:col-span-8" stagger={0.1} delayChildren={0.1}>
              <RevealItem>
                <FlipIn as="h2" id="cta-title" className="agx-h2 max-w-[18ch] !text-white">{copy.title}</FlipIn>
              </RevealItem>
              <RevealItem>
                <p className="type-intro max-w-[56ch] text-white/90">{copy.body}</p>
              </RevealItem>
              <RevealItem className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <Magnetic className="inline-flex">
                  <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-lg btn-primary-light">
                    <WhatsAppIcon size={18} />
                    <span>{copy.primary}</span>
                  </a>
                </Magnetic>
                {showAbout && (
                  <Link href={localePath(lang, "/about")} className="btn btn-lg btn-secondary-light">
                    <span>{copy.secondary}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </RevealItem>
            </RevealGroup>

            <RevealItem direction="right" className="space-y-4 border-t border-white/25 pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="space-y-1">
                <p className="type-label text-cyan-soft">{copy.officeLabel}</p>
                <p className="text-[1.125rem] font-medium text-white">{siteConfig.companyName}</p>
              </div>
              <ul className="space-y-3 type-small text-white">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-soft" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-soft" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-soft" />
                  <a href={`tel:${siteConfig.phone.replace(/[^+0-9]/g, "")}`} className="hover:underline">{siteConfig.phone}</a>
                </li>
              </ul>
              <p className="type-meta text-white">{copy.hours}</p>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
