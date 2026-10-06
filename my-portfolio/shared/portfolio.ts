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
 *   About.tsx, Skills.tsx, Learning.tsx, Projects.tsx, ProjectDetailModal.tsx,
 *   Contact.tsx
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
  { value: '14+', label: 'Technologies in my stack' },
  { value: '2', label: 'Projects built' },
  { value: '4 yrs', label: 'Into IT & counting' },
] as const;

/* ------------------------------------------------------------------ */
/* Personal facts — Jamelet "verbatim" overrides                       */
/* User-approved answers. The AI must use these word-for-word (it may  */
/* translate EN ⇄ Taglish but never alter facts); the local responder  */
/* matches them by regex before topic matching.                        */
/* ------------------------------------------------------------------ */

export interface PortfolioOverride {
  id: string;
  /** Canonical question (what a visitor would ask). */
  question: string;
  /** Regex-source phrases (lowercased input, EN + light Taglish). */
  patterns: string[];
  /** Verbatim answer. */
  answer: string;
}

export const overrides: PortfolioOverride[] = [
  {
    id: 'full-name',
    question: "What is James's full name?",
    patterns: ['full name', 'complete name', 'buong pangalan', 'ano ang pangalan', 'pangalan ni james'],
    answer: 'James Carl Enquig.',
  },
  {
    id: 'age',
    question: 'How old is James?',
    patterns: ['how old', 'his age', 'age of james', '\\bage\\b', 'ilang taon', 'edad', 'taon na si james'],
    answer: 'James is 22 years old.',
  },
  {
    id: 'location',
    question: 'Where does James live?',
    patterns: [
      'where does james live',
      'where is james from',
      'where.*live',
      'where.*from',
      'taga saan',
      'taga-saan',
      'saang lugar',
      'saang bayan',
      'tirahan',
      'location',
    ],
    answer: 'James lives in Ubay, Bohol, Philippines.',
  },
  {
    id: 'school',
    question: 'Where does James study?',
    patterns: [
      'where does james study',
      'where.*study',
      'studying',
      'trinidad municipal',
      '\\btmc\\b',
      'anong school',
      'anong college',
      'saang school',
      'saang paaralan',
      'nag-aaral',
      'pag-aaral',
    ],
    answer: 'James is studying at Trinidad Municipal College — a 4th-year IT student.',
  },
  {
    id: 'relationship',
    question: 'Is James in a relationship?',
    patterns: [
      'girlfriend',
      'boyfriend',
      'relationship',
      'is james single',
      'dating',
      'jowa',
      'kasintahan',
      'sunduan',
      'honeylet',
    ],
    answer: 'James is in a relationship with Honeylet.',
  },
  {
    id: 'hobby-ml',
    question: "What are James's hobbies?",
    patterns: [
      'hobby',
      'hobbies',
      'libangan',
      'mobile legends',
      'games',
      'gaming',
      'naglalaro',
      'anong laro',
      'pastime',
    ],
    answer: 'James loves playing Mobile Legends in his free time.',
  },
];

/* ------------------------------------------------------------------ */
/* Curated knowledge facts (Tier 1 RAG-lite)                           */
/* Broader than overrides: injected into the prompt for the AI and      */
/* keyword-matched by the local responder when no standard topic        */
/* applies. Only facts listed here may be stated.                       */
/* ------------------------------------------------------------------ */

export interface PortfolioFact {
  id: string;
  /** Canonical question (what a visitor would ask). */
  question: string;
  /** Regex-source phrases (lowercased input, EN + light Taglish). */
  keywords: string[];
  /** The fact — English by default; the AI translates when enabled. */
  answer: string;
}

