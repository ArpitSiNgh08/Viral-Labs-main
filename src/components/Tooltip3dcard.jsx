/**
 * Tooltip3DCard — WebGL glass tooltip rendered inside the globe View.
 *
 * Uses MeshTransmissionMaterial from drei for real refraction + chromatic
 * aberration through the globe content behind it. Text overlay via drei's
 * Html component for crisp DOM rendering on top of the glass plane.
 *
 * PLACEMENT:
 *   Lives inside CreatorGlobe's <group>, so it inherits the globe's
 *   world transform. Positioned in world space near the hovered hub,
 *   billboarded toward the camera every frame.
 *
 * DATA FLOW:
 *   Reads creatorGlobeState.hoveredData (set by CreatorGlobe's raycaster).
 *   Manages its own show/hide + position smoothing internally — no React
 *   re-renders for movement, only for tooltip content changes.
 */

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { creatorGlobeState } from "./Creatorglobestate";

// ── Reusable vectors (allocated once) ──
const _worldPos = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _camRight = new THREE.Vector3();
const _camUp = new THREE.Vector3();
const _one = new THREE.Vector3(1, 1, 1);

// Card dimensions in world units (tuned for camera at z≈2.8, fov 45)
const CARD_W = 0.48;
const CARD_H = 0.62;
const CARD_RADIUS = 0.03; // corner radius for RoundedBox

// Offset from hub position (in camera-space directions)
const OFFSET_RIGHT = 0.38;
const OFFSET_UP = 0.08;

export default function Tooltip3DCard({ globeRef }) {
  const groupRef = useRef();
  const borderRef = useRef();
  const glassRef = useRef();
  const { camera } = useThree();

  // ── React state only for content (enter/leave) ──
  const [data, setData] = useState(null);
  const lastDataRef = useRef(null);

  // ── Mutable animation state (no re-renders) ──
  const anim = useRef({
    currentPos: new THREE.Vector3(0, 10, 0), // offscreen
    opacity: 0,
    visible: false,
  });

  useFrame(() => {
    const a = anim.current;
    const hoveredData = creatorGlobeState.hoveredData;

    // ── Detect hover enter/leave → update React state ──
    if (hoveredData !== lastDataRef.current) {
      lastDataRef.current = hoveredData;
      if (hoveredData) {
        const { position, ...safe } = hoveredData;
        setData(safe);
        a.visible = true;
      } else {
        a.visible = false;
      }
    }

    // ── Animate opacity ──
    const targetOpacity = a.visible ? 1 : 0;
    a.opacity += (targetOpacity - a.opacity) * 0.12;

    // Hide completely when faded out
    if (a.opacity < 0.01 && !a.visible) {
      if (groupRef.current) groupRef.current.visible = false;
      if (a.opacity > 0) setData(null); // clear content after fade
      return;
    }

    if (!groupRef.current) return;
    groupRef.current.visible = true;

    // ── Compute target position in world space ──
    if (hoveredData?.position && globeRef?.current) {
      _worldPos.copy(hoveredData.position);
      _worldPos.applyMatrix4(globeRef.current.matrixWorld);

      // Offset in camera right/up directions
      _camRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
      _camUp.set(0, 1, 0).applyQuaternion(camera.quaternion);

      _targetPos
        .copy(_worldPos)
        .addScaledVector(_camRight, OFFSET_RIGHT)
        .addScaledVector(_camUp, OFFSET_UP);
    }

    // ── Smooth position ──
    a.currentPos.lerp(_targetPos, 0.1);
    groupRef.current.position.copy(a.currentPos);

    // ── Billboard toward camera ──
    groupRef.current.quaternion.copy(camera.quaternion);

    // ── Entrance scale ──
    const s = THREE.MathUtils.clamp(a.opacity, 0, 1);
    groupRef.current.scale.set(s, s, s);

    // ── Border opacity ──
    if (borderRef.current) {
      borderRef.current.material.opacity = a.opacity * 0.85;
    }
  });

  // ════════════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════════════

  return (
    <group ref={groupRef} visible={false} renderOrder={100}>
      {/* ── Orange border (slightly larger plane behind glass) ── */}
      <mesh ref={borderRef} position={[0, 0, -0.002]} renderOrder={99}>
        <planeGeometry args={[CARD_W + 0.012, CARD_H + 0.012]} />
        <meshBasicMaterial
          color="#FF6F21"
          transparent
          opacity={0.85}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Glass refraction plane ── */}
      <mesh ref={glassRef} renderOrder={100}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <MeshTransmissionMaterial
          // Transmission / glass
          transmission={0.92}
          thickness={0.4}
          roughness={0.12}
          ior={1.25}
          // Chromatic aberration — the key effect
          chromaticAberration={0.8}
          anisotropy={0.2}
          // Distortion for warped-glass look
          distortion={0.25}
          distortionScale={0.15}
          temporalDistortion={0.08}
          // Performance
          samples={6}
          resolution={256}
          // Tint
          color="#0a0a0f"
          backside={false}
          // Rendering
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* ── Dark inner fill (adds depth behind glass) ── */}
      <mesh position={[0, 0, -0.001]} renderOrder={98}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial
          color="#0a0a0c"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* ── DOM content overlay via drei Html ── */}
      {data && (
        <Html
          center
          distanceFactor={1.8}
          style={{
            pointerEvents: "none",
            userSelect: "none",
            width: "260px",
          }}
          // Keep above the glass plane
          zIndexRange={[1000, 1001]}
        >
          <TooltipContent data={data} />
        </Html>
      )}
    </group>
  );
}

// ════════════════════════════════════════════════
// TOOLTIP DOM CONTENT (rendered by drei Html)
// ════════════════════════════════════════════════

function TooltipContent({ data }) {
  return (
    <div
      className="w-[260px] p-4 rounded-2xl"
      style={{
        background: "transparent",
        fontFamily: "'Host Grotesk', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={data.avatar}
          alt=""
          className="w-9 h-9 rounded-full border border-white/15 object-cover"
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-[13px] font-semibold truncate">
              {data.handle}
            </span>
            <PlatformIcon platform={data.platform} />
          </div>
          <span className="text-white/30 text-[9px] uppercase tracking-[0.12em] mt-0.5">
            {data.nodeId}
          </span>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="flex gap-4 mb-3.5 pb-3.5 border-b border-white/[0.07]">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <span className="text-white/45 text-[10px] font-medium">
              Monthly
            </span>
          </div>
          <span className="text-white text-xl font-bold leading-none">
            {data.monthlyInstalls}
          </span>
          <span className="text-[10px] font-medium mt-1">
            <span className="text-[#4ade80]">{data.growth}</span>
            <span className="text-white/30 ml-1">v. last mo</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C21]" />
            <span className="text-white/45 text-[10px] font-medium">
              Total Reach
            </span>
          </div>
          <span className="text-white text-xl font-bold leading-none">
            {data.totalInstalls}
          </span>
          <span className="text-[10px] font-medium mt-1">
            <span className="text-[#FF8C21]">+{data.viralCoeff}x</span>
            <span className="text-white/30 ml-1">viral coeff</span>
          </span>
        </div>
      </div>

      {/* Sources */}
      <div className="flex flex-col gap-[7px]">
        {data.sources.map((source, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-white/50 text-[12px]">{source.name}</span>
            <span className="text-white font-semibold text-[12px] tabular-nums">
              {source.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// PLATFORM ICONS
// ════════════════════════════════════════════════

function PlatformIcon({ platform }) {
  if (platform === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3 text-gray-300 shrink-0"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 text-pink-500 shrink-0"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5 text-white shrink-0"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    );
  }
  return null;
}