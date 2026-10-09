import { useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import {
  siReact,
  siJavascript,
  siTypescript,
  siPhp,
  siLaravel,
  siExpress,
  siMysql,
  siPostgresql,
  siApache,
  siDocker,
  siGit,
  siGithub,
  siFigma,
  siExpo,
} from 'simple-icons';
import TechLogo, { type IconSource } from './TechLogo';
import { skillCategories as sharedSkillCategories } from '../../shared/portfolio';

type Skill = {
  name: string;
  icon: IconSource;
  /** Self-rated proficiency, 1–5 (matches the honest tone of Learning Journey). */
  level: 1 | 2 | 3 | 4 | 5;
};

/**
 * Presentation data per skill (icon + self-rating). Names and categories come
 * from `shared/portfolio` so the site and Jamelet stay in sync — a skill
 * added there without meta here falls back to the generic entry below.
 */
const skillMeta: Record<string, { icon: IconSource; level: Skill['level'] }> = {
  'React.js': { icon: { kind: 'simple', icon: siReact }, level: 4 },
  JavaScript: { icon: { kind: 'simple', icon: siJavascript }, level: 4 },
  TypeScript: { icon: { kind: 'simple', icon: siTypescript }, level: 4 },
  'React Native': { icon: { kind: 'simple', icon: siReact }, level: 4 },
  Expo: { icon: { kind: 'simple', icon: siExpo }, level: 4 },
  PHP: { icon: { kind: 'simple', icon: siPhp }, level: 4 },
  Laravel: { icon: { kind: 'simple', icon: siLaravel }, level: 4 },
  'Express.js': { icon: { kind: 'simple', icon: siExpress }, level: 3 },
  MySQL: { icon: { kind: 'simple', icon: siMysql }, level: 3 },
  PostgreSQL: { icon: { kind: 'simple', icon: siPostgresql }, level: 2 },
  Apache: { icon: { kind: 'simple', icon: siApache }, level: 2 },
  Docker: { icon: { kind: 'simple', icon: siDocker }, level: 2 },
  Git: { icon: { kind: 'simple', icon: siGit }, level: 4 },
  GitHub: { icon: { kind: 'simple', icon: siGithub }, level: 4 },
  Figma: { icon: { kind: 'simple', icon: siFigma }, level: 3 },
  'AI / ML': { icon: { kind: 'lucide', icon: BrainCircuit }, level: 2 },
};

const skillCategories: { title: string; skills: Skill[] }[] = sharedSkillCategories.map(
  (category) => ({
    title: category.title,
    skills: category.skills.map((name) => ({
      name,
      ...(skillMeta[name] ?? {
        icon: { kind: 'lucide', icon: BrainCircuit },
        level: 3 as const,
      }),
    })),
  })
);

function CategoryCard({ category }: { category: (typeof skillCategories)[number] }) {
  return (
    <div className="w-[270px] sm:w-80 shrink-0 bg-bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow group">
      <h3 className="text-xl font-semibold text-primary-light mb-4 group-hover:text-primary-soft transition-colors">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-text-primary rounded-full text-sm border border-primary/30"
            title={`${skill.name} — proficiency ${skill.level} out of 5`}
          >
            <TechLogo source={skill.icon} />
            {skill.name}
            <span
              className="flex items-center gap-1"
              role="img"
              aria-label={`${skill.name} proficiency ${skill.level} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${
                    dot <= skill.level ? 'bg-primary-light' : 'bg-primary/25'
                  }`}
                />
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

const Skills = () => {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 36, ease: 'linear', repeat: Infinity },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, prefersReducedMotion]);

  return (
    <section id="skills" className="py-20 bg-bg-dark/75">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-5xl font-medium tracking-tight text-text-primary mb-4">Tech Stack</h2>
          <p className="text-sm text-text-secondary">
            Dots show self-rated proficiency out of 5.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        {/* Edge fades so cards appear/disappear smoothly */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-bg-dark to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-bg-dark to-transparent" />

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