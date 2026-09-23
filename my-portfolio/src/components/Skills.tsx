import { useEffect, useState } from 'react';
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from 'framer-motion';
import { Code } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Mobile',
    skills: ['React Native'],
  },
  {
    title: 'Backend',
    skills: ['PHP', 'Laravel'],
  },
  {
    title: 'Database',
    skills: ['MySQL', 'PostgreSQL'],
  },
  {
    title: 'Server / Environment',
    skills: ['Apache', 'Docker'],
  },
  {
    title: 'Version Control',
    skills: ['Git', 'GitHub'],
  },
  {
    title: 'Design',
    skills: ['Figma'],
  },
  {
    title: 'AI / ML',
    skills: ['Basic knowledge of AI and model development'],
  },
];

function CategoryCard({ category }: { category: (typeof skillCategories)[number] }) {
  return (
    <div className="w-72 shrink-0 bg-bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow group">
      <h3 className="text-xl font-semibold text-primary-light mb-4 group-hover:text-primary-soft transition-colors">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-primary/10 text-text-primary rounded-full text-sm border border-primary/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

const Skills = () => {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const startAnimation = () => {
    if (prefersReducedMotion) return;
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 36, ease: 'linear', repeat: Infinity },
    });
  };

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, prefersReducedMotion]);

  const handleHoverStart = () => {
    setPaused(true);
    controls.stop();
  };

  const handleHoverEnd = () => {
    setPaused(false);
    startAnimation();
  };

  return (
    <section id="skills" className="py-20 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <Code className="text-primary-light" />
            Tech Stack
          </h2>
          <p className="text-text-secondary">
            {paused ? 'Paused — hover to play' : 'Hover the strip to pause'}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {/* Edge fades so cards appear/disappear smoothly */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-dark to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-dark to-transparent" />

        <motion.div
          animate={controls}
          className="flex w-max"
          style={{ willChange: 'transform' }}
        >
          <div className="flex gap-6 pr-6">
            {skillCategories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
          <div className="flex gap-6 pr-6" aria-hidden="true">
            {skillCategories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;