import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import content from '@/data/content.json';

interface ClosingProps {
  onReveal?: () => void;
}

export default function Closing({ onReveal }: ClosingProps) {
  const HOLD_DURATION_MS = 1400;
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const holdStartTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const hasRevealedRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const clearFrame = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const completeReveal = () => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;
    clearFrame();
    setIsHolding(false);
    setIsRevealed(true);
    setHoldProgress(100);
    onReveal?.();
  };

  const tick = (timestamp: number) => {
    if (holdStartTimeRef.current === null) {
      holdStartTimeRef.current = timestamp;
    }

    const elapsed = timestamp - holdStartTimeRef.current;
    const progress = Math.min((elapsed / HOLD_DURATION_MS) * 100, 100);
    setHoldProgress(progress);

    if (progress >= 100) {
      completeReveal();
      return;
    }

    frameRef.current = requestAnimationFrame(tick);
  };

  const startHold = () => {
    if (isRevealed || isHolding) return;

    clearFrame();
    holdStartTimeRef.current = null;
    setIsHolding(true);
    setHoldProgress(0);

    frameRef.current = requestAnimationFrame(tick);
  };

  const stopHold = (resetProgress = true) => {
    if (!isHolding) return;

    clearFrame();
    holdStartTimeRef.current = null;
    setIsHolding(false);
    if (resetProgress && !hasRevealedRef.current) {
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => clearFrame();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    startHold();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!isRevealed) stopHold(true);
  };

  const buttonLabel = isRevealed
    ? 'Presente aberto'
    : holdProgress > 0
      ? `${Math.round(holdProgress)}%`
      : content.closing.cta;

  return (
    <motion.section
      id="closing"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-5 sm:px-8 py-20 scene-beige overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        className="relative z-10 text-center max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="ornament-line text-[#6a3a3d] text-xl mb-5">*</p>
        <h2 className="poster-title text-[clamp(4rem,14vw,9rem)] text-[#6a3a3d] leading-[0.86] mb-2">
          {content.closing.title}
        </h2>
        <p className="handwritten text-4xl sm:text-5xl text-[#6a3a3d]/90 mb-10">
          {content.closing.subtitle}
        </p>

        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.button
            type="button"
            onTapStart={() => startHold()}
            onTap={() => { if (!isRevealed) stopHold(true); }}
            onTapCancel={() => { if (!isRevealed) stopHold(true); }}
            onContextMenu={(e) => {
              // Previne menu de contexto
              e.preventDefault();
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            whileTap={{ scale: 0.98 }}
            className="sticker-ring relative overflow-hidden min-h-[64px] min-w-[280px] px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.16em] text-[#6a3a3d] outline-none cursor-pointer"
            style={{ 
              touchAction: 'none', 
              userSelect: 'none', 
              WebkitUserSelect: 'none', 
              WebkitTouchCallout: 'none', 
              WebkitTapHighlightColor: 'transparent' 
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent/18"
              style={{ width: `${holdProgress}%` }}
              transition={{ duration: 0 }}
            />
            <span className="relative z-10">{buttonLabel}</span>
          </motion.button>

          <motion.div
            className="absolute inset-0 bg-accent/18 blur-2xl rounded-full"
            animate={{ opacity: isHolding ? 0.72 : 0, scale: isHolding ? 1.1 : 1 }}
            transition={{ duration: 0.28 }}
          />
        </motion.div>

        <p className="text-caption text-[#7b5658] mt-5 uppercase tracking-[0.14em]">
          Segure por {(HOLD_DURATION_MS / 1000).toFixed(1)}s para abrir
        </p>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="mt-12 space-y-6 text-left max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.article
                className="paper-surface rounded-[24px] border border-[#c7aa8f] p-6 sm:p-8 shadow-[0_18px_42px_rgba(84,39,41,0.16)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
              >
                <p className="text-caption uppercase tracking-[0.16em] text-[#7b5658]">Declaração</p>
                <p className="mt-4 text-lg sm:text-2xl leading-relaxed text-[#5d3435]">
                  {content.closing.declaration}
                </p>
              </motion.article>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.closing.coupons.map((coupon, index) => (
                  <motion.article
                    key={`${coupon.title}-${index}`}
                    className="relative overflow-hidden rounded-[20px] border border-[#b98c70] bg-[#f3e6d4] p-5 sm:p-6 shadow-[0_12px_30px_rgba(84,39,41,0.14)]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.12 + index * 0.08 }}
                  >
                    <p className="text-caption uppercase tracking-[0.18em] text-[#7b5658]">
                      Cupom {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="poster-title mt-2 text-[clamp(2.2rem,9vw,3.2rem)] leading-[0.9] text-[#6a3a3d]">
                      {coupon.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#674748]">
                      {coupon.description}
                    </p>
                    <p className="mt-6 text-caption uppercase tracking-[0.16em] text-[#866061]">Válido por ∞ uso</p>
                  </motion.article>
                ))}
              </div>

              <motion.p
                className="text-center text-2xl sm:text-3xl text-[#6a3a3d] glow-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                {content.closing.finalMessage}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Star Particles Explosion */}
        <AnimatePresence>
          {isRevealed && (
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
              {[...Array(30)].map((_, i) => {
                const angle = (Math.PI * 2 * i) / 30;
                const distance = 100 + Math.random() * 250;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const size = 3 + Math.random() * 4;
                const color = Math.random() > 0.5 ? '#d4a574' : '#c8a9a8'; // warm gold or rose gold

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      boxShadow: `0 0 ${size * 2}px ${color}`,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: tx,
                      y: ty,
                      opacity: 0,
                      scale: Math.random() * 1.5 + 0.5
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 1.5,
                      ease: "easeOut",
                      delay: 0.1
                    }}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
