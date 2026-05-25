/**
 * CreatorGlobeOffsetGroup
 *
 * Wrapper group that reads creatorGlobeState.globeXOffset and
 * globeYOffset every frame and applies them as position offsets.
 * Sits OUTSIDE the rotated group so offsets are in View-space.
 *
 * GSAP in RocketLaunchSection drives both values:
 *   - globeXOffset: starts at ~1.05 (centers globe under rocket by
 *     canceling the inner group's -1.05 X position), animates to 0
 *     so globe drifts left to its CN position.
 *   - globeYOffset: starts at ~1.2 (pushes globe down), animates to 0
 *     so globe rises to its CN position.
 *
 * Usage in App.jsx:
 *   <View track={creatorViewRef}>
 *     <PerspectiveCamera makeDefault position={[0, 0, 2.8]} fov={45} />
 *     <CreatorGlobeOffsetGroup>
 *       <group position={[-1.05, -0.25, 0.73]} rotation={[-0.2, 0.64, 1.23]}>
 *         <CreatorGlobe containerRef={creatorViewRef} />
 *       </group>
 *     </CreatorGlobeOffsetGroup>
 *   </View>
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { creatorGlobeState } from "./Creatorglobestate";

export default function CreatorGlobeOffsetGroup({ children }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // X: positive offset cancels child group's -1.05, centering globe.
      //    As it animates to 0, the child's -1.05 takes over → globe moves left.
      groupRef.current.position.x = creatorGlobeState.globeXOffset;

      // Y: negative because positive globeYOffset = push globe DOWN on screen.
      groupRef.current.position.y = -creatorGlobeState.globeYOffset;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}