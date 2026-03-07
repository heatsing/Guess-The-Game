import type { Game, DailyGame } from "@/lib/gameTypes";

function toPuzzleKeyUTC(d: Date) {
  return d.toISOString().slice(0, 10);
}

function dayIndexUTC(d: Date) {
  const year = d.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const today = Date.UTC(year, d.getUTCMonth(), d.getUTCDate());
  return Math.floor((today - start) / (24 * 60 * 60 * 1000));
}

export function getDailyFromList(list: Game[], date = new Date()): DailyGame {
  if (!list.length) {
    throw new Error("The data list is empty. Please add at least one entry.");
  }

  const idx = dayIndexUTC(date) % list.length;
  const g = list[idx]!;

  return {
    ...g,
    puzzleKey: toPuzzleKeyUTC(date),
    maxGuesses: 6,
  };
}

