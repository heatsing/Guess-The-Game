import { z } from "zod";

export const GameSchema = z.object({
  id: z.string(),
  slug: z.string().optional(),
  title: z.string().min(1),
  acceptableAnswers: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1),
});

export type Game = z.infer<typeof GameSchema>;

export const DailyGameSchema = GameSchema.extend({
  puzzleKey: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  maxGuesses: z.number().int().min(1).max(10).default(6),
});

export type DailyGame = z.infer<typeof DailyGameSchema>;

export function normalizeAnswer(s: string): string {
  if (!s) return "";

  return s
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/[·•∙⊕◦∘]/g, "·")
    .replace(/[\s　]+/g, " ")
    .replace(/[?!.。:：;；…—–-]/g, "")
    .replace(/^(the|a|an)\s+/i, "")
    .replace(/\s+(ltd|llc|inc|corp|co)\.?$/i, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

export function isAnswerAcceptable(guess: string, title: string, acceptableAnswers: string[] = []): boolean {
  const normalizedGuess = normalizeAnswer(guess);
  if (!normalizedGuess) return false;

  const accepted = new Set([
    normalizeAnswer(title),
    ...acceptableAnswers.map(normalizeAnswer),
  ]);

  return accepted.has(normalizedGuess);
}

