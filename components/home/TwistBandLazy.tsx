"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { BandProject } from "@/components/home/TwistBand";

/*
 * three.js (~150 KB gzipped) is split out of the page bundle: it loads only on
 * the client, after the page is up and the browser is idle, never during SSR.
 */
const TwistBand = dynamic(() => import("@/components/home/TwistBand"), { ssr: false, loading: () => null });

type Mode = "poster" | "3d";

/** Phones that would struggle, visitors saving data or asking for less motion, and browsers without WebGL keep the picture. */
function wants3D(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "")) return false;
  const phone = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 810;
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3;
  if (phone && weak) return false;
  try {
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return false;
  } catch {
    return false;
  }
  return true;
}

/**
 * The hero band, loaded late. The static preview (a still of the band itself)
 * is in the server HTML, so the hero is complete at first paint; the 3D is
 * fetched when the browser is idle and fades in over the preview once its
 * covers are drawn. Where the 3D is not worth it, the preview simply stays.
 */
export default function TwistBandLazy({ projects }: { projects: BandProject[] }) {
  const [mode, setMode] = useState<Mode>("poster");
  const [ready, setReady] = useState(false);

  /*
   * When to start the 3D: on the visitor's first sign of life (moving the mouse,
   * touching, scrolling, a key), never on a timer. Until then the static preview,
   * a still of the same band, is all there is: loading the page costs no three.js
   * parsing, WebGL set-up or texture work, and a visitor who only reads never
   * pays for it. It still waits for the page's `load` so it never competes with
   * the first render, and runs in an idle slot right after the gesture.
   */
  useEffect(() => {
    if (!wants3D()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const gestures = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    let idleId = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setMode("3d"), { timeout: 300 });
      else setMode("3d");
    };
    const onGesture = () => {
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
    };
    gestures.forEach((g) => window.addEventListener(g, onGesture, { passive: true }));
    return () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      window.removeEventListener("load", start);
      if (idleId) w.cancelIdleCallback?.(idleId);
    };
  }, []);

  return (
    <div className="agx-twist" data-ready={ready ? "" : undefined}>
      <div className="agx-twist-dots" aria-hidden="true" />
      <div className="agx-twist-floor" aria-hidden="true" />
      {/* Decorative (alt=""): the projects are listed as real links beside the band. A plain <picture>
          because the stills are pre-sized per breakpoint already. */}
      <picture className="agx-twist-poster">
        <source media="(max-width: 809px)" srcSet="/images/band/poster-mobile.webp" />
        <img src="/images/band/poster-desktop.webp" alt="" width={2145} height={1140} decoding="async" fetchPriority="high" />
      </picture>
      {mode === "3d" && <TwistBand projects={projects} onReady={() => setReady(true)} />}
    </div>
  );
}
