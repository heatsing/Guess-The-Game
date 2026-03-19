import "server-only";

import type { DailyGame } from "@/lib/gameTypes";
import { sanityClient } from "@/lib/sanity/client";
import { ALL_TITLES_QUERY, DAILY_GAME_QUERY } from "@/lib/sanity/queries";
import { unstable_cache } from "next/cache";

type SanityDaily = {
  date: string;
  mode: string;
  game: {
    _id: string;
    title: string;
    acceptableAnswers?: string[];
    images?: (string | null)[] | null;
  };
} | null;

function toIsoDateUTC(d: Date) {
  return d.toISOString().slice(0, 10);
}

export const getSanityDailyForMode = unstable_cache(
  async (mode: string, date = new Date()): Promise<DailyGame | null> => {
    if (!sanityClient) return null;

    const iso = toIsoDateUTC(date);
    const res = (await sanityClient.fetch(DAILY_GAME_QUERY, { date: iso, mode })) as SanityDaily;
    if (!res?.game?._id) return null;

    const images = (res.game.images ?? []).filter(Boolean) as string[];
    if (!images.length) return null;

    return {
      id: res.game._id,
      slug: res.game._id,
      title: res.game.title,
      acceptableAnswers: Array.isArray(res.game.acceptableAnswers) ? res.game.acceptableAnswers : undefined,
      images,
      puzzleKey: iso,
      maxGuesses: 6,
    };
  },
  ["sanity:daily:v1"],
  { revalidate: 60 }
);

export const getSanityTitlesForMode = unstable_cache(
  async (mode: string): Promise<string[] | null> => {
    if (!sanityClient) return null;
    const rows = (await sanityClient.fetch(ALL_TITLES_QUERY, { mode })) as Array<{ title?: string }>;
    const titles = rows.map((r) => r.title).filter((t): t is string => typeof t === "string" && t.trim().length > 0);
    return titles.length ? titles : [];
  },
  ["sanity:titles:v1"],
  { revalidate: 300 }
);

