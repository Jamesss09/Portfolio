"use client";

import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8
      min-h-[calc(100vh-40px)] overflow-hidden"
    >
      {/* Soft centered glow so the text pops over the animated nebula */}
      <div
        aria-hidden
        className="absolute -z-10 inset-0
        bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(109,40,217,0.28),transparent_70%)]"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group">
          <span
            className="text-sm text-gray-600 dark:text-purple-100 font-geist mx-auto px-5 py-2
            bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent
            border-[2px] border-gray-300/20 dark:border-white/15
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center
            backdrop-blur-sm"
          >
            {eyebrow}
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in -translate-y-4 text-balance
        bg-gradient-to-br from-white from-30% to-white/40
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl
        drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-12 -translate-y-4 text-balance
        text-lg tracking-tight text-gray-600 dark:text-purple-100/80
        opacity-0 md:text-xl"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 font-geist tracking-tighter text-center text-lg
            shadow-lg shadow-primary/30"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px]
        after:absolute after:inset-0 after:z-50
        after:[background:linear-gradient(to_top,rgba(16,7,24,0.8)_8%,transparent)]"
      />
    </section>
  );
}