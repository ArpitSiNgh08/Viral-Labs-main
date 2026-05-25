/**
 * CreatorGlobe — R3F conversion of the vanilla Three.js creator network globe.
 *
 * POINTER GATE:
 *  All pointer interactions (drag, hover, tooltip) are gated by
 *  creatorGlobeState.interactive. RocketLaunchSection sets this to
 *  false during rocket phases and true when CN content is active.
 *
 * CONSTELLATION FADE:
 *  The wireframe grid, dots, and shimmer dots start invisible.
 *  creatorGlobeState.constellationOpacity (0→1) is driven by
 *  CreatorNetworkSection during the CN settle phase.
 *  useFrame reads it every frame and applies to materials.
 *
 * PERF:
 *  Rings (60) and hub dots (20) are rendered via InstancedMesh
 *  to collapse 80 draw calls to 2. Rings use a custom shader
 *  with a per-instance opacity attribute. Hub dots share a
 *  single material since they all use the same cAlpha.
 */

import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { creatorGlobeState } from "./Creatorglobestate";

// Module-level scratch — avoids per-frame allocation
const _UNIT_SCALE = new THREE.Vector3(1, 1, 1);
const _Z_AXIS = new THREE.Vector3(0, 0, 1);

// ============================================================================
// SHADER SOURCES
// ============================================================================

const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float intensity = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2);
    gl_FragColor = vec4(0.8, 0.85, 0.9, intensity * 0.15);
  }
