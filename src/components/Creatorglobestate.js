/**
 * creatorGlobeState — Shared mutable state for the Creator Network globe.
 *
 * globeYOffset / globeXOffset ownership:
 *  - Rocket section pinned → RocketLaunchSection timeline (scrubbed)
 *  - Between sections (scroll approach) → GlobeCanvas RAF
 *  - CN section pinned → CreatorNetworkSection onUpdate
 *  These are mutually exclusive, so no conflicts.
 */

export const creatorGlobeState = {
  tooltipX: 0,
  tooltipY: 0,
  hoveredData: null,
  isDragging: false,

  globeYOffset: 1.3,
  globeXOffset: 1.05,
  globeOpacity: 0,
  interactive: false,

  // Constellation wireframe + dots opacity.
  // 0 during rocket phase, fades to 1 during CN settle.
  constellationOpacity: 0,

  // CN section DOM element — for exit tracking (translateY follows CN off-screen).
  cnSectionEl: null,
};