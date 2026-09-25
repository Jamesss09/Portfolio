/**
 * Thin provider abstraction (Phase 4).
 *
 * Talk to any OpenAI-compatible chat-completions endpoint (OpenAI, Groq,
 * Google Gemini via its OpenAI-compat URL, OpenRouter, Together, Ollama…) with
 * the same code. Configure via env vars — never a VITE_ variable:
 *
 *   AI_PROVIDER   = openai | groq | gemini | openrouter | custom  (default openai)
 *   AI_API_KEY    = the provider's secret key (required to enable streaming)
 *   AI_MODEL      = model id (optional; provider default used when absent)
 *   AI_BASE_URL   = full chat/completions URL override (for 'custom')
 */

export type ProviderId = 'openai' | 'groq' | 'gemini' | 'openrouter' | 'custom';

export interface ProviderConfig {
  id: ProviderId;
  apiKey: string;
  /** Full URL to the Chat Completions endpoint. */
  baseUrl: string;
  model: string;
}

const DEFAULTS: Record<ProviderId, { baseUrl: string; model: string }> = {
  openai: { baseUrl: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
  },
  gemini: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    model: 'gemini-2.5-flash',
  },
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.3-70b-instruct',
  },
  custom: { baseUrl: '', model: '' },
};

/** Returns null when no key is set — the function then serves a grounded local reply. */
export function getProvider(
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): ProviderConfig | null {
  const apiKey = env.AI_API_KEY?.trim();
  if (!apiKey) return null;

  const raw = (env.AI_PROVIDER ?? 'openai').toLowerCase().trim();
  const id = (Object.keys(DEFAULTS).includes(raw) ? raw : 'custom') as ProviderId;
  const baseUrl = env.AI_BASE_URL?.trim() || DEFAULTS[id].baseUrl;
  const model = env.AI_MODEL?.trim() || DEFAULTS[id].model;
  if (!baseUrl || !model) return null;

  return { id, apiKey, baseUrl, model };
}

interface ChatMessageLike {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}

/** Opens the provider's SSE stream for a chat completion. */
export function openCompletion(
  cfg: ProviderConfig,
  messages: ChatMessageLike[],
  options: CompletionOptions = {}
): Promise<Response> {
  const maxTokens = options.maxTokens ?? 400;
  const temperature = options.temperature ?? 0.6;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cfg.apiKey}`,
  };
  if (cfg.id === 'openrouter') {
    headers['HTTP-Referer'] = 'https://jamescarl-portfolio.vercel.app';
    headers['X-Title'] = 'Jamelet';
  }

  return fetch(cfg.baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: cfg.model,
      messages,
      stream: true,
      temperature,
      max_tokens: maxTokens,
    }),
    signal: options.signal,
  });
}