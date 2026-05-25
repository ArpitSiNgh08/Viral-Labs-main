import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signalsConfig } from "./SignalsConfig";

 const CONFIG = {
  // Geometry
  lineCount: 80,
  segmentCount: 150,
  positionX: -5,
  positionY: 2,
  spreadHeight: 38.07,
  spreadDepth: 0,
  curveLength: 60.58,
  curvePower: 1.2382,

  // Line appearance
  colorLine: "#2d2e2e",
  lineOpacity: 0.742,

  // Wave
  waveSpeed: 1.06,
  waveHeight: 0.515,

  // Signals
  signalCount: 73,
  speedGlobal: 0.603,
  trailLength: 26,
  colorSignal: "#ff6f21",
  useColor2: false,
  colorSignal2: "#a1687b",
  useColor3: false,
  colorSignal3: "#ffcc00",

  // Convergence glow
  glowColor: "#8a8b8b",
  glowStrength: 0.6,
  glowRange: 15,
};

function getPathPoint(t, lineIndex, out, time) {
  const {
    curveLength, lineCount,
    spreadHeight, spreadDepth, curvePower,
    waveSpeed, waveHeight,
  } = CONFIG;

  const straightLength = signalsConfig.straightLength;

  const totalLen = curveLength + straightLength;
  const currentX = -curveLength + t * totalLen;

  let y = 0;
  let z = 0;

  if (currentX < 0) {
    const spreadFactor = (lineIndex / lineCount - 0.5) * 2;
    const ratio = (currentX + curveLength) / curveLength;
    const shapeFactor = Math.pow((Math.cos(ratio * Math.PI) + 1) / 2, curvePower);

    y = spreadFactor * spreadHeight * shapeFactor;
    z = spreadFactor * spreadDepth * shapeFactor;

    const wave = Math.sin(time * waveSpeed + currentX * 0.1 + lineIndex) * waveHeight * shapeFactor;
    y += wave;
  }

  out[0] = currentX;
  out[1] = y;
  out[2] = z;
}

