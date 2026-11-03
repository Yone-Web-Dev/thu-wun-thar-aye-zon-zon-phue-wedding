import React from 'react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';

interface BotanicalProps {
  theme: ThemeMode;
  className?: string;
  size?: number;
}

/**
 * Ornate corner floral cluster with roses, eucalyptus sprigs, and gold line-work leaves.
 */
export const BotanicalCorner: React.FC<BotanicalProps & { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  theme,
  position,
  className = ''
}) => {
  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const transformMap = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]'
  };

  const petalFill1 = isMagic ? '#C084FC' : isDusty ? '#7D98B3' : '#E89283';
  const petalFill2 = isMagic ? '#E9D5FF' : isDusty ? '#A5BCD1' : '#F3B4A7';
  const leafFill = isMagic ? '#7C6BA6' : isDusty ? '#5C748B' : '#7D9B82';
  const goldStroke = '#C8A86B';

  return (
    <div
      className={`pointer-events-none select-none z-10 ${transformMap[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="110"
        height="110"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm opacity-90"
      >
        {/* Fine gold botanical wire-lines */}
        <path
          d="M10 10 C 35 15, 60 30, 85 70"
          stroke={goldStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <path
          d="M10 10 C 15 35, 30 60, 70 85"
          stroke={goldStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        
        {/* Delicate eucalyptus leaves */}
        <ellipse cx="40" cy="22" rx="12" ry="6" transform="rotate(-20 40 22)" fill={leafFill} opacity="0.85" />
        <ellipse cx="62" cy="35" rx="11" ry="5.5" transform="rotate(-35 62 35)" fill={leafFill} opacity="0.75" />
        <ellipse cx="22" cy="40" rx="12" ry="6" transform="rotate(70 22 40)" fill={leafFill} opacity="0.85" />
        <ellipse cx="35" cy="62" rx="11" ry="5.5" transform="rotate(55 35 62)" fill={leafFill} opacity="0.75" />

        {/* Gold leaf accents */}
        <path
          d="M48 20 C 58 16, 68 22, 60 28 C 52 24, 48 20, 48 20 Z"
          stroke={goldStroke}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M20 48 C 16 58, 22 68, 28 60 C 24 52, 20 48, 20 48 Z"
          stroke={goldStroke}
          strokeWidth="1"
          fill="none"
        />

        {/* Central Blooming Peony / Rose */}
        <circle cx="26" cy="26" r="16" fill={petalFill1} opacity="0.9" />
        <circle cx="28" cy="24" r="12" fill={petalFill2} opacity="0.95" />
        <path
          d="M 22 25 Q 26 19 30 25 Q 32 29 27 31 Q 20 30 22 25 Z"
          fill={petalFill1}
        />
        <circle cx="27" cy="25" r="4" fill="#FFF2DE" />

        {/* Smaller secondary blossom */}
        <circle cx="56" cy="18" r="9" fill={petalFill2} opacity="0.85" />
        <circle cx="57" cy="17" r="5" fill="#FFF8F0" />

        <circle cx="18" cy="56" r="9" fill={petalFill2} opacity="0.85" />
        <circle cx="17" cy="57" r="5" fill="#FFF8F0" />
      </svg>
    </div>
  );
};

/**
 * Luxury "T & A" Monogram Crest
 */
export const MonogramCrest: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';
  const crestColor = isMagic ? '#6D28D9' : isDusty ? '#2C3E50' : '#8A4B3E';
  const goldColor = '#C8A86B';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Botanical circular wreath */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-amber-500/70"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={goldColor}
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={goldColor}
            strokeWidth="0.75"
            opacity="0.5"
          />
          {/* Subtle floral buds around rim */}
          <circle cx="50" cy="6" r="2.5" fill={goldColor} />
          <circle cx="50" cy="94" r="2.5" fill={goldColor} />
          <circle cx="6" cy="50" r="2.5" fill={goldColor} />
          <circle cx="94" cy="50" r="2.5" fill={goldColor} />
        </svg>

        {/* Monogram letters with royal serif elegance */}
        <span
          className="text-3xl font-normal tracking-wider flex items-center select-none"
          style={{ color: crestColor }}
        >
          <span className="font-royal">T</span>
          <span className="font-script text-3xl mx-1 text-amber-600/90">&amp;</span>
          <span className="font-royal">A</span>
        </span>
      </div>
    </div>
  );
};

/**
 * Gilded Crown / Arch Emblem Divider
 */
export const GildedDivider: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full my-4 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-amber-400/60 to-amber-500" />
      <div className="flex items-center gap-1.5 text-amber-600/80">
        <span className="w-1.5 h-1.5 rotate-45 border border-amber-500 bg-amber-100" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-600">
          <path
            d="M12 3L14.5 8.5L20.5 9.5L16 14L17 20L12 17L7 20L8 14L3.5 9.5L9.5 8.5L12 3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 border border-amber-500 bg-amber-100" />
      </div>
      <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent via-amber-400/60 to-amber-500" />
    </div>
  );
};

/**
 * Cascading luxury floral garland for the sides of the gate arch photo.
 * Features blooming roses, buds, eucalyptus sprigs, and gold botanical wire leaves.
 */
export const LushSideFloralGarland: React.FC<{
  theme: ThemeMode;
  side: 'left' | 'right';
  className?: string;
}> = ({ theme, side, className = '' }) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';
  const isRight = side === 'right';

  const roseMain = isMagic ? '#8B5CF6' : isDusty ? '#3D6C96' : '#DE6B58';
  const roseSoft = isMagic ? '#C084FC' : isDusty ? '#7BA8D0' : '#F5A394';
  const roseLight = isMagic ? '#E9D5FF' : isDusty ? '#BFDAF0' : '#FDE2DC';
  const leafDark = isMagic ? '#581C87' : isDusty ? '#44647D' : '#577C60';
  const leafLight = isMagic ? '#7E22CE' : isDusty ? '#688B9E' : '#7DA386';
  const gold = '#D4AF37';

  return (
    <div
      className={`pointer-events-none select-none ${isRight ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Trailing golden vine stem */}
        <path
          d="M85 10 C 60 70, 115 130, 80 200 C 50 260, 95 320, 75 370"
          stroke={gold}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Top Eucalyptus Cluster */}
        <ellipse cx="65" cy="40" rx="14" ry="7" transform="rotate(-30 65 40)" fill={leafLight} opacity="0.85" />
        <ellipse cx="95" cy="30" rx="12" ry="6" transform="rotate(25 95 30)" fill={leafDark} opacity="0.9" />
        <path d="M55 45 C 40 40, 35 55, 48 60 Z" fill={gold} opacity="0.6" />

        {/* Blossom 1 - Upper Large Rose */}
        <g transform="translate(68, 80)">
          <circle cx="0" cy="0" r="24" fill={roseMain} opacity="0.95" />
          <circle cx="-2" cy="-2" r="18" fill={roseSoft} opacity="0.95" />
          <path
            d="M -12 2 Q 0 -14 12 2 Q 10 12 -2 14 Q -14 10 -12 2 Z"
            fill={roseMain}
            opacity="0.9"
          />
          <circle cx="0" cy="0" r="7" fill={roseLight} />
          {/* Gold filament accents */}
          <circle cx="3" cy="-3" r="2" fill={gold} />
          <circle cx="-4" cy="4" r="1.5" fill={gold} />
        </g>

        {/* Mid-stem lush leaves & Golden Sprigs */}
        <ellipse cx="38" cy="120" rx="16" ry="8" transform="rotate(45 38 120)" fill={leafDark} opacity="0.9" />
        <ellipse cx="110" cy="130" rx="15" ry="7" transform="rotate(-20 110 130)" fill={leafLight} opacity="0.85" />
        <path
          d="M100 115 C 120 100, 130 118, 115 125 Z"
          stroke={gold}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M25 105 C 10 120, 20 135, 32 122 Z"
          stroke={gold}
          strokeWidth="1.2"
          fill="none"
        />

        {/* Blossom 2 - Mid Blossom & Buds */}
        <g transform="translate(90, 175)">
          <circle cx="0" cy="0" r="20" fill={roseSoft} opacity="0.95" />
          <circle cx="2" cy="1" r="13" fill={roseLight} opacity="0.95" />
          <path
            d="M -7 -4 Q 0 -10 7 -3 Q 6 7 -2 8 Q -8 5 -7 -4 Z"
            fill={roseMain}
            opacity="0.85"
          />
          <circle cx="1" cy="1" r="4.5" fill="#FFFFFF" />
        </g>

        {/* Small rosebud on branch */}
        <g transform="translate(42, 185)">
          <ellipse cx="0" cy="0" rx="9" ry="12" transform="rotate(30)" fill={roseMain} opacity="0.9" />
          <path d="M-6 8 C -2 14, 4 12, 6 6" stroke={leafDark} strokeWidth="2" fill="none" />
        </g>

        {/* Lower Leaves */}
        <ellipse cx="105" cy="235" rx="15" ry="7.5" transform="rotate(-40 105 235)" fill={leafDark} opacity="0.9" />
        <ellipse cx="50" cy="245" rx="14" ry="7" transform="rotate(35 50 245)" fill={leafLight} opacity="0.85" />

        {/* Blossom 3 - Lower Open Peony */}
        <g transform="translate(75, 275)">
          <circle cx="0" cy="0" r="22" fill={roseMain} opacity="0.95" />
          <circle cx="-1" cy="-1" r="16" fill={roseSoft} opacity="0.95" />
          <circle cx="-1" cy="-1" r="10" fill={roseLight} opacity="0.9" />
          <circle cx="0" cy="0" r="5" fill="#FFF9F5" />
          <path
            d="M-8 -6 C -2 -12, 8 -8, 8 2 C 4 8, -6 6, -8 -6 Z"
            fill={roseSoft}
            opacity="0.9"
          />
        </g>

        {/* Trailing Tendrils and Tiny Blossoms */}
        <ellipse cx="85" cy="330" rx="10" ry="5" transform="rotate(25 85 330)" fill={leafLight} opacity="0.8" />
        <circle cx="70" cy="345" r="7" fill={roseSoft} opacity="0.85" />
        <circle cx="70" cy="345" r="3.5" fill="#FFFFFF" />
        <circle cx="76" cy="365" r="4" fill={gold} opacity="0.75" />
      </svg>
    </div>
  );
};

