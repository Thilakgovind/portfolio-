import { motion } from 'framer-motion';
import { education, profile, seasons } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';
import source from '../data/portfolio-data.json';

export default function About() {
  const facts = [
    { k: 'SRM', v: 'B.Tech, ECE (Data Science)', s: `${education[0].school} · ${education[0].score}`, image: source.media.srm_logo },
    ...[
      { id: 'marketing-team-lead-ai-geeks', k: 'AI Geeks', image: source.media.ai_geeks_logo },
      { id: 'corporate-crew-fast', k: 'FAST', image: source.media.fast_logo },
      { id: 'campus-ambassador-eplane', k: 'ePlane', image: source.media.eplane_logo },
    ].map(({ id, k, image }) => {
      const role = source.lanes.roles.find((r) => r.id === id);
      return { k, v: role?.title || 'Role', s: role?.organisation || '', image };
    }),
    { k: 'Based in', v: 'Madhavaram, Chennai', s: 'Tamil Nadu, India', image: '' },
  ];

  return (
    <>
      <SectionHeading kicker="The Pilot" title="About Me" />
      <div className="gutter grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
        <Tilt max={5} className="rounded-2xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#5a0b1b,#14060a_60%,#07070a)]" />
            <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]" />
            <img
              src={source.media.about_selfie}
              sizes="(max-width: 1024px) 90vw, 40vw"
              alt="Thilak Govind taking a mirror selfie"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-crimson-2">STARRING</p>
                <p className="font-display text-3xl leading-none text-bone">{profile.displayName}</p>
              </div>
              <span className="rounded border border-white/30 px-1.5 text-[10px] font-bold text-bone">S01–S{String(seasons.length).padStart(2, '0')}</span>
            </div>
          </div>
        </Tilt>
        </motion.div>

        <div>
          <motion.p
            className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] italic leading-[1.15] text-bone"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            “{profile.aboutQuote}”
          </motion.p>
          <p className="mt-4 text-sm text-mist">— {profile.fullName}</p>

          <motion.dl
            className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                className={`bg-ink-2 p-5 ${f.k === 'Based in' ? 'sm:col-span-2' : ''}`}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">{f.k}</dt>
                {f.k === 'Based in' ? (
                  <>
                    <dd className="mt-2 text-base font-semibold text-bone">{f.v}</dd>
                    <dd className="mt-1 text-sm leading-relaxed text-mist">
                      <a href={source.profile.home_map_url} target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 transition hover:text-bone hover:decoration-bone">{source.profile.home_address} ↗</a>
                    </dd>
                    <dd className="mt-3">
                      <a href={source.profile.home_map_url} target="_blank" rel="noreferrer" aria-label="Open Madhavaram home location on Google Maps" className="group block overflow-hidden rounded-lg ring-1 ring-white/15 transition hover:ring-white/50">
                        <span className="grid h-48 grid-cols-4 grid-rows-2 gap-1.5 bg-ink sm:h-56">
                          <img src={source.media.madhavaram_bus_terminus} alt="Madhavaram bus terminus" loading="lazy" className="col-span-2 h-full w-full object-cover object-top" />
                          <img src={source.media.madhavaram_milk_bottle} alt="Madhavaram milk bottle building" loading="lazy" className="row-span-2 h-full w-full object-cover" />
                          <img src={source.media.madhavaram_church} alt="St. Sebastian's Church, Madhavaram" loading="lazy" className="row-span-2 h-full w-full object-cover" />
                          <img src={source.media.madhavaram_map} alt="Map of Madhavaram" loading="lazy" className="col-span-2 h-full w-full object-cover" />
                        </span>
                      </a>
                    </dd>
                  </>
                ) : (
                  <>
                    <dd className="mt-2 flex items-center gap-2 text-base font-semibold text-bone">{f.image && <img src={f.image} alt="" className="h-8 w-12 rounded bg-white p-0.5 object-contain" />}{f.v}</dd>
                    <dd className="mt-0.5 text-xs text-mist">{f.s}</dd>
                  </>
                )}
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Interests</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span key={i} className="glass rounded-full px-3 py-1.5 text-xs font-medium text-bone">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
