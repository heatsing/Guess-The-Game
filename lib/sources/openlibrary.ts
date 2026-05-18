import type { Game } from "@/lib/gameTypes";
import { execFileSync } from "node:child_process";
import { getCached, setCached } from "@/lib/sources/fetcher";

const coverBase = "https://covers.openlibrary.org/b/id";

export type OpenLibraryBookDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  cover_edition_key?: string;
  edition_key?: string[];
  first_publish_year?: number;
};

type OpenLibrarySearchResponse = {
  docs?: OpenLibraryBookDoc[];
};

const openLibraryFields = "key,title,author_name,cover_i,cover_edition_key,edition_key,first_publish_year";

async function fetchOpenLibraryJson(url: string): Promise<OpenLibrarySearchResponse> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "GuessTheGame/1.0" } });
    if (!res.ok) throw new Error(`OpenLibrary HTTP ${res.status}`);
    return (await res.json()) as OpenLibrarySearchResponse;
  } catch (error) {
    const fetchError = error instanceof Error ? error : new Error(String(error));
    try {
      const raw = execFileSync("curl.exe", ["-L", "-A", "GuessTheGame/1.0", url], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      return JSON.parse(raw) as OpenLibrarySearchResponse;
    } catch (curlError) {
      const curlMessage = curlError instanceof Error ? curlError.message : String(curlError);
      throw new Error(
        `Unable to reach Open Library. Fetch error: ${fetchError.message}. Curl fallback error: ${curlMessage}`
      );
    }
  }
}

export function getOpenLibraryCoverUrl(doc: OpenLibraryBookDoc): string | null {
  if (typeof doc.cover_i === "number") {
    return `${coverBase}/${doc.cover_i}-L.jpg`;
  }

  if (typeof doc.cover_edition_key === "string" && doc.cover_edition_key.trim()) {
    return `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-L.jpg`;
  }

  if (Array.isArray(doc.edition_key) && typeof doc.edition_key[0] === "string") {
    return `https://covers.openlibrary.org/b/olid/${doc.edition_key[0]}-L.jpg`;
  }

  return null;
}

export function openLibraryDocToGame(
  doc: OpenLibraryBookDoc,
  options: { acceptAuthor?: boolean; imageCount?: number } = {}
): Game | null {
  const imageCount = options.imageCount ?? 6;
  const coverUrl = getOpenLibraryCoverUrl(doc);
  if (!coverUrl) return null;

  const acceptableAnswers =
    options.acceptAuthor && Array.isArray(doc.author_name)
      ? [...new Set(doc.author_name.filter((value): value is string => typeof value === "string" && value.trim().length > 0))]
      : undefined;

  return {
    id: `ol-${doc.key.replace("/works/", "")}`,
    slug: doc.key,
    title: doc.title,
    ...(acceptableAnswers?.length ? { acceptableAnswers } : {}),
    images: Array(imageCount).fill(coverUrl),
  };
}

export async function searchBooksByTitle(
  title: string,
  options: { author?: string; limit?: number } = {}
): Promise<OpenLibraryBookDoc[]> {
  const limit = options.limit ?? 5;
  const params = new URLSearchParams({
    title,
    limit: String(limit),
    fields: openLibraryFields,
  });

  if (options.author) {
    params.set("author", options.author);
  }

  const url = `https://openlibrary.org/search.json?${params.toString()}`;
  const cacheKey = `openlibrary_search_${title}_${options.author ?? ""}_${limit}`;
  const cached = getCached<OpenLibraryBookDoc[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchOpenLibraryJson(url);
  const docs = data.docs ?? [];
  setCached(cacheKey, docs);
  return docs;
}

export async function searchBooksBySubject(
  subject: string,
  options: { page?: number; limit?: number } = {}
): Promise<OpenLibraryBookDoc[]> {
  const page = options.page ?? 1;
  const limit = options.limit ?? 30;
  const params = new URLSearchParams({
    q: `subject:${subject}`,
    page: String(page),
    limit: String(limit),
    fields: openLibraryFields,
  });

  const url = `https://openlibrary.org/search.json?${params.toString()}`;
  const cacheKey = `openlibrary_subject_${subject}_${page}_${limit}`;
  const cached = getCached<OpenLibraryBookDoc[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchOpenLibraryJson(url);
  const docs = data.docs ?? [];
  setCached(cacheKey, docs);
  return docs;
}

export async function fetchPopularBooks(count = 30): Promise<Game[]> {
  const cacheKey = `openlibrary_books_${count}`;
  const cached = getCached<Game[]>(cacheKey);
  if (cached) return cached;

  try {
    const docs = await searchBooksBySubject("fiction", { limit: count });
    const games: Game[] = docs
      .map((doc) => openLibraryDocToGame(doc))
      .filter((game): game is Game => Boolean(game));
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
