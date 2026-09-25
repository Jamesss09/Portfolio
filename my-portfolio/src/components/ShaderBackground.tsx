import { useShaderBackground } from './ui/animated-shader-hero';

/**
 * Fixed, full-viewport background behind all page content.
 * Desktop (`md`+): animated WebGL violet nebula that reacts to pointer
 * movement. Mobile: the WebGL renderer is skipped entirely (GPU-heavy) and a
 * static gradient with the same dark-purple mood is shown instead, so small
 * devices scroll smoothly.
 */
const ShaderBackground = () => {
  const canvasRef = useShaderBackground();

  return (
    <>
      {/* Static gradient fallback — always rendered; the canvas covers it on desktop */}
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
      {/* Animated nebula — hidden on small screens to avoid mobile lag */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 w-full h-full object-contain touch-none hidden md:block"
        style={{ background: '#100718' }}
      />
    </>
  );
};

export default ShaderBackground;