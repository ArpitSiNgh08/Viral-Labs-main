/**
 * Navbar — Glassmorphic nav with layered animations.
 *
 * ENTRANCE (page load):
 *   Controlled via `entranceDelay` prop (default 0.3s) for sync with parent timeline.
 *   Phase 1 — Nav bar slides down from yPercent: -120 → 0
 *   Phase 2 — Text mask reveals (inner wrappers slide up)
 *             Logo icon fades in
 *
 * HOVER — NAV LINKS (after entrance):
 *   Character stagger via text-shadow + translateY.
 *
 * HOVER — CTA "Build Your Engine" + ARROW:
 *   Text: char stagger + centering shift
 *   Arrow: clip-masked slide-in from left + rotate 45° → 0°
 *   Glow line: DrawSVG grows from center outward (50% 50% → 0% 100%)
 *
 * SOUND WAVE BUTTON:
 *   Continuous flowing sine wave generated via phase animation + path recalculation.
 *   Click toggles mute/unmute:
 *     Unmuted → amplitude at 12, wave flows actively. Audio plays.
 *     Muted   → amplitude tweens down to 1, wave becomes nearly flat but still flows. Audio pauses.
 *
 * All initial states via gsap.set() or CSS.
 * All tweens use .to() only.
 * useGSAP hook for cleanup.
 */

import { useRef, useState, useEffect } from "react";
import { gsap, SplitText, DrawSVGPlugin, useGSAP } from "./Gsapconfig";
import { ViralLabsLogo, ViralLabsWordmark, ArrowIcon, NavGlowLine } from "./Svgassets";
import { entranceState } from "./Entrancestate";
import fontReady from "./fontReady";

/* ─── Config ─── */
const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Reports", href: "#reports" },
  { label: "System", href: "#system" },
];

const CHAR_DELAY_INCREMENT = 0.01;

const ARROW_SIZE = 12;
const CTA_GAP = 8;
const TEXT_OFFSET = (ARROW_SIZE + CTA_GAP) / 2;

/* ─── Wave config ─── */
const WAVE_WIDTH = 80;
const WAVE_HEIGHT = 40;
const WAVE_CENTER_Y = 20;
const WAVE_FREQUENCY = 0.08;
const WAVE_RESOLUTION = 1;
const WAVE_UNMUTED_AMPLITUDE = 12;
const WAVE_MUTED_AMPLITUDE = 1;

/* ─── CharSpans — pre-split characters for stagger hover ─── */
function CharSpans({ text }) {
  return [...text].map((char, i) => (
    <span
      key={i}
      className="nav-char"
      style={{
        display: "inline-block",
        position: "relative",
        textShadow: "0px 1.3em currentColor",
        transitionDelay: `${i * CHAR_DELAY_INCREMENT}s`,
        ...(char === " " ? { whiteSpace: "pre" } : {}),
      }}
    >
      {char}
    </span>
  ));
}

