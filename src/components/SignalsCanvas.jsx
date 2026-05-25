/**
 * SignalsCanvas — Standalone fixed Canvas for the Signals visualization.
 *
 * 4th WebGL context. Uses @react-three/postprocessing for bloom.
 * Tracks the SignalsSection DOM element for scroll positioning.
 *
 * Pattern matches GlobeCanvas — fixed container, RAF-driven positioning.
 */

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SignalsScene from "./SignalsScene";

/* ══════════════════════════════════════════════════════
   SHARED STATE — signals section element reference
   ══════════════════════════════════════════════════════ */

export const signalsCanvasState = {
  sectionEl: null,
};

/* ══════════════════════════════════════════════════════
   CANVAS COMPONENT
   ══════════════════════════════════════════════════════ */

export default function SignalsCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    let rafId;
    let lastTransform = "";
    let lastOpacity = "";

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const el = containerRef.current;
      if (!el) return;

      const sectionEl = signalsCanvasState.sectionEl;
      if (!sectionEl) {
        if (lastOpacity !== "0") { el.style.opacity = "0"; lastOpacity = "0"; }
        return;
      }

      // Batch all DOM reads FIRST — no writes between reads
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = rect.bottom >= 0 && rect.top <= vh;

      // Now do all writes
      if (!visible) {
        if (lastOpacity !== "0") { el.style.opacity = "0"; lastOpacity = "0"; }
      } else {
        if (lastOpacity !== "1") { el.style.opacity = "1"; lastOpacity = "1"; }
        const t = `translateY(${Math.round(rect.top)}px)`;
        if (t !== lastTransform) { el.style.transform = t; lastTransform = t; }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-26"
      style={{ opacity: 0, pointerEvents: "none", height: "130vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 95], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        dpr={1}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <SignalsScene />
        <EffectComposer resolutionScale={0.5}>
          <Bloom
            intensity={5}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            radius={0.15}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}