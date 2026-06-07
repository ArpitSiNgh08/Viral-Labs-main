/**
 * MissionStats — "Proven Impact"
 *
 * SPACING STRATEGY:
 *   All vertical gaps use clamp(min, vhScale, max) so the layout:
 *   - Fits on 1080p (min values total ~890px)
 *   - Breathes on 1440p+ (max values total ~1074px, matches original design)
 *   - Scales smoothly in between
 *
 * MARQUEE:
 *   GSAP-driven infinite scroll via gsap.to(track, { x: -setWidth }).
 *
 * DASHED ARC:
 *   Animated via strokeDashoffset — dashes march anti-clockwise.
 *
 * STAT CYCLING:
 *   Odometer digits: 3 vertical strips of 0–9, clipped to show one digit.
 *   GSAP rolls each strip to the target digit with a cascading stagger.
 *   Label: slides up/out, text swaps, new label slides in from below.
 *   Dots: color crossfade between steps.
 *
 *   Scroll thresholds (on +=600% = ~36000px total scroll):
 *     0.76 → step 0 (100M+)    ~27360px
 *     0.84 → step 1 (200M+)    ~30240px  (~2880px gap)
 *     0.92 → step 2 (900M+)    ~33120px  (~2880px gap)
 *
 *   After unpin: resumes auto-cycling from current step (repeat: -1)
 *
 * GSAP class targets (for HeroSection scroll entrance):
 *   .impact-label, .impact-heading, .impact-desc, .screen-card,
 *   .frame-corner, .marquee-fade, .impact-quote,
 *   .stats-arc, .stat-number, .stat-sub, .stat-dot
 */

import { useRef, forwardRef, useImperativeHandle } from "react";
import { gsap, ScrollTrigger, Draggable, useGSAP } from "./Gsapconfig";

// ════════════════════════════════════════════════
// SVGs
// ════════════════════════════════════════════════

