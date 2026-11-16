import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotionPref } from '../hooks/useMedia';
import { readVoiceMuted, VOICE_VOLUME, writeVoiceMuted } from '../hooks/voicePreference';
import source from '../data/portfolio-data.json';

export type Pose = 'stand' | 'run' | 'walk' | 'tech' | 'speak' | 'cry' | 'brainstorm' | 'celebrate' | 'present' | 'build' | 'exhausted' | 'collaborate' | 'listen' | 'hurry' | 'triumphant';
const bounds: Record<Pose, [number, number, number, number]> = {
  stand: [10, 12, 180, 450], run: [210, 30, 310, 430], walk: [525, 25, 220, 430], tech: [730, 65, 265, 390],
  speak: [5, 505, 235, 335], cry: [270, 520, 245, 320], brainstorm: [525, 500, 245, 340], celebrate: [775, 495, 220, 340],
  present: [5, 865, 255, 300], build: [290, 885, 285, 285], exhausted: [560, 875, 330, 290],
  collaborate: [0, 1175, 325, 395], listen: [320, 1205, 210, 365], hurry: [530, 1195, 270, 375], triumphant: [800, 1190, 195, 380],
};
export function ThilluSprite({ pose, className = '' }: { pose: Pose; className?: string }) {
  const [x, y, width, height] = bounds[pose];
  return <svg aria-hidden viewBox={`${x} ${y} ${width} ${height}`} className={className}><image href={source.media.thillu_atlas} width="995" height="1580" /></svg>;
}
const labels: Record<Pose, string> = {
  stand: 'Here with you', run: 'Coming along!', walk: 'Exploring', tech: 'At work',
  speak: 'Let me tell you', cry: 'The end? Already?', brainstorm: 'Thinking',
  celebrate: 'Great pick!', present: 'Presenting', build: 'Building',
  exhausted: 'What a sprint!', collaborate: 'Teamwork', listen: 'Listening',
  hurry: 'On my way!', triumphant: 'We did it!',
};

type SpokenSection = 'about' | 'journey' | 'skills' | 'picks' | 'moments' | 'story';
const voiceLines: Record<SpokenSection, string> = {
  about: 'I’m Thillu. Here is a little about Thilak and what drives him.',
  journey: 'Follow the journey through college, teams, and events.',
  skills: 'These skills are rated against the work shared in this portfolio.',
  picks: 'Here are a few projects and moments worth exploring.',
  moments: 'The awards and certificates add more to the story.',
  story: 'That is the full story so far. Let us keep building.',
};
const sectionPose: Record<SpokenSection, Pose> = {
  about: 'listen', journey: 'walk', skills: 'tech', picks: 'brainstorm', moments: 'triumphant', story: 'present',
};

