"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MODES } from "@/lib/modes";

const modePaths = new Set(MODES.map((mode) => mode.href));

export default function SiteHeader() {
  const pathname = usePathname();
  const isModeRoute = pathname ? modePaths.has(pathname) : false;

  if (isModeRoute) {
    return (
      <header className="mb-5">
        <div className="app-frame px-4 py-4 md:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border-2 border-black/80 bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.08)] dark:border-white/20 dark:bg-[var(--surface)]">
                <Image
                  src="/logo.png"
                  alt="Guess The Game logo"
                  width={64}
                  height={64}
                  className="h-10 w-10 object-contain"
                  priority
                />
              </Link>

              <div>
                <div className="section-eyebrow">Daily image puzzle</div>
                <div className="font-display mt-1 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                  GuessTheGame
                </div>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  One focused round, six clues, and a fresh reset every day.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/game" className="primary-button px-4 py-2.5">
                Play today
              </Link>
              <Link href="/faq" className="secondary-button px-4 py-2.5">
                Rules
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <nav className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
            {MODES.map((mode) => (
              <Link key={mode.key} href={mode.href} className="nav-chip">
                <span className="rounded-lg bg-[var(--accent-soft)] px-2 py-1 text-[0.65rem] text-[var(--foreground)]">
                  {mode.badge}
                </span>
                <span>{mode.shortLabel}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="mb-8">
      <div className="text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[22px] border-2 border-black/80 bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] dark:border-white/20 dark:bg-[var(--surface)]">
            <Image
              src="/logo.png"
              alt="Guess The Game logo"
              width={88}
              height={88}
              className="h-14 w-14 object-contain"
              priority
            />
          </div>
          <div>
            <div className="section-eyebrow">Daily image puzzle</div>
            <div className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              GuessTheGame
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
              Guess the answer from six image clues, save your streak locally, and come back tomorrow
              for a fresh round.
            </p>
          </div>
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/game" className="primary-button">
            Play today's game
          </Link>
          <Link href="/faq" className="secondary-button">
            Read the rules
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <nav className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
        {MODES.map((mode) => (
          <Link key={mode.key} href={mode.href} className="nav-chip">
            <span className="rounded-lg bg-[var(--accent-soft)] px-2 py-1 text-[0.65rem] text-[var(--foreground)]">
              {mode.badge}
            </span>
            <span>{mode.shortLabel}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
