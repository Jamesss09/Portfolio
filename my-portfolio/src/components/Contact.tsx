import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Loader2, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { links, profile } from '../../shared/portfolio';

/** Contact endpoints — single-sourced from `shared/portfolio` (also feeds Jamelet). */
const EMAIL = links.email;
const GITHUB_URL = links.github;
const GITHUB_HANDLE = links.githubHandle;
const LINKEDIN_URL = links.linkedin;
const LINKEDIN_HANDLE = links.linkedinHandle;

/**
 * Web3Forms access key — verified. Form submissions go
 * straight to jamescarlenquig26@gmail.com.
 */
const WEB3FORMS_ACCESS_KEY = '0bface83-8003-4449-852b-682755464861';

const PURPOSES = [
  'Internship opportunity',
  'Collaboration',
  'Project help',
  'Just saying hi',
] as const;

const MESSAGE_MAX = 1000;

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]>(PURPOSES[1]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');
  const [apiError, setApiError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — fall back to opening the mail app
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setApiError('');

    const trimmedName = name.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (trimmedMessage.length < 10) {
      setFormError('Please write a message of at least 10 characters.');
      return;
    }

    // Fallback: no access key configured yet → open the visitor's email app
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio contact [${purpose}] — ${trimmedName}`);
      const body = encodeURIComponent(
        `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nPurpose: ${purpose}\n\n${trimmedMessage}`
      );
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
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          // Deliverability: explicit sender identity + reply-to keeps
          // Gmail from filing Web3Forms mail as spam.
          // Note: `email` is already used as reply-to by default;
          // `replyto` here is just explicit. `botcheck` must be
          // boolean false (empty string fails validation).
          from_name: `Portfolio Contact — ${trimmedName}`,
          replyto: trimmedEmail,
          subject: `Portfolio contact [${purpose}] — ${trimmedName}`,
          botcheck: false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setSenderEmail('');
        setMessage('');
      } else {
        const reason =
          data?.message || data?.body?.message || `Request failed (HTTP ${res.status}).`;
        console.error('Web3Forms error:', reason, data);
        setApiError(String(reason));
        setStatus('error');
      }
    } catch (err) {
      console.error('Web3Forms network error:', err);
      setApiError('Network error — check your connection or adblocker and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-bg-primary/75 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-text-primary mb-4 text-center">
            LET'S BUILD SOMETHING
            <span className="text-primary-light block">TOGETHER</span>
          </h2>
          <p className="text-xl text-text-secondary mb-12 text-center">
            {profile.tagline}
          </p>

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10 items-start">
            {/* Left: info + socials */}
            <div className="lg:col-span-2 text-left">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                {profile.statusBadge}
              </span>

              <h3 className="font-display text-3xl font-medium tracking-tight text-text-primary mb-3">Let's connect</h3>
              <p className="text-text-secondary mb-8">
                The fastest way to reach me is the form — it lands straight in my inbox.
                Prefer email or socials? Use the links below.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 bg-bg-card border border-border rounded-xl px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary-light shrink-0">
                    <Mail size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-text-secondary">Email</p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm text-text-primary hover:text-primary-light transition-colors truncate block"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-primary-light hover:border-primary-light transition-colors shrink-0"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </li>
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-bg-card border border-border rounded-xl px-4 py-3 hover:border-primary-light transition-colors group"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary-light shrink-0">
                      <LinkedinIcon width={18} height={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-text-secondary">
                        LinkedIn
                      </span>
                      <span className="block text-sm text-text-primary group-hover:text-primary-light transition-colors truncate">
                        {LINKEDIN_HANDLE}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-bg-card border border-border rounded-xl px-4 py-3 hover:border-primary-light transition-colors group"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary-light shrink-0">
                      <GithubIcon width={18} height={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-text-secondary">
                        GitHub
                      </span>
                      <span className="block text-sm text-text-primary group-hover:text-primary-light transition-colors truncate">
                        {GITHUB_HANDLE}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              {copied && (
                <p className="text-sm text-green-400" role="status">
                  Email copied!
                </p>
              )}
            </div>

            {/* Right: form card */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl text-left"
            >
              {/* Honeypot — invisible to humans, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    minLength={2}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
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
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-light transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="purpose" className="block text-sm font-medium text-text-primary mb-1.5">
                  What's this about?
                </label>
                <select
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as (typeof PURPOSES)[number])}
                  className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-light transition-colors"
                >
                  {PURPOSES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary">
                    Message
                  </label>
                  <span className="text-xs text-text-secondary">
                    {message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={MESSAGE_MAX}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your idea, project, or just say hi..."
                  className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-light transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status messages */}
              <div aria-live="polite">
                {formError && (
                  <p className="text-sm text-red-400 mt-3 text-center">{formError}</p>
                )}
                {status === 'success' && (
                  <p className="text-sm text-green-400 mt-3 text-center">
                    Sent! Thanks for reaching out — I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && !formError && (
                  <p className="text-sm text-red-400 mt-3 text-center">
                    {apiError
                      ? `Send failed: ${apiError}`
                      : `Something went wrong. Please try again, or email me directly at ${EMAIL}.`}
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
