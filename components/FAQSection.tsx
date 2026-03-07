import Link from "next/link";

const FAQ_ITEMS = [
  {
    question: "Why is my answer not accepted?",
    answer:
      "We maintain a curated list of acceptable answers for each game. If your guess is not accepted, it may not match our database (e.g. spelling, alternate titles, or regional names). If you think we should add an answer, please email us: guessthegameemail@gmail.com",
  },
  {
    question: "Where can I see the answers to the game?",
    answer:
      "Answers to today's game you can find only the next day after 12 am. To do this, you need to click on the Yesterday's button. There you will see the answer to the previous game, as well as your guesses in bold.",
  },
  {
    question: "Do my stats sync across devices?",
    answer: "Not yet. Statistics are stored in your browser on this device.",
  },
];

export default function FAQSection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className="mt-8 rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
          Find answers to common questions about the game.
        </p>
        <Link
          href="/faq"
          className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          View all FAQs
        </Link>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-line bg-card p-6 shadow-soft dark:border-slate-600 dark:bg-slate-800/50">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 space-y-4">
        {FAQ_ITEMS.map((faq, i) => (
          <details
            key={i}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md dark:border-slate-600 dark:bg-slate-700/50"
          >
            <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {faq.answer.includes("guessthegameemail@gmail.com") ? (
                <>
                  {faq.answer.split("guessthegameemail@gmail.com")[0]}
                  <a
                    href="mailto:guessthegameemail@gmail.com"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    guessthegameemail@gmail.com
                  </a>
                  {faq.answer.split("guessthegameemail@gmail.com")[1]}
                </>
              ) : (
                faq.answer
              )}
            </p>
          </details>
        ))}
      </div>
      <Link
        href="/faq"
        className="mt-4 inline-block text-sm font-medium text-brand hover:underline dark:text-blue-400"
      >
        More FAQs →
      </Link>
    </section>
  );
}
