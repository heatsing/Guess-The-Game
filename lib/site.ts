import type { Metadata } from "next";

export const SITE_NAME = "Guess The Game";
export const SITE_HOST = "guessthegame.net";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_DESCRIPTION =
  "Play Guess The Game every day with fast guessing games for video games, flags, countries, movies, books, logos, words, songs, animals, plants, colors, numbers, and more.";
export const SUPPORT_EMAIL = "guessthegameemail@gmail.com";
export const SITE_KEYWORDS = [
  "Guess The Game",
  "daily puzzle",
  "daily guessing games",
  "image guessing game",
  "guess the game",
  "guess the flag",
  "guess the country",
  "guess the book",
  "guess the movie",
  "guess the logo",
  "geography quiz",
  "daily word game alternative",
  "visual trivia",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type MetadataInput = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  siteNameInTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  siteNameInTitle = false,
}: MetadataInput): Metadata {
  const pageTitle = title
    ? siteNameInTitle
      ? title
      : `${title} | ${SITE_NAME}`
    : SITE_NAME;

  return {
    title: siteNameInTitle ? pageTitle : title,
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: path,
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
    openGraph: {
      title: pageTitle,
      description,
      url: absoluteUrl(path),
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
      title: pageTitle,
      description,
      images: [absoluteUrl("/logo.png")],
    },
  };
}
