import animals from "@/data/animals.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function AnimalPage() {
  const daily = getDailyFromList(animals as Game[]);
  return (
    <ModePage
      modeKey="animal"
      modeLabel="Guess The Animal"
      description="Guess today’s animal from close-ups and silhouettes. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

