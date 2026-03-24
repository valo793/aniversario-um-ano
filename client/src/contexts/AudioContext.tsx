import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import content from '@/data/content.json';
interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked by browser
          console.log('Autoplay blocked');
        });
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked');
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        togglePlay,
        toggleMute,
        play,
        pause,
        audioRef,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={content.audioTrack.filename}
        loop
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
