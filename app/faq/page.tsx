import Link from "next/link";

export default function FAQPage() {
  return (
    <main>
      <section className="app-frame px-6 py-8 text-center md:px-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="section-eyebrow">Help and answer rules</div>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
            FAQ, answer acceptance, and what changes each day
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            The detailed answers live below in the shared FAQ section. If you are here to play,
            jump straight into today's puzzle and come back when you need a rule check.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/game" className="primary-button">
              Play today's challenge
            </Link>
            <Link href="/" className="secondary-button">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
