/**
 * HeroSection — One pinned timeline with two acts + entrance animation.
 *
 * GlobalGrid is rendered INSIDE this section (not in App.jsx) so that
 * it's absolute-positioned within the pinned container. During the pin
 * it appears fixed; when the pin releases it scrolls away naturally.
 *
 * ENTRANCE — on page load:
 *   PHASE 0 — BG PLANE NOISE DISSOLVE (0.0s → 2.8s)
 *   PHASE 1 — GRID + OVERLAY REVEAL (2.2s → 3.2s)
 *   PHASE 2 — HEADING CHARS STAGGER UP (3.0s → ~4.5s)
 *   PHASE 3 — SUBHEADING SCRAMBLE + CTA (4.0s → ~6.0s)
 *
 *   SCROLL — (+=600%, pinned, scrub)
 *   ACT 1 — ZOOM TRANSITION (0.00 → 0.40)
 *   ACT 2 — MISSION STATS ENTRANCE (0.55 → 0.93)
 *   ACT 3 — STAT SCROLL CYCLING (0.76 → 0.88 via onUpdate)
 *   HOLD (0.93 → 1.00)
 */

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP } from "./Gsapconfig";
import GridOverlay from "./Gridoverlay";
import GlobalGrid from "./Globalgrid";
import Navbar from "./Navbar";
import { CtaGlowLine, GridCrosshair } from "./Svgassets";
import { transitionState } from "./Transitionstate";
import { entranceState } from "./Entrancestate";
import MissionStats from "./Missionstats";
import { loadingState } from "./Loadingstate";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

