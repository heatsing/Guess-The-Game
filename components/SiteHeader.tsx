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
  const brandEyebrow = isModeRoute ? "Daily image puzzle" : "Clear daily puzzle";
  const brandCopy = isModeRoute
    ? "One focused round, six clues, and a fresh reset every day."
    : "Daily image clues across games, books, movies, logos, and more.";

  return (
    <header className={isModeRoute ? "mb-5" : "mb-6"}>
      <div className="app-frame px-4 py-4 md:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border-2 border-black/80 bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.08)] dark:border-white/20 dark:bg-[var(--surface)]"
            >
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
              <div className="section-eyebrow">{brandEyebrow}</div>
              <div className="font-display mt-1 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                GuessTheGame
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">{brandCopy}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isModeRoute ? (
              <a href="#board" className="primary-button px-4 py-2.5">
                Jump to board
              </a>
            ) : (
              <Link href="/game" className="primary-button px-4 py-2.5">
                Play today's game
              </Link>
            )}
            <Link href="/faq" className="secondary-button px-4 py-2.5">
              Rules
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
          {MODES.map((mode) => (
            <Link
              key={mode.key}
              href={mode.href}
              aria-current={pathname === mode.href ? "page" : undefined}
              className={pathname === mode.href ? "nav-chip nav-chip-active" : "nav-chip"}
            >
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
