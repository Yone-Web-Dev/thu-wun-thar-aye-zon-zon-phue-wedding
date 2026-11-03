import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, MoveHorizontal, Eye } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';

export interface CarouselItem {
  slotId: string;
  chapter: string;
  roman: string;
  tag: string;
  title: string;
  subtitle: string;
  caption: string;
  location: string;
  imageSrc?: string;
}

// Couple photos only, arranged across a responsive 2-line layout (auto columns × 2 rows)
export const CAROUSEL_CARDS: CarouselItem[] = [
  {
    slotId: 'SLOT-HERO-07',
    chapter: 'Chapter I',
    roman: 'I',
    tag: 'Chapter I · Sacred Rings',
    title: 'Gold Wedding Bands',
    subtitle: 'Hands entwined with matching gold wedding bands and tender smiles of devotion',
    caption: '"With this sacred ring, I give you my whole heart, my quiet shelter, and my forever."',
    location: 'Solemnisation Vows · Singapore',
    imageSrc: '/assets/gallery/hero7.webp'
  },
  {
    slotId: 'SLOT-HERO-08',
    chapter: 'Chapter II',
    roman: 'II',
    tag: 'Chapter II · Twilight Romance',
    title: 'City Lights Serenade',
    subtitle: 'Beside the vintage yellow convertible under warm golden pillars and evening city glow',
    caption: '"Under the twilight glow, every path of life led me home to you."',
    location: 'Classic Convertible · Promenade',
    imageSrc: '/assets/gallery/hero8.webp'
  },
  {
    slotId: 'SLOT-HERO-09',
    chapter: 'Chapter III',
    roman: 'III',
    tag: 'Chapter III · Sacred Kiss',
    title: 'Cathedral of Devotion',
    subtitle: 'Formal tuxedo & dramatic crimson gown beneath grand stone spires and vaulted arches',
    caption: '"In the stillness of the cathedral, two hearts beat as one eternal rhythm."',
    location: 'Cathedral Spire · Sacred Devotion',
    imageSrc: '/assets/gallery/hero9.webp'
  },
  {
    slotId: 'SLOT-HERO-10',
    chapter: 'Chapter IV',
    roman: 'IV',
    tag: 'Chapter IV · Royal Crimson',
    title: 'Cathedral Crimson Elegance',
    subtitle: 'Ascending ancient cathedral stone stairs with sweeping royal train and gilded crown',
    caption: '"Ascending together towards a lifetime of boundless love, grace, and honor."',
    location: 'Cathedral Steps · Royal Crimson',
    imageSrc: '/assets/gallery/hero10.webp'
  },
  {
    slotId: 'SLOT-HERO-12',
    chapter: 'Chapter V',
    roman: 'V',
    tag: 'Chapter V · Woodland Haven',
    title: 'Ethereal Forest Sanctuary',
    subtitle: 'Surrounded by mystical pine trees and morning fog in timeless white bridal lace',
    caption: '"Walking quietly through the misty pines, hand in hand for all the days to come."',
    location: 'Pine Sanctuary · Morning Mist',
    imageSrc: '/assets/gallery/hero12.webp'
  },
  {
    slotId: 'SLOT-HERO-01',
    chapter: 'Chapter VI',
    roman: 'VI',
    tag: 'Chapter VI · First Light',
    title: 'Golden Morning Glow',
    subtitle: 'A tender embrace bathed in the soft warmth of golden morning light',
    caption: '"Every sunrise reminds me that a new day with you is the greatest gift."',
    location: 'Golden Hour · Dawn Serenade',
    imageSrc: '/assets/gallery/hero1.webp'
  },
  {
    slotId: 'SLOT-HERO-04',
    chapter: 'Chapter VII',
    roman: 'VII',
    tag: 'Chapter VII · Garden of Love',
    title: 'Blooming Together',
    subtitle: 'Surrounded by lush blooms, a love that flourishes with every passing season',
    caption: '"Like flowers reaching for the sun, my heart reaches endlessly for yours."',
    location: 'Secret Garden · Eternal Bloom',
    imageSrc: '/assets/gallery/hero4.webp'
  },
  {
    slotId: 'SLOT-HERO-05',
    chapter: 'Chapter VIII',
    roman: 'VIII',
    tag: 'Chapter VIII · Gentle Promise',
    title: 'A Whispered Vow',
    subtitle: 'Soft glances and quiet promises shared in the stillness of a perfect moment',
    caption: '"In the quiet between heartbeats, I found the answer — always you."',
    location: 'Serene Meadow · Gentle Light',
    imageSrc: '/assets/gallery/hero5.webp'
  },
  {
    slotId: 'SLOT-HERO-14',
    chapter: 'Chapter IX',
    roman: 'IX',
    tag: 'Chapter IX · Timeless Elegance',
    title: 'Portrait of Grace',
    subtitle: 'Poised and radiant, a portrait of timeless love and effortless elegance',
    caption: '"Elegance is not about being noticed, it is about being remembered."',
    location: 'Grand Estate · Timeless Portraits',
    imageSrc: '/assets/gallery/hero14.webp'
  },
  {
    slotId: 'SLOT-HERO-16',
    chapter: 'Chapter X',
    roman: 'X',
    tag: 'Chapter X · Enchanted Dusk',
    title: 'Twilight Whispers',
    subtitle: 'Hand in hand as the sky blushes crimson and golden hues of dusk embrace the horizon',
    caption: '"At dusk, when the world quiets down, your laughter is the sweetest sound."',
    location: 'Sunset Terrace · Dusk Romance',
    imageSrc: '/assets/gallery/hero16.webp'
  },
  {
    slotId: 'SLOT-HERO-18',
    chapter: 'Chapter XI',
    roman: 'XI',
    tag: 'Chapter XI · Sacred Bond',
    title: 'Intertwined Hearts',
    subtitle: 'Two hearts bound by a love that transcends time and every earthly journey',
    caption: '"Our love is not a destination but a beautiful journey we walk together."',
    location: 'Chapel · Sacred Ceremony',
    imageSrc: '/assets/gallery/hero18.webp'
  },
  {
    slotId: 'SLOT-HERO-19',
    chapter: 'Chapter XII',
    roman: 'XII',
    tag: 'Chapter XII · Joyful Union',
    title: 'Shared Laughter',
    subtitle: 'Laughter echoing through the air, celebrating the joy of being together',
    caption: '"Happiness is finding someone whose laugh makes your heart sing along."',
    location: 'Celebration Hall · Joyful Moments',
    imageSrc: '/assets/gallery/hero19.webp'
  },
  {
    slotId: 'SLOT-HERO-20',
    chapter: 'Chapter XIII',
    roman: 'XIII',
    tag: 'Chapter XIII · Starlit Vows',
    title: 'Under the Stars',
    subtitle: 'Beneath a canopy of stars, two souls pledge their eternity to one another',
    caption: '"Under the vast expanse of stars, our love is the brightest constellation."',
    location: 'Night Sky · Starlit Ceremony',
    imageSrc: '/assets/gallery/hero20.webp'
  },
  {
    slotId: 'SLOT-HERO-21',
    chapter: 'Chapter XIV',
    roman: 'XIV',
    tag: 'Chapter XIV · Tender Embrace',
    title: 'Arms of Forever',
    subtitle: "Wrapped in each other's arms, finding the only home that truly matters",
    caption: '"Home is not a place, it is a person — and you are my forever home."',
    location: 'Romantic Retreat · Tender Moments',
    imageSrc: '/assets/gallery/hero21.webp'
  },
  {
    slotId: 'SLOT-HERO-22',
    chapter: 'Chapter XV',
    roman: 'XV',
    tag: 'Chapter XV · Radiant Joy',
    title: 'Luminous Celebration',
    subtitle: 'Radiant smiles and glowing hearts marking the beginning of their forever',
    caption: '"Joy is not in things, it is in us — and together, we are overflowing."',
    location: 'Grand Ballroom · Celebration Night',
    imageSrc: '/assets/gallery/hero22.webp'
  }
];

