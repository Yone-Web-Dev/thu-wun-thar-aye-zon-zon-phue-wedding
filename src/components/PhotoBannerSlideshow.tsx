import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Camera, MapPin, Sparkles, Maximize2 } from 'lucide-react';
import { ThemeMode, WeddingSlide } from '../types/wedding';
import { WEDDING_SLIDES, THEMES } from '../utils/weddingData';
import { BotanicalCorner } from './BotanicalAccents';

interface PhotoBannerSlideshowProps {
  theme: ThemeMode;
  onOpenPhotoSlot?: (slotId: string, label: string, imageSrc?: string) => void;
}

export const PhotoBannerSlideshow: React.FC<PhotoBannerSlideshowProps> = ({
  theme,
  onOpenPhotoSlot
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  // Preload all slideshow images in advance to prevent any transition latency
  useEffect(() => {
    WEDDING_SLIDES.forEach((s) => {
      if (s.imageSrc) {
        const img = new Image();
        img.src = s.imageSrc;
      }
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % WEDDING_SLIDES.length);
    }, 3600); // Faster slideshow cadence as requested
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = WEDDING_SLIDES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + WEDDING_SLIDES.length) % WEDDING_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % WEDDING_SLIDES.length);
  };

  const gradientBg = isMagic
    ? 'bg-gradient-to-br from-white via-purple-50/80 to-amber-50/70'
    : isDusty
    ? 'bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70'
    : 'bg-gradient-to-br from-white via-rose-50/90 to-amber-50/80';

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-4 select-none">
      {/* Slideshow Top Header */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800/80 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Featured Photo Slideshow</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-light">
            Moments in Motion
          </h3>
        </div>

        {/* Play / Pause Autoplay toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/80 border border-amber-300/60 hover:bg-white text-stone-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-700" />}
          </button>
        </div>
      </div>

      {/* Main Slideshow Frame with Theme Glowing Border */}
      <div
        className="relative group rounded-3xl overflow-hidden border-double border-4 border-amber-400/80 p-2 sm:p-3 bg-white/90 transition-all duration-500"
        style={{
          boxShadow: isMagic
            ? '0 0 36px rgba(139,92,246,0.45), 0 0 16px rgba(217,70,239,0.3), 0 20px 45px -10px rgba(76,29,149,0.25)'
            : isDusty
            ? '0 0 36px rgba(45,106,159,0.45), 0 0 16px rgba(56,189,248,0.3), 0 20px 45px -10px rgba(44,62,80,0.25)'
            : '0 0 36px rgba(226,109,92,0.45), 0 0 16px rgba(245,158,11,0.35), 0 20px 45px -10px rgba(184,87,71,0.25)'
        }}
      >
        {/* Corner Botanical Badges */}
        <div className="absolute top-0 right-0 w-20 h-20 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="top-right" />
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="bottom-left" />
        </div>

        {/* ================= MOBILE VIEW (< 640px): UNCLUTTERED PHOTO + EDITORIAL PANEL BELOW ================= */}
        <div className="block sm:hidden space-y-3">
          {/* Pristine Photo Viewport with Zero Text Obscuring */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/40 bg-white shadow-md">
            {slide.imageSrc ? (
              <img
                src={slide.imageSrc}
                alt={slide.title}
                key={`mobile-${slide.id}`}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover animate-fade-in will-change-transform"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 via-stone-925 to-stone-950 text-white relative">
                <div className="absolute inset-2 rounded-xl border border-amber-300/30 pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-300/60 shadow-sm flex items-center justify-center text-amber-300 mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-serif text-sm font-medium text-amber-100">{slide.chapter} · {slide.title}</span>
                <span className="text-[11px] font-serif italic text-amber-300/80 mt-1">Photo collection unveiling soon</span>
              </div>
            )}

            {/* Clean Mobile Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 border border-amber-300 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-amber-900" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 border border-amber-300 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-amber-900" />
            </button>

            {/* Quick Full Photo Zoom Icon */}
            <button
              onClick={() => onOpenPhotoSlot?.(slide.slotId, slide.title, slide.imageSrc)}
              className="absolute bottom-2.5 right-2.5 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md text-amber-800 border border-amber-400/60 shadow-md cursor-pointer active:scale-90"
              title="View Full Photo"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dedicated Editorial Text Panel Below Photo - 100% Clear & Legible without covering photo */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5 text-center shadow-xs">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-serif font-semibold text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-amber-200">
                {slide.chapter}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-stone-800">
                {slide.title}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-600 font-sans">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{slide.location}</span>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-stone-700 leading-relaxed px-2">
              &ldquo;{slide.quote}&rdquo;
            </p>

            <div className="pt-1">
              <button
                onClick={() => onOpenPhotoSlot?.(slide.slotId, slide.title, slide.imageSrc)}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-900 bg-white hover:bg-amber-100/60 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs cursor-pointer active:scale-95"
              >
                <Maximize2 className="w-3 h-3 text-amber-700" />
                <span>View High Resolution Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP VIEW (>= 640px): WIDE CINEMATIC PRESENTATION ================= */}
        <div
          className={`hidden sm:flex relative w-full sm:aspect-[16/9] lg:aspect-[21/9] sm:min-h-[440px] rounded-2xl ${
            slide.imageSrc ? gradientBg : 'bg-gradient-to-br from-stone-900 via-stone-925 to-stone-950 text-white'
          } overflow-hidden flex-col justify-between p-5 sm:p-8 border border-amber-500/35 transition-all duration-700`}
        >
          {/* Background Real Photo Image with Smooth Fade */}
          {slide.imageSrc && (
            <div className="absolute inset-0 z-0">
              <img
                src={slide.imageSrc}
                alt={slide.title}
                key={slide.id}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-[center_30%] animate-fade-in transition-transform duration-1000 ease-out group-hover:scale-103 will-change-transform"
                referrerPolicy="no-referrer"
              />
              {/* Luxury legibility gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45 pointer-events-none" />
            </div>
          )}

          {/* Top Info Bar */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/60 text-xs font-serif font-medium text-amber-200 shadow-md">
              <span>{slide.chapter}</span>
              <span className="text-amber-400">·</span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-white">
                {slide.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-sans text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/40 shadow-md">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{slide.location}</span>
            </div>
          </div>

          {/* Center: When no image is present, show placeholder */}
          {!slide.imageSrc && (
            <div className="relative z-10 my-auto text-center space-y-3 max-w-lg mx-auto py-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400/10 border border-amber-300/60 text-amber-300 shadow-inner mx-auto mb-1">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl sm:text-2xl text-amber-100 font-normal tracking-wide">
                  {slide.title}
                </h4>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300/90">
                  {slide.chapter} · Celebration Gallery
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent mx-auto pt-1" />
              </div>
            </div>
          )}

          {/* Bottom Overlay: Romantic Quote */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-300/50">
            <p className="font-serif italic text-sm sm:text-base text-amber-100 text-center sm:text-left max-w-xl drop-shadow-md">
              "{slide.quote}"
            </p>

            <button
              onClick={() => onOpenPhotoSlot?.(slide.slotId, slide.title, slide.imageSrc)}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-900 bg-white/95 hover:bg-white px-3.5 py-1.5 rounded-full border border-amber-300/80 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Maximize2 className="w-3 h-3 text-amber-700" />
              <span>View Full Photo</span>
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-amber-300/60 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-amber-900" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-amber-300/60 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-amber-900" />
          </button>
        </div>

        {/* Slide Indicators / Chapter Dots */}
        <div className="flex items-center justify-center gap-2 py-2 pt-3">
          {WEDDING_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIdx
                  ? 'w-8 bg-amber-500 shadow-2xs'
                  : 'w-2 bg-amber-200 hover:bg-amber-300'
              }`}
              aria-label={`Go to ${s.chapter}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
