import Link from "next/link";
import type { DailyGame } from "@/lib/gameTypes";
import GameBoard from "@/components/GameBoard";
import PlayerStatistics from "@/components/PlayerStatistics";
import CalendarDateCard from "@/components/CalendarDateCard";
import NextGameCountdown from "@/components/NextGameCountdown";
import { MODES } from "@/lib/modes";
import { GAME_RULES } from "@/lib/gameRules";
import { HOW_TO_PLAY } from "@/lib/howToPlay";
import { getTitlesForModeSmart } from "@/lib/getDailyForMode";

type Props = {
  modeKey: string;
  modeLabel: string;
  description: string;
  daily: DailyGame;
};

export default async function ModePage({ modeKey, modeLabel, description, daily }: Props) {
  const titles = await getTitlesForModeSmart(modeKey);
  const mode = MODES.find((item) => item.key === modeKey);
  const otherModes = MODES.filter((item) => item.key !== modeKey);
  const howToPlay = HOW_TO_PLAY[modeKey] ?? HOW_TO_PLAY.game;
  const rules = GAME_RULES[modeKey] ?? GAME_RULES.game;
  const clueCount = Math.max(1, daily.images.length || 6);

  return (
    <main className="space-y-8">
      <section className="app-frame px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]">
              {mode?.badge ?? "GT"}
            </span>
            <div className="section-eyebrow mt-5">Today's mode</div>
            <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl">
              {modeLabel}
            </h1>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Puzzle key</div>
              <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {daily.puzzleKey}
              </div>
            </div>
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Clues</div>
              <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {clueCount}
              </div>
            </div>
            <div className="metric-card">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Max guesses</div>
              <div className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {daily.maxGuesses}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.18fr_0.82fr]">
        <section className="space-y-6">
          <GameBoard
            game={daily}
            modeLabel={modeLabel}
            storageNamespace={modeKey}
            titles={titles}
          />
          <PlayerStatistics namespace={modeKey} />
        </section>

        <aside className="space-y-6">
          <section className="panel-card p-6">
            <div className="section-eyebrow">Rules</div>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              How this round scores
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{rules}</p>
          </section>

          <section className="panel-card p-6">
            <div className="section-eyebrow">How to play</div>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {howToPlay.title}
            </h2>
            <ol className="mt-4 space-y-4">
              {howToPlay.steps.map((step, index) => (
                <li key={index} className="metric-card">
                  <div className="flex items-start gap-3">
                    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[var(--muted)]">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="panel-card p-6">
            <div className="section-eyebrow">Daily setup</div>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Round timing and metadata
            </h2>
            <div className="mt-4 grid gap-3">
              <CalendarDateCard puzzleKey={daily.puzzleKey} />
              <NextGameCountdown />
            </div>
          </section>
        </aside>
      </div>

      <section className="app-frame px-6 py-8 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="section-eyebrow">More games</div>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              Same flow, different clue language
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Jump between modes without relearning the interface.
            </p>
          </div>
          <Link href="/" className="secondary-button">
            Back to mode overview
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {otherModes.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="panel-card-strong p-6 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[var(--accent-cool-soft)] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]">
                  {item.badge}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Open
                </span>
              </div>
              <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
