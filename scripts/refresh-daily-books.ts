import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { GameSchema, normalizeAnswer, type Game } from "@/lib/gameTypes";
import { openLibraryDocToGame, searchBooksBySubject } from "@/lib/sources/openlibrary";

type ParsedArgs = {
  subject: string;
  count: number;
  limit: number;
  pages: number;
  dryRun: boolean;
  acceptAuthor: boolean;
};

function printUsage() {
  console.log(`Usage:
  npm run refresh:books
  npm run refresh:books -- --dry-run
  npm run refresh:books -- --count 3 --pages 10

Options:
  --subject <value>     Open Library subject query (default: fiction)
  --count <number>      Number of fresh books to append (default: 1)
  --limit <number>      Results to request per page (default: 20)
  --pages <number>      Number of pages to scan for unseen books (default: 8)
  --accept-author       Add author names to acceptableAnswers
  --dry-run             Print selected books without writing data/books.json
`);
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    subject: "fiction",
    count: 1,
    limit: 20,
    pages: 8,
    dryRun: false,
    acceptAuthor: true,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--subject") {
      parsed.subject = (argv[++i] ?? "").trim() || parsed.subject;
      continue;
    }

    if (arg === "--count") {
      parsed.count = Number(argv[++i] ?? "1");
      continue;
    }

    if (arg === "--limit") {
      parsed.limit = Number(argv[++i] ?? "20");
      continue;
    }

    if (arg === "--pages") {
      parsed.pages = Number(argv[++i] ?? "8");
      continue;
    }

    if (arg === "--accept-author") {
      parsed.acceptAuthor = true;
      continue;
    }

    if (arg === "--no-accept-author") {
      parsed.acceptAuthor = false;
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
  }

  return parsed;
}

function loadBooks() {
  const file = join(process.cwd(), "data", "books.json");
  const raw = readFileSync(file, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("data/books.json is not a valid array.");
  }

  return {
    file,
    books: parsed.map((item) => GameSchema.parse(item)),
  };
}

function buildExistingKeySet(books: Game[]) {
  const keys = new Set<string>();

  for (const book of books) {
    keys.add(`id:${book.id}`);
    keys.add(`title:${normalizeAnswer(book.title)}`);
    if (book.slug) {
      keys.add(`slug:${book.slug}`);
    }
  }

  return keys;
}

function isDuplicateBook(entry: Game, keys: Set<string>) {
  return (
    keys.has(`id:${entry.id}`) ||
    keys.has(`title:${normalizeAnswer(entry.title)}`) ||
    (entry.slug ? keys.has(`slug:${entry.slug}`) : false)
  );
}

function rememberBook(entry: Game, keys: Set<string>) {
  keys.add(`id:${entry.id}`);
  keys.add(`title:${normalizeAnswer(entry.title)}`);
  if (entry.slug) {
    keys.add(`slug:${entry.slug}`);
  }
}

async function pickFreshBooks(existing: Game[], args: ParsedArgs) {
  const existingKeys = buildExistingKeySet(existing);
  const selected: Game[] = [];
  const startPage = Math.max(1, Math.floor(existing.length / args.limit) + 1);
  const pagesToScan = Array.from({ length: args.pages }, (_, index) => startPage + index);

  for (const page of pagesToScan) {
    const docs = await searchBooksBySubject(args.subject, {
      page,
      limit: args.limit,
    });

    for (const doc of docs) {
      const entry = openLibraryDocToGame(doc, {
        acceptAuthor: args.acceptAuthor,
        imageCount: 6,
      });

      if (!entry || isDuplicateBook(entry, existingKeys)) {
        continue;
      }

      rememberBook(entry, existingKeys);
      selected.push(GameSchema.parse(entry));

      if (selected.length >= args.count) {
        return selected;
      }
    }
  }

  return selected;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!Number.isInteger(args.count) || args.count < 1) {
    throw new Error("--count must be a positive integer.");
  }
  if (!Number.isInteger(args.limit) || args.limit < 1) {
    throw new Error("--limit must be a positive integer.");
  }
  if (!Number.isInteger(args.pages) || args.pages < 1) {
    throw new Error("--pages must be a positive integer.");
  }

  const { file, books } = loadBooks();
  const freshBooks = await pickFreshBooks(books, args);

  if (!freshBooks.length) {
    throw new Error(
      `No unseen books were found for subject "${args.subject}" after scanning ${args.pages} page(s) from the current archive position.`
    );
  }

  console.log("Selected fresh books:");
  console.log(
    JSON.stringify(
      freshBooks.map((book) => ({
        id: book.id,
        slug: book.slug ?? null,
        title: book.title,
        cover: book.images[0] ?? null,
        sourceSubject: args.subject,
      })),
      null,
      2
    )
  );

  if (args.dryRun) {
    console.log("\nDry run complete. No files were changed.");
    return;
  }

  const nextBooks = [...books, ...freshBooks];
  writeFileSync(file, `${JSON.stringify(nextBooks, null, 2)}\n`, "utf-8");
  console.log(`Saved ${nextBooks.length} book entries to ${file}`);
  console.log("Note: Open Library imports currently repeat the same cover image 6 times for progressive reveal slots.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
