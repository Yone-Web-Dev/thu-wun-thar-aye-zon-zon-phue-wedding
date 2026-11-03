import React, { useState } from 'react';
import { Heart, Send, Sparkles, MessageCircle, User, Feather } from 'lucide-react';
import { ThemeMode, GuestWish } from '../types/wedding';
import { THEMES, validateWishInput, weddingAudio } from '../utils/weddingData';
import {
  GildedDivider,
  ArchFloralCrown,
  FloralVineGarland,
  BotanicalCorner,
  BackgroundFloralMotif
} from './BotanicalAccents';
import { WishingCelebrationAnimation } from './WishingCelebrationAnimation';

interface LiveWishesGuestbookProps {
  theme: ThemeMode;
  guestName: string;
  wishes: GuestWish[];
  onAddWish: (name: string, message: string) => Promise<void>;
}

export const LiveWishesGuestbook: React.FC<LiveWishesGuestbookProps> = ({
  theme,
  guestName,
  wishes,
  onAddWish
}) => {
  const t = THEMES[theme];
  const isDusty = theme === 'dustyBlue';
  const isMagic = theme === 'magic';

  const [authorName, setAuthorName] = useState(guestName || '');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cool Wedding Animation State when someone submits a wish
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  // Keep authorName in sync with guestName from Gate
  React.useEffect(() => {
    if (guestName) {
      setAuthorName(guestName);
    }
  }, [guestName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = authorName.trim() || 'Cherished Guest & Family';
    const validation = validateWishInput(finalName, message);
    if (!validation.isValid) {
      setErrorMsg(validation.error || 'Please write your message or blessing.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await onAddWish(finalName, message);
      setSubmittedName(finalName);
      setMessage('');
      weddingAudio.playArpeggio();
      setCelebrationActive(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not save your wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="live-wishes"
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-10 lg:px-16 ${t.cardBg} border-t border-amber-300/40 transition-colors duration-500 overflow-hidden scroll-mt-28`}
    >
      {/* Background Floral Motifs */}
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -left-12 sm:-top-16 sm:-left-16 w-56 sm:w-80 h-56 sm:h-80 opacity-35 rotate-12"
      />
      <BackgroundFloralMotif
        theme={theme}
        className="-top-12 -right-12 sm:-top-16 sm:-right-16 w-56 sm:w-80 h-56 sm:h-80 opacity-35 -scale-x-100 -rotate-12"
      />

      {/* ================= COOL CELESTIAL BUTTERFLIES & RINGS WISHING FLIGHT ANIMATION ================= */}
      <WishingCelebrationAnimation
        theme={theme}
        guestName={submittedName}
        isActive={celebrationActive}
        onComplete={() => setCelebrationActive(false)}
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header with Arch Floral Crown & Garlands */}
        <div className="text-center space-y-3 max-w-2xl mx-auto relative">
          <ArchFloralCrown theme={theme} className="w-52 sm:w-68 h-auto mx-auto mb-1 opacity-90 drop-shadow-xs" />
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-amber-800">
            Guestbook of Blessings
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal">
            Live Wishes &amp; Blessings
          </h2>
          <p className="text-sm font-serif italic text-stone-600">
            Leave your cherished words and heartfelt blessings for Thu Wun Thar &amp; Aye Zon Zon Phue
          </p>
          <FloralVineGarland theme={theme} className="max-w-xs sm:max-w-sm mx-auto pt-1 scale-95" />
          <GildedDivider theme={theme} className="max-w-xs mx-auto" />
        </div>

        {/* Two-Column Grid: Form on Left, Live Wishes Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Send Your Wishes Form Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-md border-double border-4 border-amber-400/80 shadow-2xl relative overflow-hidden">
              {/* Corner Botanical Badges */}
              <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-80 z-20">
                <BotanicalCorner theme={theme} position="top-right" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-14 h-14 pointer-events-none opacity-60 z-20">
                <BotanicalCorner theme={theme} position="bottom-left" />
              </div>

              {/* Inner Gold Keyline */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-2xl border border-amber-300/40 pointer-events-none" />

              <div className="space-y-1.5 mb-6 relative z-10">
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-900 font-semibold bg-amber-50 px-3 py-0.5 rounded-full border border-amber-300/60 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Send A Royal Blessing</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal pt-1">
                  Write Your Wishes
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Your message will be displayed instantly in our live wedding guestbook for all to cherish.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="wish-author-input" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>Your Name / Family</span>
                  </label>
                  <div className="relative">
                    <input
                      id="wish-author-input"
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Enter your name / family..."
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border-2 border-amber-300/80 bg-amber-50/20 text-stone-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 shadow-2xs transition-all font-serif placeholder:font-sans placeholder:text-xs disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="wish-message-input" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-amber-600" />
                    <span>Your Blessing</span>
                  </label>
                  <textarea
                    id="wish-message-input"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Wishing Thu Wun Thar & Aye Zon Zon Phue a lifetime of radiant love, laughter, and happiness..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-300/80 bg-amber-50/20 text-stone-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 shadow-2xs transition-all resize-none leading-relaxed font-sans placeholder:text-xs disabled:opacity-60"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-600 font-sans font-medium">{errorMsg}</p>
                )}

                {/* UPGRADED SUBMIT BUTTON */}
                <div className="pt-2">
                  <div className="relative group">
                    <div
                      className="absolute -inset-1 rounded-full opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg pointer-events-none"
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
                      disabled={isSubmitting}
                      className={`relative w-full py-4 px-6 rounded-full border-2 border-amber-300 shadow-[0_10px_28px_-5px_rgba(0,0,0,0.22),0_0_20px_rgba(245,158,11,0.22)] overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait ${
                        theme === 'magic'
                          ? 'bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-800'
                          : theme === 'dustyBlue'
                          ? 'bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 hover:from-slate-800 hover:to-sky-700'
                          : 'bg-gradient-to-r from-[#9E3929] via-[#D45D4B] to-[#9E3929] hover:from-[#B54432] hover:to-[#B54432]'
                      }`}
                    >
                      {/* Shimmer sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                      {/* Inner Keyline */}
                      <div className="absolute inset-1 rounded-full border border-amber-200/50 pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-white/60 shadow-md flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500">
                          <Send className="w-4 h-4 text-amber-950 fill-amber-950/20" />
                        </div>

                        <div className="flex-1 text-center space-y-0.5">
                          <p className="font-serif text-base sm:text-lg text-white font-medium tracking-wide drop-shadow-md">
                            {isSubmitting ? 'Saving your blessing...' : 'Submit Wishes & Blessing'}
                          </p>
                          <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-amber-200/90 font-medium">
                            Live Guestbook Tribute
                          </p>
                        </div>

                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-xs border border-amber-300/60 shadow-inner flex items-center justify-center shrink-0 text-amber-200 group-hover:bg-white/25 group-hover:translate-x-0.5 transition-all">
                          <Sparkles className="w-4 h-4 text-amber-200" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Live Message Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-amber-300/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-2xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-stone-900 font-medium">
                    Recent Blessings ({wishes.length})
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-amber-800/80">
                    Sacred Words of Love &amp; Joy
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-sans font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Active</span>
              </span>
            </div>

            {/* When no wishes are present yet */}
            {wishes.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white/90 border-2 border-dashed border-amber-300/80 text-center space-y-3.5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-amber-100/80 border border-amber-300 mx-auto flex items-center justify-center text-amber-700 shadow-inner">
                  <Heart className="w-7 h-7 animate-pulse text-amber-600 fill-amber-500/20" />
                </div>
                <h4 className="font-serif text-xl text-stone-900 font-medium">
                  No Blessings Posted Yet
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-sm mx-auto leading-relaxed">
                  Be the first to share your warm wishes and loving blessings with Thu Wun Thar &amp; Aye Zon Zon Phue!
                </p>
              </div>
            ) : (
              /* Scrollable feed of wish cards */
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-6 rounded-3xl backdrop-blur-md bg-white/95 border-2 border-amber-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                  >
                    {/* Corner Flourish */}
                    <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-40">
                      <BotanicalCorner theme={theme} position="top-right" />
                    </div>

                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-xs font-serif font-bold">
                          {wish.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-serif text-base sm:text-lg font-semibold text-stone-900">
                          {wish.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400 bg-stone-50 px-2.5 py-0.5 rounded-full border border-stone-200 shrink-0">
                        {wish.formattedDate}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed mb-4 pl-1">
                      &ldquo;{wish.message}&rdquo;
                    </p>

                    {/* Decorative heart */}
                    <div className="flex items-center justify-end pt-2.5 border-t border-amber-100">
                      <span
                        aria-label="With love"
                        className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50/80 p-2 text-rose-400"
                      >
                        <Heart className="h-4 w-4 fill-rose-500/20" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= THE ONE & ONLY THANK YOU SECTION ================= */}
        <div className="pt-12 border-t border-amber-200/60 max-w-2xl mx-auto w-full text-center">
          <div
            className="p-8 sm:p-12 rounded-3xl bg-white/95 border-double border-4 border-amber-400/80 relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: isMagic
                ? '0 0 40px rgba(139,92,246,0.4), 0 0 14px rgba(217,70,239,0.25), 0 16px 40px -10px rgba(76,29,149,0.25)'
                : isDusty
                ? '0 0 35px rgba(45,106,159,0.35), 0 0 12px rgba(56,189,248,0.25), 0 16px 40px -10px rgba(44,62,80,0.2)'
                : '0 0 35px rgba(226,109,92,0.35), 0 0 12px rgba(245,158,11,0.25), 0 16px 40px -10px rgba(184,87,71,0.2)'
            }}
          >
            {/* Arch Floral Crown topping the Thank You card */}
            <ArchFloralCrown theme={theme} className="w-48 sm:w-60 h-auto mx-auto mb-2 opacity-90 drop-shadow-xs" />

            {/* Subtle Inner Gold Keyline */}
            <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-amber-500/30 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Our Heartfelt Tribute</span>
              </span>

              <h3 className="text-3xl sm:text-4xl font-serif text-stone-900 font-light tracking-tight">
                Thank You
              </h3>

              <p className="text-xs sm:text-sm font-serif italic text-stone-600 max-w-md mx-auto leading-relaxed">
                &ldquo;To our dearest family and friends, thank you for your love, your blessings, and for gracing our special day with your cherished presence.&rdquo;
              </p>

              <GildedDivider theme={theme} className="my-3 max-w-xs mx-auto" />

              {/* Groom name on line 1, & on line 2, Bride name on line 3 for BOTH PC and Mobile */}
              <div className="pt-2 flex flex-col items-center justify-center space-y-1 select-none">
                {/* Line 1: Groom Name */}
                <div className="w-full text-center font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-wide">
                  Thu Wun Thar
                </div>

                {/* Line 2: & */}
                <div className="w-full text-center font-script text-3xl sm:text-4xl text-amber-600 py-0.5">
                  &amp;
                </div>

                {/* Line 3: Bride Name */}
                <div className="w-full text-center font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-wide">
                  Aye Zon Zon Phue
                </div>
              </div>

              <p className="text-[11px] font-sans tracking-widest uppercase text-amber-800/80 pt-3">
                Sunday, November 08, 2026 · Holiday Inn Singapore Atrium
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
