/**
 * The two languages the site is published in.
 *
 * Indonesian is the default and keeps the unprefixed URLs the site has always
 * had (`/about`), so nothing already indexed moves. English lives under `/en`
 * (`/en/about`). Each language has its own root layout — `app/(id)` and
 * `app/(en)/en` — which is what lets `<html lang>` be right on every page while
 * every route stays statically rendered, with no proxy reading the request.
 */
export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

/** Value for `<html lang>` and `hreflang`. */
export const htmlLang: Record<Locale, string> = { id: "id", en: "en" };

/** Value for schema.org `inLanguage`. */
export const schemaLang: Record<Locale, string> = { id: "id-ID", en: "en" };

/** Value for `og:locale`. */
export const ogLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" };

/**
 * A site-relative path in the given language. Indonesian paths are returned
 * unchanged; English ones gain the `/en` prefix. Hashes and query strings pass
 * through, so `localePath("en", "/services#iot-hardware")` works.
 */
export function localePath(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  if (path === "/" || path === "") return "/en";
  if (path.startsWith("#") || path.startsWith("?")) return `/en${path}`;
  return `/en${path.startsWith("/") ? path : `/${path}`}`;
}

/** Splits a pathname into its language and the language-neutral path. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  if (pathname === "/en") return { lang: "en", path: "/" };
  if (pathname.startsWith("/en/")) return { lang: "en", path: pathname.slice(3) };
  return { lang: defaultLocale, path: pathname || "/" };
}

/** Shape check for copy modules: every language must carry the same keys. */
export type Localized<T> = Record<Locale, T>;
