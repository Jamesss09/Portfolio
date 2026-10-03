import { useRef, useState, type TouchEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import ProjectDetailModal from './ProjectDetailModal';
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
import { projects as sharedProjects, projectsFooter } from '../../shared/portfolio';

// Card is intentionally compact — sized close to the screenshot, text condensed to fit.
// Only the short blurb lives on the card; the full story is behind "View More".

/**
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

/** Horizontal drag distance (px) that counts as a swipe. */
const SWIPE_THRESHOLD = 50;

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const count = projects.length;

  // Wraps in both directions so the arrows are never dead ends.
  const goTo = (next: number) => setIndex(((next % count) + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Touch swipe. `touch-pan-y` (set on the viewport) keeps vertical page
  // scrolling intact while letting us own the horizontal axis.
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const end = e.changedTouches[0]?.clientX;
    if (end === undefined) return;
    const delta = end - start;
    if (delta <= -SWIPE_THRESHOLD) next();
    else if (delta >= SWIPE_THRESHOLD) prev();
  };

  const current = projects[index];
  const detailProject = projects.find((project) => project.id === detailId);

  return (
    <section id="projects" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">Projects</h2>
        </motion.div>

        {/* Carousel — a region so screen readers announce slide changes. */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
          }}
          tabIndex={-1}
        >
          <div className="overflow-hidden touch-pan-y">
            <motion.ul
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }
              }
            >
              {projects.map((project, i) => (
                <li
                  key={project.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${projects.length}: ${project.name}`}
                  className="w-full shrink-0"
                  aria-hidden={i !== index}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative max-w-2xl mx-auto"
                  >
                    <div className="grid md:grid-cols-2">
                      {/* Project image — fixed height so the card stays compact like the image */}
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block overflow-hidden bg-bg-dark aspect-video md:aspect-auto md:h-56"
                        aria-label={`View ${project.name} on GitHub`}
                        tabIndex={i === index ? 0 : -1}
                      >
                        <img
                          src={project.image}
                          alt={`${project.name} — screenshot`}
                          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-colors" />
                      </a>

                      {/* Project details — compact so it fits beside the image */}
                      <div className="p-5 sm:p-6 flex flex-col justify-center relative">
                        <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-snug">
                              {project.name}
                            </h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-soft whitespace-nowrap">
                              <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                              {project.status}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                            {project.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs text-text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-0.5">
                            <button
                              type="button"
                              onClick={() => setDetailId(project.id)}
                              className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-primary-soft transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light rounded-sm"
                              tabIndex={i === index ? 0 : -1}
                            >
                              <Eye size={16} aria-hidden="true" />
                              View More
                            </button>
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-primary-soft transition-colors font-medium"
                              tabIndex={i === index ? 0 : -1}
                            >
                              <GithubIcon width={16} height={16} />
                              View on GitHub
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Controls */}
          {count > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="grid size-11 place-items-center rounded-full border border-primary/50 bg-bg-card/80 text-primary-light backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary-light hover:bg-primary/10 focus-visible:border-primary-light focus-visible:outline-none"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {projects.map((project, i) => (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}: ${project.name}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light ${
                      i === index
                        ? 'w-7 bg-primary-soft'
                        : 'w-2 bg-border hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="grid size-11 place-items-center rounded-full border border-primary/50 bg-bg-card/80 text-primary-light backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary-light hover:bg-primary/10 focus-visible:border-primary-light focus-visible:outline-none"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Position readout + live region for assistive tech */}
          <p className="sr-only" aria-live="polite">
            Showing project {index + 1} of {count}: {current?.name}
          </p>
          {count > 1 && (
            <p className="text-center text-sm text-text-secondary mt-4 tabular-nums">
              {index + 1} / {count}
            </p>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-text-secondary mt-10"
        >
          {projectsFooter}
        </motion.p>

        {/* Full project story — kept out of the compact cards. */}
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
