import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { GameSchema } from "@/lib/gameTypes";
import { openLibraryDocToGame, searchBooksByTitle } from "@/lib/sources/openlibrary";

type ParsedArgs = {
  title: string;
  author?: string;
  slug?: string;
  coverUrl?: string;
  index: number;
  limit: number;
  acceptAuthor: boolean;
  dryRun: boolean;
};

function printUsage() {
  console.log(`Usage:
  npm run import:book -- "The Hobbit"
  npm run import:book -- "The Hobbit" --author "J.R.R. Tolkien"
  npm run import:book -- "The Hobbit" --author "J.R.R. Tolkien" --accept-author
  npm run import:book -- "The Hobbit" --cover-url "https://example.com/hobbit.jpg"
  npm run import:book -- "The Hobbit" --dry-run

Options:
  --author <name>       Narrow the Open Library search by author
  --slug <value>        Override the generated slug when using manual mode
  --cover-url <url>     Skip Open Library search and build an entry from this image URL
  --index <number>      Pick a different search result (default: 0)
  --limit <number>      Number of search results to request (default: 5)
  --accept-author       Add author names to acceptableAnswers
  --dry-run             Print the generated entry without writing data/books.json
`);
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    title: "",
    index: 0,
    limit: 5,
    acceptAuthor: false,
    dryRun: false,
  };

  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--author") {
      parsed.author = argv[++i];
      continue;
    }

    if (arg === "--slug") {
      parsed.slug = argv[++i];
      continue;
    }

    if (arg === "--cover-url") {
      parsed.coverUrl = argv[++i];
      continue;
    }

    if (arg === "--index") {
      parsed.index = Number(argv[++i] ?? "0");
      continue;
    }

    if (arg === "--limit") {
      parsed.limit = Number(argv[++i] ?? "5");
      continue;
    }

    if (arg === "--accept-author") {
      parsed.acceptAuthor = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    positional.push(arg);
  }

  parsed.title = positional.join(" ").trim();
  return parsed;
}

function mainKey(entry: { id: string; slug?: string; title: string }) {
  return `${entry.id}::${entry.slug ?? ""}::${entry.title}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createManualEntry(args: ParsedArgs) {
  if (!args.coverUrl) {
    throw new Error("Manual entry mode requires --cover-url.");
  }

  const slug = (args.slug?.trim() || slugify(args.title)).replace(/^\/+|\/+$/g, "");
  const acceptableAnswers = args.acceptAuthor && args.author ? [args.author] : undefined;

  return {
    id: `manual-book-${slug}`,
    slug,
    title: args.title,
    ...(acceptableAnswers?.length ? { acceptableAnswers } : {}),
    images: Array(6).fill(args.coverUrl),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.title) {
    printUsage();
    process.exit(1);
  }

  if (!Number.isInteger(args.index) || args.index < 0) {
    throw new Error("--index must be a non-negative integer.");
  }

  if (!Number.isInteger(args.limit) || args.limit < 1) {
    throw new Error("--limit must be a positive integer.");
  }

  let entry;

  if (args.coverUrl) {
    entry = createManualEntry(args);
    GameSchema.parse(entry);

    console.log("Manual book entry mode:");
    console.log(
      JSON.stringify(
        {
          title: args.title,
          author: args.author ?? null,
          slug: entry.slug,
          cover: entry.images[0],
        },
        null,
        2
      )
    );
  } else {
    const docs = await searchBooksByTitle(args.title, {
      author: args.author,
      limit: args.limit,
    });

    if (!docs.length) {
      throw new Error(`No Open Library results found for "${args.title}".`);
    }

    if (args.index >= docs.length) {
      throw new Error(`Requested index ${args.index}, but only ${docs.length} result(s) were returned.`);
    }

    const selected = docs[args.index]!;
    entry = openLibraryDocToGame(selected, {
      acceptAuthor: args.acceptAuthor,
      imageCount: 6,
    });

    if (!entry) {
      throw new Error("Selected Open Library result does not contain a usable cover image.");
    }

    GameSchema.parse(entry);

    console.log("Selected Open Library result:");
    console.log(
      JSON.stringify(
        {
          key: selected.key,
          title: selected.title,
          authors: selected.author_name ?? [],
          first_publish_year: selected.first_publish_year ?? null,
          cover: entry.images[0],
        },
        null,
        2
      )
    );
  }

  console.log("\nGenerated entry:");
  console.log(JSON.stringify(entry, null, 2));

  if (args.dryRun) {
    console.log("\nDry run complete. No files were changed.");
    return;
  }

  const file = join(process.cwd(), "data", "books.json");
  const raw = readFileSync(file, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("data/books.json is not a valid array.");
  }

  const books = parsed.map((item) => GameSchema.parse(item));
  const nextBooks = [...books];

  const existingIndex = nextBooks.findIndex((item) => {
    return item.id === entry.id || item.slug === entry.slug || item.title === entry.title;
  });

  if (existingIndex >= 0) {
    nextBooks[existingIndex] = entry;
    console.log(`\nUpdated existing entry (${mainKey(entry)}).`);
  } else {
    nextBooks.push(entry);
    console.log(`\nAppended new entry (${mainKey(entry)}).`);
  }

  writeFileSync(file, `${JSON.stringify(nextBooks, null, 2)}\n`, "utf-8");
  console.log(`Saved ${nextBooks.length} book entries to ${file}`);
  console.log("Note: this importer repeats the same cover image 6 times. Replace them later if you want progressive custom clues.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
