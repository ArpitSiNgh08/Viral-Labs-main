import React, { useRef } from "react";
import GlobalTexture from "./Globaltexture";
import { gsap, SplitText, useGSAP } from "./Gsapconfig";
import fontReady from "./fontReady";

/* ─── SVG paths (served from public/svgs/) ─── */
const QuoteIcon = "/svgs/Quote_Icon.svg";
const ShiftLine = "/svgs/shift_line.svg";

/* ─── Testimonial data ─── */
const testimonials = [
  {
    id: 0,
    quote:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.!",
    founderName: "Founder Name",
    founderTitle: "Founder, XYZ",
    founderAvatar: "",
    companyName: "XYZ.",
  },
  {
    id: 1,
    quote:
      "Their strategic approach transformed our brand presence overnight. The team's creative vision and relentless execution turned our ambitious goals into measurable results that exceeded every benchmark.",
    founderName: "Sarah Mitchell",
    founderTitle: "CEO, NovaTech",
    companyName: "NovaTech.",
  },
  {
    id: 2,
    quote:
      "Working with this team felt like having an unfair advantage. They didn't just deliver a campaign, they engineered a growth system that keeps compounding month after month.",
    founderName: "James Carter",
    founderTitle: "Head of Growth, Arcline",
    companyName: "Arcline.",
  },
];

