import React from 'react';
import { motion } from 'motion/react';

interface RowadLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  animated?: boolean;
}

/**
 * Precision recreation of the official "RT | Ruwad Al Tamayuz Translation Services"
 * monogram and lockup from the provided reference image.
 * Supports Framer Motion floating hover micro-animation and breathing neon glow.
 */
export const RowadLogo: React.FC<RowadLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
  animated = false,
}) => {
  const dimensions = {
    sm: {
      svgWidth: 108,
      svgHeight: 44,
      textClass: 'text-xs leading-tight',
      dividerH: 'h-8',
      gapClass: 'gap-3.5',
    },
    md: {
      svgWidth: 148,
      svgHeight: 60,
      textClass: 'text-sm sm:text-base leading-snug',
      dividerH: 'h-11',
      gapClass: 'gap-4 sm:gap-5',
    },
    lg: {
      svgWidth: 196,
      svgHeight: 82,
      textClass: 'text-base sm:text-xl leading-snug',
      dividerH: 'h-14',
      gapClass: 'gap-5 sm:gap-6',
    },
    xl: {
      svgWidth: 285,
      svgHeight: 120,
      textClass: 'text-xl sm:text-2xl lg:text-[30px] leading-snug',
      dividerH: 'h-20 sm:h-24',
      gapClass: 'gap-6 sm:gap-9',
    },
  }[size];

  const strokeColor = theme === 'light' ? '#ffffff' : '#0b3c43';
  const textColor = theme === 'light' ? 'text-white' : 'text-[#0b3c43]';
  const dividerColor = theme === 'light' ? 'bg-white/85' : 'bg-[#0b3c43]/70';

  const content = (
    <div
      className={`inline-flex items-center ${dimensions.gapClass} select-none relative ${className}`}
    >
      <motion.svg
        width={dimensions.svgWidth}
        height={dimensions.svgHeight}
        viewBox="0 0 260 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="RT Monogram Logo"
        className="shrink-0"
        animate={
          animated
            ? {
                filter: [
                  'drop-shadow(0 0 14px rgba(56, 226, 242, 0.35))',
                  'drop-shadow(0 0 28px rgba(56, 226, 242, 0.78))',
                  'drop-shadow(0 0 14px rgba(56, 226, 242, 0.35))',
                ],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        {/* Continuous geometric R + T top bar and R bowl */}
        <motion.path
          d="M 18 36 L 18 16 L 96 16 C 122 16 136 30 136 49 C 136 68 122 80 96 80 L 52 80"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0, opacity: 0.4 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Horizontal crossbar extending from R across to T */}
        <motion.path
          d="M 18 36 L 238 36"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0.4 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* R diagonal leg */}
        <motion.path
          d="M 74 80 L 132 104"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0.4 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* T vertical stem */}
        <motion.path
          d="M 182 36 L 182 104"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0.4 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>

      <motion.span
        className={`w-[2px] ${dimensions.dividerH} ${dividerColor} shrink-0 shadow-[0_0_14px_rgba(56,226,242,0.65)]`}
        aria-hidden="true"
        animate={
          animated
            ? {
                opacity: [0.65, 1, 0.65],
                scaleY: [0.95, 1.05, 0.95],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      />

      <div
        className={`flex flex-col font-extrabold tracking-wide ${textColor} ${dimensions.textClass} whitespace-nowrap drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] text-left`}
      >
        <span>Ruwad Al Tamayuz</span>
        <span>Translation Services</span>
      </div>
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.035 }}
      className="relative inline-flex items-center justify-center"
    >
      {content}
    </motion.div>
  );
};
