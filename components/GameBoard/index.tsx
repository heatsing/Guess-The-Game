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
  const [message, setMessage] = useState("");
  const [shareInfo, setShareInfo] = useState<string | null>(null);

  const maxGuesses = game.maxGuesses ?? 6;
  const totalClues = Math.max(1, game.images.length || 6);
  const [cluesUsed, setCluesUsed] = useState(1);

  const remaining = Math.max(0, maxGuesses - guesses.length);
  const unlockedCount = Math.min(totalClues, Math.max(1, cluesUsed));
  const finished = status !== "playing";
  const attemptsProgress = Math.round((guesses.length / maxGuesses) * 100);
  const clueProgress = Math.round((unlockedCount / totalClues) * 100);

  const helperText = useMemo(() => {
    if (status === "won") {
      return `Solved in ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}. The answer is ${game.title}.`;
    }
    if (status === "lost") {
      return `Round complete. The answer was ${game.title}.`;
    }
    return `${remaining} guesses left. Each miss unlocks the next clue.`;
  }, [game.title, guesses.length, remaining, status]);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(storageKey(storageNamespace, game.puzzleKey)) ??
        localStorage.getItem(`gtg:v1:${game.puzzleKey}`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredState;
      if (parsed?.puzzleKey !== game.puzzleKey) return;
      setGuesses(Array.isArray(parsed.guesses) ? parsed.guesses : []);
      setStatus(parsed.status ?? "playing");
      const fromStore =
        typeof parsed.cluesUsed === "number"
          ? parsed.cluesUsed
          : Array.isArray(parsed.guesses)
            ? parsed.guesses.length + 1
            : 1;
      setCluesUsed(Math.min(totalClues, Math.max(1, fromStore)));
    } catch {
      // ignore malformed local state
    }
  }, [game.puzzleKey, storageNamespace, totalClues]);

  useEffect(() => {
    const storedState: StoredState = { puzzleKey: game.puzzleKey, guesses, status, cluesUsed };
    try {
      localStorage.setItem(storageKey(storageNamespace, game.puzzleKey), JSON.stringify(storedState));
      if (status === "won" || status === "lost") {
        dispatchStatsUpdate(storageNamespace);
        const url = typeof window !== "undefined" ? window.location.href : undefined;
        setShareInfo(buildShareText({ game, guesses, status, url }));
      }
    } catch {
      // ignore storage errors
    }
  }, [cluesUsed, game, guesses, status, storageNamespace]);

  function submitGuess(rawGuess: string) {
    if (finished) return;

    const cleaned = rawGuess.trim();
    if (!cleaned) return;

    const nextGuesses = [...guesses, cleaned].slice(0, maxGuesses);
    const nextClue = Math.min(totalClues, Math.max(cluesUsed, nextGuesses.length + 1));

    setGuesses(nextGuesses);
    setCluesUsed(nextClue);

    if (isCorrectGuess(game, cleaned)) {
      setStatus("won");
      setMessage("Correct. Puzzle solved.");
      return;
    }

    if (nextGuesses.length >= maxGuesses) {
      setStatus("lost");
      setMessage("No guesses left. Better luck tomorrow.");
      return;
    }

    setMessage(`Not this time. Clue ${nextClue} of ${totalClues} is now open.`);
  }

  function skipClue() {
    if (finished) return;

    setCluesUsed((current) => {
      const next = Math.min(totalClues, current + 1);
      if (next > current) {
        setMessage(`Manual reveal used. Clue ${next} of ${totalClues} is now open.`);
      }
      return next;
    });
  }

  async function shareResult() {
    if (!shareInfo) return;

    try {
      const shareUrl = typeof window !== "undefined" ? window.location.href : undefined;

      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({
          title: "GuessTheGame",
          text: shareInfo,
          url: shareUrl,
        });
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareInfo);
        setMessage("Result copied to clipboard.");
        return;
      }

      setMessage("Sharing is not available on this device.");
    } catch {
      setMessage("Sharing was cancelled.");
    }
  }

  const statusTone =
    status === "won"
      ? "border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-200"
      : status === "lost"
        ? "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200"
        : "border-[color:var(--border)] bg-[var(--surface-strong)] text-[var(--foreground)]";

  return (
    <div className="space-y-6">
      <section className="app-frame px-5 py-5 md:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-eyebrow">Live board</div>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
              Today's {modeLabel} puzzle
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{helperText}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric-card min-w-[11rem]">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Guesses used</div>
              <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {guesses.length}/{maxGuesses}
              </div>
            </div>
            <div className="metric-card min-w-[11rem]">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Clues unlocked</div>
              <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {unlockedCount}/{totalClues}
              </div>
            </div>
          </div>
        </div>

        {message ? (
          <div className={`mt-5 rounded-[22px] border px-4 py-3 text-sm ${statusTone}`}>{message}</div>
        ) : null}

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span>Attempt pace</span>
              <span>{attemptsProgress}%</span>
            </div>
            <div className="progress-rail mt-2">
              <span className="progress-fill" style={{ width: `${attemptsProgress}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span>Reveal depth</span>
              <span>{clueProgress}%</span>
            </div>
            <div className="progress-rail mt-2">
              <span className="progress-fill cool" style={{ width: `${clueProgress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <ImageReveal images={game.images} unlockedCount={unlockedCount} />

      <GuessInput
        disabled={finished}
        helperText={helperText}
        onSubmitGuess={submitGuess}
        options={titles}
        onSkip={cluesUsed < totalClues ? skipClue : undefined}
      />

      <section className="app-frame px-5 py-5 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="section-eyebrow">Guess history</div>
            <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
              Every submitted answer stays visible until the round ends.
            </div>
          </div>
          <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {guesses.length} entries
          </span>
        </div>

        {guesses.length ? (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {guesses.map((guess, index) => {
              const correct = isCorrectGuess(game, guess);
              return (
                <span
                  key={`${index}-${guess}`}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${
                    correct
                      ? "border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-200"
                      : "border-[color:var(--border)] bg-[var(--surface-strong)] text-[var(--foreground)]"
                  }`}
                >
                  {guess}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-[22px] border border-dashed border-[color:var(--border)] px-4 py-5 text-sm text-[var(--muted)]">
            No guesses yet. Start with the clue above and lock in your first answer.
          </div>
        )}
      </section>

      {finished && shareInfo ? (
        <section className="app-frame px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="section-eyebrow">Share result</div>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                Send your score without spoiling the answer
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                The preview below is exactly what gets copied or shared.
              </p>
            </div>
            <button type="button" onClick={shareResult} className="primary-button">
              Share or copy
            </button>
          </div>

          <pre className="mt-5 overflow-auto rounded-[24px] border border-[color:var(--border)] bg-slate-950 px-4 py-4 text-xs leading-6 text-slate-100">
{shareInfo}
          </pre>
        </section>
      ) : null}
    </div>
  );
}
