import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "GuessTheGame",
  description: "Guess the video game from a few images.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <div className="sticky top-0 z-40 w-screen border-b border-yellow-500 bg-[#facc15] text-slate-900">
          <div className="mx-auto flex h-11 max-w-6xl items-center justify-center gap-3 px-3 text-sm font-semibold md:gap-6 md:text-base">
            <a href="/game" className="rounded-md px-3 py-1 hover:bg-yellow-400/70">🎯 Daily ▾</a>
            <a href="/game" className="rounded-md px-2.5 py-1 hover:bg-yellow-400/70">📅</a>
            <a href="/price" className="rounded-md px-2.5 py-1 hover:bg-yellow-400/70">💰</a>
            <a href="/game" className="rounded-md px-2.5 py-1 hover:bg-yellow-400/70">🏆</a>
            <a href="/game" className="rounded-md px-2.5 py-1 hover:bg-yellow-400/70">📊</a>
            <a href="#faq" className="rounded-md px-2.5 py-1 hover:bg-yellow-400/70">❓</a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Guess The Game logo"
                width={88}
                height={88}
                className="h-14 w-14 object-contain md:h-16 md:w-16"
                priority
              />
              <div>
                <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">GuessTheGame</div>
                <div className="text-sm text-slate-800 dark:text-slate-200">Play daily visual guessing challenges.</div>
              </div>
            </a>
            <nav className="flex items-center gap-2">
              <ThemeToggle />
              <a
                className="rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                href="/game">
                Play today&apos;s game
              </a>
            </nav>
          </header>
          {children}
          <FAQSection />
          <AboutSection />
          <footer className="mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-slate-200 bg-slate-200/60 py-8 dark:border-slate-600 dark:bg-slate-900/90">
            <div className="mx-auto flex flex-col items-center justify-center gap-3 text-center text-sm">
              <span className="text-slate-800 dark:text-slate-200">© {new Date().getFullYear()} GuessTheGame.com</span>
              <nav className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <a href="/faq" className="hover:text-slate-900 dark:hover:text-white">FAQ</a>
                <span className="text-slate-500 dark:text-slate-400">|</span>
                <a href="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms</a>
                <span className="text-slate-500 dark:text-slate-400">|</span>
                <a href="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</a>
                <span className="text-slate-500 dark:text-slate-400">|</span>
                <a href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</a>
              </nav>
              <p className="max-w-md text-slate-800 dark:text-slate-200">
                GuessTheGame.com is not affiliated with &apos;Guess the Game&apos; by guessthe.game in any way.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

