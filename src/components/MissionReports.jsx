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
    <svg className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 221">
      <path fill="#555" d="M139.3 2.2c-.5.7-1 2.4-1.1 3.8-.2 2 3 5.7 17.5 20.1 12 11.9 18.9 18 21.2 18.8 2.4.8 19.7 1.1 57.4 1.1l53.9-.1 3.5 2.7c7.5 5.7 7 16.6-1 21.4-3 1.9-5.3 2-41.3 2-35.6 0-38.2.1-39.7 1.8-1 1-1.7 2.6-1.7 3.4 0 2.3 9.5 12.2 10.8 11.4.7-.4 1-.2.7.6-.7 1.9 22.2 24.3 26.7 26.2 5.1 2.2 36.4 2.2 47.4.1 8.6-1.6 23.1-8.3 22.6-10.4-.1-.7.2-.9.9-.5s3.7-2.1 7.5-6c11.7-12.3 17.9-30.5 15.6-46.5-1.1-7.7-4.4-18.9-5.9-20-.5-.3-.9-1.3-1.1-2.1-.7-3.2-6.6-11.2-11.5-15.6-5.3-4.8-14-9.8-15.1-8.7-.3.4-.6.2-.6-.4s-2.9-1.8-6.5-2.7C293.9 1.2 283.8 1 216.7 1c-60 0-76.7.3-77.4 1.2M395.1 168c-7.3 1.8-12.3 7.6-12.3 14.3 0 5.2 3.3 11 5.6 10.1.8-.3 1.7 0 2.2.7.5.8.3 1-.7.4-1-.5-1.1-.5-.4.3.6.5 4.1 2 8 3.1 10.5 3.2 12.9 6.5 8.2 10.9-3 2.9-9.8 2.9-15.2.2l-3.9-2-3.1 3.1c-1.6 1.8-2.5 2.9-1.9 2.5.7-.3 1.4.2 1.7 1.3.8 3.3 9.4 6.6 17 6.6 4.9 0 7-.4 7.7-1.5.5-.8 1-1.1 1-.7 0 .5 1.3.1 2.9-.9 5.9-3.5 8.5-12.3 5.4-18.4-2-3.8-8.8-8.3-11.6-7.6-.9.2-1.5.1-1.2-.4.2-.4-1.6-1.3-4.1-2-4-1.1-7.4-4-7.4-6.2 0-.5.9-1.7 2-2.8 2.4-2.4 8.7-2.7 11.6-.5 1 .8 2.2 1.5 2.6 1.5 1 0 6.8-5.1 6.8-6 0-1.7-8.5-5.8-13-6.4-2.5-.2-6-.1-7.9.4m-361.1.7c-4.1.2-7.7.8-8 1.2-.3.5-.4 11.7-.2 25l.3 24.1h10.4c15.3 0 23-3 28.8-11.2 1.6-2.3 3-5 3.1-6.2s.5-2.6.7-3.1c1-1.7 1-8.7.1-8.1-.5.3-.7-.5-.5-1.8.7-3.3-2.9-9.8-7.7-13.8-6-5.2-13-6.8-27-6.1M50.5 180c5.9 2.8 9.5 9.7 8.4 15.8-1.7 8.8-7.9 13.5-17.2 13l-5.2-.3-.3-14c-.1-7.6 0-14.5.2-15.2.8-2 9.4-1.6 14.1.7m44.5-9.2c-5.8 2.9-12.5 10.4-11.6 12.9.3.8.2 1.1-.3.8-1-.6-2.6 7.5-2.3 11 1.6 14.1 13.4 24.5 27.7 24.5 7 0 16.8-5 21.3-10.9 1.8-2.4 3.1-5 2.8-5.7s0-1.4.6-1.6 1.3-3.1 1.6-6.5c.5-7.2-1.7-12.9-7.2-19.1-5.3-5.8-11-8.2-19.8-8.2-5.9 0-8.3.5-12.8 2.8m20.2 8.4c2.1 1 4.9 3.5 6.4 5.7 2.3 3.5 2.5 4.7 2 9.8-.8 8.5-1 9.2-1.7 8.8-.3-.3-1.5.5-2.5 1.7-2.4 2.6-7.5 4.8-11.3 4.8-4.2 0-11-2.9-12.2-5.1-.5-1.1-1.4-1.7-2-1.4-.5.4-.8.3-.7-.2.1-.4-.4-2.9-1.1-5.6-1.2-4.1-1.2-5.2.3-9 2.3-6.1 6.5-9.7 12.8-11.2 2.9-.6 5.5-.9 5.8-.6s2.2 1.4 4.2 2.3m46.2-9.3c-10 4.6-15.6 13-15.6 23.5 0 10.7 4.9 18.5 15 23.7 3.7 1.9 6.2 2.4 12.1 2.4 4.9 0 7.6-.4 7.8-1.2.3-.7 1.1-.9 2-.6 1.2.5 1.4.3.8-.7-.5-.9-.4-1.1.4-.6.7.5 2.8-.4 4.9-2 4.5-3.4 5.6-4.7 8.4-9.9s3-16.3.3-21.5c-2.3-4.6-6.5-9.1-7.8-8.3q-.9.45-.3-.6c.5-.7-1.1-2-4.6-3.6-6.7-3.1-17.2-3.4-23.4-.6m20 9.9c1.6 1 4 3.7 5.4 6.2 7.5 14.2-7.8 29.6-22 22.1-1.9-1.1-3.9-1.7-4.3-1.3s-.6.2-.4-.3c.1-.6-.7-3-1.9-5.5-2.7-5.7-2.7-9.2-.2-14.6 4.2-8.6 14.8-11.6 23.4-6.6m161.2-11.1c-1.9 1.9-19.8 48.2-19.1 49.4.9 1.4 9.1 1.1 10.2-.3.5-.7 1.7-3.4 2.7-6.1l1.8-4.7H357l1.4 3.2c.8 1.8 1.9 4.5 2.5 6 1 2.6 1.5 2.8 6.2 2.8 5 0 5.1 0 4.6-2.8-.5-2.7-13-35.3-14.4-37.5-.4-.7-.8-1.4-.8-1.7-.3-2-2-5.8-3.3-7.3-1.5-1.7-9.1-2.5-10.6-1m8.2 20.5c1.2 3.5 2.2 6.9 2.2 7.5 0 1.5-9.5 1.9-10.4.5-.8-1.3 3.9-14.2 5.1-14.2.5 0 1.8 2.8 3.1 6.2m82.7-20c-.3.7-.4 12.1-.3 25.3l.3 24h9l.5-10 .5-10 9.9-.3c5.9-.2 10.3.1 11 .8.5.5 1 5.2 1.1 10.2v9.3h9l.5-23.8c.3-13.1.1-24.5-.3-25.3-.8-1.5-6.4-1.9-8.4-.6-.8.5-1.1 3.6-1 9.4.1 5.2-.3 9.2-.9 9.8-.7.7-4.9 1-11 .8l-9.9-.3-.5-10-.5-10-4.3-.3c-2.8-.2-4.4.1-4.7 1M214 192.4c0 12.9.3 24.1.6 25 .9 2.2 8.9 2.2 9.8 0 .3-.9.6-4.9.6-9V201h8.8l4.3 7.7c5.2 9.6 5.9 10.3 10.2 10.3 5.9 0 6.1-1.7 1.2-10-2.4-4.1-4.4-8-4.5-8.6 0-.7 1.1-1.9 2.4-2.7 5.7-3.8 7.4-16.1 3-22-4.1-5.6-7.9-6.7-22.8-6.7H214zm26.5-11.9c3 2.9 3.2 5.4.5 8.3-2.5 2.7-5.3 3.4-11.1 3l-4.4-.3-.3-5.4c-.5-7.8-.2-8.1 6.8-8.1 5.1 0 6.5.4 8.5 2.5M271 194v25.2l12.8-.4c11.1-.3 13.3-.6 17.6-2.8 17.8-9.1 18-34.9.2-44.3-3.5-1.8-6.1-2.2-17.3-2.5l-13.3-.4zm28.2-11.5c3.9 4.8 4.7 6.8 4.8 11.5 0 5.4-2.6 10.2-7.2 13-2.5 1.6-4.7 2-9.3 1.8l-6-.3-.3-13.9c-.1-8 .2-14.3.7-15 .7-.8 3.1-1 8-.5 6.2.5 7.4 1 9.3 3.4"/><path d="M465.2 180.5c0 1.6.2 2.2.5 1.2.2-.9.2-2.3 0-3-.3-.6-.5.1-.5 1.8M388 192.4c0 .2.7.7 1.6 1 .8.3 1.2.2.9-.4-.6-1-2.5-1.4-2.5-.6m77.3 16.6c0 2.5.2 3.5.4 2.2.2-1.2.2-3.2 0-4.5-.2-1.2-.4-.2-.4 2.3"/>
    </svg>
  );
}

