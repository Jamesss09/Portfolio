import { useCallback, useEffect, useState } from 'react';

/** `vibrant` = Royal Purple (primary, default); `minimalist` = light secondary. */
export type Theme = 'vibrant' | 'minimalist';

const STORAGE_KEY = 'portfolio-theme';
const THEME_EVENT = 'portfolio-theme-change';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'vibrant';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'minimalist' || stored === 'vibrant') return stored;
  } catch {
    /* private mode — fall through to default */
  }
  return 'vibrant';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'minimalist') {
    root.classList.add('theme-minimalist');
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  } else {
    root.classList.remove('theme-minimalist');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

/**
 * Shared theme state. Multiple hook instances stay in sync through a
 * window event, so Sidebar, ShaderBackground, GitHub calendar and the
 * floating toggle can each call `useTheme()` without prop drilling.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply on mount + whenever this instance changes.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Stay in sync when another instance changes the theme.
  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next === 'vibrant' || next === 'minimalist') setThemeState(next);
    };
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: next }));
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'vibrant' ? 'minimalist' : 'vibrant';
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: next }));
      return next;
    });
  }, []);

  return { theme, setTheme, toggle, isMinimalist: theme === 'minimalist' };
}
