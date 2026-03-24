import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAudio } from '@/contexts/AudioContext';
import content from '@/data/content.json';

interface GateProps {
  onEnter: () => void;
}

export default function Gate({ onEnter }: GateProps) {
  const { play } = useAudio();
  const prefersReducedMotion = useReducedMotion();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleEnter = () => {
    const p = password.toLowerCase().trim();
    if (p === '2803' || p === '28/03' || p === '28') {
      setError(false);
      play();
      setTimeout(onEnter, 360);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 4) raw = raw.slice(0, 4);

    let formatted = raw;
    if (raw.length >= 3) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setPassword(formatted);
  };

  return (
    <motion.div
      id="gate"
      className="fixed inset-0 scene-maroon flex flex-col items-center justify-center z-40 overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#f4ebdd]/30"
          style={{ willChange: 'opacity' }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute top-10 left-6 sm:left-12 max-w-[220px] text-[11px] sm:text-sm uppercase leading-relaxed tracking-[0.08em] text-accent/82"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.65 }}
      >
        Fiz esse cantinho para
        <br />
        comemorar nosso amor
        <br />
        e redeclarar meu compromisso.
      </motion.div>

      <motion.p
        className="absolute top-10 right-6 sm:right-12 text-xs sm:text-sm uppercase tracking-[0.12em] text-accent/78"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.65 }}
      >
        28 de março
      </motion.p>

      <motion.div
        className="text-center max-w-xl relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.85, ease: 'easeOut' }}
      >
        <motion.p
          className="ornament-line text-accent text-xl mb-7"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          *
        </motion.p>

        <motion.h1
          className="poster-title text-[clamp(4.2rem,17vw,10rem)] text-accent leading-none mb-3"
          initial={{ opacity: 0, letterSpacing: '0.18em' }}
          animate={{ opacity: 1, letterSpacing: '0.09em' }}
          transition={{ duration: 0.85, delay: 0.32, ease: 'easeOut' }}
        >
          LOVE
        </motion.h1>

        <motion.p
          className="text-subheading text-accent/88 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
        >
          {content.gate.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col items-center mb-8 w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <label className="text-caption text-accent/70 uppercase tracking-[0.2em] mb-3">Qual a nossa data?</label>
          <input
            type="text"
            placeholder="DD/MM"
            value={password}
            onChange={handleChange}
            className={`w-full bg-transparent border-b ${error ? 'border-red-400 text-red-200' : 'border-accent/40 text-accent'} text-center py-2 outline-none focus:border-accent transition-colors`}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
          />
          {error && <span className="text-[10px] text-red-300 mt-2 uppercase tracking-widest">Incorreto, tente de novo.</span>}
        </motion.div>

        <motion.button
          onClick={handleEnter}
          className="sticker-ring min-w-[230px] px-10 py-4 text-sm uppercase tracking-[0.18em] text-accent hover:bg-accent/12 transition-colors duration-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {content.gate.cta}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
