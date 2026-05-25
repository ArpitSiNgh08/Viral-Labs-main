import { useRef, useEffect, useMemo, useCallback } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "@react-three/fiber";
import { shaderMaterial, useAspect } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import { Suspense } from "react";
import HeroParticles from "./Heroparticles";
import { transitionState } from "./Transitionstate";
import { entranceState } from "./Entrancestate";

// ============================================
// VERTEX SHADER (shared by main + bake)
// ============================================

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ============================================
// BAKE SHADER — renders dissolve noise to a texture (once)
// ============================================

const bakeVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const bakeFragmentShader = /* glsl */ `
precision highp float;
uniform vec2 uResolution;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  float aspect = uResolution.x / uResolution.y;

  float noiseScale = 2.0;
  vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
  float blockNoise = fbm(pixelatedUv * 100.0) * 0.06;

  float smoothNoiseFbm = fbm(vUv * 80.0) * 0.12;

  vec2 centeredUv = vUv - vec2(0.5);
  centeredUv.x *= aspect;
  float angle = atan(centeredUv.y, centeredUv.x);
  float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.1;

  gl_FragColor = vec4(blockNoise, smoothNoiseFbm, angularNoise, 1.0);
}
`;

// ============================================
// FRAGMENT — HDR output for bloom postprocessing
// ============================================

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform sampler2D uTexture;
uniform sampler2D uDissolveNoise;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform vec4 uResolution;
uniform float uRevealProgress;
uniform float uEntrance;
uniform float uZoomProgress;

uniform float uEtherealIntensity;
uniform float uRadius;
uniform float uSoftness;
uniform float uGlowStrength;
uniform float uBreathingSpeed;
uniform float uColorShift;
uniform float uRgbIntensity;
uniform float uRgbRadius;

varying vec2 vUv;

#define PI 3.14159265359