export const facts: PortfolioFact[] = [
  {
    id: 'current-focus',
    question: 'What is James currently focused on?',
    keywords: [
      'currently focused',
      'current focus',
      'focusing on',
      'focused on',
      'ano ang focus',
      'kasalukuyang pinagtutuunan',
    ],
    answer: 'James is currently focused on AI Assisted Development.',
  },
  {
    id: 'student-status',
    question: 'Is James a student?',
    keywords: ['is james a student', 'student ba', 'estudyante ba'],
    answer: 'Yes — James is a 4th-year IT student at Trinidad Municipal College.',
  },
  {
    id: 'stack-overview',
    question: 'What languages does James use?',
    keywords: ['programming language', 'anong language', 'anong languages', 'wika ng code'],
    answer:
      'James works with JavaScript, TypeScript, React, PHP, Laravel, MySQL, PostgreSQL, and more — his Skills section has the full list.',
  },
];

/* ------------------------------------------------------------------ */
/* Skills (mirrors Skills.tsx)                                         */
/* ------------------------------------------------------------------ */

export const skillCategories = [
  { title: 'Frontend', skills: ['React.js', 'JavaScript', 'TypeScript'] },
  { title: 'Mobile', skills: ['React Native', 'Expo'] },
  { title: 'Backend', skills: ['PHP', 'Laravel', 'Express.js'] },
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

/** A link shown in the project detail view. */
export interface ProjectLink {
  label: string;
  href: string;
  /** Drives the icon and the styling of the button. */
  kind: 'github' | 'download' | 'demo';
}

/**
 * Long-form detail behind each carousel card's "View More".
 *
 * Text only — no asset imports, because `api/system-prompt.ts` imports this
 * file into the Vercel function where Vite asset resolution doesn't apply.
 * Screenshot paths live in `Projects.tsx` and are keyed by project id.
 */
export interface ProjectDetails {
  /** What the project is, in a short paragraph. */
  overview: string;
  /** The problem or purpose that motivated it. */
  problem: string;
  /** Main capabilities, one per bullet. */
  features: readonly string[];
  /** Technologies grouped by role in the stack. */
  stack: readonly { label: string; items: readonly string[] }[];
  /** James's title and contribution, when stated. */
  role?: { title: string; note: string };
  /** Extra links beyond the repo. */
  links?: readonly ProjectLink[];
}

export const projects = [
  {
    id: 'capstone',
    name: 'TMC Entrance Examination: Answer Sheet Recognition and Scoring System',
    summary:
      'Scans answer sheets with an Android camera or upload, recognizes answers via AI/OMR, scores against the official key (Passed/Failed), and manages results in a web platform.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'React', 'Tailwind', 'Laravel', 'MySQL'],
    repo: 'https://github.com/Jamesss09/Capstone',
    status: 'Ongoing',
    details: {
      overview:
        "Code Nexus is a three-part system for the Trinidad Municipal College Admissions Office: an Android scanner app that photographs a 100-item answer sheet, an AI/OMR service that reads the shaded bubbles, and a Laravel web platform where administrators manage answer keys, results, folders, users and audit logs.",
      problem:
        'Entrance-exam checking at TMC is manual — staff inspect marks one by one, compare each against the key and compute scores by hand. It takes days to release results, checking is tiring and prone to human error over a long sitting, and it scales badly when candidate volume rises.',
      features: [
        'Capture a single-page shaded answer sheet with the phone camera, or upload an image instead',
        'Detect shaded bubbles with OpenCV contour analysis and a PyTorch model fallback',
        'Validate every item — exactly one bubble; multi-shade, erasures and out-of-range options are flagged invalid rather than guessed',
        'Score automatically against the official key and decide Passed/Failed from a passing score',
        'Separate roles — Administrators manage keys, users and settings; Staff can only scan and view results',
        'Persist 11 relational tables covering answer keys, folders, applicants, sheets, results and an OMR job queue',
        'Export result tables to CSV or PDF, with audit logging on administrative actions',
        'Run the whole stack on Docker Compose: MySQL, Laravel, Nginx and the Python OMR service',
      ],
      stack: [
        { label: 'Frontend Web', items: ['React.js', 'Tailwind CSS'] },
        { label: 'Mobile', items: ['React Native (Android)'] },
        { label: 'Backend', items: ['Laravel (PHP)', 'MySQL', 'REST APIs'] },
        { label: 'AI / OMR', items: ['Python', 'PyTorch', 'OpenCV'] },
        { label: 'Server', items: ['Apache 2.4.37 or Nginx', 'Docker'] },
        { label: 'Tools', items: ['Git', 'GitHub'] },
      ],
      role: {
        title: 'Lead Developer',
        note: 'Set the architecture, drove the AI-assisted implementation plan, and scaffolded the full stack — the Laravel + MySQL backend, the React web admin, the React Native Android scanner and the Python OMR service.',
      },
    },
  },
  {
    id: 'interntrack',
    name: 'InternTrack: OJT Hours Tracker',
    summary:
      'A cross-platform mobile app for tracking OJT (on-the-job training) hours. Interns log time in and out, watch their progress against the required hours, and export a printable record sheet as a PDF — running fully offline on a local SQLite database.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'SQLite', 'Zod'],
    repo: 'https://github.com/Jamesss09/Intern_Track',
    status: 'Complete',
    details: {
      overview:
        'InternTrack is a cross-platform mobile app for tracking OJT hours. Interns register once, set up their internship, log time in and out for each session, and watch a progress bar fill toward the required hours — then export a printable record sheet as a PDF. Everything lives on the device, so the app keeps working with no connection.',
      problem:
        'OJT hours tend to be tracked on paper notebooks or scattered spreadsheets. Students lose track of what they have already completed, coordinators have no live view of anyone\'s progress, and producing the printable record sheet at the end of the program becomes manual busywork.',
      features: [
        'Register and sign in with a locally hashed password, with change-password support',
        'Set up an internship — company, role, start date and required hours',
        'Log time in and time out for every OJT session',
        'Follow a live progress bar against the required hours, with a browsable records list',
        'Store all data on-device in SQLite with versioned migrations, so the app works fully offline',
        'Capture a profile photo straight from the device gallery',
        'Export the record sheet as a PDF laid out in the TMC form template',
        'Switch between light and dark themes, with rate-limited login attempts',
        'Covered by Jest unit tests for the time, date, progress and form-template logic',
      ],
      stack: [
        { label: 'Framework', items: ['Expo (SDK 57)', 'React Native'] },
        { label: 'Language', items: ['TypeScript'] },
        { label: 'Navigation', items: ['Expo Router (file-based)'] },
        { label: 'Data', items: ['SQLite (expo-sqlite)', 'AsyncStorage'] },
        { label: 'Forms', items: ['React Hook Form', 'Zod'] },
        { label: 'Media & PDF', items: ['expo-image-picker', 'expo-image-manipulator', 'expo-print'] },
        { label: 'Testing & Build', items: ['Jest (jest-expo)', 'EAS Build'] },
      ],
      role: {
        title: 'Developer',
        note: 'Built the app end to end — the Expo Router screens, the SQLite data layer and its migrations, the authentication flow, the TMC PDF form template and the Jest test suite.',
      },
      links: [
        {
          label: 'Download App',
          href: 'https://expo.dev/accounts/jeymzzz/projects/interntrack/builds/bc279b46-09f5-41b5-91ab-a41066ad718a',
          kind: 'download',
        },
      ],
    },
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
  internTrackRepo: 'https://github.com/Jamesss09/Intern_Track',
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
  'What is InternTrack?',
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
  note: 'Jamelet states facts only from this file. Anything else → "I\'m sorry, I don\'t have any information about that yet — ask me anything about James and this portfolio."',
} as const;

/* ------------------------------------------------------------------ */
/* Typical answers used by the system prompt as grounding              */
/* ------------------------------------------------------------------ */

export const availabilityAnswer =
  "James is open to internships and collaborations — that's what his portfolio says. I can take you to his contact form if you'd like to reach out. As for exact availability dates, I don't have that detail.";