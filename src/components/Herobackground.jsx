import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree, extend, useLoader } from "@react-three/fiber";
import { shaderMaterial, useAspect } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import HeroParticles from "./Heroparticles";

// ============================================
// VERTEX SHADER
// ============================================

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ============================================
// FRAGMENT — Ethereal Glow + RGB Shift
// ============================================

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform vec4 uResolution;

// Ethereal uniforms
uniform float uEtherealIntensity;
uniform float uRadius;
uniform float uSoftness;
uniform float uGlowStrength;
uniform float uBreathingSpeed;
uniform float uColorShift;

// RGB shift uniforms
uniform float uRgbIntensity;
uniform float uRgbRadius;

varying vec2 vUv;

#define PI 3.14159265359

void main() {
  vec2 newUV = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);

  // Aspect-corrected distance to cursor
  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV    = vUv;
  vec2 aspectMouse = uMouse;
  aspectUV.x    *= aspect;
  aspectMouse.x *= aspect;

  float dist = distance(aspectUV, aspectMouse);

  // ── Ethereal falloff ──
  float ethFalloff = 1.0 - smoothstep(0.0, uRadius, dist);
  ethFalloff = pow(ethFalloff, uSoftness);

  float velocityMag = length(uVelocity);
  vec2  velocityDir = normalize(uVelocity + vec2(0.0001));

  // Breathing pulse
  float breathing = sin(uTime * uBreathingSpeed) * 0.5 + 0.5;
  breathing = pow(breathing, 2.0);

  // ── Clean texture sample ──
  vec3 color = texture2D(uTexture, newUV).rgb;

  // ── Warm / cool color shift ──
  float colorAngle = atan(velocityDir.y, velocityDir.x);
  float colorPhase = colorAngle + uTime * 0.2;
  vec3 warmShift = vec3(1.02, 1.0, 0.98);
  vec3 coolShift = vec3(0.98, 1.0, 1.02);
  vec3 colorInfluence = mix(warmShift, coolShift, sin(colorPhase) * 0.5 + 0.5);
  float shiftAmount = velocityMag * uColorShift * ethFalloff * 0.5 + breathing * 0.1 * ethFalloff;
  color = mix(color, color * colorInfluence, shiftAmount);

  // ── Proximity highlight bloom ──
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float highlightMask = smoothstep(0.25, 0.85, luminance);

  float proximity = 1.0 - smoothstep(0.0, uRadius, dist);
  proximity = pow(proximity, uSoftness);

  float drive = breathing * 0.4 + velocityMag * 1.5 + 0.15;
  float boost = highlightMask * proximity * uGlowStrength * drive;
  color += color * boost;

  // ── Brightness lift ──
  float brightnessLift = 1.0 + proximity * highlightMask * velocityMag * 0.1;
  color *= brightnessLift;

  // ═══════════════════════════════════════════
  // RGB SHIFT — velocity-driven
  // ═══════════════════════════════════════════

  float rgbFalloff = 1.0 - smoothstep(0.0, uRgbRadius, dist);
  rgbFalloff = rgbFalloff * rgbFalloff * (3.0 - 2.0 * rgbFalloff);

  vec2 rgbDir = uVelocity * uRgbIntensity * rgbFalloff;

  float r = texture2D(uTexture, newUV + rgbDir).r;
  float b = texture2D(uTexture, newUV - rgbDir).b;

  color.r = mix(color.r, r, rgbFalloff);
  color.b = mix(color.b, b, rgbFalloff);

  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

// ============================================
// SHADER MATERIAL
// ============================================

const EtherealRgbMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uVelocity: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector4(1, 1, 1, 1),
    uEtherealIntensity: 1.0,
    uRadius: 0.6,
    uSoftness: 1.5,
    uGlowStrength: 0.8,
    uBreathingSpeed: 0.8,
    uColorShift: 1.0,
    uRgbIntensity: 0.015,
    uRgbRadius: 0.45,
  },
  vertexShader,
  fragmentShader
);

extend({ EtherealRgbMaterial });

// ============================================
// TUNING VALUES
// ============================================

const SHADER_CONFIG = {
  etherealIntensity: 1.0,
  radius: 0.6,
  softness: 1.5,
  glowStrength: 0.8,
  breathingSpeed: 0.8,
  colorShift: 1.0,
  mouseLag: 0.06,
  rgbIntensity: 0.015,
  rgbRadius: 0.45,
  velocityDecay: 0.92,
  velocityScale: 1.2,
};

