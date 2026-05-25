/**
 * CreatorGlobeTooltip — Glassmorphic hover card for CreatorGlobe hubs.
 *
 * Reads position + data from creatorGlobeState (mutable bridge)
 * and React state for visibility toggling.
 *
 * FEATURES:
 *  - Backdrop blur glass effect
 *  - Chromatic aberration prismatic border
 *  - No graph — clean stat layout
 *  - Platform icons (X, Instagram, TikTok)
 *  - Animated entrance/exit
 *
 * USAGE:
 *  <CreatorGlobeTooltip hoveredData={hoveredData} />
 *  (where hoveredData is set via onHoverChange or polling creatorGlobeState)
 */

import { useRef, useEffect, useState } from "react";
import { creatorGlobeState } from "./Creatorglobestate";

// ── Platform SVG icons ──
const PlatformIcon = ({ platform }) => {
  if (platform === "x") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.45a4.85 4.85 0 01-3.77-1.26V6.69h3.77z" />
      </svg>
    );
  }
  return null;
};

export default function CreatorGlobeTooltip({ hoveredData }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Poll mutable state position every frame for smooth tracking
  useEffect(() => {
    const update = () => {
      if (creatorGlobeState.hoveredData) {
        setPos({ x: creatorGlobeState.tooltipX, y: creatorGlobeState.tooltipY });
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!hoveredData) return null;

  const {
    handle,
    platform,
    avatar,
    nodeId,
    monthlyInstalls,
    totalInstalls,
    growth,
    viralCoeff,
    sources,
  } = hoveredData;

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -110%)",
        pointerEvents: "none",
        zIndex: 100,
        animation: "tooltipFadeIn 0.3s ease-out",
      }}
    >
      {/* Chromatic aberration outer glow */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "18px",
          background:
            "conic-gradient(from 45deg, rgba(255,80,80,0.5), rgba(255,160,50,0.6), rgba(255,220,60,0.4), rgba(80,255,120,0.3), rgba(60,180,255,0.4), rgba(160,80,255,0.5), rgba(255,80,80,0.5))",
          filter: "blur(4px)",
          opacity: 0.55,
          zIndex: -1,
        }}
      />

      {/* Chromatic aberration inner border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.12)",
          background:
            "conic-gradient(from 180deg, rgba(255,100,50,0.15), rgba(255,200,60,0.1), rgba(100,255,150,0.08), rgba(80,160,255,0.12), rgba(200,100,255,0.15), rgba(255,100,50,0.15))",
          zIndex: -1,
        }}
      />

      {/* Main glass card */}
      <div
        style={{
          width: "280px",
          padding: "18px 20px",
          borderRadius: "16px",
          background: "rgba(18, 18, 22, 0.72)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
          fontFamily: "'DM Sans', 'Manrope', system-ui, sans-serif",
        }}
      >
        {/* Header: Avatar + Handle + Platform */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src={avatar}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid rgba(255,255,255,0.15)",
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {handle}
              </span>
              <PlatformIcon platform={platform} />
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.5px",
                marginTop: "2px",
              }}
            >
              {nodeId}
            </div>
          </div>
        </div>

        {/* Stats row: Monthly + Total Reach */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "14px",
            paddingBottom: "14px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Monthly */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ADE80",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                Monthly
              </span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
              {monthlyInstalls}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, color: "#4ADE80", marginTop: "3px" }}>
              {growth}{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>v. last mo</span>
            </div>
          </div>

          {/* Total Reach */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#FF8C21",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                Total Reach
              </span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
              {totalInstalls}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, color: "#FF8C21", marginTop: "3px" }}>
              {viralCoeff}x{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>viral coeff</span>
            </div>
          </div>
        </div>

        {/* Sources breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {sources.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12.5px",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>
                {s.name}
              </span>
              <span style={{ color: "#fff", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {s.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -105%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -110%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}