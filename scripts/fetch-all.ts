/**
 * Fetches external source data and writes mode JSON files.
 * Requires optional API keys in .env.local:
 * RAWG_API_KEY, TMDB_API_KEY
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { getGamesForMode } from "@/lib/sources";

const allModes = ["game", "movie", "book", "animal", "plant"] as const;
type Mode = (typeof allModes)[number];

function parseModes(argv: string[]): Mode[] {
  let modes = [...allModes] as Mode[];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg !== "--skip" && arg !== "--only" && arg !== "--modes") {
      continue;
    }

    const raw = argv[++i] ?? "";
    const requested = raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const invalid = requested.filter((value): value is string => !allModes.includes(value as Mode));
    if (invalid.length) {
      throw new Error(`Unknown mode(s): ${invalid.join(", ")}. Expected one of ${allModes.join(", ")}.`);
    }

    if (arg === "--skip") {
      const skipped = new Set(requested as Mode[]);
      modes = modes.filter((mode) => !skipped.has(mode));
      continue;
    }

    modes = requested as Mode[];
  }

  if (!modes.length) {
    throw new Error("No modes selected. Use --only or --skip with at least one valid mode.");
  }

  return modes;
}

async function main() {
  const modes = parseModes(process.argv.slice(2));
  console.log("Starting source fetch pipeline...");
  const summary: Array<{ mode: string; count: number; status: string }> = [];

  for (const mode of modes) {
    const { games, status } = await getGamesForMode(mode);
    const file = join(process.cwd(), "data", `${mode}s.json`);
    writeFileSync(file, JSON.stringify(games, null, 2), "utf-8");
    summary.push({ mode, count: games.length, status });
    console.log(`${mode}: ${games.length} items (${status}) -> data/${mode}s.json`);
  }

  console.log("\nSource status summary:");
  for (const item of summary) {
    console.log(`- ${item.mode}: ${item.status} (${item.count})`);
  }
  console.log("\nFetch completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
