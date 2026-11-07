import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const LIMITS = { name: 120, company: 160, service: 160, budget: 80, description: 3000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/**
 * Sends the project brief from the Contact form to the company inbox.
 * Needs SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS (optional MAIL_TO,
 * MAIL_FROM). Without them it answers 503 and the form falls back to WhatsApp.
 */
export async function POST(request: Request) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const company = clean(body.company, LIMITS.company);
  const service = clean(body.service, LIMITS.service);
  const budget = clean(body.budget, LIMITS.budget);
  const description = clean(body.description, LIMITS.description);
  if (!name || !company || !description) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const to = process.env.MAIL_TO || siteConfig.email;
  const from = process.env.MAIL_FROM || user;
  const port = Number(process.env.SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

  const rows: [string, string][] = [
    ["Nama", name],
    ["Perusahaan / entitas", company],
    ["Layanan", service || "-"],
    ["Anggaran", budget || "-"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nKebutuhan proyek:\n${description}\n`;
  const html = `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p><b>Kebutuhan proyek</b></p><p style="white-space:pre-wrap">${escapeHtml(description)}</p>`;

  try {
    await transporter.sendMail({
      from: `"Formulir Situs KaryaLo" <${from}>`,
      to,
      subject: `Brief proyek baru dari ${name.replace(/[\r\n]/g, " ")}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
