import source from './portfolio-data.json';

export type Palette = { from: string; via: string; to: string; accent: string };
const palettes: Palette[] = [
  { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' },
  { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
  { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
  { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' },
];
const first = palettes[0];
const p = source.profile;
export const profile = {
  fullName: p.name, displayName: 'Thilak Govind', firstName: 'THILAK', seriesTag: 'MY JOURNEY',
  originalLabel: 'A THILAK ORIGINAL', role: 'Python Developer | AI Builder | Product Developer',
  tagline: ['Python Developer', 'AI Builder', 'Product Developer'],
  intro: p.summary, aboutQuote: p.about_quote, location: p.location, email: source.contact.email,
  links: { linkedin: source.contact.linkedin, github: source.contact.github, instagram: source.contact.instagram, x: source.contact.x, portfolio: source.contact.portfolio_repo },
  resumePdf: '/assets/Thilak_Govind_Resume.pdf',
  portrait: { src: '/assets/thilak-speaking.png', srcSet: '', alt: 'Thilak Govind presenting on stage' },
  interests: p.interests,
};
export const education = [{ school: 'SRM Institute of Science and Technology', place: 'Kattankulathur, Chennai', degree: 'B.Tech ECE (Data Science)', period: '2025 – 2029', score: 'CGPA 8.63/10' }];
export const experience = source.lanes.roles.map(r => ({ company: r.organisation, role: r.title, place: r.location || 'To confirm', period: r.date || 'To confirm', points: [r.description] }));
export type Metric = { value: string; label: string };
export type Project = { id: string; title: string; year: string; genre: string; logline: string; stack: string[]; build: string[]; features: string[]; metrics: Metric[]; github?: string; deck?: string; notesImage?: string; image?: string; palette: Palette; motif: 'shield' | 'flow' | 'tenants' };
export const projects: Project[] = source.lanes.projects.map((x, i) => ({
  id: x.id, title: x.title, year: x.date || 'To confirm', genre: (x.stack || []).slice(0, 3).join(' • ') || 'PROJECT',
  logline: x.description, stack: x.stack || [], build: [x.description], features: x.stack || [], metrics: [],
  github: 'github' in x && typeof x.github === 'string' ? x.github : undefined,
  deck: 'deck' in x && typeof x.deck === 'string' ? x.deck : undefined,
  notesImage: 'notes_image' in x && typeof x.notes_image === 'string' ? x.notes_image : undefined,
  image: x.image || undefined, palette: palettes[i % palettes.length], motif: (['shield','flow','tenants'] as const)[i % 3],
}));
export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; image: string; link?: string };
export const achievements: Achievement[] = source.lanes.hackathons.filter(x => ['hacksprint-2026', 'resolve-26-game-jam', 'flutterflow-hackathon'].includes(x.id)).map(x => ({ id: x.id, title: x.result || 'To confirm', org: x.title, detail: x.description, laurel: x.result || 'To confirm', image: x.image, link: x.link && x.link !== 'https://itch.io' ? x.link : undefined }));
export const summaryAchievements: Achievement[] = source.lanes.hackathons
  .filter(x => ['hacksprint-2026', 'geniexhub-project-eclipse-neerwatch', 'resolve-26-game-jam', 'flutterflow-hackathon'].includes(x.id))
  .map(x => ({ id: x.id, title: x.result || 'To confirm', org: x.title, detail: x.description, laurel: x.result || 'To confirm', image: x.image, link: x.link && x.link !== 'https://itch.io' ? x.link : undefined }));
export type Certification = { issuer: string; name: string; description: string; date: string; link: string; image: string; document?: string };
export const certifications: Certification[] = source.lanes.certificates.map(c => ({
  issuer: c.organisation, name: c.title, description: c.description, date: c.date || '',
  link: c.link || '', image: c.image, document: 'document' in c && typeof c.document === 'string' ? c.document : undefined,
}));
export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export const skillCategories: SkillCategory[] = [
  { id: 'toolkit', title: 'Toolkit', subtitle: 'Technologies used in projects', skills: source.toolkit.map(n => ({ name: n, mono: n.slice(0,2) })) },
  { id: 'languages', title: 'Languages', subtitle: 'Communication', skills: source.profile.languages.map(n => ({ name: n, mono: n.slice(0,2) })) },
];
export const skillEvidence: Record<string, string[]> = Object.fromEntries(source.toolkit.map(n => [n, source.lanes.projects.filter(x => (x.stack || []).includes(n)).map(x => x.title)]));
export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette; image?: string; badgeImage?: string; containImage?: boolean };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
const eventMoments = [
  ...source.lanes.hackathons,
  ...source.lanes.events,
];
export const seasons: Season[] = [
  { number: 1, title: 'College', period: '2025 – 2029', synopsis: p.education, episodes: [{ code: 'S01 E01', title: 'ECE (Data Science)', description: p.education, tags: ['SRMIST','ECE','Data Science'], runtime: '2025 – 2029', palette: palettes[1], image: source.media.ece_buildings }] },
  { number: 2, title: 'Roles and Community', period: '2026 – Present', synopsis: 'Learning through teams, research and community work.', episodes: source.lanes.roles.map((x, i) => ({ code: `S02 E${String(i+1).padStart(2,'0')}`, title: x.title, description: x.description, tags: [x.organisation], runtime: x.date || 'To confirm', palette: palettes[i % palettes.length], image: x.image || undefined, badgeImage: 'badge_image' in x ? x.badge_image : undefined })) },
  { number: 3, title: 'Events and Hackathons', period: '2026', synopsis: 'Hackathons, community events, technical workshops and volunteering.', episodes: eventMoments.map((x, i) => ({ code: `S03 E${String(i+1).padStart(2,'0')}`, title: x.title, description: x.description, tags: [x.organiser || x.location || x.title], runtime: x.date || 'To confirm', palette: palettes[i % palettes.length], image: 'event_image' in x && typeof x.event_image === 'string' ? x.event_image : x.image || undefined, containImage: 'poster_style' in x && x.poster_style === 'contain' })) },
];
export type TopPick = { label: string; title: string; detail: string; palette: Palette; image?: string; containImage?: boolean; link?: string; deck?: string; notesImage?: string };
export const topPicks: TopPick[] = [
  ...source.lanes.hackathons
    .filter(x => ['hacksprint-2026', 'resolve-26-game-jam', 'flutterflow-hackathon'].includes(x.id))
    .map((x, i) => ({
      label: 'Achievement',
      title: ({ 'hacksprint-2026': 'HackSprint', 'resolve-26-game-jam': 'RESOLVE ’26', 'flutterflow-hackathon': 'FlutterFlow' } as Record<string, string>)[x.id],
      detail: ({ 'hacksprint-2026': 'Top 12 / 5,000', 'resolve-26-game-jam': '2nd prize', 'flutterflow-hackathon': '3rd place' } as Record<string, string>)[x.id],
      palette: palettes[i % palettes.length], image: x.image || undefined, link: x.link || undefined,
    })),
  ...source.lanes.projects
    .filter(x => x.id === 'neerwatch')
    .map((x, i) => ({
      label: 'Project', title: x.title,
      detail: 'Top 30 / 5,000',
      palette: palettes[(i + 1) % palettes.length], image: x.image || undefined,
      containImage: 'poster_style' in x && x.poster_style === 'contain',
      link: x.link || undefined,
      deck: 'deck' in x && typeof x.deck === 'string' ? x.deck : undefined,
      notesImage: 'notes_image' in x && typeof x.notes_image === 'string' ? x.notes_image : undefined,
    })),
];
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[]; narration: string };
export const introSlides: IntroSlide[] = [
  { kicker: 'The opening', title: p.name, lines: ['ECE (Data Science) student in Chennai.', 'Curious about what technology can do for real people.'], chips: ['SRMIST','Electronics','Data Science'], narration: 'Meet Thilak Govind. An electronics and data science student in Chennai, curious about real problems.' },
  { kicker: 'What drives me', title: 'Ideas into action', lines: ['Practical AI, connected devices, research and games.', 'From field surveys to working prototypes.'], chips: ['Electronics','AI agents','IoT','Research','Games'], narration: 'He explores practical AI, connected devices, research and games, turning questions into working prototypes.' },
  { kicker: 'HackSprint', title: 'Top 12 finalists', lines: [source.lanes.hackathons[0].description, 'Quantum Forge · MAHE Bengaluru'], chips: ['HackSprint 2026','Top 12'], narration: 'At HackSprint in Bengaluru, his team reached the top twelve with a tool for kirana store owners.' },
  { kicker: 'Next chapter', title: 'Keep building', lines: ['AI products, IoT systems and playable games.', 'Learning through teams, experiments and community.'], chips: ['Build','Learn','Share'], narration: 'From AI products to IoT systems and games, Thilak keeps building, learning and sharing.' },
];
export type ProfileId = 'sushmita' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'picks' | 'skills' | 'moments' | 'story';
export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  { id: 'sushmita', name: 'Thilak', blurb: 'My journey', color: '#e5132b', order: ['about','journey','skills','picks','moments','story'] },
  { id: 'recruiter', name: 'Recruiter', blurb: 'Experience first', color: '#4cc9ff', order: ['story','moments','skills','about','journey','picks'] },
  { id: 'developer', name: 'Developer', blurb: 'Projects first', color: '#46e3a8', order: ['picks','skills','journey','moments','about','story'] },
  { id: 'creative', name: 'Creative', blurb: 'The story arc', color: '#ffb547', order: ['journey','picks','moments','about','skills','story'] },
];
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education', palette: palettes[1] },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons`, palette: palettes[3] },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Highlights', palette: palettes[2] },
  skills: { nav: 'Skills', card: 'My Skills', meta: 'Toolkit', palette: palettes[1] },
  moments: { nav: 'Moments', card: 'Achievements', meta: `${achievements.length} Highlights • ${certifications.length} Certificates`, palette: first },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'View resume', palette: palettes[1] },
};
