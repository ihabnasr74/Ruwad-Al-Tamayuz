import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROWAD_CONTENT, WorkflowStepItem } from '../data/rowadContent';
import { SectionRibbonHeader } from './SectionRibbonHeader';
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Send,
  ClipboardCheck,
  Landmark,
  Forward,
  FileText,
} from 'lucide-react';

interface WorkflowSectionProps {
  parallaxStyle?: React.CSSProperties;
}

/**
 * Clean, Pixel-Perfect Tech Icons (Lucide-React) for the 6-Step Translation Request Process
 */
const StepHologramIcon: React.FC<{
  type: WorkflowStepItem['iconType'];
  size?: 'sm' | 'lg';
}> = ({ type, size = 'sm' }) => {
  const iconSize = size === 'lg' ? 'w-11 h-11' : 'w-6 h-6';

  switch (type) {
    case 'share':
      return (
        <Send
          className={`${iconSize} text-[#38e2f2] drop-shadow-[0_0_12px_rgba(56,226,242,0.65)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
    case 'respond':
      return (
        <CheckCircle2
          className={`${iconSize} text-[#2dd4bf] drop-shadow-[0_0_12px_rgba(45,212,191,0.65)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
    case 'evaluate':
      return (
        <ClipboardCheck
          className={`${iconSize} text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.65)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
    case 'payment':
      return (
        <Landmark
          className={`${iconSize} text-[#fbbf24] drop-shadow-[0_0_12px_rgba(251,191,36,0.65)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
    case 'dispatch':
      return (
        <Forward
          className={`${iconSize} text-[#22d3ee] drop-shadow-[0_0_12px_rgba(34,211,238,0.75)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
    case 'receive':
      return (
        <FileText
          className={`${iconSize} text-[#34d399] drop-shadow-[0_0_12px_rgba(52,211,153,0.75)]`}
          strokeWidth={2}
          aria-hidden="true"
        />
      );
  }
};

/**
 * Re-architected Section 4: "إجراءات طلب الترجمة / Translation Request Process" (Steps 1 to 6).
 * Preserves 100% of the verbatim 6-step bilingual text from the new reference sheet while
 * delivering an interactive 6-node glowing teal conduit bar + 3D holographic showcase +
 * scroll-reactive 6-stage sequence.
 */
export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ parallaxStyle }) => {
  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(1);

  const steps = ROWAD_CONTENT.serviceRequestProcess.steps;
  const activeStep = steps.find((s) => s.step === selectedStepNumber) || steps[0];

  return (
    <section
      id="workflow"
      aria-label="Translation Request Process and Transactions Processing"
      className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 pt-10 pb-20 perspective-stage"
      style={parallaxStyle}
    >
      {/* Transactions Processing Header */}
      <SectionRibbonHeader
        titleEn={ROWAD_CONTENT.transactionsBanner.titleEn}
        titleAr={ROWAD_CONTENT.transactionsBanner.titleAr}
        iconType="transactions"
        indexLabel="04.A · TRANSACTIONS"
      />

      {/* Translation Request Process Header (إجراءات طلب الترجمة) */}
      <SectionRibbonHeader
        titleEn={ROWAD_CONTENT.serviceRequestProcess.titleEn}
        titleAr={ROWAD_CONTENT.serviceRequestProcess.titleAr}
        iconType="workflow"
        indexLabel="04.B · 6-STAGE SEQUENCE"
      />

      {/* Glowing Metallic Teal 6-Node Conduit Bar (Inspired by the 1–6 Reference Sheet Bar) */}
      <div className="mb-12 px-2">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <Sparkles className="w-4 h-4 text-[#38e2f2]" />
            <span>Select or scroll through stages (01–06) to inspect each translation procedure</span>
          </div>
          <span className="font-arabic text-xs sm:text-sm text-[#38e2f2] font-bold" dir="rtl">
            إجراءات طلب الترجمة (1 إلى 6)
          </span>
        </div>

        {/* 6-Step Interactive Teal Conduit Track */}
        <div className="relative py-4">
          {/* Glowing Horizontal Teal Bar */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-5 rounded-full bg-gradient-to-r from-[#0c3b44] via-[#198c96] to-[#0c3b44] border border-[#38e2f2]/45 shadow-[0_0_28px_rgba(25,140,150,0.45),inset_0_2px_4px_rgba(255,255,255,0.25)]"
          />

          <div className="relative z-10 grid grid-cols-6 gap-2 sm:gap-4 items-center justify-items-center">
            {steps.map((s) => {
              const active = s.step === selectedStepNumber;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setSelectedStepNumber(s.step)}
                  aria-label={`Stage ${s.step}`}
                  aria-pressed={active}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full font-mono text-base sm:text-lg font-extrabold tabular-nums transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    active
                      ? 'bg-white text-[#07222c] ring-4 ring-[#38e2f2] scale-110 shadow-[0_0_28px_rgba(56,226,242,0.85)]'
                      : 'bg-[#061c24] text-white border-2 border-[#38e2f2]/55 hover:border-white hover:scale-105 shadow-md'
                  }`}
                >
                  {s.step}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split 3D Architecture: Left Sticky 3D Hologram Stage + Right 6-Step Bilingual Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN (5 cols): Sticky 3D Holographic Step Visualizer */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, rotateY: -18, scale: 0.94 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 18, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-3xl p-7 sm:p-9 relative overflow-hidden preserve-3d"
              style={{
                borderColor: `${activeStep.gradientFrom}88`,
                boxShadow: `0 25px 60px -15px rgba(0,0,0,0.85), 0 0 45px -10px ${activeStep.gradientFrom}55`,
              }}
            >
              {/* Ambient Step Color Radial Glow */}
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{
                  background: `radial-gradient(circle, ${activeStep.gradientFrom} 0%, transparent 70%)`,
                }}
              />

              {/* Top Stage Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span
                  className="px-3.5 py-1 rounded-md text-xs font-mono font-bold tracking-widest uppercase text-[#02070a] shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${activeStep.gradientFrom}, #ffffff)`,
                  }}
                >
                  STAGE 0{activeStep.step} / 06
                </span>
                <div className="flex items-center gap-1.5">
                  {steps.map((dot) => (
                    <span
                      key={dot.step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dot.step === activeStep.step ? 'w-7 bg-[#38e2f2]' : 'w-2 bg-white/25'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 3D Animated Holographic Icon Chamber */}
              <div className="relative my-6 flex items-center justify-center h-44">
                {/* Rotating Outer Orbital Ring */}
                <motion.div
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-40 h-40 rounded-full border border-dashed"
                  style={{ borderColor: `${activeStep.gradientFrom}88` }}
                />
                {/* Counter-rotating Inner Orbital Ring */}
                <motion.div
                  animate={{ rotateZ: -360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-32 h-32 rounded-full border"
                  style={{ borderColor: `${activeStep.gradientFrom}55` }}
                />

                {/* Floating Tech Icon Core */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-24 h-24 rounded-2xl bg-[#04141b]/95 border border-white/25 flex items-center justify-center shadow-2xl backdrop-blur-xl"
                  style={{
                    boxShadow: `0 0 32px ${activeStep.gradientFrom}66`,
                  }}
                >
                  <StepHologramIcon type={activeStep.iconType} size="lg" />
                </motion.div>
              </div>

              {/* Bilingual Verbatim Detail Readout */}
              <div className="space-y-4 rounded-2xl bg-[#030d12]/85 border border-white/10 p-6">
                <p
                  dir="rtl"
                  className="font-arabic text-lg sm:text-xl font-extrabold text-[#99f6ff] leading-relaxed text-center"
                >
                  {activeStep.arDescription}
                </p>
                <div
                  className="h-[1.5px] w-24 mx-auto opacity-70"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${activeStep.gradientFrom}, transparent)`,
                  }}
                />
                <p
                  dir="ltr"
                  className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed text-center"
                >
                  {activeStep.enDescription}
                </p>
              </div>

              {/* Direct Interactive CTA for Active Step */}
              <div className="mt-6 flex items-center justify-between gap-3">
                {activeStep.step === 1 ? (
                  <a
                    href="https://wa.me/971505095759"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#02070a] bg-[#38e2f2] hover:bg-white shadow-lg transition-transform hover:scale-[1.02] whitespace-nowrap"
                  >
                    <span>Share via WhatsApp (+971 50 509 5759)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStepNumber(activeStep.step < 6 ? activeStep.step + 1 : 1)
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#03090c] bg-[#38e2f2] hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {activeStep.step < 6
                        ? `Advance to Stage 0${activeStep.step + 1}`
                        : 'Cycle Back to Stage 01'}
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN (7 cols): 6-Step Interactive Grid & Timeline Cards (Steps 1 to 6) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((item, idx) => {
            const isSelected = item.step === selectedStepNumber;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                onViewportEnter={() => setSelectedStepNumber(item.step)}
                viewport={{ once: false, amount: 0.45 }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedStepNumber(item.step)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStepNumber(item.step);
                  }
                }}
                className={`relative group rounded-2xl p-6 transition-all duration-300 cursor-pointer focus:outline-none flex flex-col justify-between ${
                  isSelected
                    ? 'glass-panel scale-[1.015]'
                    : 'bg-[#061820]/75 border border-white/10 hover:border-[#38e2f2]/45'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: item.gradientFrom,
                        boxShadow: `0 20px 50px -12px rgba(0,0,0,0.85), 0 0 32px -6px ${item.gradientFrom}55`,
                      }
                    : undefined
                }
              >
                {/* Top Medallion Badge & Tech Icon */}
                <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-extrabold text-base tabular-nums transition-all ${
                        isSelected
                          ? 'bg-white text-[#041218] ring-2 ring-[#38e2f2]'
                          : 'bg-[#198c96]/30 text-[#38e2f2] border border-[#38e2f2]/40'
                      }`}
                    >
                      {item.step}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-300">
                      STAGE 0{item.step}
                    </span>
                  </div>

                  <div
                    className="w-11 h-11 rounded-xl bg-[#041218] border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${item.gradientFrom}66` }}
                  >
                    <StepHologramIcon type={item.iconType} size="sm" />
                  </div>
                </div>

                {/* Arabic Verbatim Layer (Top of Card, matching reference sheet) */}
                <p
                  dir="rtl"
                  className="font-arabic text-base sm:text-[17px] font-extrabold text-[#99f6ff] leading-relaxed text-center"
                >
                  {item.arDescription}
                </p>

                {/* Center Divider Line (matching reference sheet) */}
                <div className="my-4 h-[1.5px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#38e2f2]/60 to-transparent" />

                {/* English Verbatim Layer (Bottom of Card, matching reference sheet) */}
                <p
                  dir="ltr"
                  className="text-sm sm:text-[15px] font-bold text-slate-100 leading-relaxed text-center"
                >
                  {item.enDescription}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
