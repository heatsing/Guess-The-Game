import { getDailyGame } from "@/api/getGame";
import ModePage from "@/components/ModePage";

export default function GamePage() {
  const game = getDailyGame();
  return (
    <ModePage
      modeKey="game"
      modeLabel="Guess The Game"
      description="Guess today’s video game from a sequence of images. Wrong guesses unlock more clues."
      daily={game}
    />
  );
}

