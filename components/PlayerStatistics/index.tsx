"use client";

import { useEffect, useMemo, useState } from "react";

type StoredState = {
  puzzleKey: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
};

type Stats = {
  played: number;
  wins: number;
  losses: number;
  winRate: number;
  best: number | null;
  currentStreak: number;
  maxStreak: number;
};

function parseState(raw: string): StoredState | null {
  try {
    const parsed = JSON.parse(raw) as StoredState;
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.puzzleKey !== "string") return null;
    if (!Array.isArray(parsed.guesses)) return null;
    if (!["playing", "won", "lost"].includes(parsed.status)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isDateKey(key: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(key);
}

function addDaysUTC(isoDate: string, delta: number) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

function calcStreaks(sorted: StoredState[]) {
  const byDate = new Map<string, StoredState>();
  for (const state of sorted) {
    if (isDateKey(state.puzzleKey)) byDate.set(state.puzzleKey, state);
  }

  const dates = Array.from(byDate.keys()).sort();
  let currentSequence = 0;
  let maxStreak = 0;

  for (let index = 0; index < dates.length; index++) {
    const date = dates[index]!;
    const state = byDate.get(date)!;

    if (state.status !== "won") {
      currentSequence = 0;
      continue;
    }

    if (index === 0) {
      currentSequence = 1;
    } else {
      const previousDate = dates[index - 1]!;
      currentSequence = date === addDaysUTC(previousDate, 1) ? currentSequence + 1 : 1;
    }

    if (currentSequence > maxStreak) maxStreak = currentSequence;
  }

  const today = new Date().toISOString().slice(0, 10);
  let currentStreak = 0;
  for (let offset = 0; ; offset++) {
    const date = addDaysUTC(today, -offset);
    const state = byDate.get(date);
    if (!state || state.status !== "won") break;
    currentStreak++;
  }

  return { currentStreak, maxStreak };
}

const STATS_UPDATE_EVENT = "gtg:stats-update";

export function dispatchStatsUpdate(namespace: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STATS_UPDATE_EVENT, { detail: { namespace } }));
  }
}

export default function PlayerStatistics({ namespace }: { namespace: string }) {
  const [states, setStates] = useState<StoredState[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    try {
      const prefix = `gtg:v2:${namespace}:`;
      const collected: StoredState[] = [];

      for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (!key || !key.startsWith(prefix)) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = parseState(raw);
        if (!parsed) continue;
        collected.push(parsed);
      }

      setStates(collected);
    } catch {
      setStates([]);
    }
  }, [namespace, refreshTrigger]);

  useEffect(() => {
    const handler = (event: CustomEvent<{ namespace: string }>) => {
      if (event.detail?.namespace === namespace) {
        setRefreshTrigger((current) => current + 1);
      }
    };

    window.addEventListener(STATS_UPDATE_EVENT, handler as EventListener);
    return () => window.removeEventListener(STATS_UPDATE_EVENT, handler as EventListener);
  }, [namespace]);

  const stats = useMemo<Stats>(() => {
    const finished = states.filter((state) => state.status === "won" || state.status === "lost");
    const played = finished.length;
    const wins = finished.filter((state) => state.status === "won").length;
    const losses = finished.filter((state) => state.status === "lost").length;
    const winRate = played ? Math.round((wins / played) * 100) : 0;
    const bestWin = finished
      .filter((state) => state.status === "won")
      .map((state) => state.guesses.length)
      .sort((left, right) => left - right)[0];
    const sorted = [...finished].sort((left, right) => left.puzzleKey.localeCompare(right.puzzleKey));
    const { currentStreak, maxStreak } = calcStreaks(sorted);

    return {
      played,
      wins,
      losses,
      winRate,
      best: typeof bestWin === "number" ? bestWin : null,
      currentStreak,
      maxStreak,
    };
  }, [states]);

  const winShare = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;
  const lossShare = stats.played ? Math.round((stats.losses / stats.played) * 100) : 0;

  return (
    <section className="app-frame px-5 py-6 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="section-eyebrow">Player statistics</div>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Your device, your streaks
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            Saved locally per mode. Nothing here depends on an account.
          </p>
        </div>
        <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {namespace}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Played</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.played}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Win rate</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.winRate}%
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Best win</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.best ?? "-"}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Current streak</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.currentStreak}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Max streak</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.maxStreak}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Win / loss</div>
          <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {stats.wins} / {stats.losses}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="panel-card-strong p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Result split</div>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-[var(--foreground)]">
                <span>Wins</span>
                <span>{winShare}%</span>
              </div>
              <div className="progress-rail mt-2">
                <span className="progress-fill cool" style={{ width: `${winShare}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-[var(--foreground)]">
                <span>Losses</span>
                <span>{lossShare}%</span>
              </div>
              <div className="progress-rail mt-2">
                <span className="progress-fill" style={{ width: `${lossShare}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="panel-card-strong p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Reading guide</div>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            A higher win rate usually means you are solving earlier in the clue stack. The best
            win metric shows your fewest guesses needed on a successful round.
          </p>
        </div>
      </div>
    </section>
  );
}