export default function Thillu({ quiet = false }: { quiet?: boolean }) {
  const reduced = useReducedMotionPref();
  const [pose, setPose] = useState<Pose>('stand');
  const [travel, setTravel] = useState(0);
  const [visible, setVisible] = useState(() => window.innerWidth >= 640);
  const [atEnd, setAtEnd] = useState(false);
  const [activeSection, setActiveSection] = useState<SpokenSection | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(readVoiceMuted);
  const [speaking, setSpeaking] = useState(false);
  const [caption, setCaption] = useState('');
  const spoken = useRef(new Set<SpokenSection>());
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const lastY = useRef(0);
  const settle = useRef<number | undefined>(undefined);
  const burst = useRef(0);

  const stopSpeech = useCallback(() => {
    if ('speechSynthesis' in window && utterance.current) window.speechSynthesis.cancel();
    utterance.current = null;
    setSpeaking(false);
    setCaption('');
  }, []);

  const speakSection = useCallback((section: SpokenSection, byClick = false) => {
    if ((!unlocked && !byClick) || muted || quiet || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
    stopSpeech();
    const line = voiceLines[section];
    const speech = new SpeechSynthesisUtterance(line);
    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find(v => v.lang.toLowerCase().startsWith('en-in')) ?? voices.find(v => v.lang.toLowerCase().startsWith('en')) ?? null;
    speech.lang = speech.voice?.lang ?? 'en-IN';
    speech.rate = 0.94;
    speech.pitch = 0.9;
    speech.volume = VOICE_VOLUME;
    speech.onstart = () => {
      if (utterance.current !== speech) return;
      spoken.current.add(section);
      setCaption(line);
      setSpeaking(true);
    };
    const finish = () => {
      if (utterance.current !== speech) return;
      utterance.current = null;
      setCaption('');
      setSpeaking(false);
    };
    speech.onend = finish;
    speech.onerror = finish;
    utterance.current = speech;
    window.speechSynthesis.speak(speech);
  }, [muted, quiet, stopSpeech, unlocked]);

  useEffect(() => {
    const unlock = () => setUnlocked(true);
    const onPreference = () => setMuted(readVoiceMuted());
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('thilak-voice-preference', onPreference);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('thilak-voice-preference', onPreference);
    };
  }, []);

  useEffect(() => {
    const ids = Object.keys(voiceLines) as SpokenSection[];
    const observer = new IntersectionObserver(() => {
      const center = window.innerHeight * 0.5;
      const current = ids.map(id => ({ id, rect: document.getElementById(id)?.getBoundingClientRect() }))
        .filter((item): item is { id: SpokenSection; rect: DOMRect } => !!item.rect && item.rect.top < center && item.rect.bottom > center);
      setActiveSection(current[0]?.id ?? null);
    }, { rootMargin: '-35% 0px -35% 0px' });
    ids.forEach(id => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (quiet || muted) stopSpeech();
  }, [quiet, muted, stopSpeech]);

  useEffect(() => {
    if (!activeSection || !unlocked || muted || quiet || spoken.current.has(activeSection)) return;
    const timer = window.setTimeout(() => speakSection(activeSection), 800);
    return () => window.clearTimeout(timer);
  }, [activeSection, unlocked, muted, quiet, speakSection]);

  useEffect(() => () => stopSpeech(), [stopSpeech]);

  useEffect(() => {
    if (!reduced) return;
    const update = () => {
      setVisible(window.innerWidth >= 640 || window.scrollY > window.innerHeight * 0.8);
      setAtEnd(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    lastY.current = window.scrollY;
    const idle = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) setPose('cry');
      else setPose(activeSection ? sectionPose[activeSection] : ['stand', 'tech', 'brainstorm', 'listen'][Math.floor(Date.now() / 7000) % 4] as Pose);
    };
    const onScroll = () => {
      const delta = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      setVisible(window.innerWidth >= 640 || window.scrollY > window.innerHeight * 0.8);
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setTravel(window.innerWidth < 640 ? 0 : Math.round(Math.sin(Math.min(1, window.scrollY / range) * Math.PI) * Math.min(220, window.innerWidth * 0.18)));
      if (Math.abs(delta) < 3) return;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) setPose('cry');
      else {
        burst.current = Math.abs(delta) > 80 ? burst.current + 1 : Math.max(0, burst.current - 1);
        setPose(burst.current > 8 ? 'exhausted' : delta > 0 ? 'run' : 'walk');
      }
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(idle, 900);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest('[data-thillu-control]')) return;
      const card = target.closest<HTMLElement>('[data-thillu]');
      const next = card?.dataset.thillu as Pose | undefined;
      if (next && next in bounds) setPose(next);
      else if (target.closest('img')) setPose('present');
      else return;
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(idle, 2200);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest('[data-thillu-control]')) return;
      setPose(target.closest('img') ? 'build' : 'hurry');
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(idle, 1400);
    };
    const timer = window.setInterval(idle, 7000);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerover', onPointer);
    document.addEventListener('click', onClick);
    return () => {
      window.clearTimeout(settle.current);
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerover', onPointer);
      document.removeEventListener('click', onClick);
    };
  }, [reduced, activeSection]);

  const shownPose = speaking ? 'speak' : reduced ? (atEnd ? 'cry' : activeSection ? sectionPose[activeSection] : 'stand') : pose;

  return (
    <aside aria-label={`Thillu: ${labels[shownPose]}`} aria-hidden={!visible} className={`pointer-events-none fixed bottom-1 z-[75] flex origin-bottom-right scale-[0.55] flex-col items-center transition-[right,opacity] duration-500 ease-out sm:bottom-6 sm:scale-100 ${visible ? 'opacity-100' : 'invisible opacity-0'}`} style={{ right: `calc(0.75rem + ${travel}px)` }}>
      <button data-thillu-control type="button" onClick={() => { const next = !muted; setMuted(next); writeVoiceMuted(next); if (next) stopSpeech(); }} aria-label={muted ? 'Unmute Thillu' : 'Mute Thillu'} aria-pressed={muted} className="glass pointer-events-auto mb-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold text-bone shadow-lg">{muted ? 'VOICE OFF' : 'VOICE ON'}</button>
      {speaking && caption && <span role="status" className="glass mb-2 max-w-[190px] rounded-lg px-3 py-2 text-center text-xs leading-snug text-bone shadow-lg">{caption}</span>}
      {!speaking && <span className="glass mb-1 max-w-32 rounded-full px-3 py-1 text-center text-[10px] font-bold text-bone shadow-lg">THILLU · {labels[shownPose]}</span>}
      <button data-thillu-control type="button" aria-label="Ask Thillu to repeat this section" onClick={() => { setUnlocked(true); speakSection(activeSection ?? 'about', true); }} className="pointer-events-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-2">
        <ThilluSprite pose={shownPose} className={`h-[120px] w-[82px] drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] sm:h-[156px] sm:w-[100px] ${!reduced && speaking ? 'animate-[thillu-talk_.32s_ease-in-out_infinite_alternate]' : !reduced && (shownPose === 'run' || shownPose === 'hurry') ? 'animate-[thillu-bob_.28s_ease-in-out_infinite_alternate]' : ''}`} />
      </button>
    </aside>
  );
}
