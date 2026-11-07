"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/config/site";
import { commonCopy } from "@/content/common";
import { type Locale, htmlLang, localePath, locales, splitLocale } from "@/lib/i18n";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import { EASE_EXPO, SPRING_INTERACTIVE } from "@/components/motion/tokens";

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

/**
 * ID | EN switch. The current language is plain text marked as current; the
 * other one links to this same page in that language. It is a plain anchor
 * rather than <Link>: each language has its own root layout, so crossing
 * between them is a full document load either way, and the anchor says so.
 */
function LanguageSwitch({ lang, path }: { lang: Locale; path: string }) {
  const copy = commonCopy[lang];
  return (
    <div className="lang-switch" role="group" aria-label={copy.languageLabel}>
      {locales.map((option) =>
        option === lang ? (
          <span key={option} className="lang-switch__item" aria-current="true">
            {copy.languageNames[option]}
          </span>
        ) : (
          <a
            key={option}
            href={localePath(option, path)}
            hrefLang={htmlLang[option]}
            lang={htmlLang[option]}
            aria-label={copy.switchTo}
            className="lang-switch__item"
          >
            {copy.languageNames[option]}
          </a>
        ),
      )}
    </div>
  );
}

export default function Navbar({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang];
  const pathname = usePathname();
  const { path: neutralPath } = splitLocale(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll-aware morph (Cargon): the floating pill at the top; after 50px its white fills out sideways into a full-width bar.
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

  const navLinks = copy.nav.map((link) => ({ ...link, href: localePath(lang, link.href), base: link.href }));
  /* A case study under /portfolio/[slug] keeps "Portfolio" marked as the current section. */
  const isCurrent = (base: string) => (base === "/" ? neutralPath === "/" : neutralPath === base || neutralPath.startsWith(`${base}/`));
  const activeHref = navLinks.find((link) => isCurrent(link.base))?.href ?? null;
  const pillHref = hoveredHref ?? activeHref;
  const homeHref = localePath(lang, "/");

  return (
    <div className="nav-surface" data-overlay={neutralPath === "/" ? "" : undefined} data-scrolled={scrolled ? "" : undefined}>
      {/* The white that spreads from the pill to a full-width bar on scroll (CSS). */}
      <span className="nav-fill" aria-hidden="true" />
      <div className="nav-container">
        <header ref={headerRef} className="site-header" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMobileMenuOpen(false);
        }}>
          <div className="site-nav">
            {/*
              The mark is decorative — the wordmark beside it carries the name,
              so the link's accessible name comes from that text.
            */}
            <Link href={homeHref} className="brand-link">
              <Image
                src="/images/icon-karyalo.png"
                alt=""
                width={2390}
                height={3354}
                preload
                sizes="28px"
                className="h-10 w-auto shrink-0"
              />
              {/* Cargon's lockup: the mark, then a bold one-word wordmark with the
                  descriptor beneath it in body grey. */}
              <span className="flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tight text-ink">
                  Karya<span className="text-brand">Lo</span>
                </span>{" "}
                <span className="mt-1 text-xs font-medium leading-none text-body">Digital Solution</span>
              </span>
            </Link>

            {/* Desktop links with a shared, spring-driven hover pill */}
            <nav
              aria-label={copy.navLabel}
              className="hidden lg:flex items-center gap-0.5"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(link.base) ? "page" : undefined}
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
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Language switch, then the bar's one solid shape: the WhatsApp
                button. On tablets (md) the links sit in the menu, so both fit
                beside the menu button; at lg the six links leave no room for the
                button until xl, and the floating button in
                components/layout/WhatsAppFab.tsx covers the job. */}
            <div className="hidden md:ml-auto md:flex lg:ml-0 items-center gap-3">
              <LanguageSwitch lang={lang} path={neutralPath} />
              <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="nav-cta btn btn-primary btn-sm hidden md:inline-flex lg:hidden xl:inline-flex">
                {copy.navCta} <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-toggle lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? copy.closeMenu : copy.openMenu}
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
                  aria-label={copy.mobileNavLabel}
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
                        aria-current={isCurrent(link.base) ? "page" : undefined}
                        className="nav-link"
                      >
                        {link.label} <ArrowUpRight aria-hidden="true" size={16} />
                      </Link>
                    </motion.div>
                  ))}
                  {/* Phones only: on tablets the switch and the button are already in the bar. */}
                  <motion.div variants={sheetItemVariants} className="mt-3 flex flex-wrap items-center justify-between gap-3 md:hidden">
                    <LanguageSwitch lang={lang} path={neutralPath} />
                    <a
                      href={whatsappUrl(lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {copy.navCta} <ArrowUpRight aria-hidden="true" size={16} />
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