const CornerLeft = forwardRef(({ className = "", ...props }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

const CornerRight = forwardRef(({ className = "", ...props }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

const FrameCorner = ({ className = "", ...props }) => (
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M0.5 39.5V0.5H39.5" stroke="#FF6F21" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const DashedArc = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="1064" height="346" viewBox="0 0 1064 346" fill="none" className={className}>
    <circle className="arc-dash" cx="532" cy="532.5" r="532" stroke="url(#arcGrad0)" strokeDasharray="14 14" />
    <circle className="arc-glow" cx="532" cy="532.5" r="532" stroke="url(#arcGrad1)" strokeDasharray="14 14" />
    <defs>
      <linearGradient id="arcGrad0" x1="532" y1="-54.5" x2="532" y2="325" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3F3F3" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="arcGrad1" x1="532" y1="0.438477" x2="532" y2="46.9385" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6F21" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

const LOGOS = [
  // { src: "/images/Logo 1.png", alt: "Logo", width: 168, height: 58 },
  // { src: "/images/idag8zcHyV_1773986487960 1.png", alt: "Deel", width: 156, height: 73 },
  // { src: "/images/Dr._Martens_Logo 1.png", alt: "Dr. Martens", width: 162, height: 92 },
  // { src: "/images/flo-svg 1.png", alt: "Flo", width: 163, height: 75 },
  // { src: "/images/Vector.png", alt: "The North Face", width: 60, height: 73 },
  { src: "/images/airtable.png", alt: "Airtable", width: 500, height: 122 },
  { src: "/images/depop.png", alt: "DePop", width: 444, height: 110 },
  { src: "/images/doordash.png", alt: "DoorDash", width: 500, height: 221 },
  { src: "/images/instacart.png", alt: "Instacart", width: 500, height: 74 },
  { src: "/images/lyft.webp", alt: "Lyft", width: 500, height: 344 },
  { src: "/images/patreon.png", alt: "Patreon", width: 399, height: 133 },
  { src: "/images/shopify.png", alt: "Shopify", width: 500, height: 131 },
  { src: "/images/stripe.webp", alt: "Stripe", width: 500, height: 210 },
  { src: "/images/t.png", alt: "T", width: 500, height: 498 },
  { src: "/images/twitch.png", alt: "Twitch", width: 500, height: 143 },
];

// ════════════════════════════════════════════════
// STAT CYCLE CONFIG
// ════════════════════════════════════════════════

const STAT_STEPS = [
  { numStr: "1.2B+", sub: "Views",     label: "Views Generated" },
  { numStr: "17M+",  sub: "Installs",  label: "Installs" },
  { numStr: "$250M", sub: "Revenue",   label: "Worth Revenue Generated" },
];

export default forwardRef(function MissionStats(props, ref) {
  const wrapperRef = useRef();
  const trackRef = useRef();
  const arcRef = useRef();
  const statNumRef = useRef();
  const statSubRef = useRef();
  const statLabelRef = useRef();
  const dotsRef = useRef([]);
  const currentStepRef = useRef(0);
  const activeStepTlRef = useRef(null);
  const autoCycleTlRef = useRef(null);
  const scrollControlledRef = useRef(true);

  // ── GSAP marquee ──
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSet = track.querySelector(".marquee-set");
    if (!firstSet) return;

    const setWidth = firstSet.getBoundingClientRect().width;
    if (setWidth <= 0) return;

    gsap.set(track, { x: 0 });

    const marqueeDuration = window.innerWidth < 1024 ? 30 : 20;
    function createMarquee(startX) {
      return gsap.fromTo(track,
        { x: startX },
        { x: startX - setWidth, duration: marqueeDuration, ease: "none", repeat: -1 }
      );
    }

    let marqueeTween = createMarquee(0);

    // Touch drag/swipe on small screens
    if (window.innerWidth < 640) {
      Draggable.create(track, {
        type: "x",
        onDragStart: () => marqueeTween.kill(),
        onDragEnd() {
          // Wrap x into one setWidth range, then restart marquee from there
          let x = parseFloat(gsap.getProperty(track, "x"));
          x = ((x % setWidth) + setWidth) % setWidth;
          if (x > 0) x -= setWidth;
          marqueeTween = createMarquee(x);
        },
      });
    }
  }, { scope: wrapperRef });

  // ── GSAP dashed arc rotation ──
  useGSAP(() => {
    const svg = arcRef.current;
    if (!svg) return;

    const dashes = svg.querySelectorAll(".arc-dash, .arc-glow");
    const circumference = 2 * Math.PI * 532;

    gsap.set(dashes, { strokeDashoffset: 0 });
    // Slower on mobile to reduce GPU repainting of large SVG strokes
    const arcDuration = window.innerWidth < 1024 ? 120 : 60;
    gsap.to(dashes, { strokeDashoffset: circumference, duration: arcDuration, ease: "none", repeat: -1 });
  }, { scope: arcRef });

  // ── Stat cycling: initial state ──
  useGSAP(() => {
    const dots = dotsRef.current.filter(Boolean);
    if (dots.length < 3) return;
    const orange = "#FF6F21";
    const white = "#FFFFFF";
    gsap.set(dots[0], { backgroundColor: orange });
    gsap.set(dots[1], { backgroundColor: white });
    gsap.set(dots[2], { backgroundColor: white });
  });

  // ── Internal: animate from current step to target step ──
  function _animateToStep(targetStep) {
    const numEl = statNumRef.current;
    const subEl = statSubRef.current;
    const labelEl = statLabelRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (!numEl || !subEl || !labelEl || dots.length < 3) return;
    if (targetStep === currentStepRef.current) return;

    if (activeStepTlRef.current) {
      activeStepTlRef.current.kill();
      activeStepTlRef.current = null;
    }

    const fromStep = currentStepRef.current;
    currentStepRef.current = targetStep;

    const orange = "#FF6F21";
    const white = "#FFFFFF";
    const nextStep = STAT_STEPS[targetStep];

    const tl = gsap.timeline({ onComplete: () => { activeStepTlRef.current = null; } });
    activeStepTlRef.current = tl;

    // Number fade out → swap → fade in
    tl.to(numEl, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, 0);
    tl.call(() => { numEl.textContent = nextStep.numStr; }, null, 0.35);
    tl.set(numEl, { y: 10 }, 0.35);
    tl.to(numEl, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.4);

    // Sub label fade out → swap → fade in
    tl.to(subEl, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, 0);
    tl.call(() => { subEl.textContent = nextStep.sub; }, null, 0.35);
    tl.set(subEl, { y: 10 }, 0.35);
    tl.to(subEl, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.4);

    // White label slide out → swap → slide in
    tl.to(labelEl, { yPercent: -120, opacity: 0, duration: 0.35, ease: "power3.in" }, 0);
    tl.call(() => { labelEl.textContent = nextStep.label; }, null, 0.4);
    tl.set(labelEl, { yPercent: 120 }, 0.4);
    tl.to(labelEl, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.45);

    // Dots crossfade
    tl.to(dots[fromStep], { backgroundColor: white, duration: 0.4, ease: "power2.inOut" }, 0);
    tl.to(dots[targetStep], { backgroundColor: orange, duration: 0.4, ease: "power2.inOut" }, 0.25);
  }

  // ── Auto-cycling ──
  function startAutoCycle() {
    if (autoCycleTlRef.current) return;

    const numEl = statNumRef.current;
    const subEl = statSubRef.current;
    const labelEl = statLabelRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (!numEl || !subEl || !labelEl || dots.length < 3) return;

    const orange = "#FF6F21";
    const white = "#FFFFFF";
    const startIdx = currentStepRef.current;

    const tl = gsap.timeline({ repeat: -1 });
    let pos = 0;

    for (let j = 0; j < STAT_STEPS.length; j++) {
      const i = (startIdx + j) % STAT_STEPS.length;
      const nextI = (i + 1) % STAT_STEPS.length;
      const nextStep = STAT_STEPS[nextI];

      tl.to({}, { duration: 2.5 }, pos);
      pos += 2.5;

      // Number swap
      tl.to(numEl, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, pos);
      tl.call(() => { numEl.textContent = nextStep.numStr; }, null, pos + 0.35);
      tl.set(numEl, { y: 10 }, pos + 0.35);
      tl.to(numEl, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, pos + 0.4);

      // Sub label swap
      tl.to(subEl, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, pos);
      tl.call(() => { subEl.textContent = nextStep.sub; }, null, pos + 0.35);
      tl.set(subEl, { y: 10 }, pos + 0.35);
      tl.to(subEl, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, pos + 0.4);

      // White label swap
      tl.to(labelEl, { yPercent: -120, opacity: 0, duration: 0.35, ease: "power3.in" }, pos);
      tl.call(() => { labelEl.textContent = nextStep.label; }, null, pos + 0.4);
      tl.set(labelEl, { yPercent: 120 }, pos + 0.4);
      tl.to(labelEl, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, pos + 0.45);

      tl.to(dots[i], { backgroundColor: white, duration: 0.4, ease: "power2.inOut" }, pos);
      tl.to(dots[nextI], { backgroundColor: orange, duration: 0.4, ease: "power2.inOut" }, pos + 0.25);

      pos += 0.9;
    }

    autoCycleTlRef.current = tl;
  }

  function stopAutoCycle() {
    if (autoCycleTlRef.current) {
      autoCycleTlRef.current.kill();
      autoCycleTlRef.current = null;
    }
  }

  // ── ScrollTrigger: stat cycling ──
  // Thresholds spread across 0.76–0.92 (~2880px between each step)
  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const section = wrapper.closest("section");
    if (!section) return;

    let lastScrollStep = 0;
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=600%",
      onUpdate: (self) => {
        const p = self.progress;

        if (p < 0.76) return;

        let targetStep = 0;
        if (p >= 0.92) targetStep = 2;
        else if (p >= 0.84) targetStep = 1;

        if (targetStep !== lastScrollStep) {
          lastScrollStep = targetStep;
          _animateToStep(targetStep);
        }
      },
      onLeave: () => {
        scrollControlledRef.current = false;
        startAutoCycle();
      },
      onEnterBack: () => {
        stopAutoCycle();
        scrollControlledRef.current = true;
      },
    });
  });

  // ── Expose imperative methods for HeroSection ──
  useImperativeHandle(ref, () => ({
    animateToStep: (step) => {
      if (!scrollControlledRef.current) _animateToStep(step);
    },
    startAutoCycle,
    stopAutoCycle,
  }));

  return (
    <div ref={wrapperRef} className="relative w-full min-h-screen overflow-visible">
     <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem] min-h-screen flex flex-col">

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-50" aria-hidden="true" />

      <CornerLeft className="pointer-events-none absolute -top-0.5 left-0 z-50" />
      <CornerRight className="pointer-events-none absolute -top-0.5 right-0 z-50" />
      {/* <CornerLeft className="pointer-events-none absolute -bottom-1 left-0 z-50" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute -bottom-1 right-0 z-50" style={{ transform: "scaleY(-1)" }} /> */}

      {/* ── Header ── */}
      <div
        className="relative z-40 px-[clamp(0.75rem,3vw,3rem)] max-sm:px-2 max-mob:px-3 4xl:px-16 5xl:px-20"
        style={{ paddingTop: "clamp(3rem, 5.5vh, 5rem)" }}
      >
        <div
          className="impact-header flex flex-col gap-6 lg:flex-row lg:justify-between items-start max-sm:gap-6 max-mob:gap-3"
          style={{ marginBottom: "clamp(4rem, 9.5vh, 8.5rem)" }}
        >
          <div className="flex flex-col gap-0 w-full   max-sm:w-full">
            <p className="impact-label font-bricolage font-normal text-base max-mob:text-sm 2xl:text-sm 4xl:text-lg 5xl:text-xl text-[#ff6f21] uppercase leading-tight"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Impact Stats
            </p>
            <h2 className="impact-heading font-host font-medium text-[clamp(2rem,4.5vw,3.375rem)] max-sm:text-4xl max-mob:text-[1.875rem] max-mob:leading-[1.05] max-mob:tracking-[-1.5px] 4xl:text-[4rem] 5xl:text-[5rem] text-[#f1f1f1] tracking-[-2.16px] leading-[1.2] w-full">
              Performance Deployed At <span className="text-[#ff6f21]">Scale</span>
            </h2>
          </div>
          {/* <p className="impact-desc font-host font-light text-base max-mob:text-sm max-mob:leading-[1.35] 4xl:text-lg 5xl:text-xl text-white tracking-tight leading-[1.0] w-full lg:max-w-[18.25rem] 4xl:max-w-[24rem] 5xl:max-w-[28rem] lg:mt-12 lg:-translate-y-6 max-sm:w-full max-sm:mt-0">
            These are outcomes from real deployments across platforms, creators, and content systems.
          </p> */}
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="relative z-40 mx-0"
        style={{ marginBottom: "clamp(2.5rem, 5.5vh, 5rem)" }}
      >
        <FrameCorner className="frame-corner absolute -top-5 left-0 max-sm:size-3.5 z-10 max-sm:z-51 opacity-0" />
        <FrameCorner className="frame-corner absolute -top-5 right-0 max-sm:size-3.5 z-10 max-sm:z-51 opacity-0" style={{ transform: "scaleX(-1)" }} />
        <FrameCorner className="frame-corner absolute -bottom-5 left-0 max-sm:size-3.5 z-10 max-sm:z-51 opacity-0" style={{ transform: "scaleY(-1)" }} />
        <FrameCorner className="frame-corner absolute -bottom-5 right-0 max-sm:size-3.5 z-10 max-sm:z-51 opacity-0" style={{ transform: "scale(-1, -1)" }} />

        <div className="relative overflow-hidden py-10 max-mob:py-6 w-[99.5%] mx-auto">
          <div
            className="marquee-fade absolute inset-y-0 left-0 w-40 z-10 pointer-events-none opacity-0"
            style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
          />
          <div
            className="marquee-fade absolute inset-y-0 right-0 w-40 z-10 pointer-events-none opacity-0"
            style={{ background: "linear-gradient(to left, #121212 0%, transparent 100%)" }}
          />

          <div ref={trackRef} className="flex w-max items-center max-sm:cursor-grab max-sm:active:cursor-grabbing">
            {["a", "b", "c", "d"].map((setKey) => (
              <div key={setKey} className="marquee-set flex shrink-0 pr-16 items-center justify-evenly gap-14 max-sm:gap-12 max-mob:gap-8" style={{  }}>
                {LOGOS.map((logo, i) => (
                  <img
                    key={`${setKey}-${i}`}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    className="screen-card h-15 max-mob:h-10 4xl:h-20 5xl:h-24 w-auto object-contain opacity-0 grayscale brightness-75 transition-all duration-300 ease-out hover:brightness-150 hover:ddiv-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quote + Stats ── */}
      <div className="relative z-40 px-[clamp(0.75rem,3vw,3rem)] max-sm:px-2 max-mob:px-3 4xl:px-16 5xl:px-20 pb-10 my-auto">
        <div
          className="flex justify-center"
          style={{ marginBottom: "clamp(2.5rem, 5.5vh, 5rem)" }}
        >
          <p className="impact-quote font-host text-[clamp(1.5rem,3.3vw,2.5rem)] max-sm:text-2xl max-mob:text-[1.375rem] max-mob:leading-[1.15] max-mob:tracking-[-0.5px] 4xl:text-[3rem] 5xl:text-[3.5rem] text-[#f1f1f1] text-center tracking-[-1.6px] leading-[0.95] w-full max-w-[26.25rem] 4xl:max-w-[32rem] 5xl:max-w-[38rem] max-sm:w-full">
            Outcomes Generated.
          </p>
        </div>

        <div className="stats-arc relative flex flex-col items-center opacity-0 scale-90">
          <div className="relative w-full max-w-[1064px] 4xl:max-w-[1300px] 5xl:max-w-[1500px] aspect-[1064/346] overflow-hidden max-sm:w-[115%] max-mob:w-[110%]">
            <DashedArc ref={arcRef} className="absolute left-0 top-1.5 w-full h-auto" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-[clamp(1rem,2.5vw,3.5rem)] max-sm:pt-5">
              <div className="flex flex-col items-center gap-0 text-center">

                <span className="stat-sub font-host font-medium text-sm 4xl:text-base 5xl:text-lg text-[#ff6f21] tracking-tight leading-none opacity-0 translate-y-4">
                  <span ref={statSubRef}>{STAT_STEPS[0].sub}</span>
                </span>

                <div
                  className="stat-number font-bricolage font-normal text-[clamp(2.5rem,6vw,5.5rem)] max-sm:text-5xl max-mob:text-4xl 4xl:text-[6.5rem] 5xl:text-[8rem] text-white tracking-[-0.06em] max-sm:tracking-[-2px] max-mob:tracking-[-2px] leading-none whitespace-nowrap opacity-0 translate-y-8"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  <span ref={statNumRef}>{STAT_STEPS[0].numStr}</span>
                </div>

                <span className="stat-sub font-host text-lg 4xl:text-xl 5xl:text-2xl text-white tracking-tight leading-none opacity-0 translate-y-4">
                  <span className="block overflow-hidden" style={{ height: "1.4em" }}>
                    <span ref={statLabelRef} className="block">
                      {STAT_STEPS[0].label}
                    </span>
                  </span>
                </span>

              </div>

              <div className="flex gap-2 items-center mt-[clamp(0.5rem,2vw,3rem)] max-sm:mt-2">
                <div ref={(el) => (dotsRef.current[0] = el)} className="stat-dot size-1.5 4xl:size-2 5xl:size-2.5 bg-[#ff6f21] opacity-0 scale-0" />
                <div ref={(el) => (dotsRef.current[1] = el)} className="stat-dot size-1.5 4xl:size-2 5xl:size-2.5 bg-white opacity-0 scale-0" />
                <div ref={(el) => (dotsRef.current[2] = el)} className="stat-dot size-1.5 4xl:size-2 5xl:size-2.5 bg-white opacity-0 scale-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
});