/**
 * SharedCanvas — Single shared WebGL context for all 3D Views.
 *
 * Mount this ONCE at the App/layout level. It creates a fixed full-screen
 * Canvas with pointer-events-none so DOM content beneath it stays interactive.
 *
 * Every <View track={ref}> anywhere in the tree renders into this Canvas
 * via <View.Port />, each clipped to its tracked DOM element's bounds.
 *
 * NOTES:
 *  - eventSource must be the root DOM element so pointer events propagate
 *    correctly from DOM → Canvas → individual Views.
 *  - eventPrefix="client" ensures coordinates are calculated relative to
 *    the client viewport, which is what Views need for scissor math.
 *  - z-index should sit between your background layers and foreground DOM.
 *    Adjust if needed based on your section z-index scheme.
 */

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

/**
 * @param {{ containerRef: React.RefObject<HTMLElement> }} props
 *   containerRef — ref to the common parent element that wraps BOTH this
 *   Canvas AND all <View> components in the page. drei's View system uses
 *   this to connect Views to the Canvas's R3F store.
 *
 *   In App.jsx:  <main ref={containerRef}> ... <SharedCanvas containerRef={containerRef} /> ... </main>
 */
export default function SharedCanvas({ containerRef }) {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: "transparent",
        zIndex: 5,
      }}
      eventSource={containerRef}
      eventPrefix="client"
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <View.Port />
    </Canvas>
  );
}