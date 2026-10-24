import { motion } from 'framer-motion';
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
  siPytorch,
} from 'simple-icons';
import TechLogo, { type IconSource } from './TechLogo';
import SectionHeading from './ui/SectionHeading';
import { skillCategories as sharedSkillCategories } from '../../shared/portfolio';

type Skill = {
  name: string;
  icon: IconSource;
};

/**
 * Presentation data per skill (icon only, no self-ratings).
 * Names and categories come from `shared/portfolio` so the site and
 * Jamelet stay in sync — a skill added there without meta here falls
 * back to the generic entry below.
 */
const skillMeta: Record<string, IconSource> = {
  'React.js': { kind: 'simple', icon: siReact },
  JavaScript: { kind: 'simple', icon: siJavascript },
  TypeScript: { kind: 'simple', icon: siTypescript },
  'React Native': { kind: 'simple', icon: siReact },
  Expo: { kind: 'simple', icon: siExpo },
  PHP: { kind: 'simple', icon: siPhp },
  Laravel: { kind: 'simple', icon: siLaravel },
  'Express.js': { kind: 'simple', icon: siExpress },
  MySQL: { kind: 'simple', icon: siMysql },
  PostgreSQL: { kind: 'simple', icon: siPostgresql },
  Apache: { kind: 'simple', icon: siApache },
  Docker: { kind: 'simple', icon: siDocker },
  Git: { kind: 'simple', icon: siGit },
  GitHub: { kind: 'simple', icon: siGithub },
  Figma: { kind: 'simple', icon: siFigma },
  'AI / ML': { kind: 'lucide', icon: BrainCircuit },
  PyTorch: { kind: 'simple', icon: siPytorch },
};

const skillCategories: { title: string; skills: Skill[] }[] = sharedSkillCategories.map(
  (category) => ({
    title: category.title,
    skills: category.skills.map((name) => ({
      name,
      icon: skillMeta[name] ?? { kind: 'lucide', icon: BrainCircuit },
    })),
  })
);

function CategoryCard({ category }: { category: (typeof skillCategories)[number] }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow group">
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
  return (
    <section id="skills" className="py-20 bg-bg-dark/75">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Tech Stack" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