/**
 * Ornate botanical crest/crown that sits at the top of the photo arch.
 */
export const ArchFloralCrown: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';
  const roseMain = isMagic ? '#8B5CF6' : isDusty ? '#3D6C96' : '#DE6B58';
  const roseSoft = isMagic ? '#C084FC' : isDusty ? '#7BA8D0' : '#F5A394';
  const leaf = isMagic ? '#7C6BA6' : isDusty ? '#52758E' : '#6A8E72';
  const gold = '#D4AF37';

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 240 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Symmetrical golden botanical curve */}
        <path
          d="M20 50 C 60 25, 100 20, 120 22 C 140 20, 180 25, 220 50"
          stroke={gold}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Left garland spray */}
        <ellipse cx="65" cy="32" rx="12" ry="5.5" transform="rotate(-15 65 32)" fill={leaf} opacity="0.85" />
        <ellipse cx="45" cy="40" rx="10" ry="5" transform="rotate(-30 45 40)" fill={leaf} opacity="0.75" />
        <circle cx="78" cy="27" r="8" fill={roseSoft} opacity="0.9" />
        <circle cx="78" cy="27" r="4" fill="#FFFFFF" />

        {/* Right garland spray */}
        <ellipse cx="175" cy="32" rx="12" ry="5.5" transform="rotate(15 175 32)" fill={leaf} opacity="0.85" />
        <ellipse cx="195" cy="40" rx="10" ry="5" transform="rotate(30 195 40)" fill={leaf} opacity="0.75" />
        <circle cx="162" cy="27" r="8" fill={roseSoft} opacity="0.9" />
        <circle cx="162" cy="27" r="4" fill="#FFFFFF" />

        {/* Central Crown Rose */}
        <circle cx="120" cy="20" r="14" fill={roseMain} opacity="0.95" />
        <circle cx="120" cy="19" r="10" fill={roseSoft} opacity="0.95" />
        <circle cx="120" cy="19" r="5" fill="#FFFBF7" />
        <circle cx="120" cy="6" r="2.5" fill={gold} />
      </svg>
    </div>
  );
};

