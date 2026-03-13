"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";

type Props = {
  disabled?: boolean;
  onSubmitGuess: (guess: string) => void;
  placeholder?: string;
  helperText?: string;
  options?: string[];
  onSkip?: () => void;
};

type Scored = { title: string; score: number };

function fuzzyScore(source: string, query: string): number {
  if (!source || !query) return -Infinity;
  const s = source.toLowerCase();
  const q = query.toLowerCase();
  if (s === q) return 1000;
  if (s.startsWith(q)) return 800;
  const idx = s.indexOf(q);
  if (idx >= 0) return 600 - idx;

  // simple subsequence score
  let score = 0;
  let j = 0;
  for (let i = 0; i < s.length && j < q.length; i++) {
    if (s[i] === q[j]) {
      score += 10;
      j++;
    }
  }
  if (j < q.length) return -Infinity;
  return score;
}

export default function GuessInput({
  disabled,
  onSubmitGuess,
  placeholder = "Type the game title…",
  helperText,
  options,
  onSkip,
}: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const canSubmit = useMemo(() => {
    return !disabled && value.trim().length > 0;
  }, [disabled, value]);

  const suggestions = useMemo(() => {
    if (!options || !value.trim()) return [] as Scored[];
    const scored: Scored[] = options.map((t) => ({
      title: t,
      score: fuzzyScore(t, value),
    }));
    return scored
      .filter((s) => s.score > -Infinity)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [options, value]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const g = value.trim();
    setValue("");
    setOpen(false);
    setHighlightIndex(-1);
    onSubmitGuess(g);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => {
        const next = prev + 1;
        return next >= suggestions.length ? 0 : next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? suggestions.length - 1 : next;
      });
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        e.preventDefault();
        const chosen = suggestions[highlightIndex]!.title;
        setValue(chosen);
        setOpen(false);
        setHighlightIndex(-1);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setHighlightIndex(-1);
    }
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <div className="text-sm font-medium text-slate-900 dark:text-white">Your guess</div>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <div className="relative w-full">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
              setHighlightIndex(-1);
            }}
            onFocus={() => {
              if (value.trim()) setOpen(true);
            }}
            onBlur={() => {
              // 简单延迟，允许点击下拉选项
              setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 dark:disabled:bg-slate-800"
            placeholder={placeholder}
          />
          {open && suggestions.length > 0 && (
            <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-lg dark:border-slate-600 dark:bg-slate-800">
              {suggestions.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-left ${
                    index === highlightIndex ? "bg-slate-100 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setValue(item.title);
                    setOpen(false);
                    setHighlightIndex(-1);
                  }}
                >
                  <span className="truncate text-slate-800 dark:text-slate-100">{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row">
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              Skip (unlock clue)
            </button>
          )}
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit
          </button>
        </div>
      </form>
      {helperText ? <div className="mt-2 text-xs text-slate-800 dark:text-slate-200">{helperText}</div> : null}
    </section>
  );
}

