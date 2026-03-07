import logos from "@/data/logos.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function LogoPage() {
  const daily = getDailyFromList(logos as Game[]);
  return (
    <ModePage
      modeKey="logo"
      modeLabel="Guess The Logo"
      description="Guess today’s logo from a sequence of images. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

