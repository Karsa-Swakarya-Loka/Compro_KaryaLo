import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { portfolioData } from "@/data/portfolio";
import { productsData } from "@/data/products";
import { faqData } from "@/data/faq";
import { absoluteUrl, routeSeo } from "@/lib/seo";

/**
 * Structured data for the site.
 *
 * Every value is read from the real content files. Nothing here is invented:
 * there is no AggregateRating or Review (no disclosable reviews exist), no
 * Person/team graph (no named people are published), and no Product/Offer on
 * the platform pages (they are demo requests, not purchasable SKUs). Marking up
 * any of those without source data would misrepresent the business.
 */

export const ORG_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Splits the single display address into the discrete parts schema.org expects. */
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Jl. Al-Falah II, Jatiranggon, Kec. Jatisampurna",
  addressLocality: "Kota Bekasi",
  addressRegion: "Jawa Barat",
  postalCode: "17432",
  addressCountry: "ID",
} as const;

/**
 * ProfessionalService rather than a bare Organization: this is a registered
 * entity with a street address, fixed weekday hours and a Maps listing, and the
 * subtype inherits every Organization property anyway.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: siteConfig.brandName,
  legalName: siteConfig.companyName,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.png"),
  image: absoluteUrl("/images/hero-centerpiece.webp"),
  email: siteConfig.email,
  telephone: siteConfig.phone.replace(/\s/g, "-"),
  address: postalAddress,
  hasMap: siteConfig.mapsUrl,
  // Legal entity established by the SK Kementerian Hukum listed under `identifier`.
  foundingDate: siteConfig.foundingDate,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      name: "Diskusi awal proyek",
      telephone: siteConfig.phone.replace(/\s/g, "-"),
      email: siteConfig.email,
      availableLanguage: ["id-ID", "en"],
      areaServed: "ID",
    },
  ],
  // Saturday/Sunday are "by appointment", which has no clean schema.org
  // representation, so only the fixed weekday hours are declared.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Kota Bekasi" },
    { "@type": "AdministrativeArea", name: "Jabodetabek" },
    { "@type": "Country", name: "Indonesia" },
  ],
  knowsLanguage: ["id-ID", "en"],
  identifier: [
    { "@type": "PropertyValue", name: "NIB", value: siteConfig.nib },
    { "@type": "PropertyValue", name: "KBLI", value: siteConfig.kbli },
    { "@type": "PropertyValue", name: "SK Kementerian Hukum RI", value: siteConfig.skAhu },
  ],
  // Populated once the Google Business Profile and LinkedIn page exist.
  ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.brandName,
  inLanguage: "id-ID",
  publisher: { "@id": ORG_ID },
};

/** Breadcrumb trail. Home is always position 1. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: absoluteUrl("/") },
      ...trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    ],
  };
}

/** One Service node per pillar, with its sub-services as an offer catalogue. */
export const servicesSchema = servicesData.map((pillar) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl("/services")}#${pillar.id}`,
  name: pillar.name,
  serviceType: pillar.shortName,
  description: pillar.focus,
  provider: { "@id": ORG_ID },
  areaServed: [
    { "@type": "City", name: "Kota Bekasi" },
    { "@type": "Country", name: "Indonesia" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: pillar.name,
    itemListElement: pillar.subServices.map((sub) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: sub.name,
        description: sub.description,
      },
    })),
  },
}));

/** The portfolio index as a collection of case studies. */
export const worksCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": absoluteUrl("/works"),
  url: absoluteUrl("/works"),
  name: `Portofolio ${siteConfig.brandName}`,
  description: routeSeo.works.description,
  inLanguage: "id-ID",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: portfolioData.length,
    itemListElement: portfolioData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/works/${project.slug}`),
      item: {
        "@type": "CreativeWork",
        "@id": absoluteUrl(`/works/${project.slug}`),
        name: project.title,
        description: project.summary,
        image: absoluteUrl(project.coverImage),
        dateCreated: project.year,
        genre: project.categoryLabel,
        keywords: project.tags.join(", "),
        creator: { "@id": ORG_ID },
        inLanguage: "id-ID",
      },
    })),
  },
};

/** A single case study page. */
export function caseStudySchema(project: (typeof portfolioData)[number]) {
  const url = absoluteUrl(`/works/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    url,
    name: project.title,
    headline: project.title,
    description: project.summary,
    image: absoluteUrl(project.coverImage),
    dateCreated: project.year,
    genre: project.categoryLabel,
    keywords: project.tags.join(", "),
    inLanguage: "id-ID",
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    isPartOf: { "@id": absoluteUrl("/works") },
    about: { "@type": "Thing", name: project.categoryLabel },
  };
}

/** Simple page-type wrapper used by /about and /contact. */
export function pageSchema(type: "AboutPage" | "ContactPage" | "WebPage", key: keyof typeof routeSeo) {
  const route = routeSeo[key];
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(route.path),
    url: absoluteUrl(route.path),
    name: route.title,
    description: route.description,
    inLanguage: "id-ID",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/**
 * The FAQ block on the home page, marked up so the same questions can surface
 * directly in search. Every string is the one already rendered on the page —
 * Google requires the visible answer and the marked-up answer to match.
 */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  inLanguage: "id-ID",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * The home page itself. Without this node the home URL only had an
 * Organization and a WebSite attached to it, and no page-level entity that a
 * search engine could tie the breadcrumbless landing page to.
 */
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/#webpage`,
  url: siteConfig.url,
  name: `${siteConfig.brandName} — ${routeSeo.home.title}`,
  description: routeSeo.home.description,
  inLanguage: "id-ID",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: absoluteUrl("/images/hero-centerpiece.webp"),
    caption: "Meja kerja tim KaryaLo di studio Jatisampurna, Kota Bekasi",
  },
  // Written by the studio; the entity is both author and publisher here.
  publisher: { "@id": ORG_ID },
};

/**
 * The ready-made platforms as a list of software products.
 *
 * SoftwareApplication rather than Product: none of these carry a public price,
 * so an Offer node would be invented data. The list simply tells a search
 * engine what each platform is and what it does.
 */
export const productsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl("/products")}#daftar-platform`,
  name: `Platform siap pakai ${siteConfig.brandName}`,
  numberOfItems: productsData.length,
  itemListElement: productsData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${absoluteUrl("/products")}#${product.id}`,
    item: {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl("/products")}#${product.id}`,
      name: product.title,
      alternateName: product.tagline,
      description: product.summary,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: product.category,
      operatingSystem: "Web",
      image: absoluteUrl(product.image),
      featureList: product.features,
      inLanguage: "id-ID",
      author: { "@id": ORG_ID },
      provider: { "@id": ORG_ID },
    },
  })),
};
