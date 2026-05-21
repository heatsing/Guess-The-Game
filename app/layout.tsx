import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Nunito } from "next/font/google";
import "./globals.css";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import SiteHeader from "@/components/SiteHeader";
import {
  SITE_DESCRIPTION,
  SITE_HOST,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
import { buildSiteJsonLd } from "@/lib/structuredData";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: absoluteUrl("/logo.png"),
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/logo.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  category: "games",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff9e6" },
    { media: "(prefers-color-scheme: dark)", color: "#12161d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteJsonLd = buildSiteJsonLd();

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
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-50 rounded-xl border-2 border-black bg-[var(--accent)] px-4 py-2 font-bold text-black focus:not-sr-only"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <SiteHeader />

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
                      {SITE_NAME}
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
                    <div>Copyright {new Date().getFullYear()} {SITE_NAME}</div>
                    <div>
                      Official site:{" "}
                      <a
                        href={SITE_URL}
                        className="font-bold text-[var(--foreground)] underline decoration-black/30 underline-offset-4"
                      >
                        {SITE_HOST}
                      </a>
                    </div>
                    <div>{SITE_NAME} is an independent daily puzzle project.</div>
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