`;

const constellationVertexShader = `
  attribute float aOpacity;
  varying float vOpacity;
  void main() {
    vOpacity = aOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const constellationFragmentShader = `
  uniform float uFade;
  varying float vOpacity;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity * uFade);
  }
`;

// Ring instance shader — per-instance opacity via aOpacity
const ringInstanceVertexShader = `
  attribute float aOpacity;
  varying float vOpacity;
  void main() {
    vOpacity = aOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const ringInstanceFragmentShader = `
  uniform vec3 uColor;
  varying float vOpacity;
  void main() {
    gl_FragColor = vec4(uColor, vOpacity);
  }
`;

// ============================================================================
// CONSTELLATION NETWORK GENERATOR
// ============================================================================

function generateConstellationNetwork(latDivisions = 36, lonDivisions = 56, radius = 1.2) {
  const baseOpacity = 0.07;
  const brightOpacity = 0.25;
  const shimmerChance = 0.5;

  const nodes = [];
  for (let lat = 1; lat < latDivisions; lat++) {
    const row = [];
    const phi = (lat / latDivisions) * Math.PI;
    for (let lon = 0; lon < lonDivisions; lon++) {
      const theta = (lon / lonDivisions) * Math.PI * 2;
      row.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * radius,
        Math.sin(phi) * Math.sin(theta) * radius
      ));
    }
    nodes.push(row);
  }
  const latRows = nodes.length;

  const linePositions = [];
  const lineOpacities = [];
  const shimmerDotPositions = [];

  for (let lat = 0; lat < latRows; lat++) {
    for (let lon = 0; lon < lonDivisions; lon++) {
      const source = nodes[lat][lon];
      const isShimmer = Math.random() < shimmerChance;
      const srcOpacity = isShimmer ? brightOpacity : baseOpacity;

      const right = nodes[lat][(lon + 1) % lonDivisions];
      linePositions.push(source.x, source.y, source.z, right.x, right.y, right.z);
      lineOpacities.push(srcOpacity, baseOpacity);

      if (lat < latRows - 1) {
        const below = nodes[lat + 1][lon];
        linePositions.push(source.x, source.y, source.z, below.x, below.y, below.z);
        lineOpacities.push(srcOpacity, baseOpacity);

        const diag = nodes[lat + 1][(lon + 1) % lonDivisions];
        linePositions.push(source.x, source.y, source.z, diag.x, diag.y, diag.z);
        lineOpacities.push(srcOpacity, baseOpacity);
      }

      if (isShimmer) {
        shimmerDotPositions.push(source.x, source.y, source.z);
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeo.setAttribute("aOpacity", new THREE.Float32BufferAttribute(lineOpacities, 1));

  const dotPositions = [];
  for (let lat = 0; lat < latRows; lat++) {
    for (let lon = 0; lon < lonDivisions; lon++) {
      const n = nodes[lat][lon];
      dotPositions.push(n.x, n.y, n.z);
    }
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));

  const shimmerDotGeo = new THREE.BufferGeometry();
  shimmerDotGeo.setAttribute("position", new THREE.Float32BufferAttribute(shimmerDotPositions, 3));

  return { lineGeo, dotGeo, shimmerDotGeo };
}

// ============================================================================
// INDIA FIXED POINT
// ============================================================================

const INDIA_POINT = (() => {
  const theta = ((78.9 + 180) / 360) * Math.PI * 2;
  const phi = (90 - 20.5) * Math.PI / 180;
  return new THREE.Vector3(
    Math.cos(theta) * Math.sin(phi),
    Math.cos(phi),
    Math.sin(theta) * Math.sin(phi)
  ).normalize();
})();

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_HANDLES = [
  "@alex_creates", "@sarah.vlogs", "@chris.tech", "@emma_style",
  "@gamer_dude", "@fit_journey", "@world.wanderer", "@beats_by_j",
  "@design.ninja", "@code_master",
];
const MOCK_PLATFORMS = ["x", "instagram", "tiktok"];

function generateHubData() {
  const baseInstalls = Math.floor(Math.random() * 8000 + 2000);
  const handle = MOCK_HANDLES[Math.floor(Math.random() * MOCK_HANDLES.length)] + Math.floor(Math.random() * 99);
  const platform = MOCK_PLATFORMS[Math.floor(Math.random() * MOCK_PLATFORMS.length)];
  return {
    handle,
    platform,
    avatar: `https://i.pravatar.cc/150?u=${handle}`,
    nodeId: `NODE-${Math.floor(Math.random() * 8999 + 1000)}`,
    monthlyInstalls: baseInstalls.toLocaleString(),
    totalInstalls: (baseInstalls * (Math.floor(Math.random() * 20) + 10)).toLocaleString(),
    growth: "+" + (Math.random() * 25 + 5).toFixed(1) + "%",
    viralCoeff: (Math.random() * 1.5 + 1.1).toFixed(2),
    usd: (baseInstalls * 4.2).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    sources: [
      { name: "US / Canada", value: Math.floor(baseInstalls * (Math.random() * 0.4 + 0.4)) },
      { name: "Europe", value: Math.floor(baseInstalls * (Math.random() * 0.3 + 0.1)) },
      { name: "Asia Pacific", value: Math.floor(baseInstalls * (Math.random() * 0.2 + 0.1)) },
    ].sort((a, b) => b.value - a.value),
  };
}

// ============================================================================
// INSTANCE COUNTS
// ============================================================================

