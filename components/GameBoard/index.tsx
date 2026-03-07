"use client";

import { useEffect, useMemo, useState } from "react";
import type { DailyGame } from "@/lib/gameTypes";
import { normalizeAnswer } from "@/lib/gameTypes";
import GuessInput from "@/components/GuessInput";
import ImageReveal from "@/components/ImageReveal";

type StoredState = {
  puzzleKey: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
};

function storageKey(namespace: string, puzzleKey: string) {
  return `gtg:v2:${namespace}:${puzzleKey}`;
}

function isCorrectGuess(game: DailyGame, rawGuess: string) {
  const g = normalizeAnswer(rawGuess);
  if (!g) return false;
  const ok = new Set<string>([
    normalizeAnswer(game.title),
    ...(game.acceptableAnswers ?? []).map(normalizeAnswer),
  ]);
  return ok.has(g);
}

export default function GameBoard({
  game,
  modeLabel = "Guess the Game",
  storageNamespace = "game",
}: {
  game: DailyGame;
  modeLabel?: string;
  storageNamespace?: string;
}) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<StoredState["status"]>("playing");
  const [message, setMessage] = useState<string>("");

  const maxGuesses = game.maxGuesses ?? 6;
  const remaining = Math.max(0, maxGuesses - guesses.length);
  const unlockedCount = Math.min(game.images.length || 6, Math.max(1, guesses.length + 1));

  const finished = status !== "playing";

  const helperText = useMemo(() => {
    if (status === "won") return `You got it! The answer is “${game.title}”.`;
    if (status === "lost") return `Out of guesses. The answer was “${game.title}”.`;
    return `Guesses left: ${remaining} / ${maxGuesses}`;
  }, [game.title, maxGuesses, remaining, status]);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(storageKey(storageNamespace, game.puzzleKey)) ??
        localStorage.getItem(`gtg:v1:${game.puzzleKey}`); // backward compat
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredState;
      if (parsed?.puzzleKey !== game.puzzleKey) return;
      setGuesses(Array.isArray(parsed.guesses) ? parsed.guesses : []);
      setStatus(parsed.status ?? "playing");
    } catch {
      // ignore
    }
  }, [game.puzzleKey, storageNamespace]);

  useEffect(() => {
    const st: StoredState = { puzzleKey: game.puzzleKey, guesses, status };
    try {
      localStorage.setItem(storageKey(storageNamespace, game.puzzleKey), JSON.stringify(st));
    } catch {
      // ignore
    }
  }, [game.puzzleKey, guesses, status, storageNamespace]);

  function submitGuess(rawGuess: string) {
    if (finished) return;

    const cleaned = rawGuess.trim();
    if (!cleaned) return;

    const nextGuesses = [...guesses, cleaned].slice(0, maxGuesses);
    setGuesses(nextGuesses);

    if (isCorrectGuess(game, cleaned)) {
      setStatus("won");
      setMessage("Correct!");
      return;
    }

    const used = nextGuesses.length;
    if (used >= maxGuesses) {
      setStatus("lost");
      setMessage("Nice try, but not quite.");
      return;
    }

    setMessage(`Nope, try again! (clue ${Math.min(unlockedCount + 1, 6)}/6 unlocked)`);
  }

  return (
    <main className="grid gap-4">
      <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm text-slate-700 dark:text-slate-200">Today&apos;s puzzle</div>
            <div className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{modeLabel}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-line bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
              Guesses: <span className="font-semibold">{guesses.length}</span>/{maxGuesses}
            </div>
            <div className="rounded-xl border border-line bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200">
              Clues: <span className="font-semibold">{unlockedCount}</span>/6
            </div>
          </div>
        </div>

        {message ? (
          <div
            className={[
              "mt-3 rounded-xl border px-3 py-2 text-sm",
              status === "won"
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200"
                : status === "lost"
                  ? "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200"
                  : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200",
            ].join(" ")}
          >
            {message}
          </div>
        ) : null}

        <div className="mt-4">
          <div className="text-sm font-medium text-slate-900 dark:text-white">Guess history</div>
          {guesses.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {guesses.map((g, i) => {
                const ok = isCorrectGuess(game, g);
                return (
                  <span
                    key={`${i}-${g}`}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      ok ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200" : "border-line bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200",
                    ].join(" ")}
                  >
                    {g}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-700 dark:text-slate-200">No guesses yet.</div>
          )}
        </div>
      </section>

      <ImageReveal images={game.images} unlockedCount={unlockedCount} />

      <GuessInput disabled={finished} onSubmitGuess={submitGuess} helperText={helperText} />

      <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="text-sm font-medium text-slate-900 dark:text-white">How to add your own games</div>
        <ul className="mt-2 list-disc pl-5 text-xs text-slate-600 dark:text-slate-400">
          <li>
            Put 6 images per game under <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">public/images/</code> (from
            hardest to easiest / blurriest to clearest).
          </li>
          <li>
            In <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">data/games.json</code>, update the corresponding{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">images</code> array to point at those paths.
          </li>
          <li>The daily puzzle cycles through your list based on the date (UTC).</li>
        </ul>
      </section>
    </main>
  );
}

