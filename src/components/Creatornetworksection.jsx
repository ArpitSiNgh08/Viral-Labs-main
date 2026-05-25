/**
 * CreatorNetworkSection
 *
 * Desktop (lg+): Pinned, scrub-driven timeline. Globe arrives via
 *   RocketLaunch handoff and settles via timeline tweens. External
 *   GlobeCanvas handles the 3D canvas.
 *
 * Mobile (<lg): Natural flow. Heading centered, inline globe, desc, stats.
 *   No pin, no scroll-scrubbed globe movement. Text reveals on enter.
 */

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import { creatorGlobeState } from "./Creatorglobestate";
import { NUDGE_3D, GLOBE_ENTRY_Y, GLOBE_ENTRY_X } from "./Globecanvas";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";
import useIsDesktop from "./useIsDesktop";
import GlobeCanvasMobile from "./GlobeCanvasMobile";

/* ══════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════ */

const SCROLL_LENGTH = "+=350%";
const SCRUB_SMOOTHING = 1.8;

const CN_START_Y = GLOBE_ENTRY_Y - NUDGE_3D;
const CN_START_X = GLOBE_ENTRY_X;
const CN_FINAL_Y = -0.35;
const CN_FINAL_X = 0;

const CN_STATS = [
  { value: "300M+", label: "Monthly views" },
  { value: "7,000+", label: "Videos shipped per month" },
  { value: "500+", label: "Creators in network" },
];

/* ══════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════ */

function splitAndMask(el, type = "lines") {
  const split = new SplitText(el, { type, linesClass: "split-mask-line" });
  const elements = type.includes("chars") ? split.chars : split.lines;
  split.lines.forEach((line) => {
    const mask = document.createElement("div");
    mask.style.overflow = "hidden";
    mask.style.clipPath = "inset(-1px -2px -2px -2px)";
    mask.style.display = "block";
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });
  return { split, elements };
}

function CornerBrackets() {
  return (
    <>
      <svg className="absolute top-0 left-0 w-3.5 h-3.5" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
      <svg className="absolute top-0 right-0 w-3.5 h-3.5 scale-x-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
      <svg className="absolute bottom-0 left-0 w-3.5 h-3.5 scale-y-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
      <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 scale-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
    </>
  );
}

