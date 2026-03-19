"use client";

import { useMemo } from "react";

function toPuzzleKeyUTC(date: Date) {
  return date.toISOString().slice(0, 10);
}

type Props = { puzzleKey?: string };

export default function CalendarDateCard({ puzzleKey }: Props) {
  const dateIso = puzzleKey ?? toPuzzleKeyUTC(new Date());

  const prettyDate = useMemo(() => {
    const date = new Date(`${dateIso}T12:00:00.000Z`);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  }, [dateIso]);

  return (
    <div className="metric-card">
      <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Puzzle date</div>
      <div className="font-display mt-2 text-xl font-semibold text-[var(--foreground)]">{dateIso}</div>
      <div className="mt-2 text-sm leading-7 text-[var(--muted)]">{prettyDate} (UTC)</div>
    </div>
  );
}
