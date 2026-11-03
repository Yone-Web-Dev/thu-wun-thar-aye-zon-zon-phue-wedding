import React from 'react';
import { ThemeMode } from '../types/wedding';
import { weddingAudio } from '../utils/weddingData';

interface WaxSealStampProps {
  theme: ThemeMode;
  onClick: () => void;
  className?: string;
  label?: string;
}

export const WaxSealStamp: React.FC<WaxSealStampProps> = ({
  theme,
  onClick,
  className = '',
  label = 'Break Seal & Unfold'
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const handleClick = () => {
    weddingAudio.playArpeggio();
    onClick();
  };

  const sealBg = isMagic
    ? 'bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]'
    : isDusty
    ? 'bg-gradient-to-br from-[#4A6B8A] via-[#365069] to-[#25394B]'
    : 'bg-gradient-to-br from-[#D96B59] via-[#C05442] to-[#8C3224]';

  return (
    <div className={`flex flex-col items-center gap-2.5 select-none ${className}`}>
      <div className="relative group">
        {/* Subtle Ambient Halo */}
        <div
          className="absolute -inset-2 rounded-full opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg pointer-events-none"
          style={{
            background: isMagic
              ? 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)'
              : isDusty
              ? 'radial-gradient(circle, rgba(56,189,248,0.6) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)'
          }}
        />

        <button
          type="button"
          onClick={handleClick}
          className={`relative w-22 h-22 rounded-full ${sealBg} shadow-[0_10px_25px_-4px_rgba(0,0,0,0.35),0_0_15px_rgba(245,158,11,0.25)] p-1.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-amber-300/80`}
          style={{
            boxShadow: isMagic
              ? '0 12px 28px -4px rgba(124, 58, 237, 0.5), inset 0 3px 5px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.5)'
              : isDusty
              ? '0 12px 28px -4px rgba(44, 62, 80, 0.45), inset 0 3px 5px rgba(255, 255, 255, 0.35), inset 0 -4px 8px rgba(0, 0, 0, 0.5)'
              : '0 12px 28px -4px rgba(184, 87, 71, 0.5), inset 0 3px 5px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.5)'
          }}
          title="Unseal Royal Letter"
          aria-label="Unseal Royal Letter"
        >
          {/* Outer gold leafing ring */}
          <div className="absolute inset-1 rounded-full border border-amber-200/60 pointer-events-none" />
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />

          {/* Embossed Monogram */}
          <div className="relative z-10 text-center font-serif flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <span className="text-2xl font-normal tracking-tight text-amber-100">T</span>
            <span className="font-script text-xl mx-0.5 text-amber-200/90">&amp;</span>
            <span className="text-2xl font-normal tracking-tight text-amber-100">A</span>
          </div>

          {/* Gilded light shimmer sweep */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>

      {label && (
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-900/90 font-medium bg-amber-50/80 px-3 py-0.5 rounded-full border border-amber-300/60 shadow-2xs">
          {label}
        </span>
      )}
    </div>
  );
};
