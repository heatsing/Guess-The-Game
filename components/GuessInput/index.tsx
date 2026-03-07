"use client";

import { FormEvent, useMemo, useState } from "react";

type Props = {
  disabled?: boolean;
  onSubmitGuess: (guess: string) => void;
  placeholder?: string;
  helperText?: string;
};

export default function GuessInput({
  disabled,
  onSubmitGuess,
  placeholder = "Type the game title…",
  helperText,
}: Props) {
  const [value, setValue] = useState("");

  const canSubmit = useMemo(() => {
    return !disabled && value.trim().length > 0;
  }, [disabled, value]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const g = value.trim();
    setValue("");
    onSubmitGuess(g);
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <div className="text-sm font-medium text-slate-900 dark:text-white">Your guess</div>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 dark:disabled:bg-slate-800"
          placeholder={placeholder}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Submit
        </button>
      </form>
      {helperText ? <div className="mt-2 text-xs text-slate-800 dark:text-slate-200">{helperText}</div> : null}
    </section>
  );
}

