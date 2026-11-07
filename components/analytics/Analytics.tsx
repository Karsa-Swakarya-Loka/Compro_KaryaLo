"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackConversion, type ConversionEvent } from "@/lib/analytics";

/** Container id, e.g. "GTM-XXXXXXX". Unset means no third-party script loads. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/** Interactions that load GTM straight away: the visitor is engaged, so it can no longer delay the first paint. */
const GTM_TRIGGERS = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"] as const;
/** Without any interaction, GTM still loads this long after the page's `load` event. */
const GTM_IDLE_MS = 5000;

/** Maps an outbound href to the conversion it represents. */
function eventForHref(href: string): ConversionEvent | null {
  if (href.includes("wa.me")) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("tel:")) return "phone_click";
  return null;
}

/**
 * Reports outbound conversions from a single delegated listener.
 *
 * Every WhatsApp, email and phone CTA on this site is a plain anchor, and there
 * are more than twenty of them spread across thirteen files. Listening once on
 * the document keeps the instrumentation in one place, and means a CTA added
 * next month is measured without anyone remembering to wire it up.
 *
 * IMPORTANT: setting NEXT_PUBLIC_GTM_ID loads Google Tag Manager, which sets
 * cookies and hands data to a third party. `app/privacy/page.tsx` discloses
 * GTM and Google Analytics only. Adding a tag for any other vendor in the
 * container (an ad pixel, say) means updating that page in the same change,
 * or the site is making a false privacy claim.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const conversion = eventForHref(anchor.getAttribute("href") ?? "");
      if (!conversion) return;

      trackConversion(conversion, {
        page: pathname,
        location: anchor.closest("section[id]")?.id || undefined,
        label: anchor.textContent?.trim().slice(0, 60) || undefined,
      });
    };

    // Capture phase: the click still registers even when a handler upstream
    // stops propagation, and it fires before the browser leaves the page.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  /*
    Google Tag Manager, loaded late on purpose. Measured with Lighthouse on
    2026-10-15, GTM and the GA4 tag it pulls in were the heaviest thing on the
    page: ~300 KiB and ~500 ms of main-thread blocking on a phone, and the
    script held back the `load` event (and so the logo loader) behind it. Now it
    loads on the visitor's first interaction, or GTM_IDLE_MS after `load`.
    Nothing is lost while it waits: conversions pushed to `dataLayer` before it
    runs are queued, and GTM processes them when it starts.
  */
  useEffect(() => {
    if (!GTM_ID) return;
    let timer = 0;

    const load = () => {
      cleanup();
      if (document.getElementById("gtm-script")) return;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.id = "gtm-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };
    const startIdleTimer = () => {
      timer = window.setTimeout(load, GTM_IDLE_MS);
    };
    function cleanup() {
      GTM_TRIGGERS.forEach((type) => window.removeEventListener(type, load));
      window.removeEventListener("load", startIdleTimer);
      window.clearTimeout(timer);
    }

    GTM_TRIGGERS.forEach((type) => window.addEventListener(type, load, { once: true, passive: true }));
    if (document.readyState === "complete") startIdleTimer();
    else window.addEventListener("load", startIdleTimer, { once: true });
    return cleanup;
  }, []);

  return null;
}
