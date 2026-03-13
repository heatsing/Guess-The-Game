"use client";

import { useMemo } from "react";

function toPuzzleKeyUTC(d: Date) {
  return d.toISOString().slice(0, 10);
}

type Props = { puzzleKey?: string };

export default function CalendarDateCard({ puzzleKey }: Props) {
  const dateIso = puzzleKey ?? toPuzzleKeyUTC(new Date());

  const pretty = useMemo(() => {
    const d = new Date(`${dateIso}T12:00:00.000Z`);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(d);
  }, [dateIso]);

  return (
    <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
      <div className="text-xs text-slate-700 dark:text-slate-200">Puzzle date (UTC)</div>
      <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{dateIso}</div>
      <div className="mt-1 text-xs text-slate-700 dark:text-slate-200">{pretty}</div>
    </div>
  );
}

