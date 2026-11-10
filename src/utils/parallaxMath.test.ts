import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp01,
  computeOrbTransform,
  computeSectionParallaxOffset,
  generateWordGlobeParticles,
} from './parallaxMath';
import { ROWAD_CONTENT } from '../data/rowadContent';

test('clamp01 clamps values to [0, 1] and handles NaN', () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.42), 0.42);
  assert.equal(clamp01(1.8), 1);
  assert.equal(clamp01(Number.NaN), 0);
});

test('computeOrbTransform smoothly transitions shape, radialDispersion, pulse, and rotation', () => {
  const heroState = computeOrbTransform(0, 0, 0, 0);
  assert.equal(heroState.activeSection, 'hero');
  assert.equal(heroState.shapeForm, 'sphere');
  assert.equal(heroState.scale, 1.15);
  assert.equal(heroState.radialDispersion, 1.0);

  const valuesState = computeOrbTransform(0.4, 0, 0, 1.2);
  assert.equal(valuesState.activeSection, 'values');
  assert.equal(valuesState.shapeForm, 'diamond');
  assert.ok(valuesState.radialDispersion > heroState.radialDispersion);
  assert.ok(valuesState.pulseDurationSec < heroState.pulseDurationSec);
  assert.ok(valuesState.rotationSpeedMultiplier > heroState.rotationSpeedMultiplier);
});

test('generateWordGlobeParticles creates 3D global script particles including A, ب, 文, Ω, R, Д, 𐎠', () => {
  const orb = computeOrbTransform(0.25, 0.1, -0.1, 0.5);
  const particles = generateWordGlobeParticles(orb, 140);
  assert.ok(particles.length >= 16);
  const glyphs = particles.map((p) => p.glyph);
  for (const required of ['A', 'ب', '文', 'Ω', 'R', 'Д', '𐎠']) {
    assert.ok(glyphs.includes(required), `Missing required global glyph ${required}`);
  }
  assert.ok(particles.every((p) => p.scale >= 0.6 && p.opacity > 0));
});

test('computeSectionParallaxOffset calculates 3D depth and viewport center light-leak intensity', () => {
  const centered = computeSectionParallaxOffset(0.4, 0.4);
  assert.equal(centered.translateYpx, 0);
  assert.equal(centered.lightLeakIntensity, 1);

  const offCenter = computeSectionParallaxOffset(0.7, 0.4);
  assert.ok(offCenter.translateYpx < 0);
  assert.ok(offCenter.lightLeakIntensity < centered.lightLeakIntensity);
});

test('ROWAD_CONTENT preserves exact bilingual text and 6 translation request steps', () => {
  assert.equal(ROWAD_CONTENT.companyProfile.paragraphsEn.length, 2);
  assert.equal(ROWAD_CONTENT.companyProfile.paragraphsAr.length, 2);
  assert.equal(ROWAD_CONTENT.coreValues.items.length, 4);
  assert.equal(ROWAD_CONTENT.specializedServices.group1.itemsEn.length, 4);
  assert.equal(ROWAD_CONTENT.specializedServices.group1.itemsAr.length, 4);
  assert.equal(ROWAD_CONTENT.specializedServices.group2.itemsEn.length, 10);
  assert.equal(ROWAD_CONTENT.specializedServices.group2.itemsAr.length, 10);
  assert.equal(ROWAD_CONTENT.serviceRequestProcess.titleEn, 'Translation Request Process');
  assert.equal(ROWAD_CONTENT.serviceRequestProcess.titleAr, 'إجراءات طلب الترجمة');
  assert.equal(ROWAD_CONTENT.serviceRequestProcess.steps.length, 6);
  assert.equal(ROWAD_CONTENT.communicationChannels.channels.length, 3);
});

