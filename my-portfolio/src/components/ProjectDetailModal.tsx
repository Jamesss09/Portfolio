import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  Check,
  ExternalLink,
  Download,
  User,
  Sparkles,
  ListChecks,
  Wrench,
  CircleHelp,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { ProjectStatusPill } from './ProjectStatus';
import type { ProjectDetails, ProjectLink } from '../../shared/portfolio';

interface ProjectDetailModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  status: string;
  repo: string;
  image?: string;
  details: ProjectDetails;
  /** Optional screenshot gallery, keyed by project id in Projects.tsx. */
  images?: string[];
}

const SECTION_ICON = {
  overview: Sparkles,
  problem: CircleHelp,
  features: ListChecks,
  stack: Wrench,
  role: User,
} as const;

/** Renders a secondary link button, picking the icon from its `kind`. */
const LinkButton = ({ link }: { link: ProjectLink }) => {
  const Icon =
    link.kind === 'github' ? GithubIcon : link.kind === 'download' ? Download : ExternalLink;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary-soft transition-colors hover:bg-primary/20 focus-visible:border-primary-light focus-visible:outline-none"
    >
      <Icon width={16} height={16} />
      {link.label}
    </a>
  );
};

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: (typeof SECTION_ICON)[keyof typeof SECTION_ICON];
  children: ReactNode;
}) => (
  <section>
    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-light">
      <Icon size={16} aria-hidden="true" />
      {title}
    </h3>
    <div className="mt-2.5 text-sm leading-relaxed text-text-secondary">{children}</div>
  </section>
);

const ProjectDetailModal = ({
  open,
  onClose,
  name,
  status,
  repo,
  image,
  details,
  images = [],
}: ProjectDetailModalProps) => {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Lock background scroll while the dialog is open, restoring it on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the dialog on open, and hand it back to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  // Keep Tab inside the dialog while it's open.
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const links: readonly ProjectLink[] = details.links ?? [];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          {/* Backdrop — click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onKeyDown={onKeyDown}
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 40,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 40,
              scale: prefersReducedMotion ? 1 : 0.98,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }
            }
            className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border bg-bg-card shadow-2xl sm:rounded-2xl"
          >
            {/* Floating close — always reachable over banner or title */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border bg-bg-primary/70 text-text-secondary backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary-soft focus-visible:border-primary-light focus-visible:outline-none"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {/* Cover banner */}
            {image && (
              <div className="relative h-44 sm:h-56 shrink-0 overflow-hidden bg-bg-dark">
                <img
                  src={image}
                  alt={`${name} — cover`}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/25 to-transparent"
                />
                <div className="absolute bottom-3 left-5 sm:left-6">
                  <ProjectStatusPill status={status} />
                </div>
              </div>
            )}

            {/* Title */}
            <div className="border-b border-border p-5 pr-16 sm:px-6">
              <h2
                id="project-detail-title"
                className="text-lg font-bold leading-snug text-text-primary sm:text-2xl"
              >
                {name}
              </h2>
              {details.role && (
                <p className="mt-1 text-sm text-text-secondary">
                  <span className="font-semibold text-primary-soft">
                    {details.role.title}
                  </span>
                </p>
              )}
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
              <Section title="Overview" icon={SECTION_ICON.overview}>
                <p>{details.overview}</p>
              </Section>

              <Section title="Problem & Purpose" icon={SECTION_ICON.problem}>
                <p>{details.problem}</p>
              </Section>

              <Section title="Main Features" icon={SECTION_ICON.features}>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {details.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check
                        size={16}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-primary-light"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {images.length > 0 && (
                <section>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-light">
                    Screenshots
                    <span className="font-medium normal-case tracking-normal text-text-secondary">
                      ({images.length})
                    </span>
                  </h3>
                  <div
                    role="list"
                    aria-label={`${name} screenshots — scroll sideways to browse`}
                    className="mt-2.5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
                  >
                    {images.map((src, i) => (
                      <a
                        key={src}
                        role="listitem"
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open screenshot ${i + 1} of ${name} full size`}
                        className="shrink-0 snap-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                      >
                        <img
                          src={src}
                          loading="lazy"
                          alt={`${name} — screenshot ${i + 1}`}
                          className="h-40 w-auto rounded-lg border border-border bg-bg-dark object-cover sm:h-48"
                        />
                      </a>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    Scroll sideways to browse — select any shot to open it full size.
                  </p>
                </section>
              )}

              <Section title="Technologies & Tools" icon={SECTION_ICON.stack}>
                <dl className="space-y-3">
                  {details.stack.map((group) => (
                    <div key={group.label}>
                      <dt className="text-xs font-semibold text-text-primary">
                        {group.label}
                      </dt>
                      <dd className="mt-1.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs text-text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>

              {details.role && (
                <Section title="My Role" icon={SECTION_ICON.role}>
                  <p className="font-semibold text-text-primary">{details.role.title}</p>
                  <p className="mt-1">{details.role.note}</p>
                </Section>
              )}
            </div>

            {/* Footer — primary repo action, extra links, back action */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border bg-bg-primary/40 p-5 sm:p-6">
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
              >
                <GithubIcon width={16} height={16} />
                View on GitHub
              </a>
              {links.map((link) => (
                <LinkButton key={link.href} link={link} />
              ))}
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-primary/50 hover:text-primary-soft focus-visible:border-primary-light focus-visible:outline-none"
              >
                <X size={16} aria-hidden="true" />
                Back to Projects
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
