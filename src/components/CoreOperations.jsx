import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

// ── Orange corner marker SVGs ──

const CornerLeft = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M0.5 0.5L0.5 8.5M0.5 4.5L4.5 4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

const CornerRight = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M4.5 0.5L4.5 8.5M0.5 4.5H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

// ── CSS-only glow line ──

const GlowLine = ({ className = "" }) => (
  <div
    className={`h-px rounded-full ${className}`}
    style={{
      backgroundColor: "#FF6F21",
      mixBlendMode: "plus-lighter",
      boxShadow:
        "0 0 1px #FF6F21, " +
        "0 0 2px #FF6F21, " +
        "0 0 4px #FF6F21, " +
        "0 0 6px #FF6F21, " +
        "0 0 10px #FF6F21",
    }}
  />
);

// ── Card data ──

const cards = [
  {
    num: "01",
    title: "Organic Infrastructure",
    desc: "We build and operate the always-on organic ads systems behind consumer apps. Multi-account, across TikTok, Instagram and YouTube, engineered to compound month over month.",
    img: "/images/image 489.png",
  },
  {
    num: "02",
    title: "Distribution Consulting",
    desc: "We rebuild the strategy, systems, and execution standards that turn social into a growth function and raise your brand aura.",
    img: "/images/image 493.png",
  }
];

