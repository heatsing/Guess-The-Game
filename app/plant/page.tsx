import plants from "@/data/plants.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function PlantPage() {
  const daily = getDailyFromList(plants as Game[]);
  return (
    <ModePage
      modeKey="plant"
      modeLabel="Guess The Plant"
      description="Guess today’s plant from leaves, flowers, and textures. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

