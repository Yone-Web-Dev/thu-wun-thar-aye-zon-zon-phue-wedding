import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart, Maximize2 } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';
import {
  MonogramCrest,
  LushSideFloralGarland,
  ArchFloralCrown,
  BackgroundFloralMotif,
  GildedDivider
} from './BotanicalAccents';
import { WaxSealStamp } from './WaxSealStamp';

interface WelcomeGateProps {
  theme: ThemeMode;
  guestName: string;
  onGuestNameChange: (name: string) => void;
  onOpenInvitation: () => void;
  isUnlocked: boolean;
  onOpenPhotoSlot?: (slotId: string, label: string, imageSrc?: string) => void;
  onStartMusic?: () => void;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({
  theme,
  guestName,
  onGuestNameChange,
  onOpenInvitation,
  isUnlocked,
  onOpenPhotoSlot,
  onStartMusic
}) => {
  const t = THEMES[theme];
  const [localInput, setLocalInput] = useState(guestName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = localInput.trim() || 'Honoured Guest & Family';
    onGuestNameChange(finalName);
    onStartMusic?.();
    onOpenInvitation();
  };

  return (
    <section
      id="welcome-gate"
      className={`relative w-full min-h-[calc(100vh-56px)] flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-8 md:px-12 ${t.gateBg} transition-colors duration-500 overflow-hidden`}
    >
      {/* Background Soft Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

      {/* Background Floral Motifs (Lush Canvas Atmosphere) */}
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -left-12 sm:-top-16 sm:-left-16 w-56 sm:w-80 h-56 sm:h-80 opacity-40 rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -right-12 sm:-top-16 sm:-right-16 w-56 sm:w-80 h-56 sm:h-80 opacity-40 -scale-x-100 -rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="bottom-4 -left-16 sm:bottom-10 sm:left-4 w-48 sm:w-72 h-48 sm:h-72 opacity-30 -rotate-45"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="bottom-4 -right-16 sm:bottom-10 sm:right-4 w-48 sm:w-72 h-48 sm:h-72 opacity-30 scale-x-100 rotate-45"
      />

      {/* Top Header: Monogram & Monologue */}
      <div className="relative z-10 text-center space-y-2.5 max-w-xl mx-auto px-2">
        <MonogramCrest theme={theme} className="mb-1" />

        <p className="text-xs uppercase tracking-[0.28em] font-sans text-amber-800/90 font-semibold">
          A Celebration of Eternal Love
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-royal font-normal text-stone-900 tracking-tight leading-tight">
          Welcome to our Big Day
        </h1>

        <p className="text-xs sm:text-sm font-serif italic text-stone-700 max-w-md mx-auto leading-relaxed">
          &ldquo;Two souls with but a single thought, two hearts that beat as one.&rdquo;
          <br />
          We warmly invite you to cross the threshold into our celebration.
        </p>
      </div>

      {/* Center Section: Arch Photo with Rich Side & Top Floral Framing */}
      <div className="relative z-10 my-4 sm:my-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto w-full flex flex-col items-center">
        {/* Photo Container with Floral Framing */}
        <div className="relative w-full max-w-[260px] sm:max-w-[290px] md:max-w-[310px] mx-auto">
          {/* Arch Floral Crown atop the arched photo frame */}
          <ArchFloralCrown
            theme={theme}
            className="absolute -top-7 sm:-top-8 md:-top-9 left-1/2 -translate-x-1/2 w-48 sm:w-60 md:w-64 h-auto z-20 drop-shadow-sm"
          />

          {/* Left Cascading Floral Garland */}
          <div className="absolute -left-10 sm:-left-16 md:-left-20 top-2 sm:top-0 w-20 sm:w-28 md:w-32 h-[105%] z-20 pointer-events-none">
            <LushSideFloralGarland
              theme={theme}
              side="left"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Right Cascading Floral Garland */}
          <div className="absolute -right-10 sm:-right-16 md:-right-20 top-2 sm:top-0 w-20 sm:w-28 md:w-32 h-[105%] z-20 pointer-events-none">
            <LushSideFloralGarland
              theme={theme}
              side="right"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Pulsing Theme-Colored Ambient Light Aura behind gate photo */}
          <div
            className="absolute -inset-4 sm:-inset-6 rounded-[44px] opacity-80 blur-xl pointer-events-none transition-all duration-700 animate-pulse"
            style={{
              background:
                theme === 'magic'
                  ? 'radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(217,70,239,0.3) 55%, transparent 75%)'
                  : theme === 'dustyBlue'
                  ? 'radial-gradient(circle, rgba(61,108,150,0.5) 0%, rgba(123,168,208,0.3) 55%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(224,122,104,0.5) 0%, rgba(245,163,148,0.3) 55%, transparent 75%)'
            }}
          />

          {/* Royal Arched Gate Couple Portrait - 100% Clean & Unobscured */}
          <div
            onClick={() => onOpenPhotoSlot?.('SLOT-GATE-01', 'Thu Wun Thar & Aye Zon Zon Phue', '/assets/aistudio/hero1_2f243286.webp')}
            className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-t-full rounded-b-2xl border-double border-4 border-amber-400/90 shadow-2xl overflow-hidden z-10 group cursor-pointer transition-transform duration-500 hover:scale-[1.01] bg-stone-900"
            title="Click to view full portrait"
          >
            {/* Real Couple Photo - Crisp & Completely Uncovered */}
            <img
              src="/assets/aistudio/hero1_2f243286.webp"
              alt="Thu Wun Thar & Aye Zon Zon Phue"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
              loading="eager"
              decoding="async"
            />

