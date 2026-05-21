import { NextRequest, NextResponse } from "next/server";
import { getDailyForModeSmart, isModeKey } from "@/lib/getDailyForMode";

// This route depends on the `mode` search param, so it cannot be statically
// collapsed into one payload for every request.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") ?? "game";

  if (!isModeKey(mode)) {
    return NextResponse.json({ error: "Unknown mode" }, { status: 400 });
  }

  const daily = await getDailyForModeSmart(mode);
  return NextResponse.json(daily);
}
