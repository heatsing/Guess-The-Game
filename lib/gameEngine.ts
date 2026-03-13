import type { DailyGame } from "@/lib/gameTypes";
import { normalizeAnswer } from "@/lib/gameTypes";

export function isCorrectGuess(game: DailyGame, rawGuess: string): boolean {
  const g = normalizeAnswer(rawGuess);
  if (!g) return false;
  const ok = new Set<string>([
    normalizeAnswer(game.title),
    ...(game.acceptableAnswers ?? []).map(normalizeAnswer),
  ]);
  return ok.has(g);
}

export function buildShareText(args: {
  game: DailyGame;
  guesses: string[];
  status: "playing" | "won" | "lost";
}): string {
  const { game, guesses, status } = args;
  const maxGuesses = game.maxGuesses ?? 6;
  const attempts = Math.min(guesses.length, maxGuesses);
  const headerScore = status === "won" ? `${attempts}/${maxGuesses}` : `X/${maxGuesses}`;

  const rows: string[] = [];
  for (let i = 0; i < maxGuesses; i++) {
    if (status === "won" && i === attempts - 1) {
      rows.push("🟩");
    } else if (i < attempts) {
      rows.push("🟥");
    } else {
      rows.push("⬜");
    }
  }

  const grid = rows.join("");

  return [
    `GuessTheGame — ${game.puzzleKey}`,
    `Result: ${headerScore}`,
    grid,
    "",
    "Play at: https://guessthe.game (inspired clone)",
  ].join("\n");
}

