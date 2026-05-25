import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { transitionState } from "./Transitionstate";
import { entranceState } from "./Entrancestate";

const GOLD_COUNT = 1200;
const WHITE_COUNT = 3000;
const TOTAL = GOLD_COUNT + WHITE_COUNT;

function gaussRandom() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const ARCH = {
  bottomX: 3.0,
  topX: 1.5,
  yMin: -2.8,
  yMax: 1.8,
  curve: 0.7,
};

function archEdgeX(y) {
  const t = Math.max(
    0,
    Math.min(1, (y - ARCH.yMin) / (ARCH.yMax - ARCH.yMin))
  );
  return THREE.MathUtils.lerp(
    ARCH.bottomX,
    ARCH.topX,
    Math.pow(t, ARCH.curve)
  );
}

function edgePosition(spreadX) {
  const side = Math.random() < 0.5 ? 1 : -1;
  const y =
    THREE.MathUtils.lerp(ARCH.yMin, ARCH.yMax, Math.random()) +
    gaussRandom() * 0.15;
  const edgeX = archEdgeX(y);
  const x = (edgeX + gaussRandom() * spreadX) * side;
  const z = (Math.random() - 0.5) * 0.6;
  return [x, y, z];
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec3  uMouse;
uniform float uMouseRadius;
uniform float uMouseForce;
uniform float uRevealProgress;
uniform float uEntranceOpacity;
uniform float uZoomProgress;
uniform float uDpr;

attribute float aSize;
attribute float aOffset;
attribute float aOpacity;
attribute vec3  aColor;
attribute float aDriftSpeed;
attribute float aFloatSpeed;
attribute float aBobSpeed;

varying float vOpacity;
varying vec3  vColor;

void main() {
  vColor = aColor;

  vec3 pos = position;

  // Normal idle animation
  pos.x += sin(uTime * aDriftSpeed + aOffset) * 0.06;
  pos.y += cos(uTime * aBobSpeed + aOffset * 1.7) * 0.05;
  pos.y += mod(uTime * aFloatSpeed + aOffset, 3.0) - 1.5;

  // Mouse push
  vec2 delta = pos.xy - uMouse.xy;
  float dist = length(delta);
  float influence = smoothstep(uMouseRadius, 0.0, dist);
  vec2 push = (dist > 0.001)
    ? normalize(delta) * influence * uMouseForce
    : vec2(0.0);
  pos.xy += push;

  // ── Zoom push: particles drift outward as plane zooms ──
  float zoomT = smoothstep(0.0, 1.0, uZoomProgress);
  vec2 zoomDir = pos.xy;
  float zoomDist = length(zoomDir);
  vec2 zoomPush = (zoomDist > 0.001)
    ? normalize(zoomDir) * (0.8 + zoomDist * 0.6) * zoomT
    : vec2(0.0);
  pos.xy += zoomPush;

  // ── Transition: burst outward from center + fade ──
  float p = uRevealProgress;

  // Smooth acceleration curve
  float burstT = p * p * (3.0 - 2.0 * p); // smoothstep-like

  // Direction: from center (0,0) outward through particle position
  vec2 dir = pos.xy;
  float fromCenter = length(dir);
  vec2 burstDir = (fromCenter > 0.001) ? normalize(dir) : vec2(cos(aOffset), sin(aOffset));

  // Push outward — strength scales with distance from center + random offset
  float burstStrength = (2.0 + fromCenter * 1.5 + aOffset * 0.3) * burstT;
  pos.xy += burstDir * burstStrength;

  // Also scatter in z for depth
  pos.z += sin(aOffset * 3.0) * burstT * 0.5;

  // Opacity: fade out 0→100% over 0→30% progress
  float fadeFactor = 1.0 - smoothstep(0.0, 0.3, p);

  // Fade as particles drift outward during zoom
  float zoomFade = 1.0 - zoomT * 0.6;

  // Entrance opacity — particles invisible until entrance tween runs
  vOpacity = aOpacity * fadeFactor * uEntranceOpacity * zoomFade;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (1.0 / -mvPosition.z) * uDpr;
  gl_Position  = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
varying float vOpacity;
varying vec3  vColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(vColor, alpha);
}
`;

// Reference viewport width at 1920x1080 with FOV 45° camera at z=5
// viewport.height = 2 * tan(22.5°) * 5 = 4.142
// viewport.width  = 4.142 * (1920/1080) = 7.364
const REF_VIEWPORT_W = 7.364;

export default function HeroParticles({ mouseWorld }) {
  const materialRef = useRef();
  const pointsRef = useRef();
  const { gl, viewport } = useThree();
  const basePositions = useRef(null);
  const lastScale = useRef(1);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const positions = new Float32Array(TOTAL * 3);
    const originals = new Float32Array(TOTAL * 3);
    const sizes = new Float32Array(TOTAL);
    const offsets = new Float32Array(TOTAL);
    const opacities = new Float32Array(TOTAL);
    const colors = new Float32Array(TOTAL * 3);
    const driftSpeed = new Float32Array(TOTAL);
    const floatSpeed = new Float32Array(TOTAL);
    const bobSpeed = new Float32Array(TOTAL);

    const warmColor = new THREE.Color("#FFFFF2");
    const whiteColor = new THREE.Color("#FFFFFF");

    let i = 0;

    for (let g = 0; g < GOLD_COUNT; g++, i++) {
      const [x, y, z] = edgePosition(0.05);
      originals[i * 3] = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const speed = Math.random() * 3 + 0.08;
      sizes[i] = Math.random() * 8 + 12;
      offsets[i] = Math.random() * Math.PI * 2;
      opacities[i] = Math.random() * 0.2 + 0.05;
      driftSpeed[i] = speed * 0.6;
      floatSpeed[i] = speed * 0.02;
      bobSpeed[i] = speed * 0.4;

      colors[i * 3] = warmColor.r;
      colors[i * 3 + 1] = warmColor.g;
      colors[i * 3 + 2] = warmColor.b;
    }

    for (let w = 0; w < WHITE_COUNT; w++, i++) {
      const [x, y, z] = edgePosition(0.08);
      originals[i * 3] = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const speed = Math.random() * 0.25 + 0.05;
      sizes[i] = Math.random() * 10 + 3;
      offsets[i] = Math.random() * Math.PI * 2;
      opacities[i] = Math.random() * 0.2 + 0.06;
      driftSpeed[i] = speed * 0.6;
      floatSpeed[i] = speed * 0.02;
      bobSpeed[i] = speed * 0.4;

      colors[i * 3] = whiteColor.r;
      colors[i * 3 + 1] = whiteColor.g;
      colors[i * 3 + 2] = whiteColor.b;
    }

    basePositions.current = originals;

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aOffset", new THREE.Float32BufferAttribute(offsets, 1));
    geo.setAttribute("aOpacity", new THREE.Float32BufferAttribute(opacities, 1));
    geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute("aDriftSpeed", new THREE.Float32BufferAttribute(driftSpeed, 1));
    geo.setAttribute("aFloatSpeed", new THREE.Float32BufferAttribute(floatSpeed, 1));
    geo.setAttribute("aBobSpeed", new THREE.Float32BufferAttribute(bobSpeed, 1));

    geo.computeBoundingSphere();
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
      uMouseRadius: { value: 0.7 },
      uMouseForce: { value: 0.06 },
      uRevealProgress: { value: 0 },
      uEntranceOpacity: { value: 0 },
      uZoomProgress: { value: 0 },
      uDpr: { value: gl.getPixelRatio() },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    // ── Scale particle x-positions to track pillar edges at any viewport width ──
    const xScale = state.viewport.width / REF_VIEWPORT_W;
    if (Math.abs(xScale - lastScale.current) > 0.001 && basePositions.current) {
      lastScale.current = xScale;
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;
      const orig = basePositions.current;
      for (let j = 0; j < TOTAL; j++) {
        arr[j * 3] = orig[j * 3] * xScale;
      }
      posAttr.needsUpdate = true;
    }

    // ── Skip work when particles are fully invisible ──
    if (transitionState.revealProgress >= 1) return;

    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uRevealProgress.value = transitionState.revealProgress;
    u.uEntranceOpacity.value = entranceState.particleOpacity;
    u.uZoomProgress.value = transitionState.zoomProgress;
    u.uDpr.value = gl.getPixelRatio();

    if (mouseWorld?.current) {
      u.uMouse.value.copy(mouseWorld.current);
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={1}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}