import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { OrbTransformState, generateWordGlobeParticles } from '../utils/parallaxMath';

interface FloatingTranslationOrbProps {
  orbState: OrbTransformState;
}

/**
 * Dynamic 3D "Wide World" Sphere & Multi-Language Particle Cloud.
 * Rendered at z-[5] strictly BEHIND all foreground content text layers, columns,
 * and workflow infographics (which sit at z-20), while sitting ON TOP of the dark page
 * background stage (which sits at z-0).
 *
 * Designed with low, semi-transparent opacity so the slowly rotating geodesic Wide-World
 * sphere and outward-drifting global alphabet glyphs create deep 3D atmosphere without
 * ever competing with foreground text legibility.
 */
export const FloatingTranslationOrb: React.FC<FloatingTranslationOrbProps> = ({
  orbState,
}) => {
  const particles = useMemo(
    () => generateWordGlobeParticles(orbState, 195),
    [orbState]
  );

  return (
    <div
      data-testid="floating-translation-orb"
      data-active-section={orbState.activeSection}
      data-shape-form={orbState.shapeForm}
      data-scroll-progress={orbState.progress.toFixed(2)}
      className="fixed inset-0 pointer-events-none z-[5] flex items-center justify-center overflow-hidden perspective-stage select-none"
      aria-hidden="true"
    >
      <motion.div
        className="relative flex flex-col items-center justify-center preserve-3d pointer-events-none"
        animate={{
          x: `${orbState.translateXvw * 0.55}vw`,
          y: `${orbState.translateYvh * 0.55}vh`,
          z: orbState.translateZpx,
          scale: orbState.scale,
        }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 24,
          mass: 0.8,
        }}
      >
        {/* Ambient Pulsing Turquoise / Teal Atmospheric Light Leak (Low Opacity) */}
        <div
          className="absolute w-96 h-96 sm:w-[540px] sm:h-[540px] rounded-full blur-3xl pointer-events-none opacity-45"
          style={{
            background: `radial-gradient(circle, ${orbState.secondaryHueHex}30 0%, ${orbState.accentHueHex}18 48%, transparent 74%)`,
            animation: `pulse-aura ${orbState.pulseDurationSec}s ease-in-out infinite`,
          }}
        />

        {/* Semi-Transparent 3D Wide-World Sphere & Floating Multi-Language Particle Cloud */}
        <div className="relative w-80 h-80 sm:w-[440px] sm:h-[440px] flex items-center justify-center preserve-3d pointer-events-none">
          {/* =================================================================
              3D MULTI-LANGUAGE PARTICLE CLOUD (A, ب, 文, Ω, R, Д, 𐎠, etc.)
              Reacts organically to scroll: scales, flies outward, and drifts in 3D
             ================================================================= */}
          <div className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none">
            {particles.map((p, idx) => (
              <div
                key={p.id}
                data-glyph={p.glyph}
                className="absolute flex items-center justify-center select-none transition-transform duration-200 ease-out"
                style={{
                  transform: `translate3d(${p.x3d}px, ${p.y3d}px, ${p.z3d}px) scale(${p.scale})`,
                  opacity: Number((p.opacity * 0.46).toFixed(3)),
                  filter: p.blurPx > 0 ? `blur(${p.blurPx}px)` : undefined,
                }}
              >
                <span
                  className="animate-float-glyph px-2.5 py-1 rounded-lg bg-[#04151d]/45 border border-[#38e2f2]/25 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-[2px]"
                  style={{
                    color: p.z3d > 0 ? '#bae6fd' : '#67e8f9',
                    borderColor: `${p.hueHex}40`,
                    animationDelay: `${(idx * 0.24).toFixed(2)}s`,
                    textShadow: `0 0 10px ${p.hueHex}66`,
                  }}
                >
                  {p.glyph}
                </span>
              </div>
            ))}
          </div>

          {/* Outer Wide-World Celestial Meridian Ring 1 (Low-Opacity Semi-Transparent) */}
          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#38e2f2]/22 transition-transform duration-200"
            style={{
              transform: `scale(${orbState.ringSpread}) rotateX(${
                66 + orbState.rotateXdeg * 0.35
              }deg) rotateY(${orbState.rotateYdeg * 0.55}deg) rotateZ(${
                orbState.progress * 260 * orbState.rotationSpeedMultiplier
              }deg)`,
            }}
          />

          {/* Outer Wide-World Celestial Meridian Ring 2 */}
          <div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#198c96]/32 transition-transform duration-200"
            style={{
              transform: `scale(${orbState.ringSpread * 0.92}) rotateX(${
                -54 - orbState.rotateXdeg * 0.28
              }deg) rotateY(${-orbState.rotateYdeg * 0.65}deg) rotateZ(${
                -orbState.progress * 340 * orbState.rotationSpeedMultiplier
              }deg)`,
            }}
          />

          {/* Slowly Rotating Abstract Semi-Transparent Wide-World Geodesic Sphere */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 54, repeat: Infinity, ease: 'linear' }}
            className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center opacity-32 transition-all duration-300"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${orbState.secondaryHueHex}33 0%, ${orbState.accentHueHex}1f 52%, transparent 82%)`,
              boxShadow: `inset 0 0 36px ${orbState.secondaryHueHex}28, 0 0 42px ${orbState.accentHueHex}22`,
              transform: `rotateX(${orbState.rotateXdeg * 0.18}deg) rotateY(${
                orbState.rotateYdeg * 0.14
              }deg)`,
            }}
          >
            {/* Geodesic World Meridians & Parallels Wireframe */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-[#38e2f2]"
              fill="none"
            >
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 6" strokeOpacity="0.45" />
              <ellipse cx="100" cy="100" rx="64" ry="92" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" />
              <ellipse cx="100" cy="100" rx="32" ry="92" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.5" />
              <ellipse cx="100" cy="100" rx="92" ry="64" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" />
              <ellipse cx="100" cy="100" rx="92" ry="32" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.5" />
              <line x1="8" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
              <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