export default function HeroSection() {
  const sectionRef = useRef();
  const heroContentRef = useRef();
  const missionRef = useRef();
  const headingRef = useRef();
  const missionTextRef = useRef();
  const subheadingRef = useRef();
  const ctaRef = useRef();
  const ctaTLRef = useRef(null);
  const ctaTRRef = useRef(null);
  const ctaBLRef = useRef(null);
  const ctaBRRef = useRef(null);

  const gridOverlayRef = useRef();

  const ctaScrambleRef = useRef(null);
  const missionStatsRef = useRef();
  const lastTriggeredStepRef = useRef(0);

  useEffect(() => {
    const setHeight = () => {
      if (heroContentRef.current) {
        heroContentRef.current.style.height = window.innerHeight + "px";
      }
    };
    setHeight();
    const onOrient = () => setTimeout(setHeight, 100);
    window.addEventListener("orientationchange", onOrient);
    return () => window.removeEventListener("orientationchange", onOrient);
  }, []);

  useGSAP(
    () => {
      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

      // ═══════════════════════════════════════
      // STEP 0 — SPLITTEXT + GRADIENT SETUP
      // ═══════════════════════════════════════

      const heroHeadingSplit = SplitText.create(".hero-heading", {
        type: "chars, lines",
        mask: "lines",
        linesClass: "hero-line",
        charsClass: "hero-char",
      });

      // Per-char gradient that spans the FULL heading (not per-line)
      // so the metallic sweep runs seamlessly across both lines
      const headingEl = headingRef.current;
      const headingWidth = headingEl.offsetWidth;
      const headingRect = headingEl.getBoundingClientRect();

      // Batch all reads first — avoids layout thrashing
      const charPositions = heroHeadingSplit.chars.map((char) => {
        const charRect = char.getBoundingClientRect();
        return charRect.left - headingRect.left;
      });

      // Then batch all writes
      heroHeadingSplit.chars.forEach((char, i) => {
        Object.assign(char.style, {
          backgroundImage:
            "linear-gradient(92.7deg, rgb(255,255,255) 21.4%, rgb(151,151,151) 49.6%, rgb(255,255,255) 79.1%)",
          backgroundSize: `${headingWidth}px 100%`,
          backgroundPosition: `-${charPositions[i]}px 0`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        });
      });

      const allChars = heroHeadingSplit.chars;

      // ═══════════════════════════════════════
      // STEP 1 — INITIAL STATES
      // ═══════════════════════════════════════

      gsap.set(heroContentRef.current, { opacity: 0 });

      // All heading chars start hidden below with blur
      gsap.set(allChars, { yPercent: 110, opacity: 0, filter: "blur(14px)" });

      // Subheading — scramble setup
      const heroSubSplit = SplitText.create(".hero-subheading", {
        type: "chars, words, lines",
        mask: "lines",
        linesClass: "hero-line",
        charsClass: "sub-char",
      });

      const asciiChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";
      const subChars = heroSubSplit.chars;
      const originalTexts = subChars.map((c) => c.textContent);

      // Batch reads, then batch writes — avoids layout thrashing
      const subWidths = subChars.map((char) => char.offsetWidth);
      subChars.forEach((char, i) => {
        char.style.display = "inline-block";
        char.style.width = `${subWidths[i]}px`;
        char.style.textAlign = "center";
      });

      gsap.set(heroSubSplit.lines, { yPercent: 0 });
      gsap.set(subheadingRef.current, { opacity: 0 });
      subChars.forEach((char) => {
        char.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
      });

      // CTA — border, text scramble, arrow, glow
      gsap.set(ctaRef.current, { opacity: 0 });

      const ctaBorderPath = document.querySelector(".cta-border-path");
      gsap.set(ctaBorderPath, { drawSVG: "0%" });

      const ctaTextSplit = SplitText.create(".cta-text", {
        type: "chars",
        charsClass: "cta-char",
      });
      const ctaChars = ctaTextSplit.chars;
      const ctaOriginals = ctaChars.map((c) => c.textContent);
      const ctaWidths = ctaChars.map((char) => char.offsetWidth);
      ctaChars.forEach((char, i) => {
        char.style.display = "inline-block";
        char.style.width = `${ctaWidths[i]}px`;
        char.style.textAlign = "center";
      });
      ctaChars.forEach((char) => {
        char.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
      });
      gsap.set(".cta-text", { opacity: 0 });

      ctaScrambleRef.current = { chars: ctaChars, originals: ctaOriginals, asciiChars };

      const arrowPath = document.querySelector(".arrow-path");
      const arrowLen = arrowPath.getTotalLength();
      gsap.set(arrowPath, {
        strokeDasharray: arrowLen,
        strokeDashoffset: arrowLen,
      });
      gsap.set(".cta-arrow", { opacity: 0 });

      gsap.set(".cta-sub", { yPercent: 110 });

      const ctaGlowLines = document.querySelectorAll(".cta-glow-svg line");
      gsap.set(ctaGlowLines, { drawSVG: "50% 50%" });

      gsap.set(missionTextRef.current, { opacity: 0, scale: 0.8, filter: "blur(0px)" });

      // ═══════════════════════════════════════
      // ENTRANCE TIMELINE
      // ═══════════════════════════════════════
      const entrance = gsap.timeline({ paused: true });

      // ── PHASE 0 — BG PLANE NOISE DISSOLVE (0.0 → 2.8) ──
      entrance.to(entranceState, {
        warpProgress: 1, duration: 2.8, ease: "power2.inOut",
      }, 0);
      entrance.to(entranceState, {
        particleOpacity: 1, duration: 1.2, ease: "power2.out",
      }, 1.8);

      // ── PHASE 1 — GRID + OVERLAY REVEAL (2.2 → 3.2) ──
      entrance.to(heroContentRef.current, {
        opacity: 1, duration: 1.0, ease: "power2.inOut",
      }, 2.2);

      entrance.call(() => {
        if (entranceState.playGlobalGrid) entranceState.playGlobalGrid();
      }, null, 2.2);

      entrance.call(() => {
        gridOverlayRef.current?.play();
      }, null, 2.8);

      // ── PHASE 2 — ALL HEADING CHARS STAGGER UP (3.0 → ~4.5) ──
      entrance.to(allChars, {
        yPercent: 0, filter: "blur(0px)", opacity: 1,
        stagger: 0.03, duration: 0.8, ease: "expo.out",
      }, 3.0);

      // ── PHASE 3 — SUBHEADING SCRAMBLE (4.0 → ~4.6) ──
      const isMobileEntrance = window.innerWidth < 1024;

      entrance.to(subheadingRef.current, {
        opacity: 1, duration: 0.3, ease: "power2.out",
      }, 4.0);

      if (isMobileEntrance) {
        // Mobile: single batch scramble instead of per-char onUpdate callbacks
        const proxy = { progress: 0 };
        entrance.to(proxy, {
          progress: 1,
          duration: 0.5,
          ease: "none",
          onUpdate: () => {
            if (proxy.progress < 0.6) {
              for (let j = 0; j < subChars.length; j++) {
                if (originalTexts[j].trim() === "") continue;
                subChars[j].textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
              }
            } else {
              for (let j = 0; j < subChars.length; j++) {
                subChars[j].textContent = originalTexts[j];
              }
            }
          },
        }, 4.0);
      } else {
        subChars.forEach((char, i) => {
          const original = originalTexts[i];
          if (original.trim() === "") return;

          const delay = 4.0 + i * 0.025;
          const proxy = { progress: 0 };

          entrance.to(proxy, {
            progress: 1,
            duration: 0.4,
            ease: "none",
            onUpdate: () => {
              if (proxy.progress < 0.7) {
                char.textContent =
                  asciiChars[Math.floor(Math.random() * asciiChars.length)];
              } else {
                char.textContent = original;
              }
            },
          }, delay);
        });
      }

      // ── CTA REVEAL (4.5 → ~5.8) ──
      entrance.set(ctaRef.current, { opacity: 1 }, 4.5);
      entrance.to(ctaBorderPath, {
        drawSVG: "100%",
        duration: 0.7,
        ease: "power2.inOut",
      }, 4.5);

      entrance.to(".cta-text", {
        opacity: 1, duration: 0.1, ease: "power1.out",
      }, 5.0);

      if (isMobileEntrance) {
        // Mobile: single batch scramble for CTA text
        const ctaProxy = { progress: 0 };
        entrance.to(ctaProxy, {
          progress: 1,
          duration: 0.4,
          ease: "none",
          onUpdate: () => {
            if (ctaProxy.progress < 0.55) {
              for (let j = 0; j < ctaChars.length; j++) {
                if (ctaOriginals[j].trim() === "") continue;
                ctaChars[j].textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
              }
            } else {
              for (let j = 0; j < ctaChars.length; j++) {
                ctaChars[j].textContent = ctaOriginals[j];
              }
            }
          },
        }, 5.0);
      } else {
        ctaChars.forEach((char, i) => {
          const original = ctaOriginals[i];
          if (original.trim() === "") return;

          const delay = 5.0 + i * 0.025;
          const proxy = { progress: 0 };
          entrance.to(proxy, {
            progress: 1,
            duration: 0.35,
            ease: "none",
            onUpdate: () => {
              if (proxy.progress < 0.65) {
                char.textContent =
                  asciiChars[Math.floor(Math.random() * asciiChars.length)];
              } else {
                char.textContent = original;
              }
            },
          }, delay);
        });
      }

      entrance.set(".cta-arrow", { opacity: 1 }, 5.4);
      entrance.to(arrowPath, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.inOut",
      }, 5.4);

      entrance.to(".cta-sub",
        { yPercent: 0, duration: 0.7, ease: "expo.out" }, 5.6);

      entrance.to(ctaGlowLines, {
        drawSVG: "0% 100%",
        duration: 0.6,
        ease: "power2.inOut",
      }, 5.8);

      entrance.call(() => {
        if (entranceState.playNavbar) entranceState.playNavbar();
      }, null, 6.2);

      // ═══════════════════════════════════════
      // SCROLL TIMELINE
      // ═══════════════════════════════════════

      const headingSplit = SplitText.create(".impact-heading", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(headingSplit.lines, { yPercent: 110 });

      const labelSplit = SplitText.create(".impact-label", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(labelSplit.lines, { yPercent: 110 });

      const descSplit = SplitText.create(".impact-desc", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(descSplit.lines, { yPercent: 110 });

      const quoteSplit = SplitText.create(".impact-quote", {
        type: "lines, words", mask: "lines", linesClass: "line", wordsClass: "word",
      });
      gsap.set(quoteSplit.words, { yPercent: 110 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            if (!entranceState.isComplete) return;
            const p = self.progress;
            let targetStep = 0;
            if (p >= 0.88) targetStep = 2;
            else if (p >= 0.76) targetStep = 1;

            if (targetStep !== lastTriggeredStepRef.current) {
              missionStatsRef.current?.animateToStep(targetStep);
              lastTriggeredStepRef.current = targetStep;
            }
          },
          onLeave: () => {
            missionStatsRef.current?.startAutoCycle();
          },
          onEnterBack: () => {
            missionStatsRef.current?.stopAutoCycle();
          },
        },
      });

      // ACT 1 — ZOOM TRANSITION (0.00 → 0.40)
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // ── ACT 1 MOBILE — texts slide up and out, shader transition fires ──
        tl.to("header", { yPercent: -120, duration: 0.08, ease: "power2.in" }, 0);
        tl.to(headingRef.current, { yPercent: -50, opacity: 0, duration: 0.12, ease: "power2.in" }, 0.01);
        tl.to(subheadingRef.current, { yPercent: -50, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.03);
        tl.to(ctaRef.current, { yPercent: -50, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.04);

        tl.set(missionTextRef.current, { scale: 1, filter: "blur(0px)" }, 0.14);
        tl.to(missionTextRef.current, { opacity: 1, duration: 0.06, ease: "power2.out" }, 0.14);
        tl.to(missionTextRef.current, { yPercent: 50, opacity: 0, duration: 0.12, ease: "power2.in" }, 0.22);

        tl.to(transitionState, { zoomProgress: 1, duration: 0.35, ease: "sine.inOut" }, 0.10);
        tl.to(transitionState, { revealProgress: 1, duration: 0.35, ease: "sine.inOut" }, 0.28);

        tl.to(missionRef.current, { opacity: 1, duration: 0.02 }, 0.28);
        tl.set(missionRef.current, { pointerEvents: "auto" }, 0.28);
        tl.set(heroContentRef.current, { pointerEvents: "none" }, 0.38);

        tl.set(heroContentRef.current, { opacity: 1 }, 0);
        tl.to(heroContentRef.current, { opacity: 0, duration: 0.04, ease: "power1.in" }, 0.38);
      } else {
        // ── ACT 1 DESKTOP — existing code, ZERO changes ──
        tl.to(subheadingRef.current,
          { opacity: 0, y: -40, duration: 0.03, ease: "power2.in" }, 0)
          .to(ctaRef.current,
            { opacity: 0, y: -30, duration: 0.03, ease: "power2.in" }, 0.01)
          .to("header",
            { yPercent: -120, duration: 0.03, ease: "power2.in" }, 0)

          .to(headingRef.current,
            { scale: 1.6, opacity: 0, duration: 0.11, ease: "power2.in" }, 0.03)
          .to(headingRef.current,
            { filter: "blur(12px)", duration: 0.06, ease: "power2.in" }, 0.06)

          .to(transitionState,
            { zoomProgress: 1, duration: 0.40, ease: "sine.inOut" }, 0.03)

          .to(missionTextRef.current,
            { scale: 1.8, duration: 0.13, ease: "power2.in" }, 0.14)
          .to(missionTextRef.current,
            { opacity: 1, duration: 0.03, ease: "power2.out" }, 0.14)
          .to(missionTextRef.current,
            { opacity: 0, duration: 0.05, ease: "power2.in" }, 0.22)
          .to(missionTextRef.current,
            { filter: "blur(14px)", duration: 0.05, ease: "power2.in" }, 0.19)

          .to(missionRef.current, { opacity: 1, duration: 0.02 }, 0.28)
          .set(missionRef.current, { pointerEvents: "auto" }, 0.28)
          .set(heroContentRef.current, { pointerEvents: "none" }, 0.40)

          .to(transitionState,
            { revealProgress: 1, duration: 0.40, ease: "sine.inOut" }, 0.28);

        tl.set(heroContentRef.current, { opacity: 1 }, 0)
          .to(heroContentRef.current,
            { opacity: 0, duration: 0.04, ease: "power1.in" }, 0.40);
      }

      // ACT 2 — MISSION STATS (0.55 → 0.95)

      tl.to(labelSplit.lines,
        { yPercent: 0, stagger: 0.02, duration: 0.06, ease: "expo.out" }, 0.55)

        .to(headingSplit.lines,
          { yPercent: 0, stagger: 0.03, duration: 0.1, ease: "expo.out" }, 0.58)

        .to(descSplit.lines,
          { yPercent: 0, stagger: 0.02, duration: 0.08, ease: "expo.out" }, 0.64)

        .to(".screen-card", {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.02, duration: 0.1, ease: "power3.out",
        }, 0.68)

        .to(".marquee-fade", {
          opacity: 1,
          duration: 0.1, ease: "power2.out",
        }, 0.70)

        .to(".frame-corner", {
          opacity: 1,
          stagger: 0.05, duration: 0.08, ease: "power2.out",
        }, 0.72)

        .to(quoteSplit.words,
          { yPercent: 0, stagger: 0.01, duration: 0.1, ease: "expo.out" }, 0.76)

        .to(".stats-arc",
          { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, 0.84)

        .to(".stat-number",
          { opacity: 1, y: 0, duration: 0.06, ease: "power3.out" }, 0.87)

        .to(".stat-sub",
          { opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: "power2.out" }, 0.90)

        .to(".stat-dot",
          { opacity: 1, scale: 1, stagger: 0.015, duration: 0.04, ease: "back.out(2)" }, 0.93);

      // ── After entrance finishes, force scroll timeline to re-capture ──
      entrance.eventCallback("onComplete", () => {
        tl.invalidate();
        tl.progress(tl.progress());
        entranceState.isComplete = true;
      });

      loadingState.onReady = () => entrance.play();
      // If the loader already exited before we registered, play now
      if (loadingState.hasExited) entrance.play();

      }); // fontReady.then
      return () => { cancelled = true; };
    },
    { scope: sectionRef }
  );

  const handleCtaHover = () => {
    // Corners move outward
    gsap.to(ctaTLRef.current, { top: -14, left: -14, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaTRRef.current, { top: -14, right: -14, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaBLRef.current, { bottom: -14, left: -14, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaBRRef.current, { bottom: -14, right: -14, duration: 0.3, ease: "power2.out" });

    const data = ctaScrambleRef.current;
    if (!data) return;

    const { chars, originals, asciiChars } = data;
    const tl = gsap.timeline();

    chars.forEach((char, i) => {
      const original = originals[i];
      if (original.trim() === "") return;

      const proxy = { progress: 0 };
      tl.to(proxy, {
        progress: 1,
        duration: 0.3,
        ease: "none",
        onUpdate: () => {
          if (proxy.progress < 0.6) {
            char.textContent =
              asciiChars[Math.floor(Math.random() * asciiChars.length)];
          } else {
            char.textContent = original;
          }
        },
      }, i * 0.02);
    });
  };

  const handleCtaLeave = () => {
    gsap.to(ctaTLRef.current, { top: -10, left: -10, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaTRRef.current, { top: -10, right: -10, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaBLRef.current, { bottom: -10, left: -10, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaBRRef.current, { bottom: -10, right: -10, duration: 0.3, ease: "power2.out" });
  };

  return (
    <>
    <style>{`
      /* ── Hide GridOverlay's hardcoded lines — replaced by container-edge lines ── */
      .grid-line-left:not(.hero-grid),
      .grid-line-right:not(.hero-grid),
      .grid-line-top:not(.hero-grid),
      .grid-crosshair:not(.hero-grid) {
        display: none !important;
      }

      @media (max-width: 767px) {
        .hero-heading {
          font-size: clamp(2.4rem, 12vw, 4.5rem) !important;
          line-height: 0.9 !important;
        }
        .hero-subheading {
          font-size: clamp(0.8rem, 3.6vw, 1rem) !important;
        }
        .mission-text {
          font-size: clamp(1.35rem, 5.5vw, 1.75rem) !important;
          line-height: 1.3 !important;
          letter-spacing: -0.5px !important;
          max-width: 75% !important;
          margin-left: 0 !important;
          padding-left: calc(clamp(1.25rem, 5vw, 6.5625rem) + 0.75rem) !important;
        }
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        .hero-heading {
          font-size: clamp(3rem, 8vw, 4.5rem) !important;
        }
        .mission-text {
          max-width: 65% !important;
        }
        .hero-subheading {
          max-width: 300px !important;
        }
      }

      @media (min-width: 1024px) and (max-width: 1279px) {
        .mission-text {
          max-width: 75% !important;
        }
        .hero-heading {
          font-size: clamp(4rem, 5.5vw, 5.5rem) !important;
        }
        .hero-subheading {
          font-size: 0.875rem !important;
          max-width: 420px !important;
          margin-bottom: 2rem !important;
        }
        .cta-inner a {
          width: 8.5rem !important;
          height: 2.25rem !important;
        }
        .cta-text {
          font-size: 0.875rem !important;
        }
        .cta-sub span {
          font-size: 0.625rem !important;
        }
      }

      @media (min-width: 160rem) {
        .hero-heading {
          font-size: clamp(10rem, 8vw, 14rem) !important;
        }
        .mission-text {
          font-size: clamp(3.125rem, 2.8vw, 4.5rem) !important;
          max-width: 80% !important;
        }
      }
    `}</style>
    <section
      ref={sectionRef}
      id="home"
      className="relative z-20 w-full min-h-screen"
    >
      {/* ═══ GlobalGrid — topClass aligns exactly with grid-line-top ═══ */}
      <GlobalGrid animated topClass="top-[56px] 5xl:top-[80px]" />

      <GlobalTexture />

      {/* ═══ Hero Content ═══ */}
      <div
        ref={heroContentRef}
        className="absolute inset-x-0 top-0 z-[10] min-h-screen overflow-hidden"
      >
        <GridOverlay ref={gridOverlayRef} showTexture={true}>
          <Navbar entranceDelay={6.2} />

          {/* ── Container (matches MissionStats/CoreOperations/MissionReports) ── */}
          <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem] h-full">

            {/* Crosshair lines at container edges (hero-grid class prevents CSS hide) */}
            <div className="hero-grid grid-line-left pointer-events-none absolute inset-y-0 left-0 w-px bg-white/20 5xl:w-[1.5px] 5xl:bg-white/25 z-50" aria-hidden="true" />
            <div className="hero-grid grid-line-right pointer-events-none absolute inset-y-0 right-0 w-px bg-white/20 5xl:w-[1.5px] 5xl:bg-white/25 z-50" aria-hidden="true" />
            <div className="hero-grid grid-line-top pointer-events-none absolute top-[56px] 5xl:top-[80px] left-0 right-0 h-px bg-white/20 5xl:h-[1.5px] 5xl:bg-white/25 z-50" aria-hidden="true" />
            <GridCrosshair className="hero-grid grid-crosshair pointer-events-none absolute top-[52px] 5xl:top-[76px] -left-1 z-50 5xl:scale-150" aria-hidden="true" />
            <GridCrosshair className="hero-grid grid-crosshair pointer-events-none absolute top-[52px] 5xl:top-[76px] -right-1 z-50 5xl:scale-150" aria-hidden="true" />

            <div className="absolute inset-0 z-40 flex flex-col items-start justify-center md:items-center pl-3 md:pl-0">
              <div className="mb-6 h-[30px] 4xl:h-[50px] 5xl:h-[70px] hidden md:block" />

              <h1
                ref={headingRef}
                className="hero-heading font-bricolage font-medium text-left md:text-center mb-4 max-mob:mb-[2rem] mob:mb-[1.5rem] md:mb-[1rem] lg:mb-[1.2rem] xl:mb-[1.4rem] 2xl:mb-[1.5rem] 3xl:mb-[2rem] 4xl:mb-[2.5rem] 5xl:mb-[3rem] tracking-normal max-w-[80%] max-mob:max-w-[90%] md:max-w-none"
                style={{
                  fontSize: "clamp(90px, 6.5vw, 130px)",
                  lineHeight: 0.78,
                }}
              >
                <span className="hw-eng">We </span><span className="hw-solve">Engineer</span>
                <br />
                <span className="hw-vir">Organic Growth</span>
              </h1>

              <p
                ref={missionTextRef}
                className="mission-text absolute inset-x-0 font-host font-normal text-left md:text-center text-[#a1a1aa]"
                style={{
                  fontSize: "clamp(40px, 2.8vw, 50px)",
                  lineHeight: 1.0,
                  letterSpacing: "-1.5px",
                  maxWidth: "900px",
                  margin: "0 auto",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                A distribution consulting firm that works with Fortune 500 Companies, Unicorn Startups & Enterprises to solve their growth problems through organic <span style={{ color: "#F05A1F" }}>viral</span> content.
                
              </p>

              <p
                ref={subheadingRef}
                className="hero-subheading font-host text-base max-mob:mb-[2rem] mob:mb-[2rem] md:mb-[1.2rem] md:text-xs lg:text-base 4xl:text-2xl 5xl:text-4xl text-[#a1a1aa] text-left md:text-center tracking-[-0.32px] leading-[1.15] max-w-[60%] max-mob:max-w-[60%] sm:max-w-[45%] md:max-w-[540px] 4xl:max-w-[700px] 5xl:max-w-[1000px] mb-5 2xl:mb-[2rem] 4xl:mb-[2.5rem] 5xl:mb-[3rem]"
              >
                Short-form content systems for consumer companies. Built for Polymarket, Deel, Flo Health, The North Face, and Veed.
              </p>

              <div ref={ctaRef} className="flex flex-col items-center gap-2 max-mob:gap-4 5xl:gap-4 max-mob:mt-2">
              <div className="cta-inner overflow-visible 4xl:mb-2">
                <a
                  href="#results"
                  onMouseEnter={handleCtaHover}
                  onMouseLeave={handleCtaLeave}
                  className="relative flex items-center justify-center gap-3 w-40 h-10 max-mob:w-36 max-mob:h-11 md:w-32 md:h-8 lg:w-40 lg:h-10 4xl:w-52 4xl:h-14 5xl:w-80 5xl:h-20 px-1.5 py-2 overflow-visible hover:bg-white/10 transition-colors duration-300"
                >
                  {/* Orange corner brackets */}
                  <span ref={ctaTLRef} className="pointer-events-none absolute md:scale-[0.85] lg:scale-100 4xl:scale-125 5xl:scale-[1.75]" style={{ top: -10, left: -10, width: 8, height: 8, borderTop: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} aria-hidden="true" />
                  <span ref={ctaTRRef} className="pointer-events-none absolute md:scale-[0.85] lg:scale-100 4xl:scale-125 5xl:scale-[1.75]" style={{ top: -10, right: -10, width: 8, height: 8, borderTop: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} aria-hidden="true" />
                  <span ref={ctaBLRef} className="pointer-events-none absolute md:scale-[0.85] lg:scale-100 4xl:scale-125 5xl:scale-[1.75]" style={{ bottom: -10, left: -10, width: 8, height: 8, borderBottom: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} aria-hidden="true" />
                  <span ref={ctaBRRef} className="pointer-events-none absolute md:scale-[0.85] lg:scale-100 4xl:scale-125 5xl:scale-[1.75]" style={{ bottom: -10, right: -10, width: 8, height: 8, borderBottom: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} aria-hidden="true" />
                  <svg
                    className="cta-border absolute"
                    style={{ top: "-1px", left: "-1px", width: "calc(100% + 2px)", height: "calc(100% + 2px)" }}
                    viewBox="0 0 162 42"
                    preserveAspectRatio="none"
                    fill="none"
                    overflow="visible"
                  >
                    <path
                      className="cta-border-path"
                      d="M1,1 L161,1 L161,41 L1,41 Z"
                      stroke="white" strokeWidth="1"
                    />
                  </svg>
                  <span className="cta-text font-host font-medium text-base md:text-sm lg:text-base 4xl:text-xl 5xl:text-3xl text-white text-center tracking-[-0.32px] leading-normal whitespace-nowrap">
                    Go Viral
                  </span>
                  <span className="cta-arrow md:scale-[0.85] lg:scale-100 4xl:scale-125 5xl:scale-[1.75]" style={{ display: "inline-flex", alignItems: "center" }}>
                    <svg
                      className="cta-arrow-svg"
                      width="11"
                      height="11"
                      viewBox="0 0 10 10"
                      fill="none"
                      overflow="visible"
                    >
                      <path
                        className="arrow-path"
                        d="M0.75 8.75L8.75 0.75M8.75 0.75H0.75M8.75 0.75V8.75"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
              <div className="overflow-hidden">
                <div className="cta-sub flex flex-col items-center">
                  <span className="font-host text-xs md:text-[0.625rem] lg:text-xs 4xl:text-[0.95rem] 5xl:text-[1.4rem] text-[#a1a1aa] text-center tracking-[-0.24px] leading-normal -mb-1 4xl:mb-0">
                    Real missions. Real outcomes.
                  </span>
                  <CtaGlowLine className="cta-glow-svg pointer-events-none md:w-[8rem] lg:w-[9rem] xl:w-[11rem] 4xl:w-[14.5rem] 5xl:w-[21rem]" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </GridOverlay>
      </div>

      {/* ═══ MissionStats ═══ */}
      <div ref={missionRef} className="relative z-20 opacity-0 pointer-events-none">
        <MissionStats ref={missionStatsRef} />
      </div>
    </section>
    </>
  );
}