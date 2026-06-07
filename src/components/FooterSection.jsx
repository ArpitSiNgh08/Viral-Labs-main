import React, { useRef, useEffect } from "react";
import { gsap, SplitText, useGSAP } from "./Gsapconfig";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

/* ─── BG image ─── */
const FooterBG = "/images/Footer_BG.webp";

/* ─── Clock config ─── */
const CLOCKS = [
  { city: "New York", tz: "America/New_York", label: "EDT" },
  { city: "San Francisco", tz: "America/Los_Angeles", label: "PDT" },
  { city: "London", tz: "Europe/London", label: "GMT" },
  { city: "Bangalore", tz: "Asia/Kolkata", label: "IST" },
];

/* ─── Scramble characters ─── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

/* ─── Nav links ─── */
const NAV_COL_1 = [
  { label: "Home", target: "#home" },
  { label: "Services", target: "#services" },
  { label: "Viral Engine", target: "#system" },
];
const NAV_COL_2 = [
  { label: "Case Studies", target: "#reports" },
  { label: "Contact", target: null },
];
const NAV_MOBILE = [
  { label: "Home", target: "#home" },
  { label: "Services", target: "#services" },
  { label: "Viral Engine", target: "#system" },
  { label: "Case Studies", target: "#reports" },
  { label: "Contact", target: null },
];

const smoothScrollTo = (e, target) => {
  e.preventDefault();
  if (!target) return;
  if (target === "#home") {
    window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.querySelector(target);
    if (el) window.__lenis ? window.__lenis.scrollTo(el) : el.scrollIntoView({ behavior: "smooth" });
  }
};

/* ─── Corner bracket default/hover offsets ─── */
const CORNER_DEFAULT = -8;
const CORNER_HOVER = -12;

/* ─── Arrow SVG component ─── */
const ArrowIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 md:w-2.5 md:h-2 md:ml-1 lg:w-3 lg:h-2 lg:ml-1 xl:w-3.5 xl:h-2.5 xl:ml-1.5 2xl:w-4 2xl:h-3 2xl:ml-2 4xl:w-5 4xl:h-4 5xl:w-6 5xl:h-5 5xl:ml-[5.5rem]">
    <path d="M7.92285 11.8463L6.65722 10.5554L10.3275 6.83441H0V5.0119H10.3275L6.65722 1.29094L7.92285 0L13.846 5.92315L7.92285 11.8463Z" fill="white" />
  </svg>
);

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */

const FooterSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const btnRef = useRef(null);
  const btnTextRef = useRef(null);
  const clocksRowRef = useRef(null);
  const footerBarRef = useRef(null);
  const logoNameRef = useRef(null);
  const taglineRef = useRef(null);
  const navCol1Ref = useRef(null);
  const navCol2Ref = useRef(null);
  const socialsRef = useRef(null);
  const copyLeftRef = useRef(null);
  const copyRightRef = useRef(null);

  /* corner bracket refs for button */
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  /* scramble state */
  const scrambleInterval = useRef(null);
  const originalText = "Reachout";

  /* ─── Button hover: scramble + corner spread ─── */
  const handleBtnEnter = () => {
    gsap.to(tlRef.current, { x: CORNER_HOVER - CORNER_DEFAULT, y: CORNER_HOVER - CORNER_DEFAULT, duration: 0.3, ease: "power2.out" });
    gsap.to(trRef.current, { x: -(CORNER_HOVER - CORNER_DEFAULT), y: CORNER_HOVER - CORNER_DEFAULT, duration: 0.3, ease: "power2.out" });
    gsap.to(blRef.current, { x: CORNER_HOVER - CORNER_DEFAULT, y: -(CORNER_HOVER - CORNER_DEFAULT), duration: 0.3, ease: "power2.out" });
    gsap.to(brRef.current, { x: -(CORNER_HOVER - CORNER_DEFAULT), y: -(CORNER_HOVER - CORNER_DEFAULT), duration: 0.3, ease: "power2.out" });

    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    let iteration = 0;
    const text = originalText;
    scrambleInterval.current = setInterval(() => {
      if (!btnTextRef.current) return;
      btnTextRef.current.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return char;
          if (i < iteration) return text[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(scrambleInterval.current);
        btnTextRef.current.textContent = text;
      }
    }, 35);
  };

  const handleBtnLeave = () => {
    gsap.to(tlRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(trRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(blRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(brRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });

    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    if (btnTextRef.current) btnTextRef.current.textContent = originalText;
  };

  /* Lock button text width so scramble doesn't resize it */
  useEffect(() => {
    if (btnTextRef.current) {
      // Read first, then write — avoids forced reflow
      const w = btnTextRef.current.offsetWidth;
      btnTextRef.current.style.display = "inline-block";
      btnTextRef.current.style.width = `${w}px`;
    }
  }, []);

  /* ─── Scroll-triggered entrance animations ─── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let cancelled = false;
      const splits = [];
      fontReady.then(() => {
        if (cancelled) return;

      /* ── CTA heading split ── */
      const headingSplit = SplitText.create(headingRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      splits.push(headingSplit);

      /* Set initial states — CTA */
      gsap.set(headingSplit.lines, { y: "100%" });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set(btnRef.current, { opacity: 0, y: 15 });
      gsap.set(clocksRowRef.current, { opacity: 0, y: 30 });

      /* CTA entrance timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(headingSplit.lines, { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" })
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4)
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.6)
        .to(clocksRowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.7);

      /* ── Footer bar reveals — simple opacity+y, no SplitText ── */
      const footerEls = [logoNameRef, taglineRef, navCol1Ref, navCol2Ref, copyLeftRef, copyRightRef];
      footerEls.forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 0, y: 20 });
      });
      gsap.set(socialsRef.current, { opacity: 0, y: 15 });

      /* Footer entrance timeline */
      const ftl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          once: true,
        },
      });

      ftl.to(logoNameRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" })
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.15)
        .to(navCol1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.2)
        .to(navCol2Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.3)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.35)
        .to(copyLeftRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.5)
        .to(copyRightRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.55);

      }); // fontReady.then
      return () => {
        cancelled = true;
        splits.forEach((s) => s && s.revert());
      };
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="footer-section relative w-full overflow-hidden md:-mt-[12rem] lg:-mt-[20rem] xl:-mt-[25rem] 2xl:-mt-[30rem] 3xl:-mt-[37.5rem] 4xl:-mt-[50rem] 5xl:-mt-[75rem]" style={{ aspectRatio: "1440 / 1484" }}>
      <style>{`@media(max-width:767px){.footer-section{aspect-ratio:unset!important;min-height:100vh}}@media(max-width:25rem){.clock-face-lg{width:3.75rem!important;height:3.75rem!important}}@media(min-width:25rem) and (max-width:639px){.clock-face-lg{width:4.25rem!important;height:4.25rem!important}}@media(min-width:768px) and (max-width:1023px){.clock-face-lg{width:3.5rem!important;height:3.5rem!important}}@media(min-width:1024px){.clock-face-lg{width:clamp(4.5rem,2.5rem+3.9vw,16rem)!important;height:clamp(4.5rem,2.5rem+3.9vw,16rem)!important}}@media(min-width:1024px) and (max-width:1279px){.clock-face-lg{width:4.25rem!important;height:4.25rem!important}}@media(min-width:1280px) and (max-width:1535px){.clock-face-lg{width:5rem!important;height:5rem!important}}@media(min-width:1536px) and (max-width:1919px){.clock-face-lg{width:6rem!important;height:6rem!important}}@media(min-width:1920px) and (max-width:2559px){.clock-face-lg{width:7.5rem!important;height:7.5rem!important}}@media(min-width:2560px) and (max-width:3839px){.clock-face-lg{width:10rem!important;height:10rem!important}}@media(min-width:3840px){.clock-face-lg{width:15rem!important;height:15rem!important}}`}</style>
      <GlobalTexture />

      {/* ─── Background image ─── */}
      <div className="absolute inset-0">
        {/* Mobile BG */}
        <img
          src="/images/footer-mobile.webp"
          alt=""
          className="absolute -right-[18%] top-0 h-auto w-[55%] object-contain object-top-right md:hidden"
          style={{ mixBlendMode: "lighten" }}
          draggable={false}
          loading="lazy"
        />
        {/* Desktop BG */}
        <img
          src={FooterBG}
          alt=""
          className="w-full h-full object-cover hidden md:block"
          style={{ mixBlendMode: "lighten" }}
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex h-full flex-col w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem] 5xl:max-w-[250rem]">

        {/* ═══ CTA AREA ═══ */}
        <div className="flex flex-1 flex-col items-start md:items-center pt-40 max-mob:pt-28 pb-12 max-mob:pb-8 text-left md:text-center px-6 max-mob:px-4 max-md:!-ml-[1.5vw] max-md:!pl-2 sm:pt-36 sm:pb-12 md:px-0 md:pt-65 md:pb-4 lg:pt-85 lg:pb-6 xl:pt-106 xl:pb-8 2xl:pt-128 2xl:pb-10 3xl:pt-160 3xl:pb-12 4xl:pt-206 4xl:pb-16 5xl:pt-324 5xl:pb-24">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-bricolage text-left md:text-center text-3xl max-mob:text-2xl max-mob:leading-[1.08] max-mob:max-w-44 max-mob:mb-2 mob:mb-2.5 sm:mb-3 font-normal leading-[1.05] tracking-tight text-white max-w-[14rem] sm:text-4xl sm:max-w-[18rem] md:max-w-none md:text-4xl md:mb-0 lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[9rem] 5xl:text-[13rem]"
          >
            Engineering <br />organic growth<br />starts here
          </h2>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="mt-2 max-w-[14rem] max-mob:text-xs max-mob:max-w-48 max-mob:mb-1.5 mob:mb-2 sm:mb-2.5 md:mb-0 sm:max-w-[18rem] md:max-w-[18rem] lg:max-w-[27rem] xl:max-w-[34rem] 2xl:max-w-[40rem] 3xl:max-w-[50rem] 4xl:max-w-[66rem] 5xl:max-w-[100rem] font-host text-sm font-thin leading-tight text-white/70 text-left md:text-center sm:text-base md:text-[0.57rem] lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-3xl 5xl:text-4xl sm:mt-2 4xl:mt-4 5xl:mt-6"
            style={{ opacity: 0 }}
          >
            If you're done with guesswork and ready to scale through 
            structured distribution, let's build your engine.
          </p>

          {/* CTA Button — corner brackets + scramble, no bevel */}
          <div
            ref={btnRef}
            className="relative mt-5 inline-block cursor-pointer md:mt-6 4xl:mt-10 5xl:mt-14"
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            onClick={() => { window.location.href = "mailto:eashan@aydus.co"; }}
            style={{ opacity: 0 }}
          >
            {/* Corner brackets — positioned via top/left/right/bottom, animated via transform only */}
            <span ref={tlRef} className="pointer-events-none absolute w-2 h-2 mob:w-2.5 mob:h-2.5 md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-5 5xl:h-5" style={{ top: CORNER_DEFAULT, left: CORNER_DEFAULT, borderTop: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={trRef} className="pointer-events-none absolute w-2 h-2 mob:w-2.5 mob:h-2.5 md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-5 5xl:h-5" style={{ top: CORNER_DEFAULT, right: CORNER_DEFAULT, borderTop: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />
            <span ref={blRef} className="pointer-events-none absolute w-2 h-2 mob:w-2.5 mob:h-2.5 md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-5 5xl:h-5" style={{ bottom: CORNER_DEFAULT, left: CORNER_DEFAULT, borderBottom: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={brRef} className="pointer-events-none absolute w-2 h-2 mob:w-2.5 mob:h-2.5 md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-5 5xl:h-5" style={{ bottom: CORNER_DEFAULT, right: CORNER_DEFAULT, borderBottom: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />

            {/* Thin white border box */}
            <div className="flex items-center border border-white/30 px-8 max-mob:px-6 py-2 max-mob:py-3 md:px-3 md:py-1.5 lg:px-3 lg:py-2 xl:px-5 xl:py-2 2xl:px-6 2xl:py-2.5 3xl:px-8 3xl:py-3 4xl:px-12 4xl:py-4 5xl:px-16 5xl:py-5 5xl:mx-3 5xl:my-1.5 5xl:border-2">
              <span
                ref={btnTextRef}
                className="font-host text-sm sm:text-md md:text-xs lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-4xl font-thin tracking-wider text-white"
              >
                {originalText}
              </span>
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* ═══ MOBILE BOTTOM — visible only below md ═══ */}
        <div className="md:hidden max-mob:mt-20 mob:mt-10 sm:mt-70 flex items-stretch justify-between gap-4 -mx-[1.5vw] pl-2 pr-2 pb-8 pt-6">
          {/* Left column */}
          <div className="flex flex-col justify-between flex-1 min-w-0">
            {/* Top group: logo + nav */}
            <div>
              {/* Logo + tagline */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img src="/svgs/Viral-Labs-logo.svg" alt="Viral Labs" className="h-6 w-6" draggable={false} />
                  <span className="font-bricolage text-2xl font-semibold tracking-tight text-white whitespace-nowrap">
                    Beyond Viral
                  </span>
                </div>
                <span className="font-host text-xs font-thin text-white/50">
                  Engineering Distribution
                </span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1.5 leading-tight mt-8">
                {NAV_MOBILE.map(({ label, target }) => (
                  <a
                    key={label}
                    href={target || "#"}
                    onClick={(e) => smoothScrollTo(e, target)}
                    className={`font-host text-xl leading-[1.15] font-thin transition-colors duration-200 hover:text-[#FF6F21] ${label === "Home" ? "text-[#FF6F21]" : "text-white"}`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom group: socials + copyright */}
            <div>
              {/* Socials */}
              <div className="flex items-center gap-5">
                {[
                  { key: "x", href: "https://x.com/EashanShetty", label: "X" },
                  { key: "in", href: "https://www.linkedin.com/company/virallabs/", label: "In" },
                ].map(({ key, href, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-4 w-7 items-center justify-center"
                  >
                    <span className="pointer-events-none absolute -left-1 -top-1 h-[6px] w-[6px] border-l border-t border-[#FF6F21]/60" />
                    <span className="pointer-events-none absolute -right-1 -top-1 h-[6px] w-[6px] border-r border-t border-[#FF6F21]/60" />
                    <span className="pointer-events-none absolute -bottom-1 -left-1 h-[6px] w-[6px] border-b border-l border-[#FF6F21]/60" />
                    <span className="pointer-events-none absolute -bottom-1 -right-1 h-[6px] w-[6px] border-b border-r border-[#FF6F21]/60" />
                    <span className="font-host text-[0.7rem] font-thin text-white">{label}</span>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="flex flex-col gap-1 mt-3">
                <a href="#" className="font-host text-xs font-thin text-white/40 hover:text-white/70">
                  Privacy Policy
                </a>
                <span className="font-host text-xs font-thin text-white/40">
                  © Copyright 2026 Viral Labs
                </span>
              </div>
            </div>
          </div>

          {/* Right column — clocks stacked, span full height */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            {CLOCKS.map((clock) => (
              <AnalogClock key={`m-${clock.tz}`} {...clock} />
            ))}
          </div>
        </div>

        {/* ═══ BOTTOM SECTION — desktop/tablet only (md+) ═══ */}
        <div className="hidden md:block mt-auto md:px-0">

          {/* Right column on mobile: clocks stacked vertically */}
          <div
            className="relative order-2 mr-[2rem] mob:mr-[2rem] sm:mr-0 md:order-none md:absolute md:w-full flex md:justify-center md:bottom-44 lg:bottom-64 xl:bottom-[22rem] 2xl:bottom-[27rem] 3xl:bottom-[34rem] 4xl:bottom-[45rem] 5xl:bottom-[68rem]"
          >
            <div ref={clocksRowRef}
            className="order-2 flex flex-col items-center gap-6 max-mob:gap-4 py-4 max-mob:pt-8 max-mob:scale-90 max-mob:origin-top sm:grid sm:grid-cols-2 sm:gap-3 sm:py-6 sm:justify-items-center md:flex md:items-center md:w-max md:flex-row md:justify-center md:gap-4 md:pb-0 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-14 4xl:gap-20 5xl:gap-28"
            style={{ opacity: 0 }} >
            {CLOCKS.map((clock) => (
              <AnalogClock key={clock.tz} {...clock} />
            ))}
            </div>
          </div>

          {/* Left column on mobile: logo + nav */}
          <div className="order-1 md:order-none">
            <div ref={footerBarRef} className="py-8 max-mob:pt-10 max-mob:pb-5 sm:py-8 md:py-3 lg:py-4 lg:max-xl:-translate-y-16 xl:py-5 xl:-translate-y-20 2xl:py-6 2xl:-translate-y-24 3xl:py-8 3xl:-translate-y-32 4xl:py-12 4xl:-translate-y-44 5xl:py-16 5xl:-translate-y-[16rem]">
              <div className="flex flex-col items-start md:flex-row md:items-start md:justify-center gap-8 max-mob:gap-5 md:gap-8 md:mx-auto md:max-w-md lg:gap-10 lg:max-w-lg lg:max-xl:!justify-between xl:!justify-between xl:max-w-2xl xl:gap-14 2xl:max-w-3xl 2xl:gap-18 3xl:max-w-4xl 3xl:gap-24 4xl:max-w-6xl 4xl:gap-36 5xl:max-w-[122rem] 5xl:gap-52">
                {/* Logo + tagline */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
                    <img src="/svgs/Viral-Labs-logo.svg" alt="Viral Labs" className="h-5 w-5 2xl:h-6 2xl:w-6 4xl:h-9 4xl:w-9 5xl:h-14 5xl:w-14" draggable={false} />
                    <span ref={logoNameRef} className="font-bricolage text-2xl max-mob:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-[5rem] font-semibold tracking-tight text-white whitespace-nowrap">
                      Beyond Viral
                    </span>
                  </div>
                  <span ref={taglineRef} className="font-host text-xs md:text-[0.6rem] md:text-center lg:text-[0.65rem] xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-2xl font-thin text-white/50 lg:text-left">
                    Engineering Distribution
                  </span>
                </div>

                {/* Nav links + Social icons grouped closer */}
                <div className="flex flex-col md:flex-row items-start gap-1 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-28 5xl:gap-36">
                  {/* Nav columns */}
                  <div ref={navCol1Ref} className="flex flex-col gap-1">
                    {NAV_COL_1.map(({ label, target }) => (
                      <a
                        key={label}
                        href={target || "#"}
                        onClick={(e) => smoothScrollTo(e, target)}
                        className={`font-host text-xl max-mob:text-base md:text-xs xl:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-4xl font-thin transition-colors duration-200 hover:text-[#FF6F21] ${label === "Home" ? "text-[#FF6F21]" : "text-white"}`}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                  <div ref={navCol2Ref} className="flex flex-col gap-0.5">
                    {NAV_COL_2.map(({ label, target }) => (
                      <a
                        key={label}
                        href={target || "#"}
                        onClick={(e) => smoothScrollTo(e, target)}
                        className="font-host text-xl max-mob:text-base md:text-xs xl:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-4xl font-thin text-white transition-colors duration-200 hover:text-[#FF6F21]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>

                  {/* Social icons — hidden on mobile */}
                  <div ref={socialsRef} className="hidden md:flex items-center gap-8 lg:max-xl:ml-6 xl:ml-8 2xl:ml-10 3xl:ml-14 4xl:ml-20 5xl:ml-32 4xl:gap-14 5xl:gap-18" style={{ opacity: 0 }}>
                    {[
                      { key: "x", href: "https://x.com/EashanShetty", content: <span className="font-host text-xs 4xl:text-base 5xl:text-4xl font-thin text-white transition-colors duration-200">X</span> },
                      { key: "in", href: "https://www.linkedin.com/company/virallabs/", content: <span className="font-host text-xs 4xl:text-base 5xl:text-4xl font-thin text-white transition-colors duration-200">In</span> },
                    ].map(({ key, href, content }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex h-4 w-8 4xl:h-6 4xl:w-12 5xl:h-13 5xl:w-21 items-center justify-center"
                      >
                        <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-[8px] w-[8px] 5xl:h-[1rem] 5xl:w-[1rem] border-l border-t border-[#FF6F21]/60 transition-all duration-200 group-hover:-left-2.5 group-hover:-top-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-[8px] w-[8px] 5xl:h-[1rem] 5xl:w-[1rem] border-r border-t border-[#FF6F21]/60 transition-all duration-200 group-hover:-right-2.5 group-hover:-top-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-[8px] w-[8px] 5xl:h-[1rem] 5xl:w-[1rem] border-b border-l border-[#FF6F21]/60 transition-all duration-200 group-hover:-bottom-2.5 group-hover:-left-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-[8px] w-[8px] 5xl:h-[1rem] 5xl:w-[1rem] border-b border-r border-[#FF6F21]/60 transition-all duration-200 group-hover:-bottom-2.5 group-hover:-right-2.5 group-hover:border-[#FF6F21]" />

                        {content}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ COPYRIGHT ═══ */}
          <div className="order-4 md:order-none col-span-2 md:col-span-1 mx-auto flex flex-col md:flex-row w-full max-w-4xl md:max-w-md lg:max-w-2xl xl:max-w-2xl 2xl:max-w-4xl 3xl:max-w-[80rem] 4xl:max-w-[100rem] 5xl:max-w-[155rem] items-start md:items-center md:justify-between gap-1 md:gap-0 py-6 max-mob:py-4 md:py-2 lg:py-3 xl:py-4 2xl:py-5 3xl:py-6 4xl:py-8 5xl:py-12">
            <span ref={copyLeftRef} className="font-host text-xs 2xl:text-sm 3xl:text-sm 4xl:text-lg 5xl:text-3xl font-thin text-white/40">
              © Copyright 2026 Viral Labs
            </span>
            <a ref={copyRightRef} href="#" className="font-host text-xs 2xl:text-sm 3xl:text-sm 4xl:text-lg 5xl:text-3xl font-thin text-white/40 transition-colors duration-200 hover:text-white/70">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

/* ════════════════════════════════════════════════════════════════════
   ANALOG CLOCK SUB-COMPONENT
   ════════════════════════════════════════════════════════════════════ */

const AnalogClock = ({ city, tz, label }) => {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const digitalRef = useRef(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const fmt12 = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const update = () => {
      const now = new Date();
      const parts = fmt.formatToParts(now);

      const h = parseInt(parts.find((p) => p.type === "hour").value, 10) % 12;
      const m = parseInt(parts.find((p) => p.type === "minute").value, 10);
      const s = parseInt(parts.find((p) => p.type === "second").value, 10);

      const hourDeg = h * 30 + m * 0.5;
      const minDeg = m * 6 + s * 0.1;
      const secDeg = s * 6;

      if (hourRef.current) hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
      if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (secondRef.current) secondRef.current.style.transform = `rotate(${secDeg}deg)`;

      if (digitalRef.current) {
        digitalRef.current.textContent = `${fmt12.format(now)} ${label}`;
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz, label]);

  const clockSize = 'clamp(6.25rem, 3.75rem + 5.2vw, 16.25rem)';
// clamp(6.25rem, 2.75rem + 5.2vw, 16.25rem)
  return (
    <div className="flex flex-col items-center gap-4 md:gap-0.5 lg:gap-1 xl:gap-2 2xl:gap-2.5 3xl:gap-3 4xl:gap-5 5xl:gap-7">
      {/* Clock face — fluid size via clamp (100px → 260px) */}
      <div
        className="clock-face-lg relative flex items-center justify-center rounded-full border border-white/15"
        style={{ width: clockSize, height: clockSize }}
      >
        {/* Minimal tick marks — only 12, 3, 6, 9 */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
            style={{
              width: 'clamp(0.0625rem, 0.04rem + 0.05vw, 0.2rem)',
              height: '48%',
              transform: `rotate(${deg}deg)`,
            }}
          >
            <div className="w-full bg-white/25" style={{ height: '14%' }} />
          </div>
        ))}

        {/* Center dot */}
        <span
          className="absolute rounded-full bg-white/50"
          style={{
            width: 'clamp(0.1875rem, 0.1rem + 0.15vw, 0.5rem)',
            height: 'clamp(0.1875rem, 0.1rem + 0.15vw, 0.5rem)',
          }}
        />

        {/* Hour hand */}
        <div
          ref={hourRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.1rem, 0.04rem + 0.06vw, 0.25rem)', height: '31%' }}
        >
          <div className="h-full w-full rounded-full bg-white/60" />
        </div>

        {/* Minute hand */}
        <div
          ref={minuteRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.0625rem, 0.025rem + 0.04vw, 0.1875rem)', height: '42%' }}
        >
          <div className="h-full w-full rounded-full bg-white/40" />
        </div>

        {/* Second hand */}
        <div
          ref={secondRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.03rem, 0.015rem + 0.025vw, 0.1rem)', height: '47%' }}
        >
          <div className="h-full w-full bg-[#FF6F21]/60" />
        </div>
      </div>

      {/* Digital time */}
      <span ref={digitalRef} className="font-host text-[0.55rem] md:text-[0.5rem] lg:text-[0.6rem] xl:text-[0.65rem] 2xl:text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin uppercase tracking-widest text-white/50">
        --:-- --
      </span>

      {/* City name */}
      <span className="-mt-3 md:-mt-0.5 lg:-mt-0.5 xl:-mt-1 2xl:-mt-1.5 3xl:-mt-2 4xl:-mt-3 5xl:-mt-4 font-host text-[0.5rem] md:text-[0.5rem] lg:text-[0.6rem] xl:text-[0.65rem] 2xl:text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin text-white/35">
        {city}
      </span>
    </div>
  );
};