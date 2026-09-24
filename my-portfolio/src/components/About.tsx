import { motion } from 'framer-motion';
import { User, Code2, Rocket, GraduationCap } from 'lucide-react';
import profilePic from '../assets/Profile.webp';

const stats = [
  { value: '13+', label: 'Technologies in my stack', icon: Code2 },
  { value: '1', label: 'Live project built', icon: Rocket },
  { value: '4 yrs', label: 'Into IT & counting', icon: GraduationCap },
];

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <User className="text-primary-light" />
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-card border border-border rounded-xl p-8 shadow-lg"
          >
            <p className="text-text-secondary leading-relaxed">
              Hi, I'm James Carl — a 4th-year IT student who likes turning ideas
              into clean, responsive web apps. What started as curiosity about how
              websites work grew into a focus on React, TypeScript, and UI/UX
              thinking. Right now I'm deepening my backend skills (PHP/Laravel)
              and exploring AI so I can build complete products — not just pretty
              frontends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-card border border-border rounded-xl p-8 shadow-lg space-y-4"
          >
            <div>
              <p className="text-text-primary font-medium">Name</p>
              <p className="text-text-secondary">James Carl Enquig</p>
            </div>
            <div>
              <p className="text-text-primary font-medium">Age</p>
              <p className="text-text-secondary">22</p>
            </div>
            <div>
              <p className="text-text-primary font-medium">Education</p>
              <p className="text-text-secondary">4th Year IT Student</p>
            </div>
            <div>
              <p className="text-text-primary font-medium">Focus</p>
              <p className="text-text-secondary">Web Development & UI/UX Design</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-bg-card border border-border rounded-xl p-8 shadow-lg flex items-center justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-3 bg-primary/30 rounded-full blur-2xl" aria-hidden="true" />
              <img
                src={profilePic}
                alt="James Carl Enquig"
                className="relative w-52 h-52 object-cover rounded-full border-4 border-primary-light shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Floating "open to collaborate" badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-bg-card border border-primary/40 rounded-full px-3 py-1.5 shadow-lg whitespace-nowrap">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-text-primary">Open to collaborate</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-6 mt-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all"
              >
                <Icon size={28} className="text-primary-light mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;