const BridgeTestimonial = () => {
  const sectionRef = useRef(null);
  const quoteWrapperRef = useRef(null);
  const quoteRef = useRef(null);
  const founderNameRef = useRef(null);
  const founderTitleRef = useRef(null);
  const companyRef = useRef(null);
  const shiftLineRef = useRef(null);
  const glowLineRef = useRef(null);
  const cubeRefs = useRef([]);

  const splitInstances = useRef([]);
  const activeIndex = useRef(0);
  const isAnimating = useRef(false);
  const cycleTimer = useRef(null);
  const goToRef = useRef(null);

  /* ─── Smoothly transition cube pagination highlight ─── */
  const updateCubes = (newIndex) => {
    cubeRefs.current.forEach((cube, i) => {
      if (!cube) return;
      if (i === newIndex) {
        gsap.to(cube, {
          backgroundColor: "#FF6F21",
          boxShadow: "0 0 6px #FF6F21, 0 0 14px rgba(255,111,33,0.5)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(cube, {
          backgroundColor: "rgba(255,255,255,0.3)",
          boxShadow: "0 0 0px transparent",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  /* ─── Cleanup all SplitText instances ─── */
  const revertSplits = () => {
    splitInstances.current.forEach((s) => s && s.revert());
    splitInstances.current = [];
  };

  /* ─── Animate text IN (reveal) ─── */
  const animateIn = (onComplete) => {
    const data = testimonials[activeIndex.current];

    /* Update raw text content before splitting */
    if (quoteRef.current) quoteRef.current.textContent = data.quote;
    if (founderNameRef.current) founderNameRef.current.textContent = data.founderName;
    if (founderTitleRef.current) founderTitleRef.current.textContent = data.founderTitle;
    if (companyRef.current) companyRef.current.textContent = data.companyName;

    /* Split all text elements into masked lines */
    const quoteSplit = SplitText.create(quoteRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const nameSplit = SplitText.create(founderNameRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const titleSplit = SplitText.create(founderTitleRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const companySplit = SplitText.create(companyRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    splitInstances.current = [quoteSplit, nameSplit, titleSplit, companySplit];

    const allLines = [
      ...quoteSplit.lines,
      ...nameSplit.lines,
      ...titleSplit.lines,
      ...companySplit.lines,
    ];

    /* Set initial hidden state */
    gsap.set(allLines, { y: "100%" });
    gsap.set(shiftLineRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(glowLineRef.current, { opacity: 0, scaleY: 0, transformOrigin: "center top" });

    /* Reveal timeline — only .to() */
    const tl = gsap.timeline({ onComplete });

    tl.to(glowLineRef.current, { opacity: 1, scaleY: 1, duration: 0.7, ease: "power3.out" }, 0)
      .to(quoteSplit.lines, { y: "0%", duration: 0.9, stagger: 0.08, ease: "power4.out" }, 0.15)
      .to(shiftLineRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.6)
      .to(
        [...nameSplit.lines, ...titleSplit.lines],
        { y: "0%", duration: 0.7, stagger: 0.06, ease: "power4.out" },
        0.5
      )
      .to(companySplit.lines, { y: "0%", duration: 0.7, ease: "power4.out" }, 0.6);

    return tl;
  };

  /* ─── Animate text OUT (exit upward) ─── */
  const animateOut = () => {
    return new Promise((resolve) => {
      const allLines = splitInstances.current.flatMap((s) => (s ? s.lines : []));

      if (allLines.length === 0) {
        revertSplits();
        resolve();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          revertSplits();
          resolve();
        },
      });

      tl.to(allLines, { y: "-100%", duration: 0.6, stagger: 0.03, ease: "power3.in" })
        .to(shiftLineRef.current, { opacity: 0, scaleX: 0, duration: 0.4, ease: "power3.in" }, 0)
        .to(glowLineRef.current, { opacity: 0, scaleY: 0, duration: 0.4, ease: "power3.in" }, 0);
    });
  };

  /* ─── Start auto-cycle timer (always calls latest goTo via ref) ─── */
  const startCycleTimer = () => {
    if (cycleTimer.current) clearTimeout(cycleTimer.current);
    cycleTimer.current = setTimeout(() => {
      const next = (activeIndex.current + 1) % testimonials.length;
      goToRef.current(next);
    }, 5000);
  };

  /* ─── Go to a specific testimonial ─── */
  const goTo = async (index) => {
    if (isAnimating.current || index === activeIndex.current) return;
    isAnimating.current = true;

    if (cycleTimer.current) clearTimeout(cycleTimer.current);

    await animateOut();

    activeIndex.current = index;
    updateCubes(index);

    animateIn(() => {
      isAnimating.current = false;
      startCycleTimer();
    });
  };

  /* Keep ref always pointing to latest goTo (survives re-renders) */
  goToRef.current = goTo;

  /* ─── Stable click handler that reads from ref ─── */
  const handleCubeClick = (index) => {
    goToRef.current(index);
  };

  /* ─── Initial entrance on scroll + start cycling ─── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

      gsap.set(quoteRef.current, { opacity: 1 });

      /* ── Measure all testimonials, lock to tallest ── */
      if (quoteWrapperRef.current && quoteRef.current) {
        let maxHeight = 0;
        const originalText = quoteRef.current.textContent;

        testimonials.forEach((t) => {
          quoteRef.current.textContent = t.quote;
          const h = quoteWrapperRef.current.offsetHeight;
          if (h > maxHeight) maxHeight = h;
        });

        quoteRef.current.textContent = originalText;
        quoteWrapperRef.current.style.height = `${maxHeight}px`;
      }

      /* Lock animation on initial entrance */
      isAnimating.current = true;

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            updateCubes(0);
            animateIn(() => {
              isAnimating.current = false;
              startCycleTimer();
            });
          },
        },
      });

      }); // fontReady.then
      return () => {
        cancelled = true;
        if (cycleTimer.current) clearTimeout(cycleTimer.current);
        revertSplits();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full py-12 md:py-20 lg:py-32">
      <GlobalTexture />

      {/* ── centred wrapper ── */}
      <div className="relative z-10 mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">
        {/* ── testimonial card ── */}
        <div className="relative mx-auto max-w-[52rem] md:max-w-[32rem] lg:max-w-[40rem] xl:max-w-[50rem] 2xl:max-w-[56rem] 3xl:max-w-[64rem] 4xl:max-w-[80rem] 5xl:max-w-[110rem] px-8 pt-14 pb-10 sm:px-10 sm:pt-10 sm:pb-10 md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-14 xl:py-14 2xl:px-16 2xl:py-16 3xl:px-20 3xl:py-18 4xl:px-28 4xl:py-24 5xl:px-40 5xl:py-32">
          {/* ─── Four orange corner brackets ─── */}
          <CornerBrackets />

          {/* ─── Glowing vertical line – left side ─── */}
          <span
            ref={glowLineRef}
            className="pointer-events-none absolute left-3 top-1/2 h-[52%] w-[2px] -translate-y-1/2 sm:left-5 md:left-8 3xl:left-10 3xl:w-[3px] 4xl:left-14 4xl:w-[3px] 5xl:left-20 5xl:w-[4px]"
            style={{
              background: "#F05A1F",
              boxShadow: "0 0 3px #F05A1F, 0 0 8px #F05A1Fcc, 0 0 18px #F05A1F99",
              mixBlendMode: "plus-lighter",
              opacity: 0,
            }}
          />

          {/* ─── Quote icon (static, doesn't animate) ─── */}
          <img
            src={QuoteIcon}
            alt="quote"
            className="mb-5 h-9 w-10 select-none opacity-80 sm:mb-6 sm:h-8 sm:w-10 md:mb-4 md:h-7 md:w-8 xl:h-8 xl:w-10 xl:mb-5 2xl:h-9 2xl:w-11 2xl:mb-6 3xl:h-10 3xl:w-12 3xl:mb-7 4xl:h-14 4xl:w-16 4xl:mb-8 5xl:h-18 5xl:w-20 5xl:mb-10"
            draggable={false}
            loading="lazy"
          />

          {/* ─── Quote text + decorative cubes ─── */}
          <div ref={quoteWrapperRef} className="relative">
            <p
              ref={quoteRef}
              className="font-bricolage text-base font-thin leading-snug tracking-wide text-white sm:text-lg sm:leading-[1.75] md:text-lg md:leading-snug xl:text-xl xl:leading-relaxed 2xl:text-2xl 2xl:leading-relaxed 3xl:text-3xl 3xl:leading-relaxed 4xl:text-[2.5rem] 4xl:leading-snug 5xl:text-6xl 5xl:leading-snug"
            >
              {testimonials[0].quote}
            </p>

            <GlowCubes />
          </div>

          {/* ─── Shift / curve line ─── */}
          <img
            ref={shiftLineRef}
            src={ShiftLine}
            alt=""
            width={763}
            height={31}
            className="mt-0 h-auto w-full max-w-[48rem] 3xl:max-w-[58rem] 4xl:max-w-[74rem] 5xl:max-w-[100rem] select-none"
            style={{ opacity: 0 }}
            draggable={false}
          />

          {/* ─── Bottom row: founder info + company ─── */}
          <div className="mt-5 flex items-center justify-between sm:mt-10 md:mt-6 xl:mt-8 2xl:mt-10 3xl:mt-12 4xl:mt-16 5xl:mt-20">
            {/* founder */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-[#2a2a2a] sm:h-10 sm:w-10 xl:h-10 xl:w-10 2xl:h-11 2xl:w-11 3xl:h-12 3xl:w-12 4xl:h-14 4xl:w-14 5xl:h-18 5xl:w-18" />
              <div className="flex flex-col">
                <span
                  ref={founderNameRef}
                  className="font-host text-sm font-thin leading-tight text-white sm:text-sm xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl"
                >
                  {testimonials[0].founderName}
                </span>
                <span
                  ref={founderTitleRef}
                  className="font-host text-xs leading-tight text-white/70 sm:text-[13px] 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl"
                >
                  {testimonials[0].founderTitle}
                </span>
              </div>
            </div>

            {/* company name */}
            <span
              ref={companyRef}
              className="font-host text-lg font-semibold tracking-tight text-white sm:text-2xl md:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl"
            >
              {testimonials[0].companyName}
            </span>
          </div>

          {/* ─── Pagination cubes (below founder row) ─── */}
          <div className="mt-8 flex items-center justify-center gap-0 sm:mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleCubeClick(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="group relative flex h-8 w-6 cursor-pointer items-center justify-center transition-transform duration-200 hover:scale-125"
              >
                <span
                  ref={(el) => (cubeRefs.current[i] = el)}
                  className="block h-2 w-2 sm:h-3 sm:w-3 3xl:h-3.5 3xl:w-3.5 4xl:h-4 4xl:w-4 5xl:h-5 5xl:w-5"
                  style={{
                    backgroundColor: i === 0 ? "#FF6F21" : "rgba(255,255,255,0.3)",
                    boxShadow: i === 0 ? "0 0 6px #FF6F21, 0 0 14px rgba(255,111,33,0.5)" : "none",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgeTestimonial;

/* ════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════════ */

const CORNER_THICKNESS = "2px";
const CORNER_COLOR = "#FF6F21";

const cornerBase = "pointer-events-none absolute h-5 w-5 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6 5xl:h-8 5xl:w-8";

const CornerBrackets = () => (
  <>
    <span
      className={`${cornerBase} left-0 top-6 sm:top-10`}
      style={{
        borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} right-0 top-6 sm:top-10`}
      style={{
        borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} bottom-6 left-0 sm:bottom-10`}
      style={{
        borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} bottom-6 right-0 sm:bottom-10`}
      style={{
        borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
  </>
);

const GlowCubes = () => {
  return (
    <div className="absolute -right-1 top-1/3 flex flex-col gap-1.5 max-md:top-1 sm:-right-5 sm:top-0 sm:gap-2 md:-right-3">
      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#FF6F21]" style={{ boxShadow: "0 0 10px #FF6F21, 0 0 20px #FF6F21aa" }} />
      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#FF6F21]" style={{ boxShadow: "0 0 10px #FF6F21, 0 0 20px #FF6F21aa" }} />
    </div>
  );
};