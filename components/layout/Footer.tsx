import Link from "next/link";
import Image from "next/image";
import { siteConfig, siteFeatures, siteText } from "@/config/site";
import { commonCopy } from "@/content/common";
import { getServices, supportServicesData } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import { MapPin, Mail, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * The Cargon footer: a band in the brand blue holding one white card, with the
 * brand and contact column, the navbar repeated as links, the services, and the
 * legal standing. No newsletter or social icons: there is no list to subscribe
 * to and no verified profile to link yet (see `siteConfig.sameAs`).
 */
export default function Footer({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang];
  const text = siteText[lang];
  const href = (path: string) => localePath(lang, path);
  // Every route but the home page, in navbar order.
  const companyLinks = copy.nav.filter((link) => link.href !== "/");
  const maintenance = supportServicesData[lang].find((item) => item.id === "maintenance");
  const linkClass = "text-body hover:text-brand transition-colors";

  return (
    <footer className="bg-brand px-4 md:px-12 pt-14 pb-10 md:pt-16 md:pb-12">
      <div className="max-w-[72rem] mx-auto">

        {/* The slogan over the card, white on blue: the brand's last word on every page. */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-white/20">
          <p className="type-section-title text-white max-w-[22ch]">{text.tagline}</p>
          <p className="type-intro text-white max-w-[44ch]">{text.description}</p>
        </Reveal>

        <div className="rounded-3xl bg-white p-7 md:p-12 shadow-lift">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10 border-b border-line" stagger={0.08}>

            {/* Brand & contact */}
            <RevealItem distance={20} className="md:col-span-4 space-y-5">
              <Link href={href("/")} className="inline-flex items-center gap-3">
                <Image src="/images/icon.svg" alt="" width={1040} height={1040} unoptimized className="h-10 w-auto shrink-0 rounded-lg" />
                <span className="text-xl font-bold tracking-tight text-ink">
                  Karya<span className="text-brand">Lo</span> <span className="font-medium text-body text-base">Digital Solution</span>
                </span>
              </Link>
              <ul className="space-y-3 type-small text-body">
                <li className="flex items-start gap-2.5">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-brand shrink-0 mt-1" />
                  <span>
                    {siteConfig.address}{" "}
                    <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand inline-flex items-center gap-0.5 hover:underline">
                      Google Maps <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="w-4 h-4 text-brand shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className={linkClass}>{siteConfig.email}</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock aria-hidden="true" className="w-4 h-4 text-brand shrink-0 mt-1" />
                  <span>{text.workingHours}</span>
                </li>
              </ul>
            </RevealItem>

            {/* Company */}
            <RevealItem distance={20} className="md:col-span-2 space-y-4">
              <h2 className="type-card-title text-ink">{copy.footer.companyHeading}</h2>
              <ul className="space-y-3 type-small">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={href(link.href)} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>

            {/* Services & platforms */}
            <RevealItem distance={20} className="md:col-span-3 space-y-4">
              <h2 className="type-card-title text-ink">{copy.footer.servicesHeading}</h2>
              <ul className="space-y-3 type-small">
                {getServices(lang).map((pillar) => (
                  <li key={pillar.id}>
                    <Link href={href(`/services#${pillar.id}`)} className={linkClass}>{pillar.name}</Link>
                  </li>
                ))}
                {maintenance && (
                  <li>
                    <Link href={href("/services#support")} className={linkClass}>{maintenance.name}</Link>
                  </li>
                )}
                {siteFeatures.enableProductsSection && (
                  <li>
                    <Link href={href("/products")} className={`${linkClass} inline-flex items-center gap-1`}>
                      {copy.footer.productsLink} <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                )}
              </ul>
            </RevealItem>

            {/* Legal standing */}
            <RevealItem distance={20} className="md:col-span-3 space-y-4">
              <h2 className="type-card-title text-ink">{copy.footer.legalHeading}</h2>
              <div className="rounded-2xl bg-surface p-5 space-y-2">
                <div className="flex items-center gap-2 type-label text-brand">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4" />
                  <span>{copy.footer.registered}</span>
                </div>
                <p className="type-small text-body">{text.legalEntity}, {copy.footer.registeredBody}</p>
                <p className="type-meta text-ink pt-1">NIB: {siteConfig.nib}</p>
                <p className="type-meta text-body">KBLI: {siteConfig.kbliCode}</p>
              </div>
            </RevealItem>

          </RevealGroup>

          <div className="pt-7 flex flex-col md:flex-row md:items-center justify-between gap-4 type-small text-body">
            <p>{copy.footer.copyright}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href={href("/terms")} className={linkClass}>{copy.footer.terms}</Link>
              <span aria-hidden="true" className="h-4 w-px bg-line" />
              <Link href={href("/privacy")} className={linkClass}>{copy.footer.privacy}</Link>
              <span aria-hidden="true" className="h-4 w-px bg-line" />
              <span>{text.location}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
