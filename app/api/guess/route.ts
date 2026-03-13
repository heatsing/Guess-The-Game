import { NextRequest, NextResponse } from "next/server";
import { getDailyForMode, isModeKey } from "@/lib/getDailyForMode";
import { isCorrectGuess } from "@/lib/gameEngine";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const mode = (body?.mode as string | undefined) ?? "game";
  const guess = (body?.guess as string | undefined) ?? "";

  if (!isModeKey(mode)) {
    return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
  }
  if (!guess.trim()) {
    return NextResponse.json({ error: "Empty guess" }, { status: 400 });
  }

  const daily = getDailyForMode(mode);
  const correct = isCorrectGuess(daily, guess);

  return NextResponse.json({
    mode,
    puzzleKey: daily.puzzleKey,
    correct,
  });
}

