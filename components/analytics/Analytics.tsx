"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackConversion, type ConversionEvent } from "@/lib/analytics";

/** Container id, e.g. "GTM-XXXXXXX". Unset means no third-party script loads. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
 * cookies and hands data to a third party. `app/privacy/page.tsx` currently
 * tells visitors the opposite. Update that page in the same change that sets
 * the variable, or the site is making a false privacy claim.
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

  if (!GTM_ID) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}
