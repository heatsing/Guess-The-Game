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
    question: "When can I see yesterday's answer?",
    answer:
      "Yesterday's solution becomes obvious once the next daily puzzle rolls over at 00:00 UTC. At that point you can compare the previous answer with your stored guesses.",
  },
];

function getModeKeyFromPath(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return MODES.find((mode) => mode.key === firstSegment)?.key ?? "game";
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  const hasEmail = answer.includes(SUPPORT_EMAIL);
  const [beforeEmail, afterEmail] = hasEmail ? answer.split(SUPPORT_EMAIL) : [answer, ""];

  return (
    <article className="panel-card-strong overflow-hidden">
      <details>
        <summary className="flex items-center justify-between gap-4 px-5 py-4">
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {question}
          </span>
          <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Open
          </span>
        </summary>
        <div className="border-t border-[color:var(--border)] px-5 pb-5 pt-4 text-sm leading-7 text-[var(--muted)]">
          {hasEmail ? (
            <>
              {beforeEmail}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[var(--foreground)] underline">
                {SUPPORT_EMAIL}
              </a>
              {afterEmail}
            </>
          ) : (
            answer
          )}
        </div>
      </details>
    </article>
  );
}

export default function FAQSection() {
  const pathname = usePathname();
  const modeKey = getModeKeyFromPath(pathname);
  const mode = MODES.find((item) => item.key === modeKey);
  const label = mode?.label ?? "Guess The Game";
  const gameRulesText = GAME_RULES[modeKey] ?? GAME_RULES.game;

  const faqItems = [
    { question: `${label} rules`, answer: gameRulesText },
    ...GENERIC_FAQS,
  ];

  return (
    <section id="faq" className="app-frame px-6 py-8">
      <div className="section-eyebrow">Need a rule check?</div>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Frequently asked questions
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        Answer acceptance, reset timing, and the small details that affect your streak.
      </p>

      <div className="mt-6 space-y-3">
        {faqItems.map((faq, index) => (
          <FaqCard key={`${faq.question}-${index}`} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
