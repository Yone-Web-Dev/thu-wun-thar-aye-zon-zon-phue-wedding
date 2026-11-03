import React from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';
import {
  ArchFloralCrown,
  FloralVineGarland,
  BackgroundFloralMotif
} from './BotanicalAccents';
import { InvitationBook } from './InvitationBook';

interface RoyalInvitationCardProps {
  theme: ThemeMode;
  guestName: string;
  onProceedToShowcase: () => void;
  onBackToGate?: () => void;
}

export const RoyalInvitationCard: React.FC<RoyalInvitationCardProps> = ({
  theme,
  guestName,
  onProceedToShowcase,
  onBackToGate
}) => {
  const t = THEMES[theme];

  return (
    <section
      id="royal-invitation"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center py-10 sm:py-14 px-4 sm:px-8 lg:px-12 ${t.cardBg} transition-colors duration-500 overflow-hidden scroll-mt-28`}
    >
      {/* Background ambient texture and soft floral watermarks */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -left-12 sm:-top-16 sm:-left-16 w-56 sm:w-80 h-56 sm:h-80 opacity-40 rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -right-12 sm:-top-16 sm:-right-16 w-56 sm:w-80 h-56 sm:h-80 opacity-40 -scale-x-100 -rotate-12"
      />

      {/* Invitation Header with Rich Florals & Welcome Guest Name Badge */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 space-y-2.5 max-w-xl mx-auto px-2">
        {/* Arch Floral Crown topping the invitation header */}
        <ArchFloralCrown
          theme={theme}
          className="w-52 sm:w-68 h-auto mx-auto mb-1 opacity-90 drop-shadow-xs"
        />

        <p className="text-xs uppercase tracking-[0.3em] font-sans text-amber-800 font-semibold">
          The Royal Invitation
        </p>
        <p className="text-xs sm:text-sm font-serif italic text-stone-600">
          Unfolded Stationery &amp; Formal Summons
        </p>

        {/* Welcome guest name placed directly under The Royal Invitation, unfolded... */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/95 border border-amber-300 shadow-sm backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs sm:text-sm font-serif tracking-wider uppercase text-amber-900 font-medium">
              Specially Invited:{' '}
              <span className="font-semibold text-stone-900">
                {guestName || 'Honoured Guest & Family'}
              </span>
            </span>
          </div>
        </div>

        {/* Floral Vine Garland Under Title */}
        <FloralVineGarland theme={theme} className="max-w-xs sm:max-w-sm mx-auto pt-1 scale-95" />
      </div>

      {/* 3D Flip-Open Invitation Book with Foil Cover & High-Res Letters */}
      <div className="relative z-10 w-full mb-8">
        <InvitationBook
          theme={theme}
          guestName={guestName}
        />
      </div>

      {/* Action Buttons placed directly under Invitation Book */}
      <div className="relative z-20 w-full max-w-lg mx-auto space-y-4 text-center px-4">
        {/* Ornate Matrimonial Passport Button */}
        <div className="relative group">
          {/* Pulsing Theme Ambient Glow Aura */}
          <div
            className="absolute -inset-1.5 rounded-full opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl pointer-events-none"
            style={{
              background:
                theme === 'magic'
                  ? 'radial-gradient(ellipse at center, rgba(168,85,247,0.7) 0%, rgba(217,70,239,0.4) 60%, transparent 80%)'
                  : theme === 'dustyBlue'
                  ? 'radial-gradient(ellipse at center, rgba(56,189,248,0.7) 0%, rgba(45,106,159,0.5) 60%, transparent 80%)'
                  : 'radial-gradient(ellipse at center, rgba(245,158,11,0.65) 0%, rgba(226,109,92,0.55) 60%, transparent 80%)'
            }}
          />

          <button
            onClick={onProceedToShowcase}
            className={`relative w-full py-4 sm:py-5 px-5 sm:px-8 rounded-full border-2 border-amber-300 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.25),0_0_24px_rgba(245,158,11,0.28)] overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
              theme === 'magic'
                ? 'bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-800'
                : theme === 'dustyBlue'
                ? 'bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 hover:from-slate-800 hover:to-sky-700'
                : 'bg-gradient-to-r from-[#9E3929] via-[#D45D4B] to-[#9E3929] hover:from-[#B54432] hover:to-[#B54432]'
            }`}
          >
            {/* Satin Sheen Diagonal Shimmer on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

            {/* Inner Concentric Fine Gold Keylines */}
            <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-amber-200/50 pointer-events-none" />
            <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-dashed border-amber-300/30 pointer-events-none" />

            {/* Button Content */}
            <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
              {/* Left Gilded Wax Seal Medallion */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-white/60 shadow-md flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500">
                <Sparkles className="w-5 h-5 text-amber-950 fill-amber-950/20" />
              </div>

              {/* Center Typography Block */}
              <div className="flex-1 text-center space-y-0.5">
                <p className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal tracking-wide drop-shadow-md">
                  Enter Celebration Showcase &amp; Wishes
                </p>
                <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-amber-200/90 font-medium">
                  Ceremony · Gallery · Live Wishes
                </p>
              </div>

              {/* Right Chevron Medallion */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-xs border border-amber-300/60 shadow-inner flex items-center justify-center shrink-0 text-amber-200 group-hover:bg-white/25 group-hover:translate-x-0.5 transition-all">
                <ChevronDown className="w-5 h-5 text-amber-200 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {onBackToGate && (
          <button
            onClick={onBackToGate}
            className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-500 hover:text-amber-900 transition-colors py-1 px-3 rounded-full hover:bg-amber-100/50 cursor-pointer"
          >
            <span>←</span>
            <span>Return to Welcome Gate</span>
          </button>
        )}
      </div>
    </section>
  );
};
