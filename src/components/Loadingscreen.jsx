/**
 * LoadingScreen — fullscreen loader with video loop + progress bar.
 *
 * DESIGN:
 *   - Video fills entire viewport, loops
 *   - Bottom bar overlays video (transparent background)
 *   - "0%" left, "100%" right, with corner bracket marks
 *   - Orange glowing SVG progress line grows from 0 to 100
 *   - Gray static line sits underneath as track
 *
 * EXIT:
 *   When loading completes (progress counter ≥ 99):
 *   1. loadingState.onReady() fires IMMEDIATELY → entrance timeline starts
 *   2. Bottom bar fades out (0.3s)
 *   3. Video fades to black via overlay (0.5s)
 *   4. Wrapper fades to opacity 0 (0.6s, starts at 0.3s)
 *   5. The shader radial-noise reveal (entranceState.warpProgress)
 *      runs in parallel underneath — it IS the visual transition.
 *   No slide-up. The shader dissolve replaces the loader.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, useGSAP } from "./Gsapconfig";
import * as THREE from "three";
import { loadingState } from "./Loadingstate";

const CORNER = "#F05A1F";
function EnterCorners() {
  const s = { position: "absolute", width: 8, height: 8, pointerEvents: "none" };
  return (
    <>
      <span style={{ ...s, top: -10, left: -10, borderTop: `1.5px solid ${CORNER}`, borderLeft: `1.5px solid ${CORNER}` }} />
      <span style={{ ...s, top: -10, right: -10, borderTop: `1.5px solid ${CORNER}`, borderRight: `1.5px solid ${CORNER}` }} />
      <span style={{ ...s, bottom: -10, left: -10, borderBottom: `1.5px solid ${CORNER}`, borderLeft: `1.5px solid ${CORNER}` }} />
      <span style={{ ...s, bottom: -10, right: -10, borderBottom: `1.5px solid ${CORNER}`, borderRight: `1.5px solid ${CORNER}` }} />
    </>
  );
}

/* ── Inline SVG components ── */
const WhiteLine = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="none"
    viewBox="0 0 901 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="0.5" x2="901" y2="0.5" stroke="#747271" />
  </svg>
);

const IS_MOBILE_LOADER = typeof window !== "undefined" && window.innerWidth < 1024;

export const bgAudio = typeof window !== "undefined" ? new Audio("/audio/music.mp3") : null;
if (bgAudio) { bgAudio.loop = true; bgAudio.volume = 0.4; }

const OrangeLine = () => (
  <svg
    className="w-full h-full"
    preserveAspectRatio="none"
    viewBox="0 0 107 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Widest ambient glow */}
    <g filter="url(#glow-ambient)">
      <line x1="0" y1="10" x2="107" y2="10" stroke="#FF3D00" strokeWidth="1" />
    </g>
    {/* Mid + inner glow — skip on mobile */}
    {!IS_MOBILE_LOADER && (
      <>
        <g filter="url(#glow-mid)">
          <line x1="0" y1="10" x2="107" y2="10" stroke="#FF5522" strokeWidth="2" />
        </g>
        <g filter="url(#glow-inner)">
          <line x1="0" y1="10" x2="107" y2="10" stroke="#FF6B35" strokeWidth="1.5" />
        </g>
      </>
    )}
    {/* Core line — bright orange */}
    <line x1="0" y1="10" x2="107" y2="10" stroke="#FF6A2A" strokeWidth="1" />
    {/* Hot white center */}
    <g filter="url(#glow-core)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="0" y1="10" x2="107" y2="10" stroke="#FFCFAA" strokeWidth="0.5" />
    </g>
    <defs>
      <filter id="glow-ambient" x="-8" y="-2" width="123" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="bg" />
        <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
        <feGaussianBlur stdDeviation="4" result="blur" />
      </filter>
      {!IS_MOBILE_LOADER && (
        <>
          <filter id="glow-mid" x="-5" y="2" width="117" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
            <feGaussianBlur stdDeviation="2.5" result="blur" />
          </filter>
          <filter id="glow-inner" x="-3" y="4" width="113" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
            <feGaussianBlur stdDeviation="1.2" result="blur" />
          </filter>
        </>
      )}
      <filter id="glow-core" x="-2" y="5" width="111" height="10" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="bg" />
        <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
        <feGaussianBlur stdDeviation="0.6" result="blur" />
      </filter>
    </defs>
  </svg>
);

