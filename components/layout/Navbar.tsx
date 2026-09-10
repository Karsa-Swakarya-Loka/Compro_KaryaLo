"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig, siteFeatures } from "@/config/site";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import { EASE_EXPO, SPRING_INTERACTIVE } from "@/components/motion/tokens";

const navLinks = [
  { name: "Layanan", href: "/services" },
  { name: "Portofolio", href: "/works" },
  ...(siteFeatures.enableProductsSection && siteFeatures.showProductsInNavbar
    ? [{ name: "Produk", href: "/products" }]
    : []),
  { name: "Tentang", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

/** Mobile sheet: springs open from the top-right corner, links cascade in. */
const sheetVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: -10,
    transition: { duration: 0.22, ease: EASE_EXPO },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const sheetItemVariants: Variants = {
  hidden: { opacity: 0, x: 18, y: -6, transition: { duration: 0.15 } },
  visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
};

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll-aware morph: flush with the hero at the top, floating blurred pill after 50px.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > SCROLL_THRESHOLD));
  useEffect(() => {
    // Sync once after mount for reloads that restore a mid-page scroll position.
    const frame = window.requestAnimationFrame(() => setScrolled(window.scrollY > SCROLL_THRESHOLD));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnResize = () => { if (desktop.matches) setMobileMenuOpen(false); };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnResize);
    };
  }, [mobileMenuOpen]);

  const activeHref = navLinks.find((link) => link.href === pathname)?.href ?? null;
  const pillHref = hoveredHref ?? activeHref;

  return (
    <div className="nav-surface" data-overlay={pathname === "/" ? "" : undefined} data-scrolled={scrolled ? "" : undefined}>
      <div className="nav-container">
        <header ref={headerRef} className="site-header" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMobileMenuOpen(false);
        }}>
          <div className="site-nav">
            <Link href="/" aria-label="KaryaLo — beranda" className="brand-link">
              <Image
                src="/images/icon-mark.png"
                alt=""
                width={62}
                height={87}
                sizes="36px"
                className="h-9 w-auto shrink-0"
              />
              <span>
                <span className="block font-meta text-base font-bold leading-tight">KaryaLo</span>
                <span className="block text-xs text-mist-ink">Digital Solution</span>
              </span>
            </Link>

            {/* Desktop links with a shared, spring-driven hover pill */}
            <nav
              aria-label="Navigasi utama"
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="nav-link"
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                >
                  {pillHref === link.href && (
                    <motion.span
                      layoutId="nav-pill-hover"
                      className="nav-pill"
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={SPRING_INTERACTIVE}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </nav>

            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="nav-cta hidden lg:inline-flex">
              Konsultasi WhatsApp <ArrowUpRight aria-hidden="true" size={16} />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-toggle lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              <AnimatePresence initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    className="flex"
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28, ease: EASE_EXPO }}
                  >
                    <X aria-hidden="true" size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    className="flex"
                    initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28, ease: EASE_EXPO }}
                  >
                    <Menu aria-hidden="true" size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile sheet: blurred backdrop + spring-staggered reveal from the top-right */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  key="backdrop"
                  className="nav-backdrop lg:hidden"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                  onClick={() => setMobileMenuOpen(false)}
                />
                <motion.nav
                  key="sheet"
                  id="mobile-navigation"
                  aria-label="Navigasi seluler"
                  className="mobile-nav lg:hidden"
                  style={{ transformOrigin: "top right" }}
                  variants={sheetVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {navLinks.map((link) => (
                    <motion.div key={link.href} variants={sheetItemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="nav-link"
                      >
                        {link.name} <ArrowUpRight aria-hidden="true" size={16} />
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={sheetItemVariants}>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-cta mt-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Konsultasi WhatsApp <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  </motion.div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </header>
      </div>
    </div>
  );
}
