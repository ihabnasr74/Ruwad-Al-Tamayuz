import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import {
  Target,
  ShieldCheck,
  Clock,
  Gem,
  Mail,
  Headset,
  MessageCircle,
  Copy,
  Check,
  ArrowDown,
  Layers,
} from 'lucide-react';
import { ROWAD_CONTENT, CoreValueItem } from './data/rowadContent';
import {
  computeOrbTransform,
  computeSectionParallaxOffset,
} from './utils/parallaxMath';
import { RowadLogo } from './components/RowadLogo';
import { FloatingTranslationOrb } from './components/FloatingTranslationOrb';
import { SectionRibbonHeader } from './components/SectionRibbonHeader';
import { WorkflowSection } from './components/WorkflowSection';
import { ReferenceLightboxModal } from './components/ReferenceLightboxModal';
import { GoldenTriangleStage } from './components/GoldenTriangleStage';

const CORE_VALUE_ICONS: Record<CoreValueItem['icon'], React.FC<{ className?: string }>> = {
  accuracy: Target,
  confidentiality: ShieldCheck,
  deadlines: Clock,
  'golden-triangle': Gem,
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollSpeed, setScrollSpeed] = useState<number>(0);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [serviceFilter, setServiceFilter] = useState<'all' | 'group1' | 'group2'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'quote' | 'references'>('quote');

  const lastScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(performance.now());

  // Smooth spring-dampened Framer Motion scroll physics
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 24,
    restDelta: 0.0005,
  });
  const rawVelocity = useVelocity(scrollY);

  // Independent Multi-Layer Parallax Transforms (Micro-grids, Ambient Orbs, Opposing Cross-Vectors, Staggered Columns)
  const microGridY = useTransform(smoothProgress, [0, 1], ['0%', '9%']);
  const fineSubgridY = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const farNebulaY = useTransform(smoothProgress, [0, 1], ['0%', '28%']);
  const midNebulaY = useTransform(smoothProgress, [0, 1], ['0%', '-42%']);
  const nearHorizonY = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);
  const bgRotateZ = useTransform(smoothProgress, [0, 1], [0, 165]);

  // Staggered Vertical Column Gliding (English left vs Arabic right glide at distinct speeds)
  const leftColumnGlideY = useTransform(smoothProgress, [0, 1], [28, -46]);
  const rightColumnGlideY = useTransform(smoothProgress, [0, 1], [-22, 42]);

  // Opposing Horizontal Cross-Fade Beams
  const crossSlideLeftToRight = useTransform(smoothProgress, [0, 1], ['-18%', '18%']);
  const crossSlideRightToLeft = useTransform(smoothProgress, [0, 1], ['18%', '-18%']);

  // High-precision scroll listener for 3D Word-Globe morphing & velocity
  useEffect(() => {
    let decayTimer: ReturnType<typeof setTimeout> | null = null;

    const updateScroll = () => {
      const now = performance.now();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const normalized = docHeight > 0 ? scrollTop / docHeight : 0;

      const dt = Math.max(16, now - lastScrollTimeRef.current);
      const dy = Math.abs(scrollTop - lastScrollYRef.current);
      const instantVelocity = Math.min(3, (dy / dt) * 1.4);

      lastScrollYRef.current = scrollTop;
      lastScrollTimeRef.current = now;

      setScrollProgress(Math.max(0, Math.min(1, normalized)));
      setScrollSpeed(instantVelocity);

      if (decayTimer) clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      if (decayTimer) clearTimeout(decayTimer);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [rawVelocity]);

  // Smooth 3D Pointer Parallax Listener
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    setPointerOffset({ x: nx, y: ny });
  }, []);

  const orbState = computeOrbTransform(
    scrollProgress,
    pointerOffset.x,
    pointerOffset.y,
    scrollSpeed
  );

  // Per-section 3D parallax & viewport-center virtual light-leak calculations
  const profileParallax = computeSectionParallaxOffset(scrollProgress, 0.2, 0.65);
  const valuesParallax = computeSectionParallaxOffset(scrollProgress, 0.4, 0.65);
  const servicesParallax = computeSectionParallaxOffset(scrollProgress, 0.62, 0.55);
  const workflowParallax = computeSectionParallaxOffset(scrollProgress, 0.82, 0.5);

  const handleCopyContact = (id: string, value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02070a] text-slate-100 relative overflow-x-hidden selection:bg-[#38e2f2] selection:text-[#02070a]"
    >
      {/* =====================================================================
          LAYER 0 (z-0): DARK PAGE BACKGROUND & ATMOSPHERIC LIGHTING GRIDS
         ===================================================================== */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Micro-Distance Tech Grid */}
        <motion.div
          style={{ y: microGridY }}
          className="absolute -inset-y-32 inset-x-0 deep-space-grid opacity-50"
        />

        {/* Counter-Drifting Radial Subgrid */}
        <motion.div
          style={{ y: fineSubgridY }}
          className="absolute -inset-y-32 inset-x-0 fine-tech-subgrid opacity-40"
        />

        {/* Pulsing Ambient Teal / Turquoise Atmospheric Light Orbs (#198c96 & #38e2f2) */}
        <motion.div
          style={{ y: farNebulaY, x: crossSlideLeftToRight }}
          className="absolute top-[6%] left-[8%] w-[560px] h-[560px] rounded-full bg-[#198c96]/18 blur-[140px]"
        />
        <motion.div
          style={{ y: midNebulaY, x: crossSlideRightToLeft }}
          className="absolute top-[46%] right-[6%] w-[640px] h-[640px] rounded-full bg-[#38e2f2]/14 blur-[160px]"
        />
        <motion.div
          style={{ y: farNebulaY }}
          className="absolute bottom-[4%] left-[28%] w-[520px] h-[520px] rounded-full bg-[#198c96]/16 blur-[150px]"
        />

        {/* Rotating Celestial Geodesic Rings */}
        <motion.div
          style={{ y: midNebulaY, rotateZ: bgRotateZ }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] opacity-15 flex items-center justify-center"
        >
          <svg viewBox="0 0 800 800" className="w-full h-full text-[#38e2f2]" fill="none">
            <circle cx="400" cy="400" r="370" stroke="currentColor" strokeWidth="1" strokeDasharray="5 12" />
            <circle cx="400" cy="400" r="290" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 9" />
            <ellipse cx="400" cy="400" rx="185" ry="370" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="400" cy="400" rx="370" ry="185" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Opposing Horizontal Light-Leak Filaments */}
        <motion.div
          style={{ y: nearHorizonY, x: crossSlideLeftToRight }}
          className="absolute inset-x-0 top-[32%] h-px bg-gradient-to-r from-transparent via-[#38e2f2]/35 to-transparent"
        />
        <motion.div
          style={{ y: nearHorizonY, x: crossSlideRightToLeft }}
          className="absolute inset-x-0 top-[72%] h-px bg-gradient-to-r from-transparent via-[#198c96]/40 to-transparent"
        />
      </div>

      {/* =====================================================================
          LAYER 1 (z-[5]): 3D WIDE-WORLD SPHERE & MULTI-LANGUAGE PARTICLE CLOUD
          Rendered ON TOP of the dark background (z-0) and strictly BEHIND all
          content text layers, columns, and workflow infographics (z-20).
         ===================================================================== */}
      <FloatingTranslationOrb orbState={orbState} />

      {/* =====================================================================
          LAYER 3 (z-40): TOP NAVIGATION BAR — Strict 3-Zone Contract
         ===================================================================== */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-[#02070a]/85 backdrop-blur-xl border-b border-[#38e2f2]/25 text-white">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#hero"
          className="text-base sm:text-lg font-extrabold tracking-tight text-teal-gradient whitespace-nowrap shrink-0"
        >
          Rowad Al Tamayuz
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300"
        >
          <a
            href="#profile"
            className="hover:text-[#38e2f2] transition-colors whitespace-nowrap shrink-0"
          >
            Company Profile
          </a>
          <a
            href="#values"
            className="hover:text-[#38e2f2] transition-colors whitespace-nowrap shrink-0"
          >
            Core Values
          </a>
          <a
            href="#services"
            className="hover:text-[#38e2f2] transition-colors whitespace-nowrap shrink-0"
          >
            Specialized Services
          </a>
          <a
            href="#workflow"
            className="hover:text-[#38e2f2] transition-colors whitespace-nowrap shrink-0"
          >
            Request Process
          </a>
          <a
            href="#contact"
            className="hover:text-[#38e2f2] transition-colors whitespace-nowrap shrink-0"
          >
            Contact Channels
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => {
              setModalTab('quote');
              setModalOpen(true);
            }}
            className="px-4 py-2 text-xs font-bold text-[#02070a] bg-[#38e2f2] hover:bg-white rounded-lg transition-all shadow-[0_0_22px_rgba(56,226,242,0.5)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Translation
          </button>
        </div>
      </header>

      {/* =====================================================================
          LAYER 2 (z-20): FOREGROUND CONTENT TEXT LAYERS, COLUMNS & INFOGRAPHICS
         ===================================================================== */}
      <main className="relative z-20">
        {/* =====================================================================
            HERO SECTION: Top-Center Animated Official Logo + Bilingual Title Stage
           ===================================================================== */}
        <section
          id="hero"
          aria-label="Hero Introduction"
          className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 sm:px-8 pt-10 sm:pt-14 pb-24 overflow-hidden border-b border-[#38e2f2]/20 perspective-stage"
        >
          <div className="max-w-[1280px] w-full mx-auto flex flex-col items-center text-center">
            {/* TOP-CENTER HERO ZONE: Standalone Official Logo with Breathing Neon Backdrop */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${pointerOffset.x * -10}px, ${pointerOffset.y * -10}px, 32px)`,
              }}
              className="relative flex flex-col items-center justify-center py-6 px-8"
            >
              {/* Breathing Neon Ambient Glow Layer 1 (Outer Turquoise Pulse) */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [1, 1.24, 1],
                  opacity: [0.42, 0.82, 0.42],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-88 sm:w-[520px] h-40 sm:h-48 rounded-full bg-gradient-to-r from-[#198c96]/45 via-[#38e2f2]/40 to-[#198c96]/45 blur-3xl pointer-events-none"
              />

              {/* Breathing Neon Ambient Glow Layer 2 (Inner Core Horizon Beam) */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scaleX: [0.85, 1.15, 0.85],
                  opacity: [0.35, 0.75, 0.35],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-2 w-72 sm:w-[420px] h-[2px] bg-gradient-to-r from-transparent via-[#38e2f2] to-transparent shadow-[0_0_24px_#38e2f2] pointer-events-none"
              />

              <RowadLogo size="xl" theme="light" animated className="relative z-10" />
            </motion.div>

            {/* SPACIOUS VERTICAL BREATHING GAP UNDER TOP-CENTERED LOGO MONOGRAM */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${pointerOffset.x * 12}px, ${pointerOffset.y * 12}px, 38px)`,
              }}
              className="mt-24 sm:mt-32 lg:mt-36 w-full max-w-4xl glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            >
              {/* Virtual Light Leak */}
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#198c96]/30 blur-3xl pointer-events-none"
              />

              {/* Equal-Width Symmetrical Bilingual Title Container */}
              <h1 className="w-full max-w-[620px] mx-auto flex flex-col items-stretch justify-center gap-5">
                <span
                  dir="rtl"
                  data-testid="hero-title-ar"
                  className="block w-full font-arabic text-2xl sm:text-[38px] lg:text-[42px] font-extrabold text-teal-gradient leading-tight bilingual-equal-line"
                >
                  {ROWAD_CONTENT.brand.heroTitleAr}
                </span>

                <span
                  aria-hidden="true"
                  className="block w-full h-[1.5px] bg-gradient-to-r from-[#38e2f2]/40 via-[#38e2f2] to-[#38e2f2]/40 shadow-[0_0_14px_rgba(56,226,242,0.55)]"
                />

                <span
                  dir="ltr"
                  data-testid="hero-title-en"
                  className="block w-full text-lg sm:text-[28px] lg:text-[31px] font-extrabold text-white tracking-tight leading-tight bilingual-equal-line"
                >
                  {ROWAD_CONTENT.brand.heroTitleEn}
                </span>
              </h1>

              <div className="w-full max-w-[620px] mx-auto mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-[#38e2f2] text-[#02070a] hover:bg-white transition-all shadow-[0_0_26px_rgba(56,226,242,0.55)] whitespace-nowrap shrink-0"
                >
                  <span>Explore 6-Step Process</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setModalTab('references');
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#061c24]/90 text-slate-100 border border-[#38e2f2]/35 hover:border-[#38e2f2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#38e2f2]" />
                  <span>Reference Portfolio</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 1: COMPANY PROFILE (الملف التعريفي) — Fluid Staggered Gliding Columns
           ===================================================================== */}
        <section
          id="profile"
          aria-label="Company Profile"
          className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 py-16 perspective-stage"
        >
          {/* Viewport-Center Virtual Light-Leak Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-1/2 -translate-y-1/2 h-64 rounded-full blur-3xl transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(56,226,242,0.22) 0%, rgba(25,140,150,0.08) 55%, transparent 80%)',
              opacity: profileParallax.lightLeakIntensity,
            }}
          />

          <SectionRibbonHeader
            titleEn={ROWAD_CONTENT.companyProfile.titleEn}
            titleAr={ROWAD_CONTENT.companyProfile.titleAr}
            iconType="profile"
            indexLabel="01 · IDENTITY"
          />

          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            style={{
              transform: `translate3d(0, ${profileParallax.translateYpx * 0.22}px, 0) scale(${profileParallax.scale})`,
            }}
          >
            {/* Left English Gliding Column */}
            <motion.div
              dir="ltr"
              style={{ y: leftColumnGlideY }}
              className="lg:col-span-5 flex flex-col justify-between gap-7"
            >
              {ROWAD_CONTENT.companyProfile.paragraphsEn.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -60, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className={`glass-panel-interactive rounded-3xl p-6 sm:p-8 relative overflow-hidden ${
                    idx === 0 ? 'lg:-translate-x-3' : ''
                  }`}
                  style={{
                    boxShadow: `0 20px 50px -12px rgba(0,0,0,0.82), 0 0 ${Math.round(
                      36 * profileParallax.lightLeakIntensity
                    )}px -6px rgba(56,226,242,0.35)`,
                  }}
                >
                  <div className="text-xs font-mono text-[#38e2f2] mb-2.5">
                    01.{idx + 1} · PROFILE OVERVIEW
                  </div>
                  <p className="text-base sm:text-[17px] font-medium text-slate-100 leading-relaxed">
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Center 3D Spine Runway */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center" aria-hidden="true">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-[#38e2f2]/45 to-transparent" />
            </div>

            {/* Right Arabic Gliding Column */}
            <motion.div
              dir="rtl"
              style={{ y: rightColumnGlideY }}
              className="lg:col-span-5 flex flex-col justify-between gap-7 font-arabic"
            >
              {ROWAD_CONTENT.companyProfile.paragraphsAr.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 60, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className={`glass-panel-interactive rounded-3xl p-6 sm:p-8 relative overflow-hidden ${
                    idx === 0 ? 'lg:translate-x-3' : ''
                  }`}
                  style={{
                    boxShadow: `0 20px 50px -12px rgba(0,0,0,0.82), 0 0 ${Math.round(
                      36 * profileParallax.lightLeakIntensity
                    )}px -6px rgba(56,226,242,0.35)`,
                  }}
                >
                  <div className="text-xs font-mono text-[#38e2f2] mb-2.5 text-right">
                    01.{idx + 1} · نبذة تعريفية
                  </div>
                  <p className="text-lg sm:text-[19px] font-bold text-slate-100 leading-relaxed text-right">
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: OUR CORE VALUES (قيَمنا الجوهرية) — Cross-Fading Fluid Streams
           ===================================================================== */}
        <section
          id="values"
          aria-label="Our Core Values"
          className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 py-16 perspective-stage"
        >
          {/* Viewport-Center Virtual Light-Leak Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-1/2 -translate-y-1/2 h-72 rounded-full blur-3xl transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(25,140,150,0.28) 0%, rgba(56,226,242,0.1) 55%, transparent 80%)',
              opacity: valuesParallax.lightLeakIntensity,
            }}
          />

          <SectionRibbonHeader
            titleEn={ROWAD_CONTENT.coreValues.titleEn}
            titleAr={ROWAD_CONTENT.coreValues.titleAr}
            iconType="values"
            indexLabel="02 · CORE PILLARS"
          />

          <div
            className="space-y-6"
            style={{
              transform: `translate3d(0, ${valuesParallax.translateYpx * 0.2}px, 0)`,
            }}
          >
            {ROWAD_CONTENT.coreValues.items
              .filter((item) => item.id !== 'golden-triangle')
              .map((item, idx) => {
                const Icon = CORE_VALUE_ICONS[item.icon];

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: idx % 2 === 0 ? -50 : 50,
                      y: 30,
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl p-6 sm:p-8 transition-all fluid-stream-plane hover:border-[#38e2f2]/60 ${
                      idx % 2 === 1 ? 'lg:mx-8' : ''
                    }`}
                  >
                    {/* Left English Value Statement */}
                    <div dir="ltr" className="lg:col-span-5 flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-[#38e2f2] px-2.5 py-1 rounded bg-[#38e2f2]/10 border border-[#38e2f2]/30 shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-base sm:text-lg font-bold leading-snug text-white">
                        {item.en}
                      </p>
                    </div>

                    {/* Center Glowing 3D Icon Node */}
                    <div className="lg:col-span-2 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 hover:scale-110 bg-[#198c96]/25 border-[#38e2f2]/50 text-[#38e2f2] shadow-[0_0_25px_rgba(56,226,242,0.35)]">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Right Arabic Value Statement */}
                    <div
                      dir="rtl"
                      className="lg:col-span-5 flex items-center justify-start gap-4 font-arabic"
                    >
                      <span className="text-xs font-mono font-bold text-[#38e2f2] px-2.5 py-1 rounded bg-[#38e2f2]/10 border border-[#38e2f2]/30 shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-lg sm:text-xl font-extrabold leading-snug text-right text-white">
                        {item.ar}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* ISOLATED CORE VALUE 04: Cinematic 3D Golden Triangle Parallax Stage */}
          <GoldenTriangleStage
            enText={ROWAD_CONTENT.coreValues.items[3].en}
            arText={ROWAD_CONTENT.coreValues.items[3].ar}
          />
        </section>

        {/* =====================================================================
            SECTION 3: OUR SPECIALIZED SERVICES & OTHER SERVICES — Stagger-Fade Matrix
           ===================================================================== */}
        <section
          id="services"
          aria-label="Our Specialized Services"
          className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 py-16 perspective-stage"
        >
          {/* Viewport-Center Virtual Light-Leak Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 h-80 rounded-full blur-3xl transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(56,226,242,0.2) 0%, rgba(25,140,150,0.08) 60%, transparent 80%)',
              opacity: servicesParallax.lightLeakIntensity,
            }}
          />

          <SectionRibbonHeader
            titleEn={ROWAD_CONTENT.specializedServices.titleEn}
            titleAr={ROWAD_CONTENT.specializedServices.titleAr}
            iconType="services"
            indexLabel="03 · CAPABILITIES"
          />

          {/* Interactive Segmented Filter Control */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#05151d]/90 border border-[#38e2f2]/30 rounded-xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => setServiceFilter('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  serviceFilter === 'all'
                    ? 'bg-[#38e2f2] text-[#02070a] shadow-[0_0_18px_rgba(56,226,242,0.5)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All Services (1 & 2) · جميع الخدمات
              </button>
              <button
                type="button"
                onClick={() => setServiceFilter('group1')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  serviceFilter === 'group1'
                    ? 'bg-[#38e2f2] text-[#02070a] shadow-[0_0_18px_rgba(56,226,242,0.5)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1. Translation Services · خدمات الترجمة
              </button>
              <button
                type="button"
                onClick={() => setServiceFilter('group2')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  serviceFilter === 'group2'
                    ? 'bg-[#38e2f2] text-[#02070a] shadow-[0_0_18px_rgba(56,226,242,0.5)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                2. Other Services · خدماتنا الأخرى
              </button>
            </div>
          </div>

          <div
            className="space-y-14"
            style={{
              transform: `translate3d(0, ${servicesParallax.translateYpx * 0.16}px, 0)`,
            }}
          >
            {/* GROUP 1: Translation Services / خدمات الترجمة */}
            {(serviceFilter === 'all' || serviceFilter === 'group1') && (
              <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#38e2f2]/25">
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-[#38e2f2] text-[#02070a] font-mono font-extrabold text-base flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,226,242,0.6)]">
                      {ROWAD_CONTENT.specializedServices.group1.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {ROWAD_CONTENT.specializedServices.group1.headingEn}
                    </h3>
                  </div>

                  <div dir="rtl" className="flex items-center gap-3.5 font-arabic self-end sm:self-auto">
                    <span className="w-9 h-9 rounded-xl bg-[#38e2f2] text-[#02070a] font-mono font-extrabold text-base flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,226,242,0.6)]">
                      {ROWAD_CONTENT.specializedServices.group1.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-gradient">
                      {ROWAD_CONTENT.specializedServices.group1.headingAr}
                    </h3>
                  </div>
                </div>

                {/* Opposing Horizontal Cross-Fade Bilingual Streams */}
                <div className="space-y-4">
                  {ROWAD_CONTENT.specializedServices.group1.itemsEn.map((enItem, idx) => {
                    const arItem = ROWAD_CONTENT.specializedServices.group1.itemsAr[idx];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -45 : 45 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.55, delay: idx * 0.08 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center rounded-2xl fluid-stream-plane px-6 py-5 hover:border-[#38e2f2]/65 transition-all"
                      >
                        <div dir="ltr" className="lg:col-span-5 flex items-start gap-3">
                          <span className="text-[#38e2f2] font-extrabold mt-0.5" aria-hidden="true">
                            •
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                            {enItem}
                          </span>
                        </div>

                        <div className="hidden lg:flex lg:col-span-2 justify-center" aria-hidden="true">
                          <span className="text-xs font-mono text-[#38e2f2]/65">01.0{idx + 1}</span>
                        </div>

                        <div dir="rtl" className="lg:col-span-5 flex items-start gap-3 font-arabic">
                          <span className="text-[#38e2f2] font-extrabold mt-0.5" aria-hidden="true">
                            •
                          </span>
                          <span className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed text-right">
                            {arItem}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GROUP 2: Other Services / خدماتنا الأخرى */}
            {(serviceFilter === 'all' || serviceFilter === 'group2') && (
              <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#38e2f2]/25">
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-[#38e2f2] text-[#02070a] font-mono font-extrabold text-base flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,226,242,0.6)]">
                      {ROWAD_CONTENT.specializedServices.group2.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {ROWAD_CONTENT.specializedServices.group2.headingEn}
                    </h3>
                  </div>

                  <div dir="rtl" className="flex items-center gap-3.5 font-arabic self-end sm:self-auto">
                    <span className="w-9 h-9 rounded-xl bg-[#38e2f2] text-[#02070a] font-mono font-extrabold text-base flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,226,242,0.6)]">
                      {ROWAD_CONTENT.specializedServices.group2.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-gradient">
                      {ROWAD_CONTENT.specializedServices.group2.headingAr}
                    </h3>
                  </div>
                </div>

                {/* Staggered Bilingual Stream Grid for Group 2 (10 items) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {ROWAD_CONTENT.specializedServices.group2.itemsEn.map((enItem, idx) => {
                    const arItem = ROWAD_CONTENT.specializedServices.group2.itemsAr[idx];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 32, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.5, delay: (idx % 4) * 0.06 }}
                        className={`rounded-2xl fluid-stream-plane p-5 flex flex-col justify-between gap-3 transition-all ${
                          idx % 2 === 1 ? 'md:translate-y-3' : ''
                        }`}
                      >
                        <div dir="ltr" className="flex items-start gap-2.5">
                          <span className="text-[#38e2f2] font-extrabold mt-0.5" aria-hidden="true">
                            •
                          </span>
                          <span className="text-sm sm:text-[15px] font-semibold text-slate-100 leading-relaxed">
                            {enItem}
                          </span>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-[#38e2f2]/25 via-white/10 to-[#38e2f2]/25" />

                        <div dir="rtl" className="flex items-start gap-2.5 font-arabic">
                          <span className="text-[#38e2f2] font-extrabold mt-0.5" aria-hidden="true">
                            •
                          </span>
                          <span className="text-base sm:text-[17px] font-bold text-[#99f6ff] leading-relaxed text-right">
                            {arItem}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: DYNAMIC 3D TIMELINE & HOLOGRAPHIC WORKFLOW (Steps 1–5)
           ===================================================================== */}
        <WorkflowSection
          parallaxStyle={{
            transform: `translate3d(0, ${workflowParallax.translateYpx * 0.14}px, 0)`,
          }}
        />

        {/* =====================================================================
            FOOTER / COMMUNICATION CHANNELS (قنوات التواصل)
           ===================================================================== */}
        <footer
          id="contact"
          aria-label="Communication Channels and Footer"
          className="relative z-20 pt-8 bg-gradient-to-b from-transparent via-[#04141b] to-[#010507] border-t border-[#38e2f2]/20"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-16">
            <SectionRibbonHeader
              titleEn={ROWAD_CONTENT.communicationChannels.titleEn}
              titleAr={ROWAD_CONTENT.communicationChannels.titleAr}
              iconType="contact"
              indexLabel="05 · DIRECT UPLINK"
            />

            {/* Verbatim Bilingual Intro Prompt */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center my-8 px-2">
              <p
                dir="ltr"
                className="text-lg sm:text-xl font-extrabold text-slate-100 leading-snug"
              >
                {ROWAD_CONTENT.communicationChannels.introEn}
              </p>
              <p
                dir="rtl"
                className="font-arabic text-xl sm:text-2xl font-extrabold text-[#38e2f2] leading-snug text-right"
              >
                {ROWAD_CONTENT.communicationChannels.introAr}
              </p>
            </div>

            {/* 3 Glassmorphic Neon Contact Uplink Pods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {ROWAD_CONTENT.communicationChannels.channels.map((channel, idx) => {
                const IconComp =
                  channel.id === 'email'
                    ? Mail
                    : channel.id === 'whatsapp'
                    ? MessageCircle
                    : Headset;
                const isCopied = copiedId === channel.id;

                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: idx * 0.1 }}
                    className="glass-panel-interactive rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden group"
                  >
                    <a
                      href={channel.href}
                      target={channel.id === 'whatsapp' ? '_blank' : undefined}
                      rel={channel.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      aria-label={`${channel.label}: ${channel.value}`}
                      className="w-14 h-14 rounded-2xl bg-[#07222c] border border-[#38e2f2]/55 text-[#38e2f2] flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(56,226,242,0.3)] group-hover:bg-[#38e2f2] group-hover:text-[#02070a] group-hover:scale-105 transition-all duration-300"
                    >
                      <IconComp className="w-6 h-6" strokeWidth={2} />
                    </a>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg font-extrabold text-white">
                          {channel.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyContact(channel.id, channel.value)}
                          aria-label={`Copy ${channel.label}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/10 text-slate-200 hover:bg-[#38e2f2] hover:text-[#02070a] transition-colors cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <a
                        href={channel.href}
                        target={channel.id === 'whatsapp' ? '_blank' : undefined}
                        rel={channel.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        className="mt-1.5 block text-sm sm:text-base font-mono font-bold text-[#38e2f2] hover:text-white transition-colors truncate tabular-nums"
                      >
                        {channel.value}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Glowing Monolith Bar with Official RT Monogram */}
          <div className="relative w-full py-6 bg-[#010507] border-t border-[#38e2f2]/30 flex flex-col items-center justify-center">
            <RowadLogo size="md" theme="light" />
          </div>
        </footer>
      </main>

      {/* Quote & Official Portfolio Reference Modal */}
      <ReferenceLightboxModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </div>
  );
}
