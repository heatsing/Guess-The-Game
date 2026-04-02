"use client";

import { usePathname } from "next/navigation";
import { GAME_RULES } from "@/lib/gameRules";
import { MODES } from "@/lib/modes";

const SUPPORT_EMAIL = "guessthegameemail@gmail.com";

const GENERIC_FAQS = [
  {
    question: "Why is my answer not accepted?",
    answer:
      "We keep a curated list of accepted answers for every puzzle. If a guess is rejected, it usually means the spelling, alternate title, or regional name does not match the stored answers yet. If you think a valid answer should be accepted, email us at guessthegameemail@gmail.com.",
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

const MODE_SPECIFIC_FAQS: Record<string, { question: string; answer: string }[]> = {
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

function getModeKeyFromPath(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return MODES.find((mode) => mode.key === firstSegment)?.key ?? "game";
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  const hasEmail = answer.includes(SUPPORT_EMAIL);
  const [beforeEmail, afterEmail] = hasEmail ? answer.split(SUPPORT_EMAIL) : [answer, ""];

  return (
    <article className="rounded-[18px] bg-[var(--surface-strong)] px-6 py-6">
      <h3 className="text-xl font-extrabold text-[var(--foreground)]">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {hasEmail ? (
          <>
            {beforeEmail}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-extrabold text-[var(--foreground)] underline">
              {SUPPORT_EMAIL}
            </a>
            {afterEmail}
          </>
        ) : (
          answer
        )}
      </p>
    </article>
  );
}

export default function FAQSection() {
  const pathname = usePathname();
  const modeKey = getModeKeyFromPath(pathname);
  const mode = MODES.find((item) => item.key === modeKey);
  const label = mode?.label ?? "Guess The Game";
  const gameRulesText = GAME_RULES[modeKey] ?? GAME_RULES.game;
  const modeSpecificFaqs = MODE_SPECIFIC_FAQS[modeKey] ?? [];

  const faqItems = [
    { question: `${label} rules`, answer: gameRulesText },
    ...modeSpecificFaqs,
    ...GENERIC_FAQS,
  ];

  return (
    <section id="faq" className="app-frame px-6 py-8">
      <div className="text-center">
        <div className="section-eyebrow">Frequently asked questions</div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Answers, timing, and accepted guesses
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {faqItems.map((faq, index) => (
          <FaqCard key={`${faq.question}-${index}`} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
