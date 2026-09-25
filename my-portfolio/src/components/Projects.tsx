import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">Projects</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card border border-border rounded-2xl p-12 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl font-bold text-text-primary mb-4">CURRENTLY BUILDING</h3>
            <p className="text-2xl text-primary-soft mb-6">PROJECTS COMING SOON</p>
            <p className="text-text-secondary text-lg mb-8">
              Ideas → Code → Projects → Growth
            </p>
            <button className="bg-primary/20 border border-primary text-primary-light px-8 py-3 rounded-lg font-medium cursor-not-allowed opacity-70">
              Coming Soon
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;