import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { GithubIcon } from './SocialIcons';

const GITHUB_USERNAME = 'Jamesss09';

const GitHubContributions = () => {
  return (
    <section id="github" className="py-20 px-6 bg-bg-primary/75">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <GithubIcon width={30} height={30} className="text-primary-light" />
            Live GitHub Contributions
          </h2>
          <a
            href="https://github.com/Jamesss09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-soft hover:text-primary-light transition-colors"
          >
            github.com/Jamesss09
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-bg-card border border-border rounded-xl p-6 sm:p-8 shadow-lg overflow-x-auto"
        >
          <div className="text-text-primary">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme="dark"
              theme={{ dark: ['#2a1740', '#6d28d9', '#8b5cf6', '#a78bfa', '#e9d5ff'] }}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              errorMessage="Couldn't load contributions right now — try again later."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;