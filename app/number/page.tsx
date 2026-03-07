import numbers from "@/data/numbers.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function NumberPage() {
  const daily = getDailyFromList(numbers as Game[]);
  return (
    <ModePage
      modeKey="number"
      modeLabel="Guess The Number"
      description="Use hints and clues to guess today’s secret number. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

