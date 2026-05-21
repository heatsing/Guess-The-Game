import type { Metadata } from "next";
import Link from "next/link";
import { MODES } from "@/lib/modes";
import { buildMetadata } from "@/lib/site";
import { buildHomePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "GuessTheGame: Daily image puzzle",
  description:
    "Play the daily GuessTheGame challenge and explore games, books, movies, logos, and more through six image clues and clear answer rules.",
  path: "/",
  keywords: ["daily game", "guessing game", "visual puzzle", "trivia game"],
  siteNameInTitle: true,
});

const ROUND_STEPS = [
  {
    step: "1",
    title: "Start with the toughest clue",
    text: "Every round opens on the least revealing image so early recognition always matters.",
  },
  {
    step: "2",
    title: "Submit only when you want to",
    text: "A wrong guess opens the next clue, so every attempt trades certainty for pressure.",
  },
  {
    step: "3",
    title: "Return for the reset",
    text: "Every mode refreshes daily at 00:00 UTC with local streaks saved on this device.",
  },
];

const HIGHLIGHTS = [
  {
    label: "12 daily modes",
    value: "Games, books, movies, logos, and more",
  },
  {
    label: "6 clues max",
    value: "A short round with real pacing",
  },
  {
    label: "00:00 UTC reset",
    value: "One new puzzle every day",
  },
];

export default function HomePage() {
  const homeJsonLd = buildHomePageJsonLd(MODES);

  return (
    <main id="main-content" className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <section className="app-frame overflow-hidden px-6 py-8 text-center md:px-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="section-eyebrow">Daily visual puzzle</div>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-6xl">
            Guess the answer from six image clues.
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
            GuessTheGame keeps the loop simple: open the clue, submit when you are ready, and only
            reveal more when you need it. Each mode follows the same calm interface, daily reset,
            and accepted-answer system.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/game" className="primary-button">
              Play Guess The Game
            </Link>
            <a href="#modes" className="secondary-button">
              Browse all modes
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="metric-card text-left">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{item.label}</div>
              <div className="mt-3 text-lg font-extrabold text-[var(--foreground)]">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="panel-card-strong px-6 py-7">
          <div className="section-eyebrow">Start here</div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Guess The Game
          </div>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            The core mode is still the clearest entry point: a hidden video game, a stack of clues
            that gets easier over time, and enough tension to make early guesses feel rewarding.
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
          <div className="section-eyebrow">How a round works</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Quick to learn, easy to scan
          </h2>
          <div className="mt-6 space-y-3">
            {ROUND_STEPS.map((item) => (
              <article key={item.step} className="metric-card">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-[var(--accent-soft)] text-lg font-extrabold text-black">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modes" className="app-frame px-6 py-8 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-eyebrow">Choose a category</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
            Same interface, different daily subjects
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Move between games, books, movies, logos, prices, and more without relearning the
            rules. The layout stays consistent so the clue itself remains the focus.
          </p>
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
