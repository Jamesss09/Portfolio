import Jamelet from './Jamelet';

interface JameletHeroProps {
  /** Opens the shared chat (same instance as the floating launcher). */
  onOpen: () => void;
}

/**
 * Hero placement: lower-right on desktop, below the intro on mobile.
 * Clicking the mascot opens the same chat as the floating launcher.
 */
const JameletHero = ({ onOpen }: JameletHeroProps) => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-6 md:inset-x-auto md:bottom-10 md:right-10 md:justify-end md:px-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Say hi to Jamelet and ask about James's portfolio"
        className="pointer-events-auto group flex items-end gap-3"
      >
        <span className="mb-2 hidden max-w-[220px] animate-fade-in rounded-2xl rounded-br-sm border border-primary/40 bg-bg-card/90 px-4 py-2.5 text-left text-sm text-text-primary shadow-lg backdrop-blur sm:block">
          Ask me about James&rsquo;s projects!
        </span>
        <span className="block transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <Jamelet state="idle" className="h-24 w-24 md:h-28 md:w-28" />
        </span>
      </button>
    </div>
  );
};

export default JameletHero;