import { describe, expect, it } from "vitest";
import { MODES } from "@/lib/modes";

describe("mode catalog", () => {
  it("includes every referenced Guess Universe game page", () => {
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
});
