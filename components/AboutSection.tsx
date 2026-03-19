"use client";

import { usePathname } from "next/navigation";
import { MODES } from "@/lib/modes";
import { ABOUT_GAME } from "@/lib/aboutGame";

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
    <section className="app-frame px-6 py-8">
      <div className="section-eyebrow">About this mode</div>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        {label}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-base">{aboutText}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Reset cadence</div>
          <div className="font-display mt-2 text-xl font-semibold text-[var(--foreground)]">
            Daily at 00:00 UTC
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Progress storage</div>
          <div className="font-display mt-2 text-xl font-semibold text-[var(--foreground)]">
            Saved on this device
          </div>
        </div>
      </div>
    </section>
  );
}
