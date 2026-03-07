"use client";

import { useMemo } from "react";

type Props = {
  images: string[];
  unlockedCount: number; // 1..N
};

export default function ImageReveal({ images, unlockedCount }: Props) {
  const safeUnlocked = Math.max(1, Math.min(unlockedCount, images.length || 1));

  const mainSrc = useMemo(() => {
    if (!images.length) return "/images/placeholder.svg";
    return images[Math.min(safeUnlocked - 1, images.length - 1)]!;
  }, [images, safeUnlocked]);

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <div className="overflow-hidden rounded-xl border border-line bg-slate-100 dark:border-slate-600 dark:bg-slate-700/50">
        <div className="relative aspect-[16/9] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mainSrc} alt="Clue image" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

