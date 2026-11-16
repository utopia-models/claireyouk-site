import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE, EXPERIENCE, LEADERSHIP, EDUCATION, HONORS, LANGUAGES, SKILLS, INTERESTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume · Claire Youk",
  description: "Claire Youk's resume: Political Science at UC Santa Barbara, pre-law. Paid summer 2027 internship, Northern Virginia / Washington, DC.",
  alternates: { canonical: "/resume" },
};

// The public resume = resume-internship.md with the phone number removed and the public address law@claireyouk.com.
// /Claire_Youk_resume.pdf is this page printed (scripts/resume-pdf.mjs).
export default function Resume() {
  return (
    <>
      <div className="no-print"><Nav solid /></div>
      <main className="resume-page">
        <div className="resume-bar no-print">
          <a className="text-link" href="/">← claireyouk.com</a>
          <div className="resume-actions">
            <a className="btn btn-ink" href={SITE.resumePdf} download>Download PDF</a>
            <a className="btn btn-outline" href={SITE.hospitalityPdf} download>Hospitality version (PDF)</a>
          </div>
        </div>
        <article className="paper">
          <header className="paper-head">
            <h1>Claire Youk</h1>
            <p>Fairfax, VA · <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.linkedin}>linkedin.com/in/claireyouk</a> · claireyouk.com</p>
            <p className="paper-summary">
              Political Science student at UC Santa Barbara, pre-law. Available for a paid summer internship in Northern Virginia / Washington, DC, July through September 2027.
            </p>
          </header>

          <section>
            <h2>Experience</h2>
            {EXPERIENCE.map((r) => (
              <div className="paper-role" key={r.org + r.title}>
                <p className="paper-line"><strong>{r.org}</strong><span>{r.dates}</span></p>
                <p className="paper-sub">{r.title}{r.where ? ` · ${r.where}` : ""}</p>
                <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Education</h2>
            {EDUCATION.map((e) => (
              <div className="paper-role" key={e.school}>
                <p className="paper-line"><strong>{e.school}</strong></p>
                <p className="paper-sub">{e.detail}</p>
                <p className="paper-note">{e.note}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Leadership and involvement</h2>
            {LEADERSHIP.map((r) => (
              <div className="paper-role" key={r.org}>
                <p className="paper-line"><strong>{r.org}</strong><span>{r.dates}</span></p>
                <p className="paper-sub">{r.title}</p>
                <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Honors, certificates and skills</h2>
            <ul>
              <li>{HONORS.join("; ")}</li>
              <li>Languages: {LANGUAGES}</li>
              <li>Skills: {SKILLS}. Interests: {INTERESTS}</li>
            </ul>
          </section>
        </article>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
