import type { MetadataRoute } from "next";
import { MODES } from "@/lib/modes";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...MODES.map((mode) => ({
      url: absoluteUrl(mode.href),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: mode.key === "game" ? 0.95 : 0.8,
    })),
  ];
}
