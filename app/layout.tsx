import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nunito } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import { MODES } from "@/lib/modes";

// App Router equivalent of project-wide getStaticProps/ISR.
// If you want getServerSideProps-like behavior instead, switch this to:
// export const dynamic = "force-dynamic";
export const dynamic = "force-static";
export const revalidate = 60;

const siteFont = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GuessTheGame",
    template: "%s | GuessTheGame",
  },
  description: "Daily visual puzzle challenges across games, movies, logos, books, and more.",
};

const FEATURED_MODE_KEYS = ["game", "price", "movie", "book"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const featuredModes = MODES.filter((mode) => FEATURED_MODE_KEYS.includes(mode.key));

  return (
    <html lang="en" suppressHydrationWarning className={siteFont.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <div className="app-frame mb-5 px-4 py-4 md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="section-eyebrow">More daily puzzle modes</div>
                <div className="mt-2 text-lg font-extrabold text-[var(--foreground)] md:text-xl">
                  Jump between visual guessing games without leaving the same flow.
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredModes.map((mode) => (
                  <Link key={mode.key} href={mode.href} className="secondary-button px-4 py-2.5">
                    {mode.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
                    Guess the answer from six image clues, save your streak locally, and come back
                    tomorrow for a fresh round.
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

            <nav className="mt-6 flex gap-2 overflow-x-auto pb-1">
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

          {children}

          <div className="mt-14 flex flex-col gap-6">
            <FAQSection />
            <AboutSection />
          </div>

          <footer className="mt-12 pb-6">
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y-2 border-black/80 bg-[var(--accent-soft)] dark:border-[color:var(--border-strong)] dark:bg-[var(--background-strong)]">
              <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                  <div>
                    <div className="section-eyebrow">Daily visual puzzle</div>
                    <div className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                      GuessTheGame
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
                      A fast daily puzzle built around six image clues, simple rules, and a format
                      that works across games, books, movies, logos, and more.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href="/game" className="primary-button">
                        Play today's challenge
                      </Link>
                      <Link href="/faq" className="secondary-button">
                        Read the FAQ
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="metric-card">
                      <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Daily reset</div>
                      <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">00:00 UTC</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--muted)]">A fresh puzzle arrives every day.</div>
                    </div>
                    <div className="metric-card">
                      <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Progress</div>
                      <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">Local</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--muted)]">Streaks and results stay on this device.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-black/15 pt-5 dark:border-[color:var(--border)] lg:flex-row lg:items-center lg:justify-between">
                  <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                    <Link href="/" className="secondary-button px-4 py-2.5">
                      Home
                    </Link>
                    <Link href="/game" className="secondary-button px-4 py-2.5">
                      Daily challenge
                    </Link>
                    <Link href="/faq" className="secondary-button px-4 py-2.5">
                      FAQ
                    </Link>
                    <Link href="/price" className="secondary-button px-4 py-2.5">
                      Guess The Price
                    </Link>
                  </nav>

                  <div className="text-sm leading-7 text-[var(--muted)] lg:text-right">
                    <div>Copyright {new Date().getFullYear()} GuessTheGame</div>
                    <div>GuessTheGame is not affiliated with guessthe.game in any way.</div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
