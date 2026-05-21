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
  const stateLabel =
    status === "won"
      ? "Solved"
      : status === "lost"
        ? "Round over"
        : guesses.length === 0
          ? "Fresh board"
          : `${remaining} left`;
  const stateCopy =
    status === "won"
      ? "No spoiler share card is ready below."
      : status === "lost"
        ? "The answer is revealed. Come back for the next round."
        : guesses.length === 0
          ? "Start with the first clue and take your best shot."
          : `Guess ${Math.min(guesses.length + 1, maxGuesses)} is up next.`;

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

    setGuesses(nextGuesses);

    if (isCorrectGuess(game, cleaned)) {
      setStatus("won");
      setMessage("Correct. Puzzle solved.");
      return;
    }

    const nextClue = Math.min(totalClues, Math.max(cluesUsed, nextGuesses.length + 1));
    setCluesUsed(nextClue);

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
    <div className="mx-auto max-w-5xl space-y-4">
      <section className="app-frame px-4 py-4 md:px-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="section-eyebrow">Daily board</div>
              <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)] md:text-2xl">
                Today's {modeLabel} puzzle
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{helperText}</p>
            </div>

            <div className="panel-card min-w-[18rem] px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Board status</div>
                  <div className="font-display mt-1 text-2xl font-semibold text-[var(--foreground)]">
                    {stateLabel}
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{stateCopy}</div>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-2">
                  {Array.from({ length: maxGuesses }).map((_, index) => {
                    const slotNumber = index + 1;
                    const isPastGuess = slotNumber <= guesses.length;
                    const isCurrentGuess = !finished && slotNumber === Math.min(guesses.length + 1, maxGuesses);
                    return (
                      <span
                        key={slotNumber}
                        className={`h-3 w-3 rounded-full border ${
                          status === "won" && slotNumber === guesses.length
                            ? "border-green-500 bg-green-500"
                            : status === "lost" && slotNumber === maxGuesses
                              ? "border-red-500 bg-red-500"
                              : isPastGuess
                                ? "border-[color:var(--accent)] bg-[var(--accent)]"
                                : isCurrentGuess
                                  ? "border-[color:var(--foreground)] bg-[var(--surface)]"
                                  : "border-[color:var(--border)] bg-transparent"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)]">
            <div className="panel-card px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Round progress</div>
                <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {remaining} left
                </span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    <span>Attempt pace</span>
                    <span>{attemptsProgress}%</span>
                  </div>
                  <div className="progress-rail mt-1.5">
                    <span className="progress-fill" style={{ width: `${attemptsProgress}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    <span>Reveal depth</span>
                    <span>{clueProgress}%</span>
                  </div>
                  <div className="progress-rail mt-1.5">
                    <span className="progress-fill cool" style={{ width: `${clueProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="metric-card p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Guesses</div>
                <div className="font-display mt-1 text-xl font-semibold text-[var(--foreground)]">
                  {guesses.length}/{maxGuesses}
                </div>
              </div>
              <div className="metric-card p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Clues</div>
                <div className="font-display mt-1 text-xl font-semibold text-[var(--foreground)]">
                  {unlockedCount}/{totalClues}
                </div>
              </div>
            </div>
          </div>

          {message ? (
            <div className={`rounded-[18px] border px-3 py-2 text-sm ${statusTone}`}>{message}</div>
          ) : null}

          <details className="group rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-strong)] px-4 py-4">
            <summary className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Your guesses</div>
                <div className="mt-1 text-sm text-[var(--foreground)]">
                  {guesses.length
                    ? `${guesses.length} submitted so far. Open to review the round history.`
                    : "No guesses yet. This stays tucked away until you need it."}
                </div>
              </div>
              <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {guesses.length} total
              </span>
            </summary>

            {guesses.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {guesses.map((guess, index) => {
                  const correct = isCorrectGuess(game, guess);
                  return (
                    <span
                      key={`${index}-${guess}`}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                        correct
                          ? "border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-200"
                          : "border-[color:var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
                      }`}
                    >
                      {guess}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </details>
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

      {finished && shareInfo ? (
        <section className="app-frame px-4 py-4 md:px-5">
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
