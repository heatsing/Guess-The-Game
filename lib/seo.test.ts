import { describe, expect, it } from "vitest";
import { MODES } from "@/lib/modes";
import { HOME_SEO, MODE_SEO, getModeSeo } from "@/lib/seo";

describe("seo configuration", () => {
  it("defines specific SEO metadata for every public game mode", () => {
    for (const mode of MODES) {
      const seo = getModeSeo(mode.key);
      expect(seo).toBe(MODE_SEO[mode.key]);
      expect(seo.title).toContain(mode.shortLabel === "Game" ? "Game" : mode.shortLabel);
      expect(seo.description.length).toBeGreaterThan(90);
      expect(seo.keywords.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("keeps the homepage description search-friendly", () => {
    expect(HOME_SEO.title).toContain("Guess The Game");
    expect(HOME_SEO.description).toContain("video games");
    expect(HOME_SEO.description).toContain("flags");
    expect(HOME_SEO.keywords).toContain("daily guessing games");
  });
});
