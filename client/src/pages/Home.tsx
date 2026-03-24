import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from '@/contexts/AudioContext';
import { ScrollProvider } from '@/contexts/ScrollContext';
import { useLenis } from '@/hooks/useLenis';
import Preloader from '@/components/sections/Preloader';
import Gate from '@/components/sections/Gate';
import Hero from '@/components/sections/Hero';
import Prologue from '@/components/sections/Prologue';
import Timeline from '@/components/sections/Timeline';
import Gallery from '@/components/sections/Gallery';
import Vows from '@/components/sections/Vows';
import Closing from '@/components/sections/Closing';
import AudioToggle from '@/components/AudioToggle';

export default function Home() {
  useLenis();

  const [showPreloader, setShowPreloader] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [revealedFinal, setRevealedFinal] = useState(false);

  const handleGateEnter = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowGate(false);
    setShowContent(true);
  };

  const handleRevealFinal = () => {
    setRevealedFinal(true);
  };

  return (
    <AudioProvider>
      <ScrollProvider>
        <div className="w-full min-h-screen bg-background text-foreground">
          <AnimatePresence mode="wait">
            {showPreloader && (
              <Preloader
                key="preloader"
                onComplete={() => {
                  setShowPreloader(false);
                  setShowGate(true);
                }}
              />
            )}

            {showGate && <Gate key="gate" onEnter={handleGateEnter} />}
          </AnimatePresence>

          {showContent && (
            <>
              <AudioToggle />

              <Hero heroImageUrl="/Images/hero/bg.jpg" />
              <Prologue prologueImageUrl="/Images/prologue/memory.jpg" />
              <Timeline />
              <Gallery
                galleryImages={[
                  '/Images/gallery/7.jpeg',
                  '/Images/gallery/2.jpg',
                  '/Images/gallery/3.jpg',
                  '/Images/gallery/4.jpg',
                  '/Images/gallery/5.jpeg',
                  '/Images/gallery/6.jpeg',
                  '/Images/gallery/1.jpg',
                  '/Images/gallery/8.jpeg',
                ]}
              />
              <Vows />
              <Closing onReveal={handleRevealFinal} />

              <footer className="relative w-full py-14 px-6 text-center scene-beige border-t border-[#a88183]/40">
                <p className="text-caption uppercase tracking-[0.16em] text-[#6a3a3d]/80">Criado com amor - {new Date().getFullYear()}</p>
                <p className="handwritten text-3xl text-[#6a3a3d] mt-3">
                  {revealedFinal ? 'Obrigada por me escolher.' : 'Um cantinho feito so pra nos.'}
                </p>
              </footer>
            </>
          )}
        </div>
      </ScrollProvider>
    </AudioProvider>
  );
}
