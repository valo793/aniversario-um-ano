import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import content from '@/data/content.json';

export default function Vows() {
  const vows = content.vows.lines;
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVow, setCurrentVow] = useState(0);
  const sectionHeightVh = useMemo(() => Math.max(260, vows.length * 38), [vows.length]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let rafId: number | null = null;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const updateCurrentVow = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 0.9999);
      const nextVow = Math.min(Math.floor(progress * vows.length), vows.length - 1);

      setCurrentVow((prev) => (prev === nextVow ? prev : nextVow));
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateCurrentVow);
    };

    updateCurrentVow();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [vows.length]);

  return (
    <motion.section
      id="vows"
      ref={containerRef}
      className="relative w-full scene-beige"
      style={{ minHeight: `${sectionHeightVh}dvh` }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="sticky top-0 h-[100dvh] px-4 sm:px-6 flex flex-col">
        <motion.div
          className="pt-10 sm:pt-14 text-center z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="ornament-line text-[#6a3a3d] mb-5">*</p>
          <h2 className="text-heading text-[#6a3a3d] mb-2">{content.vows.title}</h2>
          <p className="handwritten text-3xl sm:text-4xl text-[#6a3a3d]/90">{content.vows.subtitle}</p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center pb-20 sm:pb-24">
          <div className="max-w-4xl w-full" aria-live="polite">
            <div className="paper-surface rounded-[28px] px-6 sm:px-10 py-10 sm:py-12 border border-black/10 shadow-[0_28px_65px_rgba(0,0,0,0.32)]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentVow}
                  className="text-2xl sm:text-3xl md:text-4xl text-center text-black/85 leading-relaxed"
                  initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(3px)' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  “{vows[currentVow]}”
                </motion.p>
              </AnimatePresence>
              <p className="handwritten text-4xl text-black/65 text-center mt-8">eu te escolho</p>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {vows.map((_, index) => (
            <motion.span
              key={index}
              className="text-base sm:text-lg"
              animate={{
                opacity: currentVow === index ? 1 : 0.35,
                scale: currentVow === index ? 1.08 : 0.95,
                color: currentVow === index ? '#6a3a3d' : '#a78586',
              }}
              transition={{ duration: 0.25 }}
            >
              ♥
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
