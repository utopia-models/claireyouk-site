"use client";
import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

// The slot for Claire's coming video introduction. No video exists yet, so nothing here pretends to play.
export default function VideoSlot() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div className="video-slot" role="img" aria-label="Video introduction, coming soon">
      <MeshGradient className="video-shader" colors={["#0b1430", "#6b5fc7", "#1f2b66", "#ef8f84"]} distortion={0.7} swirl={0.5} grainOverlay={0.15} speed={reduced ? 0 : 0.12} maxPixelCount={900 * 600} />
      <div className="video-copy">
        <img src="/claire-youk-400.jpg" alt="" width={96} height={96} className="video-face" />
        <p className="video-kicker">Video introduction</p>
        <p className="video-title">Coming soon</p>
        <p className="video-sub">A short introduction from Claire will play here.</p>
      </div>
    </div>
  );
}
