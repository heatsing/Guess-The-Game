import Link from "next/link";
import { MODES } from "@/lib/modes";

const HOW_TO_PLAY = [
  {
    step: "1",
    title: "Open the first clue",
    text: "Start with the hardest image. If you already know it, submit early and protect your score.",
  },
  {
    step: "2",
    title: "Guess the answer",
    text: "Type the title and submit. Wrong guesses unlock the next, clearer clue in the stack.",
  },
  {
    step: "3",
    title: "Come back tomorrow",
    text: "Every mode refreshes daily at 00:00 UTC, so there is always another round waiting.",
  },
];

const FEATURES = [
  "One shared interface across all modes",
  "Up to 6 clues and 6 guesses per round",
  "Local streaks and results on this device",
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="app-frame px-6 py-8 text-center md:px-10 md:py-10">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
          Guess the game from image clues.
        </h1>
        <h2 className="mx-auto mt-4 max-w-4xl text-lg font-semibold leading-8 text-[var(--muted)] md:text-xl">
          GuessTheGame is a free daily puzzle. Study the clue, submit your guess, and reveal the
          next image only when you need it.
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/game" className="primary-button">
            Play Guess The Game
          </Link>
          <a href="#how-to-play" className="secondary-button">
            How to play
          </a>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature} className="metric-card text-sm font-bold text-[var(--foreground)]">
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-card-strong px-6 py-7">
          <div className="section-eyebrow">Today's featured mode</div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Guess The Game
          </div>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Start with a blurred or cropped clue and see whether you can recognize the game before
            the later reveals make it obvious.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/game" className="primary-button">
              Play today's challenge
            </Link>
            <Link href="/price" className="secondary-button">
              Try Guess The Price
            </Link>
          </div>
        </div>

        <div className="panel-card px-6 py-7">
          <div className="section-eyebrow">Quick facts</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Modes</div>
              <div className="mt-2 text-3xl font-extrabold text-[var(--foreground)]">{MODES.length}</div>
            </div>
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Daily reset</div>
              <div className="mt-2 text-3xl font-extrabold text-[var(--foreground)]">00:00 UTC</div>
            </div>
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Clue stack</div>
              <div className="mt-2 text-3xl font-extrabold text-[var(--foreground)]">Up to 6</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-to-play" className="app-frame px-6 py-8 md:px-8">
        <div className="text-center">
          <div className="section-eyebrow">How to play GuessTheGame</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
            A simple loop with just enough tension
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOW_TO_PLAY.map((item) => (
            <article key={item.step} className="panel-card px-5 py-6 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-black bg-[var(--accent-soft)] text-xl font-extrabold text-black">
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-frame px-6 py-8 md:px-8">
        <div className="text-center">
          <div className="section-eyebrow">Play other games</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
            More daily categories, same clean rules
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODES.map((mode) => (
            <Link key={mode.key} href={mode.href} className="panel-card px-5 py-6 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-black">
                  {mode.badge}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Open
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
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