// ============================================
// SCENE
// ============================================

function Scene() {
  const { camera, size, viewport } = useThree();
  const materialRef = useRef();
  const rawTexture = useLoader(THREE.TextureLoader, "/images/bg-image.webp");
  const texture = useMemo(() => rawTexture.clone(), [rawTexture]);
  const scale = useAspect(viewport.width, viewport.height, 1);

  // Background shader mouse state (keeps its own smoothing)
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const laggedMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothVelocity = useRef({ x: 0, y: 0 });

  // RAW world-space mouse for particles — zero smoothing
  const rawMouseWorld = useRef(new THREE.Vector3(9999, 9999, 0));

  // Temp vectors for ray-plane math (avoid per-frame allocations)
  const _ndcVec = useMemo(() => new THREE.Vector3(), []);
  const _camPos = useMemo(() => new THREE.Vector3(), []);

  // ── Pointer listeners ──
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x != null && y != null) {
        targetMouse.current.x = x / window.innerWidth;
        targetMouse.current.y = 1 - y / window.innerHeight;
      }
    };

    const onLeave = () => {
      // Push far offscreen so influence fades
      targetMouse.current.x = -10;
      targetMouse.current.y = -10;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.uResolution.set(size.width, size.height, 1, 1);
    mat.uTime = state.clock.elapsedTime;

    // ── Background shader: smoothed mouse (unchanged) ──
    const prevX = smoothMouse.current.x;
    const prevY = smoothMouse.current.y;
    smoothMouse.current.x +=
      (targetMouse.current.x - smoothMouse.current.x) * 0.1;
    smoothMouse.current.y +=
      (targetMouse.current.y - smoothMouse.current.y) * 0.1;

    laggedMouse.current.x +=
      (smoothMouse.current.x - laggedMouse.current.x) *
      SHADER_CONFIG.mouseLag;
    laggedMouse.current.y +=
      (smoothMouse.current.y - laggedMouse.current.y) *
      SHADER_CONFIG.mouseLag;
    mat.uMouse.set(laggedMouse.current.x, laggedMouse.current.y);

    const rawVX = smoothMouse.current.x - prevX;
    const rawVY = smoothMouse.current.y - prevY;
    smoothVelocity.current.x =
      smoothVelocity.current.x * SHADER_CONFIG.velocityDecay +
      rawVX * SHADER_CONFIG.velocityScale;
    smoothVelocity.current.y =
      smoothVelocity.current.y * SHADER_CONFIG.velocityDecay +
      rawVY * SHADER_CONFIG.velocityScale;
    mat.uVelocity.set(
      smoothVelocity.current.x,
      smoothVelocity.current.y
    );

    mat.uEtherealIntensity = SHADER_CONFIG.etherealIntensity;
    mat.uRadius = SHADER_CONFIG.radius;
    mat.uSoftness = SHADER_CONFIG.softness;
    mat.uGlowStrength = SHADER_CONFIG.glowStrength;
    mat.uBreathingSpeed = SHADER_CONFIG.breathingSpeed;
    mat.uColorShift = SHADER_CONFIG.colorShift;
    mat.uRgbIntensity = SHADER_CONFIG.rgbIntensity;
    mat.uRgbRadius = SHADER_CONFIG.rgbRadius;

    // ── Particles: RAW mouse → world space, NO smoothing ──
    const ndcX = targetMouse.current.x * 2 - 1;
    const ndcY = targetMouse.current.y * 2 - 1;

    _ndcVec.set(ndcX, ndcY, 0.5).unproject(camera);
    _camPos.copy(camera.position);
    _ndcVec.sub(_camPos).normalize();

    const t = -_camPos.z / _ndcVec.z;
    rawMouseWorld.current.set(
      _camPos.x + _ndcVec.x * t,
      _camPos.y + _ndcVec.y * t,
      0
    );
  });

  return (
    <>
      <mesh scale={scale}>
        <planeGeometry />
        <etherealRgbMaterial
          ref={materialRef}
          uTexture={texture}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <HeroParticles mouseWorld={rawMouseWorld} />
    </>
  );
}

// ============================================
// HERO BACKGROUND (Canvas wrapper)
// ============================================

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}