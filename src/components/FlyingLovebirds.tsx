import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types/wedding';

interface FlyingLovebirdsProps {
  theme: ThemeMode;
  /**
   * Callback when the flight finishes across the banner.
   */
  onFlightComplete?: () => void;
  className?: string;
}

/**
 * Animated Flying Lovebirds (Pair of romantic doves)
 * Flies once from left to right across the banner when visitor reaches Layer 3.
 */
export const FlyingLovebirds: React.FC<FlyingLovebirdsProps> = ({
  theme,
  onFlightComplete,
  className = ''
}) => {
  const [hasFlown, setHasFlown] = useState(false);
  const [isFlying, setIsFlying] = useState(true);

  const isDusty = theme === 'dustyBlue';
  const goldStroke = isDusty ? '#7D98B3' : '#C89D42';
  const ribbonColor = isDusty ? '#60A5FA' : '#F472B6';

  // Handle animation completion - flies only ONCE
  const handleComplete = () => {
    setIsFlying(false);
    setHasFlown(true);
    if (onFlightComplete) {
      onFlightComplete();
    }
  };

  // If already flown and finished, unmount to keep DOM clean
  if (hasFlown && !isFlying) {
    return null;
  }

  return (
    <div
      data-testid="flying-lovebirds-banner"
      className={`pointer-events-none absolute inset-x-0 top-6 sm:top-10 h-72 sm:h-84 overflow-hidden z-30 select-none ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {isFlying && (
          <motion.div
            data-testid="flying-lovebirds-motion"
            initial={{ x: '-240px', y: 35, opacity: 0 }}
            animate={{
              x: 'calc(100vw + 120px)',
              y: [35, 12, 42, 18, 48, 20, 36],
              opacity: [0, 1, 1, 1, 1, 1, 0]
            }}
            transition={{
              x: { duration: 5.8, ease: 'linear' },
              y: { duration: 5.8, ease: 'easeInOut', times: [0, 0.18, 0.36, 0.54, 0.72, 0.9, 1] },
              opacity: { duration: 5.8, times: [0, 0.06, 0.2, 0.82, 0.94, 1] }
            }}
            onAnimationComplete={handleComplete}
            className="absolute top-6 left-0 flex items-center"
            style={{ willChange: 'transform' }}
          >
            {/* The Pair of Lovebirds flying in intimate tandem */}
            <div className="relative w-56 h-36 sm:w-64 sm:h-40">
              {/* Sparkle & Stardust trail behind the lovebirds */}
              <div className="absolute -left-14 top-8 flex items-center space-x-2 pointer-events-none">
                <motion.span
                  animate={{ y: [0, 14, 28], opacity: [0.8, 1, 0], scale: [0.8, 1.25, 0.6] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
                  className="text-sm text-rose-400 drop-shadow-md"
                >
                  ❤️
                </motion.span>
                <motion.span
                  animate={{ y: [0, -12, 16], opacity: [0.7, 1, 0], scale: [0.7, 1.1, 0.5] }}
                  transition={{ duration: 1.3, repeat: Infinity, delay: 0.35, ease: 'easeOut' }}
                  className="text-xs text-amber-400 drop-shadow-md"
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ y: [0, 10, 20], opacity: [0.8, 1, 0], scale: [0.7, 1.2, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                  className="text-xs text-rose-300 drop-shadow-md"
                >
                  💕
                </motion.span>
                <motion.span
                  animate={{ y: [0, -8, 12], opacity: [0.6, 1, 0], scale: [0.6, 1.0, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
                  className="text-[11px] text-amber-500 drop-shadow"
                >
                  ✦
                </motion.span>
              </div>

              {/* Leading Bird (Lovebird 1 - Groom/Lead Dove) */}
              <div className="absolute left-18 top-1 z-20 filter drop-shadow-[0_6px_16px_rgba(217,119,6,0.35)]">
                <SingleLovebird
                  size={72}
                  goldStroke={goldStroke}
                  ribbonColor={ribbonColor}
                  wingDelay={0}
                  hasRibbon={true}
                />
              </div>

              {/* Companion Bird (Lovebird 2 - Bride/Companion Dove) flying tenderly beside & slightly below */}
              <div className="absolute left-0 top-10 z-10 filter drop-shadow-[0_6px_16px_rgba(244,114,182,0.35)]">
                <SingleLovebird
                  size={60}
                  goldStroke={goldStroke}
                  ribbonColor={ribbonColor}
                  wingDelay={0.14}
                  hasHeart={true}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SingleLovebirdProps {
  size?: number;
  goldStroke: string;
  ribbonColor: string;
  wingDelay?: number;
  hasRibbon?: boolean;
  hasHeart?: boolean;
}

/**
 * High-detail stylized vector lovebird / dove facing right with flapping wings
 */
const SingleLovebird: React.FC<SingleLovebirdProps> = ({
  size = 64,
  goldStroke,
  ribbonColor,
  wingDelay = 0,
  hasRibbon = false,
  hasHeart = false
}) => {
  return (
    <div className="relative inline-block" style={{ width: size, height: size * 0.75 }}>
      <svg
        viewBox="0 0 100 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Luminous Pearl White to Warm Champagne Shimmer gradient */}
          <linearGradient id="doveBodyGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#FDEFD8" />
          </linearGradient>

          <linearGradient id="doveWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFF8ED" />
            <stop offset="100%" stopColor="#F9E2BE" />
          </linearGradient>
        </defs>

        {/* Far Wing (Behind Body) flapping in counter rhythm */}
        <motion.g
          animate={{
            rotate: [-24, 24, -24],
            scaleY: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 0.38,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: wingDelay + 0.05
          }}
          style={{ transformOrigin: '48px 36px' }}
        >
          <path
            d="M 46 34 C 42 22, 48 10, 60 2 C 55 10, 52 20, 54 32 Z"
            fill="url(#doveWingGrad)"
            stroke={goldStroke}
            strokeWidth="1.3"
            opacity="0.9"
          />
          {/* Far feather rib */}
          <path
            d="M 52 20 C 56 12, 64 6, 70 3 C 66 12, 60 22, 54 30"
            fill="url(#doveWingGrad)"
            stroke={goldStroke}
            strokeWidth="0.9"
            opacity="0.75"
          />
        </motion.g>

        {/* Trailing Tail Feathers */}
        <g id="doveTail">
          <path
            d="M 28 42 C 18 46, 8 50, 0 48 C 6 42, 16 38, 25 36 Z"
            fill="url(#doveWingGrad)"
            stroke={goldStroke}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M 26 44 C 18 51, 10 56, 3 55 C 8 47, 18 42, 25 40 Z"
            fill="url(#doveBodyGrad)"
            stroke={goldStroke}
            strokeWidth="1.0"
            opacity="0.95"
          />
        </g>

        {/* Main Body & Elegant Head */}
        <path
          d="M 22 37 C 28 34, 38 33, 50 36 C 60 38, 70 36, 78 30 C 82 27, 85 24, 88 19 C 85 17, 80 18, 74 21 C 66 25, 54 26, 42 28 C 32 30, 26 34, 22 37 Z"
          fill="url(#doveBodyGrad)"
          stroke={goldStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Head Dome & Throat */}
        <path
          d="M 74 21 C 77 15, 83 13, 89 16 C 92 18, 93 22, 88 26 C 83 29, 78 30, 74 21 Z"
          fill="url(#doveBodyGrad)"
          stroke={goldStroke}
          strokeWidth="1.3"
        />

        {/* Dove Eye (Gentle dark golden bead with bright glint) */}
        <circle cx="85" cy="18" r="1.8" fill="#78350F" />
        <circle cx="85.5" cy="17.5" r="0.7" fill="#FFFFFF" />

        {/* Delicate Golden Coral Beak */}
        <path
          d="M 91 18 L 99 20 L 90 22 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Optional Golden Olive Branch or Ribbon in Beak */}
        {hasRibbon && (
          <motion.g
            animate={{ rotate: [-7, 8, -7], y: [0, 2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '97px 21px' }}
          >
            <path
              d="M 97 21 C 104 25, 106 33, 101 38 C 96 42, 90 40, 87 45"
              stroke={goldStroke}
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Emerald olive leaf sprig */}
            <path
              d="M 99 22 C 105 20, 108 23, 105 26 C 101 25, 100 23, 99 22 Z"
              fill="#10B981"
              stroke="#059669"
              strokeWidth="0.7"
              opacity="0.95"
            />
          </motion.g>
        )}

        {hasHeart && (
          <motion.g
            animate={{ scale: [1, 1.25, 1], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '96px 26px' }}
          >
            {/* Tiny trailing rose gold heart dangling from beak */}
            <path
              d="M 96 26 C 96 24 94 22 92 23 C 90 24 90 26 92 28 L 96 32 L 100 28 C 102 26 102 24 100 23 C 98 22 96 24 96 26 Z"
              fill={ribbonColor}
              stroke={goldStroke}
              strokeWidth="0.7"
            />
          </motion.g>
        )}

        {/* Near Wing (Foreground Wing) - Graceful flapping stroke */}
        <motion.g
          animate={{
            rotate: [26, -28, 26],
            scaleY: [1.2, 0.78, 1.2]
          }}
          transition={{
            duration: 0.38,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: wingDelay
          }}
          style={{ transformOrigin: '50px 34px' }}
        >
          {/* Main Primary Wing Feather span */}
          <path
            d="M 48 34 C 44 20, 52 6, 68 0 C 64 10, 60 22, 60 34 Z"
            fill="url(#doveWingGrad)"
            stroke={goldStroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Layered secondary feathers */}
          <path
            d="M 52 34 C 50 24, 58 12, 74 4 C 68 14, 66 25, 63 35 Z"
            fill="url(#doveWingGrad)"
            stroke={goldStroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <path
            d="M 56 34 C 56 26, 64 16, 80 10 C 74 19, 71 27, 66 36 Z"
            fill="url(#doveBodyGrad)"
            stroke={goldStroke}
            strokeWidth="0.9"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </motion.g>
      </svg>
    </div>
  );
};
