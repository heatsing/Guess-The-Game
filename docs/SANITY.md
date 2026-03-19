# Sanity (Content Lake) setup

This project can load daily puzzles from **Sanity**. If Sanity is not configured, it automatically falls back to local JSON in `data/*.json`.

## 1) Create a Sanity project

- Create a project in Sanity
- Create a dataset (recommended: `production`)

## 2) Add environment variables

Create `.env.local` in the repo root (see `.env.example`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (default used by code: `2025-01-01`)

## 3) Define schemas in your Sanity Studio

This repo includes schema definitions under `sanity/`:

- `sanity/schemas/game.ts`
- `sanity/schemas/dailyGame.ts`
- `sanity/schemas/userGuess.ts`

You can copy these into your Sanity Studio project, or use them as reference.

### Required fields

- **game**
  - `mode`: string (must match app mode key: `game`, `book`, ...)
  - `title`: string
  - `acceptableAnswers`: string[] (optional)
  - `images`: image[] (1..6)

- **dailyGame**
  - `mode`: string (same mode key)
  - `date`: date (UTC, `YYYY-MM-DD`)
  - `game`: reference -> game

## 4) How daily selection works

- If Sanity has a `dailyGame` for today (UTC) + mode, the app uses it.
- Otherwise it falls back to `lib/daily.ts` rotation using local `data/*.json`.

