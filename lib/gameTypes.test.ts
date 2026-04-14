import { describe, it, expect } from "vitest";
import { normalizeAnswer, isAnswerAcceptable } from "@/lib/gameTypes";

describe("normalizeAnswer", () => {
  it("normalizes spacing and case", () => {
    expect(normalizeAnswer("  Hollow Knight  ")).toBe("hollowknight");
  });

  it("handles punctuation", () => {
    expect(normalizeAnswer("What's up?!")).toBe("whatsup");
  });

  it("keeps CJK", () => {
    expect(normalizeAnswer("空洞骑士")).toBe("空洞骑士");
  });
});

describe("isAnswerAcceptable", () => {
  it("accepts title match", () => {
    expect(isAnswerAcceptable("Hollow Knight", "Hollow Knight")).toBe(true);
  });

  it("accepts alias match", () => {
    expect(isAnswerAcceptable("空洞骑士", "Hollow Knight", ["空洞骑士"])).toBe(true);
  });

  it("rejects wrong answer", () => {
    expect(isAnswerAcceptable("Celeste", "Hollow Knight")).toBe(false);
  });
});

