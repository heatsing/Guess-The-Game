"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { DailyGame } from "@/lib/gameTypes";
import type { Mode } from "@/lib/modes";
import { MODES } from "@/lib/modes";
import { buildShareText, isCorrectGuess } from "@/lib/gameEngine";
import { dispatchStatsUpdate } from "@/components/PlayerStatistics";

type Props = {
  mode: Mode;
  daily: DailyGame;
  titles?: string[];
  challengeGames?: DailyGame[];
};

const SAMPLE_GUESSES = ["tower", "skyscraper", "eiffel tower", "starlight"];
const COLOR_SET = ["#7c3aed", "#2f80ed", "#34d1bf", "#52c45a", "#ffbd2e", "#ef4b5f"];
const WORD_ROWS = ["PLANET", "PLACE", ""];

function storageKey(modeKey: string, puzzleKey: string) {
  return `gtg:v3:${modeKey}:${puzzleKey}`;
}

function prettyPuzzleNumber(puzzleKey: string) {
  const compact = puzzleKey.replaceAll("-", "");
  return `#${compact.slice(-4)}`;
}

function toneClass(accent: string) {
  return `mode-tone mode-tone-${accent}`;
}

function getHintLabels(modeKey: string) {
  const labels: Record<string, string[]> = {
    book: ["Quote clue", "Publication year", "Author origin", "Plot detail"],
    song: ["Genre", "Release decade", "Artist", "Lyric clue"],
    number: ["Range", "Digits", "Sum", "Multiple"],
    price: ["Category", "Retail range", "Brand", "Market clue"],
    colors: ["Warm color", "Blue family", "Lightness", "Position clue"],
    word: ["Category", "First letter", "Letter pattern", "Meaning"],
    flag: ["Region", "Stripes", "Capital", "First letter"],
    country: ["Continent", "Neighbor", "Currency", "Flag clue"],
    drawing: ["Category", "Keyword", "Shape", "Detail"],
    emoji: ["Phrase category", "Word count", "First letter", "Reveal letter"],
    phrase: ["Word count", "Meaning", "Speed clue", "Final hint"],
  };
  return labels[modeKey] ?? ["Release year", "Category", "Origin", "Fun fact"];
}

