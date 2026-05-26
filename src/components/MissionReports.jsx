import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, SplitText, ScrollTrigger, useGSAP } from "../components/Gsapconfig";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

/* ─── Glow Line Blur Values ─── */
const LINE_BLURS = [0.5, 0.5, 3, 3, 5.5];

function GlowLine() {
  return (
    <div className="relative w-full h-[23px]">
      {LINE_BLURS.map((blur, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}
        >
          <div className="w-full h-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

/* ─── Brand Logo SVGs ─── */
function TNFLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 114 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#tnf-clip)">
        <path d="M40.1854 15.96H36.8794V2.907H32.0914V0.057H44.9734V2.907H40.1854V15.96ZM49.4764 8.835V15.96H46.1704V0.057H49.4764V6.099H55.6894V0.057H58.9954V15.96H55.6894V8.835H49.4764ZM71.8204 2.85H63.4984V6.213H70.8514V9.006H63.4984V13.167H71.8204V15.96H60.4204V0.057H71.8204V2.85ZM9.86137 18.411H12.9394V34.257H9.63337L3.13537 22.971H3.07837V34.257H0.000366211V18.411H3.47737L9.80437 29.412H9.86137V18.411ZM22.0594 17.955C24.1684 17.955 29.6974 18.867 29.6974 26.277C29.6974 33.687 24.1684 34.599 22.0594 34.599C19.9504 34.599 14.4214 33.687 14.4214 26.277C14.4214 18.867 19.9504 17.955 22.0594 17.955ZM22.0594 31.863C23.8264 31.863 26.3344 30.78 26.3344 26.334C26.3344 21.888 23.8264 20.805 22.0594 20.805C20.2924 20.805 17.7274 21.888 17.7274 26.334C17.7274 30.78 20.2924 31.863 22.0594 31.863ZM53.0674 34.257H49.7614V21.204H44.9164V18.411H57.8554V21.204H53.0674V34.257ZM62.3584 27.132V34.257H59.0524V18.411H62.3584V24.396H68.5144V18.411H71.8204V34.257H68.5144V27.132H62.3584ZM31.0654 18.411H39.1024C43.3204 18.411 44.1184 21.546 44.1184 22.914C44.1184 24.681 43.2064 26.163 41.6674 26.676C42.9784 27.246 43.6624 27.759 43.6624 30.723C43.6624 33.06 43.6624 33.63 44.3464 33.858V34.257H40.6984C40.4704 33.516 40.3564 32.718 40.3564 31.065C40.3564 28.899 40.2424 28.044 37.7914 28.044H34.3714V34.257H31.1224L31.0654 18.411ZM38.1904 25.365C39.9004 25.365 40.7554 24.738 40.7554 23.199C40.7554 22.344 40.3564 21.147 38.4184 21.147H34.3144V25.365H38.1904ZM23.3704 53.067H20.0074V36.765H31.5784V39.672H23.3704V43.32H30.5524V46.227H23.3704V53.067ZM33.1174 53.067H29.5264L35.3404 36.765H39.2734L45.0304 53.067H41.3254L40.2994 49.704H34.2004L33.1174 53.067ZM35.1124 46.911H39.2734L37.2784 40.47H37.2214L35.1124 46.911ZM55.4044 42.18C55.1194 41.211 54.6064 39.387 51.8134 39.387C50.1604 39.387 47.7664 40.47 47.7664 45.087C47.7664 47.994 48.9064 50.616 51.8134 50.616C53.6944 50.616 55.0054 49.533 55.4044 47.538H58.8244C58.1404 51.072 55.8604 53.523 51.7564 53.523C47.4244 53.523 44.3464 50.616 44.3464 44.973C44.3464 39.273 47.6524 36.366 51.8134 36.366C56.6584 36.366 58.6534 39.729 58.8244 42.123H55.4044V42.18ZM71.8774 39.672H63.3274V43.092H70.9084V45.942H63.3274V50.16H71.8774V53.067H60.1924V36.765H71.8774V39.672ZM13.8514 44.802C16.2454 44.802 18.2404 46.683 18.2404 49.191C18.2404 51.699 16.2454 53.58 13.8514 53.58C11.4574 53.58 9.40537 51.699 9.40537 49.191C9.40537 46.683 11.4574 44.802 13.8514 44.802ZM13.8514 52.953C15.9034 52.953 17.4424 51.357 17.4424 49.191C17.4424 47.082 15.8464 45.486 13.8514 45.486C11.7994 45.486 10.2034 47.082 10.2034 49.191C10.2034 51.3 11.7994 52.953 13.8514 52.953ZM12.1414 46.626H14.1364C15.3334 46.626 15.9604 47.082 15.9604 48.108C15.9604 49.02 15.3904 49.419 14.5924 49.533L16.0744 51.813H15.2194L13.7944 49.59H12.9394V51.813H12.1414V46.626ZM12.9394 48.906H13.7944C14.4784 48.906 15.1624 48.849 15.1624 48.051C15.1624 47.367 14.5924 47.253 14.0224 47.253H12.9394V48.906ZM82.7074 52.041V43.662C82.7074 39.9 79.6294 36.822 75.8674 36.822H75.1264V53.124H82.7074V52.041ZM114 52.041V38.133C114 17.1 96.9004 0 75.8674 0H75.4684H75.5254H75.1264V15.96H76.2094C88.5784 16.131 98.6674 26.22 98.8384 38.589V53.01H114V52.041Z" fill="currentColor"/>
        <path d="M96.3878 52.6111V38.8171C96.3308 27.8161 87.5528 18.8671 76.6658 18.4111H75.4118H75.4688H75.0698V34.3141H75.8108C80.9408 34.3141 85.0448 38.4751 85.0448 43.5481V53.0101H96.3878V52.6111Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="tnf-clip"><rect width="114" height="53.58" fill="white"/></clipPath></defs>
    </svg>
  );
}

function FloLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 107 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#flo-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M54.6908 42.6415C54.0233 42.6694 54.079 42.0574 55.0525 41.9461C57.0553 41.7236 58.9189 40.6388 60.0036 38.4692C61.4223 35.632 60.2818 32.8782 59.3639 31.6822C58.1956 30.1801 58.6408 30.4026 59.6977 30.9589C60.6435 31.4597 61.6448 32.0994 62.7574 33.073C61.8395 25.4515 64.9827 19.777 67.3749 16.8286C68.5969 15.335 68.3872 16.4394 68.1955 17.4504L68.1816 17.524C67.6808 20.2777 67.9868 23.4765 68.71 25.6183C68.4318 21.6129 70.3234 0 84.4259 0C98.5007 0 104.231 15.4656 100.058 27.927C96.1364 39.6375 83.202 40.5832 81.1993 40.5832C84.1478 41.3064 86.8181 41.0282 88.2646 40.7223C88.316 40.7125 88.3711 40.7014 88.428 40.6899C89.0174 40.5714 89.8003 40.4137 88.7095 41.2507C85.3717 43.8377 81.6444 45.3953 77.5833 45.8682C73.8559 46.2854 70.8797 45.7291 68.7935 45.1171C68.849 45.8404 68.8769 46.814 68.849 47.4816C68.808 48.1938 68.7601 48.1236 68.4531 47.6727C68.1366 47.2082 67.5448 46.3396 66.4013 45.5066C64.2912 43.9817 62.0908 43.9489 61.3706 43.9381C61.2158 43.9357 61.1295 43.9344 61.1271 43.9196C61.1241 43.9007 61.2551 43.8604 61.5515 43.7688C61.6414 43.7411 61.7463 43.7087 61.8673 43.6707C65.5112 42.5303 69.1551 41.0005 73.4108 38.052C79.3635 33.9074 82.5623 29.2066 82.3398 29.0397C82.3281 29.0319 82.2305 29.1402 82.0474 29.3433C80.9089 30.6059 76.4646 35.535 68.8213 39.0812C63.1746 41.668 57.7506 42.4469 54.6908 42.6415ZM23.0541 22.5307C24.556 22.7811 23.3322 25.2845 21.6911 25.4236C21.6371 25.4291 21.4951 25.4364 21.2826 25.4477C20.4001 25.4943 18.3017 25.6051 16.2392 25.8965C15.961 26.5919 15.6829 27.3151 15.4047 28.0661C12.4284 36.1605 11.4827 41.5568 11.2602 43.2535C11.0376 44.9224 6.86528 43.337 6.94873 40.3885C7.00436 38.052 8.50641 32.2663 9.84157 27.8715C8.17262 28.7059 6.80965 29.7629 6.28115 30.9032C4.47312 30.9868 2.16442 29.3456 3.33268 27.037C4.47312 24.7282 8.00573 23.7824 11.4271 23.2261C13.4854 17.4405 15.2657 13.2681 16.4339 11.6548C16.4617 11.627 16.4826 11.5992 16.5034 11.5714C16.5243 11.5435 16.5451 11.5157 16.573 11.4879C9.0071 12.9065 5.41886 15.5212 3.91681 17.7187C-0.00521113 17.6351 -2.17484 12.072 3.24923 9.56863C8.56204 7.12083 16.7398 6.42544 24.6674 6.48107C32.6505 6.53671 38.6031 7.78842 40.6058 8.53945C42.1357 9.12357 40.9117 11.5435 39.3262 11.4601C39.0805 11.4484 38.6548 11.3788 38.0558 11.2809C35.8081 10.9134 31.12 10.1468 24.3336 10.5422C24.3336 10.6082 24.2987 10.6742 24.2567 10.7541C24.2456 10.7751 24.2339 10.7971 24.2224 10.8203C22.6646 12.7118 20.1333 16.8841 17.6579 22.5307C20.2447 22.3917 22.4421 22.4473 23.0541 22.5307ZM42.3582 26.2859C43.3039 25.1732 45.4458 23.1984 48.5054 23.1427C51.7878 23.0593 55.1256 26.5919 51.8712 35.1314C49.785 40.611 46.1134 45.1171 40.9117 45.0894C38.019 45.0894 36.3779 42.8919 35.9884 40.0268C34.2638 42.1131 30.8981 45.1171 27.4489 45.1171C22.5256 45.1171 22.4421 39.0812 25.5852 29.4568C28.1165 21.724 31.3153 17.3013 32.5392 16.4669C35.6268 14.353 40.4945 16.5225 38.7699 18.1359C37.8798 18.9704 34.097 24.1997 31.5934 30.486C29.0623 36.7446 28.7563 40.0547 30.6756 40.0547C32.428 40.0547 35.5434 36.689 36.4056 35.326C36.4376 35.1984 36.4786 35.0798 36.5184 34.9652C36.5478 34.88 36.5767 34.797 36.6004 34.7141C37.9911 30.5696 39.827 27.482 41.1621 26.6475C41.5237 26.425 41.9132 26.3137 42.3582 26.2859ZM42.6363 39.9434C45.0008 39.9434 47.3651 37.0784 48.7558 33.7127C49.8407 31.0146 49.7571 27.6211 47.6432 27.6488C47.0313 27.6767 46.5306 27.8992 46.1134 28.233C46.1411 28.5112 46.0577 28.7893 45.8352 29.0396C45.2491 29.7478 43.1409 32.7928 42.3337 33.9586C42.2215 34.1208 42.1344 34.2466 42.08 34.3246C40.7727 36.7446 40.8283 39.9434 42.6363 39.9434Z" fill="#BBBBBB"/>
      </g>
      <defs><clipPath id="flo-clip"><rect width="106.667" height="49.2308" fill="white"/></clipPath></defs>
    </svg>
  );
}

