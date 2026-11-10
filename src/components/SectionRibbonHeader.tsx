import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Gem,
  Layers,
  FileCheck2,
  GitMerge,
  MessagesSquare,
} from 'lucide-react';

export type RibbonIconType =
  | 'profile'
  | 'values'
  | 'services'
  | 'transactions'
  | 'workflow'
  | 'contact';

interface SectionRibbonHeaderProps {
  titleEn: string;
  titleAr: string;
  iconType: RibbonIconType;
  indexLabel?: string;
  id?: string;
}

const ICON_MAP: Record<RibbonIconType, React.FC<{ className?: string; strokeWidth?: number }>> = {
  profile: Users,
  values: Gem,
  services: Layers,
  transactions: FileCheck2,
  workflow: GitMerge,
  contact: MessagesSquare,
};

/**
 * Clean Architectural Glassmorphic Bilingual Section Header with pixel-perfect
 * Lucide-React tech icons and glowing turquoise energy beams.
 */
export const SectionRibbonHeader: React.FC<SectionRibbonHeaderProps> = ({
  titleEn,
  titleAr,
  iconType,
  indexLabel,
  id,
}) => {
  const IconComponent = ICON_MAP[iconType];

  return (
    <div
      id={id}
      className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 my-10 sm:my-14 select-none relative"
    >
      {/* Left Glassmorphic Header Pod (English) */}
      <motion.div
        initial={{ opacity: 0, x: -45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="header-tech-pod relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
      >
        <div className="w-12 h-12 rounded-xl bg-[#07222c] border border-[#38e2f2]/55 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(56,226,242,0.3)]">
          <IconComponent className="w-5 h-5 text-[#38e2f2]" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          {indexLabel && (
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#38e2f2] uppercase">
              {indexLabel}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-teal-gradient">
            {titleEn}
          </h2>
        </div>
      </motion.div>

      {/* Center Glowing Laser Conduit */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.75, delay: 0.08 }}
        className="hidden lg:flex flex-1 items-center justify-center px-6"
        aria-hidden="true"
      >
        <div className="w-full h-[1.5px] bg-gradient-to-r from-[#38e2f2]/70 via-[#198c96]/25 to-[#38e2f2]/70 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 bg-[#38e2f2] shadow-[0_0_12px_#38e2f2]" />
        </div>
      </motion.div>

      {/* Right Glassmorphic Header Pod (Arabic) */}
      <motion.div
        dir="rtl"
        initial={{ opacity: 0, x: 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="header-tech-pod relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl self-end md:self-auto font-arabic"
      >
        <div className="w-12 h-12 rounded-xl bg-[#07222c] border border-[#38e2f2]/55 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(56,226,242,0.3)]">
          <IconComponent className="w-5 h-5 text-[#38e2f2]" strokeWidth={2} />
        </div>
        <div className="flex flex-col text-right">
          {indexLabel && (
            <span dir="ltr" className="text-[11px] font-mono font-semibold tracking-widest text-[#38e2f2]">
              {indexLabel}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-normal text-teal-gradient">
            {titleAr}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

