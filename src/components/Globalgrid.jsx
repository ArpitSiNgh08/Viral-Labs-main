/**
 * GlobalGrid — Reusable grid overlay, absolute-positioned.
 *
 * Drop an instance inside any section. Since it's position:absolute,
 * it fills the section and scrolls naturally with it.
 *
 * CELL_SIZE controls grid density. Fixed px = always square on any screen.
 *   40px → dense grid, lots of cells
 *   60px → moderate density
 *   80px → sparse
 *
 * Props:
 *   animated (default: false)
 *     true  → starts hidden, entrance triggered via entranceState.playGlobalGrid()
 *     false → visible immediately (for sections after the hero)
 *
 *   navOffset (default: false)
 *     true  → top-11 (44px offset for navbar)
 *     false → top-0 (flush with section top, used everywhere else)
 *
 *   topClass (default: undefined)
 *     Pass an explicit Tailwind top class (e.g. "top-[56px]") to override
 *     the navOffset logic. Useful when the grid must align to a specific
 *     horizontal rule like the hero's grid-line-top.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { entranceState } from "./Entrancestate";

// Fixed cell size in px — square on every screen size.
// Lower = smaller cells, more of them. Tune to taste.
const CELL_SIZE = 55;

export default function GlobalGrid({ animated = false, navOffset = false, topClass }) {
  const gridRef = useRef();
  const lineColor = "rgba(255, 255, 255, 0.035)";

  const resolvedTop = topClass || (navOffset ? "top-11" : "top-0");

  useGSAP(() => {
    const el = gridRef.current;
    if (!el) return;

    if (animated) {
      gsap.set(el, {
        opacity: 0,
        clipPath: "inset(50% 50% 50% 50%)",
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(el, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.inOut",
      });

      entranceState.playGlobalGrid = () => tl.play();
    }
  });

  return (
    <div
      ref={gridRef}
      className={`global-grid pointer-events-none absolute ${resolvedTop} bottom-0 inset-x-0 mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem] z-[15]`}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        backgroundPosition: "center top",
        willChange: "transform",
      }}
    />
  );
}