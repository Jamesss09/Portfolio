import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  /** Icon only, no label. */
  collapsed?: boolean;
  className?: string;
}

/**
 * Theme switcher: royal purple (dark, primary/default) <-> minimalist
 * (light, secondary). Self-contained — reads shared theme state via
 * `useTheme()`, so every instance stays in sync with the rest of the app.
 * The underlying theme ids (`vibrant`/`minimalist`)
 * are unchanged so stored preferences keep working.
 */
const ThemeToggle = ({ collapsed = false, className }: ThemeToggleProps) => {
  const { toggle, isMinimalist } = useTheme();
  const reduceMotion = useReducedMotion();
  const currentLabel = isMinimalist ? 'minimalist' : 'royal purple';
  const nextLabel = isMinimalist ? 'royal purple' : 'minimalist';
  const Icon = isMinimalist ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme (currently ${currentLabel})`}
      title={`Switch to ${nextLabel} theme`}
      aria-pressed={isMinimalist}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/90 px-3 py-2 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        collapsed && 'justify-center px-0 w-full',
        className
      )}
    >
      {/* Icon morph — keyed swap so Sun rolls out as Moon rolls in.
          Fixed-size box keeps the button width stable mid-animation. */}
      <span className="grid size-4 shrink-0 place-items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isMinimalist ? 'moon' : 'sun'}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="col-start-1 row-start-1"
          >
            <Icon size={16} aria-hidden="true" />
          </motion.span>
        </AnimatePresence>
      </span>
      {!collapsed && (
        <span className="hidden whitespace-nowrap sm:inline">
          {isMinimalist ? 'Royal Purple' : 'Minimalist'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
