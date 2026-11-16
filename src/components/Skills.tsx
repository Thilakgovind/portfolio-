import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillAreas, type SkillItem } from '../data/skillInventory';
import { EASE, SectionHeading } from './fx';

const HUE = '#ff3d5a';

export default function Skills() {
  const [cat, setCat] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);
  const category = skillAreas[cat];
  const selectedGroup = category.groups[groupIndex] ?? category.groups[0];
  const hue = HUE;

  return (
    <>
      <SectionHeading kicker="Across disciplines" title="My Skill Universe" aside={<p className="max-w-xs text-sm text-mist">Evidence scale: 1 exposure, 2 study or reported use, 3 documented work, 4 repeated verified work, 5 expert-level proof. Each card explains its rating.</p>} />

      <div className="gutter grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        {/* genre list */}
        <div className="rail -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" role="tablist" aria-label="Skill categories">
          {skillAreas.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === cat}
              onClick={() => { setCat(i); setGroupIndex(0); }}
              className={`group relative shrink-0 rounded-lg px-4 py-3 text-left transition lg:px-5 ${i === cat ? 'text-bone' : 'text-smoke hover:text-bone'}`}
            >
              {i === cat && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-lg bg-crimson/15 ring-1 ring-crimson-2/40" transition={{ duration: 0.45, ease: EASE }} />}
              {i === cat && <motion.span layoutId="skill-bar" className="absolute bottom-2 left-0 top-2 hidden w-[3px] rounded lg:block" style={{ background: hue }} />}
              <span className="relative block font-display text-2xl tracking-wide lg:text-3xl">{c.title}</span>
              <span className="relative hidden text-xs text-smoke lg:block">
                {c.groups.reduce((total, group) => total + group.skills.length, 0)} topics · {c.groups.length} areas
              </span>
            </button>
          ))}
        </div>

        {/* skill cards */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div key={`${category.id}-${selectedGroup.title}`} initial="hidden" animate="show" exit="exit" transition={{ staggerChildren: 0.035 }}>
              <motion.p
                className="mb-5 text-sm text-mist"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="font-semibold text-bone">{category.title}</span> — {category.intro}
              </motion.p>
              <div className="rail mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={`${category.title} topics`}>
                {category.groups.map((group, i) => (
                  <button key={group.title} role="tab" aria-selected={i === groupIndex} type="button" onClick={() => setGroupIndex(i)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${i === groupIndex ? 'border-crimson-2/60 bg-crimson/20 text-bone' : 'border-white/10 text-mist hover:text-bone'}`}>
                    {group.title}
                  </button>
                ))}
              </div>
              <section key={selectedGroup.title}>
                <h3 className="font-display text-2xl tracking-wide text-bone sm:text-3xl">{selectedGroup.title}</h3>
                <p className="mb-4 text-sm text-mist">{selectedGroup.description} · {selectedGroup.skills.length} topics</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {selectedGroup.skills.map((s) => <SkillCard key={s.name} skill={s} hue={hue} />)}
                </div>
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SkillCard({ skill, hue }: { skill: SkillItem; hue: string }) {
  const roleCard = skill.name === 'AI Geeks Chennai Marketing Lead' || skill.name === 'InAmigos Foundation Junior HR';
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      }}
      whileHover={{ y: -6 }}
      className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-xl bg-ink-2 p-4 text-left ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_18px_50px_-12px_rgba(255,61,90,0.25)] hover:ring-crimson-2/40"
    >
      {skill.image && roleCard ? (
        <>
          <img src={skill.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35" />
          <div className="relative min-h-16 flex-1" />
        </>
      ) : skill.image ? (
        <div className="relative -mx-4 -mt-4 mb-1 h-32 shrink-0 overflow-hidden border-b border-white/10 bg-[#16161b]">
          <img src={skill.image} alt="" loading="lazy" className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105" />
        </div>
      ) : (
        <>
          <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-60" style={{ background: hue }} />
          <motion.span className="relative flex h-12 w-12 items-center justify-center rounded-lg font-display text-2xl tracking-wide" style={{ background: `${hue}1f`, color: hue, boxShadow: `inset 0 0 0 1px ${hue}55` }} aria-hidden>
            {skill.name.split(/\s|&/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase()}
          </motion.span>
        </>
      )}
      <span className="relative mt-4 flex items-center gap-2 text-[15px] font-semibold text-bone">
        {skill.name}
      </span>
      <p className={`relative mt-2 text-[11px] leading-snug ${skill.image ? 'text-bone/90' : 'text-mist'}`}>{skill.description}</p>
      <p className="relative mt-auto pt-3 text-[10px] leading-snug text-bone/75">{skill.ratingBasis}</p>
      <div className="relative flex gap-0.5 pt-2" role="img" aria-label={`${skill.name}: ${skill.stars} out of 5 stars. ${skill.ratingBasis}`}>
        {[1, 2, 3, 4, 5].map(value => (
          <span key={value} aria-hidden="true" className={`min-h-8 min-w-7 text-center text-xl leading-none ${value <= skill.stars ? 'text-crimson-2' : skill.image ? 'text-white/50' : 'text-white/20'}`}>★</span>
        ))}
      </div>
    </motion.article>
  );
}
