import { useTheme } from '../hooks/useTheme';
import { cn } from '@/lib/utils';

/**
 * Shared project status pill — theme-aware so it stays legible in both the
 * Royal Purple (dark, primary) and Minimalist (light, secondary) themes.
 * `Complete` reads emerald/solid, anything else (e.g. `Ongoing`) reads
 * amber/pulsing.
 */
export const ProjectStatusPill = ({ status }: { status: string }) => {
  const { isMinimalist } = useTheme();
  const complete = status.trim().toLowerCase() === 'complete';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap backdrop-blur-sm',
        complete
          ? isMinimalist
            ? 'border-emerald-700/30 bg-emerald-600/10 text-emerald-800'
            : 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200'
          : isMinimalist
            ? 'border-amber-700/30 bg-amber-500/10 text-amber-800'
            : 'border-amber-300/40 bg-amber-400/10 text-amber-200'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 rounded-full',
          complete
            ? isMinimalist
              ? 'bg-emerald-600'
              : 'bg-emerald-400'
            : 'bg-amber-400 animate-pulse'
        )}
      />
      {status}
    </span>
  );
};

export default ProjectStatusPill;
