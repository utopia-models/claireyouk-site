"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveals for every [data-reveal] element, and the timeline rail drawn by scroll (GSAP ScrollTrigger).
export default function Reveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
      gsap.set("[data-reveal]", { opacity: 0 });
      document.querySelectorAll<HTMLElement>(".rail-fill").forEach((el) => {
        gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true } });
      });
      document.querySelectorAll<HTMLElement>(".split-h2").forEach((h) => {
        gsap.from(h, { opacity: 0, y: 40, filter: "blur(10px)", duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 85%", once: true } });
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
