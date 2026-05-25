/**
 * RocketLaunchSection — Rocket + Viral Engine only.
 *
 * Pin releases after label animations + reading hold.
 * Rocket stays centered + vertical (no tilt).
 * Labels: top 2 right, bottom 2 left.
 * Globe stays centered — no X shift during rocket phase.
 */

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import { CubesSvg, GlowLineSvg, RocketThrustersSvg } from "./Svgassets";
import { creatorGlobeState } from "./Creatorglobestate";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

/* ══════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════ */

const FRAME_HEIGHTS = {
  f2: 148, f3: 144, f4: 166, f5: 63, f6: 235, f7: 305, thrusters: 42,
};
const FRAME_WIDTH = 450;
const TOTAL_HEIGHT = Object.values(FRAME_HEIGHTS).reduce((a, b) => a + b, 0);

const ROCKET_START_TOP = "50%";
const ROCKET_RISE_TOP = "40%";
const ROCKET_FINAL_TOP = "40%";
const ROCKET_START_SCALE = 0.75;
const ROCKET_FULL_SCALE = 0.8;

const GLOBE_3D_START_Y = 1.45;
const GLOBE_3D_MID_Y = 1.2;
const GLOBE_3D_START_X = 1.18;  // adjusted for full-width canvas (was 1.05)

const SCROLL_LENGTH = "+=500%";
const SCRUB_SMOOTHING = 1.8;

const FLAME_ORIGINS = [
  { selector: ".thruster-center .thruster-flame", origin: "91 6.3" },
  { selector: ".thruster-left-inner .thruster-flame", origin: "49.5 12.7" },
  { selector: ".thruster-left-outer .thruster-flame", origin: "29 8.1" },
  { selector: ".thruster-right-outer .thruster-flame", origin: "153 6.3" },
  { selector: ".thruster-right-inner .thruster-flame", origin: "129.5 11.8" },
];

const FLAME_IDLE_OPACITY = [0.4, 0.7];
const FLAME_IDLE_SCALE = [0.8, 1.4];
const FLAME_IGNITE_SCALE = 1.8;
const BASE_IDLE_OPACITY = [0.5, 0.8];

const rand = (min, max) => min + Math.random() * (max - min);

const PIPELINE_STAGES = [
  { title: "RESEARCH", description: "We map your ICP, study your category, and reverse-engineer every viral video your competitors have shipped." },
  { title: "PROCESSING LAYER", description: "We design the hooks, recruit the creators, and build hundreds of variations to test." },
  { title: "DISTRIBUTION", description: "10-50 dedicated accounts per brand. TikTok, Instagram, YouTube. 300-3000 videos a month." },
  { title: "AMPLIFICATION", description: "When a video breaks out, we run it as a paid ad. Your spend only goes behind creative that already worked." },
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
    mask.style.clipPath = "inset(0 -2px -2px -2px)";
    mask.style.display = "block";
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });
  return { split, elements };
}

/* Connector pointing LEFT → RIGHT (default direction) */
const ConnectorLine = ({ className = "" }) => (
  <svg
    width="435" height="35" viewBox="0 0 435 35" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path d="M434 33.7852L409 0.5H0.5" stroke="#F1F1F1" strokeLinecap="square" />
  </svg>
);

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */

