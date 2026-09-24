import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ChevronLeft, ChevronRight, BrainCircuit } from 'lucide-react';
import {
  siReact,
  siJavascript,
  siTypescript,
  siPhp,
  siLaravel,
  siMysql,
  siPostgresql,
  siApache,
  siDocker,
  siGit,
  siGithub,
  siFigma,
} from 'simple-icons';
import TechLogo, { type IconSource } from './TechLogo';
import { cn } from '@/lib/utils';

type Skill = {
  name: string;
  icon: IconSource;
};

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: { kind: 'simple', icon: siReact } },
      { name: 'JavaScript', icon: { kind: 'simple', icon: siJavascript } },
      { name: 'TypeScript', icon: { kind: 'simple', icon: siTypescript } },
    ],
  },
  {
    title: 'Mobile',
    skills: [{ name: 'React Native', icon: { kind: 'simple', icon: siReact } }],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'PHP', icon: { kind: 'simple', icon: siPhp } },
      { name: 'Laravel', icon: { kind: 'simple', icon: siLaravel } },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL', icon: { kind: 'simple', icon: siMysql } },
      { name: 'PostgreSQL', icon: { kind: 'simple', icon: siPostgresql } },
    ],
  },
  {
    title: 'Server / Environment',
    skills: [
      { name: 'Apache', icon: { kind: 'simple', icon: siApache } },
      { name: 'Docker', icon: { kind: 'simple', icon: siDocker } },
    ],
  },
  {
    title: 'Version Control',
    skills: [
      { name: 'Git', icon: { kind: 'simple', icon: siGit } },
      { name: 'GitHub', icon: { kind: 'simple', icon: siGithub } },
    ],
  },
  {
    title: 'Design',
    skills: [{ name: 'Figma', icon: { kind: 'simple', icon: siFigma } }],
  },
  {
    title: 'AI / ML',
    skills: [{ name: 'AI / ML', icon: { kind: 'lucide', icon: BrainCircuit } }],
  },
];

function CategoryCard({ category }: { category: (typeof skillCategories)[number] }) {
  return (
    <div className="w-full h-full bg-bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow group">
      <h3 className="text-xl font-semibold text-primary-light mb-4 group-hover:text-primary-soft transition-colors">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-text-primary rounded-full text-sm border border-primary/30"
          >
            <TechLogo source={skill.icon} />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const Skills = () => {
  const [active, setActive] = useState(0);
  const total = skillCategories.length;

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(total - 1, a + 1));

  return (
    <section id="skills" className="py-20 bg-bg-dark px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <Code className="text-primary-light" />
            Tech Stack
          </h2>
        </motion.div>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous category"
            className="grid place-items-center size-11 shrink-0 rounded-full border border-primary/30 text-primary-light hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Stacked cards */}
          <div className="relative h-[320px] w-[280px] sm:w-[340px]">
            {skillCategories.map((category, i) => {
              const offset = i - active;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <motion.div
                  key={category.title}
                  className="absolute inset-0"
                  style={{ zIndex: 30 - Math.abs(offset), pointerEvents: isVisible ? 'auto' : 'none' }}
                  animate={{
                    x: offset * 28,
                    scale: offset === 0 ? 1 : 0.9,
                    rotate: offset === -1 ? -4 : offset === 1 ? 4 : 0,
                    opacity: isVisible ? (offset === 0 ? 1 : 0.55) : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  onClick={() => {
                    if (offset === 1) next();
                    if (offset === -1) prev();
                  }}
                >
                  <CategoryCard category={category} />
                </motion.div>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={active === total - 1}
            aria-label="Next category"
            className="grid place-items-center size-11 shrink-0 rounded-full border border-primary/30 text-primary-light hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {skillCategories.map((category, i) => (
            <button
              key={category.title}
              onClick={() => setActive(i)}
              aria-label={`Go to ${category.title}`}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active ? 'w-6 bg-primary-light' : 'w-2 bg-border hover:bg-primary/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;