import { motion } from 'framer-motion';
import { learningJourney, projects } from '../../shared/portfolio';

const Learning = () => {
  return (
    <section id="learning" className="py-20 px-6 bg-bg-dark/75">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl font-medium tracking-tight text-text-primary mb-4">
            My Journey
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card border border-border rounded-xl p-6 sm:p-8 shadow-lg space-y-8"
        >
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary mb-4">
              What I&apos;ve built
            </h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-base font-medium text-text-primary">{project.name}</p>
                    <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-text-secondary">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-light text-text-secondary">{project.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary mb-4">
              What I&apos;m learning
            </h3>
            <ul className="space-y-4">
              {learningJourney.map((item) => (
                <li key={item.name}>
                  <h4 className="text-lg font-medium text-text-primary">{item.name}</h4>
                  <p className="text-sm font-light text-text-secondary">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;