export default function RocketLaunchSection() {
  const sectionRef = useRef(null);

  const rocketGroupRef = useRef(null);
  const rocketTextureRef = useRef(null);
  const f2Ref = useRef(null);
  const f3Ref = useRef(null);
  const f4Ref = useRef(null);
  const f5Ref = useRef(null);
  const f6Ref = useRef(null);
  const f7Ref = useRef(null);
  const thrusterRef = useRef(null);
  const idleTweensRef = useRef([]);

  const veSubtitleRef = useRef(null);
  const veHeadingRef = useRef(null);



  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);
  const label4Ref = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    const idleTweens = idleTweensRef.current;
    fontReady.then(() => {
      if (cancelled) return;

    const vw = window.innerWidth;
    const isMobile = vw < 1024; // below lg — uses mobile layout

    const rocketGroup = rocketGroupRef.current;
    const thrusterSvg = thrusterRef.current;
    const frames = [f2Ref.current, f3Ref.current, f4Ref.current, f5Ref.current, f6Ref.current, f7Ref.current, thrusterSvg];
    const labels = [label1Ref.current, label2Ref.current, label3Ref.current, label4Ref.current];
    const veSubtitleSplit = splitAndMask(veSubtitleRef.current, "lines");
    const veHeadingSplit = splitAndMask(veHeadingRef.current, "lines, chars");


    /* ── INITIAL STATES ── */
    gsap.set(rocketGroup, {
      xPercent: -50, yPercent: -50, x: 0, y: 0,
      rotation: 0,
      scale: isMobile ? 0.85 : ROCKET_START_SCALE,
      left: "50%",
      top: isMobile ? "50%" : ROCKET_START_TOP,
    });
    frames.forEach((frame) => gsap.set(frame, { y: 0 }));
    gsap.set(veSubtitleSplit.elements, { yPercent: 160, filter: "blur(6px)" });
    gsap.set(veHeadingSplit.split.chars, { yPercent: 160, opacity: 0, filter: "blur(6px)" });


    labels.forEach((label) => gsap.set(label, { opacity: 0, scale: 0.85, filter: "blur(6px)" }));

    creatorGlobeState.globeOpacity = 0;
    creatorGlobeState.globeYOffset = GLOBE_3D_START_Y;
    creatorGlobeState.globeXOffset = GLOBE_3D_START_X;
    creatorGlobeState.interactive = false;

    /* ── THRUSTER IDLE FLICKER ── */
    const flames = thrusterSvg ? thrusterSvg.querySelectorAll(".thruster-flame") : [];
    const bases = thrusterSvg ? thrusterSvg.querySelectorAll(".thruster-base") : [];
    const idleTweens = idleTweensRef.current;

    gsap.set(flames, { opacity: 0, scaleY: 0 });
    gsap.set(bases, { opacity: 0 });

    if (thrusterSvg) {
      FLAME_ORIGINS.forEach(({ selector, origin }) => {
        const el = thrusterSvg.querySelector(selector);
        if (el) gsap.set(el, { svgOrigin: origin });
      });
    }

    function flickerFlame(flame) {
      const tween = gsap.to(flame, {
        opacity: rand(FLAME_IDLE_OPACITY[0], FLAME_IDLE_OPACITY[1]),
        scaleY: rand(FLAME_IDLE_SCALE[0], FLAME_IDLE_SCALE[1]),
        duration: rand(0.12, 0.35),
        ease: "sine.inOut",
        onComplete: () => flickerFlame(flame),
      });
      idleTweens.push(tween);
    }

    let flickerStarted = false;
    function startIdleFlicker() {
      if (flickerStarted) return;
      flickerStarted = true;
      bases.forEach((base) => {
        gsap.to(base, {
          opacity: rand(BASE_IDLE_OPACITY[0], BASE_IDLE_OPACITY[1]),
          duration: 0.3, ease: "power2.out",
          onComplete: () => {
            gsap.to(base, {
              opacity: rand(BASE_IDLE_OPACITY[0], BASE_IDLE_OPACITY[1]),
              duration: rand(0.2, 0.5), repeat: -1, yoyo: true, ease: "sine.inOut",
            });
          },
        });
      });
      flames.forEach((flame, i) => {
        gsap.to(flame, {
          opacity: FLAME_IDLE_OPACITY[0], scaleY: FLAME_IDLE_SCALE[0],
          duration: 0.35, delay: i * 0.05, ease: "power2.out",
          onComplete: () => flickerFlame(flame),
        });
      });
    }

    /* ── MASTER TIMELINE ── */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: SCROLL_LENGTH,
        pin: true,
        scrub: SCRUB_SMOOTHING,
        anticipatePin: 1,
      },
    });

    /* ═══ PHASE 0 — ENTRY ═══ */
    master.to(rocketTextureRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
    }, 0);
    master.to(rocketGroup, { scale: isMobile ? 0.87 : ROCKET_START_SCALE + 0.03, duration: 1, ease: "none" }, 0);

    /* ═══ PHASE 1A — ROCKET RISES ═══ */
    master.call(startIdleFlicker, [], 0.8);
    master.to(rocketGroup, {
      top: isMobile ? "46%" : ROCKET_RISE_TOP,
      scale: isMobile ? 0.88 : ROCKET_START_SCALE + (ROCKET_FULL_SCALE - ROCKET_START_SCALE) * 0.4,
      duration: 1.5, ease: "none",
    }, 1);
    master.to(flames, {
      opacity: 1, scaleY: FLAME_IGNITE_SCALE, duration: 1,
      stagger: { each: 0.06, from: "random" }, ease: "none", overwrite: true,
    }, 1);
    master.to(bases, { opacity: 1, duration: 0.8, ease: "none", overwrite: true }, 1.1);

    // Globe fades in
    master.to(creatorGlobeState, { globeOpacity: 1, duration: 1, ease: "none" }, 1.5);
    master.to(creatorGlobeState, { globeYOffset: GLOBE_3D_MID_Y, duration: 1.5, ease: "none" }, 1.5);

    /* ═══ PHASE 1B — SCALE UP (stays centered, no tilt) ═══ */
    master.to(rocketGroup, {
      top: isMobile ? "44%" : ROCKET_FINAL_TOP,
      scale: isMobile ? 0.9 : ROCKET_FULL_SCALE,
      duration: 1.5, ease: "none",
    }, 2.5);

    /* ═══ PHASE 2 — VE TEXT IN ═══ */
    master.to(veSubtitleSplit.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 4);
    master.to(veHeadingSplit.split.chars, {
      yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.05, ease: "none",
    }, 4.3);


    /* ═══ PHASE 3 — LABELS + SEPARATION ═══ */
    const GAP = isMobile ? 40 : 28;

    /* Label 1 — Signal Input (RIGHT) */
    master.to(labels[0], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 6.5);
    [f3Ref, f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1.2, ease: "none" }, 6.7);
    });

    /* Label 2 — Processing Layer (RIGHT) */
    master.to(labels[1], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 8);
    [f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.2);
    });
    [f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.7);
    });

    /* Label 3 — Distribution Layer (LEFT) */
    master.to(labels[2], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 9.5);
    [f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1, ease: "none" }, 9.7);
    });

    /* Label 4 — Amplification Layer (LEFT) */
    master.to(labels[3], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 10.7);
    [f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 10.9);
    });

    /* ═══ PHASE 4 — READING HOLD → PIN RELEASES ═══ */
    master.set({}, {}, 13);



    }); // fontReady.then
    return () => {
      cancelled = true;
      idleTweens.forEach((t) => t.kill());
      idleTweens.length = 0;
    };

  }, { scope: sectionRef });

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <>
    <section ref={sectionRef} className="rocket-launch-section relative z-25 w-full h-screen">
      {/* <GlobalGrid /> */}

      <div ref={rocketTextureRef} className="opacity-0">
        <GlobalTexture />
      </div>

      {/* ── Container (matches site-wide pattern) ── */}
      <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem] h-full">

        

        <div className="absolute inset-0 overflow-x-clip">

          {/* ROCKET ASSEMBLY — stays centered */}
          <div
            ref={rocketGroupRef}
            className="absolute z-40 flex flex-col items-center max-w-none"
            style={{
              width: `calc(82vh * ${FRAME_WIDTH} / ${TOTAL_HEIGHT})`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img ref={f2Ref} src="/images/rocket/rocket-frame-2.webp" alt="" className="w-full h-auto block" width={1604} height={525} draggable={false} loading="lazy" />
            <img ref={f3Ref} src="/images/rocket/rocket-frame-3.webp" alt="" className="w-full h-auto block" width={1604} height={511} style={{ marginTop: "-4px" }} draggable={false} loading="lazy" />
            <img ref={f4Ref} src="/images/rocket/rocket-frame-4.webp" alt="" className="w-full h-auto block" width={1604} height={590} style={{ marginTop: "-4px" }} draggable={false} loading="lazy" />
            <img ref={f5Ref} src="/images/rocket/rocket-frame-5.webp" alt="" className="w-full h-auto block" width={1604} height={221} style={{ marginTop: "-4px" }} draggable={false} loading="lazy" />
            <img ref={f6Ref} src="/images/rocket/rocket-frame-6.webp" alt="" className="w-full h-auto block" width={1604} height={835} style={{ marginTop: "-4px" }} draggable={false} loading="lazy" />
            <img ref={f7Ref} src="/images/rocket/rocket-frame-7.webp" alt="" className="w-full h-auto block" width={1604} height={1085} style={{ marginTop: "-4px" }} draggable={false} loading="lazy" />
            <RocketThrustersSvg
              ref={thrusterRef}
              className="block h-auto pointer-events-none w-[36%] -mt-2.5 relative z-[1]"
            />
          </div>

          {/* VE LEFT-SIDE TEXT — title + subtitle only */}
          <div className="absolute z-40 pointer-events-none flex flex-col left-3 top-[2%] max-w-[50vw] max-mob:max-w-[45vw] sm:left-6 sm:max-w-56 md:max-w-64 lg:left-16 lg:max-w-72 xl:left-24 xl:max-w-80 2xl:left-32 2xl:max-w-[24rem] 3xl:left-40 3xl:max-w-[28.75rem] 4xl:left-48 4xl:max-w-[36rem] 5xl:left-56 5xl:max-w-[44rem]">
            <div className="flex flex-col gap-0">
              <p ref={veSubtitleRef} className="font-host text-[0.625rem] sm:text-xs lg:text-xs xl:text-sm 3xl:text-sm 4xl:text-base 5xl:text-3xl text-vl-orange uppercase tracking-wide">
                
              </p>
              <h2 ref={veHeadingRef} className="font-host text-xl max-mob:text-lg sm:text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl tracking-tight leading-[1.06]">
                Inside The<br /> Engine
              </h2>
            </div>
          </div>


          {/* ── STAGE LABELS ── */}

          {/* LABEL 1 — Signal Input (RIGHT side, all sizes) */}
          <div ref={label1Ref} className="absolute z-40 pointer-events-none right-0 max-mob:right-0 top-[8%] lg:top-[12%] w-40 max-mob:w-35 sm:right-[2%] sm:w-48 md:right-[4%] md:w-56 lg:right-[20%] lg:w-56 xl:right-[18%] xl:w-80 2xl:right-[20%] 2xl:w-82 3xl:right-[21%] 3xl:w-[26.25rem] 4xl:right-[16%] 4xl:w-[32rem] 5xl:right-[4%] 5xl:w-[40rem]">
            <ConnectorLine className="block w-full h-auto max-h-3 sm:max-h-4 lg:max-h-none -mb-2 lg:-mb-4 scale-x-[-1]" />
            <div className="flex items-start gap-1 lg:gap-1.5 w-fit ml-auto max-mob:mt-1.5 max-sm:mt-2 lg:mt-2">
              <CubesSvg className="w-3 sm:w-4 lg:w-4 xl:w-5 4xl:w-6 5xl:w-9 h-auto mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bricolage text-sm max-mob:text-[0.75rem] max-sm:text-[0.9rem] font-semibold sm:text-sm sm:font-normal lg:text-[0.81rem] lg:font-normal xl:text-lg xl:font-normal 3xl:text-lg 4xl:text-xl 5xl:text-3xl text-white tracking-tighter leading-tight">{PIPELINE_STAGES[0].title}</h4>
                <p className="font-host text-[0.55rem] sm:text-xs lg:text-[0.56rem] lg:leading-snug xl:text-sm 3xl:text-sm 4xl:text-base 5xl:text-xl text-[#a1a1a1] tracking-tighter leading-tight mt-0 lg:mt-0.5 max-w-28 max-mob:max-w-25 max-sm:max-w-23 sm:max-w-40 lg:max-w-35 xl:max-w-55 2xl:max-w-64 3xl:max-w-[17.5rem] 4xl:max-w-80 5xl:max-w-[25rem]">{PIPELINE_STAGES[0].description}</p>
              </div>
            </div>
          </div>

          {/* LABEL 2 — Processing Layer (LEFT on mobile, LEFT on lg+) */}
          <div ref={label2Ref} className="absolute z-40 pointer-events-none left-0 max-mob:left-0 top-[33%] lg:top-[25%] w-40 max-mob:w-35 sm:left-[2%] sm:w-48 md:left-[4%] md:w-56 lg:left-[20%] lg:w-56 xl:left-[18%] xl:w-80 2xl:left-[20%] 2xl:w-82 3xl:left-[21%] 3xl:w-[26.25rem] 4xl:left-[16%] 4xl:w-[32rem] 5xl:left-[3%] 5xl:w-[40rem]">
            <ConnectorLine className="block w-full h-auto max-h-3 sm:max-h-4 lg:max-h-none -mb-2 lg:-mb-4 scale-x-100" />
            <div className="flex items-start gap-1 lg:gap-1.5 w-fit ml-2 max-mob:mt-1.5 max-sm:mt-2 lg:mt-2">
              <CubesSvg className="w-3 sm:w-4 lg:w-4 xl:w-5 4xl:w-6 5xl:w-9 h-auto mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bricolage text-sm max-mob:text-[0.75rem] max-sm:text-[0.9rem] font-semibold max-sm:max-w-23 sm:text-sm sm:font-normal lg:text-[0.81rem] lg:font-normal xl:text-lg xl:font-normal 3xl:text-lg 4xl:text-xl 5xl:text-3xl text-white tracking-tighter leading-tight">{PIPELINE_STAGES[1].title}</h4>
                <p className="font-host text-[0.55rem] sm:text-xs lg:text-[0.56rem] lg:leading-snug xl:text-sm 3xl:text-sm 4xl:text-base 5xl:text-xl text-[#a1a1a1] tracking-tighter leading-tight mt-1 lg:mt-0.5 max-w-28 max-mob:max-w-25 max-sm:max-w-23 sm:max-w-40 lg:max-w-35 xl:max-w-55 2xl:max-w-64 3xl:max-w-[17.5rem] 4xl:max-w-80 5xl:max-w-[25rem]">{PIPELINE_STAGES[1].description}</p>
              </div>
            </div>
          </div>

          {/* LABEL 3 — Distribution Layer (RIGHT on all screens) */}
          <div ref={label3Ref} className="absolute z-40 pointer-events-none right-0 max-mob:right-0 top-[54%]  w-40 max-mob:w-35 sm:right-[2%] sm:w-48 md:right-[4%] md:w-56 lg:top-[47%] lg:right-[20%] lg:w-56 xl:right-[18%] xl:w-80 2xl:right-[20%] 2xl:w-82 3xl:right-[21%] 3xl:w-[26.25rem] 4xl:right-[13%] 4xl:w-[32rem] 5xl:right-0 5xl:w-[40rem]">
            <ConnectorLine className="block w-full h-auto max-h-3 sm:max-h-4 lg:max-h-none -mb-2 lg:-mb-4 scale-x-[-1]" />
            <div className="flex items-start gap-1 lg:gap-1.5 w-fit ml-auto max-mob:mt-1.5 max-sm:mt-2 lg:mt-2">
              <CubesSvg className="w-3 sm:w-4 lg:w-4 xl:w-5 4xl:w-6 5xl:w-9 h-auto mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bricolage text-sm max-mob:text-[0.75rem] max-sm:text-[0.9rem] font-semibold sm:text-sm sm:font-normal lg:text-[0.81rem] lg:font-normal xl:text-lg xl:font-normal 3xl:text-lg 4xl:text-xl 5xl:text-3xl text-white tracking-tighter leading-tight">{PIPELINE_STAGES[2].title}</h4>
                <p className="font-host text-[0.55rem] sm:text-xs lg:text-[0.56rem] lg:leading-snug xl:text-sm 3xl:text-sm 4xl:text-base 5xl:text-xl text-[#a1a1a1] tracking-tighter leading-tight mt-1 lg:mt-0.5 max-w-28 max-mob:max-w-25 max-sm:max-w-23 sm:max-w-40 lg:max-w-35 xl:max-w-55 2xl:max-w-64 3xl:max-w-[17.5rem] 4xl:max-w-80 5xl:max-w-[25rem]">{PIPELINE_STAGES[2].description}</p>
              </div>
            </div>
          </div>

          {/* LABEL 4 — Amplification Layer (LEFT on mobile, LEFT on lg+) */}
          <div ref={label4Ref} className="absolute z-40 pointer-events-none left-0 max-mob:left-0 top-[75%] max-mob:top-[75%] max-sm:top-[73%] lg:top-[65%] w-40 max-mob:w-35 sm:left-[2%] sm:w-48 md:left-[4%] md:w-56 lg:left-[20%] lg:w-56 xl:top-[70%] xl:left-[15%] xl:w-80 2xl:top-[65%] 2xl:left-[20%] 2xl:w-82 3xl:top-[60%] 3xl:left-[21%] 3xl:w-[26.25rem] 4xl:left-[12%] 4xl:w-[32rem] 5xl:left-0 5xl:w-[40rem]">
            <ConnectorLine className="block w-full h-auto max-h-3 sm:max-h-4 lg:max-h-none -mb-2 lg:-mb-4 scale-x-100" />
            <div className="flex items-start gap-1 lg:gap-1.5 w-fit ml-2 max-mob:mt-1.5 max-sm:mt-2 lg:mt-2">
              <CubesSvg className="w-3 sm:w-4 lg:w-4 xl:w-5 4xl:w-6 5xl:w-9 h-auto mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bricolage text-sm max-mob:text-[0.75rem] max-sm:text-[0.9rem] font-semibold sm:text-sm sm:font-normal lg:text-[0.81rem] lg:font-normal xl:text-lg xl:font-normal 3xl:text-lg 4xl:text-xl 5xl:text-3xl text-white tracking-tighter leading-tight">{PIPELINE_STAGES[3].title}</h4>
                <p className="font-host text-[0.55rem] sm:text-xs lg:text-[0.56rem] lg:leading-snug xl:text-sm 3xl:text-sm 4xl:text-base 5xl:text-xl text-[#a1a1a1] tracking-tighter leading-tight mt-1 lg:mt-0.5 max-w-28 max-mob:max-w-25 max-sm:max-w-23 sm:max-w-40 lg:max-w-35 xl:max-w-55 2xl:max-w-64 3xl:max-w-[17.5rem] 4xl:max-w-80 5xl:max-w-[25rem]">{PIPELINE_STAGES[3].description}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

      
    </>
  );
}