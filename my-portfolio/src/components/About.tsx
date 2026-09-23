import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-bg-primary">
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
              I'm a 4th Year IT Student passionate about creating clean, responsive, and user-friendly web applications. I enjoy turning ideas into functional code while focusing on good design and user experience.
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
            <div className="w-48 h-48 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
              <User size={80} className="text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;