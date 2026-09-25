import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  GraduationCap,
  Rocket,
  Briefcase,
  ArrowRight,
  Code2,
  FolderOpen,
} from 'lucide-react';
import profilePic from '../assets/Profile.webp';

// Quick facts shown in the About grid — edit freely
const quickFacts = [
  { label: 'Location', value: 'Philippines', icon: MapPin },
  { label: 'Education', value: '4th Year IT Student', icon: GraduationCap },
  { label: 'Currently', value: 'Building this portfolio', icon: Rocket },
  { label: 'Open to', value: 'Internships & collabs', icon: Briefcase },
];

const stats = [
  { value: '13+', label: 'Technologies in my stack', icon: Code2 },
  { value: '1', label: 'Live project built', icon: FolderOpen },
  { value: '4 yrs', label: 'Into IT & counting', icon: GraduationCap },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4 inline-flex items-center justify-center gap-3">
            <User className="text-primary-light" />
            About Me
          </h2>
          {/* Animated gradient underline */}
          <motion.div
            animate={{ backgroundPositionX: ['0%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary-soft via-primary-light to-primary-soft bg-[length:200%_100%]"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Photo column */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative group"
            >
              {/* Pulsing glow behind the photo */}
              <motion.div
                aria-hidden
                animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 bg-primary/40 rounded-full blur-3xl"
              />
              <img
                src={profilePic}
                alt="James Carl Enquig"
                className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-primary-light shadow-xl shadow-primary/30 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Floating "open to collaborate" badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-bg-card/95 border border-primary/40 rounded-full px-3 py-1.5 shadow-lg whitespace-nowrap backdrop-blur-sm">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-text-primary">Open to collaborate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="space-y-6">
            <motion.p variants={item} className="text-text-secondary leading-relaxed">
              Hi, I'm James Carl — a 4th-year IT student who likes turning ideas into clean,
              responsive web apps. What started as curiosity about how websites work grew into a
              focus on React, TypeScript, and UI/UX thinking. Right now I'm deepening my backend
              skills (PHP/Laravel) and exploring AI so I can build complete products — not just
              pretty frontends.
            </motion.p>

            {/* Quick facts with icons */}
            <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={fact.label}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-bg-card/80 p-4 backdrop-blur-sm transition-colors hover:border-primary/50"
                  >
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-light">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-text-secondary">
                        {fact.label}
                      </span>
                      <span className="block text-sm font-medium text-text-primary">
                        {fact.value}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-light"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-primary-light transition-all hover:-translate-y-0.5 hover:bg-primary/10"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                <Icon size={28} className="text-primary-light mx-auto mb-3" />
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;