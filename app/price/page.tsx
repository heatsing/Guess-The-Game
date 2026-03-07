import prices from "@/data/prices.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function PricePage() {
  const daily = getDailyFromList(prices as Game[]);
  return (
    <ModePage
      modeKey="price"
      modeLabel="Guess The Price"
      description="Guess today’s price from a sequence of images. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

