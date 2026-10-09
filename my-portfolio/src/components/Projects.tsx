import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Download, ExternalLink, Eye } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import ProjectDetailModal from './ProjectDetailModal';
import { ProjectStatusPill } from './ProjectStatus';
import capstoneImage from '../assets/Capstone.jpg';
import capstoneWebDashboard from '../assets/capstone/web-admin-dashboard.png';
import capstoneWebAnswerKeys from '../assets/capstone/web-answer-keys.png';
import capstoneWebResults from '../assets/capstone/web-exam-results.png';
import capstoneMobileHome from '../assets/capstone/mobile-scanner-home.png';
import capstoneMobileProcessing from '../assets/capstone/mobile-processing.png';
import capstoneMobileResult from '../assets/capstone/mobile-view-result.png';
import internTrackImage from '../assets/InternTrack.png';
import internTrackShot1 from '../assets/interntrack/InternTrack-1.jpg';
import internTrackShot2 from '../assets/interntrack/InternTrack-2.jpg';
import { links, projects as sharedProjects, projectsFooter } from '../../shared/portfolio';

/**
 * Featured-stack Projects section. Every project is visible at once in large
 * alternating cards (cover ↔ details) — no hidden carousel slides.
 * The short summary plus a 3-feature preview live on the card; the full story
 * is behind "View Case Study".
 *
 * Artwork per project. The copy, tech, status, repo and long-form details all
 * come from `shared/portfolio` so the site and the Jamelet chatbot stay in sync.
 * Gallery images live in `src/assets/capstone/` (web + mobile prototypes)
 * and `src/assets/interntrack/`.
 */
const artwork: Record<string, { image: string; images: string[] }> = {
  capstone: {
    image: capstoneImage,
    images: [
      capstoneWebDashboard,
      capstoneWebAnswerKeys,
      capstoneWebResults,
      capstoneMobileHome,
      capstoneMobileProcessing,
      capstoneMobileResult,
    ],
  },
  interntrack: { image: internTrackImage, images: [internTrackShot1, internTrackShot2] },
};

const projects = sharedProjects.map((project) => ({
  ...project,
  ...artwork[project.id],
}));

/** Platform tags overlaid on each cover — short, scannable, keyed by project id. */
const platformTags: Record<string, string[]> = {
  capstone: ['Web', 'Mobile', 'AI / OMR'],
  interntrack: ['Mobile', 'Offline-first'],
};

/** Tech pills shown on the card before collapsing the rest into a `+N` pill. */
const VISIBLE_TECH = 4;
/** Feature bullets previewed on the card; the rest live in the case study. */
const PREVIEW_FEATURES = 3;

