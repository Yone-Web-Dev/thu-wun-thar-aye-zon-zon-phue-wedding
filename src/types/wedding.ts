export type ThemeMode = 'peach' | 'dustyBlue' | 'magic';

export type AppLayer = 'gate' | 'letter' | 'showcase';

export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  formattedDate: string;
}

export interface PhotoSlotInfo {
  id: string;
  label: string;
  subtitle: string;
  aspect: string;
  shape: 'arch' | 'portrait' | 'square' | 'landscape';
}

export interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  room: string;
  level: string;
  details: string;
}

export interface WeddingSlide {
  id: string;
  slotId: string;
  chapter: string;
  title: string;
  quote: string;
  dedication: string;
  imageSrc?: string;
}
