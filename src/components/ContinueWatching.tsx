import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sectionMeta, type SectionId } from '../data/portfolio';
import { useWatchProgress } from '../hooks/sectionProgress';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { useFinePointer } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import { RailButtons } from './Rail';

const ART: Record<SectionId, string> = {
  journey: '/assets/episode-journey.png',
  picks: '/assets/episode-picks.png',
  skills: '/assets/episode-skills.png',
  moments: '/assets/episode-achievements.png',
  about: '/assets/episode-about.png',
  story: '/assets/episode-story.png',
};

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const progress = useWatchProgress();
  const { scrollTo } = useSmoothScroll();
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  return (
    <section aria-labelledby="continue-title" className="relative z-10 -mt-10 pb-10 sm:-mt-16">
      <div className="gutter mb-4 flex items-end justify-between">
        <RevealText as="h2" text="Continue Exploring" className="font-sans text-lg font-semibold tracking-tight text-bone sm:text-2xl" />
        <span className="hidden text-xs text-smoke sm:block">Progress shows what you&apos;ve watched so far</span>
      </div>
      <div className="group/rail relative">
        <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-3 overflow-x-auto py-8 sm:gap-4" data-cursor={fine ? undefined : 'drag'}>
          {order.map((id, i) => {
            const meta = sectionMeta[id];
            const p = progress[id] ?? 0;
            const shift = fine && hovered !== null && hovered !== i ? (i < hovered ? -14 : 14) : 0;
            return (
              <motion.button
                key={id}
                type="button"
                data-cursor="play"
                onClick={() => scrollTo(`#${id}`)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group relative aspect-video w-[72vw] shrink-0 snap-start overflow-visible text-left sm:w-[42vw] md:w-[30vw] lg:w-[22vw]"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                animate={{ x: shift, scale: fine && hovered === i ? 1.08 : 1, zIndex: hovered === i ? 10 : 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-black ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,61,90,0.6)]">
                  <div className="absolute inset-x-0 top-0 h-[64%] overflow-hidden bg-[#171719]">
                    <motion.img src={ART[id]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 blur-lg" animate={{ scale: hovered === i ? 1.12 : 1 }} transition={{ duration: 0.8, ease: EASE }} />
                    <motion.img src={ART[id]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" animate={{ scale: hovered === i ? 1.06 : 1 }} transition={{ duration: 0.8, ease: EASE }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex h-[36%] flex-col justify-center bg-[#09090c] px-4 py-2">
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">Episode {String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-xl leading-none tracking-wide text-bone sm:text-2xl">
                      {meta.card}
                    </span>
                    <span className="mt-1 hidden text-xs text-mist sm:block">
                      {meta.meta}
                    </span>
                  </div>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-xs text-bone backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                    ▶
                  </span>
                </div>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded bg-white/15">
                  <motion.div className="h-full origin-left bg-crimson" animate={{ scaleX: Math.max(0.04, p) }} transition={{ duration: 0.6 }} />
                </div>
              </motion.button>
            );
          })}
        </div>
        <RailButtons rail={rail} />
      </div>
    </section>
  );
}
