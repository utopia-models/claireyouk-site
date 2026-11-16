"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MeshGradient, GodRays } from "@paper-design/shaders-react";
import { motion, useMotionValue, useSpring, useMotionTemplate, MotionConfig } from "motion/react";
import { SITE } from "@/lib/content";

gsap.registerPlugin(SplitText, useGSAP);

// The dusk: midnight → indigo → violet → coral (design/tokens.json color.dusk.*). Peach is kept for the light only.
const DUSK = ["#0b1430", "#1f2b66", "#6b5fc7", "#0b1430", "#ef8f84", "#1f2b66"];

// A courthouse fanlight window drawn in light, in the photo's own coordinate box (100 × 130; the photo's arch head is a
// semicircle of r = 50 centred at (50, 50)). Inner frame hugs the photo, outer frame is r = 64; the fanlight between them
// is cut by spokes; a keystone crowns it; a sill closes it.
const R1 = 53, R2 = 64, CX = 50, CY = 50;
const arc = (r: number, bottom: number) => `M ${CX - r} ${bottom} L ${CX - r} ${CY} A ${r} ${r} 0 0 1 ${CX + r} ${CY} L ${CX + r} ${bottom}`;
const SPOKES = Array.from({ length: 11 }, (_, i) => {
  const a = Math.PI - (Math.PI * (i + 1)) / 12;
  const c = Math.cos(a), s = Math.sin(a);
  return `M ${CX + R1 * c} ${CY - R1 * s} L ${CX + R2 * c} ${CY - R2 * s}`;
});
const KEYSTONE = `M ${CX - 4} ${CY - R2 - 1} L ${CX + 4} ${CY - R2 - 1} L ${CX + 2.6} ${CY - R1 + 0.5} L ${CX - 2.6} ${CY - R1 + 0.5} Z`;
const SILL = `M ${CX - R2 - 6} 133 L ${CX + R2 + 6} 133`;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // The light follows the pointer or finger (Motion springs); it rests on her face until you move.
  const x = useMotionValue(68), y = useMotionValue(38);
  const sx = useSpring(x, { stiffness: 50, damping: 16 }), sy = useSpring(y, { stiffness: 50, damping: 16 });
  const light = useMotionTemplate`radial-gradient(42vmax circle at ${sx}% ${sy}%, rgba(246,205,185,0.42), rgba(239,143,132,0.16) 38%, transparent 66%)`;
  const glow = useMotionTemplate`radial-gradient(70% 55% at ${sx}% ${sy}%, rgba(246,205,185,0.30), transparent 70%)`;
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
          .from(split.chars, { yPercent: 115, stagger: 0.04, duration: 1 })
          .from(".hero-fade", { opacity: 0, y: 14, filter: "blur(8px)", stagger: 0.08, duration: 0.7 }, "-=0.7")
          .from(".hero-photo .arch", { opacity: 0, scale: 1.05, duration: 1.2, ease: "power3.out" }, 0.1)
          .from(".hero-rays", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0.3);
        gsap.to(".hero-photo .arch img", { yPercent: 7, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  const draw = (delay: number, duration = 1.1) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <MotionConfig reducedMotion="user">
      <section ref={root} className="hero" id="top" onPointerMove={onMove} aria-labelledby="hero-name">
        <div className="hero-bg" aria-hidden="true">
          <MeshGradient className="hero-shader" colors={DUSK} distortion={0.8} swirl={0.3} grainOverlay={0.1} speed={reduced ? 0 : 0.16} maxPixelCount={1600 * 1000} />
          <motion.div className="hero-light" style={{ background: light }} />
          <div className="hero-scrim" />
        </div>

        <div className="hero-inner wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-fade">Political Science · UC Santa Barbara · Pre‑law</p>
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
            {/* dusk light pouring through the window from behind her (Paper Shaders GodRays) */}
            <div className="hero-rays" aria-hidden="true">
              <GodRays
                className="hero-rays-canvas"
                colorBack="#00000000"
                colorBloom="#f6cdb9"
                colors={["#ef8f84cc", "#f6cdb9b3", "#6b5fc799", "#ffffff66"]}
                density={0.32}
                spotty={0.28}
                midSize={0.22}
                midIntensity={0.55}
                intensity={0.75}
                bloom={0.45}
                speed={reduced ? 0 : 0.5}
                maxPixelCount={900 * 900}
              />
            </div>
            <div className="arch">
              <img src="/claire-youk.jpg" alt="Claire Youk" width={800} height={800} fetchPriority="high" />
              <motion.div className="arch-glow" aria-hidden="true" style={{ background: glow }} />
            </div>
            <svg className="window" viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="w-stroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff4ec" />
                  <stop offset="0.45" stopColor="#f6cdb9" />
                  <stop offset="1" stopColor="#ef8f84" stopOpacity="0.15" />
                </linearGradient>
                <filter id="w-bloom" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.2" />
                </filter>
              </defs>
              <g className="window-bloom" filter="url(#w-bloom)">
                <path d={arc(R1, 128)} />
                <path d={arc(R2, 133)} />
                {SPOKES.map((d) => <path key={d} d={d} />)}
              </g>
              <g className="window-core">
                <motion.path d={arc(R1, 128)} {...draw(0.15)} />
                <motion.path d={arc(R2, 133)} {...draw(0.3, 1.3)} />
                {SPOKES.map((d, i) => <motion.path key={d} d={d} {...draw(0.6 + i * 0.04, 0.5)} />)}
                <motion.path d={SILL} {...draw(0.9, 0.8)} />
                <motion.path className="keystone" d={KEYSTONE} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }} />
              </g>
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
