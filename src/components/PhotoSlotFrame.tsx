import React from 'react';
import { Camera } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { BotanicalCorner } from './BotanicalAccents';

interface PhotoSlotFrameProps {
  slotId: string;
  slotLabel: string;
  theme: ThemeMode;
  shape?: 'arch' | 'portrait' | 'square';
  className?: string;
  aspectRatio?: string; // e.g. 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square'
  hasCornerBadges?: boolean;
  matting?: boolean;
  localImageSrc?: string; // If user provides a local .webp or image
}

export const PhotoSlotFrame: React.FC<PhotoSlotFrameProps> = ({
  slotId,
  slotLabel,
  theme,
  shape = 'portrait',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  hasCornerBadges = false,
  matting = false,
  localImageSrc
}) => {
  const isDusty = theme === 'dustyBlue';

  // Soft gradient canvas backgrounds per theme
  const gradientBg = isDusty
    ? 'bg-gradient-to-br from-slate-100/90 via-sky-50/80 to-amber-100/50'
    : 'bg-gradient-to-br from-rose-100/80 via-orange-50 to-amber-100/60';

  const shapeStyles = {
    arch: 'rounded-t-full rounded-b-2xl',
    portrait: 'rounded-2xl',
    square: 'rounded-2xl'
  }[shape];

  const goldDoubleBorder = isDusty
    ? 'border-double border-4 border-amber-500/70'
    : 'border-double border-4 border-amber-400/80';

  const innerKeyline = isDusty
    ? 'border border-amber-600/30'
    : 'border border-amber-500/35';

  return (
    <div className={`relative group ${className}`}>
      {/* Optional Corner Badges */}
      {hasCornerBadges && (
        <>
          <div className="absolute -top-4 -right-4 w-16 h-16 z-20">
            <BotanicalCorner theme={theme} position="top-right" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 z-20">
            <BotanicalCorner theme={theme} position="bottom-left" />
          </div>
        </>
      )}

      {/* Outer Matting Container (if matting requested) */}
      <div
        className={`relative ${shapeStyles} ${
          matting ? 'p-3 bg-white/90 shadow-md ring-1 ring-amber-300/40' : ''
        }`}
      >
        {/* Main Photo Frame Placeholder with Double Keyline and Theme Glowing Border */}
        <div
          className={`relative w-full ${aspectRatio} ${shapeStyles} ${goldDoubleBorder} ${gradientBg} overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:scale-[1.01]`}
          style={{
            boxShadow: isDusty
              ? '0 0 28px rgba(45, 106, 159, 0.42), 0 0 12px rgba(56, 189, 248, 0.3), 0 12px 30px -6px rgba(44, 62, 80, 0.25)'
              : '0 0 28px rgba(226, 109, 92, 0.42), 0 0 12px rgba(245, 158, 11, 0.35), 0 12px 30px -6px rgba(184, 87, 71, 0.25)'
          }}
        >
          {/* Subtle Fine Inner Keyline */}
          <div
            className={`absolute inset-1.5 sm:inset-2 ${shapeStyles} ${innerKeyline} pointer-events-none z-10`}
          />

          {localImageSrc ? (
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={localImageSrc}
                alt={slotLabel}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Subtle radiant shimmer highlight over image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
            </div>
          ) : (
            /* Blank Luxury Placeholder Label & Icon */
            <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 max-w-[88%] select-none p-5 text-center">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  isDusty ? 'bg-amber-100/70 text-amber-700/70' : 'bg-amber-100/80 text-amber-800/70'
                } border border-amber-300/60 shadow-inner`}
              >
                <Camera className="w-5 h-5 stroke-[1.6]" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-sm sm:text-base text-stone-900 font-medium tracking-tight">
                  {slotLabel}
                </h4>
                <p className="text-[11px] font-serif italic text-stone-500 tracking-wide">
                  Photo unveiling soon
                </p>
              </div>

              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
