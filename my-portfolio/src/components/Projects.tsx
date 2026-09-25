import { motion } from 'framer-motion';
import { GithubIcon } from './SocialIcons';
import capstoneImage from '../assets/capstone.png';

// Real, verifiable projects — data pulled from the GitHub repo.
const projects = [
  {
    name: 'Code Nexus — Capstone',
    description:
      'My ongoing capstone project — a web application built with Laravel and PHP. This is where I practice real backend development: Blade templates, routing, and containerizing the app with Docker.',
    tech: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'Docker'],
    repo: 'https://github.com/Jamesss09/Capstone',
    status: 'Ongoing',
    image: capstoneImage,
  },
];

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
                    <p className="text-text-secondary leading-relaxed mb-5">
                      {project.description}
                    </p>
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