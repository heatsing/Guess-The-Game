export type Mode = {
  key: string;
  label: string;
  href: string;
  description: string;
  icon?: string;
};

const DEFAULT_ICONS: Record<string, string> = {
  game: "🎮",
  book: "📖",
  movie: "🎬",
  logo: "🏷️",
  house: "🏠",
  angle: "📐",
  phrase: "💬",
  song: "🎵",
  animal: "🐾",
  plant: "🌿",
  number: "🔢",
  price: "💰",
};

export const MODES: Mode[] = [
  {
    key: "game",
    label: "Guess The Game",
    href: "/game",
    description: "Reveal images step by step and guess today’s video game.",
  },
  {
    key: "book",
    label: "Guess The Book",
    href: "/book",
    description: "Covers, quotes, or scenes — can you name the book?",
  },
  {
    key: "movie",
    label: "Guess The Movie Name",
    href: "/movie",
    description: "Frames, posters, or props from movies.",
  },
  {
    key: "logo",
    label: "Guess The Logo",
    href: "/logo",
    description: "Cropped brand logos, revealed clue by clue.",
  },
  {
    key: "house",
    label: "Guess The House",
    href: "/house",
    description: "Architecture and interiors from famous places.",
  },
  {
    key: "angle",
    label: "Guess The Angle",
    href: "/angle",
    description: "Extreme close-ups and weird angles.",
  },
  {
    key: "phrase",
    label: "Guess The Phrase",
    href: "/phrase",
    description: "Rebus-style visual puzzles and phrases.",
  },
  {
    key: "song",
    label: "Guess The Song",
    href: "/song",
    description: "Album art, lyrics fragments, or music video clues.",
  },
  {
    key: "animal",
    label: "Guess The Animal",
    href: "/animal",
    description: "Silhouettes, habitats, and close-ups.",
  },
  {
    key: "plant",
    label: "Guess The Plant",
    href: "/plant",
    description: "Leaves, flowers, textures — identify the plant.",
  },
  {
    key: "number",
    label: "Guess The Number",
    href: "/number",
    description: "Logic hints and visual clues to find the secret number.",
  },
  {
    key: "price",
    label: "Guess The Price",
    href: "/price",
    description: "Guess today’s price from image clues. Wrong guesses unlock more clues.",
  },
];

export function getModeIcon(modeKey: string): string {
  return DEFAULT_ICONS[modeKey] ?? "🎮";
}

