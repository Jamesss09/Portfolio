import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const learningItems = [
  { name: 'Web Development', level: 5 },
  { name: 'Backend Development', level: 4 },
  { name: 'UI/UX Design', level: 3 },
  { name: 'AI / Models', level: 2 },
];

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
          <h2 className="text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-primary-light" />
            Learning Journey
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card border border-border rounded-xl p-8 shadow-lg space-y-7"
        >
          {learningItems.map((item, index) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-text-primary">{item.name}</h3>
                <span className="text-sm font-medium text-primary-soft">
                  {item.level * 20}%
                </span>
              </div>
              <div className="h-2.5 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level * 20}%` }}
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