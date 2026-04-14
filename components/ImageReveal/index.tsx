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
    <section className="app-frame p-3 md:p-4">
      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-black/10">
        <div className="absolute z-10 flex flex-wrap gap-2 p-3">
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

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        {Array.from({ length: totalClues }).map((_, index) => {
          const clueNumber = index + 1;
          const unlocked = clueNumber <= safeUnlocked;
          const active = clueNumber === safeUnlocked;
          return (
            <span
              key={clueNumber}
              className={`inline-flex min-w-[5.5rem] items-center justify-center rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
                active
                  ? "border-[color:var(--accent)] bg-[var(--accent-soft)] text-black"
                  : unlocked
                    ? "border-[color:var(--border)] bg-[var(--surface-strong)] text-[var(--foreground)]"
                    : "border-[color:var(--border)] bg-[var(--surface)] text-[var(--muted)]"
              }`}
            >
              {`Clue ${clueNumber}`}
            </span>
          );
        })}
      </div>
    </section>
  );
}
