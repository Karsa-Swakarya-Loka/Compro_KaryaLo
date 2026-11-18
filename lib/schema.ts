import { siteConfig, siteText } from "@/config/site";
import { getServices } from "@/data/services";
import { getPortfolio, type ProjectItem } from "@/data/portfolio";
import { getProducts } from "@/data/products";
import { getFaq } from "@/data/faq";
import { commonCopy } from "@/content/common";
import { type Locale, localePath, schemaLang } from "@/lib/i18n";
import { absoluteUrl, routeSeo, type RouteKey } from "@/lib/seo";

/**
 * Structured data for the site.
 *
 * Every value is read from the real content files. Nothing here is invented:
 * there is no AggregateRating or Review (no disclosable reviews exist), no
 * Person/team graph (no named people are published), and no Product/Offer on
 * the platform pages (they are demo requests, not purchasable SKUs). Marking up
 * any of those without source data would misrepresent the business.
 *
 * Each builder takes the page's language: the entity is the same in both
 * languages (one `@id`), but the words describing it and the page URLs follow
 * the language being read.
 */

export const ORG_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Absolute URL of a language-neutral path in `lang`. */
const urlFor = (lang: Locale, path: string) => absoluteUrl(localePath(lang, path));

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
export function organizationSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.brandName,
    legalName: siteConfig.companyName,
    description: siteText[lang].description,
    slogan: siteText[lang].tagline,
    url: urlFor(lang, "/"),
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
        name: lang === "en" ? "First project conversation" : "Diskusi awal proyek",
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
    knowsAbout:
      lang === "en"
        ? ["Software development", "Web and mobile applications", "UI/UX design", "Brand identity", "Photography and videography", "Internet of Things", "Computer and MikroTik networking hardware"]
        : ["Pengembangan software", "Aplikasi web dan mobile", "Desain UI/UX", "Identitas merek", "Fotografi dan videografi", "Internet of Things", "Perangkat komputer dan jaringan MikroTik"],
    identifier: [
      { "@type": "PropertyValue", name: "NIB", value: siteConfig.nib },
      { "@type": "PropertyValue", name: "KBLI", value: siteText[lang].kbli },
      { "@type": "PropertyValue", name: "SK Kementerian Hukum RI", value: siteConfig.skAhu },
    ],
    // Populated once the Google Business Profile and LinkedIn page exist.
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
  };
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.brandName,
  inLanguage: ["id-ID", "en"],
  publisher: { "@id": ORG_ID },
};

/** Breadcrumb trail. Home is always position 1. Paths are language-neutral. */
export function breadcrumbSchema(lang: Locale, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: commonCopy[lang].home, item: urlFor(lang, "/") },
      ...trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: urlFor(lang, crumb.path),
      })),
    ],
  };
}

/** The breadcrumb for one of the fixed routes. */
export function routeBreadcrumb(lang: Locale, key: RouteKey) {
  const route = routeSeo[key];
  return breadcrumbSchema(lang, [{ name: route.text[lang].breadcrumb ?? route.text[lang].title, path: route.path }]);
}

/** One Service node per pillar, with its sub-services as an offer catalogue. */
export function servicesSchema(lang: Locale) {
  return getServices(lang).map((pillar) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${urlFor(lang, "/services")}#${pillar.id}`,
    name: pillar.name,
    serviceType: pillar.shortName,
    description: pillar.focus,
    provider: { "@id": ORG_ID },
    inLanguage: schemaLang[lang],
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
}

/** The portfolio index as a collection of case studies. */
export function portfolioCollectionSchema(lang: Locale) {
  const portfolio = getPortfolio(lang);
  const url = urlFor(lang, "/portfolio");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: `Portfolio ${siteConfig.brandName}`,
    description: routeSeo.portfolio.text[lang].description,
    inLanguage: schemaLang[lang],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: portfolio.length,
      itemListElement: portfolio.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: urlFor(lang, `/portfolio/${project.slug}`),
        item: {
          "@type": "CreativeWork",
          "@id": urlFor(lang, `/portfolio/${project.slug}`),
          name: project.title,
          description: project.summary,
          image: absoluteUrl(project.coverImage),
          dateCreated: project.year,
          genre: project.categoryLabel,
          keywords: project.tags.join(", "),
          creator: { "@id": ORG_ID },
          inLanguage: schemaLang[lang],
        },
      })),
    },
  };
}

/** A single case study page. */
export function caseStudySchema(project: ProjectItem, lang: Locale) {
  const url = urlFor(lang, `/portfolio/${project.slug}`);
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
    inLanguage: schemaLang[lang],
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    isPartOf: { "@id": urlFor(lang, "/portfolio") },
    about: { "@type": "Thing", name: project.categoryLabel },
  };
}

/** Simple page-type wrapper used by /about, /industry and /contact. */
export function pageSchema(type: "AboutPage" | "ContactPage" | "WebPage", key: RouteKey, lang: Locale) {
  const route = routeSeo[key];
  const url = urlFor(lang, route.path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": url,
    url,
    name: route.text[lang].title,
    description: route.text[lang].description,
    inLanguage: schemaLang[lang],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/**
 * The FAQ block on the home page, marked up so the same questions can surface
 * directly in search. Every string is the one already rendered on the page —
 * Google requires the visible answer and the marked-up answer to match.
 */
export function faqSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${urlFor(lang, "/")}#faq`,
    inLanguage: schemaLang[lang],
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: getFaq(lang).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * The home page itself. Without this node the home URL only had an
 * Organization and a WebSite attached to it, and no page-level entity that a
 * search engine could tie the breadcrumbless landing page to.
 */
export function homePageSchema(lang: Locale) {
  const url = urlFor(lang, "/");
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${siteConfig.brandName} | ${routeSeo.home.text[lang].title}`,
    description: routeSeo.home.text[lang].description,
    inLanguage: schemaLang[lang],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/hero-centerpiece.webp"),
      caption:
        lang === "en"
          ? "The KaryaLo team's workspace at the Jatisampurna studio, Bekasi"
          : "Meja kerja tim KaryaLo di studio Jatisampurna, Kota Bekasi",
    },
    // Written by the studio; the entity is both author and publisher here.
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The ready-made platforms as a list of software products.
 *
 * SoftwareApplication rather than Product: none of these carry a public price,
 * so an Offer node would be invented data. The list simply tells a search
 * engine what each platform is and what it does.
 */
export function productsSchema(lang: Locale) {
  const products = getProducts(lang);
  const url = urlFor(lang, "/products");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#platforms`,
    name: lang === "en" ? `${siteConfig.brandName} ready-made platforms` : `Platform siap pakai ${siteConfig.brandName}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${url}#${product.id}`,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${url}#${product.id}`,
        name: product.title,
        alternateName: product.tagline,
        description: product.summary,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: product.category,
        operatingSystem: "Web",
        image: absoluteUrl(product.image),
        featureList: product.features,
        inLanguage: schemaLang[lang],
        author: { "@id": ORG_ID },
        provider: { "@id": ORG_ID },
      },
    })),
  };
}
