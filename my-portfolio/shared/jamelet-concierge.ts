import {
  availabilityAnswer,
  facts,
  identity,
  learningJourney,
  links,
  overrides,
  projects,
  skillCategories,
} from './portfolio';

/**
 * Jamelet's responder — shared by the browser (Phase 3 offline fallback) and
 * the Vercel function (Phase 4, used whenever no AI provider is configured).
 *
 * Rule-based, grounded 1:1 in `portfolio.ts` so the chat can never contradict
 * the visible site. When an AI provider IS configured, the server streams a
 * real model response and only reuses `jameletRespond` on failure.
 */

export type JameletAction =
  | 'view-about'
  | 'view-skills'
  | 'view-projects'
  | 'view-learning'
  | 'contact-james'
  | 'open-github';

export interface ConciergeReply {
  text: string;
  actions: JameletAction[];
}

const GREETING = "Hi! I'm Jamelet, James's little tech sidekick. Ask me about his skills, projects, or availability.";

/** Look projects up by id so replies survive a reordering of the array. */
function byId(id: 'capstone' | 'interntrack') {
  return projects.find((p) => p.id === id) ?? projects[0];
}

const capstoneProject = byId('capstone');
const internTrackProject = byId('interntrack');

const EN = {
  greeting: GREETING,
  who: `${identity.intro} Want a tour? I can show you his projects or skills.`,
  skills: `James's stack: ${skillCategories
    .map((c) => `${c.skills.join(', ')} (${c.title})`)
    .join('; ')}. That's his 14+ technologies across 8 areas.`,
  projects: `James has ${projects.length} projects on this site: ${projects
    .map((p) => `${p.name} (${p.status})`)
    .join('; ')}. Ask me about either one and I'll break it down.`,
  capstone: `${capstoneProject.name} — ${capstoneProject.summary} Built with ${capstoneProject.tech.join(
    ', '
  )}. It's marked as ${capstoneProject.status} on the site.`,
  interntrack: `${internTrackProject.name} — ${internTrackProject.summary} Built with ${internTrackProject.tech.join(
    ', '
  )}. It's marked as ${internTrackProject.status} on the site.`,
  availability: `${availabilityAnswer} Want me to take you to the contact form?`,
  contact: `You can reach James through the contact form on this site, or email him at ${links.email}. He's also active on GitHub.`,
  github: `James's code lives at GitHub: ${links.github}. Both of his projects are up there too — the capstone at ${links.capstoneRepo} and InternTrack at ${links.internTrackRepo}.`,
  learning: `Right now James's learning journey is: ${learningJourney
    .map((l) => `${l.name} (${l.percent}%) — ${l.note}`)
    .join('; ')}.`,
  fallback:
    "I don't have that detail yet, but I can show you James's projects, summarize his skills, or help you contact him.",
};

const TL = {
  greeting: "Hi! Ako si Jamelet, ang little tech sidekick ni James. Pwede mo akong tanungin tungkol sa skills niya, projects, o kung paano siya ma-contact.",
  who: `${identity.intro} Gusto niyo bang itour ko kayo sa projects o skills niya?`,
  skills: `Ito po ang stack ni James: ${skillCategories
    .map((c) => c.skills.join(', '))
    .join(', ')} — 14+ technologies sa 8 na areas.`,
  projects: `${projects.length} po ang projects ni James dito sa site: ${projects
    .map((p) => `${p.name} (${p.status})`)
    .join('; ')}. Tatanungin mo ko kahit alin sa dalawa para sa detalye.`,
  capstone: `Ito po ang capstone niya: ${capstoneProject.name}. Kino-scan ang answer sheets gamit ang Android camera o upload, nire-recognize ang sagot sa tulong ng AI/OMR, at ina-score laban sa official key (Passed/Failed) — tapos naka-manage sa web platform. Kasama sa tech: ${capstoneProject.tech.join(
    ', '
  )}. Ongoing pa po siya.`,
  interntrack: `Ito po ang InternTrack ni James: ${internTrackProject.name}. Mobile app para sa pag-track ng OJT hours — naka-time in/out ang intern, may progress bar laban sa required hours, at puwedeng i-export ang record sheet bilang PDF. Offline lahat, gamit ang SQLite sa mismong device. Kasama sa tech: ${internTrackProject.tech.join(
    ', '
  )}. Tapos na po siya.`,
  availability: `${availabilityAnswer} Gusto niyo bang dalhin ko kayo sa contact form niya?`,
  contact: `Pwede niyo pong ma-contact si James via contact form dito sa site, o i-email sa ${links.email}. Nasa GitHub din po siya.`,
  github: `Nasa GitHub po ang code ni James: ${links.github}. Nasa GitHub po rin ang dalawang projects niya — ang capstone sa ${links.capstoneRepo} at ang InternTrack sa ${links.internTrackRepo}.`,
  learning: `Sa ngayon, ito po ang learning journey ni James: ${learningJourney
    .map((l) => `${l.name} (${l.percent}%) — ${l.note}`)
    .join('; ')}.`,
  fallback:
    "Wala po akong detalye nito sa ngayon, pero kaya kong ipakita ang projects ni James, i-summarize ang skills niya, o tulungan kayong ma-contact siya.",
};

