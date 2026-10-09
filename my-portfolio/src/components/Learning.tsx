import { motion } from 'framer-motion';
import { learningJourney } from '../../shared/portfolio';

// Levels are graded honestly against the work shown in this portfolio —
// adjust them in `shared/portfolio` (single source of truth, also feeds Jamelet).

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
            Learning Journey
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card border border-border rounded-xl p-6 sm:p-8 shadow-lg space-y-7"
        >
          {learningJourney.map((item, index) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-medium text-text-primary">{item.name}</h3>
                <span className="text-sm font-medium text-primary-soft">
                  {item.percent}%
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-2">{item.note}</p>
              <div className="h-2.5 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: index * 0.12, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;