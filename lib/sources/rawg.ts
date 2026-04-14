import type { Game } from "@/lib/gameTypes";
import { getCached, setCached } from "@/lib/sources/fetcher";

const base = "https://api.rawg.io/api";
const apiKey = process.env.RAWG_API_KEY;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "User-Agent": "GuessTheGame/1.0" } });
  if (!res.ok) throw new Error(`RAWG HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchPopularGames(count = 30): Promise<Game[]> {
  const cacheKey = `rawg_popular_${count}`;
  const cached = getCached<Game[]>(cacheKey);
  if (cached) return cached;
  if (!apiKey) return getDemoGames();

  try {
    const url = new URL(`${base}/games`);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("ordering", "-metacritic");
    url.searchParams.set("page_size", String(count));
    const data = await fetchJson<{ results: Array<{ slug: string; name: string; background_image?: string }> }>(
      url.toString()
    );
    const games: Game[] = (data.results ?? []).map((g) => ({
      id: `rawg-${g.slug}`,
      slug: g.slug,
      title: g.name,
      acceptableAnswers: [g.name],
      images: g.background_image ? Array(6).fill(g.background_image) : [],
    }));
    const valid = games.filter((g) => g.images.length > 0);
    setCached(cacheKey, valid);
    return valid.length ? valid : getDemoGames();
  } catch {
    return getDemoGames();
  }
}

export function getDemoGames(): Game[] {
  return [
    {
      id: "demo-hollow-knight",
      slug: "hollow-knight",
      title: "Hollow Knight",
      acceptableAnswers: ["hollowknight", "空洞骑士"],
      images: Array(6).fill("/images/placeholder.svg"),
    },
    {
      id: "demo-celeste",
      slug: "celeste",
      title: "Celeste",
      acceptableAnswers: ["celeste", "蔚蓝"],
      images: Array(6).fill("/images/placeholder.svg"),
    },
  ];
}

