import { GuestWish, TimelineEvent, ThemeMode, WeddingSlide } from '../types/wedding';

export const WEDDING_DATE = new Date('2026-11-08T11:00:00+08:00');

export const INITIAL_WISHES: GuestWish[] = [];

export const WEDDING_SLIDES: WeddingSlide[] = [
  {
    id: 'slide-1',
    slotId: 'SLOT-BANNER-01',
    chapter: 'Chapter I',
    title: "By the Ocean's Edge",
    quote: 'Where the infinite tide meets the shore, two souls unite for a lifetime of devotion.',
    dedication: 'Where our forever begins',
    imageSrc: '/assets/aistudio/hero2_449a2c99.webp'
  },
  {
    id: 'slide-2',
    slotId: 'SLOT-BANNER-02',
    chapter: 'Chapter II',
    title: 'Whispers of the Meadow',
    quote: 'Amidst gentle blooms and whispering grasses, every heartbeat whispers your name.',
    dedication: 'Growing together, blooming forever',
    imageSrc: '/assets/aistudio/hero6_d5b5a828.webp'
  },
  {
    id: 'slide-3',
    slotId: 'SLOT-BANNER-03',
    chapter: 'Chapter III',
    title: 'A Vow Amidst the Mist',
    quote: 'Beneath the sacred floral canopy and evergreen pines, love stands unwavering and true.',
    dedication: 'A promise held through every season',
    imageSrc: '/assets/aistudio/hero13_80762a5c.webp'
  },
  {
    id: 'slide-4',
    slotId: 'SLOT-BANNER-04',
    chapter: 'Chapter IV',
    title: 'Forever in Your Arms',
    quote: 'In your laughter I found home, in your embrace I found my eternal peace.',
    dedication: 'In your arms, I am home',
    imageSrc: '/assets/aistudio/hero15_1732920b.webp'
  },
  {
    id: 'slide-5',
    slotId: 'SLOT-BANNER-05',
    chapter: 'Chapter V',
    title: 'Walking Towards Tomorrow',
    quote: 'Hand in hand, side by side, stepping into a lifetime of endless joy and devotion.',
    dedication: 'Every tomorrow, hand in hand',
    imageSrc: '/assets/aistudio/hero17_d9e46e95.webp'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    time: '11:00 AM – 12:00 PM',
    title: 'Solemnisation Ceremony',
    location: 'Holiday Inn Singapore Atrium',
    room: 'Changi 3',
    level: 'Level 4',
    details: 'Exchange of sacred vows and rings witnessed by esteemed family and close friends.'
  },
  {
    time: 'Starts at 12:00 PM',
    title: 'Wedding Reception',
    location: 'Holiday Inn Singapore Atrium',
    room: 'Changi 1 & 2',
    level: 'Level 4',
    details: 'Grand luncheon banquet celebration, speeches, champagne toast, and joyous festivities.'
  }
];

export interface ThemeColors {
  name: string;
  bodyBg: string;
  canvasBg: string;
  cardBg: string;
  gateBg: string;
  accent: string;
  accentHover: string;
  accentText: string;
  accentRing: string;
  goldBorder: string;
  goldKeyline: string;
  subtleBorder: string;
  primaryText: string;
  secondaryText: string;
  leafColor: string;
  petalColor: string;
  badgeBg: string;
  badgeText: string;
  cardShadow: string;
  cursorColor: string;
  cursorRing: string;
  glowColor: string;
}

