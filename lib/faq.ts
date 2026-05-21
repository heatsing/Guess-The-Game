import { GAME_RULES } from "@/lib/gameRules";
import { SUPPORT_EMAIL } from "@/lib/site";

export type FaqEntry = {
  question: string;
  answer: string;
};

const GENERIC_FAQS: FaqEntry[] = [
  {
    question: "Why is my answer not accepted?",
    answer: `We keep a curated list of accepted answers for every puzzle. If a guess is rejected, it usually means the spelling, alternate title, or regional name does not match the stored answers yet. If you think a valid answer should be accepted, email us at ${SUPPORT_EMAIL}.`,
  },
  {
    question: "Where can I see yesterday's answer?",
    answer:
      "Once the next daily puzzle arrives at 00:00 UTC, the previous answer is no longer hidden. You can compare it with your saved guesses from that round.",
  },
  {
    question: "At what time does the daily puzzle change?",
    answer:
      "All daily modes switch to a new puzzle at 00:00 UTC. The countdown card on each mode page tracks the next reset.",
  },
];

const MODE_SPECIFIC_FAQS: Record<string, FaqEntry[]> = {
  book: [
    {
      question: "What kinds of clues appear in Guess The Book?",
      answer:
        "Book puzzles usually rely on visual references such as cover crops, title styling, scenes, symbolic objects, or story-related details. The clue order is designed to start vague and become easier over time.",
    },
    {
      question: "Can author names count as correct guesses?",
      answer:
        "Some book puzzles may accept the author or an alternate title when that answer is included in the accepted answer list. If the author is not configured as an accepted answer for that puzzle, the guess will not count.",
    },
  ],
};

export function getModeFaqs(modeKey: string, label: string): FaqEntry[] {
  const rules = GAME_RULES[modeKey] ?? GAME_RULES.game;

  return [
    { question: `${label} rules`, answer: rules },
    ...(MODE_SPECIFIC_FAQS[modeKey] ?? []),
    ...GENERIC_FAQS,
  ];
}
