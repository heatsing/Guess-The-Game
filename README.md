# GuessTheGame

Daily image-guessing puzzle. Layout inspired by [SpellsBee](https://spellsbee.com), gameplay by [guessthe.game](https://guessthe.game).

## Features

- **12 guessing modes**: Game, Book, Movie, Logo, House, Angle, Phrase, Song, Animal, Plant, Number, Price
- **Play**: Images are revealed in sequence; each wrong guess unlocks the next, clearer image. Up to 6 guesses.
- **Daily puzzle**: Rotates by UTC date; progress saved locally
- **Light / dark theme**: Toggle in the header; preference stored in localStorage
- **FAQ on every page**: Shared FAQ section plus a dedicated `/faq` page
- **Game rules per page**: Each mode shows its own rules

## Run

```bash
npm install
npm run dev
```

Runs at `http://localhost:3006` by default.

**Before committing:** run `npm run check` (lint + build). CI runs the same on every push/PR — see [docs/ITERATION.md](docs/ITERATION.md) for how to keep improving the project.

## Data

- **Puzzles**: `data/games.json` (games), `data/books.json` (books), etc.
- **Images**: `public/images/` — 6 clue images per puzzle (blurriest to clearest)
- **Example**:

```json
{
  "id": "hk",
  "title": "Hollow Knight",
  "acceptableAnswers": ["hollow knight", "hollowknight"],
  "images": ["/images/hk/1.jpg", "/images/hk/2.jpg", "..."]
}
```
