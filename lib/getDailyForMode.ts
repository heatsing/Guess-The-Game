import type { Game, DailyGame } from "@/lib/gameTypes";
import { getDailyFromList } from "@/lib/daily";
import { getDailyGame } from "@/api/getGame";

import games from "@/data/games.json";
import books from "@/data/books.json";
import movies from "@/data/movies.json";
import logos from "@/data/logos.json";
import houses from "@/data/houses.json";
import angles from "@/data/angles.json";
import phrases from "@/data/phrases.json";
import songs from "@/data/songs.json";
import animals from "@/data/animals.json";
import plants from "@/data/plants.json";
import numbers from "@/data/numbers.json";
import prices from "@/data/prices.json";

const DATA: Record<string, Game[]> = {
  game: games as Game[],
  book: books as Game[],
  movie: movies as Game[],
  logo: logos as Game[],
  house: houses as Game[],
  angle: angles as Game[],
  phrase: phrases as Game[],
  song: songs as Game[],
  animal: animals as Game[],
  plant: plants as Game[],
  number: numbers as Game[],
  price: prices as Game[],
};

export function getDailyForMode(modeKey: string, date = new Date()): DailyGame {
  if (modeKey === "game") {
    return getDailyGame(date);
  }
  const list = DATA[modeKey];
  if (!list) {
    throw new Error(`Unknown mode: ${modeKey}`);
  }
  return getDailyFromList(list, date);
}

export function isModeKey(key: string): key is keyof typeof DATA {
  return key in DATA;
}
