import { motion } from 'framer-motion';
import { certifications, education, experience, profile, projects, skillCategories, summaryAchievements } from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';
import source from '../data/portfolio-data.json';

/** A concise on-page introduction; the full document opens in the resume viewer. */
export default function ResumeSection({ onView }: { onView: () => void }) {
  const genie = summaryAchievements.find((item) => item.id === 'geniexhub-project-eclipse-neerwatch');
  return (
    <>
      <SectionHeading kicker="The screenplay" title="The Full Story" />
      <div className="gutter mx-auto grid max-w-6xl gap-6 pb-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-crimson-2">At a glance</p>
          <h3 className="mt-3 font-display text-4xl leading-none tracking-wide text-bone sm:text-5xl">{profile.fullName}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:text-base">
            ECE (Data Science) student exploring practical AI, software and electronics through projects, research and community work.
          </p>
          <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Education</dt>
              <dd className="mt-1.5 text-sm leading-6 text-bone">SRMIST · {education[0].degree} · {education[0].score}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Experience</dt>
              <dd className="mt-1.5 text-sm leading-6 text-bone">AI Geeks marketing lead · FAST corporate crew · InAmigos HR</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Highlights</dt>
              <dd className="mt-1.5 text-sm leading-6 text-bone">HackSprint Top 12 · RESOLVE 2nd prize{genie ? ` · GenieXHub ${genie.title}` : ''}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Recent project</dt>
              <dd className="mt-1.5 text-sm leading-6 text-bone">NeerWatch · water quality and waterborne disease monitoring prototype</dd>
            </div>
          </dl>
        </motion.article>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <p className="font-serif text-2xl italic leading-tight text-bone">The details, in one place.</p>
          <p className="mt-3 text-sm leading-6 text-mist">
            Explore {projects.length} projects, {certifications.length} credentials and the full journey.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
              >
                ▶ View Resume
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <a
                href={profile.resumePdf}
                download="Thilak_Govind_Resume.pdf"
                data-cursor="link"
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                ⤓ Download Resume
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </>
  );
}

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2 first:mt-0">{children}</h4>;
}

export function ResumeSheet() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[#111116] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">STARRING</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{profile.fullName}</h3>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a href={`mailto:${profile.email}`} className="block hover:text-bone">
            {profile.email}
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
            LinkedIn ↗
          </a>
          {' · '}
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
            GitHub ↗
          </a>
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Education</H>
          {education.map((e) => (
            <div key={e.school} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {e.school.includes('SRM') && <img src={source.media.srm_logo} alt="SRM" className="mr-2 inline-block h-7 w-10 rounded bg-white p-0.5 object-contain align-middle" />}
                  {e.school}, {e.place}
                </p>
                <p className="text-xs text-smoke">{e.period}</p>
              </div>
              <p className="text-xs text-mist">
                {e.degree} · <span className="text-bone/80">{e.score}</span>
              </p>
            </div>
          ))}

          <H>Work Experience</H>
          {experience.map((x) => (
            <div key={x.company}>
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {x.company} — {x.role}
                </p>
                <p className="text-xs text-smoke">{x.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-mist">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <H>Projects</H>
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">{p.title}</p>
                <p className="text-xs text-smoke">{p.year}</p>
              </div>
              <p className="text-xs text-mist">{p.stack.join(', ')}</p>
              <p className="mt-1 text-xs leading-relaxed text-bone/80">{p.logline}</p>
              {(p.github || p.deck) && <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-bone">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="underline decoration-white/50 underline-offset-2 hover:decoration-white">{p.github.includes('github.com') ? 'GitHub repository' : 'Project source'} ↗</a>}
                {p.deck && <a href={p.deck} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline decoration-white/50 underline-offset-2 hover:decoration-white">{p.notesImage && <img src={p.notesImage} alt="" className="h-5 w-5 rounded object-contain" />}Presentation deck ↗</a>}
              </div>}
            </div>
          ))}
        </div>

        <div>
          <H>Skills</H>
          <div className="space-y-2">
            {skillCategories.map((c) => (
              <p key={c.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">{c.title}: </span>
                {c.skills.map((s) => s.name).join(', ')}
              </p>
            ))}
          </div>

          <H>Achievements</H>
          <ul className="space-y-2">
            {summaryAchievements.map((a) => (
              <li key={a.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">
                  {a.title} — {a.org}.
                </span>{' '}
                {a.detail}
              </li>
            ))}
          </ul>

          <H>Certifications</H>
          <p className="text-xs leading-relaxed text-mist">
            {Array.from(new Set(certifications.map((c) => c.issuer)))
              .map((iss) => `${iss}: ${certifications.filter((c) => c.issuer === iss).map((c) => c.name).join(', ')}`)
              .join(' · ')}
          </p>
        </div>
      </div>
    </article>
  );
}
