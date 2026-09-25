import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

/** ✏️ Your Gmail address — messages from the contact form go here. */
const EMAIL = 'jamescarlenquig26@gmail.com';

const Contact = () => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6 bg-bg-primary/75 relative overflow-hidden">
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

          {/* Contact form — opens Gmail with your message */}
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-bg-card border border-border rounded-2xl p-8 shadow-xl text-left mb-10"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-light transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-light transition-colors"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your idea, project, or just say hi..."
                className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-light transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 w-full"
            >
              Send via Gmail
            </button>
            <p className="text-xs text-text-secondary mt-3 text-center">
              This opens your email app addressed to me — hit send there to finish.
            </p>
          </form>

          {/* Direct links */}
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
              href={`mailto:${EMAIL}`}
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