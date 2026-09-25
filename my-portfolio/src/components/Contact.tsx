import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

/** ✏️ Your Gmail address — messages land here. */
const EMAIL = 'jamescarlenquig26@gmail.com';

/**
 * 🔑 Web3Forms access key (free) — 2-minute setup:
 *   1. Go to https://web3forms.com
 *   2. Enter this email: jamescarlenquig26@gmail.com
 *   3. Copy the access key it gives you and paste it below
 * Once set, the form sends straight to your Gmail inbox.
 * Leave it as `''` and the form falls back to opening the visitor's email app (mailto).
 */
const WEB3FORMS_ACCESS_KEY = '';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fallback: no access key configured yet → open the visitor's email app addressed to you
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\n${message}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email: senderEmail,
          message,
          subject: `[Portfolio] Message from ${name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setSenderEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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

          {/* Contact form — sends your name, email and message straight to Gmail */}
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
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {/* Status message */}
            {status === 'success' && (
              <p className="text-sm text-green-400 mt-3 text-center">
                Sent! Thanks for reaching out — I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400 mt-3 text-center">
                Something went wrong. Please try again, or use the email link below.
              </p>
            )}
            {status === 'idle' && (
              <p className="text-xs text-text-secondary mt-3 text-center">
                Your name, email and message go straight to my inbox — I'll reply as soon as I can.
              </p>
            )}
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