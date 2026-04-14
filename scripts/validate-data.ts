import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { GameSchema } from "@/lib/gameTypes";

const dataDir = join(process.cwd(), "data");
const dataFiles = readdirSync(dataDir).filter((f) => f.endsWith(".json"));

const errors: string[] = [];

for (const file of dataFiles) {
  const raw = readFileSync(join(dataDir, file), "utf-8");
  let list: unknown;
  try {
    list = JSON.parse(raw);
  } catch {
    errors.push(`${file}: invalid JSON`);
    continue;
  }

  if (!Array.isArray(list)) {
    errors.push(`${file}: root must be an array`);
    continue;
  }

  for (const [index, item] of list.entries()) {
    const result = GameSchema.safeParse(item);
    if (!result.success) {
      errors.push(`${file}[${index}]: ${result.error.issues.map((i) => i.message).join("; ")}`);
    }
  }
}

if (errors.length) {
  console.error("Data validation failed:");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log(`All ${dataFiles.length} data files are valid.`);

