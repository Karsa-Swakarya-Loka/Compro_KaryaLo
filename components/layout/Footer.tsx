import Link from "next/link";
import Image from "next/image";
import { siteConfig, siteFeatures } from "@/config/site";
import { MapPin, Mail, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-midnight-light text-midnight-muted font-story text-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-20">
        
        {/*
          The columns settle in as the page bottoms out. Only these wrappers are
          client components — everything inside stays server-rendered.
        */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10" stagger={0.1}>

          {/* Kolom 1: Profil Legal & Alamat */}
          <RevealItem distance={20} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-porcelain flex items-center justify-center shadow-sm">
                <Image src="/images/icon-mark.png" alt="" width={62} height={87} sizes="20px" className="h-5 w-auto" />
              </div>
              <div>
                <span className="font-meta text-base font-bold tracking-tight text-porcelain block leading-none">
                  KaryaLo Digital Solution
                </span>
                <span className="font-story text-xs text-midnight-muted block mt-0.5">
                  by PT Karsa Swakarya Loka
                </span>
              </div>
            </div>

            <p className="text-midnight-muted text-sm leading-relaxed max-w-sm pt-2">
              Studio teknologi dan desain di Kota Bekasi. Kami membangun website, aplikasi, dan perangkat IoT untuk kebutuhan bisnis.
            </p>

            <div className="space-y-2.5 pt-2 text-xs font-meta text-midnight-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-mist shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address} •{" "}
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mist hover:underline font-bold inline-flex items-center gap-0.5"
                  >
                    Google Maps <ArrowUpRight className="w-3 h-3" />
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-mist shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-mist transition-colors font-medium">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-mist shrink-0" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </RevealItem>

          {/* Kolom 2: Disiplin Layanan */}
          <RevealItem distance={20} className="md:col-span-4 space-y-4">
            <span className="font-meta text-xs font-bold text-mist uppercase tracking-wider block">
              Layanan Kami
            </span>
            <ul className="space-y-2.5 text-sm text-midnight-muted font-story">
              <li>
                <Link href="/services#digital-engineering" className="hover:text-mist transition-colors block">
                  Software, Web & Aplikasi Mobile
                </Link>
              </li>
              <li>
                <Link href="/services#creative-design" className="hover:text-mist transition-colors block">
                  Desain UI/UX & Identitas Merek
                </Link>
              </li>
              <li>
                <Link href="/services#iot-hardware" className="hover:text-mist transition-colors block">
                  Perangkat IoT & Sistem Pemantauan
                </Link>
              </li>
            </ul>

            {/* Every route needs a contextual link, not only the navbar. */}
            <div className="pt-2 space-y-2.5">
              <span className="font-meta text-xs font-bold text-mist uppercase tracking-wider block">
                Jelajahi
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-midnight-muted font-story">
                {[
                  { href: "/works", label: "Portofolio" },
                  // Same switch the navbar and sitemap read, so turning the
                  // section off never leaves a footer link pointing at a 404.
                  ...(siteFeatures.enableProductsSection ? [{ href: "/products", label: "Produk" }] : []),
                  { href: "/about", label: "Tentang" },
                  { href: "/contact", label: "Kontak" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-mist transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>

          {/* Kolom 3: Legalitas & Kepatuhan */}
          <RevealItem distance={20} className="md:col-span-3 space-y-4">
            <span className="font-meta text-xs font-bold text-mist uppercase tracking-wider block">
              Legalitas
            </span>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-meta">
              <div className="flex items-center gap-1.5 text-mist font-bold">
                <ShieldCheck className="w-4 h-4 text-mist" />
                <span>Terdaftar Resmi</span>
              </div>
              <p className="font-story text-midnight-muted leading-relaxed text-[11px]">
                {siteConfig.legalEntity}, terdaftar di sistem OSS Republik Indonesia.
              </p>
              <div className="pt-1 text-[11px] text-porcelain font-semibold border-t border-white/10">
                NIB: {siteConfig.nib}
              </div>
              <div className="text-[11px] text-midnight-muted">
                KBLI: 62019
              </div>
            </div>
          </RevealItem>

        </RevealGroup>

        {/* Bottom Bar: Copyright & Compliance */}
        <Reveal distance={16} duration={0.55} className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-story text-midnight-muted">
          <div>
            © 2026 PT Karsa Swakarya Loka (KaryaLo Digital Solution). Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="font-meta flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-wider text-midnight-muted">
            <Link href="/privacy" className="hover:text-mist transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-mist transition-colors">Syarat &amp; Ketentuan</Link>
            <span>Kota Bekasi, Jawa Barat</span>
            <span>Source code milik klien</span>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}
