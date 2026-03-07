import songs from "@/data/songs.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function SongPage() {
  const daily = getDailyFromList(songs as Game[]);
  return (
    <ModePage
      modeKey="song"
      modeLabel="Guess The Song"
      description="Guess today’s song from a sequence of image clues. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