export default function SignalsScene() {
  const groupRef = useRef();
  const bgLinesRef = useRef([]);
  const signalsRef = useRef([]);
  const colorsRef = useRef([]);

  // Persistent Color objects — avoid allocations in useFrame
  const baseColorRef = useRef(new THREE.Color(CONFIG.colorLine));
  const glowColorRef = useRef(new THREE.Color(CONFIG.glowColor));
  const tmpColorRef = useRef(new THREE.Color());

  const tempPt = useMemo(() => [0, 0, 0], []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.position.set(CONFIG.positionX, CONFIG.positionY, 0);

    const pt = [0, 0, 0];
    const createdObjects = [];

    /* ── Background lines — vertex colors for convergence glow ── */
    const bgMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: CONFIG.lineOpacity,
      depthWrite: false,
    });
    createdObjects.push(bgMat);

    const bgLines = [];

    for (let i = 0; i < CONFIG.lineCount; i++) {
      const positions = new Float32Array(CONFIG.segmentCount * 3);
      const colors = new Float32Array(CONFIG.segmentCount * 3);

      for (let j = 0; j < CONFIG.segmentCount; j++) {
        getPathPoint(j / (CONFIG.segmentCount - 1), i, pt, 0);
        positions[j * 3] = pt[0];
        positions[j * 3 + 1] = pt[1];
        positions[j * 3 + 2] = pt[2];

        // Initial color = base dark gray
        colors[j * 3] = baseColorRef.current.r;
        colors[j * 3 + 1] = baseColorRef.current.g;
        colors[j * 3 + 2] = baseColorRef.current.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const line = new THREE.Line(geo, bgMat);
      line.renderOrder = 0;
      line.userData = { id: i };
      group.add(line);
      createdObjects.push(geo, line);
      bgLines.push(line);
    }

    bgLinesRef.current = bgLines;

    /* ── Signal colors ── */
    const sigColors = [new THREE.Color(CONFIG.colorSignal)];
    if (CONFIG.useColor2) sigColors.push(new THREE.Color(CONFIG.colorSignal2));
    if (CONFIG.useColor3) sigColors.push(new THREE.Color(CONFIG.colorSignal3));
    colorsRef.current = sigColors;

    /* ── Signal trail lines ── */
    const sigMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });
    createdObjects.push(sigMat);

    const maxTrail = CONFIG.trailLength + 10;
    const signals = [];

    for (let i = 0; i < CONFIG.signalCount; i++) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(maxTrail * 3);
      const colors = new Float32Array(maxTrail * 3);
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mesh = new THREE.Line(geo, sigMat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 1;
      group.add(mesh);
      createdObjects.push(geo, mesh);

      signals.push({
        mesh,
        laneIndex: Math.floor(Math.random() * CONFIG.lineCount),
        speed: 0.2 + Math.random() * 0.5,
        progress: Math.random(),
        history: [],
        color: sigColors[Math.floor(Math.random() * sigColors.length)],
      });
    }

    signalsRef.current = signals;

    return () => {
      signalsRef.current = [];
      bgLinesRef.current = [];
      createdObjects.forEach((obj) => {
        if (obj.isLine) group.remove(obj);
        if (obj.dispose) obj.dispose();
      });
    };
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pt = tempPt;
    const baseColor = baseColorRef.current;
    const glowColor = glowColorRef.current;
    const tmpColor = tmpColorRef.current;

    /* ── Update background lines with wave + convergence glow ── */
    const bgLines = bgLinesRef.current;
    for (let i = 0; i < bgLines.length; i++) {
      const line = bgLines[i];
      const posArr = line.geometry.attributes.position.array;
      const colArr = line.geometry.attributes.color.array;
      const lineId = line.userData.id;

      for (let j = 0; j < CONFIG.segmentCount; j++) {
        getPathPoint(j / (CONFIG.segmentCount - 1), lineId, pt, time);
        posArr[j * 3] = pt[0];
        posArr[j * 3 + 1] = pt[1];
        posArr[j * 3 + 2] = pt[2];

        // Glow near convergence point (x ≈ 0 is where all lines merge)
        const distFromConvergence = Math.abs(pt[0]);
        const glowFactor =
          distFromConvergence < CONFIG.glowRange
            ? (1 - distFromConvergence / CONFIG.glowRange) * CONFIG.glowStrength
            : 0;

        tmpColor.copy(baseColor).lerp(glowColor, glowFactor);
        colArr[j * 3] = tmpColor.r;
        colArr[j * 3 + 1] = tmpColor.g;
        colArr[j * 3 + 2] = tmpColor.b;
      }

      line.geometry.attributes.position.needsUpdate = true;
      line.geometry.attributes.color.needsUpdate = true;
    }

    /* ── Animate signals ── */
    const signals = signalsRef.current;
    const sigColors = colorsRef.current;
    const { trailLength, lineCount, speedGlobal } = CONFIG;

    for (let s = 0; s < signals.length; s++) {
      const sig = signals[s];

      sig.progress += sig.speed * 0.005 * speedGlobal;

      if (sig.progress > 1.0) {
        sig.progress = 0;
        sig.laneIndex = Math.floor(Math.random() * lineCount);
        sig.history.length = 0;
        sig.color = sigColors[Math.floor(Math.random() * sigColors.length)];
      }

      getPathPoint(sig.progress, sig.laneIndex, pt, time);
      sig.history.push(pt[0], pt[1], pt[2]);

      const maxEntries = (trailLength + 1) * 3;
      while (sig.history.length > maxEntries) {
        sig.history.shift();
        sig.history.shift();
        sig.history.shift();
      }

      const posArr = sig.mesh.geometry.attributes.position.array;
      const colArr = sig.mesh.geometry.attributes.color.array;
      const histPoints = sig.history.length / 3;

      for (let i = 0; i < trailLength; i++) {
        let idx = histPoints - 1 - i;
        if (idx < 0) idx = 0;
        const base = idx * 3;

        posArr[i * 3] = sig.history[base] ?? 0;
        posArr[i * 3 + 1] = sig.history[base + 1] ?? 0;
        posArr[i * 3 + 2] = sig.history[base + 2] ?? 0;

        const alpha = trailLength > 0 ? Math.max(0, 1 - i / trailLength) : 1;
        colArr[i * 3] = sig.color.r * alpha;
        colArr[i * 3 + 1] = sig.color.g * alpha;
        colArr[i * 3 + 2] = sig.color.b * alpha;
      }

      sig.mesh.geometry.setDrawRange(0, trailLength);
      sig.mesh.geometry.attributes.position.needsUpdate = true;
      sig.mesh.geometry.attributes.color.needsUpdate = true;
    }
  });

  return <group ref={groupRef} />;
}