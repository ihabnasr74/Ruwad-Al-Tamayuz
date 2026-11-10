export type SectionId = 'hero' | 'profile' | 'values' | 'services' | 'workflow' | 'contact';
export type OrbShapeForm = 'sphere' | 'prism' | 'diamond' | 'gyroscope' | 'hexagon' | 'beacon';

export interface WordGlobeParticle {
  id: string;
  glyph: string;
  scriptName: string;
  x3d: number;
  y3d: number;
  z3d: number;
  scale: number;
  opacity: number;
  blurPx: number;
  floatPhase: number;
  hueHex: string;
}

export interface OrbTransformState {
  progress: number;
  activeSection: SectionId;
  activeSectionIndex: number;
  shapeForm: OrbShapeForm;
  clipPolygon: string;
  borderRadiusPct: number;
  translateXvw: number;
  translateYvh: number;
  translateZpx: number;
  scale: number;
  rotateXdeg: number;
  rotateYdeg: number;
  rotateZdeg: number;
  ringSpread: number;
  radialDispersion: number;
  morphFactor: number;
  glowIntensity: number;
  pulseDurationSec: number;
  rotationSpeedMultiplier: number;
  accentHueHex: string;
  secondaryHueHex: string;
}

export const GLOBAL_ALPHABET_GLYPHS: ReadonlyArray<{ glyph: string; scriptName: string }> = [
  { glyph: 'A', scriptName: 'Latin' },
  { glyph: 'ب', scriptName: 'Arabic' },
  { glyph: '文', scriptName: 'Hanzi' },
  { glyph: 'Ω', scriptName: 'Greek' },
  { glyph: 'R', scriptName: 'Latin-R' },
  { glyph: 'Д', scriptName: 'Cyrillic' },
  { glyph: '𐎠', scriptName: 'Cuneiform' },
  { glyph: 'ع', scriptName: 'Arabic-Ain' },
  { glyph: 'अ', scriptName: 'Devanagari' },
  { glyph: 'あ', scriptName: 'Hiragana' },
  { glyph: '한', scriptName: 'Hangul' },
  { glyph: 'Ψ', scriptName: 'Greek-Psi' },
  { glyph: 'ض', scriptName: 'Arabic-Dad' },
  { glyph: 'Ж', scriptName: 'Cyrillic-Zhe' },
  { glyph: 'λ', scriptName: 'Lambda' },
  { glyph: 'ق', scriptName: 'Arabic-Qaf' },
  { glyph: 'T', scriptName: 'Latin-T' },
  { glyph: '語', scriptName: 'Kanji' },
];

interface KeyframeNode {
  progress: number;
  section: SectionId;
  shapeForm: OrbShapeForm;
  clipPolygon: string;
  borderRadiusPct: number;
  xVw: number;
  yVh: number;
  zPx: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  ringSpread: number;
  radialDispersion: number;
  morphFactor: number;
  glowIntensity: number;
  pulseDurationSec: number;
  rotationSpeedMultiplier: number;
  accentHueHex: string;
  secondaryHueHex: string;
}

const KEYFRAMES: KeyframeNode[] = [
  {
    progress: 0.0,
    section: 'hero',
    shapeForm: 'sphere',
    clipPolygon: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    borderRadiusPct: 50,
    xVw: 0,
    yVh: -4,
    zPx: 95,
    scale: 1.15,
    rotX: 14,
    rotY: 0,
    rotZ: 0,
    ringSpread: 1.15,
    radialDispersion: 1.0,
    morphFactor: 0.0,
    glowIntensity: 0.96,
    pulseDurationSec: 2.8,
    rotationSpeedMultiplier: 1.0,
    accentHueHex: '#198c96',
    secondaryHueHex: '#38e2f2',
  },
  {
    progress: 0.2,
    section: 'profile',
    shapeForm: 'prism',
    clipPolygon: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
    borderRadiusPct: 32,
    xVw: 0,
    yVh: 0,
    zPx: 55,
    scale: 0.98,
    rotX: 26,
    rotY: 160,
    rotZ: 18,
    ringSpread: 1.32,
    radialDispersion: 1.48,
    morphFactor: 0.25,
    glowIntensity: 0.88,
    pulseDurationSec: 2.1,
    rotationSpeedMultiplier: 1.45,
    accentHueHex: '#22b8c7',
    secondaryHueHex: '#198c96',
  },
  {
    progress: 0.4,
    section: 'values',
    shapeForm: 'diamond',
    clipPolygon: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    borderRadiusPct: 20,
    xVw: 0,
    yVh: 2,
    zPx: 80,
    scale: 1.04,
    rotX: -22,
    rotY: 340,
    rotZ: 45,
    ringSpread: 1.46,
    radialDispersion: 1.75,
    morphFactor: 0.52,
    glowIntensity: 0.99,
    pulseDurationSec: 1.5,
    rotationSpeedMultiplier: 1.9,
    accentHueHex: '#38e2f2',
    secondaryHueHex: '#14b8a6',
  },
  {
    progress: 0.62,
    section: 'services',
    shapeForm: 'gyroscope',
    clipPolygon: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    borderRadiusPct: 36,
    xVw: 0,
    yVh: 0,
    zPx: 45,
    scale: 0.92,
    rotX: 30,
    rotY: 520,
    rotZ: -28,
    ringSpread: 1.38,
    radialDispersion: 1.62,
    morphFactor: 0.74,
    glowIntensity: 0.9,
    pulseDurationSec: 1.75,
    rotationSpeedMultiplier: 2.2,
    accentHueHex: '#198c96',
    secondaryHueHex: '#2dd4bf',
  },
  {
    progress: 0.82,
    section: 'workflow',
    shapeForm: 'hexagon',
    clipPolygon: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
    borderRadiusPct: 16,
    xVw: 32,
    yVh: -22,
    zPx: 65,
    scale: 0.86,
    rotX: 18,
    rotY: 700,
    rotZ: 15,
    ringSpread: 1.26,
    radialDispersion: 1.35,
    morphFactor: 0.9,
    glowIntensity: 0.94,
    pulseDurationSec: 1.35,
    rotationSpeedMultiplier: 2.5,
    accentHueHex: '#26b0c4',
    secondaryHueHex: '#38bdf8',
  },
  {
    progress: 1.0,
    section: 'contact',
    shapeForm: 'beacon',
    clipPolygon: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    borderRadiusPct: 48,
    xVw: 0,
    yVh: -30,
    zPx: 50,
    scale: 0.82,
    rotX: 10,
    rotY: 880,
    rotZ: 0,
    ringSpread: 1.2,
    radialDispersion: 1.15,
    morphFactor: 1.0,
    glowIntensity: 0.92,
    pulseDurationSec: 1.9,
    rotationSpeedMultiplier: 1.6,
    accentHueHex: '#198c96',
    secondaryHueHex: '#38e2f2',
  },
];

