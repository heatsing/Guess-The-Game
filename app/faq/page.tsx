export default function FAQPage() {
  const faqs = [
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

  return (
    <main className="min-h-[60vh] rounded-2xl bg-slate-100 px-6 py-12 sm:px-10 dark:bg-slate-800">
      <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-600 dark:bg-slate-700/50">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">Game rules (Guess The Game)</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          You are shown a sequence of images revealed step by step. Each wrong guess unlocks the next, clearer image. You have up to 6 guesses to identify the video game. All 6 images are clues—from blurriest to clearest. Can you guess the game before running out of attempts?
        </p>
      </section>

      <div className="mx-auto max-w-2xl space-y-6">
        {faqs.map((faq, i) => (
          <article
            key={i}
            className="rounded-xl border border-slate-200/50 bg-white p-6 text-left shadow-lg"
          >
            <h2 className="mb-3 text-base font-bold text-slate-900">{faq.question}</h2>
            <p className="text-sm leading-relaxed text-slate-800">
              {faq.answer.includes("guessthegameemail@gmail.com") ? (
                <>
                  {faq.answer.split("guessthegameemail@gmail.com")[0]}
                  <a
                    href="mailto:guessthegameemail@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    guessthegameemail@gmail.com
                  </a>
                  {faq.answer.split("guessthegameemail@gmail.com")[1]}
                </>
              ) : (
                faq.answer
              )}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
