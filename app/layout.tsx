import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import { MODES } from "@/lib/modes";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GuessTheGame",
    template: "%s | GuessTheGame",
  },
  description: "Daily visual puzzle challenges across games, movies, logos, books, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
          <header className="sticky top-4 z-40 mb-8">
            <div className="app-frame px-4 py-4 md:px-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <Link href="/" className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[20px] border border-white/70 bg-white/80 p-2 shadow-[0_12px_24px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/5">
                    <Image
                      src="/logo.png"
                      alt="Guess The Game logo"
                      width={88}
                      height={88}
                      className="h-10 w-10 object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <div className="section-eyebrow">Daily Visual Puzzle Arcade</div>
                    <div className="font-display text-xl font-semibold tracking-tight text-[var(--foreground)] md:text-2xl">
                      GuessTheGame
                    </div>
                  </div>
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/game" className="primary-button px-4 py-2.5">
                    Play today's puzzle
                  </Link>
                  <Link href="/faq" className="secondary-button hidden px-4 py-2.5 sm:inline-flex">
                    FAQ
                  </Link>
                  <ThemeToggle />
                </div>
              </div>

              <nav className="-mx-1 mt-4 flex gap-2 overflow-x-auto pb-1">
                {MODES.map((mode) => (
                  <Link key={mode.key} href={mode.href} className="nav-chip">
                    <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[0.65rem] tracking-[0.24em] text-[var(--foreground)]">
                      {mode.badge}
                    </span>
                    <span>{mode.shortLabel}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {children}

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FAQSection />
            <AboutSection />
          </div>

          <footer className="mt-10 pb-6">
            <div className="app-frame px-6 py-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="section-eyebrow">Built for a daily habit</div>
                  <div className="font-display mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                    Six clues. One clean answer. Back tomorrow.
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    New puzzles unlock every day at 00:00 UTC. Results and streaks stay on this
                    device for each mode.
                  </p>
                </div>

                <nav className="flex flex-wrap gap-2">
                  <Link href="/" className="secondary-button px-4 py-2.5">
                    Home
                  </Link>
                  <Link href="/game" className="secondary-button px-4 py-2.5">
                    Daily challenge
                  </Link>
                  <Link href="/price" className="secondary-button px-4 py-2.5">
                    Guess The Price
                  </Link>
                  <Link href="/faq" className="secondary-button px-4 py-2.5">
                    FAQ
                  </Link>
                </nav>
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-[color:var(--border)] pt-4 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
                <span>Copyright {new Date().getFullYear()} GuessTheGame</span>
                <span>Independent fan project. Not affiliated with guessthe.game.</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
