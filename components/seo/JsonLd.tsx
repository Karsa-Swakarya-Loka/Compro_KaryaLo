/**
 * Emits a JSON-LD block into the server-rendered HTML.
 *
 * This is a Server Component on purpose. Next.js 16's JSON-LD guide specifies a
 * raw `<script type="application/ld+json">` rendered from a layout or page, not
 * `next/script` (which is for executable JS). Rendering it server-side is what
 * puts the payload in the initial HTML that crawlers actually read.
 *
 * The `<` escape prevents a string inside the data from closing the script tag.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
