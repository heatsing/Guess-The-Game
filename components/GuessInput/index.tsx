"use client";

import { FormEvent, KeyboardEvent, useDeferredValue, useMemo, useState } from "react";

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
  if (!source || !query) return Number.NEGATIVE_INFINITY;
  const normalizedSource = source.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (normalizedSource === normalizedQuery) return 1000;
  if (normalizedSource.startsWith(normalizedQuery)) return 800;

  const index = normalizedSource.indexOf(normalizedQuery);
  if (index >= 0) return 600 - index;

  let score = 0;
  let queryIndex = 0;
  for (let i = 0; i < normalizedSource.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedSource[i] === normalizedQuery[queryIndex]) {
      score += 10;
      queryIndex++;
    }
  }

  return queryIndex < normalizedQuery.length ? Number.NEGATIVE_INFINITY : score;
}

export default function GuessInput({
  disabled,
  onSubmitGuess,
  placeholder = "Type your answer",
  helperText,
  options,
  onSkip,
}: Props) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const deferredValue = useDeferredValue(value.trim());
  const canSubmit = !disabled && value.trim().length > 0;

  const suggestions = useMemo(() => {
    if (!options || !deferredValue) return [] as Scored[];

    return options
      .map((title) => ({
        title,
        score: fuzzyScore(title, deferredValue),
      }))
      .filter((item) => item.score > Number.NEGATIVE_INFINITY)
      .sort((left, right) => right.score - left.score)
      .slice(0, 8);
  }, [deferredValue, options]);

  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const guess = value.trim();
    setValue("");
    setOpen(false);
    setHighlightIndex(-1);
    onSubmitGuess(guess);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((current) => (current + 1 >= suggestions.length ? 0 : current + 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((current) => (current - 1 < 0 ? suggestions.length - 1 : current - 1));
      return;
    }

    if (e.key === "Enter" && highlightIndex >= 0 && highlightIndex < suggestions.length) {
      e.preventDefault();
      setValue(suggestions[highlightIndex]!.title);
      setOpen(false);
      setHighlightIndex(-1);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setHighlightIndex(-1);
    }
  }

  const showSuggestions = open && suggestions.length > 0;

  return (
    <section className="app-frame px-4 py-4 md:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="section-eyebrow">Submit your guess</div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Type an answer and press Enter. Arrow keys navigate suggestions.
          </p>
        </div>

        {onSkip ? (
          <button type="button" onClick={onSkip} className="secondary-button">
            Reveal next clue
          </button>
        ) : null}
      </div>

      <form onSubmit={submitForm} className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
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
              setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            className="w-full rounded-[18px] border border-[color:var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-base text-[var(--foreground)] outline-none placeholder:text-slate-400 focus:border-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
          />

          {showSuggestions ? (
            <div
              className="absolute z-20 mt-2 w-full overflow-hidden rounded-[18px] border border-[color:var(--border)] bg-[var(--surface-strong)]"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="border-b border-[color:var(--border)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Top matches
              </div>
              <div className="max-h-72 overflow-auto py-2">
                {suggestions.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setValue(item.title);
                      setOpen(false);
                      setHighlightIndex(-1);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left ${
                      index === highlightIndex ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--surface-muted)]"
                    }`}
                  >
                    <span className="truncate text-sm font-medium text-[var(--foreground)]">
                      {item.title}
                    </span>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Enter
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="primary-button rounded-[18px] px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit guess
        </button>
      </form>

      <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
        <span>Enter to submit</span>
        <span>Arrow keys for suggestions</span>
        {disabled ? <span>Round complete</span> : null}
      </div>

      {helperText ? (
        <div className="mt-3 rounded-[18px] border border-[color:var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)]">
          {helperText}
        </div>
      ) : null}
    </section>
  );
}
