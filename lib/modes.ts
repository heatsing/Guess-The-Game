export type Mode = {
  key: string;
  label: string;
  shortLabel: string;
  badge: string;
  href: string;
  description: string;
};

export const MODES: Mode[] = [
  {
    key: "game",
    label: "Guess The Game",
    shortLabel: "Game",
    badge: "VG",
    href: "/game",
    description: "Peel back six visual clues and name today's video game.",
  },
  {
    key: "book",
    label: "Guess The Book",
    shortLabel: "Book",
    badge: "BK",
    href: "/book",
    description: "Try to guess today's book in 6 guesses or less using covers, scenes, and story clues.",
  },
  {
    key: "movie",
    label: "Guess The Movie",
    shortLabel: "Movie",
    badge: "MV",
    href: "/movie",
    description: "Frames, props, and posters from today's hidden film.",
  },
  {
    key: "logo",
    label: "Guess The Logo",
    shortLabel: "Logo",
    badge: "LG",
    href: "/logo",
    description: "Brand marks revealed from tight crops to full clarity.",
  },
  {
    key: "house",
    label: "Guess The House",
    shortLabel: "House",
    badge: "HS",
    href: "/house",
    description: "Architecture and interiors from memorable homes and landmarks.",
  },
  {
    key: "angle",
    label: "Guess The Angle",
    shortLabel: "Angle",
    badge: "AG",
    href: "/angle",
    description: "Extreme close-ups and strange perspectives that reward observation.",
  },
  {
    key: "phrase",
    label: "Guess The Phrase",
    shortLabel: "Phrase",
    badge: "PH",
    href: "/phrase",
    description: "Visual riddles and rebus puzzles turned into a daily challenge.",
  },
  {
    key: "song",
    label: "Guess The Song",
    shortLabel: "Song",
    badge: "SG",
    href: "/song",
    description: "Album art, lyric fragments, and music video clues for one track.",
  },
  {
    key: "animal",
    label: "Guess The Animal",
    shortLabel: "Animal",
    badge: "AN",
    href: "/animal",
    description: "Silhouettes, textures, and habitats that point to one animal.",
  },
  {
    key: "plant",
    label: "Guess The Plant",
    shortLabel: "Plant",
    badge: "PL",
    href: "/plant",
    description: "Leaves, flowers, and stems that reveal a single plant.",
  },
  {
    key: "number",
    label: "Guess The Number",
    shortLabel: "Number",
    badge: "NM",
    href: "/number",
    description: "Logic-driven rounds where each clue tightens the answer.",
  },
  {
    key: "price",
    label: "Guess The Price",
    shortLabel: "Price",
    badge: "PR",
    href: "/price",
    description: "Estimate the mystery price using visuals and a limited reveal budget.",
  },
];

export function getModeBadge(modeKey: string): string {
  return MODES.find((mode) => mode.key === modeKey)?.badge ?? "GT";
}

export function getModeIcon(modeKey: string): string {
  return getModeBadge(modeKey);
}
