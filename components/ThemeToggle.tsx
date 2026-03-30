"use client";

import { useEffect, useState } from "react";

function getPreferredTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      const next = getPreferredTheme();
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    syncTheme();
    media.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      media.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const isDark = theme === "dark";

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-3 rounded-xl border-2 border-black bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] dark:border-[color:var(--border-strong)]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">
        Theme
      </span>
      <span className="relative h-6 w-11 rounded-full bg-[var(--accent-soft)]">
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--foreground)] transition-transform ${
            isDark ? "translate-x-[1.35rem]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="text-sm font-extrabold">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
