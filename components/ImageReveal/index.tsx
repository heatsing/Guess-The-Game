"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images: string[];
  unlockedCount: number;
};

export default function ImageReveal({ images, unlockedCount }: Props) {
  const totalClues = Math.max(images.length, 1);
  const safeUnlocked = Math.max(1, Math.min(unlockedCount, totalClues));
  const [imageFailed, setImageFailed] = useState(false);
  const revealCopy =
    safeUnlocked === totalClues
      ? "Every clue is visible now."
      : `Clue ${safeUnlocked} is live. The next miss reveals more.`;

  const mainSrc = useMemo(() => {
    if (!images.length) return "/images/placeholder.svg";
    return images[Math.min(safeUnlocked - 1, images.length - 1)]!;
  }, [images, safeUnlocked]);

  useEffect(() => {
    setImageFailed(false);
  }, [mainSrc]);

  return (
    <section className="mx-auto max-w-4xl">
      <div className="app-frame p-3 md:p-4">
        <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-black/10">
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-between gap-2 p-3 md:p-4">
            <span className="rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              Current clue {safeUnlocked}/{totalClues}
            </span>
            <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 backdrop-blur dark:bg-slate-950/70 dark:text-slate-100">
              {safeUnlocked === totalClues ? "Full reveal" : "More on the next miss"}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {imageFailed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top,_rgba(255,218,24,0.2),_transparent_45%),linear-gradient(180deg,_rgba(32,33,36,0.16),_rgba(32,33,36,0.28))] px-6 text-center text-white">
                <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                  Clue unavailable
                </span>
                <p className="max-w-xl text-sm leading-7 text-white/85 md:text-base">
                  This clue image could not be loaded. You can keep guessing or open the next clue while the data source is refreshed.
                </p>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <Image
                  key={mainSrc}
                  src={mainSrc}
                  alt="Current clue image"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  onError={() => setImageFailed(true)}
                />
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-eyebrow">Clue track</div>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{revealCopy}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Array.from({ length: totalClues }).map((_, index) => {
              const clueNumber = index + 1;
              const unlocked = clueNumber <= safeUnlocked;
              const active = clueNumber === safeUnlocked;
              return (
                <span
                  key={clueNumber}
                  className={`inline-flex min-w-[4.5rem] items-center justify-center rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
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
        </div>
      </div>
    </section>
  );
}
