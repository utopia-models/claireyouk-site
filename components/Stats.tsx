"use client";
import { useRef } from "react";
import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { STATS } from "@/lib/content";

// Count-up digits (NumberFlow, toolkit.md pattern 5) once the band scrolls into view.
export default function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <dl ref={ref} className="stats">
      {STATS.map((s) => (
        <div key={s.label} className="stat">
          <dt className="stat-num">
            <NumberFlow value={seen ? s.value : 0} suffix={s.suffix} format={{ useGrouping: true }} willChange />
          </dt>
          <dd className="stat-label">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
