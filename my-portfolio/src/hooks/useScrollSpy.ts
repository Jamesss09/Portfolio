import { useEffect, useState } from 'react';

/**
 * Scroll-spy — tracks which page section is currently in view and returns
 * its id so navigation bars can highlight the matching link.
 *
 * An IntersectionObserver watches the sections and only considers the band
 * between the top of the viewport (minus the sticky header height, ~4.5rem
 * including the sections' `scroll-margin-top`) and 45% down. The section
 * occupying that band is the "active" one, i.e. the section the visitor is
 * actually reading.
 */
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // rootMargin: "top right bottom left" — skip the sticky header zone
      // (72px, matching the sections' scroll-margin-top: 4.5rem) and treat
      // only the upper band of the viewport as the active reading zone.
      // NB: rootMargin only accepts px and %, never rem.
      { rootMargin: '-72px 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return { activeId, setActive: setActiveId };
}

export default useScrollSpy;
