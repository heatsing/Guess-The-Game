import books from "@/data/books.json";
import { getDailyFromList } from "@/lib/daily";
import type { Game } from "@/lib/gameTypes";
import ModePage from "@/components/ModePage";

export default function BookPage() {
  const daily = getDailyFromList(books as Game[]);
  return (
    <ModePage
      modeKey="book"
      modeLabel="Guess The Book"
      description="Guess today’s book from a sequence of images. Wrong guesses unlock more clues."
      daily={daily}
    />
  );
}

