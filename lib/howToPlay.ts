export type HowToPlay = {
  title: string;
  steps: [string, string, string];
};

export const HOW_TO_PLAY: Record<string, HowToPlay> = {
  game: {
    title: "How to play Guess The Game game?",
    steps: [
      "Start with the first image clue. You’ll see one screenshot or artwork from today’s video game, often blurred or cropped to make it tricky.",
      "Type the game title (or a well-known abbreviation) in the input and submit. Each wrong guess reveals the next image; clues go from hardest to clearest across up to 6 images.",
      "Use all 6 guesses if you need to. Once you enter the correct game name (matching our list), you win. Answers are not case-sensitive.",
    ],
  },
  book: {
    title: "How to play Guess The Book game?",
    steps: [
      "Start with the first image clue. You’ll see a book cover, a quote, or a scene from the book—revealed one at a time.",
      "Type the book title or author in the input and submit. Each wrong guess unlocks the next clue image, from hardest to easiest.",
      "You have up to 6 guesses. Enter the correct book title (as in our list) to win. Try different spellings or the author’s name if the title doesn’t match.",
    ],
  },
  movie: {
    title: "How to play Guess The Movie game?",
    steps: [
      "Start with the first image clue. You’ll see a frame, poster, or prop from a movie, revealed one clue at a time.",
      "Type the movie title in the input and submit. Each wrong guess unlocks the next image; clues go from trickiest to clearest.",
      "Use up to 6 guesses to name the film. Correct title (including common variants in our list) counts as a win.",
    ],
  },
  logo: {
    title: "How to play Guess The Logo game?",
    steps: [
      "Start with the first image. You’ll see a zoomed-in or cropped part of a brand logo, revealed step by step.",
      "Type the brand or company name in the input and submit. Each wrong guess reveals more of the logo.",
      "You have up to 6 guesses. Enter the correct brand name to win. Abbreviations and common names may be accepted.",
    ],
  },
  house: {
    title: "How to play Guess The House game?",
    steps: [
      "Start with the first image clue. You’ll see an architectural detail or interior from a famous building or house.",
      "Type the name of the building, house, or architect in the input and submit. Each wrong guess unlocks the next image.",
      "Use up to 6 guesses to identify the place or designer. Match our accepted answer list to win.",
    ],
  },
  angle: {
    title: "How to play Guess The Angle game?",
    steps: [
      "Start with the first image. You’ll see an extreme close-up or unusual angle of an object or scene.",
      "Type what you think it is in the input and submit. Each wrong guess reveals the next, clearer image.",
      "You have up to 6 guesses to name the subject correctly. Think about shape, texture, and context.",
    ],
  },
  phrase: {
    title: "How to play Guess The Phrase game?",
    steps: [
      "Start with the first image. You’ll see a visual puzzle or rebus-style clue for a phrase or idiom.",
      "Type the phrase or idiom in the input and submit. Each wrong guess unlocks the next clue image.",
      "Use up to 6 guesses. Enter the exact phrase (or an accepted variant) to win.",
    ],
  },
  song: {
    title: "How to play Guess The Song game?",
    steps: [
      "Start with the first clue. You’ll see album art, a lyrics snippet, or a music video frame.",
      "Type the song title or artist in the input and submit. Each wrong guess reveals the next clue.",
      "You have up to 6 guesses. Match the song or artist as listed in our answers to win.",
    ],
  },
  animal: {
    title: "How to play Guess The Animal game?",
    steps: [
      "Start with the first image. You’ll see a silhouette, habitat, or close-up of an animal.",
      "Type the animal name in the input and submit. Each wrong guess unlocks the next clue image.",
      "Use up to 6 guesses. Enter the correct animal (common or scientific name as accepted) to win.",
    ],
  },
  plant: {
    title: "How to play Guess The Plant game?",
    steps: [
      "Start with the first image. You’ll see a leaf, flower, or texture from a plant.",
      "Type the plant name in the input and submit. Each wrong guess reveals the next clue.",
      "You have up to 6 guesses. Enter the correct plant name from our list to win.",
    ],
  },
  number: {
    title: "How to play Guess The Number game?",
    steps: [
      "Start with the first hint. You’ll get logic clues or visual hints that narrow down the secret number.",
      "Type your guess (a number) in the input and submit. Each wrong guess can reveal more information.",
      "Use up to 6 guesses to find the exact number. Correct answer as defined for the puzzle counts as a win.",
    ],
  },
  price: {
    title: "How to play Guess The Price game?",
    steps: [
      "Start with the first image or hint. You’ll see clues related to today’s mystery price.",
      "Type your price guess in the input and submit. Each wrong guess can unlock more clues.",
      "You have up to 6 guesses. Enter the correct price (format as required) to win.",
    ],
  },
};