/**
 * Elegant subtle watercolor floral background motif for the Gate section canvas.
 */
export const BackgroundFloralMotif: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';
  const flower = isMagic ? '#C084FC' : isDusty ? '#6A9BC2' : '#F5A99B';
  const leaf = isMagic ? '#A855F7' : isDusty ? '#7A9CB5' : '#8EAE94';
  const gold = '#E5C070';

  return (
    <div className={`pointer-events-none select-none absolute ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-35"
      >
        <circle cx="150" cy="150" r="95" stroke={gold} strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="150" cy="150" r="120" stroke={gold} strokeWidth="0.8" opacity="0.4" />
        
        {/* Soft watercolor petals */}
        <circle cx="150" cy="70" r="32" fill={flower} opacity="0.4" />
        <circle cx="210" cy="115" r="28" fill={flower} opacity="0.35" />
        <circle cx="90" cy="115" r="28" fill={flower} opacity="0.35" />
        <circle cx="120" cy="190" r="30" fill={flower} opacity="0.3" />
        <circle cx="180" cy="190" r="30" fill={flower} opacity="0.3" />
        
        {/* Radiating botanical leaves */}
        <ellipse cx="60" cy="70" rx="25" ry="10" transform="rotate(-40 60 70)" fill={leaf} opacity="0.4" />
        <ellipse cx="240" cy="70" rx="25" ry="10" transform="rotate(40 240 70)" fill={leaf} opacity="0.4" />
        <ellipse cx="150" cy="255" rx="30" ry="12" fill={leaf} opacity="0.35" />
      </svg>
    </div>
  );
};

/**
 * Luxury Damask & Lace Floral Watermark Texture Pattern.
 * Provides rich, subtle botanical tactile atmosphere across sections.
 */
export const FloralDamaskTexture: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';
  const strokeColor = isMagic ? '#8B5CF6' : isDusty ? '#2D6A9F' : '#E26D5C';
  const goldColor = '#D4AF37';

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-[0.045] transition-opacity duration-700"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="damask-floral-pattern"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine Diamond Keyline Grid */}
            <path
              d="M60 0 L120 60 L60 120 L0 60 Z"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            {/* Center Rose / Peony Silhouette */}
            <circle cx="60" cy="60" r="14" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="60" cy="60" r="8" fill="none" stroke={goldColor} strokeWidth="0.8" />
            <path
              d="M52 60 C52 54 68 54 68 60 C68 66 52 66 52 60 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
            {/* Botanical Foliage Leaves */}
            <path
              d="M60 42 C54 30 66 30 60 42 Z"
              fill={strokeColor}
              opacity="0.6"
            />
            <path
              d="M60 78 C54 90 66 90 60 78 Z"
              fill={strokeColor}
              opacity="0.6"
            />
            <path
              d="M42 60 C30 54 30 66 42 60 Z"
              fill={strokeColor}
              opacity="0.6"
            />
            <path
              d="M78 60 C90 54 90 66 78 60 Z"
              fill={strokeColor}
              opacity="0.6"
            />
            {/* Corner Gilded Flourishes */}
            <circle cx="0" cy="0" r="5" fill="none" stroke={goldColor} strokeWidth="0.8" />
            <circle cx="120" cy="0" r="5" fill="none" stroke={goldColor} strokeWidth="0.8" />
            <circle cx="0" cy="120" r="5" fill="none" stroke={goldColor} strokeWidth="0.8" />
            <circle cx="120" cy="120" r="5" fill="none" stroke={goldColor} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask-floral-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Lavish Horizontal Floral Vine Garland Banner.
 * Features blooming roses, buds, eucalyptus sprigs, and gold botanical accents.
 */
export const FloralVineGarland: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = ''
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const roseMain = isMagic ? '#8B5CF6' : isDusty ? '#3D6C96' : '#DE6B58';
  const roseSoft = isMagic ? '#C084FC' : isDusty ? '#7BA8D0' : '#F5A394';
  const leaf = isMagic ? '#7C6BA6' : isDusty ? '#52758E' : '#6A8E72';
  const gold = '#D4AF37';

  return (
    <div className={`pointer-events-none select-none flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 460 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-md h-auto drop-shadow-xs"
      >
        {/* Trailing Gilded Filigree Stem */}
        <path
          d="M20 30 C 90 12, 160 44, 230 30 C 300 16, 370 46, 440 30"
          stroke={gold}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />

        {/* Left Foliage Sprays */}
        <ellipse cx="90" cy="24" rx="10" ry="4.5" transform="rotate(-15 90 24)" fill={leaf} opacity="0.85" />
        <ellipse cx="140" cy="36" rx="9" ry="4" transform="rotate(25 140 36)" fill={leaf} opacity="0.8" />
        <circle cx="115" cy="22" r="7" fill={roseSoft} opacity="0.9" />
        <circle cx="115" cy="22" r="3" fill="#FFFFFF" />

        {/* Center Grand Rose Cluster */}
        <ellipse cx="205" cy="28" rx="11" ry="5" transform="rotate(-20 205 28)" fill={leaf} opacity="0.85" />
        <ellipse cx="255" cy="28" rx="11" ry="5" transform="rotate(20 255 28)" fill={leaf} opacity="0.85" />

        <circle cx="230" cy="28" r="14" fill={roseMain} opacity="0.95" />
        <circle cx="230" cy="26" r="10" fill={roseSoft} opacity="0.95" />
        <circle cx="230" cy="26" r="5" fill="#FFF9F5" />
        <circle cx="230" cy="14" r="2.5" fill={gold} />

        {/* Right Foliage Sprays */}
        <ellipse cx="320" cy="24" rx="10" ry="4.5" transform="rotate(15 320 24)" fill={leaf} opacity="0.85" />
        <ellipse cx="370" cy="36" rx="9" ry="4" transform="rotate(-25 370 36)" fill={leaf} opacity="0.8" />
        <circle cx="345" cy="22" r="7" fill={roseSoft} opacity="0.9" />
        <circle cx="345" cy="22" r="3" fill="#FFFFFF" />

        {/* End Gold Droplets */}
        <circle cx="20" cy="30" r="2.5" fill={gold} />
        <circle cx="440" cy="30" r="2.5" fill={gold} />
      </svg>
    </div>
  );
};

