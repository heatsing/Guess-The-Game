export type HowToPlay = {
  title: string;
  steps: [string, string, string];
};

export const HOW_TO_PLAY: Record<string, HowToPlay> = {
  game: {
    title: "How to play Guess The Game",
    steps: [
      "Start with the hardest clue. You will see one screenshot or piece of game art from today's answer.",
      "Type the game title or a well-known abbreviation. Each wrong guess opens the next image.",
      "Use all 6 guesses if you need them. The earlier you solve it, the cleaner the score you can share.",
    ],
  },
  book: {
    title: "How to play Guess The Book",
    steps: [
      "Start with the first clue, which may be a cover, quote, or scene tied to the book.",
      "Type the title or accepted author answer. Each wrong guess reveals the next clue.",
      "You have up to 6 guesses, so use the growing context to narrow down the book before the last reveal.",
    ],
  },
  movie: {
    title: "How to play Guess The Movie",
    steps: [
      "Start with one frame, prop, or poster detail from today's movie.",
      "Submit the movie title. Every wrong answer unlocks another clue image.",
      "You get up to 6 guesses, so balance confidence against the temptation to reveal more.",
    ],
  },
  logo: {
    title: "How to play Guess The Logo",
    steps: [
      "Start with a tight crop of a logo or brand mark.",
      "Type the company or brand name. Each wrong guess exposes more of the logo.",
      "You have up to 6 guesses to identify the brand before the full image is revealed.",
    ],
  },
  house: {
    title: "How to play Guess The House",
    steps: [
      "Start with one architectural detail or interior view.",
      "Guess the building, house, or accepted architect answer. Each miss unlocks another clue.",
      "Use the full set of 6 guesses if needed to reach the correct place.",
    ],
  },
  angle: {
    title: "How to play Guess The Angle",
    steps: [
      "Start with an extreme close-up or unusual perspective.",
      "Type what you think the subject is. Every wrong guess reveals the next, clearer clue.",
      "You have 6 guesses, so keep refining your mental model as the image opens up.",
    ],
  },
  phrase: {
    title: "How to play Guess The Phrase",
    steps: [
      "Start with the first visual clue in the rebus or idiom puzzle.",
      "Type the phrase or accepted variant. Each wrong answer unlocks another clue.",
      "Use up to 6 guesses to move from a vague concept to the exact wording.",
    ],
  },
  song: {
    title: "How to play Guess The Song",
    steps: [
      "Start with a clue tied to one song, such as album art or a lyric fragment.",
      "Type the song title or accepted artist answer. Every miss reveals the next clue.",
      "You have up to 6 guesses, so let each new clue tighten the song in your head.",
    ],
  },
  animal: {
    title: "How to play Guess The Animal",
    steps: [
      "Start with a silhouette, habitat shot, or close-up texture.",
      "Type the animal name. Each wrong guess reveals another clue image.",
      "Use up to 6 guesses to move from broad category to the exact animal.",
    ],
  },
  plant: {
    title: "How to play Guess The Plant",
    steps: [
      "Start with a leaf, flower, or stem detail from the plant.",
      "Type the plant name. Each wrong guess unlocks another clue.",
      "You have 6 guesses to identify it before the full set of visuals is exposed.",
    ],
  },
  number: {
    title: "How to play Guess The Number",
    steps: [
      "Start with the first logic hint or visual clue for the secret number.",
      "Submit your numeric guess. Wrong answers can unlock more information.",
      "Use up to 6 guesses to reach the exact value before the round runs out.",
    ],
  },
  price: {
    title: "How to play Guess The Price",
    steps: [
      "Start with the first visual or contextual clue for today's mystery price.",
      "Type your price guess. Each wrong answer can unlock another clue.",
      "Use up to 6 guesses to land on the exact value before the round ends.",
    ],
  },
};