export function clamp01(value: number): number {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function smoothstep(t: number): number {
  const clamped = clamp01(t);
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Calculates the 3D parallax transformation state for the Wide-World sphere and
 * its surrounding multi-language particle cloud on every scroll tick.
 */
export function computeOrbTransform(
  rawProgress: number,
  pointerX = 0,
  pointerY = 0,
  scrollVelocity = 0
): OrbTransformState {
  const progress = clamp01(rawProgress);

  let lowerIndex = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (progress >= KEYFRAMES[i].progress && progress <= KEYFRAMES[i + 1].progress) {
      lowerIndex = i;
      break;
    }
  }

  const startNode = KEYFRAMES[lowerIndex];
  const endNode = KEYFRAMES[Math.min(lowerIndex + 1, KEYFRAMES.length - 1)];
  const segmentSpan = endNode.progress - startNode.progress;
  const localT = segmentSpan > 0 ? smoothstep((progress - startNode.progress) / segmentSpan) : 0;

  let closestIdx = 0;
  let minDistance = Infinity;
  for (let i = 0; i < KEYFRAMES.length; i++) {
    const dist = Math.abs(progress - KEYFRAMES[i].progress);
    if (dist < minDistance) {
      minDistance = dist;
      closestIdx = i;
    }
  }

  const clampedPtrX = Math.max(-1, Math.min(1, pointerX));
  const clampedPtrY = Math.max(-1, Math.min(1, pointerY));
  const clampedVel = Math.max(0, Math.min(3, Math.abs(scrollVelocity)));

  const activeNode = localT < 0.5 ? startNode : endNode;
  const basePulse = lerp(startNode.pulseDurationSec, endNode.pulseDurationSec, localT);
  const dynamicPulse = Math.max(0.65, Number((basePulse - clampedVel * 0.45).toFixed(2)));
  const baseRotSpeed = lerp(
    startNode.rotationSpeedMultiplier,
    endNode.rotationSpeedMultiplier,
    localT
  );
  const baseDispersion = lerp(startNode.radialDispersion, endNode.radialDispersion, localT);

  return {
    progress,
    activeSection: KEYFRAMES[closestIdx].section,
    activeSectionIndex: closestIdx,
    shapeForm: activeNode.shapeForm,
    clipPolygon: activeNode.clipPolygon,
    borderRadiusPct: Math.round(lerp(startNode.borderRadiusPct, endNode.borderRadiusPct, localT)),
    translateXvw: Number((lerp(startNode.xVw, endNode.xVw, localT) + clampedPtrX * 2.8).toFixed(3)),
    translateYvh: Number((lerp(startNode.yVh, endNode.yVh, localT) + clampedPtrY * 2.8).toFixed(3)),
    translateZpx: Number(lerp(startNode.zPx, endNode.zPx, localT).toFixed(2)),
    scale: Number(lerp(startNode.scale, endNode.scale, localT).toFixed(4)),
    rotateXdeg: Number((lerp(startNode.rotX, endNode.rotX, localT) - clampedPtrY * 16).toFixed(2)),
    rotateYdeg: Number((lerp(startNode.rotY, endNode.rotY, localT) + clampedPtrX * 24).toFixed(2)),
    rotateZdeg: Number(lerp(startNode.rotZ, endNode.rotZ, localT).toFixed(2)),
    ringSpread: Number(lerp(startNode.ringSpread, endNode.ringSpread, localT).toFixed(3)),
    radialDispersion: Number((baseDispersion + clampedVel * 0.28).toFixed(3)),
    morphFactor: Number(lerp(startNode.morphFactor, endNode.morphFactor, localT).toFixed(3)),
    glowIntensity: Number(lerp(startNode.glowIntensity, endNode.glowIntensity, localT).toFixed(3)),
    pulseDurationSec: dynamicPulse,
    rotationSpeedMultiplier: Number((baseRotSpeed + clampedVel * 0.6).toFixed(2)),
    accentHueHex: activeNode.accentHueHex,
    secondaryHueHex: activeNode.secondaryHueHex,
  };
}

/**
 * Generates a 3D spherical cloud of floating global alphabet characters (A, ب, 文, Ω, R, Д, 𐎠, etc.)
 * around the Wide-World sphere. Reacts to scroll progress, rotation angles, and outward dispersion.
 */
export function generateWordGlobeParticles(
  orbState: OrbTransformState,
  baseRadiusPx = 135
): WordGlobeParticle[] {
  const count = GLOBAL_ALPHABET_GLYPHS.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const rotYRad = (orbState.rotateYdeg * Math.PI) / 180;
  const rotXRad = (orbState.rotateXdeg * Math.PI) / 180;

  return GLOBAL_ALPHABET_GLYPHS.map((item, idx) => {
    // Fibonacci sphere distribution in [-1, 1]
    const yNorm = 1 - (idx / Math.max(1, count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
    const theta = goldenAngle * idx + rotYRad;

    // Outward flight dispersion wave as user scrolls
    const waveBurst = 1 + Math.sin(orbState.progress * Math.PI * 3 + idx * 0.7) * 0.22;
    const effectiveRadius = baseRadiusPx * orbState.radialDispersion * waveBurst;

    const rawX = Math.cos(theta) * radiusAtY * effectiveRadius;
    const rawZ = Math.sin(theta) * radiusAtY * effectiveRadius;
    const rawY = yNorm * effectiveRadius;

    // Apply X-axis tilt rotation
    const tiltedY = rawY * Math.cos(rotXRad) - rawZ * Math.sin(rotXRad);
    const tiltedZ = rawY * Math.sin(rotXRad) + rawZ * Math.cos(rotXRad);

    // Normalize depth [-effectiveRadius, +effectiveRadius] to [0, 1] for perspective scaling & light
    const depthNorm = clamp01((tiltedZ + effectiveRadius) / (2 * Math.max(1, effectiveRadius)));
    const scale = Number((0.62 + depthNorm * 0.78).toFixed(3));
    const opacity = Number((0.28 + depthNorm * 0.72).toFixed(3));
    const blurPx = depthNorm < 0.35 ? Number(((0.35 - depthNorm) * 4).toFixed(1)) : 0;

    return {
      id: `glyph-${idx}-${item.scriptName}`,
      glyph: item.glyph,
      scriptName: item.scriptName,
      x3d: Number(rawX.toFixed(1)),
      y3d: Number(tiltedY.toFixed(1)),
      z3d: Number(tiltedZ.toFixed(1)),
      scale,
      opacity,
      blurPx,
      floatPhase: Number(((idx * 0.45) % (Math.PI * 2)).toFixed(2)),
      hueHex: idx % 2 === 0 ? orbState.secondaryHueHex : orbState.accentHueHex,
    };
  });
}

/**
 * Calculates individual section depth offset and virtual light-leak intensity as user scrolls.
 */
export function computeSectionParallaxOffset(
  scrollProgress: number,
  sectionCenterProgress: number,
  intensity = 1
): {
  translateYpx: number;
  rotateXdeg: number;
  skewYdeg: number;
  scale: number;
  opacity: number;
  lightLeakIntensity: number;
} {
  const delta = clamp01(scrollProgress) - sectionCenterProgress;
  const clampedDelta = Math.max(-0.4, Math.min(0.4, delta));
  const translateYpx = Number((clampedDelta * -140 * intensity).toFixed(2));
  const rotateXdeg = Number((clampedDelta * 18 * intensity).toFixed(2));
  const skewYdeg = Number((clampedDelta * 3.5 * intensity).toFixed(2));
  const distanceRatio = Math.min(1, Math.abs(delta) / 0.35);
  const scale = Number((1 - distanceRatio * 0.05 * intensity).toFixed(4));
  const opacity = Number(Math.max(0.75, 1 - distanceRatio * 0.22).toFixed(3));
  // Peaks at 1.0 when section passes the center of the viewport
  const lightLeakIntensity = Number(Math.max(0.15, 1 - distanceRatio * 0.85).toFixed(3));

  return { translateYpx, rotateXdeg, skewYdeg, scale, opacity, lightLeakIntensity };
}
