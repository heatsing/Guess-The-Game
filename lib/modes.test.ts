import { describe, expect, it } from "vitest";
import { MODES } from "@/lib/modes";

describe("mode catalog", () => {
  it("includes every referenced Guess The Game page", () => {
    const expected = [
      "game",
      "book",
      "movie",
      "logo",
      "house",
      "angle",
      "phrase",
      "song",
      "animal",
      "plant",
      "number",
      "price",
      "colors",
      "country",
      "drawing",
      "emoji",
      "flag",
      "word",
    ];

    expect(MODES.map((mode) => mode.key)).toEqual(expected);
  });

  it("uses a visual icon for each game instead of the text badge", () => {
    for (const mode of MODES) {
      expect(mode.icon).toBeTruthy();
      expect(mode.icon).not.toBe(mode.badge);
    }
  });
});
