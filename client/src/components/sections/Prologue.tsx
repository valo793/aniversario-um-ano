import { motion, useReducedMotion } from 'framer-motion';
import content from '@/data/content.json';

interface PrologueProps {
  prologueImageUrl?: string;
}

export default function Prologue({ prologueImageUrl }: PrologueProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id="prologue"
      className="relative min-h-[100dvh] w-full px-5 sm:px-8 py-20 scene-beige"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
        <motion.article
          className="paper-surface rounded-[26px] p-7 sm:p-10 md:p-12 shadow-[0_28px_70px_rgba(0,0,0,0.28)] border border-black/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-120px' }}
        >
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-black/55 mb-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            Capitulo 1
          </motion.p>

          <motion.h2
            className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] text-black/85 mb-6"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            viewport={{ once: true }}
          >
            {content.prologue.title}
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-black/75 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {content.prologue.content}
          </motion.p>

          <motion.p
            className="handwritten text-3xl sm:text-4xl text-black/65 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            viewport={{ once: true }}
          >
            com carinho, pra ti, kaka
          </motion.p>
        </motion.article>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24, rotate: -1.2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.78, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, margin: '-120px' }}
        >
          <div className="film-frame rounded-[22px] overflow-hidden">
            <div className="p-3 sm:p-4 bg-black relative">
              {prologueImageUrl ? (
                <motion.div
                  className="w-full h-[380px] sm:h-[460px] overflow-hidden"
                  style={{ willChange: 'transform' }}
                  animate={prefersReducedMotion ? undefined : { scale: [1.015, 1, 1.015] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.img
                    src={prologueImageUrl}
                    alt={content.prologue.imageAlt}
                    className="w-full h-full object-cover blur-[5px] grayscale contrast-[1.06] brightness-[0.88]"
                    style={{ willChange: 'opacity, transform' }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ) : (
                <div className="w-full h-[380px] sm:h-[460px] bg-neutral-900" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-black/28" />
            </div>
          </div>

          <motion.div
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 rotate-[-1.5deg] paper-surface px-6 py-3 rounded-xl shadow-xl text-sm sm:text-base text-black/75"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A imagem da primeira vez em que te vi ainda mora em minha mente.
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
