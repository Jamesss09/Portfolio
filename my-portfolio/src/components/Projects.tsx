import { motion } from 'framer-motion';
import { GithubIcon } from './SocialIcons';
import capstoneImage from '../assets/Capstone.jpg';

// Real, verifiable projects — data pulled from the GitHub repo.
const projects = [
  {
    name: 'TMC Entrance Examination: Answer Sheet Recognition and Scoring System',
    intro: 'An automated system that:',
    features: [
      '**Scans** a single-page shaded multiple-choice answer sheet using an **Android phone camera** (staff) or uploaded image',
      '**Recognizes** the shaded answers per item using **AI/OMR** (Python, PyTorch, OpenCV)',
      '**Scores** automatically — compares to the official answer key, computes score, and decides **Passed / Failed**',
      '**Manages** answer keys, results, folders, users, settings via a **web platform** (React.js + Tailwind + Laravel + MySQL)',
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'React', 'Tailwind', 'Laravel', 'MySQL'],
    repo: 'https://github.com/Jamesss09/Capstone',
    status: 'Ongoing',
    image: capstoneImage,
  },
];

// Renders **bold** segments from a plain-text feature string
const FeatureText = ({ text }: { text: string }) => (
  <>
    {text.split('**').map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-semibold text-text-primary">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      ),
    )}
  </>
);

const Projects = () => {
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

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative"
            >
              <div className="grid md:grid-cols-2">
                {/* Project image */}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} — screenshot`}
                    className="h-full w-full object-cover aspect-video md:aspect-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-colors" />
                </a>

                {/* Project details */}
                <div className="p-8 relative">
                  <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-text-primary">{project.name}</h3>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-soft">
                        <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                        {project.status}
                      </span>
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-4">{project.intro}</p>
                    <ol className="space-y-2.5 mb-6">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-text-secondary leading-relaxed">
                          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary-light">
                            {i + 1}
                          </span>
                          <span>
                            <FeatureText text={feature} />
                          </span>
                        </li>
                      ))}
                    </ol>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-sm text-text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-light hover:text-primary-soft transition-colors font-medium"
                    >
                      <GithubIcon width={20} height={20} />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-text-secondary mt-10"
        >
          More projects are in the works — this list will grow as I finish my current work.
        </motion.p>
      </div>
    </section>
  );
};

export default Projects;