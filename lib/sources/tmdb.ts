import type { Game } from "@/lib/gameTypes";
import { getCached, setCached } from "@/lib/sources/fetcher";

const apiKey = process.env.TMDB_API_KEY;
const base = "https://api.themoviedb.org/3";
const img = "https://image.tmdb.org/t/p";

async function tmdbFetch<T>(path: string): Promise<T> {
  if (!apiKey) throw new Error("TMDB_API_KEY not set");
  const url = new URL(`${base}${path}`);
  url.searchParams.set("api_key", apiKey);
  const res = await fetch(url.toString(), { headers: { "User-Agent": "GuessTheGame/1.0" } });
  if (!res.ok) throw new Error(`TMDB HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchPopularMovies(count = 30): Promise<Game[]> {
  const cacheKey = `tmdb_popular_${count}`;
  const cached = getCached<Game[]>(cacheKey);
  if (cached) return cached;
  if (!apiKey) return getDemoMovies();

  try {
    const data = await tmdbFetch<{ results: Array<{ id: number; title: string; poster_path: string | null }> }>(
      "/movie/popular"
    );
    const games: Game[] = (data.results ?? []).slice(0, count).map((m) => ({
      id: `tmdb-${m.id}`,
      slug: String(m.id),
      title: m.title,
      acceptableAnswers: [m.title],
      images: m.poster_path ? Array(6).fill(`${img}/w500${m.poster_path}`) : [],
    }));
    const valid = games.filter((g) => g.images.length > 0);
    setCached(cacheKey, valid);
    return valid.length ? valid : getDemoMovies();
  } catch {
    return getDemoMovies();
  }
}

export function getDemoMovies(): Game[] {
  return [
    {
      id: "demo-inception",
      slug: "inception",
      title: "Inception",
      acceptableAnswers: ["inception", "盗梦空间"],
      images: Array(6).fill("/images/placeholder.svg"),
    },
  ];
}

