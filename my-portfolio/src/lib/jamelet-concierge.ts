import {
  availabilityAnswer,
  identity,
  learningJourney,
  links,
  projects,
  profile,
  skillCategories,
} from '../../shared/portfolio';

/**
 * Jamelet's local concierge responder (Phase 3).
 *
 * Rule-based answers grounded 1:1 in `shared/portfolio.ts` so the chat can
 * never contradict the visible site. Phase 4 replaces `jameletRespond` with a
 * call to the Vercel function (api/chat.ts) — the UI and the reply shape below
 * stay the same.
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

export const ACTION_LINKS: Record<JameletAction, { label: string; href: string; external?: boolean }> = {
  'view-about': { label: 'About section', href: '#about' },
  'view-skills': { label: 'Skills', href: '#skills' },
  'view-projects': { label: 'Projects', href: '#projects' },
  'view-learning': { label: 'Learning', href: '#learning' },
  'contact-james': { label: 'Contact James', href: '#contact' },
  'open-github': { label: 'Open GitHub', href: links.github, external: true },
};

const GREETING = "Hi! I'm Jamelet, James's little tech sidekick. Ask me about his skills, projects, or availability.";

const EN = {
  greeting: GREETING,
  who: `${identity.intro} Want a tour? I can show you his projects or skills.`,
  skills: `James's stack: ${skillCategories
    .map((c) => `${c.skills.join(', ')} (${c.title})`)
    .join('; ')}. That's his 13+ technologies across 8 areas.`,
  capstone: `${projects[0].name} — ${projects[0].summary} Built with ${projects[0].tech.join(
    ', '
  )}. It's marked as ${projects[0].status} on the site.`,
  availability: `${availabilityAnswer} Want me to take you to the contact form?`,
  contact: `You can reach James through the contact form on this site, or email him at ${links.email}. He's also active on GitHub.`,
  github: `James's code lives at GitHub: ${links.github}. His capstone project is up there too.`,
  learning: `Right now James's learning journey is: ${learningJourney
    .map((l) => `${l.name} (${l.percent}%) — ${l.note}`)
    .join('; ')}.`,
  fallback:
    "I don't have that detail yet, but I can show you James's project, summarize his skills, or help you contact him.",
};

const TL = {
  greeting: "Hi! Ako si Jamelet, ang little tech sidekick ni James. Pwede mo akong tanungin tungkol sa skills niya, projects, o kung paano siya ma-contact.",
  who: `${identity.intro} Gusto niyo bang itour ko kayo sa projects o skills niya?`,
  skills: `Ito po ang stack ni James: ${skillCategories
    .map((c) => c.skills.join(', '))
    .join(', ')} — 13+ technologies sa 8 na areas.`,
  capstone: `Ito po ang capstone niya: ${projects[0].name}. Kino-scan ang answer sheets gamit ang Android camera o upload, nire-recognize ang sagot sa tulong ng AI/OMR, at ina-score laban sa official key (Passed/Failed) — tapos naka-manage sa web platform. Kasama sa tech: ${projects[0].tech.join(
    ', '
  )}. Ongoing pa po siya.`,
  availability: `${availabilityAnswer} Gusto niyo bang dalhin ko kayo sa contact form niya?`,
  contact: `Pwede niyo pong ma-contact si James via contact form dito sa site, o i-email sa ${links.email}. Nasa GitHub din po siya.`,
  github: `Nasa GitHub po ang code ni James: ${links.github}. Nasa-bago po roon ang capstone project niya.`,
  learning: `Sa ngayon, ito po ang learning journey ni James: ${learningJourney
    .map((l) => `${l.name} (${l.percent}%) — ${l.note}`)
    .join('; ')}.`,
  fallback:
    "Wala po akong detalye nito sa ngayon, pero kaya kong ipakita ang projects ni James, i-summarize ang skills niya, o tulungan kayong ma-contact siya.",
};

/** Loose Taglish detection — only triggers on distinctive Tagalog words. */
const TAGLISH = /sino|ano ang|paano|kayang|pwede|pwedeng|niya|gusto|saan|magkano|kailan|wala|meron|ito|dito|nga ba|po\b|ano ba/i;

type Topic =
  | 'greeting'
  | 'who'
  | 'skills'
  | 'capstone'
  | 'availability'
  | 'contact'
  | 'github'
  | 'learning';

function matchTopic(q: string): Topic {
  if (/\b(hi|hello|hey|uy|hoy|kumusta|musta|good (morning|afternoon|evening))\b/.test(q)) return 'greeting';
  if (/\b(sino si james|who is james|introduce|background|about james)\b/.test(q)) return 'who';
  if (/\b(skills|stack|tech|ano ang skills|anong skills|skills niya)\b/.test(q)) return 'skills';
  if (/\b(capstone|thesis|project|omr|answer sheet|entrance exam)\b/.test(q)) return 'capstone';
  if (/\b(learning journey|currently learning|natututo|learning)\b/.test(q)) return 'learning';
  if (/\b(github|repo|repository|code)\b/.test(q)) return 'github';
  if (/\b(available|availability|open to|internship|internships|collab|collaboration|collaborations|hiring|kailan ka)\b/.test(q)) return 'availability';
  if (/\b(contact|email|gmail|reach|message|paano maka|saan ako)\b/.test(q)) return 'contact';
  return 'who'; // default to "who is James" rather than the fallback on ambiguous input
}

export function jameletRespond(input: string): ConciergeReply {
  const q = input.trim().toLowerCase();
  const taglish = TAGLISH.test(q);
  const L = taglish ? TL : EN;
  const topic = matchTopic(q);

  const text = L[topic === 'greeting' ? 'greeting' : topic];

  const actions: JameletAction[] =
    topic === 'capstone' ? ['view-projects', 'open-github']
    : topic === 'availability' ? ['contact-james']
    : topic === 'contact' ? ['contact-james']
    : topic === 'skills' ? ['view-skills']
    : topic === 'who' ? ['view-about', 'view-projects']
    : topic === 'learning' ? ['view-learning']
    : topic === 'github' ? ['open-github']
    : ['view-projects', 'contact-james'];

  // Greeting gets suggestion chips; a matched topic should feel direct.
  return { text, actions: topic === 'greeting' ? [] : actions };
}

export function fallbackReply(): ConciergeReply {
  return { text: EN.fallback, actions: ['view-projects', 'contact-james'] };
}

export { GREETING, profile as profileData };