/**
 * Single source of truth for everything James's portfolio states — used by both
 * the website and the Jamelet chatbot so Jamelet can never contradict the site.
 *
 * 🔒 RULES (from Phase 1 of the Jamelet plan):
 * - Only facts listed here may be stated as fact.
 * - No employment history, no salary, no completion dates, no availability
 *   dates, no qualifications beyond what is written below.
 * - If it isn't here, the chatbot says it doesn't have that detail yet.
 *
 * Keep this file in sync with the visible components:
 *   About.tsx, Skills.tsx, Learning.tsx, Projects.tsx, Contact.tsx
 */

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const identity = {
  name: 'James Carl Enquig',
  monogram: 'JC',
  firstName: 'James',
  intro:
    "I'm James Carl, a 4th-year IT student who enjoys building clean, responsive web apps. I work across the frontend (React, TypeScript) and backend (PHP, Laravel) — with a focus on AI Assisted Development.",
  currentFocus: 'AI Assisted Development',
} as const;

/* ------------------------------------------------------------------ */
/* Education & location                                                */
/* ------------------------------------------------------------------ */

export const profile = {
  location: 'Philippines',
  education: '4th Year IT Student',
  openTo: 'Internships & collabs',
  /** Exact badge wording used on the site. */
  statusBadge: 'Open to collaborate',
  /** Contact-section tagline. */
  tagline: "I'm always open to learning, collaborating and connecting.",
} as const;

export const stats = [
  { value: '13+', label: 'Technologies in my stack' },
  { value: '1', label: 'Live project built' },
  { value: '4 yrs', label: 'Into IT & counting' },
] as const;

/* ------------------------------------------------------------------ */
/* Skills (mirrors Skills.tsx)                                         */
/* ------------------------------------------------------------------ */

export const skillCategories = [
  { title: 'Frontend', skills: ['React.js', 'JavaScript', 'TypeScript'] },
  { title: 'Mobile', skills: ['React Native'] },
  { title: 'Backend', skills: ['PHP', 'Laravel'] },
  { title: 'Database', skills: ['MySQL', 'PostgreSQL'] },
  { title: 'Server / Environment', skills: ['Apache', 'Docker'] },
  { title: 'Version Control', skills: ['Git', 'GitHub'] },
  { title: 'Design', skills: ['Figma'] },
  { title: 'AI / ML', skills: ['AI / ML'] },
] as const;

/* ------------------------------------------------------------------ */
/* Learning journey (mirrors Learning.tsx — honest, self-rated)        */
/* ------------------------------------------------------------------ */

export const learningJourney = [
  { name: 'Web Development', percent: 85, note: 'React, TypeScript, Tailwind, deployment' },
  { name: 'UI/UX Design', percent: 65, note: 'Design systems, layouts, user flows' },
  { name: 'Backend Development', percent: 55, note: 'Laravel, PHP, Blade, Docker' },
  { name: 'AI / Models', percent: 30, note: "Exploring what's possible" },
] as const;

/* ------------------------------------------------------------------ */
/* Projects (mirrors Projects.tsx)                                     */
/* ------------------------------------------------------------------ */

export const projects = [
  {
    name: 'TMC Entrance Examination: Answer Sheet Recognition and Scoring System',
    summary:
      'Scans answer sheets with an Android camera or upload, recognizes answers via AI/OMR, scores against the official key (Passed/Failed), and manages results in a web platform.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'React', 'Tailwind', 'Laravel', 'MySQL'],
    repo: 'https://github.com/Jamesss09/Capstone',
    status: 'Ongoing',
  },
] as const;

export const projectsFooter =
  'More projects are in the works — this list will grow as I finish my current work.';

/* ------------------------------------------------------------------ */
/* Links & contact                                                     */
/* ------------------------------------------------------------------ */

export const links = {
  github: 'https://github.com/Jamesss09',
  capstoneRepo: 'https://github.com/Jamesss09/Capstone',
  email: 'jamescarlenquig26@gmail.com',
} as const;

/* ------------------------------------------------------------------ */
/* Navigation sections (for whitelisted "go to" actions)               */
/* ------------------------------------------------------------------ */

export const sections = [
  { action: 'view-about', label: 'About', href: '#about' },
  { action: 'view-skills', label: 'Skills', href: '#skills' },
  { action: 'view-projects', label: 'Projects', href: '#projects' },
  { action: 'view-learning', label: 'Learning', href: '#learning' },
  { action: 'contact-james', label: 'Contact', href: '#contact' },
] as const;

export const suggestedActions = ['view-projects', 'view-skills', 'contact-james', 'open-github'] as const;

/* ------------------------------------------------------------------ */
/* Suggested first questions (shown as chat chips)                     */
/* ------------------------------------------------------------------ */

export const suggestedQuestions = [
  'Who is James?',
  'What are James\u2019s skills?',
  'Tell me about the capstone project.',
  'Is James available for opportunities?',
  'How can I contact James?',
] as const;

/* ------------------------------------------------------------------ */
/* Conversation boundaries (Jamelet must never cross these)            */
/* ------------------------------------------------------------------ */

export const boundaries = {
  neverInfer: [
    'Employment history',
    'Project completion dates or deadlines',
    'Salary or rates',
    'Specific availability dates',
    'Qualifications not listed above',
  ],
  note: 'Jamelet states facts only from this file. Anything else → honest "I don\u2019t have that detail yet" + redirect.',
} as const;

/* ------------------------------------------------------------------ */
/* Typical answers used by the system prompt as grounding              */
/* ------------------------------------------------------------------ */

export const availabilityAnswer =
  "James is open to internships and collaborations — that's what his portfolio says. I can take you to his contact form if you'd like to reach out. As for exact availability dates, I don't have that detail.";