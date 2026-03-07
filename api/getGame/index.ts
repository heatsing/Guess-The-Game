import games from "@/data/games.json";
import type { Game, DailyGame } from "@/lib/gameTypes";
import { getDailyFromList } from "@/lib/daily";
export { normalizeAnswer } from "@/lib/gameTypes";

export function getDailyGame(date = new Date()): DailyGame {
  const list = games as Game[];
  if (!list.length) {
    throw new Error("data/games.json 为空：请先在里面添加至少 1 个游戏。");
  }

  return getDailyFromList(list, date);
}

export function getGameById(id: string): Game | undefined {
  const list = games as Game[];
  return list.find((g) => g.id === id);
}

