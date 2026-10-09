import { useId } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from 'framer-motion';
import jameletBody from '../../assets/jamelet-body.webp';
import jameletArm from '../../assets/jamelet-arm.webp';

/**
 * Jamelet — James's little tech sidekick.
 *
 * Two visual variants share one motion system:
 * - `new` (default): 3D Gen-Z companion — blue pill body, purple knit beanie
 *   with smiley pin + TikTok tag, pink heart glasses, lavender hoodie,
 *   gold-rose bouquet. Rendered as two layers (`jamelet-body.webp` +
 *   `jamelet-arm.webp`, 512px cutouts of `Jamelet.png`) so the free arm can
 *   wave from its shoulder pivot while the body floats / rocks / nods.
 *   Face is covered, so states are expressed with motion, not eye morphs.
 * - `classic`: original vector egg (purple shell, visor, terminal antenna).
 *   Kept for tiny sizes, tests, and reduced-motion fallbacks.
 *
 * All loops respect prefers-reduced-motion (static pose fallback).
 */

export type JameletState = 'idle' | 'greeting' | 'thinking' | 'responding' | 'fallback';

const EYE_COLOR = '#A78BFA'; // --color-primary-soft
const SHELL_TOP = '#7C3AED';
const SHELL_BOTTOM = '#5B21B6';

interface JameletProps {
  /** Current expression state (drives motion; `classic` also morphs eyes). */
  state?: JameletState;
  /** `new` = 3D image (default), `classic` = original vector egg. */
  variant?: 'new' | 'classic';
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

/**
 * Richer motion for the `new` (3D image) variant — squash-and-stretch plus
 * travel, since the flat PNG can't morph its face. Static when reduced motion.
 */
function poseForNew(state: JameletState, reduced: boolean): TargetAndTransition | undefined {
  if (reduced) return undefined;
  switch (state) {
    case 'idle':
      return {
        y: [0, -10, 0],
        scaleX: [1, 1.03, 1],
        scaleY: [1, 0.97, 1],
        transition: { duration: 4.2, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'greeting':
      return {
        rotate: [0, 10, -8, 6, 0],
        y: [0, -10, -2, -8, 0],
        scaleX: [1, 1.06, 0.96, 1.04, 1],
        scaleY: [1, 0.94, 1.04, 0.97, 1],
        transition: { duration: 2.2, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'thinking':
      return {
        rotate: [-4, -1, -4],
        y: [0, -6, 0],
        scaleY: [1, 1.02, 1],
        transition: { duration: 3.4, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'responding':
      // Talking bob: quick bounce with squash so replies feel spoken.
      return {
        y: [0, -7, 0, -5, 0],
        scaleX: [1, 1.04, 0.98, 1.03, 1],
        scaleY: [1, 0.96, 1.02, 0.97, 1],
        transition: { duration: 1.6, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'fallback':
      return {
        x: [0, -7, 6, -4, 0],
        rotate: [-6, -10, -3, -7, -6],
        transition: { duration: 2.4, ease: 'easeInOut' as const, repeat: Infinity },
      };
  }
}

/** Shoulder hinge of the free-arm layer, as % of the 1166x1349 art. */
const ARM_PIVOT = '16.3% 68.9%';

/** Independent free-arm motion per state (negative = outward wave). Static when reduced. */
function armPoseFor(state: JameletState, reduced: boolean): TargetAndTransition | undefined {
  if (reduced) return undefined;
  switch (state) {
    case 'greeting':
      return {
        rotate: [0, -22, 10, -16, 0],
        transition: { duration: 2, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'idle':
      // Mostly at rest, with a friendly wave burst every loop so the
      // limb motion is actually seen (idle is the dominant launcher state).
      return {
        rotate: [0, 0, 0, -22, 12, -14, 0, 0, 0],
        transition: {
          duration: 9,
          times: [0, 0.55, 0.62, 0.7, 0.76, 0.82, 0.88, 0.94, 1],
          ease: 'easeInOut' as const,
          repeat: Infinity,
        },
      };
    case 'responding':
      return {
        rotate: [0, -9, 5, -7, 0],
        transition: { duration: 1.8, ease: 'easeInOut' as const, repeat: Infinity },
      };
    case 'thinking':
    case 'fallback':
      return undefined;
  }
}

/** Twinkling 4-point star overlay for the `new` variant (decorative). */
function Sparkle({
  className = '',
  duration = 2.4,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.15, 0.7], rotate: [0, 20, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_6px_rgba(255,214,107,0.9)]">
        <path
          d="M12 1c1.2 5.5 4.5 8.8 10 10-5.5 1.2-8.8 4.5-10 10-1.2-5.5-4.5-8.8-10-10 5.5-1.2 8.8-4.5 10-10z"
          fill="#FFD66B"
        />
      </svg>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Mascot                                                              */
/* ------------------------------------------------------------------ */

const Jamelet = ({
  state = 'idle',
  variant = 'new',
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
  const interactive = !reduced;
  const isNew = variant === 'new';

  return (
    <motion.div
      className={`relative ${className}`}
      role="img"
      aria-label={ariaLabel}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={interactive ? { rotate: 5, scale: 1.06 } : undefined}
      whileTap={interactive ? { scaleX: 1.12, scaleY: 0.86, rotate: -5 } : undefined}
    >
      <motion.div
        className="h-full w-full"
        style={{ transformOrigin: '50% 90%' }}
        animate={isNew ? poseForNew(state, reduced) : poseFor(state, reduced)}
      >
        {variant === 'new' ? (
          <div className="relative mx-auto aspect-[512/592] h-full">
            {/* Soft glow tying the blue/pink art into the purple theme */}
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(46,155,255,0.35),rgba(255,158,187,0.25)_55%,transparent_75%)] blur-md"
            />
            <img
              src={jameletBody}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none drop-shadow-[0_10px_24px_rgba(109,40,217,0.35)]"
            />
            {/* Free arm on its own layer — waves from the shoulder pivot */}
            <motion.img
              src={jameletArm}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none"
              style={{ transformOrigin: ARM_PIVOT }}
              animate={armPoseFor(state, reduced)}
            />
            {!reduced && (
              <>
                {/* Glasses shine sweep */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  <motion.span
                    className="absolute left-0 top-[18%] h-[38%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[2px]"
                    animate={{ x: ['-160%', '420%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                  />
                </div>
                <Sparkle className="left-[1%] top-[30%] w-[13%]" duration={2.4} delay={0} />
                <Sparkle className="right-[0%] top-[25%] w-[16%]" duration={2.9} delay={0.9} />
              </>
            )}
          </div>
        ) : (
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

          {/* Ground shadow — breathes in sync with the idle float */}
          <motion.ellipse
            cx={60}
            cy={128}
            rx={24}
            ry={5}
            fill="#000000"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={reduced ? undefined : { scaleX: [1, 0.82, 1], opacity: [0.35, 0.2, 0.35] }}
            transition={
              reduced
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
            }
          />

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

          {/* Terminal prompt motif on the chest — cursor blinks like a live terminal */}
          <path
            d="M54 97 L60 101 L54 105"
            fill="none"
            stroke="#A78BFA"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.rect
            x={64}
            y={99}
            width={3.2}
            height={4.5}
            fill="#A78BFA"
            animate={cursorBlinks ? { opacity: [0.9, 0.1, 0.9] } : { opacity: 0.85 }}
            transition={
              cursorBlinks ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : undefined
            }
          />
        </svg>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Jamelet;

/** Convenience re-export so consumers can type states without importing the type. */
export type { JameletProps };