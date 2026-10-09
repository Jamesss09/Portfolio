import { useTheme } from '../hooks/useTheme';

/**
 * Fixed, full-viewport background behind all page content.
 * Static only — the animated WebGL violet nebula was removed per request,
 * so this now renders a calm royal-purple gradient on desktop/mobile.
 * Minimalist theme (secondary): plain light background, clean paper look.
 * Royal Purple is the primary theme and the default.
 */
const ShaderBackground = () => {
  const { isMinimalist } = useTheme();

  if (isMinimalist) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-bg-primary"
        style={{ background: '#fafaf9' }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(60% 55% at 70% 20%, rgba(109,40,217,0.35), transparent 70%),' +
          'radial-gradient(50% 45% at 20% 80%, rgba(139,92,246,0.22), transparent 70%),' +
          'radial-gradient(45% 40% at 85% 75%, rgba(167,139,250,0.12), transparent 70%),' +
          '#100718',
      }}
    />
  );
};

export default ShaderBackground;