import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlobalGrid from "./Globalgrid";
import ReconRadarInlineSvg from "./Svgassets";
import {
  GridLinesOptimizeSvg,
  GridLinesReconSvg,
  EllipseBlueprintSvg,
} from "./Svgassets";

// ── Orange corner marker SVGs ──
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

/* Grid icon */
const BlueprintGridIcon = () => (
  <svg
    className="shrink-0"
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.07542 0.549316H1.72466C1.41295 0.549316 1.11402 0.672448 0.893552 0.893195C0.67317 1.11306 0.549316 1.41119 0.549316 1.72164V4.0672M4.07542 0.549316H9.95229C10.264 0.549316 10.5629 0.672448 10.7834 0.893195C11.0038 1.11306 11.1276 1.41119 11.1276 1.72164V4.0672M4.07542 0.549316V11.103M0.549316 4.0672V9.93064C0.549316 10.2411 0.67317 10.5392 0.893552 10.7591C1.11402 10.9798 1.41295 11.103 1.72466 11.103H4.07542M0.549316 4.0672H11.1276M11.1276 4.0672V9.93064C11.1276 10.2411 11.0038 10.5392 10.7834 10.7591C10.5629 10.9798 10.264 11.103 9.95229 11.103H4.07542"
      stroke="#707070"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════
   CARD ENTRANCE CONFIG
   ═══════════════════════════════════════════════════ */
const CARD_ANIM = {
  initialStates: [
    { y: 80, rotateX: 8, rotateY: -2, scale: 0.92 },
    { y: 100, rotateX: 6, rotateY: 3, scale: 0.9 },
    { y: 90, rotateX: 7, rotateY: -3, scale: 0.91 },
    { y: 70, rotateX: 5, rotateY: 2, scale: 0.93 },
  ],
  duration: 1.1,
  stagger: 0.18,
  ease: "power3.out",
  blurStart: 8,
  blurDuration: 0.6,
  borderGlowDelay: 0.4,
};


export default function PlaybookSection() {
  const sectionRef = useRef(null);
  const radarRef = useRef(null);
  const blueprintRef = useRef(null);
  const deployRef = useRef(null);

  /* ─────────────────────────────────────────────
     Header + Card entrance + Card hover
     ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Header cascading reveal ──
      const headerLabel = section.querySelector(".pb-header-label");
      const headerTitleLines = section.querySelectorAll(".pb-header-title-line");
      const headerDesc = section.querySelector(".pb-header-desc");

      gsap.set(headerLabel, { opacity: 0, y: 20 });
      gsap.set(headerTitleLines, { opacity: 0, y: 35 });
      gsap.set(headerDesc, { opacity: 0, y: 20 });

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      headerTl.to(headerLabel, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      headerTl.to(
        headerTitleLines,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.3"
      );

      headerTl.to(
        headerDesc,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // ── Premium card entrance ──
      const cards = section.querySelectorAll(".pb-card");
      const cardGrid = section.querySelector(".pb-card-grid");

      gsap.set(cardGrid, { perspective: 1200 });

      cards.forEach((card, i) => {
        const init = CARD_ANIM.initialStates[i] || CARD_ANIM.initialStates[0];
        gsap.set(card, {
          opacity: 0,
          y: init.y,
          rotateX: init.rotateX,
          rotateY: init.rotateY,
          scale: init.scale,
          transformOrigin: "center bottom",
          filter: `blur(${CARD_ANIM.blurStart}px)`,
          willChange: "transform, opacity, filter",
        });
      });

      // Helper: builds the layered entrance timeline for a pair of cards
      function buildCardEntrance(tl, cardPair) {
        cardPair.forEach((card, i) => {
          const pos = i * CARD_ANIM.stagger;

          // Main transform
          tl.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: CARD_ANIM.duration,
            ease: CARD_ANIM.ease,
          }, pos);

          // Blur clear
          tl.to(card, {
            filter: "blur(0px)",
            duration: CARD_ANIM.duration * CARD_ANIM.blurDuration,
            ease: "power2.out",
          }, pos);

          // Overshoot settle
          tl.to(card, {
            y: -4,
            duration: 0.25,
            ease: "power2.out",
          }, pos + CARD_ANIM.duration * 0.75);

          tl.to(card, {
            y: 0,
            duration: 0.35,
            ease: "power2.inOut",
          }, pos + CARD_ANIM.duration * 0.75 + 0.25);

          // Border glow pulse
          tl.to(card, {
            boxShadow: "0 0 25px 0 rgba(255,111,33,0.15), 0 0 4px 0 rgba(255,111,33,0.1)",
            duration: 0.4,
            ease: "power2.out",
          }, pos + CARD_ANIM.borderGlowDelay);

          tl.to(card, {
            boxShadow: "0 0 0px 0 rgba(0,0,0,0), 0 0 0px 0 rgba(255,111,33,0)",
            duration: 0.8,
            ease: "power2.inOut",
          }, pos + CARD_ANIM.borderGlowDelay + 0.4);

          // Cleanup willChange
          tl.set(card, { willChange: "auto" }, pos + CARD_ANIM.duration + 0.6);
        });
      }

      // Row 1: Recon + Blueprint
      const row1 = [cards[0], cards[1]].filter(Boolean);
      if (row1.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row1[0],
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
        buildCardEntrance(tl, row1);
      }

      // Row 2: Deploy + Optimize
      const row2 = [cards[2], cards[3]].filter(Boolean);
      if (row2.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row2[0],
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
        buildCardEntrance(tl, row2);
      }

    },
    { scope: sectionRef }
  );

  /* ─────────────────────────────────────────────
     Radar sweep + signal pulse animations
     ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const svg = radarRef.current;
      if (!svg) return;

      const sweepGroup = svg.querySelector(".radar-sweep-group");
      const dotBottom = svg.querySelector(".radar-dot-bottom");
      const dotRight = svg.querySelector(".radar-dot-right");
      const dotTop = svg.querySelector(".radar-dot-top");

      gsap.set(dotBottom, { opacity: 0.15 });
      gsap.set(dotRight, { opacity: 0.15 });
      gsap.set(dotTop, { opacity: 0.15 });

      const CX = 242.49;
      const CY = 150.57;

      function angleFromDown(px, py) {
        const dx = px - CX;
        const dy = py - CY;
        let deg = Math.atan2(-dx, dy) * (180 / Math.PI);
        if (deg < 0) deg += 360;
        return deg;
      }

      const dots = [
        { el: dotBottom, angle: angleFromDown(248.43, 234.02), ox: "248.43", oy: "234.02" },
        { el: dotRight,  angle: angleFromDown(304.99, 147.6),  ox: "304.99", oy: "147.6"  },
        { el: dotTop,    angle: angleFromDown(241.19, 80.84),  ox: "241.19", oy: "80.84"  },
      ];

      const fired = new Set();
      const DURATION = window.innerWidth < 1024 ? 6 : 4;

      const sweepTween = gsap.to(sweepGroup, {
        rotation: "+=360",
        svgOrigin: `${CX} ${CY}`,
        duration: DURATION,
        repeat: -1,
        ease: "none",
        onUpdate() {
          const currentAngle = ((sweepTween.totalTime() % DURATION) / DURATION) * 360;

          dots.forEach((dot, i) => {
            if (!fired.has(i) && currentAngle >= dot.angle) {
              fired.add(i);
              gsap.to(dot.el, {
                opacity: 1,
                scale: 1.6,
                svgOrigin: `${dot.ox} ${dot.oy}`,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(dot.el, {
                opacity: 0.15,
                scale: 1,
                svgOrigin: `${dot.ox} ${dot.oy}`,
                duration: 0.8,
                ease: "power2.in",
                delay: 0.3,
              });
            }
          });
        },
        onRepeat() {
          fired.clear();
        },
      });

      const gradBottom = svg.querySelector("#pulseGradBottom");
      const gradMiddle = svg.querySelector("#pulseGradMiddle");
      const gradTop = svg.querySelector("#pulseGradTop");
      const cubeBottom = svg.querySelector(".cube-glow-bottom");
      const cubeMiddle = svg.querySelector(".cube-glow-middle");
      const cubeTop = svg.querySelector(".cube-glow-top");

      const bottomTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0 });
      bottomTl.to(cubeBottom, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      bottomTl.to(cubeBottom, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      bottomTl.to(gradBottom, { attr: { cx: 3.5, cy: 181.5 }, duration: 0 }, 0.15);
      bottomTl.to(gradBottom, { attr: { cx: 64.5 }, duration: 0.5, ease: "none" }, 0.15);
      bottomTl.to(gradBottom, { attr: { cy: 213.5 }, duration: 0.3, ease: "none" });
      bottomTl.to(gradBottom, { attr: { cx: 126 }, duration: 0.5, ease: "none" });
      bottomTl.to(gradBottom, { attr: { cx: -50 }, duration: 0 });

      const middleTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0.5 });
      middleTl.to(cubeMiddle, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      middleTl.to(cubeMiddle, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      middleTl.to(gradMiddle, { attr: { cx: 3.5, cy: 152 }, duration: 0 }, 0.15);
      middleTl.to(gradMiddle, { attr: { cx: 113 }, duration: 0.85, ease: "none" }, 0.15);
      middleTl.to(gradMiddle, { attr: { cx: -50 }, duration: 0 });

      const topTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 1 });
      topTl.to(cubeTop, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      topTl.to(cubeTop, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      topTl.to(gradTop, { attr: { cx: 3.5, cy: 121.5 }, duration: 0 }, 0.15);
      topTl.to(gradTop, { attr: { cx: 64 }, duration: 0.5, ease: "none" }, 0.15);
      topTl.to(gradTop, { attr: { cy: 91.5 }, duration: 0.3, ease: "none" });
      topTl.to(gradTop, { attr: { cx: 127 }, duration: 0.5, ease: "none" });
      topTl.to(gradTop, { attr: { cx: -50 }, duration: 0 });
    },
    { scope: radarRef }
  );

  /* ─────────────────────────────────────────────
     Blueprint marquee
     ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const rows = blueprintRef.current?.querySelectorAll(".bp-row");
      if (!rows?.length) return;

      const tweens = [];

      rows.forEach((row, i) => {
        const goesRight = i % 2 === 0;
        gsap.set(row, { xPercent: goesRight ? -50 : 0 });
        const tween = gsap.to(row, {
          xPercent: goesRight ? 0 : -50,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
        tweens.push(tween);
      });

      const speed = { value: 1 };
      let decayTween = null;

      ScrollTrigger.create({
        trigger: blueprintRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const velocity = Math.abs(self.getVelocity());
          const boost = 1 + Math.min(velocity / 300, 5);

          if (decayTween) decayTween.kill();

          speed.value = boost;
          tweens.forEach((t) => t.timeScale(speed.value));

          decayTween = gsap.to(speed, {
            value: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.1,
            onUpdate() {
              tweens.forEach((t) => t.timeScale(speed.value));
            },
          });
        },
      });
    },
    { scope: blueprintRef }
  );

  /* ─────────────────────────────────────────────
     Deploy screens marquee
     ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const container = deployRef.current;
      if (!container) return;

      const colLeft = container.querySelector(".deploy-col-left");
      const colRight = container.querySelector(".deploy-col-right");
      if (!colLeft || !colRight) return;

      // Each column has 8 images (4 visible + 4 duplicate for seamless loop)
      // Each image is 25% of container height, so one set = 100% of container height
      const SET = colLeft.scrollHeight / 2;

      gsap.set(colLeft, { y: -SET * 0.2 });
      gsap.to(colLeft, {
        y: -SET * 0.2 - SET,
        duration: 16,
        repeat: -1,
        ease: "none",
        onRepeat() {
          gsap.set(colLeft, { y: -SET * 0.2 });
        },
      });

      gsap.set(colRight, { y: -SET * 0.2 - SET });
      gsap.to(colRight, {
        y: -SET * 0.2,
        duration: 16,
        repeat: -1,
        ease: "none",
        onRepeat() {
          gsap.set(colRight, { y: -SET * 0.2 - SET });
        },
      });
    },
    { scope: deployRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-25 w-full overflow-hidden py-40 px-8 md:px-16 lg:px-24 xl:px-36"
    >
      <GlobalGrid />

      {/* Grid lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Orange corner markers — top-left & top-right (z-30) ── */}
      <CornerLeft
        className="pointer-events-none absolute -top-1 left-[5%] xl:left-[4.1%] z-30"
        aria-hidden="true"
      />
      <CornerRight
        className="pointer-events-none absolute -top-1 right-[5%] xl:right-[4.1%] z-30"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-40 max-w-[95.5rem] mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16 md:mb-24">
        {/* LEFT */}
        <div className="flex flex-col">
          <p className="pb-header-label font-host font-normal text-sm uppercase text-vl-orange mb-2">
            PROCESS
          </p>
          <h2 className="font-host font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tighter tracking-tighter">
            <span className="block pb-header-title-line">The Viral Labs</span>
            <span className="block pb-header-title-line">Methodology</span>
          </h2>
        </div>

        {/* RIGHT */}
        <p className="pb-header-desc font-host font-normal text-base sm:text-lg md:text-xl text-white max-w-md leading-tight linehe lg:mt-10 text-right">
          Every mission runs through a structured growth operation framework.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="pb-card-grid relative z-40 max-w-[95.5rem] mx-auto grid grid-cols-12 gap-6 px-0">

        {/* ━━━ RECON CARD ━━━ */}
        <div className="pb-card col-span-7 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] shadow-lg shadow-black/30 bg-[#171717] ">
          <img src="/images/light ray 1 recon.webp" alt="" className="absolute top-0 left-0 h-full w-auto object-contain pointer-events-none" loading="lazy" />
          <img src="/images/light ray 2 recon.webp" alt="" className="absolute top-0 right-0 h-3/5 w-auto object-contain pointer-events-none" loading="lazy" />
          <GridLinesReconSvg className="absolute top-0 right-0 h-full w-auto opacity-70 pointer-events-none" />

          <ReconRadarInlineSvg
            ref={radarRef}
            className="absolute top-0 right-0 h-full w-auto pointer-events-none"
          />

          <img src="/images/cubes.png" alt="" className="absolute bottom-2 right-2 w-4 sm:w-5 md:w-6 object-contain pointer-events-none" loading="lazy" />

          <div className="absolute z-10 top-6 left-5 sm:top-8 sm:left-6 lg:top-10 lg:left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Recon
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tighter max-w-56 mt-2 sm:mt-3 md:mt-4">
              Pre-execution, we analyze ICP, consumption, and platform dynamics to identify what distributes organically within the niche and why.
            </p>
          </div>
        </div>

        {/* ━━━ BLUEPRINT CARD ━━━ */}
        <div ref={blueprintRef} className="pb-card col-span-5 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717] ">
          <EllipseBlueprintSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none z-[6]" />
          <img src="/images/light ray 1 blueprint.webp" alt="" className="absolute bottom-0 -left-20 w-4/5 h-14 object-contain pointer-events-none z-7" />
          <img src="/images/light ray 2 blueprint.webp" alt="" className="absolute top-0 -right-1 w-3/5 h-full object-contain pointer-events-none z-6" />

          <div
            className="absolute top-0 bottom-0 my-auto left-0 w-full pointer-events-none z-[5]"
            style={{ aspectRatio: '291 / 274' }}
          >
            {/* ── ROW 1 ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '10%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #B2B2B2 0px, #B2B2B2 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md" style={{ left: '54.32%', top: 0, width: '20.48%', height: '100%' }}>
                    <BlueprintGridIcon />
                  </div>
                  <div className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full" style={{ left: '82.76%', top: 0, width: '24.23%', height: '100%' }} />
                </div>
              ))}
            </div>

            {/* ── ROW 2 ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '23%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #B2B2B2 0px, #B2B2B2 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md" style={{ left: '32.22%', top: 0, width: '20.29%', height: '100%' }}>
                    <BlueprintGridIcon />
                  </div>
                  <div className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full" style={{ left: '58.48%', top: 0, width: '26.05%', height: '100%' }}>
                    <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Format</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW 3 (orange) ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '36%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #FF6F21 0px, #FF6F21 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md" style={{ left: '60.89%', top: 0, width: '21.81%', height: '100%' }}>
                    <BlueprintGridIcon />
                  </div>
                  <div className="absolute flex items-center justify-center bg-[#282828] border border-[#FF6F21]/50 rounded-full" style={{ left: '85.67%', top: 0, width: '20.57%', height: '100%' }}>
                    <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Trend</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW 4 ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '49%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #B2B2B2 0px, #B2B2B2 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md" style={{ left: '52.41%', top: 0, width: '17.02%', height: '100%' }}>
                    <BlueprintGridIcon />
                  </div>
                  <div className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full" style={{ left: '77.40%', top: 0, width: '17.77%', height: '100%' }} />
                </div>
              ))}
            </div>

            {/* ── ROW 5 ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '62%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #B2B2B2 0px, #B2B2B2 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center gap-2 pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md" style={{ left: '22.22%', top: 0, width: '27.26%', height: '100%' }}>
                    <BlueprintGridIcon />
                    <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Content style</span>
                  </div>
                  <div className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full" style={{ left: '66.44%', top: 0, width: '23.01%', height: '100%' }}>
                    <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Creative</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW 6 ── */}
            <div className="bp-row absolute left-0 w-[200%]" style={{ top: '75%', height: '9.95%' }}>
              <div className="absolute -left-[50%] w-[200%] h-px top-1/2" style={{ backgroundImage: 'repeating-linear-gradient(to right, #B2B2B2 0px, #B2B2B2 4px, transparent 4px, transparent 12px)', opacity: 0.5 }} />
              {[0, 1].map(c => (
                <div key={c} className="absolute w-1/2 h-full" style={{ left: c === 0 ? '0%' : '50%' }}>
                  <div className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md" style={{ left: '48.22%', top: 0, width: '17.84%', height: '100%' }}>
                    <BlueprintGridIcon />
                  </div>
                  <div className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full" style={{ left: '80.02%', top: 0, width: '17.60%', height: '100%' }} />
                </div>
              ))}
            </div>
          </div>

          <img src="/images/cubes.png" alt="" className="absolute bottom-2 right-2 w-4 sm:w-5 md:w-8 object-contain pointer-events-none z-6" />

          <div className="absolute z-10 top-6 left-5 sm:top-8 sm:left-6 lg:top-10 lg:left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Architecture
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tighter max-w-48 mt-2 sm:mt-3 md:mt-4">
              We define the optimal distribution model UGC, creator networks, multi-account systems, or founder led content to match market objectives and maximize reach.
            </p>
          </div>
        </div>

        {/* ━━━ DEPLOY CARD ━━━ */}
        <div className="pb-card col-span-5 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717] ">
          <img
            src="/images/lines.webp"
            alt=""
            className="absolute inset-x-0 bottom-15 w-full h-auto object-contain pointer-events-none mix-blend-plus-lighter"
            loading="lazy"
          />

          {/* Mobile screens — two-column scrolling marquee */}
          <div ref={deployRef} className="absolute top-0 right-0 w-2/5 h-full overflow-hidden pointer-events-none z-1 isolate">
            <div className="relative h-full flex gap-2">
              {/* Left column (moves up) */}
              <div className="deploy-col-left flex flex-col gap-2 w-1/2">
                {[...Array(8)].map((_, i) => (
                  <img
                    key={`l-${i}`}
                    src="/images/mobile.png"
                    alt=""
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                ))}
              </div>
              {/* Right column (moves down) */}
              <div className="deploy-col-right flex flex-col gap-2 w-1/2">
                {[...Array(8)].map((_, i) => (
                  <img
                    key={`r-${i}`}
                    src="/images/mobile.png"
                    alt=""
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>

          <img src="/images/cubes.png" alt="" className="absolute bottom-2 left-3 w-4 sm:w-5 md:w-6 object-contain pointer-events-none z-2" />

          <div className="absolute z-10 top-6 left-5 sm:top-8 sm:left-6 lg:top-10 lg:left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Execution
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tighter max-w-56 mt-2 sm:mt-3 md:mt-4">
              We execute optimal distribution—from UGC to pre-IPO—via structured content systems, publishing rhythms, and performance reviews.
            </p>
          </div>
        </div>

        {/* ━━━ OPTIMIZE CARD ━━━ */}
        <div className="pb-card col-span-7 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717] ">
          <img src="/images/light ray 1 optimize.webp" alt="" className="absolute top-0 left-0 h-full w-auto object-contain pointer-events-none" loading="lazy" />
          <GridLinesOptimizeSvg className="absolute top-0 left-1/3 h-full w-auto opacity-70 pointer-events-none" />
          <img
            src="/images/Globe and mobile.webp"
            alt=""
            className="absolute top-5 left-1/4 w-3/4 h-9/10 pointer-events-none object-contain"
          />
          <img src="/images/light ray 2 optimize.webp" alt="" className="absolute bottom-0 right-0 h-28 w-auto object-contain pointer-events-none" loading="lazy" />
          <img src="/images/cubes.png" alt="" className="absolute bottom-2 right-2 w-4 sm:w-5 md:w-6 object-contain pointer-events-none" loading="lazy" />

          <div className="absolute z-10 top-6 left-5 sm:top-8 sm:left-6 lg:top-10 lg:left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Refinement
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tighter max-w-56 mt-2 sm:mt-3 md:mt-4">
              We refine the distribution system based on live performance.
            </p>
          </div>

          <p className="absolute z-10 left-5 bottom-5 sm:left-6 sm:bottom-6 lg:left-7 lg:bottom-7 font-host font-normal text-sm text-[#a1a1a1] max-w-56">
            We scale what works and cut what doesn't, refining the engagement for maximum precision and impact.
          </p>
        </div>
      </div>
    </section>
  );
}