"use client";

import Image from "next/image";
import { useMemo } from "react";

type Props = {
  images: string[];
  unlockedCount: number;
};

export default function ImageReveal({ images, unlockedCount }: Props) {
  const totalClues = Math.max(images.length, 1);
  const safeUnlocked = Math.max(1, Math.min(unlockedCount, totalClues));

  const mainSrc = useMemo(() => {
    if (!images.length) return "/images/placeholder.svg";
    return images[Math.min(safeUnlocked - 1, images.length - 1)]!;
  }, [images, safeUnlocked]);

  return (
    <section className="app-frame p-4 md:p-5">
      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-black/10">
        <div className="absolute z-10 flex flex-wrap gap-2 p-4">
          <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            Current clue {safeUnlocked}/{totalClues}
          </span>
          <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 backdrop-blur dark:bg-slate-950/70 dark:text-slate-100">
            {safeUnlocked === totalClues ? "Full reveal" : "Sharpens every round"}
          </span>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <Image
            key={mainSrc}
            src={mainSrc}
            alt="Current clue image"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: totalClues }).map((_, index) => {
          const clueNumber = index + 1;
          const unlocked = clueNumber <= safeUnlocked;
          const active = clueNumber === safeUnlocked;

          return (
            <div
              key={clueNumber}
              className={`rounded-[22px] border p-4 ${
                active
                  ? "border-[color:var(--accent)] bg-[var(--accent-soft)]"
                  : unlocked
                    ? "border-[color:var(--border)] bg-[var(--surface-strong)]"
                    : "border-[color:var(--border)] bg-[var(--surface)] opacity-80"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Clue {clueNumber}
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
                  {active ? "Active" : unlocked ? "Open" : "Locked"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {active
                  ? "This is the clue currently in play."
                  : unlocked
                    ? "Already revealed earlier in the round."
                    : "Stays hidden until another miss or manual reveal."}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