function FloLogo({ className = "" }) {
  return (
    <svg className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399 133">
      <path fill="#555" d="M2.5 2.2c-.3.7-.4 30.1-.3 65.3l.3 64h130V1.5l-64.8-.3c-51.3-.2-64.9 0-65.2 1M36 64.5v46.6l-8.2-.3-8.3-.3-.3-44c-.1-24.2 0-45 .3-46.3.5-2 1.1-2.2 8.5-2.2h8zm57.3-43.8c7.3 2.6 15.7 10.6 19.2 18.4 2.2 4.9 2.8 7.8 2.8 13.3.1 11-2.3 16.8-10.2 24.7S91.3 87.5 80.5 87.4c-12.3 0-24.2-7.4-30.3-18.9-2.4-4.5-2.7-6-2.7-15.5 0-12.1 1.4-15.8 9.1-24.1 9.5-10 23-13.1 36.7-8.2m297.4-2.1c-.4.4-.7 21.4-.7 46.6V111h7l-.2-46.3-.3-46.2-2.5-.3c-1.4-.2-2.9 0-3.3.4M138.5 51.2c-.3 1.3-.4 7.9-.3 14.8l.3 12.5 3.3.3c3.1.3 3.2.2 3.2-3.7 0-4.2.9-4.8 5.7-4.2.7.1 2.8-.5 4.8-1.3 7-3 8.4-13 2.4-18-2.7-2.3-3.9-2.6-11-2.6-7.3 0-7.9.2-8.4 2.2m14.5 5.2c1.8 2.3.8 5.9-2.1 7.5-4.1 2.3-5.9.9-5.9-4.4 0-4.4 0-4.5 3.4-4.5 1.8 0 3.9.7 4.6 1.4m24.2-5.7c-.5 1-1.5 3.6-2.1 5.8-.7 2.2-1.7 4.9-2.2 6-1.5 3.3-4.9 13.7-4.9 15.2 0 2.2 6.3 1.6 7.8-.7.9-1.5 2.3-2 5.2-2s4.2.5 5 2c.8 1.4 2.1 2 4.5 2 1.9 0 3.5-.3 3.5-.6 0-1.4-9.3-27-10.2-28.2-1.5-1.8-5.6-1.5-6.6.5m4.7 11.5c2.5 6.6 2.4 6.8-.8 6.8-3.4 0-3.7-.9-2-5.9 1.3-3.7 1.7-3.8 2.8-.9m18.4-12.5c-.7.2-1.3 1.6-1.3 2.9 0 2 .5 2.4 3 2.4 1.7 0 3 .5 3.1 1.2 0 .7 0 5.4-.1 10.3-.1 11.1.3 12.5 4.1 12.5h2.9V68.2c0-11.5.6-13.2 4.7-13.2 1.8 0 2.3-.6 2.3-2.4 0-1.3-.7-2.7-1.6-3-1.9-.7-15.3-.7-17.1.1m30.4 0c-.4.3-.7 7.1-.7 15V79h2.9c3 0 4.1-1.4 4.1-5.5s1.8-3.7 5 1c2.7 3.9 3.6 4.5 6.5 4.5 1.9 0 3.5-.2 3.5-.5 0-.2-.9-1.9-2-3.7-2.5-4.1-2.5-5.3 0-8 1.4-1.5 2-3.6 2-6.8 0-5.1-2.1-8-7.3-9.9-3.1-1.2-13-1.5-14-.4m13.3 6.7c1.8 2.3.8 5.9-2.2 7.5-3.7 2.1-5.5.4-5-4.8.4-3.7.7-4.1 3.2-4.1 1.5 0 3.3.7 4 1.4m21.3-6.7c-1 .3-1.3 4.3-1.3 14.9V79h9c8.9 0 9 0 9-2.4 0-2.3-.4-2.5-5.2-2.8-5.1-.3-5.3-.4-5.3-3.3s.2-3 5.3-3.3c5-.3 5.2-.4 5.2-3.3s-.1-2.9-5.5-2.9-5.5 0-5.5-3 .1-3 5.5-3c5.1 0 5.5-.2 5.5-2.4 0-1.3-.7-2.7-1.6-3-1.8-.7-13.3-.7-15.1.1m35 1.3c-6 3.6-8.4 10.2-6.4 17.6 3.4 12.8 22.2 14.9 28.2 3.2 3.7-7.3 2-15.4-4.4-20.2-4.3-3.3-12.5-3.6-17.4-.6m14.1 7.1c2.9 3.5 3.3 6.7 1.1 10.8-1.6 3.2-3.3 4.1-7.5 4.1-3.4 0-8-4.9-8-8.6 0-8.6 9.1-12.6 14.4-6.3m21.8-7.9c-1.3 1.3-1.8 24.2-.6 27.2.4 1 1.8 1.6 3.5 1.6h2.9v-7.8c0-4.3.3-8.2.6-8.5.4-.4 1.8 1.5 3.2 4.1 5.8 10.9 7 12.3 10.5 12l3.2-.3.3-14.2.3-14.2-2.5-.7c-4-1-4.6.2-4.6 8.7 0 4.3-.3 7.9-.7 7.9-.5 0-1.7-1.9-2.8-4.2-4.1-8.5-7.3-12.8-9.8-12.8-1.3 0-2.8.5-3.5 1.2"/><path fill="gray" d="M81.8 18.7c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5s-1.9.2-1.2.5M19.5 64c0 24.5.1 34.5.2 22.3.2-12.3.2-32.3 0-44.5-.1-12.3-.2-2.3-.2 22.2m95.7-10c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3m-95.5 56.1c.7.7 1.5 1 1.8.7s-.2-.9-1.2-1.2c-1.4-.6-1.5-.5-.6.5m4.6.6c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5m6.5 0c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4"/>
    </svg>
  );
}

