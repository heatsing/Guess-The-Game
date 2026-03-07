"use client";

import { usePathname } from "next/navigation";
import { GAME_RULES } from "@/lib/gameRules";
import { MODES } from "@/lib/modes";

const PATH_TO_MODE: Record<string, string> = {
  "/": "game",
  "/game": "game",
  "/book": "book",
  "/movie": "movie",
  "/logo": "logo",
  "/house": "house",
  "/angle": "angle",
  "/phrase": "phrase",
  "/song": "song",
  "/animal": "animal",
  "/plant": "plant",
  "/number": "number",
  "/price": "price",
  "/faq": "game",
};

const GENERIC_FAQS = [
  {
    question: "Why is my answer not accepted?",
    answer:
      "We maintain a curated list of acceptable answers for each game. If your guess is not accepted, it may not match our database (e.g. spelling, alternate titles, or regional names). This means it will not be counted as correct and you will not be able to complete the game with it. If you think we should add this answer, please email us: guessthegameemail@gmail.com",
  },
  {
    question: "Where can I see the answers to the game?",
    answer:
      "Answers to today's game you can find only the next day after 12 am. To do this, you need to click on the Yesterday's button. There you will see the answer to the previous game, as well as your guesses in bold.",
  },
];

function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const hasEmail = answer.includes("guessthegameemail@gmail.com");
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-100/80 px-6 py-5 shadow-sm dark:border-slate-600 dark:bg-slate-700/50">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        {question}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        {hasEmail ? (
          <>
            {answer.split("guessthegameemail@gmail.com")[0]}
            <a
              href="mailto:guessthegameemail@gmail.com"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              guessthegameemail@gmail.com
            </a>
            {answer.split("guessthegameemail@gmail.com")[1]}
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
  const modeKey = PATH_TO_MODE[pathname] ?? "game";
  const mode = MODES.find((m) => m.key === modeKey);
  const label = mode?.label ?? "Guess The Game";
  const gameRulesText = GAME_RULES[modeKey] ?? GAME_RULES.game;

  const faqItems = [
    { question: `GAME RULES (${label.toUpperCase()})`, answer: gameRulesText },
    ...GENERIC_FAQS,
  ];

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-center text-xl font-bold text-slate-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-2xl space-y-6">
        {faqItems.map((faq, i) => (
          <FaqCard key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
