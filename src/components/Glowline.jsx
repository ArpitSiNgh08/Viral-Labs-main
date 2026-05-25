/**
 * GlowLine — Animated glowing line accent.
 * Recreates the stacked glow-line effect from the Figma design
 * using pure CSS gradients and blur layers.
 *
 * Usage:
 *   <GlowLine width={160} />           // CTA glow line (default orange)
 *   <GlowLine width={66} color="warm" /> // Navbar glow line
 */

export default function GlowLine({
    width = 160,
    color = "orange",
  }) {
    const baseColor =
      color === "warm"
        ? "rgba(255,200,150"
        : "rgba(255,160,60";
  
    return (
      <div
        className="relative pointer-events-none"
        style={{ width: `${width}px`, height: "3px" }}
        aria-hidden="true"
      >
        {/* Layer 1 — sharp core line */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${baseColor},0.9) 30%, ${baseColor},1) 50%, ${baseColor},0.9) 70%, transparent 100%)`,
            mixBlendMode: "plus-lighter",
          }}
        />
        {/* Layer 2 — medium glow */}
        <div
          className="absolute -inset-x-[6%] -inset-y-[200%]"
          style={{
            background: `linear-gradient(90deg, transparent 5%, ${baseColor},0.5) 35%, ${baseColor},0.7) 50%, ${baseColor},0.5) 65%, transparent 95%)`,
            filter: "blur(3px)",
            mixBlendMode: "plus-lighter",
          }}
        />
        {/* Layer 3 — wide soft glow */}
        <div
          className="absolute -inset-x-[7%] -inset-y-[400%]"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${baseColor},0.3) 35%, ${baseColor},0.4) 50%, ${baseColor},0.3) 65%, transparent 90%)`,
            filter: "blur(6px)",
            mixBlendMode: "plus-lighter",
          }}
        />
      </div>
    );
  }