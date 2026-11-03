import React from 'react';
import { X, Camera, Sparkles, Heart } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  slotId: string;
  slotLabel: string;
  theme: ThemeMode;
  imageSrc?: string;
  caption?: string;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  slotId,
  slotLabel,
  theme,
  imageSrc,
  caption
}) => {
  const t = THEMES[theme];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-double border-4 border-amber-400/80 overflow-hidden"
        style={{
          boxShadow: theme === 'magic'
            ? '0 0 45px rgba(139,92,246,0.5), 0 0 20px rgba(217,70,239,0.3)'
            : theme === 'dustyBlue'
            ? '0 0 45px rgba(45,106,159,0.5), 0 0 20px rgba(56,189,248,0.3)'
            : '0 0 45px rgba(226,109,92,0.5), 0 0 20px rgba(245,158,11,0.35)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Camera className="w-4 h-4" />
            <span className="text-xs font-serif uppercase tracking-widest font-semibold">
              Celebration Gallery Showcase
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
            {slotLabel}
          </h3>

          {imageSrc ? (
            <div className="relative w-full max-h-[66vh] rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-lg bg-stone-950/90 flex items-center justify-center">
              <img
                src={imageSrc}
                alt={slotLabel}
                className="max-h-[66vh] w-auto max-w-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50/70 to-orange-50 border-2 border-amber-300/70 flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-inner">
              <div className="w-12 h-12 rounded-full bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-amber-700 shadow-sm">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <h4 className="font-serif text-xl text-stone-900 font-medium">
                {slotLabel}
              </h4>
              <p className="text-xs text-stone-600 font-serif italic max-w-md leading-relaxed">
                {caption || "“Two souls with but a single thought, two hearts that beat as one.”"}
              </p>
            </div>
          )}

          {caption && imageSrc && (
            <p className="text-xs font-serif italic text-stone-600 text-center px-4 leading-relaxed">
              {caption}
            </p>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-full text-white text-xs font-medium tracking-wider uppercase cursor-pointer ${t.accent} ${t.accentHover} shadow-md active:scale-98 transition-all`}
            >
              Close Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
