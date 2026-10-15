/**
 * X/Twitter reads its own file convention and does not fall back to the
 * OpenGraph one, so the same card is re-exported here rather than duplicated.
 */
export { default, alt, size, contentType, generateStaticParams } from "./opengraph-image";