export default function CoreOperations() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

      // Factory — every tween gets its OWN fresh config object.
      // GSAP mutates the scrollTrigger config internally, so
      // sharing a single object across tweens breaks things.
      const trigger = () => ({
        trigger: el,
        start: "clamp(top 80%)",
        once: true,
      });

      // ─────────────────────────────────────────────
      // Header text mask reveals
      // ─────────────────────────────────────────────

      SplitText.create(".co-label", {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit(self) {
          gsap.set(self.lines, { yPercent: 110 });
          return gsap.to(self.lines, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: trigger(),
          });
        },
      });

      SplitText.create(".co-title", {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit(self) {
          gsap.set(self.lines, { yPercent: 110 });
          return gsap.to(self.lines, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            delay: 0.1,
            scrollTrigger: trigger(),
          });
        },
      });

      SplitText.create(".co-tagline-text", {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit(self) {
          gsap.set(self.lines, { yPercent: 110 });
          return gsap.to(self.lines, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            delay: 0.25,
            scrollTrigger: trigger(),
          });
        },
      });

      // ─────────────────────────────────────────────
      // Header glow line
      // ─────────────────────────────────────────────

      gsap.set(".co-glow-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.to(".co-glow-line", {
        scaleX: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.inOut",
        scrollTrigger: trigger(),
      });

      // ─────────────────────────────────────────────
      // Per-card animations
      // ─────────────────────────────────────────────

      const cardEls = el.querySelectorAll(".co-card");
      const CARD_OFFSET = 0.12;
      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      // On mobile, each card triggers individually on scroll.
      // On desktop, all cards trigger together off the section.
      const cardTrigger = (card) => isMobile
        ? { trigger: card, start: "clamp(top 90%)", once: true }
        : trigger();

      // ── Card container staggered entrance ──
      gsap.set(cardEls, { opacity: 0, y: 40 });
      cardEls.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: isMobile ? 0 : 0.2 + i * CARD_OFFSET,
          scrollTrigger: cardTrigger(card),
        });
      });

      cardEls.forEach((card, i) => {
        const d = isMobile ? 0.1 : 0.3 + i * CARD_OFFSET;
        const cardImg = card.querySelector(".co-card-img");
        const cardGlow = card.querySelector(".co-card-glow");
        const cardBadge = card.querySelector(".co-card-badge");
        const cardTitle = card.querySelector(".co-card-title");
        const cardDesc = card.querySelector(".co-card-desc");

        // ── Image zoom settle ──
        gsap.set(cardImg, { scale: 1.3 });
        gsap.to(cardImg, {
          scale: 1,
          duration: 1.4,
          delay: d,
          ease: "power3.out",
          scrollTrigger: cardTrigger(card),
        });

        // ── Glow line wipe ──
        gsap.set(cardGlow, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(cardGlow, {
          scaleX: 1,
          duration: 0.6,
          delay: d + 0.1,
          ease: "power3.inOut",
          scrollTrigger: cardTrigger(card),
        });

        // ── Number badge ──
        gsap.set(cardBadge, { yPercent: 100, opacity: 0 });
        gsap.to(cardBadge, {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          delay: d + 0.15,
          ease: "power4.out",
          scrollTrigger: cardTrigger(card),
        });

        // ── Card title: SplitText mask ──
        SplitText.create(cardTitle, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit(self) {
            gsap.set(self.lines, { yPercent: 110 });
            return gsap.to(self.lines, {
              yPercent: 0,
              duration: 0.8,
              stagger: 0.08,
              delay: d + 0.05,
              ease: "expo.out",
              scrollTrigger: cardTrigger(card),
            });
          },
        });

        // ── Card desc: SplitText mask ──
        SplitText.create(cardDesc, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit(self) {
            gsap.set(self.lines, { yPercent: 110 });
            return gsap.to(self.lines, {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.04,
              delay: d + 0.2,
              ease: "expo.out",
              scrollTrigger: cardTrigger(card),
            });
          },
        });
      });

      }); // fontReady.then
      return () => { cancelled = true; };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-25 w-full overflow-x-clip pb-0"
    >
      {/* ── Background grid mesh ── */}
      <GlobalGrid />
      <GlobalTexture />

      {/* ── Container ── */}
      <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">

      {/* ── Grid lines ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Section corner markers ── */}
      <CornerLeft className="pointer-events-none absolute -top-1 left-0 z-30" aria-hidden="true" />
      <CornerRight className="pointer-events-none absolute -top-1 right-0 z-30" aria-hidden="true" />

      {/* ── Header ── */}
      <div
        className="relative z-40 flex flex-col gap-4 sm:flex-row max-sm:justify-center sm:justify-between px-[clamp(0.75rem,3vw,4.5rem)]"
        style={{ minHeight: "clamp(6.5rem, 15vh, 12rem)" }}
      >
          <div className="flex flex-col sm:self-center">
            <p
              className="co-label font-host font-normal uppercase text-vl-orange tracking-wide"
              style={{ fontSize: "clamp(0.75rem, 0.9vw, 1rem)" }}
            >
              What We Do
            </p>
            <h2
              className="co-title font-bricolage text-white tracking-tighter leading-[1.0]"
              style={{ fontSize: "clamp(1.85rem, 3vw, 3rem)" }}
            >
              Core Operations
            </h2>
          </div>

          <div className="co-tagline flex flex-col items-start sm:items-start sm:self-center">
            <GlowLine className="co-glow-line w-[clamp(5rem,12vw,10rem)] mb-1" />
            <p
              className="co-tagline-text font-host font-normal text-vl-muted text-left sm:text-right tracking-tight"
              style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}
            >
              Precision over noise.
            </p>
          </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="relative z-40">
        <CornerLeft className="pointer-events-none absolute -top-1 left-0 z-50" aria-hidden="true" />
        <CornerRight className="pointer-events-none absolute -top-1 right-0 z-50" aria-hidden="true" />
        <CornerLeft
          className="pointer-events-none absolute -bottom-1 left-0 z-50"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        />
        <CornerRight
          className="pointer-events-none absolute -bottom-1 right-0 z-50"
          style={{ transform: "scale(1)" }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 border-t border-[#383838]">
          {cards.map((card) => {
            return (
              <div
                key={card.num}
                className="co-card relative flex flex-col border-[#383838] border-b last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-transparent sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r-[#383838] lg:border-b-0 lg:last:border-r-transparent"
              >
                <div className="relative aspect-3/2 sm:aspect-square lg:aspect-[4/3] bg-transparent overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className="co-card-img w-full h-full object-contain will-change-transform"
                  />
                  <div className="absolute bottom-0 left-0 z-10 overflow-hidden">
                    <GlowLine className="co-card-glow w-full" />
                    <span
                      className="co-card-badge inline-block font-host text-white/90 bg-[#2a2a2a] px-2.5 py-2.5"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 1rem)" }}
                    >
                      {card.num}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/20" />

                <div
                  className="flex flex-1 flex-col gap-4 lg:gap-0 bg-[#1C1C1C] transition-colors duration-300 hover:bg-[#242424]"
                  style={{
                    padding: "clamp(1rem, 2vw, 1.75rem)",
                    paddingInline: "clamp(0.75rem, 1.5vw, 1.25rem)",
                    paddingBottom: "clamp(3rem, 6vw, 6rem)",
                  }}
                >
                  <h3
                    className="co-card-title font-host uppercase tracking-tighter leading-[0.95] text-white min-h-0 sm:min-h-[2.8em]"
                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.75rem)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="co-card-desc font-host tracking-tight leading-none text-[hsla(0,0%,63%,1)]"
                    style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.15rem)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}