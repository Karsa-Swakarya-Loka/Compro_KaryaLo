import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Web app manifest.
 *
 * Mostly a housekeeping file: it gives browsers, Android's "add to home screen"
 * prompt and several search previews a canonical name, language and colour for
 * the site instead of letting each one guess from the title tag.
 *
 * `purpose: "maskable"` is deliberately not declared — the icon has no safe-zone
 * padding, so Android would crop into the mark.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} — ${siteConfig.companyName}`,
    short_name: "KaryaLo",
    description: siteConfig.description,
    lang: "id-ID",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#F7F6F5",
    theme_color: "#1F2E5A",
    categories: ["business", "productivity", "utilities"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
