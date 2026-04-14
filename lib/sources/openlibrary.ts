import type { Game } from "@/lib/gameTypes";
import { getCached, setCached } from "@/lib/sources/fetcher";

const coverBase = "https://covers.openlibrary.org/b/id";

export async function fetchPopularBooks(count = 30): Promise<Game[]> {
  const cacheKey = `openlibrary_books_${count}`;
  const cached = getCached<Game[]>(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://openlibrary.org/search.json?q=subject:fiction&limit=${count}&fields=key,title,cover_i`;
    const res = await fetch(url, { headers: { "User-Agent": "GuessTheGame/1.0" } });
    if (!res.ok) throw new Error(`OpenLibrary HTTP ${res.status}`);
    const data = (await res.json()) as { docs?: Array<{ key: string; title: string; cover_i?: number }> };
    const games: Game[] = (data.docs ?? [])
      .map((d) => ({
        id: `ol-${d.key.replace("/works/", "")}`,
        slug: d.key,
        title: d.title,
        acceptableAnswers: [d.title],
        images: d.cover_i ? Array(6).fill(`${coverBase}/${d.cover_i}-L.jpg`) : [],
      }))
      .filter((g) => g.images.length > 0);
    setCached(cacheKey, games);
    return games.length ? games : getDemoBooks();
  } catch {
    return getDemoBooks();
  }
}

export function getDemoBooks(): Game[] {
  return [
    {
      id: "demo-harry-potter",
      slug: "harry-potter",
      title: "Harry Potter and the Philosopher's Stone",
      acceptableAnswers: ["harry potter", "哈利波特"],
      images: Array(6).fill("/images/placeholder.svg"),
    },
  ];
}

