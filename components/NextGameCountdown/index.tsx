"use client";

import { useEffect, useState } from "react";

function getNextUtcMidnight(): Date {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return next;
}

function formatDuration(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function NextGameCountdown() {
  const [remaining, setRemaining] = useState(() => {
    const target = getNextUtcMidnight().getTime();
    return target - Date.now();
  });

  useEffect(() => {
    const id = setInterval(() => {
      const target = getNextUtcMidnight().getTime();
      setRemaining(target - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const text = formatDuration(remaining);

  return (
    <div className="rounded-xl border border-line bg-white px-4 py-3 text-sm dark:border-slate-600 dark:bg-slate-700/50">
      <div className="text-xs text-slate-700 dark:text-slate-200">Next game in (UTC)</div>
      <div className="mt-1 font-semibold tracking-wide text-slate-900 dark:text-white">{text}</div>
    </div>
  );
}

