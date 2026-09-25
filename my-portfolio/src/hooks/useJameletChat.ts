import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GREETING,
  type JameletAction,
  type Topic,
  jameletRespond,
  topicReply,
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
  /** True while the suggested-question chips should stay visible (e.g /suggest). */
  suggestionsVisible: boolean;
  openChat: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => void;
}

let seq = 0;
const nextId = () => `m-${++seq}`;

const HISTORY_LIMIT = 6;
const REQUEST_TIMEOUT_MS = 12_000;

/** Client-side slash commands — handled locally, never sent to the server. */
const COMMANDS: ReadonlyArray<{ name: string; description: string }> = [
  { name: '/projects', description: 'Shows James\u2019s projects with buttons.' },
  { name: '/skills', description: 'Summarizes the skills stack.' },
  { name: '/contact', description: 'Shows how to reach James.' },
  { name: '/suggest', description: 'Re-shows the suggested questions.' },
  { name: '/clear', description: 'Clears the conversation and starts fresh.' },
  { name: '/help', description: 'Shows this list of commands.' },
] as const;

/** Command token → topic reply for commands that reuse the grounded answers. */
const COMMAND_TOPIC: Record<string, Topic> = {
  '/projects': 'capstone',
  '/skills': 'skills',
  '/contact': 'contact',
};

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
  const [forceSuggestions, setForceSuggestions] = useState(false);

  const messagesRef = useRef<ChatMessageData[]>([]);
  const typingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const genRef = useRef(0);
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

  const runCommand = useCallback(
    (command: string) => {
      // Commands are handled locally — they never reach /api/chat.
      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: command }]);
      const token = command.toLowerCase().split(/\s+/)[0] ?? '';

      if (token === '/clear') {
        genRef.current += 1; // invalidate any in-flight request
        abortRef.current?.abort();
        abortRef.current = null;
        setTyping(false);
        setForceSuggestions(false);
        setMessages([{ id: nextId(), role: 'assistant', text: GREETING }]);
      } else if (token === '/suggest') {
        setForceSuggestions(true);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            text: 'Here are some things you can ask me — or type /help for commands.',
          },
        ]);
      } else if (token === '/help') {
        const list = COMMANDS.map((c) => `${c.name} — ${c.description}`).join('\n');
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', text: `Here's what I can do:\n${list}` },
        ]);
      } else {
        const topic = COMMAND_TOPIC[token];
        if (topic) {
          const reply = topicReply(topic);
          setMessages((prev) => [
            ...prev,
            { id: nextId(), role: 'assistant', text: reply.text, actions: reply.actions },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: 'assistant',
              text: `I don't know that command — try /help to see what I can do.`,
            },
          ]);
        }
      }
    },
    []
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      if (text.startsWith('/')) {
        runCommand(text);
        return;
      }
      if (typingRef.current) return;

      setForceSuggestions(false); // a real question dismisses the chips
      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
      setTyping(true);
      const myGen = genRef.current;

      const history = messagesRef.current
        .slice(-HISTORY_LIMIT)
        .map((m) => ({ role: m.role, text: m.text.slice(0, 500) }));

      const controller = new AbortController();
      abortRef.current = controller;
      const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      let settled = false;

      const settle = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        abortRef.current = null;
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
          // Endpoint missing (dev server), timed out, superseded by /clear, or
          // provider error → always give a grounded local answer with links.
          if (genRef.current !== myGen) return; // chat was cleared — drop reply
          console.debug('[jamelet] api unavailable — local reply');
          const local = jameletRespond(text);
          appendAssistant(local.text, local.actions);
          settle();
          return;
        }

        if (genRef.current !== myGen) return; // chat was cleared while waiting

        const contentType = res.headers.get('content-type') ?? '';
        try {
          if (contentType.includes('json')) {
            const data = (await res.json()) as { text?: string; actions?: JameletAction[] };
            if (genRef.current === myGen) appendAssistant(data.text ?? '', data.actions);
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
            if (!accumulated.trim() || failed) {
              // Empty/errored stream → remove placeholder and fall back locally.
              setMessages((prev) => prev.filter((m) => m.id !== tempId));
              if (genRef.current === myGen) {
                const local = jameletRespond(text);
                appendAssistant(local.text, local.actions);
              }
            } else if (genRef.current === myGen) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === tempId ? { ...m, text: accumulated, actions: streamActions } : m
                )
              );
            }
          }
        } catch {
          if (genRef.current !== myGen) return;
          console.debug('[jamelet] stream parse failed — local reply');
          const local = jameletRespond(text);
          appendAssistant(local.text, local.actions);
        } finally {
          if (genRef.current === myGen) settle();
        }
      })();
    },
    [appendAssistant, runCommand]
  );

  return {
    open,
    messages,
    typing,
    suggestionsVisible: forceSuggestions,
    openChat,
    close,
    toggle,
    send,
  };
}