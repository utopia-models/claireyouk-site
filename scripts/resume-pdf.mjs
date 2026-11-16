// Prints /resume and /resume/hospitality from a running server into public/*.pdf (letter, print CSS).
// Usage: node scripts/resume-pdf.mjs [base-url]   (default http://localhost:3000)
// Playwright comes from the fleet's shared install (/srv/playwright-mcp) or PLAYWRIGHT_DIR.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require(process.env.PLAYWRIGHT_DIR || "/srv/playwright-mcp/node_modules/playwright");
const base = process.argv[2] || "http://localhost:3000";
const jobs = [["/resume", "public/Claire_Youk_resume.pdf"], ["/resume/hospitality", "public/Claire_Youk_resume_hospitality.pdf"]];
const b = await pw.chromium.launch();
const page = await b.newPage();
for (const [path, out] of jobs) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", out);
}
await b.close();
