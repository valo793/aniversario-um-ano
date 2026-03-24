import { motion, useReducedMotion } from 'framer-motion';
import content from '@/data/content.json';

interface GalleryProps {
  galleryImages?: string[];
}

interface GalleryFrame {
  alt: string;
  src: string;
  caption: string;
}

const MEMORY_CAPTIONS = [
  'riso facil, abraco certeiro',
  'o privilégio de ser esquisito ao seu lado',
  'um segundo que virou casa',
  'depois desse dia, tudo mudou',
  'memoria que ainda esquenta o peito',
];

export default function Gallery({ galleryImages }: GalleryProps) {
  const prefersReducedMotion = useReducedMotion();

  const images: GalleryFrame[] = content.gallery.images.map((image, index) => ({
    alt: image.alt,
    src: galleryImages?.[index] || '',
    caption: MEMORY_CAPTIONS[index % MEMORY_CAPTIONS.length],
  }));

  const featured = images[0];
  const sideFrames = images.slice(1, 3);
  const stripFrames = images.slice(3, 8);

  const getObjectPosition = (index: number) => {
    if (index === 0) return 'object-[center_15%]'; // Frame 01 (mostra a parte de cima/rostos)
    if (index === 6) return 'object-[center_85%]'; // Frame 07 (mostra a parte de baixo/rostos)
    return 'object-center';
  };

  const renderPhoto = (image: GalleryFrame | undefined, index: number, className: string) => {
    if (!image?.src) {
      return <div className={`${className} bg-neutral-900`} />;
    }

    const finalClassName = `${className} ${getObjectPosition(index)}`;

    return (
      <motion.img
        src={image.src}
        alt={image.alt}
        className={finalClassName}
        loading="lazy"
        initial={{ filter: 'grayscale(1) contrast(1.07) brightness(0.9) saturate(0) blur(8px)' }}
        whileInView={{ filter: 'grayscale(1) contrast(1.07) brightness(0.9) saturate(0) blur(0px)' }}
        transition={{
          filter: { duration: 1.2, delay: index * 0.15 }
        }}
        viewport={{ once: true }}
      />
    );
  };

  return (
    <motion.section
      id="gallery"
      className="relative min-h-[100dvh] w-full py-24 px-4 sm:px-6 scene-beige"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="ornament-line text-[#6a3a3d] mb-6">*</p>
          <h2 className="text-heading text-[#6a3a3d] mb-4 tracking-tight">{content.gallery.title}</h2>
          <p className="handwritten text-3xl sm:text-4xl text-[#6a3a3d]/85">{content.gallery.subtitle}</p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-[#8c6e5a]/40 bg-[#090807] p-4 sm:p-6 md:p-8 shadow-[0_34px_90px_rgba(19,9,9,0.5)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-120px' }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27180%27 height=%27180%27 filter=%27url(%23n)%27 opacity=%270.35%27/%3E%3C/svg%3E')" />
          <div className="pointer-events-none absolute inset-y-4 left-2 hidden md:block w-[6px] opacity-65 bg-[repeating-linear-gradient(to_bottom,rgba(248,236,213,0.46)_0_7px,transparent_7px_14px)]" />
          <div className="pointer-events-none absolute inset-y-4 right-2 hidden md:block w-[6px] opacity-65 bg-[repeating-linear-gradient(to_bottom,rgba(248,236,213,0.46)_0_7px,transparent_7px_14px)]" />

          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#f0dcc4]/20 pb-4">
              <p className="text-caption uppercase tracking-[0.22em] text-[#f4dfc6]/78">edição artesanal · nosso filme</p>
              <p className="text-caption uppercase tracking-[0.22em] text-[#f4dfc6]/62">framebook 2025-2026</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.9fr]">
              <motion.figure
                className="relative rounded-[22px] border border-[#f0dcc4]/20 bg-black p-2 shadow-[0_20px_44px_rgba(0,0,0,0.56)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-120px' }}
              >
                <div className="relative h-[270px] sm:h-[360px] lg:h-[420px] overflow-hidden rounded-[16px]">
                  {renderPhoto(featured, 0, 'h-full w-full object-cover')}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/72 to-transparent" />
                </div>
                <figcaption className="pointer-events-none absolute left-6 bottom-6 right-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-caption uppercase tracking-[0.2em] text-[#f4dfc6]/68">frame 01</p>
                    <p className="text-sm sm:text-base text-[#f4dfc6]">{featured?.caption}</p>
                  </div>
                  <p className="handwritten text-2xl text-[#f4dfc6]/90">&lt;3</p>
                </figcaption>
              </motion.figure>

              <div className="space-y-4">
                {sideFrames.map((image, index) => (
                  <motion.figure
                    key={`${image.alt}-${index}`}
                    className="relative overflow-hidden rounded-[18px] border border-[#f0dcc4]/18 bg-black p-2 shadow-[0_16px_34px_rgba(0,0,0,0.5)]"
                    style={{ rotate: prefersReducedMotion ? '0deg' : `${index === 0 ? 0.9 : -0.8}deg` }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, delay: 0.08 + index * 0.08 }}
                    viewport={{ once: true, margin: '-120px' }}
                  >
                    <div className="h-[170px] sm:h-[205px] overflow-hidden rounded-[12px]">
                      {renderPhoto(image, index + 1, 'h-full w-full object-cover')}
                    </div>
                    <figcaption className="mt-3 px-1 pb-1">
                      <p className="text-caption uppercase tracking-[0.18em] text-[#f4dfc6]/58">frame 0{index + 2}</p>
                      <p className="text-sm text-[#f4dfc6]/88">{image.caption}</p>
                    </figcaption>
                  </motion.figure>
                ))}

                <motion.aside
                  className="rounded-[16px] border border-[#f0dcc4]/18 bg-[#11100f] px-4 py-5 shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.46, delay: 0.2 }}
                  viewport={{ once: true, margin: '-120px' }}
                >
                  <p className="text-[#f4dfc6]/93 text-sm sm:text-base leading-relaxed italic">
                    Recorte do nosso ano. Luzes baixas, risos altos e a certeza de que você é meu lugar favorito.
                  </p>
                  <p className="mt-3 text-caption uppercase tracking-[0.2em] text-[#f4dfc6]/55">anotacao 06.02.2025</p>
                </motion.aside>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {stripFrames.map((image, index) => (
                <motion.figure
                  key={`${image.alt}-strip-${index}`}
                  className="relative overflow-hidden rounded-[14px] border border-[#f0dcc4]/18 bg-black p-1.5 shadow-[0_12px_24px_rgba(0,0,0,0.42)]"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.08 + index * 0.05 }}
                  viewport={{ once: true, margin: '-120px' }}
                >
                  <div className="h-[110px] sm:h-[126px] overflow-hidden rounded-[10px]">
                    {renderPhoto(image, index + 3, 'h-full w-full object-cover')}
                  </div>
                  <figcaption className="px-1 pt-2 pb-1">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4dfc6]/52">frame {String(index + 4).padStart(2, '0')}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
