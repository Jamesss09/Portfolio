"use client";

import { useEffect, useState, type ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Extra content rendered inside the hero (e.g. the Jamelet mascot). */
  children?: ReactNode;
}

function ManilaTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Manila",
  }).format(now);
  return <span className="tabular-nums">{time} PHT</span>;
}

const currentlyRows = [
  { label: "Location", value: "Philippines · UTC+8" },
  { label: "Focus", value: "React · Laravel" },
] as const;

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
  children,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-6xl items-center px-6 pb-20 pt-32 md:px-10 md:pt-40"
    >
      <div className="grid w-full items-center gap-14 text-left md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        {/* ——— Editorial copy ——— */}
        <div>
          {eyebrow && (
            <div
              className="animate-fade-in flex items-center gap-4 opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <span
                aria-hidden
                className="h-px w-10 bg-text-secondary/50"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-text-secondary">
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className="animate-fade-in mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight text-text-primary opacity-0 sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>

          <p
            className="animate-fade-in mt-6 max-w-md text-base font-light leading-relaxed text-text-secondary opacity-0 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {subtitle}
          </p>

          <div
            aria-hidden
            className="animate-fade-in mt-8 h-px w-full max-w-md bg-border opacity-0"
            style={{ animationDelay: "320ms" }}
          />

          {ctaLabel && (
            <div
              className="animate-fade-in mt-8 flex flex-wrap items-center gap-8 opacity-0"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href={ctaHref}
                className="bg-text-primary px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-bg-primary transition-opacity duration-300 hover:opacity-85"
              >
                {ctaLabel}
              </a>
              <a
                href="#projects"
                className="text-[12px] font-medium uppercase tracking-[0.22em] text-text-primary underline underline-offset-8 decoration-text-secondary/50 transition-colors hover:decoration-text-primary"
              >
                View Work
              </a>
            </div>
          )}

          <p
            className="animate-fade-in mt-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-text-secondary opacity-0"
            style={{ animationDelay: "520ms" }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#c4a76a]"
            />
            Based in Philippines · Ready to build projects
          </p>
        </div>

        {/* ——— Currently card ——— */}
        <figure
          className="animate-fade-in mx-auto w-full max-w-sm opacity-0 md:mx-0 md:ml-auto"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-3 -top-3 h-full w-full border border-border"
            />
            <div className="relative border border-border bg-bg-card p-8">
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-8 bg-text-secondary/50" />
                <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-text-secondary">
                  Currently
                </span>
              </div>

              <dl className="mt-6 divide-y divide-border">
                {currentlyRows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-secondary">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-light text-text-primary">{row.value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-secondary">
                    Local
                  </dt>
                  <dd className="text-sm font-light text-text-primary">
                    <ManilaTime />
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-secondary">
                    Status
                  </dt>
                  <dd className="flex items-center gap-2 text-sm font-light text-text-primary">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#c4a76a]" />
                    Ready to build projects
                  </dd>
                </div>
              </dl>

              <p className="mt-6 font-display text-2xl italic text-text-secondary">
                — J.E.
              </p>
            </div>
          </div>
          <figcaption className="mt-5 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.25em] text-text-secondary">
            <span>Currently — 2026</span>
            <span>N°01</span>
          </figcaption>
        </figure>
      </div>

      {/* Bottom fade — uses theme bg so it blends in both vibrant + minimalist */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 [background:linear-gradient(to_top,var(--color-bg-primary)_8%,transparent)]"
      />

      {children}
    </section>
  );
}
