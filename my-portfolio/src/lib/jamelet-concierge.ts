import { links } from '../../shared/portfolio';
import type { JameletAction } from '../../shared/jamelet-concierge';

/**
 * Client-side façade for the shared concierge.
 * The responder itself lives in `shared/jamelet-concierge.ts` so the browser
 * (Phase 3 offline fallback) and the Vercel function (Phase 4) use the exact
 * same logic. The link map below is UI-only (rendering whitelisted actions).
 */
export { jameletRespond, fallbackReply, GREETING } from '../../shared/jamelet-concierge';
export type { ConciergeReply, JameletAction } from '../../shared/jamelet-concierge';

export const ACTION_LINKS: Record<
  JameletAction,
  { label: string; href: string; external?: boolean }
> = {
  'view-about': { label: 'About section', href: '#about' },
  'view-skills': { label: 'Skills', href: '#skills' },
  'view-projects': { label: 'Projects', href: '#projects' },
  'view-learning': { label: 'Learning', href: '#learning' },
  'contact-james': { label: 'Contact James', href: '#contact' },
  'open-github': { label: 'Open GitHub', href: links.github, external: true },
};