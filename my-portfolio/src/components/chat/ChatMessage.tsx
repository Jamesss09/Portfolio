import { ACTION_LINKS } from '../../lib/jamelet-concierge';
import type { ChatMessageData } from '../../hooks/useJameletChat';

interface ChatMessageProps {
  message: ChatMessageData;
  /** Called after an internal action link is clicked (lets the widget close on mobile). */
  onAction?: () => void;
}

/** One chat bubble — user or assistant, with optional whitelisted action links. */
const ChatMessage = ({ message, onAction }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-sm bg-primary text-white'
            : 'rounded-bl-sm border border-border bg-bg-dark/80 text-text-primary'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>

        {message.actions && message.actions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.actions.map((action) => {
              const link = ACTION_LINKS[action];
              return (
                <a
                  key={action}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={onAction}
                  className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-soft transition-colors hover:bg-primary/20"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;