const NUM_HUBS = 20;
const RINGS_PER_HUB = 3;
const NUM_RINGS = NUM_HUBS * RINGS_PER_HUB;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CreatorGlobe({ containerRef }) {
  const globeRef = useRef();
  const { camera } = useThree();

  const state = useRef({
    initialized: false,
    isDragging: false,
    previousMouse: { x: 0, y: 0 },
    dragQuaternion: new THREE.Quaternion(),
    autoRotY: 0,
    activeHoverHub: null,
    trajectoryProgress: 0,
    autoTrajectoryState: "idle",
    autoTrajectoryProgress: 0,
    autoPauseTimer: 0,
    networkHubs: [],
    networkHitboxes: [],
    ringBaseMatrices: [],
    ringDelays: [],
  });

  const pointer = useMemo(() => new THREE.Vector2(-9999, -9999), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  // Reusable scratch objects
  const _parentInvQuat = useMemo(() => new THREE.Quaternion(), []);
  const _camRight = useMemo(() => new THREE.Vector3(), []);
  const _camUp = useMemo(() => new THREE.Vector3(), []);
  const _qDelta = useMemo(() => new THREE.Quaternion(), []);
  const _tiltQuat = useMemo(
    () => new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.45, 0, 0)),
    []
  );
  const _tooltipVec = useMemo(() => new THREE.Vector3(), []);
  const _tmpMat = useMemo(() => new THREE.Matrix4(), []);
  const _scaleVec = useMemo(() => new THREE.Vector3(), []);

  const pointsMeshRef = useRef();
  const webMeshRef = useRef();
  const webDotsRef = useRef();
  const webDotMatRef = useRef();
  const shimmerDotMatRef = useRef();
  const innerSphereRef = useRef();

  const ringInstanceRef = useRef();
  const dotInstanceRef = useRef();

  const trajectoryGroupRef = useRef();
  const lineGeoRef = useRef();
  const targetRingRef = useRef();

  const autoTrajectoryGroupRef = useRef();
  const autoLineGeoRef = useRef();
  const autoTargetRingRef = useRef();
  const autoCurve = useMemo(() => new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ), []);

  const glowMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: fresnelVertexShader,
    fragmentShader: fresnelFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  }), []);

  const constellationLineMat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uFade: { value: 0 } },
    vertexShader: constellationVertexShader,
    fragmentShader: constellationFragmentShader,
  }), []);

  const dotTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xFF6F21, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending,
  }), []);
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xf1f1f1, transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
  }), []);

  // Trajectory clones — memoized so we don't re-clone every render
  const autoLineMat = useMemo(() => lineMat.clone(), [lineMat]);
  const autoRingMat = useMemo(() => ringMat.clone(), [ringMat]);

  // ── Shared geometries + materials for instanced rings & dots ──
  const ringGeo = useMemo(() => {
    const g = new THREE.RingGeometry(0.015, 0.02, 32);
    // per-instance opacity buffer
    const opacityArr = new Float32Array(NUM_RINGS);
    g.setAttribute("aOpacity", new THREE.InstancedBufferAttribute(opacityArr, 1));
    return g;
  }, []);

  const ringInstanceMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(0xFF6F21) } },
    vertexShader: ringInstanceVertexShader,
    fragmentShader: ringInstanceFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  const hubDotGeo = useMemo(() => new THREE.CircleGeometry(0.01, 16), []);
  const hubDotMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xFF6F21,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  // Hitbox shared resources
  const hitboxGeo = useMemo(() => new THREE.SphereGeometry(0.035, 16, 16), []);
  const hitboxMat = useMemo(() => new THREE.MeshBasicMaterial({ visible: false }), []);

  // Dispose owned resources on unmount
  useEffect(() => {
    return () => {
      ringGeo.dispose();
      ringInstanceMat.dispose();
      hubDotGeo.dispose();
      hubDotMat.dispose();
      hitboxGeo.dispose();
      hitboxMat.dispose();
      autoLineMat.dispose();
      autoRingMat.dispose();
    };
  }, [ringGeo, ringInstanceMat, hubDotGeo, hubDotMat, hitboxGeo, hitboxMat, autoLineMat, autoRingMat]);

  // ════════════════════════════════════════════════
  // LOAD EARTH IMAGE + SPAWN PARTICLES & HUBS
  // ════════════════════════════════════════════════

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.scale.set(0.01, 0.01, 0.01);

    // Defer texture fetch until the globe's container is near the viewport
    const img = new Image();
    img.crossOrigin = "anonymous";
    const containerEl = containerRef?.current;
    if (containerEl) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          img.src = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";
          io.disconnect();
        }
      }, { rootMargin: "400px" });
      io.observe(containerEl);
    } else {
      img.src = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const pts = [];
      const numPoints = 60000;
      const phi_golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < numPoints * 3; i++) {
        const y = 1 - (i / (numPoints * 3 - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi_golden * i;
        const phi = Math.acos(y);
        let uTheta = theta % (2 * Math.PI);
        if (uTheta < 0) uTheta += 2 * Math.PI;

        const mapX = Math.floor((uTheta / (2 * Math.PI)) * canvas.width);
        const mapY = Math.floor((phi / Math.PI) * canvas.height);
        const index = (mapY * canvas.width + mapX) * 4;

        if (imgData.data[index] < 90) {
          pts.push(new THREE.Vector3(
            Math.cos(theta) * radius * 0.98,
            y * 0.98,
            Math.sin(theta) * radius * 0.98
          ));
        }
      }

      if (pointsMeshRef.current) {
        pointsMeshRef.current.geometry.dispose();
        pointsMeshRef.current.geometry = new THREE.BufferGeometry().setFromPoints(pts);
      }

      const s = state.current;

      for (let i = 0; i < NUM_HUBS; i++) {
        const randIndex = Math.floor(Math.random() * pts.length);
        const hubPos = pts[randIndex].clone().normalize();
        s.networkHubs.push(hubPos);

        // Compose base matrix at hubPos * 1.003, oriented so local Z → hubPos
        const pos = hubPos.clone().multiplyScalar(1.003);
        const quat = new THREE.Quaternion().setFromUnitVectors(_Z_AXIS, hubPos);
        const baseMat = new THREE.Matrix4().compose(pos, quat, _UNIT_SCALE);

        // Hub dot instance — static matrix
        if (dotInstanceRef.current) {
          dotInstanceRef.current.setMatrixAt(i, baseMat);
        }

        // 3 ring instances per hub, each with its own delay
        for (let j = 0; j < RINGS_PER_HUB; j++) {
          const ringIdx = i * RINGS_PER_HUB + j;
          s.ringBaseMatrices[ringIdx] = baseMat.clone();
          s.ringDelays[ringIdx] = j + Math.random() * 0.5;
          // Initial matrix — scale 0 (hidden until first frame update)
          _scaleVec.set(0, 0, 0);
          _tmpMat.copy(baseMat).scale(_scaleVec);
          if (ringInstanceRef.current) {
            ringInstanceRef.current.setMatrixAt(ringIdx, _tmpMat);
          }
        }

        // Hitbox — child of globe, shared geo + mat
        const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
        hitbox.position.copy(pos);
        hitbox.userData = {
          position: hubPos,
          ...generateHubData(),
        };
        globe.add(hitbox);
        s.networkHitboxes.push(hitbox);
      }

      if (dotInstanceRef.current) {
        dotInstanceRef.current.instanceMatrix.needsUpdate = true;
      }
      if (ringInstanceRef.current) {
        ringInstanceRef.current.instanceMatrix.needsUpdate = true;
      }

      s.initialized = true;
    };
  }, [hitboxGeo, hitboxMat, _scaleVec, _tmpMat, containerRef]);

  // ════════════════════════════════════════════════
  // POINTER EVENTS — gated by creatorGlobeState.interactive
  // ════════════════════════════════════════════════

  useEffect(() => {
    const getEl = () => containerRef?.current;

    const onMove = (e) => {
      if (!creatorGlobeState.interactive) return;

      const el = getEl();
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const s = state.current;

      if (s.isDragging) {
        const dx = e.clientX - s.previousMouse.x;
        const dy = e.clientY - s.previousMouse.y;

        const globe = globeRef.current;
        if (globe && globe.parent) {
          globe.parent.getWorldQuaternion(_parentInvQuat).invert();
          _camRight.set(1, 0, 0).applyQuaternion(camera.quaternion).applyQuaternion(_parentInvQuat);
          _camUp.set(0, 1, 0).applyQuaternion(camera.quaternion).applyQuaternion(_parentInvQuat);
          _qDelta.setFromAxisAngle(_camUp, dx * 0.005);
          s.dragQuaternion.premultiply(_qDelta);
          _qDelta.setFromAxisAngle(_camRight, dy * 0.005);
          s.dragQuaternion.premultiply(_qDelta);
        }
      }
      s.previousMouse = { x: e.clientX, y: e.clientY };
    };

    const onDown = (e) => {
      if (!creatorGlobeState.interactive) return;

      const el = getEl();
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;

      raycaster.setFromCamera(pointer, camera);
      if (innerSphereRef.current) {
        const hits = raycaster.intersectObject(innerSphereRef.current);
        if (hits.length > 0) {
          state.current.isDragging = true;
          creatorGlobeState.isDragging = true;
        }
      }
      state.current.previousMouse = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      state.current.isDragging = false;
      creatorGlobeState.isDragging = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [containerRef, pointer, camera, raycaster, _parentInvQuat, _camRight, _camUp, _qDelta]);

  const updateTrajectoryTarget = useCallback((vStart, vEnd) => {
    const midPoint = vStart.clone().add(vEnd).multiplyScalar(0.5);
    const dist = vStart.distanceTo(vEnd);
    const arcHeight = 0.15 + dist * 0.35;
    midPoint.normalize().multiplyScalar(midPoint.length() + arcHeight);
    const curve = new THREE.QuadraticBezierCurve3(vStart, midPoint, vEnd);

    if (lineGeoRef.current) {
      lineGeoRef.current.setFromPoints(curve.getPoints(50));
      lineGeoRef.current.setDrawRange(0, 0);
    }
    if (targetRingRef.current) {
      targetRingRef.current.position.copy(vEnd).multiplyScalar(1.01);
      targetRingRef.current.quaternion.setFromUnitVectors(_Z_AXIS, vEnd);
    }
  }, []);

  // ════════════════════════════════════════════════
  // ANIMATION LOOP
  // ════════════════════════════════════════════════

  useFrame(({ clock }) => {
    const globe = globeRef.current;
    if (!globe) return;

    const s = state.current;
    const time = clock.getElapsedTime();

    globe.scale.lerp(_UNIT_SCALE, 0.03);

    // ── Constellation fade ──
    const cAlpha = creatorGlobeState.constellationOpacity;
    constellationLineMat.uniforms.uFade.value = cAlpha;
    if (webDotMatRef.current) webDotMatRef.current.opacity = 0.2 * cAlpha;
    if (shimmerDotMatRef.current) shimmerDotMatRef.current.opacity = 0.4 * cAlpha;

    if (!s.isDragging) {
      s.autoRotY -= s.activeHoverHub ? 0.0002 : 0.001;
    }

    const autoQuat = _qDelta.setFromAxisAngle(_camUp.set(0, 1, 0), s.autoRotY);
    const targetQuat = _parentInvQuat.copy(_tiltQuat).multiply(s.dragQuaternion).multiply(autoQuat);
    globe.quaternion.slerp(targetQuat, 0.1);

    const isInteractive = creatorGlobeState.interactive;
    const pointerInBounds = pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;

    if (!s.isDragging && s.initialized && pointerInBounds && isInteractive) {
      raycaster.setFromCamera(pointer, camera);

      const hubHits = raycaster.intersectObjects(s.networkHitboxes);
      const hoveredHub = hubHits.length > 0 ? hubHits[0].object : null;

      if (hoveredHub && hoveredHub !== s.activeHoverHub) {
        s.activeHoverHub = hoveredHub;
        s.trajectoryProgress = 0;
        if (trajectoryGroupRef.current) trajectoryGroupRef.current.visible = true;

        creatorGlobeState.hoveredData = hoveredHub.userData;

        const startPos = hoveredHub.userData.position;
        updateTrajectoryTarget(startPos, INDIA_POINT);
      } else if (!hoveredHub && s.activeHoverHub) {
        s.activeHoverHub = null;
        creatorGlobeState.hoveredData = null;
      }
    } else if ((!pointerInBounds || !isInteractive) && s.activeHoverHub) {
      s.activeHoverHub = null;
      creatorGlobeState.hoveredData = null;
    }

    if (s.activeHoverHub && containerRef?.current) {
      _tooltipVec.copy(s.activeHoverHub.userData.position);
      _tooltipVec.applyMatrix4(globe.matrixWorld);
      _tooltipVec.project(camera);

      const rect = containerRef.current.getBoundingClientRect();
      creatorGlobeState.tooltipX = (_tooltipVec.x * 0.5 + 0.5) * rect.width;
      creatorGlobeState.tooltipY = (_tooltipVec.y * -0.5 + 0.5) * rect.height;
    }

    // ── Ring instance updates ──
    if (s.initialized && ringInstanceRef.current) {
      if (cAlpha > 0) {
        ringInstanceRef.current.visible = true;
        const opacityAttr = ringGeo.attributes.aOpacity;
        const opacityArr = opacityAttr.array;

        for (let i = 0; i < NUM_RINGS; i++) {
          const delay = s.ringDelays[i];
          const t = (time - delay) % 3;
          if (t < 0) {
            _scaleVec.set(0, 0, 0);
            opacityArr[i] = 0;
          } else {
            const scale = 1 + t * 3;
            _scaleVec.set(scale, scale, scale);
            opacityArr[i] = Math.max(0, 0.6 - t / 2) * cAlpha;
          }
          _tmpMat.copy(s.ringBaseMatrices[i]).scale(_scaleVec);
          ringInstanceRef.current.setMatrixAt(i, _tmpMat);
        }
        ringInstanceRef.current.instanceMatrix.needsUpdate = true;
        opacityAttr.needsUpdate = true;
      } else {
        ringInstanceRef.current.visible = false;
      }
    }

    // Hub center dots — shared opacity
    hubDotMat.opacity = cAlpha;

    if (s.activeHoverHub) {
      s.trajectoryProgress = Math.min(1.0, s.trajectoryProgress + 0.025);
    } else {
      s.trajectoryProgress = Math.max(0, s.trajectoryProgress - 0.04);
      if (s.trajectoryProgress <= 0 && trajectoryGroupRef.current) {
        trajectoryGroupRef.current.visible = false;
      }
    }

    if (trajectoryGroupRef.current?.visible) {
      const drawCount = Math.floor(51 * s.trajectoryProgress);
      if (lineGeoRef.current) lineGeoRef.current.setDrawRange(0, drawCount);
      if (targetRingRef.current) {
        targetRingRef.current.scale.setScalar(Math.min(1, s.trajectoryProgress * 1.2));
        targetRingRef.current.visible = s.trajectoryProgress > 0.85;
      }
    }

    if (s.networkHubs.length > 1) {
      if (s.autoTrajectoryState === "idle") {
        s.autoPauseTimer++;
        if (s.autoPauseTimer > 90) {
          s.autoPauseTimer = 0;
          s.autoTrajectoryState = "animating";
          s.autoTrajectoryProgress = 0;
          if (autoTrajectoryGroupRef.current) autoTrajectoryGroupRef.current.visible = true;

          const idx1 = Math.floor(Math.random() * s.networkHubs.length);
          let idx2 = Math.floor(Math.random() * s.networkHubs.length);
          while (idx1 === idx2) idx2 = Math.floor(Math.random() * s.networkHubs.length);

          const startPos = s.networkHubs[idx1];
          const endPos = s.networkHubs[idx2];

          autoCurve.v0.copy(startPos);
          const midPoint = startPos.clone().add(endPos).multiplyScalar(0.5);
          const dist = startPos.distanceTo(endPos);
          const arcHeight = 0.15 + dist * 0.35;
          midPoint.normalize().multiplyScalar(midPoint.length() + arcHeight);
          autoCurve.v1.copy(midPoint);
          autoCurve.v2.copy(endPos);

          if (autoLineGeoRef.current) autoLineGeoRef.current.setFromPoints(autoCurve.getPoints(50));
          if (autoTargetRingRef.current) {
            autoTargetRingRef.current.position.copy(endPos).multiplyScalar(1.01);
            autoTargetRingRef.current.quaternion.setFromUnitVectors(_Z_AXIS, endPos);
          }
        }
      } else if (s.autoTrajectoryState === "animating") {
        s.autoTrajectoryProgress += 0.004;

        const head = Math.min(1, s.autoTrajectoryProgress / 0.7);
        const tail = Math.max(0, (s.autoTrajectoryProgress - 0.3) / 0.7);
        const startIdx = Math.floor(tail * 51);
        const endIdx = Math.floor(head * 51);

        if (autoLineGeoRef.current) autoLineGeoRef.current.setDrawRange(startIdx, endIdx - startIdx);

        if (autoTargetRingRef.current) {
          if (head > 0.9) {
            autoTargetRingRef.current.visible = true;
            autoTargetRingRef.current.scale.setScalar((1 - tail) * 1.5);
            autoTargetRingRef.current.material.opacity = 1 - tail;
          } else {
            autoTargetRingRef.current.visible = false;
          }
        }

        if (s.autoTrajectoryProgress >= 1.0) {
          s.autoTrajectoryState = "idle";
          if (autoTrajectoryGroupRef.current) autoTrajectoryGroupRef.current.visible = false;
        }
      }
    }
  });

  const { lineGeo: constellationLineGeo, dotGeo: constellationDotGeo, shimmerDotGeo } = useMemo(
    () => generateConstellationNetwork(36, 56, 1.08),
    []
  );

  // ════════════════════════════════════════════════
  // JSX SCENE GRAPH
  // ════════════════════════════════════════════════

  return (
    <group ref={globeRef}>
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.96, 32, 32]} />
        <meshBasicMaterial color="#121212" />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.98, 48, 48]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      <points ref={pointsMeshRef} renderOrder={1}>
        <bufferGeometry />
        <pointsMaterial
          size={0.01}
          color="#ffffff"
          transparent
          opacity={0.73}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={webMeshRef}>
        <primitive object={constellationLineGeo} attach="geometry" />
        <primitive object={constellationLineMat} attach="material" />
      </lineSegments>

      <points ref={webDotsRef}>
        <primitive object={constellationDotGeo} attach="geometry" />
        <pointsMaterial
          ref={webDotMatRef}
          size={0.008}
          map={dotTexture}
          color="#ffffff"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points renderOrder={6}>
        <primitive object={shimmerDotGeo} attach="geometry" />
        <pointsMaterial
          ref={shimmerDotMatRef}
          size={0.02}
          map={dotTexture}
          color="#ffffff"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Instanced rings — 60 → 1 draw call */}
      <instancedMesh
        ref={ringInstanceRef}
        args={[ringGeo, ringInstanceMat, NUM_RINGS]}
        renderOrder={11}
        frustumCulled={false}
      />

      {/* Instanced hub dots — 20 → 1 draw call */}
      <instancedMesh
        ref={dotInstanceRef}
        args={[hubDotGeo, hubDotMat, NUM_HUBS]}
        renderOrder={12}
        frustumCulled={false}
      />

      <group ref={trajectoryGroupRef} visible={false}>
        <line>
          <bufferGeometry ref={lineGeoRef} />
          <primitive object={lineMat} attach="material" />
        </line>
        <mesh ref={targetRingRef}>
          <ringGeometry args={[0.05, 0.055, 32]} />
          <primitive object={ringMat} attach="material" />
        </mesh>
      </group>

      <group ref={autoTrajectoryGroupRef} visible={false}>
        <line>
          <bufferGeometry ref={autoLineGeoRef} />
          <primitive object={autoLineMat} attach="material" />
        </line>
        <mesh ref={autoTargetRingRef}>
          <ringGeometry args={[0.05, 0.055, 32]} />
          <primitive object={autoRingMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}