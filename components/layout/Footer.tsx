import Link from "next/link";
import Image from "next/image";
import { siteConfig, siteFeatures, siteText, whatsappUrl } from "@/config/site";
import { commonCopy } from "@/content/common";
import { getServices, supportServicesData } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import { MapPin, Mail, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * The Agenciex footer: a deep-navy panel with rounded top corners, a closing
 * line with the one conversation button, link columns, the legal standing, and
 * the wordmark set huge and faint along the bottom edge. No newsletter or
 * social icons: there is no list to subscribe to and no verified profile to
 * link yet (see `siteConfig.sameAs`).
 */
export default function Footer({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang];
  const text = siteText[lang];
  const href = (path: string) => localePath(lang, path);
  const companyLinks = copy.nav.filter((link) => link.href !== "/");
  const maintenance = supportServicesData[lang].find((item) => item.id === "maintenance");

  return (
    <footer className="agx-footer">
      <div className="agx-wrap">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[18ch] text-[clamp(2rem,1.2rem+3vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">{text.tagline}</p>
          <div className="flex max-w-md flex-col items-start gap-5">
            <p className="text-white/70">{text.description}</p>
            <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-primary-light">
              <WhatsAppIcon size={18} />
              <span>{copy.navCta}</span>
            </a>
          </div>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12" stagger={0.08}>
          <RevealItem direction="left" className="space-y-5 lg:col-span-4">
            <Link href={href("/")} className="inline-flex items-center gap-3">
              {/* The bare mark, as in the navbar: no white tile around it to clip its corners. */}
              <Image src="/images/icon-karyalo.png" alt="" width={2390} height={3354} sizes="30px" className="h-10 w-auto shrink-0" />
              <span className="text-2xl font-bold tracking-[-0.04em] text-white">
                Karya<span className="text-cyan">Lo</span>
              </span>
            </Link>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <span>
                  {siteConfig.address}{" "}
                  <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-white underline-offset-4 hover:underline">
                    Google Maps <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <span>{text.workingHours}</span>
              </li>
            </ul>
          </RevealItem>

          <RevealItem direction="left" className="lg:col-span-2">
            <h2>{copy.footer.companyHeading}</h2>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={href(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem direction="left" className="lg:col-span-3">
            <h2>{copy.footer.servicesHeading}</h2>
            <ul className="space-y-3 text-sm">
              {getServices(lang).map((pillar) => (
                <li key={pillar.id}>
                  <Link href={href(`/services#${pillar.id}`)}>{pillar.name}</Link>
                </li>
              ))}
              {maintenance && (
                <li>
                  <Link href={href("/services#support")}>{maintenance.name}</Link>
                </li>
              )}
              {siteFeatures.enableProductsSection && (
                <li>
                  <Link href={href("/products")} className="inline-flex items-center gap-1">
                    {copy.footer.productsLink} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              )}
            </ul>
          </RevealItem>

          <RevealItem direction="left" className="lg:col-span-3">
            <h2>{copy.footer.legalHeading}</h2>
            <div className="space-y-2 rounded-2xl bg-white/[0.06] p-5 text-sm text-white/70 ring-1 ring-white/10">
              <div className="flex items-center gap-2 font-medium text-white">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-cyan" />
                <span>{copy.footer.registered}</span>
              </div>
              <p>{text.legalEntity}, {copy.footer.registeredBody}</p>
              <p className="pt-1 font-medium text-white">NIB: {siteConfig.nib}</p>
              <p>KBLI: {siteConfig.kbliCode}</p>
            </div>
          </RevealItem>
        </RevealGroup>

        <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center">
          <p>{copy.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={href("/terms")}>{copy.footer.terms}</Link>
            <span aria-hidden="true" className="h-4 w-px bg-white/20" />
            <Link href={href("/privacy")}>{copy.footer.privacy}</Link>
            <span aria-hidden="true" className="h-4 w-px bg-white/20" />
            <span>{text.location}</span>
          </div>
        </div>
      </div>
      <p className="agx-footer-word" aria-hidden="true">KaryaLo</p>
    </footer>
  );
}
