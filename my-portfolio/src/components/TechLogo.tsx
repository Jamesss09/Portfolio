import type { SimpleIcon } from 'simple-icons';
import type { LucideIcon } from 'lucide-react';

type IconSource = {
  kind: 'simple' | 'lucide';
  icon: SimpleIcon | LucideIcon;
};

/**
 * Renders a technology logo in its brand color.
 * - kind "simple"  -> official brand SVG from the simple-icons dataset (colored with the brand hex)
 * - kind "lucide"  -> generic fallback icon for things without a brand logo (e.g. AI / ML)
 */
export function TechLogo({ source, size = 14 }: { source: IconSource; size?: number }) {
  if (source.kind === 'lucide') {
    const LucideIcon = source.icon as LucideIcon;
    return <LucideIcon size={16} className="text-primary-light shrink-0" aria-hidden="true" />;
  }

  const brand = source.icon as SimpleIcon;
  return (
    // White circular badge so dark brand logos (e.g. GitHub) stay visible on the dark background
    <span
      className="grid size-6 place-items-center rounded-full bg-white shrink-0"
      aria-hidden="true"
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={brand.hex}
        aria-label={brand.title}
      >
        <title>{brand.title}</title>
        <path d={brand.path} />
      </svg>
    </span>
  );
}

export default TechLogo;
export type { IconSource };