export const THEMES: Record<ThemeMode, ThemeColors> = {
  peach: {
    name: 'Radiant Sun-Rose & Champagne Gold',
    bodyBg: 'bg-[#FFFDF9]',
    canvasBg: 'from-[#FFFDF9] via-[#FFF1E8] to-[#FFF9F3]',
    cardBg: 'bg-[#FFFFFF]',
    gateBg: 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF2EB] to-[#FFF9F3]',
    accent: 'bg-[#E26D5C]',
    accentHover: 'hover:bg-[#CF5948]',
    accentText: 'text-[#D45D4B]',
    accentRing: 'focus:ring-[#E26D5C]',
    goldBorder: 'border-amber-400',
    goldKeyline: 'border-amber-500/50',
    subtleBorder: 'border-amber-300/60',
    primaryText: 'text-stone-900',
    secondaryText: 'text-stone-700',
    leafColor: '#7DAA88',
    petalColor: '#F09A8D',
    badgeBg: 'bg-[#FFEFE7]',
    badgeText: 'text-[#BA4E3C]',
    cardShadow: 'shadow-[0_20px_50px_-10px_rgba(235,130,100,0.14)]',
    cursorColor: '#E26D5C',
    cursorRing: 'rgba(226, 109, 92, 0.45)',
    glowColor: 'rgba(255, 230, 218, 0.65)'
  },
  dustyBlue: {
    name: 'Luminous Azure & Gilded Opal',
    bodyBg: 'bg-[#F8FBFE]',
    canvasBg: 'from-[#FAFDFF] via-[#EBF4FA] to-[#F5FAFD]',
    cardBg: 'bg-[#FFFFFF]',
    gateBg: 'bg-gradient-to-b from-[#FAFDFF] via-[#EDF6FB] to-[#F5FAFD]',
    accent: 'bg-[#2D6A9F]',
    accentHover: 'hover:bg-[#205380]',
    accentText: 'text-[#2D6A9F]',
    accentRing: 'focus:ring-[#2D6A9F]',
    goldBorder: 'border-amber-400',
    goldKeyline: 'border-amber-500/50',
    subtleBorder: 'border-sky-200/80',
    primaryText: 'text-slate-900',
    secondaryText: 'text-slate-700',
    leafColor: '#5C8AA6',
    petalColor: '#9BBED4',
    badgeBg: 'bg-[#E7F2F9]',
    badgeText: 'text-[#1D4F78]',
    cardShadow: 'shadow-[0_20px_50px_-10px_rgba(45,106,159,0.14)]',
    cursorColor: '#2D6A9F',
    cursorRing: 'rgba(45, 106, 159, 0.45)',
    glowColor: 'rgba(235, 245, 252, 0.7)'
  },
  magic: {
    name: 'Enchanted Twilight & Stardust Gold',
    bodyBg: 'bg-[#FAF7FD]',
    canvasBg: 'from-[#FAF7FD] via-[#F4E8FF] to-[#FAF5FF]',
    cardBg: 'bg-[#FFFFFF]',
    gateBg: 'bg-gradient-to-b from-[#FAF7FD] via-[#F3E5FF] to-[#FAF0FF]',
    accent: 'bg-[#8B5CF6]',
    accentHover: 'hover:bg-[#7C3AED]',
    accentText: 'text-[#7C3AED]',
    accentRing: 'focus:ring-[#8B5CF6]',
    goldBorder: 'border-amber-400',
    goldKeyline: 'border-amber-500/50',
    subtleBorder: 'border-purple-200/80',
    primaryText: 'text-stone-900',
    secondaryText: 'text-stone-700',
    leafColor: '#7C6BA6',
    petalColor: '#D8B4FE',
    badgeBg: 'bg-[#F3E8FF]',
    badgeText: 'text-[#6B21A8]',
    cardShadow: 'shadow-[0_20px_50px_-10px_rgba(139,92,246,0.18)]',
    cursorColor: '#8B5CF6',
    cursorRing: 'rgba(139, 92, 246, 0.45)',
    glowColor: 'rgba(243, 232, 255, 0.75)'
  }
};

export function getTimeUntilWedding(targetDate: Date = WEDDING_DATE, now: Date = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPast: false };
}

export function validateWishInput(name: string, message: string): { isValid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Please enter your name.' };
  }
  if (name.trim().length > 100) {
    return { isValid: false, error: 'Your name must be 100 characters or fewer.' };
  }
  if (!message || message.trim().length === 0) {
    return { isValid: false, error: 'Please write your message or blessing.' };
  }
  if (message.trim().length < 3) {
    return { isValid: false, error: 'Your message should be at least 3 characters.' };
  }
  if (message.trim().length > 2000) {
    return { isValid: false, error: 'Your message must be 2000 characters or fewer.' };
  }
  return { isValid: true };
}

export function createNewWish(name: string, message: string): GuestWish {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return {
    id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    message: message.trim(),
    timestamp: Date.now(),
    formattedDate: `Today at ${timeStr}`
  };
}

/**
 * Romantic wedding audio engine playing "Thinking Out Loud" with celebratory chimes.
 */
class RomanticAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private ctx: AudioContext | null = null;

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio('/assets/aistudio/thinking_out_loud_71db64c6.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.55;
      this.audio.preload = 'auto';

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      });
      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
      });
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
      });
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playHarpNote(freq: number, duration: number = 2.5, gainLevel: number = 0.08) {
    if (!this.ctx) this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio handled gracefully
    }
  }

  public playArpeggio() {
    const notes = [523.25, 659.25, 698.46, 880.0, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playHarpNote(freq, 2.8, 0.06);
      }, idx * 160);
    });
  }

  public toggleAmbience(callback: (playing: boolean) => void) {
    this.initAudio();
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      callback(false);
    } else {
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          callback(true);
        })
        .catch((err) => {
          console.warn('Audio playback requires user interaction:', err);
          this.isPlaying = false;
          callback(false);
        });
    }
  }

  public startMusic(callback?: (playing: boolean) => void) {
    this.initAudio();
    if (!this.audio) return;

    if (!this.isPlaying) {
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          if (callback) callback(true);
        })
        .catch((err) => {
          console.warn('Audio playback requires user interaction:', err);
          this.isPlaying = false;
          if (callback) callback(false);
        });
    } else {
      if (callback) callback(true);
    }
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
}

export const weddingAudio = new RomanticAudioEngine();
