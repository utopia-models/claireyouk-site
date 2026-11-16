import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospitality resume · Claire Youk",
  description: "Claire Youk's resume for server, host and food runner roles, Fairfax, VA, July – September 2027.",
  alternates: { canonical: "/resume/hospitality" },
};

// resume-server.md with the phone number removed and the public address law@claireyouk.com.
const ROLES = [
  { org: "Encore Performers (nonprofit performing arts)", sub: "Teaching Assistant, Junior Demonstrator to Senior Teacher", dates: "Since June 2019", pts: [
    "Taught and supervised 130+ children ages 3–14, keeping large classes calm, safe and on schedule",
    "Trained 60+ students into advanced classes",
    "Promoted from junior demonstrator to senior teacher",
  ] },
  { org: "Encore Theatrical Arts Project (nonprofit)", sub: "Company Member", dates: "July 2022 – Present", pts: [
    "One of 25 performers in 65 community shows (33 sold out) for live audiences; 1,000+ service hours",
    "Rehearses 6+ hours and trains 15+ hours a week: stamina, timing and teamwork under pressure",
  ] },
  { org: "Chantilly High School, Student Government Association", sub: "Leadership Executive Board", dates: "August 2024 – June 2026", pts: [
    "Ran school-wide events for 3,000+ students: scheduling, supplies, volunteers and day-of logistics",
    "Kept teams on deadline and solved problems on the spot with staff and administrators",
  ] },
  { org: "Encore Performers", sub: "Social Media Marketing Manager", dates: "August 2024 – February 2026", pts: [
    "Ran the nonprofit’s social media (6,480+ followers across five platforms) and promoted its community events",
  ] },
  { org: "Utopia Models, Inc.", sub: "Legal & Compliance Associate (part-time, remote)", dates: "November 2026 – Present", pts: [
    "Tracks contracts, deadlines and filings for a small company; organized and reliable with details",
  ] },
];

export default function Hospitality() {
  return (
    <>
      <div className="no-print"><Nav solid /></div>
      <main className="resume-page">
        <div className="resume-bar no-print">
          <a className="text-link" href="/resume">← Main resume</a>
          <div className="resume-actions"><a className="btn btn-ink" href={SITE.hospitalityPdf} download>Download PDF</a></div>
        </div>
        <article className="paper">
          <header className="paper-head">
            <h1>Claire Youk</h1>
            <p>Fairfax, VA · <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · claireyouk.com</p>
            <p className="paper-summary">
              Friendly, fast-moving college student home in Fairfax for the summer. Years of working with the public, kids and big crowds, at ease on her feet in a busy room. Speaks Spanish. Available full-time July through September 2027, evenings and weekends included.
            </p>
          </header>
          <section>
            <h2>Experience</h2>
            {ROLES.map((r) => (
              <div className="paper-role" key={r.org + r.sub}>
                <p className="paper-line"><strong>{r.org}</strong><span>{r.dates}</span></p>
                <p className="paper-sub">{r.sub}</p>
                <ul>{r.pts.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </section>
          <section>
            <h2>Education</h2>
            <div className="paper-role"><p className="paper-line"><strong>University of California, Santa Barbara</strong></p><p className="paper-sub">B.A. Political Science, expected 2030</p></div>
            <div className="paper-role"><p className="paper-line"><strong>Chantilly High School</strong></p><p className="paper-sub">Fairfax, VA · Diploma, 2026 · GPA 4.0 · AP Scholar with Distinction · National Honor Society</p></div>
          </section>
          <section>
            <h2>Skills</h2>
            <ul>
              <li>Customer-facing communication, staying calm in a rush, teamwork, multitasking</li>
              <li>Spanish: intermediate (college-level Spanish 201/202, Spanish Honor Society)</li>
            </ul>
          </section>
          <section>
            <h2>Availability</h2>
            <ul><li>July through September 2027. Open to evenings, weekends and doubles.</li></ul>
          </section>
        </article>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
