import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const learningItems = [
  { name: 'Web Development', level: 4 },
  { name: 'Backend Development', level: 3 },
  { name: 'UI/UX Design', level: 3 },
  { name: 'AI / Models', level: 2 },
];

const Learning = () => {
  const getDots = (level: number) => {
    return Array(5).fill(0).map((_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level ? 'bg-primary-light' : 'bg-border'
        }`}
      />
    ));
  };

  return (
    <section id="learning" className="py-20 px-6 bg-bg-dark">
      <div className="max-w-6xl mx-auto">
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
          className="bg-bg-card border border-border rounded-xl p-8 shadow-lg max-w-3xl mx-auto"
        >
          <div className="space-y-6">
            {learningItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between gap-4 flex-wrap"
              >
                <h3 className="text-lg font-medium text-text-primary">{item.name}</h3>
                <div className="flex gap-2">{getDots(item.level)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;