export default function ModeExperience({ mode, daily, titles = [], challengeGames = [] }: Props) {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [cluesUsed, setCluesUsed] = useState(1);
  const [message, setMessage] = useState("");
  const timedMode = mode.key === "country" || mode.key === "flag";
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [timedActive, setTimedActive] = useState(timedMode);
  const activeGame = timedMode && challengeGames.length ? challengeGames[challengeIndex % challengeGames.length]! : daily;

  const maxGuesses = activeGame.maxGuesses ?? 6;
  const remaining = Math.max(0, maxGuesses - guesses.length);
  const puzzleNumber = prettyPuzzleNumber(activeGame.puzzleKey);
  const hints = getHintLabels(mode.key);
  const otherModes = MODES.filter((item) => item.key !== mode.key).slice(0, 5);
  const suggestions = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return [];
    return titles.filter((title) => title.toLowerCase().includes(query)).slice(0, 5);
  }, [input, titles]);

  useEffect(() => {
    if (!timedMode || !timedActive || secondsLeft <= 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft, timedActive, timedMode]);

  useEffect(() => {
    if (timedMode && secondsLeft === 0) {
      setTimedActive(false);
      setMessage(`Time is up. You scored ${score}.`);
    }
  }, [score, secondsLeft, timedMode]);

  function nextTimedRound() {
    setChallengeIndex((current) => current + 1);
    setGuesses([]);
    setCluesUsed(1);
  }

  function restartTimedChallenge() {
    setScore(0);
    setChallengeIndex(0);
    setGuesses([]);
    setInput("");
    setMessage("");
    setSecondsLeft(60);
    setTimedActive(true);
    setStatus("playing");
  }

  function submitGuess(event: FormEvent) {
    event.preventDefault();
    if (status !== "playing" || (timedMode && !timedActive)) return;
    const cleaned = input.trim();
    if (!cleaned) return;

    const nextGuesses = [...guesses, cleaned].slice(0, maxGuesses);
    setGuesses(nextGuesses);
    setInput("");

    if (isCorrectGuess(activeGame, cleaned)) {
      if (timedMode) {
        setScore((current) => current + 1);
        setMessage(`Correct. Next ${mode.shortLabel.toLowerCase()} loaded.`);
        nextTimedRound();
        return;
      }
      setStatus("won");
      setMessage(`Correct. You solved ${mode.label} in ${nextGuesses.length} guesses.`);
      dispatchStatsUpdate(mode.key);
      try {
        localStorage.setItem(storageKey(mode.key, activeGame.puzzleKey), JSON.stringify({ guesses: nextGuesses, status: "won" }));
      } catch {
        // local progress is optional
      }
      return;
    }

    const nextClue = Math.min(hints.length, cluesUsed + 1);
    setCluesUsed(nextClue);

    if (nextGuesses.length >= maxGuesses) {
      setStatus("lost");
      setMessage(`Round over. The answer was ${activeGame.title}.`);
      dispatchStatsUpdate(mode.key);
      return;
    }

    setMessage(`Not quite. Hint ${nextClue} is now available.`);
  }

  async function shareResult() {
    const text = buildShareText({ game: activeGame, guesses, status, url: window.location.href });
    if (navigator.share) {
      await navigator.share({ title: mode.label, text, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(text);
    setMessage("Result copied to clipboard.");
  }

  return (
    <main id="main-content" className={`${toneClass(mode.accent)} mode-page`}>
      <div className="mode-backline">
        <Link href="/" className="mode-back-link">Back to all games</Link>
        <div className="mode-actions">
          <button type="button" className="quiet-button">How to play</button>
          <button type="button" onClick={shareResult} className="quiet-button">Share</button>
        </div>
      </div>

      <section className="mode-title-row">
        <div className="mode-mark" aria-hidden="true">{mode.icon}</div>
        <div>
          <h1>{mode.label}</h1>
          <p>{mode.description}</p>
          <div className="mode-meta">
            <span>{timedMode ? "60 second challenge" : "Daily puzzle"}</span>
            <span>{timedMode ? `${score} correct` : puzzleNumber}</span>
            <span>{timedMode ? `${secondsLeft}s left` : activeGame.puzzleKey}</span>
          </div>
        </div>
      </section>

      <section className="mode-layout">
        <div className="mode-primary">
          {timedMode ? (
            <TimedChallengeBar
              score={score}
              secondsLeft={secondsLeft}
              total={challengeGames.length}
              active={timedActive}
              onRestart={restartTimedChallenge}
            />
          ) : null}
          <PuzzleSurface mode={mode} daily={activeGame} guesses={guesses} cluesUsed={cluesUsed} />
          <form onSubmit={submitGuess} className="guess-strip">
            <div className="guess-field-wrap">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={timedMode ? `Guess this ${mode.key === "flag" ? "flag" : "country"}...` : mode.template === "logic" ? "Enter your number or estimate..." : "Type your guess here..."}
                disabled={status !== "playing" || (timedMode && !timedActive)}
                className="guess-field"
              />
              {suggestions.length ? (
                <div className="suggestion-popover">
                  {suggestions.map((title) => (
                    <button key={title} type="button" onClick={() => setInput(title)}>
                      {title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button type="submit" disabled={!input.trim() || status !== "playing" || (timedMode && !timedActive)} className="submit-button">
              Submit Guess
            </button>
          </form>

          <div className="attempt-note">
            <span>{timedMode ? `${challengeGames.length} global entries loaded` : `${remaining} attempts remaining`}</span>
            <button type="button" onClick={() => setCluesUsed((value) => Math.min(hints.length, value + 1))}>
              Reveal hint
            </button>
          </div>

          {message ? <div className={`result-banner ${status}`}>{message}</div> : null}

          <GuessHistory mode={mode} daily={activeGame} guesses={guesses} />
        </div>

        <aside className="mode-sidebar">
          <HintsPanel hints={hints} cluesUsed={cluesUsed} />
          <StatsPanel />
          <PreviousPanel mode={mode} />
        </aside>
      </section>

      <section className="mode-secondary-grid">
        <InfoCard mode={mode} />
        <RelatedGames modes={otherModes} />
      </section>
    </main>
  );
}

function PuzzleSurface({
  mode,
  daily,
  guesses,
  cluesUsed,
}: {
  mode: Mode;
  daily: DailyGame;
  guesses: string[];
  cluesUsed: number;
}) {
  if (mode.template === "audio") return <AudioPuzzle mode={mode} />;
  if (mode.template === "logic") return <LogicPuzzle mode={mode} daily={daily} guesses={guesses} />;
  if (mode.template === "colors") return <ColorsPuzzle />;
  if (mode.template === "word") return <WordPuzzle />;
  if (mode.template === "rebus") return <RebusPuzzle mode={mode} daily={daily} />;
  if (mode.template === "quote") return <QuotePuzzle daily={daily} cluesUsed={cluesUsed} />;
  return <ImagePuzzle mode={mode} daily={daily} cluesUsed={cluesUsed} />;
}

function TimedChallengeBar({
  score,
  secondsLeft,
  total,
  active,
  onRestart,
}: {
  score: number;
  secondsLeft: number;
  total: number;
  active: boolean;
  onRestart: () => void;
}) {
  const progress = Math.max(0, Math.min(100, (secondsLeft / 60) * 100));

  return (
    <section className="timed-card">
      <div>
        <span>Timed global challenge</span>
        <strong>{secondsLeft}s</strong>
      </div>
      <div className="timed-progress"><i style={{ width: `${progress}%` }} /></div>
      <div>
        <span>{score} correct</span>
        <span>{total} countries loaded</span>
        {!active ? <button type="button" onClick={onRestart}>Play again</button> : null}
      </div>
    </section>
  );
}

function ImagePuzzle({ mode, daily, cluesUsed }: { mode: Mode; daily: DailyGame; cluesUsed: number }) {
  const image = daily.images[Math.min(daily.images.length - 1, Math.max(0, cluesUsed - 1))] ?? "/images/placeholder.svg";
  const isDrawing = mode.key === "drawing";
  const isFlag = mode.key === "flag";
  const isCountry = mode.key === "country";

  return (
    <section className="puzzle-card">
      <div className="puzzle-card-top">
        <span>{isFlag ? "Which country's flag is this?" : isCountry ? "Which country is this map?" : isDrawing ? "Drawing clarity" : "Clue image"}</span>
        <strong>{cluesUsed}/6</strong>
      </div>
      {isFlag ? (
        <div className="image-stage flag-image-stage">
          <img src={image} alt={`${daily.title} flag`} />
        </div>
      ) : isDrawing ? (
        <div className="drawing-stage" aria-label="Blurred bicycle drawing">
          <div className="bike-shape" />
        </div>
      ) : isCountry ? (
        <div className="image-stage country-map-stage">
          <img src={image} alt={`${daily.title} map silhouette`} />
        </div>
      ) : (
        <div className="image-stage">
          <img src={image} alt={`${mode.label} clue`} />
        </div>
      )}
      <div className="clarity-meter">
        <span>Clarity {Math.min(100, 15 + cluesUsed * 14)}%</span>
        <div><i style={{ width: `${Math.min(100, 15 + cluesUsed * 14)}%` }} /></div>
      </div>
    </section>
  );
}

function QuotePuzzle({ daily, cluesUsed }: { daily: DailyGame; cluesUsed: number }) {
  return (
    <section className="puzzle-card quote-stage">
      <span className="clue-pill">Clue {cluesUsed} of 4</span>
      <blockquote>
        <p>All happy families are alike; each unhappy family is unhappy in its own way.</p>
        <cite>Opening line clue for {daily.title}</cite>
      </blockquote>
      <div className="unlock-track">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className={index < cluesUsed ? "open" : ""}>{index + 1}</span>
        ))}
      </div>
    </section>
  );
}

function AudioPuzzle({ mode }: { mode: Mode }) {
  return (
    <section className="puzzle-card audio-stage">
      <div className="puzzle-card-top">
        <span>Listen to the clue</span>
        <strong>0:08</strong>
      </div>
      <button type="button" className="play-orb" aria-label={`Play ${mode.label} clue`}>Play</button>
      <div className="waveform">
        {Array.from({ length: 42 }).map((_, index) => (
          <span key={index} style={{ height: `${18 + ((index * 17) % 54)}px` }} />
        ))}
      </div>
      <div className="audio-progress"><i /></div>
    </section>
  );
}

function LogicPuzzle({ mode, daily, guesses }: { mode: Mode; daily: DailyGame; guesses: string[] }) {
  const isNumber = mode.key === "number";
  const clues = isNumber
    ? [["Range", "1 - 1000"], ["Digits", "3 digits"], ["Sum of digits", "15"], ["Multiple of", "7"]]
    : [["Category", "Daily item"], ["Market", "Retail"], ["Range", "$10 - $200"], ["Signal", "Popular pick"]];

  return (
    <section className="puzzle-card logic-stage">
      <h2>{isNumber ? "I'm thinking of a number between 1 and 1000" : `Estimate the mystery ${daily.title}`}</h2>
      <div className="logic-clues">
        {clues.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="range-history">
        {(guesses.length ? guesses : ["750", "500", "250"]).slice(0, 5).map((guess, index) => (
          <div key={`${guess}-${index}`}>
            <span>{index + 1}</span>
            <strong>{guess}</strong>
            <em>{index % 2 === 0 ? "Too high" : "Too low"}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function ColorsPuzzle() {
  return (
    <section className="puzzle-card colors-stage">
      <h2>Guess the 6 hidden colors</h2>
      <div className="hidden-colors">
        {COLOR_SET.map((color, index) => (
          <span key={color} style={{ background: color }}>{index < 2 ? "?" : ""}</span>
        ))}
      </div>
      <div className="color-board">
        {Array.from({ length: 8 }).map((_, row) => (
          <div key={row}>
            <b>{row + 1}</b>
            {Array.from({ length: 6 }).map((__, col) => (
              <span key={col} style={{ background: row < 3 ? COLOR_SET[(col + row) % COLOR_SET.length] : "transparent" }} />
            ))}
            <i>{row < 3 ? "● ● ○ ○ ○ ○" : "○ ○ ○ ○ ○ ○"}</i>
          </div>
        ))}
      </div>
    </section>
  );
}

function WordPuzzle() {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
  return (
    <section className="puzzle-card word-stage">
      <div className="word-grid">
        {Array.from({ length: 6 }).map((_, row) => {
          const value = WORD_ROWS[row] ?? "";
          return (
            <div key={row}>
              {Array.from({ length: 6 }).map((__, col) => {
                const letter = value[col] ?? "";
                const state = row === 0 && col < 2 ? "hit" : row < 2 && letter ? "near" : "";
                return <span key={col} className={state}>{letter}</span>;
              })}
            </div>
          );
        })}
      </div>
      <div className="keyboard">
        {keys.map((key) => <button type="button" key={key}>{key}</button>)}
      </div>
    </section>
  );
}

function RebusPuzzle({ mode, daily }: { mode: Mode; daily: DailyGame }) {
  const isEmoji = mode.key === "emoji";
  return (
    <section className="puzzle-card rebus-stage">
      <div className="rebus-line" aria-label={`${mode.label} visual clue`}>
        {isEmoji ? (
          <>
            <span>STAR</span><b>+</b><span>EYES</span><b>+</b><span>NIGHT</span>
          </>
        ) : (
          <>
            <span>EYES</span><b>+</b><span>HEART</span><b>+</b><span>CAKE</span>
          </>
        )}
      </div>
      <div className="answer-slots">
        {daily.title.split("").map((char, index) => (
          <span key={index}>{char === " " ? "" : ""}</span>
        ))}
      </div>
    </section>
  );
}

function GuessHistory({ mode, daily, guesses }: { mode: Mode; daily: DailyGame; guesses: string[] }) {
  const rows = guesses.length ? guesses : SAMPLE_GUESSES.slice(0, mode.template === "word" ? 2 : 3);
  return (
    <section className="panel-card-dark">
      <h2>Your guesses</h2>
      <div className="guess-history">
        {rows.map((guess, index) => {
          const correct = isCorrectGuess(daily, guess);
          return (
            <div key={`${guess}-${index}`} className={correct ? "correct" : ""}>
              <span>{index + 1}</span>
              <strong>{guess}</strong>
              <em>{correct ? "Correct" : index === rows.length - 1 ? "Close" : "Wrong"}</em>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HintsPanel({ hints, cluesUsed }: { hints: string[]; cluesUsed: number }) {
  return (
    <section className="side-card">
      <div className="side-card-title">
        <h2>Hints</h2>
        <span>{cluesUsed}/{hints.length}</span>
      </div>
      <div className="hint-list">
        {hints.map((hint, index) => (
          <article key={hint} className={index < cluesUsed ? "unlocked" : ""}>
            <b>{index + 1}</b>
            <div>
              <strong>{hint}</strong>
              <p>{index < cluesUsed ? "This clue is available for today's puzzle." : `Unlocks after ${index} guess${index === 1 ? "" : "es"}.`}</p>
            </div>
            <span>{index < cluesUsed ? "open" : "lock"}</span>
          </article>
        ))}
      </div>
      <button type="button" className="full-button">Reveal hint</button>
    </section>
  );
}

function StatsPanel() {
  return (
    <section className="side-card">
      <h2>Your stats</h2>
      <div className="stats-grid">
        <article><span>Win rate</span><strong>72%</strong></article>
        <article><span>Played</span><strong>48</strong></article>
        <article><span>Streak</span><strong>12</strong></article>
        <article><span>Avg.</span><strong>3.4</strong></article>
      </div>
    </section>
  );
}

function PreviousPanel({ mode }: { mode: Mode }) {
  return (
    <section className="side-card">
      <div className="side-card-title">
        <h2>Previous puzzles</h2>
        <Link href="/">View all</Link>
      </div>
      <div className="previous-list">
        {Array.from({ length: 5 }).map((_, index) => (
          <article key={index}>
            <span>#{1023 - index}</span>
            <strong>{index === 0 ? mode.label.replace("Guess The ", "") : ["Golden Gate", "The Hobbit", "Monstera", "Italy"][index - 1] ?? "Puzzle"}</strong>
            <em>Won</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ mode }: { mode: Mode }) {
  return (
    <section className="wide-card">
      <h2>About {mode.label}</h2>
      <p>{mode.description} The page is tuned to this puzzle type so the main clue, input flow, hints, and history match how players think through the round.</p>
      <div className="info-points">
        <span>Daily puzzle</span>
        <span>Local streaks</span>
        <span>Hint ladder</span>
      </div>
    </section>
  );
}

function RelatedGames({ modes }: { modes: Mode[] }) {
  return (
    <section className="wide-card related-card">
      <div className="side-card-title">
        <h2>You might also like</h2>
        <Link href="/">All games</Link>
      </div>
      <div className="related-grid">
        {modes.map((mode) => (
          <Link href={mode.href} key={mode.key}>
            <span className={`mini-mark mode-tone-${mode.accent}`} aria-hidden="true">{mode.icon}</span>
            <strong>{mode.label}</strong>
            <em>Play now</em>
          </Link>
        ))}
      </div>
    </section>
  );
}
