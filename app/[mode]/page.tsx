import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODES } from "@/lib/modes";
import { getDailyForModeSmart, isModeKey } from "@/lib/getDailyForMode";
import ModePage from "@/components/ModePage";
import { buildMetadata } from "@/lib/site";
import { getModeSeo } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODES.map((m) => ({ mode: m.key }));
}

type Props = { params: Promise<{ mode: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode } = await params;
  if (!isModeKey(mode)) {
    return {};
  }

  const modeConfig = MODES.find((item) => item.key === mode)!;
  const seo = getModeSeo(modeConfig.key);

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: modeConfig.href,
    keywords: seo.keywords,
    siteNameInTitle: true,
  });
}

export default async function ModeRoute({ params }: Props) {
  const { mode } = await params;
  if (!isModeKey(mode)) {
    notFound();
  }
  const modeConfig = MODES.find((m) => m.key === mode)!;
  const daily = await getDailyForModeSmart(mode);
  return (
    <ModePage
      modeKey={modeConfig.key}
      modeLabel={modeConfig.label}
      description={modeConfig.description}
      daily={daily}
    />
  );
}
