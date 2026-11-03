import React from 'react';
import { Palette } from 'lucide-react';
import { ThemeMode } from '../types/wedding';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onToggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onToggleTheme
}) => {
  const isDusty = currentTheme === 'dustyBlue';

  return (
    <div className="hidden lg:block fixed top-4 right-4 z-50 select-none">
      <button
        onClick={onToggleTheme}
        className="px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-300/80 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 text-xs font-sans font-medium text-stone-800 hover:bg-white cursor-pointer"
        title="Toggle Color Theme"
      >
        <Palette className="w-4 h-4 text-amber-600" />
        <span>Theme:</span>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-3.5 h-3.5 rounded-full border border-stone-300 transition-transform ${
              !isDusty
                ? 'bg-[#E07A68] scale-110 ring-2 ring-amber-400'
                : 'bg-[#E07A68] opacity-50'
            }`}
            title="Peach Rose"
          />
          <span
            className={`w-3.5 h-3.5 rounded-full border border-stone-300 transition-transform ${
              isDusty
                ? 'bg-[#3D5A73] scale-110 ring-2 ring-sky-400'
                : 'bg-[#3D5A73] opacity-50'
            }`}
            title="Dusty Blue"
          />
        </div>
        <span className="text-[11px] font-mono uppercase text-stone-600">
          {isDusty ? 'Dusty Blue' : 'Peach Rose'}
        </span>
      </button>
    </div>
  );
};