/* ── Corner bracket components ── */
const bracketBase = {
  position: "absolute",
  pointerEvents: "none",
  width: "0.6vw",
  height: "0.6vw",
};
const bColor = "#F05A1F";

/* 0% side — only LEFT brackets (top-left + bottom-left) */
const LeftBrackets = () => (
  <>
    <span style={{ ...bracketBase, top: "-0.5vw", left: "-0.6vw", borderTop: `1px solid ${bColor}`, borderLeft: `1px solid ${bColor}` }} />
    <span style={{ ...bracketBase, bottom: "-0.5vw", left: "-0.6vw", borderBottom: `1px solid ${bColor}`, borderLeft: `1px solid ${bColor}` }} />
  </>
);

/* 100% side — only RIGHT brackets (top-right + bottom-right) */
const RightBrackets = () => (
  <>
    <span style={{ ...bracketBase, top: "-0.5vw", right: "-0.6vw", borderTop: `1px solid ${bColor}`, borderRight: `1px solid ${bColor}` }} />
    <span style={{ ...bracketBase, bottom: "-0.5vw", right: "-0.6vw", borderBottom: `1px solid ${bColor}`, borderRight: `1px solid ${bColor}` }} />
  </>
);

export default function LoadingScreen({ videoSrc = "/videos/loader.webm" }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const orangeClipRef = useRef(null);
  const percentTextRef = useRef(null);
  const dotRef = useRef(null);
  const hasExited = useRef(false);

  const [videoReady, setVideoReady] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [readyToEnter, setReadyToEnter] = useState(false);
  const enterBtnRef = useRef(null);

  const progressSources = useRef({ three: 0, fonts: 0, video: 0 });
  const displayProgress = useRef({ value: 0 });

  const updateProgress = useCallback(() => {
    const { three, fonts, video } = progressSources.current;
    const real = three * 0.7 + fonts * 0.15 + video * 0.15;
    const clamped = Math.max(loadingState.progress, Math.min(real, 1));
    loadingState.progress = clamped;
  }, []);

  // ══════════════════════════════════════════
  // EXIT — shader reveal replaces slide-up
  // ══════════════════════════════════════════
  const runExitAnimation = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;

    loadingState.hasExited = true;
    if (loadingState.onReady) loadingState.onReady();

    const tl = gsap.timeline({
      onComplete: () => setRemoved(true),
    });

    tl.set(wrapperRef.current, { pointerEvents: "none" }, 0);

    tl.to(".loader-bottom-bar", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, 0);

    tl.to(videoOverlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.in",
    }, 0);

    tl.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, 0.3);
  }, []);

  // ── Try complete ──
  const tryComplete = useCallback(() => {
    const { three, fonts, video } = progressSources.current;
    if (three >= 1 && fonts >= 1 && video >= 1 && !loadingState.isComplete) {
      loadingState.isComplete = true;
      loadingState.progress = 1;

      const waitForCounter = setInterval(() => {
        if (displayProgress.current.value >= 99) {
          clearInterval(waitForCounter);
          setReadyToEnter(true);
        }
      }, 50);
    }
  }, []);

  // ══════════════════════════════════════════
  // GSAP ANIMATIONS — useGSAP
  // ══════════════════════════════════════════

  // ── Progress bar tick + percentage counter (gsap.ticker) ──
  useGSAP(
    () => {
      const tick = () => {
        const target = loadingState.progress * 100;
        const current = displayProgress.current.value;
        displayProgress.current.value += (target - current) * 0.12;

        if (orangeClipRef.current) {
          orangeClipRef.current.style.width = `${displayProgress.current.value}%`;
        }

        if (dotRef.current) {
          dotRef.current.style.left = `${displayProgress.current.value}%`;
        }

        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${Math.round(displayProgress.current.value)}%`;
        }
      };

      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: wrapperRef }
  );

  // ── Animate enter button in when ready ──
  useEffect(() => {
    if (!readyToEnter || !enterBtnRef.current) return;
    gsap.fromTo(enterBtnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [readyToEnter]);

  const handleEnter = useCallback(() => {
    bgAudio?.play().catch(() => {});
    runExitAnimation();
  }, [runExitAnimation]);

  // ── Fade video in when buffered ──
  useGSAP(
    () => {
      if (videoReady && videoOverlayRef.current) {
        gsap.to(videoOverlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
    { scope: wrapperRef, dependencies: [videoReady] }
  );

  // ══════════════════════════════════════════
  // EVENT LISTENERS — useEffect (not GSAP)
  // ══════════════════════════════════════════

  // ── THREE.DefaultLoadingManager ──
  useEffect(() => {
    const mgr = THREE.DefaultLoadingManager;
    let threeStarted = false;
    let threeForcedComplete = false;
    const origOnStart = mgr.onStart;

    mgr.onStart = (url, loaded, total) => {
      threeStarted = true;
      if (origOnStart) origOnStart(url, loaded, total);
    };

    mgr.onProgress = (url, loaded, total) => {
      threeStarted = true;
      if (threeForcedComplete) return;
      progressSources.current.three = total > 0 ? loaded / total : 0;
      updateProgress();
      tryComplete();
    };

    mgr.onLoad = () => {
      progressSources.current.three = 1;
      updateProgress();
      tryComplete();
    };

    // 2s: if nothing started loading, mark three done.
    // 8s: if loading started but hasn't finished, force-complete.
    const earlyFallback = setTimeout(() => {
      if (!threeStarted) {
        threeForcedComplete = true;
        progressSources.current.three = 1;
        updateProgress();
        tryComplete();
      }
    }, 2000);
    const lateFallback = setTimeout(() => {
      if (progressSources.current.three < 1) {
        threeForcedComplete = true;
        progressSources.current.three = 1;
        updateProgress();
        tryComplete();
      }
    }, 8000);

    return () => {
      clearTimeout(earlyFallback);
      clearTimeout(lateFallback);
      mgr.onStart = origOnStart || null;
      mgr.onProgress = null;
      mgr.onLoad = null;
    };
  }, [updateProgress, tryComplete]);

  // ── Fonts ──
  useEffect(() => {
    let fontsResolved = false;

    if (document.fonts.status === "loaded") {
      fontsResolved = true;
      progressSources.current.fonts = 1;
      updateProgress();
      tryComplete();
    }

    document.fonts.ready.then(() => {
      fontsResolved = true;
      clearInterval(interval);
      progressSources.current.fonts = 1;
      updateProgress();
      tryComplete();
    });

    const interval = setInterval(() => {
      if (fontsResolved) return;
      const entries = [...document.fonts.values()];
      const total = entries.length || 1;
      const loaded = entries.filter((f) => f.status === "loaded").length;
      progressSources.current.fonts = loaded / total;
      updateProgress();
    }, 200);

    return () => clearInterval(interval);
  }, [updateProgress, tryComplete]);

  // ── Video ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      progressSources.current.video = 1;
      updateProgress();
      setVideoReady(true);
      tryComplete();
    };

    if (video.readyState >= 4) {
      onCanPlay();
      return;
    }

    const onProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        progressSources.current.video = Math.min(buffered / video.duration, 0.95);
        updateProgress();
      }
    };

    const onError = () => {
      console.warn("Loader video failed — skipping.");
      progressSources.current.video = 1;
      updateProgress();
      tryComplete();
    };

    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("progress", onProgress);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("error", onError);
    };
  }, [updateProgress, tryComplete]);

  // ── Safety timeout ──
  useEffect(() => {
    const maxWait = setTimeout(() => {
      if (!loadingState.isComplete) {
        console.warn("Loading timeout — forcing completion.");
        progressSources.current.three = 1;
        progressSources.current.fonts = 1;
        progressSources.current.video = 1;
        loadingState.progress = 1;
        loadingState.isComplete = true;

        const waitForCounter = setInterval(() => {
          if (displayProgress.current.value >= 99) {
            clearInterval(waitForCounter);
            setReadyToEnter(true);
          }
        }, 50);
      }
    }, 8000);

    return () => clearTimeout(maxWait);
  }, [runExitAnimation]);

  if (removed) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999]"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Video (fills entire viewport) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
      <div
        ref={videoOverlayRef}
        className="absolute inset-0"
        style={{ background: "#0a0a0a" }}
      />

      {/* ── Enter button — shown when loading is complete ── */}
      {readyToEnter && (
        <div
          ref={enterBtnRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
          style={{ opacity: 0 }}
          onClick={handleEnter}
        >
          <div className="relative">
            <EnterCorners />
            <div
              className="flex items-center justify-center border border-white/30 hover:bg-white/5 transition-colors duration-300"
              style={{ padding: "clamp(0.6rem,1.5vw,1.1rem) clamp(1.8rem,4vw,3rem)" }}
            >
              <span
                className="font-host text-white tracking-[0.25em] uppercase text-center"
                style={{ fontSize: "clamp(0.8rem,1.4vw,1.1rem)", fontWeight: 300 }}
              >
                click anywhere to unveil
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Bottom bar — transparent, overlays video ═══ */}
      <div
        className="loader-bottom-bar absolute left-0 right-0 bottom-0 z-10"
        style={{ padding: "0 6.5vw 4.5vh" }}
      >
        <div
          className="flex items-center"
          style={{ gap: "1.5vw" }}
        >
          {/* ── 0% label — LEFT brackets only ── */}
          <div className="relative flex-shrink-0" style={{ padding: "0.3vw 0.5vw" }}>
            <LeftBrackets />
            <span
              className="font-host block"
              style={{
                fontSize: "clamp(24px, 3.2vw, 50px)",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#FFFFFF",
                textAlign: "center",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0%
            </span>
          </div>

          {/* ── Progress track ── */}
          <div className="relative flex-1" style={{ height: "1.2vw" }}>
            {/* Gray static line (track) */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: "50%",
                height: "1px",
                transform: "translateY(-50%)",
              }}
            >
              <WhiteLine />
            </div>

            {/* Orange glow line (grows via width clip) */}
            <div
              ref={orangeClipRef}
              className="absolute left-0 top-0 h-full overflow-hidden"
              style={{
                width: "0%",
                maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
              }}
            >
              <div
                className="h-full"
                style={{
                  width: "100vw",
                  maxWidth: "calc(100vw - 28vw)",
                }}
              >
                <OrangeLine />
              </div>
            </div>

            {/* Soft glow at progress tip */}
            <div
              ref={dotRef}
              className="absolute"
              style={{
                top: "50%",
                left: "0%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                width: "1.4vw",
                height: "1.4vw",
                background: "radial-gradient(circle, rgba(255,120,50,0.5) 0%, rgba(255,70,20,0.15) 35%, transparent 70%)",
                animation: "orbPulse 1.8s ease-in-out infinite",
                mixBlendMode: "plus-lighter",
              }}
            />

            {/* Pulse animation */}
            <style>{`
              @keyframes orbPulse {
                0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
              }
            `}</style>

          </div>

          {/* ── 100% label — RIGHT brackets only, animated counter ── */}
          <div className="relative flex-shrink-0" style={{ padding: "0.3vw 0.5vw" }}>
            <RightBrackets />
            <span
              ref={percentTextRef}
              className="font-host block"
              style={{
                fontSize: "clamp(24px, 3.2vw, 50px)",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#FFFFFF",
                textAlign: "center",
                fontVariantNumeric: "tabular-nums",
                minWidth: "3.5ch",
              }}
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}