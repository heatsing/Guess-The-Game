import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const cacheDir = join(process.cwd(), ".cache", "sources");
mkdirSync(cacheDir, { recursive: true });

type CacheEntry<T> = { data: T; cachedAt: number };
const memoryCache = new Map<string, CacheEntry<unknown>>();
const defaultTtlMs = 60 * 60 * 1000;

function cachePath(key: string) {
  return join(cacheDir, `${key.replace(/[^a-z0-9]/gi, "_")}.json`);
}

export function getCached<T>(key: string): T | null {
  const mem = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (mem && Date.now() - mem.cachedAt < defaultTtlMs) return mem.data;

  try {
    const parsed = JSON.parse(readFileSync(cachePath(key), "utf-8")) as CacheEntry<T>;
    if (Date.now() - parsed.cachedAt < defaultTtlMs) {
      memoryCache.set(key, parsed as CacheEntry<unknown>);
      return parsed.data;
    }
  } catch {
    // ignore cache miss
  }
  return null;
}

export function setCached<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, cachedAt: Date.now() };
  memoryCache.set(key, entry as CacheEntry<unknown>);
  try {
    writeFileSync(cachePath(key), JSON.stringify(entry, null, 2), "utf-8");
  } catch {
    // ignore disk cache write errors
  }
}