/** Loose Taglish detection — only triggers on distinctive Tagalog words. */
const TAGLISH = /sino|ano ang|paano|kayang|pwede|pwedeng|niya|gusto|saan|magkano|kailan|wala|meron|ito|dito|nga ba|po\b|ano ba/i;

/* Verbatim overrides (user-approved answers) win over topic matching. */
const overrideMatchers = overrides.map((o) => ({
  id: o.id,
  answer: o.answer,
  regex: new RegExp(o.patterns.join('|'), 'i'),
}));

const OVERRIDE_ACTIONS: Record<string, JameletAction[]> = {
  'full-name': ['view-about'],
  age: ['view-about'],
  location: ['view-about'],
  school: ['view-about'],
  relationship: ['view-about'],
  'hobby-ml': [],
};

function matchOverride(q: string): (typeof overrideMatchers)[number] | null {
  for (const m of overrideMatchers) {
    if (m.regex.test(q)) return m;
  }
  return null;
}

/**
 * Returns the locked verbatim answer for a question, or null.
 * Shared by the local responder AND api/chat.ts (which short-circuits the
 * AI for these so the model can never improvise on them).
 */
export function overrideReply(input: string): ConciergeReply | null {
  const m = matchOverride(input.trim().toLowerCase());
  return m ? { text: m.answer, actions: OVERRIDE_ACTIONS[m.id] ?? [] } : null;
}

export type Topic =
  | 'greeting'
  | 'who'
  | 'skills'
  | 'projects'
  | 'capstone'
  | 'interntrack'
  | 'availability'
  | 'contact'
  | 'github'
  | 'learning';

function matchTopic(q: string): Topic | null {
  if (/\b(hi|hello|hey|uy|hoy|kumusta|musta|how are you|kamusta ka|musta ka|good (morning|afternoon|evening))\b/.test(q)) return 'greeting';
  if (/\b(sino si james|who is james|introduce|background|about james)\b/.test(q)) return 'who';
  if (/\b(skills|stack|tech|react native|expo|ano ang skills|anong skills|skills niya)\b/.test(q)) return 'skills';
  // InternTrack before the generic project/availability matches below, so
  // "internship app" or "OJT tracker" doesn't fall through to those.
  if (/\b(interntrack|intern track|ojt|on the job|on-the-job|mobile app|mobile application|hours tracker|time in)\b/.test(q)) return 'interntrack';
  if (/\b(capstone|thesis|omr|answer sheet|entrance exam|scoring system)\b/.test(q)) return 'capstone';
  if (/\b(learning journey|currently learning|natututo|learning)\b/.test(q)) return 'learning';
  if (/\b(github|repo|repository|code)\b/.test(q)) return 'github';
  if (/\b(available|availability|open to|internship|internships|collab|collaboration|collaborations|hiring|kailan ka)\b/.test(q)) return 'availability';
  if (/\b(contact|email|gmail|reach|message|paano maka|saan ako)\b/.test(q)) return 'contact';
  if (/\b(project|projects|app|apps|built|build|works?)\b/.test(q)) return 'projects';
  return null; // no known topic matched — caller decides (off-topic vs intro)
}

/** Expected action for a topic — used locally AND on the server for the AI path. */
export function topicActions(topic: Topic): JameletAction[] {
  switch (topic) {
    case 'projects':
    case 'capstone':
    case 'interntrack':
      return ['view-projects', 'open-github'];
    case 'availability':
    case 'contact':
      return ['contact-james'];
    case 'skills':
      return ['view-skills'];
    case 'who':
      return ['view-about', 'view-projects'];
    case 'learning':
      return ['view-learning'];
    case 'github':
      return ['open-github'];
    default:
      return ['view-projects', 'contact-james'];
  }
}

