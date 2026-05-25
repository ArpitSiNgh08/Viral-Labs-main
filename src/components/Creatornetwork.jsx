/**
 * CreatorNetwork — Section with globe tracking + frosted glass tooltip.
 *
 * ANIMATIONS:
 *   All scroll-triggered (not pinned). Fires when section enters viewport.
 *   Master timeline with staggered children:
 *     1. Label slides in from right
 *     2. Heading lines reveal with SplitText (line-by-line clip)
 *     3. Glow line draws on from right
 *     4. Description paragraphs fade up staggered
 *     5. Stat cards pop in with scale + opacity, corner SVGs draw in
 *     6. Tag cubes scale up with glow, text slides in
 */

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import { creatorGlobeState } from "./Creatorglobestate";
import fontReady from "./fontReady";

// ════════════════════════════════════════════════
// TOOLTIP CARD (frosted glass)
// ════════════════════════════════════════════════

function CreatorTooltip({ data, tooltipRef }) {
  if (!data) return null;

  return (
    <div
      ref={tooltipRef}
      className="absolute z-50 pointer-events-none transition-opacity duration-150 ease-out"
      style={{ left: 0, top: 0, opacity: 0 }}
    >
      <div className="relative w-[260px] p-4"
        style={{
          background: "rgba(10, 10, 14, 0.65)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Orange corner accents */}
        <span className="absolute top-0 left-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute top-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute top-0 right-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute top-0 right-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 left-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute bottom-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 right-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute bottom-0 right-0 w-px h-3.5 bg-[#FF6F21]" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={data.avatar} alt="" className="w-9 h-9 rounded-full border border-white/15 object-cover" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-[13px] font-semibold truncate">{data.handle}</span>
              {data.platform === "x" && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-300 shrink-0">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )}
              {data.platform === "instagram" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-pink-500 shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              )}
              {data.platform === "tiktok" && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              )}
            </div>
            <span className="text-white/30 text-[9px] uppercase tracking-[0.12em] mt-0.5">{data.nodeId}</span>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="flex gap-4 mb-3.5 pb-3.5 border-b border-white/[0.07]">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-white/45 text-[10px] font-medium">Monthly</span>
            </div>
            <span className="text-white text-xl font-bold leading-none">{data.monthlyInstalls}</span>
            <span className="text-[10px] font-medium mt-1">
              <span className="text-[#4ade80]">{data.growth}</span>
              <span className="text-white/30 ml-1">v. last mo</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C21]" />
              <span className="text-white/45 text-[10px] font-medium">Total Reach</span>
            </div>
            <span className="text-white text-xl font-bold leading-none">{data.totalInstalls}</span>
            <span className="text-[10px] font-medium mt-1">
              <span className="text-[#FF8C21]">+{data.viralCoeff}x</span>
              <span className="text-white/30 ml-1">viral coeff</span>
            </span>
          </div>
        </div>

        {/* Sources */}
        <div className="flex flex-col gap-[7px]">
          {data.sources.map((source, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-white/50 text-[12px]">{source.name}</span>
              <span className="text-white font-semibold text-[12px] tabular-nums">{source.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// MAIN SECTION
// ════════════════════════════════════════════════

export default function CreatorNetwork({ viewRef }) {
  const sectionRef = useRef();
  const tooltipRef = useRef();
  const lastDataRef = useRef(null);

  // ── Tooltip content needs React state for re-renders ──
  const [tooltipData, setTooltipData] = useState(null);

  // ── Refs for animated elements ──
  const labelRef = useRef();
  const headingRef = useRef();
  const glowLineRef = useRef();
  const desc1Ref = useRef();
  const desc2Ref = useRef();
  const statsGridRef = useRef();
  const tagsRef = useRef();

  // ── RAF poll for tooltip ──
  useGSAP(() => {
    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const currentData = creatorGlobeState.hoveredData;

      if (currentData !== lastDataRef.current) {
        lastDataRef.current = currentData;
        if (currentData) {
          const { position, ...safeData } = currentData;
          setTooltipData(safeData);
        } else {
          setTooltipData(null);
        }
      }

      if (!tooltipRef.current) return;
      if (currentData) {
        const x = creatorGlobeState.tooltipX + 25;
        const y = creatorGlobeState.tooltipY - 100;
        tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
        tooltipRef.current.style.opacity = "1";
      } else {
        tooltipRef.current.style.opacity = "0";
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, { scope: sectionRef });

  // ════════════════════════════════════════════════
  // GSAP SCROLL-TRIGGERED ANIMATIONS
  // ════════════════════════════════════════════════

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    fontReady.then(() => {
      if (cancelled) return;

    // ── Grab DOM elements ──
    const label = labelRef.current;
    const heading = headingRef.current;
    const glowLine = glowLineRef.current;
    const desc1 = desc1Ref.current;
    const desc2 = desc2Ref.current;
    const statCards = gsap.utils.toArray(".cn-stat", section);
    const cornerSvgs = gsap.utils.toArray(".cn-corner-path", section);
    const separatorLines = gsap.utils.toArray(".cn-separator", section);
    const statLabels = gsap.utils.toArray(".cn-stat-label", section);
    const statValues = gsap.utils.toArray(".cn-stat-value", section);
    const tagItems = gsap.utils.toArray(".cn-tag", section);
    const tagCubes = gsap.utils.toArray(".cn-tag-cube", section);
    const tagTexts = gsap.utils.toArray(".cn-tag-text", section);

    // ── SplitText — heading split into lines + chars ──
    const headingSplit = new SplitText(heading, { type: "lines, chars", linesClass: "cn-heading-line" });
    // Wrap each line in an overflow-hidden mask div
    headingSplit.lines.forEach((line) => {
      const mask = document.createElement("div");
      mask.style.overflow = "hidden";
      mask.style.display = "block";
      line.parentNode.insertBefore(mask, line);
      mask.appendChild(line);
    });

    // ── SplitText — descriptions split into lines with mask wrappers ──
    const desc1Split = new SplitText(desc1, { type: "lines", linesClass: "cn-desc-line" });
    desc1Split.lines.forEach((line) => {
      const mask = document.createElement("div");
      mask.style.overflow = "hidden";
      mask.style.display = "block";
      line.parentNode.insertBefore(mask, line);
      mask.appendChild(line);
    });

    const desc2Split = new SplitText(desc2, { type: "lines", linesClass: "cn-desc-line" });
    desc2Split.lines.forEach((line) => {
      const mask = document.createElement("div");
      mask.style.overflow = "hidden";
      mask.style.display = "block";
      line.parentNode.insertBefore(mask, line);
      mask.appendChild(line);
    });

    // ── SET initial states ──

    // Label — hidden right + blurred
    gsap.set(label, { opacity: 0, xPercent: 30, filter: "blur(8px)" });

    // Heading chars — pushed below mask + blurred
    gsap.set(headingSplit.chars, { yPercent: 120, opacity: 0, filter: "blur(6px)" });

    // Glow line
    gsap.set(glowLine, { scaleX: 0, transformOrigin: "right center", opacity: 0 });

    // Description lines — pushed below mask + blurred
    gsap.set(desc1Split.lines, { yPercent: 110, filter: "blur(5px)" });
    gsap.set(desc2Split.lines, { yPercent: 110, filter: "blur(5px)" });

    // Stats
    gsap.set(statCards, { opacity: 0, scale: 0.88, y: 25 });
    gsap.set(cornerSvgs, { drawSVG: "0%" });
    gsap.set(separatorLines, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(statLabels, { opacity: 0, x: 15, filter: "blur(4px)" });
    gsap.set(statValues, { opacity: 0, y: 10, filter: "blur(4px)" });

    // Tags
    gsap.set(tagCubes, { scale: 0, opacity: 0 });
    gsap.set(tagTexts, { opacity: 0, x: 20, filter: "blur(4px)" });

    // ══════════════════════════════════════════════
    // TIMELINE 1 — SCRUB (header + description)
    // ══════════════════════════════════════════════
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 20%",
        scrub: 1.5,
      },
    });

    // ── 1. LABEL — slides in from right + deblurs ──
    scrubTl.to(label, {
      opacity: 1,
      xPercent: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "none",
    }, 0);

    // ── 2. HEADING — chars rise in per-character with blur ──
    scrubTl.to(headingSplit.chars, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.06,
      ease: "none",
    }, 0.3);

    // ── 3. GLOW LINE — scales in from right + fades in ──
    scrubTl.to(glowLine, {
      scaleX: 1,
      opacity: 1,
      duration: 1.2,
      ease: "none",
    }, 1.2);

    // ── 4. DESCRIPTION — masked line reveal + deblur ──
    scrubTl.to(desc1Split.lines, {
      yPercent: 0,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.25,
      ease: "none",
    }, 2.0);

    scrubTl.to(desc2Split.lines, {
      yPercent: 0,
      filter: "blur(0px)",
      duration: 1,
      stagger: 0.2,
      ease: "none",
    }, 2.4);

    // ══════════════════════════════════════════════
    // TIMELINE 2 — PLAY (stats + tags, no scrub)
    // ══════════════════════════════════════════════
    const statsGrid = statsGridRef.current;

    const playTl = gsap.timeline({
      scrollTrigger: {
        trigger: statsGrid,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ── STAT CARDS — pop in staggered ──
    playTl.to(statCards, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 0.4,
        from: "start",
      },
      ease: "back.out(1.4)",
    }, 0);

    // Corner brackets draw in
    playTl.to(cornerSvgs, {
      drawSVG: "100%",
      duration: 0.5,
      stagger: {
        amount: 0.4,
        from: "random",
      },
      ease: "power2.out",
    }, 0.3);

    // Separator lines scale in
    playTl.to(separatorLines, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    }, 0.3);

    // Stat labels slide in + deblur
    playTl.to(statLabels, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    }, 0.25);

    // Stat values reveal + deblur
    playTl.to(statValues, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    }, 0.35);

    // ── TAGS — cubes pop then text slides + deblurs ──
    playTl.to(tagCubes, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(2.5)",
    }, 0.7);

    playTl.to(tagTexts, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.85);

    }); // fontReady.then
    return () => { cancelled = true; };
  }, { scope: sectionRef });

  // ════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════

  return (
    <section ref={sectionRef} className="creator-network-section relative w-full min-h-screen overflow-hidden">
      {/* ── 3D View tracking container ── */}
      <div
        ref={viewRef}
        className="absolute top-0 bottom-0 left-[105px] right-[105px] z-10"
      />

      <GlobalGrid />

      {/* Section border lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Tooltip overlay ── */}
      <CreatorTooltip data={tooltipData} tooltipRef={tooltipRef} />

      {/* ── DOM content layer ── */}
      <div className="relative z-40 px-38 pt-24 pb-20 pointer-events-none">
        <div className="flex w-full min-h-[85vh]">

          {/* Left side — empty space for globe */}
          <div className="w-1/2 shrink-0" />

          {/* Right side — content */}
          <div className="w-1/2 flex flex-col items-end gap-6">

            {/* ══ HEADER ══ */}
            <div className="flex flex-col items-end gap-1">
              <p
                ref={labelRef}
                className="cn-label font-host font-thin text-sm text-[#FF6F21] text-right leading-tighter uppercase tracking-normal"
              >
                Creator Network
              </p>
              <h2
                ref={headingRef}
                className="cn-heading font-host font-medium text-5xl text-[#f1f1f1] tracking-tighter leading-none text-right"
              >
                Creator Operator
                <br />
                Network
              </h2>
              {/* Orange glow line */}
              <svg
                ref={glowLineRef}
                width="193" height="23" viewBox="0 0 193 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="mt-10"
              >
                <g filter="url(#cn-glow0)" style={{ mixBlendMode: "plus-lighter" }}>
                  <line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" />
                </g>
                <g filter="url(#cn-glow1)" style={{ mixBlendMode: "plus-lighter" }}>
                  <line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" />
                </g>
                <g filter="url(#cn-glow2)" style={{ mixBlendMode: "plus-lighter" }}>
                  <line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" />
                </g>
                <defs>
                  <filter id="cn-glow0" x="10" y="10" width="173" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="0.5" result="effect1" />
                  </filter>
                  <filter id="cn-glow1" x="5" y="5" width="183" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="3" result="effect1" />
                  </filter>
                  <filter id="cn-glow2" x="0" y="0" width="193" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="5.5" result="effect1" />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* ══ DESCRIPTION ══ */}
            <div className="flex flex-col items-end gap-4 max-w-sm -mt-4">
              <p ref={desc1Ref} className="cn-desc font-host font-thin text-md text-right leading-tight">
              We operate a coordinated network of 300+ creators, executing at a scale of 8,000+ monthly videos to meet specific category and audience objectives. Supported by proprietary amplification systems.
              </p>
              <p ref={desc2Ref} className="cn-desc font-host font-thin text-md text-right leading-relaxed">
              Our distribution model cumulatively reaches 1B+ views per month, ensuring consistent output and high-impact performance across all major platforms.
              </p>
            </div>

            {/* ══ STATS GRID ══ */}
            <div ref={statsGridRef} className="grid grid-cols-1 gap-y-4 w-full max-w-[260px] mt-4">
              {[
                { value: "1BN+", label: "Views per month through our engagement network" },
                { value: "8,000+", label: "Views per month uploaded" },
                { value: "300+", label: "Creators" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="cn-stat relative flex flex-col gap-0.5 px-4 py-5"
                >
                  {/* Corner brackets — cn-corner-path class for DrawSVG targeting */}
                  {/* Top-left */}
                  <svg className="absolute top-0 left-0" width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path className="cn-corner-path" d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
                  </svg>
                  {/* Top-right */}
                  <svg className="absolute top-0 right-0 scale-x-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path className="cn-corner-path" d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
                  </svg>
                  {/* Bottom-left */}
                  <svg className="absolute bottom-0 left-0 scale-y-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path className="cn-corner-path" d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
                  </svg>
                  {/* Bottom-right */}
                  <svg className="absolute bottom-0 right-0 scale-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path className="cn-corner-path" d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
                  </svg>

                  <span className="cn-stat-value font-host text-3xl tracking-tight ">
                    {stat.value}
                  </span>
                  {/* Separator line */}
                  <svg width="100%" height="1" viewBox="0 0 134 1" fill="none" preserveAspectRatio="none" className="cn-separator">
                    <line y1="0.5" x2="134" y2="0.5" stroke="#A1A1A1" />
                  </svg>
                  <span className="cn-stat-label font-host font-thin text-sm text-white/50 ">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ══ TAGS ══ */}
            <div ref={tagsRef} className="flex flex-wrap justify-end gap-x-6 gap-y-2 mt-22 max-w-md">
              {[
                "Performance Driven Creators",
                "Co-ordinated Deployment Waves",
                "Audience Aligned Distribution",
                "Speed + Scale + Control",
              ].map((tag, i) => (
                <div key={i} className="cn-tag flex items-center gap-3">
                  <span
                    className="cn-tag-cube w-2.5 h-2.5 bg-[#FF6F21]"
                    style={{ boxShadow: "0 0 10px 4px rgba(255, 111, 33, 0.45), 0 0 20px 8px rgba(255, 111, 33, 0.2)" }}
                  />
                  <span className="cn-tag-text font-host text-sm font-thin tracking-tight">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}