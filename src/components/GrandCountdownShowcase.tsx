import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, ExternalLink, Heart } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES, getTimeUntilWedding } from '../utils/weddingData';
import { BotanicalCorner, GildedDivider } from './BotanicalAccents';

interface GrandCountdownShowcaseProps {
  theme: ThemeMode;
  onViewSchedule?: () => void;
}

export const GrandCountdownShowcase: React.FC<GrandCountdownShowcaseProps> = ({
  theme,
  onViewSchedule
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilWedding());
  const [isCopied, setIsCopied] = useState(false);

  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilWedding());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Google Calendar URL for Sun, Nov 8, 2026, 11:00 AM - 3:00 PM SGT
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Thu+Wun+Thar+%26+Aye+Zon+Zon+Phue&dates=20261108T030000Z/20261108T070000Z&details=Solemnisation+and+Wedding+Reception+celebration+of+Thu+Wun+Thar+and+Aye+Zon+Zon+Phue+at+Holiday+Inn+Singapore+Atrium.&location=Holiday+Inn+Singapore+Atrium,+317+Outram+Rd,+Singapore+169075`;

  // Dynamic iCal (.ics) generator & download
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Thu Wun Thar & Aye Zon Zon Phue Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-thu-wun-thar-aye-zon-zon-phue-2026@wedding.singapore',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261108T030000Z',
      'DTEND:20261108T070000Z',
      'SUMMARY:Wedding of Thu Wun Thar & Aye Zon Zon Phue',
      'DESCRIPTION:Solemnisation ceremony & Wedding Reception banquet at Holiday Inn Singapore Atrium.',
      'LOCATION:Holiday Inn Singapore Atrium, 317 Outram Rd, Singapore 169075',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-thu-wun-thar-aye-zon-zon-phue.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const timeCards = [
    { label: 'Days', value: timeLeft.days, roman: 'DIES' },
    { label: 'Hours', value: timeLeft.hours, roman: 'HORAE' },
    { label: 'Minutes', value: timeLeft.minutes, roman: 'MINUTA' },
    { label: 'Seconds', value: timeLeft.seconds, roman: 'SECUNDA' }
  ];

  const themeGlow = isMagic
    ? '0 0 45px rgba(139,92,246,0.28), 0 0 20px rgba(217,70,239,0.2), 0 25px 60px -12px rgba(76,29,149,0.22)'
    : isDusty
    ? '0 0 45px rgba(45,106,159,0.28), 0 0 20px rgba(56,189,248,0.2), 0 25px 60px -12px rgba(44,62,80,0.22)'
    : '0 0 45px rgba(226,109,92,0.28), 0 0 20px rgba(245,158,11,0.22), 0 25px 60px -12px rgba(184,87,71,0.22)';

  return (
    <section
      id="grand-countdown-section"
      className="relative w-full max-w-5xl mx-auto space-y-8 select-none py-4"
    >
      {/* Section Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 border border-amber-300 text-amber-900 text-xs font-mono font-medium shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
          <span>The Royal Countdown</span>
          <span className="text-amber-500">·</span>
          <span className="font-sans font-semibold">Save The Date</span>
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-light tracking-tight">
          Counting Down to Forever
        </h3>

        <p className="text-sm font-serif italic text-stone-600">
          Until Thu Wun Thar &amp; Aye Zon Zon Phue exchange sacred vows and ring of eternity
        </p>

        <GildedDivider theme={theme} className="max-w-xs mx-auto" />
      </div>

      {/* Main Luxury Countdown Showcase Card */}
      <div
        className="relative rounded-3xl bg-white/95 border-double border-4 border-amber-400/85 p-6 sm:p-10 text-center overflow-hidden transition-all duration-500"
        style={{ boxShadow: themeGlow }}
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[180px] sm:text-[240px] font-bold text-amber-500/[0.03] select-none pointer-events-none tracking-widest">
          MMXXVI
        </div>

        {/* Botanical Gold Corners */}
        <div className="absolute top-0 right-0 w-24 h-24 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="top-right" />
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="bottom-left" />
        </div>

        {/* Inner Fine Gold Keyline */}
        <div className="absolute inset-3 rounded-2xl border border-amber-500/25 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Couple Monogram & Ceremony Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/80 shadow-2xs">
            <Heart className="w-4 h-4 text-amber-700 fill-amber-700 animate-pulse" />
            <span className="font-serif text-xs sm:text-sm font-medium text-amber-950 tracking-wider">
              Sunday, November 08, 2026 · 11:00 AM SGT
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="hidden sm:inline-block font-sans text-xs text-amber-800">
              Singapore
            </span>
          </div>

          {/* Four Monumental Time Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {timeCards.map((card) => (
              <div
                key={card.label}
                className="relative group p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-white via-amber-50/50 to-white border-2 border-amber-300/80 shadow-[0_8px_25px_-5px_rgba(212,175,55,0.15)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Corner Mini Accent */}
                <div className="absolute top-1.5 right-2 text-[9px] font-mono text-amber-600/70 tracking-widest font-semibold">
                  {card.roman}
                </div>

                {/* Animated Number Block */}
                <div className="relative h-14 sm:h-20 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={card.value}
                      initial={{ y: -20, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 20, opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring' as const, stiffness: 350, damping: 25 }}
                      className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 tabular-nums tracking-tight leading-none"
                    >
                      {String(card.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Card Label & Divider */}
                <div className="mt-2 pt-2 border-t border-amber-200/70 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase font-bold text-amber-900">
                    {card.label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Ceremony Venue & Destination Details */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-amber-300 shadow-2xs text-amber-700 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-0.5">
                <h5 className="font-serif text-sm sm:text-base font-semibold text-stone-900">
                  Holiday Inn Singapore Atrium
                </h5>
                <p className="text-xs font-sans text-stone-600">
                  Level 4 Ballrooms · 317 Outram Road, Singapore 169075
                </p>
                <p className="text-[11px] font-mono text-amber-800">
                  Solemnisation (Changi 3) · Reception Banquet (Changi 1 &amp; 2)
                </p>
              </div>
            </div>

            {onViewSchedule && (
              <button
                onClick={onViewSchedule}
                className="shrink-0 text-xs font-sans font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-4 cursor-pointer"
              >
                View Full Itinerary ↓
              </button>
            )}
          </div>

          {/* Calendar Actions: Google Calendar & iCal Download */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <Calendar className="w-4 h-4 text-amber-100" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
            </a>

            <button
              onClick={handleDownloadICS}
              className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-white hover:bg-amber-50/80 text-stone-800 border-2 border-amber-300/80 font-medium text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>{isCopied ? 'iCal Calendar Saved!' : 'Download Apple iCal (.ics)'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
