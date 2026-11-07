import type { MetadataRoute } from "next";
import { siteConfig, siteText } from "@/config/site";

/**
 * Web app manifest.
 *
 * Mostly a housekeeping file: it gives browsers, Android's "add to home screen"
 * prompt and several search previews a canonical name, language and colour for
 * the site instead of letting each one guess from the title tag.
 *
 * The icons now carry the mark's own dark plate (#08172C, from the brand SVG)
 * bled to every edge. They used to ship on transparency, so Google — which crops
 * favicons into a circle in search results — composited them on white and left a
 * white ring around a square mark.
 *
 * `/icons/maskable-512.png` is the same plate with the mark held inside Android's
 * safe zone (62% of the canvas), which is what makes an adaptive icon croppable
 * to a circle, squircle or rounded square without cutting into the mark.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} | ${siteConfig.companyName}`,
    short_name: "KaryaLo",
    description: siteText.id.description,
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
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
