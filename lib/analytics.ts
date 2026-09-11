/**
 * Platform-neutral conversion event layer.
 *
 * Events are pushed to `window.dataLayer` — the shape every major tag manager
 * and ad pixel already reads. Nothing in this file loads a third-party script or
 * sets a cookie; that happens only when components/analytics/Analytics.tsx
 * loads Google Tag Manager. Choosing a channel is then a configuration step,
 * not a code change.
 *
 * Never route personal data through these events. The contact form reports only
 * that a submission happened — never who submitted it or what they wrote. Ad
 * platforms are third-party processors, and the privacy policy promises that
 * form content stays with us.
 */

export type ConversionEvent =
  | "whatsapp_click"
  | "email_click"
  | "phone_click"
  | "lead_form_submit";

export interface ConversionPayload {
  /** Route the conversion happened on, e.g. "/contact". */
  page: string;
  /** Nearest identified section, e.g. "services" — tells you which block earns leads. */
  location?: string;
  /** Visible label of the control. UI copy only, never user input. */
  label?: string;
}

type DataLayerRecord = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerRecord[];
  }
}

/** Records one conversion. No-ops during SSR and whenever nothing is listening. */
export function trackConversion(event: ConversionEvent, payload: ConversionPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
