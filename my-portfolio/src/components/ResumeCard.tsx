import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

/**
 * Resume download card for the About section.
 *
 * The file itself lives in `public/` so Vite serves it verbatim at a stable
 * URL with no bundling or re-encoding — the bytes on disk are identical to the
 * uploaded PDF. The `download` attribute gives the visitor a clean filename
 * regardless of what the source file was called.
 */

const RESUME_URL = '/JamesResume.pdf';
const RESUME_FILENAME = 'James_Carl_Enquig_Resume.pdf';

const ResumeCard = () => {
  return (
    <motion.a
      href={RESUME_URL}
      download={RESUME_FILENAME}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-4 rounded-xl border border-border bg-bg-card/80 p-4 backdrop-blur-sm transition-colors hover:border-primary/50 focus-visible:border-primary-light focus-visible:outline-none"
      aria-label={`Download resume (${RESUME_FILENAME})`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
        <FileText size={20} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-text-primary">My Resume</span>
        <span className="block text-xs text-text-secondary">
          PDF · Curriculum Vitae · Available on request
        </span>
      </span>

      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-soft transition-colors group-hover:bg-primary/20">
        <Download size={13} aria-hidden="true" />
        Download Resume
      </span>
    </motion.a>
  );
};

export default ResumeCard;
