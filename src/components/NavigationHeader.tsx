import React from 'react';
import { VolumeX, Sparkles, Palette, Images, CalendarDays, MessageCircle } from 'lucide-react';
import { ThemeMode } from '../types/wedding';

export type NavigationDestination = 'photos' | 'ceremony' | 'wishes';

interface NavigationHeaderProps {
  theme: ThemeMode;
  onToggleTheme: (specificTheme?: ThemeMode) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  onReturnToGate?: () => void;
  onNavigate: (destination: NavigationDestination) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  theme,
  onToggleTheme,
  isAudioPlaying,
  onToggleAudio,
  petalsEnabled,
  onTogglePetals,
  onReturnToGate,
  onNavigate
}) => {
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const themeLabel = isMagic ? 'Magic Violet' : isDusty ? 'Dusty Blue' : 'Peach Rose';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-amber-300/50 shadow-xs select-none">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Monogram / Couple Names */}
        <button
          onClick={onReturnToGate}
          className="flex items-center gap-1.5 group cursor-pointer text-left min-w-0 shrink"
          title="Return to Welcome Gate"
        >
          <span className="font-serif text-sm sm:text-base md:text-lg font-normal tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors truncate">
            Thu Wun Thar <span className="font-script text-amber-600 font-normal">&amp;</span> Aye Zon Zon Phue
          </span>
        </button>

        {/* Visitor Controls (Theme, Music, Petals) - Fully Responsive & Visible on Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Theme Palette Switcher with 3 Themes (Peach, Dusty Blue, Magic) */}
          <button
            onClick={() => onToggleTheme()}
            className={`h-8 sm:h-9 px-2 sm:px-3 rounded-full border text-xs font-medium flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 ${
              isMagic
                ? 'bg-purple-50/95 border-purple-300 text-purple-950 ring-1 ring-purple-300/60'
                : isDusty
                ? 'bg-sky-50/95 border-sky-300 text-sky-950 ring-1 ring-sky-300/60'
                : 'bg-rose-50/95 border-rose-300 text-rose-950 ring-1 ring-rose-300/60'
            }`}
            title={`Current theme: ${themeLabel}. Click to cycle theme (Peach → Dusty Blue → Magic)`}
            aria-label={`Current theme: ${themeLabel}. Click to switch theme`}
          >
            <Palette className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <div className="flex items-center gap-1 shrink-0">
              {/* Peach dot */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTheme('peach');
                }}
                className={`w-3 h-3 rounded-full border border-stone-300 transition-transform ${
                  theme === 'peach' ? 'bg-[#E07A68] scale-110 ring-2 ring-rose-400' : 'bg-[#E07A68] opacity-50 hover:opacity-100'
                }`}
                title="Peach Rose Theme"
              />
              {/* Dusty Blue dot */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTheme('dustyBlue');
                }}
                className={`w-3 h-3 rounded-full border border-stone-300 transition-transform ${
                  theme === 'dustyBlue' ? 'bg-[#3D5A73] scale-110 ring-2 ring-sky-500' : 'bg-[#3D5A73] opacity-50 hover:opacity-100'
                }`}
                title="Dusty Blue Theme"
              />
              {/* Magic Violet dot */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTheme('magic');
                }}
                className={`w-3 h-3 rounded-full border border-stone-300 transition-transform ${
                  theme === 'magic'
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 scale-110 ring-2 ring-purple-500'
                    : 'bg-[#8B5CF6] opacity-50 hover:opacity-100'
                }`}
                title="Magic Violet Theme"
              />
            </div>
            <span className="text-[11px] font-sans font-medium hidden xs:inline sm:inline">
              {themeLabel}
            </span>
          </button>

          {/* Wedding Song: Thinking Out Loud */}
          <button
            onClick={onToggleAudio}
            className={`h-8 sm:h-9 px-2.5 sm:px-3 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
              isAudioPlaying
                ? 'bg-amber-100/90 border-amber-400 text-amber-900'
                : 'bg-white border-amber-300/60 text-stone-600 hover:bg-stone-50'
            }`}
            title={isAudioPlaying ? 'Pause "Thinking Out Loud"' : 'Play "Thinking Out Loud"'}
            aria-label={isAudioPlaying ? 'Pause "Thinking Out Loud"' : 'Play "Thinking Out Loud"'}
          >
            {isAudioPlaying ? (
              <>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-amber-700 animate-pulse h-3 rounded-full" />
                  <span className="w-0.5 bg-amber-700 animate-bounce h-2 rounded-full" />
                  <span className="w-0.5 bg-amber-700 animate-pulse h-2.5 rounded-full" />
                </div>
                <span className="text-[11px] font-sans font-medium hidden sm:inline">Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="text-[11px] font-sans hidden sm:inline">Music</span>
              </>
            )}
          </button>

          {/* Floating Petals Toggle */}
          <button
            onClick={onTogglePetals}
            className={`h-8 sm:h-9 w-8 sm:w-9 rounded-full border text-xs font-medium flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 ${
              petalsEnabled
                ? 'bg-amber-100/90 border-amber-400 text-amber-900'
                : 'bg-white border-amber-300/60 text-stone-400 hover:bg-stone-50'
            }`}
            title={petalsEnabled ? 'Pause Floating Petals' : 'Enable Floating Petals'}
            aria-label={petalsEnabled ? 'Pause Floating Petals' : 'Enable Floating Petals'}
          >
            <Sparkles className={`w-3.5 h-3.5 ${petalsEnabled ? 'text-amber-700' : 'text-stone-400'}`} />
          </button>
        </div>
      </div>

      <nav aria-label="Wedding sections" className="border-t border-amber-100/80 bg-gradient-to-r from-amber-50/70 via-white/70 to-rose-50/70">
        <div className="max-w-6xl mx-auto flex items-center gap-2 px-3 py-2 sm:px-6">
          <span className="hidden lg:inline text-[10px] font-sans uppercase tracking-[0.22em] text-amber-800/75 whitespace-nowrap">
            Explore our day
          </span>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => onNavigate('photos')}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-white/70 px-3 py-2 text-[11px] sm:px-4 sm:text-xs font-medium text-stone-700 shadow-[0_1px_0_rgba(255,255,255,0.9)] transition-all hover:-translate-y-px hover:border-amber-200 hover:bg-white hover:text-amber-950 hover:shadow-sm active:translate-y-0 cursor-pointer whitespace-nowrap"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-200">
                <Images className="h-3.5 w-3.5" />
              </span>
              Love in Frames
            </button>
            <button
              onClick={() => onNavigate('ceremony')}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-white/70 px-3 py-2 text-[11px] sm:px-4 sm:text-xs font-medium text-stone-700 shadow-[0_1px_0_rgba(255,255,255,0.9)] transition-all hover:-translate-y-px hover:border-amber-200 hover:bg-white hover:text-amber-950 hover:shadow-sm active:translate-y-0 cursor-pointer whitespace-nowrap"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-200">
                <CalendarDays className="h-3.5 w-3.5" />
              </span>
              Celebration Details
            </button>
            <button
              onClick={() => onNavigate('wishes')}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-amber-50 px-3 py-2 text-[11px] sm:px-4 sm:text-xs font-semibold text-rose-900 shadow-sm transition-all hover:-translate-y-px hover:border-rose-300 hover:shadow-md active:translate-y-0 cursor-pointer whitespace-nowrap"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-100 text-rose-600 transition-transform group-hover:scale-110">
                <MessageCircle className="h-3.5 w-3.5" />
              </span>
              Send Your Wishes
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
