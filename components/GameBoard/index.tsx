"use client";

import { useEffect, useMemo, useState } from "react";
import type { DailyGame } from "@/lib/gameTypes";
import GuessInput from "@/components/GuessInput";
import ImageReveal from "@/components/ImageReveal";
import { dispatchStatsUpdate } from "@/components/PlayerStatistics";
import { buildShareText, isCorrectGuess } from "@/lib/gameEngine";

type StoredState = {
  puzzleKey: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
  cluesUsed?: number;
};

function storageKey(namespace: string, puzzleKey: string) {
  return `gtg:v2:${namespace}:${puzzleKey}`;
}

export default function GameBoard({
  game,
  modeLabel = "Guess the Game",
  storageNamespace = "game",
  titles,
}: {
  game: DailyGame;
  modeLabel?: string;
  storageNamespace?: string;
  titles?: string[];
}) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<StoredState["status"]>("playing");
  const [message, setMessage] = useState<string>("");
  const [shareInfo, setShareInfo] = useState<string | null>(null);

  const maxGuesses = game.maxGuesses ?? 6;
  const totalClues = Math.max(1, game.images.length || 6);
  const [cluesUsed, setCluesUsed] = useState<number>(1);

  const remaining = Math.max(0, maxGuesses - guesses.length);
  const unlockedCount = Math.min(totalClues, Math.max(1, cluesUsed));

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
      const fromStore = typeof parsed.cluesUsed === "number" ? parsed.cluesUsed : (Array.isArray(parsed.guesses) ? parsed.guesses.length + 1 : 1);
      setCluesUsed(Math.min(totalClues, Math.max(1, fromStore)));
    } catch {
      // ignore
    }
  }, [game.puzzleKey, storageNamespace, totalClues]);

  useEffect(() => {
    const st: StoredState = { puzzleKey: game.puzzleKey, guesses, status, cluesUsed };
    try {
      localStorage.setItem(storageKey(storageNamespace, game.puzzleKey), JSON.stringify(st));
      if (status === "won" || status === "lost") {
        dispatchStatsUpdate(storageNamespace);
        setShareInfo(buildShareText({ game, guesses, status }));
      }
    } catch {
      // ignore
    }
  }, [game, guesses, status, cluesUsed, storageNamespace]);

  function submitGuess(rawGuess: string) {
    if (finished) return;

    const cleaned = rawGuess.trim();
    if (!cleaned) return;

    const nextGuesses = [...guesses, cleaned].slice(0, maxGuesses);
    setGuesses(nextGuesses);
    setCluesUsed((prev) => Math.min(totalClues, Math.max(prev, nextGuesses.length + 1)));

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

    setMessage(`Nope, try again! (clue ${Math.min(unlockedCount + 1, totalClues)}/${totalClues} unlocked)`);
  }

  function skipClue() {
    if (finished) return;
    setCluesUsed((prev) => {
      const next = Math.min(totalClues, prev + 1);
      if (next > prev) {
        setMessage(`Skipped. Clue ${next}/${totalClues} unlocked.`);
      }
      return next;
    });
  }

  async function shareResult() {
    if (!shareInfo) return;
    try {
      if (typeof navigator !== "undefined") {
        const nav: any = navigator;
        if (typeof nav.share === "function") {
          await nav.share({ text: shareInfo });
          return;
        }
        if (nav.clipboard && typeof nav.clipboard.writeText === "function") {
          await nav.clipboard.writeText(shareInfo);
          setMessage("Result copied to clipboard. Share it with friends!");
          return;
        }
      }
    } catch {
      // ignore share errors
    }
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
              Clues: <span className="font-semibold">{unlockedCount}</span>/{totalClues}
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

      <section className="rounded-2xl border border-line bg-card p-3 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
            CLUE PROGRESSION
          </div>
          <div className="flex items-center gap-1 text-lg leading-none">
            {Array.from({ length: totalClues }).map((_, i) => {
              const index = i + 1;
              const unlocked = index <= unlockedCount;
              return (
                <span key={index} aria-hidden className={unlocked ? "text-green-500" : "text-slate-400 dark:text-slate-600"}>
                  {unlocked ? "🟩" : "⬜"}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <GuessInput
        disabled={finished}
        onSubmitGuess={submitGuess}
        helperText={helperText}
        options={titles}
        onSkip={cluesUsed < totalClues ? skipClue : undefined}
      />

      {finished && shareInfo ? (
        <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Share your result</div>
                <div className="mt-1 text-xs text-slate-700 dark:text-slate-200">
                  This preview matches what will be copied or shared, similar to other daily puzzle games.
                </div>
              </div>
              <button
                type="button"
                onClick={shareResult}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:mt-0"
              >
                Share / Copy
              </button>
            </div>
            <pre className="mt-1 max-h-40 overflow-auto rounded-xl bg-slate-900 px-3 py-2 text-[11px] leading-relaxed text-slate-100 shadow-inner dark:bg-black/80">
{shareInfo}
            </pre>
          </div>
        </section>
      ) : null}

      <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="text-sm font-medium text-slate-900 dark:text-white">
          How to add your own {storageNamespace === "game" ? "games" : "puzzles"}
        </div>
        <ul className="mt-2 list-disc pl-5 text-xs text-slate-600 dark:text-slate-400">
          <li>
            Put up to 6 images per puzzle under{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">public/images/</code> (from
            hardest to easiest / blurriest to clearest).
          </li>
          <li>
            In{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">
              data/{storageNamespace === "game" ? "games" : `${storageNamespace}s`}.json
            </code>
            , update the <code className="rounded bg-slate-100 px-1 dark:bg-slate-700 dark:text-slate-200">images</code> array for each entry.
          </li>
          <li>The daily puzzle cycles through your list based on the date (UTC).</li>
        </ul>
      </section>
    </main>
  );
}

