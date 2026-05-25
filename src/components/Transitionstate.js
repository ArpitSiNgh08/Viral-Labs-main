/**
 * transitionState — shared reactive object for scroll-driven transitions.
 *
 * revealProgress: 0→1 drives the dissolve shader (ACT 1 → ACT 2)
 * zoomProgress:   0→1 drives the plane zoom-forward during ACT 1
 *
 * GSAP tweens these directly from HeroSection scroll timeline.
 * GlobalCanvas reads them every frame in useFrame.
 */
export const transitionState = {
  revealProgress: 0,
  zoomProgress: 0,
};