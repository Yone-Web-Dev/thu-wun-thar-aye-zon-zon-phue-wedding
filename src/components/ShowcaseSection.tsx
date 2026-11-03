import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Clock, MapPin, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES, TIMELINE_EVENTS } from '../utils/weddingData';
import { PhotoBannerSlideshow } from './PhotoBannerSlideshow';
import { HorizontalPhotoCarousel } from './HorizontalPhotoCarousel';
import { GrandCountdownShowcase } from './GrandCountdownShowcase';
import { GoogleMapEmbed } from './GoogleMapEmbed';
import {
  GildedDivider,
  FloralDamaskTexture,
  FloralVineGarland,
  BackgroundFloralMotif,
  BotanicalCorner,
  ArchFloralCrown,
  LushSideFloralGarland
} from './BotanicalAccents';
import { FlyingLovebirds } from './FlyingLovebirds';

interface ShowcaseSectionProps {
  theme: ThemeMode;
  onProceedToWishes: () => void;
  onOpenPhotoSlot?: (slotId: string, label: string, imageSrc?: string, caption?: string) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  theme,
  onProceedToWishes,
  onOpenPhotoSlot
}) => {
  const t = THEMES[theme];

  // Ref and Framer Motion Scroll hooks for subtle parallax on hero images
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start end', 'end start']
  });
  const heroParallaxY = useTransform(heroScrollYProgress, [0, 1], [-28, 28]);
  const heroScale = useTransform(heroScrollYProgress, [0, 0.5, 1], [0.99, 1.015, 0.99]);

  // Secondary subtle parallax for photo gallery
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScrollYProgress } = useScroll({
    target: galleryContainerRef,
    offset: ['start end', 'end start']
  });
  const galleryParallaxY = useTransform(galleryScrollYProgress, [0, 1], [-18, 18]);

  // Google Calendar Link generator for Nov 8, 2026 11:00 AM SGT (UTC+8)
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Thu+Wun+Thar+%26+Aye+Zon+Zon+Phue&dates=20261108T030000Z/20261108T070000Z&details=Solemnisation+and+Wedding+Reception+at+Holiday+Inn+Singapore+Atrium&location=Holiday+Inn+Singapore+Atrium,+317+Outram+Rd,+Singapore+169075`;

  const mapsUrl = `https://maps.google.com/?q=Holiday+Inn+Singapore+Atrium+317+Outram+Road+Singapore+169075`;

  return (
    <section
      id="wedding-showcase"
      className={`relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-16 ${t.bodyBg} border-t border-amber-300/40 transition-colors duration-500 overflow-hidden`}
    >
      {/* Background Tactile Damask & Lace Floral Watermark Texture across entire section */}
      <FloralDamaskTexture theme={theme} className="opacity-[0.14]" />

      {/* Lush Cascading Side Floral Garlands along Left and Right Page Margins */}
      <div className="absolute top-12 left-0 w-24 sm:w-36 h-[500px] pointer-events-none z-10 opacity-70">
        <LushSideFloralGarland theme={theme} side="left" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-12 right-0 w-24 sm:w-36 h-[500px] pointer-events-none z-10 opacity-70">
        <LushSideFloralGarland theme={theme} side="right" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[55%] left-0 w-24 sm:w-36 h-[460px] pointer-events-none z-10 opacity-60">
        <LushSideFloralGarland theme={theme} side="left" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[55%] right-0 w-24 sm:w-36 h-[460px] pointer-events-none z-10 opacity-60">
        <LushSideFloralGarland theme={theme} side="right" className="w-full h-full object-contain" />
      </div>

      {/* Floating Canvas Botanical Motifs */}
      <BackgroundFloralMotif
        theme={theme}
        className="-top-14 -left-14 sm:-top-20 sm:-left-20 w-72 sm:w-96 h-72 sm:h-96 opacity-45 rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="top-1/4 -right-16 sm:top-1/4 sm:-right-24 w-68 sm:w-88 h-68 sm:h-88 opacity-40 -scale-x-100 -rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="top-2/3 -left-16 sm:top-2/3 sm:-left-24 w-68 sm:w-88 h-68 sm:h-88 opacity-40 rotate-45"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="-bottom-14 -right-14 sm:-bottom-20 sm:-right-20 w-72 sm:w-96 h-72 sm:h-96 opacity-45 scale-x-100 rotate-12"
      />

      {/* Lovebirds flying once across the banner from left to right */}
      <FlyingLovebirds theme={theme} />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Layer 3 Main Section Header - Fade & Lift with Botanical Accents */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto relative"
        >
          {/* Floral Crown atop the title */}
          <ArchFloralCrown theme={theme} className="w-56 sm:w-72 h-auto mx-auto -mb-1 opacity-90 drop-shadow-sm" />

          <p className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-amber-700/90">
            The Grand Celebration Showcase
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-light tracking-tight">
            Ceremony, Memories &amp; Moments
          </h2>
          <p className="text-sm font-serif italic text-stone-600">
            Explore our curated photo showcase, ceremony timeline, and venue location
          </p>
          
          {/* Lavish Horizontal Floral Vine Garland Banner */}
          <FloralVineGarland theme={theme} className="my-3 scale-105" />
          <GildedDivider theme={theme} className="max-w-sm mx-auto" />
        </motion.div>

        {/* 1. Photo Banner Slideshow with Subtle Parallax Scroll Effect */}
        <div id="photo-moments" ref={heroContainerRef} className="relative overflow-hidden py-2 scroll-mt-28">
          <motion.div
            style={{ y: heroParallaxY, scale: heroScale }}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhotoBannerSlideshow theme={theme} onOpenPhotoSlot={onOpenPhotoSlot} />
          </motion.div>
        </div>

        {/* 2. Horizontal Touch & Drag Floating Swipeable Showcase Section */}
        <div ref={galleryContainerRef} className="pt-6 border-t border-amber-200/60">
          <motion.div
            style={{ y: galleryParallaxY }}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <HorizontalPhotoCarousel theme={theme} onOpenPhotoSlot={onOpenPhotoSlot} />
          </motion.div>
        </div>

        {/* 3. The Grand Wedding Countdown Showcase (Third Main Showcase Section with Elevated Visuals) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-amber-200/60"
        >
          <GrandCountdownShowcase
            theme={theme}
            onViewSchedule={() => {
              const el = document.getElementById('ceremony-schedule');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </motion.div>

        {/* 4. Destination & Ceremony Timeline Schedule (Full Width Centered Luxury Presentation) */}
        <motion.div
          id="ceremony-schedule"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto w-full space-y-8 pt-6 border-t border-amber-200/60 scroll-mt-28"
        >
          {/* Header with Botanical Garland */}
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-amber-800 font-semibold">
              The Celebration Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 font-normal">
              Ceremony Itinerary
            </h3>
            <p className="text-xs font-sans text-stone-600 flex items-center justify-center gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Holiday Inn Singapore Atrium · 317 Outram Road, Level 4</span>
            </p>
            <FloralVineGarland theme={theme} className="max-w-xs mx-auto pt-1" />
          </div>

          {/* Glowing Golden Timeline Bar with central node */}
          <div className="relative py-4 px-4 max-w-2xl mx-auto">
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 shadow-sm relative flex items-center justify-between">
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center -ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="w-5 h-5 rounded-full bg-amber-600 border-2 border-white shadow-lg flex items-center justify-center ring-4 ring-amber-300/40">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center -mr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[11px] font-sans text-stone-600 mt-2.5">
              <span className="font-medium text-amber-900">11:00 AM Solemnisation</span>
              <span className="font-semibold text-amber-800 tracking-wider">Sunday, November 08, 2026</span>
              <span className="font-medium text-amber-900">12:00 PM Reception</span>
            </div>
          </div>

          {/* 2-Column Luxury Event Cards Grid with Rich Botanical Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white/95 border-2 border-amber-300/80 shadow-[0_10px_35px_-8px_rgba(212,175,55,0.18)] hover:shadow-xl transition-all relative overflow-hidden group hover:-translate-y-1"
              >
                {/* Botanical Corner Flourishes on Event Cards */}
                <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-80 z-20">
                  <BotanicalCorner theme={theme} position="top-right" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-14 h-14 pointer-events-none opacity-60 z-20">
                  <BotanicalCorner theme={theme} position="bottom-left" />
                </div>

                {/* Subtle Floral Watermark Background inside Event Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-rose-50/30 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
                      <Clock className="w-3 h-3 text-amber-700" />
                      <span>{event.time}</span>
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      {event.level}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-serif text-stone-900 font-semibold tracking-tight">
                    {event.title}
                  </h4>

                  <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{event.location} · {event.room}</span>
                  </p>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed pt-1 border-t border-amber-100">
                    {event.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons: Add to Calendar & Google Maps */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-5 rounded-2xl border-2 border-amber-300/80 bg-white/90 hover:bg-white text-stone-800 hover:text-amber-900 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-5 rounded-2xl border-2 border-amber-300/80 bg-white/90 hover:bg-white text-stone-800 hover:text-amber-900 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </motion.div>

        {/* 4. Google Map with Luxury Double Gold Keyline Border - Fade & Lift */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 border-t border-amber-200/60"
        >
          <GoogleMapEmbed theme={theme} />
        </motion.div>

        {/* Scroll Nudge to Live Wishes & Guestbook */}
        <div className="pt-8 border-t border-amber-200/60 flex justify-center">
          <div className="relative group w-full max-w-lg">
            {/* Ambient Breathing Halo */}
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
              onClick={onProceedToWishes}
              className={`relative w-full py-4 sm:py-4.5 px-5 sm:px-8 rounded-full border-2 border-amber-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.25),0_0_22px_rgba(245,158,11,0.25)] overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                theme === 'magic'
                  ? 'bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-800'
                  : theme === 'dustyBlue'
                  ? 'bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 hover:from-slate-800 hover:to-sky-700'
                  : 'bg-gradient-to-r from-[#9E3929] via-[#D45D4B] to-[#9E3929] hover:from-[#B54432] hover:to-[#B54432]'
              }`}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Inner Keylines */}
              <div className="absolute inset-1 rounded-full border border-amber-200/50 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-white/60 shadow-md flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-4 h-4 text-amber-950 fill-amber-950/20" />
                </div>

                <div className="flex-1 text-center space-y-0.5">
                  <p className="font-serif text-base sm:text-lg text-white font-medium tracking-wide drop-shadow-md">
                    Sign the Royal Guestbook &amp; Send Wishes
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-amber-200/90 font-medium">
                    Share Your Loving Words &amp; Blessings
                  </p>
                </div>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-xs border border-amber-300/60 shadow-inner flex items-center justify-center shrink-0 text-amber-200 group-hover:bg-white/25 group-hover:translate-y-0.5 transition-all">
                  <ChevronDown className="w-4 h-4 text-amber-200" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
