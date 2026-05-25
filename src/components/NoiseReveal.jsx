import { useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { transitionState } from "./Transitionstate";

const noiseRevealVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Two-phase transition overlay:
 *
 * Phase A — uOverlayOpacity 0→1 (revealProgress stays 0)
 *   Plane fades from invisible → solid #121212.
 *   dissolveAlpha = 1 everywhere (nothing dissolved yet).
 *   finalAlpha = 1 * overlayOpacity = overlayOpacity → ramps to 1.
 *
 * Phase B — uRevealProgress 0→1 (overlayOpacity stays 1)
 *   #121212 dissolves FROM CENTER outward.
 *   Center has low centerBias → threshold rises faster → clears first.
 *   dissolveAlpha goes 1→0 radially outward.
 *   finalAlpha = dissolveAlpha * 1 → areas go transparent.
 *   Canvas becomes see-through → MissionStats visible at z-[1].
 */
const noiseRevealFragment = /* glsl */ `
uniform float uRevealProgress;
uniform float uOverlayOpacity;
uniform float uTime;
uniform float uNoiseScale;
uniform float uEdgeSoftness;

varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec2 centeredUv = vUv - 0.5;
  float distFromCenter = length(centeredUv);

  // Multi-octave noise
  float n = snoise(vec3(vUv * uNoiseScale, uTime * 0.05));
  n += snoise(vec3(vUv * uNoiseScale * 2.0, uTime * 0.08)) * 0.5;
  n += snoise(vec3(vUv * uNoiseScale * 4.0, uTime * 0.12)) * 0.25;
  n = n * 0.5 + 0.5;

  // Radial dissolve: center clears first
  float centerBias = distFromCenter * 0.6;
  float threshold = uRevealProgress * 1.8 - centerBias;

  // dissolveAlpha: 1 = opaque, 0 = dissolved (transparent)
  float dissolveAlpha = 1.0 - smoothstep(
    threshold - uEdgeSoftness,
    threshold + uEdgeSoftness,
    n
  );

  // Master gate: overlayOpacity controls overall visibility
  float finalAlpha = dissolveAlpha * uOverlayOpacity;

  // #121212
  gl_FragColor = vec4(0.0706, 0.0706, 0.0706, finalAlpha);
}
`;

const NoiseRevealMaterial = shaderMaterial(
  {
    uRevealProgress: 0,
    uOverlayOpacity: 0,
    uTime: 0,
    uNoiseScale: 3.0,
    uEdgeSoftness: 0.08,
  },
  noiseRevealVertex,
  noiseRevealFragment
);

extend({ NoiseRevealMaterial });

export default function NoiseReveal() {
  const materialRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uTime = state.clock.elapsedTime;
    materialRef.current.uOverlayOpacity = transitionState.overlayOpacity;
    materialRef.current.uRevealProgress = transitionState.revealProgress;
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 0.5]}
      renderOrder={10}
    >
      <planeGeometry />
      <noiseRevealMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}