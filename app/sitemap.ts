import type { MetadataRoute } from "next";
import { portfolioData, portfolioSlugs, portfolioUpdatedAt } from "@/data/portfolio";
import { productsData } from "@/data/products";
import { siteFeatures } from "@/config/site";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl, languageAlternates, routeSeo, routeUpdatedAt, type RouteKey } from "@/lib/seo";

/**
 * Every indexable URL in both languages, including one entry per case study.
 * Priorities and change frequencies come from the route table in lib/seo.ts so
 * they stay in step with the metadata rather than drifting apart.
 *
 * Each entry lists its counterpart in the other language (`alternates`), which
 * is how Google pairs `/about` with `/en/about` without guessing.
 *
 * Routes that carry real photography or screenshots also declare those files,
 * which is what lets the images be found through Google Images rather than only
 * as decoration on a page that happens to rank.
 */

/** Images that belong to a specific route, in the order they appear on it. */
const routeImages: Partial<Record<RouteKey, string[]>> = {
  home: ["/images/hero-centerpiece.webp", "/images/process-blueprint.webp", "/images/legal-trust.webp"],
  services: ["/images/service-software.webp", "/images/service-design.webp", "/images/service-iot-2.webp"],
  about: ["/images/about-studio.webp", "/images/legal-trust.webp"],
  portfolio: portfolioData.id.map((project) => project.coverImage),
  products: productsData.id.map((product) => product.image),
};

/** Absolute hreflang alternates for a language-neutral path. */
function alternatesFor(path: string) {
  const languages = languageAlternates(path);
  return Object.fromEntries(Object.entries(languages).map(([lang, href]) => [lang, absoluteUrl(href)]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routeSeo) as RouteKey[])
    .filter((key) => key !== "products" || siteFeatures.enableProductsSection)
    .flatMap((key) => {
      const route = routeSeo[key];
      const images = routeImages[key]?.map(absoluteUrl);
      return locales.map((lang) => ({
        url: absoluteUrl(localePath(lang, route.path)),
        lastModified: new Date(routeUpdatedAt[key]),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: alternatesFor(route.path) },
        ...(images?.length ? { images } : {}),
      }));
    });

  const caseStudies = portfolioSlugs.flatMap((slug) => {
    const project = portfolioData.id.find((item) => item.slug === slug)!;
    const gallery = project.galleryImages.length ? project.galleryImages : [project.coverImage];
    const path = `/portfolio/${slug}`;
    return locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      lastModified: new Date(portfolioUpdatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: { languages: alternatesFor(path) },
      images: gallery.map(absoluteUrl),
    }));
  });

  return [...pages, ...caseStudies];
}
