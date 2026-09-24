import { useShaderBackground } from './ui/animated-shader-hero';

/**
 * Fixed, full-viewport WebGL shader background.
 * Renders the animated violet nebula behind all page content so it
 * stays visible while the user scrolls. The shader reacts to pointer
 * movement in areas not covered by content.
 */
const ShaderBackground = () => {
  const canvasRef = useShaderBackground();

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full object-contain touch-none"
      style={{ background: '#100718' }}
    />
  );
};

export default ShaderBackground;