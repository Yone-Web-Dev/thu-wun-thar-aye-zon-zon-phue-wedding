import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';
import { Sparkles, Heart } from 'lucide-react';

interface WishingCelebrationAnimationProps {
  theme: ThemeMode;
  guestName: string;
  isActive: boolean;
  onComplete: () => void;
}

/**
 * Enchanted Celestial Golden Butterflies & Stardust Flight
 * Swoops across the screen upon submitting a wedding wish, inspired by the lovebirds flight,
 * featuring flapping golden filigree wings, trailing stardust, floating wedding rings, and rose petals.
 */
export const WishingCelebrationAnimation: React.FC<WishingCelebrationAnimationProps> = ({
  theme,
  guestName,
  isActive,
  onComplete
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const primaryWingGold = isMagic ? '#D8B4FE' : isDusty ? '#7DD3FC' : '#FDE047';
  const secondaryWingGold = isMagic ? '#A855F7' : isDusty ? '#0284C7' : '#EAB308';
  const filigreeStroke = isMagic ? '#7E22CE' : isDusty ? '#0369A1' : '#B45309';

  return (
    <AnimatePresence>
      {isActive && (
        <div
          data-testid="wishing-celebration-animation"
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
          aria-live="polite"
        >
          {/* Subtle warm golden ambient wash that gently illuminates the screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-radial from-amber-400/10 via-amber-200/5 to-transparent pointer-events-none"
          />

          {/* Top Floating Stardust Toast Pill - Elegant Celebration Pill without blocking the page */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-8 sm:top-12 inset-x-0 mx-auto w-fit max-w-[90vw] pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-amber-300/80 shadow-[0_10px_35px_-8px_rgba(212,175,55,0.45)] text-stone-900 text-xs sm:text-sm font-serif">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-sans font-medium text-amber-900">
                Blessing by <strong className="font-semibold text-stone-900">{guestName || 'Cherished Guest'}</strong> lovingly recorded!
              </span>
              <span className="text-amber-400">✦</span>
              <span className="hidden sm:inline font-script text-base text-amber-700">Thank you</span>
            </div>
          </motion.div>

          {/* Floating Stardust, Hearts, and Rings Shower */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${10 + (i * 13) % 85}vw`,
                  y: '105vh',
                  opacity: 0,
                  scale: 0.5,
                  rotate: 0
                }}
                animate={{
                  y: '-10vh',
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.5, 1.2, 0.9, 0.4],
                  rotate: [-20, 20, -10]
                }}
                transition={{
                  duration: 4.5 + (i % 3) * 0.8,
                  delay: (i * 0.12),
                  ease: 'easeInOut'
                }}
                className="absolute text-amber-400 font-serif drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
                style={{
                  fontSize: `${14 + (i % 5) * 6}px`
                }}
              >
                {i % 4 === 0 ? '✨' : i % 4 === 1 ? '💖' : i % 4 === 2 ? '💍' : '🌸'}
              </motion.div>
            ))}
          </div>

          {/* Twin Celestial Golden Butterflies swooping gracefully across the viewport */}
          <motion.div
            initial={{ x: '-180px', y: '75vh', opacity: 0, scale: 0.85 }}
            animate={{
              x: 'calc(100vw + 160px)',
              y: ['75vh', '50vh', '28vh', '42vh', '18vh', '10vh'],
              opacity: [0, 1, 1, 1, 1, 0],
              scale: [0.85, 1.1, 1.15, 1, 1.05, 0.9]
            }}
            transition={{
              x: { duration: 5.5, ease: 'linear' },
              y: { duration: 5.5, ease: 'easeInOut', times: [0, 0.22, 0.45, 0.68, 0.88, 1] },
              opacity: { duration: 5.5, times: [0, 0.08, 0.2, 0.85, 0.95, 1] },
              scale: { duration: 5.5, times: [0, 0.2, 0.5, 0.7, 0.9, 1] }
            }}
            onAnimationComplete={onComplete}
            className="absolute left-0 flex items-center"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-64 h-48 sm:w-80 sm:h-56">
              {/* Luminous Stardust & Ring Trail flowing behind the butterflies */}
              <div className="absolute -left-20 top-12 flex flex-col items-center pointer-events-none">
                <motion.div
                  animate={{
                    opacity: [0.9, 0.2, 0.9],
                    scale: [1, 1.3, 1],
                    x: [-10, -25, -10]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">💍</span>
                  <span className="text-xl text-rose-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]">💖</span>
                  <span className="text-lg text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.9)]">✨</span>
                  <span className="text-base text-amber-400">✦</span>
                </motion.div>
                <div className="w-32 h-1 bg-gradient-to-l from-amber-400 via-rose-300/60 to-transparent blur-xs rounded-full mt-1 -rotate-6" />
              </div>

              {/* Lead Celestial Butterfly (Golden Morpho Monarch) */}
              <div className="absolute left-24 top-2 z-20 filter drop-shadow-[0_8px_20px_rgba(217,119,6,0.55)]">
                <CelestialButterfly
                  size={100}
                  primaryColor={primaryWingGold}
                  secondaryColor={secondaryWingGold}
                  strokeColor={filigreeStroke}
                  flapSpeed={0.24}
                  delay={0}
                />
              </div>

              {/* Companion Butterfly dancing gracefully in tandem */}
              <div className="absolute left-2 top-14 z-10 filter drop-shadow-[0_8px_18px_rgba(244,114,182,0.5)]">
                <CelestialButterfly
                  size={84}
                  primaryColor={isDusty ? '#BAE6FD' : '#FED7AA'}
                  secondaryColor={isDusty ? '#38BDF8' : '#FB923C'}
                  strokeColor={filigreeStroke}
                  flapSpeed={0.28}
                  delay={0.08}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface CelestialButterflyProps {
  size: number;
  primaryColor: string;
  secondaryColor: string;
  strokeColor: string;
  flapSpeed: number;
  delay: number;
}

/**
 * Beautiful filigree golden butterfly SVG with 3D flapping wings
 */
const CelestialButterfly: React.FC<CelestialButterflyProps> = ({
  size,
  primaryColor,
  secondaryColor,
  strokeColor,
  flapSpeed,
  delay
}) => {
  return (
    <div
      className="relative inline-block"
      style={{
        width: size,
        height: size * 0.85,
        perspective: '600px'
      }}
    >
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={`butterWingUpper-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id={`butterWingLower-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.95" />
            <stop offset="60%" stopColor={secondaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id={`glowCenter-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left Wing Group - flapping in 3D perspective */}
        <motion.g
          animate={{
            scaleX: [1, 0.25, 1],
            skewY: [0, -12, 0]
          }}
          transition={{
            duration: flapSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay
          }}
          style={{ transformOrigin: '60px 50px' }}
        >
          {/* Upper Left Forewing */}
          <path
            d="M 58 48 C 45 30, 20 10, 5 18 C -3 23, 0 42, 16 52 C 30 60, 48 54, 58 50 Z"
            fill={`url(#butterWingUpper-${size})`}
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Forewing Filigree Vines */}
          <path
            d="M 55 48 C 40 36, 25 24, 12 26 M 48 45 C 32 38, 20 38, 14 42 M 52 48 C 38 48, 28 52, 20 50"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Lower Left Hindwing */}
          <path
            d="M 58 52 C 46 58, 24 64, 18 78 C 14 87, 26 94, 38 88 C 48 82, 54 68, 58 56 Z"
            fill={`url(#butterWingLower-${size})`}
            stroke={strokeColor}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Hindwing Filigree Veins */}
          <path
            d="M 56 56 C 44 68, 34 78, 28 84 M 52 60 C 44 72, 38 80, 36 84"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.75"
          />
        </motion.g>

        {/* Right Wing Group - flapping in 3D perspective */}
        <motion.g
          animate={{
            scaleX: [1, 0.25, 1],
            skewY: [0, 12, 0]
          }}
          transition={{
            duration: flapSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay
          }}
          style={{ transformOrigin: '60px 50px' }}
        >
          {/* Upper Right Forewing */}
          <path
            d="M 62 48 C 75 30, 100 10, 115 18 C 123 23, 120 42, 104 52 C 90 60, 72 54, 62 50 Z"
            fill={`url(#butterWingUpper-${size})`}
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Forewing Filigree Veins */}
          <path
            d="M 65 48 C 80 36, 95 24, 108 26 M 72 45 C 88 38, 100 38, 106 42 M 68 48 C 82 48, 92 52, 100 50"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Lower Right Hindwing */}
          <path
            d="M 62 52 C 74 58, 96 64, 102 78 C 106 87, 94 94, 82 88 C 72 82, 66 68, 62 56 Z"
            fill={`url(#butterWingLower-${size})`}
            stroke={strokeColor}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Hindwing Filigree Veins */}
          <path
            d="M 64 56 C 76 68, 86 78, 92 84 M 68 60 C 76 72, 82 80, 84 84"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.75"
          />
        </motion.g>

        {/* Central Slender Butterfly Body */}
        <g id="butterBody">
          {/* Abdomen & Thorax */}
          <ellipse cx="60" cy="52" rx="3.5" ry="14" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
          {/* Head */}
          <circle cx="60" cy="35" r="3" fill="#92400E" stroke="#F59E0B" strokeWidth="0.8" />
          {/* Golden Luminescence Core */}
          <circle cx="60" cy="46" r="2.2" fill="#FDE047" />

          {/* Elegant Curled Antennae */}
          <path
            d="M 59 33 C 54 26, 44 20, 42 14"
            stroke="#B45309"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="41.5" cy="13.5" r="1.5" fill="#F59E0B" />

          <path
            d="M 61 33 C 66 26, 76 20, 78 14"
            stroke="#B45309"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="78.5" cy="13.5" r="1.5" fill="#F59E0B" />
        </g>
      </svg>
    </div>
  );
};
