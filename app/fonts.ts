import { Roboto } from "next/font/google";

/**
 * One family for the whole site: Roboto, the face of the Agenciex template the
 * design follows. The CSS variable keeps its old name (--font-outfit) so every
 * existing `type-*` role and token keeps resolving; hierarchy comes from size
 * and weight (light 300 for lead-ins, 500 for headings, 400 for reading text).
 */
const roboto = Roboto({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const fontVariables = roboto.variable;
