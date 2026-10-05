import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  /** When rendered inside the collapsed sidebar, show icon only. */
  collapsed?: boolean;
  className?: string;
}

/**
 * Theme switcher: vibrant (dark purple nebula) <-> minimalist (light, clean).
 * Self-contained — reads shared theme state via `useTheme()`, so any number
 * of instances (sidebar footer + mobile floating button) stay in sync.
 */
const ThemeToggle = ({ collapsed = false, className }: ThemeToggleProps) => {
  const { theme, toggle, isMinimalist } = useTheme();
  const next = isMinimalist ? 'vibrant' : 'minimalist';
  const Icon = isMinimalist ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme (currently ${theme})`}
      title={`Switch to ${next} theme`}
      aria-pressed={isMinimalist}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/90 px-3 py-2 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        collapsed && 'justify-center px-0 w-full',
        className
      )}
    >
      <Icon size={16} aria-hidden="true" className="shrink-0" />
      {!collapsed && (
        <span className="whitespace-nowrap">
          {isMinimalist ? 'Vibrant' : 'Minimalist'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
