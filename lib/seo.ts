import { MODES } from "@/lib/modes";

export type SeoConfig = {
  title: string;
  description: string;
  keywords: string[];
};

export const HOME_SEO: SeoConfig = {
  title: "Guess The Game: Daily Guessing Games, Flags, Countries, Movies, Books and More",
  description:
    "Play Guess The Game every day with fast puzzle modes for video games, flags, countries, movies, books, logos, words, songs, animals, plants, colors, numbers, and more.",
  keywords: [
    "Guess The Game",
    "daily guessing games",
    "daily puzzle games",
    "guess the flag",
    "guess the country",
    "guess the movie",
    "guess the book",
    "guess the logo",
    "word puzzle",
    "trivia games",
  ],
};

export const FAQ_SEO: SeoConfig = {
  title: "FAQ and Answer Rules",
  description:
    "Read the Guess The Game rules for accepted answers, daily reset timing, hints, streaks, local progress, and every daily puzzle mode.",
  keywords: ["Guess The Game FAQ", "answer rules", "accepted guesses", "daily reset", "hints"],
};

export const MODE_SEO: Record<string, SeoConfig> = {
  game: {
    title: "Guess The Game: Daily Video Game Screenshot Puzzle",
    description:
      "Play the daily Guess The Game challenge. Identify the hidden video game from image clues, hints, and a limited number of guesses.",
    keywords: ["guess the game", "video game puzzle", "daily game screenshot", "game trivia"],
  },
  book: {
    title: "Guess The Book: Daily Book Title Puzzle",
    description:
      "Guess today's book from quote clues, covers, story hints, author details, and a short daily answer challenge.",
    keywords: ["guess the book", "book puzzle", "daily book trivia", "literary quiz"],
  },
  movie: {
    title: "Guess The Movie: Daily Film Puzzle",
    description:
      "Solve the daily movie puzzle by reading clues, inspecting film-inspired visuals, and guessing the hidden movie title.",
    keywords: ["guess the movie", "movie puzzle", "film trivia", "daily movie quiz"],
  },
  logo: {
    title: "Guess The Logo: Daily Brand Logo Puzzle",
    description:
      "Identify the hidden brand in Guess The Logo using cropped logo clues, industry hints, and daily challenge scoring.",
    keywords: ["guess the logo", "logo quiz", "brand trivia", "daily logo puzzle"],
  },
  house: {
    title: "Guess The House: Daily Famous House Puzzle",
    description:
      "Guess the famous house, landmark, or fictional home from architecture clues and daily image hints.",
    keywords: ["guess the house", "architecture puzzle", "famous house quiz", "daily landmark game"],
  },
  angle: {
    title: "Guess The Angle: Daily Strange Perspective Puzzle",
    description:
      "Identify objects, places, and landmarks from unusual angles, close-ups, and perspective-based visual clues.",
    keywords: ["guess the angle", "perspective puzzle", "visual trivia", "daily image quiz"],
  },
  phrase: {
    title: "Guess The Phrase: Daily Rebus and Saying Puzzle",
    description:
      "Decode the daily phrase from emoji-style clues, visual riddles, rebus puzzles, hints, and letter feedback.",
    keywords: ["guess the phrase", "rebus puzzle", "daily phrase game", "saying puzzle"],
  },
  song: {
    title: "Guess The Song: Daily Music Puzzle",
    description:
      "Play Guess The Song with music-inspired clues, genre hints, artist details, and a daily song title challenge.",
    keywords: ["guess the song", "music puzzle", "song trivia", "daily music quiz"],
  },
  animal: {
    title: "Guess The Animal: Daily Animal Identification Game",
    description:
      "Guess today's animal from habitat clues, silhouette-style visuals, diet hints, and a timed daily puzzle flow.",
    keywords: ["guess the animal", "animal quiz", "daily animal puzzle", "wildlife trivia"],
  },
  plant: {
    title: "Guess The Plant: Daily Plant Identification Game",
    description:
      "Identify the daily plant from leaf shapes, plant hints, care clues, native region details, and visual puzzle prompts.",
    keywords: ["guess the plant", "plant identification game", "botany quiz", "daily plant puzzle"],
  },
  number: {
    title: "Guess The Number: Daily Logic Number Puzzle",
    description:
      "Solve the hidden number using range clues, digit hints, too-high and too-low feedback, and logic-based daily play.",
    keywords: ["guess the number", "number puzzle", "logic game", "daily math puzzle"],
  },
  price: {
    title: "Guess The Price: Daily Price Estimation Game",
    description:
      "Estimate the mystery price from category clues, market hints, and daily feedback in Guess The Price.",
    keywords: ["guess the price", "price guessing game", "daily estimate game", "shopping trivia"],
  },
  colors: {
    title: "Guess The Colors: Daily Color Order Puzzle",
    description:
      "Find the hidden color sequence with position feedback, color clues, and a daily logic puzzle board.",
    keywords: ["guess the colors", "color puzzle", "color sequence game", "daily color game"],
  },
  country: {
    title: "Guess The Country: Timed World Map Quiz",
    description:
      "Play a 60-second Guess The Country challenge with global country map silhouettes, geography hints, and fast scoring.",
    keywords: ["guess the country", "country map quiz", "world geography game", "timed country quiz"],
  },
  drawing: {
    title: "Guess The Drawing: Daily Sketch Puzzle",
    description:
      "Guess what is being drawn from a progressively clearer sketch, category hints, and daily visual clues.",
    keywords: ["guess the drawing", "drawing puzzle", "sketch guessing game", "daily drawing quiz"],
  },
  emoji: {
    title: "Guess The Emoji: Daily Emoji Phrase Puzzle",
    description:
      "Decode the daily emoji puzzle and guess the hidden phrase from icons, word slots, hints, and answer feedback.",
    keywords: ["guess the emoji", "emoji puzzle", "emoji phrase game", "daily emoji quiz"],
  },
  flag: {
    title: "Guess The Flag: Timed World Flag Quiz",
    description:
      "Play a 60-second Guess The Flag challenge with global flags, country answers, geography hints, and fast scoring.",
    keywords: ["guess the flag", "flag quiz", "world flags game", "timed flag quiz"],
  },
  word: {
    title: "Guess The Word: Daily Word Puzzle",
    description:
      "Solve the daily word with tile feedback, keyboard clues, category hints, and six-letter word puzzle logic.",
    keywords: ["guess the word", "daily word puzzle", "word game", "wordle alternative"],
  },
};

export function getModeSeo(modeKey: string): SeoConfig {
  const mode = MODES.find((item) => item.key === modeKey);
  return (
    MODE_SEO[modeKey] ?? {
      title: mode?.label ?? "Daily Guessing Game",
      description: mode?.description ?? HOME_SEO.description,
      keywords: [mode?.label ?? "daily guessing game"],
    }
  );
}
