"use client";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { STATS } from "@/lib/content";

// Count-up digits (NumberFlow, toolkit.md pattern 5). The real values are server-rendered; only when the band is still
// below the fold at mount (and motion is allowed) do they drop to 0 and count up as it scrolls into view.
export default function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const [shown, setShown] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setShown(false);
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) { setShown(true); cleanup(); }
    };
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && check(), { threshold: [0, 0.2] });
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    const cleanup = () => { io.disconnect(); window.removeEventListener("scroll", check); };
    return cleanup;
  }, []);
  return (
    <dl ref={ref} className="stats">
      {STATS.map((s) => (
        <div key={s.label} className="stat">
          <dt className="stat-num">
            <NumberFlow value={shown ? s.value : 0} suffix={s.suffix} format={{ useGrouping: true }} willChange />
          </dt>
          <dd className="stat-label">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
