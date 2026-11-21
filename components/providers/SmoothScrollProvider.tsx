"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

/** easeOutExpo, mirrors the motion easing so scroll and UI settle the same way. */
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Every new page opens at the top. Next.js scrolls to the top on navigation, but when a link was
 * clicked while Lenis was still gliding (right after a wheel scroll), Lenis finished that glide on
 * the new page and dragged it back down to the old position. So on each route change the glide is
 * cancelled and the page jumps to the top. Back/forward keeps the browser's own restored position,
 * and a link to an #anchor is left to Lenis's anchor handling.
 */
function ScrollToTopOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();
  const fromHistory = useRef(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const onPop = () => (fromHistory.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!lenis || lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (fromHistory.current) {
      fromHistory.current = false;
      // Cancel any glide but stay where the browser restored the page.
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      return;
    }
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        easing: easeOutExpo,
        smoothWheel: true,
        autoRaf: true,
        anchors: { offset: -96 },
        respectReducedMotion: true,
      }}
    >
      <ScrollToTopOnNavigate />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
