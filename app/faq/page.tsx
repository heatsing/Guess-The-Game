import type { Metadata } from "next";
import Link from "next/link";
import { getModeFaqs } from "@/lib/faq";
import { buildMetadata } from "@/lib/site";
import { buildFaqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "FAQ and answer rules",
  description:
    "Read the answer rules, daily reset timing, accepted guess policy, and core help topics for GuessTheGame.",
  path: "/faq",
  keywords: ["faq", "answer rules", "accepted guesses", "daily reset"],
});

const FAQ_SUMMARY = [
  {
    label: "Accepted answers",
    text: "Every puzzle uses a curated answer list so title variants can be supported intentionally.",
  },
  {
    label: "Daily timing",
    text: "All modes roll to the next puzzle at 00:00 UTC, no matter which category you play.",
  },
  {
    label: "Saved progress",
    text: "Results and streaks stay on the current device. No account is required to keep playing.",
  },
];

export default function FAQPage() {
  const faqJsonLd = buildFaqPageJsonLd(
    "GuessTheGame FAQ",
    "/faq",
    getModeFaqs("game", "Guess The Game"),
  );

  return (
    <main id="main-content" className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="app-frame px-6 py-8 text-center md:px-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="section-eyebrow">Help and answer rules</div>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
            FAQ, answer acceptance, and what changes each day
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            This page is the quick reference for timing, accepted guesses, and the assumptions
            behind each round. If you only need the short version, the overview below covers the
            core rules before the full FAQ section starts.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#faq" className="primary-button">
              Jump to answers
            </a>
            <Link href="/game" className="secondary-button">
              Play today's challenge
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {FAQ_SUMMARY.map((item) => (
            <article key={item.label} className="metric-card text-left">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{item.label}</div>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="panel-card-strong px-6 py-7">
          <div className="section-eyebrow">What you will find below</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            The rules that actually affect play
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>How answer matching works when titles have alternate names or regional spellings.</p>
            <p>When a new puzzle replaces the previous one and how local progress is stored.</p>
            <p>Mode-specific notes for categories like books where accepted guesses can vary.</p>
          </div>
        </article>

        <article className="panel-card px-6 py-7">
          <div className="section-eyebrow">Need a round now?</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Read fast, then get back to playing
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            The shared FAQ section sits right below this intro. Once you have the rule you need,
            jump straight into today's board and keep the rest bookmarked for later.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/game" className="primary-button">
              Open Guess The Game
            </Link>
            <Link href="/" className="secondary-button">
              Back to home
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
