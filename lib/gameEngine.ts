import type { DailyGame } from "@/lib/gameTypes";
import { normalizeAnswer } from "@/lib/gameTypes";

export function isCorrectGuess(game: DailyGame, rawGuess: string): boolean {
  const normalizedGuess = normalizeAnswer(rawGuess);
  if (!normalizedGuess) return false;

  const acceptedAnswers = new Set<string>([
    normalizeAnswer(game.title),
    ...(game.acceptableAnswers ?? []).map(normalizeAnswer),
  ]);

  return acceptedAnswers.has(normalizedGuess);
}

export function buildShareText(args: {
  game: DailyGame;
  guesses: string[];
  status: "playing" | "won" | "lost";
  url?: string;
}): string {
  const { game, guesses, status, url } = args;
  const maxGuesses = game.maxGuesses ?? 6;
  const attempts = Math.min(guesses.length, maxGuesses);
  const headerScore = status === "won" ? `${attempts}/${maxGuesses}` : `X/${maxGuesses}`;

  const rows: string[] = [];
  for (let index = 0; index < maxGuesses; index++) {
    if (status === "won" && index === attempts - 1) {
      rows.push("O");
    } else if (index < attempts) {
      rows.push("X");
    } else {
      rows.push("-");
    }
  }

  return [
    `GuessTheGame | ${game.puzzleKey}`,
    `Result: ${headerScore}`,
    rows.join(""),
    ...(url ? ["", url] : []),
  ].join("\n");
}