            {/* Fine Inner Gold Keylines with Corner Accents */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-t-full rounded-b-xl border border-amber-300/50 pointer-events-none z-10" />
            <div className="absolute inset-3 sm:inset-3.5 rounded-t-full rounded-b-lg border border-dashed border-amber-400/25 pointer-events-none z-10" />

            {/* Subtle Zoom Button in bottom right corner */}
            <div className="absolute bottom-3 right-3 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPhotoSlot?.('SLOT-GATE-01', 'Thu Wun Thar & Aye Zon Zon Phue', '/assets/aistudio/hero1_2f243286.webp');
                }}
                className="p-1.5 rounded-full bg-white/85 hover:bg-white text-stone-800 hover:text-amber-900 border border-amber-300 shadow-md backdrop-blur-xs transition-all cursor-pointer active:scale-90"
                title="View Full Resolution Photo"
                aria-label="View Full Resolution Photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Couple Names & Matrimony Detail Plaque (Cleanly placed below the photo, leaving the picture 100% uncovered) */}
          <div className="text-center mt-3.5 space-y-1 relative z-20">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-amber-800 bg-amber-100/70 px-3 py-0.5 rounded-full border border-amber-300/60 shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Royal Matrimony · 2026</span>
            </span>

            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-800/80 font-semibold pt-0.5">
              The Wedding of
            </p>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal tracking-tight">
              Thu Wun Thar <span className="font-script text-amber-700 text-2xl sm:text-3xl px-1">&amp;</span> Aye Zon Zon Phue
            </h2>
            <p className="text-[11px] font-serif tracking-widest uppercase text-amber-900/80">
              Sunday, 8 Nov 2026 · Singapore
            </p>
          </div>
        </div>

        {/* Wax Seal Stamp Call-To-Action */}
        <div className="text-center mt-5">
          <WaxSealStamp
            theme={theme}
            onClick={() => {
              const finalName = localInput.trim() || 'Honoured Guest & Family';
              onGuestNameChange(finalName);
              onStartMusic?.();
              onOpenInvitation();
            }}
            label="Click Wax Seal to Unfold Letter"
          />
        </div>
      </div>

      {/* Bottom Section: Visitor Name Input & Open Invitation CTA */}
      <div className="relative z-10 max-w-md mx-auto w-full space-y-4 px-3 pb-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-amber-900 font-semibold bg-amber-50/90 px-3 py-0.5 rounded-full border border-amber-300/60 shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Enter Visitor Name</span>
            </span>

            {/* Gilded Calligraphic Entry Field */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300/40 via-amber-400/30 to-amber-300/40 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <input
                  id="guest-name-input"
                  type="text"
                  value={localInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLocalInput(val);
                    onGuestNameChange(val);
                    if (val.trim().length > 0) {
                      onStartMusic?.();
                    }
                  }}
                  onKeyDown={() => {
                    onStartMusic?.();
                  }}
                  placeholder="Enter your name / family..."
                  className="w-full pl-5 pr-12 py-3.5 text-center text-sm sm:text-base font-serif font-medium bg-white/95 rounded-full border-2 border-amber-300/90 shadow-md focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 text-stone-900 placeholder:text-stone-400 transition-all placeholder:font-sans placeholder:text-xs sm:placeholder:text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600/70 pointer-events-none">
                  <Heart className="w-4 h-4 fill-amber-500/20 text-amber-600" />
                </span>
              </div>
            </div>
          </div>

          {/* Luxury Passport Button for Gate */}
          <div className="relative group">
            <div
              className="absolute -inset-1.5 rounded-full opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg pointer-events-none"
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
              type="submit"
              className={`relative w-full py-3.5 sm:py-4 px-5 sm:px-7 rounded-full border-2 border-amber-300 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.25),0_0_20px_rgba(245,158,11,0.25)] overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                theme === 'magic'
                  ? 'bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-800'
                  : theme === 'dustyBlue'
                  ? 'bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 hover:from-slate-800 hover:to-sky-700'
                  : 'bg-gradient-to-r from-[#9E3929] via-[#D45D4B] to-[#9E3929] hover:from-[#B54432] hover:to-[#B54432]'
              }`}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Inner Concentric Keylines */}
              <div className="absolute inset-1 rounded-full border border-amber-200/50 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-white/60 shadow-md flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-4 h-4 text-amber-950 fill-amber-950/20" />
                </div>

                <div className="flex-1 text-center space-y-0.5">
                  <p className="font-serif text-base sm:text-lg text-white font-medium tracking-wide drop-shadow-md">
                    Unseal Royal Letter &amp; Enter
                  </p>
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-amber-200/90 font-medium">
                    A Celebration of Eternal Love
                  </p>
                </div>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-xs border border-amber-300/60 shadow-inner flex items-center justify-center shrink-0 text-amber-200 group-hover:bg-white/25 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </div>
              </div>
            </button>
          </div>
        </form>

        {isUnlocked && (
          <p className="text-center text-xs text-amber-900 font-sans flex items-center justify-center gap-1.5 pt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Invitation unsealed for <strong className="font-semibold text-stone-900">{guestName}</strong></span>
          </p>
        )}
      </div>
    </section>
  );
};
