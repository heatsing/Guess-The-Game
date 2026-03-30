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

  return (
    <main className="space-y-8">
      <section className="app-frame px-6 py-8 text-center md:px-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.22em] text-black">
            {mode?.badge ?? "GT"}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
            {modeLabel}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-[var(--muted)]">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Puzzle date</div>
            <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">{daily.puzzleKey}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Max guesses</div>
            <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">{daily.maxGuesses}</div>
          </div>
          <div className="metric-card">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Clues</div>
            <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
              {Math.max(1, daily.images.length || 6)}
            </div>
          </div>
        </div>
      </section>

      <GameBoard
        game={daily}
        modeLabel={modeLabel}
        storageNamespace={modeKey}
        titles={titles}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="panel-card px-6 py-7">
          <div className="section-eyebrow">How to play</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {howToPlay.title}
          </h2>
          <div className="mt-6 space-y-4">
            {howToPlay.steps.map((step, index) => (
              <div key={index} className="metric-card">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-[var(--accent-soft)] text-lg font-extrabold text-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-[var(--muted)]">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card px-6 py-7">
          <div className="section-eyebrow">Rules and timing</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Know the round before you start
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{rules}</p>

          <div className="mt-6 grid gap-3">
            <CalendarDateCard puzzleKey={daily.puzzleKey} />
            <NextGameCountdown />
          </div>
        </section>
      </section>

      <PlayerStatistics namespace={modeKey} />

      <section className="app-frame px-6 py-8 md:px-8">
        <div className="text-center">
          <div className="section-eyebrow">Play other games</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            More daily puzzle modes
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {otherModes.map((item) => (
            <Link key={item.key} href={item.href} className="panel-card px-5 py-6 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-[var(--accent-cool-soft)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--foreground)]">
                  {item.badge}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Open
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
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
