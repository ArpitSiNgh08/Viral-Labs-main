/**
 * viralityState.js — Shared state between GSAP (DOM) and R3F (Canvas).
 *
 * GSAP ScrollTrigger scrubs globeProgress from 0 → 1.
 * GlobeScene's useFrame reads it every frame to position + scale the globe.
 *
 * Globe starts: slightly visible from the left, closer to camera, scaled up
 * Globe ends:   center, normal distance, normal scale
 */

export const viralityState = {
  // 0 → 1, scrubbed by ScrollTrigger
  globeProgress: 0,

  // Position endpoints
  startX: -1.3,
  startZ: 1.0,
  endX: 0,
  endZ: 0,

  // Scale endpoints
  startScale: 1.5,
  endScale: 1.0,
};