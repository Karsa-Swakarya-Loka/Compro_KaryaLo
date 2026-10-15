"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** sessionStorage key: set once the loader has played in this visit. */
export const PRELOAD_KEY = "kl-preloaded";

/**
 * Runs inline at the top of <body>, before the page paints. It decides whether
 * this page view gets the loader: only the first page of a session, and never
 * when the visitor asked for reduced motion. The decision is a single
 * attribute on <html>; CSS does the rest, so nothing flashes.
 */
export const PRELOAD_SCRIPT = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('${PRELOAD_KEY}'))return;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('${PRELOAD_KEY}','1');return;}d.setAttribute('data-preload','');}catch(e){}})();`;

/** How long the mark gets to assemble before the page is revealed. */
const MIN_SHOW_MS = 1500;
/** Never hold the page longer than this, loaded or not. */
const MAX_SHOW_MS = 2600;
const LEAVE_MS = 650;

/**
 * The KaryaLo loader: the logo's six pieces assemble on its dark tile (the
 * same shapes and gradients as public/images/icon.svg), the wordmark rises,
 * and a thin bar fills in the logo's blue-to-cyan. It is in the server HTML
 * but hidden unless PRELOAD_SCRIPT armed it, and it is aria-hidden: it covers
 * the page for about a second and a half, it does not replace it.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-preload")) return;
    const started = performance.now();
    let leaveTimer = 0;
    let doneTimer = 0;

    const finish = () => {
      const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        ref.current?.setAttribute("data-leaving", "");
        doneTimer = window.setTimeout(() => {
          root.removeAttribute("data-preload");
          try { sessionStorage.setItem(PRELOAD_KEY, "1"); } catch { /* storage off: the loader may show again, harmless */ }
        }, LEAVE_MS);
      }, wait);
    };

    const cap = window.setTimeout(finish, MAX_SHOW_MS);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div id="site-preloader" ref={ref} aria-hidden="true">
      <svg className="preloader-tile" viewBox="0 0 1040.1 1040.1" focusable="false">
        <defs>
          <linearGradient id="pl-g1" x1="216.66" y1="518.9" x2="513.42" y2="815.66" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1d439a" />
            <stop offset=".44" stopColor="#244ba0" />
            <stop offset=".74" stopColor="#3f64af" />
            <stop offset="1" stopColor="#3f64af" />
          </linearGradient>
          <linearGradient id="pl-g2" x1="295.74" y1="116.76" x2="295.74" y2="471.69" gradientUnits="userSpaceOnUse">
            <stop offset=".02" stopColor="#3abbce" />
            <stop offset=".16" stopColor="#2fc1d6" />
            <stop offset=".49" stopColor="#2254a5" />
            <stop offset=".67" stopColor="#194797" />
            <stop offset="1" stopColor="#202b5e" />
          </linearGradient>
          <linearGradient id="pl-g3" x1="232.43" y1="370.77" x2="746.19" y2="370.77" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#25346e" />
            <stop offset="1" stopColor="#4195d1" />
          </linearGradient>
          <linearGradient id="pl-g4" x1="544.26" y1="862.32" x2="785.24" y2="723.18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4066b0" />
            <stop offset=".38" stopColor="#3f64af" />
            <stop offset="1" stopColor="#243e8b" />
          </linearGradient>
          <linearGradient id="pl-g5" x1="496.11" y1="505.39" x2="841.12" y2="704.59" gradientUnits="userSpaceOnUse">
            <stop offset=".09" stopColor="#3b6fb7" />
            <stop offset=".37" stopColor="#329fd9" />
            <stop offset=".71" stopColor="#2e72b9" />
            <stop offset="1" stopColor="#274ea2" />
          </linearGradient>
        </defs>
        <rect width="1040.1" height="1040.1" rx="166.47" ry="166.47" fill="#08172c" />
        {/* The K, built stroke by stroke: spine first, then the arms. */}
        <path className="preloader-piece" style={{ "--i": 0 } as CSSProperties} fill="url(#pl-g2)" d="M359.04,116.76v268.13l-126.61,86.8V215.68c0-7.58,3.74-14.68,9.99-18.97l116.62-79.95Z" />
        <polygon className="preloader-piece" style={{ "--i": 1 } as CSSProperties} fill="url(#pl-g3)" points="746.19 119.58 746.19 274.74 578.43 389.75 498.6 444.4 476.02 459.87 359.04 540.06 232.43 621.97 232.43 503.13 232.43 471.69 359.04 384.89 476.02 304.78 498.6 289.3 578.43 234.58 746.19 119.58" />
        <polygon className="preloader-piece" style={{ "--i": 2 } as CSSProperties} fill="#1d469d" points="359.04 540.06 359.04 589.23 319.46 562.32 359.04 540.06" />
        <path className="preloader-piece" style={{ "--i": 3 } as CSSProperties} fill="url(#pl-g1)" d="M498.6,684.18v146.3l-22.58-14.98-116.97-77.51-87.29-57.82-29.28-19.43c-6.27-4.16-10.04-11.19-10.04-18.71v-138.9l90.6,61.62,36.01,24.48,22.79,15.54,94.18,64.01,22.58,15.4Z" />
        <path className="preloader-piece" style={{ "--i": 4 } as CSSProperties} fill="url(#pl-g5)" d="M796.03,619.55c6.01,4.09,9.62,10.87,9.66,18.14l.15,26.87v101.15s-227.4-151.65-227.4-151.65l-79.83-54.3-22.58-15.33v-4.22l22.58-15.47,78.71-53.95,1.13.84,167.76,114.02,49.84,33.91Z" />
        <polygon className="preloader-piece" style={{ "--i": 5 } as CSSProperties} fill="url(#pl-g4)" points="805.69 637.69 805.83 765.71 803.65 767.18 746.19 806.57 578.43 921.51 578.43 781.74 701.31 697.55 746.19 666.81 805.62 636.34 805.69 637.69" />
      </svg>
      <p className="preloader-word">Karya<span>Lo</span></p>
      <div className="preloader-bar" />
    </div>
  );
}
