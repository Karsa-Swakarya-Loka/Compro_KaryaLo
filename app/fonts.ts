import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * One family for the whole site: Plus Jakarta Sans (matches the Compro PDF, 2026-11-07; the CSS variable keeps its old name --font-outfit), the face of the Cargon reference the
 * founder chose on 2026-10-15. Headings, body, labels and buttons all use it;
 * hierarchy comes from size and weight (see the `type-*` roles in globals.css).
 *
 * It replaced the Bebas Neue / Satoshi / Archivo trio. The old `--font-headline`,
 * `--font-story` and `--font-meta` tokens now all point here, so any markup
 * still naming them renders in Outfit too.
 */
const outfit = Plus_Jakarta_Sans({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontVariables = outfit.variable;
