import { motion } from 'framer-motion';
import content from '@/data/content.json';

interface HeroProps {
  heroImageUrl?: string;
}

export default function Hero({ heroImageUrl }: HeroProps) {
  const loveStyle = heroImageUrl
    ? {
      backgroundImage: `url(${heroImageUrl})`,
      backgroundSize: '125% auto',
      backgroundPosition: 'center 34%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      filter: 'grayscale(1) contrast(1.1) brightness(1.02)',
    }
    : {
      color: '#d8d8d8',
    };

  return (
    <motion.section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#ad393d] px-4 sm:px-8 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
    >
      <div className="relative z-10 mx-auto max-w-7xl min-h-[calc(100dvh-5rem)] flex flex-col">
        <motion.div
          className="flex items-start justify-between gap-6 text-[#f4ebdd] uppercase tracking-[0.08em] text-[11px] sm:text-sm"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="max-w-[220px] leading-relaxed">
            FIZ ESSE PAPEL DE
            <br />
            PAREDE PARA VOCÊ
            <br />
            NÃO ESQUECER
            <br />
            DE MIM.
            <br />
          </p>
          <p className="pt-1">28 DE MARÇO</p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center mt-5 mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.04 }}
          viewport={{ once: true }}
        >
          <span className="h-px w-20 sm:w-48 bg-[#f4ebdd]/80" />
          <span className="relative mx-6 inline-flex h-14 w-14 items-center justify-center text-[#f4ebdd]">
            <span className="text-6xl leading-none">✦</span>
            <span className="absolute text-xs">❤</span>
          </span>
          <span className="h-px w-20 sm:w-48 bg-[#f4ebdd]/80" />
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            className="mx-auto text-center poster-title select-none text-[clamp(11rem,44vw,36rem)] leading-[0.82] tracking-[0.004em]"
            style={{ ...loveStyle, backgroundPosition: 'center 15%' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.55, ease: 'easeOut' },
              y: { duration: 0.55, ease: 'easeOut' }
            }}
            viewport={{ once: true }}
          >
            LOVE
          </motion.h1>

          <motion.div
            className="relative mx-auto mt-8 w-[360px] h-[80px] sm:w-[400px] sm:h-[90px] flex items-center justify-center text-[#f4ebdd] text-sm sm:text-base uppercase tracking-[0.06em]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            viewport={{ once: true }}
          >
            <svg viewBox="0 0 400 90" className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm">
              <ellipse cx="200" cy="45" rx="165" ry="18" fill="none" stroke="currentColor" strokeWidth="1.25" className="opacity-80" />
              <ellipse cx="200" cy="45" rx="165" ry="41" fill="none" stroke="currentColor" strokeWidth="1.25" className="opacity-80" />
              
              <path 
                d="M11,45 Q23,45 23,33 Q23,45 35,45 Q23,45 23,57 Q23,45 11,45 Z" 
                fill="currentColor" 
                className="opacity-100"
              />
              <path 
                d="M365,45 Q377,45 377,33 Q377,45 389,45 Q377,45 377,57 Q377,45 365,45 Z" 
                fill="currentColor" 
                className="opacity-100"
              />
            </svg>
            <span className="relative z-10 px-4 pt-0.5">Te ❤ mais que ] -∞; +∞ [ !</span>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-heading text-[#f4ebdd]">{content.hero.title}</p>
            <p className="handwritten text-3xl sm:text-4xl text-[#f4ebdd] mt-1.5">{content.hero.subtitle}</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
