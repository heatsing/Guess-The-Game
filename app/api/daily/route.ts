import { NextRequest, NextResponse } from "next/server";
import { getDailyForMode, isModeKey } from "@/lib/getDailyForMode";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") ?? "game";

  if (!isModeKey(mode)) {
    return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
  }

  const daily = getDailyForMode(mode);
  return NextResponse.json(daily);
}

