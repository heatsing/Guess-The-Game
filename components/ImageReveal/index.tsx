"use client";

import Image from "next/image";
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
      <div className="overflow-hidden rounded-xl border border-line bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-600 dark:bg-slate-700/50">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            key={mainSrc}
            src={mainSrc}
            alt="Clue image"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-full w-full origin-center transform object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