/* ─── Reusable header row content ─── */
function HeaderRowContent({ data, bgClass = "", textClass = "text-white", isActive = false }) {
  const tnfColorClass = isActive ? "text-white" : "text-[#BBBBBB]";
  return (
    <div className={`mr-header-row w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-12 items-center gap-x-3 sm:gap-x-0 ${bgClass}`} style={{ padding: "1.75rem clamp(1rem, 4vw, 3rem)" }}>
      <span className={`sm:col-span-3 font-bricolage ${textClass}`} style={{ fontSize: "clamp(1.25rem, 2.8vw, 3.25rem)" }}>
        {data.id}
      </span>
      <h3 className={`sm:col-span-7 sm:col-start-4 font-bricolage leading-none ${textClass}`} style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.75rem)" }}>
        {data.brand}
      </h3>
      <div className="sm:col-span-2 flex justify-end">
        {data.logo === "tnf"
          ? <TNFLogo className={`h-10 md:h-13 4xl:h-16 5xl:h-20 w-auto ${tnfColorClass} transition-colors duration-300`} />
          : <FloLogo className="h-9 md:h-12 4xl:h-14 5xl:h-18 w-auto" />}
      </div>
    </div>
  );
}

/* ─── Corner marks ─── */
function CornerLeft({ className = "" }) {
  return (
    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0.5 0.5L0.5 8.5M0.5 4.5L4.5 4.5" stroke="#FF6F21" strokeLinecap="round" />
    </svg>
  );
}

