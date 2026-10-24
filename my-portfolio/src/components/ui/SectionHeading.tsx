import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  /** Optional icon shown before the title (e.g. the GitHub mark). */
  icon?: ReactNode;
  /** Optional supporting content rendered under the underline. */
  children?: ReactNode;
}

/**
 * Single heading treatment for every section: same display font, size,
 * tracking, spacing and animated gradient underline. Previously About had the
 * underline while the other sections did not, and sizes ranged from
 * `text-4xl` to `text-6xl`.
 */
const SectionHeading = ({ title, icon, children }: SectionHeadingProps) => {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="flex flex-wrap items-center justify-center gap-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-text-primary">
        {icon}
        {title}
      </h2>

      <motion.div
        aria-hidden="true"
        animate={reduced ? undefined : { backgroundPositionX: ['0%', '200%'] }}
        transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'linear' }}
        className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary-soft via-primary-light to-primary-soft bg-[length:200%_100%]"
      />

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

export default SectionHeading;
