import type { DailyGame } from "@/lib/gameTypes";
import { isAnswerAcceptable } from "@/lib/gameTypes";

export function isCorrectGuess(game: DailyGame, rawGuess: string): boolean {
  return isAnswerAcceptable(rawGuess, game.title, game.acceptableAnswers ?? []);
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
