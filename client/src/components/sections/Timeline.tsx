import { motion } from 'framer-motion';
import content from '@/data/content.json';

export default function Timeline() {
  const timelineItems = content.timeline;

  return (
    <motion.section
      id="timeline"
      className="relative min-h-[100dvh] w-full py-24 px-5 sm:px-8 scene-beige"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="ornament-line text-[#6a3a3d] text-lg mb-5">*</p>
          <h2 className="text-heading text-[#6a3a3d] mb-3">Fragmentos do Tempo</h2>
          <p className="handwritten text-3xl text-[#6a3a3d]/90">cada data virou um abraco</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-[#9a7274]/55"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.15, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-120px' }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8 sm:space-y-12">
            {timelineItems.map((item, index) => (
              <motion.article
                key={item.title}
                className="relative pl-12 sm:pl-0"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, ease: 'easeOut', delay: index * 0.08 }}
                viewport={{ once: true, margin: '-110px' }}
              >
                <motion.div
                  className="absolute left-[11px] sm:left-1/2 sm:-translate-x-1/2 top-8 z-10 w-4 h-4 rounded-full bg-[#8a4a4d] shadow-[0_0_0_5px_rgba(138,74,77,0.18)]"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.08 + 0.12 }}
                  viewport={{ once: true }}
                />

                <div className={`sm:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                  <motion.div
                    className="paper-surface rounded-2xl border border-black/12 p-6 sm:p-7 shadow-[0_22px_40px_rgba(0,0,0,0.28)]"
                    initial={{ opacity: 0, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 + 0.08 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-black/55 mb-2">{item.date}</p>
                    <h3 className="text-3xl sm:text-4xl leading-tight text-black/85 mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-black/70 leading-relaxed">{item.text}</p>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
