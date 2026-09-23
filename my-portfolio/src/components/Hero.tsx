import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-bg-primary to-bg-dark">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary-light text-lg mb-4">WELCOME TO MY PORTFOLIO</p>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">
            Hi, I'm
            <span className="text-primary-light block">JAMES CARL ENQUIG</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            4th Year IT Student · Aspiring Web Developer
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="group flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/20"
            >
              Explore My Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border border-primary text-primary-light hover:bg-primary/10 px-6 py-3 rounded-lg font-medium transition-all"
            >
              <Mail size={20} />
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-bg-card border border-border rounded-xl p-6 shadow-xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-sm text-text-primary font-mono">
              <code>{`{
  name: "James Carl Enquig",
  role: "Aspiring Web Developer",
  education: "4th Year IT Student",
  focus: ["Web Development", "UI/UX Design"],
  learning: ["React", "TypeScript", "Tailwind"]
}`}</code>
            </pre>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;