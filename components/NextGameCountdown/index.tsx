"use client";

import { useEffect, useState } from "react";

function getNextUtcMidnight() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
}

function formatDuration(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function NextGameCountdown() {
  const [remaining, setRemaining] = useState(() => getNextUtcMidnight().getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getNextUtcMidnight().getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="metric-card">
      <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Next drop</div>
      <div className="font-display mt-2 text-xl font-semibold text-[var(--foreground)]">
        {formatDuration(remaining)}
      </div>
      <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
        Countdown to the next 00:00 UTC refresh.
      </div>
    </div>
  );
}
