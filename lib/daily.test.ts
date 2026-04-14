import { describe, it, expect } from "vitest";
import { getDailyFromList } from "@/lib/daily";

const mockGames = [
  { id: "g1", title: "Celeste", images: ["/1.jpg"] },
  { id: "g2", title: "Hollow Knight", images: ["/1.jpg"] },
  { id: "g3", title: "Portal 2", images: ["/1.jpg"] },
];

describe("getDailyFromList", () => {
  it("returns YYYY-MM-DD puzzleKey", () => {
    const result = getDailyFromList(mockGames, new Date("2026-04-14T00:00:00Z"));
    expect(result.puzzleKey).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("changes result across days", () => {
    const d1 = getDailyFromList(mockGames, new Date("2026-04-01T12:00:00Z"));
    const d2 = getDailyFromList(mockGames, new Date("2026-04-02T12:00:00Z"));
    expect(d1.id).not.toBe(d2.id);
  });

  it("throws when list is empty", () => {
    expect(() => getDailyFromList([], new Date())).toThrow("The data list is empty");
  });
});

