import movies from "@/data/movies.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function MoviePage() {
  const daily = getDailyFromList(movies as Game[]);
  return (
    <ModePage
      modeKey="movie"
      modeLabel="Guess The Movie Name"
      description="Guess today’s movie from a sequence of images. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

