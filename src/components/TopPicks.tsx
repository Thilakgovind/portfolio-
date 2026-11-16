import { useRef } from 'react';
import { motion } from 'framer-motion';
import { topPicks } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import { PosterBackdrop } from './Poster';
import { RailButtons } from './Rail';

export default function TopPicks() {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <>
      <SectionHeading kicker={`${topPicks.length} selected highlights`} title="Top Picks" />
      <div className="group/rail relative">
        <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-6">
          {topPicks.map((pick, i) => (
            <motion.div
              key={pick.title}
              className="group relative h-[320px] w-[220px] shrink-0 snap-start sm:h-[350px] sm:w-[240px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px -5% 0px 0px' }}
              transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.06, ease: EASE }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#141419] transition duration-500 group-hover:-translate-y-1 group-hover:border-white/30">
                <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${pick.containImage ? 'bg-[#15161d]' : ''}`}>
                  {pick.image ? (
                    <>
                      <img src={pick.image} alt="" loading="lazy" className={`h-full w-full ${pick.containImage ? 'object-contain object-top p-3' : 'object-cover object-center'}`} />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </>
                  ) : <PosterBackdrop palette={pick.palette} />}
                </div>
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="self-start rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-bone">{String(i + 1).padStart(2, '0')} · {pick.label}</span>
                  <div>
                    <p className="font-display text-3xl leading-none tracking-wide text-bone">{pick.title}</p>
                    <p className="mt-2 text-sm font-semibold text-bone/90">{pick.detail}</p>
                    {(pick.link || pick.deck) && <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-bone">
                      {pick.link && pick.link !== 'https://itch.io' && <a href={pick.link} target="_blank" rel="noreferrer" className="underline decoration-white/50 underline-offset-2 hover:decoration-white">{pick.link.includes('github.com') ? 'GitHub' : 'Source'} ↗</a>}
                      {pick.deck && <a href={pick.deck} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-white/50 underline-offset-2 hover:decoration-white">{pick.notesImage && <img src={pick.notesImage} alt="" className="h-4 w-4 rounded object-contain" />}Slides ↗</a>}
                    </div>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <RailButtons rail={rail} />
      </div>
    </>
  );
}
