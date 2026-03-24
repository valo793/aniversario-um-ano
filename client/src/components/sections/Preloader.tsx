import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkDuration: number;
  delay: number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const starCount = 80; // Number of stars
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          // 18% chance for very big stars, the rest medium
          size: Math.random() > 0.82 ? Math.random() * 16 + 10 : Math.random() * 8 + 6,
          opacity: Math.random() * 0.4 + 0.6,
          blinkDuration: Math.random() * 3 + 1.5, // 1.5s to 4.5s
          delay: Math.random() * 2, // 0s to 2s
        });
      }
      setStars(newStars);
    };

    generateStars();

    const totalDuration = 3000; // 3.0 seconds total (much faster)
    const countingDuration = 2.5; // 2.5 seconds to count to 365

    // Animate the progress smoothly to 365 over 4.5s
    const controls = animate(0, 365, {
      duration: countingDuration,
      ease: "easeOut",
      onUpdate: (value) => setProgress(value),
    });

    // End preloader
    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: '#1A1A1A' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
    >
      {/* Stars Background */}
      {stars.map((star) => {
        const sizePx = star.size * 1.5;
        return (
          <motion.div
            key={star.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${sizePx}px`,
              height: `${sizePx}px`,
              color: '#ad393d',
              filter: `drop-shadow(0 0 ${star.size}px #ad393d)`,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: [0.25, star.opacity, 0.25],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 90]
            }}
            transition={{
              duration: star.blinkDuration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" />
            </svg>
          </motion.div>
        );
      })}

      {/* Optional subtle text in the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          className="handwritten text-5xl sm:text-7xl text-[#ad393d] tracking-widest flex flex-col items-center drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <span>{Math.floor(progress)}</span>
          <span className="text-xl sm:text-2xl mt-1 tracking-[0.2em] uppercase font-sans font-light opacity-80">dias</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
