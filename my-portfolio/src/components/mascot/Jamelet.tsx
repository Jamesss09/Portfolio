import { useId } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from 'framer-motion';

/**
 * Jamelet — James's little tech sidekick.
 *
 * Phase 2 deliverable: original vector mascot with five expression states.
 * Visual direction (see vault/Jamelet/00):
 * - Rounded compact egg body, no limbs; terminal-cursor antenna; black-glass visor.
 * - Palette reuses portfolio tokens (#1A0B24, #6D28D9, #8B5CF6, #A78BFA).
 * - Eyes are the only facial animation surface.
 * - All loops respect prefers-reduced-motion (static pose fallback).
 */

export type JameletState = 'idle' | 'greeting' | 'thinking' | 'responding' | 'fallback';

const EYE_COLOR = '#A78BFA'; // --color-primary-soft
const SHELL_TOP = '#7C3AED';
const SHELL_BOTTOM = '#5B21B6';

interface JameletProps {
  /** Current expression state. */
  state?: JameletState;
  /** Sizing / layout classes (defaults to w-24 h-24). */
  className?: string;
  'aria-label'?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function EyeGlow({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.45} fill={EYE_COLOR} opacity={0.26} />;
}

/** Per-state eye geometry (keyed so AnimatePresence cross-fades between states). */
function Eyes({ state }: { state: JameletState }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.g
        key={state}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -3 }}
        transition={{ duration: 0.22 }}
      >
        {state === 'idle' && (
          <>
            <EyeGlow cx={49} cy={68} />
            <EyeGlow cx={71} cy={68} />
            <ellipse cx={49} cy={68} rx={5} ry={8.5} fill={EYE_COLOR} />
            <ellipse cx={71} cy={68} rx={5} ry={8.5} fill={EYE_COLOR} />
          </>
        )}
        {state === 'greeting' && (
          <>
            <path
              d="M44 70.5 Q49 61.5 54 70.5"
              fill="none"
              stroke={EYE_COLOR}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            <path
              d="M66 70.5 Q71 61.5 76 70.5"
              fill="none"
              stroke={EYE_COLOR}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          </>
        )}
        {state === 'thinking' && (
          <>
            <circle cx={49} cy={67} r={3.4} fill={EYE_COLOR} />
            <circle cx={71} cy={67} r={3.4} fill={EYE_COLOR} />
          </>
        )}
        {state === 'responding' && (
          <>
            <EyeGlow cx={49} cy={68} r={10} />
            <EyeGlow cx={71} cy={68} r={10} />
            <path
              d="M45 69.5 Q49 62 53 69.5"
              fill="none"
              stroke={EYE_COLOR}
              strokeWidth={3.2}
              strokeLinecap="round"
            />
            <path
              d="M67 69.5 Q71 62 75 69.5"
              fill="none"
              stroke={EYE_COLOR}
              strokeWidth={3.2}
              strokeLinecap="round"
            />
          </>
        )}
        {state === 'fallback' && (
          <>
            <circle cx={49} cy={69} r={4.2} fill={EYE_COLOR} />
            <circle cx={74} cy={59} r={4.2} fill={EYE_COLOR} />
          </>
        )}
      </motion.g>
    </AnimatePresence>
  );
}

