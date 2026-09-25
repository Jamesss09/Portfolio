import { getProvider, openCompletion } from './provider';
import { buildSystemPrompt } from './system-prompt';
import { jameletRespond } from '../shared/jamelet-concierge';

/**
 * POST /api/chat
 * Body: { "message": string, "history": [{ "role": "user"|"assistant", "text": string }] }
 *
 * - Validates + rate-limits input.
 * - No AI provider configured → grounded local reply (same data the site uses).
 * - Provider configured → streams the model's answer as NDJSON lines.
 *   Each line: {"text":"…"} | {"done":true} | {"error":"…"}.
 * - Actions are never taken from model output — they're derived server-side
 *   from the visitor's intent via the shared topic matcher (safety).
 */

interface HistoryItem {
  role: 'user' | 'assistant';
  text: string;
}

const WINDOW_MS = 60_000;
const LIMIT = 12;
const HISTORY_LIMIT = 6;
const MESSAGE_MAX = 500;

/** Basic in-memory sliding-window limiter (best-effort on serverless). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  return (fwd.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown').trim();
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function handleChatRequest(req: Request): Promise<Response> {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return json(429, { error: 'Too many messages — give Jamelet a second.' });
  }

  let payload: { message?: unknown; history?: HistoryItem[] };
  try {
    payload = (await req.json()) as { message?: unknown; history?: HistoryItem[] };
  } catch {
    return json(400, { error: 'Invalid JSON body.' });
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message || message.length > MESSAGE_MAX) {
    return json(400, { error: 'Message must be 1–500 characters.' });
  }

  const history = (Array.isArray(payload.history) ? payload.history.slice(-HISTORY_LIMIT) : [])
    .map((h) => ({
      role: h.role === 'user' ? ('user' as const) : ('assistant' as const),
      text: typeof h.text === 'string' ? h.text.slice(0, MESSAGE_MAX) : '',
    }))
    .filter((h) => h.text.length > 0);

  const provider = getProvider();

  // No provider configured yet → grounded reply from the shared portfolio data.
  if (!provider) {
    const reply = jameletRespond(message);
    console.warn('[api/chat] no AI provider configured — served local reply');
    return json(200, { source: 'local', text: reply.text, actions: reply.actions });
  }

  // Provider configured → stream a real model answer.
  const systemPrompt = buildSystemPrompt();
  const messages = [
    { role: 'system' as const, content: systemPrompt },
    ...history.map((h) => ({ role: h.role, content: h.text })),
    { role: 'user' as const, content: message },
  ];

  let upstream: Response;
  try {
    upstream = await openCompletion(provider, messages, {
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    console.error('[api/chat] provider request failed');
    return json(502, { error: 'The AI provider is unavailable right now.' });
  }

  if (!upstream.ok || !upstream.body) {
    console.error(`[api/chat] provider HTTP ${upstream.status}`);
    return json(502, { error: 'The AI provider is unavailable right now.' });
  }

  // Transform provider SSE → NDJSON lines the client can consume incrementally.
  const reader = upstream.body.getReader();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const decoder = new TextDecoder();
      let buffer = '';
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const chunk = JSON.parse(data) as {
                choices?: { delta?: { content?: string } }[];
              };
              const delta = chunk.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(`${JSON.stringify({ text: delta })}\n`));
              }
            } catch {
              /* skip malformed chunk */
            }
          }
        }
        controller.enqueue(encoder.encode(`${JSON.stringify({ done: true })}\n`));
      } catch {
        controller.enqueue(encoder.encode(`${JSON.stringify({ error: 'stream interrupted' })}\n`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' });
  return handleChatRequest(req);
}