import { motion } from 'framer-motion';
import type { Episode } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { PosterBackdrop } from './Poster';
import source from '../data/portfolio-data.json';

export default function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const [season, ep] = episode.code.split(' ');
  const isSrm = season === 'S01' || [episode.title, ...episode.tags].some(value => /\bSRM\b|SRMIST/i.test(value));
  return (
    <motion.article
      data-thillu={season === 'S02' ? 'collaborate' : 'present'}
      className="w-[80vw] shrink-0 snap-start sm:w-[52vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw]"
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <Tilt max={7} className="group h-full rounded-xl">
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/10 transition duration-500 group-hover:ring-crimson-2/60">
          {episode.image && <>
            <img src={episode.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full transition duration-[1.2s] group-hover:scale-105 ${episode.containImage ? 'bg-[#0b3768] object-contain object-top p-6' : 'object-cover object-center'}`} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/65 to-black/95" />
          </>}
          <div className="relative aspect-video overflow-hidden">
            {!episode.image && <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-110">
              <PosterBackdrop palette={episode.palette}>
                <span className="absolute -bottom-6 right-2 font-display text-[7.5rem] leading-none text-white/[0.09]">{ep}</span>
              </PosterBackdrop>
            </div>}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="rounded bg-black/50 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] text-bone backdrop-blur">{season}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-bone/80">EPISODE {ep.replace('E', '')}</span>
            </div>
            {episode.badgeImage ? (
              <img src={episode.badgeImage} alt={episode.tags[0]} className="absolute right-4 top-4 h-9 w-14 rounded bg-white p-0.5 object-contain" />
            ) : isSrm ? (
              <img src={source.media.srm_logo} alt="SRM" className="absolute right-4 top-4 h-9 w-14 rounded bg-white p-0.5 object-contain" />
            ) : null}
            {episode.title.includes('CDC50') && <span className="absolute right-4 top-4 rounded bg-crimson px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">New event</span>}
            <h4 className="absolute bottom-4 left-4 right-4 font-display text-3xl leading-none tracking-wide text-bone [transform:translateZ(30px)] sm:text-4xl">{episode.title}</h4>
          </div>
          <div className={`relative flex flex-1 flex-col p-4 ${episode.image ? 'bg-black/10' : ''}`}>
            <div className="mb-2 flex items-center justify-between text-[11px] text-smoke">
              <span className="font-semibold text-mist">{episode.runtime}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[10px] text-bone transition group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                ▶
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${episode.image ? 'text-bone/95' : 'text-bone/80'}`}>{episode.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {episode.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-mist">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