function GlowLine({ svgRef, className }) {
  return (
    <svg ref={svgRef} width="193" height="23" viewBox="0 0 193 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g filter="url(#cn-glow0)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
      <g filter="url(#cn-glow1)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
      <g filter="url(#cn-glow2)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
      <defs>
        <filter id="cn-glow0" x="10" y="10" width="173" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.5" /></filter>
        <filter id="cn-glow1" x="5" y="5" width="183" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="cn-glow2" x="0" y="0" width="193" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="5.5" /></filter>
      </defs>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — branches by viewport
   ══════════════════════════════════════════════════════ */

export default function CreatorNetworkSection() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}

/* ══════════════════════════════════════════════════════
   DESKTOP — original pinned + scrub layout
   ══════════════════════════════════════════════════════ */

function DesktopLayout() {
  const sectionRef = useRef(null);
  const cnLabelRef = useRef(null);
  const cnHeadingRef = useRef(null);
  const cnGlowRef = useRef(null);
  const cnDesc1Ref = useRef(null);
  const cnStatsRef = useRef(null);

  useEffect(() => {
    creatorGlobeState.cnSectionEl = sectionRef.current;
    return () => { creatorGlobeState.cnSectionEl = null; };
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    fontReady.then(() => {
      if (cancelled) return;

      const cnLabelSplit = splitAndMask(cnLabelRef.current, "lines");
      const cnHeadingSplit = splitAndMask(cnHeadingRef.current, "lines, chars");
      const cnDesc1Split = splitAndMask(cnDesc1Ref.current, "lines");
      const cnStatsEl = cnStatsRef.current;

      gsap.set(cnLabelSplit.elements, { yPercent: 160, filter: "blur(6px)" });
      gsap.set(cnHeadingSplit.split.chars, { yPercent: 160, opacity: 0, filter: "blur(6px)" });
      gsap.set(cnGlowRef.current, { scaleX: 0, transformOrigin: "right center", opacity: 0 });
      gsap.set(cnDesc1Split.elements, { yPercent: 160, filter: "blur(5px)" });
      gsap.set(cnStatsEl, { opacity: 0, y: 30, filter: "blur(6px)" });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: SCROLL_LENGTH,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
          onUpdate: (self) => {
            const settleRatio = Math.min(1, self.progress / 0.25);
            creatorGlobeState.interactive = settleRatio > 0.8;
          },
          onLeaveBack: () => {
            creatorGlobeState.interactive = false;
          },
        },
      });

      master.to(creatorGlobeState, { globeXOffset: CN_FINAL_X, duration: 2, ease: "power2.out" }, 0);
      master.to(creatorGlobeState, { globeYOffset: CN_FINAL_Y, duration: 2, ease: "power2.out" }, 0);
      master.to(creatorGlobeState, { constellationOpacity: 1, duration: 2, ease: "power2.out" }, 0);
      master.to(cnLabelSplit.elements, { yPercent: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "none" }, 2);
      master.to(cnHeadingSplit.split.chars, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.04, ease: "none" }, 2.3);
      master.to(cnGlowRef.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: "none" }, 3);
      master.to(cnDesc1Split.elements, { yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "none" }, 3.2);
      master.to(cnStatsEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" }, 4.2);
      master.set({}, {}, 8);
    });
    return () => { cancelled = true; };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="creator-network-section relative z-25 w-full h-auto min-h-screen lg:h-[140vh]"
    >
      <GlobalTexture />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute z-40 inset-0 flex flex-col items-end justify-center px-3 pointer-events-none sm:px-6 sm:inset-auto sm:w-full sm:right-6 sm:top-[6%] md:right-8 md:top-[4%] lg:right-12 xl:right-20">
          <div className="flex flex-col gap-0 items-end w-full sm:max-w-[70vw] md:max-w-[380px] lg:max-w-[25rem] xl:max-w-[31rem] 2xl:max-w-[37.5rem] 3xl:max-w-[47rem] 4xl:max-w-[62.5rem] 5xl:max-w-[93.75rem]">
            <p ref={cnLabelRef} className="font-host font-thin text-xs sm:text-sm md:text-base lg:text-[0.66rem] xl:text-[0.82rem] 2xl:text-[0.99rem] 3xl:text-[1.24rem] 4xl:text-[1.65rem] 5xl:text-[2.5rem] text-[#FF6F21] text-right uppercase tracking-normal">
              Creator Network
            </p>
            <h2 ref={cnHeadingRef} className="font-host font-medium text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-[2.8rem] 2xl:text-[3.375rem] 3xl:text-[4.2rem] 4xl:text-[5.625rem] 5xl:text-[8.5rem] tracking-tighter leading-none text-right">
              Built to Operate at Scale<br />at Scale
            </h2>
          </div>

          <div className="flex flex-col items-end gap-3 sm:w-full 4xl:gap-5 5xl:gap-8 mt-8 md:mt-12 lg:mt-8 xl:mt-10 2xl:mt-12 3xl:mt-16 4xl:mt-20 5xl:mt-30">
            <GlowLine svgRef={cnGlowRef} className="mt-0 w-32 sm:w-40 md:w-48 lg:w-39 xl:w-48 2xl:w-60 3xl:w-72 4xl:w-96 5xl:w-[37rem] h-auto -mr-2" />

            <p ref={cnDesc1Ref} className="hidden lg:block font-host font-thin w-full text-sm sm:text-base md:text-lg lg:max-w-[20rem] lg:text-xs xl:max-w-[25rem] xl:text-sm 2xl:max-w-[30rem] 2xl:text-lg 2xl:mb-[2rem] 3xl:max-w-[37.5rem] 3xl:text-xl 4xl:max-w-[50rem] 4xl:text-3xl 5xl:max-w-[75rem] 5xl:text-[2.8rem] 5xl:mb-[3.5rem] text-right leading-tight 5xl:leading-snug -mt-1">
              500+ creators in our network. 7,000+ videos shipped every month. 300M+ monthly views across the portfolio. We don't run a creator agency. We run an operating system for distribution.
            </p>

            <div ref={cnStatsRef} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-3 md:gap-y-3 lg:gap-[1.5rem] 2xl:gap-[2rem] 3xl:gap-[2.5rem] 4xl:gap-[3rem] 5xl:gap-[4rem] w-full max-w-[180px] sm:max-w-[200px] md:max-w-[260px] lg:max-w-[10rem] xl:max-w-[12.5rem] 2xl:max-w-[15rem] 3xl:max-w-[19rem] 4xl:max-w-[25rem] 5xl:max-w-[37.5rem] mt-2 4xl:mt-4 5xl:mt-6 self-end">
              {CN_STATS.map((stat, i) => (
                <div key={i} className="relative flex flex-col gap-0.5 4xl:gap-1 5xl:gap-2 px-3 py-2 sm:px-4 sm:py-3 4xl:px-8 4xl:py-5 5xl:px-12 5xl:py-8">
                  <svg className="absolute top-0 left-0 w-3.5 h-3.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-5 4xl:h-5 5xl:w-7 5xl:h-7" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute top-0 right-0 w-3.5 h-3.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-5 4xl:h-5 5xl:w-7 5xl:h-7 scale-x-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute bottom-0 left-0 w-3.5 h-3.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-5 4xl:h-5 5xl:w-7 5xl:h-7 scale-y-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 3xl:w-3.5 3xl:h-3.5 4xl:w-5 4xl:h-5 5xl:w-7 5xl:h-7 scale-[-1]" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <span className="font-host text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-7xl tracking-tight">{stat.value}</span>
                  <svg width="100%" height="1" viewBox="0 0 134 1" fill="none" preserveAspectRatio="none"><line y1="0.5" x2="134" y2="0.5" stroke="#A1A1A1" /></svg>
                  <span className="font-host font-thin text-[10px] sm:text-xs md:text-sm lg:text-[0.68rem] xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-[1.7rem] 5xl:text-[2.6rem] text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MOBILE — natural flow, inline globe, simple reveals
   ══════════════════════════════════════════════════════ */

function MobileLayout() {
  const sectionRef = useRef(null);
  const cnLabelRef = useRef(null);
  const cnHeadingRef = useRef(null);
  const cnGlowRef = useRef(null);
  const cnDescRef = useRef(null);
  const cnStatsRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    fontReady.then(() => {
      if (cancelled) return;

      gsap.set([cnLabelRef.current, cnHeadingRef.current, cnDescRef.current, cnStatsRef.current], {
        opacity: 0,
        y: 24,
        filter: "blur(4px)",
      });
      gsap.set(cnGlowRef.current, { scaleX: 0, transformOrigin: "center center", opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      })
        .to(cnLabelRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" })
        .to(cnHeadingRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.4")
        .to(cnGlowRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(cnDescRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.3")
        .to(cnStatsRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.4");
    });
    return () => { cancelled = true; };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="creator-network-section relative z-25 w-full max-lg:pt-[max(32vh,280px)] mob:max-lg:pt-[max(28vh,250px)] sm:max-lg:pt-[max(35vh,300px)] md:max-lg:pt-[max(45vh,400px)] py-16 pb-8 mob:pb-16 sm:py-20 md:py-24 md:pb-2 px-4 sm:px-6 md:px-8"
    >
      <GlobalTexture />

      <div className="relative z-40 flex flex-col items-center gap-4 mob:gap-6 sm:gap-8 md:gap-10 max-w-[640px] mx-auto">
        {/* Heading block — centered */}
        <div className="flex flex-col items-center gap-1">
          <p ref={cnLabelRef} className="font-host font-thin text-xs sm:text-sm md:text-base text-[#FF6F21] text-center uppercase tracking-normal">
            Creator Network
          </p>
          <h2 ref={cnHeadingRef} className="font-host font-medium text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-none text-center">
            Built to Operate <br />at Scale
          </h2>
        </div>

        {/* Inline globe */}
        <GlobeCanvasMobile />

        {/* Glow line */}
        <GlowLine svgRef={cnGlowRef} className="w-32 sm:w-40 md:w-48 h-auto mt-1 mob:mt-6 sm:mt-0" />

        {/* Description */}
        <p ref={cnDescRef} className="hidden lg:block font-host font-thin text-sm sm:text-base md:text-lg text-center leading-tight max-w-[520px]">
          500+ creators in our network. 7,000+ videos shipped every month. 300M+ monthly views across the portfolio. We don't run a creator agency. We run an operating system for distribution.
        </p>

        {/* Stats */}
        <div ref={cnStatsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[200px] sm:max-w-[460px] md:max-w-[520px]">
          {CN_STATS.map((stat, i) => (
            <div key={i} className="relative flex flex-col gap-0.5 px-3 py-2 sm:px-4 sm:py-3">
              <CornerBrackets />
              <span className="font-host text-lg sm:text-xl md:text-2xl tracking-tight">{stat.value}</span>
              <svg width="100%" height="1" viewBox="0 0 134 1" fill="none" preserveAspectRatio="none"><line y1="0.5" x2="134" y2="0.5" stroke="#A1A1A1" /></svg>
              <span className="font-host font-thin text-[10px] sm:text-xs md:text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}