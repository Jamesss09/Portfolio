import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Jamelet from '../mascot/Jamelet';
import ChatMessage from './ChatMessage';
import { suggestedQuestions } from '../../../shared/portfolio';
import type { JameletChatController } from '../../hooks/useJameletChat';

interface ChatWidgetProps {
  controller: JameletChatController;
}

const BUBBLE_KEY = 'jamelet-bubble-seen';

/**
 * Floating companion: circular launcher (80px), once-per-session invitation
 * bubble, and a glass chat panel. Mobile gets a bottom drawer; desktop gets a
 * floating 400px window.
 */
const ChatWidget = ({ controller }: ChatWidgetProps) => {
  const { open, messages, typing, toggle, send } = controller;
  const [draft, setDraft] = useState('');
  const [showBubble, setShowBubble] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(BUBBLE_KEY);
  });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dismissBubble = () => {
    setShowBubble(false);
    try {
      sessionStorage.setItem(BUBBLE_KEY, '1');
    } catch {
      /* private mode — bubble just won't persist */
    }
  };

  const onLauncher = () => {
    dismissBubble();
    toggle();
  };

  const showSuggestions = messages.length <= 1; // greeting present, nothing asked yet

  // Autoscroll on new messages / typing.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // Focus input when panel opens; Escape closes.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') controller.close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, controller]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.trim() || typing) return;
    send(draft);
    setDraft('');
  };

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
        <AnimatePresence>
          {showBubble && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative mb-2 hidden max-w-[210px] rounded-2xl rounded-br-sm border border-primary/40 bg-bg-card/90 px-4 py-2.5 text-sm text-text-primary shadow-xl backdrop-blur sm:block"
              role="status"
            >
              Ask me about James&rsquo;s projects!
              <button
                type="button"
                onClick={dismissBubble}
                aria-label="Dismiss message"
                className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full border border-border bg-bg-card text-text-secondary hover:text-text-primary"
              >
                <X size={11} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onLauncher}
          aria-label={open ? 'Close chat with Jamelet' : 'Open chat with Jamelet'}
          aria-expanded={open}
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-primary/50 bg-bg-card/90 shadow-xl shadow-primary/25 backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <Jamelet state={open || typing ? 'responding' : showBubble ? 'greeting' : 'idle'} className="h-14 w-14" />
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Jamelet"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[88dvh] flex-col overflow-hidden rounded-t-3xl border border-primary/30 bg-bg-card/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:h-[min(60vh,540px)] sm:w-[400px] sm:max-w-[calc(100vw-3rem)] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-bg-dark/80 px-4 py-3">
              <Jamelet state={typing ? 'thinking' : 'responding'} className="h-10 w-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text-primary">Jamelet</p>
                <p className="text-xs text-text-secondary">AI concierge · answers from the portfolio</p>
              </div>
              <button
                type="button"
                onClick={controller.close}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-lg border border-border text-text-secondary transition-colors hover:text-text-primary hover:border-primary"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} onAction={controller.close} />
              ))}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => send(question)}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary-soft transition-colors hover:bg-primary/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {typing && (
                <div className="flex w-full justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-bg-dark/80 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-primary-soft"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                    <span className="sr-only">Jamelet is typing</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border bg-bg-dark/60 px-3 py-3">
              <label htmlFor="jamelet-input" className="sr-only">
                Message Jamelet
              </label>
              <input
                id="jamelet-input"
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about James's skills, projects… (try /help)"
                autoComplete="off"
                className="h-10 min-w-0 flex-1 rounded-full border border-border bg-bg-primary/70 px-4 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary-light focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-light disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;