function TwitchLogo({ className = "" }) {
  return (
    <svg className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 143">
      <path fill="#555" d="M43 49.4v47.4l10.3 10.4c8.8 8.9 12.3 11.6 25.7 19.7 8.5 5.2 16.6 10 18 10.7 1.8 1 6.9 1.4 17.8 1.4 14.5 0 15.2-.1 15.2-2 0-2.5.7-2.5 6.5 0 4.3 1.8 6.9 2 34 2h29.3l4.8-5.7c4.6-5.4 4.9-5.5 5.5-3.2.4 1.3.7 3.9.8 5.6l.1 3.3h38v-5.5c0-3 .4-5.5.8-5.5.5 0 3.6 2.5 6.9 5.5l6.1 5.5h16.5c18.4 0 16.9.6 18.3-7.3.3-2 .9-3.7 1.3-3.7s3.1 2.5 6.1 5.5l5.4 5.5h38l5.8-5.7 5.8-5.7V139h22l7.5-5.5c4-3 7.8-5.5 8.2-5.5s.6 2.5.5 5.5l-.4 5.5h24.3l17.5-11.7 17.4-11.6V44.5l-10.8-10.8L435.5 23H410V2h-44.6L355 12.5 344.6 23h-24l-6.3 6.2-6.3 6.2V23h-21V2h-81v21h-97.5L98 12.5 87.5 2H43zm35-27.9v10.4l10.8.3 10.7.3v26l-10.7.3-10.8.3V82h22.1l-.3 13.2-.3 13.3-15.5.3-15.4.3-8.3-8.3-8.3-8.3V11h26zM242 17v6.1l-13.2-.3-13.3-.3-.3-3.4c-.2-1.9-.1-4.4.2-5.7.6-2.4.8-2.4 13.6-2.4h13zm35.3-3.3c.3 1.4.5 5.7.5 9.5.1 3.7.1 7.4.1 8 .1 1 2.8 1.3 10.3 1.3h10.3l.3 13.2.3 13.3h-21.9l.4 10.2c.2 5.7.4 10.9.4 11.5 0 1 2.8 1.3 10.5 1.3H299v27h-31.7l-8.1-8.5-8.2-8.4V11h25.8zm123.1-1.1c.3.9.6 5.7.6 10.7v9.2h30.8l8.1 8.4 8.1 8.4V109h-26V59h-21l-.2 24.7-.3 24.8h-26l-.3-47.5c-.1-26.1 0-48.1.3-48.8.3-.9 3.8-1.2 12.9-1.2 10.4 0 12.5.3 13 1.6M135 57v25h9l.2-24.8.3-24.7h26l.3 24.7.2 24.8h9V32h25.9l.3 30 .3 30-8.5 8.5-8.5 8.5H109V32h26zm107 13.7v38.4l-13.2-.3-13.3-.3-.3-37c-.1-20.3 0-37.5.2-38.1.3-.7 4.9-1.1 13.5-1.1H242zm123-25.2V59h-31v23h31v27h-40.1l-8.5-8.2-8.4-8.2V49l7.3-7.3c3.9-4.1 8.1-7.9 9.2-8.5 1.3-.7 8.6-1.1 21.3-1.2H365z"/>
      <path fill="gray" d="m352.9 13.7-2.4 2.8 2.8-2.4c1.5-1.4 2.7-2.6 2.7-2.8 0-.8-.8-.1-3.1 2.4m-137.6 3.8c0 2.7.2 3.8.4 2.2.2-1.5.2-3.7 0-5-.2-1.2-.4 0-.4 2.8m130.1 3.7-1.9 2.3 2.3-1.9c2.1-1.8 2.7-2.6 1.9-2.6-.2 0-1.2 1-2.3 2.2M215.5 33.3c-.3.6-.4 17.9-.2 38.2l.2 37 .3-37.7.2-37.7 4.3-.4 4.2-.4-4.3-.1c-2.6-.1-4.4.3-4.7 1.1m15.8-.6c.9.2 2.5.2 3.5 0 .9-.3.1-.5-1.8-.5s-2.7.2-1.7.5m7 0c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5m90.5 0c1.8.2 4.5.2 6 0s0-.4-3.3-.4-4.5.2-2.7.4m24 0c1.7.2 4.7.2 6.5 0 1.7-.2.3-.4-3.3-.4s-5 .2-3.2.4m57 0c2.9.2 7.4.2 10 0s.2-.3-5.3-.3-7.6.1-4.7.3m22.2.7c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3M56 110.5c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5M358.5 129c-.3.5-.1 1 .4 1 .6 0 1.1-.5 1.1-1 0-.6-.2-1-.4-1-.3 0-.8.4-1.1 1"/>
    </svg>
  );
}

