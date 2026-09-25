import type { JameletState } from './Jamelet';

/** All expression states, in a file of its own so Jamelet.tsx stays component-only. */
export const JAMELET_STATES: JameletState[] = [
  'idle',
  'greeting',
  'thinking',
  'responding',
  'fallback',
];