const Projects = () => {
  const [detailId, setDetailId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const detailProject = projects.find((project) => project.id === detailId);

  return (
    <section id="projects" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-6xl mx-auto">
        {/* Section header — matches About: eyebrow, display heading, gradient rule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-soft">
            Selected Work
          </span>
          <h2 className="font-display text-5xl font-medium tracking-tight text-text-primary mb-4">
            Projects
          </h2>
          <motion.div
            animate={{ backgroundPositionX: ['0%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary-soft via-primary-light to-primary-soft bg-[length:200%_100%]"
          />
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-text-secondary leading-relaxed">
            Two builds that show my range — an AI-assisted entrance-exam platform
            and an offline-first OJT tracker.
          </p>
        </motion.div>

        {/* Featured stack — every project visible, alternating cover/details */}
        <div className="space-y-8 lg:space-y-12">
          {projects.map((project, i) => {
            const flip = i % 2 === 1;
            const number = String(i + 1).padStart(2, '0');
            const visibleTech = project.tech.slice(0, VISIBLE_TECH);
            const hiddenTech = project.tech.length - visibleTech.length;
            const previewFeatures = project.details.features.slice(0, PREVIEW_FEATURES);
            const remainingFeatures =
              project.details.features.length - previewFeatures.length;
            const extraLinks =
              'links' in project.details ? (project.details.links ?? []) : [];
            const downloadLink = extraLinks.find((link) => link.kind === 'download');
            const tags = platformTags[project.id] ?? [];

            return (
              <motion.article
                key={project.id}
                aria-labelledby={`project-title-${project.id}`}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : i * 0.08,
                }}
                className="project-card group relative overflow-hidden rounded-2xl border border-border bg-bg-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/20"
              >
                <div className="grid lg:grid-cols-[1.05fr_1fr]">
                  {/* Cover — opens the case study dialog, not an external page */}
                  <button
                    type="button"
                    onClick={() => setDetailId(project.id)}
                    aria-haspopup="dialog"
                    aria-label={`Open case study: ${project.name}`}
                    className={`group/media relative block min-h-60 overflow-hidden bg-bg-dark text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light ${
                      flip ? 'lg:order-2' : ''
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} — cover screenshot`}
                      loading="lazy"
                      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover/media:scale-[1.04] lg:aspect-auto lg:min-h-[340px]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-bg-primary/85 via-bg-primary/10 to-transparent"
                    />
                    <span className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-bg-primary/70 px-2.5 py-0.5 text-xs font-semibold tracking-[0.2em] text-text-primary backdrop-blur-sm">
                        {number}
                      </span>
                      <ProjectStatusPill status={project.status} />
                    </span>
                    {tags.length > 0 && (
                      <span className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-bg-primary/60 px-2.5 py-0.5 text-xs text-text-primary backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/media:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-bg-primary/80 px-4 py-2 text-sm font-semibold text-text-primary backdrop-blur-sm">
                        <Eye size={16} aria-hidden="true" />
                        View Case Study
                      </span>
                    </span>
                  </button>

                  {/* Details */}
                  <div className="relative flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
                    <div
                      aria-hidden="true"
                      className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
                    />
                    <div className="relative space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-soft">
                        {project.details.role?.title ?? 'Project'}
                        <span className="mx-2 text-text-secondary/60" aria-hidden="true">
                          •
                        </span>
                        <span className="font-medium normal-case tracking-normal text-text-secondary">
                          {project.details.features.length} key features
                        </span>
                      </p>
                      <h3
                        id={`project-title-${project.id}`}
                        className="text-xl sm:text-2xl font-bold leading-snug text-text-primary"
                      >
                        {project.name}
                      </h3>
                      <p className="text-sm sm:text-[15px] leading-relaxed text-text-secondary">
                        {project.summary}
                      </p>
                      <ul className="space-y-1.5">
                        {previewFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                          >
                            <Check
                              size={16}
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 text-primary-light"
                            />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {remainingFeatures > 0 && (
                        <p className="text-xs text-text-secondary">
                          +{remainingFeatures} more in the case study
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {visibleTech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs text-text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                        {hiddenTech > 0 && (
                          <span className="rounded-full border border-dashed border-primary/40 px-2.5 py-0.5 text-xs text-text-secondary">
                            +{hiddenTech}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setDetailId(project.id)}
                          aria-haspopup="dialog"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                        >
                          <Eye size={16} aria-hidden="true" />
                          View Case Study
                        </button>
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} source code on GitHub`}
                          className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2.5 text-sm font-semibold text-primary-light transition-all hover:-translate-y-0.5 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                        >
                          <GithubIcon width={16} height={16} />
                          Code
                        </a>
                        {downloadLink && (
                          <a
                            href={downloadLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary-soft transition-colors"
                          >
                            <Download size={16} aria-hidden="true" />
                            {downloadLink.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Growth signal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
          className="text-center text-text-secondary mt-10"
        >
          {projectsFooter}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.25 }}
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-bg-card/50 px-6 py-4 text-sm font-medium text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
        >
          <GithubIcon width={18} height={18} />
          More in the works — follow along on GitHub
          <ExternalLink size={16} aria-hidden="true" />
        </motion.a>

        {/* Full project story — kept out of the featured cards. */}
        {detailProject && (
          <ProjectDetailModal
            open
            onClose={() => setDetailId(null)}
            name={detailProject.name}
            status={detailProject.status}
            repo={detailProject.repo}
            image={detailProject.image}
            details={detailProject.details}
            images={detailProject.images}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
