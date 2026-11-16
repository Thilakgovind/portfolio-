import source from '../data/portfolio-data.json';

export default function QuoteBanner() {
  return (
    <section aria-label="Featured quote" className="gutter relative z-10 pt-24 sm:pt-28">
      <div className="glass mx-auto flex max-w-7xl items-center gap-5 overflow-hidden rounded-2xl border border-white/15 bg-[#1c1114]/90 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:gap-9 sm:p-5">
        <img
          src={source.media.featured_reason}
          alt="Everything Happens for a Reason poster"
          className="h-44 w-32 shrink-0 rounded-lg object-contain sm:h-64 sm:w-48"
        />
        <div className="min-w-0 py-2">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-crimson-2">Featured quote</p>
          <h2 className="mt-3 font-display text-2xl leading-none text-bone sm:text-5xl">Everything Happens for a Reason <span aria-label="evil eye" role="img">🧿</span></h2>
          <p className="mt-4 text-base font-extrabold text-bone sm:text-2xl">Let it all work out.</p>
        </div>
      </div>
    </section>
  );
}
