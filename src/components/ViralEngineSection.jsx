import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlobalGrid from "./Globalgrid";
import {
  CubesSvg,
  RocketFrame2Svg,
  RocketFrame3Svg,
  RocketFrame4Svg,
  RocketFrame5Svg,
  RocketFrame6Svg,
  RocketFrame7Svg,
  RocketThrustersSvg,
  LinesVectorRocketSvg,
  GlowLineSvg,
  Line744Svg,
  CornerVectorRocketSvg,
} from "./Svgassets";

/* ── Corner markers — identical to MissionStats ── */
const CornerLeft = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

const CornerRight = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

const pipelineStages = [
  {
    title: "SIGNAL INPUT",
    description: "Trend Data → Platform Trend Momentum",
  },
  {
    title: "PROCESSING LAYER",
    description: "Creative Testing + Iteration",
  },
  {
    title: "DISTRIBUTION GRID",
    description: "Creator Deployment + Reach Expansion",
  },
  {
    title: "OUTPUT VIRALITY",
    description: "Views → Viral Engagement → Installs",
  },
];

const statsData = [
  { label: "Signals Tracked", value: "25,000+" },
  { label: "Tests Per Cycle", value: "500+" },
  { label: "Creator Nodes", value: "3,200+" },
  { label: "AVG Install Lift", value: "42%" },
];

function StageLabel({ title, description }) {
  return (
    <div className="relative ml-[45%] ve-stage-label">
      <CubesSvg className="absolute -left-9 top-0.5 w-7 pointer-events-none ve-stage-cube" />
      <h4 className="font-bricolage text-2xl text-white tracking-tighter leading-normal ve-stage-title">
        {title}
      </h4>
      <p className="font-host text-lg text-[#a1a1a1] tracking-tighter leading-tight mt-2 ve-stage-desc">
        {description}
      </p>
    </div>
  );
}

/* ── Thruster flame origins (SVG coords where each flame starts) ── */
const FLAME_ORIGINS = [
  { selector: ".thruster-center .thruster-flame", origin: "91 6.3" },
  { selector: ".thruster-left-inner .thruster-flame", origin: "49.5 12.7" },
  { selector: ".thruster-left-outer .thruster-flame", origin: "29 8.1" },
  { selector: ".thruster-right-outer .thruster-flame", origin: "153 6.3" },
  { selector: ".thruster-right-inner .thruster-flame", origin: "129.5 11.8" },
];

/* ── Random helper ── */
const rand = (min, max) => min + Math.random() * (max - min);

/*
  Spread offsets — rows fan out from center on hover.
  Stagger delay per row gives an organic cascade feel
  instead of all 4 snapping simultaneously.
*/
const SPREAD = {
  offsets: [-28, -10, 10, 28],
  enter: {
    duration: 0.85,
    ease: "expo.out",         // very smooth deceleration — premium feel
    stagger: 0.04,            // subtle cascade: top row first, bottom last
  },
  leave: {
    duration: 0.7,
    ease: "power3.inOut",     // smooth both ways — no abrupt start or end
    stagger: 0.03,
  },
};

