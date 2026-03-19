import Link from "next/link";
import { MODES } from "@/lib/modes";

const HIGHLIGHTS = [
  {
    title: "One clear loop",
    description: "Study the clue, commit a guess, and choose whether the next reveal is worth it.",
  },
  {
    title: "Built for streaks",
    description: "Every mode resets daily, so the habit stays lightweight and easy to revisit.",
  },
  {
    title: "Twelve ways to play",
    description: "Games, books, movies, prices, animals, numbers, and more all share the same core rhythm.",
  },
];

const QUICK_STATS = [
  { label: "Modes", value: String(MODES.length) },
  { label: "Clues per round", value: "Up to 6" },
  { label: "Reset", value: "00:00 UTC" },
];

const LOOP_STEPS = [
  {
    index: "01",
    title: "Read the visual",
    description: "Open with the hardest clue and see if pattern recognition is enough.",
  },
  {
    index: "02",
    title: "Lock your guess",
    description: "Autocomplete keeps inputs fast, especially when you know the answer but not the exact title format.",
  },
  {
    index: "03",
    title: "Spend another reveal",
    description: "Each miss or manual reveal trades certainty for a lower final score.",
  },
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="app-frame px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="section-eyebrow">Daily challenge platform</div>
            <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
              Guess faster. Reveal less. Keep the streak alive.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
              A sharper home for daily visual puzzles. Every mode keeps the same satisfying loop:
              inspect the clue, commit a guess, and decide whether to burn another reveal.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/game" className="primary-button">
                Play today's challenge
              </Link>
              <a href="#mode-grid" className="secondary-button">
                Browse all modes
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {QUICK_STATS.map((item) => (
                <div key={item.label} className="metric-card">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {item.label}
                  </div>
                  <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card-strong p-6">
            <div className="section-eyebrow">The daily loop</div>
            <div className="mt-5 grid gap-3">
              {LOOP_STEPS.map((step) => (
                <div key={step.index} className="metric-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl font-semibold text-[var(--foreground)]">
                      {step.title}
                    </span>
                    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
                      {step.index}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {HIGHLIGHTS.map((item, index) => (
          <article key={item.title} className="panel-card p-6">
            <div className="section-eyebrow">0{index + 1}</div>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
          </article>
        ))}
      </section>

      <section id="mode-grid" className="app-frame px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="section-eyebrow">Choose your arena</div>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
              One interface. Twelve different puzzle moods.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
              Every mode keeps the same clean guess flow, but the clue language changes completely.
            </p>
          </div>
          <Link href="/game" className="secondary-button">
            Start with the main mode
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODES.map((mode) => (
            <Link
              href={mode.href}
              key={mode.key}
              className="panel-card-strong p-6 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]">
                  {mode.badge}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Open
                </span>
              </div>
              <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {mode.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{mode.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
