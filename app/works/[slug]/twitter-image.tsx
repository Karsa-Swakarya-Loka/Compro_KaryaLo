/**
 * X/Twitter reads its own file convention and does not fall back to the
 * OpenGraph one, so the case-study card is re-exported here — including its
 * static params, otherwise this route alone would be rendered on demand.
 */
export {
  default,
  generateStaticParams,
  alt,
  size,
  contentType,
} from "./opengraph-image";
