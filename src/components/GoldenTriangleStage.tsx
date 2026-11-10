import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Gem } from 'lucide-react';

interface GoldenTriangleStageProps {
  enText: string;
  arText: string;
}

/**
 * Dedicated Cinematic 3D Parallax Stage for Core Value 04 ("The Golden Triangle"):
 * - Isolates Point 04 from the standard Core Values stream.
 * - Uses Framer Motion useScroll + dampened useSpring physics to animate an
 *   emerging, gliding, and scaling 3D abstract Golden Triangle geometry.
 * - Slides the verbatim English and Arabic text layers into symmetrical alignment
 *   on either side of the rotating 3D golden artifact.
 */
export const GoldenTriangleStage: React.FC<GoldenTriangleStageProps> = ({
  enText,
  arText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Buttery spring-dampened scroll physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 58,
    damping: 20,
    restDelta: 0.0005,
  });

  // 3D Golden Triangle Artifact Scroll Transforms
  const triangleGlideY = useTransform(smoothProgress, [0, 0.5, 1], [64, 0, -64]);
  const triangleScale = useTransform(smoothProgress, [0, 0.48, 0.55, 1], [0.74, 1.08, 1.08, 0.82]);
  const triangleRotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-32, 0, 32]);
  const triangleRotateX = useTransform(smoothProgress, [0, 0.5, 1], [28, 0, -24]);
  const triangleRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-26, 0, 26]);
  const innerPrismScale = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 1.15, 0.75]);
  const auraOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.25, 0.92, 0.3]);

  // Symmetrical Bilingual Text Slide-In Transforms
  const leftWingX = useTransform(smoothProgress, [0, 0.42, 0.65, 1], [-75, 0, 0, -25]);
  const rightWingX = useTransform(smoothProgress, [0, 0.42, 0.65, 1], [75, 0, 0, 25]);
  const wingOpacity = useTransform(smoothProgress, [0, 0.32, 0.75, 1], [0.2, 1, 1, 0.45]);

  return (
    <div
      ref={containerRef}
      data-testid="golden-triangle-stage"
      className="relative mt-12 pt-8 pb-6 perspective-stage"
    >
      {/* Ambient Golden-Turquoise Light Leak Backdrop */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: auraOpacity }}
        className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-80 rounded-full blur-3xl"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#198c96]/20 via-[#fbbf24]/25 to-[#38e2f2]/20" />
      </motion.div>

      <div className="relative rounded-3xl glass-panel border-[#fbbf24]/45 p-7 sm:p-11 overflow-hidden shadow-[0_28px_70px_-15px_rgba(0,0,0,0.88),0_0_55px_-12px_rgba(251,191,36,0.32)]">
        {/* Subtle Corner Radial Glints */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-[#fbbf24]/20 blur-3xl"
        />

        {/* Symmetrical 12-Column Stage: Left English (4) | Center 3D Golden Triangle (4) | Right Arabic (4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT WING (4 cols): Symmetrical English Text Layer */}
          <motion.div
            dir="ltr"
            style={{ x: leftWingX, opacity: wingOpacity }}
            className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="w-full min-h-[196px] flex flex-col justify-between rounded-2xl bg-[#04131a]/85 border border-[#fbbf24]/35 p-6 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#fbbf24]/20">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#fbbf24] uppercase whitespace-nowrap shrink-0">
                  <Gem className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>04 · GOLDEN TRIANGLE</span>
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#38e2f2] whitespace-nowrap shrink-0">
                  CORE PILLAR
                </span>
              </div>
              <p className="text-base sm:text-lg font-extrabold leading-relaxed text-gold-teal-gradient text-left my-auto">
                {enText}
              </p>
            </div>
          </motion.div>

          {/* CENTER STAGE (4 cols): Emerging 3D Abstract Golden Triangle Geometry */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-4 preserve-3d">
            <motion.div
              style={{
                y: triangleGlideY,
                scale: triangleScale,
                rotateZ: triangleRotateZ,
                rotateX: triangleRotateX,
                rotateY: triangleRotateY,
              }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center preserve-3d"
            >
              {/* Pulsing Golden Halo Ring */}
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute w-60 h-60 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#fbbf24]/45 shadow-[0_0_40px_rgba(251,191,36,0.22)]"
              />

              {/* Counter-Rotating Turquoise Geodesic Ring */}
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-48 h-48 sm:w-52 sm:h-52 rounded-full border border-[#38e2f2]/35"
              />

              {/* 3D Layered Abstract Golden Triangle SVG Artifact */}
              <motion.div
                animate={{ y: [-7, 7, -7] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center drop-shadow-[0_0_28px_rgba(251,191,36,0.55)]"
              >
                <svg
                  viewBox="0 0 240 240"
                  className="w-full h-full overflow-visible"
                  aria-label="3D Golden Triangle Artifact"
                >
                  <defs>
                    <linearGradient id="goldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="45%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="tealPrismGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#198c96" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="#38e2f2" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.65" />
                    </linearGradient>
                    <radialGradient id="coreGoldGlow" cx="50%" cy="55%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
                      <stop offset="65%" stopColor="#198c96" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#02070a" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Core Radial Glow */}
                  <circle cx="120" cy="130" r="88" fill="url(#coreGoldGlow)" />

                  {/* Back Shadow / Depth Prism Triangle */}
                  <polygon
                    points="120,22 216,188 24,188"
                    fill="url(#tealPrismGrad)"
                    stroke="#38e2f2"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                    transform="translate(0, 8) scale(0.96)"
                    style={{ transformOrigin: '120px 130px' }}
                  />

                  {/* Primary Outer Golden Triangle Frame */}
                  <polygon
                    points="120,24 214,186 26,186"
                    fill="rgba(4, 19, 26, 0.58)"
                    stroke="url(#goldEdgeGrad)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* 3D Internal Facet Lines Connecting Vertices to Center Apex */}
                  <line
                    x1="120"
                    y1="24"
                    x2="120"
                    y2="132"
                    stroke="url(#goldEdgeGrad)"
                    strokeWidth="1.8"
                    strokeOpacity="0.8"
                  />
                  <line
                    x1="214"
                    y1="186"
                    x2="120"
                    y2="132"
                    stroke="url(#goldEdgeGrad)"
                    strokeWidth="1.8"
                    strokeOpacity="0.8"
                  />
                  <line
                    x1="26"
                    y1="186"
                    x2="120"
                    y2="132"
                    stroke="url(#goldEdgeGrad)"
                    strokeWidth="1.8"
                    strokeOpacity="0.8"
                  />

                  {/* Secondary Inner Inverted Geodesic Triangle */}
                  <polygon
                    points="73,105 167,105 120,186"
                    fill="rgba(251, 191, 36, 0.12)"
                    stroke="#38e2f2"
                    strokeWidth="1.75"
                    strokeDasharray="4 4"
                  />

                  {/* Innermost Golden Core Triangle */}
                  <polygon
                    points="120,76 158,144 82,144"
                    fill="rgba(251, 191, 36, 0.22)"
                    stroke="url(#goldEdgeGrad)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* 3 Glowing Vertex Beacons (Quality, Precision, Craftsmanship) */}
                  <circle cx="120" cy="24" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                  <circle cx="214" cy="186" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                  <circle cx="26" cy="186" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />

                  {/* Center Core Jewel */}
                  <circle cx="120" cy="126" r="7" fill="#38e2f2" stroke="#fef08a" strokeWidth="2" />
                </svg>
              </motion.div>

              {/* Inner Dynamic Scale Ring */}
              <motion.div
                style={{ scale: innerPrismScale }}
                className="pointer-events-none absolute w-28 h-28 rounded-full bg-[#fbbf24]/15 blur-xl"
              />
            </motion.div>
          </div>

          {/* RIGHT WING (4 cols): Symmetrical Arabic Text Layer */}
          <motion.div
            dir="rtl"
            style={{ x: rightWingX, opacity: wingOpacity }}
            className="lg:col-span-4 flex flex-col justify-center font-arabic order-3"
          >
            <div className="w-full min-h-[196px] flex flex-col justify-between rounded-2xl bg-[#04131a]/85 border border-[#fbbf24]/35 p-6 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#fbbf24]/20">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-[#fbbf24] whitespace-nowrap shrink-0">
                  <Gem className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>04 · المثلث الذهبي</span>
                </span>
                <span className="text-xs font-bold text-[#38e2f2] whitespace-nowrap shrink-0">
                  الجودة · الدقة · الإتقان
                </span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold leading-relaxed text-gold-teal-gradient text-right my-auto">
                {arText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
