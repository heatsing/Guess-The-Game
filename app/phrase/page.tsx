import phrases from "@/data/phrases.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function PhrasePage() {
  const daily = getDailyFromList(phrases as Game[]);
  return (
    <ModePage
      modeKey="phrase"
      modeLabel="Guess The Phrase"
      description="Solve today’s visual puzzle and guess the phrase. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