interface HorizontalPhotoCarouselProps {
  theme: ThemeMode;
  onOpenPhotoSlot?: (slotId: string, label: string, imageSrc?: string, caption?: string) => void;
}

export const HorizontalPhotoCarousel: React.FC<HorizontalPhotoCarouselProps> = ({
  theme,
  onOpenPhotoSlot
}) => {
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Mouse Drag-To-Scroll state for desktop clicking & dragging sideways
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const totalColumns = Math.ceil(CAROUSEL_CARDS.length / 2); // auto columns across 2 rows

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      setHasDragged(false);
    }, 120);
  };

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);

      const colWidth = scrollWidth / totalColumns;
      const currentCol = Math.min(totalColumns - 1, Math.max(0, Math.round(scrollLeft / colWidth)));
      setCurrentColumnIndex(currentCol);
    }
  };

  const scrollToColumn = (colIdx: number) => {
    if (!scrollRef.current) return;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const targetScroll = (colIdx / (totalColumns - 1)) * maxScroll;
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    setCurrentColumnIndex(colIdx);
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = Math.max(260, containerWidth * 0.7);
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = Math.max(260, containerWidth * 0.7);
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const themeGlow = isMagic
    ? '0 0 25px rgba(139,92,246,0.2), 0 10px 25px -5px rgba(76,29,149,0.18)'
    : isDusty
    ? '0 0 25px rgba(45,106,159,0.2), 0 10px 25px -5px rgba(44,62,80,0.18)'
    : '0 0 25px rgba(226,109,92,0.2), 0 10px 25px -5px rgba(184,87,71,0.18)';

  return (
    <div className="w-full space-y-5 select-none overflow-hidden py-3">
      {/* Carousel Top Header & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase font-sans tracking-widest text-amber-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Floating Gallery Showcase</span>
            </span>
            <span className="text-amber-400">·</span>
            <span className="text-[11px] font-mono font-medium text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300/60 shadow-2xs">
              2 Lines · 15 Curated Chapters
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
            Swipeable Floating Moments
          </h3>

          <p className="text-xs font-sans text-stone-500 flex items-center gap-1.5">
            <MoveHorizontal className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
            <span>Swipe horizontally on mobile or drag sideways on PC to explore the curated chapters</span>
          </p>
        </div>

        {/* Circular Gold Navigation Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border-2 border-amber-300 shadow-md hover:shadow-lg flex items-center justify-center text-stone-800 hover:text-amber-900 hover:bg-white transition-all cursor-pointer active:scale-95 group"
            aria-label="Scroll left in gallery"
            title="Previous moments"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border-2 border-amber-300 shadow-md hover:shadow-lg flex items-center justify-center text-stone-800 hover:text-amber-900 hover:bg-white transition-all cursor-pointer active:scale-95 group"
            aria-label="Scroll right in gallery"
            title="Next moments"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2-Line Responsive Swipeable Grid Track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onScroll={updateScrollState}
        className={`grid grid-rows-2 grid-flow-col gap-4 sm:gap-5 auto-cols-[280px] xs:auto-cols-[305px] sm:auto-cols-[335px] md:auto-cols-[355px] lg:auto-cols-[385px] overflow-x-auto scroll-smooth py-4 px-2 sm:px-4 no-scrollbar ${
          isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        style={{
          gridTemplateRows: 'repeat(2, minmax(0, auto))',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {CAROUSEL_CARDS.map((card) => {
          const hasImage = Boolean(card.imageSrc && !failedImages[card.slotId]);

          return (
            <div
              key={card.slotId}
              className="relative shrink-0 group h-full"
            >
              {/* Floating Contact Shadow beneath the card */}
              <div className="absolute -bottom-2 left-4 right-4 h-3 bg-black/15 rounded-full blur-sm pointer-events-none transition-all duration-500 group-hover:scale-95 group-hover:opacity-40" />

              <div
                onClick={() => {
                  if (!hasDragged) {
                    onOpenPhotoSlot?.(card.slotId, card.title, hasImage ? card.imageSrc : undefined, card.caption);
                  }
                }}
                className="w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 bg-white/95 backdrop-blur-md border border-amber-300/80 hover:border-amber-400 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                style={{
                  boxShadow: themeGlow
                }}
              >
                {/* Top Badge Tag & Enlarge Action */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-50/90 text-amber-900 border border-amber-200/80 font-semibold shadow-2xs truncate max-w-[80%]">
                    {card.tag}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPhotoSlot?.(card.slotId, card.title, hasImage ? card.imageSrc : undefined, card.caption);
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-amber-800 hover:bg-amber-100/60 transition-colors cursor-pointer"
                    title="Enlarge Photo"
                    aria-label={`Enlarge ${card.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Main Visual Area */}
                {hasImage ? (
                  // Real Photo Frame with Zoom & Gilded Double Keyline
                  <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl border-2 border-amber-300/80 bg-stone-900 overflow-hidden shadow-inner">
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      loading="lazy"
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [card.slotId]: true }));
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Gilded Double Keyline Overlay */}
                    <div className="absolute inset-1.5 rounded-lg sm:rounded-xl border border-white/40 pointer-events-none" />

                    {/* Quick Expand Button on Hover */}
                    <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ) : (
                  // Elegant Architectural Mat Card with Royal Roman Numeral Badge
                  <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl border-2 border-amber-300/70 bg-gradient-to-br from-amber-50/70 via-rose-50/40 to-amber-100/50 flex flex-col items-center justify-center p-3 text-center transition-all group-hover:border-amber-400 overflow-hidden shadow-inner">
                    <div className="absolute inset-1.5 rounded-lg sm:rounded-xl border border-amber-200/50 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center justify-center gap-1 select-none">
                      <div className="w-9 h-9 rounded-full bg-white/95 border border-amber-300/80 shadow-2xs flex items-center justify-center font-serif text-sm font-semibold text-amber-800 group-hover:scale-105 transition-transform">
                        {card.roman}
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-amber-800/90 font-semibold">
                        {card.chapter}
                      </span>
                      <span className="text-[11px] font-serif text-stone-600 italic px-2 line-clamp-1">
                        {card.location}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Editorial Caption, Title & Poetic Quote */}
                <div className="mt-3 pt-2.5 border-t border-amber-100/90 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-sm sm:text-base text-stone-900 font-medium leading-snug truncate">
                      {card.title}
                    </h4>
                    <span className="text-[10px] font-mono text-amber-700/80 shrink-0">
                      {card.chapter}
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-stone-600 line-clamp-1 leading-relaxed">
                    {card.subtitle}
                  </p>

                  <p className="text-[11px] font-serif italic text-amber-900/85 line-clamp-2 leading-relaxed pt-0.5">
                    {card.caption}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Gilded Navigation: Interactive Progress Bar & Column Dots */}
      <div className="flex flex-col items-center gap-2 pt-1 px-4 max-w-md mx-auto">
        {/* Visual Gilded Progress Bar */}
        <div className="w-full h-1.5 bg-amber-200/50 rounded-full overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isMagic
                ? 'bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-600'
                : isDusty
                ? 'bg-gradient-to-r from-sky-600 via-blue-400 to-sky-700'
                : 'bg-gradient-to-r from-amber-500 via-[#E26D5C] to-amber-600'
            }`}
            style={{ width: `${Math.max(25, scrollProgress)}%` }}
          />
        </div>

        {/* Column Navigation Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: totalColumns }).map((_, colIdx) => (
            <button
              key={colIdx}
              onClick={() => scrollToColumn(colIdx)}
              className={`transition-all rounded-full cursor-pointer ${
                colIdx === currentColumnIndex
                  ? `w-6 h-1.5 ${t.accent}`
                  : 'w-1.5 h-1.5 bg-amber-200 hover:bg-amber-300'
              }`}
              aria-label={`Go to photo column ${colIdx + 1}`}
              title={`Column ${colIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
