import type { Game } from "@/lib/gameTypes";
import { fetchPopularGames, getDemoGames } from "@/lib/sources/rawg";
import { fetchPopularMovies, getDemoMovies } from "@/lib/sources/tmdb";
import { fetchPopularBooks, getDemoBooks } from "@/lib/sources/openlibrary";
import { searchAnimals, searchPlants, getDemoAnimals, getDemoPlants } from "@/lib/sources/wikipedia";

export type SourceStatus = "api" | "demo" | "local" | "error";

export async function getGamesForMode(mode: string): Promise<{ games: Game[]; status: SourceStatus }> {
  try {
    switch (mode) {
      case "game": {
        const games = await fetchPopularGames(40);
        return { games, status: games[0]?.id.startsWith("demo-") ? "demo" : "api" };
      }
      case "movie": {
        const games = await fetchPopularMovies(30);
        return { games, status: games[0]?.id.startsWith("demo-") ? "demo" : "api" };
      }
      case "book": {
        const games = await fetchPopularBooks(30);
        return { games, status: games[0]?.id.startsWith("demo-") ? "demo" : "api" };
      }
      case "animal": {
        const games = await searchAnimals(30);
        return { games, status: games[0]?.id.startsWith("demo-") ? "demo" : "api" };
      }
      case "plant": {
        const games = await searchPlants(30);
        return { games, status: games[0]?.id.startsWith("demo-") ? "demo" : "api" };
      }
      default:
        return { games: [], status: "local" };
    }
  } catch {
    switch (mode) {
      case "game":
        return { games: getDemoGames(), status: "error" };
      case "movie":
        return { games: getDemoMovies(), status: "error" };
      case "book":
        return { games: getDemoBooks(), status: "error" };
      case "animal":
        return { games: getDemoAnimals(), status: "error" };
      case "plant":
        return { games: getDemoPlants(), status: "error" };
      default:
        return { games: [], status: "local" };
    }
  }
}

