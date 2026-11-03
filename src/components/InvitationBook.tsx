import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, RotateCw, ZoomIn, ChevronRight, ChevronLeft } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';
import { BotanicalCorner } from './BotanicalAccents';

interface InvitationBookProps {
  theme: ThemeMode;
  guestName: string;
  onOpenZoom?: (imageSrc: string, title: string) => void;
}

export const InvitationBook: React.FC<InvitationBookProps> = ({
  theme,
  guestName,
  onOpenZoom
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobilePage, setActiveMobilePage] = useState<1 | 2>(1);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  // Automatically trigger the book flip open when visitors enter the second section
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const page1Src = '/assets/aistudio/image_735967df.png';
  const page2Src = '/assets/aistudio/image_6f74bcea.png';

  const themeGlowStyle = isMagic
    ? 'shadow-[0_0_35px_rgba(139,92,246,0.5),_0_0_15px_rgba(217,70,239,0.35),_0_20px_45px_-10px_rgba(76,29,149,0.35)]'
    : isDusty
    ? 'shadow-[0_0_35px_rgba(45,106,159,0.45),_0_0_15px_rgba(56,189,248,0.3),_0_20px_45px_-10px_rgba(44,62,80,0.3)]'
    : 'shadow-[0_0_35px_rgba(226,109,92,0.45),_0_0_15px_rgba(245,158,11,0.35),_0_20px_45px_-10px_rgba(184,87,71,0.3)]';

  const goldCoverBorder = 'border-4 border-double border-amber-400/90';

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-2 sm:px-4 select-none">
      {/* Lightbox for zooming on invitation letter pages */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[92vh] flex flex-col items-center">
            <img
              src={zoomedImage.src}
              alt={zoomedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border-4 border-amber-300/80 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <p className="mt-3 text-xs sm:text-sm font-serif text-amber-200 tracking-wider">
              {zoomedImage.title} · Click anywhere to close
            </p>
          </div>
        </div>
      )}

      {/* Ambient Pulsing Glow Aura behind Book */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-70 blur-2xl pointer-events-none transition-all duration-700 animate-pulse"
        style={{
          background: isMagic
            ? 'radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, rgba(217,70,239,0.2) 50%, transparent 75%)'
            : isDusty
            ? 'radial-gradient(ellipse at center, rgba(45,106,159,0.35) 0%, rgba(56,189,248,0.18) 50%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(226,109,92,0.35) 0%, rgba(245,158,11,0.2) 50%, transparent 75%)'
        }}
      />

      {/* Book Actions Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span className="text-xs uppercase font-sans tracking-widest text-amber-800 font-semibold">
            {isOpen ? 'Royal Invitation Folio (Opened)' : 'Royal Invitation Folio'}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-100/80 text-[10px] font-mono text-amber-900 border border-amber-300/60">
            Foil-Pressed Edition
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-amber-900 text-xs font-medium border border-amber-300/70 shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            title={isOpen ? 'Fold book closed' : 'Unfold book open'}
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-600" />
            <span>{isOpen ? 'Close Folio' : 'Flip Open Book'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Page Switcher Tabs (Only when folio is open) */}
      {isOpen && (
        <div className="flex sm:hidden items-center justify-center gap-2 mb-3">
          <button
            onClick={() => setActiveMobilePage(1)}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
              activeMobilePage === 1
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'bg-white/80 text-stone-600 border border-amber-200'
            }`}
          >
            Page I: Invitation
          </button>
          <button
            onClick={() => setActiveMobilePage(2)}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
              activeMobilePage === 2
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'bg-white/80 text-stone-600 border border-amber-200'
            }`}
          >
            Page II: Schedule
          </button>
        </div>
      )}

      {/* 3D Book Container with Realistic Perspective */}
      <div
        className="relative w-full rounded-3xl"
        style={{ perspective: '1600px' }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ================= CLOSED BOOK COVER ================= */
            <motion.div
              key="closed-book"
              initial={{ opacity: 0, rotateY: -35 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -85 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(true)}
              className={`w-full max-w-md mx-auto aspect-[4/5] sm:aspect-[3/4] rounded-2xl ${
                isMagic
                  ? 'bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#3B0764]'
                  : isDusty
                  ? 'bg-gradient-to-br from-[#1E3A5F] via-[#2A4D77] to-[#162C46]'
                  : 'bg-gradient-to-br from-[#7C2D37] via-[#943845] to-[#5C1E26]'
              } text-white p-6 sm:p-10 flex flex-col justify-between items-center text-center relative overflow-hidden cursor-pointer ${themeGlowStyle} ${goldCoverBorder} group transition-all duration-300 hover:scale-[1.01]`}
            >
              {/* Corner Botanical Badges */}
              <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none opacity-80">
                <BotanicalCorner theme={theme} position="top-right" />
              </div>
              <div className="absolute bottom-2 left-2 w-16 h-16 pointer-events-none opacity-80">
                <BotanicalCorner theme={theme} position="bottom-left" />
              </div>

              {/* Gold Embossed Frame Border */}
              <div className="absolute inset-3 rounded-xl border border-amber-300/40 pointer-events-none" />
              <div className="absolute inset-4 rounded-lg border border-amber-300/20 pointer-events-none" />

              {/* Book Spine Simulation on Left */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

              {/* Top Crest */}
              <div className="relative z-10 pt-2 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-[10px] tracking-widest uppercase font-mono">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Royal Wedding Summons</span>
                </div>
                <p className="text-xs font-serif tracking-[0.25em] text-amber-200/80 uppercase pt-2">
                  Thu Wun Thar &amp; Aye Zon Zon Phue
                </p>
              </div>

              {/* Center Gilded Seal & Monogram */}
              <div className="relative z-10 my-auto flex flex-col items-center gap-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] flex flex-col items-center justify-center border border-amber-200/60 shadow-inner">
                    <span className="font-royal text-2xl sm:text-3xl text-amber-300 tracking-wider">
                      T&amp;A
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-amber-200/80 uppercase">
                      2026
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <h3 className="font-royal text-xl sm:text-2xl text-amber-100 font-normal tracking-wide">
                    Wedding Invitation
                  </h3>
                  <p className="text-xs font-serif italic text-amber-200/70">
                    Specially prepared for {guestName || 'Honoured Guest & Family'}
                  </p>
                </div>
              </div>

              {/* Bottom Tap Instruction */}
              <div className="relative z-10 pb-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/50 text-amber-100 text-xs font-sans tracking-wide transition-all group-hover:shadow-lg">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tap to Flip Open Invitation Book</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ) : (
            /* ================= OPENED BOOK (TWO-PAGE SPREAD) ================= */
            <motion.div
              key="open-book"
              initial={{ opacity: 0, scale: 0.94, rotateX: 6 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-200/90 ${themeGlowStyle} ${goldCoverBorder} relative`}
            >
              {/* Central Spine Shading & Ribbon Bookmark */}
              <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-stone-900/15 via-black/25 to-stone-900/15 z-30 pointer-events-none rounded-sm shadow-inner" />
              
              {/* Decorative Satin Ribbon Bookmark Hanging Down */}
              <div
                className={`hidden sm:block absolute left-1/2 -top-2 w-4 h-24 -translate-x-1/2 z-40 pointer-events-none rounded-b-md shadow-md ${
                  isMagic
                    ? 'bg-gradient-to-b from-purple-700 via-violet-600 to-indigo-800'
                    : isDusty
                    ? 'bg-gradient-to-b from-sky-700 via-blue-600 to-sky-800'
                    : 'bg-gradient-to-b from-rose-700 via-rose-600 to-amber-700'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)'
                }}
              />

              {/* Book Pages Grid: Two side-by-side pages on desktop; single active page on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-20">
                {/* PAGE 1 (LEFT PAGE): Formal Invitation Letter */}
                <div
                  className={`relative rounded-2xl overflow-hidden bg-white p-2 sm:p-3 border-2 border-amber-300/80 shadow-md group transition-all duration-300 hover:shadow-xl ${
                    activeMobilePage === 2 ? 'hidden sm:block' : 'block'
                  }`}
                  style={{
                    boxShadow: isDusty
                      ? '0 0 20px rgba(45,106,159,0.3), inset 0 0 10px rgba(245,158,11,0.2)'
                      : '0 0 20px rgba(226,109,92,0.3), inset 0 0 10px rgba(245,158,11,0.2)'
                  }}
                >
                  {/* Subtle Page Gutter Shadow on Right Side (Spine side) */}
                  <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/15 to-transparent pointer-events-none z-10" />

                  {/* Golden Double Inner Keyline */}
                  <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-amber-400/40 pointer-events-none z-10" />

                  {/* Page 1 Header Tab */}
                  <div className="flex items-center justify-between pb-1.5 px-2 text-[11px] font-mono text-amber-800/80 border-b border-amber-200/60">
                    <span className="font-serif italic font-semibold">Page I · The Formal Invitation</span>
                    <button
                      onClick={() => setZoomedImage({ src: page1Src, title: 'Wedding Invitation Letter - Page 1' })}
                      className="inline-flex items-center gap-1 text-[10px] text-amber-700 hover:text-amber-950 font-sans cursor-pointer"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>Zoom</span>
                    </button>
                  </div>

                  {/* Image Display */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden rounded-lg mt-1 cursor-zoom-in"
                    onClick={() => setZoomedImage({ src: page1Src, title: 'Wedding Invitation Letter - Page 1' })}
                  >
                    <img
                      src={page1Src}
                      alt="Thu Wun Thar & Aye Zon Zon Phue Wedding Invitation Letter"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    {/* Soft Radiant Hover Vignette */}
                    <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors pointer-events-none" />
                  </div>
                </div>

                {/* PAGE 2 (RIGHT PAGE): Ceremony Schedule & Monogram Details */}
                <div
                  className={`relative rounded-2xl overflow-hidden bg-white p-2 sm:p-3 border-2 border-amber-300/80 shadow-md group transition-all duration-300 hover:shadow-xl ${
                    activeMobilePage === 1 ? 'hidden sm:block' : 'block'
                  }`}
                  style={{
                    boxShadow: isDusty
                      ? '0 0 20px rgba(45,106,159,0.3), inset 0 0 10px rgba(245,158,11,0.2)'
                      : '0 0 20px rgba(226,109,92,0.3), inset 0 0 10px rgba(245,158,11,0.2)'
                  }}
                >
                  {/* Subtle Page Gutter Shadow on Left Side (Spine side) */}
                  <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-10" />

                  {/* Golden Double Inner Keyline */}
                  <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-amber-400/40 pointer-events-none z-10" />

                  {/* Page 2 Header Tab */}
                  <div className="flex items-center justify-between pb-1.5 px-2 text-[11px] font-mono text-amber-800/80 border-b border-amber-200/60">
                    <span className="font-serif italic font-semibold">Page II · Program &amp; Venues</span>
                    <button
                      onClick={() => setZoomedImage({ src: page2Src, title: 'Wedding Ceremony Schedule - Page 2' })}
                      className="inline-flex items-center gap-1 text-[10px] text-amber-700 hover:text-amber-950 font-sans cursor-pointer"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>Zoom</span>
                    </button>
                  </div>

                  {/* Image Display */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden rounded-lg mt-1 cursor-zoom-in"
                    onClick={() => setZoomedImage({ src: page2Src, title: 'Wedding Ceremony Schedule - Page 2' })}
                  >
                    <img
                      src={page2Src}
                      alt="Wedding Program Solemnisation and Reception Schedule"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    {/* Soft Radiant Hover Vignette */}
                    <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Bottom Folio Gold Footer Notice */}
              <div className="mt-3 pt-2 text-center text-xs font-serif italic text-stone-600 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Original Foil Letterpress Invitation Card · Holiday Inn Singapore Atrium</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
