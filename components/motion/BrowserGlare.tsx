/**
 * Soft diagonal light reflex that sweeps across a browser mockup when its
 * `.group` / `.glare-host` ancestor is hovered. Styles in globals.css.
 */
export default function BrowserGlare() {
  return <span aria-hidden="true" className="browser-glare" />;
}
