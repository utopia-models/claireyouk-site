"use client";
import { useEffect, useState } from "react";

const LINKS = [
  ["About", "/#about"],
  ["Focus", "/#focus"],
  ["Experience", "/#experience"],
  ["Education", "/#education"],
  ["Video", "/#video"],
] as const;

export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  useEffect(() => {
    if (solid) return;
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [solid]);
  return (
    <header className={`nav ${scrolled ? "nav-solid" : ""}`}>
      <div className="wrap nav-inner">
        <a className="nav-brand" href="/" aria-label="Claire Youk, home">Claire Youk</a>
        <nav aria-label="Sections" className="nav-links">
          {LINKS.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-pill" href="/resume">Resume</a>
          <a className="nav-pill nav-pill-solid" href="/#contact">Contact</a>
        </div>
      </div>
    </header>
  );
}