/* ─── SoundWaveButton — corner brackets + continuous sine wave ─── */
function SoundWaveButton({ onClick, isPlaying, wavePathRef }) {
  return (
    <button
      onClick={onClick}
      className="sound-wave-btn relative flex items-center justify-center px-1.5 py-1.5 shrink-0 cursor-pointer bg-transparent border-none outline-none"
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
    >
      {/* Top-left */}
      <svg className="absolute top-0 left-0" width="7" height="7" viewBox="0 0 5 5" fill="none">
        <path d="M4.697 0.251H0.251V4.742" stroke="#FF6F21" strokeWidth="0.72" />
      </svg>
      {/* Top-right */}
      <svg className="absolute top-0 right-0" width="7" height="7" viewBox="0 0 5 5" fill="none">
        <path d="M0.303 0.251H4.749V4.742" stroke="#FF6F21" strokeWidth="0.72" />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-0 right-0" width="7" height="7" viewBox="0 0 5 5" fill="none">
        <path d="M0.303 4.749H4.749V0.258" stroke="#FF6F21" strokeWidth="0.72" />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-0 left-0" width="7" height="7" viewBox="0 0 5 5" fill="none">
        <path d="M4.697 4.749H0.251V0.258" stroke="#FF6F21" strokeWidth="0.72" />
      </svg>

      {/* Continuous sine wave */}
      <svg
        className="relative z-10 overflow-hidden"
        width="24"
        height="14"
        viewBox={`0 0 ${WAVE_WIDTH} ${WAVE_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={wavePathRef}
          d=""
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Navbar({ entranceDelay = 0.3 }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerRef = useRef();
  const navRef = useRef();
  const logoAreaRef = useRef();
  const logoIconRef = useRef();
  const logoTextRef = useRef();
  const glowLineRef = useRef();
  const ctaItemRef = useRef();
  const mobileMenuRef = useRef();
  const mobileMenuTlRef = useRef();

  /* Wave refs */
  const wavePathRef = useRef();
  const waveStateRef = useRef({
    phase: 0,
    currentAmplitude: WAVE_MUTED_AMPLITUDE,
  });

  /* Audio ref — create eagerly so iOS Safari authorises playback on first tap */
  const audioRef = useRef(null);
  if (audioRef.current == null) {
    const a = new Audio("/audio/music.mp3");
    a.loop = true;
    a.volume = 0.5;
    a.preload = "auto";
    audioRef.current = a;
  }

  /* ─── Sine wave path generator ─── */
  const generateSineWavePath = () => {
    const { phase, currentAmplitude } = waveStateRef.current;
    const points = Math.floor(WAVE_WIDTH / WAVE_RESOLUTION);
    let path = "";

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * WAVE_WIDTH;
      const y =
        WAVE_CENTER_Y +
        Math.sin(x * WAVE_FREQUENCY + phase) * currentAmplitude;

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }

    return path;
  };

  useGSAP(
    () => {
      let cancelled = false;
      let cleanupListeners = null;
      fontReady.then(() => {
        if (cancelled) return;

      // ── Audio setup deferred to first user interaction (see handleSoundToggle) ──

      // ── Initial states ──
      gsap.set(navRef.current, { yPercent: -120 });
      if (logoIconRef.current) gsap.set(logoIconRef.current, { opacity: 0, scale: 0.8 });

      // ── Logo text — SplitText mask ──
      const logoSplit = SplitText.create(logoTextRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      gsap.set(logoSplit.lines, { yPercent: 110 });
      logoSplit.lines.forEach((line) => {
        const maskWrapper = line.parentElement;
        if (maskWrapper && maskWrapper !== logoTextRef.current) {
          maskWrapper.style.overflowX = "visible";
          maskWrapper.style.overflowY = "clip";
        }
      });

      // ── Nav links + CTA — inner mask wrappers ──
      const linkInners = navRef.current.querySelectorAll(".nav-link-inner");
      gsap.set(linkInners, { yPercent: 110 });

      const ctaInner = navRef.current.querySelector(".nav-cta-inner");
      gsap.set(ctaInner, { yPercent: 110 });

      // ── Sound wave button — starts hidden ──
      const soundBtn = navRef.current.querySelector(".sound-wave-btn");
      gsap.set(soundBtn, { opacity: 0, scale: 0.8 });

      // ── DrawSVG — glow lines start collapsed at center ──
      const glowLines = glowLineRef.current.querySelectorAll("line");
      gsap.set(glowLines, { drawSVG: "50% 50%" });

      // ═══════════════════════════════════════
      // CONTINUOUS SINE WAVE ANIMATION
      // ═══════════════════════════════════════
      gsap.timeline({ repeat: -1, ease: "none" }).to(waveStateRef.current, {
        phase: Math.PI * 4,
        duration: 4,
        ease: "none",
        onUpdate: () => {
          const pathData = generateSineWavePath();
          wavePathRef.current?.setAttribute("d", pathData);
        },
      });

      // ═══════════════════════════════════════
      // HOVER TIMELINES (all paused)
      // ═══════════════════════════════════════
      const glowTl = gsap.timeline({ paused: true });
      glowTl.to(glowLines, {
        drawSVG: "0% 100%",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
      });

      const ctaEl = ctaItemRef.current;
      const onCtaEnter = () => glowTl.play();
      const onCtaLeave = () => glowTl.reverse();

      ctaEl.addEventListener("mouseenter", onCtaEnter);
      ctaEl.addEventListener("mouseleave", onCtaLeave);

      // ═══════════════════════════════════════
      // ENTRANCE TIMELINE
      // ═══════════════════════════════════════
      const tl = gsap.timeline({ paused: true });

      // Phase 1 — Navbar slides down
      tl.to(navRef.current, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Phase 2 — Text reveals
      if (logoIconRef.current) {
        tl.to(
          logoIconRef.current,
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }

      tl.to(
        logoSplit.lines,
        { yPercent: 0, duration: 0.5, ease: "expo.out" },
        "<0.05"
      );

      tl.to(
        linkInners,
        { yPercent: 0, stagger: 0.06, duration: 0.5, ease: "expo.out" },
        "<0.08"
      );

      tl.to(
        ctaInner,
        { yPercent: 0, duration: 0.5, ease: "expo.out" },
        "<0.06"
      );

      // Sound wave button pops in after CTA
      tl.to(
        soundBtn,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "<0.1"
      );

      // ── After entrance: hand off to CSS hover ──
      tl.call(() => {
        gsap.set(linkInners, { clearProps: "transform" });
        gsap.set(ctaInner, { clearProps: "transform" });
        navRef.current.classList.add("hover-ready");
      });

      entranceState.playNavbar = () => tl.play();

      cleanupListeners = () => {
        ctaEl.removeEventListener("mouseenter", onCtaEnter);
        ctaEl.removeEventListener("mouseleave", onCtaLeave);
      };

      }); // fontReady.then
      // ── Cleanup ──
      return () => {
        cancelled = true;
        if (cleanupListeners) cleanupListeners();

        // Audio cleanup
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current = null;
        }
      };
    },
    { scope: headerRef }
  );

  /* ─── Sound toggle handler ─── */
  const handleSoundToggle = () => {
    const next = !isSoundPlaying;
    setIsSoundPlaying(next);

    // ── Audio control ──
    if (next) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }

    // ── Wave amplitude ──
    if (next) {
      gsap.to(waveStateRef.current, {
        currentAmplitude: WAVE_UNMUTED_AMPLITUDE,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      gsap.to(waveStateRef.current, {
        currentAmplitude: WAVE_MUTED_AMPLITUDE,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  /* ─── Mobile menu animation ─── */
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;

    const panel = el.querySelector(".mobile-menu-panel");
    const links = el.querySelectorAll(".mobile-menu-link");

    if (isMobileMenuOpen) {
      // Kill any running close animation
      if (mobileMenuTlRef.current) mobileMenuTlRef.current.kill();

      el.style.pointerEvents = "auto";
      gsap.set(el, { display: "block" });
      gsap.set(panel, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(links, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline();

      // Panel drops down with clip-path reveal
      tl.to(panel, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.45,
        ease: "power3.inOut",
      });

      // Links stagger in with text mask effect (slide up from behind mask)
      tl.to(links, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.4,
        ease: "expo.out",
      }, "-=0.2");

      mobileMenuTlRef.current = tl;
    } else {
      const links = el.querySelectorAll(".mobile-menu-link");
      const panel = el.querySelector(".mobile-menu-panel");

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { display: "none" });
          el.style.pointerEvents = "none";
        },
      });

      // Links slide back down behind mask
      tl.to(links, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 0.25,
        ease: "power2.in",
      });

      // Panel clips back up
      tl.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.35,
        ease: "power3.inOut",
      }, "-=0.1");

      mobileMenuTlRef.current = tl;
    }
  }, [isMobileMenuOpen]);

  /* ─── Styles ─── */
  const navStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(9.5px)",
    WebkitBackdropFilter: "blur(9.5px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderImage:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(102,102,102,0.7) 100%) 1",
  };

  const fontStyle = {
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
  };

  const textClipHeight = "1em";

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════
           CHARACTER STAGGER HOVER
           ═══════════════════════════════════ */
        .nav-char {
          transform: translateY(0em) rotate(0.001deg);
        }

        .hover-ready .nav-char {
          transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-link-item:hover .nav-char,
        .hover-ready .nav-cta-item:hover .nav-char {
          transform: translateY(-1.3em) rotate(0.001deg);
        }

        /* ═══════════════════════════════════
           CTA TEXT — CENTERING SHIFT
           ═══════════════════════════════════ */
        .cta-text-shift {
          transform: translateX(${TEXT_OFFSET}px);
        }

        .hover-ready .cta-text-shift {
          transition: transform 0.5s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-cta-item:hover .cta-text-shift {
          transform: translateX(0px);
        }

        /* ═══════════════════════════════════
           CTA ARROW — CLIP MASK REVEAL
           ═══════════════════════════════════ */
        .cta-arrow-clip {
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${ARROW_SIZE}px;
          height: ${ARROW_SIZE}px;
          flex-shrink: 0;
        }

        .cta-arrow-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-150%) rotate(45deg);
        }

        .hover-ready .cta-arrow-inner {
          transition: transform 0.5s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-cta-item:hover .cta-arrow-inner {
          transform: translateX(0%) rotate(0deg);
        }

        /* ═══════════════════════════════════
           TEXT CLIP WRAPPER
           ═══════════════════════════════════ */
        .text-clip {
          display: inline-block;
          position: relative;
          overflow: hidden;
          height: ${textClipHeight};
          line-height: ${textClipHeight};
          padding-right: 2px;
        }

        /* ═══════════════════════════════════
           SOUND WAVE BUTTON HOVER
           ═══════════════════════════════════ */
        .sound-wave-btn {
          transition: opacity 0.3s ease;
        }
        .sound-wave-btn:hover {
          opacity: 0.8;
        }

        /* ── 5xl navbar scale-up ── */
        @media (min-width: 240rem) {
          header nav {
            gap: 3rem !important;
          }
          .text-clip {
            height: 1.25em !important;
            line-height: 1.25em !important;
            display: inline-flex !important;
            align-items: center !important;
          }
        }
      `}</style>

      <header
        ref={headerRef}
        className="absolute top-[9px] left-0 w-full flex justify-center z-50"
      >
        <nav
          ref={navRef}
          className="relative flex items-center justify-between gap-4 px-4 md:px-5 4xl:px-8 5xl:px-10 py-1 5xl:py-3 overflow-hidden w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] md:w-[95%] md:max-w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] xl:w-auto xl:max-w-none xl:inline-flex xl:justify-center xl:gap-9"
          style={navStyle}
        >
          {/* ── Logo ── */}
          <a
            ref={logoAreaRef}
            href="#home"
            className="flex items-center gap-0 shrink-0 cursor-pointer"
            aria-label="Viral Labs Home"
          >
            {/* <span
              ref={logoIconRef}
              className="inline-flex items-center justify-center"
            >
              <ViralLabsLogo className="w-[16px] h-[16px] 4xl:w-5 4xl:h-5 5xl:w-8 5xl:h-8 translate-y-[1px]" />
            </span> */}
            <span
              ref={logoTextRef}
              className="inline-flex items-center pr-1"
            >
              <ViralLabsWordmark className="h-3 md:h-[0.85rem] 4xl:h-4 5xl:h-6 w-auto" />
            </span>
          </a>

          {/* ── Center Group: Nav Links + CTA (absolutely centered on md+) ── */}
          <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 md:items-center md:gap-4 lg:gap-6 4xl:gap-8 5xl:gap-10 xl:static xl:translate-x-0 xl:contents">
            <div className="inline-flex items-center gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav(item.label);
                    gsap.to(window, {
                      scrollTo: { y: item.href, offsetY: 0 },
                      duration: 4,
                      ease: "power2.inOut",
                    });
                  }}
                  className="nav-link-item relative inline-flex items-center font-bricolage font-light text-white text-sm 4xl:text-base 5xl:text-xl text-center tracking-[-0.56px] leading-none"
                  style={fontStyle}
                  aria-current={activeNav === item.label ? "page" : undefined}
                >
                  <span className="text-clip">
                    <span className="nav-link-inner inline-block">
                      <CharSpans text={item.label} />
                    </span>
                  </span>
                </a>
              ))}
            </div>

            {/* ── CTA Button with Glow ── */}
            <div className="relative inline-flex items-center justify-center py-0">
            <a
              ref={ctaItemRef}
              href="#go-viral"
              className="nav-cta-item inline-flex items-center justify-center gap-2"
            >
              <span className="cta-text-shift">
                <span className="text-clip">
                  <span className="nav-cta-inner inline-block">
                    <span
                      className="font-bricolage font-thin text-white text-sm 4xl:text-base 5xl:text-xl text-center tracking-[-0.56px] leading-none"
                      style={fontStyle}
                    >
                      <CharSpans text="Build Your Engine" />
                    </span>
                  </span>
                </span>
              </span>

              <span className="cta-arrow-clip">
                <span className="cta-arrow-inner">
                  <ArrowIcon size={ARROW_SIZE} />
                </span>
              </span>
            </a>

            <NavGlowLine
              ref={glowLineRef}
              className="absolute bottom-0 -left-5 w-[calc(100%+40px)] pointer-events-none"
            />
            </div>
          </div>

          {/* ── Sound Wave + Hamburger (grouped on mobile) ── */}
          <div className="flex items-center gap-3">
            <span className="4xl:scale-125 5xl:scale-[1.75] origin-center">
              <SoundWaveButton
                onClick={handleSoundToggle}
                isPlaying={isSoundPlaying}
                wavePathRef={wavePathRef}
              />
            </span>

            <button
              className="md:hidden p-1"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <img src="/images/hamburger Menu.png" alt="Menu" className="w-6 h-6 object-contain" />
            </button>
          </div>

          {/* ── Glow lights ── */}
          <div
            className="hidden md:block absolute top-0 -left-[35px] w-9 h-9 5xl:w-12 5xl:h-12 rounded-[18px] pointer-events-none"
            style={{ background: "white", filter: "blur(17px)" }}
            aria-hidden="true"
          />
          <div
            className="hidden md:block absolute -top-[15px] -right-9 w-9 h-9 5xl:w-12 5xl:h-12 rounded-[18px] pointer-events-none"
            style={{ background: "#fbe7d4", filter: "blur(17px)" }}
            aria-hidden="true"
          />
        </nav>

        {/* ── Mobile Dropdown Menu ── */}
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full mt-1 z-40"
          style={{ display: "none", pointerEvents: "none" }}
        >
          <div
            className="mobile-menu-panel w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(9.5px)",
              WebkitBackdropFilter: "blur(9.5px)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderImage:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(102,102,102,0.7) 100%) 1",
            }}
          >
            <div className="flex flex-col py-4 px-4 gap-3">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item.label);
                      setIsMobileMenuOpen(false);
                      gsap.to(window, {
                        scrollTo: { y: item.href, offsetY: 0 },
                        duration: 8,
                        ease: "back.out",
                      });
                    }}
                    className="mobile-menu-link block font-bricolage font-light text-white text-sm tracking-[-0.56px] leading-none py-2"
                    style={fontStyle}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}