import type { DailyGame } from "@/lib/gameTypes";
import { MODES } from "@/lib/modes";
import { getGamesForMode, getTitlesForModeSmart } from "@/lib/getDailyForMode";
import { buildModePageJsonLd } from "@/lib/structuredData";
import ModeExperience from "@/components/ModeExperience";

type Props = {
  modeKey: string;
  modeLabel: string;
  description: string;
  daily: DailyGame;
};

export default async function ModePage({ modeKey, modeLabel, description, daily }: Props) {
  const titles = await getTitlesForModeSmart(modeKey);
  const challengeGames =
    modeKey === "country" || modeKey === "flag"
      ? getGamesForMode(modeKey).map((game) => ({
          ...game,
          puzzleKey: daily.puzzleKey,
          maxGuesses: daily.maxGuesses,
        }))
      : [];
  const mode = MODES.find((item) => item.key === modeKey);
  const modeJsonLd = mode ? buildModePageJsonLd(mode, description) : null;
  if (!mode) return null;

  return (
    <>
      {modeJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(modeJsonLd) }}
        />
      ) : null}

      <ModeExperience mode={mode} daily={daily} titles={titles} challengeGames={challengeGames} />
    </>
  );
}
