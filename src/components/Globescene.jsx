/**
 * GlobeScene — GPGPU particle globe (Canvas-free, for use inside <View>).
 *
 * REFACTORED from self-contained Canvas to a pure scene component.
 * Now used inside a <View> in App.jsx's shared Canvas.
 *
 * KEY CHANGE — POINTER HANDLING:
 *   Previously used gl.domElement (the canvas) for NDC coordinate math.
 *   Now accepts a `containerRef` prop — the DOM element the <View> tracks.
 *   Pointer NDC is calculated relative to that container's bounds, so
 *   hover/click interactions stay accurate even though the actual Canvas
 *   is a fixed full-screen overlay.
 *
 * USAGE (inside App.jsx's Canvas):
 *   <View track={globeContainerRef}>
 *     <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={45} />
 *     <GlobeContent containerRef={globeContainerRef} />
 *   </View>
 */

import React, { useRef, useMemo, useEffect, useCallback, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { viralityState } from "./Viralitystate";

// ============================================================================
// CONFIGURATION
// ============================================================================

const IS_MOBILE_GL = typeof window !== "undefined" && window.innerWidth < 1024;
const TEXTURE_SIZE = IS_MOBILE_GL ? 256 : 512;

const CONFIG = {
  particleCount: IS_MOBILE_GL ? 65536 : 262144,
  pointSize: 0.08,
  sphereRadius: 0.45,
  coreDensity: 1.0,
  brightness: 1.5,
  noiseScale: 1.8,
  noiseSpeed: 0.08,
  flowStrength: 0.15,
  returnStrength: 0.5,
  patchScale: 3.0,
  patchSpeed: 0.25,
  patchThreshold: -0.4,
  wispStrength: 0.7,
  wispLength: 0.5,
  hoverRadius: 0.1,
  hoverStrength: 3.0,
  hoverFalloff: 1.5,
  mouseRadius: 0.3,
  mouseStrength: 2.0,
  colorCore: "#120302",
  colorSurface: "#a15245",
  colorWisp: "#f5e7df",
};

// ============================================================================
// NOISE GLSL
// ============================================================================

const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

vec3 curlNoise(vec3 p) {
  const float e=0.1;
  vec3 dx=vec3(e,0.0,0.0); vec3 dy=vec3(0.0,e,0.0); vec3 dz=vec3(0.0,0.0,e);
  float n1=snoise(p+dy)-snoise(p-dy); float n2=snoise(p+dz)-snoise(p-dz);
  float n3=snoise(p+dz)-snoise(p-dz); float n4=snoise(p+dx)-snoise(p-dx);
  float n5=snoise(p+dx)-snoise(p-dx); float n6=snoise(p+dy)-snoise(p-dy);
  return normalize(vec3(n1-n2,n3-n4,n5-n6));
}
`;

// ============================================================================
// GPGPU SHADERS
// ============================================================================

const gpgpuVertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const positionFragmentShader = `
  uniform sampler2D uPositions; uniform sampler2D uOriginalPositions;
  uniform float uTime; uniform float uDeltaTime;
  uniform float uSphereRadius; uniform float uCoreDensity;
  uniform float uNoiseScale; uniform float uNoiseSpeed;
  uniform float uFlowStrength; uniform float uReturnStrength;
  uniform float uPatchScale; uniform float uPatchSpeed;
  uniform float uPatchThreshold; uniform float uWispStrength; uniform float uWispLength;
  uniform vec3 uRayOrigin; uniform vec3 uRayDirection;
  uniform float uHoverRadius; uniform float uHoverStrength; uniform float uHoverFalloff; uniform float uHoverActive;
  uniform vec3 uMousePos; uniform float uMouseRadius; uniform float uMouseStrength; uniform float uMouseActive;
  varying vec2 vUv;
  ${noiseGLSL}
  float distanceToRay(vec3 pt, vec3 ro, vec3 rd) { vec3 tp=pt-ro; float t=dot(tp,rd); return length(pt-(ro+rd*t)); }
  vec3 closestOnRay(vec3 pt, vec3 ro, vec3 rd) { return ro+rd*dot(pt-ro,rd); }
  void main() {
    vec3 pos=texture2D(uPositions,vUv).xyz; vec3 orig=texture2D(uOriginalPositions,vUv).xyz;
    float cr=length(pos); vec3 rd2=normalize(pos); vec3 ord=normalize(orig);
    vec3 ps=ord*uPatchScale; float pn=snoise(ps+uTime*uPatchSpeed*0.1)+snoise(ps*2.0+uTime*uPatchSpeed*0.15)*0.5+snoise(ps*4.0+uTime*uPatchSpeed*0.05)*0.25; pn/=1.75;
    float wp=smoothstep(uPatchThreshold,uPatchThreshold+0.2,pn);
    float df=clamp(pow(1.0-(length(orig)/uSphereRadius),0.5),0.0,1.0);
    float cw=wp*(1.0-df);
    vec3 np=pos*uNoiseScale+uTime*uNoiseSpeed; vec3 fl=curlNoise(np)+curlNoise(np*2.0+50.0)*0.5; fl=normalize(fl);
    vec3 tf=fl-rd2*dot(fl,rd2); tf=normalize(tf+vec3(0.001));
    vec3 fd=tf*mix(0.05,uFlowStrength,1.0-df)*uDeltaTime;
    vec3 wf=vec3(0.0);
    if(cw>0.01){float ep=pow(snoise(ord*3.0+uTime*0.5)*0.5+0.5,2.0); vec3 ed=normalize(rd2+curlNoise(pos*3.0+uTime*0.2)*0.3);
    float mr2=uSphereRadius*(1.0+uWispLength*cw); wf=ed*cw*ep*uWispStrength*max(mr2-cr,0.0)*uDeltaTime;}
    float ra=mix(mix(uReturnStrength*2.0,uReturnStrength*0.3,cw),uReturnStrength*4.0,df);
    vec3 rf=(orig-pos)*ra*uDeltaTime;
    float tr=uSphereRadius; if(cw>0.01) tr=mix(uSphereRadius,uSphereRadius+cw*uWispLength*uSphereRadius,cw*0.5);
    vec3 rdf=rd2*(tr-cr)*mix(mix(1.0,8.0,df),0.5,cw)*uDeltaTime;
    vec3 hf=vec3(0.0);
    if(uHoverActive>0.5){float dr=distanceToRay(pos,uRayOrigin,uRayDirection); if(dr<uHoverRadius&&dr>0.001){hf=normalize(pos-closestOnRay(pos,uRayOrigin,uRayDirection))*pow(1.0-dr/uHoverRadius,uHoverFalloff)*uHoverStrength*uDeltaTime;}}
    vec3 cf=vec3(0.0);
    if(uMouseActive>0.5){vec3 tm=uMousePos-pos; float md=length(tm); if(md<uMouseRadius&&md>0.001){float ff=1.0-md/uMouseRadius; cf=normalize(tm)*ff*ff*uMouseStrength*uDeltaTime;}}
    vec3 np2=pos+fd+wf+rf+rdf+hf+cf; float nr=length(np2);
    float mnr=uSphereRadius*0.15*uCoreDensity; if(nr<mnr) np2=normalize(np2)*mnr;
    float mxr=uSphereRadius*(1.0+uWispLength*1.5); if(nr>mxr) np2=normalize(np2)*mxr;
    gl_FragColor=vec4(np2,1.0);
  }
`;

const pointVertexShader = `
  uniform sampler2D uPositions; uniform float uTextureSize; uniform float uPointSize;
  uniform float uParticleCount; uniform float uSphereRadius; uniform float uDpr;
  uniform vec3 uColorCore; uniform vec3 uColorSurface; uniform vec3 uColorWisp; uniform float uBrightness;
  attribute float aIndex; varying vec3 vColor; varying float vAlpha;
  void main() {
    if(aIndex>=uParticleCount){gl_Position=vec4(0.0);gl_PointSize=0.0;return;}
    float u=mod(aIndex,uTextureSize)/uTextureSize; float v=floor(aIndex/uTextureSize)/uTextureSize;
    vec3 pos=texture2D(uPositions,vec2(u,v)+0.5/uTextureSize).xyz;
    float nd=length(pos)/uSphereRadius; vec4 mv=modelViewMatrix*vec4(pos,1.0);
    vec3 np=normalize(pos); float fc=dot(np,normalize(cameraPosition)); float ff=pow(fc*0.5+0.5,0.7);
    if(nd<=1.05){vColor=mix(uColorCore,uColorSurface,ff); vColor=mix(vColor,uColorSurface*1.2,smoothstep(0.85,1.0,nd)*ff); vAlpha=1.0;}
    else{float wf=clamp(nd-1.0,0.0,1.0); vColor=mix(uColorSurface,uColorWisp,wf*0.85); vColor=mix(vColor,uColorWisp,0.3); vAlpha=1.0-wf*0.5;}
    float ef=pow(1.0-abs(fc),2.5); vColor=mix(vColor,uColorWisp,ef*0.5*smoothstep(0.8,1.0,nd));
    vColor*=uBrightness;
    gl_PointSize=uPointSize*(1.0/-mv.z)*100.0*(1.0+ef*0.4)*uDpr;
    if(nd>0.9&&nd<=1.1) gl_PointSize*=1.15;
    if(nd>1.2) gl_PointSize*=max(1.0-(nd-1.2)*0.4,0.4);
    gl_PointSize=clamp(gl_PointSize,0.5*uDpr,50.0*uDpr);
    gl_Position=projectionMatrix*mv;
  }
`;

const pointFragmentShader = `
  varying vec3 vColor; varying float vAlpha;
  void main() {
    float d=length(gl_PointCoord-vec2(0.5)); if(d>0.5) discard;
    gl_FragColor=vec4(vColor,vAlpha*(1.0-smoothstep(0.3,0.5,d)));
  }
`;

// ============================================================================
// GLOBE GROUP — reads viralityState.globeProgress every frame
// ============================================================================

function GlobeGroup({ children }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;

    const p = viralityState.globeProgress;
    const { startX, startZ, endX, endZ, startScale, endScale } = viralityState;

    groupRef.current.position.x = startX + (endX - startX) * p;
    groupRef.current.position.z = startZ + (endZ - startZ) * p;

    const s = startScale + (endScale - startScale) * p;
    groupRef.current.scale.set(s, s, s);
  });

  return <group ref={groupRef}>{children}</group>;
}

// ============================================================================
// SIMULATION
// ============================================================================

function Simulation({ children, containerRef }) {
  const { gl } = useThree();
  const c = CONFIG;

  const fbo1 = useFBO(TEXTURE_SIZE, TEXTURE_SIZE, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType });
  const fbo2 = useFBO(TEXTURE_SIZE, TEXTURE_SIZE, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType });
  const origFbo = useFBO(TEXTURE_SIZE, TEXTURE_SIZE, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType });

  const pp = useRef(0);
  const time = useRef(0);
  const init = useRef(false);
  const mouse = useRef({ pos: new THREE.Vector3(), active: false });
  const ray = useRef({ origin: new THREE.Vector3(), direction: new THREE.Vector3(0, 0, -1), active: false });

  // ── FIX 1: Hoisted per-frame objects — zero GC pressure ──
  const hitSphere = useMemo(() => new THREE.Sphere(new THREE.Vector3(0, 0, 0), c.sphereRadius * 2), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);

  const scene = useMemo(() => new THREE.Scene(), []);
  const cam = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uPositions: { value: null }, uOriginalPositions: { value: null }, uTime: { value: 0 }, uDeltaTime: { value: 0 },
      uSphereRadius: { value: c.sphereRadius }, uCoreDensity: { value: c.coreDensity },
      uNoiseScale: { value: c.noiseScale }, uNoiseSpeed: { value: c.noiseSpeed },
      uFlowStrength: { value: c.flowStrength }, uReturnStrength: { value: c.returnStrength },
      uPatchScale: { value: c.patchScale }, uPatchSpeed: { value: c.patchSpeed },
      uPatchThreshold: { value: c.patchThreshold }, uWispStrength: { value: c.wispStrength }, uWispLength: { value: c.wispLength },
      uRayOrigin: { value: new THREE.Vector3() }, uRayDirection: { value: new THREE.Vector3(0, 0, -1) },
      uHoverRadius: { value: c.hoverRadius }, uHoverStrength: { value: c.hoverStrength }, uHoverFalloff: { value: c.hoverFalloff }, uHoverActive: { value: 0 },
      uMousePos: { value: new THREE.Vector3() }, uMouseRadius: { value: c.mouseRadius }, uMouseStrength: { value: c.mouseStrength }, uMouseActive: { value: 0 },
    },
    vertexShader: gpgpuVertexShader, fragmentShader: positionFragmentShader,
  }), []);

  const quad = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat), [mat]);

  const initParticles = useCallback(() => {
    const count = TEXTURE_SIZE * TEXTURE_SIZE;
    const data = new Float32Array(count * 4);
    const r = c.sphereRadius;
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inc = Math.acos(1 - 2 * t);
      const az = 2 * Math.PI * phi * i;
      const rnd = Math.random();
      let rad;
      if (rnd < 0.7) rad = r * (0.75 + Math.random() * 0.25);
      else if (rnd < 0.9) rad = r * (0.4 + Math.random() * 0.35);
      else rad = r * (0.1 + Math.random() * 0.3);
      rad *= (0.98 + Math.random() * 0.04);
      data[i * 4] = rad * Math.sin(inc) * Math.cos(az);
      data[i * 4 + 1] = rad * Math.sin(inc) * Math.sin(az);
      data[i * 4 + 2] = rad * Math.cos(inc);
      data[i * 4 + 3] = 1;
    }
    const tex = new THREE.DataTexture(data, TEXTURE_SIZE, TEXTURE_SIZE, THREE.RGBAFormat, THREE.FloatType);
    tex.needsUpdate = true;
    const initMat = new THREE.ShaderMaterial({
      uniforms: { uTexture: { value: tex } },
      vertexShader: gpgpuVertexShader,
      fragmentShader: `uniform sampler2D uTexture; varying vec2 vUv; void main(){gl_FragColor=texture2D(uTexture,vUv);}`,
    });
    quad.material = initMat;
    if (!scene.children.includes(quad)) scene.add(quad);
    gl.setRenderTarget(fbo1); gl.render(scene, cam);
    gl.setRenderTarget(fbo2); gl.render(scene, cam);
    gl.setRenderTarget(origFbo); gl.render(scene, cam);
    gl.setRenderTarget(null);

    // ── FIX 3: Dispose init-only resources — free GPU memory ──
    initMat.dispose();
    tex.dispose();

    quad.material = mat;
    init.current = true; pp.current = 0;
  }, [gl, scene, cam, quad, mat, fbo1, fbo2, origFbo]);

  useEffect(() => { initParticles(); }, []);

  // ── Pointer handling — coords relative to TRACKED CONTAINER, not canvas ──
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    const getTrackElement = () => containerRef?.current;

    const onMove = (e) => {
      const el = getTrackElement();
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onDown = () => { mouse.current.active = true; };
    const onUp = () => { mouse.current.active = false; };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [containerRef, pointer]);

  useFrame(({ camera }, delta) => {
    if (!init.current) return;
    const dt = Math.min(delta, 1 / 30);
    time.current += dt;

    const interactable = viralityState.globeProgress >= 0.98;

    raycaster.setFromCamera(pointer, camera);
    ray.current.origin.copy(raycaster.ray.origin);
    ray.current.direction.copy(raycaster.ray.direction);
    ray.current.active = interactable;

    // ── FIX 1: Reuse hoisted sphere & vector — no allocations per frame ──
    if (interactable && raycaster.ray.intersectSphere(hitSphere, hitPoint)) {
      mouse.current.pos.copy(hitPoint);
    }

    const rb = pp.current === 0 ? fbo1 : fbo2;
    const wb = pp.current === 0 ? fbo2 : fbo1;
    const u = mat.uniforms;
    u.uPositions.value = rb.texture;
    u.uOriginalPositions.value = origFbo.texture;
    u.uTime.value = time.current;
    u.uDeltaTime.value = dt;
    u.uRayOrigin.value.copy(ray.current.origin);
    u.uRayDirection.value.copy(ray.current.direction);
    u.uHoverActive.value = interactable ? 1 : 0;
    u.uMousePos.value.copy(mouse.current.pos);
    u.uMouseActive.value = (interactable && mouse.current.active) ? 1 : 0;

    // ── FIX 2: Removed redundant `quad.material = mat` ──
    // Material is already set to `mat` after initParticles, no need to reassign every frame

    gl.setRenderTarget(wb); gl.render(scene, cam); gl.setRenderTarget(null);
    pp.current = 1 - pp.current;
  });

  // ── FIX 4: Stable ref-based getter — no closure recreation ──
  const getTextures = useCallback(() => ({
    positions: (pp.current === 0 ? fbo2 : fbo1).texture,
  }), []); // fbo1/fbo2 are stable from useFBO, pp is a ref — no deps needed

  return <>{React.Children.map(children, ch => React.cloneElement(ch, { getTextures }))}</>;
}

// ============================================================================
// POINTS
// ============================================================================

function Points({ getTextures }) {
  const matRef = useRef();
  const c = CONFIG;
  const { gl } = useThree();

  const geo = useMemo(() => {
    const count = TEXTURE_SIZE * TEXTURE_SIZE;
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const idx = new Float32Array(count);
    for (let i = 0; i < count; i++) idx[i] = i;
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aIndex", new THREE.BufferAttribute(idx, 1));
    return g;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uPositions: { value: null }, uTextureSize: { value: TEXTURE_SIZE }, uPointSize: { value: c.pointSize },
      uParticleCount: { value: c.particleCount }, uSphereRadius: { value: c.sphereRadius },
      uDpr: { value: gl.getPixelRatio() },
      uColorCore: { value: new THREE.Color(c.colorCore) }, uColorSurface: { value: new THREE.Color(c.colorSurface) },
      uColorWisp: { value: new THREE.Color(c.colorWisp) }, uBrightness: { value: c.brightness },
    },
    vertexShader: pointVertexShader, fragmentShader: pointFragmentShader,
    transparent: true, depthWrite: true, depthTest: true, blending: THREE.NormalBlending,
  }), []);

  useFrame(() => {
    if (getTextures && matRef.current) {
      matRef.current.uniforms.uPositions.value = getTextures().positions;
      matRef.current.uniforms.uDpr.value = gl.getPixelRatio();
    }
  });

  return (
    <points frustumCulled={false}>
      <primitive object={geo} attach="geometry" />
      <primitive object={material} ref={matRef} attach="material" />
    </points>
  );
}

// ============================================================================
// EXPORTED COMPONENT — pure scene content, no Canvas
// ============================================================================

export default function GlobeContent({ containerRef }) {
  return (
    <Suspense fallback={null}>
      <GlobeGroup>
        <Simulation containerRef={containerRef}>
          <Points />
        </Simulation>
      </GlobeGroup>
    </Suspense>
  );
}