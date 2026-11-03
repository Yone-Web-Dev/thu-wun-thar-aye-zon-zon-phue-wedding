/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ThemeMode, GuestWish, AppLayer } from './types/wedding';
import { THEMES, INITIAL_WISHES, weddingAudio } from './utils/weddingData';
import { WelcomeGate } from './components/WelcomeGate';
import { RoyalInvitationCard } from './components/RoyalInvitationCard';
import { ShowcaseSection } from './components/ShowcaseSection';
import { LiveWishesGuestbook } from './components/LiveWishesGuestbook';
import { FloatingPetals } from './components/FloatingPetals';
import { ThemeCursorAndGlow } from './components/ThemeCursorAndGlow';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { NavigationHeader, type NavigationDestination } from './components/NavigationHeader';
import { isSupabaseConfigured } from './lib/supabase';
import { describeWishError, fetchWishes, insertWish, subscribeToWishes } from './lib/wishes';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('peach');
  const [guestName, setGuestName] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<AppLayer>('gate');
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<NavigationDestination | null>(null);

  // Lightbox Modal state
  const [activePhotoSlot, setActivePhotoSlot] = useState<{
    isOpen: boolean;
    slotId: string;
    slotLabel: string;
    imageSrc?: string;
    caption?: string;
  }>({
    isOpen: false,
    slotId: '',
    slotLabel: '',
    imageSrc: undefined,
    caption: undefined
  });

  const t = THEMES[theme];

  const handleToggleTheme = (specificTheme?: ThemeMode) => {
    if (specificTheme) {
      setTheme(specificTheme);
      return;
    }
    setTheme((prev) => {
      if (prev === 'peach') return 'dustyBlue';
      if (prev === 'dustyBlue') return 'magic';
      return 'peach';
    });
  };

  const handleToggleAudio = () => {
    weddingAudio.toggleAmbience((playing) => {
      setIsAudioPlaying(playing);
    });
  };

  const handleStartMusic = () => {
    weddingAudio.startMusic((playing) => {
      setIsAudioPlaying(playing);
    });
  };

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    setCurrentLayer('letter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleStartMusic();
  };

  const handleProceedToShowcase = () => {
    setCurrentLayer('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLayer = (layer: AppLayer) => {
    setCurrentLayer(layer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (destination: NavigationDestination) => {
    setIsUnlocked(true);
    setPendingNavigation(destination);
    setCurrentLayer('showcase');
  };

  useEffect(() => {
    if (!pendingNavigation) return;

    const targetId = {
      photos: 'photo-moments',
      ceremony: 'ceremony-schedule',
      wishes: 'live-wishes'
    }[pendingNavigation];

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingNavigation(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pendingNavigation, currentLayer]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    fetchWishes()
      .then((rows) => {
        if (!cancelled) setWishes(rows);
      })
      .catch((error) => {
        console.error('Failed to load wishes', error);
      });

    const unsubscribe = subscribeToWishes({
      onInsert: (wish) => {
        setWishes((prev) => (prev.some((item) => item.id === wish.id) ? prev : [wish, ...prev]));
      },
      onUpdate: (wish) => {
        setWishes((prev) => prev.map((item) => (item.id === wish.id ? wish : item)));
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const handleAddWish = async (name: string, message: string) => {
    try {
      const saved = await insertWish(name, message);
      setWishes((prev) => (prev.some((item) => item.id === saved.id) ? prev : [saved, ...prev]));
    } catch (error) {
      throw new Error(describeWishError(error));
    }
  };

  const handleOpenPhotoSlot = (slotId: string, label: string, imageSrc?: string, caption?: string) => {
    setActivePhotoSlot({
      isOpen: true,
      slotId,
      slotLabel: label,
      imageSrc,
      caption
    });
  };

  const handleClosePhotoSlot = () => {
    setActivePhotoSlot({
      isOpen: false,
      slotId: '',
      slotLabel: '',
      imageSrc: undefined
    });
  };

  return (
    <div className={`min-h-screen ${t.bodyBg} text-stone-800 transition-colors duration-500 font-sans selection:bg-amber-200 selection:text-amber-900 relative`}>
      {/* Theme-Aware Custom Cursor & Ambient Breathing Glow */}
      <ThemeCursorAndGlow theme={theme} />

      {/* Floating Petal & Gilded Dust Animation Canvas */}
      <FloatingPetals theme={theme} enabled={petalsEnabled} />

      {/* Top Luxury Navigation Header */}
      <NavigationHeader
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        onReturnToGate={() => handleSelectLayer('gate')}
        onNavigate={handleNavigate}
      />

      {/* Photo Slot Inspector Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={activePhotoSlot.isOpen}
        onClose={handleClosePhotoSlot}
        slotId={activePhotoSlot.slotId}
        slotLabel={activePhotoSlot.slotLabel}
        theme={theme}
        imageSrc={activePhotoSlot.imageSrc}
        caption={activePhotoSlot.caption}
      />

      <main className="w-full">
        {/* Layer 1: The Grand Entrance Gate */}
        {currentLayer === 'gate' && (
          <div className="animate-fade-in">
            <WelcomeGate
              theme={theme}
              guestName={guestName}
              onGuestNameChange={setGuestName}
              onOpenInvitation={handleOpenInvitation}
              isUnlocked={isUnlocked}
              onOpenPhotoSlot={handleOpenPhotoSlot}
              onStartMusic={handleStartMusic}
            />
          </div>
        )}

        {/* Layer 2: The Royal Invitation Letter (Folded Stationery & Countdown) */}
        {currentLayer === 'letter' && (
          <div className="animate-fade-in">
            <RoyalInvitationCard
              theme={theme}
              guestName={guestName}
              onProceedToShowcase={handleProceedToShowcase}
              onBackToGate={() => handleSelectLayer('gate')}
            />
          </div>
        )}

        {/* Layer 3: Grand Celebration Showcase (Slideshow, Milestones, Ceremony, Photos & Live Wishes) */}
        {currentLayer === 'showcase' && (
          <div className="animate-fade-in">
            <ShowcaseSection
              theme={theme}
              onProceedToWishes={() => {
                const el = document.getElementById('live-wishes');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPhotoSlot={handleOpenPhotoSlot}
            />

            <LiveWishesGuestbook
              theme={theme}
              guestName={guestName}
              wishes={wishes}
              onAddWish={handleAddWish}
            />
          </div>
        )}
      </main>
    </div>
  );
}
