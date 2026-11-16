# claireyouk-site

claireyouk.com — Claire Youk's personal site: Political Science at UC Santa Barbara, pre-law.

- **Next.js 16 (App Router) on Vercel**, project `claireyouk-site` (team utopia). Pages are static; `/api/contact` is the one function.
- **Facts** live only in `lib/content.ts`, each from Claire's files in `utopia-models/knowledge`
  (`net/work/apply/candidates/claire/ground-truth.yaml`, `net/work/specs/13429-claire-youk-client/`). No phone number or
  street address is published.
- **Design tokens:** `design/tokens.json` (DTCG) → `npm run tokens` → `app/tokens.generated.css`; `prebuild` fails on drift.
- **Motion toolkit:** Lenis (smooth scroll, on GSAP's ticker) · GSAP SplitText + ScrollTrigger (hero type, reveals, timeline rail)
  · Motion (pointer light, arch line draw, form states) · NumberFlow (count-up stats) · Paper Shaders MeshGradient (hero and
  video dusk). All respect `prefers-reduced-motion`.
- **Resume:** `/resume` (HTML) and `/resume/hospitality`; the PDFs in `public/` are those pages printed:
  `npm run build && npx next start -p 3311 & node scripts/resume-pdf.mjs http://localhost:3311`.
- **Contact form:** `POST /api/contact` sends one email through the Gmail API **as claire@utopiamodels.ai to
  law@claireyouk.com** (Reply-To = the visitor). Identity: service account
  `claireyouk-contact@driven-rider-500720-i0.iam.gserviceaccount.com` (no project role), whose Workspace domain-wide
  delegation grant holds only `gmail.send`. Vercel env `CONTACT_SA_JSON_B64` (production + preview, sensitive); source of
  truth Infisical `fleet-infra/CLAIREYOUK_CONTACT_SA_JSON_B64`. Rotate both together.