/** Body pose (float / rock / nod / tilt) per state. Static when reduced motion. */
function poseFor(state: JameletState, reduced: boolean): TargetAndTransition | undefined {
  if (reduced) return undefined;
  switch (state) {
    case 'idle':
      return {
        y: [0, -9, 0],
        transition: { duration: 5.5, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'greeting':
      return {
        rotate: [0, 9, -9, 0],
        transition: { duration: 3.6, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'thinking':
      return { y: [0, -5, 0], transition: { duration: 4.4, ease: 'easeInOut' as const, repeat: Infinity } };
    case 'responding':
      return {
        rotate: [0, -3.5, 3.5, 0],
        transition: { duration: 2.6, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'fallback':
      return {
        rotate: [-9, -6.5, -9],
        transition: { duration: 3.2, ease: 'easeInOut' as const, repeat: Infinity },
      };
  }
}

/* ------------------------------------------------------------------ */
/* Mascot                                                              */
/* ------------------------------------------------------------------ */

const Jamelet = ({
  state = 'idle',
  className = 'w-24 h-24',
  'aria-label': ariaLabel = "Jamelet — James's AI portfolio sidekick",
}: JameletProps) => {
  const reduced = useReducedMotion() ?? false;
  const uid = useId().replace(/[:]/g, '');

  const shellGrad = `jamelet-shell-${uid}`;
  const bodyGrad = `jamelet-body-${uid}`;
  const visorGrad = `jamelet-visor-${uid}`;

  const blinks = !reduced && (state === 'idle' || state === 'responding');
  const cursorBlinks = !reduced;

  return (
    <motion.div
      className={className}
      role="img"
      aria-label={ariaLabel}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div className="h-full w-full" animate={poseFor(state, reduced)}>
        <svg viewBox="0 0 120 136" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={shellGrad} x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0" stopColor={SHELL_TOP} />
              <stop offset="1" stopColor={SHELL_BOTTOM} />
            </linearGradient>
            <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#241039" />
              <stop offset="1" stopColor="#12061C" />
            </linearGradient>
            <linearGradient id={visorGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0E0716" />
              <stop offset="1" stopColor="#1A0F29" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx={60} cy={128} rx={24} ry={5} fill="#000000" opacity={0.35} />

          {/* Terminal-cursor antenna */}
          <rect x={57} y={10} width={6} height={13} rx={2.5} fill="#8B5CF6" />
          <motion.rect
            x={54.5}
            y={4}
            width={11}
            height={7.5}
            rx={1.6}
            fill={EYE_COLOR}
            animate={cursorBlinks ? { opacity: [1, 0.15, 1] } : undefined}
            transition={
              cursorBlinks
                ? { duration: 2.6, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }
                : undefined
            }
          />

          {/* Shell (royal purple) */}
          <ellipse cx={60} cy={74} rx={38} ry={50} fill={`url(#${shellGrad})`} />
          {/* Shell rim light */}
          <path
            d="M28 94 a38 50 0 0 1 0 -40"
            fill="none"
            stroke="#A78BFA"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Body front (dark plum) */}
          <ellipse cx={60} cy={79} rx={30} ry={40} fill={`url(#${bodyGrad})`} />
          {/* Soft gloss */}
          <ellipse
            cx={47}
            cy={62}
            rx={8}
            ry={13}
            fill="#F5F3FF"
            opacity={0.05}
            transform="rotate(-18 47 62)"
          />

          {/* Black-glass visor */}
          <rect
            x={34}
            y={52}
            width={52}
            height={34}
            rx={15}
            fill={`url(#${visorGrad})`}
            stroke="#8B5CF6"
            strokeOpacity={0.4}
            strokeWidth={1.5}
          />
          <rect x={37} y={54} width={46} height={7} rx={3.5} fill="#A78BFA" opacity={0.12} />

          {/* Eyes (the only facial animation surface) */}
          <motion.g
            animate={blinks ? { opacity: [1, 1, 0.05, 1] } : undefined}
            transition={
              blinks
                ? { duration: 4.8, times: [0, 0.93, 0.96, 1], repeat: Infinity, ease: 'easeInOut' }
                : undefined
            }
          >
            <Eyes state={state} />
          </motion.g>

          {/* Terminal prompt motif on the chest */}
          <path
            d="M54 97 L60 101 L54 105"
            fill="none"
            stroke="#A78BFA"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={64} y={99} width={3.2} height={4.5} fill="#A78BFA" opacity={0.85} />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Jamelet;

/** Convenience re-export so consumers can type states without importing the type. */
export type { JameletProps };