function CornerRight({ className = "" }) {
  return (
    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.5 0.5L4.5 8.5M0.5 4.5H4.5" stroke="#FF6F21" strokeLinecap="round" />
    </svg>
  );
}

const HOVER_BG = "#1a1a1a";
const BG_WIPE_COLORS = ["#3a3a3a", "#252525", "#171717", HOVER_BG];

const caseStudies = [
  {
    id: "01", brand: "The North Face", logo: "tnf",
    link: "https://giant-rubidium-888.notion.site/How-We-Drove-Sales-for-The-North-Face-Through-Organic-Content-3177dca4ef9f803f8357c8d54d4a2226?source=copy_link",
    tagline: "Engineering Discovery \nfor a Hidden Platform",
    objective: "Turn The North Face's hidden recommerce platform into a discovery engine for fashion-conscious Gen Z, using organic content as the sole acquisition channel.",
    execution: "Built a 12-creator content engine producing 477 videos under a 'secret discovery' framework - making The North Face Renewed feel like something Gen Z stumbled on, not something they were sold.",
    stats: [{ value: "6M+", label: "Organic Views" }, { value: "93.8K+", label: "Website visits" }, { value: "$225K+", label: "Revenue" }],
  },
  {
    id: "02", brand: "FLO", logo: "flo",
    link: "https://giant-rubidium-888.notion.site/How-Viral-Labs-Engineered-Flo-s-Organic-Comeback-30b7dca4ef9f801aa0e8f90b6ef91284?source=copy_link",
    tagline: "Engineering an Organic\nComeback.",
    objective: "Build a high-volume organic engine that doubles as a paid creative testing lab - and turn its outliers into the brand's highest-ROAS paid ads.",
    execution: "Built a 10-account UGC engine producing 600+ videos a month. Outlier organic videos became Flo's top-performing paid creative, cutting CAC 40% below the women's health app benchmark.",
    stats: [{ value: "123M+", label: "Organic Views" }, { value: "200K+", label: "App Downloads" }, { value: "$2.74 ", label: "CAC" }],
  },
  {
    id: "03", brand: "Deel", logo: "flo",
    link: "https://giant-rubidium-888.notion.site/How-Viral-Labs-Engineered-Flo-s-Organic-Comeback-30b7dca4ef9f801aa0e8f90b6ef91284?source=copy_link",
    tagline: "Engineering an Organic\nComeback.",
    objective: "Build a high-volume organic engine that doubles as a paid creative testing lab - and turn its outliers into the brand's highest-ROAS paid ads.",
    execution: "Built a 10-account UGC engine producing 600+ videos a month. Outlier organic videos became Flo's top-performing paid creative, cutting CAC 40% below the women's health app benchmark.",
    stats: [{ value: "123M+", label: "Organic Views" }, { value: "200K+", label: "App Downloads" }, { value: "$2.74 ", label: "CAC" }],
  },
];

const INNER_PAD = "clamp(1rem, 4vw, 3rem)";

/* ─────────────────────────────────────────────
   Accordion Item
   ───────────────────────────────────────────── */
