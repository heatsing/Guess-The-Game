import type { Mode } from "@/lib/modes";
import type { FaqEntry } from "@/lib/faq";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  absoluteUrl,
} from "@/lib/site";
import { getModeSeo } from "@/lib/seo";

export function buildSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/logo.png"),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SUPPORT_EMAIL,
        },
      ],
    },
  ];
}

export function buildHomePageJsonLd(modes: Mode[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Daily Puzzle Modes`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: modes.map((mode, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: mode.label,
        url: absoluteUrl(mode.href),
        description: mode.description,
      })),
    },
  };
}

export function buildFaqPageJsonLd(title: string, path: string, faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: title,
    url: absoluteUrl(path),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildModePageJsonLd(mode: Mode, description: string) {
  const seo = getModeSeo(mode.key);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: absoluteUrl(mode.href),
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: {
        "@type": "Thing",
        name: mode.label,
        description: mode.description,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Game",
      name: mode.label,
      description: seo.description,
      url: absoluteUrl(mode.href),
      genre: ["Puzzle", "Trivia", mode.shortLabel],
      gamePlatform: "Web browser",
      isAccessibleForFree: true,
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      potentialAction: {
        "@type": "PlayAction",
        target: absoluteUrl(mode.href),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME,
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: mode.label,
          item: absoluteUrl(mode.href),
        },
      ],
    },
  ];
}