export default function ViralEngineSection() {
  const sectionRef = useRef(null);
  const thrusterRef = useRef(null);
  const rocketColumnRef = useRef(null);
  const hoverTlRef = useRef(null);
  const spreadTlRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ═══════════════════════════════════════════════
         1. LEFT COLUMN
         ═══════════════════════════════════════════════ */

      const headerSubtitle = section.querySelector(".ve-header-subtitle");
      const headerLines = section.querySelectorAll(".ve-header-title-line");

      gsap.set(headerSubtitle, { opacity: 0, y: 20 });
      gsap.set(headerLines, { opacity: 0, y: 30 });

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      headerTl.to(headerSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      headerTl.to(
        headerLines,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );

      const glowLine = section.querySelector(".ve-glow-line");
      gsap.set(glowLine, { clipPath: "inset(0 100% 0 0)" });

      headerTl.to(
        glowLine,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      const bodyTexts = section.querySelectorAll(".ve-body-text");
      gsap.set(bodyTexts, { opacity: 0, x: -30 });

      headerTl.to(
        bodyTexts,
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

      const statsBox = section.querySelector(".ve-stats-box");
      const statItems = section.querySelectorAll(".ve-stat-item");
      const cornerBrackets = section.querySelectorAll(".ve-corner");

      gsap.set(cornerBrackets, { opacity: 0 });
      gsap.set(statItems, { opacity: 0, y: 25 });

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsBox,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      statsTl.to(cornerBrackets, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });

      statsTl.to(
        statItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.3"
      );

      /* ═══════════════════════════════════════════════
         2. RIGHT COLUMN — Rocket rows scroll entrance
         ═══════════════════════════════════════════════ */

      const rows = section.querySelectorAll(".ve-rocket-row");

      rows.forEach((row) => {
        const frames = row.querySelectorAll(".ve-rocket-frame");
        const connectorLine = row.querySelector(".ve-connector-line");
        const stageCube = row.querySelector(".ve-stage-cube");
        const stageTitle = row.querySelector(".ve-stage-title");
        const stageDesc = row.querySelector(".ve-stage-desc");

        gsap.set(frames, { opacity: 0, y: 40, scale: 0.92 });
        if (connectorLine) gsap.set(connectorLine, { clipPath: "inset(0 100% 0 0)" });
        if (stageCube) gsap.set(stageCube, { opacity: 0, scale: 0 });
        if (stageTitle) gsap.set(stageTitle, { opacity: 0, x: 30 });
        if (stageDesc) gsap.set(stageDesc, { opacity: 0, x: 20 });

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        rowTl.to(frames, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });

        if (connectorLine) {
          rowTl.to(
            connectorLine,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.6"
          );
        }

        if (stageCube) {
          rowTl.to(
            stageCube,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(3)",
            },
            "-=0.3"
          );
        }

        if (stageTitle) {
          rowTl.to(
            stageTitle,
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        if (stageDesc) {
          rowTl.to(
            stageDesc,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      });

      /* ═══════════════════════════════════════════════
         3. SUBTLE PARALLAX
         ═══════════════════════════════════════════════ */

      const allFrames = section.querySelectorAll(".ve-rocket-frame");
      allFrames.forEach((frame, i) => {
        const speed = i % 2 === 0 ? -20 : -10;
        gsap.to(frame, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      /* ═══════════════════════════════════════════════
         4. THRUSTER IDLE FLICKER SETUP
         ═══════════════════════════════════════════════ */

      const thrusterSvg = thrusterRef.current;
      const rocketColumn = rocketColumnRef.current;
      if (!thrusterSvg || !rocketColumn) return;

      const flames = thrusterSvg.querySelectorAll(".thruster-flame");
      const bases = thrusterSvg.querySelectorAll(".thruster-base");

      gsap.set(flames, { opacity: 0.3, scaleY: 0.5 });
      gsap.set(bases, { opacity: 0.4 });

      FLAME_ORIGINS.forEach(({ selector, origin }) => {
        const el = thrusterSvg.querySelector(selector);
        if (el) gsap.set(el, { svgOrigin: origin });
      });

      let isHovered = false;
      const idleTweens = [];

      function flickerFlame(flame) {
        if (isHovered) return;
        const tween = gsap.to(flame, {
          opacity: rand(0.15, 0.45),
          scaleY: rand(0.35, 0.7),
          duration: rand(0.12, 0.35),
          ease: "sine.inOut",
          onComplete: () => flickerFlame(flame),
        });
        idleTweens.push(tween);
      }

      flames.forEach((flame) => {
        gsap.delayedCall(rand(0, 0.3), () => flickerFlame(flame));
      });

      bases.forEach((base) => {
        gsap.to(base, {
          opacity: rand(0.25, 0.45),
          duration: rand(0.2, 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: rand(0, 0.4),
        });
      });

      /* ═══════════════════════════════════════════════
         5. UNIFIED HOVER — SPREAD + IGNITE
            Smooth expo/power3 easings, per-row stagger,
            and gradual thruster ramp for premium feel.
         ═══════════════════════════════════════════════ */

      const rocketRows = rocketColumn.querySelectorAll(".ve-rocket-row");

      const handleEnter = () => {
        isHovered = true;

        // ── A) Spread rows apart — staggered cascade ──
        if (spreadTlRef.current) spreadTlRef.current.kill();

        const spreadTl = gsap.timeline();
        rocketRows.forEach((row, i) => {
          spreadTl.to(
            row,
            {
              y: SPREAD.offsets[i],
              duration: SPREAD.enter.duration,
              ease: SPREAD.enter.ease,
            },
            i * SPREAD.enter.stagger   // subtle cascade
          );
        });
        spreadTlRef.current = spreadTl;

        // ── B) Ignite thrusters — ramp up, not instant snap ──
        if (hoverTlRef.current) hoverTlRef.current.kill();
        idleTweens.forEach((t) => t.kill());
        idleTweens.length = 0;

        const fireTl = gsap.timeline();

        // Ramp phase: flames grow smoothly into full burn
        fireTl.to(flames, {
          opacity: 1,
          scaleY: 1.4,
          duration: 0.45,
          stagger: { each: 0.04, from: "random" },
          ease: "expo.out",
          overwrite: true,
        });

        fireTl.to(
          bases,
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          },
          "<0.05"    // bases brighten just after flames start
        );

        // Sustain phase: chaotic flicker while hovered
        fireTl.to(flames, {
          keyframes: [
            { scaleY: 1.35, opacity: 0.9, duration: 0.08 },
            { scaleY: 1.1, opacity: 0.75, duration: 0.1 },
            { scaleY: 1.45, opacity: 1, duration: 0.07 },
            { scaleY: 1.2, opacity: 0.85, duration: 0.09 },
          ],
          stagger: { each: 0.03, from: "random" },
          ease: "none",
          repeat: -1,
        });

        hoverTlRef.current = fireTl;
      };

      const handleLeave = () => {
        isHovered = false;

        // ── A) Collapse rows — smooth symmetrical ease ──
        if (spreadTlRef.current) spreadTlRef.current.kill();

        const collapseTl = gsap.timeline();
        rocketRows.forEach((row, i) => {
          collapseTl.to(
            row,
            {
              y: 0,
              duration: SPREAD.leave.duration,
              ease: SPREAD.leave.ease,
            },
            i * SPREAD.leave.stagger
          );
        });
        spreadTlRef.current = collapseTl;

        // ── B) Wind down thrusters — gradual fade, not abrupt cut ──
        if (hoverTlRef.current) hoverTlRef.current.kill();

        gsap.to(flames, {
          opacity: 0.3,
          scaleY: 0.5,
          duration: 0.55,
          stagger: { each: 0.04, from: "random" },
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            flames.forEach((flame) => flickerFlame(flame));
          },
        });

        gsap.to(bases, {
          opacity: 0.4,
          duration: 0.5,
          ease: "power3.inOut",
          overwrite: true,
        });
      };

      rocketColumn.addEventListener("mouseenter", handleEnter);
      rocketColumn.addEventListener("mouseleave", handleLeave);

      return () => {
        rocketColumn.removeEventListener("mouseenter", handleEnter);
        rocketColumn.removeEventListener("mouseleave", handleLeave);
        idleTweens.forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-25 w-full overflow-hidden py-20 px-8 md:px-16 lg:px-24 xl:px-36"
    >
      <GlobalGrid />

      {/* ── Grid lines ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Corner markers ── */}
      <CornerLeft className="pointer-events-none absolute -top-0.5 left-[105px] z-40" />
      <CornerRight className="pointer-events-none absolute -top-0.5 right-[105px] z-40" />
      <CornerLeft className="pointer-events-none absolute -bottom-1 left-[105px] z-40" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute -bottom-1 right-[105px] z-40" style={{ transform: "scaleY(-1)" }} />

      {/* Main Content */}
      <div className="relative z-40 max-w-7xl mx-auto pt-35">

        {/* LEFT COLUMN */}
        <div className="absolute left-0 top-0 w-[24%] flex flex-col h-full z-10">

          <div className="flex flex-col gap-1">
            <p className="font-host text-base text-vl-orange uppercase tracking-wide ve-header-subtitle">
              STRUCTURED IN. VIRAL OUT.
            </p>
            <h2 className="font-host font-medium text-6xl text-[#f1f1f1] tracking-tighter leading-[1.04]">
              <span className="block ve-header-title-line">Inside The</span>
              <span className="block ve-header-title-line">Viral Engine</span>
            </h2>
          </div>

          <GlowLineSvg className="w-54 h-auto mt-35 -ml-3 ve-glow-line" />

          <div className="flex flex-col gap-6 mt-6">
            <p className="font-host text-base text-white tracking-tighter leading-normal ve-body-text">
              Behind every campaign is a structured growth system. The Viral
              Engine connects creator networks, content distribution pathways,
              and performance feedback loops into a single operating framework.
            </p>
            <p className="font-host text-base text-white tracking-tight leading-normal ve-body-text">
              It&apos;s designed to turn attention into installs. It&apos;s not a
              campaign. It&apos;s a machine.
            </p>
          </div>

          <div className="flex my-25" />

          <div className="relative inline-flex flex-col gap-4 p-5 max-w-50 items-center ve-stats-box">
            <CornerVectorRocketSvg
              className="absolute top-0 right-0 w-2.5 h-2.5 ve-corner"
              style={{ transform: "scaleY(-1)" }}
            />
            <CornerVectorRocketSvg
              className="absolute top-0 left-0 w-2.5 h-2.5 ve-corner"
              style={{ transform: "scale(-1, -1)" }}
            />
            <CornerVectorRocketSvg
              className="absolute bottom-0 left-0 w-2.5 h-2.5 ve-corner"
              style={{ transform: "scaleX(-1)" }}
            />
            <CornerVectorRocketSvg
              className="absolute bottom-0 right-0 w-2.5 h-2.5 ve-corner"
            />

            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 my-2 ve-stat-item">
                <span className="font-host text-sm text-[#a1a1a1] leading-2 tracking-tighter">
                  {stat.label}
                </span>
                <Line744Svg className="w-32 h-px" />
                <span className="font-host text-xl text-white leading-2">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER + RIGHT COLUMNS — hover triggers spread + ignite */}
        <div
          ref={rocketColumnRef}
          className="ml-[28%] grid grid-cols-9 gap-x-4 gap-y-6 cursor-pointer"
        >

          {/* ━━━ ROW 1 ━━━ */}
          <div className="col-span-9 grid grid-cols-9 gap-x-4 ve-rocket-row">
            <div className="col-span-5 flex flex-col gap-6">
              <RocketFrame2Svg className="w-full ve-rocket-frame" />
              <RocketFrame3Svg className="w-full ve-rocket-frame" />
            </div>
            <div className="col-span-4 flex flex-col justify-start">
              <LinesVectorRocketSvg className="w-full h-auto pointer-events-none ve-connector-line" />
              <StageLabel {...pipelineStages[0]} />
            </div>
          </div>

          {/* ━━━ ROW 2 ━━━ */}
          <div className="col-span-9 grid grid-cols-9 gap-x-4 ve-rocket-row">
            <div className="col-span-5 flex flex-col gap-6">
              <RocketFrame4Svg className="w-full ve-rocket-frame" />
              <RocketFrame5Svg className="w-full ve-rocket-frame" />
            </div>
            <div className="col-span-4 flex flex-col justify-start">
              <LinesVectorRocketSvg className="w-full h-auto pointer-events-none ve-connector-line" />
              <StageLabel {...pipelineStages[1]} />
            </div>
          </div>

          {/* ━━━ ROW 3 ━━━ */}
          <div className="col-span-9 grid grid-cols-9 gap-x-4 ve-rocket-row">
            <div className="col-span-5">
              <RocketFrame6Svg className="w-full ve-rocket-frame" />
            </div>
            <div className="col-span-4 flex flex-col justify-start">
              <LinesVectorRocketSvg className="w-full h-auto pointer-events-none ve-connector-line" />
              <StageLabel {...pipelineStages[2]} />
            </div>
          </div>

          {/* ━━━ ROW 4 — Rocket Frame 7 + Thrusters ━━━ */}
          <div className="col-span-9 grid grid-cols-9 gap-x-4 ve-rocket-row">
            <div className="col-span-5 flex flex-col items-center ve-rocket-frame">
              <RocketFrame7Svg className="w-full" />
              <RocketThrustersSvg
                ref={thrusterRef}
                className="w-[100%] scale-110 -mt-5 pointer-events-none"
              />
            </div>
            <div className="col-span-4 flex flex-col justify-start">
              <LinesVectorRocketSvg className="w-full h-auto pointer-events-none ve-connector-line" />
              <StageLabel {...pipelineStages[3]} />
            </div>
          </div>

        </div>
        {/* end CENTER + RIGHT COLUMNS */}

      </div>
      {/* end Main Content */}

    </section>
  );
}