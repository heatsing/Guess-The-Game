import angles from "@/data/angles.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function AnglePage() {
  const daily = getDailyFromList(angles as Game[]);
  return (
    <ModePage
      modeKey="angle"
      modeLabel="Guess The Angle"
      description="Guess today’s item from an unusual angle. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

