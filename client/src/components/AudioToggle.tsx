import { useAudio } from '@/contexts/AudioContext';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const { isPlaying, isMuted, toggleMute } = useAudio();

  if (!isPlaying) return null;

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed top-5 right-4 sm:right-6 z-50 min-w-[110px] px-4 py-2.5 rounded-full border border-accent/70 bg-[rgba(40,9,13,0.5)] backdrop-blur-sm text-accent hover:bg-accent/15 transition-colors duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={isMuted ? 'Ativar audio' : 'Desativar audio'}
    >
      <span className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.15em]">
        {isMuted ? (
          <VolumeX size={16} />
        ) : (
          <div className="flex items-center gap-[2px] h-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-accent rounded-full"
                animate={{ height: ['40%', '100%', '40%'] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
        {isMuted ? 'Sem som' : 'Com som'}
      </span>
    </motion.button>
  );
}
