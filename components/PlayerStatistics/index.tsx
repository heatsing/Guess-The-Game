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
  best: number | null; // fewest guesses to win
  currentStreak: number;
  maxStreak: number;
};

function parseState(raw: string): StoredState | null {
  try {
    const s = JSON.parse(raw) as StoredState;
    if (!s || typeof s !== "object") return null;
    if (typeof s.puzzleKey !== "string") return null;
    if (!Array.isArray(s.guesses)) return null;
    if (s.status !== "playing" && s.status !== "won" && s.status !== "lost") return null;
    return s;
  } catch {
    return null;
  }
}

function isDateKey(k: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(k);
}

function addDaysUTC(isoDate: string, delta: number) {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

function calcStreaks(sorted: StoredState[]): { current: number; max: number } {
  const byDate = new Map<string, StoredState>();
  for (const s of sorted) {
    if (isDateKey(s.puzzleKey)) byDate.set(s.puzzleKey, s);
  }

  const dates = Array.from(byDate.keys()).sort();
  let maxStreak = 0;
  let cur = 0;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]!;
    const state = byDate.get(date)!;

    if (state.status !== "won") {
      cur = 0;
      continue;
    }

    if (i === 0) {
      cur = 1;
    } else {
      const prev = dates[i - 1]!;
      const expected = addDaysUTC(prev, 1);
      cur = date === expected ? cur + 1 : 1;
    }

    if (cur > maxStreak) maxStreak = cur;
  }

  // current streak: walk backwards from today UTC
  const today = new Date().toISOString().slice(0, 10);
  let current = 0;
  for (let i = 0; ; i++) {
    const d = addDaysUTC(today, -i);
    const s = byDate.get(d);
    if (!s || s.status !== "won") break;
    current++;
  }

  return { current, max: maxStreak };
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
      const list: StoredState[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith(prefix)) continue;
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const s = parseState(raw);
        if (!s) continue;
        list.push(s);
      }
      setStates(list);
    } catch {
      setStates([]);
    }
  }, [namespace, refreshTrigger]);

  useEffect(() => {
    const handler = (e: CustomEvent<{ namespace: string }>) => {
      if (e.detail?.namespace === namespace) setRefreshTrigger((t) => t + 1);
    };
    window.addEventListener(STATS_UPDATE_EVENT, handler as EventListener);
    return () => window.removeEventListener(STATS_UPDATE_EVENT, handler as EventListener);
  }, [namespace]);

  const stats = useMemo<Stats>(() => {
    const finished = states.filter((s) => s.status === "won" || s.status === "lost");
    const played = finished.length;
    const wins = finished.filter((s) => s.status === "won").length;
    const losses = finished.filter((s) => s.status === "lost").length;
    const winRate = played ? Math.round((wins / played) * 100) : 0;
    const bestWin = finished
      .filter((s) => s.status === "won")
      .map((s) => s.guesses.length)
      .sort((a, b) => a - b)[0];

    const sorted = [...finished].sort((a, b) => a.puzzleKey.localeCompare(b.puzzleKey));
    const { current, max } = calcStreaks(sorted);

    return {
      played,
      wins,
      losses,
      winRate,
      best: typeof bestWin === "number" ? bestWin : null,
      currentStreak: current,
      maxStreak: max,
    };
  }, [states]);

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Player Statistics</div>
          <div className="mt-1 text-xs text-slate-700 dark:text-slate-200">Saved on this device (per mode).</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
          <div className="text-xs text-slate-700 dark:text-slate-200">Played</div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.played}</div>
        </div>
        <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
          <div className="text-xs text-slate-700 dark:text-slate-200">Win rate</div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.winRate}%</div>
        </div>
        <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
          <div className="text-xs text-slate-700 dark:text-slate-200">Best win</div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.best ?? "—"}</div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
          <div className="text-xs text-slate-700 dark:text-slate-200">Current streak</div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.currentStreak}</div>
        </div>
        <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
          <div className="text-xs text-slate-700 dark:text-slate-200">Max streak</div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stats.maxStreak}</div>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-800 dark:text-slate-200">
        Wins: <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.wins}</span> · Losses:{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.losses}</span>
      </div>
    </section>
  );
}

