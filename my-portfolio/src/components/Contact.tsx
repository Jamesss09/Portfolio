import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-text-primary mb-6">
            LET'S BUILD SOMETHING
            <span className="text-primary-light block">TOGETHER</span>
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            I'm always open to learning, collaborating and connecting.
          </p>
          <a
            href="mailto:james@example.com"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 mb-10"
          >
            <Mail size={20} />
            Get In Touch
          </a>
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://github.com/Jamesss09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary-light transition-colors"
            >
              <GithubIcon width={24} height={24} />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary-light transition-colors"
            >
              <LinkedinIcon width={24} height={24} />
              LinkedIn
            </a>
            <a
              href="mailto:james@example.com"
              className="flex items-center gap-2 text-text-secondary hover:text-primary-light transition-colors"
            >
              <Mail size={24} />
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;