"use client";

import { usePathname } from "next/navigation";
import { ABOUT_GAME } from "@/lib/aboutGame";
import { MODES } from "@/lib/modes";

function getModeKeyFromPath(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return MODES.find((mode) => mode.key === firstSegment)?.key ?? "game";
}

export default function AboutSection() {
  const pathname = usePathname();
  const modeKey = getModeKeyFromPath(pathname);
  const mode = MODES.find((item) => item.key === modeKey);
  const label = mode?.label ?? "Guess The Game";
  const aboutText = ABOUT_GAME[modeKey] ?? ABOUT_GAME.game;

  return (
    <section id="about" className="app-frame px-6 py-8 text-center md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="section-eyebrow">About {label}</div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          A fast daily round with clear rules
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
          {aboutText}
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <div className="metric-card text-left">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Reset cadence</div>
          <div className="mt-2 text-xl font-extrabold text-[var(--foreground)]">Daily at 00:00 UTC</div>
          <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
            A new puzzle replaces the previous one worldwide at the same time.
          </div>
        </div>
        <div className="metric-card text-left">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Saved progress</div>
          <div className="mt-2 text-xl font-extrabold text-[var(--foreground)]">Stored on this device</div>
          <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
            Your streaks stay local, so returning is quick and account-free.
          </div>
        </div>
        <div className="metric-card text-left">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Round shape</div>
          <div className="mt-2 text-xl font-extrabold text-[var(--foreground)]">Up to 6 clues</div>
          <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
            The interface stays short and readable even when you use every reveal.
          </div>
        </div>
      </div>
    </section>
  );
}
