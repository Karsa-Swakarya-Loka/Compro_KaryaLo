"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/config/site";
import { commonCopy } from "@/content/common";
import { type Locale, htmlLang, localePath, locales, splitLocale } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const SCROLL_THRESHOLD = 50;
const SCROLL_RELEASE = 20;
const SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

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

type NavLink = { href: string; label: string };

/** One pill link: a small magnetic pull toward the cursor and a label that rolls up on hover. */
function PillItem({
  link,
  lit,
  current,
  onEnter,
  onPress,
  register,
}: {
  link: NavLink;
  lit: boolean;
  current: boolean;
  onEnter: () => void;
  onPress: () => void;
  register: (el: HTMLElement | null) => void;
}) {
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  const [hover, setHover] = useState(false);
  return (
    <motion.span ref={register} style={{ x, y, position: "relative", zIndex: 1, display: "inline-flex" }}>
      <Link
        href={link.href}
        aria-current={current ? "page" : undefined}
        className="agx-pillnav-link"
        data-lit={lit ? "" : undefined}
        onPointerDown={onPress}
        onClick={onPress}
        onMouseEnter={() => {
          setHover(true);
          onEnter();
        }}
        onMouseLeave={() => {
          setHover(false);
          x.set(0);
          y.set(0);
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
          y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 6);
        }}
      >
        <span className="agx-roll">
          <motion.span style={{ display: "block" }} animate={{ y: hover ? "-50%" : "0%" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span className="agx-roll-line">{link.label}</span>
            <span className="agx-roll-line" aria-hidden="true">{link.label}</span>
          </motion.span>
        </span>
      </Link>
    </motion.span>
  );
}

/**
 * The Agenciex template's pill navigation: a glass pill whose highlight springs
 * from the current page to whichever link is hovered.
 */
function PillNav({ links, activeIndex, label }: { links: NavLink[]; activeIndex: number; label: string }) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  // The link just pressed: the highlight slides there at once, before the next page has loaded
  // (and on touch, where there is no hover to lead it). Cleared when the route changes.
  const [pressed, setPressed] = useState<{ index: number; from: number } | null>(null);
  const hx = useMotionValue(0);
  const hw = useMotionValue(0);
  const ho = useMotionValue(0);
  const placed = useRef(false);
  const pending = pressed && pressed.from === activeIndex ? pressed.index : null;
  const target = hovered ?? pending ?? (activeIndex >= 0 ? activeIndex : null);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    if (target === null) {
      animate(ho, 0, { duration: 0.25 });
      return;
    }
    const el = itemRefs.current[target];
    if (!el) return;
    const left = el.offsetLeft;
    const width = el.offsetWidth;
    if (!placed.current) {
      hx.set(left);
      hw.set(width);
      placed.current = true;
    } else {
      animate(hx, left, SPRING);
      animate(hw, width, SPRING);
    }
    animate(ho, 1, { duration: 0.25 });
  }, [target, links.length, hx, hw, ho]);

  // Keep the highlight aligned when fonts load late or the window resizes. One observer for the
  // nav's life: re-creating it on every target change fired its first callback at once, which
  // snapped the highlight to the end point and cancelled the slide.
  useEffect(() => {
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      const t = targetRef.current;
      const el = t === null ? null : itemRefs.current[t];
      if (el) {
        hx.set(el.offsetLeft);
        hw.set(el.offsetWidth);
      }
    });
    itemRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [links.length, hx, hw]);

  return (
    <nav aria-label={label} className="agx-pillnav" onMouseLeave={() => setHovered(null)}>
      <motion.span aria-hidden="true" className="agx-pillnav-hl" style={{ x: hx, width: hw, opacity: ho }} />
      {links.map((link, i) => (
        <PillItem
          key={link.href}
          link={link}
          lit={i === target}
          current={i === activeIndex}
          onEnter={() => setHovered(i)}
          onPress={() => setPressed({ index: i, from: activeIndex })}
          register={(el) => {
            itemRefs.current[i] = el;
          }}
        />
      ))}
    </nav>
  );
}

export default function Navbar({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang];
  const pathname = usePathname();
  const { path: neutralPath } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) =>
    setScrolled((current) => (current ? latest > SCROLL_RELEASE : latest > SCROLL_THRESHOLD)),
  );
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setScrolled(window.scrollY > SCROLL_THRESHOLD));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // The menu is a full-screen sheet: it closes on Escape or after a link is followed, and holds the page still while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const navLinks = copy.nav.map((link) => ({ ...link, href: localePath(lang, link.href), base: link.href }));
  const isCurrent = (base: string) => (base === "/" ? neutralPath === "/" : neutralPath === base || neutralPath.startsWith(`${base}/`));
  const activeIndex = navLinks.findIndex((link) => isCurrent(link.base));
  const homeHref = localePath(lang, "/");

  return (
    <div className="nav-surface" data-scrolled={scrolled ? "" : undefined}>
      <header className="agx-nav">
        <Link href={homeHref} className="agx-logo" onClick={() => setOpen(false)}>
          <Image src="/images/icon-karyalo.png" alt="" width={2390} height={3354} preload sizes="28px" className="h-9 w-auto shrink-0" />
          <span className="agx-logo-word">
            Karya<span>Lo</span>
          </span>
        </Link>

        <PillNav links={navLinks} activeIndex={activeIndex} label={copy.navLabel} />

        <div className="agx-nav-end">
          <LanguageSwitch lang={lang} path={neutralPath} />
          <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="agx-pill" aria-label={copy.navCta}>
            <WhatsAppIcon size={16} />
            <span className="agx-pill-label">{copy.navCta}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="agx-round agx-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
          >
            {/* Both icons stay mounted; CSS turns one out and the other in (.agx-menu-toggle). */}
            <Menu aria-hidden="true" size={20} className="agx-toggle-icon agx-toggle-icon--open" />
            <X aria-hidden="true" size={20} className="agx-toggle-icon agx-toggle-icon--close" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            id="site-menu"
            aria-label={copy.mobileNavLabel}
            className="agx-menu"
            style={{ pointerEvents: "auto" }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
          >
            <div className="agx-menu-inner">
              <ul>
                {navLinks.map((link, index) => (
                  <li key={link.href} className="agx-menu-item" style={{ "--i": index } as React.CSSProperties}>
                    <Link href={link.href} className="agx-menu-link" aria-current={isCurrent(link.base) ? "page" : undefined} onClick={() => setOpen(false)}>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="agx-menu-item flex flex-col items-start gap-5" style={{ "--i": navLinks.length } as React.CSSProperties}>
                <LanguageSwitch lang={lang} path={neutralPath} />
                <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={() => setOpen(false)}>
                  <WhatsAppIcon size={18} />
                  <span>{copy.navCta}</span>
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