float getLuminance(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float computeEdge(sampler2D tex, vec2 uv, float strength, float threshold, float softness) {
  float luminance = dot(texture2D(tex, uv).rgb, vec3(0.2126, 0.7152, 0.0722));
  float edge = fwidth(luminance) * strength;
  return smoothstep(threshold - softness, threshold + softness, edge);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade3(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade3(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main() {
  vec2 newUV = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);

  float zoomLevel = 1.0 + uZoomProgress * 0.6;
  newUV = (newUV - 0.5) / zoomLevel + 0.5;

  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV = vec2(vUv.x * aspect, vUv.y);
  vec2 aspectMouse = vec2(uMouse.x * aspect, uMouse.y);
  float dist = distance(aspectUV, aspectMouse);

  vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));
  float revealStrength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));
  float radialGradient = distance(vUv, vec2(0.5)) * 18.0 - 15.0 * uEntrance;
  revealStrength += radialGradient;
  revealStrength = 1.0 - clamp(revealStrength, 0.0, 1.0);

  float opacityProgress = smoothstep(0.0, 0.7, uEntrance);
  float entranceAlpha = revealStrength * opacityProgress;

  if (entranceAlpha < 0.001) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  float ethFalloff = 1.0 - smoothstep(0.0, uRadius, dist);
  ethFalloff = pow(ethFalloff, uSoftness);

  float velocityMag = length(uVelocity);
  vec2 velocityDir = normalize(uVelocity + vec2(0.0001));

  float breathing = sin(uTime * uBreathingSpeed) * 0.5 + 0.5;
  breathing *= breathing;

  vec3 color = texture2D(uTexture, newUV).rgb;

  float colorAngle = atan(velocityDir.y, velocityDir.x);
  float colorPhase = colorAngle + uTime * 0.2;
  vec3 warmShift = vec3(1.02, 1.0, 0.98);
  vec3 coolShift = vec3(0.98, 1.0, 1.02);
  vec3 colorInfluence = mix(warmShift, coolShift, sin(colorPhase) * 0.5 + 0.5);
  float shiftAmount = velocityMag * uColorShift * ethFalloff * 0.5 + breathing * 0.1 * ethFalloff;
  color = mix(color, color * colorInfluence, shiftAmount);

  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float highlightMask = smoothstep(0.25, 0.85, luminance);

  float proximity = 1.0 - smoothstep(0.0, uRadius, dist);
  proximity = pow(proximity, uSoftness);

  float drive = breathing * 0.4 + velocityMag * 1.5 + 0.15;
  float boost = highlightMask * proximity * uGlowStrength * drive;
  color += color * boost;

  float brightnessLift = 1.0 + proximity * highlightMask * velocityMag * 0.1;
  color *= brightnessLift;

  float rgbFalloff = 1.0 - smoothstep(0.0, uRgbRadius, dist);
  rgbFalloff = rgbFalloff * rgbFalloff * (3.0 - 2.0 * rgbFalloff);

  if (rgbFalloff > 0.01) {
    vec2 rgbDir = uVelocity * uRgbIntensity * rgbFalloff;
    float r = texture2D(uTexture, newUV + rgbDir).r;
    float b = texture2D(uTexture, newUV - rgbDir).b;
    color.r = mix(color.r, r, rgbFalloff);
    color.b = mix(color.b, b, rgbFalloff);
  }

  color = clamp(color, 0.0, 1.0);

  if (uRevealProgress > 0.001) {
    float p = uRevealProgress;

    float grayscaleProgress = clamp(p / 3.99, 0.0, 1.0);
    float gray = getLuminance(color);
    color = mix(color, vec3(gray), grayscaleProgress);

    float edge = computeEdge(uTexture, newUV, 2.0, 0.1, 0.1);
    float edgeIntensity = p * 0.5;
    float edgeBrightnessVal = 1.0 - p;
    vec3 baseColor = mix(color, vec3(0.0), grayscaleProgress);
    float edgeGlowIntensity = edgeIntensity * 2.0;
    float edgeGlow = edge * edgeGlowIntensity * (1.0 + grayscaleProgress * 3.0);
    baseColor += vec3(1.0) * edgeGlow * edgeBrightnessVal;
    color = baseColor;

    vec2 centeredUv = vUv - vec2(0.5);
    centeredUv.x *= aspect;
    float centerDist = length(centeredUv);
    float maxDist = length(vec2(aspect * 0.5, 0.5));

    vec4 noiseLookup = texture2D(uDissolveNoise, vUv);
    float noisyDist = centerDist + noiseLookup.r + noiseLookup.g + noiseLookup.b;
    float normalizedDist = noisyDist / maxDist;

    float dissolveThreshold;
    float growEnd = 0.25;
    float shrinkEnd = 0.45;
    float peakSize = 0.35;
    float shrunkSize = 0.25;

    if (p < growEnd) {
      float t = smoothstep(0.0, growEnd, p);
      dissolveThreshold = t * peakSize;
    } else if (p < shrinkEnd) {
      float t = smoothstep(growEnd, shrinkEnd, p);
      dissolveThreshold = mix(peakSize, shrunkSize, t);
    } else {
      float t = smoothstep(shrinkEnd, 1.0, p);
      dissolveThreshold = mix(shrunkSize, 1.5, t);
    }

    float dissolveProgress = p * p * (3.0 - 2.0 * p);
    float dissolveMask = smoothstep(dissolveThreshold - 0.015, dissolveThreshold, normalizedDist);

    float distToEdge = abs(normalizedDist - dissolveThreshold);
    float edgeWidth = mix(0.06, 0.008, smoothstep(0.35, 0.50, p));
    float edgeBand = smoothstep(edgeWidth, 0.0, distToEdge);
    float hdrBrightness = mix(5.0, 0.8, smoothstep(0.35, 0.55, p));
    float hdrEdge = edgeBand * hdrBrightness * smoothstep(0.0, 0.04, p);

    float sparkleZoneWidth = 0.03 * (1.0 - dissolveProgress) + 0.01;
    float sparkleZone = smoothstep(sparkleZoneWidth, 0.0, distToEdge);

    vec2 pixelRes = vec2(uResolution.x, uResolution.y);
    float sparkle = hash(floor(vUv * pixelRes / 4.0));
    float s2 = sparkle * sparkle;
    float s4 = s2 * s2;
    sparkle = s4 * s2;
    sparkle *= sparkleZone;

    vec2 starUv = fract(vUv * pixelRes / 6.0) - 0.5;
    float starCross = max(
      smoothstep(0.04, 0.0, abs(starUv.x)) * smoothstep(0.3, 0.0, abs(starUv.y)),
      smoothstep(0.04, 0.0, abs(starUv.y)) * smoothstep(0.3, 0.0, abs(starUv.x))
    );
    float starSeed = hash(floor(vUv * pixelRes / 6.0));
    float starMask = step(0.82, starSeed);
    float starGlint = starCross * starMask * sparkleZone;

    float sparkleHdr = mix(3.0, 0.8, smoothstep(0.35, 0.55, p));
    float sparkleIntensity = (sparkle * 4.0 + starGlint * 3.0) * sparkleHdr;
    sparkleIntensity *= smoothstep(0.02, 0.08, p);

    float bloomPhase = 1.0 - smoothstep(0.40, 0.50, p);
    float insideDissolved = 1.0 - dissolveMask;

    float orbFill = insideDissolved * bloomPhase;
    float orbHdr = mix(4.0, 0.0, smoothstep(0.0, 0.50, p));
    color = mix(color, vec3(1.0), orbFill);
    color += vec3(orbFill * orbHdr);
    color += vec3(hdrEdge);
    color += vec3(sparkleIntensity);

    float alpha = dissolveMask;
    alpha = max(alpha, orbFill);
    float glowBand = edgeWidth * 1.5;
    float glowAlpha = smoothstep(glowBand, 0.0, distToEdge) * smoothstep(0.0, 0.04, p);
    alpha = max(alpha, glowAlpha);

    float isGlowOnly = step(dissolveMask, 0.01) * glowAlpha;
    color = mix(color, vec3(hdrEdge + sparkleIntensity), isGlowOnly);

    gl_FragColor = vec4(color, alpha * entranceAlpha);

  } else {
    gl_FragColor = vec4(color, entranceAlpha);
  }
}
`;

// ============================================
// SHADER MATERIAL
// ============================================

const placeholderData = new Float32Array([0, 0, 0, 1]);
const placeholderTexture = new THREE.DataTexture(
  placeholderData, 1, 1, THREE.RGBAFormat, THREE.FloatType
);
placeholderTexture.needsUpdate = true;

const EtherealRgbMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uDissolveNoise: placeholderTexture,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uVelocity: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector4(1, 1, 1, 1),
    uRevealProgress: 0,
    uEntrance: 0,
    uZoomProgress: 0,
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
// TUNING
// ============================================

const SHADER_CONFIG = {
  etherealIntensity: 1.0,
  radius: 0.95,
  softness: 1.0,
  glowStrength: 0.6,
  breathingSpeed: 0.8,
  colorShift: 1.0,
  mouseLag: 0.06,
  rgbIntensity: 0.04,
  rgbRadius: 0.7,
  velocityDecay: 0.92,
  velocityScale: 1.2,
};

// ============================================
// DISSOLVE NOISE BAKE
// ============================================

function createBakeResources() {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader: bakeVertexShader,
    fragmentShader: bakeFragmentShader,
    uniforms: {
      uResolution: { value: new THREE.Vector2() },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return { scene, camera, geometry, material };
}

// ============================================
// SCENE
// ============================================

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

function Scene() {
  const { camera, gl, size, viewport } = useThree();
  const materialRef = useRef();
  const meshRef = useRef();
  const rawTexture = useLoader(THREE.TextureLoader, IS_MOBILE ? "/images/hero-bg-sm.webp" : "/images/bg-image.webp");
  const texture = useMemo(() => {
    const t = rawTexture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [rawTexture]);
  const scale = useAspect(viewport.width, viewport.height, 1);

  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const laggedMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothVelocity = useRef({ x: 0, y: 0 });
  const rawMouseWorld = useRef(new THREE.Vector3(9999, 9999, 0));
  const _ndcVec = useMemo(() => new THREE.Vector3(), []);
  const _camPos = useMemo(() => new THREE.Vector3(), []);

  const bakeRef = useRef(null);
  const rtRef = useRef(null);
  const debounceRef = useRef(null);

  useMemo(() => {
    bakeRef.current = createBakeResources();
  }, []);

  const bakeNoise = useCallback((width, height) => {
    const bake = bakeRef.current;
    if (!bake) return;

    if (rtRef.current) rtRef.current.dispose();

    const rt = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      generateMipmaps: false,
    });

    bake.material.uniforms.uResolution.value.set(width, height);

    gl.setRenderTarget(rt);
    gl.render(bake.scene, bake.camera);
    gl.setRenderTarget(null);

    rtRef.current = rt;

    if (materialRef.current) {
      materialRef.current.uDissolveNoise = rt.texture;
    }
  }, [gl]);

  useEffect(() => {
    bakeNoise(size.width, size.height);

    // On mobile, only rebake on orientation change (not browser chrome show/hide)
    const handleResize = IS_MOBILE
      ? null
      : () => {
          clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            bakeNoise(
              gl.domElement.clientWidth,
              gl.domElement.clientHeight
            );
          }, 200);
        };

    if (handleResize) window.addEventListener("resize", handleResize);

    if (IS_MOBILE) {
      const onOrient = () => setTimeout(() => bakeNoise(gl.domElement.clientWidth, gl.domElement.clientHeight), 200);
      window.addEventListener("orientationchange", onOrient);
      return () => {
        window.removeEventListener("orientationchange", onOrient);
        clearTimeout(debounceRef.current);
        if (rtRef.current) rtRef.current.dispose();
        if (bakeRef.current) { bakeRef.current.geometry.dispose(); bakeRef.current.material.dispose(); }
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(debounceRef.current);
      if (rtRef.current) rtRef.current.dispose();
      if (bakeRef.current) {
        bakeRef.current.geometry.dispose();
        bakeRef.current.material.dispose();
      }
    };
  }, [bakeNoise, size.width, size.height, gl]);

  useEffect(() => {
    if (IS_MOBILE) return;
    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x != null && y != null) {
        targetMouse.current.x = x / window.innerWidth;
        targetMouse.current.y = 1 - y / window.innerHeight;
      }
    };
    const onLeave = () => {
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

    // ── Hide mesh & skip all work when bg plane is fully dissolved ──
    // revealProgress is scrub-driven so this re-enables when scrolling back
    const revealed = transitionState.revealProgress >= 1;
    if (meshRef.current) meshRef.current.visible = !revealed;
    if (revealed) return;

    mat.uResolution.set(size.width, size.height, 1, 1);
    mat.uTime = state.clock.elapsedTime;

    mat.uRevealProgress = transitionState.revealProgress;
    mat.uEntrance = entranceState.warpProgress;
    mat.uZoomProgress = transitionState.zoomProgress;

    if (rtRef.current && mat.uDissolveNoise !== rtRef.current.texture) {
      mat.uDissolveNoise = rtRef.current.texture;
    }

    if (!IS_MOBILE) {
      const prevX = smoothMouse.current.x;
      const prevY = smoothMouse.current.y;
      smoothMouse.current.x +=
        (targetMouse.current.x - smoothMouse.current.x) * 0.1;
      smoothMouse.current.y +=
        (targetMouse.current.y - smoothMouse.current.y) * 0.1;
      laggedMouse.current.x +=
        (smoothMouse.current.x - laggedMouse.current.x) * SHADER_CONFIG.mouseLag;
      laggedMouse.current.y +=
        (smoothMouse.current.y - laggedMouse.current.y) * SHADER_CONFIG.mouseLag;
      mat.uMouse.set(laggedMouse.current.x, laggedMouse.current.y);

      const rawVX = smoothMouse.current.x - prevX;
      const rawVY = smoothMouse.current.y - prevY;
      smoothVelocity.current.x =
        smoothVelocity.current.x * SHADER_CONFIG.velocityDecay +
        rawVX * SHADER_CONFIG.velocityScale;
      smoothVelocity.current.y =
        smoothVelocity.current.y * SHADER_CONFIG.velocityDecay +
        rawVY * SHADER_CONFIG.velocityScale;
      mat.uVelocity.set(smoothVelocity.current.x, smoothVelocity.current.y);

      mat.uEtherealIntensity = SHADER_CONFIG.etherealIntensity;
      mat.uRadius = SHADER_CONFIG.radius;
      mat.uSoftness = SHADER_CONFIG.softness;
      mat.uGlowStrength = SHADER_CONFIG.glowStrength;
      mat.uBreathingSpeed = SHADER_CONFIG.breathingSpeed;
      mat.uColorShift = SHADER_CONFIG.colorShift;
      mat.uRgbIntensity = SHADER_CONFIG.rgbIntensity;
      mat.uRgbRadius = SHADER_CONFIG.rgbRadius;

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
    } else {
      // On mobile: no mouse effect, zero out ethereal/glow uniforms
      mat.uMouse.set(-10, -10);
      mat.uVelocity.set(0, 0);
      mat.uEtherealIntensity = 0;
      mat.uRadius = 0;
      mat.uGlowStrength = 0;
      mat.uRgbIntensity = 0;
      mat.uColorShift = 0;
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={scale} renderOrder={0}>
        <planeGeometry />
        <etherealRgbMaterial
          ref={materialRef}
          uTexture={texture}
          transparent
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </mesh>

      {!IS_MOBILE && <HeroParticles mouseWorld={rawMouseWorld} />}
    </>
  );
}

// ============================================
// BLOOM CONTROLLER
// ============================================

function BloomController({ bloomRef }) {
  useFrame(() => {
    if (!bloomRef.current) return;

    const p = transitionState.revealProgress;

    // ── Disable bloom entirely when it contributes nothing ──
    // Bloom fades to 0 by p=0.90, no need to run the pass after that
    if (p >= 0.90) {
      if (bloomRef.current.intensity !== 0) bloomRef.current.intensity = 0;
      return;
    }

    const fadeIn = Math.min(p / 0.05, 1.0);
    const fadeOut = Math.max(0, 1.0 - Math.max(0, (p - 0.55) / 0.35));
    bloomRef.current.intensity = fadeIn * fadeOut * 2.5;
  });

  return null;
}

// ============================================
// GLOBAL CANVAS — z-[5]
// ============================================

export default function GlobalCanvas() {
  const bloomRef = useRef();

  return (
    <div
      id="global-canvas"
      className="fixed top-0 left-0 w-full h-screen z-[5]"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={IS_MOBILE ? 1 : [1, 2]}
        resize={{ scroll: false }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom
            ref={bloomRef}
            intensity={0}
            luminanceThreshold={1.1}
            luminanceSmoothing={0.2}
            kernelSize={KernelSize.LARGE}
            mipmapBlur={true}
          />
        </EffectComposer>

        <BloomController bloomRef={bloomRef} />
      </Canvas>
    </div>
  );
}