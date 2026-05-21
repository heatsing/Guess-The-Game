"use client";

import { usePathname } from "next/navigation";
import { getModeFaqs } from "@/lib/faq";
import { MODES } from "@/lib/modes";
import { SUPPORT_EMAIL } from "@/lib/site";

function getModeKeyFromPath(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return MODES.find((mode) => mode.key === firstSegment)?.key ?? "game";
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  const hasEmail = answer.includes(SUPPORT_EMAIL);
  const [beforeEmail, afterEmail] = hasEmail ? answer.split(SUPPORT_EMAIL) : [answer, ""];

  return (
    <article className="panel-card px-6 py-6">
      <h3 className="text-xl font-extrabold text-[var(--foreground)]">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {hasEmail ? (
          <>
            {beforeEmail}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-extrabold text-[var(--foreground)] underline"
            >
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
  const faqItems = getModeFaqs(modeKey, label);

  return (
    <section id="faq" className="app-frame px-6 py-8 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="section-eyebrow">Frequently asked questions</div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Answers, timing, and accepted guesses
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-base">
          These are the short answers most players need: what counts, when the puzzle changes, and
          where accepted-answer edge cases come from.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {faqItems.map((faq, index) => (
          <FaqCard key={`${faq.question}-${index}`} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
