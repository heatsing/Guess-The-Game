import type { Metadata } from "next";
import Link from "next/link";
import { MODES } from "@/lib/modes";
import { buildMetadata } from "@/lib/site";
import { buildHomePageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "Guess Universe: Daily guessing games",
  description:
    "Play daily guessing games across images, books, movies, logos, colors, countries, words, songs, and more.",
  path: "/",
  keywords: ["daily game", "guessing game", "visual puzzle", "trivia game"],
  siteNameInTitle: true,
});

const HOW_IT_WORKS = [
  ["Choose a game", "Pick one of the daily puzzle modes."],
  ["View the clue", "Read, watch, listen, or inspect the board."],
  ["Make a guess", "Submit when you think you know it."],
  ["Use hints", "Unlock more context when you need it."],
  ["Keep streak", "Return tomorrow for the next puzzle."],
];

export default function HomePage() {
  const homeJsonLd = buildHomePageJsonLd(MODES);
  const featured = MODES.find((mode) => mode.key === "game") ?? MODES[0]!;

  return (
    <main id="main-content" className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <section className="home-hero">
        <div className="hero-copy">
          <span className="home-pill">{MODES.length} games · 1 daily challenge</span>
          <h1>
            Play daily <span>guessing games</span>
          </h1>
          <p>
            Guess games, books, movies, logos, animals, songs, colors, words, countries, and more
            in one universe built for fast daily play.
          </p>
          <div className="hero-actions">
            <Link href="/game" className="primary-button">Play today's games</Link>
            <a href="#all-games" className="secondary-button">Explore all games</a>
          </div>
        </div>

        <Link href={featured.href} className={`featured-card mode-tone-${featured.accent}`}>
          <div className="featured-art">
            <div className="featured-silhouette" />
            <span>Featured today</span>
            <b>#1024</b>
          </div>
          <div className="featured-content">
            <span className="mini-mark">{featured.badge}</span>
            <div>
              <h2>{featured.label}</h2>
              <p>{featured.description}</p>
            </div>
          </div>
        </Link>
      </section>

      <section id="all-games" className="home-section">
        <div className="home-section-title">
          <div>
            <h2>All daily games</h2>
            <p>Each page gets a UI matched to its puzzle type.</p>
          </div>
          <Link href="/game" className="quiet-button">Start with classic</Link>
        </div>

        <div className="game-grid">
          {MODES.map((mode) => (
            <Link href={mode.href} key={mode.key} className={`game-tile mode-tone-${mode.accent}`}>
              <span className="mode-mark">{mode.badge}</span>
              <h3>{mode.label}</h3>
              <p>{mode.description}</p>
              <div>
                <em>{mode.template}</em>
                <strong>Play</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="leaderboard" className="home-stats">
        <article><strong>50,000+</strong><span>Total players</span></article>
        <article><strong>3,650+</strong><span>Daily puzzles</span></article>
        <article><strong>{MODES.length}</strong><span>Games to play</span></article>
        <article><strong>98</strong><span>Max win streak</span></article>
      </section>

      <section id="about" className="home-how">
        <h2>How it works</h2>
        <div>
          {HOW_IT_WORKS.map(([title, copy], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
