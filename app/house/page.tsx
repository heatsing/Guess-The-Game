import houses from "@/data/houses.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function HousePage() {
  const daily = getDailyFromList(houses as Game[]);
  return (
    <ModePage
      modeKey="house"
      modeLabel="Guess The House"
      description="Guess today’s house from a sequence of images. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