function AccordionItem({
  data,
  isActive,
  onClick,
  containerRef,
  headerRef,
  contentWrapRef,
  contentInnerRef,
  expandedHeight, // number (desktop target) or null (mobile -> use "auto")
  absolutePos,    // { top: number } on desktop, null on mobile
}) {
  const bgLayersRef = useRef(null);
  const taglineRef = useRef(null);
  const objLabelRef = useRef(null);
  const objTextRef = useRef(null);
  const execLabelRef = useRef(null);
  const execTextRef = useRef(null);
  const linkRef = useRef(null);
  const statsRef = useRef(null);
  const tlRef = useRef(null);
  const closeTlRef = useRef(null);
  // Store resolved elements + split instances so the close handler can access them.
  const closeTargetsRef = useRef(null);

  // Cursor-follow "Click me" label
  const cursorLabelRef = useRef(null);
  const cursorCornersRef = useRef(null);
  const isHoveringRef = useRef(false);
  const isActiveRef = useRef(isActive);
  const showCursorLabelRef = useRef(null);
  const hideCursorLabelRef = useRef(null);

  // Play forward for open, run custom synchronized close for close.
  useEffect(() => {
    if (!tlRef.current || !closeTargetsRef.current) return;

    const t = closeTargetsRef.current;

    if (isActive) {
      // Kill any running close timeline (doesn't touch forward timeline's tweens),
      // then re-record starting values from current element state and play forward.
      closeTlRef.current?.kill();
      closeTlRef.current = null;
      tlRef.current.invalidate().restart();
    } else {
      // Stop forward timeline, kill any previous close, build synchronized close.
      tlRef.current.pause();
      closeTlRef.current?.kill();

      const D = 0.5;
      const closeTl = gsap.timeline();
      closeTl.to(t.contentWrap, { height: 0, duration: D, ease: "power4.inOut" }, 0);
      closeTl.to(t.bgLayers, {
        scaleY: 0, duration: D * 0.85,
        stagger: { amount: 0.1, from: "end" },
        ease: "power3.inOut",
      }, 0);
      closeTl.to(t.contentInner, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: D * 0.7, ease: "power3.inOut",
      }, 0);
      closeTl.to([t.tagline, t.objLabel, t.execLabel, t.link], {
        opacity: 0, y: 10, duration: D * 0.4, ease: "power2.in",
      }, 0);
      closeTl.to(t.objLines, { yPercent: 110, duration: D * 0.5, stagger: 0.02, ease: "power3.in" }, 0);
      closeTl.to(t.execLines, { yPercent: 110, duration: D * 0.5, stagger: 0.02, ease: "power3.in" }, 0);
      closeTl.to(t.statItems, { opacity: 0, y: 20, duration: D * 0.4, stagger: 0.03, ease: "power2.in" }, 0);

      closeTlRef.current = closeTl;
    }
  }, [isActive]);

  // Mirror isActive into a ref so hover handlers see the latest value
  // without re-binding listeners. If the user opens the accordion while
  // hovering, force the label to hide.
  useEffect(() => {
    isActiveRef.current = isActive;
    if (isActive && isHoveringRef.current && hideCursorLabelRef.current) {
      hideCursorLabelRef.current();
    }
  }, [isActive]);

  // Build (and rebuild) the content expansion timeline.
  // Rebuilds whenever expandedHeight changes (e.g. viewport resize).
  useGSAP(
    () => {
      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

        const bgLayers = bgLayersRef.current?.querySelectorAll(".bg-wipe-layer") || [];
        const statItems = statsRef.current?.querySelectorAll(".stat-item") || [];

        const objSplit = SplitText.create(objTextRef.current, {
          type: "lines", mask: "lines", linesClass: "mr-obj-line",
        });
        objSplit.lines.forEach((line) => {
          if (line.parentElement) line.parentElement.style.paddingBottom = "0.08em";
        });

        const execSplit = SplitText.create(execTextRef.current, {
          type: "lines", mask: "lines", linesClass: "mr-exec-line",
        });
        execSplit.lines.forEach((line) => {
          if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
        });

        gsap.set(bgLayers, { scaleY: 0, transformOrigin: "top" });
        gsap.set(contentWrapRef.current, { height: 0, overflow: "hidden" });
        gsap.set(contentInnerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
        gsap.set(objSplit.lines, { yPercent: 110 });
        gsap.set(execSplit.lines, { yPercent: 110 });
        gsap.set(taglineRef.current, { opacity: 0, y: 20 });
        gsap.set(objLabelRef.current, { opacity: 0, y: 14 });
        gsap.set(execLabelRef.current, { opacity: 0, y: 14 });
        gsap.set(linkRef.current, { opacity: 0, y: 10 });
        gsap.set(statItems, { opacity: 0, y: 30 });

        // Stash all elements + split results for the custom close handler.
        closeTargetsRef.current = {
          bgLayers,
          contentWrap: contentWrapRef.current,
          contentInner: contentInnerRef.current,
          tagline: taglineRef.current,
          objLabel: objLabelRef.current,
          execLabel: execLabelRef.current,
          link: linkRef.current,
          statItems,
          objLines: objSplit.lines,
          execLines: execSplit.lines,
        };

        const heightTarget = expandedHeight != null ? expandedHeight : "auto";
        const tl = gsap.timeline({ paused: true });

        tl.to(bgLayers, { scaleY: 1, duration: 0.6, stagger: 0.08, ease: "power3.inOut" });
        tl.to(contentWrapRef.current, { height: heightTarget, duration: 0.65, ease: "power4.inOut" }, "<0.15");
        tl.to(contentInnerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.65, ease: "power3.inOut" }, "-=0.45");
        tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, "-=0.3");
        tl.to(objLabelRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.35");
        tl.to(objSplit.lines, { yPercent: 0, duration: 0.65, stagger: 0.04, ease: "power3.out" }, "-=0.3");
        tl.to(execLabelRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.35");
        tl.to(execSplit.lines, { yPercent: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" }, "-=0.3");
        tl.to(linkRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.25");
        tl.to(statItems, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "back.out(1.4)" }, "-=0.45");

        tlRef.current = tl;

        // If item was already active when rebuild triggered (e.g. resize), replay from start.
        if (isActive) tl.invalidate().restart();
      });
      return () => { cancelled = true; };
    },
    { scope: containerRef, dependencies: [expandedHeight] }
  );

  // ── Cursor-follow "Click me" label (desktop only) ──
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!mql.matches) return;

      const header = headerRef.current;
      const label = cursorLabelRef.current;
      const cornersWrap = cursorCornersRef.current;
      if (!header || !label || !cornersWrap) return;

      const corners = cornersWrap.querySelectorAll("path");

      // Initial state: hidden, centered on cursor via xPercent/yPercent
      gsap.set(label, { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50, x: 0, y: 0 });
      gsap.set(corners, { drawSVG: "50% 50%" });

      let xTo = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
      let yTo = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });
      let rotateTo = gsap.quickTo(label, "rotation", { duration: 0.6, ease: "power3.out" });
      let lastX = 0;
      let lastT = 0;

      let activeTl = null;

      const show = () => {
        activeTl?.kill();
        activeTl = gsap.timeline()
          .to(label, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, 0)
          .to(corners, { drawSVG: "0% 100%", duration: 0.55, ease: "power3.out" }, 0);
      };

      const hide = () => {
        activeTl?.kill();
        activeTl = gsap.timeline()
          .to(label, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power3.in" }, 0)
          .to(corners, { drawSVG: "50% 50%", duration: 0.3, ease: "power3.in" }, 0);
      };

      showCursorLabelRef.current = show;
      hideCursorLabelRef.current = hide;

      const onEnter = (e) => {
        if (isActiveRef.current) return;
        isHoveringRef.current = true;
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Kill stale tweens from previous hover cycle
        gsap.killTweensOf(label, "x,y,rotation");
        // Snap to cursor
        gsap.set(label, { x, y, rotation: 0 });
        // Recreate quickTo functions so they start fresh from current position
        xTo = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
        yTo = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });
        rotateTo = gsap.quickTo(label, "rotation", { duration: 0.6, ease: "power3.out" });
        lastX = x;
        lastT = 0;
        show();
      };

      const onMove = (e) => {
        if (!isHoveringRef.current || isActiveRef.current) return;
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);

        // Velocity-based tilt: clamp to ±15deg
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0 && lastT !== 0) {
          const vx = (x - lastX) / dt; // px per ms
          const tilt = gsap.utils.clamp(-15, 15, vx * 8);
          rotateTo(tilt);
        }
        lastX = x;
        lastT = now;
      };

      const onLeave = () => {
        if (!isHoveringRef.current) return;
        isHoveringRef.current = false;
        lastT = 0;
        rotateTo(0);
        hide();
      };

      header.addEventListener("mouseenter", onEnter);
      header.addEventListener("mousemove", onMove);
      header.addEventListener("mouseleave", onLeave);

      return () => {
        header.removeEventListener("mouseenter", onEnter);
        header.removeEventListener("mousemove", onMove);
        header.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  const itemStyle = absolutePos
    ? { position: "absolute", top: absolutePos.top, left: 0, right: 0 }
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer"
      onClick={onClick}
      style={itemStyle}
    >
      <div ref={bgLayersRef} className="absolute inset-0 z-0 pointer-events-none">
        {BG_WIPE_COLORS.map((color, i) => (
          <div key={i} className="bg-wipe-layer absolute inset-0" style={{ backgroundColor: color, zIndex: i }} />
        ))}
      </div>

      <div ref={headerRef} className="relative z-10">
        <HeaderRowContent data={data} bgClass="border-t border-[#FF6F21]/70" textClass="text-white" isActive={isActive} />

        {/* Cursor-follow expand icon — desktop only via JS gating */}
        <div
          ref={cursorLabelRef}
          className="pointer-events-none absolute top-0 left-0 z-30 will-change-transform hidden lg:block"
          aria-hidden="true"
        >
          <div ref={cursorCornersRef} className="relative px-5 py-5">
            {/* Radial glow halo behind the icon */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,111,33,0.18) 0%, transparent 72%)",
                filter: "blur(6px)",
              }}
            />
            <svg className="absolute top-0 left-0 overflow-visible" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}>
              <path d="M13 1 L1 1 L1 13" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="absolute top-0 right-0 overflow-visible" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}>
              <path d="M1 1 L13 1 L13 13" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="absolute bottom-0 left-0 overflow-visible" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}>
              <path d="M1 1 L1 13 L13 13" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="absolute bottom-0 right-0 overflow-visible" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}>
              <path d="M13 1 L13 13 L1 13" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 0 4px #FF6F21) drop-shadow(0 0 10px rgba(255,111,33,0.6))" }}>
              <path d="M11 2v18M2 11h18" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div ref={contentWrapRef} className="relative z-10 -mt-px">
        <div ref={contentInnerRef} className="relative z-10" style={{ padding: `1.25rem ${INNER_PAD} 3rem` }}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-20">
            <div ref={taglineRef} className="col-span-12 md:col-span-3 pt-4">
              <p className="font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white/50 whitespace-pre-line leading-none tracking-tight">{data.tagline}</p>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-4">
              <span ref={objLabelRef} className="inline-block font-host text-sm 4xl:text-base 5xl:text-lg tracking-[0.15em] uppercase text-white mb-1.5">OBJECTIVE</span>
              <p ref={objTextRef} className="mr-obj-text font-host text-white/80 leading-none" style={{ fontSize: "clamp(1.25rem, 1.9vw, 2rem)" }}>{data.objective}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <span ref={execLabelRef} className="inline-block font-host text-xs 4xl:text-sm 5xl:text-base tracking-[0.15em] uppercase text-white mb-3">EXECUTION</span>
              <p ref={execTextRef} className="font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white/50 leading-none tracking-tight mb-0">{data.execution}</p>
              <a
                ref={linkRef}
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-host text-sm text-white/40 hover:text-[#FF6F21] transition-colors duration-300 underline underline-offset-4 decoration-white/15 hover:decoration-[#FF6F21]/50"
              >
                View full case study <span className="text-xs">→</span>
              </a>
            </div>
            <div ref={statsRef} className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-2">
              {data.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="mr-stat-value block font-host text-[#FF6F21] leading-none mb-2" style={{ fontSize: "clamp(1.75rem, 2.8vw, 3rem)" }}>{stat.value}</span>
                  <span className="block font-host text-xs md:text-sm 4xl:text-base 5xl:text-lg text-white/40 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MissionReports Section
   ───────────────────────────────────────────── */
export default function MissionReports() {
  const sectionRef = useRef(null);
  const headerContentRef = useRef(null);
  const stageRef = useRef(null);
  const paragraphAreaRef = useRef(null);

  // Item refs (owned by parent so we can drive translations + measure)
  const item1ContainerRef = useRef(null);
  const item1HeaderRef = useRef(null);
  const item1ContentWrapRef = useRef(null);
  const item1ContentInnerRef = useRef(null);

  const item2ContainerRef = useRef(null);
  const item2HeaderRef = useRef(null);
  const item2ContentWrapRef = useRef(null);
  const item2ContentInnerRef = useRef(null);

  const item3ContainerRef = useRef(null);
  const item3HeaderRef = useRef(null);
  const item3ContentWrapRef = useRef(null);
  const item3ContentInnerRef = useRef(null);

  const tapHintRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  // { reservedH, headerH, isDesktop } — null until measured
  const [dims, setDims] = useState(null);

  const handleClick = useCallback((i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i));
  }, []);

  /* ── Measurement: after fonts load and on resize ── */
  useEffect(() => {
    let cancelled = false;
    let onResize = null;

    fontReady.then(() => {
      if (cancelled) return;

      const measure = () => {
        if (!paragraphAreaRef.current || !item1HeaderRef.current) return;

        // contentInner renders at natural height even though its parent (contentWrap)
        // is clipped via height:0 — so offsetHeight gives us what we need.
        const paragraphH = paragraphAreaRef.current.offsetHeight || 0;
        const item1H = item1ContentInnerRef.current?.offsetHeight || 0;
        const item2H = item2ContentInnerRef.current?.offsetHeight || 0;
        const item3H = item3ContentInnerRef.current?.offsetHeight || 0;
        const headerH = item1HeaderRef.current.offsetHeight || 0;

        // contentH = natural height of the tallest case study's expanded content.
        // This is exactly how far items translate up to make room below.
        const contentH = Math.max(item1H, item2H, item3H);

        const isDesktop = true; // translate-up enabled on all screen sizes
        setDims({ contentH, paragraphH, headerH, isDesktop });
      };

      measure();
      onResize = () => measure();
      window.addEventListener("resize", onResize);
    });

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, []);

  // Track previous active index to determine direction of each item's translate
  const prevActiveRef = useRef(-1);

  /* ── Animation coordinator: translate items when activeIndex changes (desktop only) ── */
  useEffect(() => {
    if (!dims || !dims.isDesktop) return;

    const { contentH } = dims;
    const prev = prevActiveRef.current;
    prevActiveRef.current = activeIndex;

    // Rule: item i translates up by contentH if i <= activeIndex.
    const newItem1Y = activeIndex >= 0 ? -contentH : 0;
    const newItem2Y = activeIndex >= 1 ? -contentH : 0;
    const newItem3Y = activeIndex >= 2 ? -contentH : 0;
    const prevItem1Y = prev >= 0 ? -contentH : 0;
    const prevItem2Y = prev >= 1 ? -contentH : 0;
    const prevItem3Y = prev >= 2 ? -contentH : 0;

    // Sync with content timeline:
    //   OPEN  → forward timeline's height tween runs 0.15s to 0.80s of its timeline.
    //           Delay 0.15 so translate starts when the container begins growing.
    //   CLOSE → custom synchronized close runs over 0.5s with height tween driving motion.
    //           Delay 0 so translate starts immediately alongside everything else.
    const OPEN_DELAY = 0.15;
    const OPEN_DURATION = 0.65;
    const CLOSE_DELAY = 0;
    const CLOSE_DURATION = 0.5;

    const animate = (target, from, to) => {
      if (from === to) return;
      const goingUp = to < from;
      gsap.to(target, {
        y: to,
        duration: goingUp ? OPEN_DURATION : CLOSE_DURATION,
        delay: goingUp ? OPEN_DELAY : CLOSE_DELAY,
        ease: "power4.inOut",
        overwrite: "auto",
      });
    };

    animate(item1ContainerRef.current, prevItem1Y, newItem1Y);
    animate(item2ContainerRef.current, prevItem2Y, newItem2Y);
    animate(item3ContainerRef.current, prevItem3Y, newItem3Y);

    // Fade paragraph area + tap hint out when accordion opens, in when it closes.
    // Synced with the translate so they feel like one motion.
    const wasActive = prev !== -1;
    const isActive = activeIndex !== -1;
    if (wasActive !== isActive) {
      if (paragraphAreaRef.current) {
        gsap.to(paragraphAreaRef.current, {
          opacity: isActive ? 0 : 1,
          duration: isActive ? OPEN_DURATION : CLOSE_DURATION,
          delay: isActive ? OPEN_DELAY : CLOSE_DELAY,
          ease: "power4.inOut",
          overwrite: "auto",
        });
      }
      if (tapHintRef.current) {
        gsap.to(tapHintRef.current, {
          opacity: isActive ? 0 : 1,
          duration: 0.3,
          delay: 0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
  }, [activeIndex, dims]);

  /* ── Reset any translates if we swap from desktop to mobile on resize ── */
  useEffect(() => {
    if (!dims) return;
    if (!dims.isDesktop) {
      gsap.set([item1ContainerRef.current, item2ContainerRef.current, item3ContainerRef.current], { y: 0, clearProps: "transform" });
    }
  }, [dims]);

  /* ── Scroll-triggered text reveal on header content ── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let cancelled = false;
      fontReady.then(() => {
        if (cancelled) return;

        const headingSplit = SplitText.create(".mr-heading", {
          type: "lines", mask: "lines", linesClass: "mr-h-line",
        });
        headingSplit.lines.forEach((line) => {
          if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
        });

        const labelSplit = SplitText.create(".mr-label", {
          type: "lines", mask: "lines", linesClass: "mr-l-line",
        });

        const tagSplits = [];
        sectionRef.current.querySelectorAll(".mr-tag").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines", mask: "lines", linesClass: "mr-t-line",
          });
          tagSplits.push(split);
        });
        const tagLines = tagSplits.flatMap((s) => s.lines);

        const paraSplit = SplitText.create(".mr-para", {
          type: "lines", mask: "lines", linesClass: "mr-p-line",
        });
        paraSplit.lines.forEach((line) => {
          if (line.parentElement) line.parentElement.style.paddingBottom = "0.08em";
        });

        gsap.set(headingSplit.lines, { y: "100%" });
        gsap.set(labelSplit.lines, { y: "100%" });
        gsap.set(tagLines, { y: "100%" });
        gsap.set(paraSplit.lines, { y: "100%" });

        gsap.to(headingSplit.lines, {
          y: "0%", duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: headerContentRef.current, start: "top 75%", once: true },
        });
        gsap.to(labelSplit.lines, {
          y: "0%", duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.15,
          scrollTrigger: { trigger: headerContentRef.current, start: "top 75%", once: true },
        });
        gsap.to(tagLines, {
          y: "0%", duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.3,
          scrollTrigger: { trigger: ".mr-para", start: "top 85%", once: true },
        });
        gsap.to(paraSplit.lines, {
          y: "0%", duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.3,
          scrollTrigger: { trigger: ".mr-para", start: "top 80%", once: true },
        });
      });

      return () => { cancelled = true; };
    },
    { scope: sectionRef }
  );

  // Derived values for the layout
  const isDesktopLayout = !!(dims && dims.isDesktop);
  // GAP = space between the bottom of the paragraph area and the first accordion header.
  const GAP = 140; // px — adjust to taste
  // layoutH is the space reserved above the items (paragraph area).
  // Must be >= contentH - GAP so translated items don't go above stage top.
  const layoutH = isDesktopLayout ? Math.max(dims.paragraphH, dims.contentH - GAP) : 0;
  // Content expands to its natural height (auto).
  const expandedHeight = null;

  const stageStyle = isDesktopLayout
    ? { position: "relative", height: layoutH + GAP + 3 * dims.headerH }
    : undefined;

  const paragraphStyle = isDesktopLayout
    ? { position: "absolute", top: 0, left: 0, right: 0, height: layoutH }
    : undefined;

  const item1AbsolutePos = isDesktopLayout ? { top: layoutH + GAP } : null;
  const item2AbsolutePos = isDesktopLayout ? { top: layoutH + GAP + dims.headerH } : null;
  const item3AbsolutePos = isDesktopLayout ? { top: layoutH + GAP + 2 * dims.headerH } : null;

  // Mobile tap hint sits just above the first accordion header
  const hintStyle = isDesktopLayout
    ? { position: "absolute", top: layoutH + GAP - 36, left: 0, right: 0 }
    : undefined;

  const bottomBorderStyle = isDesktopLayout
    ? { position: "absolute", bottom: 0, left: 0, right: 0 }
    : undefined;

  return (
    <>
    <style>{`
      @media (min-width: 160rem) {
        .mr-heading { font-size: 4.5rem !important; }
        .mr-stat-value { font-size: 3.5rem !important; }
        .mr-header-row { padding-left: 4rem !important; padding-right: 4rem !important; }
        .mr-header-row span:first-child { font-size: 4rem !important; }
        .mr-header-row h3 { font-size: 4.5rem !important; }
        .mr-header-content { padding-left: 4rem !important; padding-right: 4rem !important; }
      }
      @keyframes mr-arrow-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(8px); }
      }
      .mr-tap-hint { animation: mr-arrow-bounce 1.6s ease-in-out infinite; }
      @media (min-width: 240rem) {
        .mr-heading { font-size: 5.5rem !important; }
        .mr-para { font-size: 4rem !important; }
        .mr-obj-text { font-size: 2.5rem !important; }
        .mr-stat-value { font-size: 4.5rem !important; }
        .mr-header-row { padding-left: 5rem !important; padding-right: 5rem !important; }
        .mr-header-row span:first-child { font-size: 5rem !important; }
        .mr-header-row h3 { font-size: 5.5rem !important; }
        .mr-header-content { padding-left: 5rem !important; padding-right: 5rem !important; }
      }
    `}</style>
    <section ref={sectionRef} id="reports" className="mission-reports-section relative w-full">
      <GlobalTexture />
      <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">
        <div className="pointer-events-none absolute top-0 left-0 w-px h-full bg-white/20 z-50" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 right-0 w-px h-full bg-white/20 z-50" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-50" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20 z-50" aria-hidden="true" />

        <CornerLeft className="pointer-events-none absolute z-50 top-0 left-0 -translate-y-1/2" />
        <CornerRight className="pointer-events-none absolute z-50 top-0 right-0 -translate-y-1/2" />
        <CornerLeft className="pointer-events-none absolute z-50 bottom-0 left-0 translate-y-1/2" />
        <CornerRight className="pointer-events-none absolute z-50 bottom-0 right-0 translate-y-1/2" />

        {/* Heading + glow line */}
        <div
          ref={headerContentRef}
          className="mr-header-content relative z-40"
          style={{ padding: "clamp(4rem, 6vw, 6rem) clamp(0.75rem, 3vw, 3rem) 0" }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
            <h2 className="mr-heading font-host text-white leading-none tracking-tight" style={{ fontSize: "clamp(2.25rem, 3.2vw, 3.75rem)" }}>Mission Reports</h2>
            <span className="mr-label font-host text-xs md:text-sm 4xl:text-base 5xl:text-lg tracking-tight uppercase text-[#FF6F21] shrink-0 sm:ml-4">CASE STUDIES</span>
          </div>
          <GlowLine />
        </div>

        {/* Stage: paragraph + accordion items. Overflow hidden clips translated items to the stage bounds. */}
        <div
          ref={stageRef}
          className="relative z-40 overflow-hidden"
          style={stageStyle}
        >
          {/* Paragraph area — inside the stage on desktop, in flow on mobile */}
          <div
            ref={paragraphAreaRef}
            style={paragraphStyle}
            className={isDesktopLayout ? "" : "mr-header-content px-4 sm:px-6 md:px-8"}
          >
            <div
              className={
                isDesktopLayout
                  ? "grid grid-cols-12 gap-x-4 sm:gap-x-10 gap-y-4 md:gap-y-5 lg:gap-y-8 h-full"
                  : "grid grid-cols-12 gap-x-4 sm:gap-x-10 gap-y-8 mt-8 md:mt-10 mb-20 md:mb-28"
              }
              style={isDesktopLayout ? { padding: "2rem clamp(1.25rem, 3vw, 3rem)" } : undefined}
            >
              <div className="col-span-12 lg:col-span-5 flex flex-col">
                <div className="hidden md:flex flex-wrap md:flex-row gap-x-8 gap-y-2 mb-auto justify-between">
                  {["Real distribution", "Real operations", "Measurable outcomes"].map((tag) => (
                    <span key={tag} className="mr-tag font-host text-sm 4xl:text-base 5xl:text-lg font-thin text-white tracking-tight">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <p className="mr-para font-bricolage text-white leading-[0.95] font-light tracking-tight" style={{ fontSize: "clamp(2.3rem, 2.8vw, 3.2rem)" }}>
                  Every mission is executed through high&#8209;volume content, precise signals, and engineered feedback loops turning attention into traffic, and traffic into results.
                </p>
              </div>
            </div>
          </div>

          {/* Tap hint — visible only on screens smaller than lg, sits just above the first accordion */}
          <div ref={tapHintRef} className="lg:hidden flex justify-center pointer-events-none" style={hintStyle}>
            <svg className="mr-tap-hint" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11 3 L11 18 M4 11 L11 18 L18 11" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Accordion items */}
          <AccordionItem
            data={caseStudies[0]}
            isActive={activeIndex === 0}
            onClick={() => handleClick(0)}
            containerRef={item1ContainerRef}
            headerRef={item1HeaderRef}
            contentWrapRef={item1ContentWrapRef}
            contentInnerRef={item1ContentInnerRef}
            expandedHeight={expandedHeight}
            absolutePos={item1AbsolutePos}
          />
          <AccordionItem
            data={caseStudies[1]}
            isActive={activeIndex === 1}
            onClick={() => handleClick(1)}
            containerRef={item2ContainerRef}
            headerRef={item2HeaderRef}
            contentWrapRef={item2ContentWrapRef}
            contentInnerRef={item2ContentInnerRef}
            expandedHeight={expandedHeight}
            absolutePos={item2AbsolutePos}
          />
          <AccordionItem
            data={caseStudies[2]}
            isActive={activeIndex === 2}
            onClick={() => handleClick(2)}
            containerRef={item3ContainerRef}
            headerRef={item3HeaderRef}
            contentWrapRef={item3ContentWrapRef}
            contentInnerRef={item3ContentInnerRef}
            expandedHeight={expandedHeight}
            absolutePos={item3AbsolutePos}
          />

          <div className="h-px bg-[#FF6F21]/70" style={bottomBorderStyle} />
        </div>
      </div>
    </section>
    </>
  );
}