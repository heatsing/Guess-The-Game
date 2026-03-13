import type { DailyGame } from "@/lib/gameTypes";
import GameBoard from "@/components/GameBoard";
import PlayerStatistics from "@/components/PlayerStatistics";
import CalendarDateCard from "@/components/CalendarDateCard";
import NextGameCountdown from "@/components/NextGameCountdown";
import { MODES } from "@/lib/modes";
import { GAME_RULES } from "@/lib/gameRules";
import { HOW_TO_PLAY } from "@/lib/howToPlay";
import { getTitlesForMode } from "@/lib/getDailyForMode";

type Props = {
  modeKey: string;
  modeLabel: string;
  description: string;
  daily: DailyGame;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">{children}</h2>;
}

export default function ModePage({ modeKey, modeLabel, description, daily }: Props) {
  const titles = getTitlesForMode(modeKey);

  return (
    <main className="grid gap-4">
      {/* HERO */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">HERO</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{modeLabel}</div>
        <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">{description}</p>
      </section>

      {/* GAME RULES */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <SectionTitle>Game rules</SectionTitle>
        <p className="mt-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {GAME_RULES[modeKey] ?? GAME_RULES.game}
        </p>
      </section>

      {/* GAME BOARD */}
      <section className="rounded-2xl border border-line bg-card p-4 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">GAME BOARD</div>
        <GameBoard game={daily} modeLabel={modeLabel} storageNamespace={modeKey} titles={titles} />
      </section>

      {/* HOW TO PLAY */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <SectionTitle>HOW TO PLAY</SectionTitle>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-800 dark:text-slate-200">
          <li>Start with the first image clue.</li>
          <li>Type your guess and submit.</li>
          <li>Each wrong guess unlocks the next clue.</li>
          <li>You have up to 6 guesses to find the answer.</li>
        </ol>
      </section>

      {/* DAILY CHALLENGE */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <SectionTitle>DAILY CHALLENGE</SectionTitle>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <CalendarDateCard puzzleKey={daily.puzzleKey} />
          <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="text-xs text-slate-700 dark:text-slate-200">Max guesses</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{daily.maxGuesses}</div>
          </div>
          <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="text-xs text-slate-700 dark:text-slate-200">Clues</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{Math.max(1, daily.images.length || 6)}</div>
          </div>
          <NextGameCountdown />
        </div>
      </section>

      {/* PLAYER STATISTICS */}
      <section>
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">PLAYER STATISTICS</div>
        <PlayerStatistics namespace={modeKey} />
      </section>

      {/* Full-width block: MORE GAMES + TIPS + FAQ */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8 bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-slate-800 dark:to-slate-900/90">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
          {/* MORE GAMES */}
          <section className="mb-20 md:mb-28">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">MORE GAMES</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MODES.filter((m) => m.key !== modeKey).map((m) => (
                <a
                  key={m.key}
                  href={m.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-brand/50"
                >
                  <div className="text-base font-semibold text-slate-900 group-hover:text-brand dark:text-white dark:group-hover:text-brand">{m.label}</div>
                  <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">{m.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* HOW TO PLAY */}
          <section className="mb-20 md:mb-28 text-center">
            <h2 className="text-base font-bold text-slate-900 dark:text-white md:text-lg">
              {(HOW_TO_PLAY[modeKey] ?? HOW_TO_PLAY.game).title}
            </h2>
            <ol className="mx-auto mt-6 max-w-2xl list-decimal space-y-4 pl-6 text-left text-sm leading-relaxed text-slate-700 dark:text-slate-200 md:text-base">
              {((HOW_TO_PLAY[modeKey] ?? HOW_TO_PLAY.game).steps as string[]).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}

