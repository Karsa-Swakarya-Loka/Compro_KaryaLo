import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";
import { productsData } from "@/data/products";
import { siteFeatures } from "@/config/site";
import { absoluteUrl, routeSeo } from "@/lib/seo";

/**
 * Every indexable URL, including one entry per case study.
 * Priorities and change frequencies come from the route table in lib/seo.ts so
 * they stay in step with the metadata rather than drifting apart.
 *
 * Routes that carry real photography or screenshots also declare those files,
 * which is what lets the images be found through Google Images rather than only
 * as decoration on a page that happens to rank.
 */

type RouteKey = keyof typeof routeSeo;

/** Images that belong to a specific route, in the order they appear on it. */
const routeImages: Partial<Record<RouteKey, string[]>> = {
  home: ["/images/hero-centerpiece.webp", "/images/process-blueprint.webp", "/images/legal-trust.webp"],
  services: ["/images/service-software.webp", "/images/service-design.webp", "/images/service-iot.webp"],
  about: ["/images/about-studio.webp", "/images/legal-trust.webp"],
  works: portfolioData.map((project) => project.coverImage),
  products: productsData.map((product) => product.image),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = (Object.keys(routeSeo) as RouteKey[])
    .filter((key) => key !== "products" || siteFeatures.enableProductsSection)
    .map((key) => {
      const route = routeSeo[key];
      const images = routeImages[key]?.map(absoluteUrl);

      return {
        url: absoluteUrl(route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        ...(images?.length ? { images } : {}),
      };
    });

  const caseStudies = portfolioData.map((project) => {
    const gallery = project.galleryImages.length ? project.galleryImages : [project.coverImage];
    return {
      url: absoluteUrl(`/works/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: gallery.map(absoluteUrl),
    };
  });

  return [...pages, ...caseStudies];
}
