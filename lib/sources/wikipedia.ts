import type { Game } from "@/lib/gameTypes";

async function getWikiThumb(title: string): Promise<string> {
  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");
  url.searchParams.set("prop", "pageimages");
  url.searchParams.set("pithumbsize", "500");
  url.searchParams.set("titles", title);

  try {
    const res = await fetch(url.toString(), { headers: { "User-Agent": "GuessTheGame/1.0" } });
    if (!res.ok) return "";
    const data = (await res.json()) as { query?: { pages?: Record<string, { thumbnail?: { source?: string } }> } };
    const page = data.query?.pages ? Object.values(data.query.pages)[0] : undefined;
    return page?.thumbnail?.source ?? "";
  } catch {
    return "";
  }
}

async function toGames(names: string[]): Promise<Game[]> {
  const out: Game[] = [];
  for (const name of names) {
    const image = await getWikiThumb(name);
    if (!image) continue;
    out.push({
      id: `wiki-${name.toLowerCase().replace(/\s+/g, "-")}`,
      slug: name.toLowerCase().replace(/\s+/g, "_"),
      title: name,
      acceptableAnswers: [name],
      images: Array(6).fill(image),
    });
  }
  return out;
}

export async function searchAnimals(count = 30): Promise<Game[]> {
  const names = ["African Elephant", "Bengal Tiger", "Blue Whale", "Giraffe", "Zebra"].slice(0, count);
  const games = await toGames(names);
  return games.length ? games : getDemoAnimals();
}

export async function searchPlants(count = 30): Promise<Game[]> {
  const names = ["Sunflower", "Rose", "Bamboo", "Tulip", "Orchid"].slice(0, count);
  const games = await toGames(names);
  return games.length ? games : getDemoPlants();
}

export function getDemoAnimals(): Game[] {
  return [
    { id: "demo-elephant", slug: "elephant", title: "African Elephant", acceptableAnswers: ["african elephant"], images: Array(6).fill("/images/placeholder.svg") },
  ];
}

export function getDemoPlants(): Game[] {
  return [
    { id: "demo-sunflower", slug: "sunflower", title: "Sunflower", acceptableAnswers: ["sunflower", "向日葵"], images: Array(6).fill("/images/placeholder.svg") },
  ];
}

