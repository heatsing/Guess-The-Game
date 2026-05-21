import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Nunito } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import {
  SITE_DESCRIPTION,
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
    { media: "(prefers-color-scheme: light)", color: "#070b14" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
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
        <div className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6 lg:px-8">
          <SiteHeader />

          {children}

          <footer className="site-footer">
            <div>
              <Link href="/" className="site-brand">
                <ImagePlaceholder />
                <span>Guess <strong>Universe</strong></span>
              </Link>
              <p>One universe. Daily guessing games across every category.</p>
            </div>
            <nav>
              <Link href="/">Daily Games</Link>
              <Link href="/#all-games">All Games</Link>
              <Link href="/faq">How to Play</Link>
              <Link href="/game">Start Playing</Link>
            </nav>
            <form>
              <label htmlFor="footer-email">Stay updated</label>
              <div>
                <input id="footer-email" placeholder="Enter your email" />
                <button type="button" className="primary-button">Subscribe</button>
              </div>
            </form>
          </footer>
        </div>
      </body>
    </html>
  );
}

function ImagePlaceholder() {
  return <span className="footer-logo-mark">?</span>;
}
