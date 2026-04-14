/**
 * Fetches external source data and writes mode JSON files.
 * Requires optional API keys in .env.local:
 * RAWG_API_KEY, TMDB_API_KEY
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { getGamesForMode } from "@/lib/sources";

const modes = ["game", "movie", "book", "animal", "plant"] as const;

async function main() {
  for (const mode of modes) {
    const { games, status } = await getGamesForMode(mode);
    const file = join(process.cwd(), "data", `${mode}s.json`);
    writeFileSync(file, JSON.stringify(games, null, 2), "utf-8");
    console.log(`${mode}: ${games.length} items (${status}) -> data/${mode}s.json`);
  }
  console.log("Fetch completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