export function matchTopicPublic(input: string): Topic | null {
  return matchTopic(input.trim().toLowerCase());
}

/** Full deterministic reply for a topic — used by the UI slash commands. */
export function topicReply(topic: Topic): ConciergeReply {
  return { text: EN[topic], actions: topicActions(topic) };
}

/* ------------------------------------------------------------------ */
/* Off-topic detection — clearly NOT about the portfolio               */
/* ------------------------------------------------------------------ */

const OFF_TOPIC =
  /\b(weather|forecast|temperature|umbrella|sunny|rainy)\b|\b(politics|president|election|government|senator|headline)\b|\b(movie|movies|film|song|songs|music|anime|manga|series|netflix)\b|\b(how much is|how much does|price of|cost of|pricing)\b|\b(recipe|cook|cooking|bake|baking)\b|\b(equation|calculate|calculator|physics|chemistry|biology)\b|\b(football|basketball|volleyball|badminton|soccer|world cup)\b|\b(tell me a joke|joke|jokes|funny|riddle)\b|\b(what time|what day|current date|today's date)\b|\b(capital of|population of|meaning of life|who sings|who wrote)\b|\b(bitcoin|crypto|blockchain|nft)\b|\b(legal|lawyer|medical advice|cure|symptoms)\b|\b(translate|ibig sabihin)\b|\b(my girlfriend|my boyfriend|my wife|my husband|my crush)\b|\b(chess|dota|valorant|pubg|minecraft)\b|\b(lottery|lotto|horoscope|zodiac|astrology)\b/i;

function isOffTopic(q: string): boolean {
  return OFF_TOPIC.test(q);
}

/**
 * Honest "I don't have that detail yet" + redirect for clearly off-topic
 * input (weather, prices, general knowledge, other people…). Shared by the
 * local responder and api/chat.ts (which short-circuits the AI for these).
 */
export function offTopicReply(input: string): ConciergeReply | null {
  return isOffTopic(input.trim().toLowerCase()) ? fallbackReply() : null;
}

/** Whitelisted action buttons for any input — used by the AI stream path. */
export function actionsForInput(input: string): JameletAction[] {
  const override = overrideReply(input);
  if (override) return override.actions;
  const q = input.trim().toLowerCase();
  const topic = matchTopic(q);
  if (topic !== null) return topic === 'greeting' ? [] : topicActions(topic);
  const fact = factReply(input);
  if (fact) return fact.actions;
  if (isOffTopic(q)) return fallbackReply().actions;
  return topicActions('who');
}

/* ------------------------------------------------------------------ */
/* Curated knowledge facts (Tier 1) — matched when no topic applies    */
/* ------------------------------------------------------------------ */

const factMatchers = facts.map((f) => ({
  id: f.id,
  answer: f.answer,
  regex: new RegExp(f.keywords.join('|'), 'i'),
}));

const FACT_ACTIONS: Record<string, JameletAction[]> = {};

/**
 * Returns the curated fact answer when the question matches, or null.
 * Shared by the local responder and api/chat.ts (which short-circuits the
 * AI for these so answers stay deterministic).
 */
export function factReply(input: string): ConciergeReply | null {
  const q = input.trim().toLowerCase();
  for (const f of factMatchers) {
    if (f.regex.test(q)) return { text: f.answer, actions: FACT_ACTIONS[f.id] ?? ['view-about'] };
  }
  return null;
}

export function jameletRespond(input: string): ConciergeReply {
  const override = overrideReply(input);
  if (override) return override;

  const q = input.trim().toLowerCase();
  const taglish = TAGLISH.test(q);
  const L = taglish ? TL : EN;
  const topic = matchTopic(q);
  if (topic !== null) {
    const text = L[topic === 'greeting' ? 'greeting' : topic];
    return { text, actions: topic === 'greeting' ? [] : topicActions(topic) };
  }

  const fact = factReply(input);
  if (fact) return fact;

  const off = offTopicReply(input);
  if (off) return off;

  // Ambiguous but James-ish input → friendly intro + tour instead of a dead end.
  return { text: L.who, actions: topicActions('who') };
}

export function fallbackReply(): ConciergeReply {
  return { text: EN.fallback, actions: ['view-projects', 'contact-james'] };
}

export { GREETING };