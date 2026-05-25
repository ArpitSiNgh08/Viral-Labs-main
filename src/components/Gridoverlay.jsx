/**
 * GridOverlay — Grid lines, corner markers, screen grid, and texture overlay.
 *
 * Z-index stacking (front to back):
 * z-40 → Text, buttons, UI (set on content in HeroSection)
 * z-30 → Grid lines + crosshairs
 * z-20 → Texture (global, full page)
 * z-10 → Screen grid
 * z-0  → BG plane (R3F canvas)
 *
 * ENTRANCE:
 *   Lines + crosshairs start invisible.
 *   Vertical lines grow from top (scaleY 0→1).
 *   Horizontal line grows from center (scaleX 0→1).
 *   Crosshairs fade in after lines.
 *   Timeline is PAUSED — HeroSection triggers via ref.play().
 */

import { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  GridLineLeft,
  GridLineRight,
  GridCrosshair,
} from "./Svgassets";

const GridOverlay = forwardRef(function GridOverlay({ children, showTexture = true }, ref) {
  const overlayRef = useRef();
  const tlRef = useRef();

  // Expose a .play() method so HeroSection can trigger it
  useImperativeHandle(ref, () => ({
    play: () => tlRef.current?.play(),
  }));

  useGSAP(() => {
    const el = overlayRef.current;
    if (!el) return;

    const leftLine = el.querySelector(".grid-line-left");
    const rightLine = el.querySelector(".grid-line-right");
    const topLine = el.querySelector(".grid-line-top");
    const crosshairs = el.querySelectorAll(".grid-crosshair");

    // Initial states — all hidden
    gsap.set([leftLine, rightLine], { scaleY: 0, transformOrigin: "top center" });
    gsap.set(topLine, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(crosshairs, { opacity: 0, scale: 0 });

    // Create PAUSED — HeroSection entrance will trigger via ref
    const tl = gsap.timeline({ paused: true });

    // Vertical lines grow from top
    tl.to([leftLine, rightLine], {
      scaleY: 1,
      duration: 1.0,
      ease: "power3.inOut",
    }, 0);

    // Horizontal line grows from center
    tl.to(topLine, {
      scaleX: 1,
      duration: 0.8,
      ease: "power3.inOut",
    }, 0.3);

    // Crosshairs pop in
    tl.to(crosshairs, {
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.4,
      ease: "back.out(2)",
    }, 0.6);

    tlRef.current = tl;
  });

  return (
    <div ref={overlayRef} className="relative w-full h-full">
      {children}

      {/* ── z-30: Grid lines + crosshairs ── */}
      <GridLineLeft
        className="grid-line-left pointer-events-none absolute top-0 left-[105px] w-px h-full z-30"
        aria-hidden="true"
      />
      <GridLineRight
        className="grid-line-right pointer-events-none absolute top-0 right-[105px] w-px h-full z-30"
        aria-hidden="true"
      />
      <div
        className="grid-line-top pointer-events-none absolute top-[56px] left-[105px] right-[105px] h-px bg-white/20 z-30"
        aria-hidden="true"
      />
      <GridCrosshair
        className="grid-crosshair pointer-events-none absolute top-[52px] left-[101px] z-30"
        aria-hidden="true"
      />
      <GridCrosshair
        className="grid-crosshair pointer-events-none absolute top-[52px] right-[101px] z-30"
        aria-hidden="true"
      />
    </div>
  );
});

export default GridOverlay;