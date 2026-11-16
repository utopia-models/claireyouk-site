"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, useMotionValue, useSpring, useMotionTemplate, MotionConfig } from "motion/react";
import { SITE } from "@/lib/content";

gsap.registerPlugin(SplitText, useGSAP);

// The dusk: midnight → indigo → violet → coral → peach (design/tokens.json color.dusk.*).
const DUSK = ["#0b1430", "#1f2b66", "#6b5fc7", "#ef8f84", "#0b1430", "#f6cdb9"];

// Arch outline in a 100 × 130 box: two straight jambs and a semicircular head, like a courthouse window.
const ARCH = "M -3 118 L -3 50 A 53 53 0 0 1 103 50 L 103 118";
const ARCH_OUTER = "M -8 104 L -8 50 A 58 58 0 0 1 108 50 L 108 104";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // The light follows the pointer or finger (Motion springs).
  const x = useMotionValue(70), y = useMotionValue(40);
  const sx = useSpring(x, { stiffness: 60, damping: 18 }), sy = useSpring(y, { stiffness: 60, damping: 18 });
  const light = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgba(246,205,185,0.30), rgba(239,143,132,0.10) 40%, transparent 70%)`;
  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-name", { type: "words,chars", mask: "chars" });
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from(split.chars, { yPercent: 115, stagger: 0.045, duration: 1.1 })
          .from(".hero-fade", { opacity: 0, y: 14, filter: "blur(8px)", stagger: 0.09, duration: 0.8 }, "-=0.7")
          .from(".hero-photo", { opacity: 0, scale: 1.06, duration: 1.4, ease: "power3.out" }, 0.15);
        gsap.to(".hero-photo img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <MotionConfig reducedMotion="user">
      <section ref={root} className="hero" id="top" onPointerMove={onMove} aria-labelledby="hero-name">
        <div className="hero-bg" aria-hidden="true">
          <MeshGradient
            className="hero-shader"
            colors={DUSK}
            distortion={0.85}
            swirl={0.35}
            grainOverlay={0.12}
            speed={reduced ? 0 : 0.18}
            maxPixelCount={1600 * 1000}
          />
          <motion.div className="hero-light" style={{ background: light }} />
          <div className="hero-vignette" />
        </div>

        <div className="hero-inner wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-fade">Political Science · UC Santa Barbara · Pre-law</p>
            <h1 id="hero-name" className="hero-name">Claire Youk</h1>
            <p className="hero-lede hero-fade">
              Pre-law student and former student representative to Fairfax County Public Schools leadership.
              Available for a paid internship in Northern Virginia and Washington, DC, <em>July – September 2027.</em>
            </p>
            <div className="hero-ctas hero-fade">
              <a className="btn btn-light" href="/resume">View resume</a>
              <a className="btn btn-glass" href="#contact">Get in touch</a>
            </div>
            <p className="hero-place hero-fade">{SITE.places}</p>
          </div>

          <figure className="hero-photo">
            <div className="arch">
              <img src="/claire-youk.jpg" alt="Claire Youk" width={800} height={800} fetchPriority="high" />
            </div>
            <svg className="arch-line" viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
              <motion.path d={ARCH} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} />
              <motion.path className="outer" d={ARCH_OUTER} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }} />
            </svg>
          </figure>
        </div>
        <a className="hero-scroll hero-fade" href="#about" aria-label="Scroll to About">
          <span />
        </a>
      </section>
    </MotionConfig>
  );
}
