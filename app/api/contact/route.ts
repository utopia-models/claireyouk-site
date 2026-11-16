// POST /api/contact — claireyouk.com's contact form. Sends one email as claire@utopiamodels.ai to
// law@claireyouk.com (an alias of the same inbox) through the Gmail API, with Reply-To set to the visitor.
// Identity: service account claireyouk-contact@driven-rider-500720-i0 (no project role) whose Workspace
// domain-wide-delegation grant holds ONLY gmail.send. Key: Vercel env CONTACT_SA_JSON_B64 (source: Infisical
// fleet-infra CLAIREYOUK_CONTACT_SA_JSON_B64).
import { createSign } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "claire@utopiamodels.ai";
const TO = "law@claireyouk.com";
const SCOPE = "https://www.googleapis.com/auth/gmail.send";

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\n\r]+/g, " ");
const encWord = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s).toString("base64")}?=`);

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

async function accessToken() {
  const raw = process.env.CONTACT_SA_JSON_B64;
  if (!raw) throw new Error("not configured");
  const sa = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, sub: FROM, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 600 }));
  const sig = b64url(createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error(`token: ${j.error || res.status}`);
  return j.access_token as string;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: "Bad request." }, { status: 400 }); }
  if (clean(body.website, 200)) return Response.json({ ok: true }); // honeypot: drop silently
  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const org = oneLine(clean(body.organization, 160));
  const subject = oneLine(clean(body.subject, 160));
  const message = clean(body.message, 5000);
  if (!name || !subject || !message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))
    return Response.json({ ok: false, error: "Please fill in your name, a valid email, a subject and a message." }, { status: 422 });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false, error: "Too many messages from this connection; please try again later." }, { status: 429 });

  const text = [
    `New message from the contact form on claireyouk.com`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    org ? `Organization: ${org}` : null,
    `Subject: ${subject}`,
    ``,
    message,
    ``,
    `--`,
    `Reply to this email to answer ${name} directly.`,
  ].filter((l) => l !== null).join("\r\n");
  const mime = [
    `From: ${encWord("claireyouk.com contact form")} <${FROM}>`,
    `To: ${TO}`,
    `Reply-To: ${encWord(name.replace(/["<>]/g, ""))} <${email}>`,
    `Subject: ${encWord(subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    Buffer.from(text).toString("base64").replace(/(.{76})/g, "$1\r\n"),
  ].join("\r\n");

  try {
    const token = await accessToken();
    const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${FROM}/messages/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: b64url(mime) }),
    });
    const j = await res.json();
    if (!res.ok || !j.id) { console.error("gmail send failed", res.status, j?.error?.message); throw new Error("send"); }
    console.log("contact sent", j.id);
    return Response.json({ ok: true, id: j.id });
  } catch (e) {
    console.error("contact error", e instanceof Error ? e.message : e);
    return Response.json({ ok: false, error: "The message could not be sent right now." }, { status: 502 });
  }
}
