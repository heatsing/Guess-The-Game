import type { Metadata } from "next";

export const SITE_NAME = "Guess The Game";
export const SITE_HOST = "guessthegame.net";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_DESCRIPTION =
  "Play a clear daily image puzzle across games, books, movies, logos, and more. Study the clue stack, submit your guess, and come back for a fresh round every day.";
export const SUPPORT_EMAIL = "guessthegameemail@gmail.com";
export const SITE_KEYWORDS = [
  "Guess The Game",
  "daily puzzle",
  "image guessing game",
  "guess the game",
  "guess the book",
  "guess the movie",
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
    alternates: {
      canonical: path,
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
