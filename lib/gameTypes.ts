export type Game = {
  id: string;
  slug: string;
  title: string;
  acceptableAnswers?: string[];
  images: string[];
};

export type DailyGame = Game & {
  puzzleKey: string; // YYYY-MM-DD (UTC)
  maxGuesses: number;
};

export function normalizeAnswer(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

