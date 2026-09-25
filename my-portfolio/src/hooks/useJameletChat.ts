import { useCallback, useState } from 'react';
import { GREETING, type JameletAction, jameletRespond } from '../lib/jamelet-concierge';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  actions?: JameletAction[];
}

export interface JameletChatController {
  open: boolean;
  messages: ChatMessageData[];
  typing: boolean;
  openChat: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => void;
}

let seq = 0;
const nextId = () => `m-${++seq}`;

/**
 * Chat state + lifecycle. Phase 3 answers locally via `jameletRespond`;
 * Phase 4 swaps that internal call for the streaming Vercel endpoint.
 */
export function useJameletChat(): JameletChatController {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [typing, setTyping] = useState(false);

  const openChat = useCallback(() => {
    setOpen(true);
    setMessages((prev) =>
      prev.length === 0 ? [{ id: nextId(), role: 'assistant', text: GREETING }] : prev
    );
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
    setTyping(true);

    // Phase 3: local concierge (no network, no secrets). Phase 4 replaces this
    // block with fetch('/api/chat', …) + streaming.
    window.setTimeout(() => {
      const reply = jameletRespond(text);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: reply.text, actions: reply.actions },
      ]);
      setTyping(false);
    }, 600 + Math.random() * 500);
  }, []);

  return { open, messages, typing, openChat, close, toggle, send };
}