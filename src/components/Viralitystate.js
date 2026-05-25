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
  startX: -2.2,
  startY: -2,
  startZ: 0.5,
  endX: 0,
  endY: 1.2,
  endZ: 0,

  // Scale endpoints
  startScale: 2.2,
  endScale: 1.2};