/* ─── Reusable header row content ─── */
function HeaderRowContent({ data, bgClass = "", textClass = "text-white", isActive = false }) {
  const tnfColorClass = isActive ? "text-white" : "text-[#BBBBBB]";
  const floColorClass = isActive ? "text-white" : "text-[#BBBBBB]";
  const twitchColorClass = isActive ? "text-white" : "text-[#BBBBBB]";
  const logoColorClass = data.logo === "tnf" ? tnfColorClass : data.logo === "twitch" ? twitchColorClass : floColorClass;
  const LogoComponent = data.logo === "tnf" ? TNFLogo : data.logo === "twitch" ? TwitchLogo : FloLogo;

  return (
    <div className={`mr-header-row w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-12 items-center gap-x-3 sm:gap-x-0 ${bgClass}`} style={{ padding: "1.75rem clamp(1rem, 4vw, 3rem)" }}>
      <span className={`sm:col-span-3 font-bricolage text-[#FF6F21]`} style={{ fontSize: "clamp(1.25rem, 2.8vw, 3.25rem)" }}>
        {data.id}
      </span>
      <h3 className={`sm:col-span-7 sm:col-start-4 font-bricolage leading-none ${textClass}`} style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.75rem)" }}>
        {data.brand}
      </h3>
      <div className="sm:col-span-2 flex justify-end">
        <LogoComponent className={`h-10 md:h-13 4xl:h-16 5xl:h-20 w-auto ${logoColorClass} transition-colors duration-300`} />
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
    id: "01", brand: "DoorDash", logo: "tnf",
    link: "https://app.notion.com/p/How-Beyond-Viral-Drove-610K-in-Revenue-for-DoorDash-Through-Organic-Content-3762f6cae24b81f5ac37fd9ac9cb797b",
    tagline: "Engineering Discovery \nfor a Hidden Platform",
    objective: "Increase cultural relevance among Gen Z consumers through localized creator campaigns and fast-moving social content.",
    execution: "Built trend-native campaigns, food-focused creator collaborations, and short-form lifestyle content engineered for platform reach.",
    stats: [{ value: "13.4M+", label: "Organic Views" }, { value: "201K+", label: "App Visits" }, { value: "$610K+", label: "Revenue Generated" }],
  },
  {
    id: "02", brand: "Patreon", logo: "flo",
    link: "https://app.notion.com/p/How-Beyond-Viral-Made-Patreon-the-Default-Home-for-Creator-Monetization-3762f6cae24b81b7afa9fca40323d15f",
    tagline: "Engineering an Organic\nComeback.",
    objective: "Increase creator adoption by positioning Patreon as the default monetization platform for independent digital creators.",
    execution: "Produced educational creator content, monetization-focused storytelling, and platform-native short-form campaigns designed for conversion.",
    stats: [{ value: "9.6M+", label: "Organic Views" }, { value: "127K+", label: "Landing Page Visits" }, { value: "$390K+ ", label: "Revenue Driven" }],
  },
  {
    id: "03", brand: "Twitch", logo: "twitch",
    link: "https://giant-rubidium-888.notion.site/How-Viral-Labs-Engineered-Flo-s-Organic-Comeback-30b7dca4ef9f801aa0e8f90b6ef91284?source=copy_link",
    tagline: "Engineering an Organic\nComeback.",
    objective: "Expand Twitch’s cultural presence outside gaming through creator-led organic campaigns targeting livestream and internet culture audiences.",
    execution: "Built high-frequency short-form content pipelines featuring stream highlights, creator moments, and trend-reactive edits optimized for discoverability.",
    stats: [{ value: "16M+", label: "Organic Views" }, { value: "218K+", label: "Website Visits" }, { value: "$720K+ ", label: "Revenue Generated" }],
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
            <div className="flex items-center gap-1">
              {/* Text */}
              <span className="text-[#FF6F21] text-[20px] font-host font-semibold whitespace-nowrap leading-none tracking-tight" style={{ filter: "drop-shadow(0 0 2px #FF6F21)" }}>
                Open Report  
              </span>
              <span className="text-[#FF6F21] text-[20px] font-host font-semibold whitespace-nowrap leading-none tracking-tight" style={{ filter: "drop-shadow(0 0 2px #FF6F21)" }}>
                   
              </span>
              {/* Folder Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: "drop-shadow(0 0 3px #FF6F21)" }}>
                <path d="M3 6c0-1.1.9-2 2-2h6l2-2h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6z" stroke="#FF6F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
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