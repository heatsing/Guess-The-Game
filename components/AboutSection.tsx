"use client";

import { usePathname } from "next/navigation";
import { MODES } from "@/lib/modes";
import { ABOUT_GAME } from "@/lib/aboutGame";

const PATH_TO_MODE: Record<string, string> = {
  "/": "game",
  "/game": "game",
  "/book": "book",
  "/movie": "movie",
  "/logo": "logo",
  "/house": "house",
  "/angle": "angle",
  "/phrase": "phrase",
  "/song": "song",
  "/animal": "animal",
  "/plant": "plant",
  "/number": "number",
  "/price": "price",
  "/faq": "game",
};

export default function AboutSection() {
  const pathname = usePathname();
  const modeKey = PATH_TO_MODE[pathname] ?? "game";
  const mode = MODES.find((m) => m.key === modeKey);
  const label = mode?.label ?? "Guess The Game";
  const aboutText = ABOUT_GAME[modeKey] ?? ABOUT_GAME.game;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-center text-xl font-bold text-slate-900 dark:text-white">
        About {label}
      </h2>
      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate-700 dark:text-slate-200 md:text-base">
        {aboutText}
      </p>
    </section>
  );
}
