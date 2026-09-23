import { motion } from 'framer-motion';
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

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-bg-dark">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-primary/20 transition-shadow group"
            >
              <h3 className="text-xl font-semibold text-primary-light mb-4 group-hover:text-primary-soft transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-text-primary rounded-full text-sm border border-primary/30 hover:border-primary hover:bg-primary/20 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;