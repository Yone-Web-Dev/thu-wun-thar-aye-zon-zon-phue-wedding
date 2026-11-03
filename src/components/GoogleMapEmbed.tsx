import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { ThemeMode } from '../types/wedding';
import { THEMES } from '../utils/weddingData';
import { BotanicalCorner } from './BotanicalAccents';

interface GoogleMapEmbedProps {
  theme: ThemeMode;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ theme }) => {
  const t = THEMES[theme];

  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Holiday+Inn+Singapore+Atrium,+317+Outram+Road,+Singapore+169075&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const mapsDirectUrl =
    'https://maps.google.com/?q=Holiday+Inn+Singapore+Atrium+317+Outram+Road+Singapore+169075';

  return (
    <div className="w-full space-y-4 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-800/80 font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Venue Map</span>
          </span>
          <h4 className="text-xl font-serif text-stone-900 font-normal">
            Getting to Holiday Inn Singapore Atrium
          </h4>
        </div>

        <a
          href={mapsDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-amber-800 hover:text-amber-900 bg-amber-50/80 hover:bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-300/60 shadow-2xs transition-all w-fit cursor-pointer"
        >
          <Navigation className="w-3 h-3 text-amber-600" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>
      </div>

      {/* Map Container with Signature Double Gold Keyline Border & Corner Botanicals */}
      <div className="relative rounded-3xl p-2 sm:p-3 bg-white/95 border-double border-4 border-amber-400/80 shadow-stationery overflow-hidden">
        {/* Corner Botanical Badges */}
        <div className="absolute top-0 right-0 w-16 h-16 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="top-right" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 z-20 pointer-events-none">
          <BotanicalCorner theme={theme} position="bottom-left" />
        </div>

        {/* Embedded Map iFrame */}
        <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden border border-amber-300/50 shadow-inner bg-stone-100">
          <iframe
            title="Wedding Venue - Holiday Inn Singapore Atrium"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Bottom Location Address Bar */}
        <div className="mt-2.5 px-2 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 font-sans gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">Address:</span>
            <span>317 Outram Road, Singapore 169075</span>
          </div>
          <div className="text-[11px] text-amber-800/80 font-mono">
            Havelock MRT (TE16) / Outram Park MRT (EW16/NE3)
          </div>
        </div>
      </div>
    </div>
  );
};
