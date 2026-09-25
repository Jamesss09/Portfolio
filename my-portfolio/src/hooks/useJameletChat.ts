import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GREETING,
  type JameletAction,
  jameletRespond,
} from '../lib/jamelet-concierge';

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

const HISTORY_LIMIT = 6;
const REQUEST_TIMEOUT_MS = 12_000;

/**
 * Chat state + lifecycle (Phase 4).
 * Sends to the Vercel function POST /api/chat. Whenever that endpoint is
 * missing, slow, or the provider is down, it falls back to the local grounded
 * responder so the visitor always gets a useful answer.
 */
export function useJameletChat(): JameletChatController {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [typing, setTyping] = useState(false);

  const messagesRef = useRef<ChatMessageData[]>([]);
  const typingRef = useRef(false);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    typingRef.current = typing;
  }, [typing]);

  const openChat = useCallback(() => {
    setOpen(true);
    setMessages((prev) =>
      prev.length === 0 ? [{ id: nextId(), role: 'assistant', text: GREETING }] : prev
    );
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  const appendAssistant = useCallback((text: string, actions?: JameletAction[]) => {
    setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text, actions }]);
  }, []);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || typingRef.current) return;

      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
      setTyping(true);

      const history = messagesRef.current
        .slice(-HISTORY_LIMIT)
        .map((m) => ({ role: m.role, text: m.text.slice(0, 500) }));

      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      let settled = false;

      const settle = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        setTyping(false);
      };

      (async () => {
        let res: Response;
        try {
          res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history }),
            signal: controller.signal,
          });
          if (!res.ok) throw new Error(`api ${res.status}`);
        } catch {
          // Endpoint missing (dev server), timed out, or provider error →
          // always give a grounded local answer with useful links.
          console.debug('[jamelet] api unavailable — local reply');
          const local = jameletRespond(text);
          appendAssistant(local.text, local.actions);
          settle();
          return;
        }

        const contentType = res.headers.get('content-type') ?? '';
        try {
          if (contentType.includes('json')) {
            const data = (await res.json()) as { text?: string; actions?: JameletAction[] };
            appendAssistant(data.text ?? '', data.actions);
          } else {
            // NDJSON stream: {"text":"…"} | {"done":true} | {"error":"…"}
            const reader = res.body?.getReader();
            if (!reader) throw new Error('no stream');
            const decoder = new TextDecoder();
            const tempId = nextId();
            setMessages((prev) => [...prev, { id: tempId, role: 'assistant', text: '' }]);
            let buffer = '';
            let accumulated = '';
            let failed = false;
            let streamActions: JameletAction[] | undefined;
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              let nl: number;
              while ((nl = buffer.indexOf('\n')) >= 0) {
                const line = buffer.slice(0, nl);
                buffer = buffer.slice(nl + 1);
                if (!line.trim()) continue;
                try {
                  const chunk = JSON.parse(line) as {
                    text?: string;
                    error?: string;
                    done?: boolean;
                    actions?: JameletAction[];
                  };
                  if (chunk.error) failed = true;
                  if (chunk.text) {
                    accumulated += chunk.text;
                    setMessages((prev) =>
                      prev.map((m) => (m.id === tempId ? { ...m, text: accumulated } : m))
                    );
                  }
                  if (Array.isArray(chunk.actions)) streamActions = chunk.actions;
                } catch {
                  /* ignore */
                }
              }
            }
            if (accumulated.trim() && !failed) {
              setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? { ...m, text: accumulated, actions: streamActions } : m))
              );
            } else {
              // Empty/errored stream → remove placeholder and fall back locally.
              setMessages((prev) => prev.filter((m) => m.id !== tempId));
              const local = jameletRespond(text);
              appendAssistant(local.text, local.actions);
            }
          }
        } catch {
          console.debug('[jamelet] stream parse failed — local reply');
          const local = jameletRespond(text);
          appendAssistant(local.text, local.actions);
        } finally {
          settle();
        }
      })();
    },
    [appendAssistant]
  );

  return { open, messages, typing, openChat, close, toggle, send };
}