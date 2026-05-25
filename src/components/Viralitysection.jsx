import { useRef } from "react";
import useIsDesktop from "./useIsDesktop";
import GlobalGrid from "./Globalgrid";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../components/Gsapconfig";
import { viralityState } from "./Viralitystate";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

const LINE_BLURS = [0.5, 0.5, 3, 3, 5.5];
const CUBE_BLURS = [0, 5, 5];

function GlowH({ className }) {
  return (
    <div className={`v-glow-h ${className} flex items-center`}>
      {LINE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex items-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}>
          <div className="w-full h-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

function GlowV({ className }) {
  return (
    <div className={`v-glow-v ${className} flex justify-center`}>
      {LINE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex justify-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}>
          <div className="h-full w-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

function GlowCubes({ className }) {
  return (
    <div className={`v-cubes ${className}`}>
      {CUBE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex flex-col items-center justify-center gap-[8px]"
          style={blur > 0 ? { mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` } : undefined}>
          <div className="w-[8px] h-[8px] bg-[#FF6F21]" />
          <div className="w-[8px] h-[8px] bg-[#FF6F21]" />
        </div>
      ))}
    </div>
  );
}

export default function ViralitySection({ globeContainerRef }) {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef();
  const headerRef = useRef();
  const glowRef = useRef();
  const bottomTextRef = useRef();
  const mobileGlobeRef = useRef();

  useGSAP(
    () => {
      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;
      // ═══════════════════════════════════════
      // SPLITTEXT — LABEL + HEADING (mask lines)
      // ═══════════════════════════════════════

      const labelSplit = SplitText.create(".v-label", {
        type: "lines", mask: "lines", linesClass: "v-label-line",
      });
      labelSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
      });

      const headingSplit = SplitText.create(".v-heading", {
        type: "lines", mask: "lines", linesClass: "v-heading-line",
      });
      headingSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.25em";
      });

      // ═══════════════════════════════════════
      // INITIAL STATES
      // ═══════════════════════════════════════

      gsap.set(viralityState, { globeProgress: 0 });

      // Label lines — hidden below mask with blur + invisible
      gsap.set(labelSplit.lines, {
        yPercent: 110, filter: "blur(6px)", opacity: 0,
      });

      // Heading lines — hidden below mask with blur + invisible
      gsap.set(headingSplit.lines, {
        yPercent: 110, filter: "blur(8px)", opacity: 0,
      });

      // Dynamically center the header on screen
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      const headerTopInSection = headerRect.top - sectionRect.top;
      const headerCenterInSection = headerTopInSection + headerRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const centerOffset = viewportCenter - headerCenterInSection;
      gsap.set(headerRef.current, { y: centerOffset });

      // Globe glow — hidden
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });

      // Mobile globe video — hidden; load video source when section is near
      if (mobileGlobeRef.current) {
        gsap.set(mobileGlobeRef.current, { opacity: 0, scale: 0.85, filter: "blur(10px)" });
        const vid = mobileGlobeRef.current;

        // Check if browser supports HEVC with alpha (Safari on iOS/macOS only)
        const probe = document.createElement("video");
        const supportsHEVCAlpha = probe.canPlayType('video/mp4; codecs="hvc1"') === "probably";

        const io = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) {
            if (supportsHEVCAlpha) {
              vid.src = "/videos/Globe ProRes 44 HEVC-hevc-safari.mp4";
            } else {
              vid.src = "/videos/globevideo.webm";
              vid.style.mixBlendMode = "lighten";
            }
            vid.play().catch(() => {});
            io.disconnect();
          }
        }, { rootMargin: "200px" });
        io.observe(sectionRef.current);
      }

      // Cards — hidden, offset from their final positions
      gsap.set(".v-card-tl", {
        xPercent: -40, y: -30, opacity: 0, rotation: -4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-tr", {
        xPercent: 40, y: -30, opacity: 0, rotation: 4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-bl", {
        xPercent: -40, y: 30, opacity: 0, rotation: -4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-br", {
        xPercent: 40, y: 30, opacity: 0, rotation: 4, scale: 0.92, filter: "blur(8px)",
      });

      // Glow lines + cubes — hidden
      gsap.set(".v-glow-v", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".v-glow-h", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".v-cubes", { opacity: 0, scale: 0, transformOrigin: "center center" });

      // Bottom text — hidden until pin releases
      gsap.set(bottomTextRef.current, { opacity: 0 });

      // ═══════════════════════════════════════
      // SPLITTEXT — BOTTOM LEFT PARAGRAPH
      // ═══════════════════════════════════════

      const bottomLeftSplit = SplitText.create(".v-bottom-left-text", {
        type: "lines", mask: "lines", linesClass: "v-bl-line",
      });
      bottomLeftSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
      });
      gsap.set(bottomLeftSplit.lines, {
        yPercent: 120, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // SPLITTEXT — BOTTOM "MOST BRANDS" TEXT
      // ═══════════════════════════════════════

      const bottomMostSplit = SplitText.create(".v-bottom-most-text", {
        type: "lines", mask: "lines", linesClass: "v-bm-line",
      });
      bottomMostSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
      });
      gsap.set(bottomMostSplit.lines, {
        yPercent: 120, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // BOTTOM RIGHT TAGS — initial states
      // ═══════════════════════════════════════

      gsap.set(".v-bottom-tag", {
        opacity: 0, y: 16, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // BOTTOM TEXT TIMELINE (paused)
      // Plays once when the pin releases.
      // ═══════════════════════════════════════

      const bottomTl = gsap.timeline({ paused: true });

      bottomTl.to(bottomTextRef.current, {
        opacity: 1, duration: 0.4, ease: "power2.out",
      }, 0);

      bottomTl.to(bottomLeftSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0);

      bottomTl.to(".v-bottom-tag", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 0.7,
        ease: "power4.out",
      }, 0.15);

      bottomTl.to(bottomMostSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0.5);

      // ═══════════════════════════════════════
      // PINNED SCRUB TIMELINE
      // ═══════════════════════════════════════

      let bottomPlayed = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 2,
          pinSpacing: true,
          onLeave: () => {
            if (!bottomPlayed) {
              bottomPlayed = true;
              ScrollTrigger.create({
                trigger: bottomTextRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => bottomTl.play(),
              });
            }
          },
        },
        defaults: { ease: "none" },
      });

      // ── PHASE 0 — TEXT ENTRANCE (mask reveal + blur) ──
      tl.set(labelSplit.lines, { opacity: 1 }, 1);
      tl.to(labelSplit.lines, {
        yPercent: 0, filter: "blur(0px)", duration: 8, ease: "power4.out",
      }, 1);

      tl.set(headingSplit.lines, { opacity: 1, stagger: 3 }, 4);
      tl.to(headingSplit.lines, {
        yPercent: 0, filter: "blur(0px)", stagger: 3, duration: 10, ease: "power4.out",
      }, 4);

      // ── PHASE A — HEADING UP + GLOBE SLIDES IN ──
      tl.to(headerRef.current, {
        y: 0,
        duration: 20,
        ease: "power2.inOut",
      }, 18);

      tl.to(viralityState, {
        globeProgress: 1,
        duration: 30,
        ease: "power3.inOut",
      }, 22);

      // ── Mobile globe + glow-globe fade-in (small screens only) ──
      if (mobileGlobeRef.current) {
        tl.to(mobileGlobeRef.current, {
          opacity: 1, scale: 1, filter: "blur(0px)",
          duration: 20, ease: "power3.out",
        }, 22);
      }

      // ── PHASE B — GLOBE GLOW ──
      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 15,
        ease: "power4.out",
      }, 45);

      // ── PHASE C — CARDS ANIMATE IN ──
      tl.to(".v-card-tl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 60);
      tl.to(".v-card-tr", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 62);
      tl.to(".v-card-bl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 66);
      tl.to(".v-card-br", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 68);

      // ── PHASE D — GLOW LINES + CUBES ──
      tl.to(".v-glow-v", {
        clipPath: "inset(0 0 0% 0)", stagger: 1.5, duration: 8, ease: "power3.out",
      }, 80);
      tl.to(".v-glow-h", {
        clipPath: "inset(0 0% 0 0)", stagger: 1.5, duration: 7, ease: "power3.out",
      }, 83);
      tl.to(".v-cubes", {
        opacity: 1, scale: 1, transformOrigin: "center center", stagger: 1, duration: 5, ease: "back.out(1.7)",
      }, 87);

      }); // fontReady.then
      return () => { cancelled = true; };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="virality-section relative w-full min-h-screen overflow-hidden">

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[20%] md:top-[32%]  lg:top-[28%] 4xl:top-[34%] 5xl:top-[38%] -translate-x-1/2 -translate-y-[35%] z-[8]"
        aria-hidden="true"
        style={{
          width: "clamp(300px, 80vw, 2000px)", height: "clamp(300px, 80vw, 1100px)", borderRadius: "50%",
          background: "radial-gradient(circle, #5a1a12 0%, #351010 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Clip wrapper — clips globe at section bounds, prevents bleed into section above */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {isDesktop && <div ref={globeContainerRef} className="absolute -top-40 bottom-0 w-full -translate-y-12" />}
      </div>

      {/* Globe video for small screens — only rendered on mobile, deferred load */}
      {!isDesktop && <video
        ref={mobileGlobeRef}
        preload="none"
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-[18.5%] max-sm:top-[14%] max-mob:top-[10%] mob:top-[9%] md:top-[15%] w-[90vw] max-mob:w-[200vw] mob:w-[205vw] sm:w-[140vw] md:w-[160vw] max-mob:max-w-none mob:max-w-none sm:max-w-none md:max-w-none object-contain pointer-events-none z-10"
      />}

      <GlobalGrid />
      <GlobalTexture />

      <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">

      <div className="pointer-events-none absolute top-0 left-0 w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-0 w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-30" aria-hidden="true" />
      

      {/* ═══ Main viewport content — heading + cards fit within 100vh ═══ */}
      <div className="relative z-40 px-[clamp(0.75rem,3vw,3rem)] max-sm:px-2 max-mob:px-3 pt-8 pointer-events-none h-auto min-h-screen md:h-screen md:pb-20">

        <div ref={headerRef} className="flex flex-col items-center gap-1 mb-4 md:mb-6 xl:mb-12" style={{ perspective: "600px" }}>
          <p className="v-label virality-label font-host text-xs md:text-base lg:text-xs xl:text-xs 4xl:text-lg 5xl:text-xl text-[#ff6f21] text-center leading-none">
            WHY VIRALITY CAN BE ENGINEERED
          </p>
          <h2 className="v-heading virality-heading font-host text-[clamp(1.75rem,5vw,3rem)] max-mob:text-[1.4rem] max-mob:leading-none lg:text-[1.5rem] xl:text-[3rem] 4xl:text-[4rem] 5xl:text-[5rem] text-[#f1f1f1] tracking-tighter leading-[0.75] text-center">
            Distribution isn't luck. It
            <br />
            can be engineered.
          </h2>
        </div>

        {/* Spacer — pushes cards below globe on mobile */}
        <div className="h-[55vh] sm:h-[50vh] max-mob:h-[50vh] md:hidden" aria-hidden="true" />

        <div className="relative md:hidden w-full h-16 -mt-16 z-20 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl 3xl:max-w-7xl 4xl:max-w-[90rem] 5xl:max-w-[120rem] min-h-0 md:min-h-[31.25rem] h-auto md:h-[calc(100vh-10rem)] xl:h-[calc(100vh-12.5rem)]">

          <div className="grid grid-cols-1 gap-8 md:gap-0 px-2 md:px-0 md:contents md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none overflow-visible">

          {/* ── Distribution Architecture (top-left) ── */}
          <div className="v-card-tl relative md:absolute md:left-2 md:-top-2 lg:left-8 lg:top-0 xl:left-26 xl:top-3 2xl:left-20 2xl:top-2 3xl:left-26 3xl:top-3 4xl:left-36 4xl:top-30 5xl:left-48 5xl:top-50 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-[85%] mr-auto md:w-48 lg:w-40 xl:w-48 2xl:w-48 3xl:w-52 4xl:w-60 5xl:w-96 flex flex-col overflow-visible">
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#1d1d1d]/90 md:bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl max-mob:text-lg max-mob:leading-[1.15] lg:text-base xl:text-xl 4xl:text-2xl 5xl:text-4xl text-white tracking-tight leading-5 lg:leading-4 xl:leading-5 5xl:leading-8 text-left md:text-right">
                  Distribution
                  <br />
                  Architecture
                </div>
              </div>
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#101010]/90 md:bg-[#101010]/60">
                <p className="font-host text-xs lg:text-[10px] xl:text-xs 4xl:text-sm 5xl:text-lg font-thin text-white leading-4 lg:leading-3.5 xl:leading-4 5xl:leading-6 tracking-wide text-left md:text-right">
                  Distribution systems amplify signal.
                </p>
              </div>
              <GlowH className="absolute -top-3 right-0 max-sm:right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -right-7 w-7 h-10 hidden md:block" />
            </div>
          </div>

          {/* ── Attention Dynamics (top-right) ── */}
          <div className="v-card-tr relative md:absolute md:right-0 md:-top-2 lg:right-4 lg:top-4 xl:right-15 xl:top-20 2xl:right-10 2xl:top-16 3xl:right-15 3xl:top-20 4xl:right-24 4xl:top-50 5xl:right-16 5xl:top-76 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-[85%] ml-auto md:w-48 lg:w-40 xl:w-48 2xl:w-48 3xl:w-52 4xl:w-60 5xl:w-96 flex flex-col overflow-visible">
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#1d1d1d]/90 md:bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl max-mob:text-lg max-mob:leading-[1.15] lg:text-base xl:text-xl 4xl:text-2xl 5xl:text-4xl text-white tracking-tight leading-5 lg:leading-4 xl:leading-5 5xl:leading-8 text-left">
                  Attention
                  <br />
                  Dynamics
                </div>
              </div>
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#101010]/90 md:bg-[#101010]/60">
                <p className="font-host text-xs lg:text-[10px] xl:text-xs 4xl:text-sm 5xl:text-lg font-thin text-white leading-4 lg:leading-3.5 xl:leading-4 5xl:leading-6 tracking-wide text-left">
                  Attention follows observable patterns.
                </p>
              </div>
              <GlowH className="absolute -top-3 right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -left-7 w-7 h-10 hidden md:block" />
            </div>
          </div>

          {/* ── Creative Methodology (bottom-left) ── */}
          <div className="v-card-bl relative md:absolute md:left-2 md:bottom-26 lg:left-8 lg:bottom-[4rem] xl:left-20 xl:bottom-0 2xl:left-14 2xl:bottom-[5rem] 3xl:left-20 3xl:bottom-15 4xl:left-32 4xl:bottom-50 5xl:left-24 5xl:bottom-100 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-[85%] mr-auto md:w-56 lg:w-44 xl:w-56 2xl:w-56 3xl:w-60 4xl:w-68 5xl:w-104 flex flex-col overflow-visible">
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#1d1d1d]/90 md:bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl max-mob:text-lg max-mob:leading-[1.15] lg:text-base xl:text-xl 4xl:text-2xl 5xl:text-4xl text-white tracking-tight leading-5 lg:leading-4 xl:leading-5 5xl:leading-8 text-left md:text-right">
                  Creative
                  <br />
                  Methodology
                </div>
              </div>
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#101010]/90 md:bg-[#101010]/60">
                <p className="font-host text-xs lg:text-[10px] xl:text-xs 4xl:text-sm 5xl:text-lg font-thin text-white leading-4 lg:leading-3.5 xl:leading-4 5xl:leading-6 tracking-wide text-left md:text-right">
                  Creative can be developed and tested systematically.
                </p>
              </div>
              <GlowH className="absolute -top-3 left-28 max-sm:left-auto max-sm:right-0 sm:left-auto sm:right-0 md:left-auto md:right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -right-7 w-7 h-10 hidden md:block" />
            </div>
          </div>

          {/* ── Performance Outcomes (bottom-right) ── */}
          <div className="v-card-br relative md:absolute md:right-0 md:bottom-30 lg:right-4 lg:bottom-[5rem] xl:right-6 xl:-bottom-3 2xl:right-4 2xl:bottom-[3rem] 3xl:right-6 3xl:bottom-30 4xl:right-16 4xl:bottom-60 5xl:right-8 5xl:bottom-90 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-[85%] ml-auto md:w-69 lg:w-52 xl:w-69 2xl:w-69 3xl:w-72 4xl:w-84 5xl:w-120 flex flex-col overflow-visible">
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#1d1d1d]/90 md:bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl max-mob:text-lg max-mob:leading-[1.15] lg:text-base xl:text-xl 4xl:text-2xl 5xl:text-4xl text-white tracking-tight leading-5 lg:leading-4 xl:leading-5 5xl:leading-8 text-left">
                  Performance
                  <br />
                  Outcomes
                </div>
              </div>
              <div className="relative px-5 max-mob:px-3 lg:px-3 xl:px-5 5xl:px-8 py-2 max-mob:py-1.5 lg:py-1.5 xl:py-2 5xl:py-4 bg-[#101010]/90 md:bg-[#101010]/60">
                <p className="font-host text-xs lg:text-[10px] xl:text-xs 4xl:text-sm 5xl:text-lg font-thin text-white leading-4 lg:leading-3.5 xl:leading-4 5xl:leading-6 tracking-wide text-left">
                  Growth becomes more predictable when distribution is managed as a system.
                </p>
              </div>
              <GlowH className="absolute -top-3 left-28 max-sm:left-auto max-sm:right-0 sm:left-auto sm:right-0 md:left-auto md:right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -left-7 w-7 h-10 hidden md:block" />
            </div>
          </div>

          </div>

        </div>
      </div>

      {/* ══ Mobile bottom spacer — replaces hidden bottom text ══ */}
      <div className="md:hidden h-16 sm:h-20" aria-hidden="true" />

      {/* ══ BOTTOM TEXT — lives outside the h-screen block, scrolled to after pin ══ */}
      <div ref={bottomTextRef} className="hidden md:block relative z-40 px-[clamp(0.75rem,3vw,3rem)] max-sm:px-2 max-mob:px-3 pb-[clamp(2.5rem,5vh,10rem)] pointer-events-none">
        <div className="flex flex-col md:flex-row items-start md:justify-around max-w-6xl 5xl:max-w-none mx-auto gap-6 md:gap-[30%] lg:gap-16 pt-10 md:pt-24">

          {/* Left column */}
          <div className="md:max-w-[40%] lg:max-w-md 5xl:max-w-4xl">
            <p className="v-bottom-left-text font-host font-thin text-sm md:text-xs lg:text-sm text-white leading-[1.2] tracking-tight 4xl:text-base 5xl:text-3xl">
              <span className="font-semibold">Viral Labs</span>
              {" "}studies how attention moves through markets, channels,
              and audiences, then turns those patterns into structured distribution
              systems. We do not rely on chance. We build repeatable conditions for
              reach, influence, and commercial impact.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-3">
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-sm md:text-xs lg:text-sm text-white tracking-tight 4xl:text-base 5xl:text-3xl">Signal Amplification</span>
              </div>
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-sm md:text-xs lg:text-sm text-white tracking-tight 4xl:text-base 5xl:text-3xl">Behavioral Loops</span>
              </div>
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-sm md:text-xs lg:text-sm text-white tracking-tight 4xl:text-base 5xl:text-3xl">Distribution Mechanics</span>
              </div>
            </div>

            <p className="v-bottom-most-text font-host font-thin text-sm md:text-xs lg:text-sm max-mob:max-w-none text-white tracking-tight leading-[1.2] md:max-w-[12.50rem] lg:max-w-xs 4xl:max-w-sm 5xl:max-w-lg 4xl:text-base 5xl:text-3xl">
              Most brands chase trends. We model attention. Virality follows patterns.
            </p>
          </div>

        </div>
      </div>

      </div>
    </section>
  );
}