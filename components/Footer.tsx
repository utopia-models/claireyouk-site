import { SITE } from "@/lib/content";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="footer-name">Claire Youk</p>
        <p>{SITE.places}</p>
        <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href="/resume">Resume</a></p>
      </div>
    </footer>
  );
}
