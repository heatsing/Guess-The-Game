import type { DailyGame } from "@/lib/gameTypes";
import GameBoard from "@/components/GameBoard";
import PlayerStatistics from "@/components/PlayerStatistics";
import { MODES } from "@/lib/modes";
import { GAME_RULES } from "@/lib/gameRules";

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
        <GameBoard game={daily} modeLabel={modeLabel} storageNamespace={modeKey} />
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
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="text-xs text-slate-700 dark:text-slate-200">Puzzle date (UTC)</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{daily.puzzleKey}</div>
          </div>
          <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="text-xs text-slate-700 dark:text-slate-200">Max guesses</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{daily.maxGuesses}</div>
          </div>
          <div className="rounded-xl border border-line bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="text-xs text-slate-700 dark:text-slate-200">Clues</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{Math.max(6, daily.images.length)}</div>
          </div>
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

          {/* TIPS */}
          <section className="mb-20 md:mb-28">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">TIPS</h2>
            <ul className="mt-8 max-w-2xl list-disc space-y-3 pl-5 text-base text-slate-700 md:text-lg dark:text-slate-200">
              <li>Try different spellings, spacing, and common abbreviations.</li>
              <li>Focus on colors, UI elements, icons, and distinctive silhouettes.</li>
              <li>If you’re stuck, take one guess to unlock the next clue quickly.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">FAQ</h2>
            <div className="mt-8 grid gap-4 md:max-w-3xl">
              <details className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm open:shadow-md dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200">
                <summary className="cursor-pointer text-base font-semibold md:text-lg">Why didn’t my answer get accepted?</summary>
                <p className="mt-3 text-sm text-slate-700 md:text-base dark:text-slate-200">
                  Answers are normalized (case/spacing/punctuation). If it still doesn’t match, add it to{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-700 dark:text-slate-200">acceptableAnswers</code> in the corresponding data file.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm open:shadow-md dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200">
                <summary className="cursor-pointer text-base font-semibold md:text-lg">Do my stats sync across devices?</summary>
                <p className="mt-3 text-sm text-slate-700 md:text-base dark:text-slate-200">Not yet. Statistics are stored in your browser on this device.</p>
              </details>
              <details className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm open:shadow-md dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200">
                <summary className="cursor-pointer text-base font-semibold md:text-lg">How does the daily puzzle rotate?</summary>
                <p className="mt-3 text-sm text-slate-700 md:text-base dark:text-slate-200">
                  The game picks an entry based on the current date (UTC) and cycles through your list.
                </p>
              </details>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

