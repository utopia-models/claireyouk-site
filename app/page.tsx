import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Reveal from "@/components/Reveal";
import VideoSlot from "@/components/VideoSlot";
import ContactForm from "@/components/ContactForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE, FOCUS, EXPERIENCE, LEADERSHIP, EDUCATION, HONORS, LANGUAGES, SKILLS, INTERESTS, type Role } from "@/lib/content";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE.name,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    url: SITE.url,
    image: `${SITE.url}/claire-youk.jpg`,
    sameAs: [SITE.linkedin],
    alumniOf: ["Chantilly High School", "Northern Virginia Community College"],
    affiliation: { "@type": "CollegeOrUniversity", name: "University of California, Santa Barbara" },
  },
}).replace(/</g, "\\u003c");

function Timeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="timeline">
      <span className="rail" aria-hidden="true"><span className="rail-fill" /></span>
      {roles.map((r) => (
        <li key={r.org + r.title} className="tl-item" data-reveal>
          <p className="tl-dates">{r.dates}{r.where ? ` · ${r.where}` : ""}</p>
          <h3 className="tl-title">{r.title}</h3>
          <p className="tl-org">{r.org}</p>
          <ul className="tl-points">
            {r.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Reveal />
      <Nav />
      <main>
        <Hero />

        <section id="about" className="band marble" aria-labelledby="about-h">
          <div className="wrap about">
            <div>
              <p className="eyebrow ink">About</p>
              <h2 id="about-h" className="split-h2">Law, government, and <em>the people in the room.</em></h2>
            </div>
            <div className="about-copy" data-reveal>
              <p>
                Claire Youk studies Political Science at the University of California, Santa Barbara, on a pre-law track.
                She is a founding-class member of the UCSB chapter of Kappa Alpha Pi, the pre-law and government professional
                fraternity, and works part-time as a Legal &amp; Compliance Associate at Utopia Models, Inc.
              </p>
              <p>
                At Chantilly High School in Fairfax, Virginia, she was one of three students chosen to represent a school of
                3,000+ on the Fairfax County Public Schools Student Advisory Council, and sat on the Student Government
                Association’s Leadership Executive Board. She graduated with a 4.0 GPA and was named an AP Scholar with Distinction.
              </p>
              <p>
                She speaks English and intermediate Spanish, and has taught children at a nonprofit performing-arts studio since 2019.
              </p>
            </div>
          </div>
          <div className="wrap">
            <Stats />
          </div>
        </section>

        <section id="focus" className="band marble-2" aria-labelledby="focus-h">
          <div className="wrap">
            <p className="eyebrow ink">Focus</p>
            <h2 id="focus-h" className="split-h2">What she is looking for, <em>summer 2027.</em></h2>
            <ol className="focus">
              {FOCUS.map((f) => (
                <li key={f.title} className="focus-item" data-reveal>
                  <span className="focus-num" aria-hidden="true">{f.numeral}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="experience" className="band marble" aria-labelledby="exp-h">
          <div className="wrap two-col">
            <div className="sticky-head">
              <p className="eyebrow ink">Experience</p>
              <h2 id="exp-h" className="split-h2">Work and <em>service.</em></h2>
              <a className="text-link" href="/resume">Full resume →</a>
            </div>
            <div>
              <Timeline roles={EXPERIENCE} />
              <h3 className="sub-h" data-reveal>Leadership and involvement</h3>
              <Timeline roles={LEADERSHIP} />
            </div>
          </div>
        </section>

        <section id="education" className="band marble-2" aria-labelledby="edu-h">
          <div className="wrap two-col">
            <div className="sticky-head">
              <p className="eyebrow ink">Education &amp; honors</p>
              <h2 id="edu-h" className="split-h2">Education <em>and honors.</em></h2>
            </div>
            <div>
              <ul className="edu">
                {EDUCATION.map((e) => (
                  <li key={e.school} data-reveal>
                    <h3>{e.school}</h3>
                    <p className="edu-detail">{e.detail}</p>
                    <p className="edu-note">{e.note}</p>
                  </li>
                ))}
              </ul>
              <div className="honors" data-reveal>
                <h3 className="sub-h">Honors and certificates</h3>
                <ul className="chips">
                  {HONORS.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <dl className="facts">
                  <div><dt>Languages</dt><dd>{LANGUAGES}</dd></div>
                  <div><dt>Skills</dt><dd>{SKILLS}</dd></div>
                  <div><dt>Interests</dt><dd>{INTERESTS}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="resume" className="band marble" aria-labelledby="resume-h">
          <div className="wrap resume-cta" data-reveal>
            <div>
              <p className="eyebrow ink">Resume</p>
              <h2 id="resume-h" className="split-h2">The one-page <em>resume.</em></h2>
              <p className="muted">Read it on the page or download the PDF. A hospitality version for server and host roles is also available.</p>
            </div>
            <div className="resume-actions">
              <a className="btn btn-ink" href="/resume">View resume</a>
              <a className="btn btn-outline" href={SITE.resumePdf} download>Download PDF</a>
              <a className="text-link" href={SITE.hospitalityPdf} download>Hospitality resume (PDF)</a>
            </div>
          </div>
        </section>

        <section id="video" className="band dusk" aria-labelledby="video-h">
          <div className="wrap">
            <p className="eyebrow">Video</p>
            <h2 id="video-h" className="split-h2 on-dusk">Meet <em>Claire.</em></h2>
            <VideoSlot />
          </div>
        </section>

        <section id="contact" className="band dusk contact" aria-labelledby="contact-h">
          <div className="wrap two-col">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-h" className="split-h2 on-dusk">Get in <em>touch.</em></h2>
              <p className="on-dusk-muted">For internships, roles and introductions. Messages go straight to Claire’s inbox.</p>
              <ul className="contact-links">
                <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
